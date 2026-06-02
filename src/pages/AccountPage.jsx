import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserOrders } from '../services/orders'
import {
  LogOut, ShoppingBag, RefreshCw, ChevronRight,
  Package, Truck, CheckCircle2, Clock, CircleDot,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS = {
  pending_payment: { label: 'Pending',   icon: Clock,         colour: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' },
  confirmed:       { label: 'Confirmed', icon: CircleDot,     colour: 'text-blue-400',   bg: 'bg-blue-400/10   border-blue-400/30'   },
  engraving:       { label: 'Engraving', icon: CircleDot,     colour: 'text-gold-400',   bg: 'bg-gold-500/10   border-gold-600/30'   },
  shipped:         { label: 'Shipped',   icon: Truck,         colour: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/30' },
  delivered:       { label: 'Delivered', icon: CheckCircle2,  colour: 'text-green-400',  bg: 'bg-green-400/10  border-green-400/30'  },
}

function StatusBadge({ status }) {
  const cfg = STATUS[status] ?? STATUS.pending_payment
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 border ${cfg.bg} ${cfg.colour} tracking-wide`}>
      <Icon size={11} />
      {cfg.label}
    </span>
  )
}

function formatDate(ts) {
  if (!ts) return '—'
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AccountPage() {
  const { currentUser, logout } = useAuth()
  const { addItem }             = useCart()
  const navigate                = useNavigate()

  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [reordering, setReordering] = useState(null)

  useEffect(() => {
    if (!currentUser?.uid) return
    getUserOrders()
      .then(setOrders)
      .catch(err => console.error('[AccountPage] orders error:', err))
      .finally(() => setLoading(false))
  }, [currentUser?.uid])

  const handleReorder = (order) => {
    setReordering(order.id)
    order.items.forEach(item => {
      const fullProduct = products.find(p => p.id === item.productId) ?? {
        id: item.productId, name: item.name, price: item.price, material: '', images: [],
      }
      addItem(fullProduct, item.engraving ?? null, item.quantity)
    })
    setReordering(null)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const initial = (currentUser?.displayName ?? currentUser?.email ?? '?')[0].toUpperCase()

  return (
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* ── Profile header ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-600/40
                            flex items-center justify-center flex-shrink-0">
              <span className="text-gold-400" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.6rem', fontWeight: 700 }}>{initial}</span>
            </div>

            <div>
              <span className="badge-gold mb-1 inline-block">My Account</span>
              <h1 className="text-cream leading-tight" style={{ fontFamily: '"Caveat", cursive', fontSize: '1.75rem', fontWeight: 600 }}>
                {currentUser?.displayName ?? 'Welcome back'}
              </h1>
              <p className="text-sm text-onyx-200 mt-0.5">{currentUser?.email}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-outline self-start sm:self-center">
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────── */}
        <div className="luxury-divider text-[10px] tracking-luxury uppercase text-gold-600 mb-10">
          Order History
        </div>

        {/* ── Order list ────────────────────────────────────────────────── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 border-2 border-onyx-700 border-t-gold-500 rounded-full animate-spin" />
            <p className="text-onyx-200 text-base">Loading your orders…</p>
          </div>

        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
            <div className="w-16 h-16 bg-onyx-800 border border-onyx-700 flex items-center justify-center">
              <ShoppingBag size={28} className="text-onyx-400" />
            </div>
            <div>
              <p className="text-cream" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '1.25rem', fontWeight: 600 }}>No orders yet</p>
              <p className="text-base text-onyx-200 mt-1">Your engraved pieces will appear here once you place an order.</p>
            </div>
            <Link to="/products" className="btn-gold mt-2">
              Explore Collection
              <ChevronRight size={15} />
            </Link>
          </div>

        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                onReorder={handleReorder}
                reordering={reordering === order.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

// ── Order card component ───────────────────────────────────────────────────────
function OrderCard({ order, onReorder, reordering }) {
  const [expanded, setExpanded] = useState(false)
  const grandTotal = order.pricing?.grandTotal ?? order.pricing?.subtotal ?? 0

  return (
    <div className="bg-onyx-900 border border-onyx-700 hover:border-onyx-600 transition-colors">

      {/* Card header */}
      <button
        className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 text-left"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-9 h-9 bg-onyx-800 border border-onyx-700 flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-gold-600" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-cream tracking-wide" style={{ fontFamily: '"Caveat", cursive', fontSize: '1rem', fontWeight: 600 }}>
                #{order.id.slice(0, 8).toUpperCase()}
              </span>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-sm text-onyx-300 mt-1">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 pl-13 sm:pl-0">
          <div className="text-right">
            <p className="text-[10px] text-onyx-300 uppercase tracking-wide">Total</p>
            <p className="font-serif text-gold-400 text-lg">
              ₹{grandTotal.toLocaleString('en-IN')}
            </p>
          </div>
          <ChevronRight
            size={16}
            className={`text-onyx-300 flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          />
        </div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-onyx-700 px-5 pb-5">

          {/* Items */}
          <div className="mt-4 space-y-3">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 py-3 border-b border-onyx-700 last:border-0">
                <div className="w-8 h-8 bg-onyx-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShoppingBag size={13} className="text-onyx-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base text-cream">{item.name}</p>
                  {item.engraving?.text && (
                    <div className="mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 bg-gold-500/5 border border-gold-600/20">
                      <span className="text-[10px] text-gold-500 uppercase tracking-wide">Engraving</span>
                      <span className="text-[12px] text-gold-300 font-medium truncate max-w-[200px]">
                        "{item.engraving.text}"
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-onyx-300 mt-1">Qty: {item.quantity}</p>
                </div>
                <p className="text-base text-cream flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          {order.pricing && (
            <div className="mt-4 bg-onyx-800/50 border border-onyx-700 px-4 py-3 space-y-1.5">
              {[
                ['Subtotal',  `₹${order.pricing.subtotal?.toLocaleString('en-IN') ?? '—'}`],
                ['Shipping',  order.pricing.shipping === 0 ? 'Free' : `₹${order.pricing.shipping}`],
                ['GST (18%)', `₹${order.pricing.gst?.toLocaleString('en-IN') ?? '—'}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-sm text-onyx-200">
                  <span>{label}</span><span>{val}</span>
                </div>
              ))}
              <div className="flex justify-between text-base text-cream pt-2 border-t border-onyx-600 font-medium">
                <span className="font-serif">Total</span>
                <span className="text-gold-400 font-serif">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          )}

          {/* Reorder */}
          <button
            onClick={() => onReorder(order)}
            disabled={reordering}
            className="btn-outline mt-5 text-sm disabled:opacity-60"
          >
            {reordering ? (
              <>
                <span className="w-3.5 h-3.5 border border-gold-500/40 border-t-gold-400 rounded-full animate-spin" />
                Adding to cart…
              </>
            ) : (
              <>
                <RefreshCw size={13} />
                Reorder
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
