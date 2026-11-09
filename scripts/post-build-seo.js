import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const publicDir = path.join(rootDir, 'public')

const BASE_URL = process.env.SITE_URL || 'https://shrestha-hari.github.io/ME-RE-system'
const TODAY = new Date().toISOString().split('T')[0]

// Define all public crawlable routes with SEO metadata
const ROUTES = [
  {
    path: '/',
    dir: '',
    title: 'Mt. Everest Real-Estate | Prime Land Plotting & Properties in Nepal',
    description:
      'Premier land development agency in Nepal. Verified residential and commercial land plotting with 20ft+ roads, utilities, and 100% clear Lalpurja ownership.',
    priority: '1.0',
    changefreq: 'weekly',
    heading: 'Mt. Everest Real-Estate',
    subheading: 'Premier Land Plotting, Residential Colonies & Property Advisory in Nepal',
  },
  {
    path: '/about',
    dir: 'about',
    title: 'About Us | Mt. Everest Real-Estate',
    description:
      'Company profile, 14+ years land development history, cadastral accuracy, and verified Lalpurja commitment of Mt. Everest Real-Estate.',
    priority: '0.8',
    changefreq: 'monthly',
    heading: 'Building communities with integrity & planned development',
    subheading: 'Government authorized land development agency with over 650+ plotted parcels delivered.',
  },
  {
    path: '/projects',
    dir: 'projects',
    title: 'Properties & Plotted Lands | Mt. Everest Real-Estate',
    description:
      'Browse available plotted land parcels, residential colonies, commercial highway land, and scenic farm estates across Nepal with clear Lalpurja ownership.',
    priority: '0.9',
    changefreq: 'weekly',
    heading: 'Master-planned land schemes & verified plot listings',
    subheading: 'Demarcated plots with 20ft-32ft blacktop roads, underground electricity, and verified legal ownership.',
  },
  {
    path: '/skills',
    dir: 'skills',
    title: 'Land & Property Services | Mt. Everest Real-Estate',
    description:
      'Comprehensive real estate services: cadastral land plotting, Malpot title due diligence, topographic surveying, land valuation, and turnkey colony infrastructure.',
    priority: '0.8',
    changefreq: 'monthly',
    heading: 'Turnkey land development & property advisory solutions',
    subheading: 'End-to-end solutions from land subdivision and Napi surveying to asphalt road execution.',
  },
  {
    path: '/testimonials',
    dir: 'testimonials',
    title: 'Client Reviews & Testimonials | Mt. Everest Real-Estate',
    description:
      'Verified reviews and endorsements from homeowners, overseas investors, and commercial clients of Mt. Everest Real-Estate.',
    priority: '0.85',
    changefreq: 'monthly',
    heading: 'Voices of satisfied landowners & property investors',
    subheading: 'Real experiences from families and investors who secured clear-title land with us.',
  },
  {
    path: '/contact',
    dir: 'contact',
    title: 'Contact & Site Visit Booking | Mt. Everest Real-Estate',
    description:
      'Book a free site inspection or consult our land advisors for plotted residential, commercial, or agricultural land in Nepal.',
    priority: '0.7',
    changefreq: 'monthly',
    heading: 'Schedule your free site inspection or speak to a land advisor',
    subheading: 'Direct consultation, weekly Saturday site visit vans, and corporate office in New Baneshwor, Kathmandu.',
  },
  {
    path: '/utilities',
    dir: 'utilities',
    title: 'Nepal Land Unit Converter & Loan EMI Calculator | Mt. Everest Real-Estate',
    description:
      'Essential Nepal land calculation suite: convert Ropani-Aana-Paisa-Daam to Bigha-Katha-Dhur and Sq.Ft, plus home loan EMI and Malpot registration tax estimators.',
    priority: '0.8',
    changefreq: 'monthly',
    heading: 'Nepal Land Measurement Converter & Loan EMI Suite',
    subheading: 'Accurate cadastral unit conversions, home loan EMI, and government registration estimates.',
  },
]

// 1. Generate sitemap.xml
function generateSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${BASE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join('\n')}
</urlset>
`
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  }
  console.log(`[SEO] Generated sitemap.xml with ${ROUTES.length} canonical routes.`)
}

// 2. Generate robots.txt
function generateRobots() {
  const content = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), content, 'utf8')
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'robots.txt'), content, 'utf8')
  }
  console.log(`[SEO] Generated robots.txt pointing to ${BASE_URL}/sitemap.xml`)
}

// 3. Static Pre-Rendering (SSG) for static hosts
function prerenderStaticPages() {
  const baseHtmlPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(baseHtmlPath)) {
    console.warn('[SEO] dist/index.html not found, skipping static prerender.')
    return
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8')

  for (const route of ROUTES) {
    if (!route.dir) {
      // Root index.html - update canonical & title
      let rootHtml = baseHtml
      rootHtml = replaceMetaTags(rootHtml, route)
      fs.writeFileSync(baseHtmlPath, rootHtml, 'utf8')
      continue
    }

    const routeDir = path.join(distDir, route.dir)
    fs.mkdirSync(routeDir, { recursive: true })

    const routeHtmlPath = path.join(routeDir, 'index.html')
    let prerenderedHtml = replaceMetaTags(baseHtml, route)
    // Fix relative links for nested directories (e.g. ./assets -> ../assets)
    prerenderedHtml = prerenderedHtml
      .replaceAll('href="./', 'href="../')
      .replaceAll('src="./', 'src="../')
    fs.writeFileSync(routeHtmlPath, prerenderedHtml, 'utf8')
    console.log(`[SSG] Prerendered static page: dist/${route.dir}/index.html`)
  }
}

function replaceMetaTags(html, route) {
  const canonicalUrl = `${BASE_URL}${route.path === '/' ? '/' : route.path}`

  let result = html

  // Title
  result = result.replace(/<title>.*?<\/title>/is, `<title>${route.title}</title>`)

  // Canonical tag
  if (result.includes('<link rel="canonical"')) {
    result = result.replace(
      /<link rel="canonical"[^>]*>/is,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
  } else {
    result = result.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
    )
  }

  // Meta description
  result = result.replace(
    /<meta name="description"[^>]*>/is,
    `<meta name="description" content="${route.description}" />`
  )

  // Open Graph
  result = result.replace(
    /<meta property="og:title"[^>]*>/is,
    `<meta property="og:title" content="${route.title}" />`
  )
  result = result.replace(
    /<meta property="og:description"[^>]*>/is,
    `<meta property="og:description" content="${route.description}" />`
  )
  result = result.replace(
    /<meta property="og:url"[^>]*>/is,
    `<meta property="og:url" content="${canonicalUrl}" />`
  )

  // Twitter
  result = result.replace(
    /<meta property="twitter:title"[^>]*>/is,
    `<meta property="twitter:title" content="${route.title}" />`
  )
  result = result.replace(
    /<meta property="twitter:description"[^>]*>/is,
    `<meta property="twitter:description" content="${route.description}" />`
  )

  // Fallback crawler content inside #root for crawlers without JS
  const crawlerFallback = `
    <div id="root">
      <main style="max-width:1200px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;">
        <h1 style="font-size:2rem;font-weight:bold;color:#111827;">${route.heading}</h1>
        <p style="color:#166534;font-size:1.1rem;margin-top:8px;">${route.subheading}</p>
        <p style="color:#4B5563;margin-top:16px;">${route.description}</p>
      </main>
    </div>`

  result = result.replace(/<div id="root"><\/div>/is, crawlerFallback.trim())

  return result
}

// 4. Pre-compress all static assets with Gzip and Brotli
function compressAssets() {
  if (!fs.existsSync(distDir)) return

  const compressibleExtensions = ['.html', '.js', '.css', '.svg', '.json', '.xml', '.txt']
  let count = 0
  let originalBytes = 0
  let gzipBytes = 0
  let brotliBytes = 0

  function walkAndCompress(dir) {
    const files = fs.readdirSync(dir)
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walkAndCompress(fullPath)
      } else {
        const ext = path.extname(file).toLowerCase()
        if (compressibleExtensions.includes(ext) && !file.endsWith('.gz') && !file.endsWith('.br')) {
          const content = fs.readFileSync(fullPath)
          originalBytes += content.length

          // Gzip compression (level 9 maximum)
          const gzipped = zlib.gzipSync(content, { level: 9 })
          fs.writeFileSync(`${fullPath}.gz`, gzipped)
          gzipBytes += gzipped.length

          // Brotli compression (level 11 maximum quality)
          const brotli = zlib.brotliCompressSync(content, {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          })
          fs.writeFileSync(`${fullPath}.br`, brotli)
          brotliBytes += brotli.length

          count++
        }
      }
    }
  }

  walkAndCompress(distDir)
  const gzipSaved = (((originalBytes - gzipBytes) / originalBytes) * 100).toFixed(1)
  const brotliSaved = (((originalBytes - brotliBytes) / originalBytes) * 100).toFixed(1)

  console.log(
    `[Compression] Pre-compressed ${count} assets: Gzip (${gzipSaved}% smaller) · Brotli (${brotliSaved}% smaller)`
  )
}

// Run all tasks
console.log('[Build] Executing Post-Build SEO & Optimization Pipeline...')
generateSitemap()
generateRobots()
prerenderStaticPages()
compressAssets()
console.log('[Build] Pipeline completed successfully.')
