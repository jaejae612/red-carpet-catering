import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { menuPackages, addOnStations } from '../lib/menuData'
import { cocktailMenus, packedMealMenus, packedSnackMenus, cocktailAddOns } from '../lib/cocktailPackedData'
import { ChevronDown, ChevronUp, Check, ShoppingBag, UtensilsCrossed, Wine, Package, Coffee, ArrowRight } from 'lucide-react'
import { supabase } from '../lib/supabase'

// Helper to get icon for menu item
const getItemIcon = (item) => {
  const lower = item.toLowerCase()
  if (lower.includes('salad') || lower.includes('pickled') || lower.includes('eggplant') || lower.includes('waldorf') || lower.includes('mandarin')) return '🥗'
  if (lower.includes('soup') || lower.includes('ngocong')) return '🍲'
  if (lower.includes('rice') || lower.includes('paella') || lower.includes('valenciana')) return '🍚'
  if (lower.includes('cake') || lower.includes('flan') || lower.includes('pie') || lower.includes('cheesecake') || lower.includes('torte') || lower.includes('brownie') || lower.includes('tart') || lower.includes('macaroon') || lower.includes('pudding')) return '🍰'
  if (lower.includes('jelly') || lower.includes('sago') || lower.includes('buko') || lower.includes('mango') && lower.includes('sago')) return '🍮'
  if (lower.includes('fruit') || lower.includes('beko') || lower.includes('maja') || lower.includes('dubos') || lower.includes('enganos') || lower.includes('pandan')) return '🍨'
  if (lower.includes('pancit') || lower.includes('pasta') || lower.includes('carbonara') || lower.includes('lasagna') || lower.includes('alfredo') || lower.includes('ziti') || lower.includes('fettuccine') || lower.includes('pad thai') || lower.includes('misua') || lower.includes('sotanghon') || lower.includes('spaghetti') || lower.includes('penne') || lower.includes('tetrazzini')) return '🍝'
  if (lower.includes('lumpia') || lower.includes('spring roll')) return '🥟'
  if (lower.includes('sushi') || lower.includes('roll')) return '🍣'
  if (lower.includes('tempura') || lower.includes('prawn') || lower.includes('shrimp') || lower.includes('camaron')) return '🦐'
  if (lower.includes('fish') || lower.includes('isda') || lower.includes('crab') || lower.includes('seafood') || lower.includes('squid') || lower.includes('zulieta')) return '🐟'
  if (lower.includes('chicken') || lower.includes('papo') || lower.includes('lollipop') || lower.includes('nugget') || lower.includes('teriyaki') || lower.includes('yakitori')) return '🍗'
  if (lower.includes('pork') || lower.includes('liempo') || lower.includes('lechon') || lower.includes('spareribs') || lower.includes('kebab') || lower.includes('bacon') || lower.includes('ham') || lower.includes('siomai') || lower.includes('humba')) return '🥓'
  if (lower.includes('beef') || lower.includes('ox') || lower.includes('morcon') || lower.includes('callos') || lower.includes('kare') || lower.includes('galbi') || lower.includes('tapa') || lower.includes('burger') || lower.includes('meatball')) return '🥩'
  if (lower.includes('pizza')) return '🍕'
  if (lower.includes('sandwich') || lower.includes('croissant') || lower.includes('bread')) return '🥪'
  if (lower.includes('vegetable') || lower.includes('stick')) return '🥬'
  if (lower.includes('peanut')) return '🥜'
  if (lower.includes('canape') || lower.includes('cold cut')) return '🍖'
  if (lower.includes('tea') || lower.includes('juice') || lower.includes('drink')) return '🧃'
  if (lower.includes('chocolate') || lower.includes('choco')) return '🍫'
  return '🍽️'
}

export default function MenuPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('buffet')
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

  const tabs = [
    { id: 'buffet', name: 'Buffet Catering', icon: UtensilsCrossed, color: 'red' },
    { id: 'cocktail', name: 'Cocktail Party', icon: Wine, color: 'purple' },
    { id: 'packed', name: 'Packed Meals', icon: Package, color: 'emerald' },
    { id: 'snacks', name: 'Packed Snacks', icon: Coffee, color: 'amber' },
  ]

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Catering Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From elegant buffets to convenient packed meals, we have the perfect catering solution for your event.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const colorClasses = {
              red: isActive ? 'bg-red-700 text-white' : 'bg-white text-gray-600 hover:bg-red-50',
              purple: isActive ? 'bg-purple-700 text-white' : 'bg-white text-gray-600 hover:bg-purple-50',
              emerald: isActive ? 'bg-emerald-700 text-white' : 'bg-white text-gray-600 hover:bg-emerald-50',
              amber: isActive ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 hover:bg-amber-50',
            }
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setExpandedPackage(null) }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium shadow-md transition-all ${colorClasses[tab.color]}`}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            )
          })}
        </div>

        {/* BUFFET CATERING */}
        {activeTab === 'buffet' && (
          <>
            <div className="bg-red-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-red-800 mb-2">🍽️ Buffet Catering</h2>
              <p className="text-red-700">All packages include tables, chairs with covers, buffet table with centerpiece, wait staff, utensils, and one round of drinks.</p>
              <p className="text-sm text-red-600 mt-2">Minimum 30 guests • Base pricing at 60+ guests</p>
            </div>

            <div className="space-y-6 mb-8">
              {Object.values(menuPackages).map(pkg => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-gray-800">{pkg.name}</h2>
                      <p className="text-red-600 font-semibold text-lg">₱{pkg.pricePerHead}/head <span className="text-gray-500 font-normal text-sm">(60+ pax)</span></p>
                      {pkg.isCustomBuild ? (
                        <p className="text-xs text-blue-600 mt-1">🛠️ Build Your Own Menu</p>
                      ) : (
                        <p className="text-xs text-green-600 mt-1">📋 Preset Buffet Menus</p>
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
                          <div className="bg-blue-50 rounded-xl p-4">
                            <h4 className="font-semibold text-blue-800 mb-3">🛠️ Build Your Own Menu</h4>
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
                                  <p className="text-sm font-medium">{pkg.structure.side} Side</p>
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
                                  <p className="text-sm font-medium">{pkg.structure.dessert} Dessert</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {pkg.options.map((option, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-4">
                              <h4 className="font-semibold text-gray-800 mb-3">{option.name}</h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {option.items?.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="flex-shrink-0">{getItemIcon(item)}</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add-on Stations */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
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

            {/* CTA */}
            <div className="text-center">
              <Link to={user ? "/book" : "/login"} className="inline-flex items-center gap-2 bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-red-800">
                Book Buffet Catering <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}

        {/* COCKTAIL PARTY */}
        {activeTab === 'cocktail' && (
          <>
            <div className="bg-purple-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-purple-800 mb-2">🍷 Cocktail Party Packages</h2>
              <p className="text-purple-700">Elegant finger foods and appetizers perfect for cocktail receptions, corporate mixers, and social gatherings.</p>
              <p className="text-sm text-purple-600 mt-2">Minimum 30 guests • Base pricing at 60+ guests</p>
            </div>

            <div className="space-y-6 mb-8">
              {Object.values(cocktailMenus).map(pkg => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-gray-800">{pkg.name}</h2>
                      <p className="text-purple-600 font-semibold text-lg">₱{pkg.pricePerHead}/head <span className="text-gray-500 font-normal text-sm">(60+ pax)</span></p>
                      <p className="text-xs text-gray-500 mt-1">{Object.keys(pkg.options).length} menu options available</p>
                    </div>
                    {expandedPackage === pkg.id ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
                  </button>
                  {expandedPackage === pkg.id && (
                    <div className="border-t border-gray-100 p-6">
                      <div className="bg-purple-50 rounded-xl p-4 mb-6">
                        <h3 className="font-semibold text-purple-700 mb-2">Pricing per Head</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>60+ pax: <span className="font-medium">₱{pkg.pricingTiers[60]}</span></div>
                          <div>50 pax: <span className="font-medium">₱{pkg.pricingTiers[50]}</span></div>
                          <div>40 pax: <span className="font-medium">₱{pkg.pricingTiers[40]}</span></div>
                          <div>30 pax: <span className="font-medium">₱{pkg.pricingTiers[30]}</span></div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(pkg.options).map(([key, option]) => (
                          <div key={key} className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">{option.name}</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="flex-shrink-0">{getItemIcon(item)}</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cocktail Add-ons */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Add-on Stations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cocktailAddOns.map(addon => (
                  <div key={addon.id} className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                    <div><p className="font-medium text-gray-800">{addon.name}</p><p className="text-sm text-gray-500">{addon.unit}</p></div>
                    <p className="font-semibold text-purple-700">₱{addon.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to={user ? "/book/cocktail" : "/login"} className="inline-flex items-center gap-2 bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-800">
                Book Cocktail Party <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}

        {/* PACKED MEALS */}
        {activeTab === 'packed' && (
          <>
            <div className="bg-emerald-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-emerald-800 mb-2">📦 Packed Meal Choices</h2>
              <p className="text-emerald-700">Complete meals in individual boxes, perfect for meetings, seminars, and events on-the-go.</p>
              <p className="text-sm text-emerald-600 mt-2">Minimum 30 packs • Includes tetra pack juice or bottled water • Add ₱60/pack for soda</p>
            </div>

            <div className="space-y-6 mb-8">
              {Object.values(packedMealMenus).map(pkg => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-gray-800">{pkg.name}</h2>
                      <p className="text-emerald-600 font-semibold text-lg">₱{pkg.pricePerPack}/pack</p>
                      <p className="text-xs text-gray-500 mt-1">{Object.keys(pkg.options).length} menu options • {pkg.includes}</p>
                    </div>
                    {expandedPackage === pkg.id ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
                  </button>
                  {expandedPackage === pkg.id && (
                    <div className="border-t border-gray-100 p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(pkg.options).map(([key, option]) => (
                          <div key={key} className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">{option.name}</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="flex-shrink-0">{getItemIcon(item)}</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to={user ? "/order/packed-meals" : "/login"} className="inline-flex items-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-800">
                Order Packed Meals <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}

        {/* PACKED SNACKS */}
        {activeTab === 'snacks' && (
          <>
            <div className="bg-amber-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-amber-800 mb-2">☕ Packed Snack Choices</h2>
              <p className="text-amber-700">Light bites in convenient boxes, perfect for workshops, training sessions, and quick breaks.</p>
              <p className="text-sm text-amber-600 mt-2">Minimum 30 packs • Includes bottled water or tetra pack juice</p>
            </div>

            <div className="space-y-6 mb-8">
              {Object.values(packedSnackMenus).map(pkg => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button onClick={() => setExpandedPackage(expandedPackage === pkg.id ? null : pkg.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-gray-800">{pkg.name}</h2>
                      <p className="text-amber-600 font-semibold text-lg">₱{pkg.pricePerPack}/pack</p>
                      <p className="text-xs text-gray-500 mt-1">{Object.keys(pkg.options).length} menu options • {pkg.includes}</p>
                    </div>
                    {expandedPackage === pkg.id ? <ChevronUp size={24} className="text-gray-400" /> : <ChevronDown size={24} className="text-gray-400" />}
                  </button>
                  {expandedPackage === pkg.id && (
                    <div className="border-t border-gray-100 p-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(pkg.options).map(([key, option]) => (
                          <div key={key} className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-800 mb-3">{option.name}</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {option.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="flex-shrink-0">{getItemIcon(item)}</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Link to={user ? "/order/packed-meals" : "/login"} className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-700">
                Order Packed Snacks <ArrowRight size={20} />
              </Link>
            </div>
          </>
        )}

        {/* Bottom CTA for non-logged in users */}
        {!user && (
          <div className="mt-12 bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to order?</h3>
            <p className="text-gray-600 mb-6">Sign up or log in to start your booking</p>
            <div className="flex justify-center gap-4">
              <Link to="/signup" className="bg-red-700 text-white px-8 py-3 rounded-xl font-medium hover:bg-red-800">Sign Up</Link>
              <Link to="/login" className="border-2 border-red-700 text-red-700 px-8 py-3 rounded-xl font-medium hover:bg-red-50">Log In</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
