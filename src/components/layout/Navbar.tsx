'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, MessageCircle } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

const navLinks = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Nosotros', href: '#clientes' },
  { label: 'Accesorios', href: '#accesorios' },
  { label: 'Contacto', href: '#contacto' },
]

function Logo({ className = '' }: { className?: string }) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Logo: FD gold version for dark bg, color version for light bg
  const logoSrc = mounted && theme === 'light' ? '/logos/logo-light.png' : '/logos/logo-dark.png'
  const hasLogo = true // set to false if logo files not yet added

  if (!hasLogo) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 bg-gold rounded flex items-center justify-center">
          <span className="font-display font-black text-navy text-sm">FD</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative h-14 w-14 ${className}`}>
      <Image
        src={logoSrc}
        alt="Industrias Fernández D. — Logo"
        fill
        className="object-contain"
        sizes="56px"
        priority
      />
    </div>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = mounted && theme === 'light'

  const navBg = scrolled
    ? isLight
      ? 'bg-white/95 backdrop-blur-md shadow-md shadow-black/8'
      : 'bg-navy-darker/95 backdrop-blur-md shadow-lg shadow-black/20'
    : 'bg-transparent'

  const textColor = isLight ? 'text-navy' : 'text-white'
  const linkColor = isLight
    ? 'text-navy/70 hover:text-gold'
    : 'text-white/80 hover:text-gold'

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBg}`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[84px] flex items-center justify-between">
          {/* Logo + brand name */}
          <a href="#hero" className="flex items-center gap-3 group">
            <Logo />
            <div className="hidden sm:block">
              <p className={`font-display font-bold text-base tracking-wider uppercase leading-none transition-colors ${textColor}`}>
                Industrias Fernández D.
              </p>
              <p className="font-body text-gold text-sm tracking-wide">
                Nichos para gas · Bogotá
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-medium tracking-wide transition-colors duration-200 uppercase ${linkColor}`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: toggle + CTA + hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={buildWhatsAppUrl(WA_MESSAGES.hero)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-gold text-navy px-4 py-2 rounded-full text-sm font-display font-bold hover:bg-gold-light transition-colors duration-200"
            >
              <MessageCircle className="w-4 h-4" />
              Cotizar ahora
            </a>
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isLight ? 'text-navy hover:bg-navy/5' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-[84px] left-0 right-0 z-30 backdrop-blur-md border-t md:hidden ${
              isLight
                ? 'bg-white/95 border-gray-200 shadow-md shadow-black/8'
                : 'bg-navy-darker/95 border-white/10 shadow-lg shadow-black/20'
            }`}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`font-display text-base font-medium tracking-wide transition-colors duration-200 uppercase py-3 px-2 border-b ${
                    isLight
                      ? 'text-navy hover:text-gold border-gray-100'
                      : 'text-white hover:text-gold border-white/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="mt-3 inline-flex items-center justify-center gap-2 bg-gold text-navy px-6 py-3 rounded-full font-display font-bold hover:bg-gold-light transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Cotizar ahora
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
