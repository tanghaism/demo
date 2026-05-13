"use client"

import { useState } from "react"
import { ChevronLeft, FileText, Archive, AlertCircle, Check, Share2, FolderDown, Star } from "lucide-react"

interface ExportScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between px-4 py-3.5">
      <span className="font-medium text-[#101828]" style={{ fontSize: 15 }}>{label}</span>
      <button
        className="ios-tap relative"
        onClick={() => setOn(!on)}
        style={{ width: 44, height: 26 }}
        aria-label={label}
      >
        <div className="w-full h-full rounded-full transition-colors" style={{ background: on ? "#2563FF" : "#E8ECF4" }} />
        <div className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{ left: on ? 22 : 2 }} />
      </button>
    </div>
  )
}

type ScopeType = "object" | "project" | "period"

const SCOPE_OPTIONS: { id: ScopeType; emoji: string; label: string; sub: string }[] = [
  { id: "object", emoji: "💻", label: "MacBook Pro 14", sub: "对象 · 3 条记录" },
  { id: "project", emoji: "📁", label: "林先生设计项目", sub: "项目 · 8 条记录" },
  { id: "period", emoji: "📅", label: "自定义时间段", sub: "选择开始和结束日期" },
]

// Two prototype states: free user vs Pro user
type UserTier = "free" | "pro"

export function ExportScreen({ onBack, onNavigate }: ExportScreenProps) {
  const [format, setFormat] = useState<"pdf" | "zip">("pdf")
  const [scope, setScope] = useState<ScopeType>("object")
  // Default: free. Toggle to see Pro flow.
  const [tier, setTier] = useState<UserTier>("free")
  const [showFreePreview, setShowFreePreview] = useState(false)
  const [showGenerated, setShowGenerated] = useState(false)

  const handleCta = () => {
    if (tier === "free") {
      setShowFreePreview(true)
    } else {
      setShowGenerated(true)
    }
  }

  const selectedScope = SCOPE_OPTIONS.find((o) => o.id === scope)!

  return (
    <div className="flex flex-col h-full bg-[#F6F8FF]" style={{ paddingTop: 54 }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-2 pb-3" style={{ borderBottom: "0.5px solid #E8ECF4" }}>
        <button className="ios-tap flex items-center gap-0.5" style={{ minHeight: 44 }} onClick={onBack} aria-label="返回">
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>返回</span>
        </button>
        <h1 className="font-semibold text-[#101828]" style={{ fontSize: 17 }}>导出资料包</h1>
        {/* Prototype tier toggle */}
        <button
          className="ios-tap px-2.5 py-1 rounded-lg font-medium"
          style={{ fontSize: 12, background: tier === "pro" ? "#EEF4FF" : "#F0EBFF", color: tier === "pro" ? "#2563FF" : "#7C5CFF" }}
          onClick={() => setTier(tier === "free" ? "pro" : "free")}
          aria-label="切换免费/Pro状态"
        >
          {tier === "free" ? "免费版" : "Pro"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-28">

        {/* Scope selector */}
        <div className="px-4 mt-4 mb-3">
          <p className="text-[#98A2B3] font-medium px-1 mb-1.5" style={{ fontSize: 13 }}>导出范围</p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            {SCOPE_OPTIONS.map((opt, i) => (
              <button
                key={opt.id}
                className="ios-tap w-full flex items-center px-4 py-3.5"
                style={{ borderBottom: i < SCOPE_OPTIONS.length - 1 ? "0.5px solid #F6F8FF" : "none" }}
                onClick={() => setScope(opt.id)}
                aria-label={opt.label}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
                  style={{ background: scope === opt.id ? "#EEF4FF" : "#F6F8FF" }}
                >
                  <span style={{ fontSize: 18 }}>{opt.emoji}</span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium text-[#101828]" style={{ fontSize: 15 }}>{opt.label}</p>
                  <p className="text-[#98A2B3]" style={{ fontSize: 12 }}>{opt.sub}</p>
                </div>
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: scope === opt.id ? "#2563FF" : "transparent",
                    border: scope === opt.id ? "none" : "1.5px solid #C8D0E8",
                  }}
                >
                  {scope === opt.id && <Check size={11} strokeWidth={3} className="text-white" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Preview stats */}
        <div className="px-4 mb-3">
          <p className="text-[#98A2B3] font-medium px-1 mb-1.5" style={{ fontSize: 13 }}>包含内容预览</p>
          <div className="bg-white rounded-2xl p-4" style={{ border: "0.5px solid #E8ECF4" }}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: "记录", value: "3" },
                { label: "附件", value: "5" },
                { label: "事件", value: "4" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-bold text-[#2563FF]" style={{ fontSize: 22 }}>{stat.value}</p>
                  <p className="text-[#667085]" style={{ fontSize: 12 }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="pt-3" style={{ borderTop: "0.5px solid #F6F8FF" }}>
              <p className="text-[#98A2B3] text-center" style={{ fontSize: 13 }}>预计大小：约 12 MB</p>
            </div>
          </div>
        </div>

        {/* Format */}
        <div className="px-4 mb-3">
          <p className="text-[#98A2B3] font-medium px-1 mb-1.5" style={{ fontSize: 13 }}>导出格式</p>
          <div className="flex gap-2">
            {(["pdf", "zip"] as const).map((f) => (
              <button
                key={f}
                className="ios-tap flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl bg-white"
                style={{
                  border: format === f ? "1.5px solid #2563FF" : "0.5px solid #E8ECF4",
                  boxShadow: format === f ? "0 0 0 4px rgba(37,99,255,0.06)" : "none",
                }}
                onClick={() => setFormat(f)}
                aria-label={f === "pdf" ? "PDF 格式" : "ZIP 格式"}
              >
                {f === "pdf"
                  ? <FileText size={22} className="text-[#FF3B30]" strokeWidth={1.5} />
                  : <Archive size={22} className="text-[#FF9500]" strokeWidth={1.5} />
                }
                <span className="font-semibold" style={{ fontSize: 14, color: format === f ? "#2563FF" : "#101828" }}>
                  {f.toUpperCase()}
                </span>
                <span className="text-[#98A2B3] text-center leading-snug px-2" style={{ fontSize: 11 }}>
                  {f === "pdf" ? "封面索引\n易分享" : "含原始附件\n完整归档"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content toggles */}
        <div className="px-4 mb-3">
          <p className="text-[#98A2B3] font-medium px-1 mb-1.5" style={{ fontSize: 13 }}>包含内容</p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            <Toggle label="记录字段" defaultOn />
            <div style={{ height: "0.5px", background: "#F6F8FF", marginLeft: 16 }} />
            <Toggle label="附件缩略图" defaultOn />
            <div style={{ height: "0.5px", background: "#F6F8FF", marginLeft: 16 }} />
            <Toggle label="事件时间线" defaultOn />
            {format === "zip" && (
              <>
                <div style={{ height: "0.5px", background: "#F6F8FF", marginLeft: 16 }} />
                <Toggle label="原始附件（ZIP）" defaultOn />
              </>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4">
          <div
            className="flex items-start gap-2 px-4 py-3 rounded-xl"
            style={{ background: "#F6F8FF", border: "0.5px solid #E8ECF4" }}
          >
            <AlertCircle size={14} className="text-[#98A2B3] mt-0.5 flex-shrink-0" />
            <p className="text-[#98A2B3] leading-relaxed" style={{ fontSize: 12 }}>
              资料包仅用于资料整理和留存，不提供法律、税务、保险或劳动仲裁结论。
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-7 pt-3"
        style={{
          background: "rgba(246,248,255,0.96)",
          backdropFilter: "blur(16px)",
          borderTop: "0.5px solid #E8ECF4",
        }}
      >
        <button
          className="ios-tap w-full py-3.5 rounded-xl font-semibold text-white"
          style={{ fontSize: 16, background: "linear-gradient(135deg, #2563FF, #7C5CFF)" }}
          onClick={handleCta}
          aria-label={tier === "free" ? "预览资料包" : "生成资料包"}
        >
          {tier === "free" ? "预览资料包" : "生成资料包"}
        </button>
      </div>

      {/* Free user: preview sheet */}
      {showFreePreview && (
        <SheetOverlay onDismiss={() => setShowFreePreview(false)}>
          <div className="flex flex-col items-center text-center px-5 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "#EEF4FF" }}
            >
              <FileText size={22} className="text-[#2563FF]" strokeWidth={1.8} />
            </div>
            <p className="font-bold text-[#101828]" style={{ fontSize: 18 }}>资料包预览</p>
            <p className="text-[#667085] mt-1" style={{ fontSize: 14 }}>
              {selectedScope.label}
            </p>
          </div>
          {/* Preview stats */}
          <div
            className="mx-4 rounded-2xl overflow-hidden mb-4"
            style={{ border: "0.5px solid #E8ECF4" }}
          >
            {[
              { label: "封面", value: "自动生成" },
              { label: "记录数量", value: "3 条" },
              { label: "附件数量", value: "5 个" },
              { label: "事件数量", value: "4 条" },
              { label: "预计大小", value: "约 12 MB" },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-4 py-3 bg-white"
                style={{ borderBottom: i < arr.length - 1 ? "0.5px solid #F6F8FF" : "none" }}
              >
                <span className="text-[#98A2B3]" style={{ fontSize: 14 }}>{row.label}</span>
                <span className="font-medium text-[#101828]" style={{ fontSize: 14 }}>{row.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 px-4">
            <button
              className="ios-tap w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              style={{ fontSize: 17, background: "linear-gradient(135deg, #2563FF, #7C5CFF)", color: "white" }}
              onClick={() => { setShowFreePreview(false); onNavigate("pro-upgrade") }}
              aria-label="开通 Pro 导出"
            >
              <Star size={17} strokeWidth={2} />
              开通 Pro 导出 {format.toUpperCase()}
            </button>
            <button
              className="ios-tap w-full py-3.5 rounded-2xl font-medium"
              style={{ fontSize: 17, background: "#F6F8FF", color: "#101828" }}
              onClick={() => setShowFreePreview(false)}
              aria-label="关闭"
            >
              关闭
            </button>
          </div>
        </SheetOverlay>
      )}

      {/* Pro user: generated sheet */}
      {showGenerated && (
        <SheetOverlay onDismiss={() => setShowGenerated(false)}>
          <div className="flex flex-col items-center text-center px-5 mb-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "#EDFAF7" }}
            >
              <Check size={22} className="text-[#14C8A8]" strokeWidth={2.5} />
            </div>
            <p className="font-bold text-[#101828]" style={{ fontSize: 18 }}>资料包已生成</p>
          </div>
          <div
            className="mx-4 rounded-xl px-4 py-3.5 mb-5"
            style={{ background: "#F6F8FF", border: "0.5px solid #E8ECF4" }}
          >
            <p className="font-medium text-[#101828]" style={{ fontSize: 14 }}>
              {selectedScope.label.replace(" ", "_")}_{format === "pdf" ? "2026-05-12.pdf" : "2026-05-12.zip"}
            </p>
            <p className="text-[#98A2B3] mt-0.5" style={{ fontSize: 12 }}>11.8 MB · 刚刚生成</p>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <button
              className="ios-tap w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              style={{ fontSize: 17, background: "#2563FF", color: "white" }}
              onClick={() => setShowGenerated(false)}
              aria-label="系统分享"
            >
              <Share2 size={17} strokeWidth={2} />
              系统分享
            </button>
            <button
              className="ios-tap w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
              style={{ fontSize: 17, background: "#F0EBFF", color: "#7C5CFF" }}
              onClick={() => setShowGenerated(false)}
              aria-label="保存到文件 App"
            >
              <FolderDown size={17} strokeWidth={2} />
              保存到文件 App
            </button>
            <button
              className="ios-tap w-full py-3.5 rounded-2xl font-medium"
              style={{ fontSize: 17, background: "#F6F8FF", color: "#101828" }}
              onClick={() => setShowGenerated(false)}
              aria-label="完成"
            >
              完成
            </button>
          </div>
        </SheetOverlay>
      )}
    </div>
  )
}

function SheetOverlay({ children, onDismiss }: { children: React.ReactNode; onDismiss: () => void }) {
  return (
    <div className="absolute inset-0 z-40" onClick={onDismiss}>
      <div className="absolute inset-0 bg-black/25" />
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pb-10 pt-2"
        style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-[#E8ECF4] mx-auto mb-5" />
        {children}
      </div>
    </div>
  )
}
