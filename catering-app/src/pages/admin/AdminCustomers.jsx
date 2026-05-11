import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, Search, Trash2, User, Mail, Phone, Calendar, Shield, RefreshCw } from 'lucide-react'

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => { fetchCustomers() }, [])

  const fetchCustomers = async () => {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, full_name, phone, role, created_at')
      .order('created_at', { ascending: false })
    if (error) { setError(error.message); setLoading(false); return }

    // Get booking counts per user
    const { data: bookingCounts } = await supabase
      .from('bookings')
      .select('user_id')
    const counts = {}
    if (bookingCounts) bookingCounts.forEach(b => { if (b.user_id) counts[b.user_id] = (counts[b.user_id] || 0) + 1 })

    setCustomers((data || []).map(c => ({ ...c, bookingCount: counts[c.id] || 0 })))
    setLoading(false)
  }

  const handleDelete = async (customer) => {
    if (!confirm(`Delete "${customer.full_name}" (${customer.email})?\n\nThis will permanently remove their account and all associated data.`)) return
    setDeletingId(customer.id)
    setError('')
    const { error } = await supabase.rpc('admin_delete_user', { target_user_id: customer.id })
    if (error) {
      setError(`Failed to delete: ${error.message}`)
      setDeletingId(null)
      return
    }
    setCustomers(prev => prev.filter(c => c.id !== customer.id))
    setDeletingId(null)
  }

  const filtered = customers.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.includes(search)
  )

  const admins = filtered.filter(c => c.role === 'admin')
  const regularCustomers = filtered.filter(c => c.role !== 'admin')

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
              <p className="text-gray-500 text-sm">{customers.length} registered account{customers.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={fetchCustomers} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">{error}</div>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <User size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">{search ? 'No customers match your search' : 'No customers yet'}</p>
          </div>
        ) : (
          <div className="space-y-6">

            {/* Admins */}
            {admins.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Shield size={14} /> Admin Accounts ({admins.length})
                </h2>
                <div className="space-y-2">
                  {admins.map(c => (
                    <CustomerRow key={c.id} customer={c} onDelete={handleDelete} deletingId={deletingId} isAdmin />
                  ))}
                </div>
              </div>
            )}

            {/* Customers */}
            {regularCustomers.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User size={14} /> Customers ({regularCustomers.length})
                </h2>
                <div className="space-y-2">
                  {regularCustomers.map(c => (
                    <CustomerRow key={c.id} customer={c} onDelete={handleDelete} deletingId={deletingId} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function CustomerRow({ customer, onDelete, deletingId, isAdmin }) {
  const isDeleting = deletingId === customer.id
  const initials = customer.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 flex items-center gap-4 ${isAdmin ? 'border-red-100' : 'border-gray-100'}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${isAdmin ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-600'}`}>
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-gray-800 truncate">{customer.full_name || '(no name)'}</p>
          {isAdmin && <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Admin</span>}
          {customer.bookingCount > 0 && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{customer.bookingCount} booking{customer.bookingCount !== 1 ? 's' : ''}</span>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Mail size={12} />{customer.email}</span>
          {customer.phone && <span className="flex items-center gap-1"><Phone size={12} />{customer.phone}</span>}
          <span className="flex items-center gap-1"><Calendar size={12} />Joined {new Date(customer.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(customer)}
        disabled={isDeleting}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
        title="Delete customer"
      >
        {isDeleting ? <RefreshCw size={18} className="animate-spin" /> : <Trash2 size={18} />}
      </button>
    </div>
  )
}
