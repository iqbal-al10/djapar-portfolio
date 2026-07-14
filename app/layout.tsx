import type { Metadata } from 'next'
import { Inter, Outfit, Bebas_Neue, Dancing_Script } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './context/LanguageContext'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({ 
  weight: ['400'], 
  subsets: ['latin'], 
  variable: '--font-bebas-neue',
  display: 'swap',
})

const dancingScript = Dancing_Script({ 
  subsets: ['latin'], 
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'D.japar | Professional DJ & Live Saxophonist',
  description: 'Official portfolio of D.japar, Professional DJ & Live Saxophonist from Surabaya, Indonesia.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${outfit.variable} ${bebasNeue.variable} ${dancingScript.variable}`}
      suppressHydrationWarning
    >
      <body 
        className="bg-[#050505] text-white antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}