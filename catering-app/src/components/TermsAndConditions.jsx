import React, { useState } from 'react'
import { ChevronDown, ChevronUp, FileText, CreditCard, Truck, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

const termsAndConditions = [
  {
    id: 'preparation',
    title: 'Event Preparation',
    icon: FileText,
    items: [
      'Cebu Red Carpet Catering is obliged to prepare for the number of persons stipulated in the contract. We will not be held responsible for persons outside the number of persons booked for.'
    ]
  },
  {
    id: 'payment',
    title: 'Payment Terms',
    icon: CreditCard,
    items: [
      'A 50% down payment is required at least two (2) days before the party date. The remaining 50% shall be paid right after the party. Payment may be made in cash, check, or credit card.',
      'Credit card payments are accepted only at the office premises of Red Carpet Catering Services.',
      'Check payments should be made payable to Cebu Red Carpet Catering Services, Inc.',
      'Direct payments may be made to our bank accounts: BDO Account # 2450090408 or BPI Account # 9263031927.',
      'For repeat Corporate Clients, down payment may be waived but the total bill should be settled within a maximum of thirty (30) days after the event date.'
    ]
  },
  {
    id: 'reservation',
    title: 'Reservation & Cancellation',
    icon: AlertTriangle,
    items: [
      'For events reserved more than one month in advance, a reservation fee of Five Thousand Pesos (₱5,000.00) is required. This fee is non-refundable but is deductible from the total catering cost.',
      'Cancellations done within seven (7) days before the event date shall result in forfeiture of any amount already deposited.'
    ]
  },
  {
    id: 'venue',
    title: 'Venue & Additional Charges',
    icon: Truck,
    items: [
      'Other fees such as toll fees or village entrance fees shall be shouldered by the Client.',
      'For venues requiring manual carriage of equipment through multiple floors or long distances, additional service charges apply based on the number of personnel required.',
      'Manual carriage fees: First three (3) floors - ₱1,500.00. Each successive floor - ₱500.00 per floor.',
      'If the event starts early and requires day-before setup, a fee of ₱150.00 per person will be charged. The number of setup personnel depends on function size.'
    ]
  },
  {
    id: 'service',
    title: 'Service Duration',
    icon: Clock,
    items: [
      'Catering staff will serve for a maximum of four (4) hours from the time the buffet opens.',
      'For extended service, an additional charge of ₱100.00 per staff person per hour applies.',
      'Client is obliged to report any items left at the venue after the party so Red Carpet Catering can pick them up promptly.'
    ]
  },
  {
    id: 'food',
    title: 'Food & Leftovers',
    icon: CheckCircle,
    items: [
      'Client has the option to keep any extra food remaining after the catering service. Client must provide their own food storage containers.',
      'Cebu Red Carpet Catering is no longer responsible for leftovers after the initial service or any consequences due to later consumption.'
    ]
  },
  {
    id: 'equipment',
    title: 'Equipment & Property',
    icon: FileText,
    items: [
      'All non-food support items (paper tissues, floral arrangements, disposable plates/cups/utensils, denatured alcohol, drinking straws) remain the property of Cebu Red Carpet Catering.',
      'Client has the right to inventory equipment brought by the caterer while on the premises. This right is forfeited after Red Carpet has departed.',
      'Utensils and cutlery breakage and loss thereof will be charged to the Client.',
      'Client will be charged for loss or damage of caterer\'s equipment not caused by our food service personnel.'
    ]
  }
]

export default function TermsAndConditions({ onAccept, accepted = false, compact = false }) {
  const [expandedSection, setExpandedSection] = useState(null)
  const [hasRead, setHasRead] = useState(false)

  if (compact) {
    return (
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="accept-terms"
            checked={accepted}
            onChange={(e) => onAccept?.(e.target.checked)}
            className="mt-1 w-5 h-5 text-red-700 border-gray-300 rounded focus:ring-red-500"
          />
          <label htmlFor="accept-terms" className="text-sm text-gray-700">
            I have read and agree to the{' '}
            <button
              type="button"
              onClick={() => setExpandedSection(expandedSection ? null : 'all')}
              className="text-red-700 hover:underline font-medium"
            >
              Terms and Conditions
            </button>
            {' '}of Cebu Red Carpet Catering Services.
          </label>
        </div>

        {expandedSection === 'all' && (
          <div className="mt-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg bg-white p-4 text-sm">
            {termsAndConditions.map((section) => (
              <div key={section.id} className="mb-4 last:mb-0">
                <h4 className="font-semibold text-gray-800 mb-2">{section.title}</h4>
                <ul className="space-y-1 text-gray-600">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText size={24} /> Terms and Conditions
        </h2>
        <p className="text-red-200 text-sm mt-1">Cebu Red Carpet Catering Services, Inc.</p>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-6">
          {termsAndConditions.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedSection === section.id

            return (
              <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    setExpandedSection(isExpanded ? null : section.id)
                    setHasRead(true)
                  }}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <Icon size={20} className="text-red-700" />
                    </div>
                    <span className="font-medium text-gray-800">{section.title}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                    <ul className="mt-3 space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-red-500 mt-1 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bank Account Info Highlight */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <CreditCard size={18} /> Bank Account Details
          </h3>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-500">BDO Account</p>
              <p className="font-mono font-bold text-gray-800">2450090408</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-gray-500">BPI Account</p>
              <p className="font-mono font-bold text-gray-800">9263031927</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">Account Name: Cebu Red Carpet Catering Services, Inc.</p>
        </div>

        {/* Accept Checkbox */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => onAccept?.(e.target.checked)}
              className="mt-1 w-5 h-5 text-red-700 border-gray-300 rounded focus:ring-red-500"
            />
            <span className="text-sm text-amber-800">
              I have read, understood, and agree to the Terms and Conditions of Cebu Red Carpet Catering Services, Inc. 
              I understand that by proceeding with this booking, I am bound by these stipulations.
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

// Export the terms data for use in other components
export { termsAndConditions }
