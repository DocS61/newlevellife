'use client'

import { NameData } from '@/lib/types'
import { NameResultCard } from '@/components/name-result-card'
import NameContentSection from '@/components/name-content-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

import { ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface NamePageClientProps {
  nameData: NameData
  relatedNames: NameData[]
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
            <NameResultCard data={nameData} hideDetailLink />

            <NameContentSection data={nameData} />

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
              name: 'Namensreue',
            },
          }),
        }}
      />
    </div>
  )
}