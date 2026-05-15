"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PremiumCard({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cn("premium-glass premium-card-enter rounded-[22px] overflow-hidden", className)} style={style}>
      {children}
    </div>
  )
}

export function MetricPill({
  value,
  label,
  onClick,
}: {
  value: string
  label: string
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="font-bold text-white" style={{ fontSize: 14 }}>
        {value}
      </span>
      <span className="text-white/78 font-medium" style={{ fontSize: 11 }}>
        {label}
      </span>
    </>
  )

  if (onClick) {
    return (
      <button
        className="premium-press ios-tap rounded-full px-3 py-1.5 flex items-center gap-1.5"
        style={{ background: "rgba(255,255,255,0.15)" }}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return (
    <div
      className="rounded-full px-3 py-1.5 flex items-center gap-1.5"
      style={{ background: "rgba(255,255,255,0.15)" }}
    >
      {content}
    </div>
  )
}

export function PremiumIconTile({
  emoji,
  tone = "blue",
}: {
  emoji: string
  tone?: "blue" | "mint" | "indigo" | "amber" | "red"
}) {
  const tones = {
    blue: ["var(--premium-icon-blue-bg)", "#4C6FFF"],
    mint: ["var(--premium-icon-mint-bg)", "#31C48D"],
    indigo: ["var(--premium-icon-indigo-bg)", "#7B61FF"],
    amber: ["var(--premium-icon-amber-bg)", "#FFB648"],
    red: ["var(--premium-icon-red-bg)", "#FF5A6B"],
  } as const
  const [bg, glow] = tones[tone]

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 42, height: 42 }}>
      <div className="absolute inset-1 rounded-2xl blur-md opacity-40" style={{ background: glow }} />
      <div
        className="relative flex items-center justify-center rounded-2xl"
        style={{ width: 42, height: 42, background: bg }}
      >
        <span style={{ fontSize: 22 }}>{emoji}</span>
      </div>
    </div>
  )
}
