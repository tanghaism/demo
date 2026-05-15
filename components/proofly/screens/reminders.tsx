"use client"

import { useState, useMemo, useCallback } from "react"
import { Bell, CheckCircle, Circle, AlertCircle, ExternalLink, SlidersHorizontal, ChevronRight } from "lucide-react"
import { FilterSheet, FilterCategory } from "@/components/proofly/filter-sheet"

type SegTab = "upcoming" | "done" | "expired"

const spaceOptions = ["家庭资料箱", "经营资料箱", "事业资料箱"]
const sortOptions = [
  { id: "date-asc", label: "日期升序" }, { id: "date-desc", label: "日期倒序" },
  { id: "days-asc", label: "即将到期优先" },
]

const FILTER_CATEGORIES: FilterCategory[] = [
  { id: "space", label: "资料箱", options: spaceOptions.map((s) => ({ id: s, label: s })), multiSelect: true },
  { id: "sort", label: "排序", options: sortOptions.map((s) => ({ id: s.id, label: s.label })), multiSelect: false },
]

interface Reminder {
  id: string
  emoji: string
  title: string
  object: string
  date: string
  days: number
  color: string
  done: boolean
  space: string
}

const initialReminders: Reminder[] = [
  { id: "r1", emoji: "💰", title: "林先生项目尾款", object: "林先生设计项目", date: "2026-05-20", days: 8, color: "#FF9500", done: false, space: "经营资料箱" },
  { id: "r2", emoji: "🏢", title: "营业执照年审", object: "上海分店", date: "2026-06-15", days: 34, color: "#2563FF", done: false, space: "经营资料箱" },
  { id: "r3", emoji: "🏥", title: "父亲复诊提醒", object: "父亲就医记录", date: "2026-06-08", days: 27, color: "#14C8A8", done: false, space: "家庭资料箱" },
  { id: "r4", emoji: "💉", title: "小宝疫苗接种", object: "小宝健康档案", date: "2026-07-12", days: 61, color: "#7C5CFF", done: false, space: "家庭资料箱" },
  { id: "r5", emoji: "📊", title: "绩效复盘", object: "当前公司", date: "2026-07-01", days: 50, color: "#98A2B3", done: false, space: "事业资料箱" },
  { id: "r6", emoji: "🔧", title: "MacBook 保修到期", object: "MacBook Pro 14", date: "2026-09-12", days: 122, color: "#FF9500", done: false, space: "家庭资料箱" },
  { id: "r7", emoji: "📋", title: "房屋租期到期", object: "徐汇租住房", date: "2026-11-30", days: 201, color: "#2563FF", done: false, space: "家庭资料箱" },
  { id: "r8", emoji: "🏠", title: "房屋合同续签确认", object: "徐汇租住房", date: "2026-05-01", days: 0, color: "#14C8A8", done: true, space: "家庭资料箱" },
  { id: "r9", emoji: "📊", title: "Q1 绩效自评提交", object: "当前公司", date: "2026-03-31", days: -43, color: "#FF3B30", done: false, space: "事业资料箱" },
  { id: "r10", emoji: "💊", title: "父亲降压药续方", object: "父亲就医记录", date: "2026-04-15", days: -28, color: "#FF3B30", done: false, space: "家庭资料箱" },
]

interface RemindersScreenProps {
  onNavigate: (screen: string) => void
  spaceFilter?: string
}

export function RemindersScreen({ onNavigate, spaceFilter }: RemindersScreenProps) {
  const [activeTab, setActiveTab] = useState<SegTab>("upcoming")
  const [notifBannerDismissed, setNotifBannerDismissed] = useState(false)
  const [allReminders, setAllReminders] = useState<Reminder[]>(initialReminders)
  const [showNotifSheet, setShowNotifSheet] = useState(false)
  const [showFilterSheet, setShowFilterSheet] = useState(false)

  const [selected, setSelected] = useState<Record<string, Set<string>>>(() => ({
    space: new Set(spaceFilter ? [spaceFilter] : []),
    sort: new Set(["days-asc"]),
  }))

  const handleApply = useCallback((applied: Record<string, Set<string>>) => {
    setSelected(applied)
  }, [])

  const selSpace = selected.space ?? new Set()

  const filteredReminders = useMemo(() => {
    return allReminders
      .filter((r) => selSpace.size === 0 || selSpace.has(r.space))
      .filter((r) => {
        if (activeTab === "done") return r.done
        if (activeTab === "expired") return !r.done && r.days < 0
        return !r.done && r.days >= 0
      })
  }, [activeTab, selSpace, allReminders])

  const toggleDone = (id: string) => {
    setAllReminders((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const newDone = !r.done
        // If marking as done (from upcoming/expired), switch to done tab
        if (newDone) setActiveTab("done")
        return { ...r, done: newDone }
      })
    )
  }

  const totalActive = selSpace.size

  const tabs: { id: SegTab; label: string }[] = [
    { id: "upcoming", label: "近期" }, { id: "done", label: "已完成" }, { id: "expired", label: "已过期" },
  ]

  // Count for each tab
  const expiredCount = allReminders.filter((r) => !r.done && r.days < 0).length
  const doneCount = allReminders.filter((r) => r.done).length

  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: "#000000" }}>提醒</h1>
        <div className="flex items-center gap-1">
          <button className="ios-tap flex items-center justify-center" style={{ width: 44, height: 44 }} onClick={() => setShowFilterSheet(true)} aria-label="筛选与排序">
            <SlidersHorizontal size={18} strokeWidth={2} style={{ color: totalActive > 0 ? "#2563FF" : "#8E8E93" }} />
          </button>
        </div>
      </div>

      {!notifBannerDismissed && (
        <div className="mx-4 mb-3 flex items-center gap-3 px-4 py-3" style={{ background: "#FFF8EC", borderRadius: 12 }}>
          <AlertCircle size={15} strokeWidth={2} style={{ color: "#FF9500", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "#8A5F00", flex: 1, lineHeight: 1.4 }}>系统通知未开启，App 内仍会保留提醒</p>
          <button className="ios-tap rounded-lg px-3 flex-shrink-0" style={{ fontSize: 13, fontWeight: 600, background: "#FF9500", color: "white", height: 30 }} onClick={() => setShowNotifSheet(true)} aria-label="去设置">去设置</button>
        </div>
      )}

      {spaceFilter && (
        <div className="px-4 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#EEF4FF" }}>
            <span style={{ fontSize: 14 }}>🏠</span>
            <span className="font-semibold text-[#2563FF]" style={{ fontSize: 12 }}>{spaceFilter}</span>
          </div>
        </div>
      )}

      <div className="px-4 pb-3">
        <div className="flex p-0.5 rounded-lg" style={{ background: "rgba(118,118,128,0.18)" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className="ios-tap flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md transition-all" style={{ background: activeTab === t.id ? "#FFFFFF" : "transparent", boxShadow: activeTab === t.id ? "0 1px 3px rgba(0,0,0,0.12)" : "none", minHeight: 32 }}>
              <span style={{ fontSize: 13, fontWeight: activeTab === t.id ? 600 : 400, color: activeTab === t.id ? "#000000" : "#8E8E93" }}>{t.label}</span>
              {t.id === "expired" && expiredCount > 0 && (<span className="flex items-center justify-center rounded-full" style={{ width: 16, height: 16, background: "#FF3B30", fontSize: 10, fontWeight: 700, color: "#FFFFFF" }}>{expiredCount}</span>)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-24">
        {filteredReminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <div className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: 16, background: "#E5E5EA" }}><Bell size={28} strokeWidth={1.5} style={{ color: "#C7C7CC" }} /></div>
            <p style={{ fontSize: 17, fontWeight: 600, color: "#000000" }}>{activeTab === "done" ? "暂无已完成提醒" : activeTab === "expired" ? "暂无已过期提醒" : "暂无近期提醒"}</p>
            <p style={{ fontSize: 15, color: "#8E8E93", textAlign: "center", lineHeight: 1.5, maxWidth: 220 }}>到期、尾款、保修都可以在这里提醒</p>
            {totalActive > 0 && <button className="ios-tap text-[#2563FF] font-medium" style={{ fontSize: 14 }} onClick={() => setSelected({ space: spaceFilter ? new Set([spaceFilter]) : new Set(), sort: new Set(["days-asc"]) })}>清除筛选</button>}
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            {filteredReminders.map((r, i) => {
              const isDone = r.done
              return (
                <div key={r.id} className="flex items-start px-4" style={{ paddingTop: 12, paddingBottom: 12, borderBottom: i < filteredReminders.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none", opacity: isDone ? 0.45 : 1 }}>
                  <button className="ios-tap flex-shrink-0 mr-3 mt-0.5" onClick={() => toggleDone(r.id)} aria-label={isDone ? "标记未完成" : "标记完成"}>
                    {isDone ? <CheckCircle size={22} strokeWidth={2} style={{ color: "#14C8A8" }} /> : <Circle size={22} strokeWidth={1.5} style={{ color: "#C7C7CC" }} />}
                  </button>
                  <button className="ios-tap flex-1 min-w-0 text-left" onClick={() => onNavigate("record-detail")}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: "#000000", textDecoration: isDone ? "line-through" : "none" }}>{r.title}</p>
                    <p style={{ fontSize: 13, color: "#8E8E93", marginTop: 2 }}>{r.object}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p style={{ fontSize: 13, color: "#8E8E93" }}>{r.date}</p>
                      {!spaceFilter && <span className="text-[#98A2B3]" style={{ fontSize: 11 }}>{r.space}</span>}
                    </div>
                  </button>
                  <div className="flex items-center gap-2 ml-2">
                    {!isDone && (
                      <span className="flex-shrink-0 px-2 rounded-full mt-0.5" style={{ fontSize: 12, fontWeight: 600, background: `${r.color}18`, color: r.color, paddingTop: 3, paddingBottom: 3 }}>
                        {r.days === 0 ? "今天" : r.days < 0 ? `超${Math.abs(r.days)}天` : `${r.days}天后`}
                      </span>
                    )}
                    <ChevronRight size={14} strokeWidth={2} style={{ color: "#C8D0E8" }} />
                  </div>
                </div>
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

      {showNotifSheet && (
        <div className="absolute inset-0 z-40" onClick={() => setShowNotifSheet(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-8" style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.18)" }} onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col items-center text-center px-5 mb-5"><div className="flex items-center justify-center mb-3" style={{ width: 48, height: 48, borderRadius: 12, background: "#FFF3E0" }}><Bell size={22} strokeWidth={1.8} style={{ color: "#FF9500" }} /></div><p style={{ fontSize: 18, fontWeight: 700, color: "#000000" }}>开启系统通知</p><p style={{ fontSize: 14, color: "#8E8E93", marginTop: 4, lineHeight: 1.5 }}>需要在 iPhone 系统设置中手动开启 Proofly 的通知权限</p></div>
            <div className="px-4 mb-5"><div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>{[{ step: "1", text: "打开 iPhone「设置」App" }, { step: "2", text: "向下滚动找到「Proofly」" }, { step: "3", text: "点击「通知」，开启「允许通知」" }].map((item, i, arr) => (<div key={item.step} className="flex items-center px-4" style={{ height: 48, borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none" }}><div className="flex items-center justify-center flex-shrink-0 mr-3" style={{ width: 24, height: 24, borderRadius: 12, background: "#EEF4FF" }}><span style={{ fontSize: 13, fontWeight: 700, color: "#2563FF" }}>{item.step}</span></div><span style={{ fontSize: 15, color: "#000000" }}>{item.text}</span></div>))}</div></div>
            <div className="flex flex-col gap-2 px-4"><button className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl" style={{ height: 50, background: "#FF9500" }} onClick={() => { setShowNotifSheet(false); setNotifBannerDismissed(true) }}><ExternalLink size={17} strokeWidth={2} style={{ color: "#FFFFFF" }} /><span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>已在系统设置中开启</span></button><button className="ios-tap w-full flex items-center justify-center rounded-xl" style={{ height: 50, background: "#F2F2F7" }} onClick={() => setShowNotifSheet(false)}><span style={{ fontSize: 17, color: "#000000" }}>稍后再说</span></button></div>
          </div>
        </div>
      )}
    </div>
  )
}
