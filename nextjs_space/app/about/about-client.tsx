'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Globe, Briefcase, TrendingUp, Info, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export function AboutClient() {
  const sections = [
    { icon: Shield, title: 'Mobbing-Risiko (0-10)', text: 'Wir bewerten das Potenzial für Hänseleien, unerwünschte Spitznamen und phonetische Ähnlichkeiten mit negativen Wörtern in mehreren Sprachen.', color: 'hsl(0, 84%, 60%)' },
    { icon: Globe, title: 'Internationale Aussprache (0-10)', text: 'Wie leicht kann der Name in verschiedenen Sprachen und Kulturen ausgesprochen werden? Enthält er schwierige Laute oder ungewöhnliche Buchstabenkombinationen?', color: 'hsl(262, 60%, 55%)' },
    { icon: Briefcase, title: 'Karrierewirkung (0-10)', text: 'Studien zeigen, dass Namen die Wahrnehmung in beruflichen Kontexten beeinflussen können. Wir bewerten, wie der Name in formellen Umgebungen wirkt.', color: 'hsl(43, 74%, 50%)' },
    { icon: TrendingUp, title: 'Trend-Analyse (0-10)', text: 'Ist der Name ein kurzlebiger Trend oder ein zeitloser Klassiker? Wir analysieren Popularitätskurven und kulturelle Relevanz.', color: 'hsl(170, 60%, 45%)' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-gradient">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-16 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(262,60%,55%/0.1)] border border-[hsl(262,60%,55%/0.2)] mb-5">
                <Info className="w-4 h-4 text-[hsl(262,60%,55%)]" />
                <span className="text-xs font-medium text-[hsl(262,60%,55%)]">Über uns</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Über den Namen-Reue-Rechner</h1>
              <p className="text-muted-foreground leading-relaxed">Der Namen-Reue-Rechner hilft werdenden Eltern, fundierte Entscheidungen bei der Namenswahl zu treffen.</p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Unsere Methodik</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">Unsere Analyse basiert auf vier Schlüsselkategorien, die jeweils auf einer Skala von 0 bis 10 bewertet werden. Der Gesamt-Reue-Score (0-100) ergibt sich aus dem gewichteten Durchschnitt dieser Kategorien.</p>
          </motion.div>

          <div className="space-y-5">
            {sections.map((s: any, i: number) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-5 rounded-xl bg-card border border-border"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-muted flex-shrink-0">
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">Hinweis: Alle Bewertungen dienen der Unterhaltung und Information. Die endgültige Namenwahl ist eine persönliche Entscheidung.</p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
