import React, { useState } from 'react'

// ============ SVG BAR CHART ============
const BarChart = ({ data, height = 240 }) => {
  const [hoveredBar, setHoveredBar] = useState(null)
  const padding = { top: 20, right: 10, bottom: 40, left: 55 }
  const width = 100 // percentage-based
  const chartH = height - padding.top - padding.bottom

  const maxVal = Math.max(...data.map(d => d.bookings + d.foodOrders), 1)
  const barGroupWidth = 100 / data.length
  const barWidth = barGroupWidth * 0.3

  // Y-axis ticks
  const yTicks = []
  const step = maxVal <= 5000 ? 1000 : maxVal <= 20000 ? 5000 : maxVal <= 100000 ? 20000 : 50000
  for (let i = 0; i <= maxVal; i += step) yTicks.push(i)
  if (yTicks[yTicks.length - 1] < maxVal) yTicks.push(yTicks[yTicks.length - 1] + step)
  const yMax = yTicks[yTicks.length - 1]

  const getY = (val) => padding.top + chartH - (val / yMax) * chartH

  return (
    <div className="relative">
      <svg viewBox={`0 0 500 ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {yTicks.map((tick, i) => (
          <g key={i}>
            <line x1="55" y1={getY(tick)} x2="490" y2={getY(tick)} stroke="#f3f4f6" strokeWidth="1" />
            <text x="50" y={getY(tick) + 4} textAnchor="end" className="text-[10px]" fill="#9ca3af">
              {tick >= 1000 ? `₱${(tick / 1000).toFixed(0)}k` : `₱${tick}`}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = 55 + (i + 0.5) * ((490 - 55) / data.length)
          const bw = ((490 - 55) / data.length) * 0.3
          const isHovered = hoveredBar === i
          
          return (
            <g key={i} 
              onMouseEnter={() => setHoveredBar(i)} 
              onMouseLeave={() => setHoveredBar(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Booking bar */}
              <rect
                x={cx - bw - 1}
                y={getY(d.bookings)}
                width={bw}
                height={Math.max(getY(0) - getY(d.bookings), 0)}
                rx="3"
                fill={isHovered ? '#dc2626' : '#ef4444'}
                opacity={isHovered ? 1 : 0.85}
              />
              {/* Food order bar */}
              <rect
                x={cx + 1}
                y={getY(d.foodOrders)}
                width={bw}
                height={Math.max(getY(0) - getY(d.foodOrders), 0)}
                rx="3"
                fill={isHovered ? '#ea580c' : '#f97316'}
                opacity={isHovered ? 1 : 0.85}
              />
              {/* Month label */}
              <text x={cx} y={height - 10} textAnchor="middle" className="text-[10px]" fill="#6b7280">
                {d.month}
              </text>
              
              {/* Hover tooltip */}
              {isHovered && (
                <g>
                  <rect x={cx - 65} y={getY(Math.max(d.bookings, d.foodOrders)) - 52} width="130" height="45" rx="6" fill="#1f2937" opacity="0.95" />
                  <text x={cx} y={getY(Math.max(d.bookings, d.foodOrders)) - 34} textAnchor="middle" fill="#f87171" className="text-[10px]" fontWeight="600">
                    Catering: ₱{d.bookings.toLocaleString()}
                  </text>
                  <text x={cx} y={getY(Math.max(d.bookings, d.foodOrders)) - 18} textAnchor="middle" fill="#fb923c" className="text-[10px]" fontWeight="600">
                    Food Orders: ₱{d.foodOrders.toLocaleString()}
                  </text>
                </g>
              )}
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-1 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-500 rounded-sm inline-block" /> Catering Bookings</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-orange-500 rounded-sm inline-block" /> Food Orders</span>
      </div>
    </div>
  )
}


// ============ DONUT CHART ============
const DonutChart = ({ data, size = 180 }) => {
  const [hoveredSlice, setHoveredSlice] = useState(null)
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 10
  const innerR = outerR * 0.6
  const total = data.reduce((s, d) => s + d.value, 0)

  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height: size }}>
        <p className="text-gray-400 text-sm">No revenue data yet</p>
      </div>
    )
  }

  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4']
  let currentAngle = -90

  const slices = data.filter(d => d.value > 0).map((d, i) => {
    const angle = (d.value / total) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle
    currentAngle = endAngle

    const startRad = (startAngle * Math.PI) / 180
    const endRad = (endAngle * Math.PI) / 180

    const x1 = cx + outerR * Math.cos(startRad)
    const y1 = cy + outerR * Math.sin(startRad)
    const x2 = cx + outerR * Math.cos(endRad)
    const y2 = cy + outerR * Math.sin(endRad)
    const x3 = cx + innerR * Math.cos(endRad)
    const y3 = cy + innerR * Math.sin(endRad)
    const x4 = cx + innerR * Math.cos(startRad)
    const y4 = cy + innerR * Math.sin(startRad)

    const largeArc = angle > 180 ? 1 : 0
    const path = `M ${x1} ${y1} A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4} Z`

    return { ...d, path, color: colors[i % colors.length], percentage: ((d.value / total) * 100).toFixed(1) }
  })

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.path}
            fill={s.color}
            opacity={hoveredSlice === i ? 1 : 0.85}
            stroke="white"
            strokeWidth="2"
            onMouseEnter={() => setHoveredSlice(i)}
            onMouseLeave={() => setHoveredSlice(null)}
            style={{ cursor: 'pointer', transition: 'opacity 0.2s' }}
          />
        ))}
        {/* Center text */}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#111827" fontSize="14" fontWeight="bold">
          ₱{(total / 1000).toFixed(0)}k
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#9ca3af" fontSize="10">
          Total
        </text>
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 w-full">
        {slices.map((s, i) => (
          <div
            key={i}
            className={`flex items-center gap-1.5 text-xs rounded px-1.5 py-0.5 transition-colors ${hoveredSlice === i ? 'bg-gray-100' : ''}`}
            onMouseEnter={() => setHoveredSlice(i)}
            onMouseLeave={() => setHoveredSlice(null)}
          >
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-gray-600 truncate">{s.label}</span>
            <span className="text-gray-400 ml-auto">{s.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}


// ============ MAIN COMPONENT ============
export default function RevenueCharts({ bookings = [], foodOrders = [] }) {
  const [chartPeriod, setChartPeriod] = useState('6months')

  // Get monthly data for bar chart
  const getMonthlyRevenue = () => {
    const months = {}
    const now = new Date()
    const monthCount = chartPeriod === '3months' ? 3 : chartPeriod === '6months' ? 6 : 12

    for (let i = monthCount - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      months[key] = { month: key, bookings: 0, foodOrders: 0 }
    }

    bookings.forEach(b => {
      if (b.status === 'cancelled') return
      const date = new Date(b.event_date || b.created_at)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      if (months[key]) {
        months[key].bookings += b.total_amount || 0
      }
    })

    foodOrders.forEach(o => {
      if (o.status === 'cancelled') return
      const date = new Date(o.delivery_date || o.created_at)
      const key = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
      if (months[key]) {
        months[key].foodOrders += o.total_amount || 0
      }
    })

    return Object.values(months)
  }

  // Revenue by package type
  const getPackageRevenue = () => {
    const packages = {}
    bookings.forEach(b => {
      if (b.status === 'cancelled') return
      const pkg = b.menu_package || 'Other'
      if (!packages[pkg]) packages[pkg] = 0
      packages[pkg] += b.total_amount || 0
    })
    
    // Add food orders as a category
    const foodTotal = foodOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((s, o) => s + (o.total_amount || 0), 0)
    if (foodTotal > 0) packages['Food Orders'] = foodTotal

    return Object.entries(packages)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
  }

  // Summary stats
  const getSummaryStats = () => {
    const now = new Date()
    const thisMonth = now.getMonth()
    const thisYear = now.getFullYear()
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

    let thisMonthRevenue = 0
    let lastMonthRevenue = 0
    let thisMonthOrders = 0
    let lastMonthOrders = 0

    const processItem = (item, dateField) => {
      if (item.status === 'cancelled') return
      const d = new Date(item[dateField] || item.created_at)
      const amount = item.total_amount || 0
      if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) {
        thisMonthRevenue += amount
        thisMonthOrders++
      } else if (d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear) {
        lastMonthRevenue += amount
        lastMonthOrders++
      }
    }

    bookings.forEach(b => processItem(b, 'event_date'))
    foodOrders.forEach(o => processItem(o, 'delivery_date'))

    const revenueChange = lastMonthRevenue > 0
      ? ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1)
      : thisMonthRevenue > 0 ? 100 : 0

    const ordersChange = lastMonthOrders > 0
      ? ((thisMonthOrders - lastMonthOrders) / lastMonthOrders * 100).toFixed(1)
      : thisMonthOrders > 0 ? 100 : 0

    return { thisMonthRevenue, lastMonthRevenue, revenueChange, thisMonthOrders, lastMonthOrders, ordersChange }
  }

  // Average order value
  const getAvgOrderValue = () => {
    const activeBookings = bookings.filter(b => b.status !== 'cancelled' && b.total_amount > 0)
    const activeFoodOrders = foodOrders.filter(o => o.status !== 'cancelled' && o.total_amount > 0)
    const total = [...activeBookings, ...activeFoodOrders]
    if (total.length === 0) return 0
    return total.reduce((s, i) => s + (i.total_amount || 0), 0) / total.length
  }

  const monthlyData = getMonthlyRevenue()
  const packageData = getPackageRevenue()
  const stats = getSummaryStats()
  const avgOrder = getAvgOrderValue()

  const ChangeIndicator = ({ value }) => {
    const num = parseFloat(value)
    if (num === 0) return <span className="text-xs text-gray-400">No change</span>
    const isPositive = num > 0
    return (
      <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(num)}% vs last month
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Month-over-month summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <p className="text-xs text-red-600 font-medium mb-1">This Month</p>
          <p className="text-xl font-bold text-gray-800">₱{stats.thisMonthRevenue.toLocaleString()}</p>
          <ChangeIndicator value={stats.revenueChange} />
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <p className="text-xs text-orange-600 font-medium mb-1">Last Month</p>
          <p className="text-xl font-bold text-gray-800">₱{stats.lastMonthRevenue.toLocaleString()}</p>
          <span className="text-xs text-gray-400">{stats.lastMonthOrders} orders</span>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <p className="text-xs text-blue-600 font-medium mb-1">Orders This Month</p>
          <p className="text-xl font-bold text-gray-800">{stats.thisMonthOrders}</p>
          <ChangeIndicator value={stats.ordersChange} />
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <p className="text-xs text-purple-600 font-medium mb-1">Avg Order Value</p>
          <p className="text-xl font-bold text-gray-800">₱{Math.round(avgOrder).toLocaleString()}</p>
          <span className="text-xs text-gray-400">all time</span>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800">Monthly Revenue</h3>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {[
                { key: '3months', label: '3M' },
                { key: '6months', label: '6M' },
                { key: '12months', label: '1Y' }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setChartPeriod(opt.key)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${chartPeriod === opt.key ? 'bg-white text-red-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <BarChart data={monthlyData} height={250} />
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Revenue by Type</h3>
          <DonutChart data={packageData} size={170} />
        </div>
      </div>
    </div>
  )
}
