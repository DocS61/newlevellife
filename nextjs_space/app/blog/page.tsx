import { Metadata } from 'next'
import { BlogIndexClient } from './blog-index-client'

export const metadata: Metadata = {
  title: 'Blog – Namensreue | Ratgeber & Wissen rund um Babynamen',
  description: 'Entdecke Artikel über Namenstrends, Tipps zur Namenswahl, seltene Vornamen und spannende Fakten rund um die Welt der Babynamen.',
}

export default function BlogPage() {
  return <BlogIndexClient />
}
