'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Scissors, Box, Flame, Droplets, Paintbrush, Thermometer, Package,
  ChevronLeft, ChevronRight,
} from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { processSteps } from '@/data/process-steps'

const iconMap: Record<string, React.ElementType> = {
  Scissors, Box, Flame, Droplets, Paintbrush, Thermometer, Package,
}

const materialSpecs = [
  { label: 'Material',    value: 'Lámina cold-rolled' },
  { label: 'Calibre',     value: 'BWG 18 / Cal. 24' },
  { label: 'Norma',       value: 'JIS G 3141 SPCC-CD' },
  { label: 'Elasticidad', value: '274.45 N/MM²' },
  { label: 'Procedencia', value: 'ACESCO / Agofer' },
]

const CARD_VARIANTS = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 90 : -90, scale: 0.96 }),
  center: {
    opacity: 1, x: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (dir: number) => ({
    opacity: 0, x: dir > 0 ? -90 : 90, scale: 0.96,
    transition: { duration: 0.25 },
  }),
}

// Imagen estática por etapa — usa el archivo local o muestra placeholder si aún no existe
function StepImage({ stepNumber, icon: Icon }: { stepNumber: number; icon: React.ElementType }) {
  const [error, setError] = useState(false)
  const fileName = stepNumber === 7 ? 'etapa_control_7_1' : `etapa_control_${stepNumber}`

  if (error) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <Icon className="w-10 h-10 text-gold/25" />
        <div className="text-center">
          <p className="font-display text-[10px] text-steel/70 uppercase tracking-widest">
            Próximamente
          </p>
          <p className="font-body text-[9px] text-white/25 mt-1">{fileName}.jpg</p>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={`/${fileName}.jpg`}
      alt={`Etapa ${stepNumber} del proceso de fabricación`}
      fill
      className="object-cover"
      sizes="320px"
      onError={() => setError(true)}
    />
  )
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const [direction, setDirection]   = useState(1)
  const [isPaused, setIsPaused]     = useState(false)
  const ref     = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const goTo = useCallback((i: number) => {
    setDirection(i > activeStep ? 1 : -1)
    setActiveStep(i)
  }, [activeStep])

  const navigate = useCallback((dir: number) => {
    setDirection(dir)
    setActiveStep(prev => (prev + dir + processSteps.length) % processSteps.length)
  }, [])

  // Auto-avance — se pausa al hacer hover
  useEffect(() => {
    if (isPaused || !isInView) return
    const t = setInterval(() => navigate(1), 4500)
    return () => clearInterval(t)
  }, [isPaused, isInView, navigate])

  const step     = processSteps[activeStep]
  const Icon     = iconMap[step.icon] || Package
  const progress = activeStep / (processSteps.length - 1)

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
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* ─────────────── TIMELINE TRACK ─────────────── */}
          <div className="relative mb-10 px-4">
            {/* Línea base */}
            <div className="absolute top-4 sm:top-5 inset-x-4 h-px bg-gray-200 dark:bg-white/10" />
            {/* Progreso en gold */}
            <motion.div
              className="absolute top-4 sm:top-5 left-4 h-px bg-gold/75 origin-left"
              animate={{ scaleX: progress }}
              style={{ right: 'auto', width: 'calc(100% - 2rem)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Nodos */}
            <div className="relative flex justify-between items-start">
              {processSteps.map((s, i) => {
                const isActive = i === activeStep
                const isPast   = i < activeStep
                const NodeIcon = iconMap[s.icon] || Package

                return (
                  <button
                    key={s.id}
                    onClick={() => goTo(i)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className="flex flex-col items-center gap-1.5 sm:gap-2 focus:outline-none"
                    aria-label={`Ir al paso ${s.step}: ${s.title}`}
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center
                        justify-center transition-colors duration-300 shadow-sm
                        ${isActive
                          ? 'bg-gold border-gold shadow-gold/30'
                          : isPast
                          ? 'bg-gold/20 border-gold/55 dark:bg-gold/15'
                          : 'bg-white dark:bg-navy-darker border-gray-200 dark:border-white/20'}
                      `}
                    >
                      {isActive ? (
                        <NodeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-navy" />
                      ) : (
                        <span className={`font-display font-black text-xs ${
                          isPast ? 'text-gold' : 'text-gray-400 dark:text-steel'
                        }`}>
                          {s.step}
                        </span>
                      )}
                    </motion.div>

                    <span className={`
                      hidden sm:block font-display text-[9px] md:text-[10px] uppercase tracking-wider
                      text-center leading-tight max-w-[56px] transition-colors duration-300
                      ${isActive ? 'text-gold font-bold' : isPast ? 'text-gold/50' : 'text-gray-400 dark:text-steel'}
                    `}>
                      {s.title.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ─────────────── CAROUSEL ─────────────── */}
          <div className="flex items-center gap-3 sm:gap-4">

            {/* Flecha anterior */}
            <button
              onClick={() => navigate(-1)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-label="Paso anterior"
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-darker flex items-center justify-center text-gray-500 dark:text-steel-light hover:border-gold hover:text-gold transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Viewport de la tarjeta */}
            <div className="flex-1 overflow-hidden rounded-2xl">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={step.id}
                  custom={direction}
                  variants={CARD_VARIANTS}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="relative overflow-hidden rounded-2xl bg-navy-darker border border-white/10"
                >
                  {/* ── Contador de paso — esquina superior derecha ── */}
                  <div className="absolute top-5 right-6 z-10">
                    <span className="font-display font-bold text-steel text-xs uppercase tracking-widest">
                      {step.step} / {processSteps.length}
                    </span>
                  </div>

                  {/* ── Contenido de la tarjeta ── */}
                  <div className="p-7 sm:p-10 md:p-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center min-h-[300px] sm:min-h-[340px]">

                    {/* IZQUIERDA (3/5): info del paso */}
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/25 flex-shrink-0">
                          <span className="font-display font-black text-navy text-xl">{step.step}</span>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-gold" />
                        </div>
                      </div>

                      <h3 className="font-display font-black text-white text-2xl sm:text-3xl uppercase tracking-wide leading-tight mb-4">
                        {step.title}
                      </h3>
                      <p className="font-body text-steel-light leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* DERECHA (2/5): imagen estática — solo desktop */}
                    <div className="md:col-span-2 hidden md:block">
                      <div className="relative h-52 rounded-xl overflow-hidden border border-white/10">
                        <StepImage stepNumber={step.step} icon={Icon} />
                      </div>
                    </div>
                  </div>

                  {/* ── Barra de progreso ── */}
                  <div className="px-7 sm:px-10 md:px-12 pb-7">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-[10px] text-steel uppercase tracking-widest">
                        Progreso del proceso
                      </span>
                      <span className="font-display text-[10px] text-gold font-bold">
                        {Math.round((step.step / processSteps.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-gold/70 to-gold rounded-full"
                        animate={{ width: `${(step.step / processSteps.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Flecha siguiente */}
            <button
              onClick={() => navigate(1)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-label="Siguiente paso"
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-navy-darker flex items-center justify-center text-gray-500 dark:text-steel-light hover:border-gold hover:text-gold transition-all duration-200 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* ── Dots indicadores ── */}
          <div className="flex justify-center items-center gap-1.5 mt-5">
            {processSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir al paso ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeStep
                    ? 'w-7 bg-gold'
                    : 'w-1.5 bg-gray-300 dark:bg-white/20 hover:bg-gold/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* ─────────────── FICHA TÉCNICA ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 bg-navy rounded-2xl overflow-hidden steel-texture"
        >
          <div className="px-8 py-6 border-b border-white/10">
            <p className="font-display font-bold text-gold uppercase tracking-widest text-base">
              Ficha técnica del material
            </p>
            <p className="font-body text-steel-light text-base mt-1">
              Lámina cold-rolled de procedencia nacional certificada
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/10">
            {materialSpecs.map((spec) => (
              <div key={spec.label} className="px-6 py-6">
                <p className="font-body text-sm text-steel-light uppercase tracking-wide mb-1.5">
                  {spec.label}
                </p>
                <p className="font-display font-bold text-white text-base">{spec.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
