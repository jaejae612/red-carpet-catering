import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Search, Filter, Clock, User, Edit2, CheckCircle, Trash2, CreditCard, PlusCircle, ChevronDown, ChevronUp, ExternalLink, RefreshCw } from 'lucide-react'
import { TableSkeleton } from '../../components/SkeletonLoaders'

const ENTITY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'booking', label: 'Bookings' },
  { value: 'food_order', label: 'Food Orders' },
]

const ACTIONS = [
  { value: 'all', label: 'All Actions' },
  { value: 'created', label: 'Created' },
  { value: 'updated', label: 'Updated' },
  { value: 'status_changed', label: 'Status Changed' },
  { value: 'deleted', label: 'Deleted' },
  { value: 'payment_recorded', label: 'Payment Recorded' },
]

const ACTION_CONFIG = {
  created:          { icon: PlusCircle,  color: 'text-green-600', bg: 'bg-green-100' },
  updated:          { icon: Edit2,       color: 'text-blue-600',  bg: 'bg-blue-100' },
  status_changed:   { icon: Clock,       color: 'text-amber-600', bg: 'bg-amber-100' },
  deleted:          { icon: Trash2,      color: 'text-red-600',   bg: 'bg-red-100' },
  payment_recorded: { icon: CreditCard,  color: 'text-green-600', bg: 'bg-green-100' },
}

const ENTITY_LABELS = {
  booking: { label: 'Booking', color: 'bg-red-100 text-red-700' },
  food_order: { label: 'Food Order', color: 'bg-orange-100 text-orange-700' },
  payment: { label: 'Payment', color: 'bg-green-100 text-green-700' },
}

const PAGE_SIZE = 50

function formatTimestamp(ts) {
  return new Date(ts).toLocaleString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function formatFieldValue(val) {
  if (val === null || val === undefined) return 'none'
  if (typeof val === 'object') return JSON.stringify(val).substring(0, 80) + '...'
  return String(val)
}

export default function AdminAuditLog() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [entityFilter, setEntityFilter] = useState('all')
  const [actionFilter, setActionFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [expandedEntry, setExpandedEntry] = useState(null)

  useEffect(() => {
    fetchEntries(true)
  }, [entityFilter, actionFilter, dateFrom, dateTo])

  const fetchEntries = async (reset = false) => {
    const currentPage = reset ? 0 : page
    if (reset) setPage(0)
    setLoading(true)

    let query = supabase
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1)

    if (entityFilter !== 'all') query = query.eq('entity_type', entityFilter)
    if (actionFilter !== 'all') query = query.eq('action', actionFilter)
    if (dateFrom) query = query.gte('created_at', dateFrom + 'T00:00:00')
    if (dateTo) query = query.lte('created_at', dateTo + 'T23:59:59')

    const { data, error } = await query
    if (!error) {
      const newEntries = reset ? (data || []) : [...entries, ...(data || [])]
      setEntries(newEntries)
      setHasMore((data || []).length === PAGE_SIZE)
    }
    setLoading(false)
  }

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    // Fetch with next page
    setLoading(true)
    let query = supabase
      .from('audit_log')
      .select('*')
      .order('created_at', { ascending: false })
      .range(nextPage * PAGE_SIZE, (nextPage + 1) * PAGE_SIZE - 1)

    if (entityFilter !== 'all') query = query.eq('entity_type', entityFilter)
    if (actionFilter !== 'all') query = query.eq('action', actionFilter)
    if (dateFrom) query = query.gte('created_at', dateFrom + 'T00:00:00')
    if (dateTo) query = query.lte('created_at', dateTo + 'T23:59:59')

    query.then(({ data, error }) => {
      if (!error) {
        setEntries(prev => [...prev, ...(data || [])])
        setHasMore((data || []).length === PAGE_SIZE)
      }
      setLoading(false)
    })
  }

  const filtered = entries.filter(e =>
    !searchQuery ||
    e.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.admin_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEntityClick = (entry) => {
    if (entry.entity_type === 'booking') {
      navigate(`/admin/bookings?booking=${entry.entity_id}`)
    } else if (entry.entity_type === 'food_order') {
      navigate(`/admin/food-orders?order=${entry.entity_id}`)
    }
  }

  const activeFilterCount = [
    entityFilter !== 'all',
    actionFilter !== 'all',
    dateFrom !== '',
    dateTo !== ''
  ].filter(Boolean).length

  // Stats
  const todayStr = new Date().toISOString().split('T')[0]
  const todayEntries = entries.filter(e => e.created_at?.startsWith(todayStr))
  const uniqueAdmins = new Set(entries.map(e => e.admin_name).filter(Boolean))

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Audit Log</h1>
          <p className="text-gray-500">Track all changes made to bookings and orders</p>
        </div>
        <button
          onClick={() => fetchEntries(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-sm"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-800">{entries.length}</p>
          <p className="text-sm text-gray-500">Total Entries</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-800">{todayEntries.length}</p>
          <p className="text-sm text-gray-500">Today</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-800">{uniqueAdmins.size}</p>
          <p className="text-sm text-gray-500">Active Admins</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-2xl font-bold text-gray-800">
            {entries.filter(e => e.action === 'status_changed').length}
          </p>
          <p className="text-sm text-gray-500">Status Changes</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm mb-6">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by description or admin name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${
              activeFilterCount > 0 ? 'bg-red-50 border-red-200 text-red-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>

        {showFilters && (
          <div className="px-4 pb-4 border-t pt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
              <select
                value={entityFilter}
                onChange={(e) => setEntityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {ENTITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">Action</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {ACTIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1 block">To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Entries List */}
      {loading && entries.length === 0 ? (
        <TableSkeleton />
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Clock size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No audit entries found</p>
          <p className="text-gray-400 text-sm mt-1">Changes will appear here as admins modify bookings and orders</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry) => {
            const config = ACTION_CONFIG[entry.action] || ACTION_CONFIG.updated
            const Icon = config.icon
            const entityInfo = ENTITY_LABELS[entry.entity_type] || ENTITY_LABELS.booking
            const isExpanded = expandedEntry === entry.id

            return (
              <div key={entry.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div
                  className="p-4 flex items-start gap-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}
                >
                  <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={config.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${entityInfo.color}`}>
                        {entityInfo.label}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{entry.description}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <span>{formatTimestamp(entry.created_at)}</span>
                      {entry.admin_name && (
                        <span className="flex items-center gap-1">
                          <User size={10} /> {entry.admin_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleEntityClick(entry) }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="View record"
                    >
                      <ExternalLink size={16} />
                    </button>
                    {entry.changed_fields && entry.changed_fields.length > 0 && (
                      isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && entry.changed_fields && entry.changed_fields.length > 0 && (
                  <div className="px-4 pb-4 pt-0 ml-[52px]">
                    <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                      <p className="text-xs font-medium text-gray-500 mb-2">Changed Fields</p>
                      {entry.changed_fields.map((cf, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-medium text-gray-700 min-w-[120px]">{cf.field.replace(/_/g, ' ')}</span>
                          <span className="text-red-500 line-through">{formatFieldValue(cf.old)}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-green-600">{formatFieldValue(cf.new)}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">ID: {entry.entity_id.slice(0, 8)}...</p>
                  </div>
                )}
              </div>
            )
          })}

          {/* Load More */}
          {hasMore && (
            <div className="text-center py-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
