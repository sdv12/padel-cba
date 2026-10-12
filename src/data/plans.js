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
  },
]

// Paso 2 — cómo se financia el mantenimiento mensual. El modelo "Costo por Servicio" es el
// gancho: riesgo cero para el club, por eso es el que se recomienda y destaca por default.
export const MANAGEMENT_MODELS = [
  {
    id: 'servicio',
    name: 'Costo por Servicio',
    price: 0,
    subtitle: 'El mantenimiento lo pagan los jugadores',
    recommended: true,
    badge: 'Riesgo cero',
    features: [
      'El club no paga abono fijo mensual',
      'Cargo de servicio de $500 ARS al jugador en la seña de Mercado Pago',
      'Acceso total a Partidos Abiertos y Cantina',
      'Riesgo cero para el club',
    ],
    cta: 'Elegir este modelo',
  },
  {
    id: 'tarifa-plana',
    name: 'Tarifa Plana',
    price: 100,
    subtitle: 'Ideal para clubes exclusivos',
    recommended: false,
    badge: null,
    features: ['El jugador no paga cargos extra', 'Señas integradas netas por Mercado Pago', 'Acceso a todos los módulos premium', 'Soporte prioritario 24/7'],
    cta: 'Elegir este modelo',
  },
]

export function formatUsd(n) {
  return n === 0 ? '$0 USD' : `$${n} USD`
}
