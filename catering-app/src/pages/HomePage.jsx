import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ChevronRight, Phone, Users, Utensils, Calendar, ShoppingBag, Truck } from 'lucide-react'
import { menuPackages } from '../lib/menuData'

export default function HomePage() {
  const { user } = useAuth()
  return (
    <div>
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
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex items-center justify-center gap-3"><Phone className="text-red-700" size={24} /><p className="font-semibold">0917-187-6510</p></div>
              <div className="flex items-center justify-center gap-3"><Phone className="text-red-700" size={24} /><p className="font-semibold">0926-664-2839</p></div>
              <div className="flex items-center justify-center gap-3"><Phone className="text-red-700" size={24} /><p className="font-semibold">(032) 383-4122</p></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}