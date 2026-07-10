import type { Metadata } from "next"
import { LegalPage } from "../../components/layout/legal-page"

export const metadata: Metadata = {
  title: "Cookie Policy | Voryent Solutions",
  description: "Cookie Policy for Voryent Solutions.",
  alternates: {
    canonical: "https://voryentsolutions.com/cookies",
  },
}

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="October 24, 2023">
      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
        They are widely used by website owners to make their websites work, or to work more efficiently, as well as 
        to provide reporting information.
      </p>

      <h2>Types of Cookies We Use</h2>
      <p>
        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons 
        in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. 
        Other cookies also enable us to track and target the interests of our users to enhance the experience on our website.
      </p>

      <h2>Essential Cookies</h2>
      <p>
        These cookies are strictly necessary to provide you with services available through our website and to use some 
        of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website 
        to you, you cannot refuse them. You can block or delete them by changing your browser settings, but the site may not 
        function correctly.
      </p>

      <h2>Analytics Cookies</h2>
      <p>
        These cookies collect information that is used either in aggregate form to help us understand how our website is being 
        used or how effective our marketing campaigns are, or to help us customize our website for you. We use tools like 
        Google Analytics to help analyze how users interact with the site.
      </p>

      <h2>Preference Cookies</h2>
      <p>
        Preference cookies enable a website to remember information that changes the way the website behaves or looks, like 
        your preferred language, theme (light or dark mode), or the region that you are in. 
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking 
        on the appropriate opt-out links provided in our cookie banner or by modifying your web browser controls to accept or 
        refuse cookies. 
      </p>
      <p>
        If you choose to reject cookies, you may still use our website though your access to some functionality and areas of 
        our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from 
        browser-to-browser, you should visit your browser's help menu for more information.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about our use of cookies or other technologies, please email us at: <a href="mailto:privacy@voryentsolutions.com">privacy@voryentsolutions.com</a>.
      </p>
    </LegalPage>
  )
}
