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
  // dentro del mismo grupo reemplaza la elección anterior en vez de duplicarla.
  function addItem(item) {
    setItems((prev) => [...prev.filter((i) => i.group !== item.group), { ...item, id: `${item.group}-${Date.now()}` }])
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  function clear() {
    setItems([])
  }

  return <CartContext.Provider value={{ items, addItem, removeItem, clear }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
