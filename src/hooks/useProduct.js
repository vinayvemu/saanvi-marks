import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore/lite'
import { db, isFirebaseReady } from '../lib/firebase'
import { products as staticProducts } from '../data/products'

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) { setLoading(false); return }

    if (!isFirebaseReady()) {
      setProduct(staticProducts.find(p => p.id === id) ?? null)
      setLoading(false)
      return
    }

    getDoc(doc(db, 'products', id))
      .then(snap => {
        setProduct(snap.exists()
          ? { id: snap.id, ...snap.data() }
          : staticProducts.find(p => p.id === id) ?? null
        )
      })
      .catch(() => {
        setProduct(staticProducts.find(p => p.id === id) ?? null)
      })
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading }
}
