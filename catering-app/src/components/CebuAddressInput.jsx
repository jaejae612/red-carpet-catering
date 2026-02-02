import React, { useState, useEffect } from 'react'
import { MapPin, AlertCircle, Truck, Info, Phone, Fuel } from 'lucide-react'
import { 
  CEBU_SERVICE_AREAS, 
  getCityList, 
  getBarangays, 
  getDeliveryFee,
  getGasCharge,
  getCityInfo,
  formatAddress,
  getMinimumPax,
  requiresQuotation
} from '../lib/cebuAreas'

/**
 * CebuAddressInput - Cebu-only address input with city/barangay dropdowns
 * 
 * Props:
 * - value: { city, barangay, street, landmark }
 * - onChange: (addressData) => void - returns full address data including fees
 * - type: 'catering' | 'delivery' (affects which fee to show)
 * - showFee: boolean (default true)
 * - required: boolean (default true)
 * - disabled: boolean (default false)
 * - currentPax: number (for min pax validation in catering)
 */
export default function CebuAddressInput({ 
  value = {}, 
  onChange, 
  type = 'catering',
  showFee = true,
  required = true,
  disabled = false,
  currentPax = 30
}) {
  const cities = getCityList()
  const [barangayList, setBarangayList] = useState([])
  
  // Update barangay list when city changes
  useEffect(() => {
    if (value.city) {
      setBarangayList(getBarangays(value.city))
    } else {
      setBarangayList([])
    }
  }, [value.city])
  
  // Handle field changes
  const handleChange = (field, fieldValue) => {
    const newValue = { ...value, [field]: fieldValue }
    
    // Reset barangay if city changes
    if (field === 'city') {
      newValue.barangay = ''
    }
    
    // Calculate fees and format address
    const cityInfo = getCityInfo(newValue.city)
    const formatted = newValue.city && newValue.barangay && newValue.street 
      ? formatAddress(newValue.street, newValue.barangay, newValue.city, newValue.landmark)
      : ''
    
    onChange({
      ...newValue,
      cityName: cityInfo?.name || '',
      deliveryFee: getDeliveryFee(newValue.city) || 0,
      gasCharge: getGasCharge(newValue.city) || 0,
      minPax: getMinimumPax(newValue.city),
      requiresQuote: requiresQuotation(newValue.city),
      formatted,
      isValid: !!(newValue.city && newValue.barangay && newValue.street?.trim())
    })
  }
  
  const cityInfo = getCityInfo(value.city)
  const fee = type === 'catering' ? cityInfo?.gasCharge : cityInfo?.deliveryFee
  const minPax = cityInfo?.minPax || 30
  const needsQuote = cityInfo?.requiresQuote
  
  return (
    <div className="space-y-4">
      {/* Service Area Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
        <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Service limited to <strong>Metro Cebu</strong> and nearby areas.
        </p>
      </div>
      
      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City / Municipality {required && <span className="text-red-500">*</span>}
        </label>
        <select
          value={value.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
          disabled={disabled}
          required={required}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white disabled:bg-gray-100"
        >
          <option value="">Select city...</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
              {type === 'catering' && city.gasCharge > 0 && ` (+₱${city.gasCharge} gas)`}
              {type === 'delivery' && city.deliveryFee > 0 && ` (+₱${city.deliveryFee})`}
              {city.requiresQuote && ' (Quote needed)'}
            </option>
          ))}
        </select>
      </div>
      
      {/* Barangay Selection */}
      {value.city && barangayList.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Barangay {required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={value.barangay || ''}
            onChange={(e) => handleChange('barangay', e.target.value)}
            disabled={disabled}
            required={required}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white disabled:bg-gray-100"
          >
            <option value="">Select barangay...</option>
            {barangayList.map(brgy => (
              <option key={brgy} value={brgy}>{brgy}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Street Address */}
      {value.city && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street / Building / Venue Name {required && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            value={value.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
            disabled={disabled}
            required={required}
            placeholder={type === 'catering' ? "e.g., Function Room, ABC Hotel" : "e.g., 123 Main St., Unit 5B"}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
          />
        </div>
      )}
      
      {/* Landmark (Optional) */}
      {value.city && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Landmark <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            value={value.landmark || ''}
            onChange={(e) => handleChange('landmark', e.target.value)}
            disabled={disabled}
            placeholder="e.g., Near SM City, Beside BDO"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
          />
        </div>
      )}
      
      {/* Gas Charge / Delivery Fee Display */}
      {showFee && value.city && cityInfo && !needsQuote && (
        <div className={`rounded-xl p-4 flex items-center justify-between ${
          fee === 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-center gap-2">
            {type === 'catering' ? (
              <Fuel size={20} className={fee === 0 ? 'text-green-600' : 'text-amber-600'} />
            ) : (
              <Truck size={20} className={fee === 0 ? 'text-green-600' : 'text-amber-600'} />
            )}
            <span className={`font-medium ${fee === 0 ? 'text-green-700' : 'text-amber-700'}`}>
              {type === 'catering' ? 'Gas Charge:' : 'Delivery Fee:'}
            </span>
          </div>
          <span className={`font-bold text-lg ${fee === 0 ? 'text-green-700' : 'text-amber-700'}`}>
            {fee === 0 ? 'FREE' : `₱${fee?.toLocaleString()}`}
          </span>
        </div>
      )}
      
      {/* Requires Quote Warning */}
      {value.city && needsQuote && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-amber-800">Quotation Required</p>
            <p className="text-sm text-amber-700 mt-1">{cityInfo?.note || 'This area requires a custom quote. We will contact you with pricing.'}</p>
            <p className="text-sm text-amber-700 mt-2 flex items-center gap-1">
              <Phone size={14} /> Call: <strong>0917-187-6510</strong>
            </p>
          </div>
        </div>
      )}
      
      {/* Minimum Pax Warning for Catering */}
      {type === 'catering' && value.city && minPax > 30 && currentPax < minPax && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">
            <strong>{cityInfo?.name}</strong> requires minimum <strong>{minPax} guests</strong>. 
            Current: {currentPax} guests.
          </p>
        </div>
      )}
      
      {/* Formatted Address Preview */}
      {value.city && value.barangay && value.street && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Complete Address:</p>
          <p className="font-medium text-gray-800">
            {formatAddress(value.street, value.barangay, value.city, value.landmark)}
          </p>
        </div>
      )}
    </div>
  )
}
