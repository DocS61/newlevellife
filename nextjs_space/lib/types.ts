export interface NameData {
  id: number
  name: string
  origin: string
  meaningDe: string
  meaningEn: string
  meaningEs: string
  gender: string
  region: string
  bullyingScore: number
  intlScore: number
  careerScore: number
  trendScore: number
  overallRegret: number
  explanationDe: string
  explanationEn: string
  explanationEs: string
  popularity: number
  yearPeak: number | null
}

export interface AIAnalysisResult {
  name: string
  origin: string
  meaning: string
  gender: string
  bullyingScore: number
  bullyingExplanation: string
  intlScore: number
  intlExplanation: string
  careerScore: number
  careerExplanation: string
  trendScore: number
  trendExplanation: string
  overallRegret: number
  overallExplanation: string
}

export interface RecentSearch {
  name: string
  overallRegret: number
  timestamp: number
}
