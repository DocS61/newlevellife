'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Shield, Globe, Briefcase, TrendingUp, Info, AlertTriangle, Heart, BookOpen, Users, Sparkles, CheckCircle, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

export function AboutClient() {
  const categories = [
    { icon: Shield, title: 'Mobbing-Risiko (0–10)', text: 'Wir bewerten das Potenzial für Hänseleien, unerwünschte Spitznamen und phonetische Ähnlichkeiten mit negativen Wörtern – angepasst an den deutschen Sprachraum.', color: 'hsl(0, 84%, 60%)' },
    { icon: Globe, title: 'Internationale Aussprache (0–10)', text: 'Wie leicht lässt sich der Name in verschiedenen Sprachen aussprechen? Enthält er schwierige Laute oder Buchstabenkombinationen, die im Ausland Probleme bereiten?', color: 'hsl(262, 60%, 55%)' },
    { icon: Briefcase, title: 'Karrierewirkung (0–10)', text: 'Studien zeigen, dass Vornamen die Wahrnehmung im Berufsleben beeinflussen können. Wir schätzen ein, wie der Name in formellen Kontexten wirkt.', color: 'hsl(43, 74%, 50%)' },
    { icon: TrendingUp, title: 'Trend-Analyse (0–10)', text: 'Ist der Name ein kurzlebiger Hype oder ein zeitloser Klassiker? Wir analysieren Popularitätskurven und kulturelle Relevanz im DACH-Raum.', color: 'hsl(170, 60%, 45%)' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-16 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(262,60%,55%/0.1)] border border-[hsl(262,60%,55%/0.2)] mb-5">
                <Info className="w-4 h-4 text-[hsl(262,60%,55%)]" />
                <span className="text-xs font-medium text-[hsl(262,60%,55%)]">Über uns</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Über Namensreue</h1>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Namensreue wurde von einem kleinen Team aus Deutschland entwickelt – aus der Überzeugung, dass die Namenswahl für ein Kind eine der wichtigsten Entscheidungen ist, die Eltern treffen.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Unsere Mission */}
        <section className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[hsl(340,75%,55%/0.1)]">
                <Heart className="w-5 h-5 text-[hsl(340,75%,55%)]" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Unsere Mission</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Jedes Jahr stehen Hunderttausende werdende Eltern im deutschsprachigen Raum vor derselben Frage: <strong className="text-foreground">Welcher Name passt zu unserem Kind?</strong> Babynamen-Listen gibt es viele – aber kaum ein Tool, das einen Namen aus mehreren Perspektiven objektiv analysiert.
              </p>
              <p>
                Genau das macht Namensreue. Unser Algorithmus prüft jeden Namen auf vier entscheidende Kriterien und berücksichtigt dabei linguistische, kulturelle und gesellschaftliche Faktoren. Ergänzt wird die Analyse durch künstliche Intelligenz, die zusätzliche Kontexte einbezieht.
              </p>
            </div>
          </motion.div>

          {/* Methodik */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[hsl(262,60%,55%/0.1)]">
                <BookOpen className="w-5 h-5 text-[hsl(262,60%,55%)]" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Unsere Methodik</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Unsere Analyse basiert auf vier Schlüsselkategorien, die jeweils auf einer Skala von 0 bis 10 bewertet werden. Der Gesamt-Reue-Score (0–100) ergibt sich aus dem gewichteten Durchschnitt dieser Kategorien. Niedrige Werte sind dabei immer besser.
            </p>
          </motion.div>

          <div className="space-y-5">
            {categories.map((s, i) => (
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

          {/* Datengrundlage */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[hsl(170,60%,45%/0.1)]">
                <Sparkles className="w-5 h-5 text-[hsl(170,60%,45%)]" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Datengrundlage & Technik</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Unsere Datenbank umfasst über <strong className="text-foreground">450 sorgfältig kuratierte Namen</strong> aus dem DACH-Raum – von zeitlosen Klassikern bis zu modernen Trendnamen. Jeder Name wurde manuell geprüft und mit Herkunft, Bedeutung und Analyse-Scores versehen.
              </p>
              <p>
                Für Namen, die nicht in unserer Datenbank enthalten sind, nutzen wir KI-gestützte Echtzeit-Analyse, die den Namen nach denselben vier Kriterien bewertet. Zusätzlich bieten wir eine phonetische Kombinations-Analyse für Vor- und Nachnamen sowie Doppelnamen.
              </p>
            </div>
          </motion.div>

          {/* Wer wir sind */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[hsl(43,74%,50%/0.1)]">
                <Users className="w-5 h-5 text-[hsl(43,74%,50%)]" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Wer steckt dahinter?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Hinter Namensreue steht ein kleines, unabhängiges Team aus Deutschland mit Hintergrund in <strong className="text-foreground">Sprachwissenschaft, Softwareentwicklung und Datenanalyse</strong>. Wir kombinieren linguistisches Fachwissen mit modernen Technologien, um Eltern eine fundierte, datenbasierte Entscheidungshilfe zu bieten.
              </p>
              <p>
                Das Projekt entstand aus einer persönlichen Erfahrung: Als werdende Eltern suchten wir nach einem Tool, das über bloße Namenslisten hinausgeht und einen Namen wirklich analysiert – auf Klang, gesellschaftliche Wirkung und potenzielle Risiken. Da es kein solches Tool gab, haben wir es selbst entwickelt.
              </p>
              <p>
                Namensreue ist ein unabhängiges, werbefreies Projekt, das auf deutschen Servern gehostet wird und höchsten Wert auf Datenschutz legt. Wir speichern keine persönlichen Suchanfragen und verfolgen kein Nutzerverhalten. Unsere Finanzierung erfolgt transparent – ohne versteckte Kosten für die Nutzer.
              </p>
            </div>
          </motion.div>

          {/* Redaktionelle Leitlinien */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[hsl(170,60%,45%/0.1)]">
                <CheckCircle className="w-5 h-5 text-[hsl(170,60%,45%)]" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Unsere Qualitätsprinzipien</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Quellenbasierte Inhalte', desc: 'Unsere Analysen und Blogartikel stützen sich auf wissenschaftliche Studien, offizielle Statistiken und linguistische Fachliteratur. Wir kennzeichnen Quellen transparent.' },
                { title: 'Regelmäßige Aktualisierung', desc: 'Unsere Namensdatenbank und Popularitäts-Scores werden regelmäßig aktualisiert, um aktuelle Trends und Entwicklungen abzubilden.' },
                { title: 'Transparenz & Nachvollziehbarkeit', desc: 'Alle Bewertungskriterien sind offen dokumentiert. Wir erklären, wie jeder Score berechnet wird und welche Faktoren einfließen.' },
                { title: 'Datenschutz & Unabhängigkeit', desc: 'Wir erheben keine persönlichen Daten, setzen keine Tracking-Cookies ein und sind von keinem Namensbuch-Verlag oder Agentur abhängig.' },
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-card border border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
                  <h3 className="font-semibold text-sm mb-1.5">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quellen & Referenzen */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="mt-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-lg bg-[hsl(262,60%,55%/0.1)]">
                <ExternalLink className="w-5 h-5 text-[hsl(262,60%,55%)]" />
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight">Quellen & Referenzen</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <ul className="space-y-2.5">
                {[
                  { title: 'Gesellschaft für deutsche Sprache: Vornamen-Statistik', url: 'https://gfds.de/vornamen/', pub: 'GfdS e.\u202fV.' },
                  { title: 'Vornamen-Studie: Lehrererwartungen und Vorurteile', url: 'https://www.uni-oldenburg.de/presse/aktuell/414/', pub: 'Universität Oldenburg' },
                  { title: 'Dorian-Gray-Effekt: Vornamen beeinflussen das Aussehen', url: 'https://doi.org/10.1037/pspa0000076', pub: 'Journal of Personality and Social Psychology (2017)' },
                  { title: 'Beliebte Vornamen: Jahresstatistiken seit 1890', url: 'https://www.beliebte-vornamen.de/', pub: 'Knud Bielefeld / beliebte-vornamen.de' },
                  { title: 'Standesamt und Namensrecht in Deutschland', url: 'https://www.bmi.bund.de/', pub: 'Bundesministerium des Innern' },
                  { title: 'Vorname – Onomastik und Geschichte', url: 'https://de.wikipedia.org/wiki/Vorname', pub: 'Wikipedia / Wikimedia Foundation' },
                ].map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="text-[hsl(340,75%,55%)] hover:underline">{s.title}</a>{' – '}{s.pub}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Hinweis */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>Hinweis:</strong> Alle Bewertungen dienen der Unterhaltung und Information. Die endgültige Namenswahl ist eine persönliche Entscheidung, die wir respektieren – egal, wie der Score ausfällt.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
