'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { MessageCircle, ChevronDown, Shield, Clock, Award } from 'lucide-react'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'
import { staggerContainer, fadeUp, fadeIn } from '@/lib/animations'

const titleWords = ['Nichos', 'y', 'cajas', 'para', 'gas']

const heroImages = [
  '/Hero.jpg',
  '/Hero2.jpg',
  '/Hero3.jpg',
  '/Hero4.jpg',
  '/Hero5.jpg',
]

function ProductSchematic() {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative flex items-center justify-center w-full h-full"
    >
      {/* Radial glow behind the box */}
      <div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B8953F 0%, transparent 65%)' }}
      />

      {/* Main product box schematic */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, delay: 0.85, ease: 'easeOut' }}
        className="relative w-60 h-72 lg:w-72 lg:h-80"
      >
        {/* Outer frame */}
        <div className="absolute inset-0 border-2 border-gold/50 rounded-xl bg-navy-darker/80 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden">
          {/* Blueprint inner grid */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(184,149,63,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(184,149,63,0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          {/* Inner margin frame */}
          <div className="absolute inset-5 border border-gold/18 rounded-lg pointer-events-none" />
          {/* Vent strip — top */}
          <div className="absolute top-4 left-5 right-5 h-4 border border-gold/25 rounded bg-gold/[0.06] flex items-center justify-evenly px-1.5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-px h-2.5 bg-gold/30" />
            ))}
          </div>
          {/* Handle / lock indicator — bottom center */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded border border-gold/25 bg-gold/[0.08]" />
          {/* Corner crosshair marks */}
          {[
            'top-2.5 left-2.5',
            'top-2.5 right-2.5',
            'bottom-2.5 left-2.5',
            'bottom-2.5 right-2.5',
          ].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-2 h-2 pointer-events-none`}>
              <div className="absolute inset-x-0 top-1/2 h-px bg-gold/30" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-gold/30" />
            </div>
          ))}
          {/* Product image centered inside the frame */}
          <div className="absolute inset-0 flex items-center justify-center px-5 pt-9 pb-7">
            <div className="relative w-full h-full">
              <Image
                src="/foto_hero.png"
                alt="Nicho para gas Industrias Fernández"
                fill
                className="object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
                sizes="(max-width: 1024px) 0px, 320px"
              />
            </div>
          </div>
        </div>

        {/* Width dimension line — bottom */}
        <div className="absolute -bottom-7 inset-x-0 flex items-center gap-1.5">
          <div className="h-px flex-1 bg-gold/30" />
          <span className="font-display text-[9px] text-gold/55 uppercase tracking-widest whitespace-nowrap">
            A medida
          </span>
          <div className="h-px flex-1 bg-gold/30" />
        </div>

        {/* Height dimension line — right */}
        <div className="absolute -right-14 inset-y-0 flex flex-col items-center justify-center gap-0.5">
          <div className="w-px flex-1 bg-gold/30" />
          <span
            className="font-display text-[9px] text-gold/55 uppercase tracking-widest whitespace-nowrap"
            style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
          >
            Cal. 24
          </span>
          <div className="w-px flex-1 bg-gold/30" />
        </div>
      </motion.div>

      {/* Floating spec badge — top right */}
      <motion.div
        initial={{ opacity: 0, x: 18, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.35, duration: 0.45, ease: 'easeOut' }}
        className="absolute top-2 right-0 lg:-right-2 bg-navy-dark/95 border border-gold/35 rounded-xl px-3 py-2 backdrop-blur-sm shadow-lg"
      >
        <p className="font-display font-bold text-[11px] text-gold uppercase tracking-wider leading-none mb-0.5">
          JIS G 3141
        </p>
        <p className="font-body text-[10px] text-steel-light">SPCC-CD · Certificado</p>
      </motion.div>

      {/* Floating delivery badge — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -18, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.55, duration: 0.45, ease: 'easeOut' }}
        className="absolute bottom-8 left-0 bg-[#25D366]/15 border border-[#25D366]/35 rounded-xl px-3 py-2 backdrop-blur-sm shadow-lg"
      >
        <p className="font-display font-bold text-[11px] text-[#25D366] uppercase tracking-wider leading-none mb-0.5">
          Entrega express
        </p>
        <p className="font-body text-[10px] text-steel-light">1–4 días hábiles</p>
      </motion.div>

      {/* Floating experience pill — right middle */}
      <motion.div
        initial={{ opacity: 0, x: 26 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.75, duration: 0.45, ease: 'easeOut' }}
        className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 bg-navy-dark/95 border border-white/12 rounded-full px-4 py-2 shadow-lg backdrop-blur-sm"
      >
        <p className="font-display font-bold text-sm text-white leading-none whitespace-nowrap">
          +23 <span className="text-gold">años</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy-darker"
    >
      {/* Parallax background with slideshow */}
      <motion.div
        className="absolute left-0 right-0 h-[120%]"
        style={{ top: '-10%', y: imageY }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentIndex]}
              alt="Planta de fabricación metalmecánica"
              fill
              className="object-cover grayscale opacity-35"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 grid-bg-dots" />
      {/* Directional gradient: strong left, fade to transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-darker/80 via-navy-darker/60 to-navy-darker/20" />
      {/* Gold spotlight on text area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 75% at 28% 50%, rgba(184,149,63,0.07) 0%, transparent 70%)',
        }}
      />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-darker to-transparent" />

      {/* Left gold accent stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        {/* Split layout: text left (≤lg full width), schematic right (desktop only) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center">

          {/* ── LEFT: text content ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="font-display text-sm font-semibold tracking-widest uppercase text-gold">
                Fabricación propia · Kennedy, Bogotá
              </span>
            </motion.div>

            {/* Main title — word-by-word stagger */}
            <motion.h1
              variants={staggerContainer}
              className="font-display font-black uppercase leading-none mb-4"
            >
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  className="inline-block mr-4 text-5xl md:text-6xl lg:text-7xl text-white"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={fadeUp}
                className="inline-block text-5xl md:text-6xl lg:text-7xl text-gold"
              >
                con entrega
              </motion.span>
              <motion.span
                variants={fadeUp}
                className="inline-block text-5xl md:text-6xl lg:text-7xl text-white"
              >
                en 1–4 días
              </motion.span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="font-display text-2xl md:text-3xl font-light italic text-gold-light tracking-wide mb-4"
            >
              "Fabricamos contrarreloj."
            </motion.p>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="font-body text-lg text-steel-light leading-relaxed mb-10 max-w-xl"
            >
              Fabricación propia desde Bogotá. Medidas estándar y especiales.
              Pintura electrostática certificada. Más de 23 años en el sector gas.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-12">
              <motion.a
                href={buildWhatsAppUrl(WA_MESSAGES.hero)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-8 py-4 rounded-full font-display font-bold text-lg shadow-lg shadow-[#25D366]/30 hover:bg-[#1ebe5d] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Cotiza tu nicho ahora
              </motion.a>
              <motion.a
                href="#catalogo"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-display font-semibold text-lg border-2 border-white/40 hover:border-gold hover:text-gold transition-colors"
              >
                Ver catálogo
              </motion.a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10"
            >
              {[
                { icon: Shield, text: 'JIS G 3141 SPCC-CD' },
                { icon: Clock, text: 'Entrega 1–4 días' },
                { icon: Award, text: '+23 años de experiencia' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gold" />
                  <span className="font-body text-sm text-steel-light">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: product schematic — desktop only ── */}
          <div className="hidden lg:flex items-center justify-center h-[460px]">
            <ProductSchematic />
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20 bg-white/5 rounded-2xl overflow-hidden border border-white/10"
        >
          {[
            { value: '+23', label: 'Años en el mercado' },
            { value: '+12', label: 'Medidas estándar' },
            { value: '1–4', label: 'Días de entrega' },
            { value: '100%', label: 'Fabricación nacional' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="bg-navy-dark/60 px-6 py-5 text-center"
            >
              <p className="font-display font-black text-3xl md:text-4xl text-gold leading-none mb-1">
                {stat.value}
              </p>
              <p className="font-body text-xs text-steel-light uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#quienes-somos"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-gold transition-colors"
        aria-label="Ir a la siguiente sección"
      >
        <ChevronDown className="w-7 h-7" />
      </motion.a>
    </section>
  )
}
