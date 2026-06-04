export interface ProcessStep {
  id: string
  step: number
  title: string
  description: string
  icon: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'corte',
    step: 1,
    title: 'Corte y doblado',
    description:
      'El operador recibe la lámina cold-rolled calibre 24 y la corta y dobla con precisión según las medidas de la caja — estándar o especial.',
    icon: 'Scissors',
  },
  {
    id: 'armado',
    step: 2,
    title: 'Armado de caja',
    description:
      'Se ensambla la estructura completa: base, laterales y tapa, conformando el cuerpo de la caja con tolerancias dimensionales exactas.',
    icon: 'Box',
  },
  {
    id: 'soldadura',
    step: 3,
    title: 'Soldadura',
    description:
      'El soldador agrega portales, bisagras y portacandado. En cajas con frente en malla se suelda el refuerzo en varilla, ángulo y platina.',
    icon: 'Flame',
  },
  {
    id: 'desengrase',
    step: 4,
    title: 'Desengrase y preparación',
    description:
      'La caja se lava para eliminar grasas y se aplica fosfatado químico para garantizar la máxima adherencia de la pintura.',
    icon: 'Droplets',
  },
  {
    id: 'pintura',
    step: 5,
    title: 'Pintura electrostática',
    description:
      'Se aplica pintura en polvo electrostática sobre la caja preparada. Mayor uniformidad y durabilidad versus pintura líquida convencional.',
    icon: 'Paintbrush',
  },
  {
    id: 'horno',
    step: 6,
    title: 'Horno de curado',
    description:
      'La caja ingresa al horno donde la pintura se funde y cura durante aproximadamente 2 horas. Resultado: acabado duro y resistente a la intemperie.',
    icon: 'Thermometer',
  },
  {
    id: 'viniquelar',
    step: 7,
    title: 'Acabado y almacenamiento',
    description:
      'Se aplica viniquel como acabado protector final. Las cajas se clasifican por medida y referencia, listas para despacho inmediato.',
    icon: 'Package',
  },
]
