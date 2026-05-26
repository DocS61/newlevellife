export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json()
    const name = body?.name ?? ''

    if (!name) {
      return new Response(
        JSON.stringify({ error: 'Name is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = process.env.ABACUSAI_API_KEY
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const systemPrompt = `Du bist ein Experte für Babynamen-Analyse. Analysiere den gegebenen Babynamen und liefere Bewertungen und Erklärungen. Antworte auf Deutsch.

Bitte antworte im JSON-Format mit folgender Struktur:
{
  "name": "Der eingegebene Name",
  "origin": "Kulturelle/sprachliche Herkunft des Namens",
  "meaning": "Bedeutung des Namens",
  "gender": "m für männlich, f für weiblich, u für unisex",
  "bullyingScore": 0-10 (0=kein Risiko, 10=extremes Risiko für Hänseleien/Mobbing),
  "bullyingExplanation": "Kurze Erklärung zum Mobbing-Potenzial",
  "intlScore": 0-10 (0=weltweit leicht auszusprechen, 10=extrem schwer auszusprechen),
  "intlExplanation": "Kurze Erklärung zur internationalen Aussprache",
  "careerScore": 0-10 (0=sehr professionell, 10=sehr unprofessionelle Wahrnehmung),
  "careerExplanation": "Kurze Erklärung zur Karrierewirkung",
  "trendScore": 0-10 (0=zeitloser Klassiker, 10=extremer kurzlebiger Trend),
  "trendExplanation": "Kurze Erklärung zur Trend-Analyse",
  "overallRegret": 0-100 (berechnet als gewichteter Score: bullying*3 + intl*2.5 + career*2.5 + trend*2),
  "overallExplanation": "Gesamtzusammenfassung der Namensanalyse"
}

Sei ehrlich aber freundlich. Berücksichtige den kulturellen Kontext im deutschsprachigen Raum. Die Bewertungen sollten realistische Überlegungen widerspiegeln.

Antworte nur mit reinem JSON. Keine Code-Blöcke, kein Markdown, keine andere Formatierung.`

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.4-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analysiere den Babynamen: "${name}"` },
        ],
        stream: true,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
      }),
    })

    if (!response?.ok) {
      const errText = await response?.text()
      console.error('LLM API error:', errText)
      return new Response(
        JSON.stringify({ error: 'LLM API request failed' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response?.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()
        let buffer = ''
        let partialRead = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            partialRead += decoder.decode(value, { stream: true })
            let lines = partialRead.split('\n')
            partialRead = lines?.pop() ?? ''
            for (const line of (lines ?? [])) {
              if (line?.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  try {
                    const finalResult = JSON.parse(buffer)
                    // Recalculate overall regret for consistency
                    const b = finalResult?.bullyingScore ?? 0
                    const i = finalResult?.intlScore ?? 0
                    const c = finalResult?.careerScore ?? 0
                    const t = finalResult?.trendScore ?? 0
                    finalResult.overallRegret = Math.round((b * 3 + i * 2.5 + c * 2.5 + t * 2) * 10 / 10)
                    
                    const finalData = JSON.stringify({
                      status: 'completed',
                      result: finalResult,
                    })
                    controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
                  } catch (parseErr: any) {
                    console.error('Failed to parse final buffer:', parseErr)
                    const errorData = JSON.stringify({
                      status: 'error',
                      message: 'Failed to parse analysis result',
                    })
                    controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
                  }
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'))
                  return
                }
                try {
                  const parsed = JSON.parse(data)
                  buffer += parsed?.choices?.[0]?.delta?.content ?? ''
                  const progressData = JSON.stringify({
                    status: 'processing',
                    message: 'Generating',
                  })
                  controller.enqueue(encoder.encode(`data: ${progressData}\n\n`))
                } catch {
                  // Skip invalid JSON
                }
              }
            }
          }
          // If stream ended without [DONE], try to parse buffer
          if (buffer) {
            try {
              const finalResult = JSON.parse(buffer)
              const b = finalResult?.bullyingScore ?? 0
              const i = finalResult?.intlScore ?? 0
              const c = finalResult?.careerScore ?? 0
              const tr = finalResult?.trendScore ?? 0
              finalResult.overallRegret = Math.round((b * 3 + i * 2.5 + c * 2.5 + tr * 2) * 10 / 10)
              const finalData = JSON.stringify({ status: 'completed', result: finalResult })
              controller.enqueue(encoder.encode(`data: ${finalData}\n\n`))
            } catch { /* ignore */ }
          }
        } catch (error: any) {
          console.error('Stream error:', error)
          const errorData = JSON.stringify({ status: 'error', message: 'Stream processing failed' })
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (err: any) {
    console.error('Analyze error:', err)
    return new Response(
      JSON.stringify({ error: 'Analysis failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
