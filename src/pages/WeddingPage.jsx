import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Star, CheckCircle, ChevronRight, Heart } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import SEO from '../components/ui/SEO'

const WA_BASE = 'https://wa.me/918686183497?text='

const CHECKLIST = [
  'Free digital proof before engraving starts',
  'Telugu & English engraving available',
  'Minimum 50 pieces for return gift sets',
  'Delivery 7–10 days before your event',
  'Pre-ship photo approval — see every piece',
  'Custom packaging available on request',
]

const TIMELINE = [
  { week: '4–6 weeks before', title: 'Place your order',      desc: 'Share guest count, couple names, wedding date and preferred products.'       },
  { week: '3–4 weeks before', title: 'Approve design proof',  desc: 'We send a digital mockup with your names and date engraved. Revise freely.' },
  { week: '1–2 weeks before', title: 'We engrave your order', desc: 'Full batch engraved in our Tirupati studio. Photo shared before dispatch.'  },
  { week: 'Before your event',title: 'Delivered to you',      desc: 'Packed per 10/25, door delivered. Time to focus on the celebration.'        },
]

export default function WeddingPage() {
  const { products } = useProducts({ activeOnly: true })

  const weddingProducts = useMemo(
    () => products.filter(p => p.tags?.includes('wedding') || p.category === 'wedding').slice(0, 4),
    [products]
  )

  const waMsg = encodeURIComponent(
    'Hi Saanvi Marks, I need return gifts for my wedding.\n\nCouple names: \nWedding date: \nGuest count: \nBudget per piece: \n\nPlease share product options.'
  )

  return (
    <>
    <SEO
      title="Wedding Return Gifts — Laser Engraved Keepsakes"
      description="Personalised laser engraved return gifts for weddings — keychains, coasters, pens and photo plaques. Telugu & English engraving. Minimum 50 pieces. Free design proof. Ships from Tirupati."
      keywords="wedding return gifts Tirupati, engraved return gifts bulk, personalized wedding favors India, Telugu engraving wedding, laser engraved keychains wedding, couple keychains bulk"
      url="https://saanvimarks.in/wedding"
    />
    <main className="min-h-screen bg-onyx-950">

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden pt-28"
        style={{ background: 'linear-gradient(160deg, #0a0806 0%, #150e14 50%, #0a0908 100%)' }}>

        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[700px] h-[500px] opacity-[0.06]"
            style={{ background: 'radial-gradient(ellipse at 40% 0%, #c98b0a 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] opacity-[0.03]"
            style={{ background: 'radial-gradient(ellipse at 100% 100%, #c98b0a 0%, transparent 60%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="badge-gold mb-6 inline-block">Wedding & Events</span>
            <h1 style={{
              fontFamily: '"Caveat", cursive',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 300, lineHeight: 1.05,
              letterSpacing: '-0.02em', color: '#faf8f3',
            }}>
              Every Guest Remembers<br />
              <span className="shimmer-gold italic">a Thoughtful Gift</span>
            </h1>
            <p className="text-cream/80 text-base mt-6 leading-relaxed max-w-lg" style={{ fontWeight: 300 }}>
              Personalised laser engraved return gifts with your couple names and wedding date.
              Keychains, coasters, pens and photo plaques — in Telugu or English.
              Minimum 50 pieces. Free design proof.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noreferrer"
                 className="btn-gold flex items-center gap-2">
                <MessageCircle size={15} />
                WhatsApp for Wedding Quote
              </a>
              <Link to="/products?category=wedding" className="btn-outline flex items-center gap-2">
                Browse Return Gifts <ChevronRight size={14} />
              </Link>
            </div>

            {/* Urgency note */}
            <div className="mt-6 flex items-center gap-2">
              <Heart size={12} className="text-gold-600" />
              <p className="text-[12px] text-onyx-500">
                Order at least <span className="text-gold-400">3–4 weeks before</span> your wedding date for on-time delivery.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-3">
            <p className="text-[10px] text-onyx-500 tracking-[0.2em] uppercase mb-5">What's included</p>
            {CHECKLIST.map(item => (
              <div key={item} className="flex items-start gap-3 py-3 px-4"
                style={{ background: 'rgba(20,18,16,0.7)', border: '1px solid rgba(70,66,59,0.4)' }}>
                <CheckCircle size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-onyx-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING STRIP ══════════════════════════════════════════ */}
      <section style={{ background: 'rgba(14,12,10,0.95)', borderTop: '1px solid rgba(201,139,10,0.12)', borderBottom: '1px solid rgba(201,139,10,0.12)' }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '₹79+',    label: 'Starting price',    sub: 'per return gift piece'     },
              { value: '50 pcs',  label: 'Minimum order',     sub: 'for return gift sets'      },
              { value: 'Free',    label: 'Design proof',      sub: 'before we engrave anything'},
              { value: '7–10',    label: 'Days delivery',     sub: 'from order confirmation'   },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontFamily: '"Caveat", cursive', fontSize: '1.8rem', color: '#e8a81a', lineHeight: 1 }}>
                  {s.value}
                </p>
                <p className="text-cream text-[12px] font-medium mt-1">{s.label}</p>
                <p className="text-onyx-600 text-[10px] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUCT PICKS ══════════════════════════════════════════ */}
      {weddingProducts.length > 0 && (
        <section className="py-24" style={{ background: 'linear-gradient(180deg, #0a0908 0%, #0d0b09 100%)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="badge-gold mb-4 inline-block">Popular for weddings</span>
              <h2 className="section-heading">
                Top Return <span className="shimmer-gold italic">Gift Picks</span>
              </h2>
              <p className="text-onyx-500 text-sm mt-3 max-w-md mx-auto">
                Each piece engraved with your couple names, wedding date, or a personal message.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {weddingProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/products?category=wedding" className="btn-outline inline-flex items-center gap-2">
                View All Wedding Products <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ ENGRAVING LANGUAGES ════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #0d0b09, #0a0908)', borderTop: '1px solid rgba(201,139,10,0.07)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="p-8" style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.5)' }}>
              <span className="text-3xl mb-4 block" style={{ color: 'rgba(201,139,10,0.6)' }}>అ</span>
              <h3 className="text-cream mb-3" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '1.2rem', fontWeight: 600 }}>Telugu Engraving</h3>
              <p className="text-cream/80 text-sm leading-relaxed">
                We support full Telugu script engraving — couple names, blessings, family names.
                Perfect for Tirupati weddings and temple events.
                Just share your text and we'll handle the font.
              </p>
              <p className="text-gold-600 text-xs mt-4 tracking-wide">నీ పేరు, నీ జ్ఞాపకం — Sample Telugu engraving</p>
            </div>

            <div className="p-8" style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.5)' }}>
              <span className="text-3xl mb-4 block" style={{ fontFamily: '"Caveat", cursive', color: 'rgba(201,139,10,0.6)' }}>Aa</span>
              <h3 className="text-cream mb-3" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '1.2rem', fontWeight: 600 }}>English & Script Fonts</h3>
              <p className="text-cream/80 text-sm leading-relaxed">
                Choose from Classic Serif, Elegant Script, Bold Block or Modern Sans.
                Preview your exact engraving live on the product page before ordering.
              </p>
              <p className="text-gold-600 text-xs mt-4 tracking-wide" style={{ fontFamily: '"Dancing Script", cursive' }}>
                Priya &amp; Karthik · 14 Feb 2026 — Sample Script engraving
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ═══════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #0a0908, #0d0b09)', borderTop: '1px solid rgba(201,139,10,0.07)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="badge-gold mb-5 inline-block">Plan ahead</span>
          <h2 className="section-heading mb-16">
            Wedding Gift <span className="shimmer-gold italic">Timeline</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(201,139,10,0.2), rgba(201,139,10,0.2), transparent)' }} />

            {TIMELINE.map((t, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 flex items-center justify-center mb-4"
                  style={{ background: 'linear-gradient(145deg, #1a1512, #100d09)', border: '1px solid rgba(201,139,10,0.2)', boxShadow: '0 0 0 4px rgba(201,139,10,0.04)' }}>
                  <span style={{ fontFamily: '"Caveat", cursive', fontSize: '1.1rem', fontWeight: 300, color: 'rgba(201,139,10,0.7)' }}>
                    0{i + 1}
                  </span>
                </div>
                <p className="text-[9px] tracking-[0.15em] text-gold-600 uppercase mb-1">{t.week}</p>
                <h3 className="text-cream mb-2 leading-snug" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '13px', fontWeight: 600 }}>{t.title}</h3>
                <p className="text-[11px] text-onyx-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIAL ════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: 'linear-gradient(180deg, #0d0b09, #0a0908)', borderTop: '1px solid rgba(201,139,10,0.07)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative p-10" style={{ background: 'linear-gradient(145deg, #141210, #0f0d0b)', border: '1px solid rgba(70,66,59,0.5)' }}>
            <div style={{ fontFamily: '"Caveat", cursive', fontSize: '6rem', lineHeight: 0.7, color: 'rgba(201,139,10,0.1)', fontStyle: 'italic', marginBottom: '1rem', userSelect: 'none' }}>"</div>
            <div className="flex gap-0.5 mb-5">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="text-gold-500 fill-gold-500" />)}
            </div>
            <p className="text-onyx-200 text-lg leading-relaxed italic" style={{ fontWeight: 300 }}>
              Ordered 200 keychains for our daughter's wedding. The quality was beyond what we expected
              and they delivered 2 days early. Every guest was impressed. The Telugu engraving was absolutely perfect.
            </p>
            <div className="mt-8 pt-6 flex items-center gap-4" style={{ borderTop: '1px solid rgba(201,139,10,0.1)' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(201,139,10,0.1)', border: '1px solid rgba(201,139,10,0.2)' }}>
                <span style={{ fontFamily: '"Caveat", cursive', fontSize: '1.1rem', color: '#c98b0a' }}>P</span>
              </div>
              <div>
                <p className="text-cream font-medium text-sm">Priya Reddy</p>
                <p className="text-onyx-500 text-xs">Tirupati · Daughter's wedding, March 2026 · 200 Signature Keychains</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(201,139,10,0.15)', borderBottom: '1px solid rgba(201,139,10,0.15)' }}>
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,139,10,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <span className="badge-gold mb-5 inline-block">Start planning</span>
          <h2 style={{ fontFamily: '"Caveat", cursive', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: '#faf8f3', lineHeight: 1.15 }}>
            Let's make your wedding<br />
            <span className="shimmer-gold italic">unforgettable for every guest</span>
          </h2>
          <p className="text-onyx-400 text-sm mt-4 mb-8 leading-relaxed">
            Share your couple names, wedding date, guest count and preferred product.
            We'll send a design proof and pricing within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`${WA_BASE}${waMsg}`} target="_blank" rel="noreferrer"
               className="btn-gold inline-flex items-center gap-2">
              <MessageCircle size={15} />
              WhatsApp Wedding Enquiry
            </a>
            <Link to="/products?category=wedding" className="btn-outline inline-flex items-center gap-2">
              Browse Return Gifts <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </main>
    </>
  )
}
