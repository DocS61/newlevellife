'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n/context'
import { FileText } from 'lucide-react'
import { motion } from 'framer-motion'

export function ImprintClient() {
  const { locale } = useI18n()

  const content: Record<string, { title: string; body: string }> = {
    de: {
      title: 'Impressum',
      body: `Angaben gemäß § 5 TMG

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
Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Die Namensanalysen dienen ausschließlich der Unterhaltung und stellen keine professionelle Beratung dar.`,
    },
    en: {
      title: 'Imprint',
      body: `Information according to § 5 TMG (German Telemedia Act)

[Your First Last Name]
[Street Number]
[Zip City]
[Country]

Contact:
Email: [your-email@example.com]

Responsible for content according to § 55 Abs. 2 RStV:
[Your First Last Name]
[Address as above]

Disclaimer:
The contents of this website have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. The name analyses are for entertainment purposes only and do not constitute professional advice.`,
    },
    es: {
      title: 'Aviso Legal',
      body: `Información según § 5 TMG (Ley Alemana de Telemedios)

[Su Nombre Apellido]
[Calle Número]
[Código Postal Ciudad]
[País]

Contacto:
Email: [su-email@example.com]

Responsable del contenido según § 55 Abs. 2 RStV:
[Su Nombre Apellido]
[Dirección como arriba]

Aviso legal:
Los contenidos de este sitio web han sido creados con el mayor cuidado. Sin embargo, no podemos garantizar la exactitud, integridad o actualidad del contenido. Los análisis de nombres son únicamente con fines de entretenimiento y no constituyen asesoramiento profesional.`,
    },
  }

  const c = content[locale] ?? content.de

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[hsl(262,60%,55%)]" />
            <h1 className="font-display text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <div className="p-6 rounded-xl bg-card border border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{c.body}</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
