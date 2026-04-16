"use client"

type PlantVariant = "sassafras" | "fern" | "daisy" | "lily" | "bell" | "star"

export function BloomingFlower({ className, variant = "sassafras" }: { className?: string; variant?: PlantVariant }) {
  const renderPlant = () => {
    switch (variant) {
      case "fern":
        return (
          <>
            <path 
              d="M50 95 Q50 40 50 5" 
              stroke="currentColor" 
              strokeWidth="0.4" 
              className="opacity-20 transition-all duration-1000 group-hover:opacity-50" 
            />
            {[...Array(18)].map((_, i) => (
              <g key={i} style={{ transformOrigin: '50% 95%' }}>
                <path
                  d={`M50 ${85 - i * 4.5} Q${i % 2 === 0 ? 90 : 10} ${75 - i * 4.5} 50 ${65 - i * 4.5}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="transition-all duration-[1.4s] ease-[cubic-bezier(0.23,1,0.32,1)] origin-center scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-80"
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
                <circle 
                  cx={i % 2 === 0 ? 82 : 18} cy={72 - i * 4.5} r="0.6"
                  fill="currentColor"
                  className="transition-all duration-700 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  style={{ transformOrigin: 'center', transitionDelay: `${i * 50 + 600}ms` }}
                />
              </g>
            ))}
          </>
        )
      case "daisy":
        return (
          <>
            <circle cx="50" cy="50" r="4" fill="currentColor" className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            {[...Array(16)].map((_, i) => (
              <path
                key={`outer-${i}`}
                d="M50 50 Q58 20 50 5 Q42 20 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100"
                style={{ transform: `rotate(${i * 22.5}deg)`, transitionDelay: `${i * 30}ms` }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <path
                key={`inner-${i}`}
                d="M50 50 Q54 35 50 25 Q46 35 50 50"
                fill="currentColor"
                className="transition-all duration-1000 ease-out origin-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60"
                style={{ transform: `rotate(${i * 45 + 15}deg)`, transitionDelay: `${i * 80 + 400}ms` }}
              />
            ))}
          </>
        )
      case "lily":
        return (
          <>
            {[...Array(6)].map((_, i) => (
              <path
                key={`layer1-${i}`}
                d="M50 50 C80 15 90 5 50 0 C10 5 20 15 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.3"
                className="transition-all duration-[1.8s] ease-[cubic-bezier(0.19,1,0.22,1)] origin-center scale-0 opacity-0 group-hover:scale-105 group-hover:opacity-90"
                style={{ transform: `rotate(${i * 60}deg)`, transitionDelay: `${i * 80}ms` }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <path
                key={`layer2-${i}`}
                d="M50 50 C70 30 75 25 50 15 C25 25 30 30 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="transition-all duration-[1.2s] ease-out origin-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50"
                style={{ transform: `rotate(${i * 60 + 30}deg)`, transitionDelay: `${i * 80 + 500}ms` }}
              />
            ))}
            {/* Burst center like 'star' */}
            {[...Array(6)].map((_, i) => (
              <g key={`center-${i}`} style={{ transformOrigin: '50% 50%', transform: `rotate(${i * 60}deg)` }}>
                <line
                  x1="50" y1="50" x2="50" y2="25"
                  stroke="currentColor"
                  strokeWidth="0.15"
                  className="transition-all duration-1000 ease-out origin-bottom scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                  style={{ transitionDelay: '800ms' }}
                />
                <circle 
                  cx="50" cy="25" r="0.8" 
                  fill="currentColor"
                  className="transition-all duration-500 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  style={{ transitionDelay: '1400ms' }}
                />
              </g>
            ))}
          </>
        )
      case "star":
        return (
          <>
             {[...Array(12)].map((_, i) => (
               <g key={i} style={{ transformOrigin: '50% 50%', transform: `rotate(${i * 30}deg)` }}>
                  <path
                    d="M50 50 L50 2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    className="transition-all duration-[0.8s] ease-out origin-bottom scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-100"
                    style={{ transitionDelay: `${i * 40}ms` }}
                  />
                  <circle 
                    cx="50" cy="2" r="0.8" 
                    fill="currentColor"
                    className="transition-all duration-500 ease-out scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    style={{ transitionDelay: `${i * 40 + 600}ms` }}
                   />
               </g>
            ))}
            {[...Array(6)].map((_, i) => (
               <path
                key={`inner-${i}`}
                d="M50 50 L50 30"
                stroke="currentColor"
                strokeWidth="0.4"
                className="transition-all duration-500 ease-out origin-bottom scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-60"
                style={{ transformOrigin: '50% 50%', transform: `rotate(${i * 60 + 15}deg)`, transitionDelay: '300ms' }}
              />
            ))}
          </>
        )
      case "bell":
        return (
          <g style={{ transform: 'translateY(-10px)' }}>
            <path d="M50 15 Q75 40 50 85 Q25 40 50 15" fill="none" stroke="currentColor" strokeWidth="0.4" className="transition-all duration-[2s] ease-[cubic-bezier(0.23,1,0.32,1)] origin-top scale-0 opacity-0 group-hover:scale-105 group-hover:opacity-80" />
            <path d="M50 15 Q90 50 50 100 Q10 50 50 15" fill="none" stroke="currentColor" strokeWidth="0.15" className="transition-all duration-[2.5s] ease-[cubic-bezier(0.23,1,0.32,1)] origin-top scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-40" style={{ transitionDelay: '200ms' }} />
            
            {/* Clapper detail */}
            {[...Array(3)].map((_, i) => (
              <g key={i} style={{ transformOrigin: '50% 15%', transform: `rotate(${(i - 1) * 15}deg)` }}>
                <line 
                  x1="50" y1="15" x2="50" y2="60"
                  stroke="currentColor"
                  strokeWidth="0.1"
                  className="transition-all duration-1000 ease-out origin-top scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-50"
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                />
                <circle 
                  cx="50" cy="62" r="0.8"
                  fill="currentColor"
                  className="transition-all duration-1000 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-80"
                  style={{ transitionDelay: `${1000 + i * 100}ms` }}
                />
              </g>
            ))}
          </g>
        )
      default: // sassafras
        return (
          <>
            {/* Intricate vein structure */}
            {[0, 120, 240].map((angle, j) => (
               <g key={`veins-${j}`} style={{ transformOrigin: '50% 50%', transform: `rotate(${angle}deg)` }}>
                 <path 
                    d="M50 50 L50 5" 
                    stroke="currentColor" 
                    strokeWidth="0.15" 
                    className="transition-all duration-1000 origin-bottom scale-y-0 opacity-0 group-hover:scale-y-100 group-hover:opacity-60" 
                    style={{ transitionDelay: '400ms' }}
                 />
                 {[...Array(4)].map((_, i) => (
                   <path
                    key={i}
                    d={`M50 ${40 - i * 8} Q${i % 2 === 0 ? 65 : 35} ${35 - i * 8} ${i % 2 === 0 ? 75 : 25} ${30 - i * 8}`}
                    stroke="currentColor"
                    strokeWidth="0.1"
                    className="transition-all duration-700 origin-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-40"
                    style={{ transitionDelay: `${800 + i * 100}ms` }}
                   />
                 ))}
               </g>
            ))}
            {/* Primary Leaves */}
            {[0, 120, 240].map((angle, i) => (
              <g key={i} style={{ transformOrigin: '50% 50%', transform: `rotate(${angle}deg)` }}>
                <path
                  d="M50 50 C70 25 85 20 50 -5 C15 20 30 25 50 50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="transition-all duration-[1.6s] ease-[cubic-bezier(0.17,0.67,0.83,0.67)] origin-center scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100"
                  style={{ transitionDelay: `${i * 120}ms` }}
                />
                <circle 
                  cx="50" cy="-5" r="1.2"
                  fill="currentColor"
                  className="transition-all duration-700 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  style={{ transitionDelay: `${i * 120 + 1200}ms` }}
                />
              </g>
            ))}
            {/* Supporting Filigree */}
            {[60, 180, 300].map((angle, i) => (
              <path
                key={`filigree-${i}`}
                d="M50 50 Q65 35 50 20 Q35 35 50 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.2"
                className="transition-all duration-[1.2s] ease-out origin-center scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-50"
                style={{ transform: `rotate(${angle}deg)`, transitionDelay: `${i * 150 + 600}ms` }}
              />
            ))}
          </>
        )
    }
  }

  return (
    <div className={`pointer-events-none transition-all duration-1000 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 flex items-center justify-center ${className}`}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white/90 transition-transform duration-1000 overflow-visible"
        style={{ overflow: 'visible' }}
      >
        <g className="transition-all duration-[2.5s] ease-in-out group-hover:translate-y-[-4px]">
          {renderPlant()}
        </g>
      </svg>
    </div>
  )
}
