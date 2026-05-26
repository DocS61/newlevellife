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

// --- Double Name Analysis ---

export interface DoubleNameAnalysis {
  flowScore: number
  flowNote: string
  rhythmScore: number
  rhythmNote: string
  styleScore: number
  styleNote: string
  lengthScore: number
  lengthNote: string
  overallDouble: number
  overallNote: string
  tripleRhythmScore?: number
  tripleRhythmNote?: string
}

/** Sound flow between two first names */
function analyzeDoubleFlow(name1: string, name2: string): { score: number; note: string } {
  const end1 = name1.toLowerCase().slice(-1)
  const start2 = name2.toLowerCase().charAt(0)

  if (end1 === start2) {
    if (VOWELS.has(end1)) {
      return { score: 6, note: `Vokal-Zusammenstoß: „${name1}" endet und „${name2}" beginnt mit dem gleichen Vokal – das kann beim Sprechen holpern.` }
    }
    return { score: 5, note: `Konsonanten-Dopplung am Übergang: „...${end1} ${start2}..." – beim schnellen Sprechen holprig.` }
  }

  if (VOWELS.has(end1) !== VOWELS.has(start2)) {
    return { score: 0, note: `Fließender Übergang zwischen „${name1}" und „${name2}" – klingt harmonisch!` }
  }

  const fStart = phoneticStart(name1)
  const sStart = phoneticStart(name2)
  if (fStart === sStart) {
    return { score: 4, note: `Beide Namen beginnen mit dem gleichen Laut – als Doppelname etwas monoton.` }
  }

  return { score: 1, note: 'Akzeptabler Lautübergang zwischen den beiden Vornamen.' }
}

/** Syllable rhythm of double name */
function analyzeDoubleRhythm(name1: string, name2: string): { score: number; note: string } {
  const s1 = countSyllables(name1)
  const s2 = countSyllables(name2)
  const total = s1 + s2

  if (total >= 3 && total <= 5 && s1 !== s2) {
    return { score: 0, note: `Idealer Rhythmus: ${s1}+${s2} Silben (${name1}-${name2}). Unterschiedliche Silbenzahlen erzeugen einen angenehmen Sprechrhythmus.` }
  }

  if (s1 === s2) {
    if (s1 === 1) {
      return { score: 3, note: `Beide Namen haben nur 1 Silbe – als Doppelname (${name1}-${name2}) sehr kurz und abgehackt.` }
    }
    if (s1 >= 3) {
      return { score: 5, note: `Beide Namen haben je ${s1} Silben – als Doppelname (${total} Silben gesamt) recht lang und gleichförmig.` }
    }
    return { score: 2, note: `Beide Namen haben je ${s1} Silben – gleichmäßig, aber etwas monoton im Rhythmus.` }
  }

  if (total >= 7) {
    return { score: 6, note: `Sehr langer Doppelname (${s1}+${s2} = ${total} Silben). Wird im Alltag fast sicher abgekürzt.` }
  }

  if (total <= 2) {
    return { score: 4, note: `Extrem kurzer Doppelname (${total} Silben). Klingt eher wie ein einzelner Name.` }
  }

  return { score: 1, note: `Guter Rhythmus mit ${s1}+${s2} Silben.` }
}

/** Style consistency between two names */
function analyzeDoubleStyle(name1: string, name2: string): { score: number; note: string } {
  const len1 = name1.length
  const len2 = name2.length

  const modernEndings = ['a', 'i', 'o', 'e']
  const classicEndings = ['th', 'ld', 'rt', 'rd', 'nd', 'lm', 'us', 'as', 'es', 'fried', 'helm', 'bert', 'hard', 'gard', 'linde', 'trude']

  const end1Modern = modernEndings.includes(name1.toLowerCase().slice(-1))
  const end2Modern = modernEndings.includes(name2.toLowerCase().slice(-1))
  const end1Classic = classicEndings.some(e => name1.toLowerCase().endsWith(e))
  const end2Classic = classicEndings.some(e => name2.toLowerCase().endsWith(e))

  if (Math.abs(len1 - len2) >= 5) {
    return { score: 5, note: `Großer Längenunterschied (${len1} vs. ${len2} Buchstaben) – die Namen wirken stilistisch unausgewogen.` }
  }

  if ((end1Classic && end2Modern) || (end1Modern && end2Classic)) {
    return { score: 4, note: `Stilmix: Ein Name klingt klassisch, der andere modern. Das kann charmant sein, aber auch unruhig wirken.` }
  }

  if (end1Classic && end2Classic) {
    return { score: 1, note: `Beide Namen haben einen klassischen Stil – das passt gut zusammen als traditioneller Doppelname.` }
  }

  if (end1Modern && end2Modern) {
    return { score: 1, note: `Beide Namen haben einen modernen Klang – stilistisch harmonisch als Doppelname.` }
  }

  return { score: 2, note: 'Die Namen passen stilistisch einigermaßen zusammen.' }
}

/** Overall length assessment for double name */
function analyzeDoubleLength(name1: string, name2: string): { score: number; note: string } {
  const totalChars = name1.length + name2.length
  const totalSyllables = countSyllables(name1) + countSyllables(name2)

  if (totalChars <= 6) {
    return { score: 3, note: `Nur ${totalChars} Buchstaben gesamt – als Doppelname fast zu kurz.` }
  }
  if (totalChars <= 12) {
    return { score: 0, note: `${totalChars} Buchstaben gesamt – ideale Länge für einen Doppelnamen. Alltagstauglich!` }
  }
  if (totalChars <= 16) {
    return { score: 3, note: `${totalChars} Buchstaben gesamt – noch akzeptabel, aber lang für den Alltag.` }
  }
  return { score: 7, note: `${totalChars} Buchstaben gesamt – sehr lang! Im Alltag wird vermutlich nur ein Name verwendet.` }
}

/** Triple combo: first1 + first2 + lastname */
function analyzeTripleRhythm(name1: string, name2: string, lastName: string): { score: number; note: string } {
  const s1 = countSyllables(name1)
  const s2 = countSyllables(name2)
  const sL = countSyllables(lastName)
  const total = s1 + s2 + sL

  if (total <= 4) {
    return { score: 3, note: `${s1}+${s2}+${sL} Silben – insgesamt etwas kurz für einen vollen Doppelnamen mit Nachnamen.` }
  }
  if (total <= 7) {
    return { score: 0, note: `${s1}+${s2}+${sL} Silben – „${name1}-${name2} ${lastName}" hat einen ausgewogenen Gesamtrhythmus!` }
  }
  if (total <= 9) {
    return { score: 4, note: `${s1}+${s2}+${sL} = ${total} Silben – „${name1}-${name2} ${lastName}" ist recht lang, aber noch tragbar.` }
  }
  return { score: 7, note: `${s1}+${s2}+${sL} = ${total} Silben – „${name1}-${name2} ${lastName}" ist sehr lang. Formular-Albtraum!` }
}

export function analyzeDoubleName(name1: string, name2: string, lastName?: string): DoubleNameAnalysis {
  const flow = analyzeDoubleFlow(name1, name2)
  const rhythm = analyzeDoubleRhythm(name1, name2)
  const style = analyzeDoubleStyle(name1, name2)
  const length = analyzeDoubleLength(name1, name2)

  // Weighted overall
  const weightedSum =
    flow.score * 2.5 +
    rhythm.score * 2 +
    style.score * 1.5 +
    length.score * 2
  const maxPossible = 10 * (2.5 + 2 + 1.5 + 2) // = 80
  const overallRaw = Math.round((weightedSum / maxPossible) * 10)
  const overall = Math.min(10, Math.max(0, overallRaw))

  let overallNote: string
  if (overall <= 2) {
    overallNote = `„${name1}-${name2}" – ein harmonischer Doppelname! Klingt ausgewogen und stimmig.`
  } else if (overall <= 5) {
    overallNote = `„${name1}-${name2}" – als Doppelname akzeptabel, aber mit kleinen Schwächen.`
  } else {
    overallNote = `„${name1}-${name2}" – als Doppelname eher kritisch. Es gibt bessere Kombinationen.`
  }

  const result: DoubleNameAnalysis = {
    flowScore: flow.score,
    flowNote: flow.note,
    rhythmScore: rhythm.score,
    rhythmNote: rhythm.note,
    styleScore: style.score,
    styleNote: style.note,
    lengthScore: length.score,
    lengthNote: length.note,
    overallDouble: overall,
    overallNote,
  }

  if (lastName) {
    const triple = analyzeTripleRhythm(name1, name2, lastName)
    result.tripleRhythmScore = triple.score
    result.tripleRhythmNote = triple.note
  }

  return result
}
