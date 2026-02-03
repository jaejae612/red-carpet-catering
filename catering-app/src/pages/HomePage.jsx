import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ChevronRight, Phone, Users, Utensils, Calendar, ShoppingBag, Truck } from 'lucide-react'
import { menuPackages } from '../lib/menuData'
import SEO, { StructuredData } from '../components/SEO'

export default function HomePage() {
  const { user } = useAuth()

  const businessData = {
    '@type': 'CateringBusiness',
    name: 'Red Carpet Food and Catering Services',
    description: 'Premium catering services in Cebu for weddings, birthdays, corporate events, and all special occasions. Filipino, Asian, and International cuisines.',
    url: 'https://ceburedcarpetcatering.com',
    logo: 'https://ceburedcarpetcatering.com/logo-red.png',
    image: 'https://ceburedcarpetcatering.com/og-image.jpg',
    telephone: ['+639171876510', '+639266642839', '+63323834122'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Cebu City',
      addressRegion: 'Cebu',
      addressCountry: 'PH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.3157,
      longitude: 123.8854
    },
    areaServed: {
      '@type': 'City',
      name: 'Cebu'
    },
    openingHours: 'Mo-Su 08:00-20:00',
    priceRange: '₱₱',
    servesCuisine: ['Filipino', 'Asian', 'International'],
    hasMenu: {
      '@type': 'Menu',
      url: 'https://ceburedcarpetcatering.com/menu'
    }
  }

  return (
    <div>
      <SEO 
        description="Premium catering services in Cebu for weddings, birthdays, corporate events, and all occasions. Book online or order food for delivery."
        path="/"
      />
      <StructuredData data={businessData} />
      <section className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl p-2">
            <img src="/logo-red.png" alt="Red Carpet" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Red Carpet Catering</h1>
          <p className="text-xl text-red-200 mb-8 max-w-2xl mx-auto">Premium food and catering services for all your special occasions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            {user ? <Link to="/book" className="bg-white text-red-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 shadow-lg flex items-center justify-center gap-2"><Calendar size={20} /> Book Catering</Link> : <Link to="/signup" className="bg-white text-red-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-50 shadow-lg">Get Started</Link>}
            <Link to="/menu" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10">View Menu</Link>
          </div>
          <Link to="/food-menu" className="inline-flex items-center gap-2 bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 shadow-lg">
            <ShoppingBag size={20} /> Order Food for Delivery
          </Link>
        </div>
      </section>

      {/* Food Order CTA */}
      <section className="py-12 px-4 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Truck className="text-orange-500" size={32} />
            </div>
            <div className="text-white">
              <h3 className="text-2xl font-bold">Food Delivery Available!</h3>
              <p className="text-orange-100">Order trays, home meals, desserts & more</p>
            </div>
          </div>
          <Link to="/food-menu" className="bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold hover:bg-orange-50 flex items-center gap-2 shadow-lg">
            Order Now <ChevronRight size={20} />
          </Link>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Utensils className="text-red-700" size={32} /></div><h3 className="font-semibold text-xl mb-2">Delicious Food</h3><p className="text-gray-600">Wide variety of Filipino, Asian, and International cuisines</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Users className="text-red-700" size={32} /></div><h3 className="font-semibold text-xl mb-2">Professional Staff</h3><p className="text-gray-600">Trained and courteous wait staff for excellent service</p></div>
            <div className="text-center p-6"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Calendar className="text-red-700" size={32} /></div><h3 className="font-semibold text-xl mb-2">Complete Packages</h3><p className="text-gray-600">Tables, chairs, linens, and centerpieces included</p></div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Menu Packages</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(menuPackages).slice(0, 3).map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl">
                <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-6"><h3 className="font-bold text-xl">{pkg.name}</h3><p className="text-red-200">Starting at</p><p className="text-3xl font-bold">₱{pkg.pricePerHead}<span className="text-lg font-normal">/head</span></p></div>
                <div className="p-6"><p className="text-gray-600 mb-4">{pkg.options.length} menu options</p><Link to="/menu" className="text-red-700 font-medium flex items-center gap-1 hover:gap-2">View Details <ChevronRight size={18} /></Link></div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8"><Link to="/menu" className="inline-flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-800">View All Packages <ChevronRight size={20} /></Link></div>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            {/* Phone Numbers */}
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <a href="tel:09171876510" className="flex items-center justify-center gap-3 hover:text-red-700 transition-colors"><Phone className="text-red-700" size={22} /><p className="font-semibold">0917-187-6510</p></a>
              <a href="tel:09266642839" className="flex items-center justify-center gap-3 hover:text-red-700 transition-colors"><Phone className="text-red-700" size={22} /><p className="font-semibold">0926-664-2839</p></a>
              <a href="tel:0323834122" className="flex items-center justify-center gap-3 hover:text-red-700 transition-colors"><Phone className="text-red-700" size={22} /><p className="font-semibold">(032) 383-4122</p></a>
            </div>

            <div className="border-t border-gray-200" />

            {/* Social & Email */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href="mailto:bookings@ceburedcarpetcatering.com" className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-red-300 hover:bg-red-50 transition-colors">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span className="font-medium text-gray-700">bookings@ceburedcarpetcatering.com</span>
              </a>

              <a href="https://www.facebook.com/ceburedcarpetcatering" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span className="font-medium text-gray-700">Facebook</span>
              </a>

              <a href="https://www.instagram.com/ceburedcarpet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-colors">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><defs><linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#FFDC80"/><stop offset="25%" stopColor="#F77737"/><stop offset="50%" stopColor="#E1306C"/><stop offset="75%" stopColor="#C13584"/><stop offset="100%" stopColor="#833AB4"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig)" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="url(#ig)" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig)"/></svg>
                <span className="font-medium text-gray-700">Instagram</span>
              </a>

              <a href="https://m.me/ceburedcarpetcatering" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <svg viewBox="0 0 36 36" width="22" height="22" fill="#0084FF"><path d="M18 2C9.163 2 2 8.636 2 16.7c0 4.22 1.726 7.98 4.532 10.56v5.34l4.95-2.72c1.4.39 2.88.6 4.418.6 8.837 0 16-6.636 16-14.78C31.9 8.636 26.837 2 18 2zm1.77 19.876l-4.075-4.35-7.95 4.35 8.74-9.28 4.175 4.35 7.85-4.35-8.74 9.28z"/></svg>
                <span className="font-medium text-gray-700">Messenger</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}