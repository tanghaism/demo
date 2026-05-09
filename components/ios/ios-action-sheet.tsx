"use client"

import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface ActionItem {
  label: string
  icon?: React.ReactNode
  destructive?: boolean
  onClick: () => void
}

interface IOSActionSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  message?: string
  actions: ActionItem[]
}

export function IOSActionSheet({
  open,
  onClose,
  title,
  message,
  actions,
}: IOSActionSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 animate-in slide-in-from-bottom duration-300">
        {/* Actions group */}
        <div className="bg-card/95 backdrop-blur-xl rounded-xl overflow-hidden mb-2">
          {(title || message) && (
            <div className="px-4 py-3 text-center border-b border-border/50">
              {title && (
                <p className="text-[13px] font-semibold text-muted-foreground">
                  {title}
                </p>
              )}
              {message && (
                <p className="text-[13px] text-muted-foreground mt-0.5">
                  {message}
                </p>
              )}
            </div>
          )}
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick()
                onClose()
              }}
              className={cn(
                "w-full py-4 text-[20px] text-center active:bg-muted/50 transition-colors",
                action.destructive && "text-destructive",
                !action.destructive && "text-primary",
                index > 0 && "border-t border-border/50"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {action.icon}
                {action.label}
              </div>
            </button>
          ))}
        </div>

        {/* Cancel button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-card rounded-xl text-[20px] font-semibold text-primary active:bg-muted/50 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  )
}
