import { createContext, useContext, useEffect, useState } from 'react'

const CART_KEY = 'padelcba_carrito_v1'
const CartContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // localStorage puede fallar; arrancamos con el carrito vacío.
  }
  return []
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items))
    } catch {
      // si falla el guardado seguimos funcionando igual, solo no persiste
    }
  }, [items])

  // Cada "group" (demo, setup, addon, management) es una elección única: agregar de nuevo
  // dentro del mismo grupo reemplaza la elección anterior en vez de duplicarla. El addon de
  // Caja y Cobranzas solo se puede financiar con "Pago único" (no tiene pago inicial propio
  // para sumarle además un desarrollo a medida): si el setup que se agrega es "mensual", se
  // saca el addon del carrito en vez de dejar una combinación que no se puede vender así.
  function addItem(item) {
    setItems((prev) => {
      let next = prev.filter((i) => i.group !== item.group)
      if (item.group === 'setup' && item.modality === 'mensual') {
        next = next.filter((i) => i.group !== 'addon')
      }
      return [...next, { ...item, id: `${item.group}-${Date.now()}` }]
    })
  }

  // true si el setup en el carrito está en modalidad mensual (no admite sumar el addon). Lo
  // consulta AddonCard antes de dejar agregar el módulo.
  function addonBlockedBy() {
    return items.find((i) => i.group === 'setup' && i.modality === 'mensual') ?? null
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clear() {
    setItems([])
  }

  return <CartContext.Provider value={{ items, addItem, removeItem, clear, addonBlockedBy }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
