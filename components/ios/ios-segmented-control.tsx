"use client"

import { cn } from "@/lib/utils"

interface Segment {
  id: string
  label: string
}

interface IOSSegmentedControlProps {
  segments: Segment[]
  selectedId: string
  onChange: (id: string) => void
  className?: string
}

export function IOSSegmentedControl({
  segments,
  selectedId,
  onChange,
  className,
}: IOSSegmentedControlProps) {
  return (
    <div
      className={cn(
        "flex p-0.5 bg-secondary rounded-lg",
        className
      )}
    >
      {segments.map((segment) => {
        const isSelected = segment.id === selectedId
        return (
          <button
            key={segment.id}
            onClick={() => onChange(segment.id)}
            className={cn(
              "flex-1 py-1.5 px-3 text-[13px] font-medium rounded-md transition-all",
              isSelected
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            )}
          >
            {segment.label}
          </button>
        )
      })}
    </div>
  )
}
