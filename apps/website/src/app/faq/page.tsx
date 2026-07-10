import { FaqContent } from "../../components/faq/faq-content"
import type { FaqItem } from "../../components/faq/faq-content"
import { getAllContent } from "../../lib/content"

export default async function FaqPage() {
  const content = getAllContent("faq")
  
  // Sort by order and format
  const faqs: FaqItem[] = content
    .sort((a, b) => (a["order"] as number) - (b["order"] as number))
    .map((c) => ({
      category: c["category"] as string,
      question: c["question"] as string,
      answer: c.content as string,
    }))

  return <FaqContent faqs={faqs} />
}
