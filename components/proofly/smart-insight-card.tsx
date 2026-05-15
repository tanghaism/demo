"use client"

import { ChevronRight, Sparkles } from "lucide-react"
import { PremiumCard } from "@/components/proofly/premium-card"

export function SmartInsightCard({ onOpenPending }: { onOpenPending: () => void }) {
  return (
    <PremiumCard className="mx-4 mb-4 px-4 py-3.5">
      <button className="ios-tap premium-press flex w-full items-center gap-3 text-left" onClick={onOpenPending}>
        <div
          className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{ background: "var(--premium-icon-indigo-bg)" }}
        >
          <div className="absolute inset-1 rounded-full blur-md" style={{ background: "rgba(123,97,255,0.28)" }} />
          <Sparkles size={17} strokeWidth={2} className="relative text-[#7B61FF]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold" style={{ fontSize: 14, color: "var(--premium-text)" }}>
            整理建议
          </p>
          <p className="mt-0.5 leading-snug" style={{ fontSize: 12, color: "var(--premium-text-muted)" }}>
            4 条资料可以稍后补充标题、标签或关联对象
          </p>
        </div>
        <ChevronRight size={15} strokeWidth={2} style={{ color: "var(--premium-chevron)" }} />
      </button>
    </PremiumCard>
  )
}
