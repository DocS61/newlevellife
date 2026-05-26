import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { NamePageClient } from './name-page-client'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = decodeURIComponent(params.slug)
  const name = await prisma.name.findFirst({
    where: { name: { equals: slug, mode: 'insensitive' } },
  })

  if (!name) {
    return {
      title: `${slug} – Namensanalyse | Namen-Reue-Rechner`,
      description: `Analyse des Babynamens ${slug}: Mobbing-Risiko, Karrierewirkung, internationale Aussprache und Trend-Bewertung.`,
    }
  }

  const riskLevel = name.overallRegret <= 30 ? 'niedriges' : name.overallRegret <= 60 ? 'mittleres' : 'hohes'

  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
  const ogImageUrl = `${baseUrl}/api/og?name=${encodeURIComponent(name.name)}&score=${name.overallRegret}&origin=${encodeURIComponent(name.origin || '')}&meaning=${encodeURIComponent(name.meaningDe || '')}`

  return {
    title: `${name.name} – Namensanalyse & Bedeutung | Namen-Reue-Rechner`,
    description: `${name.name}: Herkunft ${name.origin}, Bedeutung „${name.meaningDe}". Reue-Score ${name.overallRegret}/100 (${riskLevel} Risiko). Detaillierte Analyse zu Mobbing, Karriere, Aussprache & Trends.`,
    openGraph: {
      title: `${name.name} – Babynamen-Analyse | Namen-Reue-Rechner`,
      description: `Reue-Score ${name.overallRegret}/100 für ${name.name}. Lohnt sich dieser Name? Jetzt analysieren!`,
      type: 'article',
      locale: 'de_DE',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: `Namensanalyse für ${name.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name.name} – Babynamen-Analyse`,
      description: `Reue-Score ${name.overallRegret}/100. Lohnt sich der Name ${name.name}?`,
      images: [ogImageUrl],
    },
  }

}

export default async function NamePage({ params }: Props) {
  const slug = decodeURIComponent(params.slug)
  const nameData = await prisma.name.findFirst({
    where: { name: { equals: slug, mode: 'insensitive' } },
  })

  if (!nameData) {
    notFound()
  }

  // Fetch related names (same gender, similar score range)
  const related = await prisma.name.findMany({
    where: {
      id: { not: nameData.id },
      gender: nameData.gender,
    },
    orderBy: { overallRegret: 'asc' },
    take: 6,
  })

  return <NamePageClient nameData={nameData} relatedNames={related} />
}
