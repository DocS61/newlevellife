'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Baby, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/50 no-print">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMenuOpen(false)}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Baby className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="gradient-text">Namensreue</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            Startseite
          </Link>
          <Link href="/datenschutz" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            Datenschutz
          </Link>
          <Link href="/impressum" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            Impressum
          </Link>
        </nav>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Menü"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col gap-1">
              <Link href="/" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent" onClick={() => setMenuOpen(false)}>
                Startseite
              </Link>
              <Link href="/datenschutz" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent" onClick={() => setMenuOpen(false)}>
                Datenschutz
              </Link>
              <Link href="/impressum" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent" onClick={() => setMenuOpen(false)}>
                Impressum
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
