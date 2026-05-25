'use client'

import { ReactNode, useEffect, useState } from 'react'
import { I18nProvider } from '@/lib/i18n/context'
import { Locale, defaultLocale, locales } from '@/lib/i18n/translations'

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('nrc-locale') as Locale | null
    if (stored && locales.includes(stored)) {
      setLocale(stored)
      document.documentElement.lang = stored
    }
  }, [])

  if (!mounted) {
    return (
      <I18nProvider initialLocale={defaultLocale}>
        {children}
      </I18nProvider>
    )
  }

  return (
    <I18nProvider initialLocale={locale}>
      {children}
    </I18nProvider>
  )
}
