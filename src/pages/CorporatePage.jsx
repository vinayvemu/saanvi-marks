import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, MessageCircle, CheckCircle, FileText,
  Package, Clock, Award, ChevronRight,
} from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/ui/SEO'

const WA_BASE = 'https://wa.me/918686183497?text='

// Bulk savings calculator data
const CALC_PRODUCTS = [
  { label: 'Prestige Metal Pen',    basePrice: 349, tiers: [{ qty: 25, price: 279 }, { qty: 50, price: 249 }, { qty: 100, price: 219 }] },
  { label: 'Elite Vacuum Tumbler',  basePrice: 799, tiers: [{ qty: 25, price: 649 }, { qty: 50, price: 599 }, { qty: 100, price: 549 }] },
  { label: 'Executive Award Plaque',basePrice: 1299,tiers: [{ qty: 10, price: 1099 }, { qty: 25, price: 999 }] },
  { label: 'Signature Keychain',    basePrice: 199, tiers: [{ qty: 50, price: 149 }, { qty: 100, price: 129 }, { qty: 250, price: 109 }] },
]

function getPriceForQty(product, qty) {
  const applicable = product.tiers.filter(t => qty >= t.qty)
  return applicable.length ? applicable[applicable.length - 1].price : product.basePrice
}

export default function CorporatePage() {
  const { products } = useProducts({ activeOnly: true })
  const [calcProduct, setCalcProduct] = useState(0)
  const [qty, setQty]                 = useState(50)

  const corpProducts = useMemo(
    () => products.filter(p => p.tags?.includes('corporate') || p.category === 'corporate').slice(0, 4),
    [products]
  )

  const cp         = CALC_PRODUCTS[calcProduct]
  const unitPrice  = getPriceForQty(cp, qty)
  const total      = unitPrice * qty
  const savedPer   = cp.basePrice - unitPrice
  const savedTotal = savedPer * qty

  const waMsg = encodeURIComponent(
    `Hi Saanvi Marks, I need corporate gifting for our team.\n\nProduct: ${cp.label}\nQty: ${qty}\nTotal budget: ₹${total.toLocaleString('en-IN')}\n\nPlease share design options.`
  )

  return (
    <>
    <SEO
      title="Corporate Gifting — Laser Engraved Branded Gifts"
      description="Branded pens, tumblers and award plaques with precision laser engraving. GST invoice. Bulk orders from 10 pieces. Ships pan-India."
      keywords="corporate gifting Tirupati, branded pens laser engraved, bulk corporate gifts India, engraved tumblers office, award plaques companies, GST invoice gifts"
      url="https://saanvimarks.in/corporate"
    />
    <main className="min-h-screen bg-onyx-950">

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28"
        style={{ background: 'linear-gradient(160deg, #0a0806 0%, #0e0e14 50%, #0a0908 100%)' }}>

        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse at 70% 0%, #c98b0a 0%, transparent 65%)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: 'linear-gradient(rgba(201,139,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,139,10,1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="badge-gold mb-6 inline-block">Corporate Gifting</span>
            <h1 style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: '#faf8f3',
            }}>
              Gifts Your Team<br />
              <span className="shimmer-gold italic">Will Actually Keep</span>
            </h1>
            <p className="text-cream/80 text-base mt-6 leading-relaxed max-w-lg" style={{ fontWeight: 300 }}>
              Precision laser engraving on pens, tumblers and award plaques.
              Your logo, your message — engraved permanently, not printed.
              GST invoice on every order.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={`${WA_BASE}${encodeURIComponent('Hi, I need corporate gifting for our team. Please share a catalogue.')}`}
                 target="_blank" rel="noreferrer"
                 className="btn-gold flex items-center gap-2">
                <MessageCircle size={15} />
                Get Bulk Quote on WhatsApp
              </a>
              <Link to="/products?category=corporate" className="btn-outline flex items-center gap-2">
                Browse Products <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5+',      label: 'Corporate Orders',    sub: 'Delivered this year'         },
              { value: '2 hrs',   label: 'Quote Turnaround',    sub: 'WhatsApp us for pricing'     },
              { value: '10 pcs',  label: 'Minimum Order',       sub: 'No massive MOQs'             },
              { value: '100%',    label: 'GST Invoiced',        sub: 'Claim input tax credit'      },
            ].map(s => (
              <div key={s.label} className="p-6"
                style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.5)' }}>
                <p style={{ fontFamily: '"Caveat", cursive', fontSize: '2rem', color: '#e8a81a', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p className="text-cream text-[13px] font-medium mt-1">{s.label}</p>
                <p className="text-onyx-600 text-[11px] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ══════════════════════════════════════════════ */}
      <section style={{ background: 'rgba(14,12,10,0.95)', borderTop: '1px solid rgba(201,139,10,0.12)', borderBottom: '1px solid rgba(201,139,10,0.12)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, label: 'GST Invoice',          sub: 'Claim input tax credit'         },
              { icon: Award,    label: 'Logo Engraving',        sub: 'Your brand, permanently marked' },
              { icon: Package,  label: 'Bulk from 10 pieces',   sub: 'No massive minimums'            },
              { icon: Clock,    label: 'Pre-ship photo proof',  sub: 'Approve before we dispatch'     },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(201,139,10,0.06)', border: '1px solid rgba(201,139,10,0.15)' }}>
                  <Icon size={14} className="text-gold-500" />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-cream">{label}</p>
                  <p className="text-[10px] text-onyx-500 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BULK PRICING CALCULATOR ════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #0a0908 0%, #0d0b09 100%)' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="badge-gold mb-4 inline-block">Instant pricing</span>
            <h2 className="section-heading">
              Bulk <span className="shimmer-gold italic">Pricing Calculator</span>
            </h2>
            <p className="text-onyx-500 text-sm mt-3">Move the slider to see how much you save at scale.</p>
          </div>

          <div className="p-8" style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.5)' }}>
            {/* Product selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
              {CALC_PRODUCTS.map((p, i) => (
                <button key={p.label} onClick={() => setCalcProduct(i)}
                  className="px-3 py-2.5 text-xs text-left transition-all"
                  style={{
                    border: `1px solid ${calcProduct === i ? 'rgba(201,139,10,0.5)' : 'rgba(70,66,59,0.5)'}`,
                    background: calcProduct === i ? 'rgba(201,139,10,0.08)' : 'transparent',
                    color: calcProduct === i ? '#c98b0a' : 'rgba(120,116,110,1)',
                  }}>
                  {p.label}
                </button>
              ))}
            </div>

            {/* Qty slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <span className="text-onyx-400 text-sm">Quantity</span>
                <span style={{ fontFamily: '"Caveat", cursive', fontSize: '1.5rem', color: '#e8a81a', lineHeight: 1 }}>
                  {qty} pieces
                </span>
              </div>
              <input type="range" min={1} max={500} value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="w-full accent-amber-500 h-1.5 cursor-pointer" />
              <div className="flex justify-between text-[10px] text-onyx-600 mt-1">
                <span>1</span><span>500</span>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 text-center" style={{ background: 'rgba(14,12,10,0.8)', border: '1px solid rgba(70,66,59,0.4)' }}>
                <p className="text-[10px] text-onyx-500 tracking-widest uppercase mb-2">Price per piece</p>
                <p style={{ fontFamily: '"Caveat", cursive', fontSize: '2.2rem', color: '#e8a81a', lineHeight: 1 }}>
                  ₹{unitPrice.toLocaleString('en-IN')}
                </p>
                {savedPer > 0 && (
                  <p className="text-green-400 text-xs mt-1">Save ₹{savedPer}/pc vs single</p>
                )}
              </div>
              <div className="p-5 text-center" style={{ background: 'rgba(14,12,10,0.8)', border: '1px solid rgba(70,66,59,0.4)' }}>
                <p className="text-[10px] text-onyx-500 tracking-widest uppercase mb-2">Total order value</p>
                <p style={{ fontFamily: '"Caveat", cursive', fontSize: '2.2rem', color: '#faf8f3', lineHeight: 1 }}>
                  ₹{total.toLocaleString('en-IN')}
                </p>
                <p className="text-onyx-600 text-xs mt-1">excl. GST + shipping</p>
              </div>
              <div className="p-5 text-center" style={{ background: 'rgba(14,12,10,0.8)', border: '1px solid rgba(201,139,10,0.15)' }}>
                <p className="text-[10px] text-onyx-500 tracking-widest uppercase mb-2">You save</p>
                <p style={{ fontFamily: '"Caveat", cursive', fontSize: '2.2rem', color: savedTotal > 0 ? '#4ade80' : 'rgba(120,116,110,1)', lineHeight: 1 }}>
                  {savedTotal > 0 ? `₹${savedTotal.toLocaleString('en-IN')}` : '—'}
                </p>
                {savedTotal > 0 && <p className="text-green-500 text-xs mt-1">vs buying individually</p>}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noreferrer"
                className="btn-gold flex items-center gap-2">
                <MessageCircle size={15} />
                Order {qty} {cp.label}s on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRODUCT PICKS ══════════════════════════════════════════ */}
      {corpProducts.length > 0 && (
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #0d0b09 0%, #0a0908 100%)', borderTop: '1px solid rgba(201,139,10,0.07)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="badge-gold mb-4 inline-block">Made for businesses</span>
              <h2 className="section-heading">
                Top Corporate <span className="shimmer-gold italic">Picks</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {corpProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/products?category=corporate" className="btn-outline flex items-center gap-2 inline-flex">
                View All Corporate Products <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ HOW BULK ORDERING WORKS ════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #0a0908 0%, #0d0b09 100%)', borderTop: '1px solid rgba(201,139,10,0.07)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="badge-gold mb-5 inline-block">Hassle-free</span>
          <h2 className="section-heading mb-16">
            How Bulk Ordering <span className="shimmer-gold italic">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(201,139,10,0.2), rgba(201,139,10,0.2), transparent)' }} />

            {[
              { step: '01', title: 'WhatsApp your requirements', desc: 'Tell us product, quantity, text/logo and date needed. We respond in under 2 hours.' },
              { step: '02', title: 'Get a free design proof',     desc: 'We create a digital mockup of your engraving before a single piece is made.'        },
              { step: '03', title: 'Approve and we engrave',      desc: 'Once you approve the proof, we engrave the full order in our Tirupati studio.'       },
              { step: '04', title: 'Delivery with GST invoice',   desc: 'Packed, dispatched, GST invoice attached. Pan-India delivery in 3–7 days.'           },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(145deg, #1a1512, #100d09)', border: '1px solid rgba(201,139,10,0.2)', boxShadow: '0 0 0 4px rgba(201,139,10,0.04)' }}>
                  <span style={{ fontFamily: '"Caveat", cursive', fontSize: '1.25rem', fontWeight: 300, color: 'rgba(201,139,10,0.7)' }}>
                    {s.step}
                  </span>
                </div>
                <h3 className="text-cream mb-2 leading-snug" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '13px', fontWeight: 600 }}>{s.title}</h3>
                <p className="text-[11px] text-cream/75 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GROWING FAST ════════════════════════════════════════════ */}
      <section className="py-16" style={{ borderTop: '1px solid rgba(201,139,10,0.07)' }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="badge-gold mb-5 inline-block">Just Getting Started</span>
          <h3 className="section-heading text-2xl mb-4">Tirupati's Newest Precision Studio — and Word Is Spreading Fast</h3>
          <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>
            We're a young studio with a big obsession — making every engraving exactly right. No shortcuts, no mediocre batches.
            Corporate clients across Tirupati are already discovering what happens when you mix laser precision with genuine care.
            Your team could be next.
          </p>
          <p className="text-gold-600 text-xs mt-5 tracking-wide" style={{ fontFamily: '"Nunito", sans-serif' }}>
            First bulk order? We'll engrave a free sample so you can feel the quality before committing.
          </p>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(201,139,10,0.15)', borderBottom: '1px solid rgba(201,139,10,0.15)' }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,139,10,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#faf8f3', lineHeight: 1.15 }}>
            Ready to place a <span className="shimmer-gold italic">corporate order?</span>
          </h2>
          <p className="text-cream/80 text-sm mt-4 mb-8">
            WhatsApp us your requirements — product, quantity, logo/text and event date.
            We'll send a quote and design proof within 2 hours.
          </p>
          <a href={`${WA_BASE}${encodeURIComponent('Hi Saanvi Marks, I need corporate gifting for our company. Please share catalogue and pricing.')}`}
             target="_blank" rel="noreferrer"
             className="btn-gold inline-flex items-center gap-2">
            <MessageCircle size={15} />
            WhatsApp for Corporate Quote
          </a>
        </div>
      </section>

    </main>
    </>
  )
}
