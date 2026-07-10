import type { Metadata } from "next"
import { LegalPage } from "../../components/layout/legal-page"

export const metadata: Metadata = {
  title: "Terms and Conditions | Voryent Solutions",
  description: "Terms and Conditions for Voryent Solutions.",
  alternates: {
    canonical: "https://voryentsolutions.com/terms",
  },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" lastUpdated="October 24, 2023">
      <h2>Acceptance</h2>
      <p>
        By accessing or using the Voryent Solutions website, you agree to be bound by these Terms and Conditions 
        and all applicable laws and regulations. If you do not agree with any part of these terms, you may not access the service.
      </p>

      <h2>Services</h2>
      <p>
        Voryent Solutions provides software engineering, AI integration, and technology consulting services. 
        The specific terms of any services provided to clients will be governed by a separate Master Services Agreement (MSA) 
        and Statement of Work (SOW).
      </p>

      <h2>Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are and will remain the exclusive property of 
        Voryent Solutions and its licensors. The Service is protected by copyright, trademark, and other laws of both the 
        United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product 
        or service without the prior written consent of Voryent Solutions.
      </p>

      <h2>Payments</h2>
      <p>
        For clients engaging our services, payment terms will be specified in the applicable Statement of Work or invoice. 
        Unless otherwise agreed in writing, all fees are non-refundable. We reserve the right to suspend or terminate services 
        for non-payment.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        In no event shall Voryent Solutions, nor its directors, employees, partners, agents, suppliers, or affiliates, 
        be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
        loss of profits, data, use, goodwill, or other intangible losses, resulting from:
      </p>
      <ul>
        <li>Your access to or use of or inability to access or use the Service;</li>
        <li>Any conduct or content of any third party on the Service;</li>
        <li>Any content obtained from the Service; and</li>
        <li>Unauthorized access, use or alteration of your transmissions or content.</li>
      </ul>

      <h2>Termination</h2>
      <p>
        We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
        including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms shall be governed and construed in accordance with the laws, without regard to its conflict of law provisions. 
        Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about these Terms, please contact us at: <a href="mailto:legal@voryentsolutions.com">legal@voryentsolutions.com</a>.
      </p>
    </LegalPage>
  )
}
