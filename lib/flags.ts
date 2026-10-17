import { flag } from "flags/next"
import { vercelAdapter } from "@flags-sdk/vercel"

export const faqFlag = flag<boolean>({
  key: "faq",
  description: "show faq",
  adapter: vercelAdapter<boolean, unknown>(),
})

export const submissionsFlag = flag<boolean>({
  key: "submissions",
  description: "show submissions page and nav link",
  adapter: vercelAdapter<boolean, unknown>(),
})

export const allIssuesFlag = flag<boolean>({
  key: "allIssues",
  description: "show the all-issues archive page and nav link",
  adapter: vercelAdapter<boolean, unknown>(),
})

export const supportUsFlag = flag<boolean>({
  key: "supportUs",
  description: "show donate/volunteer sections in footer and keep-in-touch page",
  adapter: vercelAdapter<boolean, unknown>(),
})

export const substackFlag = flag<boolean>({
  key: "substack",
  description: "show substack link in footer",
  adapter: vercelAdapter<boolean, unknown>(),
})
