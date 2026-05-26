'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export function ImprintClient() {
  const sections = [
    {
      heading: 'Angaben gemäß § 5 DDG',
      text: 'Dr. Hartmut Sauer\nWeithartstraße 6\n88512 Mengen\nDeutschland'
    },
    {
      heading: 'Kontakt',
      text: 'E-Mail: hello@new-level-life.de\n\nBitte nutzen Sie für sämtliche Anfragen ausschließlich die oben genannte E-Mail-Adresse. Wir bemühen uns, Ihre Anfrage innerhalb von 48 Stunden zu beantworten.'
    },
    {
      heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
      text: 'Dr. Hartmut Sauer\nWeithartstraße 6\n88512 Mengen'
    },
    {
      heading: 'Haftung für Inhalte',
      text: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nDie Namensanalysen und alle weiteren Auswertungen auf dieser Website dienen ausschließlich der Unterhaltung und stellen keine professionelle Beratung dar.'
    },
    {
      heading: 'Haftung für Links',
      text: 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.'
    },
    {
      heading: 'Urheberrecht',
      text: 'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.'
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[hsl(262,60%,55%)]" />
            <h1 className="font-display text-3xl font-bold tracking-tight">Impressum</h1>
          </div>
          <div className="space-y-6">
            {sections.map((s) => (
              <div key={s.heading} className="p-5 rounded-xl bg-card border border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <h2 className="font-semibold mb-2">{s.heading}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
