'use client'

import { useI18n } from '@/lib/i18n/context'
import { Locale, locales, localeFlags, localeNames } from '@/lib/i18n/translations'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
        aria-label="Language"
      >
        <Globe className="w-4 h-4" />
        <span>{localeFlags[locale]}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-card rounded-lg border border-border shadow-lg min-w-[140px] overflow-hidden z-50" style={{ boxShadow: 'var(--shadow-lg)' }}>
          {locales.map((loc: Locale) => (
            <button
              key={loc}
              onClick={() => { setLocale(loc); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-accent transition-colors ${
                loc === locale ? 'bg-accent font-medium' : ''
              }`}
            >
              <span>{localeFlags[loc]}</span>
              <span>{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
