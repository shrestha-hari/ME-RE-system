import React from 'react'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '@/utils'

export interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'profile' | 'article'
  schema?: Record<string, unknown> | Array<Record<string, unknown>>
  noindex?: boolean
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = SITE_CONFIG.description,
  image = `${SITE_CONFIG.url}/images/background.webp`,
  url = SITE_CONFIG.url,
  type = 'website',
  schema,
  noindex = false,
}) => {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} | Prime Land Plotting & Properties in Nepal`

  // Resolve absolute URL for canonical and image
  const canonicalUrl = url.startsWith('http')
    ? url
    : `${SITE_CONFIG.url}${url.startsWith('/') ? url : `/${url}`}`

  const absoluteImageUrl = image.startsWith('http')
    ? image
    : `${SITE_CONFIG.url}${image.startsWith('.') ? image.slice(1) : image.startsWith('/') ? image : `/${image}`}`

  // Default RealEstateAgent Schema
  const defaultOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Mt. Everest Real-Estate',
    alternateName: ['Mt Everest Real Estate', 'MER Nepal', 'Hari Bahadur Shrestha Real Estate'],
    description: SITE_CONFIG.description,
    url: 'https://shrestha-hari.github.io/ME-RE-system',
    logo: `${SITE_CONFIG.url}/images/background.webp`,
    image: absoluteImageUrl,
    telephone: '9851068067 / 9861080943',
    email: 'shresthah987@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Samakhushi 26',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati Province',
      postalCode: '44600',
      addressCountry: 'NP',
    },
    sameAs: [
      'https://www.youtube.com/@HariShrestha4',
      'https://www.facebook.com/hari.shrestha.65666',
      'https://www.tiktok.com/@shrestha_h111',
      'https://www.instagram.com/shrestha366/',
      'https://github.com/shrestha-hari',
    ],
    priceRange: 'NPR 6,50,000 per Katha - NPR 35,00,000 per Aana',
    areaServed: ['Lalitpur', 'Bara', 'Chitwan', 'Kathmandu'],
  }

  const combinedSchema = schema
    ? Array.isArray(schema)
      ? [defaultOrganizationSchema, ...schema]
      : [defaultOrganizationSchema, schema]
    : defaultOrganizationSchema

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:alt" content={SITE_CONFIG.name} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@everest_realty" />
      <meta name="twitter:creator" content="@everest_realty" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(combinedSchema)}
      </script>
    </Helmet>
  )
}

export default Seo
