// =====================================================
// RED CARPET CATERING - AUTO-ASSIGN FORMULAS
// Computes required staff & equipment based on guest count
// =====================================================

const BUFFER = 1.1 // 10% buffer for utensils/chairs

/**
 * Calculate required equipment quantities for a given guest count
 * @param {number} pax - Number of guests
 * @param {number} menuDishes - Number of dishes in the menu (for chafing dishes)
 * @returns {Object} - Equipment requirements by name (lowercase, normalized)
 */
export const calculateEquipmentNeeds = (pax, menuDishes = 8) => {
  const guestTables = Math.ceil(pax / 10) // 10-seater round tables
  const buffetTables = pax <= 80 ? 2 : pax <= 120 ? 3 : 4
  const totalTables = guestTables + buffetTables
  const chairs = Math.ceil(pax * BUFFER)
  const chafingDishes = Math.min(Math.max(menuDishes, 6), 12) // min 6, max 12

  return {
    // Seating
    'round table': guestTables,
    'guest chair': chairs,
    'chair cover': chairs,

    // Buffet
    'buffet table': buffetTables,
    'chafing dish': chafingDishes,
    'serving spoon': chafingDishes,
    'serving tong': chafingDishes,
    'water pitcher': Math.ceil(guestTables / 2),

    // Linens
    'table cloth': totalTables,
    'table napkin': pax,
    'table skirting': buffetTables,

    // Utensils
    'dinner plate': chairs,
    'dessert plate': pax,
    'soup bowl': pax,
    'spoon': chairs,
    'fork': chairs,
    'spoon & fork': chairs,
    'water glass': chairs,
  }
}

/**
 * Calculate required staff for a given guest count
 * @param {number} pax - Number of guests
 * @returns {Object} - Staff requirements by role
 */
export const calculateStaffNeeds = (pax) => {
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
    
    // Find matching need (fuzzy match)
    let matchedNeed = null
    let neededQty = 0

    for (const [needName, qty] of Object.entries(needs)) {
      if (itemName.includes(needName) || needName.includes(itemName) ||
          fuzzyMatch(itemName, needName)) {
        matchedNeed = needName
        neededQty = qty
        break
      }
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
 * Count menu dishes from booking data to size chafing dishes
 */
export const countMenuDishes = (menuPackage, menuOption) => {
  // Default estimates by package tier
  const defaults = {
    menu470: 7,  // 1 salad + 2 mains + 2 sides + 2 rice
    menu510: 9,  // 4 mains + 1 side + 2 rice + 2 dessert
    menu560: 10, // Full buffet
    menu620: 11,
    menu680: 12,
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
