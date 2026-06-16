'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Factory, Zap, Ruler, Shield, Paintbrush, Lock,
  TrendingDown, Truck, UserCheck, ClipboardCheck,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { whyUsItems } from '@/data/why-us'

const iconMap: Record<string, React.ElementType> = {
  Factory, Zap, Ruler, Shield, Paintbrush, Lock,
  TrendingDown, Truck, UserCheck, ClipboardCheck,
}

export function WhyUs() {
  const videoRef = useRef(null)
  const videoInView = useInView(videoRef, { once: true, amount: 0.2, margin: '200px' })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="ventajas" className="relative overflow-hidden py-24 bg-gray-50 dark:bg-navy-darker transition-colors duration-300">
      <div className="absolute inset-0 grid-bg-light dark:hidden" />
      <div className="absolute inset-0 grid-bg-dots hidden dark:block" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="10 razones sólidas"
          subtitle="No somos intermediarios. Fabricamos directamente, controlando cada etapa del proceso."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        >
          {whyUsItems.map((item) => {
            const Icon = iconMap[item.icon] || Shield
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: '0 20px 30px -8px rgba(30,58,95,0.15)' }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-navy-dark rounded-2xl p-6 border border-gray-100 dark:border-white/10 group cursor-default"
              >
                <div className="w-12 h-12 bg-navy/5 dark:bg-white/5 group-hover:bg-gold/10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-navy dark:text-steel-light group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3 className="font-display font-bold text-navy dark:text-white text-base uppercase tracking-wide mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-gray-500 dark:text-steel-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Video showcase */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 32 }}
          animate={videoInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative h-[280px] sm:h-[360px] lg:h-[480px] rounded-2xl overflow-hidden mt-14 shadow-2xl border border-gray-200 dark:border-white/10 bg-navy-darker"
        >
          {/* El video solo se descarga/monta cuando la sección está cerca del viewport */}
          {videoInView && (
            <video
              src="/video1.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>

      </div>
    </section>
  )
}

