'use client'

import { motion } from 'framer-motion'
import { Users, Sparkles } from 'lucide-react'
import { ScoreRing } from './score-ring'
import { ScoreBar } from './score-bar'
import { DoubleNameAnalysis } from '@/lib/phonetics'

export interface DoubleNameResult {
  firstName1: string
  firstName2: string
  lastName: string | null
  analysis: DoubleNameAnalysis
  aiStyleNote: string
}

function getRiskLabel(score: number, max: number): string {
  const pct = (score / max) * 100
  if (pct <= 20) return 'Perfekt!'
  if (pct <= 40) return 'Gut'
  if (pct <= 60) return 'Okay'
  if (pct <= 80) return 'Kritisch'
  return 'Riskant'
}

export function DoubleNameResultCard({ data }: { data: DoubleNameResult }) {
  const { analysis } = data
  const fullDouble = `${data.firstName1}-${data.firstName2}`
  const fullName = data.lastName ? `${fullDouble} ${data.lastName}` : fullDouble

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(262,60%,55%)] to-[hsl(200,70%,50%)] px-6 py-5 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 opacity-80" />
          <p className="text-sm opacity-80">Doppelname-Check</p>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight">
          {fullName}
        </h3>
      </div>

      {/* Score Ring + Bars */}
      <div className="p-6">
        <div className="flex flex-col items-center mb-6">
          <ScoreRing
            score={analysis.overallDouble}
            maxScore={10}
            size={120}
            strokeWidth={10}
            label={getRiskLabel(analysis.overallDouble, 10)}
          />
          <p className="text-sm text-muted-foreground mt-2 text-center max-w-sm">
            {analysis.overallNote}
          </p>
        </div>

        <div className="space-y-4">
          <ScoreBar
            score={analysis.flowScore}
            maxScore={10}
            label="Lautübergang"
            description={analysis.flowNote}
          />
          <ScoreBar
            score={analysis.rhythmScore}
            maxScore={10}
            label="Silbenrhythmus"
            description={analysis.rhythmNote}
          />
          <ScoreBar
            score={analysis.styleScore}
            maxScore={10}
            label="Stilkonsistenz"
            description={analysis.styleNote}
          />
          <ScoreBar
            score={analysis.lengthScore}
            maxScore={10}
            label="Gesamtlänge"
            description={analysis.lengthNote}
          />

          {/* Triple rhythm if surname was given */}
          {analysis.tripleRhythmScore !== undefined && analysis.tripleRhythmNote && (
            <ScoreBar
              score={analysis.tripleRhythmScore}
              maxScore={10}
              label="Gesamt mit Nachname"
              description={analysis.tripleRhythmNote}
            />
          )}
        </div>
      </div>

      {/* AI Style Note */}
      {data.aiStyleNote && (
        <div className="px-6 py-4 border-t border-border bg-gradient-to-r from-[hsl(262,60%,55%/0.05)] to-transparent">
          <div className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-[hsl(262,60%,55%)]" />
            <p className="text-sm text-muted-foreground">{data.aiStyleNote}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
