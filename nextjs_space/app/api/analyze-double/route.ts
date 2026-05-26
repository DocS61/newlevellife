export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { analyzeDoubleName } from '@/lib/phonetics'

export async function POST(request: NextRequest) {
  try {
    const { firstName1, firstName2, lastName } = await request.json()

    if (!firstName1 || !firstName2 || typeof firstName1 !== 'string' || typeof firstName2 !== 'string') {
      return NextResponse.json({ error: 'Zwei Vornamen erforderlich' }, { status: 400 })
    }

    const n1 = firstName1.trim()
    const n2 = firstName2.trim()
    const ln = lastName?.trim() || undefined

    if (n1.length < 2 || n2.length < 2) {
      return NextResponse.json({ error: 'Jeder Vorname muss mindestens 2 Zeichen haben' }, { status: 400 })
    }

    // Phonetic double-name analysis
    const analysis = analyzeDoubleName(n1, n2, ln)

    // Optional LLM reasoning for style assessment
    let aiStyleNote = ''
    const apiKey = process.env.ABACUSAI_API_KEY
    if (apiKey) {
      try {
        const fullName = ln ? `${n1}-${n2} ${ln}` : `${n1}-${n2}`
        const res = await fetch('https://api.abacus.ai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-5.4-mini',
            messages: [
              {
                role: 'system',
                content: 'Du bist ein Experte für deutsche Doppelnamen. Antworte kurz und knapp auf Deutsch. Maximal 2-3 Sätze.'
              },
              {
                role: 'user',
                content: `Bewerte den Doppelnamen "${fullName}" kurz: Passen die beiden Vornamen stilistisch zusammen? Wirkt der Name im DACH-Raum harmonisch oder ungewöhnlich? Nur 2-3 Sätze, keine Aufzählung.`
              },
            ],
            max_tokens: 120,
            temperature: 0.7,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          aiStyleNote = data.choices?.[0]?.message?.content?.trim() || ''
        }
      } catch {
        // LLM failure is non-critical
      }
    }

    return NextResponse.json({
      firstName1: n1,
      firstName2: n2,
      lastName: ln || null,
      analysis,
      aiStyleNote,
    })
  } catch (error) {
    console.error('Double name analysis error:', error)
    return NextResponse.json({ error: 'Fehler bei der Doppelname-Analyse' }, { status: 500 })
  }
}
