import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { FOOD_CATEGORIES, SERVING_SIZES, getCategoryInfo } from '../../lib/foodOrderData'
import { Plus, Search, Edit2, Trash2, X, Check, UtensilsCrossed } from 'lucide-react'

export default function AdminFoodItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'chicken',
    price_home: 750,
    price_tray: 1400,
    price_xs: 1750,
    price_small: 2750,
    price_medium: 3950,
    price_large: 6000,
    available: true
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('food_items')
      .select('*')
      .order('category')
      .order('name')
    
    if (!error) {
      setItems(data || [])
    }
    setLoading(false)
  }

  const handleAddItem = async () => {
    if (!newItem.name) return

    const { data, error } = await supabase
      .from('food_items')
      .insert([newItem])
      .select()
      .single()

    if (!error && data) {
      setItems([...items, data])
      setShowAddModal(false)
      setNewItem({
        name: '',
        category: 'chicken',
        price_home: 750,
        price_tray: 1400,
        price_xs: 1750,
        price_small: 2750,
        price_medium: 3950,
        price_large: 6000,
        available: true
      })
    }
  }

  const handleUpdateItem = async (item) => {
    const { error } = await supabase
      .from('food_items')
      .update(item)
      .eq('id', item.id)

    if (!error) {
      setItems(items.map(i => i.id === item.id ? item : i))
      setEditingItem(null)
    }
  }

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    const { error } = await supabase
      .from('food_items')
      .delete()
      .eq('id', id)

    if (!error) {
      setItems(items.filter(i => i.id !== id))
    }
  }

  const toggleAvailability = async (item) => {
    const updated = { ...item, available: !item.available }
    await handleUpdateItem(updated)
  }

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  const getPriceTemplate = (category) => {
    const templates = {
      'chicken': { home: 750, tray: 1400, xs: 1750, small: 2750, medium: 3950, large: 6000 },
      'chicken_premium': { home: 850, tray: 1500, xs: 1850, small: 2850, medium: 4000, large: 6150 },
      'pork': { home: 750, tray: 1400, xs: 1750, small: 2750, medium: 3950, large: 6000 },
      'beef': { home: 1200, tray: 1800, xs: 2800, small: 3600, medium: 4200, large: 6215 },
      'seafood': { home: 750, tray: 1400, xs: 1750, small: 2750, medium: 3950, large: 6000 },
      'seafood_premium': { home: 1160, tray: 2088, xs: 2900, small: 3480, medium: 4872, large: 6380 },
      'specialties': { home: 1200, tray: 1900, xs: 3200, small: 4500, medium: 6400, large: 8800 },
      'ox_tongue': { home: 1200, tray: 1800, xs: 2800, small: 3600, medium: 4200, large: 6215 },
      'vegetable': { home: 750, tray: 1400, xs: 1750, small: 2750, medium: 3950, large: 6000 },
      'noodle_pasta': { home: 750, tray: 1400, xs: 1750, small: 2750, medium: 3950, large: 6000 },
      'salad': { home: 750, tray: 1400, xs: 1750, small: 2750, medium: 3950, large: 6000 },
      'dessert': { home: 1400, tray: 0, xs: 0, small: 0, medium: 0, large: 0 },
      'special': { home: 0, tray: 0, xs: 0, small: 0, medium: 0, large: 0 },
    }
    return templates[category] || templates['chicken']
  }

  const applyPriceTemplate = (category) => {
    const template = getPriceTemplate(category)
    setNewItem(prev => ({
      ...prev,
      category,
      price_home: template.home,
      price_tray: template.tray,
      price_xs: template.xs,
      price_small: template.small,
      price_medium: template.medium,
      price_large: template.large
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Food Menu Items</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800"
        >
          <Plus size={20} /> Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border">
          <p className="text-gray-500 text-sm">Total Items</p>
          <p className="text-2xl font-bold text-gray-800">{items.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm border border-green-200">
          <p className="text-green-700 text-sm">Available</p>
          <p className="text-2xl font-bold text-green-800">{items.filter(i => i.available).length}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-sm border border-red-200">
          <p className="text-red-700 text-sm">Unavailable</p>
          <p className="text-2xl font-bold text-red-800">{items.filter(i => !i.available).length}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 shadow-sm border border-purple-200">
          <p className="text-purple-700 text-sm">Categories</p>
          <p className="text-2xl font-bold text-purple-800">{new Set(items.map(i => i.category)).size}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedCategory === 'all' ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            All ({items.length})
          </button>
          {FOOD_CATEGORIES.map(cat => {
            const count = items.filter(i => i.category === cat.id).length
            if (count === 0) return null
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${selectedCategory === cat.id ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {cat.icon} {cat.name} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Items List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => {
            const catInfo = getCategoryInfo(category)
            return (
              <div key={category} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                    {catInfo.icon} {catInfo.name}
                    <span className="text-sm text-gray-500 font-normal">({categoryItems.length} items)</span>
                  </h3>
                </div>
                <div className="divide-y">
                  {categoryItems.map(item => (
                    <div key={item.id} className={`p-4 flex justify-between items-center ${!item.available ? 'bg-gray-50 opacity-60' : ''}`}>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-red-600">
                          {item.category === 'dessert' || item.category === 'special'
                            ? `₱${item.price_home.toLocaleString()}`
                            : `₱${item.price_home.toLocaleString()} - ₱${item.price_large.toLocaleString()}`
                          }
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleAvailability(item)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                        >
                          {item.available ? 'Available' : 'Unavailable'}
                        </button>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Add New Item</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="e.g., Chicken Adobo"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => applyPriceTemplate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {FOOD_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Meal (4-5 pax)</label>
                    <input
                      type="number"
                      value={newItem.price_home}
                      onChange={(e) => setNewItem({ ...newItem, price_home: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tray (8-10 pax)</label>
                    <input
                      type="number"
                      value={newItem.price_tray}
                      onChange={(e) => setNewItem({ ...newItem, price_tray: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">XS (20 pax)</label>
                    <input
                      type="number"
                      value={newItem.price_xs}
                      onChange={(e) => setNewItem({ ...newItem, price_xs: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Small (30 pax)</label>
                    <input
                      type="number"
                      value={newItem.price_small}
                      onChange={(e) => setNewItem({ ...newItem, price_small: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medium (50 pax)</label>
                    <input
                      type="number"
                      value={newItem.price_medium}
                      onChange={(e) => setNewItem({ ...newItem, price_medium: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Large (80 pax)</label>
                    <input
                      type="number"
                      value={newItem.price_large}
                      onChange={(e) => setNewItem({ ...newItem, price_large: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddItem}
                  disabled={!newItem.name}
                  className="w-full py-3 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800 disabled:opacity-50"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Edit Item</h3>
                <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {FOOD_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Home Meal</label>
                    <input
                      type="number"
                      value={editingItem.price_home}
                      onChange={(e) => setEditingItem({ ...editingItem, price_home: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tray</label>
                    <input
                      type="number"
                      value={editingItem.price_tray}
                      onChange={(e) => setEditingItem({ ...editingItem, price_tray: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">XS</label>
                    <input
                      type="number"
                      value={editingItem.price_xs}
                      onChange={(e) => setEditingItem({ ...editingItem, price_xs: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Small</label>
                    <input
                      type="number"
                      value={editingItem.price_small}
                      onChange={(e) => setEditingItem({ ...editingItem, price_small: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medium</label>
                    <input
                      type="number"
                      value={editingItem.price_medium}
                      onChange={(e) => setEditingItem({ ...editingItem, price_medium: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Large</label>
                    <input
                      type="number"
                      value={editingItem.price_large}
                      onChange={(e) => setEditingItem({ ...editingItem, price_large: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="available"
                    checked={editingItem.available}
                    onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                    className="w-4 h-4 text-red-700 focus:ring-red-500"
                  />
                  <label htmlFor="available" className="text-sm font-medium text-gray-700">Available for ordering</label>
                </div>

                <button
                  onClick={() => handleUpdateItem(editingItem)}
                  className="w-full py-3 bg-red-700 text-white rounded-xl font-semibold hover:bg-red-800"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}