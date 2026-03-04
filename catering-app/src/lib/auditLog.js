import { supabase } from './supabase'

/**
 * Log an audit entry. Call AFTER a successful Supabase operation.
 * Fire-and-forget — never breaks the main flow.
 */
export async function logAudit({
  entityType,
  entityId,
  action,
  adminId,
  adminName,
  changedFields = null,
  description = null,
}) {
  try {
    await supabase.from('audit_log').insert([{
      entity_type: entityType,
      entity_id: entityId,
      action,
      admin_id: adminId,
      admin_name: adminName || 'Unknown',
      changed_fields: changedFields,
      description: description || generateDescription(entityType, action, changedFields),
    }])
  } catch (err) {
    console.error('Audit log error:', err)
  }
}

/**
 * Generate a human-readable description from action and changed fields.
 */
function generateDescription(entityType, action, changedFields) {
  const typeLabel = { booking: 'Booking', food_order: 'Food Order', payment: 'Payment' }[entityType] || entityType

  switch (action) {
    case 'created':
      return `${typeLabel} created`
    case 'deleted':
      return `${typeLabel} deleted`
    case 'status_changed': {
      const statusChange = changedFields?.find(f => f.field === 'status')
      if (statusChange) return `Status changed from "${statusChange.old}" to "${statusChange.new}"`
      const paymentChange = changedFields?.find(f => f.field === 'payment_status')
      if (paymentChange) return `Payment status changed from "${paymentChange.old}" to "${paymentChange.new}"`
      return `${typeLabel} status changed`
    }
    case 'payment_recorded': {
      const amountField = changedFields?.find(f => f.field === 'amount')
      if (amountField) return `Payment of ₱${Number(amountField.new).toLocaleString()} recorded`
      return 'Payment recorded'
    }
    case 'updated': {
      if (!changedFields || changedFields.length === 0) return `${typeLabel} updated`
      const fieldNames = changedFields.map(f => f.field.replace(/_/g, ' ')).join(', ')
      return `Updated: ${fieldNames}`
    }
    default:
      return `${typeLabel} ${action}`
  }
}

/**
 * Compute changed fields by comparing old and new objects.
 * Skips updated_at and fields that didn't change.
 */
export function computeChangedFields(oldData, newData, fieldsToTrack = null) {
  const changes = []
  const keys = fieldsToTrack || Object.keys(newData)

  for (const key of keys) {
    if (key === 'updated_at' || key === 'modified_by') continue
    const oldVal = oldData?.[key] ?? null
    const newVal = newData?.[key] ?? null

    const oldStr = JSON.stringify(oldVal)
    const newStr = JSON.stringify(newVal)

    if (oldStr !== newStr) {
      changes.push({ field: key, old: oldVal, new: newVal })
    }
  }

  return changes
}

/**
 * Fetch audit history for a given entity. Returns entries sorted newest-first.
 */
export async function fetchAuditHistory(entityType, entityId) {
  const { data, error } = await supabase
    .from('audit_log')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching audit history:', error)
    return []
  }
  return data || []
}
