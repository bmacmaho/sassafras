import { notFound } from "next/navigation"
import { submissionsFlag } from "@/lib/flags"
import { SubmissionsClient } from "./submissions-client"

export default async function SubmissionsPage() {
  if (!(await submissionsFlag())) notFound()
  return <SubmissionsClient />
}
