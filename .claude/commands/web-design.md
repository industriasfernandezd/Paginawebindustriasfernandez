# Web Design Skill — Industrias Fernandez

You are a senior frontend engineer and UI/UX designer specializing in modern React/Next.js applications. When this skill is active, apply the following standards to every component, page, and animation you produce.

---

## Project Context

**Client:** Industrias Fernandez
**Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS
**Phase 1 scope:** Landing page — services showcase, about section, WhatsApp CTA
**Phase 2 (upcoming):** Inventory management, user dashboard, auth system

Design decisions must be **scalable** — avoid one-off hacks that will break when Phase 2 features are added.

---

## Design System

### Color Strategy
- Define a palette in `tailwind.config.ts` with semantic tokens: `brand-primary`, `brand-secondary`, `surface`, `on-surface`, `muted`
- Never hardcode hex values in components — always use Tailwind config tokens
- Use neutral grays (slate or zinc) for backgrounds, one vivid brand color for CTAs, and a complementary accent for highlights
- Ensure 4.5:1 contrast ratio minimum for text (WCAG AA)

### Typography
- Use `next/font` (Google Fonts or local) — never `@import` from CSS
- Scale: `text-sm` for captions, `text-base` for body, `text-xl–3xl` for headings, `text-4xl–7xl` for hero titles
- Line height: `leading-tight` for headings, `leading-relaxed` for body text
- Font weight: 700–900 for display, 400–500 for body

### Spacing
- Use the Tailwind 4/8px spacing grid — multiples of 4: `p-4`, `p-8`, `gap-6`, etc.
- Section vertical padding: minimum `py-16 md:py-24`
- Max content width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Shadows & Elevation
- Cards: `shadow-md hover:shadow-xl transition-shadow`
- Modals/drawers: `shadow-2xl`
- Never stack multiple box-shadows manually — use Tailwind presets

---

## Animation Standards (Framer Motion)

### Setup
Always install: `npm install framer-motion`
Import: `import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'`

### Core Variants — reuse these, don't invent new ones

```tsx
// Fade up — for text blocks, cards, sections entering viewport
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Fade in — for images, backgrounds
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

// Scale pop — for buttons, icons on hover
export const scalePop = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 17 } },
}

// Stagger container — for lists of cards
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
```

### Scroll-triggered Animations
Always use `useInView` with `once: true` and `amount: 0.2` so elements animate when they enter the viewport, not on page load:

```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, amount: 0.2 })

<motion.div
  ref={ref}
  variants={fadeUp}
  initial="hidden"
  animate={isInView ? 'visible' : 'hidden'}
/>
```

### Page Transitions
Wrap page content in:
```tsx
<motion.main
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.3 }}
>
```

### Performance Rules
- Never animate `width`, `height`, or `top/left` — always use `transform` (scale, x, y) and `opacity`
- Add `will-change: transform` via Tailwind's `will-change-transform` only on elements that animate continuously
- Use `layoutId` for shared element transitions (e.g., modal → card)
- Respect `prefers-reduced-motion`:
```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Pass duration: 0 or skip animation variants when true
```

---

## Component Architecture

### Folder structure
```
src/
  components/
    ui/          # Primitives: Button, Card, Badge, Input
    sections/    # Page sections: Hero, Services, About, Contact
    layout/      # Navbar, Footer, PageWrapper
  lib/
    animations.ts  # All shared Framer Motion variants
    fonts.ts       # next/font config
  app/
    page.tsx     # Assembles sections
    layout.tsx   # Root layout
```

### Button Component Rules
- Always have variants: `primary`, `secondary`, `ghost`
- WhatsApp CTA button must use green (`bg-[#25D366]`) and open `https://wa.me/{number}` with a pre-filled message via `?text=` param
- Use `<motion.button>` with `whileHover` and `whileTap` for tactile feedback

```tsx
// WhatsApp CTA pattern
const whatsappUrl = `https://wa.me/5491112345678?text=${encodeURIComponent('Hola, quiero consultar sobre sus servicios')}`
<motion.a
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold shadow-lg"
>
  <WhatsAppIcon /> Consultar ahora
</motion.a>
```

### Card Component Rules
- Always have a hover state: lift (`-translate-y-1`) + shadow increase
- Use `group` class for coordinated hover effects on children
- Rounded corners: `rounded-2xl` for cards, `rounded-full` for badges/pills

---

## Section Patterns

### Hero Section
- Full viewport height: `min-h-screen`
- Background: gradient, image with overlay, or abstract SVG pattern
- Content: headline (max 8 words), subheadline (1–2 lines), primary CTA + secondary CTA
- Animated headline: use `motion.span` per word with stagger
- Floating/parallax element: `useScroll` + `useTransform` for depth

### Services Section
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Each card: icon (SVG or Lucide), title, 2-line description
- Stagger cards with `staggerContainer` variant
- Hover: reveal a subtle "Ver más" link with `AnimatePresence`

### About / Who We Are Section
- Split layout: text left, image/graphic right (swap on mobile)
- Use a subtle background color shift to differentiate from adjacent sections
- Add a counter row (years of experience, clients, projects) animated with `useInView`

### Contact / WhatsApp Section
- Minimal: headline, 1-line description, large WhatsApp button
- Optionally add floating WhatsApp bubble (fixed bottom-right) visible after scroll past hero
- The floating bubble should pulse with a CSS `animate-bounce` or Framer `keyframes`

---

## Floating WhatsApp Bubble (global)

Add to `layout.tsx`, visible after `scrollY > 400`:

```tsx
'use client'
import { motion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

export function WhatsAppBubble({ number, message }: { number: string; message: string }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl"
          aria-label="Contactar por WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
```

---

## Responsive Design Rules

- Mobile-first always: base class = mobile, `sm:` / `md:` / `lg:` for larger screens
- Navigation: hamburger menu on mobile with `AnimatePresence` slide-down
- Test every section at 375px, 768px, and 1440px
- Touch targets minimum 44×44px
- No horizontal overflow: always set `overflow-x-hidden` on `<body>`

---

## Performance & SEO (Next.js)

- Images: always use `next/image` with `width`, `height`, and `alt`
- Lazy load below-the-fold images: `loading="lazy"` (default in `next/image`)
- Metadata: define `generateMetadata` or `metadata` export in each `page.tsx`
- Fonts loaded via `next/font`, passed as CSS variables, no layout shift
- Dynamic imports for heavy components: `dynamic(() => import('./HeavyComponent'), { ssr: false })`

---

## Accessibility Checklist

- All interactive elements are keyboard-navigable
- `aria-label` on icon-only buttons
- Color is never the sole indicator of state
- `<main>`, `<nav>`, `<section>`, `<footer>` landmarks used correctly
- Focus ring visible: `focus-visible:ring-2 focus-visible:ring-brand-primary`

---

## When invoked

When the user invokes `/web-design` or this skill is active:
1. Apply all the above standards automatically to every component you generate
2. Use Framer Motion for any animation unless the user explicitly asks for pure CSS
3. Always build with Phase 2 in mind: keep business logic out of UI components, use a `lib/` folder, avoid tight coupling
4. Suggest the floating WhatsApp bubble if it hasn't been implemented yet
5. Flag any performance anti-pattern (animating layout properties, blocking fonts, missing `alt` text)
