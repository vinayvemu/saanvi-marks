import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Shield, Lock, CreditCard, AlertCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useRazorpay } from '../hooks/useRazorpay'
import { createOrder, confirmOrderPayment, failOrderPayment } from '../services/orders'
import SEO from '../components/ui/SEO'

const RAZORPAY_CONFIGURED = Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID)

const STATES_IN = [
  'Andhra Pradesh','Telangana','Karnataka','Tamil Nadu','Maharashtra',
  'Delhi','Gujarat','Rajasthan','West Bengal','Kerala','Other',
]

export default function CheckoutPage() {
  const { items, total, count, clearCart } = useCart()
  const navigate                           = useNavigate()
  const { ready: rzpReady, openRazorpay }  = useRazorpay()
  const { currentUser }                    = useAuth()

  const [form, setForm] = useState({
    name: '', email: currentUser?.email ?? '', phone: '',
    address: '', city: '', state: 'Andhra Pradesh', pincode: '',
    gstNumber: '', giftMessage: '', isGift: false,
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [payError,    setPayError]    = useState(null)   // inline payment error
  const [loading,     setLoading]     = useState(false)

  const shipping   = total >= 999 ? 0 : 99
  const gst        = Math.round(total * 0.18)
  const grandTotal = total + shipping + gst
  const amountPaise = grandTotal * 100                   // Razorpay expects paise

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (fieldErrors[key]) setFieldErrors(e => ({ ...e, [key]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())         e.name    = 'Name is required'
    if (!form.email.includes('@')) e.email   = 'Valid email required'
    if (form.phone.length < 10)    e.phone   = 'Valid 10-digit mobile required'
    if (!form.address.trim())      e.address = 'Address is required'
    if (!form.city.trim())         e.city    = 'City is required'
    if (form.pincode.length !== 6) e.pincode = 'Valid 6-digit pincode required'
    return e
  }

  // ── Step 1: persist order to Firestore ──────────────────────────────────
  const placeOrder = async (paymentMethod) => {
    return createOrder({
      userId:      currentUser?.uid ?? null,
      customer:    { name: form.name, email: form.email, phone: form.phone },
      shipping:    { address: form.address, city: form.city, state: form.state, pincode: form.pincode },
      gstNumber:   form.gstNumber,
      gift:        form.isGift ? { message: form.giftMessage } : null,
      items:       items.map(i => ({
                     productId: i.productId, name: i.name, price: i.price,
                     quantity:  i.quantity,  engraving: i.engraving,
                   })),
      pricing:     { subtotal: total, shipping, gst, grandTotal },
      paymentMethod,
    })
  }

  // ── Step 2a: Razorpay payment path ───────────────────────────────────────
  const handleRazorpay = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setPayError(null)
    setLoading(true)

    let orderId
    try {
      orderId = await placeOrder('razorpay')
    } catch (err) {
      console.error('[Checkout] Firestore order creation failed:', err)
      setPayError('Could not place the order. Please try again.')
      setLoading(false)
      return
    }

    // Open Razorpay modal — setLoading(false) happens inside each callback
    openRazorpay({
      amount:      amountPaise,
      description: `Order #${orderId.slice(0, 8).toUpperCase()}`,
      prefill: {
        name:    form.name,
        email:   form.email,
        contact: form.phone,
      },
      notes: {
        orderId,
        city:  form.city,
        state: form.state,
      },

      // ── Success ────────────────────────────────────────────────────────
      handler: async (response) => {
        try {
          await confirmOrderPayment(orderId, {
            paymentId:        response.razorpay_payment_id,
            razorpayOrderId:  response.razorpay_order_id,
            signature:        response.razorpay_signature,
          })
          clearCart()
          navigate(`/order-success?orderId=${orderId}`)
        } catch (err) {
          console.error('[Checkout] Failed to confirm order in Firestore:', err)
          // Payment went through — still navigate; we can reconcile manually
          clearCart()
          navigate(`/order-success?orderId=${orderId}`)
        } finally {
          setLoading(false)
        }
      },

      // ── Payment failure ────────────────────────────────────────────────
      onError: async (error) => {
        console.error('[Checkout] Razorpay payment failed:', error)
        try {
          await failOrderPayment(orderId, { code: error.code, description: error.description })
        } catch (firestoreErr) {
          console.error('[Checkout] Failed to update order status:', firestoreErr)
        }
        setPayError(error.description ?? 'Payment failed. Please try again.')
        setLoading(false)
      },

      // ── User dismissed modal ───────────────────────────────────────────
      onDismiss: () => {
        // Order sits as pending_payment — user can retry
        setPayError('Payment was not completed. You can try again.')
        setLoading(false)
      },
    })
  }

  // ── Step 2b: Pay-later fallback (no Razorpay key) ───────────────────────
  const handlePayLater = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setPayError(null)
    setLoading(true)
    try {
      const orderId = await placeOrder('pay_later')
      clearCart()
      navigate(`/order-success?orderId=${orderId}`)
    } catch (err) {
      console.error('[Checkout] Pay-later order failed:', err)
      setPayError('Something went wrong. Please try again or WhatsApp us.')
    } finally {
      setLoading(false)
    }
  }

  // ── Empty cart guard ────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-onyx-950 pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-2xl text-cream">Your bag is empty</p>
          <Link to="/products" className="btn-gold mt-6 inline-flex">Browse Collection</Link>
        </div>
      </main>
    )
  }

  // ── Inline field component ──────────────────────────────────────────────
  const F = ({ label, id, type = 'text', value, onChange, error, placeholder, required }) => (
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
    <>
    <SEO
      title="Secure Checkout"
      description="Complete your Saanvi Marks order securely."
      noIndex={true}
    />
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <span className="badge-gold mb-3 inline-block">Secure Checkout</span>
          <h1 className="section-heading">Complete Your <span className="text-gold-400 italic">Order</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT: Form ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Contact */}
            <div className="bg-onyx-900 border border-onyx-700 p-6 space-y-5">
              <h2 className="font-serif text-lg text-cream border-b border-onyx-700 pb-4">Contact Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <F label="Full Name" id="name"  value={form.name}  onChange={v => set('name',v)}
                   error={fieldErrors.name}  placeholder="Priya Reddy" required />
                <F label="Mobile"    id="phone" type="tel" value={form.phone} onChange={v => set('phone',v)}
                   error={fieldErrors.phone} placeholder="9876543210" required />
              </div>
              <F label="Email Address" id="email" type="email" value={form.email} onChange={v => set('email',v)}
                 error={fieldErrors.email} placeholder="priya@example.com" required />
            </div>

            {/* Delivery */}
            <div className="bg-onyx-900 border border-onyx-700 p-6 space-y-5">
              <h2 className="font-serif text-lg text-cream border-b border-onyx-700 pb-4">Delivery Address</h2>
              <F label="Flat / House / Street" id="address" value={form.address} onChange={v => set('address',v)}
                 error={fieldErrors.address} placeholder="Flat 4B, Lakshmipuram" required />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <F label="City"    id="city"    value={form.city}    onChange={v => set('city',v)}
                   error={fieldErrors.city}    placeholder="Tirupati" required />
                <F label="Pincode" id="pincode" value={form.pincode} onChange={v => set('pincode',v)}
                   error={fieldErrors.pincode} placeholder="517501" required />
              </div>
              <div>
                <label className="block text-xs text-onyx-400 mb-1.5">State <span className="text-gold-600">*</span></label>
                <select value={form.state} onChange={e => set('state', e.target.value)} className="input-luxury">
                  {STATES_IN.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            {/* GST / Gift */}
            <div className="bg-onyx-900 border border-onyx-700 p-6 space-y-5">
              <h2 className="font-serif text-lg text-cream border-b border-onyx-700 pb-4">Optional Details</h2>
              <F label="GST Number (for tax invoice)" id="gst" value={form.gstNumber}
                 onChange={v => set('gstNumber',v)} placeholder="29ABCDE1234F1Z5" />
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

            {/* Payment method indicator */}
            <div className={`border p-4 ${RAZORPAY_CONFIGURED
              ? 'bg-onyx-800 border-gold-600/20'
              : 'bg-onyx-900 border-onyx-700'}`}>
              <div className="flex items-start gap-3">
                {RAZORPAY_CONFIGURED
                  ? <CreditCard size={16} className="text-gold-500 flex-shrink-0 mt-0.5" />
                  : <Lock       size={16} className="text-onyx-500 flex-shrink-0 mt-0.5" />
                }
                <div>
                  {RAZORPAY_CONFIGURED ? (
                    <>
                      <p className="text-sm text-cream">Pay securely with Razorpay</p>
                      <p className="text-xs text-onyx-400 mt-0.5">
                        UPI, cards, net banking, and wallets accepted. Powered by Razorpay.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-cream">Pay later via UPI / bank transfer</p>
                      <p className="text-xs text-onyx-400 mt-0.5">
                        Our team will call you within 2 hours to confirm your order and share payment details before production begins.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Summary ──────────────────────────────────────────── */}
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
                    <p className="text-sm text-cream flex-shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
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
                  <span>{shipping === 0
                    ? <span className="text-green-400">Free</span>
                    : `₹${shipping}`}
                  </span>
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

              {/* Payment error */}
              {payError && (
                <div className="mt-4 flex items-start gap-2 px-3 py-2.5 bg-red-500/10 border border-red-500/30">
                  <AlertCircle size={14} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-400 leading-relaxed">{payError}</p>
                </div>
              )}

              {/* CTA */}
              {RAZORPAY_CONFIGURED ? (
                <button
                  onClick={handleRazorpay}
                  disabled={loading || !rzpReady}
                  className="btn-gold w-full justify-center mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-onyx-800/40 border-t-onyx-950 rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} />
                      Pay ₹{grandTotal.toLocaleString('en-IN')}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={handlePayLater}
                  disabled={loading}
                  className="btn-gold w-full justify-center mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-onyx-800/40 border-t-onyx-950 rounded-full animate-spin" />
                      Placing Order…
                    </>
                  ) : (
                    <>
                      Place Order
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              )}

              <div className="flex items-center justify-center gap-1 mt-3">
                <Shield size={12} className="text-onyx-500" />
                <p className="text-[11px] text-onyx-500">Secure order. Pre-ship photo approval included.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    </>
  )
}
