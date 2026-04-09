"use client"

import { useState } from "react"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="flex flex-col gap-3 rounded-sm border border-border bg-secondary/50 p-8">
        <h3 className="font-serif text-xl text-foreground">
          Thank you for reaching out.
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          We have received your message and will respond as soon as we can.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          className="border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50"
          placeholder="your@email.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="subject"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Subject
        </label>
        <select
          id="subject"
          required
          className="border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
        >
          <option value="">Select a topic</option>
          <option value="submission">Submission inquiry</option>
          <option value="collaboration">Collaboration</option>
          <option value="press">Press & media</option>
          <option value="general">General question</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="message"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          required
          className="resize-none border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50"
          placeholder="Tell us what you are thinking about..."
        />
      </div>

      <button
        type="submit"
        className="mt-2 self-start border border-foreground bg-foreground px-6 py-2.5 text-xs uppercase tracking-wider text-background transition-colors hover:bg-accent hover:border-accent"
      >
        Send message
      </button>
    </form>
  )
}
