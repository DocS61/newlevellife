'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n/context'
import { ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export function PrivacyClient() {
  const { locale } = useI18n()

  const content: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
    de: {
      title: 'Datenschutzerklärung',
      sections: [
        { heading: '1. Verantwortlicher', text: '[Ihr Name / Ihre Firma]\n[Ihre Adresse]\n[Ihre E-Mail-Adresse]\n\nDer Verantwortliche im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die oben genannte Person/Firma.' },
        { heading: '2. Erhebung und Speicherung personenbezogener Daten', text: 'Beim Besuch dieser Website werden automatisch Informationen durch den Browser übermittelt (Server-Logfiles). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.' },
        { heading: '3. Cookies', text: 'Diese Website verwendet ausschließlich technisch notwendige Cookies und speichert Präferenzen (Sprache, Cookie-Einwilligung) lokal im Browser (localStorage). Es werden keine Tracking-Cookies ohne Einwilligung gesetzt.' },
        { heading: '4. Analysetools und Werbung', text: 'Diese Website kann Google AdSense verwenden, um Anzeigen zu schalten. Google AdSense verwendet Cookies, um für die Besucher relevante Anzeigen zu schalten. Die Verwendung solcher Cookies erfolgt nur nach vorheriger Einwilligung.' },
        { heading: '5. Ihre Rechte', text: 'Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung. Ferner haben Sie das Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.' },
        { heading: '6. Hosting', text: 'Diese Website wird auf Servern in Deutschland (Hetzner Online GmbH) gehostet. Die Datenverarbeitung erfolgt ausschließlich innerhalb der EU/des EWR.' },
      ],
    },
    en: {
      title: 'Privacy Policy',
      sections: [
        { heading: '1. Responsible Party', text: '[Your Name / Company]\n[Your Address]\n[Your Email]\n\nThe responsible party for data processing on this website is the person/company named above.' },
        { heading: '2. Data Collection', text: 'When visiting this website, information is automatically transmitted by the browser (server log files). This data is not merged with other data sources. Data processing is based on Art. 6 (1) lit. f GDPR.' },
        { heading: '3. Cookies', text: 'This website uses only technically necessary cookies and stores preferences (language, cookie consent) locally in the browser (localStorage). No tracking cookies are set without consent.' },
        { heading: '4. Analytics and Advertising', text: 'This website may use Google AdSense to display advertisements. Google AdSense uses cookies to display relevant ads. Such cookies are only used after prior consent.' },
        { heading: '5. Your Rights', text: 'You have the right to free information about your stored personal data, its origin and recipients, and the purpose of data processing at any time. You also have the right to rectification, blocking, or deletion of this data.' },
        { heading: '6. Hosting', text: 'This website is hosted on servers in Germany (Hetzner Online GmbH). Data processing takes place exclusively within the EU/EEA.' },
      ],
    },
    es: {
      title: 'Política de Privacidad',
      sections: [
        { heading: '1. Responsable', text: '[Su Nombre / Empresa]\n[Su Dirección]\n[Su Email]\n\nEl responsable del tratamiento de datos en este sitio web es la persona/empresa mencionada.' },
        { heading: '2. Recogida de Datos', text: 'Al visitar este sitio web, el navegador transmite automáticamente información (archivos de registro del servidor). Estos datos no se combinan con otras fuentes. El tratamiento de datos se basa en el Art. 6 (1) lit. f RGPD.' },
        { heading: '3. Cookies', text: 'Este sitio web utiliza solo cookies técnicamente necesarias y almacena preferencias (idioma, consentimiento de cookies) localmente en el navegador (localStorage). No se establecen cookies de seguimiento sin consentimiento.' },
        { heading: '4. Análisis y Publicidad', text: 'Este sitio web puede usar Google AdSense para mostrar anuncios. Google AdSense utiliza cookies para mostrar anuncios relevantes. Dichas cookies solo se utilizan con consentimiento previo.' },
        { heading: '5. Sus Derechos', text: 'Tiene derecho a información gratuita sobre sus datos personales almacenados, su origen y destinatarios, y el propósito del tratamiento en cualquier momento. También tiene derecho a rectificación, bloqueo o eliminación.' },
        { heading: '6. Alojamiento', text: 'Este sitio web está alojado en servidores en Alemania (Hetzner Online GmbH). El tratamiento de datos se realiza exclusivamente dentro de la UE/EEE.' },
      ],
    },
  }

  const c = content[locale] ?? content.de

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-[800px] mx-auto px-4 sm:px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-[hsl(340,75%,55%)]" />
            <h1 className="font-display text-3xl font-bold tracking-tight">{c.title}</h1>
          </div>
          <div className="space-y-6">
            {(c.sections ?? []).map((s: any) => (
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
