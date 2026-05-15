"use client"

import { useState } from "react"
import { ChevronLeft, Archive, Check, FileText } from "lucide-react"

type ExportMode = "object" | "record" | "space"

interface ExportScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
  mode?: ExportMode
}

function ExportResultSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
      <div className="relative w-full bg-white rounded-t-3xl pt-2 pb-8" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
        <div className="flex flex-col items-center text-center px-5 mb-5">
          <div className="flex items-center justify-center mb-3" style={{ width: 56, height: 56, borderRadius: 16, background: "#EDFAF7" }}>
            <Check size={28} className="text-[#14C8A8]" strokeWidth={2.5} />
          </div>
          <p className="font-bold text-[#101828]" style={{ fontSize: 18 }}>资料包已生成</p>
          <p className="text-[#98A2B3] mt-2 leading-snug" style={{ fontSize: 14 }}>
            已保存到「文件」App 的 Proofly 文件夹，可分享或导出到其他设备。
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <button className="ios-tap w-full rounded-2xl font-semibold text-white" style={{ height: 50, fontSize: 17, background: "#2563FF" }} onClick={onClose}>分享资料包</button>
          <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "#F6F8FF", color: "#101828" }} onClick={onClose}>完成</button>
        </div>
      </div>
    </div>
  )
}

export function ExportScreen({ onBack, onNavigate, mode = "object" }: ExportScreenProps) {
  const [tier, setTier] = useState<"free" | "pro">("free")
  const [showFreePreview, setShowFreePreview] = useState(false)
  const [showGenerated, setShowGenerated] = useState(false)

  const title = "导出资料包"

  const scopeInfo = mode === "record"
    ? { emoji: "📄", label: "当前记录", sub: "单条记录 · 3 个附件", records: 1, attachments: 3, events: 0 }
    : mode === "space"
      ? { emoji: "🏠", label: "家庭资料箱", sub: "整个资料箱 · 46 条记录", records: 46, attachments: 67, events: 12 }
      : { emoji: "💻", label: "MacBook Pro 14", sub: "对象 · 3 条记录", records: 3, attachments: 5, events: 4 }

  return (
    <div className="flex flex-col h-full bg-[#F6F8FF]" style={{ paddingTop: 54 }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-2 pb-3" style={{ borderBottom: "0.5px solid #E8ECF4" }}>
        <button className="ios-tap flex items-center gap-0.5" style={{ minHeight: 44 }} onClick={onBack} aria-label="返回">
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>返回</span>
        </button>
        <h1 className="font-semibold text-[#101828]" style={{ fontSize: 17 }}>{title}</h1>
        <button className="ios-tap px-2.5 py-1 rounded-lg font-medium" style={{ fontSize: 12, background: tier === "pro" ? "#EEF4FF" : "#F0EBFF", color: tier === "pro" ? "#2563FF" : "#7C5CFF" }} onClick={() => setTier(tier === "free" ? "pro" : "free")} aria-label="切换免费/Pro状态">
          {tier === "free" ? "免费版" : "Pro"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-28">

        {/* Scope — fixed display (not selectable for record/object), selectable for space */}
        <div className="px-4 mt-4 mb-3">
          <p className="text-[#98A2B3] font-medium px-1 mb-1.5" style={{ fontSize: 13 }}>导出范围</p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            <div className="flex items-center px-4 py-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0" style={{ background: "#EEF4FF" }}>
                <span style={{ fontSize: 20 }}>{scopeInfo.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>{scopeInfo.label}</p>
                <p className="text-[#98A2B3]" style={{ fontSize: 12 }}>{scopeInfo.sub}</p>
              </div>
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#2563FF" }}>
                <Check size={11} strokeWidth={3} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* ZIP contents preview */}
        <div className="px-4 mb-3">
          <p className="text-[#98A2B3] font-medium px-1 mb-1.5" style={{ fontSize: 13 }}>ZIP 包含内容</p>
          <div className="bg-white rounded-2xl p-4" style={{ border: "0.5px solid #E8ECF4" }}>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: "记录", value: scopeInfo.records },
                { label: "附件", value: scopeInfo.attachments },
                { label: "事件", value: scopeInfo.events },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-bold text-[#2563FF]" style={{ fontSize: 22 }}>{stat.value}</p>
                  <p className="text-[#667085]" style={{ fontSize: 12 }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="pt-3 flex flex-col gap-2" style={{ borderTop: "0.5px solid #F6F8FF" }}>
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[#FF3B30] flex-shrink-0" />
                <span className="text-[#667085]" style={{ fontSize: 12 }}>摘要 PDF（记录字段 + 事件时间线）</span>
              </div>
              <div className="flex items-center gap-2">
                <Archive size={14} className="text-[#FF9500] flex-shrink-0" />
                <span className="text-[#667085]" style={{ fontSize: 12 }}>原始附件（图片、PDF、各类文件）</span>
              </div>
            </div>
            <div className="pt-3" style={{ borderTop: "0.5px solid #F6F8FF" }}>
              <p className="text-[#98A2B3] text-center" style={{ fontSize: 13 }}>预计大小：约 12 MB</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="px-4">
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "#FFF8EC" }}>
            <span style={{ fontSize: 15 }}>💡</span>
            <p className="text-[#8A5F00] leading-relaxed" style={{ fontSize: 12 }}>
              资料包仅用于资料整理和留存，不提供法律、税务、保险或劳动仲裁结论。导出的 ZIP 文件可在其他设备上解压查看。
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-7 pt-3" style={{ background: "rgba(246,248,255,0.96)", backdropFilter: "blur(20px)", borderTop: "0.5px solid #E8ECF4" }}>
        {tier === "free" ? (
          <div className="flex flex-col gap-2">
            <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "#2563FF", color: "#FFFFFF" }} onClick={() => setShowFreePreview(true)}>预览资料包</button>
            <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "#FFF8EC", color: "#8A5F00" }} onClick={() => onNavigate("pro-upgrade")}>升级 Pro 解锁导出</button>
          </div>
        ) : (
          <button className="ios-tap w-full flex items-center justify-center gap-2 rounded-2xl font-semibold text-white" style={{ height: 50, fontSize: 17, background: "#2563FF" }} onClick={() => setShowGenerated(true)}>
            <Archive size={18} />导出资料包
          </button>
        )}
      </div>

      {/* Free preview sheet */}
      {showFreePreview && (
        <div className="absolute inset-0 z-40 flex items-end" onClick={() => setShowFreePreview(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div className="relative w-full bg-white rounded-t-3xl pt-2 pb-8" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }} onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col items-center text-center px-5 mb-5">
              <div className="flex items-center justify-center mb-3" style={{ width: 48, height: 48, borderRadius: 14, background: "#EEF4FF" }}><Archive size={22} className="text-[#2563FF]" /></div>
              <p className="font-bold text-[#101828]" style={{ fontSize: 18 }}>预览资料包</p>
              <p className="text-[#98A2B3] mt-2 leading-snug" style={{ fontSize: 14 }}>免费版可预览 ZIP 文件结构，正式导出需要升级 Pro。</p>
              <div className="w-full mt-4 bg-[#F6F8FF] rounded-xl p-4 text-left">
                <p className="font-medium text-[#101828] mb-2" style={{ fontSize: 13 }}>📁 {scopeInfo.label}.zip</p>
                <div className="flex flex-col gap-1">
                  {["├── summary.pdf", "├── macbook_invoice.pdf", "├── IMG_60512.jpg", "├── IMG_60511.MOV", "└── warranty_card.pdf"].map((f) => (
                    <p key={f} className="text-[#98A2B3] font-mono" style={{ fontSize: 12, paddingLeft: 4 }}>{f}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button className="ios-tap w-full rounded-2xl font-semibold text-white" style={{ height: 50, fontSize: 17, background: "#7C5CFF" }} onClick={() => { setShowFreePreview(false); onNavigate("pro-upgrade") }}>升级 Pro 解锁导出</button>
              <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "#F6F8FF", color: "#101828" }} onClick={() => setShowFreePreview(false)}>关闭</button>
            </div>
          </div>
        </div>
      )}

      {/* Generated result sheet */}
      {showGenerated && <ExportResultSheet onClose={() => setShowGenerated(false)} />}
    </div>
  )
}
