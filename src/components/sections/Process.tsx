'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Scissors, Box, Flame, Droplets, Paintbrush, Thermometer, Package } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { processSteps } from '@/data/process-steps'

const iconMap: Record<string, React.ElementType> = {
  Scissors, Box, Flame, Droplets, Paintbrush, Thermometer, Package,
}

const materialSpecs = [
  { label: 'Material', value: 'Lámina acero cold-rolled' },
  { label: 'Calibre', value: 'BWG 18 / Cal. 24' },
  { label: 'Norma', value: 'JIS G 3141 SPCC-CD' },
  { label: 'Elasticidad', value: '274.45 N/MM²' },
  { label: 'Procedencia', value: 'ACESCO / Agofer' },
]

export function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="proceso" className="py-24 bg-white dark:bg-navy-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Proceso de fabricación"
          title="7 etapas de control"
          subtitle="Cada caja que fabricamos pasa por 7 etapas de control: desde el corte de precisión hasta el acabado con viniquel."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {processSteps.map((step, index) => {
            const Icon = iconMap[step.icon] || Package
            const isLast = index === processSteps.length - 1

            return (
              <motion.div key={step.id} variants={fadeUp} className="relative">
                {/* Connector line (hidden on last card and on mobile) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-8 left-full w-5 h-px bg-gold/30 z-10" />
                )}

                <div className="bg-white dark:bg-navy-darker border border-gray-100 dark:border-white/10 rounded-2xl p-6 h-full hover:border-gold/40 hover:shadow-lg transition-all duration-300 group">
                  {/* Step number + icon row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                      <span className="font-display font-black text-navy text-sm">
                        {step.step}
                      </span>
                    </div>
                    <div className="w-10 h-10 bg-navy/5 dark:bg-white/5 group-hover:bg-navy/10 dark:group-hover:bg-gold/10 rounded-xl flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-navy dark:text-steel-light group-hover:dark:text-gold transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-navy dark:text-white uppercase tracking-wide text-sm mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-gray-500 dark:text-steel-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Material specs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-navy rounded-2xl overflow-hidden steel-texture"
        >
          <div className="px-8 py-6 border-b border-white/10">
            <p className="font-display font-bold text-gold uppercase tracking-widest text-sm">
              Ficha técnica del material
            </p>
            <p className="font-body text-steel-light text-sm mt-1">
              Lámina de acero cold-rolled de procedencia nacional certificada
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/10">
            {materialSpecs.map((spec) => (
              <div key={spec.label} className="px-6 py-5">
                <p className="font-body text-xs text-steel-light uppercase tracking-wide mb-1">
                  {spec.label}
                </p>
                <p className="font-display font-bold text-white text-sm">{spec.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
