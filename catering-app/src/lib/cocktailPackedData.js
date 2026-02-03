// Red Carpet Catering - Cocktail & Packed Meal Menus
// Organized from menu images

// ============================================
// COCKTAIL MENUS (Per Head Pricing)
// ============================================
export const cocktailMenus = {
  cocktail400: {
    id: 'cocktail400',
    name: 'Cocktail Menu 400',
    pricePerHead: 400,
    pricingTiers: { 60: 400, 50: 460, 40: 490, 30: 520 },
    minPax: 30,
    basePax: 60,
    type: 'cocktail',
    options: {
      A: {
        name: 'Menu A',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Tasty Sausage Sticks',
          'Puff Pastry Pizza',
          'Siomai',
          'Chicken Triangles',
          'Javanese Bam-e',
          'Chocolate Bars',
          'Bread Pudding',
          'Iced Tea'
        ]
      },
      B: {
        name: 'Menu B',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Cabbage Roll',
          'Penne Carbonara',
          'Meaty Meatballs w/ sweet & sour dip',
          'Bread Rolls',
          'Chicken Lollipop',
          'Mini Brownies',
          'Blitz Torte',
          'Pineapple Juice'
        ]
      }
    }
  },
  cocktail450: {
    id: 'cocktail450',
    name: 'Cocktail Menu 450',
    pricePerHead: 450,
    pricingTiers: { 60: 450, 50: 510, 40: 540, 30: 570 },
    minPax: 30,
    basePax: 60,
    type: 'cocktail',
    options: {
      A: {
        name: 'Menu A',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Chicken Lollipop',
          'Squid Balls w/ Spicy Dip',
          'Banana wrapped in bacon',
          'Mini Burger',
          'Vegetable Sticks w/ Thousand Island Dip',
          'Sotanghon Guisado',
          'Mango Pandan',
          'Mini Chocolate Cake',
          'Iced Tea'
        ]
      },
      B: {
        name: 'Menu B',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Chicken Kebab',
          'Fish Zulietas',
          'Mini Croissants',
          'Mini Pizza',
          'Vegetable Sticks w/ Thousand Island Dip',
          'Chicken Tetrazzini',
          'Blitz Torte',
          'Squash Peanut Butter Cake',
          'Pineapple Juice'
        ]
      }
    }
  },
  cocktail500: {
    id: 'cocktail500',
    name: 'Cocktail Menu 500',
    pricePerHead: 500,
    pricingTiers: { 60: 500, 50: 560, 40: 590, 30: 620 },
    minPax: 30,
    basePax: 60,
    type: 'cocktail',
    options: {
      A: {
        name: 'Menu A',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Chicken Ham Roll',
          'Beef Tapa',
          'Camaron Rebosado',
          'Siomai',
          'Chicken Liver Pate',
          'Mini Open Sandwiches',
          'Lasagna',
          'Carrot Cake',
          'Choco Cream Cheese Cake',
          'Iced Tea'
        ]
      },
      B: {
        name: 'Menu B',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Chicken Burrito',
          'Pork Kebab',
          'Lumpia Shanghai',
          'Pearl Balls',
          'Mini Pizza',
          'Mini Burger',
          'Penne Carbonara',
          'Banana Cake',
          'Macaroons',
          'Pineapple Juice'
        ]
      }
    }
  },
  cocktail600: {
    id: 'cocktail600',
    name: 'Cocktail Menu 600 (Premium)',
    pricePerHead: 600,
    pricingTiers: { 60: 600, 50: 660, 40: 690, 30: 720 },
    minPax: 30,
    basePax: 60,
    type: 'cocktail',
    options: {
      A: {
        name: 'Set A',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'New York Rolls',
          'Fish Sticks in beer batter',
          'Crab Cakes',
          'Chicken Yakitori',
          'Mini Pizza',
          'Spaghetti Supreme',
          'Lumpia Shanghai',
          'Sweet Corn Fritters',
          'Blitz Torte',
          'Vegetable Sticks w/ dip',
          'Iced Tea'
        ]
      },
      B: {
        name: 'Set B',
        items: [
          'Peanuts',
          'Canapes & Cold Cuts',
          'Mini Open Sandwiches',
          'Chicken Fritters',
          'Special Ngohiong with Taophe',
          'Cheese Sticks',
          'Empanaditas',
          'Penne Alfredo',
          'Camaron Rebosado',
          'Choco Balls',
          'Macaroons',
          'Choco Zambo',
          'Pineapple Juice'
        ]
      }
    }
  }
}

// ============================================
// PACKED MEAL MENUS (Per Pack Pricing)
// ============================================
export const packedMealMenus = {
  packed180: {
    id: 'packed180',
    name: 'Packed Meal ₱180',
    pricePerPack: 180,
    type: 'packed_meal',
    includes: 'Tetra pack juice or bottled water',
    sodaUpgrade: 60, // Add ₱60 for canned soda
    options: {
      A: {
        name: 'Menu A',
        items: ['Breaded Chicken', 'Sotanghon Guisado', 'Plain Rice', 'Macaroons']
      },
      B: {
        name: 'Menu B',
        items: ['Sweet & Sour Pork', 'Bam-e', 'Plain Rice', 'Blitz Torte']
      },
      C: {
        name: 'Menu C',
        items: ['Pork Pieces w/ chili sauce', 'Fish Fingers', 'Plain Rice', 'Maja Blanca']
      },
      D: {
        name: 'Menu D',
        items: ['Chicken Teriyaki', 'Mini Meat Balls', 'Plain Rice', 'Banana']
      }
    }
  },
  packed250: {
    id: 'packed250',
    name: 'Packed Meal ₱250',
    pricePerPack: 250,
    type: 'packed_meal',
    includes: 'Tetra pack juice or bottled water',
    sodaUpgrade: 60,
    options: {
      A: {
        name: 'Menu A',
        items: ['Beef w/ onions', 'Chicken Lollipop', 'Lumpia Shanghai', 'Plain Rice', 'Banana Cake']
      },
      B: {
        name: 'Menu B',
        items: ['Grilled Porkchop', 'Sweet & Sour Fish', 'Stuffed Shrimp', 'Plain Rice', 'Chocolate Balls']
      }
    }
  },
  packed320: {
    id: 'packed320',
    name: 'Packed Meal ₱320 (Premium)',
    pricePerPack: 320,
    type: 'packed_meal',
    includes: 'Tetra pack juice or bottled water',
    sodaUpgrade: 60,
    options: {
      A: {
        name: 'Menu A',
        items: ['Embutido', 'Beef w/ Mushroom', 'Buttered Chicken', 'Sotanghon Guisado', 'Plain Rice', 'Choco Zambo']
      },
      B: {
        name: 'Menu B',
        items: ['Fish Fillet w/ tartar sauce', 'Chinese Humba', 'Chicken Cordon Bleu', 'Mixed Vegetables with Tofu', 'Plain Rice', 'Carrot Cake']
      }
    }
  }
}

// ============================================
// PACKED SNACK MENUS (Per Pack Pricing)
// ============================================
export const packedSnackMenus = {
  snack150: {
    id: 'snack150',
    name: 'Packed Snack ₱150',
    pricePerPack: 150,
    type: 'packed_snack',
    includes: 'Bottled water or tetra packed juice',
    options: {
      A: {
        name: 'Menu A',
        items: ['Chicken Lollipop', 'Pig in a blanket', 'Sotanghon Guisado']
      },
      B: {
        name: 'Menu B',
        items: ['Hotcake', 'Pork Kebab', 'Siomai']
      },
      C: {
        name: 'Menu C',
        items: ['Banana Turon', 'Meatballs', 'Pancit Canton']
      },
      D: {
        name: 'Menu D',
        items: ['Fish Zulietas', 'Ube Pandesal', 'Spaghetti Supreme']
      }
    }
  },
  snack200: {
    id: 'snack200',
    name: 'Packed Snack ₱200',
    pricePerPack: 200,
    type: 'packed_snack',
    includes: 'Bottled water or tetra packed juice',
    options: {
      A: {
        name: 'Menu A',
        items: ['Chicken Nuggets', 'Tuna Sandwich', 'Mini Pizza', 'Blitz Torte']
      },
      B: {
        name: 'Menu B',
        items: ['Mini Breaded Porkchop', 'Egg Pimiento Sandwich', 'Chicken Pasta Primavera', 'Ube Cake']
      },
      C: {
        name: 'Menu C',
        items: ['Banana Que', 'Mini Burger', 'Beef Tapa', 'Choco Cupcake']
      },
      D: {
        name: 'Menu D',
        items: ['Bam-e', 'Chicken Triangles', 'Cheese Bread', 'Brownies']
      }
    }
  }
}

// ============================================
// COCKTAIL ADD-ONS
// ============================================
export const cocktailAddOns = [
  { id: 'water_5gal', name: 'Water (5 gallons)', price: 50, unit: 'per 5 gallons' },
  { id: 'halohalo_bar', name: 'Halo-halo Bar', price: 3500, unit: 'good for 50', serves: 50 },
  { id: 'crepe_station', name: 'Crepe Station', price: 3500, unit: 'good for 50', serves: 50 },
  { id: 'fruitshake_bar', name: 'Fresh Fruit Shake Bar', price: 3500, unit: 'good for 50', serves: 50 },
  { id: 'sushi_platter', name: 'Sushi Platter', price: 4000, unit: 'good for 15-20', serves: 20 },
  { id: 'prawn_tempura_s', name: 'Prawn Tempura (Small)', price: 4000, unit: 'order' },
  { id: 'prawn_tempura_m', name: 'Prawn Tempura (Medium)', price: 6000, unit: 'order' },
  { id: 'prawn_tempura_l', name: 'Prawn Tempura (Large)', price: 8000, unit: 'order' },
  { id: 'taco_station', name: 'Taco Station', price: 3000, unit: 'good for 50', serves: 50 },
  { id: 'burrito_station', name: 'Burrito Station', price: 3500, unit: 'good for 50', serves: 50 },
  { id: 'chinese_lumpia', name: 'Chinese Lumpia', price: 1800, unit: 'good for 30', serves: 30 },
  { id: 'salad_bar', name: 'Salad Bar', price: 3500, unit: 'good for 50', serves: 50 },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get cocktail price per head based on guest count
export const getCocktailPricePerHead = (menuId, pax) => {
  const menu = cocktailMenus[menuId]
  if (!menu) return 0
  
  if (pax >= 60) return menu.pricingTiers[60]
  if (pax >= 50) return menu.pricingTiers[50]
  if (pax >= 40) return menu.pricingTiers[40]
  return menu.pricingTiers[30]
}

// Calculate cocktail total
export const calculateCocktailTotal = (menuId, pax, addOns = []) => {
  const pricePerHead = getCocktailPricePerHead(menuId, pax)
  const menuTotal = pricePerHead * pax
  
  const addOnsTotal = addOns.reduce((sum, addon) => {
    const item = cocktailAddOns.find(a => a.id === addon.id)
    return sum + (item ? item.price * (addon.quantity || 1) : 0)
  }, 0)
  
  return menuTotal + addOnsTotal
}

// Calculate packed meal total
export const calculatePackedMealTotal = (menuId, quantity, includeSoda = false) => {
  const menu = packedMealMenus[menuId]
  if (!menu) return 0
  
  const baseTotal = menu.pricePerPack * quantity
  const sodaTotal = includeSoda ? menu.sodaUpgrade * quantity : 0
  
  return baseTotal + sodaTotal
}

// Calculate packed snack total
export const calculatePackedSnackTotal = (menuId, quantity) => {
  const menu = packedSnackMenus[menuId]
  if (!menu) return 0
  
  return menu.pricePerPack * quantity
}

// Get all catering types for selection
export const cateringTypes = [
  { id: 'buffet', name: 'Buffet Catering', description: 'Full buffet setup with chafing dishes', icon: '🍽️' },
  { id: 'cocktail', name: 'Cocktail Party', description: 'Finger foods and appetizers', icon: '🥂', minPax: 30 },
  { id: 'packed_meal', name: 'Packed Meals', description: 'Individual meal boxes', icon: '📦' },
  { id: 'packed_snack', name: 'Packed Snacks', description: 'Individual snack boxes', icon: '🥡' },
]

// Export all menus combined for easy access
export const allCocktailAndPackedMenus = {
  ...cocktailMenus,
  ...packedMealMenus,
  ...packedSnackMenus
}
