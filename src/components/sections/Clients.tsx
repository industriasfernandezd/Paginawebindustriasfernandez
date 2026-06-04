'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { staggerContainer, fadeUp } from '@/lib/animations'

const clients = [
  { name: 'DIS Construcciones', initials: 'DC', role: 'Gran contratista' },
  { name: 'GC Ingeniería', initials: 'GC', role: 'Alianza estratégica' },
  { name: 'Aldetal', initials: 'AL', role: 'Distribuidor ferretero' },
  { name: 'Ferreterías Bogotá', initials: 'FB', role: 'Red en crecimiento' },
  { name: 'Técnicos independientes', initials: 'TI', role: 'Clientes recurrentes' },
]

const comparison = [
  { feature: 'Tiempo de entrega', ifd: '✅ 1–4 días hábiles', market: '⏱ Hasta 15 días' },
  { feature: 'Medidas especiales', ifd: '✅ 1–2 días', market: '❌ Semanas' },
  { feature: 'Calibre de lámina', ifd: '✅ Calibre 24 certificado', market: '⚠️ Calibres inferiores' },
  { feature: 'Pintura', ifd: '✅ Electrostática + horno', market: '⚠️ Pintura convencional' },
  { feature: 'Fichas técnicas', ifd: '✅ JIS G 3141 disponibles', market: '❌ No disponibles' },
  { feature: 'Presencia digital', ifd: '✅ Web + WhatsApp', market: '❌ Sin presencia' },
  { feature: 'Atención', ifd: '✅ Directa con Claudia', market: '⚠️ Intermediarios' },
]

export function Clients() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="clientes" className="py-24 bg-navy-dark steel-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Clientes y proyectos"
          title="Quiénes confían en nosotros"
          subtitle="Desde técnicos independientes hasta grandes contratistas del sector gas."
          light
        />

        {/* Client logos */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-5 mb-20"
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={fadeUp}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-20 h-20 bg-white/10 group-hover:bg-white/15 border border-white/20 group-hover:border-gold/40 rounded-2xl flex items-center justify-center transition-all duration-300">
                <span className="font-display font-black text-2xl text-white/60 group-hover:text-gold transition-colors">
                  {client.initials}
                </span>
              </div>
              <div className="text-center">
                <p className="font-display font-bold text-white text-xs uppercase tracking-wide">
                  {client.name}
                </p>
                <p className="font-body text-steel text-xs">{client.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="font-display font-bold text-gold text-center uppercase tracking-widest text-sm mb-6">
            Industrias Fernández D. vs. el mercado
          </p>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="bg-navy-darker">
                  <th className="text-left px-6 py-4 font-display text-xs font-bold uppercase tracking-widest text-steel-light">
                    Característica
                  </th>
                  <th className="text-left px-6 py-4 font-display text-xs font-bold uppercase tracking-widest text-gold">
                    Industrias Fernández D.
                  </th>
                  <th className="text-left px-6 py-4 font-display text-xs font-bold uppercase tracking-widest text-steel">
                    Mercado general
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-navy/50' : 'bg-navy/30'}>
                    <td className="px-6 py-4 font-body text-sm text-steel-light">{row.feature}</td>
                    <td className="px-6 py-4 font-body text-sm text-white">{row.ifd}</td>
                    <td className="px-6 py-4 font-body text-sm text-steel">{row.market}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
