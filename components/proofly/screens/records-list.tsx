"use client"

import { useState } from "react"
import { Search, Plus, ChevronRight, Bell, Check } from "lucide-react"

const filters = ["全部", "合同", "发票", "收据", "保修", "PDF", "待整理"]

const records = [
  { emoji: "🧾", title: "MacBook Pro 发票", type: "发票", amount: "¥14,999", date: "2026-05-12", tag: "MacBook Pro 14", hasReminder: true },
  { emoji: "📄", title: "房屋租赁合同", type: "合同", amount: "¥6,800/月", date: "2026-05-11", tag: "徐汇租住房", hasReminder: true },
  { emoji: "🔧", title: "空调维修记录", type: "收据", amount: "¥420", date: "2026-05-08", tag: "客厅空调", hasReminder: false },
  { emoji: "🏥", title: "父亲年度体检报告", type: "体检报告", amount: "", date: "2026-04-20", tag: "父亲健康档案", hasReminder: true },
  { emoji: "💉", title: "儿童疫苗接种记录", type: "疫苗记录", amount: "", date: "2026-04-15", tag: "小宝健康档案", hasReminder: true },
  { emoji: "💊", title: "复诊处方和缴费单", type: "处方", amount: "¥386", date: "2026-04-10", tag: "父亲就医记录", hasReminder: false },
  { emoji: "📝", title: "林先生设计项目合同", type: "合同", amount: "¥18,000", date: "2026-03-15", tag: "林先生设计项目", hasReminder: false },
  { emoji: "💳", title: "尾款付款截图", type: "付款截图", amount: "¥9,000", date: "2026-03-12", tag: "林先生设计项目", hasReminder: true },
]

const typeColors: Record<string, { bg: string; text: string }> = {
  "发票": { bg: "#EEF4FF", text: "#007AFF" },
  "合同": { bg: "#F0EBFF", text: "#5856D6" },
  "收据": { bg: "#EDFAF7", text: "#34C759" },
  "体检报告": { bg: "#FFF3E0", text: "#FF9500" },
  "疫苗记录": { bg: "#EDFAF7", text: "#34C759" },
  "处方": { bg: "#FFF0F0", text: "#FF3B30" },
  "付款截图": { bg: "#EEF4FF", text: "#007AFF" },
}

const SORT_OPTIONS = [
  { id: "recent-add", label: "最近添加" },
  { id: "recent-update", label: "最近更新" },
  { id: "date-desc", label: "日期倒序" },
  { id: "expiry-asc", label: "即将到期" },
]

interface RecordsListProps {
  onSelectRecord: () => void
  onAddRecord: () => void
  onNavigate?: (screen: string) => void
}

export function RecordsList({ onSelectRecord, onAddRecord, onNavigate }: RecordsListProps) {
  const [activeFilter, setActiveFilter] = useState("全部")
  const [sortId, setSortId] = useState("recent-add")
  const [showSortSheet, setShowSortSheet] = useState(false)

  const sortLabel = SORT_OPTIONS.find((o) => o.id === sortId)?.label ?? "最近添加"

  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: "#000000" }}>记录</h1>
        <button
          className="ios-tap flex items-center justify-center"
          style={{ width: 44, height: 44 }}
          onClick={onAddRecord}
          aria-label="新建记录"
        >
          <Plus size={24} strokeWidth={2.2} style={{ color: "#007AFF" }} />
        </button>
      </div>

      {/* iOS-style search bar */}
      <div className="px-4 pb-2">
        <button
          className="ios-tap w-full flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(118,118,128,0.12)", height: 36 }}
          onClick={() => onNavigate?.("search")}
          aria-label="搜索记录"
        >
          <Search size={15} strokeWidth={2} style={{ color: "#8E8E93", flexShrink: 0 }} />
          <span style={{ fontSize: 15, color: "#8E8E93" }}>搜索</span>
        </button>
      </div>

      {/* Filter pills — iOS scroll tab style */}
      <div className="flex gap-2 px-4 pb-2 overflow-x-auto hide-scrollbar">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="ios-tap flex-shrink-0 px-3.5 rounded-full font-medium"
            style={{
              fontSize: 13,
              height: 30,
              background: activeFilter === f ? "#007AFF" : "rgba(118,118,128,0.12)",
              color: activeFilter === f ? "#FFFFFF" : "#3A3A3C",
              fontWeight: activeFilter === f ? 600 : 400,
            }}
            aria-label={f}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Sort row */}
      <div className="flex items-center justify-between px-4 pb-2">
        <span style={{ fontSize: 13, color: "#8E8E93" }}>46 条记录</span>
        <button
          className="ios-tap flex items-center gap-1"
          onClick={() => setShowSortSheet(true)}
          aria-label="排序方式"
        >
          <span style={{ fontSize: 13, color: "#007AFF", fontWeight: 500 }}>{sortLabel}</span>
          <ChevronRight size={13} strokeWidth={2.5} style={{ color: "#007AFF" }} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-24">
        <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
          {records.map((r, i) => {
            const tc = typeColors[r.type] || { bg: "#EEF4FF", text: "#007AFF" }
            return (
              <button
                key={r.title}
                className="ios-tap w-full flex items-start px-4 text-left"
                style={{
                  paddingTop: 11,
                  paddingBottom: 11,
                  borderBottom: i < records.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                }}
                onClick={onSelectRecord}
                aria-label={r.title}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5"
                  style={{ width: 30, height: 30, borderRadius: 7, background: tc.bg }}
                >
                  <span style={{ fontSize: 16 }}>{r.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className="font-medium leading-snug"
                      style={{ fontSize: 16, color: "#000000" }}
                    >
                      {r.title}
                    </p>
                    <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
                      {r.hasReminder && <Bell size={12} strokeWidth={2} style={{ color: "#FF9500" }} />}
                      <ChevronRight size={14} strokeWidth={2} style={{ color: "#C7C7CC" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className="px-1.5 rounded font-medium"
                      style={{ fontSize: 11, background: tc.bg, color: tc.text, paddingTop: 1, paddingBottom: 1 }}
                    >
                      {r.type}
                    </span>
                    {r.amount && (
                      <span style={{ fontSize: 12, color: "#3A3A3C", fontWeight: 600 }}>{r.amount}</span>
                    )}
                    <span style={{ fontSize: 12, color: "#8E8E93" }}>{r.date}</span>
                  </div>
                  {r.tag && (
                    <p style={{ fontSize: 12, color: "#8E8E93", marginTop: 2 }}>
                      <span style={{ color: "#C7C7CC" }}># </span>{r.tag}
                    </p>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Pending section */}
        <div className="mt-5">
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 4, paddingBottom: 6, paddingTop: 4 }}>待整理</p>
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden", border: "0.5px solid rgba(255,149,0,0.3)" }}>
            {["IMG_20260510.jpg", "doc_scan_0509.pdf", "receipt_photo.jpg"].map((name, i, arr) => (
              <button
                key={name}
                className="ios-tap w-full flex items-center px-4"
                style={{
                  height: 52,
                  borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                }}
                onClick={() => onNavigate?.("pending")}
                aria-label={name}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mr-3"
                  style={{ width: 30, height: 30, borderRadius: 7, background: "#FFF3E0" }}
                >
                  <span style={{ fontSize: 15 }}>{name.endsWith("pdf") ? "📄" : "📷"}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p style={{ fontSize: 15, color: "#000000", fontWeight: 500 }} className="truncate">{name}</p>
                  <p style={{ fontSize: 12, color: "#8E8E93" }}>未命名资料，点击整理</p>
                </div>
                <span
                  className="flex-shrink-0 px-2 rounded-full font-medium"
                  style={{ fontSize: 11, background: "#FFF3E0", color: "#FF9500", paddingTop: 2, paddingBottom: 2 }}
                >
                  待整理
                </span>
              </button>
            ))}
            <button
              className="ios-tap w-full flex items-center justify-center py-3"
              style={{ borderTop: "0.5px solid rgba(60,60,67,0.12)" }}
              onClick={() => onNavigate?.("pending")}
              aria-label="查看全部待整理"
            >
              <span style={{ fontSize: 15, color: "#007AFF", fontWeight: 500 }}>查看全部待整理</span>
            </button>
          </div>
        </div>
      </div>

      {/* iOS-style action sheet for sort */}
      {showSortSheet && (
        <div className="absolute inset-0 z-40" onClick={() => setShowSortSheet(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-8">
            {/* Options card */}
            <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }} className="mb-3">
              <p
                className="text-center py-3"
                style={{ fontSize: 13, color: "#8E8E93", borderBottom: "0.5px solid rgba(60,60,67,0.12)" }}
              >
                排序方式
              </p>
              {SORT_OPTIONS.map((opt, i) => (
                <button
                  key={opt.id}
                  className="ios-tap w-full flex items-center justify-between px-4"
                  style={{
                    height: 56,
                    borderBottom: i < SORT_OPTIONS.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                  }}
                  onClick={() => { setSortId(opt.id); setShowSortSheet(false) }}
                  aria-label={opt.label}
                >
                  <span
                    style={{
                      fontSize: 17,
                      color: sortId === opt.id ? "#007AFF" : "#000000",
                      fontWeight: sortId === opt.id ? 600 : 400,
                    }}
                  >
                    {opt.label}
                  </span>
                  {sortId === opt.id && (
                    <Check size={18} strokeWidth={2.5} style={{ color: "#007AFF" }} />
                  )}
                </button>
              ))}
            </div>
            {/* Cancel — separate card per iOS HIG */}
            <button
              className="ios-tap w-full flex items-center justify-center"
              style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}
              style={{ height: 56 }}
              onClick={() => setShowSortSheet(false)}
              aria-label="取消"
            >
              <span style={{ fontSize: 17, color: "#007AFF", fontWeight: 600 }}>取消</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
