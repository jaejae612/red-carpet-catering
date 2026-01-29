import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { menuPackages } from '../../lib/menuData'
import { ArrowLeft, Printer, Calendar, MapPin, Users, Phone, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DailyBookingSummary() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetchBookings()
  }, [selectedDate])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('event_date', selectedDate)
        .neq('status', 'cancelled')
        .order('event_time', { ascending: true })
      setBookings(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const changeDate = (days) => {
    const date = new Date(selectedDate)
    date.setDate(date.getDate() + days)
    setSelectedDate(date.toISOString().split('T')[0])
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700',
      confirmed: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  const totalPax = bookings.reduce((sum, b) => sum + (b.number_of_pax || 0), 0)
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.total_amount || 0), 0)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Hidden when printing */}
      <div className="print:hidden bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Daily Booking Summary</h1>
                <p className="text-gray-500">Print-ready format</p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-red-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-800"
            >
              <Printer size={20} />
              Print Summary
            </button>
          </div>

          {/* Date Selector */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-red-700" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Printable Content */}
      <div className="max-w-5xl mx-auto p-4 print:p-0 print:max-w-none">
        <div className="bg-white rounded-2xl shadow-lg print:shadow-none print:rounded-none">
          
          {/* Print Header */}
          <div className="p-6 border-b print:border-b-2 print:border-black">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src="/logo-red.png" alt="Red Carpet" className="h-16 w-auto print:h-12" />
                <div>
                  <h1 className="text-2xl font-bold text-red-700 print:text-black">Red Carpet Catering</h1>
                  <p className="text-gray-500">Daily Booking Summary</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">{formatDate(selectedDate)}</p>
                <p className="text-gray-500">Printed: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 print:bg-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-700 print:text-black">{bookings.length}</p>
              <p className="text-gray-600">Total Bookings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-700 print:text-black">{totalPax.toLocaleString()}</p>
              <p className="text-gray-600">Total Guests</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-700 print:text-black">₱{totalRevenue.toLocaleString()}</p>
              <p className="text-gray-600">Total Revenue</p>
            </div>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin mx-auto"></div>
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No bookings for this date</p>
            </div>
          ) : (
            <div className="divide-y print:divide-gray-400">
              {bookings.map((booking, index) => (
                <div key={booking.id} className="p-6 print:p-4 print:break-inside-avoid">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center font-bold print:bg-black">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{booking.customer_name}</h3>
                        <p className="text-red-700 font-medium print:text-black">
                          {menuPackages[booking.menu_package]?.name || booking.menu_package}
                          {booking.menu_option && ` • ${booking.menu_option}`}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 ml-11">
                    <div className="space-y-2">
                      <p className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-gray-400" />
                        <strong>Time:</strong> {formatTime(booking.event_time)}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-gray-400" />
                        <strong>Venue:</strong> {booking.venue}
                      </p>
                      <p className="flex items-center gap-2 text-gray-700">
                        <Users size={16} className="text-gray-400" />
                        <strong>Guests:</strong> {booking.number_of_pax} pax
                      </p>
                      <p className="flex items-center gap-2 text-gray-700">
                        <Phone size={16} className="text-gray-400" />
                        <strong>Contact:</strong> {booking.customer_phone}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {booking.motif && (
                        <p className="text-gray-700">
                          <strong>Motif:</strong> {booking.motif}
                        </p>
                      )}
                      {booking.special_requests && (
                        <p className="text-gray-700">
                          <strong>Special Requests:</strong> {booking.special_requests}
                        </p>
                      )}
                      
                      {/* Assigned Staff */}
                      {booking.assigned_staff && booking.assigned_staff.length > 0 && (
                        <div>
                          <strong className="text-gray-700">Staff:</strong>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {booking.assigned_staff.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-sm">
                                {s.name} ({s.role === 'head_waiter' ? 'HW' : 'S'})
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xl font-bold text-red-700 print:text-black mt-2">
                        Total: ₱{booking.total_amount?.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Selected Dishes */}
                  {booking.selected_dishes && Object.keys(booking.selected_dishes).length > 0 && (
                    <div className="mt-4 ml-11 p-3 bg-gray-50 rounded-lg print:bg-gray-100">
                      <strong className="text-gray-700 text-sm">Menu Items:</strong>
                      <div className="mt-1 text-sm text-gray-600">
                        {Object.entries(booking.selected_dishes).map(([category, dishes]) => (
                          dishes && dishes.length > 0 && (
                            <span key={category} className="mr-4">
                              <strong className="capitalize">{category}:</strong> {dishes.map(d => d.name).join(', ')}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50 print:bg-white print:border-t-2 print:border-black">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                <p>Red Carpet Food and Catering Services</p>
                <p>Contact: 0917-187-6510 | 0926-664-2839 | (032) 383-4122</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Page 1 of 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:rounded-none { border-radius: 0 !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
          .print\\:break-inside-avoid { break-inside: avoid; }
          .print\\:bg-gray-100 { background-color: #f3f4f6 !important; }
          .print\\:bg-white { background-color: white !important; }
          .print\\:text-black { color: black !important; }
          .print\\:border-black { border-color: black !important; }
          .print\\:border-b-2 { border-bottom-width: 2px !important; }
          .print\\:border-t-2 { border-top-width: 2px !important; }
          .print\\:divide-gray-400 > * + * { border-color: #9ca3af !important; }
          .print\\:h-12 { height: 3rem !important; }
          .print\\:p-4 { padding: 1rem !important; }
          @page { margin: 1cm; }
        }
      `}</style>
    </div>
  )
}
