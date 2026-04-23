import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Keep in Touch | Sassafras",
  description: "Get in touch with the Sassafras team and support our mission.",
}

export default function KeepInTouchPage() {
  return (
    <div className="pt-44 min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans overflow-x-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 py-12">
        
        {/* ── Masthead ── */}
        <header className="relative z-50 mb-20 md:mb-32">
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#222] leading-[0.8] uppercase">
              Keep in Touch
            </h1>
            <div className="flex flex-col justify-between items-center md:items-start font-sans text-lg md:text-xl font-medium tracking-tight py-1">
              <span className="text-black/40 leading-none">Collaborations</span>
              <span className="text-black/20 leading-none">Contact & Support</span>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-start gap-12 border-t border-black/10 pt-12">
            <div className="max-w-xl">
              <p className="text-2xl md:text-3xl font-serif italic text-[#222] leading-snug">
                Sassafras is a space for dialogue, experimentation, and critical engagement.
              </p>
            </div>
            <div className="max-w-md">
              <p className="text-sm md:text-base leading-relaxed text-[#555] font-sans">
                Reach out to collaborate on future issues, inquire about contributions, or support our mission of redefining academic discourse.
              </p>
            </div>
          </div>
        </header>

        {/* ── Contact Grid ── */}
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-24">
          
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-12">
              <div className="group flex flex-col gap-3 border-l-2 border-black/5 pl-6 hover:border-black transition-colors duration-500">
                <span className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold">Email Inquiry</span>
                <a 
                  href="mailto:sassafrasinitiative@gmail.com" 
                  className="text-xl md:text-2xl font-serif italic hover:translate-x-2 transition-transform inline-block break-all"
                >
                  sassafrasinitiative@gmail.com
                </a>
              </div>

              <div className="group flex flex-col gap-3 border-l-2 border-black/5 pl-6 hover:border-black transition-colors duration-500">
                <span className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-bold">Instagram</span>
                <a 
                  href="https://instagram.com/sassafrasinitiative" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl font-serif italic hover:translate-x-2 transition-transform inline-block"
                >
                  @sassafrasinitiative
                </a>
              </div>
            </div>

            <section className="pt-16 border-t border-black/5">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#222] mb-6">Support Us</h2>
              <p className="text-sm md:text-base leading-relaxed text-[#555] font-serif italic mb-10">
                Sassafras is an independent, volunteer-led initiative. We believe in open access and radical experimentation of form.
              </p>
              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:sassafrasinitiative@gmail.com?subject=Donation%20Inquiry"
                  className="group flex items-center justify-between border-2 border-black bg-black text-white px-8 py-5 hover:bg-transparent hover:text-black transition-all duration-500"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Donate</span>
                  <div className="w-1.5 h-1.5 bg-white group-hover:bg-black rounded-full" />
                </a>
                <a 
                  href="mailto:sassafrasinitiative@gmail.com?subject=Volunteer%20Inquiry"
                  className="group flex items-center justify-between border-2 border-black bg-transparent text-black px-8 py-5 hover:bg-black hover:text-white transition-all duration-500"
                >
                  <span className="text-xs font-bold uppercase tracking-widest">Volunteer</span>
                  <div className="w-1.5 h-1.5 bg-black group-hover:bg-white rounded-full" />
                </a>
              </div>
            </section>
          </div>

          {/* Message Form (Right) */}
          <div className="lg:col-span-7">
            <div className="bg-black/[0.01] border border-black/10 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.05] pointer-events-none text-8xl font-black select-none uppercase tracking-tighter">
                MSG
              </div>
              <div className="relative z-10">
                <h3 className="text-xs tracking-[0.3em] text-black/40 font-bold uppercase mb-12">Send a Direct Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
