import { Helmet } from 'react-helmet-async'

const SITE_NAME   = 'Saanvi Marks'
const SITE_URL    = 'https://saanvimarks.in'
const DEFAULT_IMG = `${SITE_URL}/og-image.jpeg`

// Shared keyword base appended to every page description
const BASE_KEYWORDS = 'laser engraving Tirupati, personalized gifts India, laser engraved keychains, corporate gifts Tirupati, wedding return gifts, engraved pens, custom gifts Andhra Pradesh'

/**
 * Drop-in SEO head manager.
 *
 * Props:
 *   title        – page <title> (do NOT include site name — appended automatically)
 *   description  – meta description (keep 120–160 chars)
 *   keywords     – comma-separated extra keywords merged with base
 *   image        – absolute URL for og:image (falls back to DEFAULT_IMG)
 *   url          – canonical URL (falls back to SITE_URL)
 *   type         – og:type, default "website"
 *   noIndex      – set true for auth/checkout/account pages
 *   jsonLd       – raw JSON-LD object rendered as <script type="application/ld+json">
 */
export default function SEO({
  title,
  description,
  keywords   = '',
  image      = DEFAULT_IMG,
  url        = SITE_URL,
  type       = 'website',
  noIndex    = false,
  jsonLd     = null,
}) {
  const fullTitle   = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Luxury Laser Engraving | Tirupati`
  const fullKeywords = [BASE_KEYWORDS, keywords].filter(Boolean).join(', ')

  return (
    <Helmet>
      {/* ── Primary ─────────────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="keywords"           content={fullKeywords} />
      <link rel="canonical"           href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ──────────────────────────────────────────── */}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={url} />

      {/* ── Twitter card ────────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── JSON-LD structured data ──────────────────────────────── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
