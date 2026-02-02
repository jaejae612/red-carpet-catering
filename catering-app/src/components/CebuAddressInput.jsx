import React, { useState, useEffect } from 'react'
import { MapPin, AlertCircle, Truck, Info, Phone } from 'lucide-react'
import { 
  CEBU_SERVICE_AREAS, 
  OUTSIDE_SERVICE_AREA,
  getCityList, 
  getBarangays, 
  getDeliveryFee,
  getCateringFee,
  getCityInfo,
  formatAddress,
  getMinimumPax
} from '../lib/cebuAreas'

/**
 * CebuAddressInput - Reusable component for Cebu-only addresses
 * 
 * Props:
 * - value: { city, barangay, street, landmark }
 * - onChange: (addressData) => void
 * - type: 'delivery' | 'catering' | 'venue' (affects fee display)
 * - showFee: boolean (show delivery/catering fee)
 * - required: boolean
 * - disabled: boolean
 * - className: string
 */
export default function CebuAddressInput({ 
  value = {}, 
  onChange, 
  type = 'delivery',
  showFee = true,
  required = true,
  disabled = false,
  className = ''
}) {
  const [address, setAddress] = useState({
    city: value.city || '',
    barangay: value.barangay || '',
    street: value.street || '',
    landmark: value.landmark || ''
  })
  
  const [barangayList, setBarangayList] = useState([])
  const [showOutsideWarning, setShowOutsideWarning] = useState(false)
  
  const cities = getCityList()
  
  // Update barangay list when city changes
  useEffect(() => {
    if (address.city) {
      setBarangayList(getBarangays(address.city))
      setShowOutsideWarning(false)
    } else {
      setBarangayList([])
    }
  }, [address.city])
  
  // Notify parent of changes
  useEffect(() => {
    if (onChange) {
      const cityInfo = getCityInfo(address.city)
      onChange({
        ...address,
        cityName: cityInfo?.name || '',
        deliveryFee: getDeliveryFee(address.city),
        cateringFee: getCateringFee(address.city),
        minPax: getMinimumPax(address.city),
        formatted: formatAddress(address.street, address.barangay, address.city, address.landmark),
        isValid: !!(address.city && address.barangay && address.street)
      })
    }
  }, [address])
  
  const handleCityChange = (cityId) => {
    setAddress(prev => ({
      ...prev,
      city: cityId,
      barangay: '' // Reset barangay when city changes
    }))
  }
  
  const handleBarangayChange = (barangay) => {
    setAddress(prev => ({ ...prev, barangay }))
  }
  
  const handleStreetChange = (street) => {
    setAddress(prev => ({ ...prev, street }))
  }
  
  const handleLandmarkChange = (landmark) => {
    setAddress(prev => ({ ...prev, landmark }))
  }
  
  const cityInfo = getCityInfo(address.city)
  const fee = type === 'catering' ? cityInfo?.cateringFee : cityInfo?.deliveryFee
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 text-gray-700">
        <MapPin size={20} className="text-red-600" />
        <span className="font-medium">
          {type === 'catering' ? 'Venue Address' : 'Delivery Address'}
          {required && <span className="text-red-500 ml-1">*</span>}
        </span>
      </div>
      
      {/* Service Area Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
        <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          We currently serve <strong>Metro Cebu</strong> and nearby areas only.
        </p>
      </div>
      
      {/* City Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          City / Municipality
        </label>
        <select
          value={address.city}
          onChange={(e) => handleCityChange(e.target.value)}
          disabled={disabled}
          required={required}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white disabled:bg-gray-100"
        >
          <option value="">Select city...</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>
              {city.name}
              {type === 'delivery' && city.deliveryFee > 0 && ` (+₱${city.deliveryFee})`}
              {type === 'catering' && city.cateringFee > 0 && ` (+₱${city.cateringFee})`}
            </option>
          ))}
          <option value="outside" disabled>── Other Areas ──</option>
        </select>
      </div>
      
      {/* Barangay Selection */}
      {address.city && barangayList.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Barangay
          </label>
          <select
            value={address.barangay}
            onChange={(e) => handleBarangayChange(e.target.value)}
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
      {address.city && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street / Building / Unit
          </label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => handleStreetChange(e.target.value)}
            disabled={disabled}
            required={required}
            placeholder="e.g., 123 Main St., Unit 5B, ABC Building"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
          />
        </div>
      )}
      
      {/* Landmark (Optional) */}
      {address.city && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Landmark <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            value={address.landmark}
            onChange={(e) => handleLandmarkChange(e.target.value)}
            disabled={disabled}
            placeholder="e.g., Near SM City, Beside BDO"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
          />
        </div>
      )}
      
      {/* Delivery/Catering Fee Display */}
      {showFee && address.city && cityInfo && (
        <div className={`rounded-xl p-4 flex items-center justify-between ${
          fee === 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'
        }`}>
          <div className="flex items-center gap-2">
            <Truck size={20} className={fee === 0 ? 'text-green-600' : 'text-amber-600'} />
            <span className={`font-medium ${fee === 0 ? 'text-green-700' : 'text-amber-700'}`}>
              {type === 'catering' ? 'Venue Charge' : 'Delivery Fee'}:
            </span>
          </div>
          <span className={`font-bold text-lg ${fee === 0 ? 'text-green-700' : 'text-amber-700'}`}>
            {fee === 0 ? 'FREE' : `₱${fee?.toLocaleString()}`}
          </span>
        </div>
      )}
      
      {/* Area-specific notes */}
      {cityInfo?.note && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">{cityInfo.note}</p>
        </div>
      )}
      
      {/* Minimum pax warning for catering */}
      {type === 'catering' && cityInfo && cityInfo.minPax > 30 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
          <Info size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Minimum <strong>{cityInfo.minPax} guests</strong> required for catering in {cityInfo.name}.
          </p>
        </div>
      )}
      
      {/* Outside Service Area Warning */}
      {showOutsideWarning && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-medium text-red-800">{OUTSIDE_SERVICE_AREA.message}</p>
              <div className="mt-2 flex items-center gap-2 text-red-700">
                <Phone size={16} />
                <a href={`tel:${OUTSIDE_SERVICE_AREA.phone}`} className="font-semibold hover:underline">
                  {OUTSIDE_SERVICE_AREA.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Formatted Address Preview */}
      {address.city && address.barangay && address.street && (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Complete Address:</p>
          <p className="font-medium text-gray-800">
            {formatAddress(address.street, address.barangay, address.city, address.landmark)}
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Simple hook for address state management
 */
export const useCebuAddress = (initialValue = {}) => {
  const [address, setAddress] = useState({
    city: initialValue.city || '',
    barangay: initialValue.barangay || '',
    street: initialValue.street || '',
    landmark: initialValue.landmark || '',
    cityName: '',
    deliveryFee: 0,
    cateringFee: 0,
    minPax: 30,
    formatted: '',
    isValid: false
  })
  
  return [address, setAddress]
}
