"use client"

import { useState } from "react"
import { X, Check, Star, CheckCircle2 } from "lucide-react"
import { AmbientBackground } from "@/components/proofly/ambient-background"
import { PremiumCard } from "@/components/proofly/premium-card"

const perks = [
  "不限资料箱数量",
  "不限记录和附件",
  "不限提醒条数",
  "PDF / ZIP 资料包导出",
  "加密备份导出",
  "本地备份与恢复",
  "App 本地锁 / 生物识别",
  "自定义空间和模板",
]

interface ProUpgradeProps {
  onClose: () => void
}

export function ProUpgrade({ onClose }: ProUpgradeProps) {
  const [toast, setToast] = useState<"subscribed" | "restored" | "no-purchase" | null>(null)

  const showToast = (kind: "subscribed" | "restored" | "no-purchase") => {
    setToast(kind)
    setTimeout(() => {
      setToast(null)
      if (kind === "subscribed" || kind === "restored") onClose()
    }, 2000)
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
      <AmbientBackground />

      {/* Close button — top right, iOS system X button */}
      <div className="relative z-10 flex items-center justify-end px-4 pt-3">
        <button
          className="ios-tap premium-press flex items-center justify-center"
          style={{ width: 32, height: 32, borderRadius: 16, background: "var(--premium-control-surface-strong)", border: "1px solid var(--premium-control-border)" }}
          onClick={onClose}
          aria-label="关闭"
        >
          <X size={15} strokeWidth={2.5} style={{ color: "var(--premium-text-muted)" }} />
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-2">

        {/* Pricing Hero */}
        <div className="px-4 pt-2 pb-4">
          <PremiumCard className="relative px-5 py-4 text-center" style={{ background: "transparent", boxShadow: "0 18px 38px rgba(76,111,255,0.20)" }}>
            <div className="absolute inset-0 premium-hero-gradient" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% -8%, rgba(255,255,255,0.24), transparent 44%)" }} />
            <div className="relative">
              <div className="mx-auto flex items-center justify-center mb-3" style={{ width: 56, height: 56, borderRadius: 18, background: "rgba(255,255,255,0.16)" }}>
                <Star size={26} strokeWidth={1.7} style={{ color: "#FFFFFF" }} />
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>Proofly Pro</p>
              <h2 className="mt-1 text-white font-bold" style={{ fontSize: 21, letterSpacing: -0.4, lineHeight: 1.18 }}>
                守护你的本地重要资料
              </h2>
              <div className="flex items-baseline justify-center gap-1 mt-3">
                <span style={{ fontSize: 40, fontWeight: 800, color: "#FFFFFF", letterSpacing: -1 }}>¥18</span>
                <span style={{ fontSize: 17, color: "rgba(255,255,255,0.74)" }}>/年</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.68)", marginTop: 1 }}>约 ¥1.5 / 月 · 到期不删除已有资料</p>
            </div>
          </PremiumCard>
        </div>

        {/* Perks — iOS grouped list with hairlines, no outer card border */}
        <div className="px-4">
          <PremiumCard className="rounded-[18px]">
            {perks.map((perk, i) => (
              <div
                key={perk}
                className="flex items-center gap-3 px-4"
                style={{
                  height: 44,
                  borderBottom: i < perks.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
                }}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: 22, height: 22, borderRadius: 11, background: "#31C48D" }}
                >
                  <Check size={12} strokeWidth={3} style={{ color: "#FFFFFF" }} />
                </div>
                <span style={{ fontSize: 15, color: "var(--premium-text)" }}>{perk}</span>
              </div>
            ))}
          </PremiumCard>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-5 px-6 py-4">
          {["本地保存", "无云同步", "无广告"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center"
              style={{ width: 16, height: 16, borderRadius: 8, background: "var(--premium-success-bg)" }}
            >
                <Check size={9} strokeWidth={3} style={{ color: "#34C759" }} />
              </div>
              <span style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — iOS App Store subscribe button */}
      <div className="relative z-10 px-5 pb-8 pt-3" style={{ borderTop: "0.5px solid var(--premium-row-border)", background: "var(--premium-surface)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <button
          className="ios-tap premium-press w-full flex items-center justify-center rounded-2xl"
          style={{ height: 54, background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)", boxShadow: "0 14px 28px rgba(76,111,255,0.24)" }}
          onClick={() => showToast("subscribed")}
          aria-label="开通 Pro"
        >
          <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>开通 Pro · ¥18/年</span>
        </button>

        <button
          className="ios-tap w-full flex items-center justify-center py-3"
          onClick={onClose}
          aria-label="继续使用免费版"
        >
          <span style={{ fontSize: 15, color: "var(--premium-text-subtle)" }}>继续使用免费版</span>
        </button>

        <button
          className="ios-tap w-full flex items-center justify-center py-2"
          onClick={() => showToast("no-purchase")}
          aria-label="恢复购买"
        >
          <span style={{ fontSize: 13, color: "#4C6FFF" }}>恢复购买</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute inset-x-6 top-20 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "#1C1C1E", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
        >
          <CheckCircle2 size={16} strokeWidth={2} style={{ color: toast === "no-purchase" ? "#FF9500" : "#34C759" }} />
          <p style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>
            {toast === "subscribed" && "已开通 Pro，感谢支持！"}
            {toast === "restored" && "已恢复购买"}
            {toast === "no-purchase" && "未找到可恢复的购买记录"}
          </p>
        </div>
      )}
    </div>
  )
}
