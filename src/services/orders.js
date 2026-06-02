import {
  collection, addDoc, doc, updateDoc, serverTimestamp,
} from 'firebase/firestore/lite'
import { httpsCallable } from 'firebase/functions'
import { db, functions } from '../lib/firebase'

const getOrderHistory = httpsCallable(functions, 'getOrderHistory')

export async function createOrder({ userId, customer, shipping, gstNumber, gift, items, pricing, paymentMethod }) {
  const ref = await addDoc(collection(db, 'orders'), {
    userId,
    customer,
    shipping,
    gstNumber:    gstNumber || null,
    gift:         gift || null,
    items,
    pricing,
    status:       'pending_payment',
    paymentMethod,
    createdAt:    serverTimestamp(),
  })
  return ref.id
}

export async function confirmOrderPayment(orderId, { paymentId, razorpayOrderId, signature }) {
  await updateDoc(doc(db, 'orders', orderId), {
    status:   'confirmed',
    razorpay: { paymentId, orderId: razorpayOrderId ?? null, signature: signature ?? null },
  })
}

export async function failOrderPayment(orderId, { code, description }) {
  await updateDoc(doc(db, 'orders', orderId), {
    status:       'payment_failed',
    paymentError: { code, description },
  })
}

export async function getUserOrders() {
  const { data } = await getOrderHistory()
  return data
}
