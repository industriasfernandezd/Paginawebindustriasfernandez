export interface WhyUsItem {
  id: string
  icon: string
  title: string
  description: string
}

export const whyUsItems: WhyUsItem[] = [
  {
    id: 'fabricacion-propia',
    icon: 'Factory',
    title: 'Fabricación propia',
    description:
      'No somos intermediarios. Fabricamos directamente, controlando calidad, tiempos y precios en cada paso del proceso.',
  },
  {
    id: 'entrega-rapida',
    icon: 'Zap',
    title: 'Entrega contrarreloj',
    description:
      'Cajas pequeñas: 1–2 días hábiles. Grandes: máximo 4 días. Ningún competidor en el mercado iguala esta velocidad.',
  },
  {
    id: 'medidas-estandar',
    icon: 'Ruler',
    title: '+12 medidas estándar',
    description:
      'Stock permanente de más de 12 referencias. Fabricamos cualquier medida especial con el mismo tiempo de respuesta.',
  },
  {
    id: 'calidad-certificada',
    icon: 'Shield',
    title: 'Calidad certificada',
    description:
      'Lámina cold-rolled calibre 24. Norma JIS G 3141 SPCC-CD. Elasticidad 274.45 N/MM². Procedencia ACESCO / Agofer.',
  },
  {
    id: 'pintura-electrostatica',
    icon: 'Paintbrush',
    title: 'Pintura electrostática',
    description:
      'Proceso de pintado con polvo electrostático y horno. Mayor adherencia y durabilidad versus pintura líquida convencional.',
  },
  {
    id: 'portacandado',
    icon: 'Lock',
    title: 'Portacandado incluido',
    description:
      'Diseño con perforaciones de seguridad en la lámina frontal (troquel) y portacandado incluido en cada nicho.',
  },
  {
    id: 'precios-volumen',
    icon: 'TrendingDown',
    title: 'Precios por volumen',
    description:
      'Descuentos especiales para ferreterías y mayoristas. Desde una sola caja hasta pedidos de gran escala.',
  },
  {
    id: 'entrega-domicilio',
    icon: 'Truck',
    title: 'Entrega a domicilio',
    description:
      'Despacho propio para pedidos especiales y grandes volúmenes en Bogotá y área metropolitana.',
  },
  {
    id: 'atencion-personalizada',
    icon: 'UserCheck',
    title: 'Atención directa',
    description:
      'Claudia Fernández atiende directamente. Cotización por WhatsApp con respuesta inmediata sin intermediarios.',
  },
  {
    id: 'normativa',
    icon: 'ClipboardCheck',
    title: 'Cumplimiento normativo',
    description:
      'Fabricación según normativa vigente del sector gas. Fichas técnicas disponibles para firmas instaladoras certificadas.',
  },
]
