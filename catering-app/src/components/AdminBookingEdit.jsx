import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { menuPackages } from '../lib/menuData'
import { X, Save, Calendar, Clock, MapPin, Users, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminBookingEdit({ booking, onClose, onSave }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    venue: '',
    event_date: '',
    event_time: '',
    number_of_pax: 60,
    motif: '',
    special_requests: '',
    status: 'pending',
    payment_status: 'unpaid',
    deposit_amount: 0,
    payment_notes: '',
    total_amount: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (booking) {
      setFormData({
        customer_name: booking.customer_name || '',
        customer_phone: booking.customer_phone || '',
        customer_email: booking.customer_email || '',
        venue: booking.venue || '',
        event_date: booking.event_date || '',
        event_time: booking.event_time || '',
        number_of_pax: booking.number_of_pax || 60,
        motif: booking.motif || '',
        special_requests: booking.special_requests || '',
        status: booking.status || 'pending',
        payment_status: booking.payment_status || 'unpaid',
        deposit_amount: booking.deposit_amount || 0,
        payment_notes: booking.payment_notes || '',
        total_amount: booking.total_amount || 0
      })
    }
  }, [booking])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const updateData = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email,
        venue: formData.venue,
        event_date: formData.event_date,
        event_time: formData.event_time,
        number_of_pax: formData.number_of_pax,
        motif: formData.motif,
        special_requests: formData.special_requests,
        status: formData.status,
        payment_status: formData.payment_status,
        deposit_amount: formData.deposit_amount,
        payment_notes: formData.payment_notes,
        total_amount: formData.total_amount
      }

      // Add payment timestamps
      if (formData.payment_status === 'deposit_paid' && !booking.deposit_paid_at) {
        updateData.deposit_paid_at = new Date().toISOString()
      }
      if (formData.payment_status === 'fully_paid' && !booking.balance_paid_at) {
        updateData.balance_paid_at = new Date().toISOString()
      }

      const { error: updateError } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', booking.id)

      if (updateError) throw updateError

      setSuccess('Booking updated successfully!')
      setTimeout(() => {
        onSave?.()
        onClose()
      }, 1000)
    } catch (err) {
      setError(err.message || 'Failed to update booking')
    } finally {
      setLoading(false)
    }
  }

  const timeOptions = []
  for (let hour = 6; hour <= 22; hour++) {
    ['00', '30'].forEach(min => {
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      const ampm = hour >= 12 ? 'PM' : 'AM'
      timeOptions.push({
        value: `${hour.toString().padStart(2, '0')}:${min}`,
        label: `${displayHour}:${min} ${ampm}`
      })
    })
  }

  const pkg = menuPackages[booking?.menu_package]

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Booking</h2>
            <p className="text-sm text-gray-500">#{booking?.id?.slice(0, 8)} • {pkg?.name}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />{error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
              <CheckCircle size={20} />{success}
            </div>
          )}

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Event Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="date"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <select
                    value={formData.event_time}
                    onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
                  >
                    {timeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <input
                    type="number"
                    min="30"
                    value={formData.number_of_pax}
                    onChange={(e) => setFormData({ ...formData, number_of_pax: parseInt(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₱)</label>
                <input
                  type="number"
                  value={formData.total_amount}
                  onChange={(e) => setFormData({ ...formData, total_amount: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Status & Payment */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Status & Payment</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Booking Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <select
                    value={formData.payment_status}
                    onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="deposit_paid">Deposit Paid</option>
                    <option value="fully_paid">Fully Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Amount (₱)</label>
                <input
                  type="number"
                  value={formData.deposit_amount}
                  onChange={(e) => setFormData({ ...formData, deposit_amount: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Balance Due</label>
                <div className="px-4 py-2 bg-gray-100 rounded-lg font-semibold text-red-700">
                  ₱{(formData.total_amount - formData.deposit_amount).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Other Details */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Other Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motif/Theme</label>
                <input
                  type="text"
                  value={formData.motif}
                  onChange={(e) => setFormData({ ...formData, motif: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea
                  value={formData.special_requests}
                  onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Notes</label>
                <textarea
                  value={formData.payment_notes}
                  onChange={(e) => setFormData({ ...formData, payment_notes: e.target.value })}
                  rows={2}
                  placeholder="e.g., GCash payment received, reference #12345"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Save size={18} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}