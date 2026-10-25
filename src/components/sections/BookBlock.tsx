import { home } from 'content/home'
import { commerce, deliveryMessage, formatPrice } from 'shared/commerce'
import { track } from 'lib/analytics'
import BookCover from 'components/media/BookCover'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Section from 'components/ui/Section'

export default function BookBlock() {
  return (
    <Section tone="white" ariaLabel="Het boek">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[19rem]">
            <BookCover />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-700">
              Het boek
            </p>
            <h2 className="mt-3 text-4xl leading-[1.05] sm:text-5xl">
              {home.bookBlock.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-700">
              {home.bookBlock.intro}
            </p>

            <div className="mt-7 rounded-2xl border border-ink-900/10 bg-cream-50 p-5 sm:p-6">
              <p className="font-display text-3xl text-ink-900">
                {formatPrice(commerce.priceCents)}
              </p>
              <p className="mt-1 text-sm text-ink-500">
                {home.bookBlock.priceNote}
              </p>
              <p className="mt-3 text-sm text-ink-600">{deliveryMessage()}</p>
              <div className="mt-4 space-y-1 text-sm text-ink-500">
                <p>{home.bookBlock.businessNote}</p>
                <p>{home.bookBlock.multiNote}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                to="/bestellen?qty=1"
                onClick={() => track('order_click', { location: 'book_block' })}
              >
                Bestel één boek
              </Button>
              <Button to="/bestellen#aantal" variant="secondary">
                Bestel meerdere boeken
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
