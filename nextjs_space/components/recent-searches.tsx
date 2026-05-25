'use client'

import { useEffect, useState } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { RecentSearch } from '@/lib/types'
import { Clock, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function RecentSearches({ onSelect }: { onSelect?: (name: string) => void }) {
  const { t } = useI18n()
  const [searches, setSearches] = useState<RecentSearch[]>([])

  const loadSearches = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('nrc-recent') ?? '[]') as RecentSearch[]
      setSearches(stored ?? [])
    } catch { setSearches([]) }
  }

  useEffect(() => {
    loadSearches()
    const handler = () => loadSearches()
    window.addEventListener('nrc-recent-updated', handler)
    return () => window.removeEventListener('nrc-recent-updated', handler)
  }, [])

  const removeSearch = (name: string) => {
    const updated = (searches ?? []).filter((s: RecentSearch) => s?.name !== name)
    setSearches(updated)
    localStorage.setItem('nrc-recent', JSON.stringify(updated))
  }

  if ((searches?.length ?? 0) === 0) return null

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-[hsl(262,60%,55%)]" />
        <h2 className="font-display text-xl font-bold tracking-tight">{t('recentTitle')}</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {(searches ?? []).map((s: RecentSearch) => (
            <motion.div
              key={s?.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-card border border-border hover:border-[hsl(262,60%,55%/0.3)] transition-all cursor-pointer"
              onClick={() => onSelect?.(s?.name ?? '')}
            >
              <span className="text-sm font-medium">{s?.name}</span>
              <span className="font-mono text-xs ml-1" style={{
                color: (s?.overallRegret ?? 0) <= 30 ? 'hsl(170,60%,45%)' : (s?.overallRegret ?? 0) <= 60 ? 'hsl(43,74%,50%)' : 'hsl(0,84%,60%)'
              }}>
                {s?.overallRegret}
              </span>
              <button
                onClick={(e: React.MouseEvent) => { e?.stopPropagation?.(); removeSearch(s?.name ?? '') }}
                className="p-0.5 rounded-full hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}
