import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Save, X, Package, UtensilsCrossed } from 'lucide-react'

const CATEGORIES = [
  { id: 'salad', name: 'Salad', color: 'bg-green-100 text-green-800' },
  { id: 'main_pork', name: 'Main - Pork', color: 'bg-red-100 text-red-800' },
  { id: 'main_fish', name: 'Main - Fish/Seafood', color: 'bg-blue-100 text-blue-800' },
  { id: 'main_beef', name: 'Main - Beef', color: 'bg-amber-100 text-amber-800' },
  { id: 'main_chicken', name: 'Main - Chicken', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'side_vegetable', name: 'Side - Vegetable', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'side_pasta', name: 'Side - Pasta', color: 'bg-orange-100 text-orange-800' },
  { id: 'rice', name: 'Rice', color: 'bg-stone-100 text-stone-800' },
  { id: 'dessert', name: 'Dessert', color: 'bg-pink-100 text-pink-800' }
]

export default function AdminMenu() {
  const [activeTab, setActiveTab] = useState('dishes')
  const [dishes, setDishes] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingDish, setEditingDish] = useState(null)
  const [editingPackage, setEditingPackage] = useState(null)
  const [newDish, setNewDish] = useState({ name: '', category: 'salad', description: '' })
  const [newPackage, setNewPackage] = useState({ name: '', price_per_head: 0, price_tier_60: 0, price_tier_50: 0, price_tier_40: 0, price_tier_30: 0, description: '' })
  const [showAddDish, setShowAddDish] = useState(false)
  const [showAddPackage, setShowAddPackage] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [{ data: dishesData }, { data: packagesData }] = await Promise.all([
        supabase.from('dishes').select('*').order('category, name'),
        supabase.from('menu_packages').select('*').order('sort_order')
      ])
      setDishes(dishesData || [])
      setPackages(packagesData || [])
    } catch (error) { console.error('Error:', error) } finally { setLoading(false) }
  }

  // Dish CRUD
  const addDish = async () => {
    if (!newDish.name) return alert('Please enter dish name')
    const { error } = await supabase.from('dishes').insert([newDish])
    if (error) return alert('Error: ' + error.message)
    setNewDish({ name: '', category: 'salad', description: '' })
    setShowAddDish(false)
    fetchData()
  }

  const updateDish = async () => {
    if (!editingDish) return
    const { error } = await supabase.from('dishes').update({ name: editingDish.name, category: editingDish.category, description: editingDish.description, available: editingDish.available }).eq('id', editingDish.id)
    if (error) return alert('Error: ' + error.message)
    setEditingDish(null)
    fetchData()
  }

  const deleteDish = async (id) => {
    if (!confirm('Delete this dish?')) return
    await supabase.from('dishes').delete().eq('id', id)
    fetchData()
  }

  // Package CRUD
  const addPackage = async () => {
    if (!newPackage.name || !newPackage.price_per_head) return alert('Please fill in all required fields')
    const { error } = await supabase.from('menu_packages').insert([{ ...newPackage, sort_order: packages.length + 1 }])
    if (error) return alert('Error: ' + error.message)
    setNewPackage({ name: '', price_per_head: 0, price_tier_60: 0, price_tier_50: 0, price_tier_40: 0, price_tier_30: 0, description: '' })
    setShowAddPackage(false)
    fetchData()
  }

  const updatePackage = async () => {
    if (!editingPackage) return
    const { error } = await supabase.from('menu_packages').update(editingPackage).eq('id', editingPackage.id)
    if (error) return alert('Error: ' + error.message)
    setEditingPackage(null)
    fetchData()
  }

  const deletePackage = async (id) => {
    if (!confirm('Delete this package? This cannot be undone.')) return
    await supabase.from('menu_packages').delete().eq('id', id)
    fetchData()
  }

  const getCategoryInfo = (cat) => CATEGORIES.find(c => c.id === cat) || { name: cat, color: 'bg-gray-100 text-gray-800' }

  const filteredDishes = filterCategory === 'all' ? dishes : dishes.filter(d => d.category === filterCategory)

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div></div>

  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
          <p className="text-gray-500">Add, edit, and manage dishes and packages</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('dishes')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${activeTab === 'dishes' ? 'bg-red-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <UtensilsCrossed size={20} /> Dishes ({dishes.length})
          </button>
          <button onClick={() => setActiveTab('packages')} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium ${activeTab === 'packages' ? 'bg-red-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <Package size={20} /> Packages ({packages.length})
          </button>
        </div>

        {/* Dishes Tab */}
        {activeTab === 'dishes' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setFilterCategory('all')} className={`px-3 py-1 rounded-full text-sm ${filterCategory === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100'}`}>All</button>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setFilterCategory(cat.id)} className={`px-3 py-1 rounded-full text-sm ${filterCategory === cat.id ? cat.color + ' ring-2 ring-offset-1' : 'bg-gray-100'}`}>{cat.name}</button>
                ))}
              </div>
              <button onClick={() => setShowAddDish(true)} className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800">
                <Plus size={20} /> Add Dish
              </button>
            </div>

            {/* Add Dish Form */}
            {showAddDish && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-green-800 mb-3">Add New Dish</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <input type="text" placeholder="Dish name *" value={newDish.name} onChange={(e) => setNewDish({ ...newDish, name: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  <select value={newDish.category} onChange={(e) => setNewDish({ ...newDish, category: e.target.value })} className="px-3 py-2 border rounded-lg">
                    {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                  </select>
                  <input type="text" placeholder="Description (optional)" value={newDish.description} onChange={(e) => setNewDish({ ...newDish, description: e.target.value })} className="px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={addDish} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save Dish</button>
                  <button onClick={() => setShowAddDish(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            )}

            {/* Dishes List */}
            <div className="space-y-2">
              {filteredDishes.map(dish => (
                <div key={dish.id} className={`flex items-center justify-between p-3 rounded-lg ${!dish.available ? 'bg-gray-100 opacity-60' : 'bg-gray-50'}`}>
                  {editingDish?.id === dish.id ? (
                    <div className="flex-1 flex flex-wrap items-center gap-3">
                      <input type="text" value={editingDish.name} onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg min-w-[200px]" />
                      <select value={editingDish.category} onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value })} className="px-3 py-2 border rounded-lg">
                        {CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                      </select>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={editingDish.available} onChange={(e) => setEditingDish({ ...editingDish, available: e.target.checked })} />
                        Available
                      </label>
                      <button onClick={updateDish} className="p-2 bg-green-600 text-white rounded-lg"><Save size={18} /></button>
                      <button onClick={() => setEditingDish(null)} className="p-2 bg-gray-200 rounded-lg"><X size={18} /></button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getCategoryInfo(dish.category).color}`}>{getCategoryInfo(dish.category).name}</span>
                        <span className={!dish.available ? 'line-through' : ''}>{dish.name}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingDish(dish)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                        <button onClick={() => deleteDish(dish.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Packages Tab */}
        {activeTab === 'packages' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Menu Packages</h2>
              <button onClick={() => setShowAddPackage(true)} className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800">
                <Plus size={20} /> Add Package
              </button>
            </div>

            {/* Add Package Form */}
            {showAddPackage && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-3">Add New Package</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input type="text" placeholder="Package name *" value={newPackage.name} onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Base price/head *" value={newPackage.price_per_head || ''} onChange={(e) => setNewPackage({ ...newPackage, price_per_head: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Price (60+ pax)" value={newPackage.price_tier_60 || ''} onChange={(e) => setNewPackage({ ...newPackage, price_tier_60: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Price (50-59 pax)" value={newPackage.price_tier_50 || ''} onChange={(e) => setNewPackage({ ...newPackage, price_tier_50: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Price (40-49 pax)" value={newPackage.price_tier_40 || ''} onChange={(e) => setNewPackage({ ...newPackage, price_tier_40: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-lg" />
                  <input type="number" placeholder="Price (30-39 pax)" value={newPackage.price_tier_30 || ''} onChange={(e) => setNewPackage({ ...newPackage, price_tier_30: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-lg" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={addPackage} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save Package</button>
                  <button onClick={() => setShowAddPackage(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                </div>
              </div>
            )}

            {/* Packages List */}
            <div className="space-y-4">
              {packages.map(pkg => (
                <div key={pkg.id} className={`border rounded-xl p-4 ${!pkg.available ? 'bg-gray-100 opacity-60' : ''}`}>
                  {editingPackage?.id === pkg.id ? (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input type="text" value={editingPackage.name} onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })} className="px-3 py-2 border rounded-lg" />
                        <input type="number" value={editingPackage.price_per_head} onChange={(e) => setEditingPackage({ ...editingPackage, price_per_head: parseInt(e.target.value) || 0 })} className="px-3 py-2 border rounded-lg" placeholder="Base price" />
                        <label className="flex items-center gap-2"><input type="checkbox" checked={editingPackage.available} onChange={(e) => setEditingPackage({ ...editingPackage, available: e.target.checked })} /> Available</label>
                      </div>
                      <div className="grid grid-cols-4 gap-4">
                        <div><label className="text-xs text-gray-500">60+ pax</label><input type="number" value={editingPackage.price_tier_60} onChange={(e) => setEditingPackage({ ...editingPackage, price_tier_60: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" /></div>
                        <div><label className="text-xs text-gray-500">50-59 pax</label><input type="number" value={editingPackage.price_tier_50} onChange={(e) => setEditingPackage({ ...editingPackage, price_tier_50: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" /></div>
                        <div><label className="text-xs text-gray-500">40-49 pax</label><input type="number" value={editingPackage.price_tier_40} onChange={(e) => setEditingPackage({ ...editingPackage, price_tier_40: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" /></div>
                        <div><label className="text-xs text-gray-500">30-39 pax</label><input type="number" value={editingPackage.price_tier_30} onChange={(e) => setEditingPackage({ ...editingPackage, price_tier_30: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg" /></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={updatePackage} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Save</button>
                        <button onClick={() => setEditingPackage(null)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{pkg.name}</h3>
                        <p className="text-red-700 font-medium">₱{pkg.price_per_head}/head</p>
                        <p className="text-sm text-gray-500">Tiers: ₱{pkg.price_tier_60} (60+) | ₱{pkg.price_tier_50} (50+) | ₱{pkg.price_tier_40} (40+) | ₱{pkg.price_tier_30} (30+)</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setEditingPackage(pkg)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                        <button onClick={() => deletePackage(pkg.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}