'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, slideInLeft, slideInRight, staggerContainer } from '@/lib/animations'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
  duration?: number
}

function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return controls.stop
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  { prefix: '+', value: new Date().getFullYear() - 2003, suffix: '', label: 'Años en el mercado', desc: 'Fundados en 2003' },
  { prefix: '', value: 4, suffix: '', label: 'Personas en el equipo', desc: 'Operativas + administrativa' },
  { prefix: '+', value: 12, suffix: '', label: 'Medidas estándar', desc: 'Stock permanente' },
  { prefix: '1–', value: 4, suffix: ' días', label: 'Tiempo de entrega', desc: 'Máximo hábiles' },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="quienes-somos" className="py-24 bg-white dark:bg-navy-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nuestra historia"
          title="Quiénes somos"
          subtitle="Más de dos décadas fabricando la solución que el mercado necesitaba."
        />

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Origin story */}
            <div className="space-y-5 font-body text-gray-600 dark:text-steel-light leading-relaxed">
              <p>
                <span className="font-display font-bold text-navy dark:text-white text-xl">
                  Industrias Fernández D.
                </span>{' '}
                nació en 2003 como solución a un problema real: los únicos dos proveedores del
                mercado tardaban{' '}
                <span className="font-semibold text-navy dark:text-white">hasta 15 días en entregar</span>, y
                nosotros necesitábamos las cajas instaladas de inmediato.
              </p>
              <p>
                Germán Fernández aprendió el proceso, adquirió la maquinaria y contrató el
                personal especializado. Lo que nació como solución interna para GC Ingeniería se
                convirtió en una empresa manufacturera independiente.
              </p>
              <p>
                Hoy, más de {new Date().getFullYear() - 2003} años después, abastecemos a{' '}
                <span className="font-semibold text-navy dark:text-white">
                  técnicos independientes, ferreterías, firmas instaladoras y grandes contratistas
                </span>{' '}
                del sector gas en Bogotá y Colombia — con los mismos principios: calidad,
                velocidad y atención directa.
              </p>
              <p className="font-semibold text-navy dark:text-white">
                Claudia Fernández lidera el equipo de 4 personas que convierte lámina de acero en
                un producto terminado listo en horas.
              </p>
            </div>

            {/* Decorative quote */}
            <blockquote className="mt-8 pl-5 border-l-4 border-gold">
              <p className="font-display text-xl font-light italic text-navy dark:text-white leading-snug">
                "Con los mismos principios con los que empezamos: calidad, velocidad y atención
                directa."
              </p>
            </blockquote>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="bg-navy p-6 rounded-2xl steel-texture group hover:bg-navy-light transition-colors duration-300"
                >
                  <p className="font-display font-black text-4xl md:text-5xl text-gold leading-none mb-1">
                    {stat.prefix}
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-display font-bold text-white text-sm uppercase tracking-wide mb-1">
                    {stat.label}
                  </p>
                  <p className="font-body text-xs text-steel-light">{stat.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission / Vision pills */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-navy-darker rounded-2xl p-5 border border-gray-100 dark:border-white/10">
                <p className="font-display font-bold text-gold text-xs uppercase tracking-widest mb-2">
                  Misión
                </p>
                <p className="font-body text-sm text-gray-600 dark:text-steel-light leading-relaxed">
                  Fabricar nichos y cajas metálicas garantizando precisión, durabilidad y
                  entregas puntuales para técnicos, ferreterías e instaladoras en Colombia.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-navy-darker rounded-2xl p-5 border border-gray-100 dark:border-white/10">
                <p className="font-display font-bold text-gold text-xs uppercase tracking-widest mb-2">
                  Visión
                </p>
                <p className="font-body text-sm text-gray-600 dark:text-steel-light leading-relaxed">
                  Ser el fabricante #1 de soluciones metálicas para infraestructura de gas en
                  Colombia, con presencia digital consolidada antes de 2027.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
