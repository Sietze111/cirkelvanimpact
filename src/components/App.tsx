import { Route, Routes } from 'react-router-dom'
import { seo } from 'content/seo'
import { cookies } from 'content/legal/cookies'
import { delivery } from 'content/legal/delivery'
import { privacy } from 'content/legal/privacy'
import { terms } from 'content/legal/terms'
import { organizationSchema, websiteSchema } from 'lib/schema'
import JsonLd from 'components/seo/JsonLd'
import Layout from 'components/layout/Layout'
import Home from 'pages/Home'
import BookPage from 'pages/BookPage'
import MethodPage from 'pages/MethodPage'
import ReviewsPage from 'pages/ReviewsPage'
import AboutPage from 'pages/AboutPage'
import TeamsPage from 'pages/TeamsPage'
import ContactPage from 'pages/ContactPage'
import CheckoutPage from 'pages/CheckoutPage'
import ThankYouPage from 'pages/ThankYouPage'
import LegalPage from 'pages/LegalPage'
import NotFoundPage from 'pages/NotFoundPage'

export default function App() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="het-boek" element={<BookPage />} />
          <Route path="de-methode" element={<MethodPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="over-iepe" element={<AboutPage />} />
          <Route path="voor-teams" element={<TeamsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="bestellen" element={<CheckoutPage />} />
          <Route path="bestellen/bedankt" element={<ThankYouPage />} />
          <Route
            path="privacy"
            element={<LegalPage content={privacy} meta={seo.privacy} />}
          />
          <Route
            path="voorwaarden"
            element={<LegalPage content={terms} meta={seo.terms} />}
          />
          <Route
            path="levering-en-retour"
            element={<LegalPage content={delivery} meta={seo.delivery} />}
          />
          <Route
            path="cookies"
            element={<LegalPage content={cookies} meta={seo.cookies} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}
