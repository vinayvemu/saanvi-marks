import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Package, Clock, CheckCircle2, Truck, CircleDot, Search,
  ChevronDown, RefreshCw, AlertCircle, LayoutGrid,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getAllOrders, updateOrderStatus } from '../../services/orders'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

const STATUSES = {
  pending_payment: { label: 'Pending',       colour: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30', icon: Clock },
  confirmed:       { label: 'Confirmed',     colour: 'text-blue-400',   bg: 'bg-blue-400/10   border-blue-400/30',   icon: CircleDot },
  engraving:       { label: 'Engraving',     colour: 'text-gold-400',   bg: 'bg-gold-500/10   border-gold-600/30',   icon: CircleDot },
  shipped:         { label: 'Shipped',       colour: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/30', icon: Truck },
  delivered:       { label: 'Delivered',     colour: 'text-green-400',  bg: 'bg-green-400/10  border-green-400/30',  icon: CheckCircle2 },
  payment_failed:  { label: 'Failed',        colour: 'text-red-400',    bg: 'bg-red-400/10    border-red-400/30',    icon: AlertCircle },
  cancelled:       { label: 'Cancelled',     colour: 'text-onyx-400',   bg: 'bg-onyx-700/30   border-onyx-600/30',   icon: AlertCircle },
}

const STATUS_FLOW = ['pending_payment', 'confirmed', 'engraving', 'shipped', 'delivered']

function formatDate(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function StatusBadge({ status }) {
  const cfg = STATUSES[status] ?? STATUSES.pending_payment
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 border ${cfg.bg} ${cfg.colour} tracking-wide`}>
      <Icon size={11} /> {cfg.label}
    </span>
  )
}

function StatCard({ label, value, colour = 'text-cream' }) {
  return (
    <div className="bg-onyx-900 border border-onyx-700 p-5">
      <p className="text-xs text-onyx-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${colour}`} style={{ fontFamily: '"Comfortaa", cursive' }}>{value}</p>
    </div>
  )
}

export default function AdminOrdersPage() {
  const { currentUser }          = useAuth()
  const [orders,   setOrders]    = useState([])
  const [loading,  setLoading]   = useState(true)
  const [error,    setError]     = useState(null)
  const [search,   setSearch]    = useState('')
  const [filter,   setFilter]    = useState('all')
  const [updating, setUpdating]  = useState(null) // orderId being updated

  if (currentUser?.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-onyx-950 pt-28 flex items-center justify-center">
        <p className="text-red-400">Access denied.</p>
      </main>
    )
  }

  const load = () => {
    setLoading(true); setError(null)
    getAllOrders()
      .then(setOrders)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleStatusChange = async (orderId, status) => {
    setUpdating(orderId)
    try {
      await updateOrderStatus(orderId, status)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    } catch (e) {
      alert('Failed to update: ' + e.message)
    } finally {
      setUpdating(null)
    }
  }

  // Stats
  const stats = {
    total:    orders.length,
    pending:  orders.filter(o => o.status === 'pending_payment').length,
    active:   orders.filter(o => ['confirmed', 'engraving', 'shipped'].includes(o.status)).length,
    revenue:  orders.filter(o => !['payment_failed', 'cancelled'].includes(o.status))
                    .reduce((sum, o) => sum + (o.pricing?.grandTotal ?? 0), 0),
  }

  const filtered = orders.filter(o => {
    const matchFilter = filter === 'all' || o.status === filter
    const q = search.toLowerCase()
    const matchSearch = !q
      || o.id.toLowerCase().includes(q)
      || o.customer?.name?.toLowerCase().includes(q)
      || o.customer?.phone?.includes(q)
    return matchFilter && matchSearch
  })

  return (
    <main className="min-h-screen bg-onyx-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="badge-gold mb-2 inline-block">Admin</span>
            <h1 className="text-cream" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '1.75rem', fontWeight: 600 }}>
              Order Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/products" className="btn-outline text-sm">
              <LayoutGrid size={14} /> Products
            </Link>
            <button onClick={load} disabled={loading} className="btn-outline text-sm disabled:opacity-50">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Orders"   value={stats.total} />
          <StatCard label="Pending Payment" value={stats.pending} colour="text-yellow-400" />
          <StatCard label="Active Orders"   value={stats.active}  colour="text-blue-400" />
          <StatCard label="Revenue"         value={`₹${stats.revenue.toLocaleString('en-IN')}`} colour="text-gold-400" />
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-onyx-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by order ID, customer name, or phone…"
              className="input-luxury pl-9 w-full"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="input-luxury sm:w-48"
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUSES).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 mb-6">
            <AlertCircle size={15} className="text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3">
            <RefreshCw size={18} className="text-gold-500 animate-spin" />
            <p className="text-onyx-300">Loading orders…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Package size={32} className="text-onyx-600 mx-auto mb-3" />
            <p className="text-onyx-400">No orders found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(order => (
              <OrderRow
                key={order.id}
                order={order}
                onStatusChange={handleStatusChange}
                updating={updating === order.id}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function OrderRow({ order, onStatusChange, updating }) {
  const [expanded, setExpanded] = useState(false)
  const total = order.pricing?.grandTotal ?? 0

  return (
    <div className="bg-onyx-900 border border-onyx-700 hover:border-onyx-600 transition-colors">

      {/* Summary row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">

        {/* Order ID + date */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-onyx-800 border border-onyx-700 flex items-center justify-center flex-shrink-0">
            <Package size={14} className="text-gold-600" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-cream text-sm font-mono">#{order.id.slice(0, 8).toUpperCase()}</span>
              <StatusBadge status={order.status} />
            </div>
            <p className="text-xs text-onyx-400 mt-0.5">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        {/* Customer */}
        <div className="flex-1 min-w-0 hidden sm:block">
          <p className="text-sm text-cream truncate">{order.customer?.name ?? '—'}</p>
          <p className="text-xs text-onyx-400 mt-0.5">{order.customer?.phone ?? ''}</p>
        </div>

        {/* Items count + total */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="text-center hidden md:block">
            <p className="text-xs text-onyx-400">Items</p>
            <p className="text-sm text-cream">{order.items?.length ?? 0}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-onyx-400">Total</p>
            <p className="text-gold-400 font-semibold" style={{ fontFamily: '"Comfortaa", cursive' }}>
              ₹{total.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Status updater */}
          <div className="flex items-center gap-1">
            {updating ? (
              <RefreshCw size={14} className="text-gold-500 animate-spin" />
            ) : (
              <select
                value={order.status}
                onChange={e => onStatusChange(order.id, e.target.value)}
                onClick={e => e.stopPropagation()}
                className="text-xs bg-onyx-800 border border-onyx-600 text-cream px-2 py-1.5 focus:outline-none focus:border-gold-600"
              >
                {STATUS_FLOW.map(s => (
                  <option key={s} value={s}>{STATUSES[s].label}</option>
                ))}
                <option value="cancelled">Cancelled</option>
              </select>
            )}

            <button
              onClick={() => setExpanded(v => !v)}
              className="w-7 h-7 flex items-center justify-center text-onyx-400 hover:text-cream transition-colors"
            >
              <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-onyx-700 px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">

            {/* Customer + shipping */}
            <div className="space-y-3 text-sm">
              <p className="text-xs text-onyx-500 uppercase tracking-wide">Customer</p>
              <p className="text-cream">{order.customer?.name}</p>
              <p className="text-onyx-300">{order.customer?.email}</p>
              <p className="text-onyx-300">{order.customer?.phone}</p>
              <p className="text-xs text-onyx-500 uppercase tracking-wide mt-3">Shipping</p>
              <p className="text-onyx-300 leading-relaxed">
                {order.shipping?.address}, {order.shipping?.city},<br />
                {order.shipping?.state} — {order.shipping?.pincode}
              </p>
              {order.paymentMethod && (
                <p className="text-xs text-onyx-500 mt-1">
                  Payment: <span className="text-onyx-300">{order.paymentMethod}</span>
                </p>
              )}
            </div>

            {/* Items */}
            <div>
              <p className="text-xs text-onyx-500 uppercase tracking-wide mb-3">Items</p>
              <div className="space-y-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-onyx-300 pb-2 border-b border-onyx-800 last:border-0">
                    <div>
                      <p className="text-cream">{item.name}</p>
                      {item.engraving?.text && (
                        <p className="text-xs text-gold-600 mt-0.5">"{item.engraving.text}"</p>
                      )}
                      <p className="text-xs text-onyx-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-cream flex-shrink-0 ml-4">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-onyx-700 space-y-1 text-xs text-onyx-400">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{order.pricing?.subtotal?.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{order.pricing?.shipping === 0 ? 'Free' : `₹${order.pricing?.shipping}`}</span></div>
                <div className="flex justify-between"><span>GST</span><span>₹{order.pricing?.gst?.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between text-cream font-medium text-sm pt-1 border-t border-onyx-700">
                  <span>Total</span><span className="text-gold-400">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
