import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, Plus, Edit2, Trash2, User, Save } from 'lucide-react'

export default function AdminStaff() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingStaff, setEditingStaff] = useState(null)
  const [formData, setFormData] = useState({ name: '', role: 'service', note: '', available: true })

  useEffect(() => { fetchStaff() }, [])
  const fetchStaff = async () => { const { data } = await supabase.from('staff').select('*').order('role, name'); setStaff(data || []); setLoading(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingStaff) await supabase.from('staff').update(formData).eq('id', editingStaff.id)
    else await supabase.from('staff').insert([formData])
    fetchStaff(); resetForm()
  }

  const toggleAvail = async (id, current) => { await supabase.from('staff').update({ available: !current }).eq('id', id); setStaff(prev => prev.map(s => s.id === id ? { ...s, available: !current } : s)) }
  const deleteStaff = async (id) => { if (!confirm('Delete?')) return; await supabase.from('staff').delete().eq('id', id); setStaff(prev => prev.filter(s => s.id !== id)) }
  const resetForm = () => { setShowForm(false); setEditingStaff(null); setFormData({ name: '', role: 'service', note: '', available: true }) }
  const startEdit = (m) => { setEditingStaff(m); setFormData({ name: m.name, role: m.role, note: m.note || '', available: m.available }); setShowForm(true) }

  const grouped = { head_waiter: staff.filter(s => s.role === 'head_waiter'), service: staff.filter(s => s.role === 'service'), extra: staff.filter(s => s.role === 'extra'), student: staff.filter(s => s.role === 'student') }
  const labels = { head_waiter: 'Head Waiters & Assistants', service: 'Service Staff', extra: 'Extra Staff', student: 'Students' }

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div></div>

  return (
    <div className="py-8 px-4"><div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-4"><Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={24} /></Link><div><h1 className="text-3xl font-bold text-gray-800">Staff Management</h1><p className="text-gray-500">{staff.length} members</p></div></div><button onClick={() => setShowForm(true)} className="bg-red-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-800 flex items-center gap-2"><Plus size={20} /> Add Staff</button></div>
      {showForm && (<div className="bg-white rounded-2xl shadow-lg p-6 mb-6"><h2 className="text-xl font-semibold text-gray-800 mb-4">{editingStaff ? 'Edit Staff' : 'Add Staff'}</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Role *</label><select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg"><option value="head_waiter">Head Waiter / Assistant</option><option value="service">Service Staff</option><option value="extra">Extra Staff</option><option value="student">Student</option></select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Note</label><input type="text" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} placeholder="e.g., Assistant, Marketing" className="w-full px-4 py-2 border border-gray-200 rounded-lg" /></div><div className="flex items-center gap-2"><input type="checkbox" id="avail" checked={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.checked })} className="w-4 h-4 text-red-700 rounded" /><label htmlFor="avail" className="text-sm text-gray-700">Available</label></div><div className="flex gap-3"><button type="button" onClick={resetForm} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button type="submit" className="flex-1 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 flex items-center justify-center gap-2"><Save size={18} /> Save</button></div></form></div>)}
      {Object.entries(grouped).map(([role, members]) => members.length > 0 && (<div key={role} className="bg-white rounded-2xl shadow-lg p-6 mb-6"><h2 className="text-lg font-semibold text-red-700 uppercase tracking-wide mb-4">{labels[role]} ({members.length})</h2><div className="space-y-2">{members.map(m => (<div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center ${m.available ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}><User size={20} /></div><div><p className="font-medium text-gray-800">{m.name}</p>{m.note && <p className="text-xs text-gray-500">{m.note}</p>}</div></div><div className="flex items-center gap-2"><button onClick={() => toggleAvail(m.id, m.available)} className={`px-3 py-1 rounded-full text-sm font-medium ${m.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{m.available ? 'Available' : 'Unavailable'}</button><button onClick={() => startEdit(m)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button><button onClick={() => deleteStaff(m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></div></div>))}</div></div>))}
      {staff.length === 0 && <div className="bg-white rounded-2xl shadow-lg p-12 text-center"><User size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">No staff yet. Add your first member above.</p></div>}
    </div></div>
  )
}
