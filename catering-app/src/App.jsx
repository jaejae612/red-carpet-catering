import React, { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Always loaded (small, needed immediately)
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import FloatingButtons from './components/FloatingButtons'
import SetupGuide from './pages/SetupGuide'
import HomePage from './pages/HomePage'

// Lazy loaded — public pages (loaded on demand)
const MenuPage = lazy(() => import('./pages/MenuPage'))
const FoodMenuPage = lazy(() => import('./pages/FoodMenuPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const SignUpPage = lazy(() => import('./pages/SignUpPage'))

// Lazy loaded — customer pages (only loaded when logged in)
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const MyOrdersPage = lazy(() => import('./pages/MyOrdersPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const CateringSelectionPage = lazy(() => import('./pages/CateringSelectionPage'))
const CocktailBookingPage = lazy(() => import('./pages/CocktailBookingPage'))
const PackedMealOrderPage = lazy(() => import('./pages/PackedMealOrderPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Lazy loaded — admin pages (only loaded for admins)
const AdminLayout = lazy(() => import('./components/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminBookings = lazy(() => import('./pages/admin/AdminBookings'))
const AdminFoodOrders = lazy(() => import('./pages/admin/AdminFoodOrders'))
const AdminFoodItems = lazy(() => import('./pages/admin/AdminFoodItems'))
const AdminMenu = lazy(() => import('./pages/admin/AdminMenu'))
const AdminStaff = lazy(() => import('./pages/admin/AdminStaff'))
const AdminEquipment = lazy(() => import('./pages/admin/AdminEquipment'))
const DailyBookingSummary = lazy(() => import('./pages/admin/DailyBookingSummary'))
const BookingCalendar = lazy(() => import('./pages/admin/BookingCalendar'))

// Loading fallback for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div>
  </div>
)

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
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
              
              {/* Catering Booking Routes */}
              <Route path="/catering" element={<ProtectedRoute><CateringSelectionPage /></ProtectedRoute>} />
              <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/book/cocktail" element={<ProtectedRoute><CocktailBookingPage /></ProtectedRoute>} />
              <Route path="/order/packed-meals" element={<ProtectedRoute><PackedMealOrderPage /></ProtectedRoute>} />
              
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </ErrorBoundary>
  )
}

export default App
