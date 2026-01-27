// Food Order Categories
export const FOOD_CATEGORIES = [
  { id: 'salad', name: 'Salads', icon: '🥗', color: 'bg-green-100 text-green-800' },
  { id: 'chicken', name: 'Chicken', icon: '🍗', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'chicken_premium', name: 'Chicken Premium', icon: '🍗', color: 'bg-yellow-200 text-yellow-900' },
  { id: 'pork', name: 'Pork', icon: '🥓', color: 'bg-pink-100 text-pink-800' },
  { id: 'beef', name: 'Beef', icon: '🥩', color: 'bg-red-100 text-red-800' },
  { id: 'seafood', name: 'Fish & Seafood', icon: '🐟', color: 'bg-blue-100 text-blue-800' },
  { id: 'seafood_premium', name: 'Seafood Premium', icon: '🦐', color: 'bg-blue-200 text-blue-900' },
  { id: 'specialties', name: 'Specialties', icon: '⭐', color: 'bg-purple-100 text-purple-800' },
  { id: 'ox_tongue', name: 'Ox Tongue', icon: '🍖', color: 'bg-amber-100 text-amber-800' },
  { id: 'vegetable', name: 'Vegetables', icon: '🥬', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'noodle_pasta', name: 'Noodle & Pasta', icon: '🍝', color: 'bg-orange-100 text-orange-800' },
  { id: 'dessert', name: 'Desserts', icon: '🍰', color: 'bg-pink-100 text-pink-800' },
  { id: 'special', name: 'Special Items', icon: '🎁', color: 'bg-indigo-100 text-indigo-800' },
]

// Serving sizes with labels
export const SERVING_SIZES = [
  { id: 'home', name: 'Home Meal', serves: '4-5 persons', priceKey: 'price_home' },
  { id: 'tray', name: 'Tray', serves: '8-10 persons', priceKey: 'price_tray' },
  { id: 'xs', name: 'Extra Small', serves: '20 persons', priceKey: 'price_xs' },
  { id: 'small', name: 'Small', serves: '30 persons', priceKey: 'price_small' },
  { id: 'medium', name: 'Medium', serves: '50 persons', priceKey: 'price_medium' },
  { id: 'large', name: 'Large', serves: '80 persons', priceKey: 'price_large' },
]

// Get price for an item based on size
export const getItemPrice = (item, sizeId) => {
  // Handle fixed price items (desserts)
  if (sizeId === 'fixed') {
    return item.price_home || 0
  }
  
  // Handle Bingcava custom sizes
  if (item.name?.toLowerCase().includes('bingcava')) {
    const bingSize = BINGCAVA_SIZES.find(s => s.id === sizeId)
    if (bingSize) return item[bingSize.priceKey] || 0
  }
  
  // Handle Chinese Lumpia custom sizes
  if (item.name?.toLowerCase().includes('lumpia')) {
    const lumpiaSize = LUMPIA_SIZES.find(s => s.id === sizeId)
    if (lumpiaSize) return item[lumpiaSize.priceKey] || 0
  }
  
  // Standard sizes
  const size = SERVING_SIZES.find(s => s.id === sizeId)
  if (!size) return 0
  return item[size.priceKey] || 0
}

// Special size for fixed-price items (desserts)
export const FIXED_PRICE_SIZE = { id: 'fixed', name: 'Per Order', serves: '', priceKey: 'price_home' }

// Special sizes for Bingcava (sold by boxes - only 2 sizes)
export const BINGCAVA_SIZES = [
  { id: 'box6', name: 'Box of 6', serves: '6 pieces', priceKey: 'price_home' },
  { id: 'box20', name: 'Box of 20', serves: '20 pieces', priceKey: 'price_tray' },
]

// Special sizes for Chinese Lumpia
export const LUMPIA_SIZES = [
  { id: 'min10', name: '10 Pieces', serves: '₱60 per piece', priceKey: 'price_home' },
  { id: 'small', name: 'Small Set', serves: 'Wrap Your Own', priceKey: 'price_tray' },
  { id: 'box30', name: 'Box of 30', serves: '30 pieces', priceKey: 'price_small' },
  { id: 'box60', name: 'Box of 60', serves: '60 pieces', priceKey: 'price_medium' },
]

export const getAvailableSizes = (item) => {
  // Special handling for Bingcava
  if (item.name?.toLowerCase().includes('bingcava')) {
    return BINGCAVA_SIZES.filter(s => item[s.priceKey] > 0)
  }
  
  // Special handling for Chinese Lumpia
  if (item.name?.toLowerCase().includes('lumpia') || item.name?.toLowerCase().includes('chinese lumpia')) {
    return LUMPIA_SIZES.filter(s => item[s.priceKey] > 0)
  }
  
  // Desserts and other special items - single price
  if (item.category === 'dessert' || item.category === 'special') {
    return [FIXED_PRICE_SIZE]
  }
  
  // Regular items with standard sizes
  return SERVING_SIZES.filter(s => item[s.priceKey] > 0)
}

// Calculate cart total
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

// Order statuses
export const ORDER_STATUSES = [
  { id: 'pending', name: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'confirmed', name: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { id: 'preparing', name: 'Preparing', color: 'bg-purple-100 text-purple-800' },
  { id: 'ready', name: 'Ready', color: 'bg-green-100 text-green-800' },
  { id: 'delivered', name: 'Delivered', color: 'bg-gray-100 text-gray-800' },
  { id: 'cancelled', name: 'Cancelled', color: 'bg-red-100 text-red-800' },
]

export const getStatusColor = (status) => {
  const found = ORDER_STATUSES.find(s => s.id === status)
  return found?.color || 'bg-gray-100 text-gray-800'
}

export const getStatusName = (status) => {
  const found = ORDER_STATUSES.find(s => s.id === status)
  return found?.name || status
}

export const getCategoryInfo = (categoryId) => {
  return FOOD_CATEGORIES.find(c => c.id === categoryId) || { name: categoryId, icon: '🍽️', color: 'bg-gray-100' }
}