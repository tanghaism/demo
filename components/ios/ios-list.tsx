"use client"

import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface IOSListProps {
  children: React.ReactNode
  header?: string
  footer?: string
  inset?: boolean
}

export function IOSList({ children, header, footer, inset = true }: IOSListProps) {
  return (
    <div className={cn("mb-6", inset && "px-4")}>
      {header && (
        <div className="px-4 pb-1.5 pt-2">
          <span className="text-[13px] text-muted-foreground uppercase tracking-wide">
            {header}
          </span>
        </div>
      )}
      <div className="bg-card rounded-xl overflow-hidden divide-y divide-border">
        {children}
      </div>
      {footer && (
        <div className="px-4 pt-1.5">
          <span className="text-[13px] text-muted-foreground">{footer}</span>
        </div>
      )}
    </div>
  )
}

interface IOSListItemProps {
  title: string
  subtitle?: string
  detail?: string
  icon?: React.ReactNode
  trailing?: React.ReactNode
  accessory?: React.ReactNode
  showChevron?: boolean
  destructive?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function IOSListItem({
  title,
  subtitle,
  detail,
  icon,
  trailing,
  accessory,
  showChevron = true,
  destructive = false,
  disabled = false,
  onClick,
}: IOSListItemProps) {
  const Comp = onClick ? "button" : "div"

  return (
    <Comp
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 text-left",
        onClick && "active:bg-muted/50 transition-colors",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      {icon && (
        <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "text-[17px]",
              destructive && "text-destructive"
            )}
          >
            {title}
          </span>
          {detail && (
            <span className="text-[17px] text-muted-foreground truncate">
              {detail}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[15px] text-muted-foreground truncate mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      {trailing}
      {accessory}
      {showChevron && onClick && !accessory && (
        <ChevronRight className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
      )}
    </Comp>
  )
}
