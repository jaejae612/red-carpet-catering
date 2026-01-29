import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import FoodMenuPage from './pages/FoodMenuPage'
import LoginPage from './pages/LoginPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import SignUpPage from './pages/SignUpPage'
import BookingPage from './pages/BookingPage'
import MyOrdersPage from './pages/MyOrdersPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBookings from './pages/admin/AdminBookings'
import AdminFoodOrders from './pages/admin/AdminFoodOrders'
import AdminFoodItems from './pages/admin/AdminFoodItems'
import AdminMenu from './pages/admin/AdminMenu'
import AdminStaff from './pages/admin/AdminStaff'
import AdminEquipment from './pages/admin/AdminEquipment'
import DailyBookingSummary from './pages/admin/DailyBookingSummary'
import BookingCalendar from './pages/admin/BookingCalendar'
import SetupGuide from './pages/SetupGuide'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import AdminLayout from './components/AdminLayout'

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !isAdmin) return <Navigate to="/" replace />
  return children
}

function App() {
  const { loading, isConfigured } = useAuth()
  if (loading) return <LoadingSpinner />
  if (!isConfigured) return <SetupGuide />

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/food-menu" element={<FoodMenuPage />} />
          <Route path="/order-food" element={<FoodMenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Protected Customer Routes */}
          <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
          
          {/* Admin Routes with Sidebar */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute adminOnly><AdminLayout><AdminBookings /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/food-orders" element={<ProtectedRoute adminOnly><AdminLayout><AdminFoodOrders /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/food-items" element={<ProtectedRoute adminOnly><AdminLayout><AdminFoodItems /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/staff" element={<ProtectedRoute adminOnly><AdminLayout><AdminStaff /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/equipment" element={<ProtectedRoute adminOnly><AdminLayout><AdminEquipment /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/menu" element={<ProtectedRoute adminOnly><AdminLayout><AdminMenu /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/daily-summary" element={<ProtectedRoute adminOnly><DailyBookingSummary /></ProtectedRoute>} />
          <Route path="/admin/calendar" element={<ProtectedRoute adminOnly><AdminLayout><BookingCalendar /></AdminLayout></ProtectedRoute>} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
