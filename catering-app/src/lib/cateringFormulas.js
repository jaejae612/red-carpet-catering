// =====================================================
// RED CARPET CATERING - AUTO-ASSIGN FORMULAS
// Computes required staff & equipment based on guest count
// Based on official "Equipment to Persons" document
// =====================================================

/**
 * Tier-based equipment lookup table from the business reference sheet.
 * Handwritten corrections applied (rounded-up practical numbers).
 * Tiers: 60, 80, 100, 150 pax. Interpolates for in-between values.
 */
const EQUIPMENT_TIERS = [
  { maxPax: 60,  tier: '60' },
  { maxPax: 80,  tier: '80' },
  { maxPax: 100, tier: '100' },
  { maxPax: Infinity, tier: '150' },
]

const EQUIPMENT_TABLE = {
  // Utensils (per guest + buffer, using handwritten corrected values)
  'dinner plate':   { '60': 80,  '80': 100, '100': 120, '150': 170 },
  'dessert plate':  { '60': 80,  '80': 100, '100': 120, '150': 170 },
  'soup bowl':      { '60': 60,  '80': 80,  '100': 100, '150': 150 },
  'spoon & fork':   { '60': 80,  '80': 100, '100': 120, '150': 170 },
  'water glass':    { '60': 66,  '80': 88,  '100': 110, '150': 165 },
  'teaspoon':       { '60': 40,  '80': 40,  '100': 40,  '150': 80 },
  'goblet':         { '60': 50,  '80': 50,  '100': 75,  '150': 100 },

  // Serving
  'serving spoon':  { '60': 7,   '80': 7,   '100': 7,   '150': 7 },
  'pitcher':        { '60': 2,   '80': 3,   '100': 3,   '150': 4 },
  'ice bucket':     { '60': 4,   '80': 6,   '100': 6,   '150': 8 },
  'ice tong':       { '60': 8,   '80': 8,   '100': 8,   '150': 12 },
  'serving tray':   { '60': 3,   '80': 3,   '100': 4,   '150': 6 },
  'lechon tray':    { '60': 1,   '80': 1,   '100': 1,   '150': 1 },
}

/**
 * Get the tier key for a given pax count
 */
const getTier = (pax) => {
  for (const t of EQUIPMENT_TIERS) {
    if (pax <= t.maxPax) return t.tier
  }
  return '150'
}

/**
 * Calculate required equipment quantities for a given guest count
 * @param {number} pax - Number of guests
 * @param {number} menuDishes - Number of dishes in the menu (for chafing dishes)
 * @returns {Object} - Equipment requirements by name (lowercase, normalized)
 */
export const calculateEquipmentNeeds = (pax, menuDishes = 8) => {
  pax = Math.max(pax || 0, 30) // minimum 30 pax for sensible equipment
  const tier = getTier(pax)
  const guestTables = Math.ceil(pax / 10) // 10-seater round tables
  const buffetTables = pax <= 80 ? 2 : pax <= 120 ? 3 : 4
  const totalTables = guestTables + buffetTables
  const chairs = Math.ceil(pax * 1.1)
  const chafingDishes = Math.min(Math.max(menuDishes, 6), 12)

  // Start with lookup table values
  const needs = {}
  for (const [name, tiers] of Object.entries(EQUIPMENT_TABLE)) {
    needs[name] = tiers[tier] || 0
  }

  // Add calculated items (tables, chairs, linens, chafing)
  return {
    ...needs,

    // Seating
    'round table': guestTables,
    'guest chair': chairs,
    'chair cover': chairs,

    // Buffet
    'buffet table': buffetTables,
    'chafing dish': chafingDishes,
    'serving tong': chafingDishes,

    // Linens
    'table cloth': totalTables,
    'table napkin': pax,
    'table skirting': buffetTables,
  }
}

/**
 * Calculate required staff for a given guest count
 * @param {number} pax - Number of guests
 * @returns {Object} - Staff requirements by role
 */
export const calculateStaffNeeds = (pax) => {
  pax = Math.max(pax || 0, 30) // minimum 30 pax
  return {
    head_waiter: pax >= 150 ? 2 : 1,
    service: Math.max(Math.ceil(pax / 10), 3), // min 3
    extra: Math.max(Math.ceil(pax / 25), 1),   // min 1
    student: Math.max(Math.ceil(pax / 30), 1),  // min 1
  }
}

/**
 * Match equipment needs to actual inventory, considering date-based availability
 * @param {number} pax - Guest count
 * @param {Array} allEquipment - All equipment items from DB
 * @param {Object} usedOnDate - { equipmentId: quantityUsed } for same-date bookings
 * @param {number} menuDishes - Number of menu dishes
 * @returns {Array} - Assignment recommendations
 */
export const autoAssignEquipment = (pax, allEquipment, usedOnDate = {}, menuDishes = 8) => {
  const needs = calculateEquipmentNeeds(pax, menuDishes)
  const assignments = []

  // For each equipment item in DB, check if it matches any need
  allEquipment.forEach(item => {
    const itemName = item.name.toLowerCase().trim()

    // Exact match against formula names (names are standardized in seed data)
    let matchedNeed = null
    let neededQty = 0

    if (needs[itemName] !== undefined) {
      matchedNeed = itemName
      neededQty = needs[itemName]
    }

    if (!matchedNeed) return // No formula match for this item

    const usedQty = usedOnDate[item.id] || 0
    const availableToday = Math.max((item.quantity || 0) - usedQty, 0)

    assignments.push({
      equipmentId: item.id,
      name: item.name,
      category: item.category,
      type: item.type || 'owned',
      supplier: item.supplier,
      rentalCost: item.rental_cost || 0,
      totalOwned: item.quantity || 0,
      usedToday: usedQty,
      availableToday,
      needed: neededQty,
      assigned: Math.min(neededQty, availableToday),
      shortage: Math.max(neededQty - availableToday, 0),
      matchedFormula: matchedNeed,
    })
  })

  // Group by matched formula to avoid duplicates — prefer owned over rental
  const grouped = {}
  assignments.forEach(a => {
    const key = a.matchedFormula
    if (!grouped[key]) grouped[key] = { owned: [], rental: [] }
    if (a.type === 'owned') grouped[key].owned.push(a)
    else grouped[key].rental.push(a)
  })

  const result = []
  for (const [formula, group] of Object.entries(grouped)) {
    const needed = group.owned[0]?.needed || group.rental[0]?.needed || 0
    let remaining = needed

    // Assign owned first
    group.owned.forEach(item => {
      const assign = Math.min(remaining, item.availableToday)
      result.push({ ...item, assigned: assign, source: 'owned' })
      remaining -= assign
    })

    // Fill gap with rental
    if (remaining > 0) {
      group.rental.forEach(item => {
        if (remaining <= 0) return
        result.push({
          ...item,
          assigned: remaining,
          source: 'rental',
          rentalTotal: remaining * (item.rentalCost || 0),
        })
        remaining = 0
      })
    }

    // Still short?
    if (remaining > 0 && result.length > 0) {
      const last = result[result.length - 1]
      if (last.matchedFormula === formula) {
        last.shortage = remaining
      }
    }
  }

  return result.filter(r => r.assigned > 0 || r.shortage > 0)
}

/**
 * Match staff needs to actual roster, considering date-based availability
 * @param {number} pax - Guest count
 * @param {Array} allStaff - All staff from DB
 * @param {Array} busyStaffIds - Staff IDs already assigned on this date
 * @returns {Object} - { assignments, extraCosts, warnings }
 */
export const autoAssignStaff = (pax, allStaff, busyStaffIds = []) => {
  const needs = calculateStaffNeeds(pax)
  const assignments = []
  const warnings = []
  let extraCosts = 0

  const roleLabels = {
    head_waiter: 'Head Waiter',
    service: 'Service Staff',
    extra: 'Extra Staff',
    student: 'Student',
  }

  for (const [role, needed] of Object.entries(needs)) {
    // Get available staff for this role
    const available = allStaff.filter(s => {
      const matchesRole = s.role === role ||
        (role === 'service' && (s.role === 'service' || s.role === 'extra')) ||
        (role === 'extra' && (s.role === 'extra' || s.role === 'student'))
      return matchesRole && s.available && !busyStaffIds.includes(s.id)
    })

    // Sort: regular first, then on-call (cheaper first)
    available.sort((a, b) => {
      if (a.type === 'regular' && b.type !== 'regular') return -1
      if (a.type !== 'regular' && b.type === 'regular') return 1
      return (a.daily_rate || 0) - (b.daily_rate || 0)
    })

    const assigned = []
    let remaining = needed

    // Assign by priority
    available.forEach(s => {
      if (remaining <= 0) return
      assigned.push({
        id: s.id,
        name: s.name,
        role,
        type: s.type || 'regular',
        phone: s.phone,
        dailyRate: s.daily_rate || 0,
        source: s.type === 'on_call' ? 'on_call' : 'regular',
      })
      if (s.type === 'on_call') extraCosts += (s.daily_rate || 0)
      remaining--
    })

    assignments.push({
      role,
      roleLabel: roleLabels[role] || role,
      needed,
      assigned,
      shortage: remaining,
    })

    if (remaining > 0) {
      warnings.push(`Need ${remaining} more ${roleLabels[role] || role} — not enough available staff`)
    }
  }

  return { assignments, extraCosts, warnings }
}

/**
 * Get equipment/staff already assigned to other bookings on a specific date
 * @param {Array} allBookings - All bookings
 * @param {string} eventDate - The date to check (YYYY-MM-DD)
 * @param {string} excludeBookingId - Current booking ID to exclude
 * @returns {Object} - { usedEquipment: {id: qty}, busyStaffIds: [] }
 */
export const getDateConflicts = (allBookings, eventDate, excludeBookingId) => {
  const usedEquipment = {}
  const busyStaffIds = []

  allBookings
    .filter(b => b.event_date === eventDate && b.id !== excludeBookingId && b.status !== 'cancelled')
    .forEach(b => {
      // Sum equipment
      if (b.assigned_equipment) {
        for (const [eqId, qty] of Object.entries(b.assigned_equipment)) {
          usedEquipment[eqId] = (usedEquipment[eqId] || 0) + qty
        }
      }
      // Collect busy staff
      if (b.assigned_staff) {
        b.assigned_staff.forEach(s => {
          if (!busyStaffIds.includes(s.id)) busyStaffIds.push(s.id)
        })
      }
    })

  return { usedEquipment, busyStaffIds }
}

/**
 * Count menu dishes from booking data to size chafing dishes.
 * Uses actual booking data (menu_items, add_ons, custom_dishes) when available,
 * falls back to package-based defaults.
 */
export const countMenuDishes = (menuPackage, booking) => {
  // Try to count from actual booking data
  if (booking) {
    let count = 0
    // menu_items: array of dish objects from the selected package
    if (Array.isArray(booking.menu_items)) count += booking.menu_items.length
    // custom_dishes: array of custom additions
    if (Array.isArray(booking.custom_dishes)) count += booking.custom_dishes.length
    // If we got a real count, use it (min 6 for practical reasons)
    if (count > 0) return Math.max(count, 6)
  }

  // Fallback: estimate from package name
  const defaults = {
    menu470: 7,
    menu510: 9,
    menu560: 10,
    menu620: 11,
    menu660: 11,
    menu680: 12,
    menu810: 12,
    cocktail: 8,
  }
  return defaults[menuPackage] || 8
}

// Simple fuzzy matching for equipment names
function fuzzyMatch(a, b) {
  const normalize = (s) => s.replace(/[^a-z]/g, '')
  const na = normalize(a)
  const nb = normalize(b)
  return na.includes(nb) || nb.includes(na) ||
    // Common aliases
    (a.includes('utensil') && (b.includes('spoon') || b.includes('fork'))) ||
    (a.includes('flatware') && (b.includes('spoon') || b.includes('fork'))) ||
    (a.includes('goblet') && b.includes('glass')) ||
    (a.includes('glass') && b.includes('goblet'))
}

// Summary helper
export const getAssignmentSummary = (equipResult, staffResult) => {
  const rentalCost = equipResult
    .filter(e => e.source === 'rental')
    .reduce((sum, e) => sum + (e.rentalTotal || 0), 0)

  const onCallCost = staffResult.extraCosts || 0

  const equipShortages = equipResult.filter(e => e.shortage > 0)
  const staffShortages = staffResult.assignments.filter(a => a.shortage > 0)

  return {
    rentalCost,
    onCallCost,
    totalExtraCost: rentalCost + onCallCost,
    hasShortages: equipShortages.length > 0 || staffShortages.length > 0,
    equipShortages,
    staffShortages,
    warnings: [...(staffResult.warnings || [])],
  }
}
