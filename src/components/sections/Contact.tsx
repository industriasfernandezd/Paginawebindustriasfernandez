'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'
import { slideInLeft, slideInRight } from '@/lib/animations'

interface FormFields {
  medida: string
  cantidad: string
  frente: string
  nombre: string
  telefono: string
  email: string
  mensaje: string
}

const initialFields: FormFields = {
  medida: '',
  cantidad: '',
  frente: 'Troquelado',
  nombre: '',
  telefono: '',
  email: '',
  mensaje: '',
}

export function Contact() {
  const [fields, setFields] = useState<FormFields>(initialFields)
  const [error, setError] = useState('')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fields.medida || !fields.cantidad || !fields.nombre || !fields.telefono) {
      setError('Por favor completa los campos obligatorios: medida, cantidad, nombre y teléfono.')
      return
    }
    const url = buildWhatsAppUrl(WA_MESSAGES.quote(fields))
    window.open(url, '_blank')
    setFields(initialFields)
  }

  const inputClass =
    'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/60 focus:bg-white/8 transition-all duration-200'
  const labelClass = 'block font-display text-xs font-semibold uppercase tracking-wide text-steel-light mb-1.5'

  return (
    <section id="contacto" className="py-24 bg-navy steel-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cotiza ahora"
          title="Contacto y cotización"
          subtitle="Completa el formulario y te contactamos por WhatsApp con precio y tiempo de entrega."
          light
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Form */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    Medida deseada <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    name="medida"
                    value={fields.medida}
                    onChange={handleChange}
                    placeholder="ej. 85 × 40 cm"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Cantidad <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    name="cantidad"
                    value={fields.cantidad}
                    onChange={handleChange}
                    placeholder="ej. 10 unidades"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Tipo de frente</label>
                <select
                  name="frente"
                  value={fields.frente}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Troquelado">Troquelado</option>
                  <option value="Malla">Malla</option>
                  <option value="Malla reforzada">Malla reforzada</option>
                  <option value="No sé / consultar">No sé / consultar</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    Nombre <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={fields.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Teléfono / WhatsApp <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={fields.telefono}
                    onChange={handleChange}
                    placeholder="3XX XXX XXXX"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email (opcional)</label>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Mensaje adicional (opcional)</label>
                <textarea
                  name="mensaje"
                  value={fields.mensaje}
                  onChange={handleChange}
                  rows={3}
                  placeholder="¿Algún detalle especial, urgencia o especificación?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <p className="font-body text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-3">
                  {error}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-full font-display font-bold text-lg hover:bg-[#1ebe5d] transition-colors shadow-lg shadow-[#25D366]/20"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar cotización por WhatsApp
              </motion.button>
              <p className="font-body text-xs text-steel text-center">
                Al enviar, se abrirá WhatsApp con tu solicitud pre-llenada.
              </p>
            </form>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact data */}
            <div className="bg-navy-dark rounded-2xl p-6 border border-white/10">
              <p className="font-display font-bold text-gold uppercase tracking-widest text-xs mb-5">
                Información de contacto
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Phone, label: 'PBX 577 29 44' },
                  { icon: MessageCircle, label: '322 675 2057 · 313 400 4306' },
                  { icon: Mail, label: 'industriasfernandezd@gmail.com', small: true },
                  { icon: MapPin, label: 'Cra 78 N° 48A-32 Sur\nKennedy, Bogotá D.C.' },
                  { icon: Clock, label: 'Lun–Vie 7am–5pm · Sáb 7am–12m' },
                ].map(({ icon: Icon, label, small }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                    <span className={`font-body text-white/80 leading-relaxed ${small ? 'text-xs break-all' : 'text-sm'}`}>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.0!2d-74.12!3d4.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCra+78+N%C2%B0+48A-32+Sur%2C+Kennedy%2C+Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Industrias Fernández D."
              />
            </div>

            {/* Direct WA CTA */}
            <motion.a
              href={buildWhatsAppUrl(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-5 hover:bg-[#25D366]/15 transition-colors"
            >
              <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" fill="white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm uppercase tracking-wide">
                  WhatsApp directo
                </p>
                <p className="font-body text-xs text-steel-light">
                  Claudia responde personalmente
                </p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
