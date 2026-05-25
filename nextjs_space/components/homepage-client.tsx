'use client'

import { useI18n } from '@/lib/i18n/context'
import { NameSearch } from './name-search'
import { PopularNames } from './popular-names'
import { RecentSearches } from './recent-searches'
import { AdPlaceholder } from './ad-placeholder'
import { Header } from './header'
import { Footer } from './footer'
import { CookieBanner } from './cookie-banner'
import { Baby, Shield, Globe, Briefcase, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export function HomepageClient() {
  const { t } = useI18n()

  const features = [
    { icon: Shield, label: t('bullyingScore'), desc: t('bullyingDesc'), color: 'hsl(0, 84%, 60%)' },
    { icon: Globe, label: t('intlScore'), desc: t('intlDesc'), color: 'hsl(262, 60%, 55%)' },
    { icon: Briefcase, label: t('careerScore'), desc: t('careerDesc'), color: 'hsl(43, 74%, 50%)' },
    { icon: TrendingUp, label: t('trendScore'), desc: t('trendDesc'), color: 'hsl(170, 60%, 45%)' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(340,75%,55%/0.1)] border border-[hsl(340,75%,55%/0.2)] mb-6">
              <Baby className="w-4 h-4 text-[hsl(340,75%,55%)]" />
              <span className="text-xs font-medium text-[hsl(340,75%,55%)]">
                {t('overallRegret')} 0-100
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-4">
              {t('heroTitle')}{' '}
              <span className="gradient-text">{t('heroTitleHighlight')}</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
              {t('heroSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NameSearch />
          </motion.div>
        </div>
      </section>

      {/* Ad below hero */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
        <AdPlaceholder position="hero-below" />
      </div>

      {/* Features */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f: any, i: number) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border hover:border-[hsl(340,75%,55%/0.2)] transition-all group"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <f.icon className="w-6 h-6 mb-3 transition-colors" style={{ color: f.color }} />
              <h3 className="text-sm font-semibold mb-1">{f.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular & Recent in 2 column layout on desktop */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <PopularNames />
            {/* Ad between results */}
            <AdPlaceholder position="between-results" />
            <RecentSearches />
          </div>
          {/* Sidebar ad (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <AdPlaceholder position="sidebar" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CookieBanner />
    </div>
  )
}
