import React from 'react'

const Pulse = ({ className = '' }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
)

// Generic card skeleton
export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <Pulse className="h-32" />
          <div className="p-6 space-y-3">
            <Pulse className="h-5 w-3/4" />
            <Pulse className="h-4 w-1/2" />
            <Pulse className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Menu page skeleton
export function MenuSkeleton() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Pulse className="h-9 w-64 mx-auto" />
          <Pulse className="h-4 w-96 mx-auto max-w-full" />
        </div>
        <CardSkeleton count={6} />
      </div>
    </div>
  )
}

// Food menu skeleton
export function FoodMenuSkeleton() {
  return (
    <div className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 space-y-3">
          <Pulse className="h-9 w-48 mx-auto" />
          <Pulse className="h-4 w-72 mx-auto" />
        </div>
        {/* Category tabs */}
        <div className="flex gap-2 mb-8 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Pulse key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
          ))}
        </div>
        {/* Food items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 space-y-2">
                  <Pulse className="h-5 w-3/4" />
                  <Pulse className="h-4 w-1/2" />
                </div>
                <Pulse className="h-9 w-9 rounded-full flex-shrink-0" />
              </div>
              <Pulse className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Booking form skeleton
export function BookingFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Pulse className="h-8 w-56 mb-8" />
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Pulse className="h-4 w-32" />
            <Pulse className="h-12 w-full rounded-xl" />
          </div>
        ))}
        <Pulse className="h-12 w-full rounded-xl" />
      </div>
    </div>
  )
}

// Table skeleton for admin pages
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Pulse key={i} className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="border-b border-gray-100 p-4 flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Pulse key={c} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

// Dashboard stats skeleton
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
            <Pulse className="h-4 w-24" />
            <Pulse className="h-8 w-16" />
          </div>
        ))}
      </div>
      {/* Charts area */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <Pulse className="h-5 w-40" />
          <Pulse className="h-48 w-full rounded-xl" />
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <Pulse className="h-5 w-40" />
          <Pulse className="h-48 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default {
  CardSkeleton,
  MenuSkeleton,
  FoodMenuSkeleton,
  BookingFormSkeleton,
  TableSkeleton,
  DashboardSkeleton
}
