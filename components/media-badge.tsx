import { type MediaType, mediaTypeLabels } from "@/lib/types"
import { Headphones, Video, FileText, Feather, Image } from "lucide-react"
import { cn } from "@/lib/utils"

const mediaIcons: Record<MediaType, React.ElementType> = {
  essay: FileText,
  poetry: Feather,
  audio: Headphones,
  video: Video,
  visual: Image,
}

export function MediaBadge({
  type,
  className,
}: {
  type: MediaType
  className?: string
}) {
  const Icon = mediaIcons[type]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-2 py-0.5 text-[11px] uppercase tracking-widest text-muted-foreground",
        className
      )}
    >
      <Icon className="h-3 w-3" />
      {mediaTypeLabels[type]}
    </span>
  )
}
