"use client"

import { artworks } from "@/lib/mock-data"
import { isVideoSrc } from "@/lib/types"
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Share2, ZoomIn } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Plain sharp-cornered play/pause glyphs — lucide-react's Play/Pause icons
// bake rounded corners directly into their path/rect geometry (rx="1" on
// the pause bars, rounded bezier joins on the play triangle), which
// strokeLinecap/strokeLinejoin can't override since there's no stroke.
function PlayIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 21,12 5,21" />
    </svg>
  )
}
function PauseIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="5" y="3" width="5" height="18" />
      <rect x="14" y="3" width="5" height="18" />
    </svg>
  )
}

// Play/pause + draggable scrubber for pieces with an audio track (e.g.
// "Bells of Shandon") — same grey-track/black-fill scrubber as the bells
// player on page 21 of the current issue, sized up for this page's roomier
// layout instead of the book page's tiny printed-placeholder box.
function AudioPlayer({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const seekToClientX = (clientX: number) => {
    const track = trackRef.current
    const audio = audioRef.current
    if (!track || !audio || !isFinite(audio.duration)) return
    const rect = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    audio.currentTime = ratio * audio.duration
    setProgress(ratio)
  }

  return (
    <div className="flex items-center gap-4">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const audio = e.currentTarget
          if (!draggingRef.current && isFinite(audio.duration)) setProgress(audio.currentTime / audio.duration)
        }}
      />
      <button
        type="button"
        onClick={() => {
          const audio = audioRef.current
          if (!audio) return
          if (playing) {
            audio.pause()
            setPlaying(false)
          } else {
            audio.play()
            setPlaying(true)
          }
        }}
        aria-label={playing ? "Pause" : "Play"}
        className="flex items-center justify-center w-11 h-11 flex-shrink-0"
      >
        {playing ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
      </button>
      <div
        ref={trackRef}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onPointerDown={(e) => {
          draggingRef.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          seekToClientX(e.clientX)
        }}
        onPointerMove={(e) => {
          if (!draggingRef.current) return
          seekToClientX(e.clientX)
        }}
        onPointerUp={(e) => {
          draggingRef.current = false
          e.currentTarget.releasePointerCapture(e.pointerId)
        }}
        onKeyDown={(e) => {
          const audio = audioRef.current
          if (!audio || !isFinite(audio.duration)) return
          if (e.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5)
          else if (e.key === "ArrowRight") audio.currentTime = Math.min(audio.duration, audio.currentTime + 5)
          else return
          setProgress(audio.currentTime / audio.duration)
        }}
        className="relative flex-1 h-4 cursor-pointer"
        style={{ touchAction: "none" }}
      >
        <div className="absolute top-1/2 left-0 right-0 h-[2px] rounded-full bg-black/20 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 left-0 h-[2px] rounded-full bg-black -translate-y-1/2 pointer-events-none" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

// Lightweight inline-markdown renderer for text sourced from the print
// docx, so **bold**, *italic*, and ***bold italic*** runs (and the docx's
// footnotes, which had the same emphasis on titles/quotes) survive into the
// site instead of flattening to plain text. Also handles this codebase's
// own `[^n]` footnote-marker convention and bare URLs, all in one pass so
// they can combine within the same line (e.g. an italicized book title
// right before a footnote marker) without fighting over the same text.
const INLINE_RE = /\[\^(\d+)\]|\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|(https?:\/\/[^\s]+)/g

function renderInline(text: string, keyPrefix: string) {
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let i = 0
  let m: RegExpExecArray | null
  INLINE_RE.lastIndex = 0
  while ((m = INLINE_RE.exec(text))) {
    if (m.index > lastIndex) nodes.push(text.slice(lastIndex, m.index))
    const [, footnoteId, boldItalic, bold, italic, url] = m
    if (footnoteId !== undefined) {
      nodes.push(
        <sup key={`${keyPrefix}-fn-${i}`}>
          <a href={`#fn-${footnoteId}`} id={`fnref-${footnoteId}`} className="text-[#FF730F] no-underline hover:underline">
            {footnoteId}
          </a>
        </sup>
      )
    } else if (boldItalic !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-bi-${i}`}><em>{boldItalic}</em></strong>)
    } else if (bold !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-b-${i}`}>{bold}</strong>)
    } else if (italic !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i-${i}`}>{italic}</em>)
    } else if (url !== undefined) {
      const trailingMatch = url.match(/[.,;:!?)\]]+$/)
      const trailing = trailingMatch ? trailingMatch[0] : ""
      const cleanUrl = trailing ? url.slice(0, -trailing.length) : url
      nodes.push(
        <a key={`${keyPrefix}-url-${i}`} href={cleanUrl} target="_blank" rel="noopener noreferrer" className="text-[#FF730F] underline hover:opacity-70">
          {cleanUrl}
        </a>
      )
      if (trailing) nodes.push(trailing)
    }
    lastIndex = INLINE_RE.lastIndex
    i++
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export default function ExploreDetailPage() {
  const { slug } = useParams()
  const artwork = artworks.find((a) => a.slug === slug)

  useEffect(() => {
    if (!artwork) return
    const entry = { image: artwork.image, slug: artwork.slug }
    const stored = sessionStorage.getItem("viewedArtworks")
    const prev: typeof entry[] = stored ? JSON.parse(stored) : []
    const deduped = [entry, ...prev.filter(a => a.slug !== entry.slug)].slice(0, 8)
    sessionStorage.setItem("viewedArtworks", JSON.stringify(deduped))
  }, [artwork?.slug])

  if (!artwork) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fcfaf2] text-[#222] selection:bg-[#f0f0f0] font-sans pb-32">
      {/* ── Main Content ── */}
      <main className="pt-8 px-8 md:px-16 max-w-6xl mx-auto">
        
        {/* ── Header Area ── */}
        <div className=" mt-6">
          <div className="flex flex-col md:flex-row justify-between items-end pb-8">
            <div className="space-y-4">
              <div className="space-y-5">
                <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-[#222] leading-none uppercase text-justify">
                  {artwork.title}
                </h1>
                {artwork.description && <p className="text-justify">{artwork.description}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* ── Visual Section ── */}
          <div className="w-full relative group">
            <div
              className="relative w-full bg-[#FBFAF1] md:p-12"
              style={{ aspectRatio: artwork.aspectRatio }}
            >
              {isVideoSrc(artwork.image) ? (
                <video
                  src={artwork.image}
                  controls
                  playsInline
                  className="absolute inset-0 w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-contain transition-transform duration-700"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>

          {/* ── Deep Text Section ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pt-8">
            {/* Metadata Sidebar */}
            <div className="md:col-span-4 space-y-12">
              <div className="space-y-1">
                <p className="text-xs tracking-widest text-black/40 uppercase font-bold font-alte-haas">Contributor</p>
                <p className="text-xs tracking-widest uppercase text-black/80 font-alte-haas">{artwork.author}</p>
              </div>
              {artwork.tags && artwork.tags.length > 0 && (
                <div className="pt-8 border-t-4 border-[#D5D4CD] space-y-3">
                  <p className="text-xs tracking-widest text-black/40 uppercase font-bold font-alte-haas">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-pink-100 border-2 border-black rounded-full px-2.5 py-0.5 font-alte-haas text-[13px] tracking-[0.08em] text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Main Narrative Text */}
            <div className="md:col-span-8">
              <div className="max-w-2xl">
                {artwork.audio && (
                  <div className="mb-8 bg-blue-100 border-2 border-black px-4 py-3">
                    <AudioPlayer src={artwork.audio} />
                  </div>
                )}
                <div className="font-serif text-lg md:text-xl leading-[1.7] text-[#333] space-y-8 text-justify">
                  {artwork.body
                    ? artwork.body.split(/\n\n+/).map((paragraph, i, arr) => {
                        // `## `-prefixed chunks are section titles — rendered
                        // slightly larger and bold instead of as body copy. Each
                        // gets extra space above it to set sections apart, except
                        // the first (it already sits below the intro paragraph).
                        if (paragraph.startsWith("## ")) {
                          const isFirstHeading = arr.findIndex((p) => p.startsWith("## ")) === i
                          return (
                            <h3 key={i} className={`font-bold text-xl md:text-2xl leading-snug text-[#222] text-left ${isFirstHeading ? "" : "pt-8"}`}>
                              {renderInline(paragraph.slice(3), `h${i}`)}
                            </h3>
                          )
                        }
                        return (
                          <p key={i}>
                            {paragraph.split("\n").map((line, j) => (
                              <span key={j}>
                                {renderInline(line, `p${i}-l${j}`)}
                                {j < paragraph.split("\n").length - 1 && <br />}
                              </span>
                            ))}
                          </p>
                        )
                      })
                    : !artwork.description && (
                        <p className="text-black/40 italic">Full piece coming soon.</p>
                      )}
                  {artwork.footnotes && artwork.footnotes.length > 0 && (
                    <div className="pt-4">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-black/60 font-bold mb-4">
                        Notes
                      </h4>
                      <ol className="text-sm leading-relaxed text-[#555] space-y-2 list-none">
                        {artwork.footnotes.map((note, i) => (
                          <li key={i} id={`fn-${i + 1}`}>
                            {i + 1}. {renderInline(note, `fn-${i + 1}`)}{" "}
                            <a href={`#fnref-${i + 1}`} className="text-[#FF730F] no-underline hover:underline" aria-label="Back to text">
                              ↩
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {artwork.bibliography && artwork.bibliography.length > 0 && (
                    <div className="pt-4">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-black/60 font-bold mb-4">
                        Bibliography
                      </h4>
                      <div className="text-sm leading-relaxed text-[#555] space-y-2">
                        {artwork.bibliography.map((entry, i) => (
                          <p key={i}>{renderInline(entry, `bib-${i}`)}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Works Section ── */}
        <section className="mt-32 border-t-4 border-[#D5D4CD] pt-16">
            <h2 className="text-lg tracking-[0.15em] uppercase text-[#FF730F] mb-12 font-alte-haas">More from this issue</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {artworks.filter(a => a.issue === artwork.issue && a.id !== artwork.id).slice(0, 4).map(related => (
                    <Link key={related.id} href={`/explore/${related.slug}`} className="group space-y-3">
                        <div className="aspect-[4/5] relative overflow-hidden bg-[#FBFAF1] border border-black/5">
                            {isVideoSrc(related.image) ? (
                                <video
                                    src={related.image}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <Image
                                    src={related.image}
                                    alt={related.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    unoptimized
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-[10px] tracking-widest text-black/40 uppercase font-alte-haas">{related.author}</p>
                            <p className="text-xs tracking-[0.1em] uppercase font-bold font-alte-haas line-clamp-2">{related.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
      </main>
    </div>
  )
}
