import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { ArrowLeft, Plus, Edit2, Trash2, Package, Save, Tag } from 'lucide-react'

export default function AdminEquipment() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ name: '', category: 'Buffet', type: 'owned', quantity: 0, supplier: '', rental_cost: 0 })

  useEffect(() => { fetchEquipment() }, [])
  const fetchEquipment = async () => { const { data } = await supabase.from('equipment').select('*').order('type, category, name'); setEquipment(data || []); setLoading(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const saveData = { ...formData }
    if (saveData.type === 'owned') { saveData.supplier = null; saveData.rental_cost = 0 }
    if (editingItem) await supabase.from('equipment').update(saveData).eq('id', editingItem.id)
    else await supabase.from('equipment').insert([saveData])
    fetchEquipment(); resetForm()
  }

  const deleteItem = async (id) => { if (!confirm('Delete this equipment?')) return; await supabase.from('equipment').delete().eq('id', id); setEquipment(prev => prev.filter(e => e.id !== id)) }
  const resetForm = () => { setShowForm(false); setEditingItem(null); setFormData({ name: '', category: 'Buffet', type: 'owned', quantity: 0, supplier: '', rental_cost: 0 }) }
  const startEdit = (item) => { setEditingItem(item); setFormData({ name: item.name, category: item.category, type: item.type || 'owned', quantity: item.quantity, supplier: item.supplier || '', rental_cost: item.rental_cost || 0 }); setShowForm(true) }

  const ownedItems = equipment.filter(e => (e.type || 'owned') === 'owned')
  const rentalItems = equipment.filter(e => e.type === 'rental')

  const ownedCategories = [...new Set(ownedItems.map(e => e.category))]
  const rentalCategories = [...new Set(rentalItems.map(e => e.category))]

  const totalOwned = ownedItems.reduce((sum, e) => sum + (e.quantity || 0), 0)

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center"><div className="w-12 h-12 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"></div></div>

  return (
    <div className="py-8 px-4"><div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={24} /></Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Equipment Management</h1>
            <p className="text-gray-500">{ownedItems.length} owned ({totalOwned} units) • {rentalItems.length} rental sources</p>
          </div>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-red-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-800 flex items-center gap-2"><Plus size={20} /> Add Equipment</button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingItem ? 'Edit Equipment' : 'Add Equipment'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <div className="flex gap-2">
                <button type="button" onClick={() => setFormData({ ...formData, type: 'owned' })} className={`flex-1 py-2 rounded-lg font-medium text-sm border-2 ${formData.type === 'owned' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'}`}>
                  📦 Owned
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, type: 'rental' })} className={`flex-1 py-2 rounded-lg font-medium text-sm border-2 ${formData.type === 'rental' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500'}`}>
                  🏷️ Rental Source
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Round Table, Chair" required className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg">
                  <option value="Buffet">Buffet</option>
                  <option value="Bar">Bar</option>
                  <option value="Seating">Seating</option>
                  <option value="Linens">Linens</option>
                  <option value="Utensils">Utensils</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'owned' ? 'Quantity Owned *' : 'Available for Rent *'}
              </label>
              <input type="number" min="0" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 0 })} required className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
            </div>

            {/* Rental specific fields */}
            {formData.type === 'rental' && (
              <div className="grid grid-cols-2 gap-4 bg-orange-50 rounded-lg p-4">
                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-1">Supplier Name</label>
                  <input type="text" value={formData.supplier} onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} placeholder="e.g., RentAll Cebu" className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-orange-700 mb-1">Cost per Unit (₱)</label>
                  <input type="number" min="0" value={formData.rental_cost} onChange={(e) => setFormData({ ...formData, rental_cost: parseInt(e.target.value) || 0 })} placeholder="150" className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={resetForm} className="flex-1 py-2 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="flex-1 py-2 bg-red-700 text-white rounded-lg font-medium hover:bg-red-800 flex items-center justify-center gap-2"><Save size={18} /> Save</button>
            </div>
          </form>
        </div>
      )}

      {/* Owned Equipment */}
      {ownedItems.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">📦 Owned Equipment</h2>
          {ownedCategories.map(cat => {
            const items = ownedItems.filter(e => e.category === cat)
            return (
              <div key={cat} className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                <h3 className="text-sm font-semibold text-red-700 uppercase tracking-wide mb-3">{cat} ({items.length})</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"><Package size={20} /></div>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <p className="text-sm text-gray-500">Total: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{item.quantity} units</span>
                        <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                        <button onClick={() => deleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Rental Sources */}
      {rentalItems.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">🏷️ Rental Sources</h2>
          {rentalCategories.map(cat => {
            const items = rentalItems.filter(e => e.category === cat)
            return (
              <div key={cat} className="bg-white rounded-2xl shadow-lg p-6 mb-4 border-l-4 border-orange-400">
                <h3 className="text-sm font-semibold text-orange-600 uppercase tracking-wide mb-3">{cat} ({items.length})</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><Tag size={20} /></div>
                        <div>
                          <p className="font-medium text-gray-800">{item.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{item.supplier || 'No supplier'}</span>
                            <span>•</span>
                            <span className="text-orange-600 font-medium">₱{(item.rental_cost || 0).toLocaleString()}/unit</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{item.quantity} available</span>
                        <button onClick={() => startEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                        <button onClick={() => deleteItem(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {equipment.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No equipment yet. Add tables, chairs, utensils above.</p>
        </div>
      )}
    </div></div>
  )
}
