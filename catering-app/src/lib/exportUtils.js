/**
 * Export Utility for Red Carpet Catering Admin
 * Supports CSV (Excel-compatible) and PDF (print) exports
 * Zero external dependencies required
 */

// ============ CSV EXPORT ============

const escapeCSV = (val) => {
  if (val == null) return ''
  const str = String(val)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

const arrayToCSV = (headers, rows) => {
  const headerRow = headers.map(escapeCSV).join(',')
  const dataRows = rows.map(row => row.map(escapeCSV).join(','))
  return [headerRow, ...dataRows].join('\n')
}

const downloadFile = (content, filename, type) => {
  const BOM = '\uFEFF' // UTF-8 BOM for Excel to read special chars (₱) correctly
  const blob = new Blob([BOM + content], { type: `${type};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Format helpers
const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' }) : ''
const formatTime = (t) => {
  if (!t) return ''
  const [h, m] = t.split(':')
  const hr = parseInt(h)
  return `${hr > 12 ? hr - 12 : hr || 12}:${m} ${hr >= 12 ? 'PM' : 'AM'}`
}
const formatCurrency = (n) => n != null ? `₱${Number(n).toLocaleString()}` : ''
const capitalize = (s) => s ? s.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : ''
const today = () => new Date().toISOString().split('T')[0]

// ---- Bookings CSV ----
export const exportBookingsCSV = (bookings, filename) => {
  const headers = [
    'Date', 'Time', 'Customer', 'Phone', 'Email',
    'Venue', 'Package', 'Menu Option', 'Guests',
    'Total (₱)', 'Paid (₱)', 'Balance (₱)',
    'Status', 'Payment', 'Motif', 'Special Requests', 'Created'
  ]

  const rows = bookings.map(b => [
    formatDate(b.event_date),
    formatTime(b.event_time),
    b.customer_name,
    b.customer_phone,
    b.customer_email || '',
    b.venue,
    b.menu_package,
    b.menu_option || '',
    b.number_of_pax,
    b.total_amount,
    b.amount_paid || 0,
    Math.max((b.total_amount || 0) - (b.amount_paid || 0), 0),
    capitalize(b.status),
    capitalize(b.payment_status || 'unpaid'),
    b.motif || '',
    b.special_requests || '',
    formatDate(b.created_at)
  ])

  const csv = arrayToCSV(headers, rows)
  downloadFile(csv, filename || `bookings-${today()}.csv`, 'text/csv')
}

// ---- Food Orders CSV ----
export const exportFoodOrdersCSV = (orders, filename) => {
  const headers = [
    'Date', 'Time', 'Customer', 'Phone', 'Email',
    'Delivery Address', 'Items', 'Total (₱)',
    'Status', 'Payment', 'Notes', 'Created'
  ]

  const rows = orders.map(o => [
    formatDate(o.delivery_date),
    formatTime(o.delivery_time),
    o.customer_name,
    o.customer_phone,
    o.customer_email || '',
    o.delivery_address || '',
    (o.items || []).map(i => `${i.name} x${i.quantity}`).join('; '),
    o.total_amount,
    capitalize(o.status),
    capitalize(o.payment_status || 'unpaid'),
    o.notes || '',
    formatDate(o.created_at)
  ])

  const csv = arrayToCSV(headers, rows)
  downloadFile(csv, filename || `food-orders-${today()}.csv`, 'text/csv')
}


// ============ PDF EXPORT (Print) ============

const openPrintWindow = (title, tableHTML, summaryHTML = '') => {
  const win = window.open('', '_blank')
  if (!win) {
    alert('Please allow popups to export PDF')
    return
  }

  win.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; padding: 20px; color: #333; font-size: 11px; }
        .header { text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #b91c1c; }
        .header h1 { color: #b91c1c; font-size: 20px; margin-bottom: 4px; }
        .header p { color: #666; font-size: 12px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
        .summary-card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; flex: 1; min-width: 120px; }
        .summary-card .label { color: #666; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
        .summary-card .value { font-size: 18px; font-weight: bold; color: #111; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th { background: #b91c1c; color: white; padding: 8px 6px; text-align: left; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3px; }
        td { padding: 7px 6px; border-bottom: 1px solid #e5e7eb; font-size: 11px; }
        tr:nth-child(even) { background: #f9fafb; }
        tr:hover { background: #fef2f2; }
        .status { padding: 2px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-confirmed { background: #d1fae5; color: #065f46; }
        .status-completed { background: #dbeafe; color: #1e40af; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        .status-preparing { background: #e0e7ff; color: #3730a3; }
        .status-ready { background: #d1fae5; color: #065f46; }
        .status-delivered { background: #dbeafe; color: #1e40af; }
        .status-unpaid { background: #fee2e2; color: #991b1b; }
        .status-deposit_paid { background: #fef3c7; color: #92400e; }
        .status-fully_paid { background: #d1fae5; color: #065f46; }
        .status-refund_pending { background: #ffedd5; color: #9a3412; }
        .status-refunded { background: #f3f4f6; color: #4b5563; }
        .status-paid { background: #d1fae5; color: #065f46; }
        .text-right { text-align: right; }
        .footer { margin-top: 20px; text-align: center; color: #999; font-size: 10px; border-top: 1px solid #e5e7eb; padding-top: 10px; }
        @media print { 
          body { padding: 10px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Red Carpet Food and Catering Services</h1>
        <p>${title}</p>
      </div>
      ${summaryHTML}
      ${tableHTML}
      <div class="footer">
        Generated on ${new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
        • ceburedcarpetcatering.com
      </div>
      <div class="no-print" style="text-align:center;margin-top:20px;">
        <button onclick="window.print()" style="background:#b91c1c;color:white;border:none;padding:10px 30px;border-radius:8px;font-size:14px;cursor:pointer;">
          Print / Save as PDF
        </button>
      </div>
    </body>
    </html>
  `)
  win.document.close()
}

const statusBadge = (status) => `<span class="status status-${status || 'pending'}">${capitalize(status || 'pending')}</span>`

// ---- Bookings PDF ----
export const exportBookingsPDF = (bookings, title) => {
  const totalRevenue = bookings.reduce((s, b) => s + (b.total_amount || 0), 0)
  const totalPaid = bookings.reduce((s, b) => s + (b.amount_paid || 0), 0)
  const totalGuests = bookings.reduce((s, b) => s + (b.number_of_pax || 0), 0)

  const summaryHTML = `
    <div class="summary">
      <div class="summary-card"><div class="label">Bookings</div><div class="value">${bookings.length}</div></div>
      <div class="summary-card"><div class="label">Total Guests</div><div class="value">${totalGuests.toLocaleString()}</div></div>
      <div class="summary-card"><div class="label">Total Revenue</div><div class="value">${formatCurrency(totalRevenue)}</div></div>
      <div class="summary-card"><div class="label">Amount Paid</div><div class="value">${formatCurrency(totalPaid)}</div></div>
      <div class="summary-card"><div class="label">Balance Due</div><div class="value">${formatCurrency(totalRevenue - totalPaid)}</div></div>
    </div>
  `

  const tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Venue</th>
          <th>Package</th>
          <th>Pax</th>
          <th class="text-right">Total</th>
          <th class="text-right">Paid</th>
          <th>Status</th>
          <th>Payment</th>
        </tr>
      </thead>
      <tbody>
        ${bookings.map(b => `
          <tr>
            <td>${formatDate(b.event_date)}</td>
            <td><strong>${b.customer_name}</strong><br/><span style="color:#666;font-size:10px">${b.customer_phone || ''}</span></td>
            <td>${b.venue || ''}</td>
            <td>${b.menu_package || ''}<br/><span style="color:#666;font-size:10px">${b.menu_option || ''}</span></td>
            <td>${b.number_of_pax}</td>
            <td class="text-right">${formatCurrency(b.total_amount)}</td>
            <td class="text-right">${formatCurrency(b.amount_paid)}</td>
            <td>${statusBadge(b.status)}</td>
            <td>${statusBadge(b.payment_status || 'unpaid')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `

  openPrintWindow(title || `Bookings Report — ${today()}`, tableHTML, summaryHTML)
}

// ---- Food Orders PDF ----
export const exportFoodOrdersPDF = (orders, title) => {
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + (o.total_amount || 0), 0)

  const summaryHTML = `
    <div class="summary">
      <div class="summary-card"><div class="label">Orders</div><div class="value">${orders.length}</div></div>
      <div class="summary-card"><div class="label">Total Revenue</div><div class="value">${formatCurrency(totalRevenue)}</div></div>
    </div>
  `

  const tableHTML = `
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Address</th>
          <th class="text-right">Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${orders.map(o => `
          <tr>
            <td>${formatDate(o.delivery_date)}${o.delivery_time ? `<br/><span style="color:#666;font-size:10px">${formatTime(o.delivery_time)}</span>` : ''}</td>
            <td><strong>${o.customer_name}</strong><br/><span style="color:#666;font-size:10px">${o.customer_phone || ''}</span></td>
            <td style="max-width:200px;font-size:10px">${(o.items || []).map(i => `${i.name} ×${i.quantity}`).join(', ')}</td>
            <td style="max-width:150px;font-size:10px">${o.delivery_address || ''}</td>
            <td class="text-right">${formatCurrency(o.total_amount)}</td>
            <td>${statusBadge(o.status)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `

  openPrintWindow(title || `Food Orders Report — ${today()}`, tableHTML, summaryHTML)
}
