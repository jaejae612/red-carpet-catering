import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle, signInWithFacebook } = useAuth()

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await signUp(formData.email, formData.password, formData.fullName, formData.phone)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    try {
      await signInWithGoogle()
    } catch (err) {
      setError(err.message || 'Failed to sign up with Google')
    }
  }

  const handleFacebookLogin = async () => {
    setError('')
    try {
      await signInWithFacebook()
    } catch (err) {
      setError(err.message || 'Failed to sign up with Facebook')
    }
  }

  if (success) return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="text-green-600" size={32} /></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h1>
        <p className="text-gray-500 mb-6">Please check your email to verify your account.</p>
        <Link to="/login" className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-800">Go to Login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 p-2">
            <img src="/logo-red.png" alt="Red Carpet" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">or sign up with email</span>
          </div>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"><AlertCircle size={20} />{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label><div className="relative"><User className="absolute left-3 top-3 text-gray-400" size={20} /><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Juan Dela Cruz" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-3 text-gray-400" size={20} /><input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone</label><div className="relative"><Phone className="absolute left-3 top-3 text-gray-400" size={20} /><input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="09XX-XXX-XXXX" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={20} /><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label><div className="relative"><Lock className="absolute left-3 top-3 text-gray-400" size={20} /><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500" /></div></div>
          <button type="submit" disabled={loading} className="w-full bg-red-700 text-white py-3 rounded-xl font-medium hover:bg-red-800 disabled:opacity-50">{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <p className="text-center text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-red-700 font-medium hover:underline">Sign in</Link></p>
      </div>
    </div>
  )
}