export const FEATURE_FLAGS = {
  submissions: process.env.NEXT_PUBLIC_SUBMISSIONS_ENABLED === "true",
  allIssues: process.env.NEXT_PUBLIC_ALL_ISSUES_ENABLED === "true",
  supportUs: process.env.NEXT_PUBLIC_SUPPORT_US_ENABLED === "true",
  substack: process.env.NEXT_PUBLIC_SUBSTACK_ENABLED === "true",
}
