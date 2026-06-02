import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider }    from './context/AuthContext'
import { CartProvider }    from './context/CartContext'
import Navbar              from './components/layout/Navbar'
import Footer              from './components/layout/Footer'
import CartDrawer          from './components/layout/CartDrawer'
import ProtectedRoute      from './components/layout/ProtectedRoute'
import HomePage            from './components/home/HomePage'
import ProductsPage        from './pages/ProductsPage'
import ProductPage         from './pages/ProductPage'
import CheckoutPage        from './pages/CheckoutPage'
import OrderSuccessPage    from './pages/OrderSuccessPage'
import AuthPage            from './pages/AuthPage'
import AccountPage         from './pages/AccountPage'
import AdminProductsPage   from './pages/admin/AdminProductsPage'
import CorporatePage       from './pages/CorporatePage'
import WeddingPage         from './pages/WeddingPage'
import WalkInPage          from './pages/WalkInPage'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <CartDrawer />
      {children}
      <Footer />
    </>
  )
}

function ComingSoon({ title }) {
  return (
    <main className="min-h-screen bg-onyx-950 pt-28 flex items-center justify-center px-6">
      <div className="text-center">
        <span className="badge-gold mb-4 inline-block">Coming Soon</span>
        <h1 className="font-serif text-4xl text-cream">{title}</h1>
        <p className="text-onyx-400 mt-3">This page is being crafted with the same precision as our engravings.</p>
        <a href="/" className="btn-gold mt-8 inline-flex">Return Home</a>
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/"              element={<HomePage />} />
              <Route path="/products"      element={<ProductsPage />} />
              <Route path="/products/:id"  element={<ProductPage />} />
              <Route path="/auth"          element={<AuthPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/checkout" element={
                <ProtectedRoute><CheckoutPage /></ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute><AccountPage /></ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute><AdminProductsPage /></ProtectedRoute>
              } />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/wedding"   element={<WeddingPage />} />
              <Route path="/walk-in"   element={<WalkInPage />} />
              <Route path="/about"     element={<ComingSoon title="Our Story" />} />
              <Route path="/contact"   element={<ComingSoon title="Contact Us" />} />
              <Route path="*"          element={<ComingSoon title="Page Not Found" />} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
