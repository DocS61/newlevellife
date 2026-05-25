'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ScoreRingProps {
  score: number
  maxScore: number
  size?: number
  strokeWidth?: number
  label: string
  description?: string
  animate?: boolean
}

function getScoreColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct <= 30) return 'hsl(170, 60%, 45%)'
  if (pct <= 60) return 'hsl(43, 74%, 50%)'
  return 'hsl(0, 84%, 60%)'
}

export function ScoreRing({ score, maxScore, size = 100, strokeWidth = 8, label, description, animate = true }: ScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = (displayScore / maxScore) * circumference
  const color = getScoreColor(score, maxScore)

  useEffect(() => {
    if (!animate) { setDisplayScore(score); return }
    let frame = 0
    const totalFrames = 40
    const step = score / totalFrames
    const interval = setInterval(() => {
      frame++
      if (frame >= totalFrames) {
        setDisplayScore(score)
        clearInterval(interval)
      } else {
        setDisplayScore(Math.round(step * frame))
      }
    }, 20)
    return () => clearInterval(interval)
  }, [score, animate])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            initial={animate ? { strokeDashoffset: circumference } : undefined}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-bold text-lg" style={{ color }}>
            {displayScore}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
    </div>
  )
}
