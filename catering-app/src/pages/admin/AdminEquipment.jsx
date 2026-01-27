import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, Plus, Edit2, Trash2, Package, Save } from 'lucide-react'

export default function AdminEquipment() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: 'Buffet', quantity: 0 })

  useEffect(() => { fetchEquipment() }, [])
  const fetchEquipment = async () => { const { data } = await supabase.from('equipment').select('*').order('category, name'); setEquipment(data || []); setLoading(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingItem) await supabase.from('equipment').update(formData).eq('id', editingItem.id)
    else await supabase.from('equipment').insert([formData])
    fetchEquipment(); resetForm()
  }

  const deleteItem = async (id) => { if (!confirm('Delete?')) return; await supabase.from('equipment').delete().eq('id', id); setEquipment(prev => prev.filter(e => e.id !== id)) }
  const resetForm = () => { setShowForm(false); setEditingItem(null); setFormData({ name: '', category: 'Buffet', quantity: 0 }) }
  const startEdit = (item) => { setEditingItem(item); setFormData({ name: item.name, category: item.category, quantity: item.quantity }); setShowForm(true) }

  const categories = [...new Set(equipment.map(e => e.category))]

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div></div>

  return (
    <div className="py-8 px-4"><div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8"><div className="flex items-center gap-4"><Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={24} /></Link><div><h1 className="text-3xl font-bold text-gray-800">Equipment Management</h1><p className="text-gray-500">Tables, chairs, and inventory</p></div></div><button onClick={() => setShowForm(true)} className="bg-red-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-800 flex items-center gap-2"><Plus size={20} /> Add Equipment</button></div>
      {showForm && (<div className="bg-white rounded-2xl shadow-lg p-6 mb-6"><h2 className="text-xl font-semibold text-gray-800 mb-4">{editingItem ? 'Edit Equipment' : 'Add Equipment'}</h2><form onSubmit={handleSubmit} className="space-y-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Name *</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Round Table, Chair" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Category *</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg"><option value="Buffet">Buffet</option><option value="Bar">Bar</option><option value="Seating">Seating</option><option value="Linens">Linens</option><option value="Others">Others</option></select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label><input type="number" min="0" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg" /></div><div className="flex gap-3"><button type="button" onClick={resetForm} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50">Cancel</button><button type="submit" className="flex-1 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 flex items-center justify-center gap-2"><Save size={18} /> Save</button></div></form></div>)}
      {categories.map(cat => { const items = equipment.filter(e => e.category === cat); return (<div key={cat} className="bg-white rounded-2xl shadow-lg p-6 mb-6"><h2 className="text-lg font-semibold text-red-700 uppercase tracking-wide mb-4">{cat} ({items.length})</h2><div className="space-y-2">{items.map(item => (<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Package size={20} /></div><div><p className="font-medium text-gray-800">{item.name}</p><p className="text-sm text-gray-500">Total: {item.quantity}</p></div></div><div className="flex items-center gap-2"><span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{item.quantity} available</span><button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button><button onClick={() => deleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button></div></div>))}</div></div>) })}
      {equipment.length === 0 && <div className="bg-white rounded-2xl shadow-lg p-12 text-center"><Package size={48} className="mx-auto text-gray-300 mb-4" /><p className="text-gray-500">No equipment yet. Add tables, chairs above.</p></div>}
    </div></div>
  )
}
