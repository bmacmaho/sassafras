import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Keep in Touch | Sassafras",
  description: "Join our newsletter and connect with Sassafras.",
}

export default function KeepInTouchPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 md:py-40">
      <h1 
        className="font-bold text-foreground mb-12 text-center"
        style={{ fontSize: "14px", letterSpacing: "0.15em" }}
      >
        KEEP IN TOUCH
      </h1>

      <div className="space-y-16">
        
        {/* Newsletter Section */}
        <section className="text-center">
          <h2 className="text-sm font-bold tracking-widest mb-4">NEWSLETTER</h2>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            Subscribe to our newsletter to receive updates on new issues, call for submissions, and other news. We promise not to spam your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
              required
            />
            <button 
              type="submit"
              className="bg-foreground text-background px-8 py-3 text-sm tracking-widest uppercase hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </section>

        <hr className="border-t border-border opacity-50" />

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-sm font-bold tracking-widest mb-4">CONTACT US</h2>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            For general inquiries, editorial questions, or collaboration proposals, please reach out to us directly via email.
          </p>
          <a 
            href="mailto:contact@sassafrasinitiative.example.com" 
            className="inline-block border border-border px-8 py-3 text-sm tracking-widest uppercase hover:bg-[oklch(0.95_0.005_75_/_0.06)] transition-colors"
          >
            Email Sassafras
          </a>
        </section>

      </div>
    </div>
  )
}
