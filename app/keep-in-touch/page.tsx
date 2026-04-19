import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Keep in Touch | Sassafras",
  description: "Join our newsletter and connect with Sassafras.",
}

export default function KeepInTouchPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* ── Masthead ── */}
      <section className="px-8 md:px-12 py-12 md:py-20 border-b border-white/[0.05]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="space-y-6">
            <p className="text-[11px] tracking-[0.3em] text-[#ceda9a] uppercase font-sans">
              Connect
            </p>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white leading-none">
              Keep in Touch
            </h1>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-lg leading-[1.6] text-white/90">
              Join the conversation and stay updated on the latest issues.
            </p>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="px-8 md:px-12 py-16 md:py-24">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-20">
          
          {/* Newsletter Section */}
          <div className="space-y-12">
            <div className="space-y-8">
               <h2 className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-sans flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-white/10" /> Newsletter
               </h2>
               <div className="space-y-6">
                 <p className="text-[14px] leading-relaxed text-white/70 max-w-md">
                   Subscribe to our newsletter to receive updates on new issues, call for submissions, and other news. We promise not to spam your inbox.
                 </p>
                 <form className="flex flex-col gap-4 max-w-md">
                   <input 
                     type="email" 
                     placeholder="EMAIL ADDRESS" 
                     className="bg-white/[0.03] border border-white/10 px-6 py-4 text-[11px] tracking-wider text-white focus:outline-none focus:border-[#ceda9a] transition-colors font-sans uppercase"
                     required
                   />
                   <button 
                     type="submit"
                     className="bg-white text-black px-8 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#ceda9a] transition-all duration-500"
                   >
                     Subscribe
                   </button>
                 </form>
               </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-12">
            <div className="space-y-8">
               <h2 className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-sans flex items-center gap-4">
                 <span className="w-8 h-[1px] bg-white/10" /> Direct Contact
               </h2>
               <div className="space-y-8">
                 <p className="text-[14px] leading-relaxed text-white/70 max-w-md">
                   For general inquiries, editorial questions, or collaboration proposals, please reach out to us directly via email.
                 </p>
                 <div className="pt-4">
                    <a 
                      href="mailto:contact@sassafrasinitiative.example.com" 
                      className="group flex items-center justify-between border border-white/10 px-8 py-6 hover:bg-white hover:text-black transition-all duration-500"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em]">Email Sassafras</span>
                        <span className="text-[9px] opacity-40 italic font-sans">contact@sassafrasinitiative.example.com</span>
                      </div>
                      <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                    </a>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
