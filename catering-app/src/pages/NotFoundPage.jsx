import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Utensils, ShoppingBag } from 'lucide-react'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <SEO title="Page Not Found" description="The page you're looking for doesn't exist." />
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-red-100 mb-2">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8">Sorry, we couldn't find what you're looking for. Let's get you back on track.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-800 transition-colors"
          >
            <Home size={18} /> Go Home
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <Utensils size={18} /> View Menu
          </Link>
          <Link
            to="/food-menu"
            className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag size={18} /> Order Food
          </Link>
        </div>
      </div>
    </div>
  )
}
