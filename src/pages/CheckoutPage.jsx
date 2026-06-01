import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Shield, Lock } from 'lucide-react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useCart } from '../context/CartContext'

const STATES_IN = ['Andhra Pradesh','Telangana','Karnataka','Tamil Nadu','Maharashtra','Delhi','Gujarat','Rajasthan','West Bengal','Kerala','Other']

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: 'Andhra Pradesh', pincode: '',
    gstNumber: '', giftMessage: '', isGift: false,
  })
  const [errors,    setErrors]    = useState({})
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const shipping = total >= 999 ? 0 : 99
  const gst      = Math.round(total * 0.18)
  const grandTotal = total + shipping + gst

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.includes('@')) e.email = 'Valid email required'
    if (form.phone.length < 10) e.phone = 'Valid 10-digit mobile required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim())    e.city    = 'City is required'
    if (form.pincode.length !== 6) e.pincode = 'Valid 6-digit pincode required'
    return e
  }

  const handleOrder = async () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true)
    try {
      const orderData = {
        customer:    { name: form.name, email: form.email, phone: form.phone },
        shipping:    { address: form.address, city: form.city, state: form.state, pincode: form.pincode },
        gstNumber:   form.gstNumber || null,
        gift:        form.isGift ? { message: form.giftMessage } : null,
        items:       items.map(i => ({
                       productId: i.productId, name: i.name, price: i.price,
                       quantity: i.quantity, engraving: i.engraving,
                     })),
        pricing:     { subtotal: total, shipping, gst, grandTotal },
        status:      'pending_payment',
        paymentMethod: 'cod', // Razorpay to be integrated
        createdAt:   serverTimestamp(),
      }
      const ref = await addDoc(collection(db, 'orders'), orderData)
      clearCart()
      navigate(`/order-success?orderId=${ref.id}`)
    } catch (err) {
      console.error('Order failed:', err)
      alert('Something went wrong. Please try again or WhatsApp us.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0 && !submitted) {
    return (
      <main className="min-h-screen bg-onyx-950 pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-cream">Your bag is empty</p>
          <Link to="/products" className="btn-gold mt-6 inline-flex">Browse Collection</Link>
        </div>
      </main>
    )
  }

  const F = ({ label, id, type='text', value, onChange, error, placeholder, required }) => (
    <div>
      <label htmlFor={id} className="block text-xs text-onyx-400 mb-1.5">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className={`input-luxury ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )

  return (
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <span className="badge-gold mb-3 inline-block">Secure Checkout</span>
          <h1 className="section-heading">Complete Your <span className="text-gold-400 italic">Order</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT: Form ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact */}
            <div className="bg-onyx-900 border border-onyx-700 p-6 space-y-5">
              <h2 className="font-serif text-lg text-cream border-b border-onyx-700 pb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <F label="Full Name"     id="name"  value={form.name}  onChange={v => set('name',v)}  error={errors.name}  placeholder="Vinay Kumar" required />
                <F label="Mobile"        id="phone" type="tel" value={form.phone} onChange={v => set('phone',v)} error={errors.phone} placeholder="9876543210" required />
              </div>
              <F label="Email Address" id="email" type="email" value={form.email} onChange={v => set('email',v)} error={errors.email} placeholder="vinay@example.com" required />
            </div>

            {/* Delivery */}
            <div className="bg-onyx-900 border border-onyx-700 p-6 space-y-5">
              <h2 className="font-serif text-lg text-cream border-b border-onyx-700 pb-4">Delivery Address</h2>
              <F label="Flat / House / Street" id="address" value={form.address} onChange={v => set('address',v)} error={errors.address} placeholder="Flat 4B, Lakshmipuram" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <F label="City" id="city" value={form.city} onChange={v => set('city',v)} error={errors.city} placeholder="Tirupati" required />
                <F label="Pincode" id="pincode" value={form.pincode} onChange={v => set('pincode',v)} error={errors.pincode} placeholder="517501" required />
              </div>
              <div>
                <label className="block text-xs text-onyx-400 mb-1.5">State <span className="text-gold-600">*</span></label>
                <select
                  value={form.state} onChange={e => set('state', e.target.value)}
                  className="input-luxury"
                >
                  {STATES_IN.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* GST / Gift */}
            <div className="bg-onyx-900 border border-onyx-700 p-6 space-y-5">
              <h2 className="font-serif text-lg text-cream border-b border-onyx-700 pb-4">Optional Details</h2>
              <F label="GST Number (for tax invoice)" id="gst" value={form.gstNumber} onChange={v => set('gstNumber',v)} placeholder="29ABCDE1234F1Z5" />
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.isGift} onChange={e => set('isGift', e.target.checked)}
                  className="w-4 h-4 accent-gold-500" />
                <span className="text-sm text-onyx-300">This is a gift (include message card, hide price)</span>
              </label>
              {form.isGift && (
                <div>
                  <label className="block text-xs text-onyx-400 mb-1.5">Gift Message</label>
                  <textarea
                    value={form.giftMessage} onChange={e => set('giftMessage', e.target.value)}
                    rows={3} placeholder="Write your message here..."
                    className="input-luxury resize-none"
                  />
                </div>
              )}
            </div>

            {/* Payment note */}
            <div className="bg-onyx-800 border border-gold-600/20 p-4">
              <div className="flex items-start gap-3">
                <Lock size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-cream">Payment via Razorpay coming soon</p>
                  <p className="text-xs text-onyx-400 mt-0.5">
                    Currently accepting orders — our team will call to confirm and collect payment via UPI/bank transfer before production begins.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="space-y-4">
            <div className="bg-onyx-900 border border-onyx-700 p-6 sticky top-28">
              <h2 className="font-serif text-lg text-cream mb-5">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-5 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.cartId} className="flex justify-between gap-3 pb-3 border-b border-onyx-800">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-cream truncate">{item.name}</p>
                      {item.engraving?.text && (
                        <p className="text-[11px] text-gold-600 mt-0.5 truncate">"{item.engraving.text}"</p>
                      )}
                      <p className="text-[11px] text-onyx-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm text-cream flex-shrink-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-2 text-sm border-t border-onyx-700 pt-4">
                <div className="flex justify-between text-onyx-400">
                  <span>Subtotal ({count} items)</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-onyx-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-400">Free</span> : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-onyx-400">
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-cream font-medium text-base pt-2 border-t border-onyx-700">
                  <span className="font-serif">Total</span>
                  <span className="text-gold-400 font-serif text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="btn-gold w-full justify-center mt-6"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
                {!loading && <ChevronRight size={16} />}
              </button>

              <div className="flex items-center justify-center gap-1 mt-3">
                <Shield size={12} className="text-onyx-500" />
                <p className="text-[11px] text-onyx-500">Secure order. Pre-ship photo approval included.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
