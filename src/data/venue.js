// Datos del complejo — address/hours/mapsQuery son de ejemplo (complejo ficticio de la demo).
export const VENUE = {
  name: 'Padel Cba',
  whatsapp: '5493512473790',
  address: 'Av. Rafael Núñez 4500, Córdoba',
  mapsQuery: 'Padel+Cba+Cordoba',
  hours: 'Todos los días de 08:00 a 00:00',
  // Sin Instagram real todavía: dejar en null oculta el ícono en vez de linkear a una cuenta ajena.
  instagram: null,
}

export function waLink(message) {
  return `https://wa.me/${VENUE.whatsapp}?text=${encodeURIComponent(message)}`
}
