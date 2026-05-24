import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Patrick Bardo — Senior Platform Engineer',
  description: 'Senior Platform Engineer at Zenseact. A reverse-chronological record of infrastructure built, systems scaled, and problems solved.',
  openGraph: {
    title: 'Patrick Bardo — Senior Platform Engineer',
    description: 'Senior Platform Engineer at Zenseact. A reverse-chronological record of infrastructure built, systems scaled, and problems solved.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-surface text-text-primary font-sans antialiased">
        <Nav />
        <div className="pt-12">
          {children}
        </div>
      </body>
    </html>
  )
}
