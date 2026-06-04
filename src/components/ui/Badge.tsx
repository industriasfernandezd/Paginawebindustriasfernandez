interface BadgeProps {
  children: React.ReactNode
  variant?: 'gold' | 'navy' | 'steel' | 'green'
  className?: string
}

export function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-gold/15 text-gold border border-gold/30',
    navy: 'bg-navy/10 text-navy border border-navy/20',
    steel: 'bg-steel/15 text-steel-dark border border-steel/30',
    green: 'bg-[#25D366]/15 text-[#1a9e4a] border border-[#25D366]/30',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-display font-semibold tracking-wide uppercase ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
