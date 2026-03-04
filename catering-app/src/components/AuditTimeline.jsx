import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Clock, User, Edit2, CheckCircle, Trash2, CreditCard, PlusCircle } from 'lucide-react'
import { fetchAuditHistory } from '../lib/auditLog'

const ACTION_CONFIG = {
  created:          { icon: PlusCircle,  color: 'text-green-600', bg: 'bg-green-100', label: 'Created' },
  updated:          { icon: Edit2,       color: 'text-blue-600',  bg: 'bg-blue-100',  label: 'Updated' },
  status_changed:   { icon: Clock,       color: 'text-amber-600', bg: 'bg-amber-100', label: 'Status Changed' },
  deleted:          { icon: Trash2,      color: 'text-red-600',   bg: 'bg-red-100',   label: 'Deleted' },
  payment_recorded: { icon: CreditCard,  color: 'text-green-600', bg: 'bg-green-100', label: 'Payment' },
}

function formatTimestamp(ts) {
  return new Date(ts).toLocaleString('en-PH', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

function formatFieldValue(val) {
  if (val === null || val === undefined) return 'none'
  if (typeof val === 'object') return JSON.stringify(val).substring(0, 100)
  return String(val)
}

export default function AuditTimeline({ entityType, entityId }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (expanded && entries.length === 0) {
      loadHistory()
    }
  }, [expanded, entityType, entityId])

  // Reload when entity changes
  useEffect(() => {
    if (expanded) {
      loadHistory()
    } else {
      setEntries([])
    }
  }, [entityId])

  const loadHistory = async () => {
    setLoading(true)
    const data = await fetchAuditHistory(entityType, entityId)
    setEntries(data)
    setLoading(false)
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4 mt-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="font-semibold text-gray-700 flex items-center gap-2">
          <Clock size={18} /> Activity Log
          {entries.length > 0 && (
            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{entries.length}</span>
          )}
        </h3>
        {expanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
      </button>

      {expanded && (
        <div className="mt-3">
          {loading ? (
            <div className="animate-pulse space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-12 bg-gray-200 rounded-lg" />)}
            </div>
          ) : entries.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No activity recorded</p>
          ) : (
            <div className="space-y-0 relative">
              <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-gray-200" />

              {entries.map((entry) => {
                const config = ACTION_CONFIG[entry.action] || ACTION_CONFIG.updated
                const Icon = config.icon
                return (
                  <div key={entry.id} className="relative flex gap-3 py-2">
                    <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center z-10 shrink-0`}>
                      <Icon size={14} className={config.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800">{entry.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <span>{formatTimestamp(entry.created_at)}</span>
                        {entry.admin_name && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <User size={10} /> {entry.admin_name}
                            </span>
                          </>
                        )}
                      </div>
                      {entry.changed_fields && entry.changed_fields.length > 0 && entry.action === 'updated' && (
                        <div className="mt-1 text-xs text-gray-500 bg-white rounded p-2 space-y-0.5">
                          {entry.changed_fields.slice(0, 5).map((cf, i) => (
                            <p key={i}>
                              <span className="font-medium">{cf.field.replace(/_/g, ' ')}</span>:{' '}
                              <span className="text-red-500 line-through">{formatFieldValue(cf.old)}</span>
                              {' → '}
                              <span className="text-green-600">{formatFieldValue(cf.new)}</span>
                            </p>
                          ))}
                          {entry.changed_fields.length > 5 && (
                            <p className="text-gray-400">+{entry.changed_fields.length - 5} more fields</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
