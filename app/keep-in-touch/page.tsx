import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Support Us | Sassafras",
  description: "Get involved and volunteer with Sassafras.",
}

export default function KeepInTouchPage() {
  return (
    <div className="pt-24 pb-32 min-h-[80vh] px-8 md:px-12 flex flex-col items-center">
      
      <div className="w-full max-w-4xl pt-10">
        <h1 className="text-4xl md:text-5xl font-sans mb-10">Support Us</h1>
        
        {/* Dashed hand-drawn feeling container */}
        <div className="border-4 border-dashed border-[#555] rounded-[40px] md:rounded-[60px] p-10 md:p-16 relative">
          <p className="font-serif italic text-xl md:text-2xl leading-relaxed text-[#333] max-w-2xl">
            Sassafras is an independent, volunteer-led initiative. We believe in open access and radical experimentation of form. You can help us sustain this space and fund future issues by getting involved or making a contribution.
          </p>
        </div>

        {/* Buttons section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20 pt-4">
          
          {/* Donate Container */}
          <div className="flex flex-col items-center text-center">
            <button className="bg-transparent border border-black text-black font-sans uppercase tracking-[0.2em] px-12 py-4 rounded-[40px] text-sm md:text-base hover:bg-black hover:text-white transition-all shadow-sm">
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

          {/* Volunteer Container */}
          <div className="flex flex-col items-center text-center">
            <button className="bg-transparent border border-black text-black font-sans uppercase tracking-[0.2em] px-12 py-4 rounded-[40px] text-sm md:text-base hover:bg-black hover:text-white transition-all shadow-sm">
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
    </div>
  )
}
