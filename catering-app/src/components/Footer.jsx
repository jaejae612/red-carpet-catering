import React from 'react'
import { Phone } from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
)

const MessengerIcon = () => (
  <svg viewBox="0 0 36 36" width="20" height="20" fill="currentColor"><path d="M18 2C9.163 2 2 8.636 2 16.7c0 4.22 1.726 7.98 4.532 10.56v5.34l4.95-2.72c1.4.39 2.88.6 4.418.6 8.837 0 16-6.636 16-14.78C31.9 8.636 26.837 2 18 2zm1.77 19.876l-4.075-4.35-7.95 4.35 8.74-9.28 4.175 4.35 7.85-4.35-8.74 9.28z"/></svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" style={{ '@media print': { display: 'none' } }}>
      <style>{`@media print { footer { display: none !important; } }`}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1">
                <img src="/logo-red.png" alt="Red Carpet" className="h-full w-auto object-contain" />
              </div>
              <div><h3 className="font-bold text-lg">Red Carpet</h3><p className="text-gray-400 text-sm">Food and Catering Services</p></div>
            </div>
            <p className="text-gray-400 text-sm mb-4">Premium catering services for all occasions in Cebu.</p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/ceburedcarpetcatering" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/ceburedcarpet" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-[#E1306C] rounded-full flex items-center justify-center transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://m.me/ceburedcarpetcatering" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-[#0084FF] rounded-full flex items-center justify-center transition-colors" aria-label="Messenger">
                <MessengerIcon />
              </a>
              <a href="mailto:bookings@ceburedcarpetcatering.com" className="w-9 h-9 bg-gray-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors" aria-label="Email">
                <MailIcon />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <a href="tel:09171876510" className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={16} className="text-red-500" />0917-187-6510</a>
              <a href="tel:09266642839" className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={16} className="text-red-500" />0926-664-2839</a>
              <a href="tel:0323834122" className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={16} className="text-red-500" />(032) 383-4122</a>
              <a href="mailto:bookings@ceburedcarpetcatering.com" className="flex items-center gap-2 hover:text-white transition-colors text-sm mt-2">
                <MailIcon />bookings@ceburedcarpetcatering.com
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Hours</h4>
            <div className="text-gray-400 text-sm space-y-1">
              <p>Monday - Sunday</p>
              <p>8:00 AM - 8:00 PM</p>
              <p className="text-gray-500 mt-2">Available for all occasions</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Red Carpet Food and Catering Services</p>
        </div>
      </div>
    </footer>
  )
}
