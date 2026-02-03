import React, { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

// Messenger SVG icon
const MessengerIcon = () => (
  <svg viewBox="0 0 36 36" fill="white" width="28" height="28">
    <path d="M18 2C9.163 2 2 8.636 2 16.7c0 4.22 1.726 7.98 4.532 10.56v5.34l4.95-2.72c1.4.39 2.88.6 4.418.6 8.837 0 16-6.636 16-14.78C31.9 8.636 26.837 2 18 2zm1.77 19.876l-4.075-4.35-7.95 4.35 8.74-9.28 4.175 4.35 7.85-4.35-8.74 9.28z" />
  </svg>
)

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className={`w-11 h-11 bg-gray-800/70 hover:bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ChevronUp size={22} />
      </button>

      {/* Messenger Button */}
      <a
        href="https://m.me/ceburedcarpetcatering"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0084FF] hover:bg-[#0070e0] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Chat with us on Messenger"
      >
        <MessengerIcon />
      </a>
    </div>
  )
}
