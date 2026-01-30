import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, User, LogOut, ChevronDown, Settings } from 'lucide-react'

export default function Navbar() {
  const { user, userProfile, isAdmin, signOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setShowUserMenu(false)
  }

  return (
    <nav className="bg-gradient-to-r from-red-700 to-red-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo-white.png" alt="Red Carpet" className="h-12 w-auto" />
              <div className="hidden sm:block">
                <span className="font-bold text-lg">Red Carpet</span>
                <span className="text-red-200 text-sm block -mt-1">Catering</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-red-200">Home</Link>
            <Link to="/menu" className="hover:text-red-200">Catering</Link>
            <Link to="/food-menu" className="hover:text-red-200">Food Menu</Link>
            {user ? (
              <>
                <Link to="/book" className="hover:text-red-200">Book Catering</Link>
                <Link to="/my-orders" className="hover:text-red-200">My Orders</Link>
                {isAdmin && <Link to="/admin" className="bg-white/20 px-3 py-1 rounded-full hover:bg-white/30">Admin</Link>}
                <div className="relative">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-lg hover:bg-white/30">
                    <User size={18} /><span className="max-w-[100px] truncate">{userProfile?.full_name || 'User'}</span><ChevronDown size={16} />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 text-gray-800">
                      <div className="px-4 py-2 border-b"><p className="font-medium truncate">{userProfile?.full_name}</p><p className="text-xs text-gray-500 truncate">{user.email}</p></div>
                      <Link to="/profile" onClick={() => setShowUserMenu(false)} className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2"><Settings size={16} />Profile</Link>
                      <button onClick={handleSignOut} className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"><LogOut size={16} />Sign Out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-red-200">Login</Link>
                <Link to="/signup" className="bg-white text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-50">Sign Up</Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center"><button onClick={() => setIsOpen(!isOpen)} className="p-2">{isOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-red-800 border-t border-red-600 px-4 py-4 space-y-3">
          <Link to="/" onClick={() => { setIsOpen(false); window.scrollTo(0, 0) }} className="block py-2">Home</Link>
          <Link to="/menu" onClick={() => setIsOpen(false)} className="block py-2">Catering</Link>
          <Link to="/food-menu" onClick={() => setIsOpen(false)} className="block py-2">Food Menu</Link>
          {user ? (
            <>
              <Link to="/book" onClick={() => setIsOpen(false)} className="block py-2">Book Catering</Link>
              <Link to="/my-orders" onClick={() => setIsOpen(false)} className="block py-2">My Orders</Link>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2">Profile</Link>
              {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2">Admin</Link>}
              <button onClick={handleSignOut} className="flex items-center gap-2 text-red-200 pt-3 border-t border-red-600"><LogOut size={16} />Sign Out</button>
            </>
          ) : (
            <div className="pt-3 border-t border-red-600 space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2">Login</Link>
              <Link to="/signup" onClick={() => setIsOpen(false)} className="block bg-white text-red-700 px-4 py-2 rounded-lg text-center font-medium">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}