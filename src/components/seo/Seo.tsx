import { useEffect } from 'react'
import { site } from 'content/site'

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article' | 'book'
}

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  )
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = href
}

export default function Seo({
  title,
  description,
  path,
  image = '/images/og-default.jpg',
  noindex = false,
  type = 'website'
}: SeoProps) {
  useEffect(() => {
    const canonical = `${site.url}${path === '/' ? '' : path}`
    const absoluteImage = image.startsWith('http')
      ? image
      : `${site.url}${image}`

    document.documentElement.lang = 'nl'
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta(
      'name',
      'robots',
      noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
    )
    upsertCanonical(canonical)

    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', absoluteImage)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta(
      'property',
      'og:image:alt',
      `${site.name} — het boek van ${site.author}`
    )
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:locale', 'nl_NL')
    upsertMeta('property', 'og:site_name', site.name)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', absoluteImage)
    upsertMeta(
      'name',
      'twitter:image:alt',
      `${site.name} — het boek van ${site.author}`
    )
  }, [title, description, path, image, noindex, type])

  return null
}
