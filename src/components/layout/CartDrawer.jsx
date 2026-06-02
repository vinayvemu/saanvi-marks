import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Trash2, ShoppingBag, ChevronRight, Minus, Plus } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function CartDrawer() {
  const { items, total, count, isOpen, closeCart, removeItem, updateQty } = useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-onyx-950/70 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-onyx-900 border-l border-onyx-700
        flex flex-col transition-transform duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-onyx-700">
          <div>
            <h2 className="font-serif text-lg text-cream">Your Selection</h2>
            <p className="text-sm text-onyx-200 tracking-wide">{count} {count === 1 ? 'item' : 'items'}</p>
          </div>
          <button onClick={closeCart} className="text-onyx-200 hover:text-cream transition-colors" aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-onyx-400" />
              <div>
                <p className="font-serif text-lg text-cream">Your bag is empty</p>
                <p className="text-base text-onyx-200 mt-1">Begin crafting something beautiful</p>
              </div>
              <button onClick={closeCart} className="btn-gold mt-2">
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.cartId} className="flex gap-4 p-4 bg-onyx-800 border border-onyx-700">

                  {/* Image */}
                  <div className="w-20 h-20 bg-onyx-700 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag size={24} className="text-onyx-400" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-cream text-base truncate">{item.name}</p>
                    <p className="text-sm text-onyx-200 mt-0.5">{item.material}</p>

                    {/* Engraving preview */}
                    {item.engraving?.text && (
                      <div className="mt-2 px-2 py-1 bg-onyx-700 border border-gold-600/20">
                        <p className="text-[10px] text-gold-500 tracking-wide uppercase">Engraving</p>
                        <p className="text-sm text-onyx-100 mt-0.5 truncate">"{item.engraving.text}"</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 border border-onyx-600">
                        <button
                          onClick={() => updateQty(item.cartId, item.quantity - 1)}
                          className="px-2 py-1 text-onyx-200 hover:text-cream transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm text-cream w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.cartId, item.quantity + 1)}
                          className="px-2 py-1 text-onyx-200 hover:text-cream transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <p className="text-base font-medium text-gold-400">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.cartId)}
                    className="text-onyx-400 hover:text-red-400 transition-colors self-start mt-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-onyx-700 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-cream text-base">Subtotal</span>
              <span className="font-serif text-lg text-gold-400">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-sm text-onyx-200 text-center">Shipping & GST calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-gold w-full justify-center text-center"
            >
              Proceed to Checkout
              <ChevronRight size={16} />
            </Link>
            <button onClick={closeCart} className="w-full text-base text-onyx-200 hover:text-gold-400 transition-colors text-center py-1">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
