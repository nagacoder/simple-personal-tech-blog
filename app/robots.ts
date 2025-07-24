import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'
export const runtime = 'edge'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/', // i dont want to expose my notes from internet
      // allow: '/',
    },
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
