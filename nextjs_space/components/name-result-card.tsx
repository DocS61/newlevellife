'use client'

import { NameData, AIAnalysisResult } from '@/lib/types'
import { ScoreRing } from './score-ring'
import { ScoreBar } from './score-bar'
import { Share2, Printer, MapPin, TrendingUp, User, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface NameResultCardProps {
  data?: NameData | null
  aiResult?: AIAnalysisResult | null
  isAI?: boolean
}

function getGenderLabel(gender: string): string {
  if (gender === 'm') return 'Männlich'
  if (gender === 'f') return 'Weiblich'
  return 'Unisex'
}

function getRiskLabel(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct <= 30) return 'Niedriges Risiko'
  if (pct <= 60) return 'Mittleres Risiko'
  return 'Hohes Risiko'
}

export function NameResultCard({ data, aiResult, isAI = false }: NameResultCardProps) {
  const name = data?.name ?? aiResult?.name ?? ''
  const origin = data?.origin ?? aiResult?.origin ?? ''
  const meaning = data?.meaningDe ?? aiResult?.meaning ?? ''
  const gender = data?.gender ?? aiResult?.gender ?? 'u'
  const bullyingScore = data?.bullyingScore ?? aiResult?.bullyingScore ?? 0
  const intlScore = data?.intlScore ?? aiResult?.intlScore ?? 0
  const careerScore = data?.careerScore ?? aiResult?.careerScore ?? 0
  const trendScore = data?.trendScore ?? aiResult?.trendScore ?? 0
  const overallRegret = data?.overallRegret ?? aiResult?.overallRegret ?? 0
  const explanation = data?.explanationDe ?? aiResult?.overallExplanation ?? ''

  const handleShare = async () => {
    const shareData = {
      title: `Namensanalyse für ${name}`,
      text: `${name}: Gesamt-Reue-Score ${overallRegret}/100. ${explanation}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }
    try {
      if (navigator?.share) {
        await navigator.share(shareData)
      } else {
        await navigator?.clipboard?.writeText?.(`${shareData.text} ${shareData.url}`)
        toast.success('Link kopiert!')
      }
    } catch { /* user cancelled */ }
  }

  const handlePrint = () => { window?.print?.() }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border border-border overflow-hidden"
      style={{ boxShadow: 'var(--shadow-md)' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] px-6 py-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Analyse für</p>
            <h2 className="font-display text-3xl font-bold tracking-tight">{name}</h2>
            {isAI && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" /> KI-Analyse
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
              aria-label="Teilen"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
              aria-label="Drucken"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="px-6 py-6 flex flex-col items-center border-b border-border">
        <p className="text-sm font-medium text-muted-foreground mb-3">Gesamt-Reue-Score</p>
        <ScoreRing score={overallRegret} maxScore={100} size={130} strokeWidth={10} label={getRiskLabel(overallRegret, 100)} />
      </div>

      {/* Info row */}
      <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Herkunft</p>
            <p className="text-sm font-medium">{origin}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Bedeutung</p>
            <p className="text-sm font-medium">{meaning}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Geschlecht</p>
            <p className="text-sm font-medium">{getGenderLabel(gender)}</p>
          </div>
        </div>
        {data?.yearPeak && (
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Beliebtheitshoch</p>
              <p className="text-sm font-medium">{data.yearPeak}</p>
            </div>
          </div>
        )}
      </div>

      {/* Score bars */}
      <div className="px-6 py-5 space-y-4">
        <ScoreBar score={bullyingScore} maxScore={10} label="Mobbing-Risiko" description="Potenzial für Hänseleien und Spitznamen" />
        <ScoreBar score={intlScore} maxScore={10} label="Internationale Aussprache" description="Wie leicht der Name weltweit ausgesprochen wird" />
        <ScoreBar score={careerScore} maxScore={10} label="Karrierewirkung" description="Wahrnehmung in beruflichen Kontexten" />
        <ScoreBar score={trendScore} maxScore={10} label="Trend-Analyse" description="Ist der Name zeitlos oder vergänglich?" />
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="px-6 py-4 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground mb-1">Erklärung</p>
          <p className="text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </motion.div>
  )
}
