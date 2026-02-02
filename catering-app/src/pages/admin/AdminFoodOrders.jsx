import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { ORDER_STATUSES, getStatusColor, getStatusName } from '../../lib/foodOrderData'
import { Package, Search, Calendar, Phone, MapPin, Clock, ChevronDown, ChevronUp, X, ShoppingBag, Coffee, Truck, Store } from 'lucide-react'

export default function AdminFoodOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all') // 'all', 'food', 'packed'
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

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
    const { error } = await supabase
      .from('food_orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId)
    
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    }
  }

  // Separate order types
  const regularFoodOrders = orders.filter(o => !o.order_type || o.order_type === 'food')
  const packedMealOrders = orders.filter(o => o.order_type === 'packed_meal')

  const filteredOrders = orders.filter(order => {
    // Type filter
    if (typeFilter === 'food' && order.order_type === 'packed_meal') return false
    if (typeFilter === 'packed' && order.order_type !== 'packed_meal') return false
    
    // Status filter
    const matchesFilter = filter === 'all' || order.status === filter
    
    // Search
    const matchesSearch = !searchQuery || 
      order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_phone?.includes(searchQuery)
    
    return matchesFilter && matchesSearch
  })

  const getOrderStats = () => {
    const today = new Date().toISOString().split('T')[0]
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      todayDelivery: orders.filter(o => o.delivery_date === today && o.status !== 'delivered' && o.status !== 'cancelled').length,
      totalRevenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + (o.total_amount || 0), 0),
      foodOrders: regularFoodOrders.length,
      packedOrders: packedMealOrders.length
    }
  }

  const stats = getOrderStats()

  const isPackedMeal = (order) => order.order_type === 'packed_meal'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Food Orders</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 shadow-sm border border-orange-200">
          <p className="text-orange-700 text-sm">Food Orders</p>
          <p className="text-2xl font-bold text-orange-800">{stats.foodOrders}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 shadow-sm border border-emerald-200">
          <p className="text-emerald-700 text-sm">Packed Meals</p>
          <p className="text-2xl font-bold text-emerald-800">{stats.packedOrders}</p>
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

      {/* Type Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTypeFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            typeFilter === 'all' ? 'bg-red-700 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'
          }`}
        >
          All ({orders.length})
        </button>
        <button
          onClick={() => setTypeFilter('food')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            typeFilter === 'food' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'
          }`}
        >
          <ShoppingBag size={18} /> Food Orders ({regularFoodOrders.length})
        </button>
        <button
          onClick={() => setTypeFilter('packed')}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            typeFilter === 'packed' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-50'
          }`}
        >
          <Coffee size={18} /> Packed Meals ({packedMealOrders.length})
        </button>
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
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Package className="mx-auto text-gray-300" size={48} />
          <p className="text-gray-500 mt-2">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const isPacked = isPackedMeal(order)
            const totalPacks = isPacked ? order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0 : 0
            
            return (
              <div 
                key={order.id} 
                className={`bg-white rounded-xl shadow-sm border overflow-hidden ${isPacked ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-orange-500'}`}
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {isPacked ? (
                          <Coffee size={18} className="text-emerald-600" />
                        ) : (
                          <ShoppingBag size={18} className="text-orange-500" />
                        )}
                        <h3 className="font-semibold text-gray-800">{order.customer_name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusName(order.status)}
                        </span>
                        {isPacked && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                            Packed Meal
                          </span>
                        )}
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
                        {isPacked && order.delivery_type && (
                          <span className="flex items-center gap-1">
                            {order.delivery_type === 'pickup' ? <Store size={14} /> : <Truck size={14} />}
                            {order.delivery_type === 'pickup' ? 'Pickup' : 'Delivery'}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${isPacked ? 'text-emerald-600' : 'text-orange-600'}`}>
                        ₱{order.total_amount?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isPacked ? `${totalPacks} packs` : `${order.items?.length || 0} items`}
                      </p>
                      {expandedOrder === order.id ? <ChevronUp className="inline" size={20} /> : <ChevronDown className="inline" size={20} />}
                    </div>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className={`border-t p-4 ${isPacked ? 'bg-emerald-50' : 'bg-orange-50'}`}>
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
                    {order.delivery_address && (
                      <div className="mb-4 p-3 bg-white rounded-lg">
                        <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <MapPin size={16} /> {order.delivery_type === 'pickup' ? 'Pickup Location' : 'Delivery Address'}
                        </p>
                        <p className="text-gray-600 mt-1">{order.delivery_address}</p>
                      </div>
                    )}

                    {/* Order Items */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Order Items</p>
                      <div className="bg-white rounded-lg divide-y">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="p-3 flex justify-between">
                            <div>
                              {isPacked ? (
                                <>
                                  <p className="font-medium text-gray-800">{item.menu}</p>
                                  <p className="text-sm text-gray-500">
                                    {item.option}
                                    {item.includeSoda && <span className="ml-2 text-amber-600">+Soda</span>}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="font-medium text-gray-800">{item.name}</p>
                                  <p className="text-sm text-gray-500">{item.sizeName} • {item.serves}</p>
                                </>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-medium">×{item.quantity}</p>
                              <p className={isPacked ? 'text-emerald-600' : 'text-orange-600'}>
                                ₱{((item.unitPrice || item.price) * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {order.special_instructions && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <p className="text-sm font-medium text-amber-700">Special Instructions</p>
                        <p className="text-amber-800">{order.special_instructions}</p>
                      </div>
                    )}

                    {/* Order Info */}
                    <div className="mt-4 pt-4 border-t text-sm text-gray-500">
                      <p>Order ID: {order.id.slice(0, 8)}...</p>
                      <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
                      {order.customer_email && <p>Email: {order.customer_email}</p>}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
