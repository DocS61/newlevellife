'use client'

import { useEffect, useState } from 'react'
import { NameData } from '@/lib/types'
import { Trophy, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function TopNamesSection() {
  const [safest, setSafest] = useState<NameData[]>([])
  const [riskiest, setRiskiest] = useState<NameData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/names/top')
      .then(r => r.json())
      .then(data => {
        setSafest(data.safest ?? [])
        setRiskiest(data.riskiest ?? [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[0, 1].map(i => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-4" />
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="h-8 bg-muted rounded mb-2" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (!safest.length && !riskiest.length) return null

  function getScoreColor(score: number): string {
    if (score <= 30) return 'text-emerald-600'
    if (score <= 60) return 'text-amber-600'
    return 'text-red-600'
  }

  function getScoreBg(score: number): string {
    if (score <= 30) return 'bg-emerald-50 dark:bg-emerald-950/30'
    if (score <= 60) return 'bg-amber-50 dark:bg-amber-950/30'
    return 'bg-red-50 dark:bg-red-950/30'
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Top 10 Namen im Vergleich</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Die sichersten und riskantesten Namen aus unserer Datenbank</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Safest */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-card overflow-hidden"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="px-5 py-4 bg-emerald-50 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800/40 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-600" />
            <h3 className="font-display font-semibold text-emerald-800 dark:text-emerald-300">Top 10 \u2013 Sicherste Namen</h3>
          </div>
          <div className="divide-y divide-border">
            {safest.slice(0, 10).map((name, i) => (
              <Link
                key={name.id}
                href={`/name/${name.name.toLowerCase()}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-mono text-xs text-muted-foreground">{i + 1}.</span>
                  <span className="font-medium text-sm">{name.name}</span>
                </div>
                <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded ${getScoreBg(name.overallRegret)} ${getScoreColor(name.overallRegret)}`}>
                  {name.overallRegret}/100
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Riskiest */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-red-200 dark:border-red-800/40 bg-card overflow-hidden"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <div className="px-5 py-4 bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-800/40 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-display font-semibold text-red-800 dark:text-red-300">Top 10 \u2013 Riskanteste Namen</h3>
          </div>
          <div className="divide-y divide-border">
            {riskiest.slice(0, 10).map((name, i) => (
              <Link
                key={name.id}
                href={`/name/${name.name.toLowerCase()}`}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-mono text-xs text-muted-foreground">{i + 1}.</span>
                  <span className="font-medium text-sm">{name.name}</span>
                </div>
                <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded ${getScoreBg(name.overallRegret)} ${getScoreColor(name.overallRegret)}`}>
                  {name.overallRegret}/100
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
