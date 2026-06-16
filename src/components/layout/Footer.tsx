import Image from 'next/image'
import { MessageCircle, Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82c-.97-.85-1.6-2.07-1.6-3.42h-3.16v13.84c0 1.62-1.32 2.94-2.94 2.94a2.94 2.94 0 0 1 0-5.88c.27 0 .53.04.78.11V10.4a6.1 6.1 0 0 0-.78-.05A6.11 6.11 0 0 0 2.8 16.46 6.11 6.11 0 0 0 8.9 22.57a6.11 6.11 0 0 0 6.1-6.11V9.4a8.3 8.3 0 0 0 4.85 1.56V7.8a4.85 4.85 0 0 1-3.25-1.98Z" />
    </svg>
  )
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/industriasfernandezd/',
    icon: Instagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@industrias.fernandez',
    icon: TikTokIcon,
  },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-darker text-white">
      {/* Gold rule top */}
      <div className="gold-rule" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logos/logo-dark.png"
                  alt="Industrias Fernández D."
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg tracking-wider uppercase leading-none">
                  Industrias Fernández D.
                </p>
                <p className="font-body text-gold text-sm">Fabricamos contrarreloj.</p>
              </div>
            </div>
            <p className="font-body text-steel-light text-sm leading-relaxed max-w-sm mb-6">
              Empresa metalmecánica colombiana con más de {year - 2003} años fabricando nichos,
              cajas y rejillas para protección de medidores de gas natural.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={buildWhatsAppUrl(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-display font-bold hover:bg-[#1ebe5d] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar por WhatsApp
              </a>
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-steel-light hover:text-gold hover:border-gold/50 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="font-display font-bold text-gold uppercase tracking-widest text-xs mb-5">
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Catálogo', href: '#catalogo' },
                { label: 'Proceso', href: '#proceso' },
                { label: 'Clientes', href: '#clientes' },
                { label: 'Accesorios', href: '#accesorios' },
                { label: 'Contacto', href: '#contacto' },
                { label: 'Quiénes Somos', href: '#quienes-somos' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-steel-light hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display font-bold text-gold uppercase tracking-widest text-xs mb-5">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-steel-light">PBX 577 29 44</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <div className="font-body text-sm text-steel-light">
                  <p>322 675 2057</p>
                  <p>313 400 4306</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:industriasfernandezd@gmail.com"
                  className="font-body text-sm text-steel-light hover:text-gold transition-colors break-all"
                >
                  industriasfernandezd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-steel-light">
                  Cra 78 N° 48A-32 Sur<br />Kennedy, Bogotá D.C.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span className="font-body text-sm text-steel-light">
                  Lun–Vie 7am–5pm<br />Sáb 7am–12m
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-steel">
            © {year} Industrias Fernández D. Todos los derechos reservados.
          </p>
          <p className="font-body text-xs text-steel/60">
            Fabricación nacional · Kennedy, Bogotá · Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
