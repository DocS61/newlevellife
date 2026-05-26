'use client'

import { NameData } from '@/lib/types'
import { NameResultCard } from '@/components/name-result-card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CookieBanner } from '@/components/cookie-banner'
import { AdPlaceholder } from '@/components/ad-placeholder'
import { ArrowLeft, ChevronRight, Sparkles, Hash, Palette, Star, Heart } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NamePageClientProps {
  nameData: NameData
  relatedNames: NameData[]
}

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
  // Reduce to single digit (1-9)
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
  if (ratio >= 0.5) return 'Sehr hohe Vokalenergie – der Name klingt offen, warm und einladend. Menschen mit vokalreichen Namen wirken oft besonders zugänglich.'
  if (ratio >= 0.35) return 'Ausgeglichene Vokalenergie – der Name hat eine harmonische Klangbalance zwischen Weichheit und Stärke.'
  return 'Starke Konsonantenenergie – der Name klingt kraftvoll und bestimmt. Das verleiht ihm eine natürliche Autorität.'
}

function getNameLength(name: string): string {
  if (name.length <= 4) return 'Kurzer Name (≤ 4 Buchstaben) – wirkt direkt, modern und einprägsam. Wird selten abgekürzt.'
  if (name.length <= 6) return 'Mittellanger Name (5-6 Buchstaben) – ideal für Alltagstauglichkeit, bietet Abkürzungsmöglichkeiten.'
  return 'Langer Name (7+ Buchstaben) – klingt elegant und feierlich, wird im Alltag oft abgekürzt.'
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

export function NamePageClient({ nameData, relatedNames }: NamePageClientProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <NameResultCard data={nameData} />

            <AdPlaceholder position="between-results" />

            {/* SEO Text Block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <h2 className="font-display text-lg font-semibold mb-3">
                Der Name {nameData.name} im Detail
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  <strong>{nameData.name}</strong> ist ein {nameData.gender === 'm' ? 'männlicher' : nameData.gender === 'f' ? 'weiblicher' : 'geschlechtsneutraler'} Vorname
                  mit {nameData.origin.toLowerCase().includes('deutsch') ? 'deutschen' : nameData.origin.toLowerCase()} Wurzeln.
                  Die Bedeutung des Namens ist „{nameData.meaningDe}“.
                </p>
                <p>
                  In unserer Analyse erreicht {nameData.name} einen Gesamt-Reue-Score von <strong className={getScoreColor(nameData.overallRegret)}>{nameData.overallRegret} von 100</strong>.
                  {nameData.overallRegret <= 30
                    ? ' Das bedeutet, dieser Name ist eine ausgezeichnete Wahl mit sehr geringem Risikopotenzial.'
                    : nameData.overallRegret <= 60
                    ? ' Das deutet auf einige Aspekte hin, die Eltern bedenken sollten, insgesamt aber ein akzeptabler Name.'
                    : ' Das signalisiert erhöhtes Risikopotenzial in mehreren Kategorien. Eine sorgfältige Abwägung ist empfehlenswert.'}
                </p>
                {nameData.yearPeak && (
                  <p>
                    Der Name {nameData.name} hatte sein Beliebtheitshoch um {nameData.yearPeak}.
                    {nameData.trendScore <= 3
                      ? ' Trotzdem gilt er als zeitlos und nicht an einen kurzlebigen Trend gebunden.'
                      : nameData.trendScore <= 6
                      ? ' Er zeigt moderate Schwankungen in der Beliebtheit.'
                      : ' Er ist stark mit einem bestimmten Zeitraum assoziiert und könnte als Modename wahrgenommen werden.'}
                  </p>
                )}
                <p>{nameData.explanationDe}</p>
              </div>
            </motion.div>

            {/* Nomen est Omen Section */}
            {(() => {
              const num = calcNumerology(nameData.name)
              const data = numerologyData[num]
              return (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="px-6 py-4 border-b border-border bg-gradient-to-r from-[hsl(262,60%,55%/0.08)] to-[hsl(340,75%,55%/0.08)]">
                    <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[hsl(262,60%,55%)]" />
                      Nomen est Omen – {nameData.name} esoterisch betrachtet
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Numerologische und symbolische Deutung – zur Unterhaltung, nicht als Lebensberatung 😉
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Numerology Number */}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[hsl(262,60%,55%)] to-[hsl(340,75%,55%)] flex items-center justify-center">
                        <span className="text-white font-display text-2xl font-bold">{num}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm flex items-center gap-1.5">
                          <Hash className="w-3.5 h-3.5 text-muted-foreground" />
                          Namenszahl: {num} – {data.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Die Buchstaben von <strong>{nameData.name}</strong> ergeben die Namenszahl <strong>{num}</strong>.
                          Diese Zahl steht für: <em>{data.strength}</em>.
                        </p>
                      </div>
                    </div>

                    {/* Grid of esoteric properties */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Traits */}
                      <div className="rounded-lg bg-muted/40 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Persönlichkeit</span>
                        </div>
                        <p className="text-sm font-medium">{data.traits}</p>
                      </div>

                      {/* Element */}
                      <div className="rounded-lg bg-muted/40 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Element & Planet</span>
                        </div>
                        <p className="text-sm font-medium">{data.element} · {data.planet}</p>
                      </div>

                      {/* Color */}
                      <div className="rounded-lg bg-muted/40 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Palette className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Namensfarbe</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full border border-border" style={{ backgroundColor: data.colorHex }} />
                          <span className="text-sm font-medium">{data.color}</span>
                        </div>
                      </div>

                      {/* Name Length */}
                      <div className="rounded-lg bg-muted/40 p-4">
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-xs">✏️</span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Namenslänge</span>
                        </div>
                        <p className="text-sm font-medium">{nameData.name.length} Buchstaben</p>
                      </div>
                    </div>

                    {/* Vowel Energy */}
                    <div className="rounded-lg border border-border/50 bg-gradient-to-r from-[hsl(262,60%,55%/0.04)] to-transparent p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>🔮 Klangenergie:</strong> {getVowelEnergy(nameData.name)}
                      </p>
                    </div>

                    {/* Name length analysis */}
                    <div className="rounded-lg border border-border/50 bg-gradient-to-r from-[hsl(340,75%,55%/0.04)] to-transparent p-4">
                      <p className="text-sm text-muted-foreground">
                        <strong>📏 Längenanalyse:</strong> {getNameLength(nameData.name)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdPlaceholder position="sidebar" />

            {/* Related Names */}
            {relatedNames.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-border bg-card overflow-hidden"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="px-5 py-4 border-b border-border">
                  <h3 className="font-display font-semibold text-sm">Ähnliche Namen</h3>
                </div>
                <div className="divide-y divide-border">
                  {relatedNames.map(name => (
                    <Link
                      key={name.id}
                      href={`/name/${name.name.toLowerCase()}`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors"
                    >
                      <span className="text-sm font-medium">{name.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${getScoreBg(name.overallRegret)} ${getScoreColor(name.overallRegret)}`}>
                          {name.overallRegret}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <div className="rounded-xl border border-border bg-gradient-to-br from-[hsl(340,75%,55%/0.05)] to-[hsl(262,60%,55%/0.05)] p-5 text-center">
              <p className="text-sm font-medium mb-2">Anderen Namen analysieren?</p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Zur Namenssuche
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA to homepage */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite – Weitere Namen analysieren
          </Link>
        </motion.div>
      </main>

      <Footer />
      <CookieBanner />

      {/* Schema.org JSON-LD for this name */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${nameData.name} – Namensanalyse & Bedeutung`,
            description: `Detaillierte Analyse des Babynamens ${nameData.name}: Herkunft, Bedeutung und Risikobewertung.`,
            author: {
              '@type': 'Organization',
              name: 'Namen-Reue-Rechner',
            },
          }),
        }}
      />
    </div>
  )
}
