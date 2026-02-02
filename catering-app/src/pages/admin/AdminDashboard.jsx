import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { TrendingUp, Users, Calendar, Package, Clock, ChevronDown, ChevronRight, Trash2, AlertTriangle } from 'lucide-react'

// Custom Peso Icon component
const PesoSign = ({ className, size = 20 }) => (
  <span className={`font-bold ${className}`} style={{ fontSize: size * 0.9 }}>₱</span>
)

export default function AdminDashboardStats() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [foodOrders, setFoodOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('month')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
  const paidBookings = filteredBookings.filter(b => b.payment_status === 'deposit_paid' || b.payment_status === 'fully_paid')
  const paidFoodOrders = filteredFoodOrders.filter(o => o.payment_status === 'paid' || o.payment_status === 'fully_paid')
  const totalBookingRevenue = paidBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0)
  const totalFoodRevenue = paidFoodOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0)
  const totalRevenue = totalBookingRevenue + totalFoodRevenue
  const totalGuests = filteredBookings.reduce((sum, b) => sum + (b.number_of_pax || 0), 0)
  
  // Booking status counts
  const pendingBookings = filteredBookings.filter(b => b.status === 'pending').length
  const confirmedBookings = filteredBookings.filter(b => b.status === 'confirmed').length
  const completedBookings = filteredBookings.filter(b => b.status === 'completed').length
  const cancelledBookings = filteredBookings.filter(b => b.status === 'cancelled').length
  
  // Payment status counts
  const unpaidBookings = filteredBookings.filter(b => b.payment_status === 'unpaid' || !b.payment_status).length
  const depositPaid = filteredBookings.filter(b => b.payment_status === 'deposit_paid').length
  const fullyPaid = filteredBookings.filter(b => b.payment_status === 'fully_paid').length

  // Navigate to filtered bookings
  const goToBookings = (filterType, filterValue) => {
    navigate(`/admin/bookings?${filterType}=${filterValue}`)
  }

  // Group bookings by month for chart
  const getMonthlyData = () => {
    const months = {}
    const now = new Date()
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      months[key] = { bookings: 0, revenue: 0, guests: 0 }
    }
    
    bookings.forEach(b => {
      const date = new Date(b.event_date || b.created_at)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      if (months[key]) {
        months[key].bookings++
        if (b.payment_status === 'deposit_paid' || b.payment_status === 'fully_paid') {
          months[key].revenue += b.total_amount || 0
        }
        months[key].guests += b.number_of_pax || 0
      }
    })
    
    return Object.entries(months).map(([month, data]) => ({ month, ...data }))
  }

  const monthlyData = getMonthlyData()
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue), 1)

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

  // Delete test bookings (cancelled or with "test" in name)
  const deleteTestBookings = async () => {
    setDeleting(true)
    try {
      // Delete bookings with "test" in customer name (case insensitive)
      const testBookings = bookings.filter(b => 
        b.customer_name?.toLowerCase().includes('test') ||
        b.customer_name?.toLowerCase().includes('sample') ||
        b.status === 'cancelled'
      )
      
      if (testBookings.length === 0) {
        alert('No test bookings found to delete')
        setShowDeleteModal(false)
        setDeleting(false)
        return
      }

      const testIds = testBookings.map(b => b.id)
      
      const { error } = await supabase
        .from('bookings')
        .delete()
        .in('id', testIds)

      if (error) throw error

      alert(`Deleted ${testIds.length} test/cancelled bookings`)
      fetchData()
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Error deleting bookings: ' + error.message)
    } finally {
      setDeleting(false)
    }
  }

  // Clickable status bar component
  const StatusBar = ({ label, count, total, color, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full text-left hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors group"
    >
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600 group-hover:text-gray-800 flex items-center gap-1">
          {label}
          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </span>
        <span className={`font-medium ${color}`}>{count}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full">
        <div 
          className={`h-full rounded-full transition-all ${color.replace('text-', 'bg-')}`} 
          style={{ width: `${(count / Math.max(total, 1)) * 100}%` }}
        />
      </div>
    </button>
  )

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Business analytics and insights</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Delete Test Data Button */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-3 py-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Trash2 size={16} /> Clean Test Data
          </button>
          
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
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <PesoSign className="text-green-600" size={20} />
            </div>
            <span className="text-gray-500 text-sm">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">₱{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">Bookings: ₱{totalBookingRevenue.toLocaleString()}</p>
        </div>

        <Link to="/admin/bookings" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="text-blue-600" size={20} />
            </div>
            <span className="text-gray-500 text-sm">Bookings</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{filteredBookings.length}</p>
          <p className="text-xs text-gray-400 mt-1">{pendingBookings} pending</p>
        </Link>

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

        <Link to="/admin/food-orders" className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="text-orange-600" size={20} />
            </div>
            <span className="text-gray-500 text-sm">Food Orders</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{filteredFoodOrders.length}</p>
          <p className="text-xs text-gray-400 mt-1">₱{totalFoodRevenue.toLocaleString()}</p>
        </Link>
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

        {/* Booking & Payment Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Booking Status</h2>
          <p className="text-xs text-gray-400 mb-3">Click to view filtered bookings</p>
          
          <div className="space-y-4">
            <StatusBar 
              label="Pending" 
              count={pendingBookings} 
              total={filteredBookings.length}
              color="text-amber-600"
              onClick={() => goToBookings('status', 'pending')}
            />
            <StatusBar 
              label="Confirmed" 
              count={confirmedBookings} 
              total={filteredBookings.length}
              color="text-blue-600"
              onClick={() => goToBookings('status', 'confirmed')}
            />
            <StatusBar 
              label="Completed" 
              count={completedBookings} 
              total={filteredBookings.length}
              color="text-green-600"
              onClick={() => goToBookings('status', 'completed')}
            />
            <StatusBar 
              label="Cancelled" 
              count={cancelledBookings} 
              total={filteredBookings.length}
              color="text-gray-500"
              onClick={() => goToBookings('status', 'cancelled')}
            />
          </div>

          <h3 className="text-md font-bold text-gray-800 mt-6 mb-3">Payment Status</h3>
          <div className="space-y-4">
            <StatusBar 
              label="Unpaid" 
              count={unpaidBookings} 
              total={filteredBookings.length}
              color="text-red-600"
              onClick={() => goToBookings('payment', 'unpaid')}
            />
            <StatusBar 
              label="Deposit Paid" 
              count={depositPaid} 
              total={filteredBookings.length}
              color="text-amber-600"
              onClick={() => goToBookings('payment', 'deposit_paid')}
            />
            <StatusBar 
              label="Fully Paid" 
              count={fullyPaid} 
              total={filteredBookings.length}
              color="text-green-600"
              onClick={() => goToBookings('payment', 'fully_paid')}
            />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-6">
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
                <Link 
                  key={i} 
                  to="/admin/bookings"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-800">{booking.customer_name}</p>
                    <p className="text-xs text-gray-500">{booking.venue}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{booking.event_date}</p>
                    <p className="text-xs text-gray-500">{booking.number_of_pax} pax</p>
                  </div>
                </Link>
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Delete Test Bookings?</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4 text-sm text-gray-600">
              <p className="mb-2">This will delete:</p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Bookings with "test" or "sample" in customer name</li>
                <li>All cancelled bookings</li>
              </ul>
              <p className="mt-3 text-amber-600 font-medium">
                Found: {bookings.filter(b => 
                  b.customer_name?.toLowerCase().includes('test') ||
                  b.customer_name?.toLowerCase().includes('sample') ||
                  b.status === 'cancelled'
                ).length} bookings to delete
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteTestBookings}
                disabled={deleting}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
