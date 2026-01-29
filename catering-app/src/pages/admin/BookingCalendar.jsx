import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { menuPackages } from '../../lib/menuData'
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Phone, Clock, X, Printer } from 'lucide-react'

export default function BookingCalendar() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [dayBookings, setDayBookings] = useState([])

  useEffect(() => {
    fetchMonthBookings()
  }, [currentDate])

  const fetchMonthBookings = async () => {
    setLoading(true)
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1).toISOString().split('T')[0]
    const lastDay = new Date(year, month + 1, 0).toISOString().split('T')[0]

    try {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .gte('event_date', firstDay)
        .lte('event_date', lastDay)
        .neq('status', 'cancelled')
        .order('event_time', { ascending: true })
      setBookings(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getBookingsForDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return bookings.filter(b => b.event_date === dateStr)
  }

  const handleDayClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dayBooks = getBookingsForDay(day)
    setSelectedDay(dateStr)
    setDayBookings(dayBooks)
  }

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1))
    setSelectedDay(null)
  }

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    return { daysInMonth, firstDayOfMonth }
  }

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const today = new Date()
  const isToday = (day) => {
    return today.getFullYear() === currentDate.getFullYear() &&
           today.getMonth() === currentDate.getMonth() &&
           today.getDate() === day
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  }

  const getStatusColor = (status) => ({
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-blue-100 text-blue-700'
  }[status] || 'bg-gray-100 text-gray-700')

  // Calculate monthly stats
  const totalBookings = bookings.length
  const totalPax = bookings.reduce((sum, b) => sum + (b.number_of_pax || 0), 0)
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0)

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
              <h1 className="text-3xl font-bold text-gray-800">Booking Calendar</h1>
              <p className="text-gray-500">View bookings by month</p>
            </div>
          </div>
          <Link
            to="/admin/daily-summary"
            className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-xl font-medium hover:bg-red-800"
          >
            <Printer size={20} />
            Print Summary
          </Link>
        </div>

        {/* Monthly Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-700">{totalBookings}</p>
            <p className="text-gray-500 text-sm">Bookings this month</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-700">{totalPax.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Total Guests</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center">
            <p className="text-3xl font-bold text-red-700">₱{totalRevenue.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Total Revenue</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Month Navigation */}
              <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 flex items-center justify-between">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-red-600 rounded-full">
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-red-600 rounded-full">
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 bg-gray-50">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-semibold text-gray-600 border-b">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              {loading ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin mx-auto"></div>
                </div>
              ) : (
                <div className="grid grid-cols-7">
                  {/* Empty cells before first day */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2 min-h-[100px] bg-gray-50 border-b border-r"></div>
                  ))}

                  {/* Days of month */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1
                    const dayBookingsList = getBookingsForDay(day)
                    const hasBookings = dayBookingsList.length > 0
                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                    const isSelected = selectedDay === dateStr

                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`p-2 min-h-[100px] border-b border-r text-left transition hover:bg-red-50 ${
                          isSelected ? 'bg-red-100 ring-2 ring-red-500' : ''
                        } ${isToday(day) ? 'bg-yellow-50' : ''}`}
                      >
                        <div className={`text-sm font-medium mb-1 ${isToday(day) ? 'text-red-700 font-bold' : 'text-gray-700'}`}>
                          {day}
                          {isToday(day) && <span className="ml-1 text-xs">(Today)</span>}
                        </div>
                        {hasBookings && (
                          <div className="space-y-1">
                            {dayBookingsList.slice(0, 2).map((b, idx) => (
                              <div
                                key={idx}
                                className={`text-xs px-1.5 py-0.5 rounded truncate ${
                                  b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                  b.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                  'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {b.customer_name?.split(' ')[0]}
                              </div>
                            ))}
                            {dayBookingsList.length > 2 && (
                              <div className="text-xs text-gray-500 pl-1">
                                +{dayBookingsList.length - 2} more
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Day Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-24 overflow-hidden">
              {selectedDay ? (
                <>
                  <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{formatDate(selectedDay)}</h3>
                      <p className="text-red-200 text-sm">{dayBookings.length} booking(s)</p>
                    </div>
                    <button onClick={() => setSelectedDay(null)} className="p-1 hover:bg-red-600 rounded-full">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto">
                    {dayBookings.length === 0 ? (
                      <div className="p-8 text-center">
                        <Calendar size={40} className="text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500">No bookings for this day</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {dayBookings.map(booking => (
                          <div key={booking.id} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-bold text-gray-800">{booking.customer_name}</h4>
                                <p className="text-sm text-red-700">
                                  {menuPackages[booking.menu_package]?.name || booking.menu_package}
                                </p>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>

                            <div className="space-y-1 text-sm text-gray-600">
                              <p className="flex items-center gap-2">
                                <Clock size={14} className="text-gray-400" />
                                {formatTime(booking.event_time)}
                              </p>
                              <p className="flex items-center gap-2">
                                <MapPin size={14} className="text-gray-400" />
                                {booking.venue}
                              </p>
                              <p className="flex items-center gap-2">
                                <Users size={14} className="text-gray-400" />
                                {booking.number_of_pax} guests
                              </p>
                              <p className="flex items-center gap-2">
                                <Phone size={14} className="text-gray-400" />
                                {booking.customer_phone}
                              </p>
                            </div>

                            <div className="mt-3 pt-3 border-t flex justify-between items-center">
                              <span className="font-bold text-red-700">₱{booking.total_amount?.toLocaleString()}</span>
                              <Link
                                to="/admin/bookings"
                                className="text-sm text-red-700 hover:underline"
                              >
                                View Details →
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Select a Day</h3>
                  <p className="text-gray-500 text-sm">Click on any day to view bookings</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl shadow p-4 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-100 border border-amber-300"></div>
            <span className="text-sm text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
            <span className="text-sm text-gray-600">Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-50 border border-yellow-300"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  )
}
