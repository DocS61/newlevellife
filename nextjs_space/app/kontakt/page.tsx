import { Metadata } from 'next'
import { KontaktClient } from './kontakt-client'

export const metadata: Metadata = {
  title: 'Kontakt – Namensreue',
  description: 'Kontaktiere das Team hinter Namensreue. Wir freuen uns über Feedback, Vorschläge und Fragen.',
}

export default function KontaktPage() {
  return <KontaktClient />
}
