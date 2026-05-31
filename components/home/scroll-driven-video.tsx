"use client"

export function ScrollDrivenVideo() {
  return (
    <section className="relative w-full h-screen bg-[#b9cdef] flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-start gap-0">
        <div className="-ml-[18px] flex items-center gap-0 text-white text-xl tracking-widest uppercase font-alte-haas">
          <img src="/Little leaves.png" alt="" aria-hidden="true" className="h-12 w-auto opacity-90 mt-2" />
          <span className="font-medium -ml-5 text-xl leading-none self-center mt-1">WELCOME TO SASSAFRAS</span>
        </div>
        <div className="-mt-[13px] relative w-[85vw] md:w-[40vw] max-w-[450px] aspect-[3/4] border-[4px] md:border-[6px] border-white overflow-hidden shadow-2xl">
          <video
            src="/IMG_4255.MOV"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
