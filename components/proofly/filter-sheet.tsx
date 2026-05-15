"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export interface FilterOption {
  id: string
  label: string
}

export interface FilterCategory {
  id: string
  label: string
  options: FilterOption[]
  multiSelect: boolean
}

interface FilterSheetProps {
  categories: FilterCategory[]
  /** Initial selected state — used to seed local state and for reset */
  initialSelected: Record<string, Set<string>>
  /** Called only when user taps "确认" */
  onApply: (selected: Record<string, Set<string>>) => void
  onClose: () => void
}

function cloneSelected(s: Record<string, Set<string>>): Record<string, Set<string>> {
  const out: Record<string, Set<string>> = {}
  for (const key of Object.keys(s)) {
    out[key] = new Set(s[key])
  }
  return out
}

export function FilterSheet({ categories, initialSelected, onApply, onClose }: FilterSheetProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "")
  // Local mutable state — only applied on confirm
  const [localSelected, setLocalSelected] = useState<Record<string, Set<string>>>(() => cloneSelected(initialSelected))

  const currentCategory = categories.find((c) => c.id === activeCategory)
  const totalSelected = Object.values(localSelected).reduce((sum, s) => sum + s.size, 0)

  const handleToggle = (categoryId: string, optionId: string) => {
    const category = categories.find((c) => c.id === categoryId)
    if (!category) return

    setLocalSelected((prev) => {
      const next = cloneSelected(prev)
      const current = next[categoryId] ?? new Set()

      if (!category.multiSelect) {
        // Single select: replace
        next[categoryId] = new Set([optionId])
      } else {
        if (current.has(optionId)) {
          current.delete(optionId)
        } else {
          current.add(optionId)
        }
        next[categoryId] = current
      }
      return next
    })
  }

  const handleReset = () => {
    setLocalSelected(cloneSelected(initialSelected))
  }

  const handleConfirm = () => {
    onApply(cloneSelected(localSelected))
    onClose()
  }

  return (
    <div className="absolute inset-0 z-[80]" onClick={onClose}>
      <div className="absolute inset-0 premium-sheet-overlay" style={{ background: "var(--premium-overlay)" }} />
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 flex flex-col premium-sheet-panel"
        style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)", height: "72%", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-5 flex-shrink-0" style={{ background: "var(--premium-row-border)" }} />

        {/* Title */}
        <div className="px-5 mb-4 flex-shrink-0">
          <p className="font-bold" style={{ fontSize: 18, color: "var(--premium-text)" }}>筛选与排序</p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Left: category menu */}
          <div className="flex-shrink-0 overflow-y-auto hide-scrollbar" style={{ width: 120, background: "var(--premium-surface-soft)" }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              const count = localSelected[cat.id]?.size ?? 0
              return (
                <button
                  key={cat.id}
                  className="ios-tap w-full flex items-center justify-between px-4 py-3.5"
                  style={{ background: isActive ? "var(--premium-surface)" : "transparent" }}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="font-medium" style={{ fontSize: 14, color: isActive ? "var(--premium-text)" : "var(--premium-text-subtle)" }}>{cat.label}</span>
                  {count > 0 && (
                    <span className="flex items-center justify-center rounded-full" style={{ width: 18, height: 18, background: "#4C6FFF", fontSize: 10, fontWeight: 700, color: "#FFFFFF" }}>{count}</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: options panel */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-2 pb-4">
            {currentCategory && (
              <div>
                <p className="font-semibold mb-3" style={{ fontSize: 15, color: "var(--premium-text)" }}>{currentCategory.label}</p>
                <div className="flex flex-col gap-0.5">
                  {currentCategory.options.map((opt) => {
                    const isSelected = localSelected[currentCategory.id]?.has(opt.id) ?? false
                    return (
                      <button
                        key={opt.id}
                        className="ios-tap w-full flex items-center justify-between px-3 py-3 rounded-xl"
                        style={{ background: isSelected ? "var(--premium-surface-selected)" : "transparent" }}
                        onClick={() => handleToggle(currentCategory.id, opt.id)}
                      >
                        <span className="font-medium" style={{ fontSize: 15, color: isSelected ? "#4C6FFF" : "var(--premium-text)" }}>{opt.label}</span>
                        {currentCategory.multiSelect ? (
                          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: isSelected ? "#4C6FFF" : "transparent", border: isSelected ? "none" : "1.5px solid var(--premium-row-border)" }}>
                            {isSelected && <Check size={12} strokeWidth={3} className="text-white" />}
                          </div>
                        ) : (
                          isSelected && <Check size={16} strokeWidth={2.5} className="text-[#4C6FFF]" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom actions */}
        <div
          className="flex-shrink-0 flex gap-3 px-4 pt-3"
          style={{ borderTop: "0.5px solid var(--premium-row-border)", paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}
        >
          <button
            className="ios-tap flex-1 flex items-center justify-center rounded-xl font-semibold"
            style={{ height: 50, fontSize: 16, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }}
            onClick={handleReset}
          >
            重置
          </button>
          <button
            className="ios-tap flex-1 flex items-center justify-center rounded-xl font-semibold text-white"
            style={{ height: 50, fontSize: 16, background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)" }}
            onClick={handleConfirm}
          >
            确认
          </button>
        </div>
      </div>
    </div>
  )
}
