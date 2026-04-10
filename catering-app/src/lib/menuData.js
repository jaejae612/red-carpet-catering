// Red Carpet Catering Menu Packages
export const menuPackages = {
  menu470: {
    id: 'menu470', name: 'Menu 490', pricePerHead: 490,
    pricingTiers: { 60: 490, 50: 510, 40: 560, 30: 610 },
    isCustomBuild: true, // Flag for fully customizable menu
    options: [
      { name: 'Standard Menu', items: ['1 Salad', '2 Main Dishes', '2 Sides', 'Plain Rice & Fried Rice', '2 Desserts'] }
    ],
    structure: {
      salad: 1,
      main: 2,
      side: 2,
      rice: 2,
      dessert: 2
    }
  },
  menu510: {
    id: 'menu510', name: 'Menu 530', pricePerHead: 530,
    pricingTiers: { 60: 530, 50: 550, 40: 600, 30: 650 },
    isCustomBuild: true,
    options: [
      { name: 'Standard Menu', items: ['4 Main Dishes', '1 Side', '2 Kinds of Rice', '2 Desserts'] }
    ],
    structure: {
      salad: 0,
      main: 4,
      side: 1,
      rice: 2,
      dessert: 2
    }
  },
  menu560: {
    id: 'menu560', name: 'Menu 580', pricePerHead: 580,
    pricingTiers: { 60: 580, 50: 600, 40: 650, 30: 700 },
    allowSwap: true, // Enable dish swapping with Asian Fusion
    options: [
      { name: 'Filipino Buffet', items: ['Eggplant & Nangka salad', 'Pickled Green Mango w/ dilis', 'Roast Pork Liempo w/ special herbs', 'Kare-Kare w/ bagoong', 'Baked Crabmeat', 'Sinugbang Isda w/ vinegar sauce', 'Chicken w/ barbecue sauce', 'Garlic Rice/Plain Rice', 'Beko Bayot', 'Mango Sago'] },
      { name: 'International Buffet', items: ['Asian Mandarin Chicken Salad', 'Waldorf Salad', 'Chicken Galantina', 'Ox Tongue w/ cooked ham', 'Chicken Bacon Alfredo', 'Beef Morcon', 'Grilled Fish w/ lemon butter sauce', 'Paella/Plain Rice', 'Strawberry Cheesecake', 'Avocado Pie'] }
    ],
    // Asian Fusion items available as swap alternatives
    swapAlternatives: {
      name: 'Asian Fusion',
      items: [
        { name: 'Ngocong Soup', category: 'soup' },
        { name: 'Beef Pochero', category: 'main' },
        { name: 'Chinese Lumpia', category: 'main' },
        { name: 'Misua Guisado', category: 'side' },
        { name: 'Pad Thai', category: 'side' },
        { name: 'Lasagna', category: 'side' },
        { name: 'Callos', category: 'main' },
        { name: 'Chinese Valenciana', category: 'rice' },
        { name: 'Japanese Cheesecake', category: 'dessert' },
        { name: 'Coffee Jelly', category: 'dessert' }
      ]
    }
  },
  menu660: {
    id: 'menu660', name: 'Menu 680', pricePerHead: 680,
    pricingTiers: { 60: 680, 50: 700, 40: 750, 30: 800 },
    options: [
      { name: 'Filipino & Asian Fusion', items: ['Mango & Crabstick Salad', 'Potato Bacon & Egg Salad', 'Korean Galbi Ribs', 'Chicken w/ barbecue sauce', 'Spicy Squid', 'Fettuccine w/ grilled chicken', 'Seafood Roll Salad', 'Plain Rice/Fried Rice', 'Fruit Salad', 'Cookies & Cream Cheesecake'] },
      { name: 'International', items: ['Green Vegetable salad w/ thousand island', 'Mediterranean Salad w/ olives', 'Ox tongue w/ mushroom sauce', 'Crunchy Chicken w/ plum sauce', 'Roast beef w/ gravy', 'Baked Fish w/ mozzarella cheese', 'Polynesian Pork', 'Paella/Plain Rice', 'Choco Peach Cream Cake', 'Blueberry Cheesecake'] }
    ]
  },
  menu810: {
    id: 'menu810', name: 'Menu 830 (Premium)', pricePerHead: 830,
    pricingTiers: { 60: 830, 50: 850, 40: 900, 30: 950 },
    options: [
      { name: 'Premium Buffet', items: ['Salad Bar', 'Japanese Sushi Rolls', 'Grilled Beef Short Rib (Carving Station)', 'Chicken Relleno', 'Baked Fish w/ mozzarella cheese', 'Ox Tongue w/ mushroom sauce', 'Spicy Spareribs', 'Prawn Tempura', 'Penne Carbonara', 'Assorted fresh fruits', 'Blitz Torte', 'Mini Fruit Tart', 'Blueberry Cheesecake'] }
    ]
  }
}

// =====================================================
// HEARTLAND ESTATE PACKAGES
// Red Carpet's own venue — includes tables, chairs,
// buffet table w/ centrepiece, wait staff, utensils,
// and 1 round drinks (Iced Tea/Juice)
// =====================================================
const HEARTLAND_INCLUSIONS = 'Tables & chairs with covers, buffet table with centrepiece, wait staff, utensils, 1 round drinks (Iced Tea/Juice)'

export const heartlandPackages = {
  heartland660: {
    id: 'heartland660', name: 'Menu 660', pricePerHead: 660,
    pricingTiers: { 60: 660, 50: 690, 40: 740, 30: 790 },
    isHeartland: true,
    inclusions: HEARTLAND_INCLUSIONS,
    options: [
      { name: 'Menu A', items: ['Green Salad w/ grilled fish in mustard sauce', 'Chicken Tim w/ asparagus', 'Braised Chinese Spareribs', 'Pancit Special w/ Red Egg', 'Chow Pat Chen', 'Fried Rice/Plain Rice', 'Broken Window', 'Leche Flan'] },
      { name: 'Menu B', items: ['Chicken Macaroni Salad', 'Crispy Chicken w/ kropeks', 'Fish Fillet w/ black beans sauce', 'Seafood Marinara', 'Barbecued Roast Pork Belly', 'Fried Rice/Plain Rice', 'Blitz Torte', 'Choco Zambo'] },
      { name: 'Menu C', items: ['Pomelo Salad', 'Chicken Afritada', 'Pork pieces w/ chili sauce', 'Sauteed Chicken w/ mixed vegetables', 'Beef w/ onions', 'Fried Rice/Plain Rice', 'Moist Chocolate Cake', 'Mango Float'] },
      { name: 'Menu D', items: ['Potato Apple Salad', 'Chinese Humba', 'Chicken Canneloni', 'Stir Fried vegetables w/ quail egg', 'Beef w/ mushroom sauce', 'Fried Rice/Plain Rice', 'Brownies', 'Rainbow Delight'] },
    ]
  },
  heartland760: {
    id: 'heartland760', name: 'Menu 760', pricePerHead: 760,
    pricingTiers: { 60: 760, 50: 790, 40: 840, 30: 890 },
    isHeartland: true,
    inclusions: HEARTLAND_INCLUSIONS,
    options: [
      { name: 'Menu A', items: ['Roast Beef w/ sweet sauce', 'Three Kinds of mushroom w/ broccoli', 'Pork Pizza w/ Mozzarella Cheese', 'Fish Fillet w/ tar tar sauce', 'Penne Carbonara', 'Fried Rice/Plain Rice', 'Mango Pandan', 'Custard Cake'] },
      { name: 'Menu B', items: ['Papo Chicken', 'Barbecued Roast Pork Belly', 'Seafood Mixed Vegetable w/ tofu', 'Fish Fillet w/ soy sauce', 'Sotanghon Guisado', 'Fried Rice/Plain Rice', 'Dubos Enganos', 'Buko Lychee'] },
      { name: 'Menu C', items: ['Hungarian Rolled Porkloin', 'Beef Tapa', 'Chicken Kebab w/ peanut sauce', 'Baked Ziti', 'Garlic Peppered Fish', 'Fried Rice/Plain Rice', 'Choco Toffee Cake', 'Ube Cake'] },
      { name: 'Menu D', items: ['Stuffed Shrimp w/ sweet & sour dip', 'Spinach Lasagna', 'Pork w/ coconut cream', 'Chicken Cordon Bleu', 'Fish Fillet w/ oyster sauce', 'Arroz Valenciana/Plain Rice', 'Choco Cream Cheesecake', 'Maja Blanca'] },
    ]
  },
  heartland830: {
    id: 'heartland830', name: 'Menu 830', pricePerHead: 830,
    pricingTiers: { 60: 830, 50: 860, 40: 910, 30: 960 },
    isHeartland: true,
    inclusions: HEARTLAND_INCLUSIONS,
    options: [
      { name: 'Filipino Buffet', items: ['Eggplant & Nangka salad', 'Pickled Green Mango w/ dilis', 'Roast Pork Liempo w/ special herbs', 'Kare-Kare w/ bagoong', 'Baked Crabmeat', 'Sinugbang Isda w/ vinegar sauce', 'Chicken w/ barbecue sauce', 'Garlic Rice/Plain Rice', 'Beko Bayot', 'Mango Sago'] },
      { name: 'Asian Fusion', items: ['Ngocong Soup', 'Beef Pochero', 'Chinese Lumpia', 'Misua Guisado', 'Pad Thai', 'Lasagna', 'Callos', 'Chinese Valenciana/Plain Rice', 'Japanese Cheesecake', 'Coffee Jelly'] },
      { name: 'International Buffet', items: ['Asian Mandarin Chicken Salad', 'Waldorf Salad', 'Chicken Galantina', 'Ox Tongue w/ cooked ham', 'Chicken Bacon Alfredo', 'Beef Morcon', 'Grilled Fish w/ lemon butter sauce', 'Paella/Plain Rice', 'Strawberry Cheesecake', 'Avocado Pie'] },
    ]
  },
  heartland880: {
    id: 'heartland880', name: 'Menu 880', pricePerHead: 880,
    pricingTiers: { 60: 880, 50: 910, 40: 960, 30: 1010 },
    isHeartland: true,
    weddingMinPax: 100,
    inclusions: HEARTLAND_INCLUSIONS,
    options: [
      { name: 'Filipino & Asian Fusion', items: ['Mango & Crabstick Salad on lettuce', 'Potato Bacon & Egg Salad', 'Pickled Green Mango w/ dilis', 'Korean Galbi Ribs', 'Chicken w/ barbecue sauce', 'Spicy Squid', 'Fettuccine w/ grilled chicken & balsamic sauce', 'Seafood Roll Salad', 'Plain Rice/Fried Rice', 'Fruit Salad', 'Cookies & Cream Cheesecake', 'Banana Surprise', 'Choco Balls'] },
      { name: 'International', items: ['Green Vegetable salad w/ thousand island', 'Mediterranean Salad w/ olives', 'Chicken Macaroni Salad', 'Ox tongue w/ straw mushroom sauce', 'Crunchy Chicken w/ plum sauce', 'Roast beef w/ gravy', 'Baked Fish w/ mozzarella cheese', 'Polynesian Pork', 'Paella/Plain Rice', 'Choco Peach Cream Cake', 'Blueberry Cheesecake', 'Macaroons', 'Bingcava'] },
    ]
  },
  heartland1010: {
    id: 'heartland1010', name: 'Menu 1010 (Premium)', pricePerHead: 1010,
    pricingTiers: { 60: 1010, 50: 1040, 40: 1090, 30: 1140 },
    isHeartland: true,
    weddingMinPax: 100,
    inclusions: HEARTLAND_INCLUSIONS,
    options: [
      { name: 'Premium Buffet', items: ['Salad Bar', 'Japanese Sushi Rolls', 'Goat Calderita', 'Grilled Chicken Shawarma w/ Garlic avocado sauce', 'Baked Fish w/ mozzarella cheese', 'Ox Tongue w/ mushroom sauce', 'Spicy Spareribs', 'Prawn Tempura', 'Penne carbonara', 'Assorted fresh fruits', 'Japanese Cheesecake', 'Mini Fruit Tart', 'Blueberry Cheesecake'] },
    ]
  },
}

// Occasion types
export const occasionTypes = [
  { id: 'birthday', name: 'Birthday', requiresDetails: true },
  { id: 'wedding', name: 'Wedding' },
  { id: 'debut', name: 'Debut (18th Birthday)' },
  { id: 'christening', name: 'Christening/Baptism' },
  { id: 'anniversary', name: 'Anniversary' },
  { id: 'graduation', name: 'Graduation' },
  { id: 'corporate', name: 'Corporate Event' },
  { id: 'reunion', name: 'Family Reunion' },
  { id: 'fiesta', name: 'Fiesta' },
  { id: 'other', name: 'Other' }
]

// Preset motif colors
export const presetMotifColors = [
  { id: 'blue_gold', name: 'Blue and Gold', colors: ['#1e40af', '#fbbf24'] },
  { id: 'pink_white', name: 'Pink and White', colors: ['#ec4899', '#ffffff'] },
  { id: 'red_gold', name: 'Red and Gold', colors: ['#dc2626', '#fbbf24'] },
  { id: 'green_white', name: 'Green and White', colors: ['#16a34a', '#ffffff'] },
  { id: 'purple_silver', name: 'Purple and Silver', colors: ['#7c3aed', '#c0c0c0'] },
  { id: 'navy_coral', name: 'Navy and Coral', colors: ['#1e3a5f', '#ff6b6b'] },
  { id: 'rustic', name: 'Rustic (Brown & Cream)', colors: ['#8b4513', '#f5f5dc'] },
  { id: 'pastel', name: 'Pastel Mix', colors: ['#fce7f3', '#dbeafe', '#d1fae5'] },
  { id: 'black_gold', name: 'Black and Gold', colors: ['#000000', '#fbbf24'] },
  { id: 'tropical', name: 'Tropical (Orange & Green)', colors: ['#f97316', '#22c55e'] },
]

// Add-on Stations
export const addOnStations = [
  { id: 'water', name: 'Water (5 gallons)', price: 50, unit: 'per 5 gallons' },
  { id: 'ice', name: 'Ice (10 kilos)', price: 150, unit: 'per bag' },
  { id: 'halohalo', name: 'Halo-halo Bar', price: 4000, unit: 'good for 50' },
  { id: 'crepe', name: 'Crepe Station', price: 4000, unit: 'good for 50' },
  { id: 'fruitshake', name: 'Fresh Fruit Shake Bar', price: 4000, unit: 'good for 50' },
  { id: 'sushi', name: 'Sushi Platter', price: 4000, unit: 'good for 15-20' },
  { id: 'prawns', name: 'Prawn Tempura (Small)', price: 4500, unit: 'order' },
  { id: 'prawnm', name: 'Prawn Tempura (Medium)', price: 6400, unit: 'order' },
  { id: 'prawnl', name: 'Prawn Tempura (Large)', price: 8800, unit: 'order' },
  { id: 'taco', name: 'Taco Station', price: 3000, unit: 'good for 50' },
  { id: 'burrito', name: 'Burrito Station', price: 4000, unit: 'good for 50' },
  { id: 'salad', name: 'Salad Bar', price: 4000, unit: 'good for 50' },
]

// Dessert Add-ons
export const dessertAddOns = [
  { id: 'dessert_20pax', name: 'Dessert Platter (20 pax)', price: 1400, pax: 20, unit: 'good for 20 pax' },
  { id: 'dessert_5pax', name: 'Dessert Platter (5 pax)', price: 750, pax: 5, unit: 'good for 5 pax' },
]

// Drinks Options
export const freeDrinkOptions = [
  { id: 'softdrinks', name: 'Assorted Softdrinks', description: '1 round included' },
  { id: 'icetea', name: 'Ice Tea', description: '1 round included' },
]

export const additionalDrinks = [
  { id: 'extra_softdrinks', name: 'Additional Softdrinks (Mismo)', price: 35, unit: 'per bottle' },
  { id: 'ic_juice_lemongrass', name: 'Ic Juice - Lemongrass', price: 40, unit: 'per bottle' },
  { id: 'ic_juice_calamansi', name: 'Ic Juice - Calamansi', price: 40, unit: 'per bottle' },
]

export const getPricePerHead = (packageId, pax) => {
  const pkg = menuPackages[packageId] || heartlandPackages[packageId]
  if (!pkg) return 0
  const tiers = pkg.pricingTiers
  if (pax >= 60) return tiers[60]
  if (pax >= 50) return tiers[50]
  if (pax >= 40) return tiers[40]
  return tiers[30]
}

// Alias for backwards compatibility
export const calculatePricePerHead = getPricePerHead

export const calculateTotal = (packageId, pax, addOns = [], desserts = [], drinkAddOns = []) => {
  const pricePerHead = getPricePerHead(packageId, pax)
  const menuTotal = pricePerHead * pax

  // Station add-ons
  const addOnsTotal = addOns.reduce((sum, a) => {
    const item = addOnStations.find(s => s.id === a.id)
    return sum + (item ? item.price * (a.quantity || 1) : 0)
  }, 0)

  // Dessert add-ons
  const dessertTotal = desserts.reduce((sum, d) => {
    const item = dessertAddOns.find(s => s.id === d.id)
    return sum + (item ? item.price * (d.quantity || 1) : 0)
  }, 0)

  // Drink add-ons (free drink doesn't add cost)
  const drinkTotal = drinkAddOns.reduce((sum, d) => {
    const item = additionalDrinks.find(s => s.id === d.id)
    return sum + (item ? item.price * (d.quantity || 1) : 0)
  }, 0)

  return menuTotal + addOnsTotal + dessertTotal + drinkTotal
}

// Helper to calculate all add-on totals
export const calculateAddOnsBreakdown = (addOns = [], desserts = [], drinks = []) => {
  const stationsTotal = addOns.reduce((sum, a) => {
    const item = addOnStations.find(s => s.id === a.id)
    return sum + (item ? item.price * (a.quantity || 1) : 0)
  }, 0)

  const dessertTotal = desserts.reduce((sum, d) => {
    const item = dessertAddOns.find(s => s.id === d.id)
    return sum + (item ? item.price * (d.quantity || 1) : 0)
  }, 0)

  const drinkTotal = drinks.reduce((sum, d) => {
    const item = additionalDrinks.find(s => s.id === d.id)
    return sum + (item ? item.price * (d.quantity || 1) : 0)
  }, 0)

  return { stationsTotal, dessertTotal, drinkTotal, total: stationsTotal + dessertTotal + drinkTotal }
}
