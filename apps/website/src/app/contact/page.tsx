import { getSocialSettings } from "@/lib/firebase/services"
import ContactClient from "./contact-client"

export const metadata = {
  title: "Contact Us | Voryent Solutions",
  description: "Get in touch with Voryent Solutions. We're here to help you with your next big project.",
}

export default async function ContactPage() {
  const socialSettings = await getSocialSettings().catch(() => null)
  return <ContactClient socialSettings={socialSettings} />
}
