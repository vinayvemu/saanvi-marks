import { useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Plus, Edit2, Trash2, ToggleLeft, ToggleRight,
  Upload, X, Check, ChevronDown, ChevronUp, Loader,
} from 'lucide-react'
import {
  collection, doc, setDoc, deleteDoc, updateDoc, getDoc,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, isFirebaseReady } from '../../lib/firebase'
import { useProducts } from '../../hooks/useProducts'
import { useAuth } from '../../context/AuthContext'
import { categories, fontOptions, products as staticProducts } from '../../data/products'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

// ── helpers ──────────────────────────────────────────────────────────────────
function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const BLANK_FORM = {
  id:             '',
  name:           '',
  category:       'pens',
  price:          '',
  originalPrice:  '',
  material:       '',
  engravingArea:  '',
  description:    '',
  deliveryDays:   3,
  minQty:         1,
  featured:       false,
  active:         true,
  badge:          '',
  order:          99,
  tags:           '',
  imageUrl:       '',
  previewZone:    { top: '50%', left: '50%', width: '55%', textAlign: 'center', maxFontSize: 14 },
  engravingText:  true,
  engravingImage: false,
  textMaxChars:   30,
  textLines:      2,
  textFonts:      ['Classic Serif', 'Modern Sans'],
  bulkPricing:    [],
}

function toFirestoreDoc(f) {
  return {
    name:          f.name.trim(),
    category:      f.category,
    price:         Number(f.price),
    originalPrice: f.originalPrice ? Number(f.originalPrice) : null,
    material:      f.material.trim(),
    engravingArea: f.engravingArea.trim(),
    description:   f.description.trim(),
    deliveryDays:  Number(f.deliveryDays),
    minQty:        Number(f.minQty),
    featured:      f.featured,
    active:        f.active,
    badge:         f.badge.trim() || null,
    order:         Number(f.order),
    tags:          f.tags.split(',').map(t => t.trim()).filter(Boolean),
    images:        f.imageUrl ? [f.imageUrl] : [],
    plainImages:   [],
    previewZone:   {
      top:         f.previewZone.top,
      left:        f.previewZone.left,
      width:       f.previewZone.width,
      textAlign:   f.previewZone.textAlign,
      maxFontSize: Number(f.previewZone.maxFontSize),
    },
    engravingOptions: {
      text: f.engravingText
        ? { maxChars: Number(f.textMaxChars), lines: Number(f.textLines), fonts: f.textFonts }
        : false,
      image: f.engravingImage,
    },
    bulkPricing: f.bulkPricing.map(b => ({ qty: Number(b.qty), pricePerUnit: Number(b.pricePerUnit) })),
  }
}

function fromFirestoreDoc(id, d) {
  return {
    id,
    name:           d.name   ?? '',
    category:       d.category ?? 'pens',
    price:          d.price  ?? '',
    originalPrice:  d.originalPrice ?? '',
    material:       d.material ?? '',
    engravingArea:  d.engravingArea ?? '',
    description:    d.description ?? '',
    deliveryDays:   d.deliveryDays ?? 3,
    minQty:         d.minQty ?? 1,
    featured:       d.featured ?? false,
    active:         d.active ?? true,
    badge:          d.badge ?? '',
    order:          d.order ?? 99,
    tags:           (d.tags ?? []).join(', '),
    imageUrl:       d.images?.[0] ?? '',
    previewZone:    d.previewZone ?? { top: '50%', left: '50%', width: '55%', textAlign: 'center', maxFontSize: 14 },
    engravingText:  Boolean(d.engravingOptions?.text),
    engravingImage: Boolean(d.engravingOptions?.image),
    textMaxChars:   d.engravingOptions?.text?.maxChars ?? 30,
    textLines:      d.engravingOptions?.text?.lines    ?? 2,
    textFonts:      d.engravingOptions?.text?.fonts    ?? ['Classic Serif'],
    bulkPricing:    d.bulkPricing ?? [],
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Label({ children }) {
  return <label className="block text-[11px] text-onyx-500 mb-1 tracking-wide uppercase">{children}</label>
}

function Input({ ...props }) {
  return (
    <input
      className="w-full bg-transparent border border-onyx-700 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold-500 transition-colors"
      {...props}
    />
  )
}

function Textarea({ ...props }) {
  return (
    <textarea
      rows={3}
      className="w-full bg-transparent border border-onyx-700 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold-500 transition-colors resize-none"
      {...props}
    />
  )
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-sm"
    >
      {checked
        ? <ToggleRight size={20} className="text-gold-400" />
        : <ToggleLeft  size={20} className="text-onyx-600" />}
      <span className={checked ? 'text-gold-300' : 'text-onyx-500'}>{label}</span>
    </button>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AdminProductsPage() {
  const { currentUser }                   = useAuth()
  const { products, loading }             = useProducts({ activeOnly: false })
  const [form, setForm]                   = useState(null)       // null = list view
  const [saving, setSaving]               = useState(false)
  const [saveMsg, setSaveMsg]             = useState('')
  const [uploading, setUploading]         = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [seeding, setSeeding]             = useState(false)
  const [seedMsg, setSeedMsg]             = useState('')
  const fileRef                           = useRef()

  // Guard: admin only
  if (!currentUser) return <Navigate to="/auth" replace />
  if (ADMIN_EMAIL && currentUser.email !== ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center">
        <p className="text-onyx-400">Access denied. Admin only.</p>
      </div>
    )
  }
  if (!isFirebaseReady()) {
    return (
      <div className="min-h-screen bg-onyx-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-cream font-serif text-xl mb-3">Firebase not configured</p>
          <p className="text-onyx-400 text-sm">Add your Firebase env vars to .env.local to use the admin panel.</p>
        </div>
      </div>
    )
  }

  // ── form helpers ────────────────────────────────────────────────────────────
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))
  const setZone = (key, val) => setForm(f => ({ ...f, previewZone: { ...f.previewZone, [key]: val } }))

  const openNew = () => {
    setForm({ ...BLANK_FORM })
    setSaveMsg('')
  }

  const openEdit = (p) => {
    setForm(fromFirestoreDoc(p.id, p))
    setSaveMsg('')
  }

  // ── image upload ────────────────────────────────────────────────────────────
  const handleImageFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const id      = form.id || slugify(form.name) || 'tmp'
      const imgRef  = ref(storage, `products/${id}/image.${file.name.split('.').pop()}`)
      await uploadBytes(imgRef, file)
      const url = await getDownloadURL(imgRef)
      set('imageUrl', url)
    } catch (err) {
      alert('Image upload failed: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  // ── save ────────────────────────────────────────────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price) return alert('Name and price are required.')
    setSaving(true)
    setSaveMsg('')
    try {
      const id  = form.id || slugify(form.name)
      const data = toFirestoreDoc(form)
      await setDoc(doc(db, 'products', id), data)
      setSaveMsg('Saved!')
      setTimeout(() => { setSaveMsg(''); setForm(null) }, 1200)
    } catch (err) {
      setSaveMsg('Error: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  // ── toggle active ───────────────────────────────────────────────────────────
  const toggleActive = async (p) => {
    await updateDoc(doc(db, 'products', p.id), { active: !p.active })
  }

  // ── delete ──────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id))
    setDeleteConfirm(null)
  }

  // ── seed static products to Firestore ──────────────────────────────────────
  const handleSeed = async () => {
    const existingIds = products.map(p => p.id)
    const missing     = staticProducts.filter(p => !existingIds.includes(p.id))
    const existing    = staticProducts.filter(p =>  existingIds.includes(p.id))

    const msg = missing.length > 0
      ? `Will ADD ${missing.length} missing products (${missing.map(p => p.id).join(', ')}).\n\nSkip ${existing.length} already-in-Firestore products to preserve your edits.\n\nContinue?`
      : `All ${staticProducts.length} products already exist in Firestore.\n\nForce overwrite all? (your edits will be lost)`

    if (!window.confirm(msg)) return

    setSeeding(true)
    setSeedMsg('')
    try {
      // If nothing is missing we're in force-overwrite mode
      const toWrite = missing.length > 0 ? missing : staticProducts
      for (const p of toWrite) {
        const { id, ...rest } = p
        await setDoc(doc(db, 'products', id), rest)
      }
      setSeedMsg(`✓ ${toWrite.length} products written to Firestore.`)
    } catch (err) {
      setSeedMsg('Error: ' + err.message)
    } finally {
      setSeeding(false)
    }
  }

  // ── bulk pricing row helpers ─────────────────────────────────────────────────
  const addBulkRow  = () => set('bulkPricing', [...(form.bulkPricing ?? []), { qty: '', pricePerUnit: '' }])
  const removeBulkRow = (i) => set('bulkPricing', form.bulkPricing.filter((_, idx) => idx !== i))
  const setBulkRow  = (i, key, val) => set('bulkPricing', form.bulkPricing.map((r, idx) => idx === i ? { ...r, [key]: val } : r))

  // ─────────────────────────────────────────────────────────────────────────────
  // LIST VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  if (!form) {
    return (
      <div className="min-h-screen bg-onyx-950 pt-28 pb-20 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl text-cream">Products</h1>
              <p className="text-onyx-500 text-sm mt-1">Manage your store catalogue</p>
            </div>
            <button onClick={openNew} className="btn-gold flex items-center gap-2">
              <Plus size={14} /> Add Product
            </button>
          </div>

          {/* Seed banner — shown until Firestore has data */}
          {!loading && products.length === 0 && (
            <div className="mb-8 px-5 py-4 flex items-center justify-between"
              style={{ background: 'rgba(201,139,10,0.06)', border: '1px solid rgba(201,139,10,0.25)' }}>
              <div>
                <p className="text-sm text-cream font-medium">Import your existing products</p>
                <p className="text-[12px] text-onyx-500 mt-0.5">
                  Push all {staticProducts.length} products from products.js into Firestore to make them editable here.
                </p>
              </div>
              <button onClick={handleSeed} disabled={seeding}
                className="flex items-center gap-2 text-sm px-4 py-2 text-gold-400 hover:text-gold-200 transition-colors shrink-0"
                style={{ border: '1px solid rgba(201,139,10,0.4)' }}>
                {seeding ? <Loader size={13} className="animate-spin" /> : <Plus size={13} />}
                {seeding ? 'Seeding…' : 'Seed from products.js'}
              </button>
            </div>
          )}

          {/* Seed button also available when products exist (for re-sync) */}
          {!loading && products.length > 0 && (
            <div className="mb-6 flex items-center gap-3">
              <button onClick={handleSeed} disabled={seeding}
                className="flex items-center gap-1.5 text-[11px] text-onyx-600 hover:text-onyx-400 transition-colors"
                title="Re-sync static products.js data into Firestore">
                {seeding ? <Loader size={10} className="animate-spin" /> : null}
                {seeding ? 'Syncing…' : 'Re-sync from products.js'}
              </button>
              {seedMsg && (
                <span className={`text-[11px] ${seedMsg.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                  {seedMsg}
                </span>
              )}
            </div>
          )}

          {seedMsg && products.length === 0 && (
            <p className={`text-sm mb-4 ${seedMsg.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>{seedMsg}</p>
          )}

          {loading ? (
            <p className="text-onyx-500 text-sm">Loading…</p>
          ) : (
            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="flex items-center gap-4 px-5 py-4"
                  style={{ background: 'rgba(20,18,16,0.8)', border: '1px solid rgba(70,66,59,0.5)' }}>

                  {/* Thumbnail */}
                  <div className="w-12 h-12 flex-shrink-0 overflow-hidden"
                    style={{ background: '#0a0908', border: '1px solid rgba(70,66,59,0.4)' }}>
                    {p.images?.[0]
                      ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-onyx-700 text-lg">✦</div>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-cream text-sm font-medium truncate">{p.name}</p>
                    <p className="text-onyx-500 text-[11px] mt-0.5">
                      {categories.find(c => c.id === p.category)?.label} · ₹{p.price?.toLocaleString('en-IN')} · order #{p.order}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => toggleActive(p)} title={p.active ? 'Click to hide' : 'Click to show'}>
                      {p.active
                        ? <span className="text-[10px] px-2 py-1 text-green-400" style={{ border: '1px solid rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.06)' }}>Live</span>
                        : <span className="text-[10px] px-2 py-1 text-onyx-500" style={{ border: '1px solid rgba(70,66,59,0.5)' }}>Hidden</span>
                      }
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(p)}
                      className="w-8 h-8 flex items-center justify-center text-onyx-400 hover:text-gold-400 transition-colors"
                      title="Edit">
                      <Edit2 size={13} />
                    </button>
                    {deleteConfirm === p.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(p.id)}
                          className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-300"
                          title="Confirm delete">
                          <Check size={13} />
                        </button>
                        <button onClick={() => setDeleteConfirm(null)}
                          className="w-8 h-8 flex items-center justify-center text-onyx-500 hover:text-onyx-300">
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(p.id)}
                        className="w-8 h-8 flex items-center justify-center text-onyx-400 hover:text-red-400 transition-colors"
                        title="Delete">
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {products.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-onyx-500 text-sm">No products yet. Add your first one.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // FORM VIEW
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-onyx-950 pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl text-cream">
              {form.id ? 'Edit Product' : 'Add Product'}
            </h1>
            {form.id && <p className="text-onyx-600 text-xs mt-1 font-mono">/{form.id}</p>}
          </div>
          <button onClick={() => setForm(null)} className="text-onyx-500 hover:text-onyx-300 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-8">

          {/* ── BASICS ── */}
          <Section title="Basics">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Product Name *</Label>
                <Input value={form.name} onChange={e => {
                  set('name', e.target.value)
                  if (!form.id) set('id', slugify(e.target.value))
                }} placeholder="e.g. Prestige Metal Pen" required />
              </div>

              <div>
                <Label>URL ID / Slug *</Label>
                <Input value={form.id} onChange={e => set('id', e.target.value)}
                  placeholder="e.g. prestige-metal-pen" required />
                <p className="text-[10px] text-onyx-600 mt-1">Used in the product URL. Auto-filled from name.</p>
              </div>

              <div>
                <Label>Category</Label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full bg-onyx-950 border border-onyx-700 text-cream text-sm px-3 py-2 focus:outline-none focus:border-gold-500">
                  {categories.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Price (₹) *</Label>
                <Input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="349" required />
              </div>

              <div>
                <Label>Original / Strike-through Price (₹)</Label>
                <Input type="number" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} placeholder="499" />
              </div>

              <div>
                <Label>Material</Label>
                <Input value={form.material} onChange={e => set('material', e.target.value)} placeholder="Stainless Steel" />
              </div>

              <div>
                <Label>Engraving Area</Label>
                <Input value={form.engravingArea} onChange={e => set('engravingArea', e.target.value)} placeholder="60mm × 8mm" />
              </div>

              <div className="col-span-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Product description…" />
              </div>

              <div>
                <Label>Delivery Days</Label>
                <Input type="number" value={form.deliveryDays} onChange={e => set('deliveryDays', e.target.value)} />
              </div>

              <div>
                <Label>Minimum Quantity</Label>
                <Input type="number" value={form.minQty} onChange={e => set('minQty', e.target.value)} />
              </div>

              <div>
                <Label>Badge Label</Label>
                <Input value={form.badge} onChange={e => set('badge', e.target.value)} placeholder="Bestseller, New, etc." />
              </div>

              <div>
                <Label>Sort Order</Label>
                <Input type="number" value={form.order} onChange={e => set('order', e.target.value)} />
              </div>

              <div className="col-span-2">
                <Label>Tags (comma-separated)</Label>
                <Input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="corporate, gifting, bestseller" />
              </div>

              <div className="flex items-center gap-6">
                <Toggle checked={form.featured} onChange={v => set('featured', v)} label="Featured" />
                <Toggle checked={form.active}   onChange={v => set('active', v)}   label="Live / Active" />
              </div>
            </div>
          </Section>

          {/* ── IMAGE ── */}
          <Section title="Product Image">
            <div className="space-y-3">
              <Label>Image URL (or upload below)</Label>
              <Input value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} placeholder="https://… or /filename.jpg" />

              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
              <button type="button" onClick={() => fileRef.current.click()}
                className="flex items-center gap-2 text-sm text-onyx-400 hover:text-gold-400 transition-colors py-2 px-4"
                style={{ border: '1px dashed rgba(70,66,59,0.7)' }}>
                {uploading ? <Loader size={13} className="animate-spin" /> : <Upload size={13} />}
                {uploading ? 'Uploading…' : 'Upload to Firebase Storage'}
              </button>

              {form.imageUrl && (
                <div className="w-24 h-24 overflow-hidden" style={{ border: '1px solid rgba(70,66,59,0.5)' }}>
                  <img src={form.imageUrl} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </Section>

          {/* ── ENGRAVING OPTIONS ── */}
          <Section title="Engraving Options">
            <div className="space-y-4">
              <Toggle checked={form.engravingText}  onChange={v => set('engravingText', v)}  label="Text engraving" />
              <Toggle checked={form.engravingImage} onChange={v => set('engravingImage', v)} label="Image / logo engraving" />

              {form.engravingText && (
                <div className="pl-4 space-y-3 pt-2" style={{ borderLeft: '2px solid rgba(201,139,10,0.2)' }}>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Max characters</Label>
                      <Input type="number" value={form.textMaxChars} onChange={e => set('textMaxChars', e.target.value)} />
                    </div>
                    <div>
                      <Label>Lines</Label>
                      <Input type="number" min={1} max={5} value={form.textLines} onChange={e => set('textLines', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <Label>Available Fonts</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {fontOptions.map(f => {
                        const selected = form.textFonts.includes(f.label)
                        return (
                          <button key={f.id} type="button"
                            onClick={() => set('textFonts', selected
                              ? form.textFonts.filter(x => x !== f.label)
                              : [...form.textFonts, f.label])}
                            className="text-xs px-3 py-1.5 transition-all"
                            style={{
                              border: `1px solid ${selected ? 'rgba(201,139,10,0.5)' : 'rgba(70,66,59,0.5)'}`,
                              background: selected ? 'rgba(201,139,10,0.08)' : 'transparent',
                              color: selected ? '#c98b0a' : 'rgba(120,116,110,1)',
                              ...f.style,
                            }}>
                            {f.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* ── PREVIEW ZONE ── */}
          <Section title="Live Preview Zone" hint="Where engraving overlay appears on the product image">
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'top',        label: 'Top (%)',       placeholder: '50%' },
                { key: 'left',       label: 'Left (%)',      placeholder: '50%' },
                { key: 'width',      label: 'Width (%)',     placeholder: '55%' },
                { key: 'maxFontSize',label: 'Max Font (px)', placeholder: '14'  },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input value={form.previewZone[key]} onChange={e => setZone(key, e.target.value)} placeholder={placeholder} />
                </div>
              ))}
              <div className="col-span-2">
                <Label>Text Align</Label>
                <div className="flex gap-2">
                  {['left','center','right'].map(a => (
                    <button key={a} type="button"
                      onClick={() => setZone('textAlign', a)}
                      className="flex-1 py-2 text-xs transition-all"
                      style={{
                        border: `1px solid ${form.previewZone.textAlign === a ? 'rgba(201,139,10,0.5)' : 'rgba(70,66,59,0.5)'}`,
                        background: form.previewZone.textAlign === a ? 'rgba(201,139,10,0.08)' : 'transparent',
                        color: form.previewZone.textAlign === a ? '#c98b0a' : 'rgba(120,116,110,1)',
                      }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Section>

          {/* ── BULK PRICING ── */}
          <Section title="Bulk Pricing">
            <div className="space-y-2">
              {(form.bulkPricing ?? []).map((row, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <Input type="number" value={row.qty} onChange={e => setBulkRow(i, 'qty', e.target.value)} placeholder="Min qty" />
                  </div>
                  <div className="flex-1">
                    <Input type="number" value={row.pricePerUnit} onChange={e => setBulkRow(i, 'pricePerUnit', e.target.value)} placeholder="Price/pc (₹)" />
                  </div>
                  <button type="button" onClick={() => removeBulkRow(i)} className="text-onyx-500 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addBulkRow}
                className="flex items-center gap-1.5 text-xs text-onyx-500 hover:text-gold-400 transition-colors mt-2">
                <Plus size={12} /> Add tier
              </button>
            </div>
          </Section>

          {/* ── SUBMIT ── */}
          <div className="flex items-center gap-4 pt-4">
            <button type="submit" disabled={saving}
              className="btn-gold flex items-center gap-2">
              {saving ? <Loader size={14} className="animate-spin" /> : <Check size={14} />}
              {saving ? 'Saving…' : 'Save Product'}
            </button>
            <button type="button" onClick={() => setForm(null)}
              className="text-sm text-onyx-500 hover:text-onyx-300 transition-colors">
              Cancel
            </button>
            {saveMsg && (
              <span className={`text-sm ${saveMsg.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                {saveMsg}
              </span>
            )}
          </div>

        </form>
      </div>
    </div>
  )
}

function Section({ title, hint, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ border: '1px solid rgba(70,66,59,0.5)' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left"
        style={{ background: 'rgba(20,18,16,0.8)' }}>
        <div>
          <span className="text-sm font-medium text-cream tracking-wide">{title}</span>
          {hint && <span className="text-[11px] text-onyx-600 ml-3">{hint}</span>}
        </div>
        {open ? <ChevronUp size={14} className="text-onyx-500" /> : <ChevronDown size={14} className="text-onyx-500" />}
      </button>
      {open && (
        <div className="px-5 py-5" style={{ background: 'rgba(14,12,10,0.6)' }}>
          {children}
        </div>
      )}
    </div>
  )
}
