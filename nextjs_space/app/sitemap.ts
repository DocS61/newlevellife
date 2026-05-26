import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

  const staticPages = ['', '/privacy', '/imprint'].map((path: string) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' ? 'weekly' : 'monthly') as any,
    priority: path === '' ? 1.0 : 0.5,
  }))

  let namePages: MetadataRoute.Sitemap = []
  try {
    const names = await prisma.name.findMany({ select: { name: true, createdAt: true } })
    namePages = names.map((n: any) => ({
      url: `${baseUrl}/name/${n.name.toLowerCase()}`,
      lastModified: n.createdAt,
      changeFrequency: 'monthly' as any,
      priority: 0.7,
    }))
  } catch (err) {
    console.error('Sitemap: failed to fetch names', err)
  }

  return [...staticPages, ...namePages]
}
