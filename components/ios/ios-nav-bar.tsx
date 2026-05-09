"use client"

import { ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface IOSNavBarProps {
  title: string
  subtitle?: string
  leftAction?: {
    label?: string
    icon?: React.ReactNode
    onClick: () => void
  }
  rightAction?: {
    label?: string
    icon?: React.ReactNode
    onClick: () => void
  }
  large?: boolean
  transparent?: boolean
}

export function IOSNavBar({
  title,
  subtitle,
  leftAction,
  rightAction,
  large = false,
  transparent = false,
}: IOSNavBarProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-50 px-4 pb-2 pt-12",
        transparent ? "bg-transparent" : "bg-background/80 backdrop-blur-xl border-b border-border/50"
      )}
    >
      {/* Standard nav bar */}
      <div className="flex items-center justify-between h-11">
        {/* Left action */}
        <div className="w-20">
          {leftAction && (
            <button
              onClick={leftAction.onClick}
              className="flex items-center gap-0.5 text-primary active:opacity-50 transition-opacity"
            >
              {leftAction.icon || <ChevronLeft className="w-5 h-5 -ml-1" />}
              {leftAction.label && (
                <span className="text-[17px]">{leftAction.label}</span>
              )}
            </button>
          )}
        </div>

        {/* Title (small) */}
        {!large && (
          <div className="flex-1 text-center">
            <h1 className="text-[17px] font-semibold truncate">{title}</h1>
            {subtitle && (
              <p className="text-[11px] text-muted-foreground">{subtitle}</p>
            )}
          </div>
        )}

        {/* Right action */}
        <div className="w-20 flex justify-end">
          {rightAction && (
            <button
              onClick={rightAction.onClick}
              className="flex items-center gap-1 text-primary active:opacity-50 transition-opacity"
            >
              {rightAction.label && (
                <span className="text-[17px]">{rightAction.label}</span>
              )}
              {rightAction.icon}
            </button>
          )}
        </div>
      </div>

      {/* Large title */}
      {large && (
        <div className="mt-1">
          <h1 className="text-[34px] font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-[15px] text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  )
}
