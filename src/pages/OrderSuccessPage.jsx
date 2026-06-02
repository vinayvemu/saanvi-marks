import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const orderId  = params.get('orderId')

  return (
    <main className="min-h-screen bg-onyx-950 pt-28 pb-20 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-gold-400" />
        </div>

        <span className="badge-gold mb-4 inline-block">Order Confirmed</span>
        <h1 className="font-serif text-4xl text-cream mb-3">
          Thank you for your <span className="text-gold-400 italic">order</span>
        </h1>
        <p className="text-onyx-400 mb-2">
          Your order has been received and is being reviewed by our studio.
        </p>
        {orderId && (
          <p className="text-xs text-onyx-500 mb-8">
            Order reference: <span className="text-gold-500 font-mono">{orderId}</span>
          </p>
        )}

        {/* Next steps */}
        <div className="bg-onyx-900 border border-onyx-700 p-6 text-left space-y-4 mb-8">
          <h2 className="font-serif text-base text-cream">What happens next</h2>
          {[
            { step: '1', text: 'Our team will call / WhatsApp you within 2 hours to confirm your order and collect payment.' },
            { step: '2', text: 'We will begin engraving and send you a photo of your item before dispatch.' },
            { step: '3', text: 'Your order will be shipped and delivered within the promised timeline.' },
          ].map(s => (
            <div key={s.step} className="flex gap-3">
              <span className="w-5 h-5 flex-shrink-0 bg-gold-500/10 border border-gold-600/30 text-gold-500 text-xs flex items-center justify-center">
                {s.step}
              </span>
              <p className="text-sm text-onyx-300 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/918686183497?text=${encodeURIComponent("Hi! I just placed an order on Saanvi Marks and have a question about it.")}`}
            target="_blank" rel="noreferrer"
            className="btn-gold"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <Link to="/products" className="btn-outline">
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  )
}
