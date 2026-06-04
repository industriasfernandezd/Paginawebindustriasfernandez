'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="font-display text-sm font-semibold tracking-widest uppercase text-gold mb-3"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className={`font-display text-4xl md:text-5xl font-bold uppercase leading-tight mb-4 ${
          light ? 'text-white' : 'text-navy dark:text-white'
        }`}
      >
        {title}
      </motion.h2>
      {/* Gold rule */}
      <motion.div
        variants={fadeUp}
        className={`h-[3px] bg-gold-gradient w-32 mb-6 ${align === 'center' ? 'mx-auto' : ''}`}
        style={{
          background: 'linear-gradient(90deg, transparent, #B8953F, transparent)',
        }}
      />
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`font-body text-lg leading-relaxed max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-steel-light' : 'text-gray-500 dark:text-steel-light'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
