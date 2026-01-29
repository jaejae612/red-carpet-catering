import React from 'react'
import { Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-white.png" alt="Red Carpet" className="h-12 w-auto" />
              <div><h3 className="font-bold text-lg">Red Carpet</h3><p className="text-gray-400 text-sm">Food and Catering Services</p></div>
            </div>
            <p className="text-gray-400 text-sm">Premium catering services for all occasions.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2"><Phone size={16} className="text-red-500" />0917-187-6510</p>
              <p className="flex items-center gap-2"><Phone size={16} className="text-red-500" />0926-664-2839</p>
              <p className="flex items-center gap-2"><Phone size={16} className="text-red-500" />(032) 383-4122</p>
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