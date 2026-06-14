'use client'

import Link from 'next/link'
import { Heart, ArrowRight, Calculator } from 'lucide-react'
import { useState, useEffect } from 'react'

export function Footer() {
  const [year, setYear] = useState(2026)
  useEffect(() => { setYear(new Date().getFullYear()) }, [])

  return (
    <>
      {/* Cross-Promotion Banner – oberhalb des Footers, damit Usercentrics-Button ihn nicht überdeckt */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-t border-blue-200/50 dark:border-blue-800/30 no-print">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
          <a
            href="https://smartumrechnen.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 group"
          >
            <Calculator className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0" />
            <span className="text-sm sm:text-base text-blue-700 dark:text-blue-300 font-medium">
              Einheiten umrechnen? Entdecke <span className="font-bold underline underline-offset-2 decoration-blue-400 group-hover:decoration-blue-600 transition-colors">SmartUmrechnen.de</span> – kostenlos & blitzschnell
            </span>
            <ArrowRight className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <footer className="w-full border-t border-border/50 bg-muted/30 no-print">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {year} Namensreue. Alle Analysen dienen der Unterhaltung und ersetzen keine professionelle Beratung.
              <Heart className="w-3.5 h-3.5 text-[hsl(340,75%,55%)] inline" />
            </p>
            <nav className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Über uns
              </Link>
              <Link href="/kontakt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Kontakt
              </Link>
              <Link href="/datenschutz" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Datenschutz
              </Link>
              <Link href="/impressum" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Impressum
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
