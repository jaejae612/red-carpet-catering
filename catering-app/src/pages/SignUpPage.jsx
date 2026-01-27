import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()

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

  if (success) return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="text-green-600" size={32} /></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Created!</h1>
        <p className="text-gray-500 mb-6">You can now sign in to your account.</p>
        <Link to="/login" className="inline-block bg-red-700 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-800">Go to Login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-white rounded-full p-3 w-24 h-24 flex items-center justify-center mx-auto mb-4 shadow-md border border-gray-100">
  <img src="/logo-red.png" alt="Red Carpet Catering" className="h-16 w-auto" />
</div>
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
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