"use client"

import { useState } from "react"
import {
  ChevronLeft, MoreHorizontal, Edit2, Bell, Share2,
  Image as ImageIcon, FileText, Trash2, CheckCircle2, X,
  ChevronRight, AlertTriangle, Download,
} from "lucide-react"
import { AmbientBackground } from "@/components/proofly/ambient-background"
import { PremiumCard } from "@/components/proofly/premium-card"

interface RecordDetailProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

type AttachmentType = "image" | "pdf" | "video" | "live"

interface Attachment {
  id: number
  name: string
  size: string
  type: AttachmentType
}

const initialAttachments: Attachment[] = [
  { id: 1, name: "macbook_invoice.pdf", size: "2.1 MB", type: "pdf" },
  { id: 2, name: "IMG_60512.jpg", size: "3.4 MB", type: "image" },
  { id: 3, name: "IMG_60511.MOV", size: "12.8 MB", type: "video" },
  { id: 4, name: "IMG_60420.HEIC", size: "2.8 MB", type: "live" },
]

type ToastState = { msg: string; variant: "success" | "error" } | null
// "record" = top record menu, number = attachment menu by id, "remove-confirm" = remove confirm for attachment
type SheetState = "record" | "attachment-menu" | "remove-confirm" | null

export function RecordDetail({ onBack, onNavigate }: RecordDetailProps) {
  const [sheet, setSheet] = useState<SheetState>(null)
  const [activeAttachmentId, setActiveAttachmentId] = useState<number | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)
  const [attachments, setAttachments] = useState<Attachment[]>(initialAttachments)
  // Demo state for save-fail inline banner
  const [showSaveFail, setShowSaveFail] = useState(false)

  const triggerToast = (msg: string, variant: "success" | "error" = "success") => {
    setSheet(null)
    setActiveAttachmentId(null)
    setToast({ msg, variant })
    setTimeout(() => setToast(null), 2400)
  }

  const handleRemoveAttachment = () => {
    if (activeAttachmentId !== null) {
      setAttachments((prev) => prev.filter((a) => a.id !== activeAttachmentId))
    }
    setSheet(null)
    setActiveAttachmentId(null)
    triggerToast("附件已移除")
  }

  const handleDeleteRecord = () => {
    setShowDeleteConfirm(false)
    triggerToast("记录已移入回收站")
    setTimeout(() => onBack(), 700)
  }

  const activeAttachment = attachments.find((a) => a.id === activeAttachmentId) ?? null

  const thumbnailForType = (type: AttachmentType) => {
    if (type === "pdf") return { bg: "var(--premium-danger-bg)", icon: <FileText size={18} className="text-[#FF3B30]" />, badge: "PDF", badgeColor: "#FF3B30" }
    if (type === "video") return { bg: "var(--premium-icon-indigo-bg)", icon: <span style={{ fontSize: 14, color: "#7C5CFF", fontWeight: 700 }}>▶</span>, badge: "视频", badgeColor: "#7C5CFF" }
    if (type === "live") return { bg: "var(--premium-warning-bg)", icon: <span style={{ fontSize: 14, color: "#CC9500", fontWeight: 700 }}>◎</span>, badge: "实况", badgeColor: "#CC9500" }
    return { bg: "var(--premium-icon-blue-bg)", icon: <span style={{ fontSize: 16 }}>🏔</span>, badge: "JPG", badgeColor: "#2563FF" }
  }

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
      <AmbientBackground />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-2 pb-2.5">
        <button
          className="ios-tap flex items-center gap-0.5"
          style={{ minHeight: 44 }}
          onClick={onBack}
          aria-label="返回记录"
        >
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>记录</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            className="ios-tap premium-press flex items-center justify-center rounded-2xl"
            style={{ minWidth: 44, minHeight: 44, background: "var(--premium-control-surface-strong)", border: "1px solid var(--premium-control-border)" }}
            onClick={() => setSheet("record")}
            aria-label="更多操作"
          >
            <MoreHorizontal size={22} strokeWidth={2} className="text-[#2563FF]" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-10">

        {/* Save-fail demo banner */}
        {showSaveFail && (
          <div
            className="mx-4 mt-4 flex items-start gap-2.5 px-3.5 py-3 rounded-xl"
            style={{ background: "var(--premium-danger-bg)", border: "0.5px solid var(--premium-danger-border)" }}
          >
            <AlertTriangle size={14} className="text-[#FF3B30] flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold" style={{ fontSize: 13, color: "var(--premium-danger-text)" }}>未能保存</p>
              <p className="mt-0.5" style={{ fontSize: 12, color: "var(--premium-danger-text)" }}>请检查权限或剩余存储空间</p>
            </div>
            <button
              className="ios-tap"
              style={{ minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => setShowSaveFail(false)}
              aria-label="关闭"
            >
              <X size={14} className="text-[#98A2B3]" />
            </button>
          </div>
        )}

        {/* Asset card */}
        <div className="px-4 mb-4">
          <PremiumCard className="relative px-5 py-5" style={{ background: "transparent", boxShadow: "0 18px 42px rgba(76,111,255,0.18)" }}>
            <div className="absolute inset-0 premium-hero-gradient" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 86% 8%, rgba(255,255,255,0.24), transparent 38%)" }} />
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-flex px-2 py-0.5 rounded-md font-semibold mb-2" style={{ fontSize: 12, background: "rgba(255,255,255,0.18)", color: "white" }}>
                    发票
                  </span>
                  <h2 className="font-bold text-white" style={{ fontSize: 24, letterSpacing: -0.5, lineHeight: 1.2 }}>
                    MacBook Pro 发票
                  </h2>
                  <p className="text-white/72 mt-1" style={{ fontSize: 13 }}>2026年5月12日 · Apple Store 上海</p>
                </div>
                <div className="flex items-center justify-center flex-shrink-0" style={{ width: 52, height: 52, borderRadius: 18, background: "rgba(255,255,255,0.16)" }}>
                  <FileText size={24} strokeWidth={1.8} className="text-white" />
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { label: "金额", value: "¥14,999" },
                  { label: "附件", value: `${attachments.length}` },
                  { label: "提醒", value: "119天后" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl px-3 py-2" style={{ background: "rgba(255,255,255,0.14)" }}>
                    <p className="text-white font-semibold truncate" style={{ fontSize: 14 }}>{item.value}</p>
                    <p className="text-white/68" style={{ fontSize: 10 }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Summary */}
        <div className="px-4 mb-4">
          <PremiumCard className="rounded-[18px] px-4 py-4">
            <p className="font-semibold mb-3" style={{ fontSize: 15, color: "var(--premium-text)" }}>资料摘要</p>
            {[
              { label: "日期", value: "2026-05-12" },
              { label: "金额", value: "¥14,999" },
              { label: "对方名称", value: "Apple Store 上海" },
            ].map((field, i, arr) => (
              <div
                key={field.label}
                className="flex items-center py-2.5"
                style={{ borderBottom: i < arr.length - 1 ? "0.5px solid var(--premium-row-border)" : "none" }}
              >
                <span className="font-medium" style={{ fontSize: 14, minWidth: 80, color: "var(--premium-text-subtle)" }}>{field.label}</span>
                <span className="font-medium" style={{ fontSize: 14, color: "var(--premium-text)" }}>{field.value}</span>
              </div>
            ))}
            <p className="leading-relaxed mt-3" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--premium-text-muted)" }}>
              MacBook Pro 14 英寸，M4 Pro 芯片，2026 年 5 月购入，Apple One Year 保修到 2027-09-12。序列号：FVFXXX123。
            </p>
            <div className="pt-3 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded-full font-medium" style={{ fontSize: 12, background: "var(--premium-icon-neutral-bg)", color: "var(--premium-text)" }}>Apple Store</span>
              <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 12, background: "var(--premium-icon-indigo-bg)", color: "#7C5CFF" }}>#电子产品</span>
            </div>
          </PremiumCard>
        </div>

        {/* Attachments */}
        <div className="px-4 mb-4">
          <p className="font-medium px-1 mb-2" style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>附件</p>
          {attachments.length === 0 ? (
            <PremiumCard className="rounded-[18px] px-4 py-5 text-center">
              <p style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}>暂无附件</p>
            </PremiumCard>
          ) : (
            <PremiumCard className="rounded-[18px]">
              {attachments.map((a, i) => {
                const meta = thumbnailForType(a.type)
                return (
                  <div
                    key={a.id}
                    className="flex items-center px-4 py-3.5"
                    style={{ borderBottom: i < attachments.length - 1 ? "0.5px solid var(--premium-row-border)" : "none" }}
                  >
                    <div
                      className="rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
                      style={{ width: 44, height: 44, background: meta.bg }}
                    >
                      {meta.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ fontSize: 14, color: "var(--premium-text)" }}>{a.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-px rounded font-semibold" style={{ fontSize: 10, background: `${meta.badgeColor}18`, color: meta.badgeColor }}>{meta.badge}</span>
                        <span style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{a.size}</span>
                      </div>
                    </div>
                    <button
                      className="ios-tap flex items-center justify-center rounded-lg"
                      style={{ width: 44, height: 44, background: "var(--premium-surface-soft)" }}
                      onClick={() => { setActiveAttachmentId(a.id); setSheet("attachment-menu") }}
                      aria-label={`${a.name} 更多操作`}
                    >
                      <MoreHorizontal size={16} style={{ color: "var(--premium-text-muted)" }} />
                    </button>
                  </div>
                )
              })}
            </PremiumCard>
          )}


        </div>

        {/* Reminder */}
        <div className="px-4 mb-4">
          <p className="font-medium px-1 mb-2" style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>提醒</p>
          <PremiumCard className="rounded-[18px] px-4 py-3.5 flex items-center gap-3">
            <Bell size={16} className="text-[#FF9500] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium" style={{ fontSize: 14, color: "var(--premium-text)" }}>保修到期</p>
              <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>2026-09-12 · 提前 30 天提醒</p>
            </div>
            <span
              className="px-2 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{ fontSize: 11, background: "var(--premium-warning-bg)", color: "#FF9500" }}
            >
              119天后
            </span>
          </PremiumCard>
        </div>

        {/* Related object */}
        <div className="px-4 mb-4">
          <p className="font-medium px-1 mb-2" style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>关联对象</p>
          <button
            className="ios-tap premium-press w-full rounded-[18px] flex items-center px-4 py-3.5 premium-glass"
            onClick={() => onNavigate("object-detail")}
            aria-label="MacBook Pro 14"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 flex-shrink-0" style={{ background: "var(--premium-icon-blue-bg)" }}>
              <span style={{ fontSize: 18 }}>💻</span>
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="font-medium" style={{ fontSize: 14, color: "var(--premium-text)" }}>MacBook Pro 14</p>
              <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>物品 · 3 条关联记录</p>
            </div>
            <ChevronRight size={14} style={{ color: "var(--premium-chevron)" }} />
          </button>
        </div>
      </div>

      {/* Top-level record menu */}
      {sheet === "record" && (
        <SheetOverlay onDismiss={() => setSheet(null)}>
          <div className="flex flex-col gap-1.5 px-4">
            <SheetItem icon={Edit2} label="编辑记录" color="#2563FF" onPress={() => setSheet(null)} />
            <SheetItem icon={Download} label="导出记录" color="#2563FF" onPress={() => { setSheet(null); onNavigate("export") }} />
            <SheetItem
              icon={Trash2}
              label="删除记录"
              color="#FF3B30"
              danger
              onPress={() => { setSheet(null); setShowDeleteConfirm(true) }}
            />
          </div>
        </SheetOverlay>
      )}

      {/* Attachment menu */}
      {sheet === "attachment-menu" && activeAttachment && (
        <SheetOverlay onDismiss={() => { setSheet(null); setActiveAttachmentId(null) }}>
          {/* Attachment header */}
          <div
            className="flex items-center gap-3 mx-4 px-4 py-3 rounded-xl mb-3"
            style={{ background: "var(--premium-surface-soft)" }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: thumbnailForType(activeAttachment.type).bg }}
            >
              {thumbnailForType(activeAttachment.type).icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate" style={{ fontSize: 14, color: "var(--premium-text)" }}>{activeAttachment.name}</p>
              <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{activeAttachment.size}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 px-4">
            <SheetItem icon={Share2} label="分享原文件" color="#2563FF" onPress={() => triggerToast("正在分享…")} />
            <SheetItem
              icon={Download}
              label={activeAttachment.type === "image" ? "保存到相册" : "保存到文件 App"}
              color="#2563FF"
              onPress={() => {
                // Simulate save: succeed most of the time, occasionally show error banner
                const succeed = Math.random() > 0.35
                if (succeed) {
                  triggerToast(
                    activeAttachment.type === "image" ? "已保存到相册" : "已保存到文件 App"
                  )
                } else {
                  setSheet(null)
                  setActiveAttachmentId(null)
                  setShowSaveFail(true)
                }
              }}
            />
            <SheetItem
              icon={X}
              label="移除此附件"
              color="#FF3B30"
              danger
              onPress={() => setSheet("remove-confirm")}
            />
          </div>
        </SheetOverlay>
      )}

      {/* Remove attachment confirmation */}
      {sheet === "remove-confirm" && activeAttachment && (
        <SheetOverlay onDismiss={() => { setSheet(null); setActiveAttachmentId(null) }}>
          <div className="flex flex-col items-center text-center px-5 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
              style={{ background: "var(--premium-danger-bg)" }}
            >
              <X size={22} className="text-[#FF3B30]" strokeWidth={2} />
            </div>
            <p className="font-bold" style={{ fontSize: 18, color: "var(--premium-text)" }}>移除此附件？</p>
            <p className="mt-1.5 leading-snug" style={{ fontSize: 14, color: "var(--premium-text-muted)" }}>
              附件将从此记录中移除，原文件不会从相册或文件 App 中删除。
            </p>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <button
              className="ios-tap w-full py-4 rounded-2xl font-semibold"
              style={{ fontSize: 17, background: "#FF3B30", color: "white" }}
              onClick={handleRemoveAttachment}
              aria-label="确认移除"
            >
              移除
            </button>
            <button
              className="ios-tap w-full py-3.5 rounded-2xl font-medium"
              style={{ fontSize: 17, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }}
              onClick={() => { setSheet(null); setActiveAttachmentId(null) }}
              aria-label="取消"
            >
              取消
            </button>
          </div>
        </SheetOverlay>
      )}

      {/* Delete record confirmation */}
      {showDeleteConfirm && (
        <SheetOverlay onDismiss={() => setShowDeleteConfirm(false)}>
          <div className="flex flex-col items-center text-center px-5 mb-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "var(--premium-danger-bg)" }}>
              <Trash2 size={22} className="text-[#FF3B30]" strokeWidth={1.8} />
            </div>
            <p className="font-bold" style={{ fontSize: 18, color: "var(--premium-text)" }}>删除这条记录？</p>
            <p className="mt-1.5 leading-snug" style={{ fontSize: 14, color: "var(--premium-text-muted)" }}>
              记录和所有附件将移入回收站，可在设置中恢复
            </p>
          </div>
          <div className="flex flex-col gap-2 px-4">
            <button
              className="ios-tap w-full py-4 rounded-2xl font-semibold"
              style={{ fontSize: 17, background: "#FF3B30", color: "white" }}
              onClick={handleDeleteRecord}
              aria-label="删除"
            >
              删除
            </button>
            <button
              className="ios-tap w-full py-3.5 rounded-2xl font-medium"
              style={{ fontSize: 17, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }}
              onClick={() => setShowDeleteConfirm(false)}
              aria-label="取消"
            >
              取消
            </button>
          </div>
        </SheetOverlay>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-10 inset-x-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "#101828", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
        >
          {toast.variant === "success"
            ? <CheckCircle2 size={16} className="text-[#14C8A8] flex-shrink-0" />
            : <X size={16} className="text-[#FF3B30] flex-shrink-0" />
          }
          <p className="text-white font-medium" style={{ fontSize: 14 }}>{toast.msg}</p>
        </div>
      )}
    </div>
  )
}

/* Sheet overlay helper */
function SheetOverlay({
  children,
  onDismiss,
}: {
  children: React.ReactNode
  onDismiss: () => void
}) {
  return (
    <div className="absolute inset-0 z-40" onClick={onDismiss}>
      <div className="absolute inset-0" style={{ background: "var(--premium-overlay)" }} />
      <div
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl pb-10 pt-2"
        style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "var(--premium-row-border)" }} />
        {children}
      </div>
    </div>
  )
}

function SheetItem({
  icon: Icon,
  label,
  color,
  danger,
  onPress,
}: {
  icon: React.ElementType
  label: string
  color: string
  danger?: boolean
  onPress: () => void
}) {
  return (
    <button
      className="ios-tap flex items-center gap-3 px-4 py-4 rounded-xl w-full"
      style={{ background: danger ? "var(--premium-danger-bg)" : "var(--premium-surface-soft)", minHeight: 56 }}
      onClick={onPress}
      aria-label={label}
    >
      <Icon size={17} strokeWidth={1.8} style={{ color }} />
      <span
        className="font-medium"
        style={{ fontSize: 16, color: danger ? color : "var(--premium-text)" }}
      >
        {label}
      </span>
    </button>
  )
}
