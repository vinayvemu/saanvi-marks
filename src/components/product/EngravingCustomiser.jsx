import { useState, useRef } from 'react'
import { Upload, Type, Image as ImageIcon, RotateCcw, Check } from 'lucide-react'
import { fontOptions } from '../../data/products'

export default function EngravingCustomiser({ product, onAddToCart }) {
  const [tab,        setTab]        = useState('text')   // 'text' | 'image'
  const [engText,    setEngText]    = useState('')
  const [engLine2,   setEngLine2]   = useState('')
  const [font,       setFont]       = useState(fontOptions[0])
  const [imgPreview, setImgPreview] = useState(null)
  const [quantity,   setQuantity]   = useState(1)
  const [added,      setAdded]      = useState(false)
  const fileRef                     = useRef()

  const canText  = product.engravingOptions.text
  const canImage = product.engravingOptions.image

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImgPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setEngText(''); setEngLine2(''); setImgPreview(null)
    setFont(fontOptions[0]); setQuantity(1)
  }

  const handleAdd = () => {
    const engraving = tab === 'text'
      ? { type: 'text', text: engText, line2: engLine2, font: font.id }
      : { type: 'image', imageUrl: imgPreview }

    onAddToCart(engraving, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const isValid = tab === 'text' ? engText.trim().length > 0 : !!imgPreview

  return (
    <div className="space-y-6">

      {/* ── LIVE PREVIEW ─────────────────────────── */}
      <div>
        <p className="text-[10px] tracking-luxury text-onyx-400 uppercase mb-3">Live Preview</p>
        <div className="bg-onyx-800 border border-onyx-700 aspect-video flex flex-col items-center justify-center relative overflow-hidden">

          {/* Decorative corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-600/40" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-600/40" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-600/40" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-600/40" />

          {/* Engraving area indicator */}
          <div className="border border-dashed border-gold-600/30 px-10 py-6 flex flex-col items-center gap-2 min-w-[240px]">
            {tab === 'text' ? (
              engText ? (
                <>
                  <p style={{ ...font.style, color: '#e8a81a', fontSize: '20px' }} className="text-center leading-tight">
                    {engText}
                  </p>
                  {engLine2 && (
                    <p style={{ ...font.style, color: '#c98b0a', fontSize: '14px' }} className="text-center">
                      {engLine2}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-onyx-600 text-sm italic text-center">Your engraving will appear here</p>
              )
            ) : (
              imgPreview ? (
                <img src={imgPreview} alt="Upload preview" className="max-h-24 max-w-full object-contain opacity-80" style={{ filter: 'sepia(1) saturate(0.3) brightness(0.9)' }} />
              ) : (
                <p className="text-onyx-600 text-sm italic text-center">Upload your image or logo</p>
              )
            )}
          </div>

          <p className="absolute bottom-2 text-[10px] text-onyx-600 tracking-wide">
            Engraving area: {product.engravingArea}
          </p>
        </div>
      </div>

      {/* ── TABS ─────────────────────────────────── */}
      {canImage && (
        <div className="flex border border-onyx-700">
          <button
            onClick={() => setTab('text')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm transition-colors
              ${tab === 'text' ? 'bg-gold-500/10 text-gold-400 border-b-2 border-gold-500' : 'text-onyx-400 hover:text-cream'}`}
          >
            <Type size={14} /> Text
          </button>
          <button
            onClick={() => setTab('image')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm transition-colors
              ${tab === 'image' ? 'bg-gold-500/10 text-gold-400 border-b-2 border-gold-500' : 'text-onyx-400 hover:text-cream'}`}
          >
            <ImageIcon size={14} /> Image / Logo
          </button>
        </div>
      )}

      {/* ── TEXT INPUTS ──────────────────────────── */}
      {tab === 'text' && canText && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-onyx-400 mb-1.5">
              Line 1 <span className="text-gold-600">*</span>
              <span className="float-right text-onyx-600">{engText.length}/{canText.maxChars}</span>
            </label>
            <input
              type="text"
              value={engText}
              onChange={e => setEngText(e.target.value.slice(0, canText.maxChars))}
              placeholder="e.g. Rajesh Kumar  ·  Om Namah Shivaya"
              className="input-luxury"
            />
          </div>

          {canText.lines >= 2 && (
            <div>
              <label className="block text-xs text-onyx-400 mb-1.5">
                Line 2 <span className="text-onyx-600">(optional)</span>
              </label>
              <input
                type="text"
                value={engLine2}
                onChange={e => setEngLine2(e.target.value.slice(0, canText.maxChars))}
                placeholder="e.g. Wedding Anniversary 2026"
                className="input-luxury"
              />
            </div>
          )}

          {/* Font selector */}
          <div>
            <label className="block text-xs text-onyx-400 mb-2">Engraving Font</label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions
                .filter(f => canText.fonts.includes(f.label) || canText.fonts.includes(f.id))
                .map(f => (
                  <button
                    key={f.id}
                    onClick={() => setFont(f)}
                    className={`py-2.5 px-3 border text-sm transition-all duration-150 text-left
                      ${font.id === f.id
                        ? 'border-gold-500 bg-gold-500/10 text-gold-400'
                        : 'border-onyx-700 text-onyx-300 hover:border-onyx-500'}`}
                    style={f.style}
                  >
                    {f.label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ── IMAGE UPLOAD ─────────────────────────── */}
      {tab === 'image' && (
        <div>
          <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" onChange={handleImageUpload} />
          <button
            onClick={() => fileRef.current.click()}
            className="w-full border border-dashed border-onyx-600 hover:border-gold-500 py-8 flex flex-col items-center gap-3 transition-colors group"
          >
            <Upload size={24} className="text-onyx-500 group-hover:text-gold-400 transition-colors" />
            <div className="text-center">
              <p className="text-sm text-onyx-300 group-hover:text-cream transition-colors">Upload logo or image</p>
              <p className="text-xs text-onyx-600 mt-1">PNG, SVG, JPG — max 5MB</p>
            </div>
          </button>
          {imgPreview && (
            <p className="text-xs text-gold-500 mt-2 text-center">
              <Check size={12} className="inline mr-1" />
              Image uploaded — preview shown above
            </p>
          )}
        </div>
      )}

      {/* ── QUANTITY ─────────────────────────────── */}
      <div>
        <label className="block text-xs text-onyx-400 mb-2">Quantity</label>
        <div className="flex items-center gap-0">
          <button
            onClick={() => setQuantity(q => Math.max(product.minQty || 1, q - 1))}
            className="w-10 h-10 border border-onyx-700 text-onyx-400 hover:text-cream hover:border-onyx-500 flex items-center justify-center transition-colors text-lg"
          >−</button>
          <input
            type="number"
            min={product.minQty || 1}
            value={quantity}
            onChange={e => setQuantity(Math.max(product.minQty || 1, Number(e.target.value)))}
            className="w-16 h-10 bg-onyx-800 border-y border-onyx-700 text-center text-cream text-sm focus:outline-none"
          />
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 border border-onyx-700 text-onyx-400 hover:text-cream hover:border-onyx-500 flex items-center justify-center transition-colors text-lg"
          >+</button>

          {product.bulkPricing.length > 0 && (
            <p className="ml-4 text-xs text-gold-500">
              {product.bulkPricing.find(b => quantity >= b.qty)
                ? `₹${product.bulkPricing.find(b => quantity >= b.qty).pricePerUnit}/pc bulk rate`
                : `Bulk pricing from qty ${product.bulkPricing[0].qty}`}
            </p>
          )}
        </div>
      </div>

      {/* ── TOTAL + ADD TO CART ───────────────────── */}
      <div className="border-t border-onyx-700 pt-5 space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-onyx-400 text-sm">Total</span>
          <span className="font-serif text-2xl text-gold-400">
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-medium tracking-wide transition-all duration-200
            ${isValid
              ? added
                ? 'bg-green-600 text-white'
                : 'bg-gold-500 text-onyx-950 hover:bg-gold-400 active:scale-[0.98]'
              : 'bg-onyx-700 text-onyx-500 cursor-not-allowed'}`}
        >
          {added ? (
            <><Check size={16} /> Added to bag</>
          ) : isValid ? (
            <>Add to Bag — ₹{(product.price * quantity).toLocaleString('en-IN')}</>
          ) : (
            <>Enter engraving details to continue</>
          )}
        </button>

        <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 text-xs text-onyx-500 hover:text-onyx-300 transition-colors py-1">
          <RotateCcw size={12} /> Reset customisation
        </button>
      </div>
    </div>
  )
}
