// Planes de Padel CBA para dueños de clubes. Nada hardcodeado en los componentes: todo sale de acá.
export const ANNUAL_DISCOUNT = 20 // % de descuento pagando anual

export const PLANS = [
  {
    id: 'inicial',
    name: 'Inicial',
    courts: '1 a 3 canchas',
    monthly: 49900,
    featured: false,
    features: [
      'Página propia de tu sede',
      'Agenda y reservas online 24/7',
      'Turnos fijos',
      'Partidos abiertos',
      'Soporte en español',
    ],
  },
  {
    id: 'profesional',
    name: 'Profesional',
    courts: '4 a 6 canchas',
    monthly: 79900,
    featured: true,
    features: [
      'Todo lo del plan Inicial',
      'Señas y pagos online (Mercado Pago)',
      'Base de jugadores e historial',
      'Estadísticas de ocupación',
      'Presencia en ¿Quién Sacó?',
    ],
  },
  {
    id: 'club',
    name: 'Club',
    courts: '7 o más canchas',
    monthly: 109900,
    featured: false,
    features: [
      'Todo lo del plan Profesional',
      'Gestión de múltiples canchas sin límite',
      'Configuración inicial asistida',
      'Soporte prioritario',
    ],
  },
]

export function annualMonthlyEquivalent(monthly) {
  return Math.round((monthly * (1 - ANNUAL_DISCOUNT / 100)) / 100) * 100
}

export function formatPlanPrice(n) {
  return `$${n.toLocaleString('es-AR')}`
}
