export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { analyzeNameCombo, PhoneticAnalysis } from '@/lib/phonetics'

export interface ComboAnalysisResult {
  firstName: string
  lastName: string
  phonetic: PhoneticAnalysis
  culturalFit?: {
    score: number
    explanation: string
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const firstName = (body?.firstName ?? '').trim()
    const lastName = (body?.lastName ?? '').trim()

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'Vorname und Nachname sind erforderlich.' },
        { status: 400 }
      )
    }

    // 1. Algorithmic phonetic analysis
    const phonetic = analyzeNameCombo(firstName, lastName)

    // 2. LLM cultural fit analysis (if API key available)
    let culturalFit: { score: number; explanation: string } | undefined
    const apiKey = process.env.ABACUSAI_API_KEY

    if (apiKey) {
      try {
        const prompt = `Bewerte den kulturellen Stilbruch der Namenskombination "${firstName} ${lastName}" im deutschsprachigen Raum.

Berücksichtige:
- Passt die kulturelle Herkunft des Vornamens zum Nachnamen? (z.B. "Cheyenne Häberle" = starker Stilbruch)
- Gibt es humoristische oder unglückliche Assoziationen mit dem Gesamtnamen?
- Wie wirkt der Name in einem deutschen Kontext (Schule, Beruf, Behörden)?

Antworte NUR mit validem JSON in diesem Format:
{
  "score": 0-10 (0=perfekte Harmonie, 10=extremer Stilbruch),
  "explanation": "Kurze Erklärung auf Deutsch (max. 2 Sätze)"
}`

        const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-5.4-mini',
            messages: [
              { role: 'system', content: 'Du bist ein Experte für deutsche Namenskultur. Antworte nur mit reinem JSON.' },
              { role: 'user', content: prompt },
            ],
            max_tokens: 300,
            response_format: { type: 'json_object' },
          }),
        })

        if (response.ok) {
          const data = await response.json()
          const content = data?.choices?.[0]?.message?.content ?? ''
          const parsed = JSON.parse(content)
          culturalFit = {
            score: Math.min(10, Math.max(0, parsed?.score ?? 0)),
            explanation: parsed?.explanation ?? '',
          }
        }
      } catch (err) {
        console.error('Cultural fit LLM error:', err)
        // Continue without cultural fit – phonetic analysis still works
      }
    }

    const result: ComboAnalysisResult = {
      firstName,
      lastName,
      phonetic,
      culturalFit,
    }

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Combo analysis error:', err)
    return NextResponse.json(
      { error: 'Analyse fehlgeschlagen' },
      { status: 500 }
    )
  }
}
