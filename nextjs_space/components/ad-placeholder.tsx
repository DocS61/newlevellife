'use client'

import { useI18n } from '@/lib/i18n/context'

interface AdPlaceholderProps {
  position: 'hero-below' | 'between-results' | 'sidebar'
  className?: string
}

export function AdPlaceholder({ position, className = '' }: AdPlaceholderProps) {
  const { t } = useI18n()

  const heights: Record<string, string> = {
    'hero-below': 'h-[90px]',
    'between-results': 'h-[250px]',
    'sidebar': 'h-[600px]',
  }

  return (
    <div className={`w-full ${className} no-print`}>
      {/* Google AdSense Ad Placement: ${position} */}
      <div
        className={`${heights[position] ?? 'h-[90px]'} w-full rounded-lg bg-muted/50 border border-dashed border-border flex items-center justify-center`}
      >
        <span className="text-xs text-muted-foreground/50">{t('adLabel')}</span>
      </div>
      {/* End Google AdSense Ad Placement: ${position} */}
    </div>
  )
}
