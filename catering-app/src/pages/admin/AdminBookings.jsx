import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { menuPackages } from '../../lib/menuData'
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, Check, Plus, Minus, X, Save, Search, Edit2, CreditCard, Send, Copy, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { TableSkeleton } from '../../components/SkeletonLoaders'
import { exportBookingsCSV, exportBookingsPDF } from '../../lib/exportUtils'
import AdminBookingEdit from '../../components/AdminBookingEdit'
import { sendBookingNotifications } from '../../lib/emailService'

export default function AdminBookings() {
  const [searchParams] = useSearchParams()
  const [bookings, setBookings] = useState([])
  const [staff, setStaff] = useState([])
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [paymentFilter, setPaymentFilter] = useState(searchParams.get('payment') || 'all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [showFilters, setShowFilters] = useState(!!(searchParams.get('status') || searchParams.get('payment')))
  const [showStaffPicker, setShowStaffPicker] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [b, s, e] = await Promise.all([
        supabase.from('bookings').select('*').order('event_date', { ascending: true }),
        supabase.from('staff').select('*').order('name'),
        supabase.from('equipment').select('*').order('category, name')
      ])
      setBookings(b.data || [])
      setStaff(s.data || [])
      setEquipment(e.data || [])
    } catch (error) { console.error('Error:', error) } finally { setLoading(false) }
  }

  const updateStatus = async (id, status) => {
    await supabase.from('bookings').update({ status }).eq('id', id)
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  const saveAssignment = async () => {
    if (!selectedBooking) return
    setSaving(true)
    try {
      await supabase.from('bookings').update({ assigned_staff: selectedBooking.assigned_staff, assigned_equipment: selectedBooking.assigned_equipment, status: 'confirmed' }).eq('id', selectedBooking.id)
      setBookings(prev => prev.map(b => b.id === selectedBooking.id ? selectedBooking : b))
      alert('Saved!')
    } catch (error) { alert('Error saving') } finally { setSaving(false) }
  }

  const toggleStaff = (s, role) => {
    if (!selectedBooking) return
    const current = selectedBooking.assigned_staff || []
    const exists = current.find(x => x.id === s.id)
    const newStaff = exists ? current.filter(x => x.id !== s.id) : [...current, { id: s.id, name: s.name, role }]
    setSelectedBooking({ ...selectedBooking, assigned_staff: newStaff })
  }

  const updateEquipQty = (id, qty) => {
    if (!selectedBooking) return
    const current = selectedBooking.assigned_equipment || {}
    if (qty <= 0) { const { [id]: _, ...rest } = current; setSelectedBooking({ ...selectedBooking, assigned_equipment: rest }) }
    else setSelectedBooking({ ...selectedBooking, assigned_equipment: { ...current, [id]: qty } })
  }

  const getStatusColor = (status) => ({ pending: 'bg-amber-100 text-amber-700', confirmed: 'bg-blue-100 text-blue-700', completed: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700' }[status] || 'bg-gray-100 text-gray-700')

  const getPaymentStatusColor = (status) => ({ unpaid: 'bg-red-100 text-red-700', deposit_paid: 'bg-amber-100 text-amber-700', fully_paid: 'bg-green-100 text-green-700', refunded: 'bg-gray-100 text-gray-700' }[status] || 'bg-gray-100 text-gray-700')

  const getPaymentStatusLabel = (status) => ({ unpaid: 'Unpaid', deposit_paid: 'Deposit Paid', fully_paid: 'Fully Paid', refunded: 'Refunded' }[status] || 'Unknown')

  const handleEditSave = () => {
    fetchData()
    if (selectedBooking) {
      // Refresh selected booking
      supabase.from('bookings').select('*').eq('id', selectedBooking.id).single().then(({ data }) => {
        if (data) setSelectedBooking(data)
      })
    }
  }

  const handleSendEmail = async () => {
    if (!selectedBooking) return
    if (!selectedBooking.customer_email) {
      alert('No customer email address')
      return
    }
    
    const confirmSend = window.confirm(`Send booking confirmation email to ${selectedBooking.customer_email}?`)
    if (!confirmSend) return

    setSendingEmail(true)
    try {
      const result = await sendBookingNotifications(selectedBooking)
      if (result.customer?.success || result.admin?.success) {
        alert('Email sent successfully!')
      } else {
        alert('Failed to send email. Check console for details.')
      }
    } catch (error) {
      console.error('Email error:', error)
      alert('Error sending email: ' + error.message)
    } finally {
      setSendingEmail(false)
    }
  }

  const handleDuplicate = () => {
    if (!selectedBooking) return
    // Store booking data for duplication (navigate to booking page with prefilled data)
    const duplicateData = {
      ...selectedBooking,
      id: undefined,
      event_date: '',
      status: 'pending',
      payment_status: 'unpaid',
      deposit_amount: 0
    }
    sessionStorage.setItem('duplicateBooking', JSON.stringify(duplicateData))
    window.location.href = '/book?duplicate=true'
  }

  const clearFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setPaymentFilter('all')
    setDateFrom('')
    setDateTo('')
  }

  const activeFilterCount = [
    statusFilter !== 'all',
    paymentFilter !== 'all',
    dateFrom !== '',
    dateTo !== ''
  ].filter(Boolean).length

  const filtered = bookings
    .filter(b => {
      const matchesSearch = b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           b.venue?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           b.customer_phone?.includes(searchTerm)
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter
      const matchesPayment = paymentFilter === 'all' || b.payment_status === paymentFilter || (paymentFilter === 'unpaid' && !b.payment_status)
      const matchesDateFrom = !dateFrom || b.event_date >= dateFrom
      const matchesDateTo = !dateTo || b.event_date <= dateTo
      return matchesSearch && matchesStatus && matchesPayment && matchesDateFrom && matchesDateTo
    })
    .sort((a, b) => {
      const dateA = new Date(a.event_date)
      const dateB = new Date(b.event_date)
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
    })

  if (loading) return <TableSkeleton rows={8} cols={5} />

  return (
    <div className="py-8 px-4"><div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4"><Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={24} /></Link><div><h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1><p className="text-gray-500">Assign staff and equipment</p></div></div>
        <div className="flex items-center gap-2">
          <button onClick={() => exportBookingsCSV(filtered)} className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Excel
          </button>
          <button onClick={() => exportBookingsPDF(filtered)} className="flex items-center gap-1.5 px-3 py-2 bg-red-700 text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            PDF
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1"><div className="bg-white rounded-2xl shadow-lg p-4 sticky top-24">
          {/* Search */}
          <div className="mb-4">
            <div className="relative mb-3"><Search className="absolute left-3 top-2.5 text-gray-400" size={20} /><input type="text" placeholder="Search name, venue, phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div>
            
            {/* Filter Toggle */}
            <button onClick={() => setShowFilters(!showFilters)} className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 hover:bg-gray-100">
              <span className="flex items-center gap-2"><Filter size={16} /> Filters {activeFilterCount > 0 && <span className="bg-red-700 text-white px-2 py-0.5 rounded-full text-xs">{activeFilterCount}</span>}</span>
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"><option value="all">All Status</option><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option></select>
                  <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"><option value="all">All Payment</option><option value="unpaid">Unpaid</option><option value="deposit_paid">Deposit Paid</option><option value="fully_paid">Fully Paid</option></select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Date Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="From" />
                    <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm" placeholder="To" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"><option value="asc">Date ↑ Soonest</option><option value="desc">Date ↓ Latest</option></select>
                  <button onClick={clearFilters} className="px-3 py-2 text-red-700 border border-red-200 rounded-lg text-sm hover:bg-red-50">Clear All</button>
                </div>
              </div>
            )}
          </div>
          
          {/* Results count */}
          <p className="text-xs text-gray-500 mb-2">{filtered.length} booking{filtered.length !== 1 ? 's' : ''} found</p>
          
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">{filtered.map(b => (<button key={b.id} onClick={() => setSelectedBooking(b)} className={`w-full p-3 rounded-xl text-left ${selectedBooking?.id === b.id ? 'bg-red-50 border-2 border-red-700' : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'}`}><div className="flex justify-between items-start mb-1"><span className="font-medium text-gray-800 truncate">{b.customer_name}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(b.status)}`}>{b.status}</span></div><p className="text-sm text-gray-500">{b.event_date}</p><div className="flex items-center justify-between mt-1"><span className="text-sm text-gray-500">{b.number_of_pax} pax • ₱{b.total_amount?.toLocaleString()}</span><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(b.payment_status)}`}>{getPaymentStatusLabel(b.payment_status)}</span></div></button>))}{filtered.length === 0 && <p className="text-center text-gray-500 py-4">No bookings found</p>}</div>
        </div></div>
        <div className="lg:col-span-2">
          {selectedBooking ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-6"><div className="flex justify-between items-start"><div><h2 className="text-xl font-bold">{selectedBooking.customer_name}</h2><p className="text-red-200">{menuPackages[selectedBooking.menu_package]?.name} • {selectedBooking.menu_option}</p></div><div className="flex items-center gap-2 flex-wrap justify-end"><button onClick={handleDuplicate} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1"><Copy size={14} /> Duplicate</button><button onClick={handleSendEmail} disabled={sendingEmail} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1 disabled:opacity-50"><Send size={14} /> {sendingEmail ? 'Sending...' : 'Email'}</button><button onClick={() => setShowEditModal(true)} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-sm flex items-center gap-1"><Edit2 size={14} /> Edit</button><select value={selectedBooking.status} onChange={(e) => { updateStatus(selectedBooking.id, e.target.value); setSelectedBooking({ ...selectedBooking, status: e.target.value }) }} className="bg-white/20 text-white border-0 rounded-lg px-3 py-1 text-sm"><option value="pending" className="text-gray-800">Pending</option><option value="confirmed" className="text-gray-800">Confirmed</option><option value="completed" className="text-gray-800">Completed</option><option value="cancelled" className="text-gray-800">Cancelled</option></select></div></div></div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4"><h3 className="font-semibold text-gray-700 mb-3">Event</h3><div className="space-y-2 text-sm"><p className="flex items-start gap-2"><Calendar size={16} className="text-gray-400 mt-0.5" />{selectedBooking.event_date} at {selectedBooking.event_time}</p><p className="flex items-start gap-2"><MapPin size={16} className="text-gray-400 mt-0.5" />{selectedBooking.venue}</p><p className="flex items-center gap-2"><Users size={16} className="text-gray-400" />{selectedBooking.number_of_pax} guests</p>{selectedBooking.motif && <p>🎨 {selectedBooking.motif}</p>}</div></div>
                  <div className="bg-gray-50 rounded-xl p-4"><h3 className="font-semibold text-gray-700 mb-3">Contact</h3><div className="space-y-2 text-sm"><p className="flex items-center gap-2"><Phone size={16} className="text-gray-400" />{selectedBooking.customer_phone}</p><p className="flex items-center gap-2"><Mail size={16} className="text-gray-400" />{selectedBooking.customer_email}</p></div></div>
                </div>
                {/* Payment Status */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2"><CreditCard size={18} /> Payment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div><p className="text-sm text-gray-500">Total</p><p className="text-lg font-bold text-red-700">₱{selectedBooking.total_amount?.toLocaleString()}</p></div>
                    <div><p className="text-sm text-gray-500">Deposit</p><p className="text-lg font-bold text-green-600">₱{(selectedBooking.deposit_amount || 0).toLocaleString()}</p></div>
                    <div><p className="text-sm text-gray-500">Balance</p><p className="text-lg font-bold text-amber-600">₱{((selectedBooking.total_amount || 0) - (selectedBooking.deposit_amount || 0)).toLocaleString()}</p></div>
                    <div><p className="text-sm text-gray-500">Status</p><span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(selectedBooking.payment_status)}`}>{getPaymentStatusLabel(selectedBooking.payment_status)}</span></div>
                  </div>
                  {selectedBooking.payment_notes && <p className="mt-3 text-sm text-gray-600 bg-white rounded-lg p-2">📝 {selectedBooking.payment_notes}</p>}
                </div>
                {/* Customer History */}
                {(() => {
                  const customerBookings = bookings.filter(b => 
                    b.id !== selectedBooking.id && 
                    (b.customer_name === selectedBooking.customer_name || b.customer_phone === selectedBooking.customer_phone)
                  )
                  if (customerBookings.length === 0) return null
                  return (
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
                        <Users size={18} /> Customer History ({customerBookings.length} previous)
                      </h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {customerBookings.slice(0, 5).map(b => (
                          <div key={b.id} className="flex items-center justify-between p-2 bg-white rounded-lg text-sm">
                            <div>
                              <p className="font-medium text-gray-800">{b.event_date}</p>
                              <p className="text-xs text-gray-500">{b.venue} • {b.number_of_pax} pax</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-800">₱{b.total_amount?.toLocaleString()}</p>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(b.status)}`}>{b.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {customerBookings.length > 5 && (
                        <p className="text-xs text-purple-600 mt-2 text-center">+{customerBookings.length - 5} more bookings</p>
                      )}
                    </div>
                  )
                })()}
                <div className="bg-gray-50 rounded-xl p-4"><h3 className="font-semibold text-gray-700 mb-3">Assign Staff</h3>
                  <div className="mb-3"><label className="text-sm text-gray-500 mb-2 block">Head Waiter</label><button onClick={() => setShowStaffPicker('head_waiter')} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-left hover:border-red-400 hover:bg-red-50">{(selectedBooking.assigned_staff || []).filter(s => s.role === 'head_waiter').length > 0 ? <div className="flex flex-wrap gap-2">{(selectedBooking.assigned_staff || []).filter(s => s.role === 'head_waiter').map(s => <span key={s.id} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">{s.name}</span>)}</div> : <span className="text-gray-400">+ Select Head Waiter</span>}</button></div>
                  <div><label className="text-sm text-gray-500 mb-2 block">Service Staff</label><button onClick={() => setShowStaffPicker('service')} className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-left hover:border-red-400 hover:bg-red-50">{(selectedBooking.assigned_staff || []).filter(s => s.role === 'service').length > 0 ? <div className="flex flex-wrap gap-2">{(selectedBooking.assigned_staff || []).filter(s => s.role === 'service').map(s => <span key={s.id} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">{s.name}</span>)}</div> : <span className="text-gray-400">+ Select Service Staff</span>}</button></div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4"><h3 className="font-semibold text-gray-700 mb-3">Assign Tables & Chairs</h3><div className="space-y-2">{equipment.map(item => { const qty = (selectedBooking.assigned_equipment || {})[item.id] || 0; return (<div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100"><div><p className="font-medium text-gray-800">{item.name}</p><p className="text-xs text-gray-500">{item.quantity} available</p></div><div className="flex items-center gap-2"><button onClick={() => updateEquipQty(item.id, qty - 1)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"><Minus size={14} /></button><span className="w-8 text-center font-medium">{qty}</span><button onClick={() => updateEquipQty(item.id, qty + 1)} disabled={qty >= item.quantity} className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center hover:bg-red-800 disabled:opacity-50"><Plus size={14} /></button></div></div>) })}</div></div>
                <button onClick={saveAssignment} disabled={saving} className="w-full py-3 bg-red-700 text-white rounded-xl font-medium hover:bg-red-800 disabled:opacity-50 flex items-center justify-center gap-2"><Save size={20} /> {saving ? 'Saving...' : 'Save Assignment'}</button>
              </div>
            </div>
          ) : (<div className="bg-white rounded-2xl shadow-lg p-12 text-center"><div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"><Calendar size={40} className="text-gray-400" /></div><h2 className="text-xl font-semibold text-gray-800 mb-2">Select a Booking</h2><p className="text-gray-500">Click on a booking to view and assign</p></div>)}
        </div>
      </div>
      {showStaffPicker && (<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] overflow-hidden"><div className="bg-red-700 text-white p-4 flex items-center justify-between"><h3 className="font-semibold">Select {showStaffPicker === 'head_waiter' ? 'Head Waiter' : 'Service Staff'}</h3><button onClick={() => setShowStaffPicker(null)} className="p-1 hover:bg-red-800 rounded-full"><X size={24} /></button></div><div className="overflow-y-auto max-h-[60vh]">{staff.filter(s => showStaffPicker === 'head_waiter' ? s.role === 'head_waiter' : s.role !== 'head_waiter').map(s => { const isSel = (selectedBooking?.assigned_staff || []).some(x => x.id === s.id); return (<button key={s.id} onClick={() => toggleStaff(s, showStaffPicker)} disabled={!s.available} className={`w-full p-4 flex items-center justify-between border-b border-gray-100 ${!s.available ? 'opacity-50' : 'hover:bg-red-50'} ${isSel ? 'bg-red-100' : ''}`}><div className="text-left"><p className="font-medium text-gray-800">{s.name}</p>{s.note && <p className="text-xs text-gray-500">{s.note}</p>}{!s.available && <p className="text-xs text-red-500">Unavailable</p>}</div>{isSel && <Check size={20} className="text-red-700" />}</button>) })}</div><div className="p-4 border-t"><button onClick={() => setShowStaffPicker(null)} className="w-full py-2 bg-red-700 text-white rounded-lg font-medium">Done</button></div></div></div>)}
      {showEditModal && selectedBooking && (<AdminBookingEdit booking={selectedBooking} onClose={() => setShowEditModal(false)} onSave={handleEditSave} />)}
    </div></div>
  )
}
