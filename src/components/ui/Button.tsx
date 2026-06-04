'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  className?: string
  external?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gold text-navy-dark font-bold border-2 border-gold hover:bg-gold-light hover:border-gold-light',
  secondary:
    'bg-transparent text-white font-semibold border-2 border-white/60 hover:border-gold hover:text-gold',
  ghost:
    'bg-transparent text-navy font-semibold border-2 border-navy/30 hover:border-navy hover:bg-navy/5',
  whatsapp:
    'bg-[#25D366] text-white font-bold border-2 border-[#25D366] hover:bg-[#1ebe5d] hover:border-[#1ebe5d]',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  external = false,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-200 cursor-pointer font-display tracking-wide'
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.03 },
    whileTap: disabled ? {} : { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      )
    }
    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a className={classes} {...motionProps}>
          {children}
        </motion.a>
      </Link>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
