'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { Cookie, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieBanner() {
  const { t } = useI18n()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('nrc-cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('nrc-cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('nrc-cookie-consent', 'rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-[100] max-w-lg mx-auto"
        >
          <div className="bg-card rounded-xl border border-border p-5" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex items-start gap-3">
              <Cookie className="w-5 h-5 text-[hsl(340,75%,55%)] mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-display font-semibold text-sm mb-1">{t('cookieTitle')}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{t('cookieText')}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAccept}
                    className="px-4 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white hover:opacity-90 transition-opacity"
                  >
                    {t('cookieAccept')}
                  </button>
                  <button
                    onClick={handleReject}
                    className="px-4 py-1.5 text-xs font-medium rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {t('cookieReject')}
                  </button>
                </div>
              </div>
              <button onClick={handleReject} className="p-1 rounded hover:bg-muted transition-colors" aria-label="Close">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
