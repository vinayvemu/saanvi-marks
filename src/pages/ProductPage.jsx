import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Shield, Clock, Truck, Eye, ImageIcon, RotateCcw, Move } from 'lucide-react'
import { fontOptions } from '../data/products'
import { useProduct } from '../hooks/useProduct'
import { useProducts } from '../hooks/useProducts'
import EngravingCustomiser from '../components/product/EngravingCustomiser'
import ProductCard from '../components/product/ProductCard'
import { useCart } from '../context/CartContext'
import SEO from '../components/ui/SEO'

export default function ProductPage() {
  const { id }               = useParams()
  const { addItem }          = useCart()
  const { product, loading } = useProduct(id)
  const { products }         = useProducts({ activeOnly: true })

  const [liveEngraving, setLiveEngraving] = useState(null)
  const [view, setView]                   = useState('engraved')
  const [overlay, setOverlay]             = useState(null)

  const containerRef  = useRef(null)
  const isDragging    = useRef(false)
  const isRotating    = useRef(false)
  const dragStart     = useRef({})

  useEffect(() => {
    if (!product) return
    const z = product.previewZone ?? { top: '50%', left: '50%', maxFontSize: 14 }
    setOverlay({
      x:            parseFloat(z.left),
      y:            parseFloat(z.top),
      fontSize:     z.maxFontSize ?? 14,
      rotation:     0,
      borderRadius: 0,
    })
  }, [product?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Overlay center in page coords ───────────────────────────────────────
  // Defined as useCallback so rotate handlers can reference it as a stable dep
  const getOverlayCenter = useCallback(() => {
    if (!containerRef.current || !overlay) return { x: 0, y: 0 }
    const rect = containerRef.current.getBoundingClientRect()
    return {
      x: rect.left + (overlay.x / 100) * rect.width,
      y: rect.top  + (overlay.y / 100) * rect.height,
    }
  }, [overlay])

  // ── Drag (move) ──────────────────────────────────────────────────────────
  const handleMouseDown = useCallback((e) => {
    if (!overlay) return
    e.preventDefault()
    e.stopPropagation()
    isDragging.current = true
    dragStart.current  = {
      mouseX:   e.clientX,
      mouseY:   e.clientY,
      overlayX: overlay.x,
      overlayY: overlay.y,
    }

    const onMove = (ev) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const dx   = ((ev.clientX - dragStart.current.mouseX) / rect.width)  * 100
      const dy   = ((ev.clientY - dragStart.current.mouseY) / rect.height) * 100
      setOverlay(prev => ({
        ...prev,
        x: Math.min(95, Math.max(5, dragStart.current.overlayX + dx)),
        y: Math.min(95, Math.max(5, dragStart.current.overlayY + dy)),
      }))
    }
    const onUp = () => {
      isDragging.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
  }, [overlay])

  const handleTouchStart = useCallback((e) => {
    if (!overlay || e.touches.length !== 1) return
    const t = e.touches[0]
    isDragging.current = true
    dragStart.current  = {
      mouseX:   t.clientX,
      mouseY:   t.clientY,
      overlayX: overlay.x,
      overlayY: overlay.y,
    }
    const onMove = (ev) => {
      if (!isDragging.current || !containerRef.current) return
      ev.preventDefault()
      const touch = ev.touches[0]
      const rect  = containerRef.current.getBoundingClientRect()
      const dx    = ((touch.clientX - dragStart.current.mouseX) / rect.width)  * 100
      const dy    = ((touch.clientY - dragStart.current.mouseY) / rect.height) * 100
      setOverlay(prev => ({
        ...prev,
        x: Math.min(95, Math.max(5, dragStart.current.overlayX + dx)),
        y: Math.min(95, Math.max(5, dragStart.current.overlayY + dy)),
      }))
    }
    const onEnd = () => {
      isDragging.current = false
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend',  onEnd)
    }
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend',  onEnd)
  }, [overlay])

  // ── Rotate handle drag ───────────────────────────────────────────────────
  const handleRotateMouseDown = useCallback((e) => {
    if (!overlay) return
    e.preventDefault()
    e.stopPropagation()
    isRotating.current = true

    const center    = getOverlayCenter()
    const startAngle = Math.atan2(e.clientY - center.y, e.clientX - center.x) * (180 / Math.PI)
    const initRot    = overlay.rotation

    const onMove = (ev) => {
      if (!isRotating.current) return
      const c   = getOverlayCenter()
      const ang = Math.atan2(ev.clientY - c.y, ev.clientX - c.x) * (180 / Math.PI)
      setOverlay(prev => ({ ...prev, rotation: initRot + (ang - startAngle) }))
    }
    const onUp = () => {
      isRotating.current = false
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup',   onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup',   onUp)
  }, [overlay]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRotateTouchStart = useCallback((e) => {
    if (!overlay || e.touches.length !== 1) return
    e.preventDefault()
    e.stopPropagation()
    isRotating.current = true

    const center     = getOverlayCenter()
    const t          = e.touches[0]
    const startAngle = Math.atan2(t.clientY - center.y, t.clientX - center.x) * (180 / Math.PI)
    const initRot    = overlay.rotation

    const onMove = (ev) => {
      if (!isRotating.current) return
      ev.preventDefault()
      const c   = getOverlayCenter()
      const tc  = ev.touches[0]
      const ang = Math.atan2(tc.clientY - c.y, tc.clientX - c.x) * (180 / Math.PI)
      setOverlay(prev => ({ ...prev, rotation: initRot + (ang - startAngle) }))
    }
    const onEnd = () => {
      isRotating.current = false
      document.removeEventListener('touchmove', onMove)
      document.removeEventListener('touchend',  onEnd)
    }
    document.addEventListener('touchmove', onMove, { passive: false })
    document.addEventListener('touchend',  onEnd)
  }, [overlay]) // eslint-disable-line react-hooks/exhaustive-deps

  const resetOverlay = useCallback(() => {
    if (!product) return
    const z = product.previewZone ?? { top: '50%', left: '50%', maxFontSize: 14 }
    setOverlay({
      x:            parseFloat(z.left),
      y:            parseFloat(z.top),
      fontSize:     z.maxFontSize ?? 14,
      rotation:     0,
      borderRadius: 0,
    })
  }, [product]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── All hooks above this line ─────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="w-8 h-8 border-2 border-gold-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

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

  const zone       = product.previewZone ?? { top: '50%', left: '50%', width: '55%', textAlign: 'center', maxFontSize: 14 }
  const related    = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)
  const productUrl = `https://saanvimarks.in/products/${product.id}`
  const seoDesc    = `${product.description} Material: ${product.material}. Engraving area: ${product.engravingArea}. ${product.deliveryDays}-day delivery. Ships pan-India from Tirupati.`

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: product.name, description: product.description,
    image: product.images[0] ? `https://saanvimarks.in${product.images[0]}` : undefined,
    sku: product.id, material: product.material,
    brand: { '@type': 'Brand', name: 'Saanvi Marks' },
    offers: {
      '@type': 'Offer', url: productUrl, priceCurrency: 'INR',
      price: product.price, priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Saanvi Marks' },
    },
    ...(product.originalPrice && {
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '3' },
    }),
  }

  const overlayFont = liveEngraving?.font
    ? (fontOptions.find(f => f.id === (liveEngraving.font.id ?? liveEngraving.font)) ?? liveEngraving.font)
    : null

  const previewEnabled = import.meta.env.VITE_ENGRAVING_PREVIEW === 'true'

  const activeSrc    = product.images?.[0]
  const showControls = previewEnabled && view === 'engraved' && liveEngraving && overlay

  return (
    <>
    <SEO
      title={`${product.name} — Laser Engraved ${product.material}`}
      description={seoDesc}
      keywords={`${product.name.toLowerCase()}, ${product.tags.join(', ')}, laser engraving ${product.category}, personalized ${product.category} India`}
      url={productUrl}
      type="product"
      jsonLd={jsonLd}
    />
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] text-onyx-500 mb-8">
          <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
          <span className="text-onyx-700">/</span>
          <Link to="/products" className="hover:text-gold-400 transition-colors">Collection</Link>
          <span className="text-onyx-700">/</span>
          <span className="text-onyx-300">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ══════════════════════════════════════════
              LEFT — Live preview canvas
          ══════════════════════════════════════════ */}
          <div className="space-y-4">

            {/* Main image + overlay */}
            <div
              ref={containerRef}
              className="relative aspect-square overflow-hidden"
              style={{
                background:   'linear-gradient(145deg, #141210, #0a0908)',
                border:       '1px solid rgba(70,66,59,0.5)',
                borderRadius: '16px',
              }}
            >
              {/* Corner ornaments */}
              <span className="corner-ornament corner-ornament-tl" />
              <span className="corner-ornament corner-ornament-tr" />
              <span className="corner-ornament corner-ornament-bl" />
              <span className="corner-ornament corner-ornament-br" />

              {/* Product image */}
              {activeSrc && (
                <img
                  key={activeSrc}
                  src={activeSrc}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  style={{ borderRadius: '15px' }}
                  draggable={false}
                />
              )}

              {/* Dark vignette */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background:   'radial-gradient(ellipse at center, transparent 45%, rgba(10,9,8,0.45) 100%)',
                  borderRadius: '15px',
                }} />

              {/* ── ENGRAVING OVERLAY — draggable + native-rotate ── */}
              {previewEnabled && view === 'engraved' && liveEngraving && overlay && (
                <div
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  className="absolute select-none"
                  style={{
                    top:       `${overlay.y}%`,
                    left:      `${overlay.x}%`,
                    width:     zone.width,
                    transform: `translate(-50%, -50%) rotate(${overlay.rotation}deg)`,
                    textAlign: zone.textAlign,
                    cursor:    'grab',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                  }}
                >
                  {/* Text engraving */}
                  {liveEngraving.text && (
                    <>
                      <p style={{
                        ...overlayFont?.style,
                        fontSize:      `${overlay.fontSize}px`,
                        lineHeight:    1.25,
                        color:         'rgba(255, 248, 215, 0.82)',
                        textShadow:    [
                          '0 1px 3px rgba(0,0,0,0.95)',
                          '0 -0.5px 0 rgba(255,255,255,0.18)',
                          '0 0 10px rgba(201,139,10,0.22)',
                        ].join(', '),
                        mixBlendMode:  'screen',
                        letterSpacing: overlayFont?.style?.letterSpacing ?? '0.04em',
                        pointerEvents: 'none',
                      }}>
                        {liveEngraving.text}
                      </p>
                      {liveEngraving.line2 && (
                        <p style={{
                          ...overlayFont?.style,
                          fontSize:     `${Math.round(overlay.fontSize * 0.78)}px`,
                          lineHeight:   1.3,
                          marginTop:    '3px',
                          color:        'rgba(230, 215, 170, 0.7)',
                          textShadow:   '0 1px 2px rgba(0,0,0,0.9), 0 -0.5px 0 rgba(255,255,255,0.12)',
                          mixBlendMode: 'screen',
                          pointerEvents: 'none',
                        }}>
                          {liveEngraving.line2}
                        </p>
                      )}
                    </>
                  )}

                  {/* Image engraving */}
                  {liveEngraving.imageUrl && (
                    <img
                      src={liveEngraving.imageUrl}
                      alt="Engraving preview"
                      style={{
                        maxWidth:     '100%',
                        maxHeight:    `${overlay.fontSize * 5}px`,
                        objectFit:    'contain',
                        opacity:      0.75,
                        mixBlendMode: 'screen',
                        filter:       'sepia(0.4) saturate(0.5) brightness(1.1)',
                        borderRadius: `${overlay.borderRadius}%`,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* ── Rotation handle — drag to rotate ── */}
                  <div
                    onMouseDown={handleRotateMouseDown}
                    onTouchStart={handleRotateTouchStart}
                    title="Drag to rotate"
                    style={{
                      position:        'absolute',
                      bottom:          '-22px',
                      left:            '50%',
                      transform:       'translateX(-50%)',
                      width:           '16px',
                      height:          '16px',
                      borderRadius:    '50%',
                      background:      'rgba(201,139,10,0.9)',
                      border:          '1.5px solid rgba(255,220,100,0.6)',
                      cursor:          'crosshair',
                      display:         'flex',
                      alignItems:      'center',
                      justifyContent:  'center',
                      boxShadow:       '0 0 6px rgba(201,139,10,0.5)',
                    }}
                  >
                    {/* Rotate SVG icon inside handle */}
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0a0908" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6" />
                      <path d="M21.34 15.57a10 10 0 1 1-.57-8.38" />
                    </svg>
                  </div>

                  {/* Stem line from text to handle */}
                  <div style={{
                    position:        'absolute',
                    bottom:          '-14px',
                    left:            '50%',
                    transform:       'translateX(-50%)',
                    width:           '1px',
                    height:          '12px',
                    background:      'rgba(201,139,10,0.4)',
                    pointerEvents:   'none',
                  }} />
                </div>
              )}

              {/* "Live Preview" badge */}
              {previewEnabled && view === 'engraved' && liveEngraving && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="badge-gold text-[9px] animate-gold-pulse">✦ Live Preview</span>
                  <span className="text-[9px] text-onyx-500 tracking-wide">drag · rotate handle · plain view above</span>
                </div>
              )}

              {/* Empty state hint */}
              {previewEnabled && view === 'engraved' && !liveEngraving && (
                <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
                  <span className="text-[10px] tracking-[0.18em] text-onyx-600 uppercase">
                    Type below to see your engraving
                  </span>
                </div>
              )}

              {/* Product badge */}
              {product.badge && (
                <span className="absolute top-4 left-4 badge-gold">{product.badge}</span>
              )}
            </div>

            {/* ── SIZE + BORDER RADIUS CONTROLS — only when engraving active ── */}
            {previewEnabled && showControls && (
              <div
                className="space-y-2.5 px-4 py-3"
                style={{ background: 'rgba(20,18,16,0.9)', border: '1px solid rgba(70,66,59,0.5)', borderRadius: '8px' }}
              >
                {/* Size row */}
                <div className="flex items-center gap-3">
                  <Move size={11} className="text-gold-600 shrink-0" />
                  <span className="text-[10px] text-onyx-500 w-12 shrink-0">Size</span>
                  <input
                    type="range"
                    min={8}
                    max={40}
                    value={overlay.fontSize}
                    onChange={e => setOverlay(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                    className="flex-1 accent-amber-500 h-1 cursor-pointer"
                  />
                  <span className="text-[10px] text-onyx-400 w-8 text-right font-mono">{overlay.fontSize}px</span>
                  <button
                    onClick={resetOverlay}
                    className="ml-2 flex items-center gap-1 text-[10px] text-onyx-500 hover:text-gold-400 transition-colors shrink-0"
                    title="Reset position & rotation"
                  >
                    <RotateCcw size={10} /> Reset
                  </button>
                </div>

                {/* Border radius row — image engraving only */}
                {liveEngraving?.imageUrl && (
                  <div className="flex items-center gap-3">
                    {/* Rounded rect icon */}
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(201,139,10,0.8)" strokeWidth="2.5" className="shrink-0">
                      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    </svg>
                    <span className="text-[10px] text-onyx-500 w-12 shrink-0">Corners</span>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={overlay.borderRadius}
                      onChange={e => setOverlay(prev => ({ ...prev, borderRadius: Number(e.target.value) }))}
                      className="flex-1 accent-amber-500 h-1 cursor-pointer"
                    />
                    <span className="text-[10px] text-onyx-400 w-8 text-right font-mono">
                      {overlay.borderRadius === 50 ? 'circle' : `${overlay.borderRadius}%`}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* ── VIEW TOGGLE — only shown when preview is enabled ── */}
            {previewEnabled && <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setView('engraved')}
                className={`flex items-center justify-center gap-2 py-2.5 text-xs tracking-wide transition-all duration-200
                  ${view === 'engraved' ? 'text-gold-400' : 'text-onyx-500 hover:text-onyx-300'}`}
                style={{
                  border:       `1px solid ${view === 'engraved' ? 'rgba(201,139,10,0.4)' : 'rgba(70,66,59,0.5)'}`,
                  background:   view === 'engraved' ? 'rgba(201,139,10,0.06)' : 'transparent',
                  borderRadius: '6px',
                }}
              >
                <Eye size={13} />
                Engraving Preview
              </button>
              <button
                onClick={() => setView('plain')}
                className={`flex items-center justify-center gap-2 py-2.5 text-xs tracking-wide transition-all duration-200
                  ${view === 'plain' ? 'text-gold-400' : 'text-onyx-500 hover:text-onyx-300'}`}
                style={{
                  border:       `1px solid ${view === 'plain' ? 'rgba(201,139,10,0.4)' : 'rgba(70,66,59,0.5)'}`,
                  background:   view === 'plain' ? 'rgba(201,139,10,0.06)' : 'transparent',
                  borderRadius: '6px',
                }}
                title="View product without engraving"
              >
                <ImageIcon size={13} />
                Plain Product
              </button>
            </div>}

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: Shield, text: 'Quality guaranteed'                    },
                { icon: Clock,  text: `${product.deliveryDays}-day delivery`  },
                { icon: Truck,  text: 'Free above ₹999'                       },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-1.5 p-3 text-center"
                  style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.4)', borderRadius: '8px' }}>
                  <Icon size={14} className="text-gold-500" />
                  <span className="text-[10px] text-onyx-500 leading-tight tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════════
              RIGHT — Product info + Customiser
          ══════════════════════════════════════════ */}
          <div>
            <div className="mb-8">
              <span className="badge-gold mb-3 inline-block">{product.material}</span>
              <h1 className="font-serif text-3xl md:text-4xl text-cream leading-tight">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="text-gold-500 fill-gold-500" />
                  ))}
                </div>
                <span className="text-xs text-cream/70">5.0 (verified buyers)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span style={{ fontFamily: '"Caveat", cursive', fontSize: '2.2rem', color: '#e8a81a', lineHeight: 1 }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-onyx-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-green-400">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </>
                )}
              </div>

              <p className="text-cream/80 text-sm leading-relaxed mt-4" style={{ fontWeight: 300 }}>
                {product.description}
              </p>

              {/* Bulk pricing */}
              {product.bulkPricing.length > 0 && (
                <div className="mt-5">
                  <p className="text-[10px] text-onyx-500 mb-2 tracking-[0.18em] uppercase">Bulk pricing</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.bulkPricing.map(b => (
                      <div key={b.qty} className="px-3 py-2 text-center"
                        style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.5)', borderRadius: '6px' }}>
                        <p className="text-[10px] text-onyx-500">Qty {b.qty}+</p>
                        <p className="text-sm font-medium text-gold-400">₹{b.pricePerUnit}/pc</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Engraving Customiser ── */}
            <div className="pt-8" style={{ borderTop: '1px solid rgba(70,66,59,0.5)' }}>
              <p className="font-serif text-lg text-cream mb-5">
                Personalise Your <span className="text-gold-400 italic">Engraving</span>
              </p>
              <EngravingCustomiser
                product={product}
                onAddToCart={(engraving, qty) => addItem(product, {
                  ...engraving,
                  overlayPosition: overlay
                    ? { x: overlay.x, y: overlay.y, fontSize: overlay.fontSize, rotation: overlay.rotation }
                    : undefined,
                }, qty)}
                onEngravingChange={setLiveEngraving}
              />
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="luxury-divider text-[10px] tracking-luxury uppercase text-gold-600 mb-12">
              You may also love
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  )
}
