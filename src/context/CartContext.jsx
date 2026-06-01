import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const initialState = {
  items:    [],
  isOpen:   false,
  total:    0,
  count:    0,
}

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.items.findIndex(i => i.cartId === action.payload.cartId)
      let items
      if (existing >= 0) {
        items = state.items.map((item, idx) =>
          idx === existing ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        )
      } else {
        items = [...state.items, action.payload]
      }
      return { ...state, items, ...computeTotals(items) }
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.cartId !== action.payload)
      return { ...state, items, ...computeTotals(items) }
    }

    case 'UPDATE_QTY': {
      const items = state.items.map(i =>
        i.cartId === action.payload.cartId ? { ...i, quantity: Math.max(1, action.payload.qty) } : i
      )
      return { ...state, items, ...computeTotals(items) }
    }

    case 'UPDATE_ENGRAVING': {
      const items = state.items.map(i =>
        i.cartId === action.payload.cartId ? { ...i, engraving: action.payload.engraving } : i
      )
      return { ...state, items }
    }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    case 'CLEAR_CART':
      return { ...initialState }

    default:
      return state
  }
}

function computeTotals(items) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  return { total, count }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('saanvi_cart')
      if (saved) {
        const parsed = JSON.parse(saved)
        return { ...init, ...parsed, isOpen: false }
      }
    } catch {}
    return init
  })

  useEffect(() => {
    const { isOpen, ...persist } = state
    localStorage.setItem('saanvi_cart', JSON.stringify(persist))
  }, [state])

  const addItem = (product, engraving, quantity = 1) => {
    const cartId = `${product.id}_${Date.now()}`
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        cartId,
        productId:   product.id,
        name:        product.name,
        price:       product.price,
        material:    product.material,
        image:       product.images[0],
        engraving,
        quantity,
      },
    })
    dispatch({ type: 'OPEN_CART' })
  }

  const removeItem    = (cartId)            => dispatch({ type: 'REMOVE_ITEM',     payload: cartId })
  const updateQty     = (cartId, qty)       => dispatch({ type: 'UPDATE_QTY',      payload: { cartId, qty } })
  const updateEngrave = (cartId, engraving) => dispatch({ type: 'UPDATE_ENGRAVING',payload: { cartId, engraving } })
  const toggleCart    = ()                  => dispatch({ type: 'TOGGLE_CART' })
  const closeCart     = ()                  => dispatch({ type: 'CLOSE_CART' })
  const clearCart     = ()                  => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQty, updateEngrave, toggleCart, closeCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
