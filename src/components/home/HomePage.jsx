import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Clock, Truck, Award, ChevronRight } from 'lucide-react'
import { products, categories, testimonials } from '../../data/products'
import ProductCard from '../product/ProductCard'

export default function HomePage() {
  const featured = products.filter(p => p.featured)

  return (
    <main className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-onyx-950">
        {/* Luxury grid background */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(#c98b0a 1px, transparent 1px), linear-gradient(90deg, #c98b0a 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gold radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(201,139,10,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-up">
            <span className="badge-gold mb-6 inline-block">
              Tirupati's First Luxury Laser Studio
            </span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream leading-[1.05] tracking-tight mt-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}>
            Every Mark<br />
            <span className="shimmer-gold italic">Tells Your Story</span>
          </h1>

          <p className="mt-6 text-onyx-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}>
            Precision laser engraving on pens, keychains, bottles and more.
            Crafted for weddings, corporate gifting, and devotional keepsakes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up"
            style={{ animationDelay: '0.3s' }}>
            <Link to="/products" className="btn-gold">
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link to="/corporate" className="btn-outline">
              Corporate Enquiry
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 mt-16 animate-fade-up"
            style={{ animationDelay: '0.4s' }}>
            {[
              { label: 'Orders Delivered', value: '2,400+' },
              { label: 'Happy Customers',  value: '1,800+' },
              { label: 'Cities Shipped',   value: '38+' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl text-gold-400">{stat.value}</p>
                <p className="text-xs text-onyx-400 tracking-wide mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] tracking-luxury text-onyx-500 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold-600 to-transparent" />
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <section className="bg-onyx-900 border-y border-onyx-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: 'Quality Guaranteed',     sub: 'Free redo on any defect' },
              { icon: Clock,  label: '24–48hr Turnaround',     sub: 'Rush orders available' },
              { icon: Truck,  label: 'Pan-India Delivery',     sub: 'Ships to 25,000+ pincodes' },
              { icon: Award,  label: 'Pre-Ship Photo Approval',sub: 'See before we ship' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={20} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-cream">{label}</p>
                  <p className="text-xs text-onyx-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COLLECTION ──────────────────────────── */}
      <section className="py-24 bg-onyx-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-gold mb-4 inline-block">Handpicked for you</span>
            <h2 className="section-heading">
              Featured <span className="text-gold-400 italic">Collection</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline">
              View Full Collection
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── B2B OCCASIONS ────────────────────────────────── */}
      <section className="py-24 bg-onyx-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-gold mb-4 inline-block">Every occasion, perfectly marked</span>
            <h2 className="section-heading">
              Crafted for <span className="text-gold-400 italic">Every Moment</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title:  'Wedding & Events',
                desc:   'Return gifts, couple keychains, invitation sets. Minimum 50 pieces.',
                icon:   '✦',
                href:   '/wedding',
                accent: 'Bulk pricing from ₹79/pc',
              },
              {
                title:  'Corporate Gifting',
                desc:   'Branded pens, bottles, awards. Trusted by Sri City companies.',
                icon:   '⬡',
                href:   '/corporate',
                accent: 'GST invoice provided',
              },
              {
                title:  'Temple & Devotional',
                desc:   'Venkateswara keychains, darshan mementos. Telugu engraving available.',
                icon:   '❋',
                href:   '/products?category=devotional',
                accent: 'Tirupati special',
              },
              {
                title:  'Schools & Colleges',
                desc:   'Prize-day pens, trophies, mementos. Trusted by IIT Tirupati.',
                icon:   '◈',
                href:   '/products?category=corporate',
                accent: 'Same-week delivery',
              },
            ].map(card => (
              <Link
                key={card.title}
                to={card.href}
                className="card-luxury p-6 group block"
              >
                <span className="text-2xl text-gold-500 mb-4 block">{card.icon}</span>
                <h3 className="font-serif text-lg text-cream group-hover:text-gold-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-onyx-400 mt-2 leading-relaxed">{card.desc}</p>
                <p className="text-[11px] text-gold-500 mt-4 tracking-wide border-t border-onyx-700 pt-3">
                  {card.accent} →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-24 bg-onyx-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="badge-gold mb-4 inline-block">Simple, fast, precise</span>
          <h2 className="section-heading mb-14">
            From Design to <span className="text-gold-400 italic">Your Doorstep</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Choose your item',     desc: 'Browse our collection and select the perfect product.' },
              { step: '02', title: 'Personalise it',       desc: 'Add your text, upload a logo, choose font and placement.' },
              { step: '03', title: 'We craft it for you',  desc: 'Precision laser engraving by our studio in Tirupati.' },
              { step: '04', title: 'Delivered with love',  desc: 'Photo approval before dispatch. Delivered in 2–5 days.' },
            ].map(s => (
              <div key={s.step} className="text-center">
                <span className="font-serif text-5xl text-onyx-700">{s.step}</span>
                <div className="w-px h-6 bg-gold-600/40 mx-auto my-3" />
                <h3 className="font-serif text-base text-cream">{s.title}</h3>
                <p className="text-sm text-onyx-400 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="py-24 bg-onyx-900">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="badge-gold mb-4 inline-block">Verified customers</span>
            <h2 className="section-heading">
              Words from Our <span className="text-gold-400 italic">Patrons</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="card-luxury p-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <p className="text-onyx-300 text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="mt-5 pt-4 border-t border-onyx-700">
                  <p className="font-medium text-cream text-sm">{t.name}</p>
                  <p className="text-xs text-onyx-500 mt-0.5">{t.location} · {t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-20 bg-onyx-950 border-y border-gold-600/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-cream mb-4">
            Ready to create something <span className="shimmer-gold italic">unforgettable?</span>
          </h2>
          <p className="text-onyx-400 mb-8">
            Corporate orders · Wedding sets · Devotional keepsakes · Personal gifts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="btn-gold">Start Designing</Link>
            <a href="https://wa.me/91XXXXXXXXXX?text=Hi, I'd like to enquire about Saanvi Marks"
               target="_blank" rel="noreferrer"
               className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
