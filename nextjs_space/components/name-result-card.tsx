'use client'

import { useI18n } from '@/lib/i18n/context'
import { Locale } from '@/lib/i18n/translations'
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

function getMeaning(data: NameData, locale: Locale): string {
  if (locale === 'en') return data?.meaningEn ?? ''
  if (locale === 'es') return data?.meaningEs ?? ''
  return data?.meaningDe ?? ''
}

function getExplanation(data: NameData, locale: Locale): string {
  if (locale === 'en') return data?.explanationEn ?? ''
  if (locale === 'es') return data?.explanationEs ?? ''
  return data?.explanationDe ?? ''
}

function getGenderLabel(gender: string, t: (key: any) => string): string {
  if (gender === 'm') return t('genderMale')
  if (gender === 'f') return t('genderFemale')
  return t('genderUnisex')
}

function getRiskLabel(score: number, maxScore: number, t: (key: any) => string): string {
  const pct = (score / maxScore) * 100
  if (pct <= 30) return t('lowRisk')
  if (pct <= 60) return t('mediumRisk')
  return t('highRisk')
}

export function NameResultCard({ data, aiResult, isAI = false }: NameResultCardProps) {
  const { t, locale } = useI18n()

  const name = data?.name ?? aiResult?.name ?? ''
  const origin = data?.origin ?? aiResult?.origin ?? ''
  const meaning = data ? getMeaning(data, locale) : aiResult?.meaning ?? ''
  const gender = data?.gender ?? aiResult?.gender ?? 'u'
  const bullyingScore = data?.bullyingScore ?? aiResult?.bullyingScore ?? 0
  const intlScore = data?.intlScore ?? aiResult?.intlScore ?? 0
  const careerScore = data?.careerScore ?? aiResult?.careerScore ?? 0
  const trendScore = data?.trendScore ?? aiResult?.trendScore ?? 0
  const overallRegret = data?.overallRegret ?? aiResult?.overallRegret ?? 0
  const explanation = data ? getExplanation(data, locale) : aiResult?.overallExplanation ?? ''

  const handleShare = async () => {
    const shareData = {
      title: `${t('shareText')} ${name}`,
      text: `${name}: ${t('overallRegret')} ${overallRegret}/100. ${explanation}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    }
    try {
      if (navigator?.share) {
        await navigator.share(shareData)
      } else {
        await navigator?.clipboard?.writeText?.(`${shareData.text} ${shareData.url}`)
        toast.success(locale === 'de' ? 'Link kopiert!' : locale === 'es' ? '¡Enlace copiado!' : 'Link copied!')
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
            <p className="text-sm opacity-80">{t('resultTitle')}</p>
            <h2 className="font-display text-3xl font-bold tracking-tight">{name}</h2>
            {isAI && (
              <span className="inline-flex items-center gap-1 mt-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" /> {t('customAnalysis')}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
              aria-label={t('shareButton')}
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
              aria-label={t('printButton')}
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="px-6 py-6 flex flex-col items-center border-b border-border">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('overallRegret')}</p>
        <ScoreRing score={overallRegret} maxScore={100} size={130} strokeWidth={10} label={getRiskLabel(overallRegret, 100, t)} />
      </div>

      {/* Info row */}
      <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{t('resultOrigin')}</p>
            <p className="text-sm font-medium">{origin}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{t('resultMeaning')}</p>
            <p className="text-sm font-medium">{meaning}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{t('resultGender')}</p>
            <p className="text-sm font-medium">{getGenderLabel(gender, t)}</p>
          </div>
        </div>
        {data?.yearPeak && (
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">{t('resultYearPeak')}</p>
              <p className="text-sm font-medium">{data.yearPeak}</p>
            </div>
          </div>
        )}
      </div>

      {/* Score bars */}
      <div className="px-6 py-5 space-y-4">
        <ScoreBar score={bullyingScore} maxScore={10} label={t('bullyingScore')} description={t('bullyingDesc')} />
        <ScoreBar score={intlScore} maxScore={10} label={t('intlScore')} description={t('intlDesc')} />
        <ScoreBar score={careerScore} maxScore={10} label={t('careerScore')} description={t('careerDesc')} />
        <ScoreBar score={trendScore} maxScore={10} label={t('trendScore')} description={t('trendDesc')} />
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="px-6 py-4 border-t border-border bg-muted/20">
          <p className="text-xs text-muted-foreground mb-1">{t('resultExplanation')}</p>
          <p className="text-sm leading-relaxed">{explanation}</p>
        </div>
      )}
    </motion.div>
  )
}
