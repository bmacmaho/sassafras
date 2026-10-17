import { notFound } from "next/navigation"
import { faqFlag } from "@/lib/flags"
import { FaqClient } from "./faq-client"

export default async function FaqPage() {
  if (!(await faqFlag())) notFound()
  return <FaqClient />
}
