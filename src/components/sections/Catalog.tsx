'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MessageCircle, Star, Ruler, Clock, Zap, ImageOff } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { products } from '@/data/products'

const ctaBgImages = [
  '/Medida_especial.JPG',
  '/Medida_especial2.jpg',
  '/Medida_especial3.jpg',
  '/Hero3.jpg',
]

const filters = [
  { label: 'Todos', value: 0 },
  { label: '1 medidor', value: 1 },
  { label: '2 medidores', value: 2 },
  { label: '3 medidores', value: 3 },
  { label: '4+ medidores', value: 4 },
]

export function Catalog() {
  const [activeFilter, setActiveFilter] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  const [ctaBgIndex, setCtaBgIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCtaBgIndex((prev) => (prev + 1) % ctaBgImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filtered =
    activeFilter === 0
      ? products
      : activeFilter === 4
      ? products.filter((p) => p.countersCount >= 4)
      : products.filter((p) => p.countersCount === activeFilter)

  return (
    <section id="catalogo" className="py-24 bg-navy steel-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Catálogo de productos"
          title="12 medidas estándar"
          subtitle="Stock permanente. Fabricamos cualquier medida especial en 1–2 días con precio calculado por app propia."
          light
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-full font-display text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                activeFilter === f.value
                  ? 'bg-gold text-navy shadow-lg shadow-gold/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-navy-dark border border-white/10 rounded-2xl overflow-hidden group hover:border-gold/40 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
              >
                {/* Product visual */}
                <div className="relative bg-navy-darker h-44 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 steel-texture opacity-50" />
                  {product.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={product.image}
                        alt={product.ref}
                        fill
                        className="object-contain p-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center justify-center gap-2 z-10">
                      <ImageOff className="w-7 h-7 text-steel/40" />
                      <p className="font-display text-[10px] text-steel/60 uppercase tracking-widest">
                        Próximamente
                      </p>
                    </div>
                  )}
                  {product.popular && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="gold" className="gap-1">
                        <Star className="w-3 h-3" fill="currentColor" />
                        Popular
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-white uppercase tracking-wide text-base mb-1">
                    {product.ref}
                  </h3>
                  <p className="font-body text-sm text-steel-light mb-3">
                    {product.contadores}
                  </p>

                  {/* Frentes */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.frentes.map((frente) => (
                      <span
                        key={frente}
                        className="text-xs font-body px-2.5 py-1 rounded-full bg-white/10 text-white/70"
                      >
                        {frente}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-gold text-lg">
                      {product.precio}
                    </p>
                    <motion.a
                      href={buildWhatsAppUrl(WA_MESSAGES.catalog(product.ref, product.medida))}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-1.5 bg-[#25D366] text-white px-4 py-2 rounded-full text-sm font-display font-bold hover:bg-[#1ebe5d] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Cotizar
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Special measures CTA — redesigned */}
        <div ref={ctaRef} className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-gold/25"
          >
            {/* Gold top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent z-10" />

            {/* Split grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

              {/* LEFT — content */}
              <div className="relative bg-navy-darker steel-texture flex flex-col justify-center px-10 py-14 lg:py-16 z-10">
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="h-px w-8 bg-gold" />
                  <span className="font-display text-xs font-bold text-gold uppercase tracking-widest">
                    Fabricación personalizada
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h3
                  initial={{ opacity: 0, x: -24 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.55 }}
                  className="font-display font-black text-3xl md:text-4xl text-white uppercase leading-tight mb-5"
                >
                  ¿Necesitas una <br />
                  <span className="text-gold">medida especial?</span>
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="font-body text-steel-light leading-relaxed mb-8 max-w-md"
                >
                  Fabricamos <strong className="text-white">cualquier dimensión</strong> a pedido.
                  Medimos, calculamos y entregamos — todo en tiempo récord.
                </motion.p>

                {/* Benefit list */}
                <motion.ul
                  initial="hidden"
                  animate={ctaInView ? 'visible' : 'hidden'}
                  variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
                  className="space-y-3.5 mb-10"
                >
                  {[
                    { icon: Ruler, text: 'Ancho, alto y profundidad completamente a tu medida' },
                    { icon: Zap,   text: 'Precio calculado al instante con app propia' },
                    { icon: Clock, text: 'Entrega en 1–2 días hábiles desde la confirmación' },
                  ].map(({ icon: Icon, text }) => (
                    <motion.li
                      key={text}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                      }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <span className="font-body text-sm text-steel-light leading-relaxed">{text}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.85, duration: 0.45 }}
                >
                  <motion.a
                    href={buildWhatsAppUrl(
                      'Hola, necesito una medida especial. ¿Me pueden ayudar con las dimensiones y precio?'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 bg-[#25D366] text-white font-display font-bold px-8 py-4 rounded-full text-base shadow-lg shadow-[#25D366]/25 hover:bg-[#1ebe5d] transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Consultar medida especial
                  </motion.a>
                </motion.div>
              </div>

              {/* RIGHT — image slideshow */}
              <div className="relative hidden lg:block min-h-[420px]">
                <AnimatePresence mode="sync">
                  <motion.div
                    key={ctaBgIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={ctaBgImages[ctaBgIndex]}
                      alt="Fabricación de nichos a medida especial"
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Left-side gradient so it blends with the content panel */}
                <div className="absolute inset-0 bg-gradient-to-r from-navy-darker via-navy-darker/40 to-transparent" />
                {/* Bottom dark fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-darker/60 via-transparent to-transparent" />

                {/* Floating delivery card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute bottom-8 right-8 bg-navy-darker/90 border border-gold/35 rounded-2xl px-6 py-4 backdrop-blur-sm shadow-xl"
                >
                  <p className="font-display font-bold text-gold uppercase tracking-widest text-[10px] mb-1">
                    Entrega garantizada
                  </p>
                  <p className="font-display font-black text-white text-3xl leading-none">
                    1–2 <span className="text-gold text-xl">días</span>
                  </p>
                  <p className="font-body text-xs text-steel-light mt-1">desde la confirmación</p>
                </motion.div>

                {/* Floating top-right badge */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={ctaInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.05, duration: 0.45 }}
                  className="absolute top-8 right-8 bg-[#25D366]/15 border border-[#25D366]/35 rounded-xl px-4 py-2.5 backdrop-blur-sm"
                >
                  <p className="font-display font-bold text-[#25D366] text-xs uppercase tracking-wide">
                    A tu medida exacta
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
