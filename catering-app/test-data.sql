-- =====================================================
-- RED CARPET CATERING - TEST DATA
-- =====================================================
-- Run this in Supabase SQL Editor to populate test data
-- All test entries use "Test" prefix for easy cleanup
-- To remove: DELETE FROM bookings WHERE customer_name LIKE 'Test%';
--            DELETE FROM food_orders WHERE customer_name LIKE 'Test%';
--            DELETE FROM payments WHERE notes LIKE 'Test data%';
-- =====================================================

-- =====================================================
-- 1. FOOD ITEMS (a la carte menu for food ordering)
-- =====================================================
-- Only insert if food_items table is empty
INSERT INTO food_items (name, category, available, price_home, price_tray, price_xs, price_small, price_medium, price_large)
SELECT * FROM (VALUES
  -- Salads
  ('Caesar Salad', 'salad', true, 350, 650, 1200, 1700, 2800, 4200),
  ('Waldorf Salad', 'salad', true, 380, 700, 1300, 1800, 3000, 4500),
  ('Asian Mandarin Chicken Salad', 'salad', true, 400, 750, 1400, 1900, 3200, 4800),
  ('Potato Bacon & Egg Salad', 'salad', true, 350, 650, 1200, 1700, 2800, 4200),

  -- Chicken
  ('Chicken BBQ', 'chicken', true, 450, 850, 1600, 2300, 3800, 5700),
  ('Chicken Teriyaki', 'chicken', true, 420, 800, 1500, 2200, 3600, 5400),
  ('Chicken Cordon Bleu', 'chicken', true, 500, 950, 1800, 2600, 4300, 6500),
  ('Breaded Chicken', 'chicken', true, 400, 750, 1400, 2000, 3300, 5000),
  ('Chicken Galantina', 'chicken', true, 480, 900, 1700, 2500, 4100, 6200),
  ('Chicken w/ Plum Sauce', 'chicken', true, 450, 850, 1600, 2300, 3800, 5700),

  -- Chicken Premium
  ('Chicken Relleno', 'chicken_premium', true, 550, 1050, 2000, 2900, 4800, 7200),
  ('Buttered Chicken', 'chicken_premium', true, 500, 950, 1800, 2600, 4300, 6500),

  -- Pork
  ('Roast Pork Liempo', 'pork', true, 500, 950, 1800, 2600, 4300, 6500),
  ('Sweet & Sour Pork', 'pork', true, 450, 850, 1600, 2300, 3800, 5700),
  ('Chinese Humba', 'pork', true, 420, 800, 1500, 2200, 3600, 5400),
  ('Polynesian Pork', 'pork', true, 480, 900, 1700, 2500, 4100, 6200),
  ('Pork Kebab', 'pork', true, 400, 750, 1400, 2000, 3300, 5000),
  ('Embutido', 'pork', true, 380, 700, 1300, 1900, 3200, 4800),

  -- Beef
  ('Beef Morcon', 'beef', true, 600, 1150, 2200, 3200, 5300, 8000),
  ('Beef w/ Mushroom Sauce', 'beef', true, 550, 1050, 2000, 2900, 4800, 7200),
  ('Beef Caldereta', 'beef', true, 550, 1050, 2000, 2900, 4800, 7200),
  ('Korean Galbi Ribs', 'beef', true, 650, 1250, 2400, 3500, 5800, 8700),
  ('Beef Tapa', 'beef', true, 500, 950, 1800, 2600, 4300, 6500),

  -- Seafood
  ('Baked Fish w/ Mozzarella', 'seafood', true, 480, 900, 1700, 2500, 4100, 6200),
  ('Sinugbang Isda', 'seafood', true, 450, 850, 1600, 2300, 3800, 5700),
  ('Sweet & Sour Fish', 'seafood', true, 420, 800, 1500, 2200, 3600, 5400),
  ('Fish Fillet w/ Tartar Sauce', 'seafood', true, 450, 850, 1600, 2300, 3800, 5700),

  -- Seafood Premium
  ('Baked Crabmeat', 'seafood_premium', true, 600, 1150, 2200, 3200, 5300, 8000),
  ('Prawn Tempura', 'seafood_premium', true, 650, 1250, 2400, 3500, 5800, 8700),
  ('Spicy Squid', 'seafood_premium', true, 550, 1050, 2000, 2900, 4800, 7200),
  ('Camaron Rebosado', 'seafood_premium', true, 500, 950, 1800, 2600, 4300, 6500),

  -- Specialties
  ('Kare-Kare', 'specialties', true, 550, 1050, 2000, 2900, 4800, 7200),
  ('Callos', 'specialties', true, 500, 950, 1800, 2600, 4300, 6500),
  ('Beef Pochero', 'specialties', true, 520, 1000, 1900, 2700, 4500, 6800),

  -- Ox Tongue
  ('Ox Tongue w/ Mushroom Sauce', 'ox_tongue', true, 700, 1350, 2600, 3800, 6300, 9500),
  ('Ox Tongue w/ Cooked Ham', 'ox_tongue', true, 720, 1380, 2650, 3900, 6400, 9600),

  -- Vegetables
  ('Mixed Vegetables w/ Tofu', 'vegetable', true, 300, 550, 1000, 1500, 2500, 3800),
  ('Pinakbet', 'vegetable', true, 320, 600, 1100, 1600, 2600, 4000),
  ('Chopsuey', 'vegetable', true, 350, 650, 1200, 1700, 2800, 4200),

  -- Noodle & Pasta
  ('Penne Carbonara', 'noodle_pasta', true, 400, 750, 1400, 2000, 3300, 5000),
  ('Chicken Bacon Alfredo', 'noodle_pasta', true, 420, 800, 1500, 2200, 3600, 5400),
  ('Lasagna', 'noodle_pasta', true, 450, 850, 1600, 2300, 3800, 5700),
  ('Spaghetti Supreme', 'noodle_pasta', true, 380, 700, 1300, 1900, 3200, 4800),
  ('Sotanghon Guisado', 'noodle_pasta', true, 350, 650, 1200, 1700, 2800, 4200),
  ('Bam-e', 'noodle_pasta', true, 350, 650, 1200, 1700, 2800, 4200),

  -- Desserts
  ('Blueberry Cheesecake', 'dessert', true, 1400, NULL, NULL, NULL, NULL, NULL),
  ('Strawberry Cheesecake', 'dessert', true, 1400, NULL, NULL, NULL, NULL, NULL),
  ('Mango Sago', 'dessert', true, 1200, NULL, NULL, NULL, NULL, NULL),
  ('Avocado Pie', 'dessert', true, 1200, NULL, NULL, NULL, NULL, NULL),
  ('Blitz Torte', 'dessert', true, 1000, NULL, NULL, NULL, NULL, NULL),
  ('Beko Bayot', 'dessert', true, 1000, NULL, NULL, NULL, NULL, NULL),

  -- Special Items
  ('Chinese Lumpia', 'special', true, 600, 1500, NULL, 1800, 3600, NULL),
  ('Sushi Platter', 'special', true, 4000, NULL, NULL, NULL, NULL, NULL),
  ('Bingcava', 'special', true, 480, 1500, NULL, NULL, NULL, NULL)
) AS t(name, category, available, price_home, price_tray, price_xs, price_small, price_medium, price_large)
WHERE NOT EXISTS (SELECT 1 FROM food_items LIMIT 1);


-- =====================================================
-- 2. BUFFET CATERING BOOKINGS
-- =====================================================

-- Booking 1: Upcoming wedding - confirmed, deposit paid
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Maria Santos', '09171234567', 'maria.santos@test.com',
  'Cebu Grand Convention Center', 'Brgy. Apas, Cebu City', 0,
  CURRENT_DATE + INTERVAL '14 days', '18:00',
  'menu660', 'Filipino & Asian Fusion', 100,
  '[{"id":"halohalo","name":"Halo-halo Bar","quantity":2,"price":4000},{"id":"crepe","name":"Crepe Station","quantity":1,"price":4000}]'::jsonb,
  'Red and Gold', 'wedding',
  'Please set up a cake table near the entrance. Bride is allergic to shellfish.',
  78000.00,
  'confirmed', 'deposit_paid',
  NOW() - INTERVAL '5 days'
);

-- Booking 2: Upcoming birthday - pending, unpaid
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  birthday_celebrant, birthday_age,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Juan Dela Cruz', '09261234567', 'juan.delacruz@test.com',
  'Home - Banilad', 'Brgy. Banilad, Cebu City', 0,
  CURRENT_DATE + INTERVAL '7 days', '12:00',
  'menu510', 'Standard Menu', 60,
  '[{"id":"sushi","name":"Sushi Platter","quantity":1,"price":4000}]'::jsonb,
  'Blue and Gold', 'birthday',
  'boy', '7',
  'Need a kids table for 10 children. Theme is Spiderman.',
  34600.00,
  'pending', 'unpaid',
  NOW() - INTERVAL '2 days'
);

-- Booking 3: Corporate event - confirmed, fully paid
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - ABC Corporation (Ana Reyes)', '09321234567', 'ana.reyes@abccorp.test.com',
  'Radisson Blu Hotel', 'Brgy. Mabolo, Cebu City', 0,
  CURRENT_DATE + INTERVAL '21 days', '11:30',
  'menu810', 'Premium Buffet', 150,
  '[{"id":"fruitshake","name":"Fresh Fruit Shake Bar","quantity":3,"price":4000},{"id":"prawnl","name":"Prawn Tempura (Large)","quantity":2,"price":8800}]'::jsonb,
  'Black and Gold', 'corporate',
  'Company year-end party. Need projector table and mic stand area. Vegetarian option for 10 guests.',
  151100.00,
  'confirmed', 'fully_paid',
  NOW() - INTERVAL '14 days'
);

-- Booking 4: Past completed debut
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Carmen Villanueva', '09181234567', 'carmen.v@test.com',
  'Montebello Villa Hotel', 'Brgy. Lahug, Cebu City', 0,
  CURRENT_DATE - INTERVAL '10 days', '18:00',
  'menu560', 'Filipino Buffet', 80,
  '[{"id":"halohalo","name":"Halo-halo Bar","quantity":2,"price":4000}]'::jsonb,
  'Pink and White', 'debut',
  '18 roses and 18 candles ceremony. Need space for a dance floor.',
  52800.00,
  'completed', 'fully_paid',
  NOW() - INTERVAL '25 days'
);

-- Booking 5: Cancelled booking
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Roberto Garcia', '09991234567', 'roberto.g@test.com',
  'Home - Talisay', 'Brgy. Tabunok, Talisay City', 0,
  CURRENT_DATE + INTERVAL '5 days', '17:00',
  'menu470', 'Standard Menu', 40,
  '[]'::jsonb,
  'Green and White', 'christening',
  'Cancelled due to venue change. Will rebook.',
  21600.00,
  'cancelled', 'refunded',
  NOW() - INTERVAL '8 days'
);

-- Booking 6: Upcoming event in Mactan (with gas charge)
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Lisa Tanaka', '09171987654', 'lisa.tanaka@test.com',
  'Shangri-La Mactan', 'Brgy. Punta Engaño, Lapu-Lapu City', 900,
  CURRENT_DATE + INTERVAL '30 days', '19:00',
  'menu660', 'International', 120,
  '[{"id":"sushi","name":"Sushi Platter","quantity":3,"price":4000},{"id":"salad","name":"Salad Bar","quantity":2,"price":4000}]'::jsonb,
  'Navy and Coral', 'anniversary',
  '25th wedding anniversary. Need special anniversary cake table. Prefer ocean-view setup.',
  100100.00,
  'confirmed', 'deposit_paid',
  NOW() - INTERVAL '10 days'
);

-- Booking 7: Small family gathering - pending
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Elena Fernandez', '09261987654', 'elena.f@test.com',
  'Home - Mabolo', 'Brgy. Mabolo, Cebu City', 0,
  CURRENT_DATE + INTERVAL '3 days', '12:00',
  'menu470', 'Standard Menu', 30,
  '[]'::jsonb,
  'Pastel Mix', 'reunion',
  'Small family reunion. Simple setup only, no need for elaborate decorations.',
  17700.00,
  'pending', 'unpaid',
  NOW() - INTERVAL '1 day'
);

-- Booking 8: Same-day event as Booking 1 (to test date conflicts)
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  venue, venue_address, gas_charge,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, motif, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Patricia Lim', '09181987654', 'patricia.l@test.com',
  'Casino Espanol', 'Brgy. Ermita, Cebu City', 0,
  CURRENT_DATE + INTERVAL '14 days', '11:00',
  'menu510', 'Standard Menu', 50,
  '[{"id":"taco","name":"Taco Station","quantity":1,"price":3000}]'::jsonb,
  'Purple and Silver', 'graduation',
  'Graduation lunch for 2 graduates. Please prepare 2 flower garlands.',
  28500.00,
  'confirmed', 'deposit_paid',
  NOW() - INTERVAL '3 days'
);


-- =====================================================
-- 3. COCKTAIL PARTY BOOKINGS
-- =====================================================

-- Cocktail 1: Upcoming corporate cocktail
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  booking_type,
  venue, venue_address,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, occasion,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Mark Chen (TechCo)', '09321987654', 'mark.chen@techco.test.com',
  'cocktail',
  'IT Park Function Hall', 'Brgy. Apas, Cebu City',
  CURRENT_DATE + INTERVAL '10 days', '18:00',
  'Cocktail Menu 500', 'A', 80,
  '[{"id":"sushi_platter","name":"Sushi Platter","quantity":2,"price":4000},{"id":"prawn_tempura_m","name":"Prawn Tempura (Medium)","quantity":1,"price":6000}]'::jsonb,
  'corporate',
  'Product launch event. Need area for presentation and demo booths.',
  54000.00,
  'confirmed', 'fully_paid',
  NOW() - INTERVAL '7 days'
);

-- Cocktail 2: Birthday cocktail party
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  booking_type,
  venue, venue_address,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  add_ons, occasion, motif,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Diana Reyes', '09171122334', 'diana.r@test.com',
  'cocktail',
  'Rooftop Garden, Ayala', 'Brgy. Cebu Business Park, Cebu City',
  CURRENT_DATE + INTERVAL '18 days', '19:30',
  'Cocktail Menu 600 (Premium)', 'B', 60,
  '[{"id":"crepe_station","name":"Crepe Station","quantity":1,"price":3500}]'::jsonb,
  'birthday', 'Black and Gold',
  'Surprise party! Please coordinate with contact person (Jess - 09178887777) for setup timing.',
  39500.00,
  'pending', 'unpaid',
  NOW() - INTERVAL '4 days'
);


-- =====================================================
-- 4. FOOD ORDERS (a la carte delivery)
-- =====================================================

-- Food Order 1: Delivered order
INSERT INTO food_orders (
  customer_name, customer_phone, customer_email,
  delivery_address, delivery_city, delivery_barangay,
  delivery_date, delivery_time,
  items, subtotal, delivery_fee, total_amount,
  special_instructions,
  status, payment_status,
  created_at
) VALUES (
  'Test - Sofia Martinez', '09171234568', 'sofia.m@test.com',
  '123 Main Street, Brgy. Lahug, Cebu City', 'cebu_city', 'Lahug',
  CURRENT_DATE - INTERVAL '3 days', '12:00',
  '[{"id":"item1","name":"Chicken BBQ","category":"chicken","size":"tray","sizeName":"Tray","quantity":2,"price":850},{"id":"item2","name":"Penne Carbonara","category":"noodle_pasta","size":"small","sizeName":"Small","quantity":1,"price":2000},{"id":"item3","name":"Caesar Salad","category":"salad","size":"tray","sizeName":"Tray","quantity":1,"price":650}]'::jsonb,
  4350.00, 0, 4350.00,
  'Please include extra utensils for 15 people.',
  'delivered', 'fully_paid',
  NOW() - INTERVAL '4 days'
);

-- Food Order 2: Pending order for today
INSERT INTO food_orders (
  customer_name, customer_phone, customer_email,
  delivery_address, delivery_city, delivery_barangay,
  delivery_date, delivery_time,
  items, subtotal, delivery_fee, total_amount,
  special_instructions,
  status, payment_status,
  created_at
) VALUES (
  'Test - Carlos Mendoza', '09261234568', 'carlos.m@test.com',
  '456 Rose Street, Brgy. Banilad, Mandaue City', 'mandaue', 'Banilad',
  CURRENT_DATE + INTERVAL '1 day', '11:30',
  '[{"id":"item4","name":"Roast Pork Liempo","category":"pork","size":"small","sizeName":"Small","quantity":1,"price":2600},{"id":"item5","name":"Sotanghon Guisado","category":"noodle_pasta","size":"small","sizeName":"Small","quantity":1,"price":1700},{"id":"item6","name":"Mixed Vegetables w/ Tofu","category":"vegetable","size":"tray","sizeName":"Tray","quantity":1,"price":550}]'::jsonb,
  4850.00, 100, 4950.00,
  'Gate code is 1234. Call upon arrival.',
  'pending', 'unpaid',
  NOW() - INTERVAL '1 day'
);

-- Food Order 3: Confirmed order, preparing
INSERT INTO food_orders (
  customer_name, customer_phone, customer_email,
  delivery_address, delivery_city, delivery_barangay,
  delivery_date, delivery_time,
  items, subtotal, delivery_fee, total_amount,
  special_instructions,
  status, payment_status,
  created_at
) VALUES (
  'Test - Angela Torres', '09181234568', 'angela.t@test.com',
  '789 Jasmine Lane, Brgy. Talamban, Cebu City', 'cebu_city', 'Talamban',
  CURRENT_DATE + INTERVAL '2 days', '10:00',
  '[{"id":"item7","name":"Beef Morcon","category":"beef","size":"medium","sizeName":"Medium","quantity":1,"price":5300},{"id":"item8","name":"Chicken Cordon Bleu","category":"chicken","size":"medium","sizeName":"Medium","quantity":1,"price":4300},{"id":"item9","name":"Lasagna","category":"noodle_pasta","size":"small","sizeName":"Small","quantity":2,"price":2300},{"id":"item10","name":"Blueberry Cheesecake","category":"dessert","size":"dessert_20pax","sizeName":"20 Pax","quantity":1,"price":1400}]'::jsonb,
  15600.00, 0, 15600.00,
  'Office party food. Please label each container clearly.',
  'preparing', 'deposit_paid',
  NOW() - INTERVAL '3 days'
);

-- Food Order 4: Cancelled order
INSERT INTO food_orders (
  customer_name, customer_phone, customer_email,
  delivery_address, delivery_city, delivery_barangay,
  delivery_date, delivery_time,
  items, subtotal, delivery_fee, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Kevin Sy', '09991234568', 'kevin.sy@test.com',
  '101 Oak Avenue, Brgy. Basak, Lapu-Lapu City', 'lapu_lapu', 'Basak',
  CURRENT_DATE - INTERVAL '1 day', '14:00',
  '[{"id":"item11","name":"Sweet & Sour Pork","category":"pork","size":"tray","sizeName":"Tray","quantity":1,"price":850}]'::jsonb,
  850.00, 200, 1050.00,
  'cancelled', 'refunded',
  NOW() - INTERVAL '5 days'
);

-- Food Order 5: Large upcoming order
INSERT INTO food_orders (
  customer_name, customer_phone, customer_email,
  delivery_address, delivery_city, delivery_barangay,
  delivery_date, delivery_time,
  items, subtotal, delivery_fee, total_amount,
  special_instructions,
  status, payment_status,
  created_at
) VALUES (
  'Test - Rachel Uy', '09171122335', 'rachel.uy@test.com',
  '55 Orchid Street, Brgy. Capitol Site, Cebu City', 'cebu_city', 'Capitol Site',
  CURRENT_DATE + INTERVAL '5 days', '09:30',
  '[{"id":"item12","name":"Ox Tongue w/ Mushroom Sauce","category":"ox_tongue","size":"medium","sizeName":"Medium","quantity":1,"price":6300},{"id":"item13","name":"Korean Galbi Ribs","category":"beef","size":"medium","sizeName":"Medium","quantity":1,"price":5800},{"id":"item14","name":"Baked Crabmeat","category":"seafood_premium","size":"small","sizeName":"Small","quantity":1,"price":3200},{"id":"item15","name":"Chicken Bacon Alfredo","category":"noodle_pasta","size":"medium","sizeName":"Medium","quantity":1,"price":3600},{"id":"item16","name":"Chopsuey","category":"vegetable","size":"medium","sizeName":"Medium","quantity":1,"price":2800},{"id":"item17","name":"Mango Sago","category":"dessert","size":"dessert_20pax","sizeName":"20 Pax","quantity":2,"price":1200}]'::jsonb,
  25100.00, 0, 25100.00,
  'For a house party. Please bring serving spoons. Will need everything by 9:30 AM sharp.',
  'confirmed', 'deposit_paid',
  NOW() - INTERVAL '2 days'
);


-- =====================================================
-- 5. PACKED MEAL ORDERS (stored in bookings table)
-- =====================================================

-- Packed meal order 1
INSERT INTO bookings (
  customer_name, customer_phone, customer_email,
  order_type,
  venue,
  event_date, event_time,
  menu_package, menu_option, number_of_pax,
  special_requests, total_amount,
  status, payment_status,
  created_at
) VALUES (
  'Test - Rico Bautista', '09261122334', 'rico.b@test.com',
  'packed_meal',
  'Office - IT Park, Cebu City',
  CURRENT_DATE + INTERVAL '2 days', '11:00',
  'packed250', 'A', 50,
  'Company lunch meeting. Need 5 vegetarian options if possible.',
  12500.00,
  'confirmed', 'fully_paid',
  NOW() - INTERVAL '3 days'
);


-- =====================================================
-- 6. PAYMENTS (linked to bookings & food orders)
-- =====================================================
-- Note: These reference the bookings created above by matching customer_name

-- Payments for Wedding booking (Test - Maria Santos) - deposit paid
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 30000.00, 'gcash', CURRENT_DATE - INTERVAL '4 days', 'Test data - Initial deposit via GCash', NOW() - INTERVAL '4 days'
FROM bookings WHERE customer_name = 'Test - Maria Santos' LIMIT 1;

INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 10000.00, 'bank_transfer', CURRENT_DATE - INTERVAL '2 days', 'Test data - Second deposit via BDO bank transfer', NOW() - INTERVAL '2 days'
FROM bookings WHERE customer_name = 'Test - Maria Santos' LIMIT 1;

-- Payments for Corporate event (Test - ABC Corporation) - fully paid
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 75000.00, 'bank_transfer', CURRENT_DATE - INTERVAL '12 days', 'Test data - 50% deposit via bank transfer', NOW() - INTERVAL '12 days'
FROM bookings WHERE customer_name = 'Test - ABC Corporation (Ana Reyes)' LIMIT 1;

INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 76100.00, 'check', CURRENT_DATE - INTERVAL '3 days', 'Test data - Balance payment via company check #4521', NOW() - INTERVAL '3 days'
FROM bookings WHERE customer_name = 'Test - ABC Corporation (Ana Reyes)' LIMIT 1;

-- Payments for Debut (Test - Carmen Villanueva) - fully paid
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 25000.00, 'maya', CURRENT_DATE - INTERVAL '20 days', 'Test data - Deposit via Maya', NOW() - INTERVAL '20 days'
FROM bookings WHERE customer_name = 'Test - Carmen Villanueva' LIMIT 1;

INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 27800.00, 'cash', CURRENT_DATE - INTERVAL '10 days', 'Test data - Balance paid in cash on event day', NOW() - INTERVAL '10 days'
FROM bookings WHERE customer_name = 'Test - Carmen Villanueva' LIMIT 1;

-- Payment for Cancelled booking (Test - Roberto Garcia) - refunded
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 10000.00, 'gcash', CURRENT_DATE - INTERVAL '7 days', 'Test data - Initial deposit (refunded)', NOW() - INTERVAL '7 days'
FROM bookings WHERE customer_name = 'Test - Roberto Garcia' LIMIT 1;

-- Payment for Mactan anniversary (Test - Lisa Tanaka) - deposit
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 50000.00, 'bank_transfer', CURRENT_DATE - INTERVAL '8 days', 'Test data - 50% deposit via BPI online transfer', NOW() - INTERVAL '8 days'
FROM bookings WHERE customer_name = 'Test - Lisa Tanaka' LIMIT 1;

-- Payment for Graduation (Test - Patricia Lim) - deposit
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 15000.00, 'gcash', CURRENT_DATE - INTERVAL '2 days', 'Test data - Partial deposit via GCash', NOW() - INTERVAL '2 days'
FROM bookings WHERE customer_name = 'Test - Patricia Lim' LIMIT 1;

-- Payment for Cocktail (Test - Mark Chen) - fully paid
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 54000.00, 'bank_transfer', CURRENT_DATE - INTERVAL '5 days', 'Test data - Full payment via company bank transfer', NOW() - INTERVAL '5 days'
FROM bookings WHERE customer_name = 'Test - Mark Chen (TechCo)' LIMIT 1;

-- Payment for Packed meal (Test - Rico Bautista) - fully paid
INSERT INTO payments (booking_id, amount, method, payment_date, notes, created_at)
SELECT id, 12500.00, 'gcash', CURRENT_DATE - INTERVAL '2 days', 'Test data - Full payment via GCash', NOW() - INTERVAL '2 days'
FROM bookings WHERE customer_name = 'Test - Rico Bautista' LIMIT 1;

-- Payments for food orders
INSERT INTO payments (food_order_id, amount, method, payment_date, notes, created_at)
SELECT id, 4350.00, 'cash', CURRENT_DATE - INTERVAL '3 days', 'Test data - Paid cash on delivery', NOW() - INTERVAL '3 days'
FROM food_orders WHERE customer_name = 'Test - Sofia Martinez' LIMIT 1;

INSERT INTO payments (food_order_id, amount, method, payment_date, notes, created_at)
SELECT id, 8000.00, 'gcash', CURRENT_DATE - INTERVAL '2 days', 'Test data - Partial payment via GCash', NOW() - INTERVAL '2 days'
FROM food_orders WHERE customer_name = 'Test - Angela Torres' LIMIT 1;

INSERT INTO payments (food_order_id, amount, method, payment_date, notes, created_at)
SELECT id, 12000.00, 'maya', CURRENT_DATE - INTERVAL '1 day', 'Test data - Deposit via Maya', NOW() - INTERVAL '1 day'
FROM food_orders WHERE customer_name = 'Test - Rachel Uy' LIMIT 1;


-- =====================================================
-- CLEANUP HELPER
-- =====================================================
-- To remove all test data, run:
--
-- DELETE FROM payments WHERE notes LIKE 'Test data%';
-- DELETE FROM food_orders WHERE customer_name LIKE 'Test -%';
-- DELETE FROM bookings WHERE customer_name LIKE 'Test -%';
--
-- To remove test food items (only if you used the seed above):
-- DELETE FROM food_items WHERE name IN (
--   'Caesar Salad','Waldorf Salad','Asian Mandarin Chicken Salad',
--   ... etc
-- );
-- =====================================================
