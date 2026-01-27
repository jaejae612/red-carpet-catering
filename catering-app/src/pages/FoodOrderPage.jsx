import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { FOOD_CATEGORIES, SERVING_SIZES, getItemPrice, getAvailableSizes, calculateCartTotal, getCategoryInfo } from '../lib/foodOrderData'
import { ShoppingCart, Plus, Minus, X, Search, ChevronRight, ChevronLeft, MapPin, Calendar, Clock, User, Phone, Mail, Send, Trash2 } from 'lucide-react'

export default function FoodOrderPage() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
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

  const getTodayString = () => new Date().toISOString().split('T')[0]

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
    const sizeInfo = SERVING_SIZES.find(s => s.id === selectedSize)
    const cartItem = {
      id: `${selectedItem.id}-${selectedSize}`,
      itemId: selectedItem.id,
      name: selectedItem.name,
      category: selectedItem.category,
      size: selectedSize,
      sizeName: sizeInfo?.name || selectedSize,
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
      const { error: insertError } = await supabase.from('food_orders').insert([{
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
      }])
      if (insertError) throw insertError
      navigate(user ? '/my-orders?tab=food' : '/', { state: { orderSuccess: true } })
    } catch (err) { setError(err.message) } finally { setSubmitting(false) }
  }

  const cartTotal = calculateCartTotal(cart)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="sticky top-0 bg-white z-10 pb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input type="text" placeholder="Search dishes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button onClick={() => setSelectedCategory('all')} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${selectedCategory === 'all' ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700'}`}>All</button>
          {FOOD_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === cat.id ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700'}`}>{cat.icon} {cat.name}</button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-center py-12"><div className="animate-spin w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full mx-auto"></div></div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => {
            const catInfo = getCategoryInfo(category)
            return (
              <div key={category}>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><span>{catInfo.icon}</span> {catInfo.name} <span className="text-sm text-gray-400">({items.length})</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {items.map(item => (
                    <button key={item.id} onClick={() => openItemModal(item)} className="bg-white border border-gray-200 rounded-xl p-4 text-left hover:border-red-300 hover:shadow-md transition-all">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-red-600 mt-1">{item.category === 'dessert' || item.category === 'special' ? `₱${item.price_home.toLocaleString()}` : `From ₱${item.price_home.toLocaleString()}`}</p>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
          {Object.keys(groupedItems).length === 0 && <div className="text-center py-12 text-gray-500">No items found</div>}
        </div>
      )}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryInfo(selectedItem.category).color}`}>{getCategoryInfo(selectedItem.category).name}</span>
                  <h3 className="text-xl font-semibold text-gray-800 mt-2">{selectedItem.name}</h3>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Size</label>
                <div className="space-y-2">
                  {getAvailableSizes(selectedItem).map(size => {
                    const price = getItemPrice(selectedItem, size.id)
                    return (
                      <button key={size.id} onClick={() => setSelectedSize(size.id)} className={`w-full p-3 rounded-lg border-2 text-left flex justify-between items-center ${selectedSize === size.id ? 'border-red-700 bg-red-50' : 'border-gray-200'}`}>
                        <div><p className="font-medium">{size.name}</p><p className="text-sm text-gray-500">{size.serves}</p></div>
                        <span className="font-semibold text-red-700">₱{price.toLocaleString()}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><Minus size={18} /></button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center"><Plus size={18} /></button>
                </div>
              </div>
              <button onClick={addToCart} className="w-full py-3 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800 flex items-center justify-center gap-2">
                <ShoppingCart size={20} /> Add to Cart - ₱{(getItemPrice(selectedItem, selectedSize) * quantity).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Review Your Order</h2>
      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl"><ShoppingCart className="mx-auto text-gray-300" size={48} /><p className="text-gray-500 mt-2">Your cart is empty</p></div>
      ) : (
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1"><h4 className="font-medium text-gray-800">{item.name}</h4><p className="text-sm text-gray-500">{item.sizeName} • {item.serves}</p><p className="text-red-700 font-medium mt-1">₱{item.price.toLocaleString()} each</p></div>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t">
                <div className="flex items-center gap-3">
                  <button onClick={() => updateCartQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Minus size={14} /></button>
                  <span className="font-medium">{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center"><Plus size={14} /></button>
                </div>
                <span className="font-semibold">₱{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="bg-red-50 rounded-xl p-4 border border-red-100">
            <div className="flex justify-between items-center"><span className="font-semibold text-gray-800">Subtotal</span><span className="text-xl font-bold text-red-700">₱{cartTotal.toLocaleString()}</span></div>
          </div>
        </div>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Delivery Details</h2>
      <div className="space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label><div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={20} /><input type="text" value={orderDetails.customerName} onChange={(e) => setOrderDetails({...orderDetails, customerName: e.target.value})} placeholder="Your full name" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label><div className="relative"><Phone className="absolute left-3 top-3 text-gray-400" size={20} /><input type="tel" value={orderDetails.customerPhone} onChange={(e) => setOrderDetails({...orderDetails, customerPhone: e.target.value})} placeholder="09XX XXX XXXX" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={20} /><input type="email" value={orderDetails.customerEmail} onChange={(e) => setOrderDetails({...orderDetails, customerEmail: e.target.value})} placeholder="email@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address *</label><div className="relative"><MapPin className="absolute left-3 top-3 text-gray-400" size={20} /><textarea value={orderDetails.deliveryAddress} onChange={(e) => setOrderDetails({...orderDetails, deliveryAddress: e.target.value})} placeholder="Complete delivery address" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]" /></div></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date *</label><div className="relative"><Calendar className="absolute left-3 top-3 text-gray-400" size={20} /><input type="date" value={orderDetails.deliveryDate} onChange={(e) => setOrderDetails({...orderDetails, deliveryDate: e.target.value})} min={getTodayString()} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label><div className="relative"><Clock className="absolute left-3 top-3 text-gray-400" size={20} /><input type="time" value={orderDetails.deliveryTime} onChange={(e) => setOrderDetails({...orderDetails, deliveryTime: e.target.value})} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label><textarea value={orderDetails.specialInstructions} onChange={(e) => setOrderDetails({...orderDetails, specialInstructions: e.target.value})} placeholder="Any special requests..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px]" /></div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Confirm Order</h2>
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-red-200">
          <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">RC</div>
          <div><p className="font-semibold text-gray-800">{orderDetails.customerName}</p><p className="text-sm text-gray-500">{orderDetails.customerPhone}</p></div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-600">Delivery Date</span><span className="font-medium">{orderDetails.deliveryDate} {orderDetails.deliveryTime && `at ${orderDetails.deliveryTime}`}</span></div>
          <div className="flex justify-between"><span className="text-gray-600">Address</span><span className="font-medium text-right max-w-[60%]">{orderDetails.deliveryAddress}</span></div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Order Items ({cart.length})</h3>
        <div className="space-y-2">{cart.map(item => (<div key={item.id} className="flex justify-between text-sm"><span className="text-gray-600">{item.name} ({item.sizeName}) ×{item.quantity}</span><span className="font-medium">₱{(item.price * item.quantity).toLocaleString()}</span></div>))}</div>
      </div>
      <div className="bg-red-700 text-white rounded-xl p-5"><div className="flex justify-between items-center"><span className="text-lg font-semibold">Total Amount</span><span className="text-2xl font-bold">₱{cartTotal.toLocaleString()}</span></div></div>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
    </div>
  )

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4]
  const canProceed = () => {
    if (step === 1) return cart.length > 0
    if (step === 2) return cart.length > 0
    if (step === 3) return orderDetails.customerName && orderDetails.customerPhone && orderDetails.deliveryAddress && orderDetails.deliveryDate
    return true
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-6"><h1 className="text-2xl font-bold">Order Food</h1><p className="text-red-200">Step {step} of 4</p></div>
          <div className="flex justify-center gap-2 py-4 bg-gray-50">{[1,2,3,4].map(s => (<div key={s} className={`h-2 rounded-full ${s === step ? 'bg-red-700 w-8' : s < step ? 'bg-red-300 w-3' : 'bg-gray-200 w-3'}`} />))}</div>
          <div className="p-6">{steps[step - 1]()}</div>
          <div className="p-6 pt-0 flex gap-3">
            {step > 1 && <button onClick={() => setStep(s => s - 1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2"><ChevronLeft size={20} /> Back</button>}
            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2">{step === 1 ? `Continue (${cartCount} items)` : 'Continue'} <ChevronRight size={20} /></button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2"><Send size={20} /> {submitting ? 'Submitting...' : 'Place Order'}</button>
            )}
          </div>
        </div>
        {step === 1 && cart.length > 0 && (
          <button onClick={() => setStep(2)} className="fixed bottom-6 right-6 bg-red-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-red-800">
            <ShoppingCart size={20} /><span className="font-semibold">View Cart ({cartCount})</span><span className="bg-white text-red-700 px-2 py-1 rounded-full text-sm font-bold">₱{cartTotal.toLocaleString()}</span>
          </button>
        )}
      </div>
    </div>
  )
}