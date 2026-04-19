import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { Mail, Instagram, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact | Sassafras",
  description: "Get in touch with the Sassafras Initiative team.",
}

export default function ContactPage() {
  return (
    <div className="pt-32 min-h-screen bg-[#fcfaf2]">
      <section className="px-8 md:px-12 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-[11px] tracking-[0.4em] text-[#888] uppercase font-sans">
                  Connect with us
                </p>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#222] leading-none">
                  Get in <br /> Touch
                </h1>
              </div>

              <div className="space-y-8 max-w-sm pt-8">
                <div className="flex gap-6 items-start">
                  <Mail className="w-5 h-5 text-black/40 mt-1" />
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-black/40">General Inquiries</p>
                    <a href="mailto:hello@sassafras.art" className="text-lg hover:italic transition-all">hello@sassafras.art</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <Instagram className="w-5 h-5 text-black/40 mt-1" />
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-black/40">Social</p>
                    <a href="https://instagram.com/sassafrasinitiative" className="text-lg hover:italic transition-all">@sassafrasinitiative</a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <MessageSquare className="w-5 h-5 text-black/40 mt-1" />
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-black/40">Support</p>
                    <a href="/contact" className="text-lg hover:italic transition-all">Support & Press</a>
                  </div>
                </div>
              </div>

              <div className="pt-10">
                <div className="p-8 border border-black/[0.08] rounded-none bg-black/[0.02]">
                  <p className="text-sm italic leading-relaxed text-[#555]">
                    "Sassafras is a space for dialogue, experimentation, and critical engagement. Whether you have a question, a proposal, or just want to say hi, we're here to listen."
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-transparent p-10 md:p-16 shadow-[20px_20px_0px_#c5d940] border border-black/10">
              <div className="mb-10 space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Send a message</h2>
                <p className="text-sm text-[#888]">Fields marked with * are required.</p>
              </div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
