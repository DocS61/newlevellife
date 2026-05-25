'use client'

import { motion } from 'framer-motion'

interface ScoreBarProps {
  score: number
  maxScore: number
  label: string
  description?: string
}

function getBarColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct <= 30) return 'bg-emerald-500'
  if (pct <= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

export function ScoreBar({ score, maxScore, label, description }: ScoreBarProps) {
  const pct = Math.round((score / maxScore) * 100)
  const barColor = getBarColor(score, maxScore)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="font-mono text-sm font-bold">{score}/{maxScore}</span>
      </div>
      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}
