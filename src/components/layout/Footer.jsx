import { Link } from 'react-router-dom'
import { Share2, MessageCircle, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-onyx-900 border-t border-onyx-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <p className="font-serif text-xl text-cream">Saanvi Marks</p>
              <p className="text-[10px] tracking-luxury text-gold-500 uppercase mt-0.5">Luxury Laser Engraving</p>
            </div>
            <p className="text-sm text-onyx-400 leading-relaxed">
              Precision laser engraving studio based in Tirupati, Andhra Pradesh. Crafting memories, one mark at a time.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Share2,      href: '#', label: 'Instagram' },
                { icon: MessageCircle,  href: 'https://wa.me/91XXXXXXXXXX', label: 'WhatsApp' },
                { icon: Mail,           href: 'mailto:hello@saanvimarks.in', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-8 h-8 border border-onyx-700 flex items-center justify-center text-onyx-400 hover:text-gold-400 hover:border-gold-600 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Shop',
              links: [
                { label: 'All Products',  href: '/products' },
                { label: 'Pens',          href: '/products?category=pens' },
                { label: 'Keychains',     href: '/products?category=keychains' },
                { label: 'Bottles',       href: '/products?category=bottles' },
                { label: 'Devotional',    href: '/products?category=devotional' },
              ]
            },
            {
              title: 'Services',
              links: [
                { label: 'Corporate Gifting', href: '/corporate' },
                { label: 'Wedding Orders',    href: '/wedding' },
                { label: 'Bulk Orders',       href: '/corporate#bulk' },
                { label: 'Custom Enquiry',    href: '/contact' },
              ]
            },
            {
              title: 'Company',
              links: [
                { label: 'Our Story',      href: '/about' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy',  href: '/refund' },
                { label: 'Shipping Info',  href: '/shipping' },
                { label: 'Contact Us',     href: '/contact' },
              ]
            }
          ].map(col => (
            <div key={col.title}>
              <h3 className="text-xs tracking-luxury uppercase text-onyx-400 mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-onyx-400 hover:text-gold-400 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Location + bottom bar */}
        <div className="border-t border-onyx-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-onyx-500">
            <MapPin size={12} className="text-gold-600" />
            Tirupati, Andhra Pradesh, India — 517501
          </div>
          <p className="text-xs text-onyx-600">
            © {new Date().getFullYear()} Saanvi Marks. All rights reserved.
          </p>
          <p className="text-xs text-onyx-600">
            GST & Udyam registered · Made with ♥ in Tirupati
          </p>
        </div>
      </div>
    </footer>
  )
}
