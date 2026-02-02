import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { 
  menuPackages, 
  addOnStations, 
  calculatePricePerHead, 
  occasionTypes,
  presetMotifColors,
  freeDrinkOptions,
  additionalDrinks,
  calculateAddOnsBreakdown
} from '../lib/menuData'
import { 
  CEBU_SERVICE_AREAS, 
  getCityList, 
  getBarangays, 
  getGasCharge, 
  getCityInfo, 
  formatAddress, 
  getMinimumPax,
  requiresQuotation
} from '../lib/cebuAreas'
import { Calendar, Clock, MapPin, Check, Plus, Minus, Send, Palette, Info, ChevronRight, ChevronLeft, User, Phone, Mail, UtensilsCrossed, AlertCircle, PartyPopper, Droplets, Gift, Fuel } from 'lucide-react'

const BASE_DISH_CATEGORIES = [
  { id: 'salad', name: 'Salad', pick: 1, color: 'bg-green-100 text-green-800' },
  { id: 'main', name: 'Main Dish', pick: 2, color: 'bg-red-100 text-red-800', includes: ['main_pork', 'main_fish', 'main_beef', 'main_chicken'] },
  { id: 'side', name: 'Sides', pick: 2, color: 'bg-orange-100 text-orange-800', includes: ['side_vegetable', 'side_pasta'] },
  { id: 'rice', name: 'Rice', pick: 2, color: 'bg-amber-100 text-amber-800' },
  { id: 'dessert', name: 'Dessert', pick: 2, color: 'bg-pink-100 text-pink-800' },
]

// Get dynamic categories based on selected package structure
const getDishCategories = (selectedPackage) => {
  const pkg = menuPackages[selectedPackage]
  if (pkg?.structure) {
    return BASE_DISH_CATEGORIES
      .map(cat => ({
        ...cat,
        pick: pkg.structure[cat.id] ?? cat.pick
      }))
      .filter(cat => cat.pick > 0) // Hide categories with 0 required
  }
  return BASE_DISH_CATEGORIES
}

export default function BookingPage() {
  const { user, profile, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dishes, setDishes] = useState([])
  
  // Check for duplicate booking data
  const getDuplicateData = () => {
    if (searchParams.get('duplicate') === 'true') {
      const data = sessionStorage.getItem('duplicateBooking')
      if (data) {
        sessionStorage.removeItem('duplicateBooking')
        return JSON.parse(data)
      }
    }
    return null
  }
  
  const duplicateData = getDuplicateData()
  
  const [booking, setBooking] = useState({ 
    venue: duplicateData?.venue || '', 
    // Structured venue address for Cebu-only
    venueAddress: duplicateData?.venue_address || { city: '', barangay: '', street: '', landmark: '' },
    venueGasCharge: 0,
    date: '', 
    time: duplicateData?.event_time || '', 
    selectedPackage: duplicateData?.menu_package || '', 
    selectedMenuOption: duplicateData?.menu_option || '', 
    numberOfPax: duplicateData?.number_of_pax || 60, 
    addOns: duplicateData?.add_ons || [], 
    // Enhanced motif fields
    motif: duplicateData?.motif || '', 
    motifType: duplicateData?.motif_type || 'preset', // 'preset' or 'custom'
    motifPreset: duplicateData?.motif_preset || '',
    motifColors: duplicateData?.motif_colors || ['#dc2626', '#ffffff'], // Custom colors
    // Occasion fields
    occasion: duplicateData?.occasion || '',
    occasionOther: duplicateData?.occasion_other || '',
    birthdayCelebrant: duplicateData?.birthday_celebrant || '', // 'boy' or 'girl'
    birthdayAge: duplicateData?.birthday_age || '',
    // Drinks
    freeDrink: duplicateData?.free_drink || 'softdrinks',
    drinkAddOns: duplicateData?.drink_add_ons || [],
    // Swapped dishes (for Menu 560 Asian Fusion swaps)
    swappedDishes: duplicateData?.swapped_dishes || [],
    specialRequests: duplicateData?.special_requests || '',
    customerName: duplicateData?.customer_name || (isAdmin ? '' : (profile?.full_name || '')),
    customerPhone: duplicateData?.customer_phone || (isAdmin ? '' : (profile?.phone || '')),
    customerEmail: duplicateData?.customer_email || (isAdmin ? '' : (user?.email || '')),
    customDishes: duplicateData?.custom_dishes || {}
  })

  // Get dynamic dish categories based on selected package
  const DISH_CATEGORIES = getDishCategories(booking.selectedPackage)

  useEffect(() => {
    fetchDishes()
  }, [])

  const fetchDishes = async () => {
    const { data } = await supabase.from('dishes').select('*').eq('available', true).order('name')
    setDishes(data || [])
  }

  // Get minimum booking date (2 days ahead for customers, today for admins)
  const getMinDate = () => {
    const now = new Date()
    if (isAdmin) {
      return now.toISOString().split('T')[0] // Today for admins
    }
    // 2 days ahead for customers
    now.setDate(now.getDate() + 2)
    return now.toISOString().split('T')[0]
  }

  // Check if selected date/time is valid
  const isValidDate = (dateString, timeString) => {
    if (!dateString) return false
    
    const today = new Date().toISOString().split('T')[0]
    
    if (isAdmin) {
      // Admin can book same day but needs 8 hours advance
      if (dateString === today) {
        if (!timeString) return false
        const now = new Date()
        const [hours, minutes] = timeString.split(':').map(Number)
        const bookingTime = new Date()
        bookingTime.setHours(hours, minutes, 0, 0)
        const diffHours = (bookingTime - now) / (1000 * 60 * 60)
        return diffHours >= 8
      }
      return true // Future dates always valid for admin
    }
    
    // Customers need 2 days advance
    const minDate = new Date()
    minDate.setDate(minDate.getDate() + 2)
    minDate.setHours(0, 0, 0, 0)
    
    const selected = new Date(dateString)
    selected.setHours(0, 0, 0, 0)
    
    return selected >= minDate
  }

  // Get minimum time for same-day admin bookings
  const getMinTimeForToday = () => {
    if (!isAdmin) return ''
    const today = new Date().toISOString().split('T')[0]
    if (booking.date !== today) return ''
    
    const minTime = new Date()
    minTime.setHours(minTime.getHours() + 8)
    return `${String(minTime.getHours()).padStart(2, '0')}:${String(minTime.getMinutes()).padStart(2, '0')}`
  }

  // Check if this is an admin same-day booking
  const isSameDayAdmin = isAdmin && booking.date === new Date().toISOString().split('T')[0]

  const updateBooking = (field, value) => setBooking(prev => ({ ...prev, [field]: value }))

  const handleDateChange = (e) => {
    const selectedDate = e.target.value
    updateBooking('date', selectedDate)
    updateBooking('time', '') // Reset time when date changes
    setError('')
  }

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value
    updateBooking('time', selectedTime)
    
    // Validate if admin same-day booking
    if (isSameDayAdmin && !isValidDate(booking.date, selectedTime)) {
      setError('Same-day bookings require at least 8 hours advance notice.')
    } else {
      setError('')
    }
  }

  const toggleAddOn = (addon) => {
    const exists = booking.addOns.find(a => a.id === addon.id)
    updateBooking('addOns', exists ? booking.addOns.filter(a => a.id !== addon.id) : [...booking.addOns, { id: addon.id, quantity: 1 }])
  }

  const updateAddOnQty = (id, qty) => updateBooking('addOns', booking.addOns.map(a => a.id === id ? { ...a, quantity: Math.max(1, qty) } : a))

  // Drink add-on functions
  const toggleDrinkAddOn = (addon) => {
    const exists = booking.drinkAddOns.find(a => a.id === addon.id)
    updateBooking('drinkAddOns', exists ? booking.drinkAddOns.filter(a => a.id !== addon.id) : [...booking.drinkAddOns, { id: addon.id, quantity: 1 }])
  }

  const updateDrinkQty = (id, qty) => updateBooking('drinkAddOns', booking.drinkAddOns.map(a => a.id === id ? { ...a, quantity: Math.max(1, qty) } : a))

  // Format time for display (e.g., "14:00" -> "2:00 PM")
  const formatTime = (time) => {
    if (!time) return ''
    const [hours] = time.split(':').map(Number)
    const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
    const ampm = hours >= 12 ? 'PM' : 'AM'
    return `${displayHour}:00 ${ampm}`
  }

  // Rice options for basic menus
  const BASIC_RICE_OPTIONS = ['plain rice', 'fried rice', 'steamed rice']
  const MENU_510_RICE_OPTIONS = ['plain rice', 'fried rice', 'steamed rice', 'arroz valenciana']
  const EXCLUDED_RICE = ['paella', 'garlic', 'chinese']

  // Dish selection functions
  const getDishesForCategory = (category) => {
    let categoryDishes
    if (category.includes) {
      categoryDishes = dishes.filter(d => category.includes.includes(d.category))
    } else {
      categoryDishes = dishes.filter(d => d.category === category.id)
    }
    
    // For Menu 470, restrict rice to Plain Rice and Fried Rice only
    if (category.id === 'rice' && booking.selectedPackage === 'menu470') {
      categoryDishes = categoryDishes.filter(d => {
        const name = d.name.toLowerCase()
        const isBasicRice = BASIC_RICE_OPTIONS.some(r => name.includes(r))
        const isExcluded = EXCLUDED_RICE.some(ex => name.includes(ex)) || name.includes('valenciana') || name.includes('arroz')
        return isBasicRice && !isExcluded
      })
    }
    
    // For Menu 510, restrict rice to Plain Rice, Fried Rice, and Arroz Valenciana
    if (category.id === 'rice' && booking.selectedPackage === 'menu510') {
      categoryDishes = categoryDishes.filter(d => {
        const name = d.name.toLowerCase()
        return MENU_510_RICE_OPTIONS.some(r => name.includes(r)) && !name.includes('chinese')
      })
    }
    
    return categoryDishes
  }

  const getSelectedDishesForCategory = (categoryId) => {
    return booking.customDishes[categoryId] || []
  }

  const toggleDish = (categoryId, dish, maxPick) => {
    const current = booking.customDishes[categoryId] || []
    const exists = current.find(d => d.id === dish.id)
    
    let newSelection
    if (exists) {
      newSelection = current.filter(d => d.id !== dish.id)
    } else {
      if (current.length >= maxPick) {
        newSelection = [...current.slice(1), { id: dish.id, name: dish.name, category: dish.category }]
      } else {
        newSelection = [...current, { id: dish.id, name: dish.name, category: dish.category }]
      }
    }
    
    updateBooking('customDishes', { ...booking.customDishes, [categoryId]: newSelection })
  }

  const getCategorySubLabel = (category) => {
    if (category.includes) {
      return 'Pork, Fish, Beef, or Chicken'
    }
    if (category.id === 'side') return 'Vegetable or Pasta'
    if (category.id === 'rice' && booking.selectedPackage === 'menu470') {
      return 'Plain Rice & Fried Rice only'
    }
    if (category.id === 'rice' && booking.selectedPackage === 'menu510') {
      return 'Plain Rice, Fried Rice & Arroz Valenciana'
    }
    return ''
  }

  // Check if default menu has items for a category
  const getDefaultItemsForCategory = (categoryId) => {
    const selectedOption = booking.selectedMenuOption && booking.selectedPackage 
      ? menuPackages[booking.selectedPackage]?.options.find(o => o.name === booking.selectedMenuOption)
      : null
    
    if (!selectedOption) return []
    
    const categoryFilters = {
      salad: (item) => {
        const lower = item.toLowerCase()
        return lower.includes('salad') || 
               lower.includes('pickled') ||
               lower.includes('dilis')
      },
      main: (item) => {
        const lower = item.toLowerCase()
        // Exclude salads, rice, sides, and desserts
        const isExcluded = lower.includes('salad') || 
                          lower.includes('rice') || 
                          lower.includes('pancit') ||
                          lower.includes('pasta') ||
                          lower.includes('sotanghon') ||
                          lower.includes('misua') ||
                          lower.includes('lasagna') ||
                          lower.includes('carbonara') ||
                          lower.includes('alfredo') ||
                          lower.includes('ziti') ||
                          lower.includes('fettuccine') ||
                          lower.includes('penne') ||
                          lower.includes('spaghetti') ||
                          lower.includes('cake') ||
                          lower.includes('flan') ||
                          lower.includes('float') ||
                          lower.includes('torte') ||
                          lower.includes('brownie') ||
                          lower.includes('delight') ||
                          lower.includes('cheesecake') ||
                          lower.includes('maja') ||
                          lower.includes('sago') ||
                          lower.includes('jelly') ||
                          lower.includes('ube') ||
                          lower.includes('buko') ||
                          lower.includes('pandan') ||
                          lower.includes('paella') ||
                          lower.includes('valenciana') ||
                          lower.includes('broken window') ||
                          lower.includes('blitz') ||
                          lower.includes('choco') ||
                          lower.includes('zambo') ||
                          lower.includes('rainbow') ||
                          lower.includes('custard') ||
                          lower.includes('dubos') ||
                          lower.includes('enganos') ||
                          lower.includes('lychee') ||
                          lower.includes('toffee') ||
                          lower.includes('cookies') ||
                          lower.includes('strawberry') ||
                          lower.includes('blueberry') ||
                          lower.includes('beko') ||
                          lower.includes('bayot') ||
                          lower.includes('coffee jelly') ||
                          lower.includes('tart') ||
                          lower.includes('chow pat') ||
                          lower.includes('arroz') ||
                          lower.includes('pickled') ||
                          lower.includes('dilis') ||
                          (lower.includes('avocado') && lower.includes('pie'))
        return !isExcluded
      },
      side: (item) => {
        const lower = item.toLowerCase()
        return lower.includes('pancit') || 
               lower.includes('pasta') ||
               lower.includes('sotanghon') ||
               lower.includes('vegetable') ||
               lower.includes('guisado') ||
               lower.includes('misua') ||
               lower.includes('lasagna') ||
               lower.includes('carbonara') ||
               lower.includes('alfredo') ||
               lower.includes('ziti') ||
               lower.includes('fettuccine') ||
               lower.includes('penne') ||
               lower.includes('spaghetti') ||
               lower.includes('chow pat')
      },
      rice: (item) => {
        const lower = item.toLowerCase()
        return lower.includes('rice') || 
               lower.includes('paella') ||
               lower.includes('valenciana') ||
               lower.includes('arroz')
      },
      dessert: (item) => {
        const lower = item.toLowerCase()
        return lower.includes('cake') ||
               lower.includes('flan') ||
               lower.includes('float') ||
               lower.includes('torte') ||
               lower.includes('brownie') ||
               lower.includes('delight') ||
               (lower.includes('pie') && !lower.includes('spareribs')) ||
               lower.includes('cheesecake') ||
               lower.includes('tart') ||
               lower.includes('maja') ||
               lower.includes('sago') ||
               lower.includes('jelly') ||
               lower.includes('ube') ||
               lower.includes('buko') ||
               lower.includes('pandan') ||
               lower.includes('broken window') ||
               lower.includes('blitz') ||
               lower.includes('choco') ||
               lower.includes('zambo') ||
               lower.includes('rainbow') ||
               lower.includes('custard') ||
               lower.includes('dubos') ||
               lower.includes('enganos') ||
               lower.includes('lychee') ||
               lower.includes('toffee') ||
               lower.includes('cookies') ||
               lower.includes('avocado') ||
               lower.includes('strawberry') ||
               lower.includes('blueberry') ||
               lower.includes('coffee jelly') ||
               lower.includes('beko') ||
               lower.includes('bayot') ||
               (lower.includes('mango') && !lower.includes('salad')) ||
               (lower.includes('fruit') && !lower.includes('salad') && lower.includes('fresh'))
      }
    }
    
    const filter = categoryFilters[categoryId]
    if (!filter) return []
    
    return selectedOption.items.filter(filter)
  }

  // Check if a category has enough items (custom or default)
  const getCategoryStatus = (categoryId, requiredCount) => {
    const customCount = (booking.customDishes[categoryId] || []).length
    const defaultItems = getDefaultItemsForCategory(categoryId)
    const isCustomBuildMenu = menuPackages[booking.selectedPackage]?.isCustomBuild
    
    // For custom build menus, only count user selections
    // For preset menus, count custom + defaults
    const totalAvailable = isCustomBuildMenu 
      ? customCount
      : (customCount > 0 ? customCount : defaultItems.length)
    
    return {
      hasItems: totalAvailable >= requiredCount, // Has required number of items
      count: totalAvailable,
      needed: requiredCount,
      isCustom: customCount > 0,
      isLow: totalAvailable < requiredCount && totalAvailable > 0 // Has some but not enough
    }
  }

  // Get all missing categories (completely empty or not meeting requirements)
  const getMissingCategories = () => {
    const missing = []
    const isCustomBuildMenu = menuPackages[booking.selectedPackage]?.isCustomBuild
    
    DISH_CATEGORIES.forEach(cat => {
      const status = getCategoryStatus(cat.id, cat.pick)
      // For custom build: missing if count < required
      // For preset: missing if no items at all
      if (isCustomBuildMenu ? status.count < cat.pick : !status.hasItems) {
        missing.push({
          ...cat,
          count: status.count,
          needed: status.needed
        })
      }
    })
    return missing
  }

  // Get categories with low item count (has some but below recommended)
  const getLowCategories = () => {
    const low = []
    DISH_CATEGORIES.forEach(cat => {
      const status = getCategoryStatus(cat.id, cat.pick)
      if (status.isLow) {
        low.push({
          ...cat,
          count: status.count,
          needed: status.needed
        })
      }
    })
    return low
  }

  const missingCategories = getMissingCategories()
  const lowCategories = getLowCategories()

  // Calculate total with new add-ons
  const calculateTotal = () => {
    const pkg = menuPackages[booking.selectedPackage]
    if (!pkg) return 0
    
    const pricePerHead = calculatePricePerHead(booking.selectedPackage, booking.numberOfPax)
    const menuTotal = pricePerHead * booking.numberOfPax
    
    // Station add-ons
    const stationsTotal = booking.addOns.reduce((sum, a) => {
      const item = addOnStations.find(s => s.id === a.id)
      return sum + (item ? item.price * (a.quantity || 1) : 0)
    }, 0)
    
    // Drink add-ons
    const drinkTotal = booking.drinkAddOns.reduce((sum, d) => {
      const item = additionalDrinks.find(s => s.id === d.id)
      return sum + (item ? item.price * (d.quantity || 1) : 0)
    }, 0)
    
    // Gas charge based on venue location
    const gasCharge = booking.venueGasCharge || 0
    
    return menuTotal + stationsTotal + drinkTotal + gasCharge
  }

  // Get motif display string
  const getMotifDisplay = () => {
    if (booking.motifType === 'preset' && booking.motifPreset) {
      const preset = presetMotifColors.find(p => p.id === booking.motifPreset)
      return preset?.name || ''
    }
    if (booking.motifType === 'custom') {
      return `Custom: ${booking.motif || booking.motifColors.join(', ')}`
    }
    return booking.motif || '-'
  }

  // Get occasion display string
  const getOccasionDisplay = () => {
    if (!booking.occasion) return '-'
    const occ = occasionTypes.find(o => o.id === booking.occasion)
    let display = occ?.name || booking.occasion
    
    if (booking.occasion === 'other' && booking.occasionOther) {
      display = booking.occasionOther
    }
    if (booking.occasion === 'birthday' && booking.birthdayCelebrant) {
      display += ` (${booking.birthdayCelebrant === 'boy' ? 'Boy' : 'Girl'}, ${booking.birthdayAge} years old)`
    }
    return display
  }

  const handleSubmit = async () => {
    if (!isValidDate(booking.date)) {
      setError('Cannot book for past dates. Please select a future date.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const customerName = isAdmin ? booking.customerName : (profile?.full_name || user.user_metadata?.full_name || 'Customer')
      const customerPhone = isAdmin ? booking.customerPhone : (profile?.phone || user.user_metadata?.phone || '')
      const customerEmail = isAdmin ? booking.customerEmail : user.email

      const customDishesArray = Object.values(booking.customDishes).flat()

      const bookingData = {
        user_id: isAdmin ? null : user.id, 
        customer_name: customerName, 
        customer_phone: customerPhone, 
        customer_email: customerEmail,
        venue: booking.venue,
        venue_address: booking.venueAddress, // Structured address {city, barangay, street, landmark}
        gas_charge: booking.venueGasCharge || 0, // Gas charge based on location
        event_date: booking.date, 
        event_time: booking.time, 
        menu_package: booking.selectedPackage,
        menu_option: booking.selectedMenuOption, 
        number_of_pax: booking.numberOfPax, 
        add_ons: booking.addOns,
        custom_dishes: customDishesArray,
        // Enhanced fields
        motif: getMotifDisplay(), 
        motif_type: booking.motifType,
        motif_preset: booking.motifPreset,
        motif_colors: booking.motifColors,
        occasion: booking.occasion,
        occasion_other: booking.occasionOther,
        birthday_celebrant: booking.birthdayCelebrant,
        birthday_age: booking.birthdayAge,
        free_drink: booking.freeDrink,
        drink_add_ons: booking.drinkAddOns,
        swapped_dishes: booking.swappedDishes,
        special_requests: booking.specialRequests, 
        total_amount: calculateTotal(), 
        status: 'pending'
      }

      const { data, error: insertError } = await supabase.from('bookings').insert([bookingData]).select().single()
      if (insertError) throw insertError

      navigate(isAdmin ? '/admin/bookings' : '/my-orders')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Event Details</h2>
      
      {isAdmin && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-blue-700 font-medium mb-3"> Customer Information (Admin Booking)</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="text" value={booking.customerName} onChange={(e) => updateBooking('customerName', e.target.value)} placeholder="Customer full name" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input type="tel" value={booking.customerPhone} onChange={(e) => updateBooking('customerPhone', e.target.value)} placeholder="09XX XXX XXXX" required className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input type="email" value={booking.customerEmail} onChange={(e) => updateBooking('customerEmail', e.target.value)} placeholder="email@example.com" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Occasion Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <PartyPopper className="inline mr-2" size={16} />
          Occasion *
        </label>
        <select 
          value={booking.occasion} 
          onChange={(e) => {
            updateBooking('occasion', e.target.value)
            // Reset birthday fields if not birthday
            if (e.target.value !== 'birthday') {
              updateBooking('birthdayCelebrant', '')
              updateBooking('birthdayAge', '')
            }
          }}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select occasion</option>
          {occasionTypes.map(occ => (
            <option key={occ.id} value={occ.id}>{occ.name}</option>
          ))}
        </select>
      </div>

      {/* Birthday-specific fields */}
      {booking.occasion === 'birthday' && (
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 space-y-3">
          <p className="text-pink-700 font-medium flex items-center gap-2">
            <Gift size={18} /> Birthday Details
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Celebrant *</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateBooking('birthdayCelebrant', 'boy')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    booking.birthdayCelebrant === 'boy' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <span class="w-5 h-5 rounded-full bg-blue-400 inline-flex items-center justify-center text-white text-xs font-bold">B</span> Boy
                </button>
                <button
                  type="button"
                  onClick={() => updateBooking('birthdayCelebrant', 'girl')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    booking.birthdayCelebrant === 'girl' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-pink-300'
                  }`}
                >
                  <span class="w-5 h-5 rounded-full bg-pink-400 inline-flex items-center justify-center text-white text-xs font-bold">G</span> Girl
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
              <input 
                type="number" 
                value={booking.birthdayAge} 
                onChange={(e) => updateBooking('birthdayAge', e.target.value)} 
                placeholder="Age"
                min="1"
                max="120"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Other occasion text field */}
      {booking.occasion === 'other' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Please specify occasion *</label>
          <input 
            type="text" 
            value={booking.occasionOther} 
            onChange={(e) => updateBooking('occasionOther', e.target.value)} 
            placeholder="Enter occasion"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
          />
        </div>
      )}

      {/* Venue Address - Cebu Only */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
          <MapPin size={18} className="text-red-600" />
          Venue Address (Cebu Only) *
        </label>
        
        {/* Service Area Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <Info size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">Service limited to <strong>Metro Cebu</strong> and nearby areas.</p>
        </div>
        
        {/* City Selection */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">City / Municipality *</label>
          <select
            value={booking.venueAddress.city}
            onChange={(e) => {
              const cityId = e.target.value
              const gasCharge = getGasCharge(cityId) || 0
              updateBooking('venueAddress', { ...booking.venueAddress, city: cityId, barangay: '' })
              updateBooking('venueGasCharge', gasCharge)
              // Also update venue string for backward compatibility
              if (cityId) {
                const cityInfo = getCityInfo(cityId)
                updateBooking('venue', cityInfo?.name || '')
              }
            }}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          >
            <option value="">Select city...</option>
            {getCityList().map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
                {city.gasCharge > 0 && ` (+₱${city.gasCharge} gas)`}
                {city.requiresQuote && ' (Quote needed)'}
              </option>
            ))}
          </select>
        </div>
        
        {/* Barangay Selection */}
        {booking.venueAddress.city && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Barangay *</label>
            <select
              value={booking.venueAddress.barangay}
              onChange={(e) => {
                updateBooking('venueAddress', { ...booking.venueAddress, barangay: e.target.value })
              }}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="">Select barangay...</option>
              {getBarangays(booking.venueAddress.city).map(brgy => (
                <option key={brgy} value={brgy}>{brgy}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Street / Venue Name */}
        {booking.venueAddress.city && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Street / Building / Venue Name *</label>
            <input
              type="text"
              value={booking.venueAddress.street}
              onChange={(e) => {
                updateBooking('venueAddress', { ...booking.venueAddress, street: e.target.value })
                // Update venue string
                const fullAddress = formatAddress(e.target.value, booking.venueAddress.barangay, booking.venueAddress.city, booking.venueAddress.landmark)
                updateBooking('venue', fullAddress)
              }}
              required
              placeholder="e.g., Function Room, ABC Hotel"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}
        
        {/* Landmark */}
        {booking.venueAddress.city && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Landmark <span className="text-gray-400">(Optional)</span></label>
            <input
              type="text"
              value={booking.venueAddress.landmark}
              onChange={(e) => {
                updateBooking('venueAddress', { ...booking.venueAddress, landmark: e.target.value })
                const fullAddress = formatAddress(booking.venueAddress.street, booking.venueAddress.barangay, booking.venueAddress.city, e.target.value)
                updateBooking('venue', fullAddress)
              }}
              placeholder="e.g., Near SM City, Beside BDO"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}
        
        {/* Gas Charge Display */}
        {booking.venueAddress.city && !requiresQuotation(booking.venueAddress.city) && (
          <div className={`rounded-xl p-4 flex items-center justify-between ${
            booking.venueGasCharge === 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
          }`}>
            <div className="flex items-center gap-2">
              <Fuel size={20} className={booking.venueGasCharge === 0 ? 'text-green-600' : 'text-amber-600'} />
              <span className={`font-medium ${booking.venueGasCharge === 0 ? 'text-green-700' : 'text-amber-700'}`}>
                Gas Charge:
              </span>
            </div>
            <span className={`font-bold text-lg ${booking.venueGasCharge === 0 ? 'text-green-700' : 'text-amber-700'}`}>
              {booking.venueGasCharge === 0 ? 'FREE' : `₱${booking.venueGasCharge.toLocaleString()}`}
            </span>
          </div>
        )}
        
        {/* Requires Quote Warning */}
        {booking.venueAddress.city && requiresQuotation(booking.venueAddress.city) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-amber-800">Quotation Required</p>
              <p className="text-sm text-amber-700 mt-1">{getCityInfo(booking.venueAddress.city)?.note || 'This area requires a custom quote.'}</p>
              <p className="text-sm text-amber-700 mt-2 flex items-center gap-1">
                <Phone size={14} /> Call: <strong>0917-187-6510</strong>
              </p>
            </div>
          </div>
        )}
        
        {/* Min Pax Warning */}
        {booking.venueAddress.city && getMinimumPax(booking.venueAddress.city) > 30 && booking.numberOfPax < getMinimumPax(booking.venueAddress.city) && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              <strong>{getCityInfo(booking.venueAddress.city)?.name}</strong> requires minimum <strong>{getMinimumPax(booking.venueAddress.city)} guests</strong>.
            </p>
          </div>
        )}
        
        {/* Address Preview */}
        {booking.venueAddress.city && booking.venueAddress.barangay && booking.venueAddress.street && (
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-500 mb-1">Complete Address:</p>
            <p className="font-medium text-gray-800">{booking.venue}</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input type="date" value={booking.date} onChange={handleDateChange} min={getMinDate()} required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time * {isSameDayAdmin && '(8hrs min)'}</label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
            <select 
              value={booking.time} 
              onChange={(e) => updateBooking('time', e.target.value)} 
              required 
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none bg-white"
            >
              <option value="">Select time</option>
              {[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22].flatMap(hour => {
                const minHour = isSameDayAdmin ? parseInt(getMinTimeForToday()?.split(':')[0] || 0) : 0
                if (isSameDayAdmin && hour < minHour) return []
                const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
                const ampm = hour >= 12 ? 'PM' : 'AM'
                return [
                  <option key={`${hour}:00`} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {hour === 12 ? '12:00 PM' : `${displayHour}:00 ${ampm}`}
                  </option>,
                  <option key={`${hour}:30`} value={`${hour.toString().padStart(2, '0')}:30`}>
                    {hour === 12 ? '12:30 PM' : `${displayHour}:30 ${ampm}`}
                  </option>
                ]
              })}
            </select>
          </div>
        </div>
      </div>
      {/* Date booking notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
        <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={16} />
        <p className="text-sm text-amber-800">
          {isAdmin 
            ? 'Admin: Same-day events require at least 8 hours advance notice.' 
            : 'Bookings must be made at least 2 days in advance for preparation.'}
        </p>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  )

  const renderStep2 = () => {
    const selectedPkg = booking.selectedPackage ? menuPackages[booking.selectedPackage] : null
    const isCustomBuild = selectedPkg?.isCustomBuild
    
    return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Select Menu Package</h2>
      <div className="space-y-3">
        {Object.values(menuPackages).map(pkg => (
          <button key={pkg.id} onClick={() => { 
            updateBooking('selectedPackage', pkg.id); 
            // Auto-select for custom build menus
            if (pkg.isCustomBuild) {
              updateBooking('selectedMenuOption', pkg.options[0].name);
            } else {
              updateBooking('selectedMenuOption', ''); 
            }
            updateBooking('customDishes', {}); 
          }} className={`w-full p-4 rounded-xl border-2 text-left ${booking.selectedPackage === pkg.id ? 'border-red-700 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{pkg.name}</h3>
                <p className="text-red-600">₱{pkg.pricePerHead}/head</p>
                {pkg.id === 'menu470' ? (
                  <p className="text-xs text-blue-600 mt-1">ðŸ› ï¸ Build Your Own â€¢ ðŸš Plain Rice & Fried Rice only</p>
                ) : pkg.id === 'menu510' ? (
                  <p className="text-xs text-blue-600 mt-1">ðŸ› ï¸ Build Your Own â€¢ 4 Main, 1 Side â€¢ ðŸš Plain, Fried & Arroz Valenciana</p>
                ) : pkg.isCustomBuild ? (
                  <p className="text-xs text-blue-600 mt-1">ðŸ› ï¸ Build Your Own Menu</p>
                ) : (
                  <p className="text-xs text-green-600 mt-1"> Preset Buffet â€¢ ðŸš All rice options available</p>
                )}
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${booking.selectedPackage === pkg.id ? 'border-red-700 bg-red-700' : 'border-gray-300'}`}>
                {booking.selectedPackage === pkg.id && <Check size={14} className="text-white" />}
              </div>
            </div>
          </button>
        ))}
      </div>
      {booking.selectedPackage && !isCustomBuild && (
        <div className="bg-gray-50 rounded-xl p-4">
          <label className="block text-sm font-semibold text-red-700 uppercase mb-3">Select Base Menu</label>
          <div className="space-y-2">
            {menuPackages[booking.selectedPackage]?.options.map((option, idx) => (
              <div key={idx}>
                <button 
                  onClick={() => updateBooking('selectedMenuOption', option.name)} 
                  className={`w-full p-3 rounded-lg text-left ${booking.selectedMenuOption === option.name ? 'bg-red-700 text-white' : 'bg-white border border-gray-200 hover:bg-red-50'}`}
                >
                  {option.name}
                </button>
                {booking.selectedMenuOption === option.name && (
                  <div className="mt-2 p-3 bg-white border border-red-200 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Included Dishes:</p>
                    <div className="flex flex-wrap gap-1">
                      {option.items.map((item, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item}</span>
                      ))}
                    </div>
                    <p className="text-xs text-green-600 mt-2"> [check]  You can customize these in the next step</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Note for Menu 560 about Asian Fusion swaps */}
          {booking.selectedPackage === 'menu560' && (
            <div className="mt-3 bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-xs text-orange-700">
                ðŸ’¡ <strong>Tip:</strong> In the next step, you can swap dishes from your selected menu with Asian Fusion alternatives like Pad Thai, Chinese Lumpia, Japanese Cheesecake, and more!
              </p>
            </div>
          )}
        </div>
      )}
      {booking.selectedPackage && isCustomBuild && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-sm font-semibold text-blue-700 uppercase mb-3">ðŸ› ï¸ Build Your Own Menu</p>
          <p className="text-sm text-blue-800 mb-3">Pick your dishes in the next step:</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {selectedPkg?.structure?.salad > 0 && (
              <div className="bg-white rounded-lg p-2 text-center">
                <span className="text-green-600"></span> {selectedPkg.structure.salad} Salad
              </div>
            )}
            {selectedPkg?.structure?.main > 0 && (
              <div className="bg-white rounded-lg p-2 text-center">
                <span className="text-red-600">ðŸ–</span> {selectedPkg.structure.main} Main {selectedPkg.structure.main > 1 ? 'Dishes' : 'Dish'}
              </div>
            )}
            {selectedPkg?.structure?.side > 0 && (
              <div className="bg-white rounded-lg p-2 text-center">
                <span className="text-orange-600"></span> {selectedPkg.structure.side} {selectedPkg.structure.side > 1 ? 'Sides' : 'Side'}
              </div>
            )}
            {selectedPkg?.structure?.rice > 0 && (
              <div className="bg-white rounded-lg p-2 text-center">
                <span className="text-amber-600">ðŸš</span> {selectedPkg.structure.rice} Rice
              </div>
            )}
            {selectedPkg?.structure?.dessert > 0 && (
              <div className="bg-white rounded-lg p-2 text-center">
                <span className="text-pink-600">ðŸ°</span> {selectedPkg.structure.dessert} {selectedPkg.structure.dessert > 1 ? 'Desserts' : 'Dessert'}
              </div>
            )}
          </div>
          {booking.selectedPackage === 'menu470' && (
            <p className="text-xs text-blue-600 mt-3"> [check]  Rice: Plain Rice & Fried Rice only</p>
          )}
          {booking.selectedPackage === 'menu510' && (
            <p className="text-xs text-blue-600 mt-3"> [check]  Rice: Plain Rice, Fried Rice & Arroz Valenciana</p>
          )}
        </div>
      )}
    </div>
  )}

  const renderStep3 = () => {
    const selectedOption = booking.selectedMenuOption && booking.selectedPackage 
      ? menuPackages[booking.selectedPackage]?.options.find(o => o.name === booking.selectedMenuOption)
      : null
    const isCustomBuild = menuPackages[booking.selectedPackage]?.isCustomBuild
    const currentPkg = menuPackages[booking.selectedPackage]
    const allowSwap = currentPkg?.allowSwap // Menu 560 allows swapping
    const isPresetMenu = ['menu660', 'menu810'].includes(booking.selectedPackage) // 560 removed - it allows swaps

    // For preset menus (660, 810) - no customization, just show the menu
    if (isPresetMenu) {
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Selected Menu</h2>
            <p className="text-gray-500 text-sm">Review your menu selection</p>
          </div>

          {selectedOption && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-3"> [check]  {selectedOption.name}</h3>
              <div className="space-y-2">
                {selectedOption.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              <Info size={16} className="inline mr-2" />
              This is a preset buffet menu. Dishes are fixed and cannot be customized.
            </p>
          </div>
        </div>
      )
    }

    // For Menu 560 - allow swapping with Asian Fusion alternatives
    if (allowSwap && currentPkg?.swapAlternatives) {
      const swapItems = currentPkg.swapAlternatives.items
      const swapName = currentPkg.swapAlternatives.name
      
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Customize Your Menu</h2>
            <p className="text-gray-500 text-sm">Swap dishes with {swapName} alternatives (optional)</p>
          </div>

          {selectedOption && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-3"> Your Base Menu: {selectedOption.name}</h3>
              <div className="space-y-2">
                {selectedOption.items.map((item, i) => {
                  const isSwapped = booking.swappedDishes?.some(s => s.original === item)
                  const swappedWith = booking.swappedDishes?.find(s => s.original === item)?.replacement
                  return (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      {isSwapped ? (
                        <>
                          <span className="text-gray-400 line-through">{item}</span>
                          <span className="text-red-600">â†’</span>
                          <span className="font-medium text-red-700">{swappedWith}</span>
                        </>
                      ) : (
                        <>
                          <Check size={14} className="text-green-600" />
                          <span>{item}</span>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Asian Fusion Swap Options */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <h3 className="font-semibold text-orange-800 mb-3">ðŸ”„ {swapName} Alternatives</h3>
            <p className="text-sm text-orange-700 mb-3">Select items below to swap with your base menu dishes:</p>
            
            <div className="space-y-4">
              {/* Group by category */}
              {['main', 'side', 'rice', 'dessert', 'soup'].map(cat => {
                const catItems = swapItems.filter(item => item.category === cat)
                if (catItems.length === 0) return null
                
                const catLabels = { main: 'ðŸ– Main Dishes', side: ' Sides', rice: 'ðŸš Rice', dessert: 'ðŸ° Desserts', soup: 'ðŸ² Soup' }
                
                return (
                  <div key={cat}>
                    <p className="text-xs font-semibold text-orange-700 uppercase mb-2">{catLabels[cat]}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {catItems.map((item, idx) => {
                        const isSelected = booking.swappedDishes?.some(s => s.replacement === item.name)
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              if (isSelected) {
                                // Remove swap
                                updateBooking('swappedDishes', (booking.swappedDishes || []).filter(s => s.replacement !== item.name))
                              } else {
                                // Find a matching item from base menu to swap
                                const baseItems = selectedOption?.items || []
                                const alreadySwapped = (booking.swappedDishes || []).map(s => s.original)
                                const availableToSwap = baseItems.filter(b => !alreadySwapped.includes(b))
                                
                                // Try to match by category (crude matching)
                                let matchedBase = null
                                if (cat === 'dessert') {
                                  matchedBase = availableToSwap.find(b => 
                                    b.toLowerCase().includes('cake') || 
                                    b.toLowerCase().includes('pie') || 
                                    b.toLowerCase().includes('sago') ||
                                    b.toLowerCase().includes('beko') ||
                                    b.toLowerCase().includes('jelly')
                                  )
                                } else if (cat === 'rice') {
                                  matchedBase = availableToSwap.find(b => 
                                    b.toLowerCase().includes('rice') || 
                                    b.toLowerCase().includes('paella')
                                  )
                                } else if (cat === 'side') {
                                  matchedBase = availableToSwap.find(b => 
                                    b.toLowerCase().includes('pasta') || 
                                    b.toLowerCase().includes('pancit') ||
                                    b.toLowerCase().includes('guisado') ||
                                    b.toLowerCase().includes('alfredo')
                                  )
                                } else {
                                  // Main dishes - pick first available that's not salad/rice/dessert
                                  matchedBase = availableToSwap.find(b => 
                                    !b.toLowerCase().includes('salad') &&
                                    !b.toLowerCase().includes('rice') &&
                                    !b.toLowerCase().includes('cake') &&
                                    !b.toLowerCase().includes('pie') &&
                                    !b.toLowerCase().includes('sago')
                                  )
                                }
                                
                                if (matchedBase) {
                                  updateBooking('swappedDishes', [...(booking.swappedDishes || []), { original: matchedBase, replacement: item.name }])
                                }
                              }
                            }}
                            className={`p-3 rounded-lg text-left flex items-center justify-between transition-all ${
                              isSelected 
                                ? 'bg-orange-600 text-white' 
                                : 'bg-white border border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <span className="text-sm">{item.name}</span>
                            {isSelected && <Check size={16} />}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Summary of swaps */}
          {booking.swappedDishes?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <h3 className="font-semibold text-red-700 mb-2">ðŸ“ Your Swaps</h3>
              <div className="space-y-1">
                {booking.swappedDishes.map((swap, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">{swap.original}</span>
                    <span className="text-red-600">â†’</span>
                    <span className="font-medium text-red-700">{swap.replacement}</span>
                    <button 
                      onClick={() => updateBooking('swappedDishes', booking.swappedDishes.filter((_, idx) => idx !== i))}
                      className="ml-auto text-red-400 hover:text-red-600"
                    >
                       X 
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              <Info size={16} className="inline mr-2" />
              Swapping is optional. Your base {selectedOption?.name} will be served if no swaps are selected.
            </p>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {isCustomBuild ? 'Build Your Menu' : 'Customize Your Menu'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isCustomBuild ? 'Select dishes for each category' : 'Swap dishes to your preference (optional)'}
          </p>
        </div>

        {selectedOption && !isCustomBuild && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-800 mb-2"> Your Base Menu: {selectedOption.name}</h3>
            <div className="flex flex-wrap gap-1">
              {selectedOption.items.map((item, i) => (
                <span key={i} className="text-xs bg-white px-2 py-1 rounded-full border">{item}</span>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-3">ðŸ‘‡ Select dishes below to swap any items you'd like to change</p>
          </div>
        )}

        {isCustomBuild && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-amber-800 mb-2">ðŸ› ï¸ {menuPackages[booking.selectedPackage]?.name} - Build Your Own</h3>
            <p className="text-sm text-amber-700">Select dishes from each category below. All selections are required.</p>
          </div>
        )}

        {DISH_CATEGORIES.map(category => {
          const categoryDishes = getDishesForCategory(category)
          const selected = getSelectedDishesForCategory(category.id)
          const subLabel = getCategorySubLabel(category)

          return (
            <div key={category.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{category.name}</h3>
                  {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selected.length >= category.pick 
                    ? 'bg-green-100 text-green-700' 
                    : selected.length > 0 
                      ? category.color 
                      : isCustomBuild 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-gray-200 text-gray-600'
                }`}>
                  {selected.length >= category.pick 
                    ? ` [check]  ${selected.length} selected` 
                    : selected.length > 0 
                      ? `${selected.length}/${category.pick} selected` 
                      : isCustomBuild 
                        ? `Select ${category.pick}` 
                        : 'Using default'}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
                {categoryDishes.map(dish => {
                  const isSelected = selected.some(d => d.id === dish.id)
                  return (
                    <button
                      key={dish.id}
                      onClick={() => toggleDish(category.id, dish, category.pick)}
                      className={`p-3 rounded-lg text-left flex items-center justify-between ${isSelected ? 'bg-red-700 text-white' : 'bg-white border border-gray-200 hover:border-red-300'}`}
                    >
                      <span className="text-sm">{dish.name}</span>
                      {isSelected && <Check size={16} />}
                    </button>
                  )
                })}
              </div>

              {categoryDishes.length === 0 && (
                <p className="text-gray-400 text-center py-4">No dishes available in this category</p>
              )}
            </div>
          )
        })}

        {/* Final Menu Summary */}
        <div className="bg-white border-2 border-red-200 rounded-xl p-4">
          <h3 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
            <UtensilsCrossed size={18} /> Your Final Menu
          </h3>
          
          {!isCustomBuild && Object.values(booking.customDishes).flat().length > 0 && (
            <p className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded inline-block mb-3">
              âœï¸ Some items modified from {booking.selectedMenuOption}
            </p>
          )}

          {isCustomBuild && (
            <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded inline-block mb-3">
              ðŸ› ï¸ Build Your Own - {menuPackages[booking.selectedPackage]?.name}
            </p>
          )}
          
          <div className="space-y-3">
            {DISH_CATEGORIES.map((cat, idx) => {
              const icons = { salad: '', main: 'ðŸ–', side: '', rice: 'ðŸš', dessert: 'ðŸ°' }
              const colors = { salad: 'text-green-700', main: 'text-red-700', side: 'text-orange-700', rice: 'text-amber-700', dessert: 'text-pink-700' }
              const selected = booking.customDishes[cat.id] || []
              const isLast = idx === DISH_CATEGORIES.length - 1
              
              return (
                <div key={cat.id} className={!isLast ? 'border-b border-gray-100 pb-2' : ''}>
                  <p className={`text-xs font-semibold uppercase mb-1 ${colors[cat.id]}`}>
                    {icons[cat.id]} {cat.name} ({cat.pick})
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selected.length > 0 ? (
                      <>
                        {selected.map(d => (
                          <span key={d.id} className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">{d.name}</span>
                        ))}
                        {selected.length >= cat.pick && <span className="text-xs text-green-600 ml-1"> [check] </span>}
                        {selected.length < cat.pick && <span className="text-xs text-amber-600 ml-1">({selected.length}/{cat.pick})</span>}
                      </>
                    ) : isCustomBuild ? (
                      <span className="text-sm text-gray-400 italic">Select {cat.pick} {cat.name.toLowerCase()}</span>
                    ) : (
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">From base menu</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Warning if categories are missing */}
        {missingCategories.length > 0 ? (
          <div className="bg-red-50 border border-red-300 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-red-800">
              <p className="font-medium">{isCustomBuild ? 'ðŸ› ï¸ Please Complete Your Menu' : 'âš ï¸ Menu Incomplete - Cannot Continue'}</p>
              <p className="mb-2">{isCustomBuild ? 'Select items for the following:' : 'The following categories have no items:'}</p>
              <ul className="list-disc list-inside space-y-1">
                {missingCategories.map(cat => (
                  <li key={cat.id}>
                    <span className="font-medium">{cat.name}</span>: Select {cat.needed}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-red-700">{isCustomBuild ? 'Pick from the options above to continue.' : 'Please select items above or choose a different menu option.'}</p>
            </div>
          </div>
        ) : lowCategories.length > 0 && !isCustomBuild ? (
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-amber-800">
              <p className="font-medium"> [i]  Note: Some categories have fewer items than usual</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                {lowCategories.map(cat => (
                  <li key={cat.id}>
                    <span className="font-medium">{cat.name}</span>: {cat.count} of {cat.needed} items
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-amber-700">This is normal for this menu option. You can continue or select additional items above.</p>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-green-800">
              <p className="font-medium"> [check]  Menu Complete - Ready to Continue!</p>
              <p>Review your menu above. You can go back anytime to make changes.</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Guests & Add-ons</h2>
      
      {/* Number of Pax */}
      <div className="bg-red-50 rounded-xl p-4 border border-red-100">
        <label className="block text-sm font-semibold text-red-700 mb-3">Number of Pax (Min. 30)</label>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-800">{booking.numberOfPax} guests</p>
            <p className="text-sm text-gray-500">₱{calculatePricePerHead(booking.selectedPackage, booking.numberOfPax)}/head</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => updateBooking('numberOfPax', Math.max(30, booking.numberOfPax - 5))} className="w-10 h-10 rounded-full bg-white border flex items-center justify-center hover:bg-gray-50"><Minus size={18} /></button>
            <button onClick={() => updateBooking('numberOfPax', booking.numberOfPax + 5)} className="w-10 h-10 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800"><Plus size={18} /></button>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-red-200 flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-red-700">₱{(calculatePricePerHead(booking.selectedPackage, booking.numberOfPax) * booking.numberOfPax).toLocaleString()}</span>
        </div>
      </div>

      {/* Free Drinks Selection */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
        <label className="block text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
          <Droplets size={18} /> Free Drinks (1 Round Included)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {freeDrinkOptions.map(drink => (
            <button
              key={drink.id}
              onClick={() => updateBooking('freeDrink', drink.id)}
              className={`p-3 rounded-lg text-left transition-all ${
                booking.freeDrink === drink.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-200 hover:border-blue-300'
              }`}
            >
              <p className="font-medium">{drink.name}</p>
              <p className={`text-xs ${booking.freeDrink === drink.id ? 'text-blue-100' : 'text-gray-500'}`}>{drink.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Additional Drinks */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Droplets size={18} /> Additional Drinks (Optional)
        </label>
        <div className="space-y-2">
          {additionalDrinks.map(drink => {
            const sel = booking.drinkAddOns.find(a => a.id === drink.id)
            return (
              <div key={drink.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <button onClick={() => toggleDrinkAddOn(drink)} className="flex items-center gap-3 flex-1">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${sel ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                    {sel && <Check size={12} className="text-white" />}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{drink.name}</p>
                    <p className="text-sm text-gray-500">₱{drink.price} {drink.unit}</p>
                  </div>
                </button>
                {sel && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateDrinkQty(drink.id, sel.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><Minus size={12} /></button>
                    <span className="w-8 text-center text-sm">{sel.quantity}</span>
                    <button onClick={() => updateDrinkQty(drink.id, sel.quantity + 1)} className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center"><Plus size={12} /></button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Station Add-ons */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Add-on Stations</label>
        <div className="space-y-2">
          {addOnStations.map(addon => { 
            const sel = booking.addOns.find(a => a.id === addon.id)
            return (
              <div key={addon.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
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
                    <button onClick={() => updateAddOnQty(addon.id, sel.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"><Minus size={12} /></button>
                    <span className="w-6 text-center text-sm">{sel.quantity}</span>
                    <button onClick={() => updateAddOnQty(addon.id, sel.quantity + 1)} className="w-6 h-6 rounded-full bg-red-700 text-white flex items-center justify-center"><Plus size={12} /></button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Motif & Requests</h2>
      
      {/* Motif Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Event Motif/Theme</label>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => updateBooking('motifType', 'preset')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              booking.motifType === 'preset' 
                ? 'bg-red-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Choose Preset
          </button>
          <button
            onClick={() => updateBooking('motifType', 'custom')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              booking.motifType === 'custom' 
                ? 'bg-red-700 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Custom Colors
          </button>
        </div>

        {/* Preset Motifs */}
        {booking.motifType === 'preset' && (
          <div className="grid grid-cols-2 gap-2">
            {presetMotifColors.map(preset => (
              <button
                key={preset.id}
                onClick={() => updateBooking('motifPreset', preset.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  booking.motifPreset === preset.id 
                    ? 'border-red-700 bg-red-50' 
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {preset.colors.map((color, i) => (
                    <div 
                      key={i} 
                      className="w-5 h-5 rounded-full border border-gray-300" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-gray-800">{preset.name}</p>
              </button>
            ))}
          </div>
        )}

        {/* Custom Colors */}
        {booking.motifType === 'custom' && (
          <div className="space-y-4">
            <div className="relative">
              <Palette className="absolute left-3 top-3 text-gray-400" size={20} />
              <input 
                type="text" 
                value={booking.motif} 
                onChange={(e) => updateBooking('motif', e.target.value)} 
                placeholder="Describe your motif (e.g., Rustic Garden, Under the Sea)" 
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Select Colors</label>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={booking.motifColors[0]} 
                      onChange={(e) => updateBooking('motifColors', [e.target.value, booking.motifColors[1]])} 
                      className="w-12 h-12 rounded-lg cursor-pointer border-0"
                    />
                    <span className="text-sm text-gray-600">{booking.motifColors[0]}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="color" 
                      value={booking.motifColors[1]} 
                      onChange={(e) => updateBooking('motifColors', [booking.motifColors[0], e.target.value])} 
                      className="w-12 h-12 rounded-lg cursor-pointer border-0"
                    />
                    <span className="text-sm text-gray-600">{booking.motifColors[1]}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-500 mb-2">Preview:</p>
              <div 
                className="h-8 rounded-lg" 
                style={{ 
                  background: `linear-gradient(135deg, ${booking.motifColors[0]} 0%, ${booking.motifColors[1]} 100%)` 
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
        <textarea value={booking.specialRequests} onChange={(e) => updateBooking('specialRequests', e.target.value)} placeholder="Any special requirements..." className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]" />
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-amber-800">
          <p className="font-medium">Booking Policy</p>
          <p>₱5,000 deposit required. Non-refundable but consumable.</p>
        </div>
      </div>
    </div>
  )

  const renderStep6 = () => {
    const pkg = menuPackages[booking.selectedPackage]
    const pph = calculatePricePerHead(booking.selectedPackage, booking.numberOfPax)
    const total = calculateTotal()
    const displayName = isAdmin ? booking.customerName : (profile?.full_name || 'Customer')
    const displayPhone = isAdmin ? booking.customerPhone : (profile?.phone || '')
    const customDishesArray = Object.values(booking.customDishes).flat()
    const selectedOption = menuPackages[booking.selectedPackage]?.options.find(o => o.name === booking.selectedMenuOption)
    
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Review Order</h2>
        {isAdmin && <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm font-medium"> Admin Booking - Status will be set to "Pending"</div>}
        
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-red-200">
            <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white font-bold">RC</div>
            <div>
              <p className="font-semibold text-gray-800">{displayName}</p>
              <p className="text-sm text-gray-500">{displayPhone}</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">Occasion</span><span className="font-medium">{getOccasionDisplay()}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Date & Time</span><span className="font-medium">{booking.date} at {formatTime(booking.time)}</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Venue</span><span className="font-medium text-right max-w-[60%]">{booking.venue}</span></div>
            <div className="flex justify-between">
              <span className="text-gray-600">Motif</span>
              <span className="font-medium flex items-center gap-2">
                {booking.motifType === 'preset' && booking.motifPreset ? (
                  <>
                    {presetMotifColors.find(p => p.id === booking.motifPreset)?.colors.map((c, i) => (
                      <span key={i} className="w-4 h-4 rounded-full border" style={{ backgroundColor: c }} />
                    ))}
                    {presetMotifColors.find(p => p.id === booking.motifPreset)?.name}
                  </>
                ) : booking.motifType === 'custom' ? (
                  <>
                    {booking.motifColors.map((c, i) => (
                      <span key={i} className="w-4 h-4 rounded-full border" style={{ backgroundColor: c }} />
                    ))}
                    {booking.motif || 'Custom'}
                  </>
                ) : '-'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Free Drink</span>
              <span className="font-medium">{freeDrinkOptions.find(d => d.id === booking.freeDrink)?.name || '-'}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>{pkg?.name}</span><span>{booking.selectedMenuOption}</span></div>
            <div className="flex justify-between"><span>{booking.numberOfPax} pax × ₱{pph}</span><span className="font-medium">₱{(pph * booking.numberOfPax).toLocaleString()}</span></div>
            
            {/* Drink add-ons */}
            {booking.drinkAddOns.map(addon => { 
              const item = additionalDrinks.find(a => a.id === addon.id)
              return <div key={addon.id} className="flex justify-between text-blue-600"><span>🥤 {item?.name} ×{addon.quantity}</span><span>₱{((item?.price || 0) * addon.quantity).toLocaleString()}</span></div> 
            })}
            
            {/* Station add-ons */}
            {booking.addOns.map(addon => { 
              const item = addOnStations.find(a => a.id === addon.id)
              return <div key={addon.id} className="flex justify-between text-gray-600"><span>{item?.name} ×{addon.quantity}</span><span>₱{((item?.price || 0) * addon.quantity).toLocaleString()}</span></div> 
            })}
            
            {/* Gas Charge */}
            {booking.venueGasCharge > 0 && (
              <div className="flex justify-between text-amber-600 pt-2 border-t border-gray-200">
                <span className="flex items-center gap-1">⛽ Gas Charge ({getCityInfo(booking.venueAddress.city)?.name})</span>
                <span>₱{booking.venueGasCharge.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Menu Selection */}
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <UtensilsCrossed size={18} /> Menu
          </h3>
          
          {customDishesArray.length > 0 && (
            <p className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded inline-block mb-3">
              âœï¸ Some items modified from {booking.selectedMenuOption}
            </p>
          )}

          {/* Show swapped dishes for Menu 560 */}
          {booking.swappedDishes?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded inline-block mb-2">
                ðŸ”„ Asian Fusion Swaps Applied
              </p>
              <div className="space-y-1 pl-2">
                {booking.swappedDishes.map((swap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 line-through">{swap.original}</span>
                    <span className="text-orange-500">â†’</span>
                    <span className="font-medium text-orange-700">{swap.replacement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {/* Salad */}
            <div className="border-b border-gray-200 pb-2">
              <p className="text-xs font-semibold text-green-700 uppercase mb-1"> Salad</p>
              <div className="flex flex-wrap gap-1">
                {(booking.customDishes['salad']?.length > 0) ? (
                  booking.customDishes['salad'].map(d => (
                    <span key={d.id} className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">{d.name}</span>
                  ))
                ) : (
                  selectedOption?.items.filter(item => 
                    item.toLowerCase().includes('salad')
                  ).slice(0, 1).map((item, i) => (
                    <span key={i} className="text-sm bg-white border px-2 py-1 rounded-full">{item}</span>
                  ))
                )}
              </div>
            </div>

            {/* Main Dishes */}
            <div className="border-b border-gray-200 pb-2">
              <p className="text-xs font-semibold text-red-700 uppercase mb-1">ðŸ– Main Dishes</p>
              <div className="flex flex-wrap gap-1">
                {(booking.customDishes['main']?.length > 0) ? (
                  booking.customDishes['main'].map(d => (
                    <span key={d.id} className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">{d.name}</span>
                  ))
                ) : (
                  selectedOption?.items.filter(item => 
                    !item.toLowerCase().includes('salad') && 
                    !item.toLowerCase().includes('rice') && 
                    !item.toLowerCase().includes('pancit') &&
                    !item.toLowerCase().includes('pasta') &&
                    !item.toLowerCase().includes('cake') &&
                    !item.toLowerCase().includes('flan') &&
                    !item.toLowerCase().includes('float') &&
                    !item.toLowerCase().includes('torte') &&
                    !item.toLowerCase().includes('brownie') &&
                    !item.toLowerCase().includes('delight') &&
                    !item.toLowerCase().includes('chow pat') &&
                    !item.toLowerCase().includes('broken window') &&
                    !item.toLowerCase().includes('blitz') &&
                    !item.toLowerCase().includes('choco') &&
                    !item.toLowerCase().includes('zambo') &&
                    !item.toLowerCase().includes('rainbow') &&
                    !item.toLowerCase().includes('arroz')
                  ).slice(0, 4).map((item, i) => (
                    <span key={i} className="text-sm bg-white border px-2 py-1 rounded-full">{item}</span>
                  ))
                )}
              </div>
            </div>

            {/* Sides */}
            <div className="border-b border-gray-200 pb-2">
              <p className="text-xs font-semibold text-orange-700 uppercase mb-1"> Sides</p>
              <div className="flex flex-wrap gap-1">
                {(booking.customDishes['side']?.length > 0) ? (
                  booking.customDishes['side'].map(d => (
                    <span key={d.id} className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">{d.name}</span>
                  ))
                ) : (
                  selectedOption?.items.filter(item => 
                    item.toLowerCase().includes('pancit') || 
                    item.toLowerCase().includes('pasta') ||
                    item.toLowerCase().includes('vegetable') ||
                    item.toLowerCase().includes('guisado') ||
                    item.toLowerCase().includes('chow pat')
                  ).slice(0, 2).map((item, i) => (
                    <span key={i} className="text-sm bg-white border px-2 py-1 rounded-full">{item}</span>
                  ))
                )}
              </div>
            </div>

            {/* Rice */}
            <div className="border-b border-gray-200 pb-2">
              <p className="text-xs font-semibold text-amber-700 uppercase mb-1">ðŸš Rice</p>
              <div className="flex flex-wrap gap-1">
                {(booking.customDishes['rice']?.length > 0) ? (
                  booking.customDishes['rice'].map(d => (
                    <span key={d.id} className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">{d.name}</span>
                  ))
                ) : (
                  selectedOption?.items.filter(item => 
                    item.toLowerCase().includes('rice') || item.toLowerCase().includes('paella') || item.toLowerCase().includes('valenciana')
                  ).slice(0, 1).map((item, i) => (
                    <span key={i} className="text-sm bg-white border px-2 py-1 rounded-full">{item}</span>
                  ))
                )}
              </div>
            </div>

            {/* Desserts */}
            <div>
              <p className="text-xs font-semibold text-pink-700 uppercase mb-1">ðŸ° Desserts</p>
              <div className="flex flex-wrap gap-1">
                {(booking.customDishes['dessert']?.length > 0) ? (
                  booking.customDishes['dessert'].map(d => (
                    <span key={d.id} className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">{d.name}</span>
                  ))
                ) : (
                  selectedOption?.items.filter(item => 
                    item.toLowerCase().includes('cake') ||
                    item.toLowerCase().includes('flan') ||
                    item.toLowerCase().includes('float') ||
                    item.toLowerCase().includes('torte') ||
                    item.toLowerCase().includes('brownie') ||
                    item.toLowerCase().includes('delight') ||
                    item.toLowerCase().includes('pie') ||
                    item.toLowerCase().includes('tart') ||
                    item.toLowerCase().includes('broken window') ||
                    item.toLowerCase().includes('blitz') ||
                    item.toLowerCase().includes('choco') ||
                    item.toLowerCase().includes('zambo') ||
                    item.toLowerCase().includes('rainbow') ||
                    item.toLowerCase().includes('buko') ||
                    item.toLowerCase().includes('mango') ||
                    item.toLowerCase().includes('maja') ||
                    item.toLowerCase().includes('sago') ||
                    item.toLowerCase().includes('jelly') ||
                    item.toLowerCase().includes('ube') ||
                    item.toLowerCase().includes('beko') ||
                    item.toLowerCase().includes('bayot')
                  ).slice(0, 2).map((item, i) => (
                    <span key={i} className="text-sm bg-white border px-2 py-1 rounded-full">{item}</span>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {customDishesArray.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <span className="inline-block w-3 h-3 bg-red-100 rounded-full mr-1"></span> = Swapped items
                <span className="inline-block w-3 h-3 bg-white border rounded-full ml-3 mr-1"></span> = Default from {booking.selectedMenuOption}
              </p>
            </div>
          )}
        </div>

        <div className="bg-red-700 text-white rounded-xl p-5">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold">₱{total.toLocaleString()}</span>
          </div>
          <p className="text-red-200 text-sm mt-1">Deposit: ₱5,000</p>
        </div>
        
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
      </div>
    )
  }

  const steps = [renderStep1, renderStep2, renderStep3, renderStep4, renderStep5, renderStep6]
  
  const canProceed = () => { 
    if (step === 1) {
      if (!booking.date || !booking.time || !booking.occasion) return false
      // Birthday validation
      if (booking.occasion === 'birthday' && (!booking.birthdayCelebrant || !booking.birthdayAge)) return false
      // Other occasion validation
      if (booking.occasion === 'other' && !booking.occasionOther) return false
      if (!isValidDate(booking.date, booking.time)) return false
      // Venue address validation - require city, barangay, and street
      const hasValidVenue = booking.venueAddress.city && booking.venueAddress.barangay && booking.venueAddress.street?.trim()
      // Check minimum pax for the area
      const minPax = getMinimumPax(booking.venueAddress.city)
      if (booking.venueAddress.city && booking.numberOfPax < minPax) return false
      if (isAdmin) return booking.customerName && booking.customerPhone && hasValidVenue
      return hasValidVenue
    }
    if (step === 2) return booking.selectedPackage && booking.selectedMenuOption
    if (step === 3) {
      // Preset menus (660, 810) can always proceed - no customization needed
      const isPresetMenu = ['menu660', 'menu810'].includes(booking.selectedPackage)
      if (isPresetMenu) return true
      // Menu 560 with swap capability can always proceed (swapping is optional)
      const allowSwap = menuPackages[booking.selectedPackage]?.allowSwap
      if (allowSwap) return true
      return missingCategories.length === 0 // Block if menu is incomplete for custom build menus
    }
    return true 
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-6">
            <h1 className="text-2xl font-bold">{isAdmin ? 'Book for Customer' : 'Book Catering'}</h1>
            <p className="text-red-200">Step {step} of 6</p>
          </div>
          <div className="flex justify-center gap-2 py-4 bg-gray-50">
            {[1,2,3,4,5,6].map(s => (
              <div key={s} className={`h-2 rounded-full ${s === step ? 'bg-red-700 w-8' : s < step ? 'bg-red-300 w-3' : 'bg-gray-200 w-3'}`} />
            ))}
          </div>
          <div className="p-6">{steps[step - 1]()}</div>
          <div className="p-6 pt-0 flex gap-3">
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                <ChevronLeft size={20} /> Back
              </button>
            )}
            {step < 6 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2">
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2">
                <Send size={20} /> {loading ? 'Submitting...' : 'Submit Order'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
