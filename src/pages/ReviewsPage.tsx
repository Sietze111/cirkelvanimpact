import { publicReviews, reviewsContent } from 'content/reviews'
import { seo } from 'content/seo'
import { track } from 'lib/analytics'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import PageHero from 'components/ui/PageHero'
import Section from 'components/ui/Section'
import Seo from 'components/seo/Seo'

export default function ReviewsPage() {
  const items = publicReviews()
  const shareHref = `mailto:info@cirkelvanimpact.nl?subject=${encodeURIComponent(
    reviewsContent.shareSubject
  )}`

  return (
    <>
      <Seo {...seo.reviews} />

      <PageHero
        eyebrow={reviewsContent.eyebrow}
        title={reviewsContent.title}
        intro={reviewsContent.intro}
      />

      <Section tone="white">
        <Container>
          {items.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((review) => (
                <figure
                  key={review.id}
                  className="flex h-full flex-col rounded-3xl border border-ink-900/10 bg-cream-50 p-6 sm:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-5xl leading-none text-coral-300"
                  >
                    “
                  </span>
                  <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-ink-700">
                    {review.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-ink-900/10 pt-4 text-sm">
                    <span className="font-semibold text-ink-900">
                      {review.name}
                    </span>
                    <span className="block text-ink-500">
                      {review.role}
                      {review.organisation ? `, ${review.organisation}` : ''}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl border border-ink-900/10 bg-cream-50 p-8 text-center sm:p-12">
              <span
                aria-hidden="true"
                className="font-display text-6xl leading-none text-coral-300"
              >
                “
              </span>
              <h2 className="mt-2 text-3xl">{reviewsContent.emptyTitle}</h2>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ink-500">
                {reviewsContent.emptyBody}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  href={shareHref}
                  onClick={() =>
                    track('contact_click', { location: 'reviews_share' })
                  }
                >
                  {reviewsContent.shareLabel}
                </Button>
                <Button to="/het-boek" variant="secondary">
                  Bekijk het boek
                </Button>
              </div>
            </div>
          )}

          <div className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
            <p>
              We plaatsen alleen echte quotes, met naam en toestemming. Geen
              verzonnen sterren, cijfers of voorbeeldnamen. Zo weet je zeker dat
              een ervaring ook echt van iemand is.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
