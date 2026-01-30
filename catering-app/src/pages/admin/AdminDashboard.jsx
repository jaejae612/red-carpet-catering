import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ClipboardList, Users, Package, Calendar, Clock, ShoppingBag, Printer, BarChart3 } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0, totalStaff: 0, totalEquipment: 0, totalFoodOrders: 0, pendingFoodOrders: 0, todayBookings: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentFoodOrders, setRecentFoodOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    const today = new Date().toISOString().split('T')[0]
    try {
      const [{ count: total }, { count: pending }, { count: staff }, { count: equip }, { data: recent }, { count: foodTotal }, { count: foodPending }, { data: recentFood }, { count: todayCount }] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('staff').select('*', { count: 'exact', head: true }),
        supabase.from('equipment').select('*', { count: 'exact', head: true }),
        supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('food_orders').select('*', { count: 'exact', head: true }),
        supabase.from('food_orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('food_orders').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('event_date', today).neq('status', 'cancelled')
      ])
      setStats({ totalBookings: total || 0, pendingBookings: pending || 0, totalStaff: staff || 0, totalEquipment: equip || 0, totalFoodOrders: foodTotal || 0, pendingFoodOrders: foodPending || 0, todayBookings: todayCount || 0 })
      setRecentBookings(recent || [])
      setRecentFoodOrders(recentFood || [])
    } catch (error) { console.error('Error:', error) } finally { setLoading(false) }
  }

  const getStatusColor = (status) => ({ pending: 'bg-amber-100 text-amber-700', confirmed: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', preparing: 'bg-purple-100 text-purple-700', ready: 'bg-green-100 text-green-700', delivered: 'bg-gray-100 text-gray-700' }[status] || 'bg-gray-100 text-gray-700')

  return (
    <div>
      <div className="flex justify-between items-start mb-8">
        <div><h1 className="text-3xl font-bold text-gray-800">Dashboard</h1><p className="text-gray-500">Overview of your business</p></div>
        <div className="flex gap-2">
          <Link to="/admin/stats" className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-purple-700">
            <BarChart3 size={20} />
            Analytics
          </Link>
          <Link to="/admin/daily-summary" className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-800">
            <Printer size={20} />
            Print Summary
          </Link>
        </div>
      </div>

      {/* Today's Bookings Alert */}
      {stats.todayBookings > 0 && (
        <Link to="/admin/daily-summary" className="block mb-6 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-white hover:from-red-700 hover:to-red-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar size={24} />
              <div>
                <p className="font-bold text-lg">Today's Bookings: {stats.todayBookings}</p>
                <p className="text-red-200 text-sm">Click to view and print daily summary</p>
              </div>
            </div>
            <Printer size={24} />
          </div>
        </Link>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Link to="/admin/bookings" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center"><ClipboardList className="text-red-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalBookings}</span></div><p className="text-gray-600 font-medium">Catering</p></Link>
        <Link to="/admin/bookings" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center"><Clock className="text-amber-700" size={24} /></div><span className="text-3xl font-bold text-amber-600">{stats.pendingBookings}</span></div><p className="text-gray-600 font-medium">Pending</p></Link>
        <Link to="/admin/food-orders" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center"><ShoppingBag className="text-orange-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalFoodOrders}</span></div><p className="text-gray-600 font-medium">Food Orders</p></Link>
        <Link to="/admin/food-orders" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"><Clock className="text-yellow-700" size={24} /></div><span className="text-3xl font-bold text-yellow-600">{stats.pendingFoodOrders}</span></div><p className="text-gray-600 font-medium">Pending Food</p></Link>
        <Link to="/admin/staff" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><Users className="text-blue-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalStaff}</span></div><p className="text-gray-600 font-medium">Staff</p></Link>
        <Link to="/admin/equipment" className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl"><div className="flex items-center justify-between mb-4"><div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><Package className="text-green-700" size={24} /></div><span className="text-3xl font-bold text-gray-800">{stats.totalEquipment}</span></div><p className="text-gray-600 font-medium">Equipment</p></Link>
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
    </div>
  )
}
