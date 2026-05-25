import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXTAUTH_URL ?? 'http://localhost:3000'
  const pages = ['', '/about', '/privacy', '/imprint']
  
  return pages.map((path: string) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly' as any,
    priority: path === '' ? 1.0 : 0.5,
  }))
}
