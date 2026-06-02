import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Shield,
  Clock,
  Truck,
  Award,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { testimonials } from "../../data/products";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import SEO from "../ui/SEO";

const OCCASIONS = [
  {
    title: "Wedding & Events",
    symbol: "✦",
    desc: "Return gifts for 50–500 guests. Couple keychains, coasters, pens. Free design proof.",
    accent: "From ₹79 per piece",
    tag: "Most popular",
    href: "/products?category=wedding",
    bg: "from-[#150e14] to-[#0d0b0d]",
    whatsapp: "Hi, I need wedding return gifts for my event.",
  },
  {
    title: "Corporate Gifting",
    symbol: "⬡",
    desc: "Branded pens, tumblers, award plaques. GST invoice. Bulk orders from 10 pieces.",
    accent: "Bulk quotes in 2 hrs",
    tag: "GST invoice",
    href: "/products?category=corporate",
    bg: "from-[#0e0e14] to-[#0b0b10]",
    whatsapp: "Hi, I need corporate gifting for our team.",
  },
  {
    title: "Devotional",
    symbol: "❋",
    desc: "Venkateswara keychains, darshan mementos. Telugu & English engraving. Temple blessed.",
    accent: "Tirupati special",
    tag: "Telugu available",
    href: "/products?category=devotional",
    bg: "from-[#180e08] to-[#110b06]",
    whatsapp: "Hi, I need devotional engraved items.",
  },
  {
    title: "Personal Gifts",
    symbol: "◈",
    desc: "Birthday, anniversary, retirement — one piece or a hundred. Live engraving preview.",
    accent: "Min qty: 1",
    tag: "Ships in 2 days",
    href: "/products",
    bg: "from-[#0f1218] to-[#0d1015]",
    whatsapp: "Hi, I want a personalised engraved gift.",
  },
];

const WA_BASE = "https://wa.me/918686183497?text=";

export default function HomePage() {
  const { products, loading } = useProducts({ activeOnly: true });
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <SEO
        description="Saanvi Marks — premium laser engraving on pens, keychains, bottles and gift items. Based in Tirupati, ships pan-India. Corporate gifting, weddings, devotional pieces."
        keywords="laser engraving Tirupati, personalized gifts Tirupati, engraved pens keychains bottles, Venkateswara devotional gifts, wedding return gifts bulk, Diwali corporate gifts India"
        url="https://saanvimarks.in"
      />
      <main className="min-h-screen">
        {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0a0806 0%, #0e0c09 40%, #0a0908 100%)",
          }}
        >
          <div className="absolute inset-0">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.07]"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, #c98b0a 0%, transparent 65%)",
              }}
            />
            <div
              className="absolute bottom-1/4 right-0 w-[600px] h-[400px] opacity-[0.04]"
              style={{
                background:
                  "radial-gradient(ellipse at 100% 100%, #c98b0a 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-px opacity-10"
              style={{
                background:
                  "linear-gradient(to right, transparent, #c98b0a, transparent)",
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(201,139,10,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,139,10,1) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">
            <div className="animate-fade-up" style={{ animationDelay: "0s" }}>
              <span className="badge-gold mb-8 inline-block">
                Tirupati's First Luxury Laser Studio
              </span>
            </div>

            <h1
              className="animate-fade-up mt-2 mb-0"
              style={{
                fontFamily:
                  '"Caveat", cursive',
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                lineHeight: 0.92,
                fontWeight: 300,
                letterSpacing: "-0.02em",
                color: "#faf8f3",
                animationDelay: "0.1s",
              }}
            >
              Every Mark
            </h1>

            <div
              className="animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              <span
                className="shimmer-gold"
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: "clamp(3.5rem, 10vw, 8rem)",
                  lineHeight: 1.05,
                  fontWeight: 400,
                  fontStyle: "italic",
                  letterSpacing: "-0.01em",
                }}
              >
                Tells Your Story
              </span>
            </div>

            <div
              className="animate-fade-up flex items-center justify-center gap-4 mt-8 mb-8"
              style={{ animationDelay: "0.2s" }}
            >
              <div
                className="w-16 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(201,139,10,0.6))",
                }}
              />
              <span className="text-[9px] tracking-[0.3em] text-gold-600 uppercase">
                Tirupati, India
              </span>
              <div
                className="w-16 h-px"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(201,139,10,0.6))",
                }}
              />
            </div>

            <p
              className="animate-fade-up text-onyx-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
              style={{
                animationDelay: "0.25s",
                fontWeight: 300,
                letterSpacing: "0.01em",
              }}
            >
              Precision laser engraving on pens, keychains, bottles and more.
              Crafted for weddings, corporate gifting, and devotional keepsakes.
            </p>

            {/* Occasion quick-pick pills */}
            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-2"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-[10px] text-onyx-600 tracking-widest uppercase mr-1">
                I need gifts for
              </span>
              {OCCASIONS.map((o) => (
                <Link
                  key={o.title}
                  to={o.href}
                  className="text-xs px-3 py-1.5 border border-onyx-700 text-onyx-400 hover:border-gold-600 hover:text-gold-300 transition-all duration-200"
                  style={{ borderRadius: "2px" }}
                >
                  {o.title.split(" ")[0]}
                </Link>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="animate-fade-up flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              style={{ animationDelay: "0.35s" }}
            >
              <Link to="/products" className="btn-gold">
                Explore Collection
                <ArrowRight size={15} />
              </Link>
              <a
                href={`${WA_BASE}${encodeURIComponent("Hi, I need help with a bulk engraving order.")}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <MessageCircle size={14} />
                WhatsApp for Bulk Order
              </a>
            </div>

            {/* Stats */}
            <div
              className="animate-fade-up flex items-center justify-center mt-20"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "150+", label: "Orders Delivered" },
                { value: "80+",  label: "Happy Customers" },
                { value: "5+",   label: "Cities Shipped" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-stretch">
                  <div className="text-center px-8 md:px-12">
                    <p
                      style={{
                        fontFamily: '"Caveat", cursive',
                        fontSize: "2rem",
                        fontWeight: 400,
                        color: "#e8a81a",
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-onyx-500 tracking-[0.18em] uppercase mt-1.5">
                      {stat.label}
                    </p>
                  </div>
                  {i < 2 && (
                    <div
                      className="w-px self-stretch"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent, rgba(201,139,10,0.3), transparent)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
            <span className="text-[9px] tracking-[0.3em] text-onyx-600 uppercase">
              Scroll
            </span>
            <div
              className="w-px h-12"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(201,139,10,0.6), transparent)",
              }}
            />
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════════════════ */}
        <section
          style={{
            background: "linear-gradient(to right, #0d0c0a, #141210, #0d0c0a)",
            borderTop: "1px solid rgba(201,139,10,0.12)",
            borderBottom: "1px solid rgba(201,139,10,0.12)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-7">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  label: "Quality Guaranteed",
                  sub: "Free redo on any defect",
                },
                {
                  icon: Clock,
                  label: "24–48hr Turnaround",
                  sub: "Rush orders available",
                },
                {
                  icon: Truck,
                  label: "Pan-India Delivery",
                  sub: "Ships to 25,000+ pincodes",
                },
                {
                  icon: Award,
                  label: "Pre-Ship Photo Approval",
                  sub: "See before we ship",
                },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(201,139,10,0.06)",
                      border: "1px solid rgba(201,139,10,0.15)",
                    }}
                  >
                    <Icon size={14} className="text-gold-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-cream tracking-wide">
                      {label}
                    </p>
                    <p className="text-[10px] text-onyx-500 mt-0.5 tracking-wide">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          SHOP BY OCCASION  ← moved above featured products
      ══════════════════════════════════════════════════ */}
        <section
          className="py-28"
          style={{
            background: "linear-gradient(180deg, #0a0908 0%, #0d0b09 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="badge-gold mb-5 inline-block">
                What are you celebrating?
              </span>
              <h2 className="section-heading">
                Shop by <span className="shimmer-gold italic">Occasion</span>
              </h2>
              <p className="text-onyx-500 text-sm mt-3 max-w-lg mx-auto">
                Most people come to us with an occasion in mind — not a product.
                Start here.
              </p>
              <span className="gold-line mt-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {OCCASIONS.map((card) => (
                <div
                  key={card.title}
                  className={`group relative overflow-hidden bg-gradient-to-br ${card.bg}`}
                  style={{ border: "1px solid rgba(70,66,59,0.6)" }}
                >
                  {/* hover wash */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 0%, rgba(201,139,10,0.08) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative p-8 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-5">
                      <span
                        className="text-4xl transition-transform duration-500 group-hover:scale-110 origin-left"
                        style={{
                          color: "rgba(201,139,10,0.55)",
                          filter: "drop-shadow(0 0 10px rgba(201,139,10,0.25))",
                        }}
                      >
                        {card.symbol}
                      </span>
                      <span
                        className="text-[9px] tracking-[0.18em] uppercase px-2 py-1"
                        style={{
                          background: "rgba(201,139,10,0.08)",
                          border: "1px solid rgba(201,139,10,0.2)",
                          color: "#c98b0a",
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="text-cream group-hover:text-gold-300 transition-colors duration-300 mb-3"
                        style={{ fontFamily: '"Comfortaa", cursive', fontSize: '1.15rem', fontWeight: 600 }}>
                      {card.title}
                    </h3>
                    <p className="text-[13px] text-cream/80 leading-relaxed flex-1">
                      {card.desc}
                    </p>

                    <div
                      className="mt-6 pt-5 flex items-center justify-between"
                      style={{ borderTop: "1px solid rgba(201,139,10,0.12)" }}
                    >
                      <p className="text-[11px] text-gold-600 tracking-wide">
                        {card.accent}
                      </p>

                      <div className="flex items-center gap-3">
                        {/* WhatsApp quick-enquiry */}
                        <a
                          href={`${WA_BASE}${encodeURIComponent(card.whatsapp)}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] text-onyx-500 hover:text-green-400 transition-colors flex items-center gap-1"
                          title="Quick WhatsApp enquiry"
                        >
                          <MessageCircle size={11} /> Enquire
                        </a>
                        <Link
                          to={card.href}
                          className="flex items-center gap-1.5 text-[11px] text-gold-500 hover:text-gold-300 transition-colors tracking-wide"
                        >
                          Browse
                          <ArrowRight
                            size={11}
                            className="-translate-x-0.5 group-hover:translate-x-0 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* bottom border accent on hover */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(201,139,10,0.5), transparent)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          FEATURED COLLECTION
      ══════════════════════════════════════════════════ */}
        <section
          className="py-28"
          style={{
            background: "linear-gradient(180deg, #0d0b09 0%, #0a0908 100%)",
            borderTop: "1px solid rgba(201,139,10,0.07)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="badge-gold mb-5 inline-block">
                Handpicked for you
              </span>
              <h2 className="section-heading">
                Popular <span className="shimmer-gold italic">Picks</span>
              </h2>
              <span className="gold-line mt-5" />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse"
                    style={{ border: "1px solid rgba(70,66,59,0.3)" }}
                  >
                    <div
                      className="aspect-[4/3]"
                      style={{ background: "rgba(20,18,16,0.8)" }}
                    />
                    <div className="p-5 space-y-3">
                      <div
                        className="h-3 w-3/4 rounded"
                        style={{ background: "rgba(70,66,59,0.4)" }}
                      />
                      <div
                        className="h-6 w-1/3 rounded"
                        style={{ background: "rgba(201,139,10,0.2)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="text-center mt-14">
              <Link to="/products" className="btn-outline">
                View Full Collection
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════════ */}
        <section
          className="py-28"
          style={{
            background: "linear-gradient(180deg, #0a0908 0%, #0f0d0b 100%)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="badge-gold mb-5 inline-block">
              Simple, fast, precise
            </span>
            <h2 className="section-heading mb-16">
              From Design to{" "}
              <span className="shimmer-gold italic">Your Doorstep</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div
                className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(201,139,10,0.2), rgba(201,139,10,0.2), transparent)",
                }}
              />

              {[
                {
                  step: "01",
                  title: "Choose your item",
                  desc: "Browse or pick by occasion — we'll guide you to the right product.",
                },
                {
                  step: "02",
                  title: "Personalise it",
                  desc: "Add text, upload a logo, choose font. Drag to position live preview.",
                },
                {
                  step: "03",
                  title: "We craft it for you",
                  desc: "Precision laser engraving by our studio in Tirupati.",
                },
                {
                  step: "04",
                  title: "Delivered with love",
                  desc: "Photo approval before dispatch. Delivered in 2–5 working days.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center mb-5"
                    style={{
                      background: "linear-gradient(145deg, #1a1512, #100d09)",
                      border: "1px solid rgba(201,139,10,0.2)",
                      boxShadow: "0 0 0 4px rgba(201,139,10,0.04)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: '"Caveat", cursive',
                        fontSize: "1.25rem",
                        fontWeight: 300,
                        color: "rgba(201,139,10,0.7)",
                      }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-cream mb-2 leading-snug"
                      style={{ fontFamily: '"Comfortaa", cursive', fontSize: '13px', fontWeight: 600 }}>
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-cream/75 leading-relaxed max-w-[160px] mx-auto">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════ */}
        <section
          className="py-28"
          style={{
            background: "linear-gradient(180deg, #0f0d0b 0%, #0d0b09 100%)",
            borderTop: "1px solid rgba(201,139,10,0.07)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="badge-gold mb-5 inline-block">
                Verified customers
              </span>
              <h2 className="section-heading">
                Words from Our{" "}
                <span className="shimmer-gold italic">Patrons</span>
              </h2>
              <span className="gold-line mt-5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="relative group"
                  style={{
                    background:
                      "linear-gradient(145deg, #141210 0%, #0f0d0b 100%)",
                    border: "1px solid rgba(70,66,59,0.5)",
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 30px rgba(201,139,10,0.04)",
                      border: "1px solid rgba(201,139,10,0.15)",
                    }}
                  />
                  <div className="p-7">
                    <div
                      style={{
                        fontFamily: '"Caveat", cursive',
                        fontSize: "5rem",
                        lineHeight: 0.7,
                        color: "rgba(201,139,10,0.12)",
                        fontStyle: "italic",
                        marginBottom: "0.5rem",
                        userSelect: "none",
                      }}
                    >
                      "
                    </div>
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className="text-gold-500 fill-gold-500"
                        />
                      ))}
                    </div>
                    <p
                      className="text-onyx-300 text-[13px] leading-relaxed italic"
                      style={{ fontWeight: 300 }}
                    >
                      {t.text}
                    </p>
                    <div
                      className="mt-6 pt-4 flex items-center gap-3"
                      style={{ borderTop: "1px solid rgba(201,139,10,0.1)" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: "rgba(201,139,10,0.1)",
                          border: "1px solid rgba(201,139,10,0.2)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: '"Caveat", cursive',
                            fontSize: "0.9rem",
                            color: "#c98b0a",
                          }}
                        >
                          {t.name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-cream">
                          {t.name}
                        </p>
                        <p className="text-[10px] text-onyx-500 tracking-wide">
                          {t.location} · {t.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
          BULK CTA
      ══════════════════════════════════════════════════ */}
        <section
          className="py-24 relative overflow-hidden"
          style={{
            borderTop: "1px solid rgba(201,139,10,0.15)",
            borderBottom: "1px solid rgba(201,139,10,0.15)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,139,10,0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <span className="badge-gold mb-6 inline-block">Start today</span>
            <h2
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 300,
                color: "#faf8f3",
                lineHeight: 1.15,
              }}
            >
              Ready to create something{" "}
              <span className="shimmer-gold italic">unforgettable?</span>
            </h2>

            <p className="text-onyx-400 text-sm mt-4 mb-10 tracking-wide">
              Corporate orders&nbsp;·&nbsp;Wedding sets&nbsp;·&nbsp;Devotional
              keepsakes&nbsp;·&nbsp;Personal gifts
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-gold">
                Start Designing
                <ArrowRight size={15} />
              </Link>
              <a
                href={`${WA_BASE}${encodeURIComponent("Hi, I'd like to enquire about Saanvi Marks")}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
