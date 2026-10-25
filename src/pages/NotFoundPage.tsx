import { seo } from 'content/seo'
import Seo from 'components/seo/Seo'
import Button from 'components/ui/Button'
import CircleMotif from 'components/ui/CircleMotif'
import Container from 'components/ui/Container'
import Eyebrow from 'components/ui/Eyebrow'
import Section from 'components/ui/Section'

export default function NotFoundPage() {
  return (
    <>
      <Seo {...seo.notFound} />

      <Section tone="cream" size="lg" className="relative overflow-hidden">
        <CircleMotif className="-right-56 -top-56 size-[38rem] opacity-70" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>404</Eyebrow>
            <h1 className="mt-4 text-5xl leading-[1.02] sm:text-6xl">
              Deze pagina is er niet.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-500">
              Misschien is de link verouderd of staat er een typefout in het
              adres. Ga terug naar de homepage of bekijk het boek.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/">Naar de homepage</Button>
              <Button to="/het-boek" variant="secondary">
                Bekijk het boek
              </Button>
            </div>
            <p className="mt-6 text-sm text-ink-500">
              Zoek je iets specifieks?{' '}
              <a
                href="mailto:info@cirkelvanimpact.nl"
                className="font-medium text-coral-700 underline decoration-coral-300 underline-offset-4 hover:decoration-coral-700"
              >
                Mail Iepe
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
