"use client"

import { useForm, ValidationError } from "@formspree/react"

export function ContactForm() {
  // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree ID
  const [state, handleSubmit] = useForm("mnnjlvno")

  if (state.succeeded) {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="name"
          className="text-xs uppercase tracking-wider text-muted-foreground"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50 font-sans"
          placeholder="Your name"
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
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
          name="email"
          type="email"
          required
          className="border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50 font-sans"
          placeholder="your@email.com"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
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
          name="subject"
          required
          className="border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent font-sans"
        >
          <option value="">Select a topic</option>
          <option value="submission">Submission inquiry</option>
          <option value="collaboration">Collaboration</option>
          <option value="press">Press & media</option>
          <option value="general">General question</option>
        </select>
        <ValidationError prefix="Subject" field="subject" errors={state.errors} />
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
          name="message"
          rows={6}
          required
          className="resize-none border-b border-border bg-transparent px-0 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/50 font-sans"
          placeholder="Tell us what you are thinking about..."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-4 self-start border-2 border-black bg-transparent px-10 py-4 rounded-full text-xs uppercase tracking-widest text-black font-bold transition-all hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  )
}

