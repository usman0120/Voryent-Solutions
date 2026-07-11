import { FaqContent } from "../../components/faq/faq-content"
import type { FaqItem } from "../../components/faq/faq-content"
import { getFaqs } from "../../lib/firebase/services"
import { getAllContent } from "../../lib/content"

export default async function FaqPage() {
  const content = await getFaqs().catch(() => [])
  
  // Sort by order and format
  const dbFaqs: FaqItem[] = content
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    .map((c: any) => ({
      category: c.category || "General",
      question: c.question || "",
      answer: c.answer || c.content || "",
    }))

  let faqs = dbFaqs;

  if (faqs.length === 0) {
    const staticContent = getAllContent("faq")
    faqs = staticContent
      .sort((a, b) => (a["order"] as number) - (b["order"] as number))
      .map((c) => ({
        category: c["category"] as string,
        question: c["question"] as string,
        answer: c.content as string,
      }))
  }

  return <FaqContent faqs={faqs} />
}
