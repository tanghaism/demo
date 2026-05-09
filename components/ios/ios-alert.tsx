"use client"

import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface AlertButton {
  label: string
  style?: "default" | "cancel" | "destructive"
  onClick: () => void
}

interface IOSAlertProps {
  open: boolean
  onClose: () => void
  title: string
  message?: string
  buttons: AlertButton[]
}

export function IOSAlert({
  open,
  onClose,
  title,
  message,
  buttons,
}: IOSAlertProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Alert */}
      <div className="relative w-full max-w-[270px] bg-card/95 backdrop-blur-xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-4 pt-5 pb-4 text-center">
          <h2 className="text-[17px] font-semibold">{title}</h2>
          {message && (
            <p className="text-[13px] text-muted-foreground mt-1">{message}</p>
          )}
        </div>
        <div
          className={cn(
            "border-t border-border/50",
            buttons.length === 2 ? "flex" : "flex flex-col"
          )}
        >
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => {
                button.onClick()
                onClose()
              }}
              className={cn(
                "flex-1 py-3 text-[17px] active:bg-muted/50 transition-colors",
                button.style === "cancel" && "font-semibold",
                button.style === "destructive" && "text-destructive",
                !button.style && "text-primary",
                button.style === "default" && "text-primary",
                buttons.length === 2 && index === 0 && "border-r border-border/50",
                buttons.length > 2 && index > 0 && "border-t border-border/50"
              )}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
