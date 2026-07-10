import type { Metadata } from "next"
import { LegalPage } from "../../components/layout/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | Voryent Solutions",
  description: "Privacy Policy for Voryent Solutions.",
  alternates: {
    canonical: "https://voryentsolutions.com/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="October 24, 2023">
      <h2>Introduction</h2>
      <p>
        At Voryent Solutions, we respect your privacy and are committed to protecting your personal data. 
        This privacy policy will inform you as to how we look after your personal data when you visit our website 
        and tell you about your privacy rights and how the law protects you.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
      </p>
      <ul>
        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
        <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
      </ul>

      <h2>How We Use Data</h2>
      <p>
        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
      </p>
      <ul>
        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
        <li>Where we need to comply with a legal obligation.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
        If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. 
        For more information about the cookies we use, please see our <a href="/cookies">Cookie Policy</a>.
      </p>

      <h2>Third-party Services</h2>
      <p>
        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. 
        This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, 
        so long as those parties agree to keep this information confidential.
      </p>

      <h2>Data Retention</h2>
      <p>
        We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, 
        including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.
      </p>

      <h2>Security</h2>
      <p>
        We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. 
        In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
      </p>

      <h2>Your Rights</h2>
      <p>
        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
      </p>
      <ul>
        <li>Request access to your personal data.</li>
        <li>Request correction of your personal data.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to processing of your personal data.</li>
        <li>Request restriction of processing your personal data.</li>
        <li>Request transfer of your personal data.</li>
        <li>Right to withdraw consent.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        If you have any questions about this privacy policy or our privacy practices, please contact us at: <a href="mailto:privacy@voryentsolutions.com">privacy@voryentsolutions.com</a>.
      </p>
    </LegalPage>
  )
}
