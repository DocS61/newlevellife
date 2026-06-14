'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export function PrivacyClient() {
  const sections = [
    {
      heading: '1. Verantwortlicher',
      text: `Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer datenschutzrechtlicher Bestimmungen ist:

Dr. Hartmut Sauer
Weithartstraße 6
88512 Mengen
Deutschland

E-Mail: hello@new-level-life.de`
    },
    {
      heading: '2. Allgemeines zur Datenverarbeitung',
      text: `Diese Website verarbeitet personenbezogene Daten grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.`
    },
    {
      heading: '3. Rechtsgrundlagen',
      text: `Soweit wir für Verarbeitungsvorgänge eine Einwilligung einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage.

Soweit die Verarbeitung zur Wahrung eines berechtigten Interesses unseres Unternehmens oder eines Dritten erforderlich ist und die Interessen, Grundrechte und Grundfreiheiten des Betroffenen das erstgenannte Interesse nicht überwiegen, dient Art. 6 Abs. 1 lit. f DSGVO als Rechtsgrundlage.`
    },
    {
      heading: '4. Server-Logfiles',
      text: `Beim Besuch dieser Website erhebt und speichert der Provider der Seiten automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind:

• Browsertyp und Browserversion
• Verwendetes Betriebssystem
• Referrer URL
• Hostname des zugreifenden Rechners
• Uhrzeit der Serveranfrage
• IP-Adresse (anonymisiert)

Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung und Sicherheit der Website).`
    },
    {
      heading: '5. Consent Management (Usercentrics / eRecht24)',
      text: `Diese Website nutzt die Consent-Management-Plattform Usercentrics der Firma Usercentrics GmbH, Sendlinger Straße 7, 80331 München, Deutschland, eingebunden über eRecht24, um Ihre Einwilligung zur Speicherung bestimmter Cookies und zur Datenverarbeitung einzuholen und diese rechtskonform zu dokumentieren.

Beim Aufruf unserer Website wird eine Verbindung zu Servern von Usercentrics hergestellt, um Ihre Einwilligungen und Widerrufe zur Cookie-Nutzung zu ermitteln. Usercentrics speichert einen Cookie in Ihrem Browser, um Ihnen die erteilten Einwilligungen bzw. deren Widerruf zuordnen zu können.

Die erfassten Daten werden gespeichert, bis Sie uns zur Löschung auffordern, den Usercentrics-Cookie selbst löschen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Aufbewahrungspflichten bleiben unberührt.

Der Einsatz von Usercentrics erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz von Cookies einzuholen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. c DSGVO (rechtliche Verpflichtung).

Ein Auftragsverarbeitungsvertrag (AVV) mit Usercentrics ist abgeschlossen. Usercentrics ist als zertifizierte Consent-Management-Plattform (CMP) nach dem IAB Transparency & Consent Framework (TCF 2.2) anerkannt.`
    },
    {
      heading: '6. Cookies',
      text: `Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Einige Cookies sind technisch notwendig (z. B. für die Consent-Verwaltung), andere dienen der Analyse oder Werbung.

Technisch notwendige Cookies werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt. Alle übrigen Cookies (z. B. für Analyse oder Werbung) werden nur nach Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO gesetzt.

Sie können Ihre Einwilligung jederzeit über das Usercentrics-Banner widerrufen. Bereits gesetzte Cookies können Sie in Ihren Browsereinstellungen löschen.

Zusätzlich speichern wir folgende Informationen lokal in Ihrem Browser (localStorage):

• Cookie-Einwilligungs-Status
• Zuletzt gesuchte Namen (für Komfortfunktion)

Diese Daten verlassen Ihr Gerät nicht und werden nicht an Server übermittelt.`
    },
    {
      heading: '7. Google AdSense',
      text: `Diese Website nutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland ("Google").

Google AdSense verwendet Cookies und sogenannte Web Beacons, um die Website-Nutzung zu analysieren und relevante Werbeanzeigen auszuliefern. Die durch Cookies und Web Beacons erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) und die Auslieferung von Werbeformaten werden an einen Server von Google in den USA übertragen und dort gespeichert.

Google AdSense wird nur nach Ihrer ausdrücklichen Einwilligung über das Usercentrics-Banner aktiviert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO.

Google kann diese Informationen an Dritte weitergeben, sofern dies gesetzlich vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag von Google verarbeiten.

Sie können die Erfassung verhindern, indem Sie Ihre Einwilligung verweigern oder nachträglich widerrufen. Zusätzlich können Sie personalisierte Werbung in Ihren Google-Kontoeinstellungen deaktivieren: https://adssettings.google.com

Weitere Informationen: https://policies.google.com/technologies/ads`
    },
    {
      heading: '8. Namens- und Kombinations-Analyse',
      text: `Bei der Namensanalyse wird der eingegebene Vorname mit unserer lokalen Datenbank abgeglichen. Ist der Name nicht in der Datenbank vorhanden, wird eine KI-gestützte Analyse durchgeführt.

Beim Kombinations-Check (Vorname + Nachname) und beim Doppelname-Check (zwei Vornamen) werden die eingegebenen Namen ausschließlich zur einmaligen Analyse verarbeitet. Dabei gilt:

• Nachnamen werden weder in unserer Datenbank noch anderweitig dauerhaft gespeichert.
• Die Daten werden einmalig an unseren KI-Dienst übermittelt und nach der Analyse nicht weiter aufbewahrt.
• Es findet kein Profiling statt.
• Es werden keine Namen mit IP-Adressen oder anderen personenbezogenen Daten verknüpft.

Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Bereitstellung der Analysefunktion). Die Verarbeitung erfolgt ausschließlich zum Zweck der einmaligen Analyse und Ergebnisanzeige.`
    },
    {
      heading: '9. Kontaktformular',
      text: `Wenn Sie uns über das Kontaktformular auf unserer Website eine Nachricht senden, werden folgende Daten erhoben und verarbeitet:

• Name
• E-Mail-Adresse
• Betreff (Auswahl)
• Nachricht (Freitext)

Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und per E-Mail an uns weitergeleitet. Eine Speicherung in einer Datenbank erfolgt nicht. Die übermittelten Daten werden nicht an Dritte weitergegeben, es sei denn, dies ist zur Bearbeitung Ihrer Anfrage erforderlich.

Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Nutzeranfragen). Sofern Ihre Kontaktaufnahme auf den Abschluss eines Vertrages abzielt, ist zusätzliche Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO.

Ihre Daten werden gelöscht, sobald Ihre Anfrage abschließend bearbeitet wurde und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.`
    },
    {
      heading: '10. Hosting',
      text: `Diese Website wird bei der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland gehostet. Die Server befinden sich ausschließlich in Deutschland.

Hetzner verarbeitet Ihre Daten nur im Rahmen der Erbringung der Hostingleistung und folgt unseren Weisungen bezüglich dieser Daten. Ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO ist abgeschlossen.

Weitere Informationen: https://www.hetzner.com/de/legal/privacy-policy`
    },
    {
      heading: '11. Ihre Rechte als betroffene Person',
      text: `Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:

• Recht auf Auskunft (Art. 15 DSGVO)
• Recht auf Berichtigung (Art. 16 DSGVO)
• Recht auf Löschung (Art. 17 DSGVO)
• Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
• Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
• Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)
• Recht auf Widerruf Ihrer Einwilligung (Art. 7 Abs. 3 DSGVO)

Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an: hello@new-level-life.de

Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die für uns zuständige Aufsichtsbehörde ist:

Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
Lautenschlagerstraße 20
70173 Stuttgart
https://www.baden-wuerttemberg.datenschutz.de`
    },
    {
      heading: '12. Aktualität und Änderung dieser Datenschutzerklärung',
      text: `Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Juni 2026.

Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen werden.`
    },
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