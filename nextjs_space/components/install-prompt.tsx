'use client'

import { useState, useEffect } from 'react'
import { X, Share, Plus, MoreVertical, Download, Smartphone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [show, setShow] = useState(false)
  const [platform, setPlatform] = useState<'ios' | 'android' | null>(null)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    // Don't show if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return

    // Don't show if user dismissed it before (respect for 7 days)
    const dismissed = localStorage.getItem('install-prompt-dismissed')
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10)
      if (Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return
    }

    // Detect platform
    const ua = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(ua) && !('beforeinstallprompt' in window)
    const isAndroid = /android/.test(ua)

    if (isIOS) {
      setPlatform('ios')
      // Show after a short delay so user has time to engage
      const timer = setTimeout(() => setShow(true), 3000)
      return () => clearTimeout(timer)
    }

    if (isAndroid || 'beforeinstallprompt' in window) {
      setPlatform('android')
    }

    // Listen for the native install prompt (Chrome/Edge/Android)
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShow(true)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // If on Android but no beforeinstallprompt fires, still show manual instructions
    if (isAndroid) {
      const timer = setTimeout(() => {
        setShow(prev => {
          if (!prev) return true
          return prev
        })
      }, 5000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('beforeinstallprompt', handler)
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleDismiss = () => {
    setShow(false)
    localStorage.setItem('install-prompt-dismissed', Date.now().toString())
  }

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt()
      const result = await deferredPrompt.userChoice
      if (result.outcome === 'accepted') {
        setShow(false)
      }
      setDeferredPrompt(null)
    } else {
      setExpanded(true)
    }
  }

  if (!show || !platform) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-16 sm:p-4 sm:pb-20 no-print"
      >
        <div className="max-w-lg mx-auto rounded-2xl border border-border bg-card overflow-hidden"
          style={{ boxShadow: '0 -4px 30px rgba(0,0,0,0.15)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[hsl(340,75%,55%/0.08)] to-[hsl(262,60%,55%/0.08)]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] flex items-center justify-center text-white shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold">Namensreue als App nutzen</p>
              <p className="text-xs text-muted-foreground">Zum Startbildschirm hinzufügen – kostenlos!</p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors shrink-0"
              aria-label="Schließen"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Collapsed: Quick action */}
          {!expanded && (
            <div className="px-4 py-3 flex items-center gap-3">
              <p className="text-xs text-muted-foreground flex-1">
                Füge Namensreue deinem Startbildschirm hinzu – so hast du die Namensanalyse immer griffbereit, wie eine echte App.
              </p>
              <button
                onClick={handleInstall}
                className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                {deferredPrompt ? (
                  <><Download className="w-3.5 h-3.5" /> Installieren</>
                ) : (
                  <><Plus className="w-3.5 h-3.5" /> So geht&apos;s</>
                )}
              </button>
            </div>
          )}

          {/* Expanded: Platform-specific instructions */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-4 space-y-3 border-t border-border">
                  {platform === 'ios' ? (
                    <>
                      <p className="text-xs font-semibold text-[hsl(340,75%,55%)] uppercase tracking-wider">Anleitung für iPhone / iPad</p>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(340,75%,55%/0.1)] text-[hsl(340,75%,55%)] text-xs font-bold flex items-center justify-center">1</span>
                          <p className="text-xs text-muted-foreground pt-0.5">
                            Tippe unten in Safari auf das <strong>Teilen-Symbol</strong> <Share className="w-3 h-3 inline text-[hsl(220,80%,55%)]" /> (das Quadrat mit dem Pfeil nach oben)
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(340,75%,55%/0.1)] text-[hsl(340,75%,55%)] text-xs font-bold flex items-center justify-center">2</span>
                          <p className="text-xs text-muted-foreground pt-0.5">
                            Scrolle nach unten und tippe auf <strong>„Zum Home-Bildschirm"</strong> <Plus className="w-3 h-3 inline text-muted-foreground" />
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(340,75%,55%/0.1)] text-[hsl(340,75%,55%)] text-xs font-bold flex items-center justify-center">3</span>
                          <p className="text-xs text-muted-foreground pt-0.5">
                            Bestätige mit <strong>„Hinzufügen"</strong> – fertig! Namensreue erscheint als App-Icon.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-semibold text-[hsl(262,60%,55%)] uppercase tracking-wider">Anleitung für Android</p>
                      <div className="space-y-2.5">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(262,60%,55%/0.1)] text-[hsl(262,60%,55%)] text-xs font-bold flex items-center justify-center">1</span>
                          <p className="text-xs text-muted-foreground pt-0.5">
                            Tippe oben rechts auf das <strong>Drei-Punkte-Menü</strong> <MoreVertical className="w-3 h-3 inline text-muted-foreground" /> in Chrome
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(262,60%,55%/0.1)] text-[hsl(262,60%,55%)] text-xs font-bold flex items-center justify-center">2</span>
                          <p className="text-xs text-muted-foreground pt-0.5">
                            Wähle <strong>„Zum Startbildschirm hinzufügen"</strong> oder <strong>„App installieren"</strong>
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(262,60%,55%/0.1)] text-[hsl(262,60%,55%)] text-xs font-bold flex items-center justify-center">3</span>
                          <p className="text-xs text-muted-foreground pt-0.5">
                            Bestätige mit <strong>„Hinzufügen"</strong> – fertig! Namensreue erscheint als App auf deinem Startbildschirm.
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  <p className="text-[10px] text-muted-foreground/60 pt-1">
                    Keine Installation nötig, kein Speicherplatz belegt – es ist einfach eine Verknüpfung zur Website.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
