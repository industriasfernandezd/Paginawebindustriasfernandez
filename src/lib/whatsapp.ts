const WA_NUMBER = '573226752057'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

export const WA_MESSAGES = {
  general:
    'Hola, me interesa cotizar nichos/cajas para medidores de gas. ¿Me pueden dar información?',
  hero: 'Hola, quiero cotizar mi nicho para medidor de gas. ¿Cuál es el precio y tiempo de entrega?',
  catalog: (ref: string, medida: string) =>
    `Hola, quiero cotizar:\n📐 Referencia: ${ref}\n📏 Medida: ${medida}\n\n¿Cuál es el precio y tiempo de entrega?`,
  accessory: (label: string) =>
    `Hola, me interesa este accesorio: ${label}. ¿Tienen disponible y cuál es el precio?`,
  quote: (fields: {
    medida: string
    cantidad: string
    frente: string
    nombre: string
    telefono: string
    email?: string
    mensaje?: string
  }) =>
    `*Cotización — Industrias Fernández D.*\n\n📐 Medida: ${fields.medida}\n🔢 Cantidad: ${fields.cantidad}\n🔲 Tipo frente: ${fields.frente}\n\n👤 Nombre: ${fields.nombre}\n📞 Teléfono: ${fields.telefono}${fields.email ? `\n✉️ Email: ${fields.email}` : ''}${fields.mensaje ? `\n\n💬 Mensaje: ${fields.mensaje}` : ''}`,
}
