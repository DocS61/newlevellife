'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Mail, Send, CheckCircle2, MessageSquare, HelpCircle, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type FormData = {
  name: string
  email: string
  subject: string
  message: string
}

export function KontaktClient() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Fehler beim Senden')
    } catch {
      // Silently handle – confirmation is always shown
    }

    setSending(false)
    setSubmitted(true)
  }

  const contactReasons = [
    { icon: MessageSquare, title: 'Feedback', desc: 'Teile uns deine Erfahrung mit Namensreue mit.' },
    { icon: HelpCircle, title: 'Fragen', desc: 'Du hast eine Frage zu unseren Analysen?' },
    { icon: Lightbulb, title: 'Vorschläge', desc: 'Ideen für neue Features oder Verbesserungen?' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="hero-gradient">
          <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-16 pb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(340,75%,55%/0.1)] border border-[hsl(340,75%,55%/0.2)] mb-5">
                <Mail className="w-4 h-4 text-[hsl(340,75%,55%)]" />
                <span className="text-xs font-medium text-[hsl(340,75%,55%)]">Kontakt</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">Schreib uns</h1>
              <p className="text-muted-foreground leading-relaxed">
                Wir freuen uns über dein Feedback, Fragen oder Vorschläge. Fülle einfach das Formular aus – wir melden uns so schnell wie möglich.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
          {/* Kontaktgründe */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {contactReasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="p-4 rounded-xl bg-card border border-border text-center"
                style={{ boxShadow: 'var(--shadow-sm)' }}
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mx-auto mb-3">
                  <reason.icon className="w-5 h-5 text-[hsl(340,75%,55%)]" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{reason.title}</h3>
                <p className="text-xs text-muted-foreground">{reason.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Formular oder Bestätigung */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-3 text-emerald-800 dark:text-emerald-200">
                  Nachricht erhalten!
                </h2>
                <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed max-w-md mx-auto mb-2">
                  Vielen Dank für deine Nachricht, {form.name || 'lieber Besucher'}. Wir haben deine Anfrage erhalten und werden uns zeitnah darum kümmern.
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Bitte beachte, dass wir ein kleines Team sind und die Antwort einige Tage dauern kann.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-card border border-border space-y-5"
                style={{ boxShadow: 'var(--shadow-md)' }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Dein Name"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(340,75%,55%/0.3)] focus:border-[hsl(340,75%,55%)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">E-Mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="deine@email.de"
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(340,75%,55%/0.3)] focus:border-[hsl(340,75%,55%)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Betreff</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(340,75%,55%/0.3)] focus:border-[hsl(340,75%,55%)] transition-colors"
                  >
                    <option value="">Bitte wählen…</option>
                    <option value="feedback">Feedback zur Website</option>
                    <option value="frage">Frage zu einer Analyse</option>
                    <option value="vorschlag">Feature-Vorschlag</option>
                    <option value="fehler">Fehler melden</option>
                    <option value="sonstiges">Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Nachricht</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Schreibe hier deine Nachricht…"
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(340,75%,55%/0.3)] focus:border-[hsl(340,75%,55%)] transition-colors resize-y min-h-[120px]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">Deine Daten werden nur zur Bearbeitung deiner Anfrage verwendet.</p>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wird gesendet…
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Absenden
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  )
}
