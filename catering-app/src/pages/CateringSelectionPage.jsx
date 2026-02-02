import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  UtensilsCrossed, Wine, Package, Coffee, ArrowRight, Users, 
  Clock, Star, CheckCircle, ChevronDown, ChevronUp, Sparkles,
  Calendar, MapPin, PartyPopper
} from 'lucide-react'

const cateringOptions = [
  {
    id: 'buffet',
    name: 'Buffet Catering',
    tagline: 'Full-service catering for memorable events',
    description: 'Complete buffet setup with chafing dishes, serving utensils, and professional service. Perfect for weddings, debuts, corporate events, and large gatherings.',
    icon: UtensilsCrossed,
    color: 'red',
    bgGradient: 'from-red-600 to-red-800',
    lightBg: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    route: '/book',
    priceRange: '₱470 - ₱810 per head',
    minGuests: 30,
    features: [
      'Full buffet setup with chafing dishes',
      'Professional waitstaff included',
      'Multiple menu packages to choose from',
      'Customizable dishes per category',
      'Add-on stations available (Halo-halo, Crepe, etc.)',
      'Includes drinks and desserts'
    ],
    bestFor: ['Weddings', 'Debuts', 'Corporate Events', 'Reunions', 'Fiestas'],
    packages: [
      { name: 'Menu 470', price: '₱470/head', highlight: 'Budget-friendly' },
      { name: 'Menu 510', price: '₱510/head', highlight: 'Popular choice' },
      { name: 'Menu 560', price: '₱560/head', highlight: 'Filipino & International' },
      { name: 'Menu 660', price: '₱660/head', highlight: 'Premium selection' },
      { name: 'Menu 810', price: '₱810/head', highlight: 'Luxury experience' },
    ]
  },
  {
    id: 'cocktail',
    name: 'Cocktail Party',
    tagline: 'Elegant finger foods & appetizers',
    description: 'Bite-sized delights perfect for mingling and socializing. Ideal for cocktail receptions, corporate mixers, product launches, and social gatherings.',
    icon: Wine,
    color: 'purple',
    bgGradient: 'from-purple-600 to-purple-800',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    route: '/book/cocktail',
    priceRange: '₱400 - ₱600 per head',
    minGuests: 30,
    features: [
      'Curated finger food selections',
      'Elegant presentation & setup',
      'Mix of savory and sweet items',
      'Includes beverages (Iced Tea/Juice)',
      'Add-on stations available',
      'Perfect for standing receptions'
    ],
    bestFor: ['Cocktail Receptions', 'Product Launches', 'Networking Events', 'Anniversaries'],
    packages: [
      { name: 'Cocktail 400', price: '₱400/head', highlight: 'Starter package' },
      { name: 'Cocktail 450', price: '₱450/head', highlight: '11 items' },
      { name: 'Cocktail 500', price: '₱500/head', highlight: '12 items' },
      { name: 'Cocktail 600', price: '₱600/head', highlight: 'Premium 13 items' },
    ]
  },
  {
    id: 'packed-meals',
    name: 'Packed Meals',
    tagline: 'Individual meal boxes delivered fresh',
    description: 'Convenient individually-packed meals perfect for meetings, seminars, outreach programs, and events where guests eat on-the-go.',
    icon: Package,
    color: 'emerald',
    bgGradient: 'from-emerald-600 to-emerald-800',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    route: '/order/packed-meals',
    priceRange: '₱180 - ₱320 per pack',
    minGuests: 30,
    features: [
      'Complete meal in individual boxes',
      'Includes rice, viand, and dessert',
      'Comes with juice or bottled water',
      'Option to upgrade to canned soda',
      'Multiple menu choices available',
      'Delivery or pickup options'
    ],
    bestFor: ['Corporate Meetings', 'Seminars', 'Outreach Programs', 'Field Trips'],
    packages: [
      { name: 'Packed Meal 180', price: '₱180/pack', highlight: '4 menu options' },
      { name: 'Packed Meal 250', price: '₱250/pack', highlight: 'More variety' },
      { name: 'Packed Meal 320', price: '₱320/pack', highlight: 'Premium selection' },
    ]
  },
  {
    id: 'packed-snacks',
    name: 'Packed Snacks',
    tagline: 'Light bites in convenient boxes',
    description: 'Perfect for quick breaks, afternoon snacks, or light refreshments. Great for workshops, training sessions, and kids\' parties.',
    icon: Coffee,
    color: 'amber',
    bgGradient: 'from-amber-500 to-amber-700',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    route: '/order/packed-meals',
    priceRange: '₱150 - ₱200 per pack',
    minGuests: 30,
    features: [
      'Light snack portions',
      '3-4 items per box',
      'Includes bottled water or juice',
      'Perfect for breaks & merienda',
      'Multiple menu options',
      'Easy to distribute'
    ],
    bestFor: ['Workshops', 'Training Sessions', 'Kids Parties', 'School Events'],
    packages: [
      { name: 'Snack 150', price: '₱150/pack', highlight: '3 items + drink' },
      { name: 'Snack 200', price: '₱200/pack', highlight: '4 items + drink' },
    ]
  }
]

export default function CateringSelectionPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [expandedCard, setExpandedCard] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  const handleSelect = (option) => {
    if (!user) {
      navigate('/login', { state: { from: option.route } })
      return
    }
    navigate(option.route)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles size={18} />
            <span className="text-sm font-medium">Red Carpet Catering Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Catering Style
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            From elegant buffets to convenient packed meals, we've got the perfect catering solution for your event.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="text-red-700" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">500+</p>
            <p className="text-sm text-gray-500">Events Served</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="text-purple-700" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">50K+</p>
            <p className="text-sm text-gray-500">Happy Guests</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Star className="text-emerald-700" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">4.9</p>
            <p className="text-sm text-gray-500">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="text-amber-700" size={24} />
            </div>
            <p className="text-2xl font-bold text-gray-800">Cebu</p>
            <p className="text-sm text-gray-500">Service Area</p>
          </div>
        </div>
      </div>

      {/* Catering Options */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {cateringOptions.map((option) => {
            const Icon = option.icon
            const isExpanded = expandedCard === option.id
            const isHovered = hoveredCard === option.id

            return (
              <div
                key={option.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  isHovered ? 'shadow-2xl scale-[1.02]' : ''
                }`}
                onMouseEnter={() => setHoveredCard(option.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-r ${option.bgGradient} p-6 text-white`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{option.name}</h3>
                      <p className="text-white/80">{option.tagline}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white/70">Starting at</p>
                      <p className="text-lg font-bold">{option.priceRange.split(' - ')[0]}</p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{option.description}</p>

                  {/* Best For Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {option.bestFor.map((item, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-3 py-1 rounded-full ${option.lightBg} ${option.textColor}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      Min. {option.minGuests} guests
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      Book 3-7 days ahead
                    </span>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : option.id)}
                    className={`w-full py-2 text-sm font-medium flex items-center justify-center gap-2 rounded-lg ${option.lightBg} ${option.textColor} hover:opacity-80 transition-all`}
                  >
                    {isExpanded ? 'Show Less' : 'View Details & Packages'}
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-fadeIn">
                      {/* Features */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
                        <ul className="space-y-2">
                          {option.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle size={16} className={`${option.textColor} flex-shrink-0 mt-0.5`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Packages */}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Available Packages:</h4>
                        <div className="space-y-2">
                          {option.packages.map((pkg, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center justify-between p-3 rounded-lg ${option.lightBg}`}
                            >
                              <div>
                                <p className="font-medium text-gray-800">{pkg.name}</p>
                                <p className="text-xs text-gray-500">{pkg.highlight}</p>
                              </div>
                              <p className={`font-bold ${option.textColor}`}>{pkg.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelect(option)}
                    className={`w-full mt-4 py-3 bg-gradient-to-r ${option.bgGradient} text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-all`}
                  >
                    {option.id === 'packed-snacks' ? 'Order Now' : 'Book Now'}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold">Quick Comparison</h2>
            <p className="text-gray-300">Find the perfect option for your event</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-red-700">
                    <UtensilsCrossed size={20} className="mx-auto mb-1" />
                    Buffet
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-700">
                    <Wine size={20} className="mx-auto mb-1" />
                    Cocktail
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-700">
                    <Package size={20} className="mx-auto mb-1" />
                    Packed Meals
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-amber-700">
                    <Coffee size={20} className="mx-auto mb-1" />
                    Snacks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-600">Price Range</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">₱470-810/head</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">₱400-600/head</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">₱180-320/pack</td>
                  <td className="px-6 py-4 text-center text-sm font-medium">₱150-200/pack</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">Minimum Order</td>
                  <td className="px-6 py-4 text-center text-sm">30 pax</td>
                  <td className="px-6 py-4 text-center text-sm">30 pax</td>
                  <td className="px-6 py-4 text-center text-sm">10 packs</td>
                  <td className="px-6 py-4 text-center text-sm">10 packs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-600">Service Style</td>
                  <td className="px-6 py-4 text-center text-sm">Full setup + staff</td>
                  <td className="px-6 py-4 text-center text-sm">Setup + service</td>
                  <td className="px-6 py-4 text-center text-sm">Delivery/Pickup</td>
                  <td className="px-6 py-4 text-center text-sm">Delivery/Pickup</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">Best For</td>
                  <td className="px-6 py-4 text-center text-sm">Weddings, Big Events</td>
                  <td className="px-6 py-4 text-center text-sm">Receptions, Mixers</td>
                  <td className="px-6 py-4 text-center text-sm">Meetings, Seminars</td>
                  <td className="px-6 py-4 text-center text-sm">Workshops, Kids</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-600">Lead Time</td>
                  <td className="px-6 py-4 text-center text-sm">5-7 days</td>
                  <td className="px-6 py-4 text-center text-sm">3-5 days</td>
                  <td className="px-6 py-4 text-center text-sm">24 hours</td>
                  <td className="px-6 py-4 text-center text-sm">24 hours</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <PartyPopper size={48} className="mx-auto mb-4 text-amber-400" />
          <h2 className="text-2xl font-bold mb-2">Not Sure Which to Choose?</h2>
          <p className="text-gray-300 mb-6">
            Our team is happy to help you find the perfect catering solution for your event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+639123456789"
              className="px-6 py-3 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              📞 Call Us
            </a>
            <a
              href="https://m.me/redcarpetcatering"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              💬 Message on Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
