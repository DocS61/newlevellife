'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="w-full border-t border-border/50 bg-muted/30 no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            {t('footerText')}
            <Heart className="w-3.5 h-3.5 text-[hsl(340,75%,55%)] inline" />
          </p>
          <nav className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navPrivacy')}
            </Link>
            <Link href="/imprint" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navImprint')}
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('navAbout')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
