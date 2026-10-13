// Precios de Padel CBA: dos pasos separados — instalación (pago único) y gestión mensual.
// Nada hardcodeado en los componentes: todo sale de acá.

// Paso 1 — sistema llave en mano, pago único de instalación. Estrategia Good/Better/Best:
// la del medio es la que más conviene vender, por eso va destacada.
export const SETUP_PLANS = [
  {
    id: 'esencial',
    name: 'Esencial',
    price: 400,
    featured: false,
    features: ['Despliegue del sistema base', 'Tu logo y colores', 'Subdominio propio (tuclub.padelcba.com)', 'Carga de datos por cuenta del cliente'],
    cta: 'Empezar con Esencial',
    ctaStyle: 'ghost',
  },
  {
    id: 'llave-en-mano',
    name: 'Llave en Mano',
    price: 500,
    featured: true,
    features: ['Todo lo del plan Esencial', 'Dominio .com.ar propio', 'Data entry completo — cargamos tus canchas y kiosco por vos', 'Capacitación en vivo para tu staff'],
    cta: 'Quiero este plan',
    ctaStyle: 'solid',
  },
  {
    id: 'marca-blanca',
    name: 'Marca Blanca',
    price: 600,
    featured: false,
    features: ['Todo lo de Llave en Mano', 'Rediseño visual exclusivo de tu portada', 'Integración avanzada con bot de WhatsApp propio'],
    cta: 'Contactar',
    ctaStyle: 'ghost',
    customNote: '¿Lo querés 100% a medida, fuera de nuestras paletas? Se charla — precio a convenir.',
  },
]

// Paso 2 — cómo se financia el mantenimiento mensual. "Híbrido" es la puerta de entrada (el club
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
    promoNote: 'Si sumás el Módulo de Caja y Cobranzas, queda en $80 USD/mes.',
  },
]

// Paso 3 (opcional) — add-on a medida para el dueño, separado del setup y del mantenimiento.
export const ADDONS = [
  {
    id: 'caja-cobranzas',
    name: 'Sistema Interno de Caja y Cobranzas',
    price: 500,
    priceFrom: true,
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

export function formatUsd(n, { from = false } = {}) {
  const base = n === 0 ? '$0 USD' : `$${n} USD`
  return from ? `Desde ${base}` : base
}
