"use client"

import { useState } from "react"
import {
  ChevronLeft, Tag, Link2, AlignLeft, CheckSquare,
  CheckCircle2, ChevronRight, X,
} from "lucide-react"

interface PendingScreenProps {
  onBack: () => void
  onSelectRecord: () => void
}

type PendingReason = "缺少标题" | "缺少类型" | "缺少标签" | "缺少关联对象" | "手动标记"

interface PendingItem {
  id: number
  filename: string
  type: "image" | "pdf"
  size: string
  reasons: PendingReason[]
  date: string
}

const pendingItems: PendingItem[] = [
  {
    id: 1,
    filename: "IMG_20260510.jpg",
    type: "image",
    size: "3.2 MB",
    reasons: ["缺少标题", "缺少标签"],
    date: "2026-05-10",
  },
  {
    id: 2,
    filename: "doc_scan_0509.pdf",
    type: "pdf",
    size: "1.8 MB",
    reasons: ["缺少标题", "缺少关联对象"],
    date: "2026-05-09",
  },
  {
    id: 3,
    filename: "receipt_photo.jpg",
    type: "image",
    size: "2.1 MB",
    reasons: ["缺少类型", "缺少标签"],
    date: "2026-05-07",
  },
  {
    id: 4,
    filename: "contract_draft.pdf",
    type: "pdf",
    size: "4.4 MB",
    reasons: ["手动标记"],
    date: "2026-05-03",
  },
]

const TAG_OPTIONS = ["电子产品", "家居", "健康", "工作", "财务", "证件"]
const OBJECT_OPTIONS = ["MacBook Pro 14", "徐汇租住房", "父亲健康档案", "林先生设计项目"]
const TYPE_OPTIONS = ["发票", "合同", "收据", "处方", "保单", "证照", "证书", "体检报告"]

type InlineEdit = "title" | "tag" | "object" | "type" | null

export function PendingScreen({ onBack, onSelectRecord }: PendingScreenProps) {
  const [expandedId, setExpandedId] = useState<number | null>(1)
  const [dismissed, setDismissed] = useState<number[]>([])
  // Per-item inline edit states
  const [activeInline, setActiveInline] = useState<{ id: number; mode: InlineEdit } | null>(null)
  const [titleInputs, setTitleInputs] = useState<Record<number, string>>({})
  const [savedTitles, setSavedTitles] = useState<Record<number, string>>({})
  const [savedTags, setSavedTags] = useState<Record<number, string[]>>({})
  const [savedObjects, setSavedObjects] = useState<Record<number, string>>({})
  const [savedTypes, setSavedTypes] = useState<Record<number, string>>({})
  const [toast, setToast] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const markDone = (id: number) => {
    setActiveInline(null)
    triggerToast("已标记为整理完成")
    setTimeout(() => setDismissed((d) => [...d, id]), 400)
  }

  const visible = pendingItems.filter((item) => !dismissed.includes(item.id))

  const reasonColor: Record<PendingReason, string> = {
    "缺少标题": "#2563FF",
    "缺少类型": "#7C5CFF",
    "缺少标签": "#14C8A8",
    "缺少关联对象": "#FF9500",
    "手动标记": "#98A2B3",
  }
  const reasonBg: Record<PendingReason, string> = {
    "缺少标题": "#EEF4FF",
    "缺少类型": "#F0EBFF",
    "缺少标签": "#EDFAF7",
    "缺少关联对象": "#FFF3E0",
    "手动标记": "#F6F8FF",
  }

  return (
    <div className="flex flex-col h-full bg-[#F6F8FF]" style={{ paddingTop: 54 }}>
      {/* Nav */}
      <div className="relative flex items-center px-4 pt-2 pb-2.5" style={{ borderBottom: "0.5px solid #E8ECF4" }}>
        <button
          className="ios-tap flex items-center gap-1"
          style={{ minHeight: 44 }}
          onClick={onBack}
          aria-label="返回记录"
        >
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>记录</span>
        </button>
        <h1
          className="font-semibold text-[#101828] absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: 17 }}
        >
          待整理
        </h1>
      </div>

      {/* Hint */}
      <div className="px-4 pt-3 pb-1">
        <p className="text-[#98A2B3] leading-snug" style={{ fontSize: 13 }}>
          这些记录可以晚点补充信息，不着急。
        </p>
      </div>

      {/* Count */}
      <div className="px-4 py-2">
        <p className="text-[#98A2B3]" style={{ fontSize: 13 }}>{visible.length} 条待整理</p>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-28">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <div className="w-16 h-16 rounded-2xl bg-[#EDFAF7] flex items-center justify-center">
              <CheckCircle2 size={32} className="text-[#14C8A8]" strokeWidth={1.5} />
            </div>
            <p className="font-semibold text-[#101828]" style={{ fontSize: 17 }}>全部整理完毕</p>
            <p className="text-[#98A2B3] text-center" style={{ fontSize: 14 }}>没有待整理的记录了</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0 bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            {visible.map((item, idx) => {
              const isOpen = expandedId === item.id
              const isInline = activeInline?.id === item.id
              const currentMode = isInline ? activeInline.mode : null

              return (
                <div
                  key={item.id}
                  style={{ borderBottom: idx < visible.length - 1 ? "0.5px solid #F6F8FF" : "none" }}
                >
                  {/* Row header */}
                  <button
                    className="ios-tap w-full flex items-center px-4 py-3.5 text-left"
                    style={{ minHeight: 56 }}
                    onClick={() => {
                      setExpandedId(isOpen ? null : item.id)
                      setActiveInline(null)
                    }}
                    aria-label={item.filename}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
                      style={{ background: item.type === "pdf" ? "#FFF0F0" : "#EEF4FF" }}
                    >
                      <span style={{ fontSize: 20 }}>{item.type === "pdf" ? "📄" : "🖼"}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#101828] truncate" style={{ fontSize: 14 }}>
                        {savedTitles[item.id] || item.filename}
                      </p>
                      <div className="flex flex-wrap items-center gap-1 mt-1">
                        {item.reasons.map((r) => (
                          savedTitles[item.id] && r === "缺少标题" ? null :
                          savedTags[item.id]?.length && r === "缺少标签" ? null :
                          savedObjects[item.id] && r === "缺少关联对象" ? null :
                          savedTypes[item.id] && r === "缺少类型" ? null : (
                            <span
                              key={r}
                              className="px-1.5 py-0.5 rounded font-medium"
                              style={{ fontSize: 10, background: reasonBg[r], color: reasonColor[r] }}
                            >
                              {r}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                      <span className="text-[#C8D0E8]" style={{ fontSize: 12 }}>{item.date}</span>
                      <ChevronRight
                        size={14}
                        className="text-[#C8D0E8] transition-transform"
                        style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                      />
                    </div>
                  </button>

                  {/* Expanded: quick actions + inline widgets */}
                  {isOpen && (
                    <div className="px-4 pb-4" style={{ borderTop: "0.5px solid #F6F8FF" }}>

                      {/* Title inline */}
                      {currentMode === "title" ? (
                        <div className="mt-3">
                          <p className="text-[#98A2B3] mb-1.5" style={{ fontSize: 12 }}>填写标题</p>
                          <div className="flex items-center gap-2">
                            <input
                              className="flex-1 bg-[#F6F8FF] rounded-xl px-3 py-2.5 text-[#101828] outline-none"
                              style={{ fontSize: 15, border: "0.5px solid #D8E0F8" }}
                              placeholder="例如：MacBook Pro 发票"
                              value={titleInputs[item.id] ?? ""}
                              onChange={(e) => setTitleInputs((t) => ({ ...t, [item.id]: e.target.value }))}
                              autoFocus
                            />
                            <button
                              className="ios-tap px-3 py-2.5 rounded-xl font-semibold"
                              style={{ fontSize: 14, background: "#2563FF", color: "white", flexShrink: 0 }}
                              onClick={() => {
                                if (titleInputs[item.id]?.trim()) {
                                  setSavedTitles((s) => ({ ...s, [item.id]: titleInputs[item.id] }))
                                  triggerToast("标题已保存")
                                }
                                setActiveInline(null)
                              }}
                              aria-label="保存标题"
                            >
                              保存
                            </button>
                            <button
                              className="ios-tap w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ background: "#F6F8FF" }}
                              onClick={() => setActiveInline(null)}
                              aria-label="取消"
                            >
                              <X size={14} className="text-[#98A2B3]" />
                            </button>
                          </div>
                        </div>
                      ) : currentMode === "type" ? (
                        <div className="mt-3">
                          <p className="text-[#98A2B3] mb-1.5" style={{ fontSize: 12 }}>选择类型</p>
                          <div className="flex flex-wrap gap-2">
                            {TYPE_OPTIONS.map((t) => (
                              <button
                                key={t}
                                className="ios-tap px-3 py-2 rounded-xl font-medium"
                                style={{
                                  fontSize: 13,
                                  background: savedTypes[item.id] === t ? "#7C5CFF" : "#F0EBFF",
                                  color: savedTypes[item.id] === t ? "white" : "#7C5CFF",
                                }}
                                onClick={() => {
                                  setSavedTypes((s) => ({ ...s, [item.id]: t }))
                                  triggerToast(`类型已设为"${t}"`)
                                  setActiveInline(null)
                                }}
                                aria-label={t}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                          <button
                            className="ios-tap mt-2 text-[#98A2B3]"
                            style={{ fontSize: 13 }}
                            onClick={() => setActiveInline(null)}
                          >
                            取消
                          </button>
                        </div>
                      ) : currentMode === "tag" ? (
                        <div className="mt-3">
                          <p className="text-[#98A2B3] mb-1.5" style={{ fontSize: 12 }}>选择标签（可多选）</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {TAG_OPTIONS.map((t) => {
                              const selected = savedTags[item.id]?.includes(t)
                              return (
                                <button
                                  key={t}
                                  className="ios-tap px-3 py-2 rounded-xl font-medium"
                                  style={{
                                    fontSize: 13,
                                    background: selected ? "#14C8A8" : "#EDFAF7",
                                    color: selected ? "white" : "#14C8A8",
                                  }}
                                  onClick={() => {
                                    setSavedTags((s) => {
                                      const current = s[item.id] ?? []
                                      return {
                                        ...s,
                                        [item.id]: selected
                                          ? current.filter((x) => x !== t)
                                          : [...current, t],
                                      }
                                    })
                                  }}
                                  aria-label={t}
                                >
                                  {t}
                                </button>
                              )
                            })}
                          </div>
                          <button
                            className="ios-tap px-4 py-2 rounded-xl font-semibold"
                            style={{ fontSize: 14, background: "#14C8A8", color: "white" }}
                            onClick={() => {
                              if ((savedTags[item.id]?.length ?? 0) > 0) {
                                triggerToast("标签已保存")
                              }
                              setActiveInline(null)
                            }}
                            aria-label="完成"
                          >
                            完成
                          </button>
                        </div>
                      ) : currentMode === "object" ? (
                        <div className="mt-3">
                          <p className="text-[#98A2B3] mb-1.5" style={{ fontSize: 12 }}>关联对象</p>
                          <div className="bg-[#F6F8FF] rounded-xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                            {OBJECT_OPTIONS.map((obj, i, arr) => (
                              <button
                                key={obj}
                                className="ios-tap w-full flex items-center px-3 py-3 text-left"
                                style={{ borderBottom: i < arr.length - 1 ? "0.5px solid #E8ECF4" : "none" }}
                                onClick={() => {
                                  setSavedObjects((s) => ({ ...s, [item.id]: obj }))
                                  triggerToast(`已关联"${obj}"`)
                                  setActiveInline(null)
                                }}
                                aria-label={obj}
                              >
                                <span className="flex-1 font-medium text-[#101828]" style={{ fontSize: 14 }}>{obj}</span>
                                {savedObjects[item.id] === obj && (
                                  <CheckCircle2 size={16} className="text-[#14C8A8]" />
                                )}
                              </button>
                            ))}
                          </div>
                          <button
                            className="ios-tap mt-2 text-[#98A2B3]"
                            style={{ fontSize: 13 }}
                            onClick={() => setActiveInline(null)}
                          >
                            取消
                          </button>
                        </div>
                      ) : (() => {
                        // Compute remaining unfilled reasons
                        const remaining = item.reasons.filter((r) => {
                          if (r === "缺少标题" && savedTitles[item.id]) return false
                          if (r === "缺少类型" && savedTypes[item.id]) return false
                          if (r === "缺少标签" && (savedTags[item.id]?.length ?? 0) > 0) return false
                          if (r === "缺少关联对象" && savedObjects[item.id]) return false
                          return true
                        })
                        const allFilled = remaining.length === 0

                        return (
                          <div className="flex flex-col gap-2 mt-3">
                            {/* Quick action chips — only show for unfilled reasons */}
                            {!allFilled && (
                              <div className="flex flex-wrap gap-2">
                                {remaining.map((reason) => {
                                  if (reason === "缺少标题") return (
                                    <button
                                      key="title"
                                      className="ios-tap flex items-center gap-1.5 px-3 py-2 rounded-xl"
                                      style={{ background: reasonBg["缺少标题"], minHeight: 44 }}
                                      onClick={() => setActiveInline({ id: item.id, mode: "title" })}
                                      aria-label="补标题"
                                    >
                                      <AlignLeft size={14} strokeWidth={2} style={{ color: reasonColor["缺少标题"] }} />
                                      <span className="font-medium" style={{ fontSize: 13, color: reasonColor["缺少标题"] }}>补标题</span>
                                    </button>
                                  )
                                  if (reason === "缺少类型") return (
                                    <button
                                      key="type"
                                      className="ios-tap flex items-center gap-1.5 px-3 py-2 rounded-xl"
                                      style={{ background: reasonBg["缺少类型"], minHeight: 44 }}
                                      onClick={() => setActiveInline({ id: item.id, mode: "type" })}
                                      aria-label="选类型"
                                    >
                                      <Tag size={14} strokeWidth={2} style={{ color: reasonColor["缺少类型"] }} />
                                      <span className="font-medium" style={{ fontSize: 13, color: reasonColor["缺少类型"] }}>选类型</span>
                                    </button>
                                  )
                                  if (reason === "缺少标签") return (
                                    <button
                                      key="tag"
                                      className="ios-tap flex items-center gap-1.5 px-3 py-2 rounded-xl"
                                      style={{ background: reasonBg["缺少标签"], minHeight: 44 }}
                                      onClick={() => setActiveInline({ id: item.id, mode: "tag" })}
                                      aria-label="加标签"
                                    >
                                      <Tag size={14} strokeWidth={2} style={{ color: reasonColor["缺少标签"] }} />
                                      <span className="font-medium" style={{ fontSize: 13, color: reasonColor["缺少标签"] }}>加标签</span>
                                    </button>
                                  )
                                  if (reason === "缺少关联对象") return (
                                    <button
                                      key="object"
                                      className="ios-tap flex items-center gap-1.5 px-3 py-2 rounded-xl"
                                      style={{ background: reasonBg["缺少关联对象"], minHeight: 44 }}
                                      onClick={() => setActiveInline({ id: item.id, mode: "object" })}
                                      aria-label="关联对象"
                                    >
                                      <Link2 size={14} strokeWidth={2} style={{ color: reasonColor["缺少关联对象"] }} />
                                      <span className="font-medium" style={{ fontSize: 13, color: reasonColor["缺少关联对象"] }}>关联对象</span>
                                    </button>
                                  )
                                  return null
                                })}
                              </div>
                            )}

                            {/* Mark done — prominent when all filled, quiet link otherwise */}
                            {allFilled ? (
                              <button
                                className="ios-tap w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                                style={{ background: "#EDFAF7", color: "#0D9B81", fontSize: 15 }}
                                onClick={() => markDone(item.id)}
                                aria-label="标记整理完成"
                              >
                                <CheckSquare size={16} strokeWidth={2.2} />
                                标记整理完成
                              </button>
                            ) : (
                              <button
                                className="ios-tap py-2 rounded-xl text-center font-medium text-[#C8D0E8]"
                                style={{ fontSize: 13 }}
                                onClick={() => markDone(item.id)}
                                aria-label="跳过，标记已整理"
                              >
                                跳过，直接标为已整理
                              </button>
                            )}

                            <button
                              className="ios-tap w-full py-2.5 rounded-xl text-center font-medium text-[#667085]"
                              style={{ fontSize: 14, background: "#F6F8FF" }}
                              onClick={onSelectRecord}
                              aria-label="查看完整记录"
                            >
                              查看完整记录
                            </button>
                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="absolute bottom-28 inset-x-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "#101828", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
        >
          <CheckCircle2 size={16} className="text-[#14C8A8] flex-shrink-0" />
          <p className="text-white font-medium" style={{ fontSize: 14 }}>{toast}</p>
        </div>
      )}
    </div>
  )
}
