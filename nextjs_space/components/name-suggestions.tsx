'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Sparkles, ChevronRight, Baby, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface SuggestedName {
  name: string
  overallRegret: number
  phoneticsScore: number
  origin: string
  meaningDe: string
}

interface NameSuggestionsProps {
  lastName: string
  onRequest: () => void
}

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

function getPhoneticLabel(score: number): { text: string; className: string } {
  if (score <= 2) return { text: 'Klingt super', className: 'text-emerald-600 bg-emerald-50' }
  if (score <= 5) return { text: 'Klingt gut', className: 'text-amber-600 bg-amber-50' }
  return { text: 'Bedingt', className: 'text-red-600 bg-red-50' }
}

export function NameSuggestionsTrigger({ lastName, onRequest }: NameSuggestionsProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onRequest}
      className="mt-3 w-full px-4 py-3 rounded-xl border-2 border-dashed border-[hsl(262,60%,55%/0.3)] bg-gradient-to-r from-[hsl(262,60%,55%/0.05)] to-[hsl(340,75%,55%/0.05)] hover:border-[hsl(262,60%,55%/0.5)] hover:from-[hsl(262,60%,55%/0.08)] hover:to-[hsl(340,75%,55%/0.08)] transition-all text-sm font-medium text-[hsl(262,60%,55%)] flex items-center justify-center gap-2"
    >
      <Sparkles className="w-4 h-4" />
      Welche Vornamen passen am besten zu „{lastName}“?
    </motion.button>
  )
}

interface SuggestionsResultProps {
  boys: SuggestedName[]
  girls: SuggestedName[]
  lastName: string
  aiReasoning: string
  loading: boolean
}

export function NameSuggestionsResult({ boys, girls, lastName, aiReasoning, loading }: SuggestionsResultProps) {
  const [activeTab, setActiveTab] = useState<'boys' | 'girls'>('boys')
  const names = activeTab === 'boys' ? boys : girls

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-xl border border-border bg-card p-8 text-center"
        style={{ boxShadow: 'var(--shadow-sm)' }}
      >
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-[hsl(262,60%,55%)]" />
        <p className="mt-3 text-sm text-muted-foreground">
          Wir suchen die besten Vornamen für den Nachnamen „{lastName}“...
        </p>
      </motion.div>
    )
  }

  if (boys.length === 0 && girls.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-xl border border-border bg-card overflow-hidden"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      {/* Header */}
      <div className="px-5 py-4 bg-gradient-to-r from-[hsl(262,60%,55%/0.08)] to-[hsl(340,75%,55%/0.08)] border-b border-border">
        <h3 className="font-display text-base font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[hsl(262,60%,55%)]" />
          Top-Vornamen für „{lastName}“
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Basierend auf Klanganalyse, Reue-Score und Phonetik-Kompatibilität
        </p>
      </div>

      {/* Gender Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('boys')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'boys'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/20'
              : 'text-muted-foreground hover:bg-muted/30'
          }`}
        >
          <span>👦</span> Jungennamen ({boys.length})
        </button>
        <button
          onClick={() => setActiveTab('girls')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'girls'
              ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50/50 dark:bg-pink-950/20'
              : 'text-muted-foreground hover:bg-muted/30'
          }`}
        >
          <span>👧</span> Mädchennamen ({girls.length})
        </button>
      </div>

      {/* Name List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === 'boys' ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === 'boys' ? 10 : -10 }}
          transition={{ duration: 0.2 }}
          className="divide-y divide-border"
        >
          {names.map((name, i) => {
            const phonetic = getPhoneticLabel(name.phoneticsScore)
            return (
              <Link
                key={name.name}
                href={`/name/${name.name.toLowerCase()}`}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/30 transition-colors group"
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(262,60%,55%/0.15)] to-[hsl(340,75%,55%/0.15)] flex items-center justify-center">
                  <span className="text-xs font-bold text-[hsl(262,60%,55%)]">{i + 1}</span>
                </div>

                {/* Name + Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{name.name} {lastName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {name.origin} · „{name.meaningDe}“
                  </p>
                </div>

                {/* Scores */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${phonetic.className}`}>
                    {phonetic.text}
                  </span>
                  <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${getScoreBg(name.overallRegret)} ${getScoreColor(name.overallRegret)}`}>
                    {name.overallRegret}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* AI Reasoning */}
      {aiReasoning && (
        <div className="px-5 py-4 border-t border-border bg-gradient-to-r from-[hsl(262,60%,55%/0.04)] to-transparent">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[hsl(262,60%,55%)]" />
            <span>{aiReasoning}</span>
          </p>
        </div>
      )}

      {/* Footer hint */}
      <div className="px-5 py-3 border-t border-border bg-muted/20 text-center">
        <p className="text-[11px] text-muted-foreground">
          Klicke auf einen Namen für die ausführliche Analyse · Reue-Score: niedrig = besser
        </p>
      </div>
    </motion.div>
  )
}
