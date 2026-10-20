import { notFound } from "next/navigation"
import { allIssuesFlag } from "@/lib/flags"
import { IssuesClient } from "./issues-client"

export default async function IssuesPage() {
  if (!(await allIssuesFlag())) notFound()
  return <IssuesClient />
}
