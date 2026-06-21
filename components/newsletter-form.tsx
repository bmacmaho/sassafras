"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="border border-border p-6">
        <p
          className="font-bold text-foreground"
          style={{ fontSize: "13px", letterSpacing: "0.04em" }}
        >
          You&apos;re on the list.
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          We&apos;ll be in touch when the next issue drops.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (email) setSubmitted(true)
      }}
      className="flex flex-col gap-5"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="newsletter-email"
          className="text-muted-foreground"
          style={{ fontSize: "9px", letterSpacing: "0.18em" }}
        >
          EMAIL ADDRESS
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-border bg-transparent py-2.5 text-sm text-foreground outline-none transition-colors focus:border-foreground placeholder:text-muted-foreground/50"
          placeholder="your@email.com"
        />
      </div>
      <button
        type="submit"
        className="self-start flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-background hover:bg-accent hover:border-accent transition-colors"
        style={{ fontSize: "11px", letterSpacing: "0.18em" }}
      >
        SUBSCRIBE <ArrowRight size={12} />
      </button>
      <p style={{ fontSize: "10px" }} className="text-muted-foreground">
        No spam. Unsubscribe any time.
      </p>
    </form>
  )
}
