export interface BlogArticle {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  category: string
  categoryColor: string
  emoji: string
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'beliebteste-babynamen-2026',
    title: 'Die beliebtesten Babynamen 2026 in Deutschland',
    description: 'Welche Vornamen liegen 2026 im Trend? Wir analysieren die aktuellen Top-Namen für Mädchen und Jungen – mit überraschenden Auf- und Absteigern.',
    date: '2026-06-10',
    readingTime: '6 Min.',
    category: 'Trends',
    categoryColor: 'hsl(262,60%,55%)',
    emoji: '📈',
  },
  {
    slug: 'seltene-vornamen-mit-schoener-bedeutung',
    title: 'Seltene Vornamen mit wunderschöner Bedeutung',
    description: 'Du suchst einen außergewöhnlichen Namen? Hier findest du 30 seltene Vornamen für Mädchen und Jungen – mit Herkunft und Bedeutung.',
    date: '2026-06-08',
    readingTime: '7 Min.',
    category: 'Inspiration',
    categoryColor: 'hsl(340,75%,55%)',
    emoji: '💎',
  },
  {
    slug: 'babynamen-international-funktionieren',
    title: 'Babynamen, die international funktionieren',
    description: 'Ein Name, der in Deutschland, Frankreich und den USA gleich gut klingt? Diese Vornamen meistern den internationalen Aussprache-Test.',
    date: '2026-06-05',
    readingTime: '5 Min.',
    category: 'Ratgeber',
    categoryColor: 'hsl(170,60%,45%)',
    emoji: '🌍',
  },
  {
    slug: 'tipps-fuer-die-namenswahl',
    title: '10 Tipps für die perfekte Namenswahl',
    description: 'Von der Klangprobe bis zum Geschwister-Check: Mit diesen 10 bewährten Tipps findest du den richtigen Namen für dein Baby.',
    date: '2026-06-02',
    readingTime: '8 Min.',
    category: 'Ratgeber',
    categoryColor: 'hsl(170,60%,45%)',
    emoji: '✅',
  },
  {
    slug: 'namensreue-vermeiden',
    title: 'Namensreue vermeiden: Warum Eltern ihren Namensentscheid bereuen',
    description: 'Studien zeigen: Bis zu 20% der Eltern bereuen die Namenswahl. Erfahre die häufigsten Gründe – und wie du es besser machst.',
    date: '2026-05-28',
    readingTime: '6 Min.',
    category: 'Wissen',
    categoryColor: 'hsl(43,74%,50%)',
    emoji: '🤔',
  },
  {
    slug: 'was-dein-vorname-ueber-dich-verraet',
    title: 'Was dein Vorname über dich verrät – laut Wissenschaft',
    description: 'Beeinflusst der Name die Karriere? Studien zum „Dorian-Gray-Effekt", Vorurteilen bei Bewerbungen und dem Einfluss von Vornamen auf das Leben.',
    date: '2026-05-25',
    readingTime: '7 Min.',
    category: 'Wissen',
    categoryColor: 'hsl(43,74%,50%)',
    emoji: '🔬',
  },
  {
    slug: 'alte-deutsche-vornamen-comeback',
    title: 'Alte deutsche Vornamen feiern ihr Comeback',
    description: 'Karl, Frieda, Theodor, Mathilde – klassische deutsche Namen sind zurück. Warum der Retro-Trend so stark ist und welche Namen jetzt angesagt sind.',
    date: '2026-05-20',
    readingTime: '5 Min.',
    category: 'Trends',
    categoryColor: 'hsl(262,60%,55%)',
    emoji: '🏰',
  },
]

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug)
}