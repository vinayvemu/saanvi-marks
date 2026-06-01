import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/product/ProductCard'

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('featured')
  const catParam = searchParams.get('category') || 'all'

  const filtered = useMemo(() => {
    let list = catParam === 'all' ? products : products.filter(p => p.category === catParam)
    if (sort === 'price-asc')  list = [...list].sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price)
    if (sort === 'featured')   list = [...list].sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    return list
  }, [catParam, sort])

  const setCategory = (cat) => {
    if (cat === 'all') searchParams.delete('category')
    else searchParams.set('category', cat)
    setSearchParams(searchParams)
  }

  return (
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-gold mb-4 inline-block">Precision engraved, made to order</span>
          <h1 className="section-heading">
            Our <span className="text-gold-400 italic">Collection</span>
          </h1>
          <p className="text-onyx-400 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Every product is made to order. Add your personalisation and we'll engrave it with precision.
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-onyx-800">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`text-xs px-4 py-2 border transition-all duration-150
                  ${catParam === cat.id
                    ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                    : 'border-onyx-700 text-onyx-400 hover:border-onyx-500 hover:text-onyx-200'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-onyx-500" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-transparent border border-onyx-700 text-onyx-300 text-xs px-3 py-2 focus:outline-none focus:border-gold-500"
            >
              <option value="featured">Featured first</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="text-xs text-onyx-500 mb-6">{filtered.length} products</p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-xl text-onyx-400">No products in this category yet</p>
            <button onClick={() => setCategory('all')} className="btn-outline mt-6 inline-flex items-center gap-2">
              <X size={14} /> Clear filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  )
}
