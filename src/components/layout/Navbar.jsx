import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, ChevronRight } from 'lucide-react'
import { useCart } from '../../context/CartContext'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { count, toggleCart }     = useCart()
  const location                  = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const navLinks = [
    { label: 'Collections', href: '/products' },
    { label: 'Corporate',   href: '/corporate' },
    { label: 'Weddings',    href: '/wedding' },
    { label: 'Our Story',   href: '/about' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-onyx-950/95 backdrop-blur-md border-b border-onyx-800' : 'bg-transparent'}`}>

        {/* Top announcement bar */}
        <div className="bg-gold-500 text-onyx-950 text-center text-[11px] tracking-luxury py-2 font-medium uppercase">
          Free delivery on orders above ₹999 &nbsp;·&nbsp; Pre-ship photo approval on every order
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex flex-col items-start group">
              <span className="font-serif text-xl font-medium tracking-wide text-cream group-hover:text-gold-400 transition-colors">
                Saanvi Marks
              </span>
              <span className="text-[9px] tracking-luxury text-gold-500 uppercase">
                Luxury Laser Engraving
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm tracking-wide transition-colors duration-200
                    ${location.pathname === link.href
                      ? 'text-gold-400'
                      : 'text-onyx-200 hover:text-gold-400'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden md:flex text-onyx-300 hover:text-gold-400 transition-colors" aria-label="Search">
                <Search size={18} />
              </button>

              <button
                onClick={toggleCart}
                className="relative text-onyx-300 hover:text-gold-400 transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold-500 text-onyx-950 text-[10px] font-medium rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              <Link to="/account" className="hidden md:flex text-sm text-onyx-300 hover:text-gold-400 transition-colors tracking-wide">
                Sign in
              </Link>

              <button
                className="md:hidden text-onyx-300 hover:text-gold-400 transition-colors"
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-onyx-950/98 backdrop-blur-md flex flex-col pt-32 px-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center justify-between py-5 border-b border-onyx-800 text-lg font-serif text-cream hover:text-gold-400 transition-colors"
            >
              {link.label}
              <ChevronRight size={18} className="text-gold-600" />
            </Link>
          ))}
          <Link to="/account" className="mt-8 btn-gold text-center justify-center">
            Sign In
          </Link>
        </div>
      )}
    </>
  )
}
