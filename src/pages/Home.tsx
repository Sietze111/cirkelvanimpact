import { seo } from 'content/seo'
import Seo from 'components/seo/Seo'
import Hero from 'components/sections/Hero'
import BookBlock from 'components/sections/BookBlock'
import WhyBook from 'components/sections/WhyBook'
import ForWhom from 'components/sections/ForWhom'
import WhatYouGet from 'components/sections/WhatYouGet'
import MethodStrip from 'components/sections/MethodStrip'
import ReviewsTeaser from 'components/sections/ReviewsTeaser'
import TeamCta from 'components/sections/TeamCta'
import AboutIepe from 'components/sections/AboutIepe'
import FinalCta from 'components/sections/FinalCta'

export default function Home() {
  return (
    <>
      <Seo {...seo.home} />
      <Hero />
      <BookBlock />
      <WhyBook />
      <ForWhom />
      <WhatYouGet />
      <MethodStrip />
      <ReviewsTeaser />
      <TeamCta />
      <AboutIepe />
      <FinalCta />
    </>
  )
}
