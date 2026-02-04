import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ORDER_STATUSES, getStatusColor, getStatusName, getCategoryInfo } from '../../lib/foodOrderData'
import { Package, Search, Calendar, Phone, MapPin, Clock, ChevronDown, ChevronUp, X } from 'lucide-react'
import { TableSkeleton } from '../../components/SkeletonLoaders'
import { exportFoodOrdersCSV, exportFoodOrdersPDF } from '../../lib/exportUtils'
import PaymentTracker from '../../components/PaymentTracker'

export default function AdminFoodOrders() {
  const [searchParams] = useSearchParams()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  // Auto-expand order from URL param (e.g., from calendar View link)
  useEffect(() => {
    const orderId = searchParams.get('order')
    if (orderId && orders.length > 0) {
      const found = orders.find(o => o.id === orderId)
      if (found) { setExpandedOrder(orderId); setSelectedOrder(found) }
    }
  }, [orders, searchParams])

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('food_orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error) {
      setOrders(data || [])
    }
    setLoading(false)
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    // Prevent marking delivered if unpaid
    if (newStatus === 'delivered' && (!order.payment_status || order.payment_status === 'unpaid')) {
      const proceed = window.confirm(
        '⚠️ This order has NO payments recorded.\n\n' +
        'Are you sure you want to mark it as delivered without any payment?\n\n' +
        'Tip: Record a payment first using the Payment section below.'
      )
      if (!proceed) return
    }

    // Warn on partial payment
    if (newStatus === 'delivered' && order.payment_status === 'deposit_paid') {
      const balance = (order.total_amount || 0) - (order.amount_paid || 0)
      const proceed = window.confirm(
        `⚠️ This order still has a balance of ₱${balance.toLocaleString()}.\n\n` +
        'Are you sure you want to mark it as delivered?'
      )
      if (!proceed) return
    }

    // Confirm cancellation
    if (newStatus === 'cancelled' && order.status !== 'cancelled') {
      const hasPayments = (order.amount_paid || 0) > 0
      const msg = hasPayments
        ? '⚠️ This order has payments. Cancelling will set payment to "Refund Pending".\n\nContinue?'
        : 'Are you sure you want to cancel this order?'
      if (!window.confirm(msg)) return
    }

    const { error } = await supabase
      .from('food_orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)
    
    if (!error) {
      // Refetch to get trigger-updated payment_status
      const { data } = await supabase.from('food_orders').select('*').eq('id', orderId).single()
      if (data) {
        setOrders(prev => prev.map(o => o.id === orderId ? data : o))
      }
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer_phone.includes(searchQuery)
    return matchesFilter && matchesSearch
  })

  const getOrderStats = () => {
    const today = new Date().toISOString().split('T')[0]
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      todayDelivery: orders.filter(o => o.delivery_date === today && o.status !== 'delivered' && o.status !== 'cancelled').length,
      totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total_amount, 0)
    }
  }

  const stats = getOrderStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Food Orders</h1>
        <div className="flex items-center gap-2">
          <button onClick={() => exportFoodOrdersCSV(filteredOrders)} className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Excel
          </button>
          <button onClick={() => exportFoodOrdersPDF(filteredOrders)} className="flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            PDF
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-xl p-4 shadow-sm border border-yellow-200">
          <p className="text-yellow-700 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm border border-blue-200">
          <p className="text-blue-700 text-sm">Today's Delivery</p>
          <p className="text-2xl font-bold text-blue-800">{stats.todayDelivery}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
          <p className="text-green-700 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-green-800">₱{stats.totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              All
            </button>
            {ORDER_STATUSES.map(status => (
              <button
                key={status.id}
                onClick={() => setFilter(status.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${filter === status.id ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <TableSkeleton rows={6} cols={4} />
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Package className="mx-auto text-gray-300" size={48} />
          <p className="text-gray-500 mt-2">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{order.customer_name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusName(order.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {order.customer_phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {order.delivery_date}
                      </span>
                      {order.delivery_time && (
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {order.delivery_time}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-700">₱{order.total_amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">
                      {order.items?.length || 0} items
                      <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                        { unpaid: 'bg-red-100 text-red-700', deposit_paid: 'bg-amber-100 text-amber-700', fully_paid: 'bg-green-100 text-green-700', refund_pending: 'bg-orange-100 text-orange-700', refunded: 'bg-gray-100 text-gray-600' }[order.payment_status] || 'bg-red-100 text-red-700'
                      }`}>
                        {{ unpaid: 'Unpaid', deposit_paid: 'Partial', fully_paid: 'Paid', refund_pending: 'Refund', refunded: 'Refunded' }[order.payment_status] || 'Unpaid'}
                      </span>
                    </p>
                    {expandedOrder === order.id ? <ChevronUp className="inline" size={20} /> : <ChevronDown className="inline" size={20} />}
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t p-4 bg-gray-50">
                  {/* Status Update */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                    <div className="flex flex-wrap gap-2">
                      {ORDER_STATUSES.map(status => (
                        <button
                          key={status.id}
                          onClick={() => updateOrderStatus(order.id, status.id)}
                          className={`px-3 py-1 rounded-lg text-sm ${order.status === status.id ? status.color + ' ring-2 ring-offset-1 ring-gray-400' : 'bg-white border border-gray-200 hover:bg-gray-100'}`}
                        >
                          {status.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-4 p-3 bg-white rounded-lg">
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin size={16} /> Delivery Address
                    </p>
                    <p className="text-gray-600 mt-1">{order.delivery_address}</p>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Order Items</p>
                    <div className="bg-white rounded-lg divide-y">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="p-3 flex justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.sizeName} • {item.serves}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">×{item.quantity}</p>
                            <p className="text-red-700">₱{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions */}
                  {order.special_instructions && (
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm font-medium text-amber-700">Special Instructions</p>
                      <p className="text-amber-800">{order.special_instructions}</p>
                    </div>
                  )}

                  {/* Payment Tracker */}
                  <div className="mt-4">
                    <PaymentTracker
                      foodOrderId={order.id}
                      totalAmount={order.total_amount || 0}
                      currentStatus={order.payment_status}
                      onStatusChange={() => {
                        supabase.from('food_orders').select('*').eq('id', order.id).single()
                          .then(({ data }) => {
                            if (data) {
                              setOrders(prev => prev.map(o => o.id === data.id ? data : o))
                            }
                          })
                      }}
                    />
                  </div>}

                  {/* Order Info */}
                  <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                    <p>Order ID: {order.id.slice(0, 8)}...</p>
                    <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
                    {order.customer_email && <p>Email: {order.customer_email}</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}