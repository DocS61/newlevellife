/**
 * Phonetische Analyse-Bibliothek für deutsche Namenskombinationen.
 * Alle Scores: 0–10, wobei 0 = kein Risiko, 10 = hohes Risiko.
 */

// --- Helpers ---

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'ä', 'ö', 'ü'])
const DIPHTHONGS = ['ei', 'ai', 'au', 'eu', 'äu', 'ie']

/** Extract vowel pattern from a word (lowercased) */
function extractVowels(word: string): string {
  return word.toLowerCase().split('').filter(c => VOWELS.has(c)).join('')
}

/** Get the "phonetic start" – first consonant cluster + first vowel for comparison */
function phoneticStart(word: string): string {
  const w = word.toLowerCase()
    .replace(/^sch/, 'ʃ') // treat sch as single
    .replace(/^ch/, 'ç')
    .replace(/^ph/, 'f')
    .replace(/^th/, 't')
  return w.charAt(0)
}

/** Estimate syllable count for German words (heuristic) */
function countSyllables(word: string): number {
  const w = word.toLowerCase()
  let count = 0
  let prevVowel = false
  for (let i = 0; i < w.length; i++) {
    const isV = VOWELS.has(w[i])
    // Handle diphthongs: check if current + next char form one
    if (isV && !prevVowel) {
      count++
    }
    prevVowel = isV
  }
  return Math.max(1, count)
}

/** Get last N characters */
function lastN(s: string, n: number): string {
  return s.toLowerCase().slice(-n)
}

/** Get last vowel+consonant cluster (ending sound) */
function endingSound(word: string): string {
  const w = word.toLowerCase()
  // Find last vowel position
  let lastVowelIdx = -1
  for (let i = w.length - 1; i >= 0; i--) {
    if (VOWELS.has(w[i])) {
      lastVowelIdx = i
      break
    }
  }
  if (lastVowelIdx === -1) return w.slice(-2)
  return w.slice(lastVowelIdx)
}

// --- Blacklisted initials ---

const BAD_INITIALS = new Set([
  'SS', 'SA', 'KZ', 'HJ', 'NS', 'SD',  // Nazi-Bezug
  'WC', 'KO', 'PO',                      // peinlich
  'FK',                                    // umgangssprachlich
])

// --- Analysis Functions ---

export interface PhoneticAnalysis {
  alliterationScore: number
  alliterationNote: string
  assonanceScore: number
  assonanceNote: string
  rhymeScore: number
  rhymeNote: string
  rhythmScore: number
  rhythmNote: string
  initialsScore: number
  initialsNote: string
  overallHarmony: number
  overallNote: string
}

/** 1. Alliteration Check */
function analyzeAlliteration(firstName: string, lastName: string): { score: number; note: string } {
  const fStart = phoneticStart(firstName)
  const lStart = phoneticStart(lastName)

  if (fStart === lStart) {
    // Alliteration is not always bad – can sound strong (Max Müller)
    // But identical first syllables are worse (Martin Martens)
    const fSyllable = firstName.toLowerCase().slice(0, 3)
    const lSyllable = lastName.toLowerCase().slice(0, 3)
    if (fSyllable === lSyllable) {
      return { score: 7, note: `Starke Alliteration: „${firstName} ${lastName}" – die ersten Silben klingen fast identisch.` }
    }
    return { score: 3, note: `Leichte Alliteration: Beide Namen beginnen mit dem gleichen Laut. Das kann bewusst stilvoll wirken.` }
  }
  return { score: 0, note: 'Keine Alliteration – die Anfangslaute sind unterschiedlich.' }
}

/** 2. Assonance Check (vowel harmony/dissonance) */
function analyzeAssonance(firstName: string, lastName: string): { score: number; note: string } {
  const fVowels = extractVowels(firstName)
  const lVowels = extractVowels(lastName)
  const combined = fVowels + lVowels

  if (combined.length < 2) return { score: 0, note: 'Zu wenige Vokale für eine Assonanz-Analyse.' }

  // Check for excessive repetition of the same vowel
  const vowelCounts: Record<string, number> = {}
  for (const v of combined) {
    vowelCounts[v] = (vowelCounts[v] || 0) + 1
  }
  const maxRepeat = Math.max(...Object.values(vowelCounts))
  const dominantVowel = Object.entries(vowelCounts).sort((a, b) => b[1] - a[1])[0]
  const ratio = maxRepeat / combined.length

  if (ratio >= 0.7 && combined.length >= 4) {
    return {
      score: 6,
      note: `Starke Assonanz: Der Vokal „${dominantVowel[0]}" dominiert die gesamte Namenskombination (${Math.round(ratio * 100)} %). Das kann eintönig klingen.`
    }
  }
  if (ratio >= 0.5 && combined.length >= 4) {
    return {
      score: 3,
      note: `Leichte Assonanz: Der Vokal „${dominantVowel[0]}" kommt häufig vor. Nicht kritisch, aber hörbar.`
    }
  }
  return { score: 0, note: 'Gute Vokalvielfalt – die Kombination klingt abwechslungsreich.' }
}

/** 3. Rhyme Check */
function analyzeRhyme(firstName: string, lastName: string): { score: number; note: string } {
  const fEnd = endingSound(firstName)
  const lEnd = endingSound(lastName)

  // Full rhyme
  if (fEnd === lEnd && fEnd.length >= 2) {
    return { score: 9, note: `Reimgefahr! „${firstName}" und „${lastName}" reimen sich – das führt fast sicher zu Sprüchen.` }
  }

  // Near rhyme (last 2 chars match)
  if (lastN(firstName, 2) === lastN(lastName, 2)) {
    return { score: 6, note: `Halbreim: Beide Namen enden ähnlich auf „-${lastN(firstName, 2)}". Das kann auffallen.` }
  }

  // Last char match
  if (lastN(firstName, 1) === lastN(lastName, 1) && VOWELS.has(lastN(firstName, 1))) {
    return { score: 2, note: 'Leichter Gleichklang am Ende, aber kein auffälliger Reim.' }
  }

  return { score: 0, note: 'Kein Reim – die Endungen klingen unterschiedlich.' }
}

/** 4. Syllable Rhythm Check */
function analyzeRhythm(firstName: string, lastName: string): { score: number; note: string } {
  const fSyl = countSyllables(firstName)
  const lSyl = countSyllables(lastName)
  const total = fSyl + lSyl

  // Ideal: 3–5 total syllables, short first + longer last
  if (total >= 3 && total <= 5 && fSyl <= lSyl) {
    return { score: 0, note: `Harmonischer Rhythmus: ${fSyl}+${lSyl} Silben. Kurzer Vorname mit längerem Nachnamen klingt ausgewogen.` }
  }

  if (total <= 2) {
    return { score: 4, note: `Sehr kurze Kombination (${fSyl}+${lSyl} Silben). Kann abgehackt klingen.` }
  }

  if (total >= 7) {
    return { score: 5, note: `Lange Kombination (${fSyl}+${lSyl} Silben). Im Alltag wird oft abgekürzt.` }
  }

  if (fSyl > lSyl + 1) {
    return { score: 3, note: `Ungleicher Rhythmus: Der Vorname (${fSyl} Silben) ist deutlich länger als der Nachname (${lSyl}).` }
  }

  return { score: 1, note: `Akzeptabler Rhythmus mit ${fSyl}+${lSyl} Silben.` }
}

/** 5. Initials Check */
function analyzeInitials(firstName: string, lastName: string, middleName?: string): { score: number; note: string } {
  const parts = [firstName]
  if (middleName) parts.push(middleName)
  parts.push(lastName)
  const initials = parts.map(p => p.charAt(0).toUpperCase()).join('')

  if (BAD_INITIALS.has(initials)) {
    return { score: 9, note: `Achtung: Die Initialen „${initials}" sind im deutschen Kontext problematisch und könnten negative Assoziationen wecken.` }
  }

  // Check 2-letter combo too
  const twoLetter = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  if (BAD_INITIALS.has(twoLetter)) {
    return { score: 8, note: `Die Initialen „${twoLetter}" könnten im Deutschen unglückliche Assoziationen hervorrufen.` }
  }

  return { score: 0, note: `Die Initialen „${initials}" sind unauffällig – kein Problem.` }
}

/** 6. Lautfluss (sound flow) – end of first name vs start of last name */
function analyzeSoundFlow(firstName: string, lastName: string): { score: number; note: string } {
  const fLast = firstName.toLowerCase().slice(-1)
  const lFirst = lastName.toLowerCase().charAt(0)

  // Same letter – can cause a "stutter"
  if (fLast === lFirst) {
    if (VOWELS.has(fLast)) {
      return { score: 5, note: `Vokal-Zusammenstoß: „${firstName}" endet und „${lastName}" beginnt mit dem gleichen Vokal. Das kann einen Hänger erzeugen.` }
    }
    return { score: 4, note: `Konsonanten-Dopplung: „...${fLast} ${lFirst}...". Kann beim schnellen Sprechen holpern.` }
  }

  // Vowel to consonant or vice versa – generally flows well
  if (VOWELS.has(fLast) !== VOWELS.has(lFirst)) {
    return { score: 0, note: 'Guter Lautübergang zwischen Vor- und Nachname.' }
  }

  return { score: 1, note: 'Akzeptabler Lautübergang.' }
}

// --- Main exported function ---

export function analyzeNameCombo(firstName: string, lastName: string): PhoneticAnalysis {
  const alliteration = analyzeAlliteration(firstName, lastName)
  const assonance = analyzeAssonance(firstName, lastName)
  const rhyme = analyzeRhyme(firstName, lastName)
  const rhythm = analyzeRhythm(firstName, lastName)
  const initials = analyzeInitials(firstName, lastName)
  const soundFlow = analyzeSoundFlow(firstName, lastName)

  // Weighted overall harmony score (0–100, then mapped to 0–10)
  const weightedSum =
    alliteration.score * 1.5 +
    assonance.score * 1.5 +
    rhyme.score * 3 +        // Reimen ist am schlimmsten
    rhythm.score * 1 +
    initials.score * 2.5 +   // Schlechte Initialen sind sehr problematisch
    soundFlow.score * 0.5
  const maxPossible = 10 * (1.5 + 1.5 + 3 + 1 + 2.5 + 0.5) // = 100
  const overallRaw = Math.round((weightedSum / maxPossible) * 10)
  const overall = Math.min(10, Math.max(0, overallRaw))

  let overallNote: string
  if (overall <= 2) {
    overallNote = `„${firstName} ${lastName}" – eine klanglich harmonische Kombination!`
  } else if (overall <= 5) {
    overallNote = `„${firstName} ${lastName}" – klanglich akzeptabel, aber es gibt kleine Auffälligkeiten.`
  } else {
    overallNote = `„${firstName} ${lastName}" – diese Kombination hat klanglich deutliches Verbesserungspotenzial.`
  }

  return {
    alliterationScore: alliteration.score,
    alliterationNote: alliteration.note,
    assonanceScore: assonance.score,
    assonanceNote: assonance.note,
    rhymeScore: rhyme.score,
    rhymeNote: rhyme.note,
    rhythmScore: rhythm.score,
    rhythmNote: rhythm.note,
    initialsScore: initials.score,
    initialsNote: initials.note,
    overallHarmony: overall,
    overallNote,
  }
}
