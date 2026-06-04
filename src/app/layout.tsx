import type { Metadata } from 'next'
import { barlowCondensed, dmSans } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppBubble } from '@/components/layout/WhatsAppBubble'
import './globals.css'

export const metadata: Metadata = {
  title: 'Industrias Fernández D.',
  icons: {
    icon: '/logos/logo.png',
    shortcut: '/logos/logo.png',
    apple: '/logos/logo.png',
  },
  description:
    'Fabricamos nichos, cajas y rejillas para medidores de gas natural. Más de 23 años de experiencia. Entrega en 1–4 días hábiles. Medidas estándar y especiales. Bogotá, Colombia.',
  keywords: [
    'cajas para medidores de gas Bogotá',
    'nichos de gas Colombia',
    'fabricante nichos gas Kennedy',
    'rejillas de ventilación gas natural',
    'cajas metálicas medidores gas precio',
    'nichos gas troquelado pintura electrostática',
    'industrias metalmecánica Bogotá',
    'cajas gas entrega rápida Bogotá',
    'Industrias Fernández',
  ],
  openGraph: {
    title: 'Industrias Fernández D. — Nichos y Cajas para Gas',
    description:
      'Fabricación propia. +23 años. Entrega 1–4 días. Calidad certificada JIS G 3141. Bogotá, Colombia.',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-white dark:bg-navy-darker transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
          <WhatsAppBubble />
        </ThemeProvider>
      </body>
    </html>
  )
}
