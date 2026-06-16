'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'
import { accessories } from '@/data/accessories'

export function Accessories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="accesorios" className="relative overflow-hidden py-24 bg-gray-50 dark:bg-navy-darker transition-colors duration-300">
      <div className="absolute inset-0 grid-bg-light dark:hidden" />
      <div className="absolute inset-0 grid-bg-dots hidden dark:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Accesorios de gas"
          title="Todo lo que el técnico necesita"
          subtitle="Además de nuestras cajas y nichos, contamos con todos los accesorios para una instalación completa de gas natural."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12"
        >
          {accessories.map((item) => (
            <motion.a
              key={item.label}
              href={buildWhatsAppUrl(WA_MESSAGES.accessory(item.label))}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: '#B8953F' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="group relative bg-white dark:bg-navy-dark border border-gray-100 dark:border-white/10 rounded-xl p-5 text-center"
            >
              <div className="relative w-20 h-20 mx-auto mb-3">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
              <p className="font-body text-base text-gray-700 dark:text-steel-light leading-snug">
                {item.label}
              </p>
              {/* Indicador de WhatsApp al hover */}
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <MessageCircle className="w-3 h-3 text-white" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center bg-navy rounded-2xl p-10 steel-texture"
        >
          <p className="font-display font-bold text-white text-2xl uppercase tracking-wide mb-3">
            Compra todo en un solo lugar
          </p>
          <p className="font-body text-steel-light mb-6 max-w-md mx-auto">
            Caja + accesorios + entrega a domicilio. Todo desde un solo proveedor en Kennedy,
            Bogotá.
          </p>
          <motion.a
            href={buildWhatsAppUrl(
              'Hola, me interesan los accesorios de gas. ¿Qué tienen disponible?'
            )}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-display font-bold text-base hover:bg-[#1ebe5d] transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar disponibilidad
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
