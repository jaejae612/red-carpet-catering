# 🎪 Red Carpet Catering - Web Application

A full-featured catering booking system built with React, Vite, Tailwind CSS, and Supabase.

## ✨ Features

### For Customers
- 📝 Sign up and create account
- 🍽️ Browse menu packages (₱470 - ₱810 per head)
- 📅 Book catering with date, venue, and motif selection
- ➕ Add extra stations (Halo-halo Bar, Taco Station, etc.)
- 📋 Track order status

### For Admin
- 👥 Manage staff (Head Waiters, Service Staff, Extra, Students)
- 🪑 Manage equipment (Tables, Chairs, etc.)
- 📝 View and manage all bookings
- ✅ Assign staff and equipment to bookings
- 🔄 Update booking status

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the contents of `database-schema.sql`
4. Go to **Project Settings > API** and copy your credentials

### 3. Configure Environment

Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Or edit `src/lib/supabase.js` directly.

### 4. Create Admin User

1. Start the app and sign up normally
2. Go to Supabase Dashboard > Table Editor > profiles
3. Find your user and change `role` from `customer` to `admin`

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── LoadingSpinner.jsx
├── context/
│   └── AuthContext.jsx # Authentication state
├── lib/
│   ├── supabase.js     # Supabase client
│   └── menuData.js     # Menu packages & pricing
├── pages/
│   ├── HomePage.jsx
│   ├── MenuPage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── BookingPage.jsx
│   ├── MyOrdersPage.jsx
│   ├── SetupGuide.jsx
│   └── admin/
│       ├── AdminDashboard.jsx
│       ├── AdminBookings.jsx
│       ├── AdminStaff.jsx
│       └── AdminEquipment.jsx
└── App.jsx             # Main app with routing
```

## 🗄️ Database Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (extends Supabase auth) |
| `bookings` | Customer orders and assignments |
| `staff` | Employees (waiters, service staff) |
| `equipment` | Tables, chairs, and inventory |

## 🔒 Security

- **Row Level Security (RLS)** enabled on all tables
- Customers can only view their own bookings
- Only admins can manage staff, equipment, and assignments
- Passwords handled securely by Supabase Auth

## 📱 Menu Packages

| Package | Price/Head | Options |
|---------|------------|---------|
| Menu 470 | ₱470 | 4 menus (A, B, C, D) |
| Menu 510 | ₱510 | 4 menus (A, B, C, D) |
| Menu 560 | ₱560 | Filipino, Asian, International |
| Menu 660 | ₱660 | Filipino & Asian, International |
| Menu 810 | ₱810 | Premium Buffet |

### Pricing Tiers
- 60+ pax: Base rate
- 50 pax: +₱20/head
- 40 pax: +₱70/head
- 30 pax: +₱120/head

## 📞 Contact

- 📱 0917-187-6510
- 📱 0926-664-2839
- ☎️ (032) 383-4122

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Icons:** Lucide React
- **Routing:** React Router v6

## 📄 License

© Red Carpet Food and Catering Services
