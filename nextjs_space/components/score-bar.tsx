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

function getRiskBadge(score: number, maxScore: number): { text: string; icon: string; className: string } {
  const pct = (score / maxScore) * 100
  if (pct <= 30) return { text: 'Niedrig', icon: '✓', className: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
  if (pct <= 60) return { text: 'Mittel', icon: '⚠', className: 'text-amber-600 bg-amber-50 border-amber-200' }
  return { text: 'Hoch', icon: '✗', className: 'text-red-600 bg-red-50 border-red-200' }
}

export function ScoreBar({ score, maxScore, label, description }: ScoreBarProps) {
  const pct = Math.round((score / maxScore) * 100)
  const barColor = getBarColor(score, maxScore)
  const badge = getRiskBadge(score, maxScore)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-medium">{label}</span>
          <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${badge.className}`}>
            {badge.icon} {badge.text}
          </span>
        </div>
        <span className="font-mono text-sm font-bold shrink-0">{score}/{maxScore}</span>
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
