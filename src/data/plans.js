// Precios de Padel CBA: instalación (pago único), addon opcional y gestión mensual.
// Nada hardcodeado en los componentes: todo sale de acá.

export const SETUP_DEPOSIT_NOTE =
  'Se abona una seña del 30% para arrancar con los gastos iniciales. El resto se paga cuando el sistema está entregado y funcionando.'

// Modalidades de pago para el setup (paso 1). "Mensual" no tiene pago inicial: se financia el
// mismo plan en 20 cuotas (priceMonthly = price/20), después de las cuales el setup ya está
// pago — coherencia con el mismo mecanismo usado en Sala de Espera.
export const SETUP_MODALITIES = [
  { id: 'unico', name: 'Pago único', note: SETUP_DEPOSIT_NOTE },
  {
    id: 'mensual',
    name: 'Pago mensual',
    note: 'Sin pago inicial: se financia en 20 cuotas fijas. Si en algún momento cancelás, se interrumpe el desarrollo o se da de baja el sitio.',
  },
]
export const SETUP_MONTHLY_MONTHS = 20

// Comparación corto/largo plazo entre modalidades — filas cualitativas (fijas) + meses de
// referencia para la tabla de costo acumulado (se calcula en el componente con cada plan).
export const SETUP_MODALITY_QUALITATIVE = [
  { label: 'Pago inicial', unico: 'El precio completo', mensual: '$0 — arrancás sin desembolso' },
  { label: 'Dueño del sitio', unico: 'El club, desde el día 1', mensual: 'Padel CBA, mientras se pague la cuota' },
  { label: 'Si en algún momento cancelás', unico: 'No pasa nada, ya es tuyo', mensual: 'Se da de baja el sitio' },
]
export const SETUP_MODALITY_MONTH_MARKS = [12, 20, 36]

// Paso 1 — sistema llave en mano, pago único de instalación (o financiado en 20 cuotas).
// Estrategia Good/Better/Best: la del medio es la que más conviene vender, por eso va destacada.
export const SETUP_PLANS = [
  {
    id: 'esencial',
    name: 'Esencial',
    price: 300,
    priceMonthly: 15,
    featured: false,
    features: ['Despliegue del sistema base', 'Tu logo y colores', 'Subdominio propio (tuclub.padelcba.com)', 'Carga de datos por cuenta del cliente'],
    cta: 'Empezar con Esencial',
    ctaStyle: 'ghost',
  },
  {
    id: 'llave-en-mano',
    name: 'Llave en Mano',
    price: 500,
    priceMonthly: 25,
    featured: true,
    features: ['Todo lo del plan Esencial', 'Dominio .com.ar propio', 'Data entry completo — cargamos tus canchas y kiosco por vos', 'Capacitación en vivo para tu staff'],
    cta: 'Quiero este plan',
    ctaStyle: 'solid',
  },
  {
    id: 'marca-blanca',
    name: 'Marca Blanca',
    price: 600,
    priceMonthly: 30,
    featured: false,
    features: ['Todo lo de Llave en Mano', 'Rediseño visual exclusivo de tu portada', 'Integración avanzada con bot de WhatsApp propio'],
    cta: 'Contactar',
    ctaStyle: 'ghost',
    customNote: '¿Lo querés 100% a medida, fuera de nuestras paletas? Se charla — precio a convenir.',
  },
]

// Paso 2 (opcional) — add-on a medida para el dueño, separado del setup. Tiene su propio
// mantenimiento mensual ($50) salvo que se combine con Tarifa Plana (ver promo en MANAGEMENT_MODELS).
export const ADDONS = [
  {
    id: 'caja-cobranzas',
    name: 'Sistema Interno de Caja y Cobranzas',
    price: 500,
    priceFrom: true,
    monthly: 50,
    subtitle: 'Adicional al setup, a medida',
    features: [
      'Perfiles de usuario: Dueño (ve la plata) y Empleado/Cajero (solo cobra y abre turnos)',
      'Registro de pagos manuales para el que paga la seña en efectivo en el mostrador',
      'Control de caja de cantina: stock básico y ventas presenciales',
      'Reporte de cierre de caja diario: cuánto tiene que haber en efectivo y cuánto entró por transferencia',
    ],
    cta: 'Sumar este módulo',
  },
]

// Paso 3 — cómo se financia el mantenimiento mensual. "Híbrido" es la puerta de entrada (el club
// pone una base mínima, el resto lo absorbe el jugador); "Tarifa Plana" es la opción premium,
// pensada para ir de la mano del setup Marca Blanca — por eso lleva ese badge.
export const MANAGEMENT_MODELS = [
  {
    id: 'hibrido',
    name: 'Híbrido',
    price: 50,
    subtitle: 'Mantenimiento compartido',
    recommended: false,
    badge: null,
    features: [
      'El club paga una base mínima operativa',
      'Cargo de servicio de $500 ARS al jugador en la seña de Mercado Pago',
      'Acceso total a Partidos Abiertos y Cantina',
    ],
    cta: 'Elegir este modelo',
  },
  {
    id: 'tarifa-plana',
    name: 'Tarifa Plana',
    price: 100,
    subtitle: 'Ideal para clubes exclusivos',
    recommended: true,
    badge: 'Recomendado con Marca Blanca',
    features: ['El jugador no paga cargos extra', 'Señas integradas netas por Mercado Pago', 'Acceso a todos los módulos premium', 'Soporte prioritario 24/7'],
    cta: 'Elegir este modelo',
    promoNote: 'El Módulo de Caja y Cobranzas tiene $50 USD/mes de mantenimiento aparte — pero si lo combinás con Tarifa Plana, el total queda en $100 USD/mes por promoción (en vez de $150).',
  },
]

export function formatUsd(n, { from = false } = {}) {
  const base = n === 0 ? '$0 USD' : `$${n} USD`
  return from ? `Desde ${base}` : base
}
