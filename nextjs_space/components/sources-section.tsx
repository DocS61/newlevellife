'use client'

import { ExternalLink } from 'lucide-react'

interface Source {
  title: string
  url: string
  publisher: string
}

interface SourcesSectionProps {
  sources: Source[]
  className?: string
}

export function SourcesSection({ sources, className = '' }: SourcesSectionProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 sm:p-6 ${className}`} style={{ boxShadow: 'var(--shadow-sm)' }}>
      <h3 className="font-display text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
        <ExternalLink className="w-4 h-4 text-muted-foreground" />
        Quellen & Referenzen
      </h3>
      <ul className="space-y-2">
        {sources.map((source, i) => (
          <li key={i} className="text-sm text-muted-foreground leading-relaxed">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[hsl(340,75%,55%)] hover:underline"
            >
              {source.title}
            </a>
            {' – '}{source.publisher}
          </li>
        ))}
      </ul>
    </div>
  )
}
