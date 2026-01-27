import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { menuPackages, addOnStations, calculatePricePerHead, calculateTotal } from '../lib/menuData'
import { X, Save, Calendar, Clock, MapPin, Users, Palette, Check, Plus, Minus } from 'lucide-react'

export default function EditBookingModal({ booking, onClose, onSave, isAdmin = false }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    venue: '',
    event_date: '',
    event_time: '',
    menu_package: '',
    menu_option: '',
    number_of_pax: 60,
    add_ons: [],
    motif: '',
    special_requests: '',
    status: 'pending'
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (booking) {
      setFormData({
        customer_name: booking.customer_name || '',
        customer_phone: booking.customer_phone || '',
        customer_email: booking.customer_email || '',
        venue: booking.venue || '',
        event_date: booking.event_date || '',
        event_time: booking.event_time || '',
        menu_package: booking.menu_package || '',
        menu_option: booking.menu_option || '',
        number_of_pax: booking.number_of_pax || 60,
        add_ons: booking.add_ons || [],
        motif: booking.motif || '',
        special_requests: booking.special_requests || '',
        status: booking.status || 'pending'
      })
    }
  }, [booking])

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const toggleAddOn = (addon) => {
    const exists = formData.add_ons.find(a => a.id === addon.id)
    updateField('add_ons', exists 
      ? formData.add_ons.filter(a => a.id !== addon.id) 
      : [...formData.add_ons, { id: addon.id, quantity: 1 }]
    )
  }

  const updateAddOnQty = (id, qty) => {
    updateField('add_ons', formData.add_ons.map(a => 
      a.id === id ? { ...a, quantity: Math.max(1, qty) } : a
    ))
  }

  const handleSave = async () => {
    if (!formData.venue || !formData.event_date || !formData.event_time) {
      setError('Please fill in all required fields')
      return
    }

    // Validate date is not in the past
    const selectedDate = new Date(formData.event_date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (selectedDate < today) {
      setError('Cannot set booking date in the past')
      return
    }

    setSaving(true)
    setError('')

    try {
      const total = calculateTotal(formData.menu_package, formData.number_of_pax, formData.add_ons)
      
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          customer_name: formData.customer_name,
          customer_phone: formData.customer_phone,
          customer_email: formData.customer_email,
          venue: formData.venue,
          event_date: formData.event_date,
          event_time: formData.event_time,
          menu_package: formData.menu_package,
          menu_option: formData.menu_option,
          number_of_pax: formData.number_of_pax,
          add_ons: formData.add_ons,
          motif: formData.motif,
          special_requests: formData.special_requests,
          total_amount: total,
          status: isAdmin ? formData.status : booking.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.id)

      if (updateError) throw updateError
      
      onSave()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const pph = calculatePricePerHead(formData.menu_package, formData.number_of_pax)
  const total = calculateTotal(formData.menu_package, formData.number_of_pax, formData.add_ons)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl font-bold">Edit Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-red-600 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Customer Info - Admin Only */}
          {isAdmin && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-blue-800 mb-3">Customer Information</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    value={formData.customer_name} 
                    onChange={(e) => updateField('customer_name', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={formData.customer_phone} 
                    onChange={(e) => updateField('customer_phone', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={formData.customer_email} 
                    onChange={(e) => updateField('customer_email', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Status - Admin Only */}
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select 
                value={formData.status} 
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}

          {/* Event Details */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Event Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <textarea 
                    value={formData.venue} 
                    onChange={(e) => updateField('venue', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg min-h-[80px]"
                    placeholder="Complete address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="date" 
                      value={formData.event_date} 
                      onChange={(e) => updateField('event_date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="time" 
                      value={formData.event_time} 
                      onChange={(e) => updateField('event_time', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Package */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Menu Package</h3>
            <div className="space-y-2">
              {Object.values(menuPackages).map(pkg => (
                <button 
                  key={pkg.id} 
                  onClick={() => { updateField('menu_package', pkg.id); updateField('menu_option', ''); }}
                  className={`w-full p-3 rounded-lg border-2 text-left ${formData.menu_package === pkg.id ? 'border-red-700 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{pkg.name}</span>
                      <span className="text-red-600 ml-2">₱{pkg.pricePerHead}/head</span>
                    </div>
                    {formData.menu_package === pkg.id && <Check size={20} className="text-red-700" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Menu Option */}
            {formData.menu_package && menuPackages[formData.menu_package] && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Menu Option</label>
                <div className="space-y-2">
                  {menuPackages[formData.menu_package].options.map((option, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => updateField('menu_option', option.name)}
                      className={`w-full p-2 rounded-lg text-left ${formData.menu_option === option.name ? 'bg-red-700 text-white' : 'bg-white border hover:bg-red-50'}`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Number of Pax */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Number of Guests</h3>
            <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{formData.number_of_pax} pax</p>
                <p className="text-sm text-gray-500">₱{pph}/head</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => updateField('number_of_pax', Math.max(30, formData.number_of_pax - 5))}
                  className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus size={18} />
                </button>
                <button 
                  onClick={() => updateField('number_of_pax', formData.number_of_pax + 5)}
                  className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Add-ons</h3>
            <div className="space-y-2">
              {addOnStations.map(addon => {
                const sel = formData.add_ons.find(a => a.id === addon.id)
                return (
                  <div key={addon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <button onClick={() => toggleAddOn(addon)} className="flex items-center gap-3 flex-1">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${sel ? 'bg-red-700 border-red-700' : 'border-gray-300'}`}>
                        {sel && <Check size={12} className="text-white" />}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{addon.name}</p>
                        <p className="text-sm text-gray-500">₱{addon.price.toLocaleString()}</p>
                      </div>
                    </button>
                    {sel && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateAddOnQty(addon.id, sel.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm">{sel.quantity}</span>
                        <button onClick={() => updateAddOnQty(addon.id, sel.quantity + 1)} className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center">
                          <Plus size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Motif & Requests */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Motif/Theme</label>
              <div className="relative">
                <Palette className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={formData.motif} 
                  onChange={(e) => updateField('motif', e.target.value)}
                  placeholder="e.g., Blue and Gold"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
              <input 
                type="text" 
                value={formData.special_requests} 
                onChange={(e) => updateField('special_requests', e.target.value)}
                placeholder="Any special requirements"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Total */}
          <div className="bg-red-700 text-white rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold">₱{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex gap-3 flex-shrink-0">
          <button 
            onClick={onClose}
            className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}