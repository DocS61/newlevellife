'use client'

import { NameSearch } from './name-search'
import { PopularNames } from './popular-names'
import { RecentSearches } from './recent-searches'
import { AdPlaceholder } from './ad-placeholder'
import { Header } from './header'
import { Footer } from './footer'
import { CookieBanner } from './cookie-banner'
import { TopNamesSection } from './top-names-section'
import { Baby, Shield, Globe, Briefcase, TrendingUp, Search, BarChart3, CheckCircle, Lightbulb, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const faqData = [
  {
    q: 'Was genau misst der Namen-Reue-Rechner?',
    a: 'Der Namen-Reue-Rechner analysiert jeden Babynamen in vier Kategorien: Mobbing-Risiko (Potenzial für Hänseleien), Aussprache-Schwierigkeit (internationale Verständlichkeit), Karriere-Risiko (berufliche Wahrnehmung) und Trend-Risiko (Zeitlosigkeit vs. Modename). Aus diesen vier Werten wird ein Gesamt-Reue-Score von 0 bis 100 berechnet.'
  },
  {
    q: 'Wie wird der Gesamt-Reue-Score berechnet?',
    a: 'Der Gesamt-Reue-Score (0–100) ist ein gewichteter Durchschnitt der vier Einzelkategorien. Mobbing-Risiko wird am stärksten gewichtet, da es die größten emotionalen Auswirkungen hat. Ein niedriger Score bedeutet wenig Risiko – der Name ist eine sichere Wahl. Ein hoher Score deutet auf potenzielle Probleme hin.'
  },
  {
    q: 'Wie lese ich die Einzelbewertungen richtig?',
    a: 'Alle Scores folgen dem Prinzip: Je niedriger, desto besser. Grün (0–3) bedeutet „unbedenklich", Gelb (4–6) heißt „beachtenswert" und Rot (7–10) signalisiert „kritisch". Ein Mobbing-Risiko von 2/10 bedeutet also, dass der Name kaum Angriffsfläche für Hänseleien bietet.'
  },
  {
    q: 'Wie viele Namen sind in der Datenbank?',
    a: 'Unsere Datenbank enthält über 160 sorgfältig analysierte Namen aus dem DACH-Raum (Deutschland, Österreich, Schweiz). Jeder Name wurde individuell bewertet. Für Namen, die nicht in der Datenbank sind, erstellt unsere KI eine Echtzeitanalyse auf Basis der gleichen Bewertungskriterien.'
  },
  {
    q: 'Ist die Analyse wirklich kostenlos?',
    a: 'Ja, die Nutzung des Namen-Reue-Rechners ist vollständig kostenlos. Du kannst so viele Namen analysieren, wie du möchtest – ohne Registrierung und ohne versteckte Kosten.'
  },
  {
    q: 'Kann ich auch prüfen, ob Vor- und Nachname zusammenpassen?',
    a: 'Ja! Gib einfach den gewünschten Nachnamen im optionalen Feld unter dem Vornamen ein. Wir prüfen dann automatisch die Klangharmonie, Alliterationen, Reimgefahr, Silbenrhythmus und ob die Initialen ein unglückliches Kürzel ergeben.'
  },
  {
    q: 'Kann ich dem Ergebnis vertrauen?',
    a: 'Die Analyse basiert auf linguistischen, kulturellen und statistischen Daten. Sie soll als Orientierungshilfe dienen, nicht als endgültige Bewertung. Letztlich ist die Namenswahl eine sehr persönliche Entscheidung – unser Tool hilft dir, potenzielle Risiken zu erkennen, die du vielleicht übersehen hättest.'
  },
]

const funFacts = [
  'In Deutschland dürfen Standesbeamte einen Vornamen ablehnen, wenn er dem Kindeswohl schadet.',
  'Der Name „Kevin" wird in Studien häufig mit niedrigeren Erwartungen von Lehrkräften assoziiert – das sogenannte „Kevinismus"-Phänomen.',
  'Emma und Noah sind seit Jahren die beliebtesten Babynamen in Deutschland.',
  'In der Schweiz sind Namen wie Beat, Urs und Regula gängig – in Deutschland kennt sie kaum jemand.',
  'Über 60 % der Deutschen wünschen sich rückblickend, sich länger mit der Namenswahl beschäftigt zu haben.',
  'Kurze Namen mit 4–5 Buchstaben sind international am leichtesten auszusprechen.',
]

export function HomepageClient() {
  const features = [
    { icon: Shield, label: 'Mobbing-Risiko', desc: 'Wie hoch ist die Gefahr für Hänseleien?', color: 'hsl(0, 84%, 60%)' },
    { icon: Globe, label: 'Aussprache-Schwierigkeit', desc: 'Ist der Name weltweit verständlich?', color: 'hsl(262, 60%, 55%)' },
    { icon: Briefcase, label: 'Karriere-Risiko', desc: 'Wirkt der Name professionell?', color: 'hsl(43, 74%, 50%)' },
    { icon: TrendingUp, label: 'Trend-Risiko', desc: 'Zeitlos oder kurzlebiger Trend?', color: 'hsl(170, 60%, 45%)' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(340,75%,55%/0.1)] border border-[hsl(340,75%,55%/0.2)] mb-6">
              <Baby className="w-4 h-4 text-[hsl(340,75%,55%)]" />
              <span className="text-xs font-medium text-[hsl(340,75%,55%)]">
                Kostenlose Namensanalyse
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              Wird dein Kind seinen Namen{' '}
              <span className="gradient-text">bereuen?</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
              Analysiere jeden Babynamen auf Mobbing-Risiko, Karrierewirkung, internationale Aussprache und aktuelle Trends – bevor du dich festlegst.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NameSearch />
          </motion.div>
        </div>
      </section>

      {/* Ad below hero */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        <AdPlaceholder position="hero-below" />
      </div>

      {/* Features */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f: any, i: number) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border hover:border-[hsl(340,75%,55%/0.2)] transition-all group"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <f.icon className="w-6 h-6 mb-3 transition-colors" style={{ color: f.color }} />
              <h3 className="text-sm font-semibold mb-1">{f.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Wie funktioniert es? */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">Wie funktioniert es?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">In drei einfachen Schritten zur fundierten Namensanalyse</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Search, step: '1', title: 'Name eingeben', desc: 'Gib den gewünschten Babynamen in das Suchfeld ein. Optional kannst du auch den Nachnamen angeben für einen Kombinations-Check.' },
            { icon: BarChart3, step: '2', title: 'Analyse erhalten', desc: 'Der Name wird in vier Kategorien bewertet: Mobbing-Risiko, Aussprache-Schwierigkeit, Karriere-Risiko und Trend-Risiko. Je niedriger der Wert, desto besser.' },
            { icon: CheckCircle, step: '3', title: 'Entscheidung treffen', desc: 'Vergleiche verschiedene Namen und triff eine informierte Entscheidung. Teile die Ergebnisse mit deinem Partner oder deiner Familie.' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 rounded-xl bg-card border border-border"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] flex items-center justify-center text-white font-bold text-lg mb-4">
                {s.step}
              </div>
              <s.icon className="w-5 h-5 text-muted-foreground mb-2" />
              <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top 10 Names */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <TopNamesSection />
      </section>

      {/* Popular & Recent in 2 column layout on desktop */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <PopularNames />
            <AdPlaceholder position="between-results" />
            <RecentSearches />
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AdPlaceholder position="sidebar" />
            </div>
          </div>
        </div>
      </section>

      {/* Wusstest du schon? */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            Wusstest du schon?
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {funFacts.map((fact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30"
            >
              <p className="text-sm leading-relaxed">{fact}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ad before FAQ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        <AdPlaceholder position="between-results" />
      </div>

      {/* FAQ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[hsl(262,60%,55%)]" />
            Häufig gestellte Fragen
          </h2>
        </motion.div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-xl border border-border bg-card overflow-hidden"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <summary className="px-5 py-4 cursor-pointer font-medium text-sm sm:text-base flex items-center justify-between gap-2 hover:bg-muted/30 transition-colors list-none [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="text-muted-foreground shrink-0 transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      <Footer />
      <CookieBanner />

      {/* FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  )
}
