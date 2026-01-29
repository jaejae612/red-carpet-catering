import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ClipboardList, 
  ShoppingBag,
  UtensilsCrossed,
  Users, 
  Package, 
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Menu,
  CalendarDays
} from 'lucide-react'

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/admin/bookings', label: 'Bookings', icon: ClipboardList },
  { path: '/admin/food-orders', label: 'Food Orders', icon: ShoppingBag },
  { path: '/admin/food-items', label: 'Food Menu Items', icon: UtensilsCrossed },
  { path: '/admin/menu', label: 'Catering Menu', icon: ChefHat },
  { path: '/admin/staff', label: 'Staff', icon: Users },
  { path: '/admin/equipment', label: 'Equipment', icon: Package },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin'
    }
    return location.pathname.startsWith(path)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center text-white font-bold">
            RC
          </div>
          {!collapsed && (
            <div>
              <p className="font-bold text-gray-800">Red Carpet</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                active 
                  ? 'bg-red-700 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Toggle (Desktop) */}
      <div className="hidden md:block p-4 border-t border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-4 left-4 z-40 bg-red-700 text-white p-3 rounded-full shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside className={`
        md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>

      {/* Sidebar - Desktop */}
      <aside className={`
        hidden md:block bg-white border-r border-gray-200 transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="sticky top-16">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
