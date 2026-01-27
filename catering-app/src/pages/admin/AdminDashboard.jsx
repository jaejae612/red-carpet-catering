import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ClipboardList, Users, Package, Calendar, Clock, ShoppingBag, UtensilsCrossed } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0, totalStaff: 0, totalEquipment: 0, totalFoodOrders: 0, pendingFoodOrders: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentFoodOrders, setRecentFoodOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [{ count: total }, { count: pending }, { count: staff }, { count: equip }, { data: recent }, { count: foodTotal }, { count: foodPending }, { data: recentFood }] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('staff').select('*', { count: 'exact', head: true }),
        supabase.from('equipment').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('food_orders').select('*', { count: 'exact', head: true }),
        supabase.from('food_orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('food_orders').select('*').order('created_at', { ascending: false }).limit(5)
      ])
      setStats({ totalBookings: total || 0, pendingBookings: pending || 0, totalStaff: staff || 0, totalEquipment: equip || 0, totalFoodOrders: foodTotal || 0, pendingFoodOrders: foodPending || 0 })
      setRecentBookings(recent || [])
      setRecentFoodOrders(recentFood || [])
    } catch (error) { console.error('Error:', error) } finally { setLoading(false) }
  }

  const getStatusColor = (status) => ({ pending: 'bg-amber-100 text-amber-700', confirmed: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', preparing: 'bg-purple-100 text-purple-700', ready: 'bg-green-100 text-green-700', delivered: 'bg-gray-100 text-gray-700' }[status] || 'bg-gray-100 text-gray-700')

  return (
    <div className="py-8 px-4"><div className="max-w-7xl mx-auto">
      <div className="mb-8"><h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1><p className="text-gray-500">Manage bookings, food orders, staff, and equipment</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Link to="/admin/bookings" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"><ClipboardList className="text-red-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalBookings}</span></div><p className="text-gray-600 font-medium">Catering</p></Link>
        <Link to="/admin/bookings" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center"><Clock className="text-amber-700" size={24} /></div><span className="text-3xl font-bold text-amber-600">{stats.pendingBookings}</span></div><p className="text-gray-600 font-medium">Pending</p></Link>
        <Link to="/admin/food-orders" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"><ShoppingBag className="text-orange-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalFoodOrders}</span></div><p className="text-gray-600 font-medium">Food Orders</p></Link>
        <Link to="/admin/food-orders" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"><Clock className="text-yellow-700" size={24} /></div><span className="text-3xl font-bold text-yellow-600">{stats.pendingFoodOrders}</span></div><p className="text-gray-600 font-medium">Pending Food</p></Link>
        <Link to="/admin/staff" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Users className="text-blue-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalStaff}</span></div><p className="text-gray-600 font-medium">Staff</p></Link>
        <Link to="/admin/equipment" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Package className="text-green-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalEquipment}</span></div><p className="text-gray-600 font-medium">Equipment</p></Link>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <Link to="/admin/bookings" className="bg-gradient-to-br from-red-700 to-red-800 text-white rounded-2xl p-6 hover:shadow-lg"><ClipboardList size={32} className="mb-3" /><h3 className="font-bold text-lg">Catering Bookings</h3><p className="text-red-200 text-sm">Manage events</p></Link>
        <Link to="/admin/food-orders" className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-6 hover:shadow-lg"><ShoppingBag size={32} className="mb-3" /><h3 className="font-bold text-lg">Food Orders</h3><p className="text-orange-200 text-sm">Delivery orders</p></Link>
        <Link to="/admin/food-items" className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-6 hover:shadow-lg"><UtensilsCrossed size={32} className="mb-3" /><h3 className="font-bold text-lg">Food Menu</h3><p className="text-amber-200 text-sm">Manage items</p></Link>
        <Link to="/admin/staff" className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 hover:shadow-lg"><Users size={32} className="mb-3" /><h3 className="font-bold text-lg">Manage Staff</h3><p className="text-blue-200 text-sm">Add, edit, availability</p></Link>
        <Link to="/admin/equipment" className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-6 hover:shadow-lg"><Package size={32} className="mb-3" /><h3 className="font-bold text-lg">Equipment</h3><p className="text-green-200 text-sm">Tables, chairs</p></Link>
        <Link to="/admin/menu" className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-6 hover:shadow-lg"><UtensilsCrossed size={32} className="mb-3" /><h3 className="font-bold text-lg">Catering Menu</h3><p className="text-purple-200 text-sm">Dishes & packages</p></Link>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Catering Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6"><div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-800">Recent Catering</h2><Link to="/admin/bookings" className="text-red-700 font-medium hover:underline">View All</Link></div>
          {recentBookings.length === 0 ? <p className="text-gray-500 text-center py-8">No bookings yet</p> : (
            <div className="space-y-4">{recentBookings.map(booking => (
              <Link key={booking.id} to="/admin/bookings" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                <div className="flex justify-between items-start"><div><div className="flex items-center gap-2 mb-1"><span className="font-semibold text-gray-800">{booking.customer_name}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>{booking.status}</span></div><p className="text-sm text-gray-500">{booking.menu_package} • {booking.number_of_pax} pax</p><p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Calendar size={14} />{booking.event_date}</p></div><p className="font-bold text-red-700">₱{booking.total_amount?.toLocaleString()}</p></div>
              </Link>
            ))}</div>
          )}
        </div>

        {/* Recent Food Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6"><div className="flex justify-between items-center mb-6"><h2 className="text-xl font-bold text-gray-800">Recent Food Orders</h2><Link to="/admin/food-orders" className="text-orange-600 font-medium hover:underline">View All</Link></div>
          {recentFoodOrders.length === 0 ? <p className="text-gray-500 text-center py-8">No food orders yet</p> : (
            <div className="space-y-4">{recentFoodOrders.map(order => (
              <Link key={order.id} to="/admin/food-orders" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100">
                <div className="flex justify-between items-start"><div><div className="flex items-center gap-2 mb-1"><span className="font-semibold text-gray-800">{order.customer_name}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span></div><p className="text-sm text-gray-500">{order.items?.length || 0} items</p><p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><Calendar size={14} />{order.delivery_date}</p></div><p className="font-bold text-orange-600">₱{order.total_amount?.toLocaleString()}</p></div>
              </Link>
            ))}</div>
          )}
        </div>
      </div>
    </div></div>
  )
}