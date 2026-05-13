"use client"

import { useState } from "react"
import { X, Check, Star, CheckCircle2 } from "lucide-react"

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
    <div className="flex flex-col h-full" style={{ background: "#FFFFFF", paddingTop: 54 }}>

      {/* Close button — top right, iOS system X button */}
      <div className="flex items-center justify-end px-4 pt-3">
        <button
          className="ios-tap flex items-center justify-center"
          style={{ width: 30, height: 30, borderRadius: 15, background: "#E5E5EA" }}
          onClick={onClose}
          aria-label="关闭"
        >
          <X size={15} strokeWidth={2.5} style={{ color: "#6C6C70" }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-2">

        {/* App icon + title — iOS App Store style */}
        <div className="flex flex-col items-center px-6 pt-3 pb-6">
          <div
            className="flex items-center justify-center mb-4"
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(145deg, #007AFF 0%, #5856D6 100%)",
              boxShadow: "0 8px 24px rgba(0,122,255,0.28)",
            }}
          >
            <Star size={36} strokeWidth={1.5} style={{ color: "#FFFFFF" }} />
          </div>
          <h2
            className="text-center"
            style={{ fontSize: 22, fontWeight: 700, color: "#000000", letterSpacing: -0.4 }}
          >
            解锁完整资料备忘录
          </h2>
          <p
            className="text-center"
            style={{ fontSize: 15, color: "#8E8E93", marginTop: 6, lineHeight: 1.4 }}
          >
            年付订阅，资料始终可查看
          </p>
        </div>

        {/* Price — iOS IAP style: large number + period */}
        <div className="flex items-center justify-center mb-2 px-6">
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span style={{ fontSize: 42, fontWeight: 700, color: "#000000", letterSpacing: -1 }}>¥18</span>
              <span style={{ fontSize: 17, color: "#8E8E93" }}>/年</span>
            </div>
            <p style={{ fontSize: 13, color: "#8E8E93", marginTop: 2 }}>约 ¥1.5 / 月 · $2.99/year (overseas)</p>
          </div>
        </div>

        {/* Expiry grace note */}
        <div className="px-6 mb-5">
          <div className="flex items-center gap-2 justify-center">
            <div
              className="flex items-center justify-center"
              style={{ width: 16, height: 16, borderRadius: 8, background: "#34C759" }}
            >
              <Check size={9} strokeWidth={3} style={{ color: "#FFFFFF" }} />
            </div>
            <p style={{ fontSize: 13, color: "#8E8E93" }}>
              订阅到期不删除已有资料，回到免费版限制
            </p>
          </div>
        </div>

        {/* Perks — iOS grouped list with hairlines, no outer card border */}
        <div style={{ borderTop: "0.5px solid rgba(60,60,67,0.12)", borderBottom: "0.5px solid rgba(60,60,67,0.12)" }}>
          {perks.map((perk, i) => (
            <div
              key={perk}
              className="flex items-center gap-3 px-4"
              style={{
                height: 44,
                borderBottom: i < perks.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
              }}
            >
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 22, height: 22, borderRadius: 11, background: "#34C759" }}
              >
                <Check size={12} strokeWidth={3} style={{ color: "#FFFFFF" }} />
              </div>
              <span style={{ fontSize: 15, color: "#000000" }}>{perk}</span>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-5 px-6 py-4">
          {["本地保存", "无云同步", "无广告"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5">
              <div
                className="flex items-center justify-center"
                style={{ width: 16, height: 16, borderRadius: 8, background: "#EDFAF7" }}
              >
                <Check size={9} strokeWidth={3} style={{ color: "#34C759" }} />
              </div>
              <span style={{ fontSize: 13, color: "#8E8E93" }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA — iOS App Store subscribe button */}
      <div
        className="px-5 pb-8 pt-3"
        style={{ borderTop: "0.5px solid rgba(60,60,67,0.12)" }}
      >
        <button
          className="ios-tap w-full flex items-center justify-center rounded-xl"
          style={{ height: 54, background: "#007AFF" }}
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
          <span style={{ fontSize: 15, color: "#8E8E93" }}>继续使用免费版</span>
        </button>

        <button
          className="ios-tap w-full flex items-center justify-center py-2"
          onClick={() => showToast("no-purchase")}
          aria-label="恢复购买"
        >
          <span style={{ fontSize: 13, color: "#007AFF" }}>恢复购买</span>
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
