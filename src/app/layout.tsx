import type { Metadata } from 'next'
import { barlowCondensed, dmSans } from '@/lib/fonts'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppBubble } from '@/components/layout/WhatsAppBubble'
import './globals.css'

// Cambia esta URL por tu dominio real cuando lo tengas
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://industriasfernandezd.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Industrias Fernández D.',
  image: `${SITE_URL}/Hero.jpg`,
  description:
    'Fabricamos nichos, cajas y rejillas para medidores de gas natural en Bogotá, Colombia. Más de 23 años de experiencia, entrega en 1–4 días hábiles.',
  url: SITE_URL,
  telephone: ['+573226752057', '+573134004306', '+5715772944'],
  email: 'industriasfernandezd@gmail.com',
  foundingDate: '2003',
  numberOfEmployees: 4,
  priceRange: '$$',
  currenciesAccepted: 'COP',
  paymentAccepted: 'Cash, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Cra 78 N° 48A-32 Sur',
    addressLocality: 'Kennedy',
    addressRegion: 'Bogotá D.C.',
    postalCode: '111611',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 4.59,
    longitude: -74.12,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '07:00',
      closes: '12:00',
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Nichos y cajas para medidores de gas',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Nichos para medidores de gas',
          description: 'Nichos metálicos para medidores de gas natural, medidas estándar y especiales.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Cajas para medidores de gas',
          description: 'Cajas metálicas en acero SPCC-CD certificado JIS G 3141 con pintura electrostática.',
        },
      },
    ],
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Industrias Fernández D. — Nichos y Cajas para Gas | Bogotá',
    template: '%s | Industrias Fernández D.',
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
    'nicho medidor gas Bogotá',
    'caja gas acero Colombia',
    'proveedor nichos gas sector gas Colombia',
  ],
  authors: [{ name: 'Industrias Fernández D.' }],
  creator: 'Industrias Fernández D.',
  publisher: 'Industrias Fernández D.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logos/logo.png',
    shortcut: '/logos/logo.png',
    apple: '/logos/logo.png',
  },
  openGraph: {
    title: 'Industrias Fernández D. — Nichos y Cajas para Gas',
    description:
      'Fabricación propia. +23 años. Entrega 1–4 días. Calidad certificada JIS G 3141. Bogotá, Colombia.',
    url: '/',
    siteName: 'Industrias Fernández D.',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/Hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Industrias Fernández D. — Fabricantes de nichos y cajas para gas en Bogotá',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrias Fernández D. — Nichos y Cajas para Gas | Bogotá',
    description:
      'Fabricación propia. +23 años. Entrega 1–4 días. Calidad certificada JIS G 3141. Bogotá, Colombia.',
    images: ['/Hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
