// Red Carpet Catering - Cebu Service Areas
// Service is LIMITED to Cebu Province, Philippines
// Gas charges updated based on actual business rates

export const CEBU_SERVICE_AREAS = {
  cebu_city: {
    id: 'cebu_city',
    name: 'Cebu City',
    deliveryFee: 0,
    gasCharge: 0,  // No gas charge for Cebu City
    minPax: 30,
    isDefault: true,
    barangays: [
      'Adlaon', 'Agsungot', 'Apas', 'Babag', 'Bacayan', 'Banilad',
      'Basak Pardo', 'Basak San Nicolas', 'Bonbon', 'Budla-an', 'Buhisan',
      'Bulacao', 'Buot-Taup', 'Busay', 'Calamba', 'Cambinocot', 'Camputhaw',
      'Capitol Site', 'Carreta', 'Cogon Pardo', 'Cogon Ramos', 'Day-as',
      'Duljo Fatima', 'Ermita', 'Guadalupe', 'Guba', 'Hippodromo', 'Inayawan',
      'Kalubihan', 'Kalunasan', 'Kamagayan', 'Kasambagan', 'Kinasang-an Pardo',
      'Labangon', 'Lahug', 'Lorega San Miguel', 'Lusaran', 'Luz', 'Mabini',
      'Mabolo', 'Malubog', 'Mambaling', 'Pahina Central', 'Pahina San Nicolas',
      'Pamutan', 'Pardo', 'Pari-an', 'Paril', 'Pasil', 'Pit-os',
      'Poblacion Pardo', 'Pulangbato', 'Pung-ol Sibugay', 'Punta Princesa',
      'Quiot Pardo', 'Sambag I', 'Sambag II', 'San Antonio', 'San Jose',
      'San Nicolas Central', 'San Roque', 'Santa Cruz', 'Sapangdaku',
      'Sawang Calero', 'Sinsin', 'Sirao', 'Suba', 'Sudlon I', 'Sudlon II',
      'T. Padilla', 'Tabunan', 'Tagbao', 'Talamban', 'Taptap', 'Tejero',
      'Tinago', 'Tisa', 'To-ong', 'Zapatera'
    ].sort()
  },
  mandaue: {
    id: 'mandaue',
    name: 'Mandaue City',
    deliveryFee: 100,
    gasCharge: 0,  // No gas charge for Mandaue
    minPax: 30,
    barangays: [
      'Alang-alang', 'Bakilid', 'Banilad', 'Basak', 'Cabancalan',
      'Cambaro', 'Canduman', 'Casili', 'Casuntingan', 'Centro',
      'Cubacub', 'Guizo', 'Ibabao-Estancia', 'Jagobiao', 'Labogon',
      'Looc', 'Maguikay', 'Mantuyong', 'Opao', 'Paknaan', 'Pagsabungan',
      'Subangdaku', 'Tabok', 'Tawason', 'Tingub', 'Tipolo', 'Umapad'
    ].sort()
  },
  talisay: {
    id: 'talisay',
    name: 'Talisay City',
    deliveryFee: 150,
    gasCharge: 0,  // No gas charge for Talisay
    minPax: 30,
    barangays: [
      'Biasong', 'Bulacao', 'Cadulawan', 'Camp IV', 'Cansojong',
      'Dumlog', 'Jaclupan', 'Lagtang', 'Lawaan I', 'Lawaan II',
      'Lawaan III', 'Linao', 'Maghaway', 'Manipis', 'Mohon',
      'Poblacion', 'Pooc', 'San Isidro', 'San Roque', 'Tabunok',
      'Tangke', 'Tapul'
    ].sort()
  },
  // ============================================
  // AREAS WITH ₱900 GAS CHARGE
  // Mactan, Lapu-Lapu, Consolacion, Minglanilla
  // ============================================
  lapu_lapu: {
    id: 'lapu_lapu',
    name: 'Lapu-Lapu City (Mactan)',
    deliveryFee: 200,
    gasCharge: 900,  // ₱900 gas charge
    minPax: 30,
    barangays: [
      'Agus', 'Babag', 'Bankal', 'Basak', 'Buaya', 'Calawisan',
      'Canjulao', 'Caubian', 'Gun-ob', 'Ibo', 'Looc', 'Mactan',
      'Maribago', 'Marigondon', 'Pajac', 'Pajo', 'Poblacion',
      'Punta Engaño', 'Pusok', 'Sabang', 'Santa Rosa', 'Subabasbas',
      'Talima', 'Tingo', 'Tungasan'
    ].sort()
  },
  consolacion: {
    id: 'consolacion',
    name: 'Consolacion',
    deliveryFee: 150,
    gasCharge: 900,  // ₱900 gas charge
    minPax: 30,
    barangays: [
      'Cabangahan', 'Cansaga', 'Casili', 'Danglag', 'Garing',
      'Jugan', 'Lamac', 'Lanipga', 'Nangka', 'Pitogo',
      'Poblacion Occidental', 'Poblacion Oriental', 'Polog',
      'Pulpogan', 'Sacsac', 'Tayud', 'Tilhaong', 'Tolotolo', 'Tugbongan'
    ].sort()
  },
  minglanilla: {
    id: 'minglanilla',
    name: 'Minglanilla',
    deliveryFee: 200,
    gasCharge: 900,  // ₱900 gas charge
    minPax: 30,
    barangays: [
      'Cadulawan', 'Calajoan', 'Camp 7', 'Camp 8', 'Cuanos',
      'Guindaruhan', 'Linao', 'Lipata', 'Pakigne', 'Poblacion Ward I',
      'Poblacion Ward II', 'Poblacion Ward III', 'Poblacion Ward IV',
      'Tunghaan', 'Tulay', 'Tungkop', 'Tungkil', 'Vito'
    ].sort()
  },
  cordova: {
    id: 'cordova',
    name: 'Cordova (Mactan)',
    deliveryFee: 250,
    gasCharge: 900,  // ₱900 gas charge (Mactan island)
    minPax: 30,
    barangays: [
      'Alegria', 'Bangbang', 'Buagsong', 'Catarman', 'Cogon',
      'Dapitan', 'Day-as', 'Gabi', 'Gilutongan', 'Ibabao',
      'Pilipog', 'Poblacion', 'San Miguel'
    ].sort()
  },
  liloan: {
    id: 'liloan',
    name: 'Liloan',
    deliveryFee: 200,
    gasCharge: 900,  // ₱900 gas charge
    minPax: 30,
    barangays: [
      'Cabadiangan', 'Calero', 'Catarman', 'Cotcot', 'Jubay',
      'Lataban', 'Mulao', 'Poblacion', 'San Roque', 'San Vicente',
      'Tabla', 'Tayud', 'Yati'
    ].sort()
  },
  // ============================================
  // COMPOSTELA - ₱2,500 GAS CHARGE
  // ============================================
  compostela: {
    id: 'compostela',
    name: 'Compostela',
    deliveryFee: 300,
    gasCharge: 2500,  // ₱2,500 gas charge
    minPax: 50,
    note: 'Higher gas charge due to distance',
    barangays: [
      'Bagalnga', 'Basak', 'Buluang', 'Cabadiangan', 'Cambayog',
      'Canamucan', 'Cogon', 'Dapdap', 'Estaca', 'Lupa',
      'Magay', 'Mulao', 'Panangban', 'Poblacion', 'Tag-ube', 'Tamiao', 'Tubigan'
    ].sort()
  },
  // ============================================
  // DANAO & BEYOND - 100 PAX MINIMUM, OUTSIDE RATE
  // ============================================
  danao: {
    id: 'danao',
    name: 'Danao City & Beyond',
    deliveryFee: null,  // By quotation
    gasCharge: null,    // Outside rate - contact for quote
    minPax: 100,        // Minimum 100 pax required
    requiresQuote: true,
    note: 'Minimum 100 pax. Contact for gas charge quotation.',
    barangays: [
      'Baliang', 'Bayabas', 'Binaliw', 'Cabungahan', 'Cagat-Lamac',
      'Cahumayan', 'Cambanay', 'Cambubho', 'Cogon-Cruz', 'Danasan',
      'Dungga', 'Dunggoan', 'Guinacot', 'Guinsay', 'Ibo', 'Langosig',
      'Lawaan', 'Licos', 'Looc', 'Magtagobtob', 'Malapoc', 'Manlayag',
      'Mantija', 'Masaba', 'Maslog', 'Nangka', 'Oguis', 'Pili',
      'Poblacion', 'Quisol', 'Sabang', 'Sacsac', 'Sandayong Norte',
      'Sandayong Sur', 'Santa Rosa', 'Santican', 'Sibacan', 'Suba',
      'Taboc', 'Taytay', 'Togonon', 'Tuburan Sur'
    ].sort()
  },
  // ============================================
  // NAGA & BEYOND - OUTSIDE RATE
  // ============================================
  naga: {
    id: 'naga',
    name: 'Naga City & Beyond',
    deliveryFee: null,  // By quotation
    gasCharge: null,    // Outside rate - contact for quote
    minPax: 50,
    requiresQuote: true,
    note: 'Outside standard service area. Contact for quotation.',
    barangays: [
      'Alfaco', 'Balirong', 'Cabungahan', 'Cantao-an', 'Central Poblacion',
      'Cogon', 'Colon', 'East Poblacion', 'Inayagan', 'Inoburan',
      'Jaguimit', 'Lanas', 'Langtad', 'Lutac', 'Mainit', 'Mayana',
      'Naalad', 'North Poblacion', 'Pangdan', 'Patag', 'South Poblacion',
      'Tagjaguimit', 'Tangke', 'Tinaan', 'Tuyan', 'Uling', 'West Poblacion'
    ].sort()
  },
  san_fernando: {
    id: 'san_fernando',
    name: 'San Fernando',
    deliveryFee: null,
    gasCharge: null,  // Outside rate
    minPax: 50,
    requiresQuote: true,
    note: 'Outside standard service area. Contact for quotation.',
    barangays: [
      'Balud', 'Balungag', 'Basak', 'Bugho', 'Cabatbatan',
      'Greenhills', 'Ilaya', 'Lantawan', 'Liburon', 'Magsico',
      'North Poblacion', 'Panadtaran', 'Pitalo', 'San Isidro',
      'South Poblacion', 'Tabionan', 'Tananas', 'Tinago', 'Tonggo', 'Tubod'
    ].sort()
  }
}

// ============================================
// SPECIAL VENUES (Different/Custom Rates)
// ============================================
export const SPECIAL_VENUES = {
  chateau_by_the_sea: {
    id: 'chateau_by_the_sea',
    name: 'Chateau by the Sea',
    note: 'Special venue with different rates. Contact for quotation.',
    requiresQuote: true
  },
  tops: {
    id: 'tops',
    name: 'Tops Lookout / Mountain Areas',
    note: 'Mountain areas have outside rates. Contact for quotation.',
    requiresQuote: true
  }
}

// Outside service area config
export const OUTSIDE_SERVICE_AREA = {
  id: 'outside',
  name: 'Other Areas (Outside Metro Cebu)',
  deliveryFee: null,
  gasCharge: null,
  available: false,
  message: 'This area is outside our standard service area. Please contact us for availability and pricing.',
  phone: '0917-187-6510'
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get list of all cities for dropdown
export const getCityList = () => {
  return Object.values(CEBU_SERVICE_AREAS).map(area => ({
    id: area.id,
    name: area.name,
    deliveryFee: area.deliveryFee,
    gasCharge: area.gasCharge,
    minPax: area.minPax,
    requiresQuote: area.requiresQuote || false,
    note: area.note
  }))
}

// Get barangays for a specific city
export const getBarangays = (cityId) => {
  const city = CEBU_SERVICE_AREAS[cityId]
  return city ? city.barangays : []
}

// Get delivery fee for food orders
export const getDeliveryFee = (cityId) => {
  const city = CEBU_SERVICE_AREAS[cityId]
  return city ? city.deliveryFee : null
}

// Get gas charge for catering
export const getGasCharge = (cityId) => {
  const city = CEBU_SERVICE_AREAS[cityId]
  return city ? city.gasCharge : null
}

// Get full city info
export const getCityInfo = (cityId) => {
  return CEBU_SERVICE_AREAS[cityId] || null
}

// Check if city is within service area
export const isWithinServiceArea = (cityId) => {
  return !!CEBU_SERVICE_AREAS[cityId]
}

// Check if requires quotation
export const requiresQuotation = (cityId) => {
  const city = CEBU_SERVICE_AREAS[cityId]
  return city?.requiresQuote || false
}

// Get minimum pax for catering in specific area
export const getMinimumPax = (cityId) => {
  const city = CEBU_SERVICE_AREAS[cityId]
  return city?.minPax || 30
}

// Format full address string
export const formatAddress = (street, barangay, cityId, landmark = '') => {
  const parts = []
  if (street) parts.push(street)
  if (barangay) parts.push(`Brgy. ${barangay}`)
  
  const city = CEBU_SERVICE_AREAS[cityId]
  if (city) parts.push(city.name)
  
  parts.push('Cebu')
  
  let address = parts.join(', ')
  if (landmark) address += ` (Near ${landmark})`
  
  return address
}

// Validate Philippine phone number
export const isValidPHPhone = (phone) => {
  if (!phone) return false
  const cleaned = phone.replace(/[\s\-()]/g, '')
  
  // Mobile: 09XX or +639XX (11 digits total)
  const mobile = /^(09|639|\+639)\d{9}$/
  // Cebu landline: 032 + 7 digits
  const landline = /^(032|\(032\))\d{7}$/
  
  return mobile.test(cleaned) || landline.test(cleaned)
}

// Format phone number for display
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  
  // Mobile format: 0917-XXX-XXXX
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  // Landline format: (032) XXX-XXXX
  if (cleaned.length === 10 && cleaned.startsWith('032')) {
    return `(032) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  return phone
}

// Business info
export const BUSINESS_INFO = {
  name: 'Red Carpet Catering Services',
  established: 1977,
  address: 'Cebu City, Cebu, Philippines',
  phones: [
    { number: '0917-187-6510', type: 'mobile' },
    { number: '0926-664-2839', type: 'mobile' },
    { number: '(032) 383-4122', type: 'landline' }
  ],
  serviceArea: 'Metro Cebu and nearby municipalities',
  operatingHours: {
    office: '8:00 AM - 5:00 PM',  // From notes: 8 AM to 5 PM
    delivery: '10:00 AM - 8:00 PM'
  }
}

// Minimum order values
export const ORDER_MINIMUMS = {
  foodDelivery: 1000,    // ₱1,000 minimum for food delivery
  packedMeals: 10,       // 10 packs minimum
  cateringDefault: 30,   // 30 pax minimum for most areas
  cateringDanao: 100     // 100 pax minimum for Danao & beyond
}

// Same-day order cutoff
export const SAME_DAY_CUTOFF = '14:00' // 2:00 PM
