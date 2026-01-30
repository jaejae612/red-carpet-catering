import React, { useRef } from 'react'
import { Printer, Download, X } from 'lucide-react'

const formatCurrency = (amount) => `₱${amount?.toLocaleString() || 0}`

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (timeStr) => {
  if (!timeStr) return ''
  const [hours, minutes] = timeStr.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

export default function BookingReceipt({ booking, onClose }) {
  const receiptRef = useRef()

  const handlePrint = () => {
    window.print()
  }

  if (!booking) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header - Hide on print */}
        <div className="flex items-center justify-between p-4 border-b print:hidden">
          <h2 className="text-xl font-bold text-gray-800">Booking Receipt</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
            >
              <Printer size={18} /> Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div ref={receiptRef} className="p-8 print:p-4">
          {/* Print Styles */}
          <style>{`
            @media print {
              body * { visibility: hidden; }
              .print-receipt, .print-receipt * { visibility: visible; }
              .print-receipt { position: absolute; left: 0; top: 0; width: 100%; }
              .print\\:hidden { display: none !important; }
            }
          `}</style>

          <div className="print-receipt">
            {/* Company Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-2">
                <img src="/logo-red.png" alt="Red Carpet" className="h-16 w-auto" />
              </div>
              <h1 className="text-2xl font-bold text-red-700">Red Carpet Catering</h1>
              <p className="text-gray-500">Food and Catering Services</p>
              <p className="text-sm text-gray-500 mt-2">
                📞 0917-187-6510 | 0926-664-2839 | (032) 383-4122
              </p>
            </div>

            {/* Receipt Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">BOOKING RECEIPT</h2>
              <p className="text-gray-500">#{booking.id?.slice(0, 8).toUpperCase()}</p>
            </div>

            {/* Booking Details */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-semibold">{booking.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Number</p>
                  <p className="font-semibold">{booking.customer_phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Event Date</p>
                  <p className="font-semibold">{formatDate(booking.event_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Event Time</p>
                  <p className="font-semibold">{formatTime(booking.event_time)}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-semibold">{booking.venue}</p>
              </div>

              {booking.motif && (
                <div>
                  <p className="text-sm text-gray-500">Motif/Theme</p>
                  <p className="font-semibold">{booking.motif}</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Menu Package</span>
                  <span className="font-semibold">{booking.menu_package}</span>
                </div>
                {booking.menu_option && (
                  <div className="flex justify-between">
                    <span>Menu Option</span>
                    <span className="font-semibold">{booking.menu_option}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Number of Guests</span>
                  <span className="font-semibold">{booking.number_of_pax} pax</span>
                </div>
              </div>

              {/* Add-ons */}
              {booking.add_ons && booking.add_ons.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Add-ons:</p>
                  <ul className="list-disc list-inside text-sm">
                    {booking.add_ons.map((addon, idx) => (
                      <li key={idx}>{addon.name || addon}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Custom Dishes */}
              {booking.custom_dishes && booking.custom_dishes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500 mb-2">Selected Dishes:</p>
                  <ul className="list-disc list-inside text-sm">
                    {booking.custom_dishes.map((dish, idx) => (
                      <li key={idx}>{dish.name || dish}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total Amount</span>
              <span className="text-red-700">{formatCurrency(booking.total_amount)}</span>
            </div>

            {/* Status */}
            <div className="text-center mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                booking.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                Status: {booking.status?.toUpperCase()}
              </span>
            </div>

            {/* Special Requests */}
            {booking.special_requests && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Special Requests:</p>
                <p className="text-gray-700">{booking.special_requests}</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 border-t pt-6">
              <p className="mb-2">Thank you for choosing Red Carpet Catering!</p>
              <p>For inquiries, please contact us at the numbers above.</p>
              <p className="mt-4 text-xs">
                Printed on: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}