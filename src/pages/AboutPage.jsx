import { Link } from 'react-router-dom'
import { ChevronRight, MessageCircle, Zap, Heart, Award, Shield } from 'lucide-react'
import SEO from '../components/ui/SEO'

const WA = `https://wa.me/918686183497?text=${encodeURIComponent("Hi! I'd like to know more about Saanvi Marks.")}`

const values = [
  { icon: Zap,    title: 'Precision First',     desc: 'Every engraving is previewed digitally before the laser touches your item. No surprises.' },
  { icon: Heart,  title: 'Made with Intent',    desc: 'We don\'t mass-produce. Every piece is made to order, for a specific person or moment.' },
  { icon: Award,  title: 'Quality You Can Feel', desc: 'We work only with materials that engrave cleanly — metal, leather, wood, glass, acrylic.' },
  { icon: Shield, title: 'Pre-ship Approval',   desc: 'You see a photo of your engraved item before it leaves our studio. Always.' },
]

export default function AboutPage() {
  return (
    <>
      <SEO
        title="Our Story"
        description="Saanvi Marks is a precision laser engraving studio based in Tirupati, Andhra Pradesh. We craft personalised gifts — keychains, pens, tumblers, plaques — made to order."
      />
      <main className="min-h-screen bg-onyx-950 pt-24">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,139,10,0.08) 0%, transparent 60%)' }} />
          <div className="max-w-3xl mx-auto text-center relative">
            <span className="badge-gold mb-5 inline-block">Our Story</span>
            <h1 className="display-heading text-5xl sm:text-6xl mb-6">
              Every Mark<br />
              <span className="shimmer-gold">Tells a Story</span>
            </h1>
            <p className="text-lg text-cream/70 leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Saanvi Marks started with a simple belief — that the most meaningful gifts aren't the most expensive ones. They're the ones that carry a name, a date, a memory.
            </p>
          </div>
        </section>

        {/* ── Origin ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-5">
                <span className="badge-gold inline-block">Based in Tirupati</span>
                <h2 className="section-heading text-3xl">From Tirupati,<br />to Doorsteps Across India</h2>
                <p className="text-cream/70 leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  We're a laser engraving studio rooted in Tirupati, Andhra Pradesh — a city known for its devotion, its craftsmanship, and its people who cherish meaningful gifts. That spirit is baked into everything we make.
                </p>
                <p className="text-cream/70 leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  What started as a small studio serving local customers has grown into a service that ships personalised pieces pan-India — for weddings, corporate events, devotional gifting, and everyday moments worth marking.
                </p>
              </div>
              <div className="relative p-8"
                style={{ background: 'linear-gradient(135deg, rgba(201,139,10,0.06) 0%, rgba(201,139,10,0.02) 100%)', border: '1px solid rgba(201,139,10,0.15)' }}>
                <div className="corner-ornament corner-ornament-tl" />
                <div className="corner-ornament corner-ornament-br" />
                <p className="text-cream/80 text-lg leading-relaxed italic"
                  style={{ fontFamily: '"Caveat", cursive', fontSize: '1.4rem' }}>
                  "A name engraved on a pen. A wedding date on a keychain. A logo on a trophy. Small marks — but they last forever."
                </p>
                <p className="text-gold-600 text-sm mt-4" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  — Saanvi Marks Studio, Tirupati
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What we do ───────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-gold mb-4 inline-block">What We Do</span>
              <h2 className="section-heading">Precision Laser Engraving<br />on Things That Matter</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { title: 'Personal Gifts',    desc: 'Keychains, pens, bottles, wallets — engraved with names, dates, and messages.' },
                { title: 'Corporate Gifting', desc: 'Branded items at scale — for Diwali, onboarding kits, and award ceremonies.' },
                { title: 'Wedding Returns',   desc: 'Couple keychains, coasters, and plaques for 50 to 500 guests.' },
              ].map(item => (
                <div key={item.title} className="card-luxury p-6">
                  <p className="text-cream mb-2" style={{ fontFamily: '"Comfortaa", cursive', fontWeight: 600 }}>{item.title}</p>
                  <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Values ───────────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-gold mb-4 inline-block">How We Work</span>
              <h2 className="section-heading">What We Stand By</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card-luxury p-6 flex items-start gap-4">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,139,10,0.08)', border: '1px solid rgba(201,139,10,0.2)' }}>
                    <Icon size={16} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-cream mb-1" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '14px', fontWeight: 600 }}>{title}</p>
                    <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="section-heading text-3xl mb-4">Ready to Make Your Mark?</h2>
            <p className="text-cream/60 mb-8 text-base" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Browse our collection or reach out on WhatsApp — we're happy to help you find the right piece for any occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-gold">
                Shop Collection <ChevronRight size={15} />
              </Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <MessageCircle size={15} /> WhatsApp Us
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
