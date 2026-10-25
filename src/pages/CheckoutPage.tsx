import { useSearchParams } from 'react-router-dom'
import { commerce, deliveryMessage, formatPrice } from 'shared/commerce'
import { seo } from 'content/seo'
import { productSchema } from 'lib/schema'
import Seo from 'components/seo/Seo'
import JsonLd from 'components/seo/JsonLd'
import CheckoutForm from 'components/forms/CheckoutForm'
import Container from 'components/ui/Container'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'

function parseQuantity(raw: string | null): number {
  const value = Number(raw)
  if (!Number.isFinite(value)) return 1
  return Math.min(Math.max(Math.trunc(value), 1), commerce.maxQuantity)
}

const reassurance = [
  {
    title: 'Binnen 2 werkdagen verzonden',
    body: 'Verzending binnen Nederland is inbegrepen in de prijs.'
  },
  {
    title: 'Veilig betalen met iDEAL',
    body: 'De betaling verloopt via Mollie. Je wordt doorgestuurd naar je eigen bank.'
  },
  {
    title: '14 dagen bedenktijd',
    body: 'Niet tevreden? Je kunt het boek binnen veertien dagen retourneren.'
  }
]

export default function CheckoutPage() {
  const [params] = useSearchParams()
  const quantity = parseQuantity(params.get('qty'))

  return (
    <>
      <Seo {...seo.checkout} />
      <JsonLd data={productSchema()} />

      <PageHero
        eyebrow="Bestellen"
        title="Bestel het boek"
        intro={`Eén boek kost ${formatPrice(
          commerce.priceCents
        )} inclusief 9% btw en verzending binnen Nederland. ${deliveryMessage()}`}
      />

      <Section tone="white" size="sm">
        <Container>
          <CheckoutForm initialQuantity={quantity} />
        </Container>
      </Section>

      <Section tone="cream" size="sm">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {reassurance.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-900/10 bg-white p-5"
              >
                <p className="text-sm font-semibold text-ink-900">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm leading-relaxed text-ink-500">
            Vragen over je bestelling, een factuur of meer dan{' '}
            {commerce.maxQuantity} exemplaren? Mail dan naar{' '}
            <a
              href="mailto:info@cirkelvanimpact.nl"
              className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4 hover:decoration-coral-700"
            >
              info@cirkelvanimpact.nl
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  )
}
