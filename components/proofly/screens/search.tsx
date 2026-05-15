"use client"

import { useState } from "react"
import { Search, X, ChevronRight, Info } from "lucide-react"
import { AmbientBackground } from "@/components/proofly/ambient-background"
import { PremiumCard } from "@/components/proofly/premium-card"

const allRecords = [
  { emoji: "🧾", title: "MacBook Pro 发票", type: "发票", date: "2026-05-12", amount: "¥14,999", hasPdf: true, hasReminder: false, isPending: false, isThisMonth: true },
  { emoji: "📄", title: "房屋租赁合同", type: "合同", date: "2026-05-11", amount: "¥6,800/月", hasPdf: true, hasReminder: true, isPending: false, isThisMonth: true },
  { emoji: "🔧", title: "空调维修记录", type: "收据", date: "2026-05-08", amount: "¥420", hasPdf: false, hasReminder: false, isPending: false, isThisMonth: true },
  { emoji: "🏥", title: "父亲年度体检报告", type: "体检报告", date: "2026-04-20", amount: "", hasPdf: true, hasReminder: true, isPending: false, isThisMonth: false },
  { emoji: "💊", title: "复诊处方和缴费单", type: "处方", date: "2026-04-10", amount: "¥386", hasPdf: false, hasReminder: false, isPending: true, isThisMonth: false },
  { emoji: "📝", title: "林先生设计项目合同", type: "合同", date: "2026-03-15", amount: "¥18,000", hasPdf: true, hasReminder: true, isPending: false, isThisMonth: false },
  { emoji: "📜", title: "营业执照副本", type: "证照", date: "2026-02-01", amount: "", hasPdf: false, hasReminder: false, isPending: true, isThisMonth: false },
  { emoji: "🏆", title: "高级前端证书", type: "证书", date: "2026-01-15", amount: "", hasPdf: false, hasReminder: false, isPending: false, isThisMonth: false },
]

const allObjects = [
  { emoji: "💻", name: "MacBook Pro 14", type: "物品", count: 3 },
  { emoji: "🏠", name: "徐汇租住房", type: "房屋", count: 5 },
  { emoji: "👴", name: "父亲健康档案", type: "健康档案", count: 8 },
  { emoji: "👶", name: "小宝健康档案", type: "健康档案", count: 4 },
  { emoji: "📁", name: "林先生设计项目", type: "项目", count: 6 },
]

type QuickFilter = "hasReminder" | "isPending" | "hasPdf" | "isThisMonth" | null

const quickFilters: { id: QuickFilter; label: string }[] = [
  { id: "hasReminder", label: "有提醒" },
  { id: "isPending", label: "待整理" },
  { id: "hasPdf", label: "PDF" },
  { id: "isThisMonth", label: "本月新增" },
]

const allEvents = [
  { emoji: "💻", title: "购买 MacBook Pro", object: "MacBook Pro 14", date: "2026-05-12" },
  { emoji: "💰", title: "支付定金", object: "林先生设计项目", date: "2026-03-01" },
  { emoji: "📦", title: "交付初稿", object: "林先生设计项目", date: "2026-04-10" },
  { emoji: "🔧", title: "保修到期提醒", object: "MacBook Pro 14", date: "2027-05-12" },
  { emoji: "🏥", title: "父亲复诊提醒", object: "父亲健康档案", date: "2026-06-08" },
]

const recentSearches = ["MacBook", "租赁合同", "体检"]

const typeColors: Record<string, { bg: string; text: string }> = {
  "发票": { bg: "rgba(37,99,255,0.12)", text: "#007AFF" },
  "合同": { bg: "rgba(124,92,255,0.13)", text: "#5856D6" },
  "收据": { bg: "rgba(52,199,89,0.12)", text: "#34C759" },
  "体检报告": { bg: "rgba(255,149,0,0.14)", text: "#FF9500" },
  "处方": { bg: "rgba(255,59,48,0.13)", text: "#FF3B30" },
}

interface SearchScreenProps {
  onClose: () => void
  onSelectRecord: () => void
  onSelectObject?: () => void
  onSelectEvent?: () => void
}

export function SearchScreen({ onClose, onSelectRecord, onSelectObject, onSelectEvent }: SearchScreenProps) {
  const [query, setQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<QuickFilter>(null)

  const filteredRecords = allRecords.filter((r) => {
    const matchesQuery =
      query.length === 0 ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.type.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = activeFilter === null || r[activeFilter] === true
    return matchesQuery && matchesFilter
  })

  const matchedObjects = query.length > 0
    ? allObjects.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
    : []

  const matchedEvents = query.length > 0
    ? allEvents.filter(
        (e) =>
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.object.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const isSearching = query.length > 0 || activeFilter !== null
  const noResults = isSearching && filteredRecords.length === 0 && matchedObjects.length === 0 && matchedEvents.length === 0

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
      <AmbientBackground />

      {/* iOS search bar + cancel */}
      <div className="relative z-10 flex items-center gap-2.5 px-4 pt-3 pb-2">
        <div
          className="flex items-center gap-2 flex-1 px-3 rounded-xl"
          style={{ background: "var(--premium-control-surface-strong)", border: "1px solid var(--premium-control-border)", height: 36 }}
        >
          <Search size={15} strokeWidth={2} style={{ color: "var(--premium-text-subtle)", flexShrink: 0 }} />
          <input
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 15, color: "var(--premium-text)" }}
            placeholder="标题、标签或文件名"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="ios-tap" onClick={() => setQuery("")} aria-label="清除">
              <div
                className="flex items-center justify-center"
                style={{ width: 16, height: 16, borderRadius: 8, background: "#8E8E93" }}
              >
                <X size={10} strokeWidth={2.5} style={{ color: "#FFFFFF" }} />
              </div>
            </button>
          )}
        </div>
        <button
          className="ios-tap flex-shrink-0"
          style={{ fontSize: 17, color: "#4C6FFF" }}
          onClick={onClose}
          aria-label="取消"
        >
          取消
        </button>
      </div>

      {/* Quick filter pills — same iOS style as records-list */}
      <div className="relative z-10 flex gap-2 px-4 pb-2 overflow-x-auto hide-scrollbar">
        {quickFilters.map((f) => {
          const isActive = activeFilter === f.id
          return (
            <button
              key={f.id}
              className="ios-tap flex-shrink-0 px-3.5 rounded-full"
              style={{
                fontSize: 13,
                height: 30,
            background: isActive ? "#4C6FFF" : "var(--premium-control-surface-strong)",
            color: isActive ? "#FFFFFF" : "var(--premium-text-muted)",
                fontWeight: isActive ? 600 : 400,
              }}
              onClick={() => setActiveFilter(isActive ? null : f.id)}
              aria-label={f.label}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-6">

        {/* No results */}
        {noResults && (
          <div className="flex flex-col items-center justify-center pt-14 gap-3 px-6">
            <div
              className="flex items-center justify-center"
              style={{ width: 64, height: 64, borderRadius: 16, background: "var(--premium-icon-neutral-bg)" }}
            >
              <Search size={24} strokeWidth={1.5} style={{ color: "var(--premium-icon-neutral-fg)" }} />
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: "var(--premium-text)" }}>没有找到匹配资料</p>
            <p style={{ fontSize: 15, color: "var(--premium-text-subtle)", textAlign: "center", lineHeight: 1.5 }}>
              试试标题、标签或文件名
            </p>
            <SearchHint />
          </div>
        )}

        {/* Default state */}
        {!isSearching && (
          <div className="px-4">
            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 4, paddingBottom: 6, paddingTop: 8 }}>最近搜索</p>
            <div className="flex flex-wrap gap-2 mb-4 px-0">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  className="ios-tap px-4 py-2"
                  style={{ fontSize: 14, color: "var(--premium-text)", background: "var(--premium-surface)", borderRadius: 12, overflow: "hidden" }}
                  onClick={() => setQuery(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 4, paddingBottom: 6, paddingTop: 4 }}>全部对象</p>
            <PremiumCard className="rounded-[18px]">
              {allObjects.map((obj, i, arr) => (
                <button
                  key={obj.name}
                  className="ios-tap w-full flex items-center px-4"
                  style={{
                    height: 52,
                    borderBottom: i < arr.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
                  }}
                  onClick={() => (onSelectObject ?? onSelectRecord)()}
                  aria-label={obj.name}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 mr-3"
                    style={{ width: 30, height: 30, borderRadius: 7, background: "var(--premium-icon-blue-bg)" }}
                  >
                    <span style={{ fontSize: 17 }}>{obj.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p style={{ fontSize: 16, color: "var(--premium-text)", fontWeight: 500 }}>{obj.name}</p>
                    <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{obj.type} · {obj.count} 条记录</p>
                  </div>
                  <ChevronRight size={16} strokeWidth={2} style={{ color: "var(--premium-chevron)" }} />
                </button>
              ))}
            </PremiumCard>

            <div className="mt-4">
              <SearchHint />
            </div>
          </div>
        )}

        {/* Search results */}
        {isSearching && !noResults && (
          <div className="px-4 flex flex-col gap-4">
            {filteredRecords.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 4, paddingBottom: 6, paddingTop: 8 }}>
                  记录 / 资料 · {filteredRecords.length} 条
                </p>
                <PremiumCard className="rounded-[18px]">
                  {filteredRecords.map((r, i) => {
                    const tc = typeColors[r.type] || { bg: "#EEF4FF", text: "#007AFF" }
                    return (
                      <button
                        key={r.title}
                        className="ios-tap w-full flex items-center px-4"
                        style={{
                          minHeight: 52,
                          paddingTop: 10,
                          paddingBottom: 10,
                          borderBottom: i < filteredRecords.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
                        }}
                        onClick={onSelectRecord}
                        aria-label={r.title}
                      >
                        <div
                          className="flex items-center justify-center flex-shrink-0 mr-3"
                          style={{ width: 30, height: 30, borderRadius: 7, background: tc.bg }}
                        >
                          <span style={{ fontSize: 17 }}>{r.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p style={{ fontSize: 16, color: "var(--premium-text)", fontWeight: 500 }} className="truncate">{r.title}</p>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span
                              className="px-1.5 rounded"
                              style={{ fontSize: 11, background: tc.bg, color: tc.text, fontWeight: 600, paddingTop: 1, paddingBottom: 1 }}
                            >
                              {r.type}
                            </span>
                            {r.amount && <span style={{ fontSize: 12, color: "var(--premium-text-muted)" }}>{r.amount}</span>}
                            <span style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{r.date}</span>
                            {r.isPending && (
                              <span
                                className="px-1.5 rounded"
                                style={{ fontSize: 11, background: "#FFF3E0", color: "#FF9500", fontWeight: 600, paddingTop: 1, paddingBottom: 1 }}
                              >
                                待整理
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight size={16} strokeWidth={2} style={{ color: "var(--premium-chevron)", flexShrink: 0 }} />
                      </button>
                    )
                  })}
                </PremiumCard>
              </div>
            )}

            {matchedObjects.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 4, paddingBottom: 6, paddingTop: 4 }}>
                  对象 · {matchedObjects.length} 个
                </p>
                <PremiumCard className="rounded-[18px]">
                  {matchedObjects.map((obj, i, arr) => (
                    <button
                      key={obj.name}
                      className="ios-tap w-full flex items-center px-4"
                      style={{
                        height: 52,
                        borderBottom: i < arr.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
                      }}
                      onClick={() => (onSelectObject ?? onSelectRecord)()}
                      aria-label={obj.name}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0 mr-3"
                        style={{ width: 30, height: 30, borderRadius: 7, background: "var(--premium-icon-blue-bg)" }}
                      >
                        <span style={{ fontSize: 17 }}>{obj.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p style={{ fontSize: 16, color: "var(--premium-text)", fontWeight: 500 }}>{obj.name}</p>
                        <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{obj.type} · {obj.count} 条记录</p>
                      </div>
                      <ChevronRight size={16} strokeWidth={2} style={{ color: "var(--premium-chevron)" }} />
                    </button>
                  ))}
                </PremiumCard>
              </div>
            )}

            {matchedEvents.length > 0 && (
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 4, paddingBottom: 6, paddingTop: 4 }}>
                  事件 · {matchedEvents.length} 条
                </p>
                <PremiumCard className="rounded-[18px]">
                  {matchedEvents.map((ev, i, arr) => (
                    <button
                      key={ev.title + ev.date}
                      className="ios-tap w-full flex items-center px-4"
                      style={{
                        height: 52,
                        borderBottom: i < arr.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
                      }}
                      onClick={() => (onSelectEvent ?? onSelectObject ?? onSelectRecord)()}
                      aria-label={ev.title}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0 mr-3"
                        style={{ width: 30, height: 30, borderRadius: 7, background: "var(--premium-icon-indigo-bg)" }}
                      >
                        <span style={{ fontSize: 17 }}>{ev.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p style={{ fontSize: 16, color: "var(--premium-text)", fontWeight: 500 }}>{ev.title}</p>
                        <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{ev.object} · {ev.date}</p>
                      </div>
                      <ChevronRight size={16} strokeWidth={2} style={{ color: "var(--premium-chevron)" }} />
                    </button>
                  ))}
                </PremiumCard>
              </div>
            )}

            <SearchHint />
          </div>
        )}
      </div>
    </div>
  )
}

function SearchHint() {
  return (
    <div className="premium-glass flex items-start gap-2.5 px-4 py-3 rounded-2xl">
      <Info size={14} strokeWidth={2} style={{ color: "var(--premium-text-subtle)", flexShrink: 0, marginTop: 1 }} />
      <p style={{ fontSize: 13, color: "var(--premium-text-subtle)", lineHeight: 1.5 }}>
        不搜索图片和 PDF 内部文字，仅搜索手动填写的信息和文件名。
      </p>
    </div>
  )
}
