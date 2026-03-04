import React, { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { menuPackages } from '../lib/menuData'
import { Calendar, MapPin, Users, Clock, ChevronDown, ChevronUp, Plus, ShoppingBag, ClipboardList, Truck, Package, FileText, RotateCw, Star, Timer } from 'lucide-react'
import BookingReceipt from '../components/BookingReceipt'

// Read-only payment view for customers
function CustomerPaymentSummary({ bookingId, foodOrderId, totalAmount, paymentStatus }) {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      let query = supabase.from('payments').select('*').order('payment_date', { ascending: true })
      if (bookingId) query = query.eq('booking_id', bookingId)
      if (foodOrderId) query = query.eq('food_order_id', foodOrderId)
      const { data } = await query
      setPayments(data || [])
      setLoading(false)
    }
    fetchPayments()
  }, [bookingId, foodOrderId])

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const balance = (totalAmount || 0) - totalPaid

  const statusLabel = { unpaid: '🔴 Unpaid', deposit_paid: '🟡 Deposit Paid', fully_paid: '🟢 Fully Paid', refund_pending: '🟠 Refund Pending', refunded: '⚪ Refunded' }
  const methodLabel = { gcash: '📱 GCash', maya: '📱 Maya', bank_transfer: '🏦 Bank Transfer', cash: '💵 Cash', card: '💳 Card', check: '🧾 Check' }

  if (loading) return null

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h4 className="font-semibold text-gray-700 mb-3">💰 Payment</h4>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">Total</p>
          <p className="font-bold text-gray-800">₱{(totalAmount || 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">Paid</p>
          <p className="font-bold text-green-600">₱{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">{balance > 0 ? 'Balance' : 'Status'}</p>
          <p className={`font-bold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {balance > 0 ? `₱${balance.toLocaleString()}` : (statusLabel[paymentStatus] || '—')}
          </p>
        </div>
      </div>
      {payments.length > 0 && (
        <div className="space-y-1.5">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{new Date(p.payment_date).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}</span>
                <span className="text-gray-400">•</span>
                <span>{methodLabel[p.method] || p.method}</span>
                {p.notes && <span className="text-gray-400 text-xs">— {p.notes}</span>}
              </div>
              <span className="font-medium text-green-700">₱{Number(p.amount).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
      {payments.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-2">No payments recorded yet</p>
      )}
    </div>
  )
}

// Helpers
const getDaysUntil = (dateStr) => {
  const event = new Date(dateStr)
  const today = new Date()
  event.setHours(0,0,0,0)
  today.setHours(0,0,0,0)
  return Math.ceil((event - today) / (1000 * 60 * 60 * 24))
}

const CountdownBadge = ({ dateStr, status }) => {
  if (status === 'cancelled' || status === 'delivered') return null
  const days = getDaysUntil(dateStr)
  if (days < 0 && status !== 'completed') return <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs flex items-center gap-1"><Timer size={12} /> Past</span>
  if (status === 'completed') return null
  if (days === 0) return <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1 animate-pulse"><Timer size={12} /> Today!</span>
  if (days === 1) return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1"><Timer size={12} /> Tomorrow</span>
  if (days <= 7) return <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium flex items-center gap-1"><Timer size={12} /> {days} days</span>
  return <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs flex items-center gap-1"><Timer size={12} /> {days} days</span>
}

// Review component
function ReviewForm({ type, orderId, existingRating, existingComment, onSaved }) {
  const [rating, setRating] = useState(existingRating || 0)
  const [comment, setComment] = useState(existingComment || '')
  const [hover, setHover] = useState(0)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(!!existingRating)

  if (!showForm) return (
    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium text-sm mt-3">
      <Star size={16} /> Leave a Review
    </button>
  )

  const handleSave = async () => {
    if (rating === 0) return
    setSaving(true)
    const table = type === 'booking' ? 'bookings' : 'food_orders'
    await supabase.from(table).update({
      review_rating: rating,
      review_comment: comment,
      review_date: new Date().toISOString()
    }).eq('id', orderId)
    setSaving(false)
    onSaved?.(rating, comment)
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><Star size={16} className="text-amber-500" /> {existingRating ? 'Your Review' : 'Rate Your Experience'}</h4>
      <div className="flex items-center gap-1 mb-2">
        {[1,2,3,4,5].map(star => (
          <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
            className="p-0.5"
          >
            <Star size={24} className={`${(hover || rating) >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} transition-colors`} />
          </button>
        ))}
        <span className="text-sm text-gray-500 ml-2">{rating > 0 ? ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating] : ''}</span>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Tell us about your experience (optional)..."
        rows={2}
        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 mb-2"
      />
      <button onClick={handleSave} disabled={saving || rating === 0}
        className="px-4 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 disabled:opacity-50"
      >
        {saving ? 'Saving...' : existingRating ? 'Update Review' : 'Submit Review'}
      </button>
    </div>
  )
}

export default function MyOrdersPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'catering')
  const [bookings, setBookings] = useState([])
  const [foodOrders, setFoodOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [receiptBooking, setReceiptBooking] = useState(null)

  useEffect(() => { fetchOrders() }, [user])
  useEffect(() => { setSearchParams({ tab: activeTab }) }, [activeTab])

  const fetchOrders = async () => {
    try {
      const [{ data: bookingsData }, { data: foodData }] = await Promise.all([
        supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('food_orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
      ])
      setBookings(bookingsData || [])
      setFoodOrders(foodData || [])
    } catch (error) { console.error('Error:', error) } finally { setLoading(false) }
  }

  const getStatusColor = (status) => {
    const colors = { 
      pending: 'bg-amber-100 text-amber-700', 
      confirmed: 'bg-blue-100 text-blue-700', 
      completed: 'bg-green-100 text-green-700', 
      cancelled: 'bg-red-100 text-red-700',
      preparing: 'bg-purple-100 text-purple-700',
      ready: 'bg-green-100 text-green-700',
      delivered: 'bg-gray-100 text-gray-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const handleRebook = (order) => {
    const rebookData = {
      menu_package: order.menu_package,
      menu_option: order.menu_option,
      number_of_pax: order.number_of_pax,
      venue: order.venue,
      venue_address: order.venue_address,
      motif: order.motif,
      motif_type: order.motif_type,
      motif_preset: order.motif_preset,
      motif_colors: order.motif_colors,
      occasion: order.occasion,
      menu_items: order.menu_items,
      custom_dishes: order.custom_dishes,
      free_drink: order.free_drink,
      drink_add_ons: order.drink_add_ons,
      special_requests: order.special_requests,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_email: order.customer_email,
    }
    sessionStorage.setItem('duplicateBooking', JSON.stringify(rebookData))
    navigate('/book?duplicate=true')
  }

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div></div>

  const renderCateringOrders = () => (
    <>
      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><ClipboardList size={40} className="text-gray-400" /></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No catering bookings yet</h2>
          <Link to="/book" className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-800">Book Catering</Link>
        </div>
      ) : (
        <div className="space-y-4">{bookings.map(order => {
          const pkg = menuPackages[order.menu_package]
          const isExpanded = expandedOrder === order.id
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                    <span className="text-gray-500 text-sm">#{order.id.slice(0, 8)}</span>
                    <CountdownBadge dateStr={order.event_date} status={order.status} />
                  </div>
                  <h3 className="font-semibold text-gray-800">{pkg?.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={14} />{order.event_date}</span>
                    <span className="flex items-center gap-1"><Users size={14} />{order.number_of_pax} pax</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-700 text-lg">₱{order.total_amount?.toLocaleString()}</p>
                  {isExpanded ? <ChevronUp size={20} className="text-gray-400 ml-auto mt-2" /> : <ChevronDown size={20} className="text-gray-400 ml-auto mt-2" />}
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Event Details</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-start gap-2"><MapPin size={16} className="text-gray-400 mt-0.5" />{order.venue}</p>
                        <p className="flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{order.event_date}</p>
                        <p className="flex items-center gap-2"><Clock size={16} className="text-gray-400" />{order.event_time}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3">Order Info</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-500">Package:</span> {pkg?.name}</p>
                        <p><span className="text-gray-500">Menu:</span> {order.menu_option}</p>
                        <p><span className="text-gray-500">Guests:</span> {order.number_of_pax} pax</p>
                        {order.motif && <p><span className="text-gray-500">Motif:</span> {order.motif}</p>}
                      </div>
                    </div>
                  </div>
                  {order.special_requests && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Special Requests</h4>
                      <p className="text-sm text-gray-600">{order.special_requests}</p>
                    </div>
                  )}
                  {/* Deposit Calculator */}
                  {order.status !== 'cancelled' && order.payment_status !== 'fully_paid' && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">💵 Deposit Info</h4>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">50% Deposit Required:</span>
                          <span className="font-bold text-amber-700">₱{Math.ceil((order.total_amount || 0) * 0.5).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Balance on Event Day:</span>
                          <span className="font-bold text-gray-700">₱{Math.floor((order.total_amount || 0) * 0.5).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-amber-600 mt-2">Deposit secures your booking date. Balance is due on the event day.</p>
                      </div>
                    </div>
                  )}
                  {/* Payment Summary */}
                  <CustomerPaymentSummary bookingId={order.id} totalAmount={order.total_amount} paymentStatus={order.payment_status} />
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4 flex-wrap">
                    <button
                      onClick={(e) => { e.stopPropagation(); setReceiptBooking(order) }}
                      className="flex items-center gap-2 text-red-700 hover:text-red-800 font-medium"
                    >
                      <FileText size={18} /> View Receipt
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleRebook(order) }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <RotateCw size={18} /> Rebook Similar
                    </button>
                  </div>
                  {/* Review (only for completed bookings) */}
                  {order.status === 'completed' && (
                    <ReviewForm
                      type="booking"
                      orderId={order.id}
                      existingRating={order.review_rating}
                      existingComment={order.review_comment}
                      onSaved={(r, c) => setBookings(prev => prev.map(b => b.id === order.id ? { ...b, review_rating: r, review_comment: c } : b))}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}</div>
      )}
    </>
  )

  const renderFoodOrders = () => (
    <>
      {foodOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><ShoppingBag size={40} className="text-gray-400" /></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No food orders yet</h2>
          <Link to="/order-food" className="inline-block bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600">Order Food</Link>
        </div>
      ) : (
        <div className="space-y-4">{foodOrders.map(order => {
          const isExpanded = expandedOrder === order.id
          return (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="w-full p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                    <span className="text-gray-500 text-sm">#{order.id.slice(0, 8)}</span>
                    {order.delivery_date && <CountdownBadge dateStr={order.delivery_date} status={order.status} />}
                  </div>
                  <h3 className="font-semibold text-gray-800">{order.items?.length || 0} items</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Calendar size={14} />{order.delivery_date}</span>
                    {order.delivery_time && <span className="flex items-center gap-1"><Clock size={14} />{order.delivery_time}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-orange-600 text-lg">₱{order.total_amount?.toLocaleString()}</p>
                  {isExpanded ? <ChevronUp size={20} className="text-gray-400 ml-auto mt-2" /> : <ChevronDown size={20} className="text-gray-400 ml-auto mt-2" />}
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Truck size={16} /> Delivery Details</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-start gap-2"><MapPin size={16} className="text-gray-400 mt-0.5" />{order.delivery_address}</p>
                        <p className="flex items-center gap-2"><Calendar size={16} className="text-gray-400" />{order.delivery_date}</p>
                        {order.delivery_time && <p className="flex items-center gap-2"><Clock size={16} className="text-gray-400" />{order.delivery_time}</p>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><Package size={16} /> Order Items</h4>
                      <div className="space-y-2 text-sm">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{item.name} × {item.quantity}</span>
                            <span className="font-medium">₱{item.subtotal?.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {order.special_instructions && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-700 mb-2">Special Instructions</h4>
                      <p className="text-sm text-gray-600">{order.special_instructions}</p>
                    </div>
                  )}
                  {/* Payment Summary */}
                  <CustomerPaymentSummary foodOrderId={order.id} totalAmount={order.total_amount} paymentStatus={order.payment_status} />
                  {/* Review (only for delivered orders) */}
                  {order.status === 'delivered' && (
                    <ReviewForm
                      type="food_order"
                      orderId={order.id}
                      existingRating={order.review_rating}
                      existingComment={order.review_comment}
                      onSaved={(r, c) => setFoodOrders(prev => prev.map(o => o.id === order.id ? { ...o, review_rating: r, review_comment: c } : o))}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}</div>
      )}
    </>
  )

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-500">Track your orders and bookings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setActiveTab('catering'); setExpandedOrder(null); }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'catering' 
                ? 'bg-red-700 text-white' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ClipboardList size={20} /> Catering ({bookings.length})
          </button>
          <button
            onClick={() => { setActiveTab('food'); setExpandedOrder(null); }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'food' 
                ? 'bg-orange-500 text-white' 
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <ShoppingBag size={20} /> Food Orders ({foodOrders.length})
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3 mb-6">
          <Link to="/book" className="flex-1 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-medium hover:bg-red-100 flex items-center justify-center gap-2">
            <Plus size={18} /> Book Catering
          </Link>
          <Link to="/order-food" className="flex-1 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-3 rounded-xl font-medium hover:bg-orange-100 flex items-center justify-center gap-2">
            <Plus size={18} /> Order Food
          </Link>
        </div>

        {/* Content */}
        {activeTab === 'catering' ? renderCateringOrders() : renderFoodOrders()}
      </div>

      {/* Receipt Modal */}
      {receiptBooking && (
        <BookingReceipt booking={receiptBooking} onClose={() => setReceiptBooking(null)} />
      )}
    </div>
  )
}