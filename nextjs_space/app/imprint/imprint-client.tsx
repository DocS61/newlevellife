'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export function ImprintClient() {
  const body = `Angaben gemäß § 5 TMG

[Ihr Vorname Nachname]
[Straße Hausnummer]
[PLZ Ort]
[Land]

Kontakt:
E-Mail: [ihre-email@example.com]

Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:
[Ihr Vorname Nachname]
[Adresse wie oben]

Haftungsausschluss:
Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Die Namensanalysen dienen ausschließlich der Unterhaltung und stellen keine professionelle Beratung dar.`

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[hsl(262,60%,55%)]" />
            <h1 className="font-display text-3xl font-bold tracking-tight">Impressum</h1>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{body}</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
