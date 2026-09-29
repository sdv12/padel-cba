// Datos del complejo — reemplazar por los reales.
export const VENUE = {
  name: 'Padel Cba',
  whatsapp: '5493516000000', // placeholder, cambiar por el número real
  address: 'Av. Rafael Núñez 4500, Córdoba',
  mapsQuery: 'Padel+Cba+Cordoba',
  hours: 'Todos los días de 08:00 a 00:00',
  instagram: 'https://instagram.com',
}

export function waLink(message) {
  return `https://wa.me/${VENUE.whatsapp}?text=${encodeURIComponent(message)}`
}
