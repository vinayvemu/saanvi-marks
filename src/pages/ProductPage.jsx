import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Shield, Clock, Truck } from 'lucide-react'
import { products } from '../data/products'
import EngravingCustomiser from '../components/product/EngravingCustomiser'
import ProductCard from '../components/product/ProductCard'
import { useCart } from '../context/CartContext'

export default function ProductPage() {
  const { id }    = useParams()
  const { addItem } = useCart()
  const product   = products.find(p => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="font-serif text-2xl text-cream">Product not found</p>
          <Link to="/products" className="btn-gold mt-6 inline-flex">Back to Collection</Link>
        </div>
      </div>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  const handleAddToCart = (engraving, quantity) => {
    addItem(product, engraving, quantity)
  }

  return (
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-onyx-500 mb-8">
          <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold-400 transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-onyx-300">{product.name}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── LEFT: Product images ── */}
          <div className="space-y-4">
            {/* Main image */}
            <div className="aspect-square bg-onyx-800 border border-onyx-700 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold-600/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold-600/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-gold-600/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold-600/40" />

              <div className="text-center">
                <p className="text-onyx-600 text-sm">Product image</p>
                <p className="text-onyx-700 text-xs mt-1">{product.name}</p>
              </div>

              {product.badge && (
                <span className="absolute top-4 left-4 badge-gold">{product.badge}</span>
              )}
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, text: 'Quality guaranteed' },
                { icon: Clock,  text: `${product.deliveryDays}-day delivery` },
                { icon: Truck,  text: 'Free above ₹999' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1 p-3 bg-onyx-800 border border-onyx-700 text-center">
                  <Icon size={16} className="text-gold-500" />
                  <span className="text-[11px] text-onyx-400 leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Info + Customiser ── */}
          <div>
            {/* Product info */}
            <div className="mb-8">
              <span className="badge-gold mb-3 inline-block">{product.material}</span>
              <h1 className="font-serif text-3xl md:text-4xl text-cream leading-tight">{product.name}</h1>

              {/* Rating placeholder */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <span className="text-xs text-onyx-400">5.0 (verified buyers)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-serif text-3xl text-gold-400">₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-lg text-onyx-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm text-green-400">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                )}
              </div>

              <p className="text-onyx-400 text-sm leading-relaxed mt-4">{product.description}</p>

              {/* Bulk pricing table */}
              {product.bulkPricing.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs text-onyx-400 mb-2 tracking-wide uppercase">Bulk pricing</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.bulkPricing.map(b => (
                      <div key={b.qty} className="px-3 py-2 bg-onyx-800 border border-onyx-700 text-center">
                        <p className="text-[10px] text-onyx-500">Qty {b.qty}+</p>
                        <p className="text-sm font-medium text-gold-400">₹{b.pricePerUnit}/pc</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Engraving Customiser */}
            <div className="border-t border-onyx-700 pt-8">
              <p className="font-serif text-lg text-cream mb-5">
                Personalise Your <span className="text-gold-400 italic">Engraving</span>
              </p>
              <EngravingCustomiser product={product} onAddToCart={handleAddToCart} />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="luxury-divider text-xs tracking-luxury uppercase text-gold-600 mb-12">
              You may also love
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
