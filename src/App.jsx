import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar      from './components/layout/Navbar'
import Footer      from './components/layout/Footer'
import CartDrawer  from './components/layout/CartDrawer'
import HomePage    from './components/home/HomePage'
import ProductsPage   from './pages/ProductsPage'
import ProductPage    from './pages/ProductPage'
import CheckoutPage   from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'

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
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/products"       element={<ProductsPage />} />
            <Route path="/products/:id"   element={<ProductPage />} />
            <Route path="/checkout"       element={<CheckoutPage />} />
            <Route path="/order-success"  element={<OrderSuccessPage />} />
            <Route path="/corporate"  element={<ComingSoon title="Corporate Gifting" />} />
            <Route path="/wedding"    element={<ComingSoon title="Wedding & Events" />} />
            <Route path="/about"      element={<ComingSoon title="Our Story" />} />
            <Route path="/contact"    element={<ComingSoon title="Contact Us" />} />
            <Route path="*"           element={<ComingSoon title="Page Not Found" />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  )
}
