'use client'

import { useEffect, useState } from 'react'
import { NameData } from '@/lib/types'
import { TrendingUp, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function PopularNames({ onSelect }: { onSelect?: (name: string) => void }) {
  const [names, setNames] = useState<NameData[]>([])

  useEffect(() => {
    fetch('/api/names/popular')
      .then(r => r?.json())
      .then(d => setNames(d?.names ?? []))
      .catch(() => {})
  }, [])

  if ((names?.length ?? 0) === 0) return null

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-[hsl(340,75%,55%)]" />
        <h2 className="font-display text-xl font-bold tracking-tight">Beliebte Namen</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Die meistgesuchten Namen und ihre Bewertungen</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(names ?? []).map((n: NameData, i: number) => (
          <motion.button
            key={n?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect?.(n?.name ?? '')}
            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-[hsl(340,75%,55%/0.3)] transition-all group text-left"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-muted-foreground w-5">#{i + 1}</span>
              <div>
                <span className="font-medium group-hover:text-[hsl(340,75%,55%)] transition-colors">{n?.name}</span>
                <span className="text-xs text-muted-foreground ml-2">{n?.origin}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold" style={{
                color: (n?.overallRegret ?? 0) <= 30 ? 'hsl(170,60%,45%)' : (n?.overallRegret ?? 0) <= 60 ? 'hsl(43,74%,50%)' : 'hsl(0,84%,60%)'
              }}>
                {n?.overallRegret}/100
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(340,75%,55%)] transition-colors" />
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
