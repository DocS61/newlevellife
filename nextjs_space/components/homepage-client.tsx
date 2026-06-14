'use client'

import { NameSearch } from './name-search'
import { PopularNames } from './popular-names'
import { RecentSearches } from './recent-searches'
import { AdPlaceholder } from './ad-placeholder'
import { Header } from './header'
import { Footer } from './footer'
import { InstallPrompt } from './install-prompt'
import { TopNamesSection } from './top-names-section'
import { blogArticles } from '@/lib/blog-data'
import Link from 'next/link'
import { Baby, Shield, Globe, Briefcase, TrendingUp, Search, BarChart3, CheckCircle, Lightbulb, HelpCircle, Heart, Share2, BookOpen, ArrowRight, Users, Layers, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

const faqData = [
  {
    q: 'Was genau misst Namensreue?',
    a: 'Namensreue analysiert jeden Babynamen in vier Kategorien: Mobbing-Risiko (Potenzial für Hänseleien), Aussprache-Schwierigkeit (internationale Verständlichkeit), Karriere-Risiko (berufliche Wahrnehmung) und Trend-Risiko (Zeitlosigkeit vs. Modename). Aus diesen vier Werten wird ein Gesamt-Reue-Score von 0 bis 100 berechnet.'
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
    q: 'Kann ich prüfen, ob Vorname und Nachname zusammenpassen?',
    a: 'Ja! Klicke einfach auf „Nachnamen für Kombinations-Check hinzufügen" unter dem Suchfeld. Wir prüfen dann automatisch, ob sich die Namen reimen, ob die Abkürzung (Initialen) problematisch ist, ob die Anfangslaute gleich klingen, wie der Sprechrhythmus ist und ob Vorname und Nachname kulturell zusammenpassen.'
  },
  {
    q: 'Wie viele Namen sind in der Datenbank?',
    a: 'Unsere Datenbank enthält über 450 sorgfältig analysierte Namen aus dem DACH-Raum (Deutschland, Österreich, Schweiz). Jeder Name wurde individuell bewertet. Für Namen, die nicht in der Datenbank sind, erstellt unsere KI eine Echtzeitanalyse auf Basis der gleichen Bewertungskriterien.'
  },
  {
    q: 'Ist die Analyse wirklich kostenlos?',
    a: 'Ja, die Nutzung von Namensreue ist vollständig kostenlos. Du kannst so viele Namen analysieren, wie du möchtest – ohne Registrierung und ohne versteckte Kosten.'
  },
  {
    q: 'Kann ich auch Doppelnamen prüfen?',
    a: 'Ja! Klicke auf „+ Zweitname für Doppelname-Check“ unter dem Suchfeld. Wir prüfen dann, ob die beiden Vornamen als Doppelname harmonieren: Lautübergang, Silbenrhythmus, Stilkonsistenz und Gesamtlänge. Wenn du zusätzlich einen Nachnamen angibst, analysieren wir auch den Dreier-Rhythmus (z.B. Anna-Sophie Müller).'
  },
  {
    q: 'Kann ich dem Ergebnis vertrauen?',
    a: 'Die Analyse basiert auf linguistischen, kulturellen und statistischen Daten. Sie soll als Orientierungshilfe dienen, nicht als endgültige Bewertung. Letztlich ist die Namenswahl eine sehr persönliche Entscheidung – unser Tool hilft dir, potenzielle Risiken zu erkennen, die du vielleicht übersehen hättest.'
  },
]

const funFacts = [
  { emoji: '🇩🇪', text: 'In Deutschland dürfen Standesbeamte einen Vornamen ablehnen, wenn er dem Kindeswohl schadet.', bg: 'from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40', border: 'border-blue-200 dark:border-blue-800/40' },
  { emoji: '📚', text: 'Der Name „Kevin" wird in Studien häufig mit niedrigeren Erwartungen von Lehrern assoziiert – das sogenannte „Kevinismus"-Phänomen.', bg: 'from-rose-100 to-pink-100 dark:from-rose-950/40 dark:to-pink-950/40', border: 'border-rose-200 dark:border-rose-800/40' },
  { emoji: '🏆', text: 'Emma und Noah sind seit Jahren die beliebtesten Babynamen in Deutschland.', bg: 'from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-yellow-950/40', border: 'border-amber-200 dark:border-amber-800/40' },
  { emoji: '🇨🇭', text: 'In der Schweiz sind Namen wie Beat, Urs und Regula gängig – in Deutschland kennt sie kaum jemand.', bg: 'from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-teal-950/40', border: 'border-emerald-200 dark:border-emerald-800/40' },
  { emoji: '🤔', text: 'Über 60 % der Deutschen wünschen sich rückblickend, sich länger mit der Namenswahl beschäftigt zu haben.', bg: 'from-violet-100 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40', border: 'border-violet-200 dark:border-violet-800/40' },
  { emoji: '🌍', text: 'Kurze Namen mit 4–5 Buchstaben sind international am leichtesten auszusprechen.', bg: 'from-sky-100 to-cyan-100 dark:from-sky-950/40 dark:to-cyan-950/40', border: 'border-sky-200 dark:border-sky-800/40' },
]

export function HomepageClient() {
  const features = [
    { icon: Shield, label: 'Mobbing-Risiko', desc: 'Wie hoch ist die Gefahr für Hänseleien?', gradient: 'from-red-500 to-rose-500', bgLight: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-200 dark:border-red-800/40' },
    { icon: Globe, label: 'Aussprache', desc: 'Ist der Name weltweit verständlich?', gradient: 'from-violet-500 to-purple-500', bgLight: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-200 dark:border-violet-800/40' },
    { icon: Briefcase, label: 'Karriere-Risiko', desc: 'Wirkt der Name professionell?', gradient: 'from-amber-500 to-orange-500', bgLight: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-200 dark:border-amber-800/40' },
    { icon: TrendingUp, label: 'Trend-Risiko', desc: 'Zeitlos oder kurzlebiger Trend?', gradient: 'from-emerald-500 to-teal-500', bgLight: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-200 dark:border-emerald-800/40' },
  ]

  const handleShareSite = async () => {
    const shareData = {
      title: 'Namensreue – Babynamen analysieren',
      text: 'Wird dein Kind seinen Namen bereuen? Kostenlose Namensanalyse auf Mobbing-Risiko, Karrierewirkung und mehr!',
      url: typeof window !== 'undefined' ? window.location.href : '',
    }
    try {
      if (navigator?.share) {
        await navigator.share(shareData)
      } else {
        await navigator?.clipboard?.writeText?.(shareData.url)
        toast.success('Link kopiert!')
      }
    } catch { /* user cancelled */ }
  }

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(340,75%,55%/0.1)] border border-[hsl(340,75%,55%/0.2)] mb-6">
              <Baby className="w-4 h-4 text-[hsl(340,75%,55%)]" />
              <span className="text-sm font-medium text-[hsl(340,75%,55%)]">
                Kostenlose Namensanalyse ohne Anmeldung
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              Wird dein Kind seinen Namen{' '}
              <span className="gradient-text">bereuen?</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
              Analysiere jeden Babynamen auf Mobbing-Risiko, Karrierewirkung, internationale Aussprache und Trends. <strong className="text-foreground">Neu: Prüfe auch, ob Vorname und Nachname zusammenpassen!</strong>
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
              className={`p-4 rounded-xl ${f.bgLight} border ${f.borderColor} hover:scale-[1.02] transition-all group`}
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-3`}>
                <f.icon className="w-4.5 h-4.5" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{f.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Editorial Intro */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          style={{ boxShadow: 'var(--shadow-sm)' }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Warum die Namenswahl so wichtig ist</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3 text-sm sm:text-base">
            <p>
              Ein Vorname begleitet dein Kind ein Leben lang – im Kindergarten, in der Schule, im Bewerbungsgespräch und auf der Visitenkarte. 
              Studien der Namensforschung (Onomastik) zeigen: Der Vorname beeinflusst, wie andere Menschen uns wahrnehmen, bevor sie uns kennenlernen. 
              Forscher der Universität Oldenburg wiesen nach, dass Lehrer bestimmte Vornamen unbewusst mit höherer oder niedrigerer Leistung verbinden.
            </p>
            <p>
              Genau hier setzt <strong className="text-foreground">Namensreue</strong> an. Unser Analyse-Tool bewertet jeden Babynamen in vier wissenschaftlich fundierten Kategorien: 
              Wie groß ist das Mobbing-Risiko? Klingt der Name im Berufsleben seriös? Ist er international aussprechbar? Und wird er in zehn Jahren veraltet wirken? 
              Aus diesen Einzelbewertungen entsteht ein Gesamt-Reue-Score, der dir auf einen Blick zeigt, wie zukunftssicher dein Wunschname ist.
            </p>
            <p>
              Die Datenbank umfasst über 450 sorgfältig analysierte Namen. Für Namen, die noch nicht enthalten sind, erstellt unsere KI in Echtzeit eine individuelle Analyse. 
              So kannst du auch ausgefallene oder regionale Namen prüfen – komplett kostenlos und ohne Registrierung.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Stats Counter */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Users, value: '450+', label: 'Analysierte Namen', color: 'text-[hsl(340,75%,55%)]' },
            { icon: Layers, value: '4', label: 'Bewertungskategorien', color: 'text-[hsl(262,60%,55%)]' },
            { icon: Sparkles, value: '100 %', label: 'Kostenlos & ohne Anmeldung', color: 'text-[hsl(170,60%,45%)]' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} shrink-0`} />
              <div>
                <p className="text-2xl font-bold font-display">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
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
            { icon: Search, step: '1', title: 'Name eingeben', desc: 'Gib den gewünschten Babynamen ein. Optional kannst du auch den Nachnamen angeben, um zu prüfen, ob die Kombination gut klingt.', gradient: 'from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)]' },
            { icon: BarChart3, step: '2', title: 'Analyse erhalten', desc: 'Der Name wird in vier Kategorien bewertet. Bei Angabe eines Nachnamens prüfen wir zusätzlich Klang, Reim, Rhythmus und kulturelle Passung.', gradient: 'from-[hsl(262,60%,55%)] to-[hsl(200,70%,50%)]' },
            { icon: CheckCircle, step: '3', title: 'Entscheidung treffen', desc: 'Vergleiche verschiedene Namen und teile die Ergebnisse mit deinem Partner oder deiner Familie.', gradient: 'from-[hsl(200,70%,50%)] to-[hsl(170,60%,45%)]' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative p-6 rounded-xl bg-card border border-border hover:border-[hsl(340,75%,55%/0.3)] transition-all"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${s.gradient} flex items-center justify-center text-white font-bold text-lg mb-4`}>
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

      {/* Popular & Recent */}
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

      {/* Blog Teaser */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6 text-[hsl(340,75%,55%)]" />
            Aus unserem Blog
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Ratgeber, Trends und Wissenswertes rund um Babynamen</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {blogArticles.slice(0, 3).map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="block p-5 rounded-xl border border-border bg-card hover:border-[hsl(340,75%,55%/0.3)] transition-all h-full"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <span className="text-3xl mb-3 block">{article.emoji}</span>
                <span
                  className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
                  style={{ backgroundColor: `${article.categoryColor}20`, color: article.categoryColor }}
                >
                  {article.category}
                </span>
                <h3 className="font-display font-semibold text-sm sm:text-base mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{article.description}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[hsl(340,75%,55%)] mt-3">
                  Weiterlesen <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
          >
            Alle Artikel ansehen
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Share CTA Banner */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-gradient-to-r from-[hsl(340,75%,55%)] via-[hsl(300,60%,50%)] to-[hsl(262,60%,55%)] p-6 sm:p-8 text-white text-center"
        >
          <Heart className="w-8 h-8 mx-auto mb-3 opacity-90" />
          <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">Kennst du andere werdende Eltern?</h2>
          <p className="text-sm opacity-90 mb-4 max-w-md mx-auto">Teile Namensreue – damit auch sie die bestmögliche Namenswahl treffen können!</p>
          <button
            onClick={handleShareSite}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-[hsl(340,75%,55%)] font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Jetzt teilen
          </button>
        </motion.div>
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
            <Lightbulb className="w-7 h-7 text-amber-500" />
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
              className={`p-5 rounded-xl bg-gradient-to-br ${fact.bg} border ${fact.border} hover:scale-[1.02] transition-transform`}
            >
              <span className="text-2xl mb-2 block">{fact.emoji}</span>
              <p className="text-sm leading-relaxed font-medium">{fact.text}</p>
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
      <InstallPrompt />


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
