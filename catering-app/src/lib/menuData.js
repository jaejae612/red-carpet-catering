// Red Carpet Catering Menu Packages
export const menuPackages = {
  menu470: {
    id: 'menu470', name: 'Menu 470', pricePerHead: 470,
    pricingTiers: { 60: 470, 50: 490, 40: 540, 30: 590 },
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
    id: 'menu510', name: 'Menu 510', pricePerHead: 510,
    pricingTiers: { 60: 510, 50: 530, 40: 580, 30: 630 },
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
    id: 'menu560', name: 'Menu 560', pricePerHead: 560,
    pricingTiers: { 60: 560, 50: 580, 40: 630, 30: 680 },
    options: [
      { name: 'Filipino Buffet', items: ['Eggplant & Nangka salad', 'Pickled Green Mango w/ dilis', 'Roast Pork Liempo w/ special herbs', 'Kare-Kare w/ bagoong', 'Baked Crabmeat', 'Sinugbang Isda w/ vinegar sauce', 'Chicken w/ barbecue sauce', 'Garlic Rice/Plain Rice', 'Beko Bayot', 'Mango Sago'] },
      { name: 'Asian Fusion', items: ['Ngocong Soup', 'Beef Pochero', 'Chinese Lumpia', 'Misua Guisado', 'Pad Thai', 'Lasagna', 'Callos', 'Chinese Valenciana/Plain Rice', 'Japanese Cheesecake', 'Coffee Jelly'] },
      { name: 'International Buffet', items: ['Asian Mandarin Chicken Salad', 'Waldorf Salad', 'Chicken Galantina', 'Ox Tongue w/ cooked ham', 'Chicken Bacon Alfredo', 'Beef Morcon', 'Grilled Fish w/ lemon butter sauce', 'Paella/Plain Rice', 'Strawberry Cheesecake', 'Avocado Pie'] }
    ]
  },
  menu660: {
    id: 'menu660', name: 'Menu 660', pricePerHead: 660,
    pricingTiers: { 60: 660, 50: 680, 40: 730, 30: 780 },
    options: [
      { name: 'Filipino & Asian Fusion', items: ['Mango & Crabstick Salad', 'Potato Bacon & Egg Salad', 'Korean Galbi Ribs', 'Chicken w/ barbecue sauce', 'Spicy Squid', 'Fettuccine w/ grilled chicken', 'Seafood Roll Salad', 'Plain Rice/Fried Rice', 'Fruit Salad', 'Cookies & Cream Cheesecake'] },
      { name: 'International', items: ['Green Vegetable salad w/ thousand island', 'Mediterranean Salad w/ olives', 'Ox tongue w/ mushroom sauce', 'Crunchy Chicken w/ plum sauce', 'Roast beef w/ gravy', 'Baked Fish w/ mozzarella cheese', 'Polynesian Pork', 'Paella/Plain Rice', 'Choco Peach Cream Cake', 'Blueberry Cheesecake'] }
    ]
  },
  menu810: {
    id: 'menu810', name: 'Menu 810 (Premium)', pricePerHead: 810,
    pricingTiers: { 60: 810, 50: 830, 40: 880, 30: 930 },
    options: [
      { name: 'Premium Buffet', items: ['Salad Bar', 'Japanese Sushi Rolls', 'Grilled Beef Short Rib (Carving Station)', 'Chicken Relleno', 'Baked Fish w/ mozzarella cheese', 'Ox Tongue w/ mushroom sauce', 'Spicy Spareribs', 'Prawn Tempura', 'Penne Carbonara', 'Assorted fresh fruits', 'Blitz Torte', 'Mini Fruit Tart', 'Blueberry Cheesecake'] }
    ]
  }
}

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

export const getPricePerHead = (packageId, pax) => {
  const pkg = menuPackages[packageId]
  if (!pkg) return 0
  if (pax >= 60) return pkg.pricingTiers[60]
  if (pax >= 50) return pkg.pricingTiers[50]
  if (pax >= 40) return pkg.pricingTiers[40]
  return pkg.pricingTiers[30]
}

// Alias for backwards compatibility
export const calculatePricePerHead = getPricePerHead

export const calculateTotal = (packageId, pax, addOns = []) => {
  const pricePerHead = getPricePerHead(packageId, pax)
  const menuTotal = pricePerHead * pax
  const addOnsTotal = addOns.reduce((sum, a) => {
    const item = addOnStations.find(s => s.id === a.id)
    return sum + (item ? item.price * (a.quantity || 1) : 0)
  }, 0)
  return menuTotal + addOnsTotal
}