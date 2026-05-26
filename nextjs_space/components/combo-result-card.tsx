'use client'

import { motion } from 'framer-motion'
import { ScoreBar } from './score-bar'
import { ScoreRing } from './score-ring'
import { Sparkles, Users, Share2, Heart } from 'lucide-react'
import { toast } from 'sonner'

export interface ComboResult {
  firstName: string
  lastName: string
  phonetic: {
    alliterationScore: number
    alliterationNote: string
    assonanceScore: number
    assonanceNote: string
    rhymeScore: number
    rhymeNote: string
    rhythmScore: number
    rhythmNote: string
    initialsScore: number
    initialsNote: string
    overallHarmony: number
    overallNote: string
  }
  culturalFit?: {
    score: number
    explanation: string
  }
}

function getRiskLabel(score: number): string {
  if (score <= 2) return 'Sehr harmonisch'
  if (score <= 4) return 'Harmonisch'
  if (score <= 6) return 'Auffällig'
  if (score <= 8) return 'Problematisch'
  return 'Kritisch'
}

export function ComboResultCard({ data }: { data: ComboResult }) {
  const p = data.phonetic

  const hasCultural = data.culturalFit != null
  const culturalScore = data.culturalFit?.score ?? 0
  const combinedOverall = hasCultural
    ? Math.round((p.overallHarmony * 0.6 + culturalScore * 0.4))
    : p.overallHarmony

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(262,60%,55%)] to-[hsl(200,70%,50%)] px-6 py-4 text-white">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-4 h-4 opacity-80" />
          <p className="text-sm opacity-80">Kombinations-Check</p>
        </div>
        <h3 className="font-display text-2xl font-bold tracking-tight">
          {data.firstName} {data.lastName}
        </h3>
      </div>

      {/* Overall harmony ring */}
      <div className="px-6 py-5 flex flex-col items-center border-b border-border">
        <p className="text-sm font-medium text-muted-foreground mb-3">Klang-Harmonie</p>
        <ScoreRing
          score={combinedOverall}
          maxScore={10}
          size={110}
          strokeWidth={9}
          label={getRiskLabel(combinedOverall)}
        />
        <p className="text-xs text-muted-foreground mt-2 text-center max-w-sm">
          {p.overallNote}
        </p>
      </div>

      {/* Phonetic scores with simple German labels */}
      <div className="px-6 py-5 space-y-4">
        <ScoreBar score={p.rhymeScore} maxScore={10} label="Reimt es sich?" description={p.rhymeNote} />
        <ScoreBar score={p.initialsScore} maxScore={10} label="Abkürzung problematisch?" description={p.initialsNote} />
        <ScoreBar score={p.alliterationScore} maxScore={10} label="Gleicher Anfangslaut" description={p.alliterationNote} />
        <ScoreBar score={p.assonanceScore} maxScore={10} label="Klangvielfalt" description={p.assonanceNote} />
        <ScoreBar score={p.rhythmScore} maxScore={10} label="Sprechrhythmus" description={p.rhythmNote} />
      </div>

      {/* Cultural fit (LLM result) */}
      {data.culturalFit && (
        <div className="px-6 py-4 border-t border-border bg-gradient-to-r from-violet-50/50 to-indigo-50/50 dark:from-violet-950/20 dark:to-indigo-950/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[hsl(262,60%,55%)]" />
            <p className="text-sm font-semibold">Passt der Vorname zum Nachnamen?</p>
          </div>
          <ScoreBar
            score={data.culturalFit.score}
            maxScore={10}
            label="Kulturelle Passung"
            description={data.culturalFit.explanation}
          />
        </div>
      )}
    </motion.div>
  )
}
