import { commerce } from 'shared/commerce'
import { product } from 'content/product'
import { site } from 'content/site'

const absolute = (path: string) => `${site.url}${path}`

const availability =
  commerce.stockStatus === 'in_stock'
    ? 'https://schema.org/InStock'
    : commerce.stockStatus === 'backorder'
      ? 'https://schema.org/BackOrder'
      : 'https://schema.org/OutOfStock'

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  founder: {
    '@type': 'Person',
    name: site.author
  },
  sameAs: [site.linkedin]
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: site.url,
  inLanguage: 'nl-NL',
  publisher: {
    '@type': 'Organization',
    name: site.name,
    url: site.url
  }
}

export function bookSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: product.title,
    alternateName: product.subtitle,
    author: {
      '@type': 'Person',
      name: product.author
    },
    inLanguage: 'nl',
    numberOfPages: 153,
    bookFormat: 'https://schema.org/Paperback',
    image: absolute(product.cover),
    description: product.description.join(' '),
    url: absolute('/het-boek'),
    offers: {
      '@type': 'Offer',
      price: (commerce.priceCents / 100).toFixed(2),
      priceCurrency: commerce.currency,
      availability,
      url: absolute('/bestellen'),
      seller: {
        '@type': 'Organization',
        name: site.name
      }
    }
  }
}

export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description.join(' '),
    image: [absolute(product.cover)],
    brand: {
      '@type': 'Brand',
      name: site.name
    },
    offers: {
      '@type': 'Offer',
      price: (commerce.priceCents / 100).toFixed(2),
      priceCurrency: commerce.currency,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
      url: absolute('/bestellen'),
      seller: {
        '@type': 'Organization',
        name: site.name
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0.00',
          currency: commerce.currency
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'NL'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 3,
            unitCode: 'DAY'
          }
        }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'NL',
        returnPolicyCategory:
          'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/ReturnShippingFees'
      }
    }
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.author,
    jobTitle: 'Trainer, projectmanager en auteur',
    url: absolute('/over-iepe'),
    email: site.email,
    sameAs: [site.linkedin],
    worksFor: {
      '@type': 'Organization',
      name: site.name
    }
  }
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path)
    }))
  }
}
