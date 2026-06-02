import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Category to atmospheric gradient map
const CATEGORY_GRADIENTS = {
  pens:       'from-[#1a1510] via-[#221a0e] to-[#1a1208]',
  keychains:  'from-[#0f1218] via-[#151820] to-[#0d1015]',
  bottles:    'from-[#0e1518] via-[#121c1e] to-[#0a1215]',
  frames:     'from-[#140f0a] via-[#1e1508] to-[#120e06]',
  corporate:  'from-[#0e0e14] via-[#131320] to-[#0b0b12]',
  devotional: 'from-[#180e08] via-[#201208] to-[#160d06]',
  wedding:    'from-[#150e14] via-[#1e1420] to-[#110b10]',
}

const CATEGORY_SYMBOL = {
  pens:       '✒',
  keychains:  '⬡',
  bottles:    '◈',
  frames:     '✦',
  corporate:  '◇',
  devotional: '❋',
  wedding:    '✧',
}

export default function ProductCard({ product }) {
  const discount  = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null
  const gradient = CATEGORY_GRADIENTS[product.category] ?? 'from-[#141210] to-[#0e0d0c]'
  const symbol   = CATEGORY_SYMBOL[product.category]    ?? '✦'

  return (
    <Link
      to={`/products/${product.id}`}
      className="card-luxury group block overflow-hidden"
    >
      {/* ── Image / atmosphere area ─────────────────────── */}
      <div className={`relative aspect-[4/3] bg-gradient-to-br ${gradient} overflow-hidden`}>

        {/* Radial spotlight */}
        <div className="absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,139,10,0.07) 0%, transparent 70%)' }}
        />

        {/* Fine diagonal lines texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #c98b0a 0px, #c98b0a 1px, transparent 1px, transparent 14px)',
          }}
        />

        {/* Corner ornaments */}
        <span className="corner-ornament corner-ornament-tl transition-all duration-500 group-hover:w-6 group-hover:h-6" />
        <span className="corner-ornament corner-ornament-tr transition-all duration-500 group-hover:w-6 group-hover:h-6" />
        <span className="corner-ornament corner-ornament-bl transition-all duration-500 group-hover:w-6 group-hover:h-6" />
        <span className="corner-ornament corner-ornament-br transition-all duration-500 group-hover:w-6 group-hover:h-6" />

        {/* Real product image */}
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <span className="text-4xl" style={{ color: 'rgba(201,139,10,0.35)' }}>{symbol}</span>
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201,139,10,0.25)' }}>
              {product.material}
            </span>
          </div>
        )}

        {/* Subtle dark vignette over image for text legibility */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,9,8,0.45) 100%)' }} />

        {/* Gold shimmer sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(201,139,10,0.08) 50%, transparent 70%)' }} />

        {/* Bottom fade into card body */}
        <div className="absolute bottom-0 inset-x-0 h-16"
          style={{ background: 'linear-gradient(to top, rgba(26,25,23,1), transparent)' }}
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 badge-gold text-[9px]">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className="absolute top-3 right-3 text-[9px] px-2 py-0.5 font-medium text-onyx-950"
            style={{ background: 'linear-gradient(105deg, #c98b0a, #e8c460)' }}
          >
            −{discount}%
          </span>
        )}

        {/* Hover CTA */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                        transition-all duration-400">
          <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase
                           text-gold-300 border border-gold-600/40 px-4 py-1.5
                           bg-onyx-950/70 backdrop-blur-sm">
            Personalise
            <ArrowRight size={11} />
          </span>
        </div>
      </div>

      {/* ── Card body ───────────────────────────────────── */}
      <div className="p-5 border-t border-onyx-800/60">
        <p className="text-[9px] tracking-[0.22em] text-gold-600/80 uppercase mb-2">{product.material}</p>

        <h3 className="text-cream group-hover:text-gold-300 transition-colors duration-300 leading-snug"
            style={{ fontFamily: '"Comfortaa", cursive', fontSize: '15px', fontWeight: 600 }}>
          {product.name}
        </h3>

        <p className="text-[13px] text-cream/80 mt-1.5 leading-relaxed line-clamp-2">
          {product.description.substring(0, 72)}…
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-2.5 mt-4">
          <span className="text-xl font-semibold text-gold-400 leading-none"
            style={{ fontFamily: '"Caveat", cursive' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-onyx-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-1.5 mt-2.5">
          <span className="w-1 h-1 rounded-full bg-gold-600/50" />
          <p className="text-[11px] text-onyx-300 tracking-wide">
            {product.deliveryDays}-day delivery
          </p>
        </div>
      </div>
    </Link>
  )
}
