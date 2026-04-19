"use client"

import type { Article } from "@/lib/types"
import { Play, Pause, Volume2 } from "lucide-react"
import { useState } from "react"

function EssayBody({ body }: { body: string }) {
  const paragraphs = body.split("\n\n")
  return (
    <div className="flex flex-col gap-6">
      {paragraphs.map((p, i) => (
        <p key={i} className="font-serif text-base leading-[1.8] text-foreground md:text-lg">
          {i === 0 ? (
            <>
              <span className="float-left mr-3 mt-1 font-serif text-5xl leading-none text-accent">
                {p.charAt(0)}
              </span>
              {p.slice(1)}
            </>
          ) : (
            p
          )}
        </p>
      ))}
    </div>
  )
}

function PoetryBody({ body }: { body: string }) {
  const sections = body.split("\n\n\n")
  return (
    <div className="flex flex-col gap-12">
      {sections.map((section, si) => {
        const stanzas = section.split("\n\n")
        return (
          <div key={si} className="flex flex-col gap-6">
            {stanzas.map((stanza, sti) => {
              const lines = stanza.split("\n")
              const isTitle =
                lines.length === 1 &&
                lines[0] === lines[0].toUpperCase() &&
                lines[0].length < 40
              if (isTitle) {
                return (
                  <h3
                    key={sti}
                    className="mt-4 text-center text-xs uppercase tracking-[0.4em] text-muted-foreground font-alte-haas"
                  >
                    {lines[0]}
                  </h3>
                )
              }
              return (
                <div key={sti} className="flex flex-col gap-0.5">
                  {lines.map((line, li) => (
                    <p
                      key={li}
                      className="font-serif text-base italic leading-relaxed text-foreground md:text-lg"
                    >
                      {line || "\u00A0"}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

function AudioBody({ body }: { body: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const paragraphs = body.split("\n\n")

  return (
    <div className="flex flex-col gap-8">
      {/* Audio player placeholder */}
      <div className="overflow-hidden rounded-sm border border-border bg-secondary/50">
        <div className="flex items-center gap-4 p-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="ml-0.5 h-5 w-5" />
            )}
          </button>
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-1.5 w-full rounded-full bg-border">
              <div
                className="h-1.5 rounded-full bg-accent transition-all duration-300"
                style={{ width: isPlaying ? "35%" : "0%" }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {isPlaying ? "1:03" : "0:00"}
              </span>
              <div className="flex items-center gap-1.5">
                <Volume2 className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">3:12</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-6 py-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-alte-haas">
            Field recording with narration
          </p>
        </div>
      </div>

      {/* Transcript / essay */}
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-alte-haas">
        Accompanying text
      </p>
      <div className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-serif text-base leading-[1.8] text-foreground md:text-lg"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

function VideoBody({ body }: { body: string }) {
  const paragraphs = body.split("\n\n")

  return (
    <div className="flex flex-col gap-8">
      {/* Video placeholder */}
      <div className="relative aspect-video overflow-hidden rounded-sm bg-foreground/90">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <button
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[oklch(0.97_0.005_75)]/30 text-[oklch(0.97_0.005_75)] transition-colors hover:border-[oklch(0.97_0.005_75)]/60"
            aria-label="Play video"
          >
            <Play className="ml-1 h-6 w-6" />
          </button>
          <p className="text-xs uppercase tracking-widest text-[oklch(0.97_0.005_75)]/60 font-alte-haas">
            Video essay
          </p>
        </div>
      </div>

      {/* Director's note */}
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-alte-haas">
        {"Director\u2019s note"}
      </p>
      <div className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-serif text-base leading-[1.8] text-foreground md:text-lg"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

function VisualBody({ body }: { body: string }) {
  const paragraphs = body.split("\n\n")

  return (
    <div className="flex flex-col gap-8">
      {/* Photo grid placeholder */}
      <div className="grid grid-cols-2 gap-3">
        {[
          "bg-[oklch(0.72_0.06_60)]",
          "bg-[oklch(0.65_0.04_40)]",
          "bg-[oklch(0.58_0.05_80)]",
          "bg-[oklch(0.78_0.03_30)]",
        ].map((color, i) => (
          <div
            key={i}
            className={`aspect-square rounded-sm ${color}`}
          >
            <div className="flex h-full items-center justify-center">
              <span className="font-serif text-3xl text-[oklch(0.97_0.005_75)] opacity-20">
                {i + 1}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-alte-haas">
        Selected photographs from the series
      </p>

      {/* Accompanying text */}
      <div className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="font-serif text-base leading-[1.8] text-foreground md:text-lg"
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}

export function ArticleBody({ article }: { article: Article }) {
  switch (article.mediaType) {
    case "essay":
      return <EssayBody body={article.body} />
    case "poetry":
      return <PoetryBody body={article.body} />
    case "audio":
      return <AudioBody body={article.body} />
    case "video":
      return <VideoBody body={article.body} />
    case "visual":
      return <VisualBody body={article.body} />
    default:
      return <EssayBody body={article.body} />
  }
}
