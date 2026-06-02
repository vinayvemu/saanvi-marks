const { initializeApp } = require('firebase-admin/app')
const { getFirestore }  = require('firebase-admin/firestore')
const { onCall, HttpsError } = require('firebase-functions/v2/https')

initializeApp()
const db = getFirestore()

const REGION = 'asia-south1'

// ── getProducts ──────────────────────────────────────────────────────────────
exports.getProducts = onCall({ region: REGION }, async () => {
  const snap = await db.collection('products')
    .where('active', '==', true)
    .orderBy('order', 'asc')
    .get()

  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
})

// ── getOrderHistory ──────────────────────────────────────────────────────────
exports.getOrderHistory = onCall({ region: REGION }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in required')

  const snap = await db.collection('orders')
    .where('userId', '==', request.auth.uid)
    .get()

  return snap.docs
    .map(d => {
      const data = d.data()
      return {
        ...data,
        id:        d.id,
        createdAt: data.createdAt?.toMillis?.() ?? null,
      }
    })
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
})
