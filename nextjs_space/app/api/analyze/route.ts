export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request?.json()
    const name = body?.name ?? ''
    const locale = body?.locale ?? 'de'

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

    const langMap: Record<string, string> = {
      de: 'German',
      en: 'English',
      es: 'Spanish',
    }
    const language = langMap[locale] ?? 'German'

    const systemPrompt = `You are a baby name analysis expert. Analyze the given baby name and provide scores and explanations. Respond in ${language}.

Please respond in JSON format with the following structure:
{
  "name": "The name as entered",
  "origin": "Cultural/linguistic origin of the name",
  "meaning": "Meaning of the name",
  "gender": "m for male, f for female, u for unisex",
  "bullyingScore": 0-10 (0=no risk, 10=extreme risk for teasing/bullying),
  "bullyingExplanation": "Brief explanation of bullying potential",
  "intlScore": 0-10 (0=easy worldwide, 10=extremely hard to pronounce),
  "intlExplanation": "Brief explanation of international pronunciation difficulty",
  "careerScore": 0-10 (0=very professional, 10=very unprofessional perception),
  "careerExplanation": "Brief explanation of career impact",
  "trendScore": 0-10 (0=timeless classic, 10=extreme short-lived trend),
  "trendExplanation": "Brief explanation of trend analysis",
  "overallRegret": 0-100 (calculated as weighted score: bullying*3 + intl*2.5 + career*2.5 + trend*2),
  "overallExplanation": "Overall summary of the name analysis"
}

Be honest but kind. Consider cultural context across German, English, and Spanish-speaking countries. The scores should reflect real-world considerations.

Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`

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
          { role: 'user', content: `Analyze the baby name: "${name}"` },
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
