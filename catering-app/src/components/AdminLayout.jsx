import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ClipboardList, Users, Package, UtensilsCrossed, ChevronLeft, ChevronRight, Home } from 'lucide-react'

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { path: '/admin/bookings', icon: ClipboardList, label: 'Bookings' },
  { path: '/admin/staff', icon: Users, label: 'Staff' },
  { path: '/admin/equipment', icon: Package, label: 'Equipment' },
  { path: '/admin/menu', icon: UtensilsCrossed, label: 'Menu' },
]

export default function AdminLayout({ children }) {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path
    return location.pathname.startsWith(item.path)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {!collapsed && <span className="font-bold text-lg">Admin Panel</span>}
          <button 
            onClick={() => setCollapsed(!collapsed)} 
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                isActive(item)
                  ? 'bg-red-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Back to Site */}
        <div className="p-2 border-t border-gray-700">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Home size={20} className="flex-shrink-0" />
            {!collapsed && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  )
}