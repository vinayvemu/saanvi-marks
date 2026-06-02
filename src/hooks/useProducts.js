import { useState, useEffect } from 'react'
import { httpsCallable } from 'firebase/functions'
import { functions, isFirebaseReady } from '../lib/firebase'
import { products as staticProducts } from '../data/products'

const getProducts = httpsCallable(functions, 'getProducts')

export function useProducts({ activeOnly = true } = {}) {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (!isFirebaseReady()) {
      setProducts(activeOnly ? staticProducts.filter(p => p.active !== false) : staticProducts)
      setLoading(false)
      return
    }

    getProducts()
      .then(({ data }) => {
        const list = activeOnly ? data.filter(p => p.active !== false) : data
        setProducts(list.length > 0 ? list : staticProducts.filter(p => p.active !== false))
      })
      .catch(() => {
        setProducts(activeOnly ? staticProducts.filter(p => p.active !== false) : staticProducts)
      })
      .finally(() => setLoading(false))
  }, [activeOnly])

  return { products, loading }
}
