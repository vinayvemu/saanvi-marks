import { useState, useRef, useEffect } from 'react'
import { Upload, Type, Image as ImageIcon, RotateCcw, Check, Smile } from 'lucide-react'
import { fontOptions } from '../../data/products'

const QUICK_EMOJIS = ['❤️','✨','⭐','💫','🌟','🔥','♾️','🙏','👑','💍','🕉️','☮️','🦋','🌸','🎯','💛','🌺','🫶']

// Inject Google Font <link> tags once per font
function useGoogleFonts() {
  useEffect(() => {
    fontOptions.forEach(f => {
      if (!f.google) return
      const id = `gfont-${f.id}`
      if (document.getElementById(id)) return
      const link = document.createElement('link')
      link.id   = id
      link.rel  = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${f.google}&display=swap`
      document.head.appendChild(link)
    })
  }, [])
}

export default function EngravingCustomiser({ product, onAddToCart, onEngravingChange }) {
  const [tab,        setTab]        = useState('text')
  const [engText,    setEngText]    = useState('')
  const [engLine2,   setEngLine2]   = useState('')
  const [font,       setFont]       = useState(fontOptions[0])
  const [imgPreview, setImgPreview] = useState(null)
  const [quantity,   setQuantity]   = useState(1)
  const [added,      setAdded]      = useState(false)
  const [showEmoji,  setShowEmoji]  = useState(false)
  const [emojiTarget, setEmojiTarget] = useState('line1') // which line to insert into
  const fileRef = useRef()
  const line1Ref = useRef()
  const line2Ref = useRef()

  useGoogleFonts()

  const canText  = product.engravingOptions.text
  const canImage = product.engravingOptions.image

  useEffect(() => {
    if (!onEngravingChange) return
    if (tab === 'text') {
      onEngravingChange(engText.trim() ? { type: 'text', text: engText, line2: engLine2, font } : null)
    } else {
      onEngravingChange(imgPreview ? { type: 'image', imageUrl: imgPreview } : null)
    }
  }, [tab, engText, engLine2, font, imgPreview]) // eslint-disable-line

  const insertEmoji = (emoji) => {
    if (emojiTarget === 'line1') {
      const next = (engText + emoji).slice(0, canText.maxChars)
      setEngText(next)
      setTimeout(() => line1Ref.current?.focus(), 0)
    } else {
      const next = (engLine2 + emoji).slice(0, canText.maxChars)
      setEngLine2(next)
      setTimeout(() => line2Ref.current?.focus(), 0)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setImgPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleReset = () => {
    setEngText(''); setEngLine2(''); setImgPreview(null)
    setFont(fontOptions[0]); setQuantity(1); setShowEmoji(false)
    onEngravingChange?.(null)
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
  const previewText = engText.trim() || 'Your Text'

  return (
    <div className="space-y-6">

      {/* ── MODE TABS ─────────────────────────────────── */}
      {canImage && (
        <div className="flex" style={{ border: '1px solid rgba(70,66,59,0.6)' }}>
          {[{ id: 'text', icon: Type, label: 'Text Engraving' }, { id: 'image', icon: ImageIcon, label: 'Image / Logo' }].map(({ id, icon: Icon, label }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm transition-all duration-200
                ${tab === id ? 'text-gold-400 border-b-2 border-gold-500' : 'text-onyx-400 hover:text-cream'}`}
              style={tab === id ? { background: 'rgba(201,139,10,0.07)' } : {}}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
      )}

      {/* ── TEXT TAB ──────────────────────────────────── */}
      {tab === 'text' && canText && (
        <div className="space-y-5">

          {/* Line 1 */}
          <div>
            <label className="block text-xs text-onyx-400 mb-1.5">
              Line 1 <span className="text-gold-600">*</span>
              <span className="float-right text-onyx-600 font-mono">{engText.length}/{canText.maxChars}</span>
            </label>
            <input
              ref={line1Ref}
              type="text"
              value={engText}
              onChange={e => setEngText(e.target.value.slice(0, canText.maxChars))}
              onFocus={() => setEmojiTarget('line1')}
              placeholder="e.g. Rajesh Kumar  ·  Om Namah Shivaya  ·  ❤️"
              className="input-luxury"
              autoComplete="off"
            />
          </div>

          {/* Line 2 */}
          {canText.lines >= 2 && (
            <div>
              <label className="block text-xs text-onyx-400 mb-1.5">
                Line 2 <span className="text-onyx-600">(optional)</span>
              </label>
              <input
                ref={line2Ref}
                type="text"
                value={engLine2}
                onChange={e => setEngLine2(e.target.value.slice(0, canText.maxChars))}
                onFocus={() => setEmojiTarget('line2')}
                placeholder="e.g. Wedding Anniversary 2026  ·  ✨"
                className="input-luxury"
                autoComplete="off"
              />
            </div>
          )}

          {/* Emoji bar */}
          <div>
            <button
              onClick={() => setShowEmoji(v => !v)}
              className="flex items-center gap-1.5 text-xs text-onyx-400 hover:text-gold-400 transition-colors"
            >
              <Smile size={13} />
              {showEmoji ? 'Hide emojis' : 'Add emoji'}
            </button>
            {showEmoji && (
              <div className="mt-2 flex flex-wrap gap-1.5 p-3"
                style={{ background: 'rgba(20,18,15,0.8)', border: '1px solid rgba(70,66,59,0.5)' }}>
                {QUICK_EMOJIS.map(e => (
                  <button
                    key={e}
                    onClick={() => insertEmoji(e)}
                    className="text-lg w-9 h-9 flex items-center justify-center hover:bg-gold-500/10 rounded transition-colors"
                    title={`Insert ${e}`}
                  >
                    {e}
                  </button>
                ))}
                <p className="w-full text-[10px] text-onyx-600 mt-1">
                  Inserting into: <span className="text-gold-600">{emojiTarget === 'line1' ? 'Line 1' : 'Line 2'}</span>
                  {' '}· tap a text field first to switch
                </p>
              </div>
            )}
          </div>

          {/* Font selector */}
          <div>
            <label className="block text-xs text-onyx-400 mb-3">Choose Font Style</label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFont(f)}
                  className="py-3 px-3 text-left transition-all duration-200 space-y-1"
                  style={{
                    border: `1px solid ${font.id === f.id ? 'rgba(201,139,10,0.6)' : 'rgba(70,66,59,0.5)'}`,
                    background: font.id === f.id ? 'rgba(201,139,10,0.07)' : 'rgba(14,12,10,0.4)',
                  }}
                >
                  {/* Font name in its own style */}
                  <p className="text-[11px] text-onyx-500 mb-1" style={{ fontFamily: '"Nunito", sans-serif' }}>
                    {f.label}
                  </p>
                  {/* Live preview in the font */}
                  <p
                    className="truncate leading-tight"
                    style={{
                      ...f.style,
                      fontSize: '15px',
                      color: font.id === f.id ? '#e8a81a' : '#d0cdc8',
                    }}
                  >
                    {previewText}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── IMAGE TAB ─────────────────────────────────── */}
      {tab === 'image' && (
        <div>
          <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/jpeg" className="hidden" onChange={handleImageUpload} />
          <button
            onClick={() => fileRef.current.click()}
            className="w-full py-8 flex flex-col items-center gap-3 transition-all duration-200 group"
            style={{ border: '1px dashed rgba(70,66,59,0.7)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,139,10,0.5)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(70,66,59,0.7)'}
          >
            <Upload size={22} className="text-onyx-500 group-hover:text-gold-400 transition-colors" />
            <div className="text-center">
              <p className="text-sm text-onyx-300 group-hover:text-cream transition-colors">Upload logo or image</p>
              <p className="text-[11px] text-onyx-600 mt-1">PNG, SVG, JPG — max 5MB</p>
            </div>
          </button>
          {imgPreview && (
            <p className="text-xs text-gold-500 mt-2 text-center flex items-center justify-center gap-1.5">
              <Check size={11} /> Image uploaded — preview shown on product
            </p>
          )}
        </div>
      )}

      {/* ── QUANTITY ──────────────────────────────────── */}
      <div>
        <label className="block text-xs text-onyx-400 mb-2">Quantity</label>
        <div className="flex items-center gap-0">
          <button onClick={() => setQuantity(q => Math.max(product.minQty || 1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-onyx-400 hover:text-cream transition-colors text-lg"
            style={{ border: '1px solid rgba(70,66,59,0.6)' }}>−</button>
          <input
            type="number" min={product.minQty || 1} value={quantity}
            onChange={e => setQuantity(Math.max(product.minQty || 1, Number(e.target.value)))}
            className="w-16 h-10 text-center text-cream text-sm focus:outline-none bg-transparent"
            style={{ borderTop: '1px solid rgba(70,66,59,0.6)', borderBottom: '1px solid rgba(70,66,59,0.6)' }}
          />
          <button onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-onyx-400 hover:text-cream transition-colors text-lg"
            style={{ border: '1px solid rgba(70,66,59,0.6)' }}>+</button>

          {product.bulkPricing.length > 0 && (
            <p className="ml-4 text-[11px] text-gold-500 leading-tight">
              {product.bulkPricing.find(b => quantity >= b.qty)
                ? `₹${product.bulkPricing.find(b => quantity >= b.qty).pricePerUnit}/pc bulk rate`
                : `Bulk pricing from qty ${product.bulkPricing[0].qty}`}
            </p>
          )}
        </div>
      </div>

      {/* ── TOTAL + ADD TO CART ───────────────────────── */}
      <div className="pt-5 space-y-4" style={{ borderTop: '1px solid rgba(70,66,59,0.5)' }}>
        <div className="flex justify-between items-baseline">
          <span className="text-onyx-400 text-sm">Total</span>
          <span style={{ fontFamily: '"Caveat", cursive', fontSize: '1.75rem', color: '#e8a81a' }}>
            ₹{(product.price * quantity).toLocaleString('en-IN')}
          </span>
        </div>

        <button
          onClick={handleAdd}
          disabled={!isValid}
          className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-medium tracking-wide
            transition-all duration-300 active:scale-[0.99]
            ${added ? 'bg-green-700 text-white' : isValid ? '' : 'text-onyx-500 cursor-not-allowed'}`}
          style={isValid && !added ? {
            background: 'linear-gradient(105deg, #a06c06 0%, #e8c460 35%, #c98b0a 55%, #f0d878 75%, #a06c06 100%)',
            backgroundSize: '250% 100%',
            color: '#0a0908',
          } : isValid && added ? {} : { background: 'rgba(46,42,37,0.8)' }}
        >
          {added ? <><Check size={15} /> Added to bag</>
            : isValid ? <>Add to Bag — ₹{(product.price * quantity).toLocaleString('en-IN')}</>
            : <>Enter engraving details to continue</>}
        </button>

        <button onClick={handleReset}
          className="w-full flex items-center justify-center gap-2 text-xs text-onyx-500 hover:text-onyx-300 transition-colors py-1">
          <RotateCcw size={11} /> Reset customisation
        </button>
      </div>
    </div>
  )
}
