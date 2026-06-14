'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { blogArticles } from '@/lib/blog-data'
import { BookOpen, Clock, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function BlogIndexClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 pt-16 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(262,60%,55%/0.1)] border border-[hsl(262,60%,55%/0.2)] mb-5">
                <BookOpen className="w-4 h-4 text-[hsl(262,60%,55%)]" />
                <span className="text-xs font-medium text-[hsl(262,60%,55%)]">Blog</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ratgeber & Wissen rund um Babynamen</h1>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl">
                Namenstrends, Tipps für die Namenswahl und spannende Fakten – alles, was werdende Eltern wissen sollten.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Artikel-Grid */}
        <section className="max-w-[900px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogArticles.map((article, i) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block h-full p-6 rounded-2xl bg-card border border-border hover:border-[hsl(340,75%,55%/0.3)] transition-all hover:shadow-lg"
                  style={{ boxShadow: 'var(--shadow-sm)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: article.categoryColor }}
                    >
                      {article.category}
                    </span>
                    <span className="text-2xl">{article.emoji}</span>
                  </div>
                  <h2 className="font-display text-lg font-bold tracking-tight mb-2 group-hover:text-[hsl(340,75%,55%)] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{new Date(article.date).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(340,75%,55%)] group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
