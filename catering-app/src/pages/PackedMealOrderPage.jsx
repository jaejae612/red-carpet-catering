import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { 
  packedMealMenus, 
  packedSnackMenus,
  calculatePackedMealTotal,
  calculatePackedSnackTotal
} from '../lib/cocktailPackedData'
import { 
  ArrowLeft, Package, Coffee, Plus, Minus, Check, ShoppingCart,
  Calendar, Clock, MapPin, User, Phone, Mail, Truck, Store,
  ChevronDown, ChevronUp, AlertCircle, Info, X
} from 'lucide-react'

export default function PackedMealOrderPage() {
  const { user, profile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('meals') // 'meals' or 'snacks'
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [orderDetails, setOrderDetails] = useState({
    deliveryType: 'delivery', // 'delivery' or 'pickup'
    deliveryDate: '',
    deliveryTime: '',
    deliveryAddress: '',
    customerName: profile?.full_name || '',
    customerPhone: profile?.phone || '',
    customerEmail: user?.email || '',
    specialInstructions: ''
  })

  const menus = activeTab === 'meals' ? packedMealMenus : packedSnackMenus

  const addToCart = (menuId, optionKey, includeSoda = false) => {
    const menu = menus[menuId]
    if (!menu) return

    const existingIndex = cart.findIndex(
      item => item.menuId === menuId && item.optionKey === optionKey && item.includeSoda === includeSoda
    )

    if (existingIndex >= 0) {
      // Update quantity
      setCart(prev => prev.map((item, idx) => 
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      // Add new item
      setCart(prev => [...prev, {
        menuId,
        optionKey,
        menuName: menu.name,
        optionName: menu.options[optionKey].name,
        items: menu.options[optionKey].items,
        price: menu.pricePerPack || menu.pricePerPack,
        includeSoda,
        sodaPrice: menu.sodaUpgrade || 0,
        quantity: 1,
        type: menu.type
      }])
    }
  }

  const updateCartQuantity = (index, newQty) => {
    if (newQty < 1) {
      removeFromCart(index)
      return
    }
    setCart(prev => prev.map((item, idx) => 
      idx === index ? { ...item, quantity: newQty } : item
    ))
  }

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, idx) => idx !== index))
  }

  const getItemTotal = (item) => {
    const basePrice = item.price
    const sodaPrice = item.includeSoda ? item.sodaPrice : 0
    return (basePrice + sodaPrice) * item.quantity
  }

  const cartTotal = cart.reduce((sum, item) => sum + getItemTotal(item), 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleSubmit = async () => {
    if (cart.length === 0) {
      setError('Please add items to your cart')
      return
    }

    if (!orderDetails.deliveryDate || !orderDetails.deliveryTime) {
      setError('Please select delivery/pickup date and time')
      return
    }

    if (orderDetails.deliveryType === 'delivery' && !orderDetails.deliveryAddress) {
      setError('Please enter delivery address')
      return
    }

    setLoading(true)
    setError('')

    try {
      const orderData = {
        user_id: user?.id,
        order_type: 'packed_meal',
        customer_name: orderDetails.customerName || profile?.full_name,
        customer_phone: orderDetails.customerPhone,
        customer_email: orderDetails.customerEmail || user?.email,
        delivery_type: orderDetails.deliveryType,
        delivery_date: orderDetails.deliveryDate,
        delivery_time: orderDetails.deliveryTime,
        delivery_address: orderDetails.deliveryType === 'delivery' ? orderDetails.deliveryAddress : null,
        items: cart.map(item => ({
          menu: item.menuName,
          option: item.optionName,
          items: item.items,
          quantity: item.quantity,
          includeSoda: item.includeSoda,
          unitPrice: item.price + (item.includeSoda ? item.sodaPrice : 0),
          subtotal: getItemTotal(item)
        })),
        special_instructions: orderDetails.specialInstructions,
        total_amount: cartTotal,
        status: 'pending',
        payment_status: 'unpaid'
      }

      const { error: insertError } = await supabase
        .from('food_orders')
        .insert([orderData])

      if (insertError) throw insertError

      navigate('/my-orders', {
        state: {
          success: true,
          message: 'Packed meal order submitted successfully!'
        }
      })
    } catch (err) {
      console.error('Order error:', err)
      setError(err.message || 'Failed to submit order')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={24} />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Packed Meals & Snacks</h1>
                <p className="text-sm text-gray-500">Individual meal boxes for any occasion</p>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-red-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-800"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setActiveTab('meals')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'meals'
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Package size={18} />
              Packed Meals
            </button>
            <button
              onClick={() => setActiveTab('snacks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'snacks'
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Coffee size={18} />
              Packed Snacks
            </button>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {Object.values(menus).map((menu) => {
            const isExpanded = expandedMenu === menu.id

            return (
              <div key={menu.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Menu Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedMenu(isExpanded ? null : menu.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{menu.name}</h3>
                      <p className="text-gray-500">
                        {Object.keys(menu.options).length} menu options • {menu.includes}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-700">₱{menu.pricePerPack}</p>
                        <p className="text-sm text-gray-500">per pack</p>
                      </div>
                      {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Options */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(menu.options).map(([key, option]) => (
                        <div key={key} className="bg-white rounded-xl p-4 shadow-sm">
                          <h4 className="font-bold text-gray-800 mb-3">{option.name}</h4>
                          <ul className="space-y-1 mb-4">
                            {option.items.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-red-500">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>

                          <div className="space-y-2">
                            <button
                              onClick={() => addToCart(menu.id, key, false)}
                              className="w-full py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 flex items-center justify-center gap-2"
                            >
                              <Plus size={18} />
                              Add to Cart - ₱{menu.pricePerPack}
                            </button>

                            {menu.sodaUpgrade && (
                              <button
                                onClick={() => addToCart(menu.id, key, true)}
                                className="w-full py-2 border-2 border-red-700 text-red-700 rounded-lg font-medium hover:bg-red-50 flex items-center justify-center gap-2"
                              >
                                <Plus size={18} />
                                With Soda - ₱{menu.pricePerPack + menu.sodaUpgrade}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Order Information</p>
              <ul className="mt-1 space-y-1">
                <li>• All packed meals include tetra pack juice or bottled water</li>
                <li>• Upgrade to canned soda for +₱60 per pack (meals only)</li>
                <li>• Minimum lead time: 24 hours before delivery/pickup</li>
                <li>• Bulk orders (50+ packs) may qualify for discount</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCart(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto">
            {/* Cart Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Your Order</h2>
              <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">{item.menuName}</p>
                          <p className="text-sm text-gray-500">{item.optionName}</p>
                          {item.includeSoda && (
                            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              With Soda
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(index, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <p className="font-bold text-red-700">₱{getItemTotal(item).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <>
                  {/* Delivery Details */}
                  <div className="mt-6 space-y-4">
                    <h3 className="font-bold text-gray-800">Delivery Details</h3>

                    {/* Delivery Type */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setOrderDetails(p => ({ ...p, deliveryType: 'delivery' }))}
                        className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                          orderDetails.deliveryType === 'delivery'
                            ? 'border-red-700 bg-red-50 text-red-700'
                            : 'border-gray-200'
                        }`}
                      >
                        <Truck size={18} />
                        Delivery
                      </button>
                      <button
                        onClick={() => setOrderDetails(p => ({ ...p, deliveryType: 'pickup' }))}
                        className={`p-3 rounded-xl border-2 flex items-center justify-center gap-2 ${
                          orderDetails.deliveryType === 'pickup'
                            ? 'border-red-700 bg-red-50 text-red-700'
                            : 'border-gray-200'
                        }`}
                      >
                        <Store size={18} />
                        Pickup
                      </button>
                    </div>

                    {/* Date & Time */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input
                          type="date"
                          value={orderDetails.deliveryDate}
                          onChange={(e) => setOrderDetails(p => ({ ...p, deliveryDate: e.target.value }))}
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                        <input
                          type="time"
                          value={orderDetails.deliveryTime}
                          onChange={(e) => setOrderDetails(p => ({ ...p, deliveryTime: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        />
                      </div>
                    </div>

                    {/* Address (for delivery) */}
                    {orderDetails.deliveryType === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          <MapPin size={14} className="inline mr-1" />
                          Delivery Address *
                        </label>
                        <textarea
                          value={orderDetails.deliveryAddress}
                          onChange={(e) => setOrderDetails(p => ({ ...p, deliveryAddress: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                          rows={2}
                          placeholder="Complete address..."
                        />
                      </div>
                    )}

                    {/* Customer Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <User size={14} className="inline mr-1" />
                        Name
                      </label>
                      <input
                        type="text"
                        value={orderDetails.customerName}
                        onChange={(e) => setOrderDetails(p => ({ ...p, customerName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <Phone size={14} className="inline mr-1" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={orderDetails.customerPhone}
                        onChange={(e) => setOrderDetails(p => ({ ...p, customerPhone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        placeholder="09XX XXX XXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                      <textarea
                        value={orderDetails.specialInstructions}
                        onChange={(e) => setOrderDetails(p => ({ ...p, specialInstructions: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                        rows={2}
                        placeholder="Any special requests..."
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                      <AlertCircle className="text-red-600" size={18} />
                      <p className="text-sm text-red-800">{error}</p>
                    </div>
                  )}

                  {/* Total & Submit */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-medium text-gray-700">Total</span>
                      <span className="text-2xl font-bold text-red-700">₱{cartTotal.toLocaleString()}</span>
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={loading || cart.length === 0}
                      className="w-full py-3 bg-red-700 text-white rounded-xl font-bold hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? 'Submitting...' : 'Place Order'}
                      <Check size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Cart Button (Mobile) */}
      {cartCount > 0 && !showCart && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden">
          <button
            onClick={() => setShowCart(true)}
            className="w-full py-4 bg-red-700 text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-3"
          >
            <ShoppingCart size={20} />
            View Cart ({cartCount} items) - ₱{cartTotal.toLocaleString()}
          </button>
        </div>
      )}
    </div>
  )
}
