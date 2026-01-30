import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { FOOD_CATEGORIES, SERVING_SIZES, FIXED_PRICE_SIZE, BINGCAVA_SIZES, LUMPIA_SIZES, getItemPrice, getAvailableSizes, calculateCartTotal, getCategoryInfo } from '../lib/foodOrderData'
import { ShoppingCart, Plus, Minus, X, Search, ChevronRight, MapPin, Calendar, Clock, User, Phone, Mail, Send, Trash2, AlertCircle } from 'lucide-react'

export default function FoodMenuPage() {
  const { user, profile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [foodItems, setFoodItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedSize, setSelectedSize] = useState('home')
  const [quantity, setQuantity] = useState(1)
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: '',
    specialInstructions: ''
  })

  useEffect(() => { fetchFoodItems() }, [])

  useEffect(() => {
    if (profile) setOrderDetails(prev => ({ ...prev, customerName: profile.full_name || '', customerPhone: profile.phone || '' }))
    if (user) setOrderDetails(prev => ({ ...prev, customerEmail: user.email || '' }))
  }, [profile, user])

  const fetchFoodItems = async () => {
    setLoading(true)
    const { data } = await supabase.from('food_items').select('*').eq('available', true).order('category').order('name')
    setFoodItems(data || [])
    setLoading(false)
  }

  // Get minimum booking date (2 days ahead for customers, today for admins)
  const getMinDate = () => {
    const now = new Date()
    if (isAdmin) {
      return now.toISOString().split('T')[0] // Today for admins
    }
    // 2 days ahead for customers
    now.setDate(now.getDate() + 2)
    return now.toISOString().split('T')[0]
  }

  // Check if selected date/time is valid for admin same-day booking (8 hours ahead)
  const isValidAdminSameDayBooking = (date, time) => {
    if (!isAdmin) return true
    const today = new Date().toISOString().split('T')[0]
    if (date !== today) return true // Not same-day, always valid
    
    if (!time) return false // Same-day requires time
    
    const now = new Date()
    const [hours, minutes] = time.split(':').map(Number)
    const bookingTime = new Date()
    bookingTime.setHours(hours, minutes, 0, 0)
    
    const diffHours = (bookingTime - now) / (1000 * 60 * 60)
    return diffHours >= 8
  }

  // Get minimum time for same-day admin bookings
  const getMinTimeForToday = () => {
    if (!isAdmin) return ''
    const today = new Date().toISOString().split('T')[0]
    if (orderDetails.deliveryDate !== today) return ''
    
    const minTime = new Date()
    minTime.setHours(minTime.getHours() + 8)
    return `${String(minTime.getHours()).padStart(2, '0')}:${String(minTime.getMinutes()).padStart(2, '0')}`
  }

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const openItemModal = (item) => {
    setSelectedItem(item)
    const sizes = getAvailableSizes(item)
    setSelectedSize(sizes[0]?.id || 'home')
    setQuantity(1)
  }

  const addToCart = () => {
    if (!selectedItem) return
    const price = getItemPrice(selectedItem, selectedSize)
    
    // Get size info based on item type
    let sizeInfo
    if (selectedSize === 'fixed') {
      sizeInfo = FIXED_PRICE_SIZE
    } else if (selectedItem.name?.toLowerCase().includes('bingcava')) {
      sizeInfo = BINGCAVA_SIZES.find(s => s.id === selectedSize)
    } else if (selectedItem.name?.toLowerCase().includes('lumpia')) {
      sizeInfo = LUMPIA_SIZES.find(s => s.id === selectedSize)
    } else {
      sizeInfo = SERVING_SIZES.find(s => s.id === selectedSize)
    }
    
    const cartItem = {
      id: `${selectedItem.id}-${selectedSize}`,
      itemId: selectedItem.id,
      name: selectedItem.name,
      category: selectedItem.category,
      size: selectedSize,
      sizeName: sizeInfo?.name || '',
      serves: sizeInfo?.serves || '',
      price: price,
      quantity: quantity
    }
    const existingIndex = cart.findIndex(c => c.id === cartItem.id)
    if (existingIndex >= 0) {
      const newCart = [...cart]
      newCart[existingIndex].quantity += quantity
      setCart(newCart)
    } else {
      setCart([...cart, cartItem])
    }
    setSelectedItem(null)
  }

  const updateCartQuantity = (cartId, delta) => {
    setCart(cart.map(item => item.id === cartId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item))
  }

  const removeFromCart = (cartId) => setCart(cart.filter(item => item.id !== cartId))

  const handleSubmit = async () => {
    if (cart.length === 0) { setError('Your cart is empty'); return }
    setSubmitting(true)
    setError('')
    try {
      const total = calculateCartTotal(cart)
      const orderData = {
        user_id: user?.id || null,
        customer_name: orderDetails.customerName,
        customer_phone: orderDetails.customerPhone,
        customer_email: orderDetails.customerEmail,
        delivery_address: orderDetails.deliveryAddress,
        delivery_date: orderDetails.deliveryDate,
        delivery_time: orderDetails.deliveryTime,
        items: cart,
        subtotal: total,
        delivery_fee: 0,
        total_amount: total,
        special_instructions: orderDetails.specialInstructions,
        status: 'pending'
      }
      const { data, error: insertError } = await supabase.from('food_orders').insert([orderData]).select().single()
      if (insertError) throw insertError

      setCart([])
      setShowCheckout(false)
      setShowCart(false)
      alert('Order placed successfully!')
      if (user) navigate('/my-orders?tab=food')
    } catch (err) { setError(err.message) } finally { setSubmitting(false) }
  }

  const cartTotal = calculateCartTotal(cart)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const canCheckout = orderDetails.customerName && orderDetails.customerPhone && orderDetails.deliveryAddress && orderDetails.deliveryDate && isValidAdminSameDayBooking(orderDetails.deliveryDate, orderDetails.deliveryTime)
  
  // Check if this is an admin same-day booking that needs time
  const isSameDayAdmin = isAdmin && orderDetails.deliveryDate === new Date().toISOString().split('T')[0]

  return (
    <div className="py-8 px-4 pb-32">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Food Menu</h1>
          <p className="text-gray-500">Order delicious food for delivery or pickup</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 sticky top-16 z-20">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setSelectedCategory('all')} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>All</button>
            {FOOD_CATEGORIES.map(cat => {
              const count = foodItems.filter(i => i.category === cat.id).length
              if (count === 0) return null
              return (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{cat.icon} {cat.name}</button>
              )
            })}
          </div>
        </div>

        {/* Menu Items */}
        {loading ? (
          <div className="text-center py-12"><div className="animate-spin w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full mx-auto"></div><p className="mt-4 text-gray-500">Loading menu...</p></div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedItems).map(([category, items]) => {
              const catInfo = getCategoryInfo(category)
              return (
                <div key={category}>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">{catInfo.icon}</span> {catInfo.name}
                    <span className="text-sm font-normal text-gray-400">({items.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map(item => {
                      const isFlat = item.category === 'dessert' || item.category === 'special'
                      return (
                        <button key={item.id} onClick={() => openItemModal(item)} className="bg-white rounded-xl p-4 text-left hover:shadow-lg transition-shadow border border-gray-100 group">
                          <h3 className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors">{item.name}</h3>
                          <p className="text-red-700 font-bold mt-2">{isFlat ? `₱${item.price_home?.toLocaleString()}` : `From ₱${item.price_home?.toLocaleString()}`}</p>
                          {!isFlat && <p className="text-xs text-gray-400 mt-1">Click to see all sizes</p>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            {Object.keys(groupedItems).length === 0 && <div className="text-center py-12 bg-white rounded-2xl"><p className="text-gray-500">No items found</p></div>}
          </div>
        )}
      </div>

      {/* Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryInfo(selectedItem.category).color}`}>{getCategoryInfo(selectedItem.category).name}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{selectedItem.name}</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              
              {/* Size Selection - only show if multiple sizes */}
              {getAvailableSizes(selectedItem).length > 1 ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
                  <div className="space-y-2">
                    {getAvailableSizes(selectedItem).map(size => {
                      const price = getItemPrice(selectedItem, size.id)
                      return (
                        <button key={size.id} onClick={() => setSelectedSize(size.id)} className={`w-full p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all ${selectedSize === size.id ? 'border-red-700 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                          <div><p className="font-semibold text-gray-800">{size.name}</p><p className="text-sm text-gray-500">{size.serves}</p></div>
                          <span className="text-lg font-bold text-red-700">₱{price.toLocaleString()}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* Single price display for desserts/special */
                <div className="mb-4 bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-red-700">₱{selectedItem.price_home?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">per order</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"><Minus size={20} /></button>
                  <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800"><Plus size={20} /></button>
                </div>
              </div>
              <button onClick={addToCart} className="w-full py-4 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800 flex items-center justify-center gap-2 text-lg">
                <ShoppingCart size={20} /> Add to Cart — ₱{(getItemPrice(selectedItem, selectedSize) * quantity).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div className="bg-white w-full max-w-md h-full overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Your Cart</h2>
                <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              {cart.length === 0 ? (
                <div className="text-center py-12"><ShoppingCart className="mx-auto text-gray-300" size={64} /><p className="text-gray-500 mt-4">Your cart is empty</p></div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div><h4 className="font-semibold text-gray-800">{item.name}</h4><p className="text-sm text-gray-500">{item.serves ? `${item.sizeName} • ${item.serves}` : item.sizeName}</p></div>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateCartQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-white border flex items-center justify-center"><Minus size={14} /></button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center"><Plus size={14} /></button>
                          </div>
                          <span className="font-bold text-red-700">₱{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-6"><div className="flex justify-between items-center text-xl"><span className="font-semibold">Total</span><span className="font-bold text-red-700">₱{cartTotal.toLocaleString()}</span></div></div>
                  <button onClick={() => { setShowCart(false); setShowCheckout(true) }} className="w-full py-4 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800 flex items-center justify-center gap-2">Proceed to Checkout <ChevronRight size={20} /></button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
                <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Order Summary ({cart.length} items)</h3>
                <div className="space-y-2 text-sm max-h-32 overflow-y-auto">
                  {cart.map(item => (<div key={item.id} className="flex justify-between"><span className="text-gray-600">{item.name} ({item.sizeName}) ×{item.quantity}</span><span className="font-medium">₱{(item.price * item.quantity).toLocaleString()}</span></div>))}
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between font-bold"><span>Total</span><span className="text-red-700">₱{cartTotal.toLocaleString()}</span></div>
              </div>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={18} /><input type="text" value={orderDetails.customerName} onChange={(e) => setOrderDetails({...orderDetails, customerName: e.target.value})} placeholder="Your full name" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label><div className="relative"><Phone className="absolute left-3 top-3 text-gray-400" size={18} /><input type="tel" value={orderDetails.customerPhone} onChange={(e) => setOrderDetails({...orderDetails, customerPhone: e.target.value})} placeholder="09XX XXX XXXX" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={18} /><input type="email" value={orderDetails.customerEmail} onChange={(e) => setOrderDetails({...orderDetails, customerEmail: e.target.value})} placeholder="email@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address *</label><div className="relative"><MapPin className="absolute left-3 top-3 text-gray-400" size={18} /><textarea value={orderDetails.deliveryAddress} onChange={(e) => setOrderDetails({...orderDetails, deliveryAddress: e.target.value})} placeholder="Complete delivery address" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px]" /></div></div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input type="date" value={orderDetails.deliveryDate} onChange={(e) => setOrderDetails({...orderDetails, deliveryDate: e.target.value, deliveryTime: ''})} min={getMinDate()} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time {isSameDayAdmin && '*'}</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                      <select value={orderDetails.deliveryTime} onChange={(e) => setOrderDetails({...orderDetails, deliveryTime: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white">
                        <option value="">Select time</option>
                        {[8,9,10,11,12,13,14,15,16,17,18,19,20].flatMap(hour => {
                          const minHour = isSameDayAdmin ? parseInt(getMinTimeForToday()?.split(':')[0] || 0) : 0
                          if (isSameDayAdmin && hour < minHour) return []
                          const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
                          const ampm = hour >= 12 ? 'PM' : 'AM'
                          return [
                            <option key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>{hour === 12 ? '12:00 PM' : `${displayHour}:00 ${ampm}`}</option>,
                            <option key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>{hour === 12 ? '12:30 PM' : `${displayHour}:30 ${ampm}`}</option>
                          ]
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Date booking notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
                  <p className="text-sm text-amber-800">
                    {isAdmin 
                      ? 'Admin: Same-day orders require at least 8 hours advance notice.' 
                      : 'Orders must be placed at least 2 days in advance for preparation.'}
                  </p>
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label><textarea value={orderDetails.specialInstructions} onChange={(e) => setOrderDetails({...orderDetails, specialInstructions: e.target.value})} placeholder="Any special requests..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[60px]" /></div>
              </div>
              {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">{error}</div>}
              <button onClick={handleSubmit} disabled={!canCheckout || submitting} className="w-full py-4 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6">
                <Send size={20} /> {submitting ? 'Placing Order...' : `Place Order — ₱${cartTotal.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCart && !showCheckout && (
        <div className="fixed bottom-6 left-4 right-4 z-40">
          <button onClick={() => setShowCart(true)} className="w-full max-w-md mx-auto bg-red-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between hover:bg-red-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2"><ShoppingCart size={24} /></div>
              <div className="text-left"><p className="font-bold">{cartCount} item{cartCount > 1 ? 's' : ''}</p><p className="text-sm text-red-200">View Cart</p></div>
            </div>
            <span className="text-xl font-bold">₱{cartTotal.toLocaleString()}</span>
          </button>
        </div>
      )}
    </div>
  )
}