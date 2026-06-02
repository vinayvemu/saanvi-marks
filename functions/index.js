const { initializeApp } = require('firebase-admin/app')
const { getFirestore, FieldValue } = require('firebase-admin/firestore')
const { onCall, HttpsError } = require('firebase-functions/v2/https')

initializeApp()
const db = getFirestore()

const REGION     = 'asia-south1'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL

function requireAdmin(request) {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in required')
  if (request.auth.token.email !== ADMIN_EMAIL) throw new HttpsError('permission-denied', 'Admin only')
}

function serializeOrder(d) {
  const data = d.data()
  return {
    ...data,
    id:        d.id,
    createdAt: data.createdAt?.toMillis?.() ?? null,
    updatedAt: data.updatedAt?.toMillis?.() ?? null,
  }
}

// ── getProducts ──────────────────────────────────────────────────────────────
exports.getProducts = onCall({ region: REGION }, async () => {
  const snap = await db.collection('products')
    .where('active', '==', true)
    .orderBy('order', 'asc')
    .get()

  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
})

// ── getOrderHistory (customer) ───────────────────────────────────────────────
exports.getOrderHistory = onCall({ region: REGION }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in required')

  const snap = await db.collection('orders')
    .where('userId', '==', request.auth.uid)
    .get()

  return snap.docs
    .map(serializeOrder)
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
})

// ── getAllOrders (admin) ──────────────────────────────────────────────────────
exports.getAllOrders = onCall({ region: REGION }, async (request) => {
  requireAdmin(request)

  const snap = await db.collection('orders').get()

  return snap.docs
    .map(serializeOrder)
    .sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0))
})

// ── updateOrderStatus (admin) ─────────────────────────────────────────────────
exports.updateOrderStatus = onCall({ region: REGION }, async (request) => {
  requireAdmin(request)

  const { orderId, status } = request.data
  if (!orderId || !status) throw new HttpsError('invalid-argument', 'orderId and status required')

  const VALID = ['pending_payment', 'confirmed', 'engraving', 'shipped', 'delivered', 'payment_failed', 'cancelled']
  if (!VALID.includes(status)) throw new HttpsError('invalid-argument', `Invalid status: ${status}`)

  await db.collection('orders').doc(orderId).update({
    status,
    updatedAt: FieldValue.serverTimestamp(),
  })

  return { success: true }
})
