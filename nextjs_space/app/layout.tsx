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
  title: 'Namen-Reue-Rechner | Babynamen analysieren & bewerten',
  description: 'Analysiere Babynamen auf Mobbing-Risiko, internationale Aussprache, Karrierewirkung und Trends. Finde den perfekten Namen ohne Reue.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Namen-Reue-Rechner | Babynamen analysieren & bewerten',
    description: 'Wird dein Kind seinen Namen bereuen? Analysiere jeden Babynamen auf Mobbing-Risiko, Karrierewirkung und Trends.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Namen-Reue-Rechner | Babynamen analysieren & bewerten',
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
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js"></script>
      </head>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
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
