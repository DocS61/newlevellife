export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { analyzeNameCombo } from '@/lib/phonetics'

interface ScoredName {
  name: string
  gender: string
  overallRegret: number
  origin: string
  meaningDe: string
  phoneticsScore: number // 0-10, lower is better
  combinedScore: number  // weighted combo of regret + phonetics
}

export async function POST(request: NextRequest) {
  try {
    const { lastName } = await request.json()
    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
      return NextResponse.json({ error: 'Nachname erforderlich (min. 2 Zeichen)' }, { status: 400 })
    }

    const surname = lastName.trim()

    // 1. Get all names from DB
    const allNames = await prisma.name.findMany({
      select: {
        name: true,
        gender: true,
        overallRegret: true,
        origin: true,
        meaningDe: true,
        bullyingScore: true,
      },
    })

    // 2. Score each name against the surname using phonetic analysis
    const scored: ScoredName[] = allNames.map((n: typeof allNames[number]) => {
      const phonetics = analyzeNameCombo(n.name, surname)
      // Use granular (non-rounded) phonetics score for meaningful differentiation
      // Weight: 30% name quality (regret), 70% phonetic fit with surname
      const regretNorm = n.overallRegret / 100 * 10 // normalize to 0-10
      const combinedScore = regretNorm * 0.3 + phonetics.overallGranular * 0.7
      return {
        name: n.name,
        gender: n.gender,
        overallRegret: n.overallRegret,
        origin: n.origin,
        meaningDe: n.meaningDe,
        phoneticsScore: phonetics.overallHarmony,
        combinedScore,
      }
    })

    // 3. Split by gender and sort by combinedScore (lower = better)
    const males = scored.filter(n => n.gender === 'm').sort((a, b) => a.combinedScore - b.combinedScore)
    const females = scored.filter(n => n.gender === 'f').sort((a, b) => a.combinedScore - b.combinedScore)
    const unisex = scored.filter(n => n.gender === 'u').sort((a, b) => a.combinedScore - b.combinedScore)

    // Take top 5 per binary gender, plus best unisex if any
    const topMales = males.slice(0, 5)
    const topFemales = females.slice(0, 5)

    // 4. Optional: LLM refinement for brief reasoning
    let aiReasoning = ''
    const apiKey = process.env.ABACUSAI_API_KEY
    if (apiKey) {
      try {
        const nameList = [
          ...topMales.map(n => `${n.name} ${surname} (Junge, Reue-Score: ${n.overallRegret}, Klang-Score: ${n.phoneticsScore}/10)`),
          ...topFemales.map(n => `${n.name} ${surname} (Mädchen, Reue-Score: ${n.overallRegret}, Klang-Score: ${n.phoneticsScore}/10)`),
        ].join('\n')

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
                content: 'Du bist ein Experte für deutsche Vornamen. Antworte kurz und knapp auf Deutsch. Maximal 2-3 Sätze insgesamt.'
              },
              {
                role: 'user',
                content: `Hier sind die besten Vornamen-Vorschläge für den Nachnamen "${surname}". Gib eine kurze, allgemeine Einschätzung (2-3 Sätze), warum diese Namen gut zum Nachnamen passen. Keine Auflistung der Namen, nur ein allgemeines Fazit.\n\n${nameList}`
              },
            ],
            max_tokens: 150,
            temperature: 0.7,
          }),
        })

        if (res.ok) {
          const data = await res.json()
          aiReasoning = data.choices?.[0]?.message?.content?.trim() || ''
        }
      } catch {
        // LLM failure is non-critical, we still have algorithmic results
      }
    }

    return NextResponse.json({
      lastName: surname,
      boys: topMales.map(n => ({
        name: n.name,
        overallRegret: n.overallRegret,
        phoneticsScore: n.phoneticsScore,
        origin: n.origin,
        meaningDe: n.meaningDe,
      })),
      girls: topFemales.map(n => ({
        name: n.name,
        overallRegret: n.overallRegret,
        phoneticsScore: n.phoneticsScore,
        origin: n.origin,
        meaningDe: n.meaningDe,
      })),
      aiReasoning,
    })
  } catch (error) {
    console.error('Suggest names error:', error)
    return NextResponse.json({ error: 'Fehler bei der Namenssuche' }, { status: 500 })
  }
}
