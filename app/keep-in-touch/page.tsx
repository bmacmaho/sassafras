import type { Metadata } from "next"
import { Mail, Instagram } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Keep in Touch",
}

export default function KeepInTouchPage() {
  return (
    <div className="min-h-screen bg-[#fcfaf2]">
      {/* ── Support Us ── */}
      <section className="pb-32 min-h-[80vh] px-8 md:px-12 flex flex-col items-center pt-12 md:pt-20">
        <div className="w-full max-w-4xl">
          <p className="text-[11px] tracking-[0.3em] text-[#555] uppercase font-alte-haas mb-6">Support Us</p>
          <h1 className="text-4xl md:text-5xl mb-10">Keep in Touch</h1>

          <div className="border-4 border-dashed border-[#555] rounded-[40px] md:rounded-[60px] p-10 md:p-16 relative">
            <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-[#333] max-w-2xl">
              Sassafras is an independent, volunteer-led initiative. We believe in open access and radical experimentation of form. You can help us sustain this space and fund future issues by getting involved or making a contribution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20 pt-4">
            <div className="flex flex-col items-center text-center">
              <button className="bg-[#9ba9e6] border border-[#333] text-black font-alte-haas uppercase tracking-[0.2em] px-12 py-4 rounded-[40px] text-sm md:text-base hover:scale-105 transition-transform shadow-sm">
                Donate
              </button>
              <div className="mt-6 flex flex-col items-center gap-2">
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="#b2ce63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M12 4v24M6 22l6 6 6-6"/>
                </svg>
                <p className="font-serif italic text-sm md:text-base text-[#a2bd5c] max-w-[200px]">
                  Lets discuss how to set this up.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <button className="bg-[#bdca60] border border-[#333] text-black font-alte-haas uppercase tracking-[0.2em] px-12 py-4 rounded-[40px] text-sm md:text-base hover:scale-105 transition-transform shadow-sm">
                Volunteer
              </button>
              <div className="mt-6 flex flex-col items-center gap-2">
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none" stroke="#b2ce63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M12 4v24M6 22l6 6 6-6"/>
                </svg>
                <p className="font-serif italic text-sm md:text-base text-[#a2bd5c] max-w-[200px]">
                  can maybe lead to a google form
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Get in Touch ── */}
      <section className="px-8 md:px-12 py-16 md:py-24 border-t border-black/[0.05]">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-20">

          {/* Left: Contact Info */}
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-[11px] tracking-[0.4em] text-[#888] uppercase font-alte-haas">
                Connect with us
              </p>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">
                Get in <br /> Touch
              </h2>
            </div>

            <div className="space-y-8 max-w-sm pt-8">
              <div className="flex gap-6 items-start">
                <Mail className="w-5 h-5 text-black/40 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-black/40 font-alte-haas">General Inquiries</p>
                  <a href="mailto:hello@sassafras.art" className="text-lg text-[#222] hover:italic transition-all">hello@sassafras.art</a>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <Instagram className="w-5 h-5 text-black/40 mt-1" />
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest text-black/40 font-alte-haas">Social</p>
                  <a href="https://instagram.com/sassafrasinitiative" className="text-lg text-[#222] hover:italic transition-all">@sassafrasinitiative</a>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <div className="p-8 border border-black/[0.08] bg-black/[0.02]">
                <p className="text-sm italic leading-relaxed text-[#555]">
                  "Sassafras is a space for dialogue, experimentation, and critical engagement. Whether you have a question, a proposal, or just want to say hi, we're here to listen."
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-10 md:p-16 shadow-[20px_20px_0px_#c5d940] border border-black/5">
            <div className="mb-10 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Send a message</h2>
              <p className="text-sm text-[#888] font-alte-haas">Fields marked with * are required.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  )
}
