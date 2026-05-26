'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { NameData, AIAnalysisResult, RecentSearch } from '@/lib/types'
import { Search, Shuffle, Loader2, Sparkles, ChevronDown, ChevronUp, Users } from 'lucide-react'
import { NameResultCard } from './name-result-card'
import { ComboResultCard, ComboResult } from './combo-result-card'
import { NameSuggestionsTrigger, NameSuggestionsResult } from './name-suggestions'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

export function NameSearch() {
  const [query, setQuery] = useState('')
  const [surname, setSurname] = useState('')
  const [showSurname, setShowSurname] = useState(false)
  const [suggestions, setSuggestions] = useState<NameData[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [result, setResult] = useState<NameData | null>(null)
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null)
  const [comboResult, setComboResult] = useState<ComboResult | null>(null)
  const [isAI, setIsAI] = useState(false)
  const [loading, setLoading] = useState(false)
  const [comboLoading, setComboLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [suggestionsData, setSuggestionsData] = useState<{ boys: any[]; girls: any[]; aiReasoning: string } | null>(null)
  const [suggestionsLoading, setSuggestionsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Autocomplete
  const fetchSuggestions = useCallback(async (q: string) => {
    if ((q?.length ?? 0) < 2) { setSuggestions([]); return }
    try {
      const res = await fetch(`/api/names/search?q=${encodeURIComponent(q)}&limit=6`)
      if (res?.ok) {
        const data = await res.json()
        setSuggestions(data?.names ?? [])
      }
    } catch { setSuggestions([]) }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(query), 200)
    return () => clearTimeout(timer)
  }, [query, fetchSuggestions])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const addRecentSearch = (name: string, overallRegret: number) => {
    try {
      const stored = JSON.parse(localStorage.getItem('nrc-recent') ?? '[]') as RecentSearch[]
      const filtered = (stored ?? []).filter((s: RecentSearch) => s?.name !== name)
      const updated = [{ name, overallRegret, timestamp: Date.now() }, ...filtered].slice(0, 10)
      localStorage.setItem('nrc-recent', JSON.stringify(updated))
      window.dispatchEvent(new Event('nrc-recent-updated'))
    } catch { /* ignore */ }
  }

  const fetchNameSuggestions = async () => {
    const sn = surname.trim()
    if (!sn || sn.length < 2) {
      toast.error('Bitte gib zuerst einen Nachnamen ein.')
      return
    }
    setSuggestionsLoading(true)
    setSuggestionsData(null)
    try {
      const res = await fetch('/api/suggest-names', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastName: sn }),
      })
      if (res.ok) {
        const data = await res.json()
        setSuggestionsData({ boys: data.boys, girls: data.girls, aiReasoning: data.aiReasoning })
      } else {
        toast.error('Namensvorschläge konnten nicht geladen werden.')
      }
    } catch {
      toast.error('Netzwerkfehler bei den Namensvorschlägen.')
    } finally {
      setSuggestionsLoading(false)
    }
  }

  const runComboAnalysis = async (firstName: string) => {
    const sn = surname.trim()
    if (!sn) return
    setComboLoading(true)
    setComboResult(null)
    try {
      const res = await fetch('/api/analyze-combo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName: sn }),
      })
      if (res.ok) {
        const data = await res.json()
        setComboResult(data)
      }
    } catch (err) {
      console.error('Combo analysis error:', err)
    } finally {
      setComboLoading(false)
    }
  }

  const analyzeFromDB = async (nameData: NameData) => {
    setResult(nameData)
    setAiResult(null)
    setIsAI(false)
    setLoading(false)
    addRecentSearch(nameData?.name ?? '', nameData?.overallRegret ?? 0)
    runComboAnalysis(nameData.name)
  }

  const analyzeWithAI = async (name: string) => {
    setLoading(true)
    setProgress(0)
    setResult(null)
    setAiResult(null)
    setIsAI(true)
    setComboResult(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!response?.ok) {
        throw new Error('Analysis failed')
      }

      const reader = response?.body?.getReader()
      if (!reader) throw new Error('No reader')
      const decoder = new TextDecoder()
      let partialRead = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        partialRead += decoder.decode(value, { stream: true })
        let lines = partialRead.split('\n')
        partialRead = lines?.pop() ?? ''
        for (const line of (lines ?? [])) {
          if (line?.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') return
            try {
              const parsed = JSON.parse(data)
              if (parsed?.status === 'processing') {
                setProgress((prev: number) => Math.min((prev ?? 0) + 3, 95))
              } else if (parsed?.status === 'completed') {
                setAiResult(parsed?.result ?? null)
                setProgress(100)
                setLoading(false)
                addRecentSearch(name, parsed?.result?.overallRegret ?? 0)
                runComboAnalysis(name)
                return
              } else if (parsed?.status === 'error') {
                throw new Error(parsed?.message ?? 'Analysis failed')
              }
            } catch (e: any) {
              if (e?.message !== 'Analysis failed') { /* skip parse errors */ }
              else throw e
            }
          }
        }
      }
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      toast.error('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
      console.error('AI analysis error:', err)
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.()
    const trimmed = query?.trim() ?? ''
    if (!trimmed) return
    setShowSuggestions(false)
    setComboResult(null)

    setLoading(true)
    try {
      const res = await fetch(`/api/names/search?q=${encodeURIComponent(trimmed)}&exact=true`)
      const data = await res?.json()
      if (data?.names?.[0]) {
        analyzeFromDB(data.names[0])
      } else {
        analyzeWithAI(trimmed)
      }
    } catch {
      analyzeWithAI(trimmed)
    }
  }

  const handleRandom = async () => {
    try {
      const res = await fetch('/api/names/random')
      const data = await res?.json()
      if (data?.name) {
        setQuery(data.name.name ?? '')
        analyzeFromDB(data.name)
      }
    } catch {
      toast.error('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
    }
  }

  const selectSuggestion = (n: NameData) => {
    setQuery(n?.name ?? '')
    setShowSuggestions(false)
    analyzeFromDB(n)
  }

  return (
    <div className="w-full">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto">
        <div className="relative" ref={suggestionsRef}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e?.target?.value ?? ''); setShowSuggestions(true) }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Einen Vornamen eingeben..."
            className="w-full h-14 pl-12 pr-4 rounded-xl bg-card border border-border text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(340,75%,55%)] focus:border-transparent transition-all"
            style={{ boxShadow: 'var(--shadow-md)' }}
          />

          {/* Suggestions dropdown */}
          <AnimatePresence>
            {showSuggestions && (suggestions?.length ?? 0) > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border overflow-hidden z-40"
                style={{ boxShadow: 'var(--shadow-lg)' }}
              >
                {(suggestions ?? []).map((n: NameData) => (
                  <button
                    key={n?.id}
                    type="button"
                    onClick={() => selectSuggestion(n)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors"
                  >
                    <div>
                      <span className="font-medium">{n?.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{n?.origin}</span>
                    </div>
                    <span className="font-mono text-xs font-bold" style={{
                      color: (n?.overallRegret ?? 0) <= 30 ? 'hsl(170,60%,45%)' : (n?.overallRegret ?? 0) <= 60 ? 'hsl(43,74%,50%)' : 'hsl(0,84%,60%)'
                    }}>
                      {n?.overallRegret}/100
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Optional surname toggle */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowSurname(!showSurname)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(262,60%,55%)] hover:text-[hsl(262,60%,45%)] transition-colors mx-auto px-3 py-1.5 rounded-lg bg-[hsl(262,60%,55%/0.08)] hover:bg-[hsl(262,60%,55%/0.15)] border border-[hsl(262,60%,55%/0.2)]"
          >
            <Users className="w-4 h-4" />
            {showSurname ? 'Nachname ausblenden' : '+ Nachname für Kombinations-Check'}
            {showSurname ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <AnimatePresence>
            {showSurname && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="relative mt-3">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Nachname eingeben..."
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-card border border-[hsl(262,60%,55%/0.3)] text-base font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-[hsl(262,60%,55%)] focus:border-transparent transition-all"
                    style={{ boxShadow: 'var(--shadow-sm)' }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 px-1">
                  Wir prüfen, ob sich die Namen reimen, wie sie zusammen klingen, ob die Abkürzung problematisch ist und ob Vorname und Nachname kulturell zusammenpassen.
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1 px-1 flex items-center gap-1">
                  <span>🔒</span> Dein Nachname wird nicht gespeichert – er wird nur einmalig für die Analyse verarbeitet.
                </p>

                {/* Suggestion Trigger */}
                {surname.trim().length >= 2 && (
                  <NameSuggestionsTrigger
                    lastName={surname.trim()}
                    onRequest={fetchNameSuggestions}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            type="submit"
            disabled={loading || !(query?.trim())}
            className="px-6 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)] text-white hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Namen analysieren
          </button>
          <button
            type="button"
            onClick={handleRandom}
            disabled={loading}
            className="px-6 py-3 rounded-xl font-medium text-sm bg-card border border-border hover:bg-accent disabled:opacity-50 transition-all flex items-center gap-2"
            style={{ boxShadow: 'var(--shadow-sm)' }}
          >
            <Shuffle className="w-4 h-4" />
            Zufälliger Name
          </button>
        </div>
      </form>

      {/* Loading state */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto mt-8"
          >
            <div className="bg-card rounded-xl border border-border p-6 text-center" style={{ boxShadow: 'var(--shadow-md)' }}>
              <Sparkles className="w-8 h-8 text-[hsl(340,75%,55%)] mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-medium mb-3">Analysiere...</p>
              <div className="h-2 rounded-full bg-muted overflow-hidden max-w-xs mx-auto">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[hsl(340,75%,55%)] to-[hsl(262,60%,55%)]"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              {isAI && <p className="text-xs text-muted-foreground mt-2">Unsere KI erstellt gerade eine individuelle Analyse...</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {!loading && (result || aiResult) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto mt-8 space-y-6"
          >
            <NameResultCard data={result} aiResult={aiResult} isAI={isAI} />

            {/* Combo loading */}
            {comboLoading && (
              <div className="bg-card rounded-xl border border-border p-5 text-center">
                <Loader2 className="w-5 h-5 text-[hsl(262,60%,55%)] mx-auto mb-2 animate-spin" />
                <p className="text-sm text-muted-foreground">Kombinations-Check wird durchgeführt...</p>
              </div>
            )}

            {/* Combo result */}
            {comboResult && !comboLoading && (
              <ComboResultCard data={comboResult} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name Suggestions */}
      <AnimatePresence>
        {(suggestionsLoading || suggestionsData) && (
          <div className="max-w-xl mx-auto">
            <NameSuggestionsResult
              boys={suggestionsData?.boys ?? []}
              girls={suggestionsData?.girls ?? []}
              lastName={surname.trim()}
              aiReasoning={suggestionsData?.aiReasoning ?? ''}
              loading={suggestionsLoading}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
