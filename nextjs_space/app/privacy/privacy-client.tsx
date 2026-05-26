'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export function PrivacyClient() {
  const sections = [
    { heading: '1. Verantwortlicher', text: '[Ihr Name / Ihre Firma]\n[Ihre Adresse]\n[Ihre E-Mail-Adresse]\n\nDer Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die oben genannte Person/Firma.' },
    { heading: '2. Erhebung und Speicherung personenbezogener Daten', text: 'Beim Besuch dieser Website werden automatisch Informationen durch den Browser übermittelt (Server-Logfiles). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.' },
    { heading: '3. Cookies', text: 'Diese Website verwendet ausschließlich technisch notwendige Cookies und speichert Präferenzen (Cookie-Einwilligung) lokal im Browser (localStorage). Es werden keine Tracking-Cookies ohne Einwilligung gesetzt.' },
    { heading: '4. Analysetools und Werbung', text: 'Diese Website kann Google AdSense verwenden, um Anzeigen zu schalten. Google AdSense verwendet Cookies, um für die Besucher relevante Anzeigen zu schalten. Die Verwendung solcher Cookies erfolgt nur nach vorheriger Einwilligung.' },
    { heading: '5. Ihre Rechte', text: 'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung. Ferner haben Sie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.' },
    { heading: '6. Hosting', text: 'Diese Website wird auf Servern in Deutschland (Hetzner Online GmbH) gehostet. Die Datenverarbeitung erfolgt ausschließlich innerhalb der EU/des EWR.' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-[hsl(340,75%,55%)]" />
            <h1 className="font-display text-3xl font-bold tracking-tight">Datenschutzerklärung</h1>
          </div>
          <div className="space-y-6">
            {sections.map((s: any) => (
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
