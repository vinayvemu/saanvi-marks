import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'

export default function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link to={`/products/${product.id}`} className="card-luxury group block overflow-hidden">
      {/* Image area */}
      <div className="relative aspect-square bg-onyx-800 overflow-hidden">
        {/* Placeholder — replace with actual product images */}
        <div className="w-full h-full flex items-center justify-center">
          <ShoppingBag size={48} className="text-onyx-600 group-hover:text-gold-600 transition-colors duration-500" />
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 badge-gold text-[10px]">
            {product.badge}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 bg-gold-500/90 text-onyx-950 font-medium">
            -{discount}%
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-onyx-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 text-cream text-sm tracking-wide border border-cream/30 px-5 py-2.5 bg-onyx-950/60">
            Personalise
            <ArrowRight size={14} />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="text-[10px] tracking-luxury text-onyx-500 uppercase mb-1">{product.material}</p>
        <h3 className="font-serif text-base text-cream group-hover:text-gold-400 transition-colors leading-tight">
          {product.name}
        </h3>

        {/* Engraving hint */}
        <p className="text-xs text-onyx-500 mt-1.5 line-clamp-2 leading-relaxed">
          {product.description.substring(0, 70)}...
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-4">
          <span className="font-serif text-lg text-gold-400">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-onyx-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Delivery */}
        <p className="text-[11px] text-onyx-500 mt-2">
          Delivered in {product.deliveryDays} days · Free above ₹999
        </p>
      </div>
    </Link>
  )
}
