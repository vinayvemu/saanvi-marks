import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
  const { currentUser, login, loginWithGoogle, signup, error, clearError } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || '/'

  const [mode,     setMode]     = useState('login') // 'login' | 'signup'
  const [loading,  setLoading]  = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form,     setForm]     = useState({ name: '', email: '', password: '' })
  const [fieldErr, setFieldErr] = useState({})

  // Redirect if already signed in
  useEffect(() => {
    if (currentUser) navigate(from, { replace: true })
  }, [currentUser, from, navigate])

  // Clear auth-level errors when switching modes
  useEffect(() => {
    clearError()
    setFieldErr({})
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (fieldErr[key]) setFieldErr(e => ({ ...e, [key]: null }))
  }

  const validateForm = () => {
    const e = {}
    if (mode === 'signup' && !form.name.trim())      e.name     = 'Name is required'
    if (!form.email.includes('@'))                    e.email    = 'Valid email required'
    if (form.password.length < 6)                     e.password = 'At least 6 characters'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validateForm()
    if (Object.keys(errs).length) { setFieldErr(errs); return }

    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await signup(form.email, form.password, form.name.trim())
      }
      // Navigation handled by the useEffect above
    } catch {
      // error state is set in AuthContext
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setLoading(true)
    try {
      await loginWithGoogle()
    } catch {
      // error state is set in AuthContext
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-onyx-950 flex items-center justify-center px-6 pt-24 pb-16">

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/[0.03] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex flex-col items-center group mb-8">
            <span className="font-serif text-2xl text-cream group-hover:text-gold-400 transition-colors">
              Saanvi Marks
            </span>
            <span className="text-[9px] tracking-luxury text-gold-500 uppercase mt-0.5">
              Luxury Laser Engraving
            </span>
          </Link>

          <div className="luxury-divider text-[10px] tracking-luxury uppercase text-gold-600 mb-8">
            <Sparkles size={12} />
          </div>

          <span className="badge-gold mb-4 inline-block">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </span>
          <h1 className="font-serif text-3xl text-cream leading-tight">
            {mode === 'login' ? (
              <>Sign in to your <span className="text-gold-400 italic">account</span></>
            ) : (
              <>Join <span className="text-gold-400 italic">Saanvi Marks</span></>
            )}
          </h1>
          <p className="text-onyx-400 text-sm mt-2">
            {mode === 'login'
              ? 'Track orders, manage your profile, and reorder with ease.'
              : 'Save your engravings, track orders, and get exclusive offers.'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-onyx-900 border border-onyx-700 p-8">

          {/* Global auth error */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Google sign-in */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-onyx-600
                       text-onyx-200 text-sm hover:border-onyx-400 hover:text-cream
                       active:scale-[0.99] transition-all duration-150 mb-6 disabled:opacity-50"
          >
            {/* Google "G" SVG — no external dependency needed */}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="luxury-divider text-[10px] tracking-luxury uppercase text-onyx-500 mb-6">
            or
          </div>

          {/* Email / password form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-xs text-onyx-400 mb-1.5">
                  Full Name <span className="text-gold-600">*</span>
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-onyx-500 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Priya Reddy"
                    autoComplete="name"
                    className={`input-luxury pl-9 ${fieldErr.name ? 'border-red-500' : ''}`}
                  />
                </div>
                {fieldErr.name && <p className="text-xs text-red-400 mt-1">{fieldErr.name}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs text-onyx-400 mb-1.5">
                Email Address <span className="text-gold-600">*</span>
              </label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-onyx-500 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="priya@example.com"
                  autoComplete="email"
                  className={`input-luxury pl-9 ${fieldErr.email ? 'border-red-500' : ''}`}
                />
              </div>
              {fieldErr.email && <p className="text-xs text-red-400 mt-1">{fieldErr.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="text-xs text-onyx-400">
                  Password <span className="text-gold-600">*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="text-[11px] text-gold-600 hover:text-gold-400 transition-colors"
                    onClick={() => {/* TODO: forgot password flow */}}
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-onyx-500 pointer-events-none" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder={mode === 'signup' ? 'Minimum 6 characters' : '••••••••'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className={`input-luxury pl-9 pr-10 ${fieldErr.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-onyx-500 hover:text-onyx-300 transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {fieldErr.password && <p className="text-xs text-red-400 mt-1">{fieldErr.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-onyx-800/40 border-t-onyx-950 rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Mode toggle */}
        <p className="text-center text-sm text-onyx-400 mt-6">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          {' '}
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-gold-400 hover:text-gold-300 transition-colors font-medium"
          >
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>

        <p className="text-center text-[11px] text-onyx-600 mt-4 leading-relaxed">
          By continuing you agree to our{' '}
          <span className="text-onyx-500">Terms of Service</span> and{' '}
          <span className="text-onyx-500">Privacy Policy</span>.
        </p>
      </div>
    </main>
  )
}
