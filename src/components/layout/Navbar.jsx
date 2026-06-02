import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, Search, ChevronRight, LogOut, User } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { count, toggleCart }     = useCart()
  const { currentUser, logout }   = useAuth()
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
    { label: 'Walk-In',     href: '/walk-in' },
    { label: 'Our Story',   href: '/about' },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'backdrop-blur-xl border-b' : 'bg-transparent'}`}
        style={scrolled ? {
          background: 'linear-gradient(to bottom, rgba(10,9,8,0.97) 0%, rgba(10,9,8,0.92) 100%)',
          borderColor: 'rgba(201,139,10,0.15)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(201,139,10,0.08) inset',
        } : {}}>

        {/* Top announcement bar */}
        <div className="text-onyx-950 text-center text-[10px] tracking-[0.18em] py-2 font-medium uppercase"
          style={{ background: 'linear-gradient(to right, #a06c06, #e8c460, #c98b0a, #f0d878, #a06c06)', backgroundSize: '200% 100%' }}>
          Free delivery on orders above ₹999 &nbsp;·&nbsp; Pre-ship photo approval on every order
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo — Pinyon Script handwritten style */}
            <Link to="/" className="flex items-center gap-2.5 group leading-none">
              <img
                src="/smlogo.png"
                alt="Saanvi Marks"
                style={{ width: '48px', height: '48px', objectFit: 'contain', flexShrink: 0, borderRadius: '6px', marginTop: '5px' }}
              />
              <div className="flex flex-col items-start">
                <span
                  className="group-hover:text-gold-300 transition-colors duration-300"
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '1.75rem',
                    lineHeight: 1,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #c98b0a 0%, #f0d060 50%, #c98b0a 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.01em',
                  }}
                >
                  Saanvi Marks
                </span>
                <span
                  className="uppercase mt-0.5"
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '9px',
                    letterSpacing: '0.18em',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  Luxury Laser Engraving
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`transition-colors duration-200`}
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '16px',
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                    color: location.pathname === link.href ? '#e8a81a' : '#d0cdc8',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#e8a81a'}
                  onMouseLeave={e => e.currentTarget.style.color = location.pathname === link.href ? '#e8a81a' : '#d0cdc8'}
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

              {currentUser ? (
                <div className="hidden md:flex items-center gap-3">
                  <Link to="/account" className="flex items-center gap-2 text-sm text-onyx-300 hover:text-gold-400 transition-colors">
                    <User size={15} />
                    <span className="max-w-[100px] truncate">
                      {currentUser.displayName?.split(' ')[0] || 'Account'}
                    </span>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-onyx-500 hover:text-red-400 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="hidden md:flex text-sm text-onyx-300 hover:text-gold-400 transition-colors tracking-wide">
                  Sign in
                </Link>
              )}

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
              className="flex items-center justify-between py-5 border-b border-onyx-800 hover:text-gold-400 transition-colors"
              style={{ fontFamily: '"Caveat", cursive', fontSize: '22px', letterSpacing: '0.02em', fontWeight: 500, color: '#faf8f3' }}
            >
              {link.label}
              <ChevronRight size={18} className="text-gold-600" />
            </Link>
          ))}
          {currentUser ? (
            <button onClick={logout} className="mt-8 btn-outline w-full justify-center flex items-center gap-2">
              <LogOut size={15} /> Sign Out
            </button>
          ) : (
            <Link to="/auth" className="mt-8 btn-gold text-center justify-center">
              Sign In
            </Link>
          )}
        </div>
      )}
    </>
  )
}
