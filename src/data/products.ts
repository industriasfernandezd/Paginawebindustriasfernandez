export interface Product {
  id: string
  ref: string
  medida: string
  contadores: string
  countersCount: number
  frentes: string[]
  precio: string
  popular?: boolean
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
  },
  {
    id: 'nicho-60x25',
    ref: 'Nicho 60×25',
    medida: '60 × 25 cm',
    contadores: '2 medidores',
    countersCount: 2,
    frentes: ['Troquelado'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-60x40',
    ref: 'Nicho 60×40',
    medida: '60 × 40 cm',
    contadores: '2 medidores',
    countersCount: 2,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-70x35',
    ref: 'Nicho 70×35',
    medida: '70 × 35 cm',
    contadores: '2–3 medidores',
    countersCount: 2,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-85x40',
    ref: 'Nicho 85×40',
    medida: '85 × 40 cm',
    contadores: '3 medidores',
    countersCount: 3,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Desde $90.000',
    popular: true,
  },
  {
    id: 'nicho-105x35',
    ref: 'Nicho 105×35',
    medida: '105 × 35 cm',
    contadores: '4 medidores',
    countersCount: 4,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-110x44',
    ref: 'Nicho 110×44',
    medida: '110 × 44 cm',
    contadores: '4 medidores',
    countersCount: 4,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-140x35',
    ref: 'Nicho 140×35',
    medida: '140 × 35 cm',
    contadores: '5 medidores',
    countersCount: 5,
    frentes: ['Troquelado', 'Malla'],
    precio: 'Consultar',
  },
  {
    id: 'nicho-180x35',
    ref: 'Nicho 180×35',
    medida: '180 × 35 cm',
    contadores: '6+ medidores',
    countersCount: 6,
    frentes: ['Malla reforzada'],
    precio: 'Consultar',
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
