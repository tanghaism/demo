"use client"

import { Search, X, Mic } from "lucide-react"
import { cn } from "@/lib/utils"

interface IOSSearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onFocus?: () => void
  onCancel?: () => void
  showCancel?: boolean
  className?: string
}

export function IOSSearchBar({
  value,
  onChange,
  placeholder = "搜索",
  onFocus,
  onCancel,
  showCancel = false,
  className,
}: IOSSearchBarProps) {
  return (
    <div className={cn("px-4 py-2", className)}>
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={onFocus}
            placeholder={placeholder}
            className="w-full h-9 pl-9 pr-9 bg-secondary rounded-lg text-[17px] placeholder:text-muted-foreground focus:outline-none"
          />
          {value ? (
            <button
              onClick={() => onChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground active:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Mic className="w-4 h-4" />
            </div>
          )}
        </div>
        {showCancel && (
          <button
            onClick={onCancel}
            className="text-primary text-[17px] active:opacity-50 transition-opacity"
          >
            取消
          </button>
        )}
      </div>
    </div>
  )
}
