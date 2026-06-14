import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { blogArticles } from '@/lib/blog-data'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'

  const blogSlugs = blogArticles.map(a => a.slug)


  const blogPages = ['/blog', ...blogSlugs.map(s => `/blog/${s}`)]

  const staticPages = ['', '/about', '/kontakt', ...blogPages, '/datenschutz', '/impressum'].map((path: string) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' || path === '/blog' ? 'weekly' : 'monthly') as any,
    priority: path === '' ? 1.0 : path.startsWith('/blog') ? 0.8 : 0.5,
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
