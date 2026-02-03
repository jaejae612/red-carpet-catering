import { useEffect } from 'react'

const SITE_NAME = 'Red Carpet Catering'
const SITE_URL = 'https://ceburedcarpetcatering.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`

/**
 * SEO Component - sets page title, meta description, and Open Graph tags
 * No external dependencies required.
 * 
 * Usage: <SEO title="Menu" description="View our catering packages" />
 */
export default function SEO({ 
  title, 
  description, 
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website'
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium Catering in Cebu`
  const url = `${SITE_URL}${path}`

  useEffect(() => {
    // Page title
    document.title = fullTitle

    // Helper to set or create meta tags
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    // Standard meta
    setMeta('name', 'description', description)

    // Open Graph
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', image)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:locale', 'en_PH')

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // Cleanup on unmount - reset to defaults
    return () => {
      document.title = `${SITE_NAME} — Premium Catering in Cebu`
    }
  }, [fullTitle, description, url, image, type])

  return null
}

/**
 * JSON-LD Structured Data component
 * Usage: <StructuredData data={{ "@type": "LocalBusiness", ... }} />
 */
export function StructuredData({ data }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      ...data
    })
    script.id = `structured-data-${data['@type'] || 'default'}`
    
    // Remove existing one with same id
    const existing = document.getElementById(script.id)
    if (existing) existing.remove()
    
    document.head.appendChild(script)

    return () => {
      const el = document.getElementById(script.id)
      if (el) el.remove()
    }
  }, [data])

  return null
}
