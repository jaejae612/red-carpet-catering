import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { 
  cocktailMenus, 
  cocktailAddOns, 
  getCocktailPricePerHead, 
  calculateCocktailTotal 
} from '../lib/cocktailPackedData'
import { occasionTypes, presetMotifColors } from '../lib/menuData'
import { 
  ArrowLeft, ArrowRight, Check, Wine, Users, Calendar, MapPin, 
  Clock, Palette, Info, AlertCircle, ChevronDown, ChevronUp,
  Plus, Minus, Sparkles, PartyPopper
} from 'lucide-react'
import TermsAndConditions from '../components/TermsAndConditions'

const STEPS = [
  { id: 1, name: 'Package', icon: Wine },
  { id: 2, name: 'Details', icon: Calendar },
  { id: 3, name: 'Add-ons', icon: Plus },
  { id: 4, name: 'Review', icon: Check },
]

export default function CocktailBookingPage() {
  const { user, profile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedMenu, setExpandedMenu] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const [booking, setBooking] = useState({
    // Package selection
    selectedPackage: '',
    selectedOption: 'A',
    numberOfPax: 60,
    
    // Event details
    date: '',
    time: '12:00',
    venue: '',
    venueAddress: '',
    occasion: '',
    occasionOther: '',
    
    // Motif
    motifType: 'preset',
    motifPreset: '',
    motifColors: ['#dc2626', '#fbbf24'],
    
    // Add-ons
    addOns: [],
    
    // Customer info (for admin booking)
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    
    // Notes
    specialRequests: ''
  })

  const updateBooking = (field, value) => {
    setBooking(prev => ({ ...prev, [field]: value }))
  }

  const toggleAddOn = (addonId) => {
    setBooking(prev => {
      const exists = prev.addOns.find(a => a.id === addonId)
      if (exists) {
        return { ...prev, addOns: prev.addOns.filter(a => a.id !== addonId) }
      }
      return { ...prev, addOns: [...prev.addOns, { id: addonId, quantity: 1 }] }
    })
  }

  const updateAddOnQuantity = (addonId, qty) => {
    if (qty < 1) return
    setBooking(prev => ({
      ...prev,
      addOns: prev.addOns.map(a => a.id === addonId ? { ...a, quantity: qty } : a)
    }))
  }

  const selectedMenu = cocktailMenus[booking.selectedPackage]
  const pricePerHead = selectedMenu ? getCocktailPricePerHead(booking.selectedPackage, booking.numberOfPax) : 0
  const total = selectedMenu ? calculateCocktailTotal(booking.selectedPackage, booking.numberOfPax, booking.addOns) : 0

  const canProceed = () => {
    switch (step) {
      case 1: return booking.selectedPackage && booking.selectedOption
      case 2: return booking.date && booking.time && booking.venue
      case 3: return true
      case 4: return true
      default: return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      const customerName = isAdmin ? booking.customerName : (profile?.full_name || user?.user_metadata?.full_name || 'Customer')
      const customerPhone = isAdmin ? booking.customerPhone : (profile?.phone || '')
      const customerEmail = isAdmin ? booking.customerEmail : user?.email

      const bookingData = {
        user_id: user?.id,
        booking_type: 'cocktail',
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail,
        event_date: booking.date,
        event_time: booking.time,
        venue: booking.venue,
        venue_address: booking.venueAddress,
        number_of_pax: booking.numberOfPax,
        menu_package: selectedMenu?.name,
        menu_option: booking.selectedOption,
        menu_items: selectedMenu?.options[booking.selectedOption]?.items || [],
        occasion: booking.occasion === 'other' ? booking.occasionOther : booking.occasion,
        motif: booking.motifType === 'preset' 
          ? presetMotifColors.find(p => p.id === booking.motifPreset)?.name 
          : booking.motifColors.join(', '),
        add_ons: booking.addOns.map(a => {
          const addon = cocktailAddOns.find(x => x.id === a.id)
          return { id: a.id, name: addon?.name, quantity: a.quantity, price: addon?.price }
        }),
        special_requests: booking.specialRequests,
        price_per_head: pricePerHead,
        total_amount: total,
        status: 'pending',
        payment_status: 'unpaid'
      }

      const { error: insertError } = await supabase
        .from('bookings')
        .insert([bookingData])

      if (insertError) throw insertError

      navigate('/my-orders', { 
        state: { 
          success: true, 
          message: 'Cocktail party booking submitted! We will contact you shortly.' 
        } 
      })
    } catch (err) {
      console.error('Booking error:', err)
      setError(err.message || 'Failed to submit booking')
    } finally {
      setLoading(false)
    }
  }

  // Render Step 1: Package Selection
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-4">
          <PartyPopper size={20} />
          <span className="font-medium">Cocktail Party Packages</span>
        </div>
        <p className="text-gray-600">Perfect for celebrations, corporate events, and social gatherings</p>
      </div>

      {/* Guest Count */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Users className="inline mr-2" size={18} />
          Number of Guests
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="30"
            max="200"
            step="10"
            value={booking.numberOfPax}
            onChange={(e) => updateBooking('numberOfPax', parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-700"
          />
          <div className="w-20 text-center">
            <span className="text-2xl font-bold text-red-700">{booking.numberOfPax}</span>
            <span className="text-gray-500 text-sm block">pax</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Minimum 30 guests. Base pricing at 60 guests.</p>
      </div>

      {/* Package Selection */}
      <div className="space-y-4">
        {Object.values(cocktailMenus).map((menu) => {
          const price = getCocktailPricePerHead(menu.id, booking.numberOfPax)
          const isSelected = booking.selectedPackage === menu.id
          const isExpanded = expandedMenu === menu.id

          return (
            <div
              key={menu.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all ${
                isSelected ? 'ring-2 ring-red-700' : ''
              }`}
            >
              {/* Header */}
              <div
                className={`p-6 cursor-pointer ${isSelected ? 'bg-red-50' : ''}`}
                onClick={() => {
                  updateBooking('selectedPackage', menu.id)
                  setExpandedMenu(isExpanded ? null : menu.id)
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-red-700 bg-red-700' : 'border-gray-300'
                    }`}>
                      {isSelected && <Check size={14} className="text-white" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{menu.name}</h3>
                      <p className="text-sm text-gray-500">
                        {Object.keys(menu.options).length} menu options available
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-700">₱{price}</p>
                    <p className="text-sm text-gray-500">per head</p>
                  </div>
                </div>

                <button
                  className="mt-4 flex items-center gap-2 text-red-700 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedMenu(isExpanded ? null : menu.id)
                  }}
                >
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  {isExpanded ? 'Hide menu items' : 'View menu items'}
                </button>
              </div>

              {/* Expanded Menu Items */}
              {isExpanded && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(menu.options).map(([key, option]) => (
                      <div
                        key={key}
                        className={`p-4 rounded-xl cursor-pointer transition-all ${
                          isSelected && booking.selectedOption === key
                            ? 'bg-red-700 text-white'
                            : 'bg-white hover:shadow-md'
                        }`}
                        onClick={() => {
                          updateBooking('selectedPackage', menu.id)
                          updateBooking('selectedOption', key)
                        }}
                      >
                        <h4 className={`font-bold mb-3 ${
                          isSelected && booking.selectedOption === key ? 'text-white' : 'text-gray-800'
                        }`}>
                          {option.name}
                        </h4>
                        <ul className="space-y-1">
                          {option.items.map((item, idx) => (
                            <li key={idx} className={`text-sm flex items-start gap-2 ${
                              isSelected && booking.selectedOption === key ? 'text-red-100' : 'text-gray-600'
                            }`}>
                              <span className="mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Pricing Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-amber-800">
            <p className="font-medium">Pricing Tiers</p>
            <ul className="mt-1 space-y-1">
              <li>• 60+ guests: Base price</li>
              <li>• 50-59 guests: +₱60/head</li>
              <li>• 40-49 guests: +₱90/head</li>
              <li>• 30-39 guests: +₱120/head</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  // Render Step 2: Event Details
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Admin: Customer Info */}
      {isAdmin && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-800 mb-4">👤 Customer Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <input
                type="text"
                value={booking.customerName}
                onChange={(e) => updateBooking('customerName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={booking.customerPhone}
                onChange={(e) => updateBooking('customerPhone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                placeholder="09XX XXX XXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={booking.customerEmail}
                onChange={(e) => updateBooking('customerEmail', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                placeholder="email@example.com"
              />
            </div>
          </div>
        </div>
      )}

      {/* Date & Time */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-red-700" />
          Date & Time
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
            <input
              type="date"
              value={booking.date}
              onChange={(e) => updateBooking('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Time *</label>
            <input
              type="time"
              value={booking.time}
              onChange={(e) => updateBooking('time', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* Venue */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin size={20} className="text-red-700" />
          Venue
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name *</label>
            <input
              type="text"
              value={booking.venue}
              onChange={(e) => updateBooking('venue', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              placeholder="e.g., Hotel Lobby, Function Hall, Rooftop"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address</label>
            <textarea
              value={booking.venueAddress}
              onChange={(e) => updateBooking('venueAddress', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl"
              rows={2}
              placeholder="Street, Barangay, City"
            />
          </div>
        </div>
      </div>

      {/* Occasion */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-red-700" />
          Occasion
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {occasionTypes.map((occ) => (
            <button
              key={occ.id}
              onClick={() => updateBooking('occasion', occ.id)}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                booking.occasion === occ.id
                  ? 'border-red-700 bg-red-50 text-red-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {occ.name}
            </button>
          ))}
        </div>
        {booking.occasion === 'other' && (
          <input
            type="text"
            value={booking.occasionOther}
            onChange={(e) => updateBooking('occasionOther', e.target.value)}
            className="w-full mt-4 px-4 py-3 border border-gray-200 rounded-xl"
            placeholder="Specify occasion..."
          />
        )}
      </div>

      {/* Motif */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Palette size={20} className="text-red-700" />
          Color Motif (Optional)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {presetMotifColors.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                updateBooking('motifType', 'preset')
                updateBooking('motifPreset', preset.id)
              }}
              className={`p-3 rounded-xl border-2 transition-all ${
                booking.motifType === 'preset' && booking.motifPreset === preset.id
                  ? 'border-red-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex gap-1 mb-2 justify-center">
                {preset.colors.slice(0, 2).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
        <textarea
          value={booking.specialRequests}
          onChange={(e) => updateBooking('specialRequests', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl"
          rows={3}
          placeholder="Any dietary restrictions, allergies, or special arrangements..."
        />
      </div>
    </div>
  )

  // Render Step 3: Add-ons
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Enhance Your Event</h2>
        <p className="text-gray-600">Add stations and extras to make it special</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {cocktailAddOns.map((addon) => {
          const isSelected = booking.addOns.find(a => a.id === addon.id)
          const quantity = isSelected?.quantity || 1

          return (
            <div
              key={addon.id}
              className={`bg-white rounded-xl p-4 border-2 transition-all ${
                isSelected ? 'border-red-700 bg-red-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{addon.name}</h4>
                  <p className="text-sm text-gray-500">{addon.unit}</p>
                  <p className="text-lg font-bold text-red-700 mt-1">₱{addon.price.toLocaleString()}</p>
                </div>
                <button
                  onClick={() => toggleAddOn(addon.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isSelected 
                      ? 'bg-red-700 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isSelected ? <Check size={18} /> : <Plus size={18} />}
                </button>
              </div>

              {isSelected && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateAddOnQuantity(addon.id, quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => updateAddOnQuantity(addon.id, quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="ml-auto font-bold text-red-700">
                    ₱{(addon.price * quantity).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  // Render Step 4: Review
  const renderStep4 = () => {
    const selectedOption = selectedMenu?.options[booking.selectedOption]
    const addOnsTotal = booking.addOns.reduce((sum, a) => {
      const addon = cocktailAddOns.find(x => x.id === a.id)
      return sum + (addon ? addon.price * a.quantity : 0)
    }, 0)

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>

          {/* Package Info */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg text-gray-800">{selectedMenu?.name}</p>
                <p className="text-gray-600">{selectedOption?.name}</p>
                <p className="text-sm text-gray-500 mt-1">{booking.numberOfPax} guests × ₱{pricePerHead}/head</p>
              </div>
              <p className="text-xl font-bold text-red-700">
                ₱{(pricePerHead * booking.numberOfPax).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="border-b border-gray-200 pb-4 mb-4">
            <p className="font-medium text-gray-700 mb-2">Menu Items:</p>
            <div className="grid grid-cols-2 gap-1">
              {selectedOption?.items.map((item, idx) => (
                <p key={idx} className="text-sm text-gray-600">• {item}</p>
              ))}
            </div>
          </div>

          {/* Event Details */}
          <div className="border-b border-gray-200 pb-4 mb-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">{booking.date} at {booking.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Venue</p>
              <p className="font-medium">{booking.venue}</p>
            </div>
            {booking.occasion && (
              <div>
                <p className="text-sm text-gray-500">Occasion</p>
                <p className="font-medium">
                  {booking.occasion === 'other' ? booking.occasionOther : occasionTypes.find(o => o.id === booking.occasion)?.name}
                </p>
              </div>
            )}
          </div>

          {/* Add-ons */}
          {booking.addOns.length > 0 && (
            <div className="border-b border-gray-200 pb-4 mb-4">
              <p className="font-medium text-gray-700 mb-2">Add-ons:</p>
              {booking.addOns.map((a) => {
                const addon = cocktailAddOns.find(x => x.id === a.id)
                return (
                  <div key={a.id} className="flex justify-between text-sm">
                    <span>{addon?.name} × {a.quantity}</span>
                    <span className="font-medium">₱{((addon?.price || 0) * a.quantity).toLocaleString()}</span>
                  </div>
                )
              })}
              <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
                <span className="text-gray-600">Add-ons Subtotal</span>
                <span className="font-medium">₱{addOnsTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="bg-red-700 text-white rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold">₱{total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Deposit Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-amber-800">
              <p className="font-medium">Booking Policy</p>
              <p>50% deposit required to confirm booking. Payment accepted via cash, check, or bank transfer.</p>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <TermsAndConditions 
          compact={true}
          accepted={termsAccepted}
          onAccept={setTermsAccepted}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-lg">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Cocktail Party Booking</h1>
            <p className="text-gray-500">Finger foods & appetizers for your event</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {STEPS.map((s, idx) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 ${step >= s.id ? 'text-red-700' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= s.id ? 'bg-red-700 text-white' : 'bg-gray-200'
                }`}>
                  {step > s.id ? <Check size={20} /> : <s.icon size={20} />}
                </div>
                <span className="hidden md:block font-medium">{s.name}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-12 md:w-24 h-1 mx-2 rounded ${step > s.id ? 'bg-red-700' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(s => Math.min(4, s + 1))}
              disabled={!canProceed()}
              className="px-6 py-3 bg-red-700 text-white rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-800"
            >
              Continue
              <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading || !termsAccepted}
              className="px-8 py-3 bg-red-700 text-white rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 hover:bg-red-800"
            >
              {loading ? 'Submitting...' : !termsAccepted ? 'Accept Terms First' : 'Submit Booking'}
              <Check size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
