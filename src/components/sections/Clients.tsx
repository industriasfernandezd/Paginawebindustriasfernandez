'use client'

import { useState, useRef } from 'react'
import NextImage from 'next/image'
import { motion, useInView } from 'framer-motion'
import {
  Factory, Zap, Award, Shield, Paintbrush, UserCheck, Frame,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { slideInLeft, slideInRight, staggerContainer, fadeUp } from '@/lib/animations'

const reasons = [
  {
    id: 'fabricacion',
    icon: Factory,
    title: 'Fabricación directa',
    description: 'Sin intermediarios. Controlamos cada etapa: corte, soldadura, pintura y horno.',
  },
  {
    id: 'entrega',
    icon: Zap,
    title: '1–4 días de entrega',
    description: 'El más rápido del mercado. Medidas especiales listas en 1–2 días hábiles.',
  },
  {
    id: 'experiencia',
    icon: Award,
    title: '+23 años de trayectoria',
    description: 'Fundados en 2003. Dos décadas sirviendo al sector gas en Colombia.',
  },
  {
    id: 'calidad',
    icon: Shield,
    title: 'Calibre 24 certificado',
    description: 'Material JIS G 3141 SPCC-CD. Fichas técnicas disponibles para auditoría.',
  },
  {
    id: 'pintura',
    icon: Paintbrush,
    title: 'Pintura electrostática',
    description: 'Horno de curado incluido. Acabado duro y resistente a la intemperie.',
  },
  {
    id: 'atencion',
    icon: UserCheck,
    title: 'Atención personalizada',
    description: 'Hablas directamente con Claudia. Sin call centers ni intermediarios.',
  },
]

const comparison = [
  { feature: 'Tiempo de entrega', ifd: '✅ 1–4 días hábiles',         market: '⏱ Hasta 15 días' },
  { feature: 'Medidas especiales', ifd: '✅ 1–2 días',                 market: '❌ Semanas' },
  { feature: 'Calibre de lámina',  ifd: '✅ Calibre 24 certificado',   market: '⚠️ Calibres inferiores' },
  { feature: 'Pintura',            ifd: '✅ Electrostática + horno',    market: '⚠️ Pintura convencional' },
  { feature: 'Fichas técnicas',    ifd: '✅ JIS G 3141 disponibles',    market: '❌ No disponibles' },
  { feature: 'Presencia digital',  ifd: '✅ Web + WhatsApp',            market: '❌ Sin presencia' },
  { feature: 'Atención',           ifd: '✅ Directa con Claudia',       market: '⚠️ Intermediarios' },
]

// Imagen estática — muestra placeholder hasta que exista section_confia.jpg
function TrustImage() {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/[0.02]">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
          <Frame className="w-7 h-7 text-gold/35" />
        </div>
        <div className="text-center">
          <p className="font-display text-[10px] text-steel/70 uppercase tracking-widest">Próximamente</p>
          <p className="font-body text-[9px] text-white/25 mt-1">section_confia.jpg</p>
        </div>
      </div>
    )
  }

  return (
    <NextImage
      src="/images/section_confia.jpg"
      alt="Por qué confiar en Industrias Fernández D."
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 50vw"
      onError={() => setError(true)}
    />
  )
}

export function Clients() {
  const ref    = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="clientes" className="py-24 bg-navy-dark steel-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Razones para confiar en nosotros"
          subtitle="Más de dos décadas fabricando con los mismos principios: calidad, velocidad y atención directa."
          light
        />

        {/* ── Split layout: imagen + razones ── */}
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-start">

          {/* IZQUIERDA — imagen */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Marco con línea dorada superior */}
            <div className="relative h-[420px] lg:h-[520px] rounded-2xl overflow-hidden border border-gold/20">
              <TrustImage />
              {/* Overlay inferior para que el badge sea legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-darker/80 via-transparent to-transparent" />
              {/* Badge flotante */}
              <div className="absolute bottom-6 left-6 bg-navy-darker/90 border border-gold/35 rounded-2xl px-5 py-4 backdrop-blur-sm">
                <p className="font-display font-bold text-gold uppercase tracking-widest text-[10px] mb-0.5">
                  Desde 2003
                </p>
                <p className="font-display font-black text-white text-2xl leading-none">
                  +23 años
                </p>
                <p className="font-body text-xs text-steel-light mt-1">de confianza en el sector gas</p>
              </div>
              {/* Badge superior derecho */}
              <div className="absolute top-6 right-6 bg-[#25D366]/15 border border-[#25D366]/30 rounded-xl px-3 py-2 backdrop-blur-sm">
                <p className="font-display font-bold text-[#25D366] text-xs uppercase tracking-wide">
                  Fabricación nacional
                </p>
              </div>
            </div>
          </motion.div>

          {/* DERECHA — grid de razones */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {reasons.map(({ id, icon: Icon, title, description }) => (
              <motion.div
                key={id}
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: 'rgba(184,149,63,0.4)' }}
                transition={{ duration: 0.2 }}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 cursor-default"
              >
                {/* Icono */}
                <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                {/* Texto */}
                <h4 className="font-display font-bold text-white text-sm uppercase tracking-wide leading-snug mb-2">
                  {title}
                </h4>
                <p className="font-body text-xs text-steel-light leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Tabla comparativa (sin cambios) ── */}
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
