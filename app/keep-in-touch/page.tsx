import { supportUsFlag } from "@/lib/flags"
import { KeepInTouchClient } from "./keep-in-touch-client"

export default async function KeepInTouchPage() {
  const supportUs = await supportUsFlag()
  return <KeepInTouchClient supportUs={supportUs} />
}
