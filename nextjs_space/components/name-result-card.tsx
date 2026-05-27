'use client'

import { NameData, AIAnalysisResult } from '@/lib/types'
import { ScoreRing } from './score-ring'
import { ScoreBar } from './score-bar'
import { Share2, Printer, MapPin, TrendingUp, User, Sparkles, Info, Heart, Hash, Palette, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'

// === Nomen est Omen: Numerology & Esoteric helpers ===
function calcNumerology(name: string): number {
  const map: Record<string, number> = {
    a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
    s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8,ä:1,ö:6,ü:3,ß:1
  }
  let sum = 0
  for (const ch of name.toLowerCase()) {
    sum += map[ch] || 0
  }
  while (sum > 9) {
    sum = String(sum).split('').reduce((a, b) => a + Number(b), 0)
  }
  return sum || 1
}

const numerologyData: Record<number, { title: string; traits: string; element: string; color: string; colorHex: string; planet: string; strength: string }> = {
  1: { title: 'Der Anführer', traits: 'Unabhängig, ehrgeizig, selbstbewusst', element: 'Feuer 🔥', color: 'Rot', colorHex: '#DC2626', planet: 'Sonne ☀️', strength: 'Führungskraft und Pioniergeist' },
  2: { title: 'Der Diplomat', traits: 'Einfühlsam, kooperativ, harmonisch', element: 'Wasser 💧', color: 'Silber', colorHex: '#94A3B8', planet: 'Mond 🌙', strength: 'Vermittlung und Intuition' },
  3: { title: 'Der Kreative', traits: 'Ausdrucksstark, gesellig, optimistisch', element: 'Feuer 🔥', color: 'Gelb', colorHex: '#EAB308', planet: 'Jupiter ♃', strength: 'Kreativität und Kommunikation' },
  4: { title: 'Der Baumeister', traits: 'Zuverlässig, diszipliniert, geduldig', element: 'Erde 🌍', color: 'Grün', colorHex: '#16A34A', planet: 'Uranus ♅', strength: 'Stabilität und Ausdauer' },
  5: { title: 'Der Freigeist', traits: 'Abenteuerlustig, vielseitig, neugierig', element: 'Luft 💨', color: 'Türkis', colorHex: '#06B6D4', planet: 'Merkur ☿', strength: 'Anpassungsfähigkeit und Freiheit' },
  6: { title: 'Der Fürsorger', traits: 'Liebevoll, verantwortungsbewusst, harmonisch', element: 'Erde 🌍', color: 'Blau', colorHex: '#2563EB', planet: 'Venus ♀', strength: 'Liebe und Verantwortung' },
  7: { title: 'Der Denker', traits: 'Analytisch, spirituell, wissbegierig', element: 'Wasser 💧', color: 'Violett', colorHex: '#7C3AED', planet: 'Neptun ♆', strength: 'Tiefgründigkeit und Weisheit' },
  8: { title: 'Der Macher', traits: 'Zielstrebig, erfolgsorientiert, durchsetzungsstark', element: 'Erde 🌍', color: 'Gold', colorHex: '#D97706', planet: 'Saturn ♄', strength: 'Erfolg und materielle Stärke' },
  9: { title: 'Der Idealist', traits: 'Mitfühlend, großzügig, visionär', element: 'Feuer 🔥', color: 'Rosa', colorHex: '#EC4899', planet: 'Mars ♂', strength: 'Humanität und Inspiration' },
}

function getVowelEnergy(name: string): string {
  const vowels = name.toLowerCase().replace(/[^aeiouäöü]/g, '')
  const ratio = vowels.length / Math.max(name.length, 1)
  if (ratio >= 0.5) return 'Sehr hohe Vokalenergie – der Name klingt offen, warm und einladend.'
  if (ratio >= 0.35) return 'Ausgewogene Klangenergie – eine harmonische Mischung aus weichen und starken Lauten.'
  return 'Starke Konsonantenenergie – der Name wirkt kraftvoll und durchsetzungsstark.'
}

function getNameLength(name: string): string {
  if (name.length <= 4) return 'Kurz und prägnant – leicht zu merken und direkt. Kurze Namen strahlen Entschlossenheit aus.'
  if (name.length <= 6) return 'Mittlere Länge – vielseitig und ausgewogen. Diese Länge bietet den perfekten Kompromiss.'
  return 'Lang und klangvoll – dieser Name hat Präsenz und Gravitas. Längere Namen wirken oft besonders elegant.'
}

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

function getGenderEmoji(gender: string): string {
  if (gender === 'm') return '♂️'
  if (gender === 'f') return '♀️'
  return '⚧️'
}

function getRiskLabel(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct <= 20) return 'Sehr niedriges Risiko'
  if (pct <= 40) return 'Niedriges Risiko'
  if (pct <= 60) return 'Mittleres Risiko'
  if (pct <= 80) return 'Hohes Risiko'
  return 'Sehr hohes Risiko'
}

function getRiskColor(score: number, maxScore: number): string {
  const pct = (score / maxScore) * 100
  if (pct <= 30) return 'text-emerald-600'
  if (pct <= 60) return 'text-amber-600'
  return 'text-red-600'
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
        <p className={`text-xs font-medium mt-2 ${getRiskColor(overallRegret, 100)}`}>
          {overallRegret <= 30 ? 'Dieser Name ist eine sichere Wahl!' : overallRegret <= 60 ? 'Einige Aspekte verdienen Aufmerksamkeit.' : 'Dieser Name birgt erhöhtes Risikopotenzial.'}
        </p>
      </div>

      {/* Score explanation hint */}
      <div className="px-6 py-3 border-b border-border bg-blue-50/50 dark:bg-blue-950/20">
        <div className="flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-[11px] text-blue-600 dark:text-blue-400">
            <span className="font-semibold">So liest du die Scores:</span> Je niedriger der Wert, desto besser. Grün = unbedenklich, Gelb = beachtenswert, Rot = kritisch.
          </p>
        </div>
      </div>

      {/* Info cards - redesigned */}
      <div className="px-6 py-5 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-100 dark:border-purple-800/30">
            <MapPin className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Herkunft</p>
              <p className="text-sm font-medium mt-0.5 leading-snug">{origin}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-100 dark:border-pink-800/30">
            <Sparkles className="w-5 h-5 text-pink-500 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-pink-600 dark:text-pink-400 uppercase tracking-wider">Bedeutung</p>
              <p className="text-sm font-medium mt-0.5 leading-snug">{meaning}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20 border border-sky-100 dark:border-sky-800/30">
            <User className="w-5 h-5 text-sky-500 mt-0.5 shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">Geschlecht</p>
              <p className="text-sm font-medium mt-0.5">{getGenderEmoji(gender)} {getGenderLabel(gender)}</p>
            </div>
          </div>
          {data?.yearPeak && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-100 dark:border-amber-800/30">
              <TrendingUp className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Beliebtheitshoch</p>
                <p className="text-sm font-medium mt-0.5">{data.yearPeak}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Score bars */}
      <div className="px-6 py-5 space-y-4">
        <ScoreBar score={bullyingScore} maxScore={10} label="Mobbing-Risiko" description="Wie hoch ist die Gefahr für Hänseleien? (Niedrig = kaum Risiko)" />
        <ScoreBar score={intlScore} maxScore={10} label="Aussprache-Schwierigkeit" description="Wie schwer ist der Name international auszusprechen? (Niedrig = leicht)" />
        <ScoreBar score={careerScore} maxScore={10} label="Karriere-Risiko" description="Könnte der Name beruflich hinderlich wirken? (Niedrig = professionell)" />
        <ScoreBar score={trendScore} maxScore={10} label="Trend-Risiko" description="Wie stark ist der Name an einen kurzlebigen Trend gebunden? (Niedrig = zeitlos)" />
      </div>

      {/* Detail section - "Der Name im Detail" */}
      <div className="px-6 py-5 border-t border-border">
        <h3 className="font-display text-lg font-semibold mb-3">
          Der Name {name} im Detail
        </h3>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
          <p>
            <strong>{name}</strong> ist ein {gender === 'm' ? 'männlicher' : gender === 'f' ? 'weiblicher' : 'geschlechtsneutraler'} Vorname
            {origin ? <> mit {origin.toLowerCase().includes('deutsch') ? 'deutschen' : origin.toLowerCase()} Wurzeln</> : null}.
            {meaning ? <> Die Bedeutung des Namens ist „{meaning}".</> : null}
          </p>
          <p>
            In unserer Analyse erreicht {name} einen Gesamt-Reue-Score von <strong className={getRiskColor(overallRegret, 100)}>{overallRegret} von 100</strong>.
            {overallRegret <= 30
              ? ' Das bedeutet, dieser Name ist eine ausgezeichnete Wahl mit sehr geringem Risikopotenzial.'
              : overallRegret <= 60
              ? ' Das deutet auf einige Aspekte hin, die Eltern bedenken sollten, insgesamt aber ein akzeptabler Name.'
              : ' Das signalisiert erhöhtes Risikopotenzial in mehreren Kategorien. Eine sorgfältige Abwägung ist empfehlenswert.'}
          </p>
          {data?.yearPeak && (
            <p>
              Der Name {name} hatte sein Beliebtheitshoch um {data.yearPeak}.
              {trendScore <= 3
                ? ' Trotzdem gilt er als zeitlos und nicht an einen kurzlebigen Trend gebunden.'
                : trendScore <= 6
                ? ' Er zeigt moderate Schwankungen in der Beliebtheit.'
                : ' Er ist stark mit einem bestimmten Zeitraum assoziiert und könnte als Modename wahrgenommen werden.'}
            </p>
          )}
          {explanation && <p>{explanation}</p>}
        </div>
      </div>

      {/* Nomen est Omen section */}
      {(() => {
        const num = calcNumerology(name)
        const numData = numerologyData[num]
        if (!numData) return null
        return (
          <div className="border-t border-border">
            <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-[hsl(262,60%,55%/0.08)] to-[hsl(340,75%,55%/0.08)]">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[hsl(262,60%,55%)]" />
                Nomen est Omen – {name} esoterisch betrachtet
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                „Nomen est Omen" ist Latein und bedeutet „Der Name ist ein Zeichen" – also die Idee, dass ein Name etwas über seinen Träger verrät. Zur Unterhaltung, nicht als Lebensberatung 😉
              </p>
            </div>

            <div className="p-6 space-y-5">
              {/* Numerology Number */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(262,60%,55%)] to-[hsl(340,75%,55%)] flex items-center justify-center">
                  <span className="text-white font-display text-2xl font-bold">{num}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[hsl(262,60%,55%)]" />
                    Namenszahl: {num} – {numData.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{numData.traits}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">🌟 Stärke: {numData.strength}</p>
                </div>
              </div>

              {/* Namenszahl Erläuterung */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-[hsl(262,60%,55%/0.06)] to-[hsl(340,75%,55%/0.06)] border border-[hsl(262,60%,55%/0.15)]">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[hsl(262,60%,55%)] mb-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Was ist die Namenszahl?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Die Namenszahl stammt aus der <strong>Numerologie</strong> – einer Jahrtausende alten Tradition, die Buchstaben Zahlenwerte zuordnet.
                  Jeder Buchstabe erhält eine Zahl von 1–9 (A=1, B=2, … I=9, dann wieder J=1, K=2 usw.).
                  Alle Buchstabenwerte des Namens werden addiert und die Summe so lange auf ihre Quersumme reduziert, bis eine einstellige Zahl (1–9) entsteht.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                  <strong>Beispiel:</strong> {name} → {name.split('').map((ch, i) => {
                    const val = 'abcdefghijklmnopqrstuvwxyzäöüß'.indexOf(ch.toLowerCase())
                    const numVal = val >= 0 ? [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,1,6,3,1][val] : 0
                    return numVal > 0 ? `${ch.toUpperCase()}(${numVal})` : null
                  }).filter(Boolean).join(' + ')} = <strong>{num}</strong>
                </p>
                <p className="text-[10px] text-muted-foreground/70 mt-2 italic">
                  Die Numerologie ist keine Wissenschaft, sondern ein spielerischer Blick auf Namen. Bitte nicht zu ernst nehmen!
                </p>
              </div>

              {/* Element & Planet */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Element</p>
                  <p className="text-sm font-medium mt-0.5">{numData.element}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 border border-border">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Planet</p>
                  <p className="text-sm font-medium mt-0.5">{numData.planet}</p>
                </div>
              </div>

              {/* Glücksfarbe */}
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Glücksfarbe</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: numData.colorHex }} />
                    <span className="text-sm font-medium">{numData.color}</span>
                  </div>
                </div>
              </div>

              {/* Vowel Energy */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                <Star className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Klangenergie</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{getVowelEnergy(name)}</p>
                </div>
              </div>

              {/* Name Length */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                <Hash className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Namenslänge ({name.length} Buchstaben)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{getNameLength(name)}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Link to detail page for DB names */}
      {data && (
        <div className="px-6 py-4 border-t border-border">
          <Link
            href={`/name/${encodeURIComponent(name.toLowerCase())}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
          >
            <MapPin className="w-4 h-4" />
            Zur vollständigen Detailseite für {name}
          </Link>
        </div>
      )}

      {/* Share CTA */}
      <div className="px-6 py-4 border-t border-border bg-gradient-to-r from-[hsl(340,75%,55%/0.05)] to-[hsl(262,60%,55%/0.05)]">
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Heart className="w-4 h-4" />
          Ergebnis mit anderen werdenden Eltern teilen
        </button>
      </div>
    </motion.div>
  )
}
