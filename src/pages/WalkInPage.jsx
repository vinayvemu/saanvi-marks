import { Link } from 'react-router-dom'
import { ChevronRight, MapPin, Clock, MessageCircle, Package, Layers, Award, Smartphone, BookOpen, Coffee, Bike, ArrowRight, CheckCircle2 } from 'lucide-react'
import SEO from '../components/ui/SEO'

const PHONE = '918686183497'
const wa = (msg) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`

const WA_BOOK_VISIT    = wa("Hi! I'd like to book a walk-in slot at Saanvi Marks studio. I have an item I'd like engraved.")
const WA_BULK_QUOTE    = wa("Hi! I'm interested in bulk engraving at Saanvi Marks. I have items for a corporate event and would like a quote.")
const WA_PICKUP_SINGLE = wa("Hi! I'm in Tirupati and would like to schedule a pickup for engraving. Can you arrange a Rapido parcel pickup from my location?")
const WA_PICKUP_BULK   = wa("Hi! I have a bulk order (10+ items) in Tirupati and need a pickup & delivery service. Can we discuss the logistics and pricing?")
const WA_GENERAL       = wa("Hi! I'd like to enquire about engraving services at Saanvi Marks.")

const bringItems = [
  { icon: Smartphone, label: 'Electronics',   desc: 'iPads, laptops, tablets, smart devices' },
  { icon: Award,      label: 'Corporate Awards', desc: 'Trophies, plaques, shields, certificates' },
  { icon: Coffee,     label: 'Premium Gifts',  desc: 'Bottles, flasks, pens, diaries, wallets' },
  { icon: Package,    label: 'Branded Merch',  desc: 'Company swag, giveaways, product packaging' },
  { icon: Layers,     label: 'Metal & Glass',  desc: 'Name plates, frames, mirrors, acrylic pieces' },
  { icon: BookOpen,   label: 'Leather Goods',  desc: 'Bags, journals, passport covers, belts' },
]

const steps = [
  { n: '01', title: 'Book a Slot',         desc: 'WhatsApp us or walk in — we\'ll confirm availability within the hour.' },
  { n: '02', title: 'Bring Your Item',     desc: 'Carry it to our studio. We assess the surface, material, and engravability on the spot.' },
  { n: '03', title: 'Design Together',     desc: 'Pick your text, logo, or pattern. Our team previews the layout before we start.' },
  { n: '04', title: 'Engraved & Ready',    desc: 'Most items done same day. Complex jobs or bulk orders quoted with a turnaround time.' },
]

export default function WalkInPage() {
  return (
    <>
      <SEO
        title="Walk-In & Bring Your Own Item"
        description="Bring any engravable item to our studio — corporate gifts, iPads, trophies, leather goods — and we'll engrave it with precision. Walk-ins welcome."
      />
      <main className="min-h-screen bg-onyx-950 pt-24">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,139,10,0.09) 0%, transparent 60%)' }} />

          <div className="max-w-4xl mx-auto text-center relative">
            <span className="badge-gold mb-5 inline-block">Walk-In Studio</span>
            <h1 className="display-heading text-5xl sm:text-7xl mb-6">
              Bring Your Item.<br />
              <span className="shimmer-gold">We'll Engrave It.</span>
            </h1>
            <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Already have something worth personalising? Bring it to our studio — whether it's a corporate gift, a tech device, or a cherished possession — and we'll engrave it with the same precision as our own collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={WA_BOOK_VISIT} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <MessageCircle size={16} />
                Book a Visit
              </a>
              <Link to="/products" className="btn-outline">
                Browse Our Collection
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── What you can bring ───────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="badge-gold mb-4 inline-block">What You Can Bring</span>
              <h2 className="section-heading">If It Has a Surface,<br />We Can Engrave It</h2>
              <p className="text-cream/60 mt-4 max-w-xl mx-auto text-base" style={{ fontFamily: '"Nunito", sans-serif' }}>
                We work on most flat and cylindrical surfaces — metal, glass, leather, wood, acrylic, and select plastics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bringItems.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="card-luxury p-6 flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,139,10,0.08)', border: '1px solid rgba(201,139,10,0.2)' }}>
                    <Icon size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-cream" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '15px', fontWeight: 600 }}>{label}</p>
                    <p className="text-cream/60 text-sm mt-1" style={{ fontFamily: '"Nunito", sans-serif' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Corporate bulk callout ───────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="relative p-8 sm:p-12 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a1710 0%, #141210 100%)', border: '1px solid rgba(201,139,10,0.2)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 100% 0%, rgba(201,139,10,0.07) 0%, transparent 60%)' }} />

              <div className="corner-ornament corner-ornament-tl" />
              <div className="corner-ornament corner-ornament-tr" />
              <div className="corner-ornament corner-ornament-bl" />
              <div className="corner-ornament corner-ornament-br" />

              <div className="relative max-w-2xl">
                <span className="badge-gold mb-4 inline-block">Corporate Bulk Engraving</span>
                <h2 className="section-heading text-3xl sm:text-4xl mb-4">
                  Got 50 iPads for<br />Your Next Event?
                </h2>
                <p className="text-cream/70 text-base leading-relaxed mb-8" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Companies trust us to engrave their branded items at scale — employee welcome kits, client gifting programs, award ceremonies, product launches. We handle bulk orders on your own items with volume pricing and guaranteed consistency across every piece.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Volume pricing from 10 units onwards',
                    'Consistent quality across every piece',
                    'Company logo, name, or custom message',
                    'Quick turnaround for event deadlines',
                  ].map(point => (
                    <li key={point} className="flex items-center gap-3 text-cream/80 text-sm" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      <span className="w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a href={WA_BULK_QUOTE} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex">
                  <MessageCircle size={15} />
                  Get a Bulk Quote
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="badge-gold mb-4 inline-block">The Process</span>
              <h2 className="section-heading">Simple. Fast. Precise.</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="relative">
                  <div className="text-5xl font-bold mb-4"
                    style={{ fontFamily: '"Caveat", cursive', color: 'rgba(201,139,10,0.15)', lineHeight: 1 }}>
                    {n}
                  </div>
                  <p className="text-cream mb-2" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '14px', fontWeight: 600 }}>{title}</p>
                  <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Tirupati Pickup & Delivery ───────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-12">
              <span className="badge-gold mb-4 inline-block">Tirupati City Service</span>
              <h2 className="section-heading">Can't Come to Us?<br />We'll Come to You.</h2>
              <p className="text-cream/60 mt-4 max-w-xl mx-auto text-base" style={{ fontFamily: '"Nunito", sans-serif' }}>
                If you're within Tirupati city limits, we offer doorstep pickup and delivery — we collect your item, engrave it at our studio, and send it back. Minimal charges, maximum convenience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {/* Individual pickup */}
              <div className="card-luxury p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,139,10,0.08)', border: '1px solid rgba(201,139,10,0.2)' }}>
                    <Bike size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-cream" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '15px', fontWeight: 600 }}>Individual Orders</p>
                    <p className="text-[11px] text-gold-600 uppercase tracking-wide mt-0.5">Tirupati city limits</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    'We arrange a Rapido parcel pickup from your location',
                    'Item engraved at our studio — same day or next day',
                    'Delivered back via Rapido parcel',
                    'Minimal delivery charge (actual Rapido rate)',
                    'You pay only after seeing the pre-delivery photo',
                  ].map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-cream/70" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      <CheckCircle2 size={13} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={WA_PICKUP_SINGLE} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm inline-flex">
                  <MessageCircle size={13} />
                  Book a Pickup
                </a>
              </div>

              {/* Bulk pickup */}
              <div className="card-luxury p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,139,10,0.08)', border: '1px solid rgba(201,139,10,0.2)' }}>
                    <Package size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-cream" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '15px', fontWeight: 600 }}>Bulk & Corporate Orders</p>
                    <p className="text-[11px] text-gold-600 uppercase tracking-wide mt-0.5">10+ items · Tirupati city limits</p>
                  </div>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {[
                    'We send someone to pick up your items directly',
                    'Bulk batches engraved with consistent quality',
                    'Delivered back in secure packaging',
                    'Flat logistics fee negotiated upfront',
                    'Ideal for event deadlines — we prioritise bulk slots',
                  ].map(p => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-cream/70" style={{ fontFamily: '"Nunito", sans-serif' }}>
                      <CheckCircle2 size={13} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a href={WA_PICKUP_BULK} target="_blank" rel="noopener noreferrer" className="btn-outline text-sm inline-flex">
                  <MessageCircle size={13} />
                  Request Bulk Pickup
                </a>
              </div>
            </div>

            {/* How pickup works strip */}
            <div className="p-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 text-sm text-cream/60"
              style={{ background: 'rgba(14,12,10,0.6)', border: '1px solid rgba(70,66,59,0.4)' }}
            >
              {[
                'WhatsApp us your item & location',
                'We schedule a Rapido parcel pickup',
                'Engraved at studio',
                'Delivered back to your door',
              ].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-onyx-950 flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #c98b0a, #f0d060)' }}>
                      {i + 1}
                    </span>
                    <span style={{ fontFamily: '"Nunito", sans-serif' }}>{step}</span>
                  </div>
                  {i < arr.length - 1 && <ArrowRight size={13} className="text-onyx-700 mx-2 hidden sm:block flex-shrink-0" />}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── Visit info + CTA ─────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Visit info */}
              <div className="card-luxury p-8 space-y-6">
                <h3 className="section-heading text-2xl">Studio Visit</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-cream text-sm" style={{ fontFamily: '"Comfortaa", cursive', fontWeight: 600 }}>Location</p>
                      <p className="text-cream/60 text-sm mt-0.5" style={{ fontFamily: '"Nunito", sans-serif' }}>Tirupati, Andhra Pradesh<br />Exact address shared on booking</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-cream text-sm" style={{ fontFamily: '"Comfortaa", cursive', fontWeight: 600 }}>Hours</p>
                      <p className="text-cream/60 text-sm mt-0.5" style={{ fontFamily: '"Nunito", sans-serif' }}>Mon – Sat: 10 AM – 7 PM<br />Sunday: By appointment</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle size={16} className="text-gold-500 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-cream text-sm" style={{ fontFamily: '"Comfortaa", cursive', fontWeight: 600 }}>Book Ahead</p>
                      <p className="text-cream/60 text-sm mt-0.5" style={{ fontFamily: '"Nunito", sans-serif' }}>Walk-ins welcome, but booking a slot avoids wait time — especially for bulk orders.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="relative p-8 flex flex-col justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(201,139,10,0.07) 0%, rgba(201,139,10,0.03) 100%)', border: '1px solid rgba(201,139,10,0.2)' }}>
                <span className="badge-gold mb-4 inline-block">Ready to Visit?</span>
                <h3 className="section-heading text-2xl mb-4">Let's Talk Before You Come In</h3>
                <p className="text-cream/60 text-sm leading-relaxed mb-8" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  Send us a quick WhatsApp with a photo of your item and what you'd like engraved. We'll confirm feasibility, pricing, and book your slot — all in minutes.
                </p>
                <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer" className="btn-gold self-start">
                  <MessageCircle size={15} />
                  WhatsApp Us Now
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  )
}
