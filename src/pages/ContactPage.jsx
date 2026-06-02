import { MessageCircle, Mail, MapPin, Clock, ChevronRight, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

const PHONE = '918686183497'
const wa = (msg) => `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`

const contacts = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    primary: '+91 86861 83497',
    sub: 'Fastest response — usually within the hour',
    href: wa("Hi! I'd like to get in touch with Saanvi Marks."),
    cta: 'Chat Now',
    gold: true,
  },
  {
    icon: Mail,
    title: 'Email',
    primary: 'hello@saanvimarks.in',
    sub: 'For detailed enquiries, quotes, and invoices',
    href: 'mailto:hello@saanvimarks.in',
    cta: 'Send Email',
  },
  {
    icon: MapPin,
    title: 'Studio',
    primary: 'Tirupati, Andhra Pradesh',
    sub: 'Exact address shared on booking',
    href: wa("Hi! I'd like to visit the Saanvi Marks studio. Can you share the address?"),
    cta: 'Get Directions',
  },
]

const faqs = [
  {
    q: 'How long does an order take?',
    a: 'Most individual orders are done within 2–4 working days. Bulk orders (50+ pieces) typically take 5–7 days depending on quantity. We always share a photo before dispatching.',
  },
  {
    q: 'Can I get a sample before placing a bulk order?',
    a: 'Yes — WhatsApp us and we\'ll engrave a single sample piece for you to approve before we start the full batch.',
  },
  {
    q: 'Do you ship outside Tirupati?',
    a: 'We ship pan-India. Free delivery on orders above ₹999. Smaller orders carry a flat shipping charge.',
  },
  {
    q: 'Can I bring my own item for engraving?',
    a: 'Absolutely. Visit our studio or use our Tirupati pickup service. WhatsApp us a photo of your item first so we can confirm it\'s engravable.',
  },
  {
    q: 'Do you provide GST invoices?',
    a: 'Yes — add your GSTIN at checkout and we\'ll include a formal GST invoice with your order.',
  },
  {
    q: 'What if I\'m not happy with the engraving?',
    a: 'We send a digital preview + a pre-ship photo for your approval before the item leaves our studio. If something looks off, we fix it.',
  },
]

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Saanvi Marks — WhatsApp, email, or visit our studio in Tirupati. We respond within the hour on WhatsApp."
      />
      <main className="min-h-screen bg-onyx-950 pt-24">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,139,10,0.08) 0%, transparent 55%)' }} />
          <div className="max-w-2xl mx-auto text-center relative">
            <span className="badge-gold mb-5 inline-block">Get in Touch</span>
            <h1 className="section-heading text-4xl sm:text-5xl mb-4">We're Here to Help</h1>
            <p className="text-cream/70 text-base leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Got a question about an order, a bulk enquiry, or just want to know if we can engrave your item? WhatsApp is the fastest way to reach us.
            </p>
          </div>
        </section>

        {/* ── Contact cards ─────────────────────────────────────────────────── */}
        <section className="py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {contacts.map(({ icon: Icon, title, primary, sub, href, cta, gold }) => (
              <div key={title} className="card-luxury p-7 flex flex-col gap-4">
                <div className="w-10 h-10 flex items-center justify-center"
                  style={{ background: 'rgba(201,139,10,0.08)', border: '1px solid rgba(201,139,10,0.2)' }}>
                  <Icon size={18} className="text-gold-500" />
                </div>
                <div className="flex-1">
                  <p className="text-cream mb-1" style={{ fontFamily: '"Comfortaa", cursive', fontWeight: 600 }}>{title}</p>
                  <p className="text-cream/90 text-sm mb-1" style={{ fontFamily: '"Nunito", sans-serif' }}>{primary}</p>
                  <p className="text-cream/50 text-xs" style={{ fontFamily: '"Nunito", sans-serif' }}>{sub}</p>
                </div>
                <a href={href} target="_blank" rel="noopener noreferrer"
                  className={gold ? 'btn-gold text-sm self-start' : 'btn-outline text-sm self-start'}>
                  {cta} <ChevronRight size={13} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── Hours ────────────────────────────────────────────────────────── */}
        <section className="py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 p-6"
              style={{ background: 'rgba(14,12,10,0.7)', border: '1px solid rgba(70,66,59,0.4)' }}>
              <Clock size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-cream mb-2" style={{ fontFamily: '"Comfortaa", cursive', fontWeight: 600 }}>Studio Hours</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1 text-sm" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  <div className="flex justify-between gap-8">
                    <span className="text-onyx-400">Monday – Saturday</span>
                    <span className="text-cream">10 AM – 7 PM</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span className="text-onyx-400">Sunday</span>
                    <span className="text-cream">By appointment</span>
                  </div>
                </div>
                <p className="text-onyx-400 text-xs mt-2" style={{ fontFamily: '"Nunito", sans-serif' }}>
                  WhatsApp is monitored outside hours for urgent bulk order queries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="badge-gold mb-4 inline-block">FAQ</span>
              <h2 className="section-heading">Common Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map(({ q, a }) => (
                <div key={q} className="card-luxury p-5">
                  <p className="text-cream mb-2" style={{ fontFamily: '"Comfortaa", cursive', fontSize: '14px', fontWeight: 600 }}>{q}</p>
                  <p className="text-cream/60 text-sm leading-relaxed" style={{ fontFamily: '"Nunito", sans-serif' }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-cream/60 text-sm mb-6" style={{ fontFamily: '"Nunito", sans-serif' }}>
              Still have a question? Just WhatsApp us — we'll get back to you faster than an email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={wa("Hi! I have a question about Saanvi Marks.")} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <Link to="/products" className="btn-outline">
                <Package size={15} /> Browse Collection
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
