'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getArticleBySlug, blogArticles } from '@/lib/blog-data'
import { getArticleContent } from '@/lib/blog-content'
import { BookOpen, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function BlogArticleClient({ slug }: { slug: string }) {
  const article = getArticleBySlug(slug)
  const content = getArticleContent(slug)
  if (!article || !content) return null

  const currentIndex = blogArticles.findIndex(a => a.slug === slug)
  const prevArticle = currentIndex > 0 ? blogArticles[currentIndex - 1] : null
  const nextArticle = currentIndex < blogArticles.length - 1 ? blogArticles[currentIndex + 1] : null

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="hero-gradient">
          <div className="max-w-[750px] mx-auto px-4 sm:px-6 pt-16 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Zurück zum Blog
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: article.categoryColor.replace('hsl(', 'hsla(').replace(')', ', 0.15)'), color: article.categoryColor }}
                >
                  {article.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readingTime}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">{article.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{article.description}</p>
              <p className="text-xs text-muted-foreground mt-4">
                {new Date(article.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </motion.div>
          </div>
        </section>

        <article className="max-w-[750px] mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-gray dark:prose-invert max-w-none
              prose-headings:font-display prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-muted-foreground
              prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-a:text-[hsl(340,75%,55%)] prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[hsl(340,75%,55%/0.05)] to-[hsl(262,60%,55%/0.05)] border border-[hsl(340,75%,55%/0.2)] text-center"
          >
            <p className="font-display text-lg font-bold mb-2">👶 Jetzt deinen Wunschnamen testen!</p>
            <p className="text-sm text-muted-foreground mb-4">Finde heraus, wie dein Favorit in unserer Analyse abschneidet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Namen analysieren
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {prevArticle ? (
              <Link href={`/blog/${prevArticle.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{prevArticle.title}</span>
                <span className="sm:hidden">Vorheriger</span>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link href={`/blog/${nextArticle.slug}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right">
                <span className="hidden sm:inline">{nextArticle.title}</span>
                <span className="sm:hidden">Nächster</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : <div />}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
