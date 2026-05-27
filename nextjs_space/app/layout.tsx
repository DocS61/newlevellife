import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { AppProviders } from '@/components/app-providers'

export const dynamic = 'force-dynamic'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'Namensreue | Babynamen analysieren & bewerten',
  description: 'Analysiere Babynamen auf Mobbing-Risiko, internationale Aussprache, Karrierewirkung und Trends. Finde den perfekten Namen ohne Reue.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Namensreue | Babynamen analysieren & bewerten',
    description: 'Wird dein Kind seinen Namen bereuen? Analysiere jeden Babynamen auf Mobbing-Risiko, Karrierewirkung und Trends.',
    images: ['/api/og?name=Namensreue&score=0&origin=&meaning=Wird%20dein%20Kind%20seinen%20Namen%20bereuen%3F'],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namensreue | Babynamen analysieren & bewerten',
    description: 'Wird dein Kind seinen Namen bereuen? Analysiere jeden Babynamen auf Mobbing-Risiko, Karrierewirkung und Trends.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Namensreue" />
        <meta name="mobile-web-app-capable" content="yes" />
        <script id="usercentrics-cmp" async data-eu-mode="true" data-settings-id="SPSxbDNkfVs2KA" src="https://app.eu.usercentrics.eu/browser-ui/latest/loader.js"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4845255321653497" crossOrigin="anonymous"></script>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Namensreue',
              description: 'Analysiere Babynamen auf Mobbing-Risiko, internationale Aussprache, Karrierewirkung und Trends.',
              url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
              },
              inLanguage: 'de',
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AppProviders>
            {children}
          </AppProviders>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
