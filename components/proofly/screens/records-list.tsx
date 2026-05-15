"use client"

import { useState, useMemo, useCallback } from "react"
import { Search, Plus, ChevronRight, Bell, SlidersHorizontal } from "lucide-react"
import { FilterSheet, FilterCategory } from "@/components/proofly/filter-sheet"

const spaceOptions = ["家庭资料箱", "经营资料箱", "事业资料箱"]
const typeOptions = ["合同", "发票", "收据", "保修", "PDF", "待整理"]
const objectOptions = ["MacBook Pro 14", "徐汇租住房", "父亲健康档案", "小宝健康档案", "林先生设计项目", "上海分店", "当前公司", "职业证书"]
const templateOptions = ["发票 / 收据", "合同", "保修记录", "体检报告", "处方 / 用药", "疫苗接种", "报价单", "付款截图", "绩效记录"]
const sortOptions = [
  { id: "recent-add", label: "最近添加" }, { id: "recent-update", label: "最近更新" },
  { id: "date-desc", label: "日期倒序" }, { id: "expiry-asc", label: "即将到期" },
]

const FILTER_CATEGORIES: FilterCategory[] = [
  { id: "space", label: "资料箱", options: spaceOptions.map((s) => ({ id: s, label: s })), multiSelect: true },
  { id: "object", label: "对象", options: objectOptions.map((o) => ({ id: o, label: o })), multiSelect: true },
  { id: "template", label: "模板", options: templateOptions.map((t) => ({ id: t, label: t })), multiSelect: true },
  { id: "sort", label: "排序", options: sortOptions.map((s) => ({ id: s.id, label: s.label })), multiSelect: false },
]

const records = [
  { emoji: "🧾", title: "MacBook Pro 发票", type: "发票", amount: "¥14,999", date: "2026-05-12", tag: "MacBook Pro 14", hasReminder: true, space: "家庭资料箱", object: "MacBook Pro 14", template: "发票 / 收据" },
  { emoji: "📄", title: "房屋租赁合同", type: "合同", amount: "¥6,800/月", date: "2026-05-11", tag: "徐汇租住房", hasReminder: true, space: "家庭资料箱", object: "徐汇租住房", template: "合同" },
  { emoji: "🔧", title: "空调维修记录", type: "收据", amount: "¥420", date: "2026-05-08", tag: "客厅空调", hasReminder: false, space: "家庭资料箱", object: "徐汇租住房", template: "保修记录" },
  { emoji: "🏥", title: "父亲年度体检报告", type: "体检报告", amount: "", date: "2026-04-20", tag: "父亲健康档案", hasReminder: true, space: "家庭资料箱", object: "父亲健康档案", template: "体检报告" },
  { emoji: "💉", title: "儿童疫苗接种记录", type: "疫苗记录", amount: "", date: "2026-04-15", tag: "小宝健康档案", hasReminder: true, space: "家庭资料箱", object: "小宝健康档案", template: "疫苗接种" },
  { emoji: "💊", title: "复诊处方和缴费单", type: "处方", amount: "¥386", date: "2026-04-10", tag: "父亲就医记录", hasReminder: false, space: "家庭资料箱", object: "父亲健康档案", template: "处方 / 用药" },
  { emoji: "📝", title: "林先生设计项目合同", type: "合同", amount: "¥18,000", date: "2026-03-15", tag: "林先生设计项目", hasReminder: false, space: "经营资料箱", object: "林先生设计项目", template: "合同" },
  { emoji: "💳", title: "尾款付款截图", type: "付款截图", amount: "¥9,000", date: "2026-03-12", tag: "林先生设计项目", hasReminder: true, space: "经营资料箱", object: "林先生设计项目", template: "付款截图" },
  { emoji: "📜", title: "营业执照副本", type: "证照", amount: "", date: "2026-02-01", tag: "上海分店", hasReminder: true, space: "经营资料箱", object: "上海分店", template: "发票 / 收据" },
  { emoji: "📊", title: "2025 年度绩效反馈", type: "绩效记录", amount: "", date: "2026-01-15", tag: "当前公司", hasReminder: false, space: "事业资料箱", object: "当前公司", template: "绩效记录" },
  { emoji: "🎓", title: "高级前端证书", type: "证书", amount: "", date: "2025-12-01", tag: "职业证书", hasReminder: false, space: "事业资料箱", object: "职业证书", template: "发票 / 收据" },
]

const typeColors: Record<string, { bg: string; text: string }> = {
  "发票": { bg: "#EEF4FF", text: "#2563FF" }, "合同": { bg: "#F0EBFF", text: "#7C5CFF" },
  "收据": { bg: "#EDFAF7", text: "#14C8A8" }, "体检报告": { bg: "#FFF3E0", text: "#FF9500" },
  "疫苗记录": { bg: "#EDFAF7", text: "#14C8A8" }, "处方": { bg: "#FFF0F0", text: "#FF3B30" },
  "付款截图": { bg: "#EEF4FF", text: "#2563FF" }, "证照": { bg: "#F0EBFF", text: "#7C5CFF" },
  "绩效记录": { bg: "#EEF4FF", text: "#2563FF" }, "证书": { bg: "#EDFAF7", text: "#14C8A8" },
}

interface RecordsListProps {
  onSelectRecord: () => void
  onAddRecord: () => void
  onNavigate?: (screen: string) => void
  spaceFilter?: string
}

export function RecordsList({ onSelectRecord, onAddRecord, onNavigate, spaceFilter }: RecordsListProps) {
  // selected: categoryId -> Set of option ids; for single-select categories we only keep one
  const [selected, setSelected] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {
      space: new Set(spaceFilter ? [spaceFilter] : []),
      object: new Set(),
      template: new Set(),
      sort: new Set(["recent-add"]),
    }
    return init
  })
  const [showFilterSheet, setShowFilterSheet] = useState(false)

  // Keep space locked when spaceFilter prop changes
  if (spaceFilter && !selected.space?.has(spaceFilter)) {
    // Don't update during render — use an effect-like pattern
  }

  const handleApply = useCallback((applied: Record<string, Set<string>>) => {
    setSelected(applied)
  }, [])

  // Compute sort label
  const sortId = [...(selected.sort ?? [])][0] ?? "recent-add"
  const sortLabel = sortOptions.find((o) => o.id === sortId)?.label ?? "最近添加"

  // Compute total active filters (excluding sort)
  const totalActive = Object.entries(selected)
    .filter(([key]) => key !== "sort")
    .reduce((sum, [, opts]) => {
      const count = opts.size
      return sum + count
    }, 0)

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const selSpace = selected.space
      if (selSpace && selSpace.size > 0 && !selSpace.has(r.space)) return false
      const selObj = selected.object
      if (selObj && selObj.size > 0 && !selObj.has(r.object)) return false
      const selTmpl = selected.template
      if (selTmpl && selTmpl.size > 0 && !selTmpl.has(r.template)) return false
      return true
    })
  }, [selected])

  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: "#000000" }}>记录</h1>
        <button className="ios-tap flex items-center justify-center" style={{ width: 44, height: 44 }} onClick={onAddRecord} aria-label="新建记录">
          <Plus size={24} strokeWidth={2.2} style={{ color: "#2563FF" }} />
        </button>
      </div>

      <div className="px-4 pb-2">
        <button className="ios-tap w-full flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "rgba(118,118,128,0.12)", height: 36 }} onClick={() => onNavigate?.("search")} aria-label="搜索记录">
          <Search size={15} strokeWidth={2} style={{ color: "#8E8E93", flexShrink: 0 }} /><span style={{ fontSize: 15, color: "#8E8E93" }}>搜索</span>
        </button>
      </div>

      {spaceFilter && (
        <div className="px-4 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#EEF4FF" }}>
            <span style={{ fontSize: 14 }}>🏠</span>
            <span className="font-semibold text-[#2563FF]" style={{ fontSize: 12 }}>{spaceFilter}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 pb-2">
        <span className="text-[#98A2B3]" style={{ fontSize: 13 }}>{filteredRecords.length} 条记录</span>
        <div className="flex items-center gap-3">
          <button className="ios-tap flex items-center gap-1" onClick={() => setShowFilterSheet(true)} aria-label="筛选与排序">
            <SlidersHorizontal size={14} strokeWidth={2} style={{ color: totalActive > 0 ? "#2563FF" : "#98A2B3" }} />
            <span style={{ fontSize: 13, color: totalActive > 0 ? "#2563FF" : "#98A2B3", fontWeight: totalActive > 0 ? 600 : 400 }}>
              筛选{totalActive > 0 ? ` (${totalActive})` : ""} · {sortLabel}
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-24">
        {filteredRecords.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-[#F6F8FF] flex items-center justify-center"><span style={{ fontSize: 28 }}>📂</span></div>
            <p className="font-semibold text-[#101828]" style={{ fontSize: 16 }}>没有匹配记录</p>
            {totalActive > 0 && (
              <button className="ios-tap text-[#2563FF] font-medium" style={{ fontSize: 14 }} onClick={() => setSelected({ space: spaceFilter ? new Set([spaceFilter]) : new Set(), object: new Set(), template: new Set(), sort: new Set(["recent-add"]) })}>清除筛选</button>
            )}
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            {filteredRecords.map((r, i) => {
              const tc = typeColors[r.type] || { bg: "#EEF4FF", text: "#2563FF" }
              return (
                <button key={r.title + r.space + i} className="ios-tap w-full flex items-start px-4 text-left" style={{ paddingTop: 11, paddingBottom: 11, borderBottom: i < filteredRecords.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none" }} onClick={onSelectRecord} aria-label={r.title}>
                  <div className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5" style={{ width: 30, height: 30, borderRadius: 7, background: tc.bg }}><span style={{ fontSize: 16 }}>{r.emoji}</span></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-snug" style={{ fontSize: 16, color: "#000000" }}>{r.title}</p>
                      <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">{r.hasReminder && <Bell size={12} strokeWidth={2} style={{ color: "#FF9500" }} />}<ChevronRight size={14} strokeWidth={2} style={{ color: "#C7C7CC" }} /></div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="px-1.5 rounded font-medium" style={{ fontSize: 11, background: tc.bg, color: tc.text, paddingTop: 1, paddingBottom: 1 }}>{r.type}</span>
                      {r.amount && <span style={{ fontSize: 12, color: "#3A3A3C", fontWeight: 600 }}>{r.amount}</span>}
                      <span style={{ fontSize: 12, color: "#8E8E93" }}>{r.date}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {!spaceFilter && <span className="text-[#98A2B3]" style={{ fontSize: 11 }}>{r.space}</span>}
                      {r.tag && <span className="text-[#98A2B3]" style={{ fontSize: 11 }}>#{r.tag}</span>}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {showFilterSheet && (
        <FilterSheet
          categories={FILTER_CATEGORIES}
          initialSelected={selected}
          onApply={handleApply}
          onClose={() => setShowFilterSheet(false)}
        />
      )}
    </div>
  )
}
