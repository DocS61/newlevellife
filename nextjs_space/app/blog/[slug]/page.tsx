import { Metadata } from 'next'
import { blogArticles, getArticleBySlug } from '@/lib/blog-data'
import { BlogArticleClient } from './blog-article-client'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return blogArticles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return { title: 'Artikel nicht gefunden – Namensreue' }
  return {
    title: `${article.title} – Namensreue`,
    description: article.description,
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()
  return <BlogArticleClient slug={params.slug} />
}
