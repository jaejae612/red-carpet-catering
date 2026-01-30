import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, TrendingUp, Users, Calendar, DollarSign, Package, Clock, ChevronDown } from 'lucide-react'

export default function AdminDashboardStats() {
  const [bookings, setBookings] = useState([])
  const [foodOrders, setFoodOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('month') // week, month, year, all

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [bookingsRes, foodOrdersRes] = await Promise.all([
        supabase.from('bookings').select('*').order('created_at', { ascending: false }),
        supabase.from('food_orders').select('*').order('created_at', { ascending: false })
      ])
      setBookings(bookingsRes.data || [])
      setFoodOrders(foodOrdersRes.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter data by time range
  const filterByTimeRange = (data, dateField = 'created_at') => {
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        return data
    }
    
    return data.filter(item => new Date(item[dateField]) >= startDate)
  }

  const filteredBookings = filterByTimeRange(bookings)
  const filteredFoodOrders = filterByTimeRange(foodOrders)

  // Calculate stats
  const totalBookingRevenue = filteredBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0)
  const totalFoodRevenue = filteredFoodOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0)
  const totalRevenue = totalBookingRevenue + totalFoodRevenue
  const totalGuests = filteredBookings.reduce((sum, b) => sum + (b.number_of_pax || 0), 0)
  
  const pendingBookings = filteredBookings.filter(b => b.status === 'pending').length
  const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed').length
  const completedBookings = filteredBookings.filter(b => b.status === 'completed').length
  
  const unpaidBookings = filteredBookings.filter(b => b.payment_status === 'unpaid').length
  const depositPaid = filteredBookings.filter(b => b.payment_status === 'deposit_paid').length
  const fullyPaid = filteredBookings.filter(b => b.payment_status === 'fully_paid').length

  // Group bookings by month for chart
  const getMonthlyData = () => {
    const months = {}
    const now = new Date()
    
    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      months[key] = { bookings: 0, revenue: 0, guests: 0 }
    }
    
    // Fill in data
    bookings.forEach(b => {
      const date = new Date(b.event_date || b.created_at)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      if (months[key]) {
        months[key].bookings++
        months[key].revenue += b.total_amount || 0
        months[key].guests += b.number_of_pax || 0
      }
    })
    
    return Object.entries(months).map(([month, data]) => ({ month, ...data }))
  }

  const monthlyData = getMonthlyData()
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1)
  const maxBookings = Math.max(...monthlyData.map(d => d.bookings), 1)

  // Top customers
  const getTopCustomers = () => {
    const customers = {}
    bookings.forEach(b => {
      const name = b.customer_name || 'Unknown'
      if (!customers[name]) {
        customers[name] = { name, bookings: 0, totalSpent: 0 }
      }
      customers[name].bookings++
      customers[name].totalSpent += b.total_amount || 0
    })
    return Object.values(customers)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5)
  }

  const topCustomers = getTopCustomers()

  // Upcoming bookings
  const upcomingBookings = bookings
    .filter(b => new Date(b.event_date) >= new Date() && b.status !== 'cancelled')
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
    .slice(0, 5)

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500">Business analytics and insights</p>
            </div>
          </div>
          
          {/* Time Range Selector */}
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="year">Last Year</option>
              <option value="all">All Time</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-green-600" size={20} />
              </div>
              <span className="text-gray-500 text-sm">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">₱{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Bookings: ₱{totalBookingRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <span className="text-gray-500 text-sm">Bookings</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{filteredBookings.length}</p>
            <p className="text-xs text-gray-400 mt-1">{pendingBookings} pending</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={20} />
              </div>
              <span className="text-gray-500 text-sm">Total Guests</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{totalGuests.toLocaleString()}</p>
            <p className="text-xs text-gray-400 mt-1">Avg: {filteredBookings.length > 0 ? Math.round(totalGuests / filteredBookings.length) : 0} per event</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="text-orange-600" size={20} />
              </div>
              <span className="text-gray-500 text-sm">Food Orders</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{filteredFoodOrders.length}</p>
            <p className="text-xs text-gray-400 mt-1">₱{totalFoodRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-600" />
              Monthly Revenue
            </h2>
            <div className="space-y-3">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-gray-500">{data.month}</span>
                  <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-end pr-2"
                      style={{ width: `${Math.max((data.revenue / maxRevenue) * 100, 5)}%` }}
                    >
                      {data.revenue > 0 && (
                        <span className="text-xs text-white font-medium">₱{(data.revenue / 1000).toFixed(0)}k</span>
                      )}
                    </div>
                  </div>
                  <span className="w-12 text-sm text-gray-600 text-right">{data.bookings}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2 text-xs text-gray-400">
              <span>Bookings count →</span>
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Booking Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-medium text-amber-600">{pendingBookings}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(pendingBookings / Math.max(filteredBookings.length, 1)) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="font-medium text-blue-600">{confirmedBookings}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(confirmedBookings / Math.max(filteredBookings.length, 1)) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-green-600">{completedBookings}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(completedBookings / Math.max(filteredBookings.length, 1)) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <h3 className="text-md font-bold text-gray-800 mt-6 mb-3">Payment Status</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Unpaid</span>
                  <span className="font-medium text-red-600">{unpaidBookings}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${(unpaidBookings / Math.max(filteredBookings.length, 1)) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Deposit Paid</span>
                  <span className="font-medium text-amber-600">{depositPaid}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(depositPaid / Math.max(filteredBookings.length, 1)) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Fully Paid</span>
                  <span className="font-medium text-green-600">{fullyPaid}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(fullyPaid / Math.max(filteredBookings.length, 1)) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">
          {/* Top Customers */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users size={20} className="text-purple-600" />
              Top Customers
            </h2>
            {topCustomers.length > 0 ? (
              <div className="space-y-3">
                {topCustomers.map((customer, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.bookings} booking{customer.bookings > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">₱{customer.totalSpent.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No customer data yet</p>
            )}
          </div>

          {/* Upcoming Bookings */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Upcoming Bookings
            </h2>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {upcomingBookings.map((booking, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-800">{booking.customer_name}</p>
                      <p className="text-xs text-gray-500">{booking.venue}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{booking.event_date}</p>
                      <p className="text-xs text-gray-500">{booking.number_of_pax} pax</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming bookings</p>
            )}
            <Link to="/admin/bookings" className="block text-center text-red-700 font-medium mt-4 hover:text-red-800">
              View All Bookings →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
