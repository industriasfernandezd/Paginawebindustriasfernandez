'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'navy'
  hover?: boolean
  className?: string
}

export function Card({ children, variant = 'light', hover = true, className = '' }: CardProps) {
  const variants = {
    light: 'bg-white border border-gray-100',
    dark: 'bg-navy-dark border border-navy-light/30',
    navy: 'bg-navy border border-navy-light/20',
  }

  if (!hover) {
    return (
      <div className={`rounded-2xl p-6 ${variants[variant]} ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`rounded-2xl p-6 ${variants[variant]} ${className} transition-shadow duration-300`}
      variants={{
        rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)' },
        hover: { y: -6, boxShadow: '0 20px 30px -8px rgba(0,0,0,0.18)' },
      }}
    >
      {children}
    </motion.div>
  )
}
