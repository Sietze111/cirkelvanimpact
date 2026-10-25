import { homeReviews, reviewsContent } from 'content/reviews'
import Button from 'components/ui/Button'
import Container from 'components/ui/Container'
import Section from 'components/ui/Section'
import SectionHeading from 'components/ui/SectionHeading'

export default function ReviewsTeaser() {
  const items = homeReviews(3)
  if (items.length === 0) return null

  return (
    <Section tone="cream" ariaLabel="Reviews">
      <Container>
        <SectionHeading
          eyebrow={reviewsContent.eyebrow}
          title={reviewsContent.homeTitle}
          align="center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((review) => (
            <figure
              key={review.id}
              className="flex h-full flex-col rounded-3xl border border-ink-900/10 bg-white p-6"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl leading-none text-coral-300"
              >
                “
              </span>
              <blockquote className="mt-2 flex-1 text-base leading-relaxed text-ink-700">
                {review.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-ink-900/10 pt-4 text-sm">
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

        <div className="mt-8 text-center">
          <Button to={reviewsContent.homeLink.to} variant="secondary">
            {reviewsContent.homeLink.label}
          </Button>
        </div>
      </Container>
    </Section>
  )
}
