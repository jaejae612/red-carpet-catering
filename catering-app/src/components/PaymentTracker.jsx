import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { Plus, Trash2, X, CreditCard, AlertTriangle } from 'lucide-react'

const PAYMENT_METHODS = [
  { value: 'gcash', label: 'GCash', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  { value: 'maya', label: 'Maya', icon: '📱', color: 'bg-green-100 text-green-700' },
  { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦', color: 'bg-purple-100 text-purple-700' },
  { value: 'cash', label: 'Cash', icon: '💵', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'card', label: 'Card', icon: '💳', color: 'bg-orange-100 text-orange-700' },
  { value: 'check', label: 'Check', icon: '🧾', color: 'bg-gray-100 text-gray-700' },
]

const PAYMENT_STATUS = {
  unpaid: { label: 'Unpaid', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  deposit_paid: { label: 'Deposit Paid', color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  fully_paid: { label: 'Fully Paid', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  refund_pending: { label: 'Refund Pending', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  refunded: { label: 'Refunded', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
}

const getMethodInfo = (method) => PAYMENT_METHODS.find(m => m.value === method) || PAYMENT_METHODS[3]
const getStatusInfo = (status) => PAYMENT_STATUS[status] || PAYMENT_STATUS.unpaid

const formatCurrency = (n) => `₱${Number(n || 0).toLocaleString()}`
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

export default function PaymentTracker({ bookingId, foodOrderId, totalAmount = 0, currentStatus, onStatusChange }) {
  const { user } = useAuth()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [form, setForm] = useState({
    amount: '',
    method: 'gcash',
    reference_number: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  useEffect(() => {
    fetchPayments()
  }, [bookingId, foodOrderId])

  const fetchPayments = async () => {
    try {
      let query = supabase.from('payments').select('*').order('payment_date', { ascending: true })
      if (bookingId) query = query.eq('booking_id', bookingId)
      if (foodOrderId) query = query.eq('food_order_id', foodOrderId)
      
      const { data, error } = await query
      if (error) throw error
      setPayments(data || [])
    } catch (err) {
      console.error('Error fetching payments:', err)
    } finally {
      setLoading(false)
    }
  }

  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const balance = totalAmount - totalPaid
  const percentage = totalAmount > 0 ? Math.min((totalPaid / totalAmount) * 100, 100) : 0

  const handleSubmit = async () => {
    setError('')
    const amount = parseFloat(form.amount)
    
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount')
      return
    }

    setSaving(true)
    try {
      const paymentData = {
        amount,
        method: form.method,
        reference_number: form.reference_number || null,
        payment_date: form.payment_date,
        notes: form.notes || null,
        recorded_by: user?.id || null,
      }

      if (bookingId) paymentData.booking_id = bookingId
      if (foodOrderId) paymentData.food_order_id = foodOrderId

      const { error: insertError } = await supabase.from('payments').insert([paymentData])
      if (insertError) throw insertError

      // Reset form
      setForm({ amount: '', method: 'gcash', reference_number: '', payment_date: new Date().toISOString().split('T')[0], notes: '' })
      setShowForm(false)
      
      // Refresh payments and parent data
      await fetchPayments()
      
      // Refresh the parent's data to get updated payment_status
      if (onStatusChange) {
        // Small delay for trigger to complete
        setTimeout(() => onStatusChange(), 500)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (paymentId) => {
    try {
      const { error } = await supabase.from('payments').delete().eq('id', paymentId)
      if (error) throw error
      setShowDeleteConfirm(null)
      await fetchPayments()
      if (onStatusChange) setTimeout(() => onStatusChange(), 500)
    } catch (err) {
      alert('Error deleting payment: ' + err.message)
    }
  }

  const handleMarkRefunded = async () => {
    try {
      if (bookingId) {
        await supabase.from('bookings').update({ payment_status: 'refunded' }).eq('id', bookingId)
      }
      if (foodOrderId) {
        await supabase.from('food_orders').update({ payment_status: 'refunded' }).eq('id', foodOrderId)
      }
      if (onStatusChange) onStatusChange()
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const halfAmount = Math.round(totalAmount * 0.5)
  const quickAmounts = totalPaid === 0
    ? [
        { label: `Full — ${formatCurrency(totalAmount)}`, amount: totalAmount },
        { label: `50% — ${formatCurrency(halfAmount)}`, amount: halfAmount },
      ]
    : [
        { label: `Balance — ${formatCurrency(balance)}`, amount: Math.max(balance, 0) },
        ...(halfAmount < balance ? [{ label: `50% — ${formatCurrency(halfAmount)}`, amount: halfAmount }] : []),
      ]
  const filteredQuickAmounts = quickAmounts.filter(q => q.amount > 0)

  const statusInfo = getStatusInfo(currentStatus)

  if (loading) {
    return <div className="animate-pulse space-y-3"><div className="h-16 bg-gray-100 rounded-xl" /><div className="h-10 bg-gray-100 rounded-xl" /></div>
  }

  return (
    <div className="space-y-4">
      {/* Payment Summary Bar */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Payment</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {formatCurrency(totalPaid)} / {formatCurrency(totalAmount)}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              percentage >= 100 ? 'bg-green-500' : percentage > 0 ? 'bg-yellow-500' : 'bg-gray-300'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-1.5 text-xs text-gray-400">
          <span>Paid: {formatCurrency(totalPaid)}</span>
          {balance > 0 && <span>Balance: {formatCurrency(balance)}</span>}
          {balance <= 0 && totalPaid > 0 && <span className="text-green-600 font-medium">✓ Fully Paid</span>}
        </div>
      </div>

      {/* Payment History */}
      {payments.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Payment History</p>
          {payments.map((p) => {
            const methodInfo = getMethodInfo(p.method)
            return (
              <div key={p.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2.5 group hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${methodInfo.color}`}>
                    {methodInfo.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800 text-sm">{formatCurrency(p.amount)}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${methodInfo.color}`}>{methodInfo.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{formatDate(p.payment_date)}</span>
                      {p.reference_number && <span>• Ref: {p.reference_number}</span>}
                      {p.notes && <span>• {p.notes}</span>}
                    </div>
                  </div>
                </div>
                
                {/* Delete button */}
                {showDeleteConfirm === p.id ? (
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleDelete(p.id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700">Delete</button>
                    <button onClick={() => setShowDeleteConfirm(null)} className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs hover:bg-gray-300">Cancel</button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setShowDeleteConfirm(p.id)} 
                    className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Refund Pending Action */}
      {currentStatus === 'refund_pending' && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-orange-500" />
            <span className="text-sm text-orange-700">Refund of {formatCurrency(totalPaid)} pending</span>
          </div>
          <button 
            onClick={handleMarkRefunded}
            className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-medium hover:bg-orange-600"
          >
            Mark Refunded
          </button>
        </div>
      )}

      {/* Add Payment Button / Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-red-300 hover:text-red-600 transition-colors"
        >
          <Plus size={16} /> Record Payment
        </button>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-800 text-sm">Record Payment</h4>
            <button onClick={() => { setShowForm(false); setError('') }} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>

          {error && <p className="text-red-500 text-xs bg-red-50 rounded-lg p-2">{error}</p>}

          {/* Amount */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Amount (₱)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-lg font-semibold"
            />
            {/* Quick amount buttons */}
            <div className="flex gap-2 mt-2">
              {filteredQuickAmounts.map((q) => (
                <button
                  key={q.label}
                  onClick={() => setForm({ ...form, amount: String(q.amount) })}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  {q.label} — ₱{q.amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setForm({ ...form, method: m.value })}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-colors ${
                    form.method === m.value 
                      ? 'border-red-500 bg-red-50 text-red-700' 
                      : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reference Number - show for digital payments */}
          {['gcash', 'maya', 'bank_transfer', 'card', 'check'].includes(form.method) && (
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Reference Number {form.method === 'gcash' || form.method === 'maya' ? '(from receipt)' : ''}
              </label>
              <input
                type="text"
                value={form.reference_number}
                onChange={(e) => setForm({ ...form, reference_number: e.target.value })}
                placeholder={form.method === 'bank_transfer' ? 'Bank transaction #' : form.method === 'check' ? 'Check #' : 'Reference #'}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>
          )}

          {/* Date + Notes row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Payment Date</label>
              <input
                type="date"
                value={form.payment_date}
                onChange={(e) => setForm({ ...form, payment_date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Notes (optional)</label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Deposit, Balance, etc."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full py-2.5 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 disabled:opacity-50 transition-colors text-sm"
          >
            {saving ? 'Saving...' : `Record ₱${parseFloat(form.amount || 0).toLocaleString()} Payment`}
          </button>
        </div>
      )}
    </div>
  )
}

// Export helpers for use in other components
export { PAYMENT_STATUS, PAYMENT_METHODS, getMethodInfo, getStatusInfo }
