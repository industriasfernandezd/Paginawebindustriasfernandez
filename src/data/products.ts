export interface Product {
  id: string
  ref: string
  medida: string
  contadores: string
  countersCount: number
  frentes: string[]
  precio: string
  popular?: boolean
  /** Foto real del producto (public/). Si no existe, se muestra "Próximamente". */
  image?: string
}

export const products: Product[] = [
  {
    id: 'nicho-37x37',
    ref: 'Nicho 37×37',
    medida: '37 × 37 cm',
    contadores: '1 medidor',
    countersCount: 1,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Desde $40.000',
    image: '/37_37.png',
  },
  {
    id: 'nicho-45x45',
    ref: 'Nicho 45×45',
    medida: '45 × 45 × 20 cm',
    contadores: '2 medidores',
    countersCount: 2,
    frentes: ['Troquelado'],
    precio: 'Consultar',
    image: '/45_45_20.png',
  },
  {
    id: 'nicho-55x25',
    ref: 'Nicho 55×25',
    medida: '55 × 25 × 18 cm',
    contadores: '2 medidores',
    countersCount: 2,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
    image: '/55_25_18.png',
  },
  {
    id: 'nicho-55x55',
    ref: 'Nicho 55×55',
    medida: '55 × 55 × 26 cm',
    contadores: '2–3 medidores',
    countersCount: 2,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
    image: '/55_55_26.png',
  },
  {
    id: 'nicho-60x40',
    ref: 'Nicho 60×40',
    medida: '60 × 40 × 18 cm',
    contadores: '3 medidores',
    countersCount: 3,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Desde $90.000',
    popular: true,
    image: '/60_40_18.png',
  },
  {
    id: 'nicho-70x35',
    ref: 'Nicho 70×35',
    medida: '70 × 35 × 18 cm',
    contadores: '4 medidores',
    countersCount: 4,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
    image: '/70_35_18.png',
  },
  {
    id: 'nicho-90x25',
    ref: 'Nicho 90×25',
    medida: '90 × 25 × 18 cm',
    contadores: '4 medidores',
    countersCount: 4,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
    image: '/90_25_18.png',
  },
  {
    id: 'nicho-105x35',
    ref: 'Nicho 105×35',
    medida: '105 × 35 × 18 cm',
    contadores: '5 medidores',
    countersCount: 5,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
    image: '/105_35_18.png',
  },
  {
    id: 'nicho-140x35',
    ref: 'Nicho 140×35',
    medida: '140 × 35 × 18 cm',
    contadores: '6+ medidores',
    countersCount: 6,
    frentes: ['Malla reforzada'],
    precio: 'Consultar',
    image: '/140_35_18.png',
  },
  {
    id: 'nicho-med-reg',
    ref: 'Nicho Med.+Reg.',
    medida: 'Especial',
    contadores: 'Con regulador',
    countersCount: 1,
    frentes: ['Malla reforzada'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-cat1',
    ref: 'Nicho Cat. 1',
    medida: 'Norma Banti',
    contadores: 'Categoría 1',
    countersCount: 1,
    frentes: ['Troquelado'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-cat2',
    ref: 'Nicho Cat. 2',
    medida: 'Norma Banti',
    contadores: 'Categoría 2',
    countersCount: 2,
    frentes: ['Troquelado'],
    precio: 'Consultar',
  },
]
