'use client'

import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useI18n } from '@/lib/i18n/context'
import { Baby, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4 py-16"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] flex items-center justify-center text-white mx-auto mb-6">
            <Baby className="w-10 h-10" />
          </div>
          <h1 className="font-display text-6xl font-bold tracking-tight gradient-text mb-3">404</h1>
          <h2 className="font-display text-xl font-semibold mb-2">{t('notFoundTitle')}</h2>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">{t('notFoundText')}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white hover:opacity-90 transition-all"
          >
            <Home className="w-4 h-4" />
            {t('notFoundButton')}
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
