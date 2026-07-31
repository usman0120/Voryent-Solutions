import { FaqContent } from "../../components/faq/faq-content"
import { defaultFaqs } from "../../lib/data/faqs"

export default function FaqPage() {
  return <FaqContent faqs={defaultFaqs} />
}
