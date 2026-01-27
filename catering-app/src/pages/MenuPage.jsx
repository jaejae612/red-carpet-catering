import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { menuPackages, addOnStations } from '../lib/menuData'
import { ChevronDown, ChevronUp, Check, ShoppingBag } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Helper to get icon for menu item
const getItemIcon = (item) => {
  const lower = item.toLowerCase()
  if (lower.includes('salad') || lower.includes('pickled') || lower.includes('eggplant') || lower.includes('waldorf') || lower.includes('mandarin')) return '🥗'
  if (lower.includes('soup') || lower.includes('ngocong')) return '🍲'
  if (lower.includes('rice') || lower.includes('paella') || lower.includes('valenciana')) return '🍚'
  if (lower.includes('cake') || lower.includes('flan') || lower.includes('pie') || lower.includes('cheesecake') || lower.includes('torte') || lower.includes('brownie') || lower.includes('tart')) return '🍰'
  if (lower.includes('jelly') || lower.includes('sago') || lower.includes('buko') || lower.includes('mango') && lower.includes('sago')) return '🍮'
  if (lower.includes('fruit') || lower.includes('beko') || lower.includes('maja') || lower.includes('dubos') || lower.includes('enganos')) return '🍨'
  if (lower.includes('pancit') || lower.includes('pasta') || lower.includes('carbonara') || lower.includes('lasagna') || lower.includes('alfredo') || lower.includes('ziti') || lower.includes('fettuccine') || lower.includes('pad thai') || lower.includes('misua') || lower.includes('sotanghon')) return '🍝'
  if (lower.includes('lumpia')) return '🥟'
  if (lower.includes('sushi')) return '🍣'
  if (lower.includes('tempura') || lower.includes('prawn') || lower.includes('shrimp')) return '🍤'
  if (lower.includes('fish') || lower.includes('isda') || lower.includes('crab') || lower.includes('seafood') || lower.includes('squid')) return '🐟'
  if (lower.includes('chicken') || lower.includes('papo')) return '🍗'
  if (lower.includes('pork') || lower.includes('liempo') || lower.includes('lechon') || lower.includes('spareribs')) return '🥓'
  if (lower.includes('beef') || lower.includes('ox') || lower.includes('morcon') || lower.includes('callos') || lower.includes('kare') || lower.includes('galbi') || lower.includes('tapa')) return '🥩'
  return '🍽️'
}

export default function MenuPage() {
  const { user } = useAuth()
  const [expandedPackage, setExpandedPackage] = useState(null)
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    fetchDishes()
  }, [])

  const fetchDishes = async () => {
    const { data } = await supabase.from('dishes').select('*').eq('available', true).order('name')
    setDishes(data || [])
  }

  // Get sample dishes for a category
  const getDishesForCategory = (categoryId, limit = 999) => {
    if (categoryId === 'main') {
      return dishes.filter(d => ['main_pork', 'main_fish', 'main_beef', 'main_chicken'].includes(d.category)).slice(0, limit)
    }
    if (categoryId === 'side') {
      return dishes.filter(d => ['side_vegetable', 'side_pasta'].includes(d.category)).slice(0, limit)
    }
    return dishes.filter(d => d.category === categoryId).slice(0, limit)
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Catering Packages</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">All packages include tables, chairs with covers, buffet table with centerpiece, wait staff, utensils, and one round of drinks.</p>
          <Link to="/food-menu" className="inline-flex items-center gap-2 mt-4 text-red-700 hover:text-red-800 font-medium">
            <ShoppingBag size={18} /> Looking for food delivery? View Food Menu →
          </Link>
        </div>
        <div className="space-y-6 mb-12">
          {Object.values(menuPackages).map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="text-left">
                  <h2 className="text-2xl font-bold text-gray-800">{pkg.name}</h2>
                  <p className="text-red-600 font-semibold text-lg">₱{pkg.pricePerHead}/head <span className="text-gray-500 font-normal text-sm">(60+ pax)</span></p>
                  {pkg.id === 'menu470' ? (
                    <p className="text-xs text-gray-500 mt-1">🛠️ Build Your Own • 🍚 Plain Rice & Fried Rice only</p>
                  ) : pkg.id === 'menu510' ? (
                    <p className="text-xs text-gray-500 mt-1">🛠️ Build Your Own • 🍚 Plain Rice, Fried Rice & Arroz Valenciana</p>
                  ) : (
                    <p className="text-xs text-green-600 mt-1">📋 Preset Buffet Menus • 🍚 All rice options included</p>
                  )}
                </div>
                {expandedPackage === pkg.id ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
              </button>
              {expandedPackage === pkg.id && (
                <div className="border-t border-gray-100 p-6">
                  <div className="bg-red-50 rounded-xl p-4 mb-6">
                    <h3 className="font-semibold text-red-700 mb-2">Pricing per Head</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>60+ pax: <span className="font-medium">₱{pkg.pricingTiers[60]}</span></div>
                      <div>50 pax: <span className="font-medium">₱{pkg.pricingTiers[50]}</span></div>
                      <div>40 pax: <span className="font-medium">₱{pkg.pricingTiers[40]}</span></div>
                      <div>30 pax: <span className="font-medium">₱{pkg.pricingTiers[30]}</span></div>
                    </div>
                  </div>
                  
                  {pkg.isCustomBuild ? (
                    <div className="space-y-4">
                      {/* Build Your Own Structure */}
                      <div className="bg-blue-50 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-800 mb-3">🛠️ Build Your Own Menu</h4>
                        <p className="text-sm text-blue-700 mb-4">Choose your dishes from our selection:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                          {pkg.structure?.salad > 0 && (
                            <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                              <span className="text-green-600 text-lg">🥗</span>
                              <p className="text-sm font-medium">{pkg.structure.salad} Salad</p>
                            </div>
                          )}
                          {pkg.structure?.main > 0 && (
                            <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                              <span className="text-red-600 text-lg">🍖</span>
                              <p className="text-sm font-medium">{pkg.structure.main} Main</p>
                            </div>
                          )}
                          {pkg.structure?.side > 0 && (
                            <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                              <span className="text-orange-600 text-lg">🥬</span>
                              <p className="text-sm font-medium">{pkg.structure.side} {pkg.structure.side > 1 ? 'Sides' : 'Side'}</p>
                            </div>
                          )}
                          {pkg.structure?.rice > 0 && (
                            <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                              <span className="text-amber-600 text-lg">🍚</span>
                              <p className="text-sm font-medium">{pkg.structure.rice} Rice</p>
                            </div>
                          )}
                          {pkg.structure?.dessert > 0 && (
                            <div className="bg-white rounded-lg p-3 text-center min-w-[80px]">
                              <span className="text-pink-600 text-lg">🍰</span>
                              <p className="text-sm font-medium">{pkg.structure.dessert} Desserts</p>
                            </div>
                          )}
                        </div>
                        {pkg.id === 'menu470' && (
                          <p className="text-xs text-blue-600 mt-3 text-center">Rice options: Plain Rice & Fried Rice only</p>
                        )}
                        {pkg.id === 'menu510' && (
                          <p className="text-xs text-blue-600 mt-3 text-center">Rice options: Plain Rice, Fried Rice & Arroz Valenciana</p>
                        )}
                      </div>

                      {/* Available Dishes Grid */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {pkg.structure?.salad > 0 && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h5 className="font-semibold text-green-700 mb-2 flex items-center gap-2">🥗 Salad Options</h5>
                            <div className="space-y-1">
                              {getDishesForCategory('salad').map(d => (
                                <p key={d.id} className="text-sm text-gray-600 flex items-center gap-2">
                                  <Check size={12} className="text-green-500" /> {d.name}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h5 className="font-semibold text-red-700 mb-2 flex items-center gap-2">🍖 Main Dish Options</h5>
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {getDishesForCategory('main').map(d => (
                              <p key={d.id} className="text-sm text-gray-600 flex items-center gap-2">
                                <Check size={12} className="text-red-500" /> {d.name}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h5 className="font-semibold text-orange-700 mb-2 flex items-center gap-2">🥬 Side Options</h5>
                          <div className="space-y-1 max-h-40 overflow-y-auto">
                            {getDishesForCategory('side').map(d => (
                              <p key={d.id} className="text-sm text-gray-600 flex items-center gap-2">
                                <Check size={12} className="text-orange-500" /> {d.name}
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h5 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">🍚 Rice Options</h5>
                          <div className="space-y-1">
                            {pkg.id === 'menu470' ? (
                              <>
                                <p className="text-sm text-gray-600 flex items-center gap-2"><Check size={12} className="text-amber-500" /> Plain Rice</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2"><Check size={12} className="text-amber-500" /> Fried Rice</p>
                              </>
                            ) : pkg.id === 'menu510' ? (
                              <>
                                <p className="text-sm text-gray-600 flex items-center gap-2"><Check size={12} className="text-amber-500" /> Plain Rice</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2"><Check size={12} className="text-amber-500" /> Fried Rice</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2"><Check size={12} className="text-amber-500" /> Arroz Valenciana</p>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">
                          <h5 className="font-semibold text-pink-700 mb-2 flex items-center gap-2">🍰 Dessert Options</h5>
                          <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto">
                            {getDishesForCategory('dessert').map(d => (
                              <p key={d.id} className="text-sm text-gray-600 flex items-center gap-2">
                                <Check size={12} className="text-pink-500" /> {d.name}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {pkg.options.map((option, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-800 mb-3">{option.name}</h4>
                          {option.items ? (
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="flex-shrink-0">{getItemIcon(item)}</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="text-sm text-gray-600 space-y-2">
                              {option.appetizer && <div><span className="font-medium">Appetizer:</span> {option.appetizer.join(', ')}</div>}
                              {option.mainCourse && <div><span className="font-medium">Main Course:</span> {option.mainCourse.join(', ')}</div>}
                              {option.dessert && <div><span className="font-medium">Dessert:</span> {option.dessert.join(', ')}</div>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add-on Stations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOnStations.map(addon => (
              <div key={addon.id} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                <div><p className="font-medium text-gray-800">{addon.name}</p><p className="text-sm text-gray-500">{addon.unit}</p></div>
                <p className="font-semibold text-red-700">₱{addon.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          {user ? <Link to="/book" className="inline-block bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-800">Book Catering Now</Link> : (
            <div className="space-y-4">
              <p className="text-gray-600">Sign up or log in to book catering</p>
              <div className="flex justify-center gap-4">
                <Link to="/signup" className="bg-red-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-800">Sign Up</Link>
                <Link to="/login" className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-xl font-medium hover:bg-red-50">Log In</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}