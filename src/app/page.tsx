import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { WhyUs } from '@/components/sections/WhyUs'
import { Catalog } from '@/components/sections/Catalog'
import { Process } from '@/components/sections/Process'
import { Clients } from '@/components/sections/Clients'
import { Accessories } from '@/components/sections/Accessories'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WhyUs />
      <Catalog />
      <Process />
      <Clients />
      <Accessories />
      <Contact />
    </main>
  )
}
