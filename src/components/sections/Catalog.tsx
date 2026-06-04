'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { MessageCircle, Star, Ruler } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { buildWhatsAppUrl, WA_MESSAGES } from '@/lib/whatsapp'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { products } from '@/data/products'

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
            {filtered.map((product) => (
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
                {/* Product visual placeholder */}
                <div className="relative bg-navy-darker h-40 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 steel-texture opacity-50" />
                  <div className="relative text-center">
                    <div className="font-display font-black text-3xl text-white/20 group-hover:text-white/30 transition-colors">
                      {product.medida}
                    </div>
                    <div className="mt-1">
                      <Ruler className="w-5 h-5 text-gold/40 mx-auto" />
                    </div>
                  </div>
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

        {/* Special measures CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 bg-gold/10 border border-gold/30 rounded-2xl p-8 text-center"
        >
          <p className="font-display font-bold text-white text-xl uppercase tracking-wide mb-2">
            ¿Necesitas una medida especial?
          </p>
          <p className="font-body text-steel-light mb-6 max-w-lg mx-auto">
            Fabricamos <strong className="text-white">cualquier dimensión</strong> a pedido.
            El precio se calcula con app propia y la entrega es en{' '}
            <strong className="text-gold">1–2 días hábiles</strong>.
          </p>
          <motion.a
            href={buildWhatsAppUrl(
              'Hola, necesito una medida especial. ¿Me pueden ayudar con las dimensiones y precio?'
            )}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-gold text-navy font-display font-bold px-8 py-3.5 rounded-full text-base hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
          >
            <MessageCircle className="w-5 h-5" />
            Consultar medida especial
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
