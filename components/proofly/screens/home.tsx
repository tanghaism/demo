"use client"

import { useState, useMemo } from "react"
import {
  Search, Layers, ChevronRight, Bell,
  MoreHorizontal, Pencil, Trash2, Shield, AlertCircle, X,
} from "lucide-react"
import { SpaceSelectSheet } from "@/components/proofly/space-select-sheet"

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

const recentRecords = [
  { emoji: "🧾", title: "MacBook Pro 发票", type: "发票", amount: "¥14,999", date: "今天", tag: "MacBook Pro 14" },
  { emoji: "📄", title: "房屋租赁合同", type: "合同", amount: "¥6,800/月", date: "昨天", tag: "徐汇租住房" },
  { emoji: "🏥", title: "父亲年度体检报告", type: "体检报告", amount: "", date: "3天前", tag: "父亲健康档案" },
  { emoji: "💊", title: "复诊处方和缴费单", type: "处方", amount: "¥386", date: "5天前", tag: "父亲就医记录" },
]

const upcomingReminders = [
  { emoji: "💰", title: "林先生项目尾款", date: "2026-05-20", days: 8, color: "#FF9500" },
  { emoji: "🏢", title: "营业执照年审", date: "2026-06-15", days: 34, color: "#2563FF" },
  { emoji: "🏥", title: "父亲复诊提醒", date: "2026-06-08", days: 27, color: "#14C8A8" },
]

const objects = [
  { emoji: "💻", name: "MacBook" },
  { emoji: "🏠", name: "徐汇租房" },
  { emoji: "👴", name: "父亲档案" },
  { emoji: "👶", name: "小宝档案" },
  { emoji: "📁", name: "林先生项目" },
]

const typeColors: Record<string, { bg: string; text: string }> = {
  "发票": { bg: "#EEF4FF", text: "#2563FF" },
  "合同": { bg: "#F0EBFF", text: "#7C5CFF" },
  "体检报告": { bg: "#FFF3E0", text: "#FF9500" },
  "处方": { bg: "#FFF0F0", text: "#FF3B30" },
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [showSpaceSheet, setShowSpaceSheet] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showMoreSheet, setShowMoreSheet] = useState(false)
  const [currentSpace, setCurrentSpace] = useState("家庭资料箱")
  const [searchQuery, setSearchQuery] = useState("")

  // Fuzzy filter across records, objects, reminders, and templates
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return null

    const match = (text: string) => text.toLowerCase().includes(q)

    const matchedRecords = recentRecords.filter(
      (r) => match(r.title) || match(r.type) || match(r.tag) || match(r.amount)
    )
    const matchedObjects = objects.filter((o) => match(o.name))
    const matchedReminders = upcomingReminders.filter((r) => match(r.title))

    // Built-in template names for the current space
    const templateNames = ["发票 / 收据", "合同", "保修记录", "体检报告", "处方 / 用药", "疫苗接种"]
    const matchedTemplates = templateNames.filter((t) => match(t))

    return {
      records: matchedRecords,
      objects: matchedObjects,
      reminders: matchedReminders,
      templates: matchedTemplates,
      hasResults:
        matchedRecords.length > 0 ||
        matchedObjects.length > 0 ||
        matchedReminders.length > 0 ||
        matchedTemplates.length > 0,
    }
  }, [searchQuery])

  const isSearching = searchQuery.trim().length > 0

  return (
    <div className="flex flex-col h-full" style={{ background: "#F6F8FF", paddingTop: 54 }}>

      {/* ── Header ── */}
      <div className="px-4 pt-4 pb-1">
        {/* Search bar — full width row */}
        <div
          className="flex items-center gap-2 px-3 rounded-xl mb-3"
          style={{ background: "rgba(118,118,128,0.1)", height: 36 }}
        >
          <Search size={15} strokeWidth={2} style={{ color: "#98A2B3", flexShrink: 0 }} />
          <input
            className="flex-1 bg-transparent outline-none text-[#101828]"
            style={{ fontSize: 15 }}
            placeholder="搜索对象、资料、模板…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {isSearching && (
            <button className="ios-tap" onClick={() => setSearchQuery("")} aria-label="清除">
              <div
                className="flex items-center justify-center"
                style={{ width: 16, height: 16, borderRadius: 8, background: "#98A2B3" }}
              >
                <X size={10} strokeWidth={2.5} style={{ color: "#FFFFFF" }} />
              </div>
            </button>
          )}
        </div>

        {/* Space name + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 42, height: 42, borderRadius: 14, background: "#EEF4FF" }}
            >
              <span style={{ fontSize: 24 }}>🏠</span>
            </div>
            <div>
              <p className="text-[#98A2B3] font-medium" style={{ fontSize: 11 }}>当前资料箱</p>
              <h1 className="font-bold text-[#101828]" style={{ fontSize: 22, letterSpacing: -0.4, lineHeight: 1.2 }}>
                {currentSpace}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="ios-tap flex items-center justify-center rounded-xl"
              style={{ width: 38, height: 38, background: "#F6F8FF" }}
              onClick={() => setShowSpaceSheet(true)}
              aria-label="切换资料箱"
            >
              <Layers size={18} strokeWidth={2} style={{ color: "#2563FF" }} />
            </button>
            <button
              className="ios-tap flex items-center justify-center rounded-xl"
              style={{ width: 38, height: 38, background: "#F6F8FF" }}
              onClick={() => setShowMoreSheet(true)}
              aria-label="更多操作"
            >
              <MoreHorizontal size={18} strokeWidth={2} style={{ color: "#2563FF" }} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">

        {/* ── Search results ── */}
        {isSearching ? (
          <div className="px-4 flex flex-col gap-4">
            {filtered && !filtered.hasResults && (
              <div className="flex flex-col items-center justify-center pt-12 gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#F6F8FF] flex items-center justify-center">
                  <Search size={22} strokeWidth={1.5} style={{ color: "#C8D0E8" }} />
                </div>
                <p className="font-semibold text-[#101828]" style={{ fontSize: 16 }}>未找到匹配内容</p>
                <p className="text-[#98A2B3] text-center" style={{ fontSize: 13 }}>试试其他关键词</p>
              </div>
            )}

            {filtered && filtered.records.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2" style={{ fontSize: 13 }}>
                  记录 · {filtered.records.length} 条
                </p>
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                  {filtered.records.map((r, i, arr) => {
                    const tc = typeColors[r.type] || { bg: "#EEF4FF", text: "#2563FF" }
                    return (
                      <button
                        key={r.title}
                        className="ios-tap w-full flex items-center px-4"
                        style={{
                          minHeight: 52, paddingTop: 10, paddingBottom: 10,
                          borderBottom: i < arr.length - 1 ? "0.5px solid #F6F8FF" : "none",
                        }}
                        onClick={() => onNavigate("record-detail")}
                        aria-label={r.title}
                      >
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 flex-shrink-0" style={{ background: tc.bg }}>
                          <span style={{ fontSize: 14 }}>{r.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-medium text-[#101828] truncate" style={{ fontSize: 14 }}>{r.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="px-1.5 py-0.5 rounded font-semibold" style={{ fontSize: 10, background: tc.bg, color: tc.text }}>{r.type}</span>
                            {r.amount && <span className="text-[#667085] font-medium" style={{ fontSize: 11 }}>{r.amount}</span>}
                          </div>
                        </div>
                        <ChevronRight size={14} strokeWidth={2} style={{ color: "#C8D0E8" }} />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {filtered && filtered.objects.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2" style={{ fontSize: 13 }}>
                  对象 · {filtered.objects.length} 个
                </p>
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                  {filtered.objects.map((obj, i, arr) => (
                    <button
                      key={obj.name}
                      className="ios-tap w-full flex items-center px-4"
                      style={{
                        height: 48, borderBottom: i < arr.length - 1 ? "0.5px solid #F6F8FF" : "none",
                      }}
                      onClick={() => onNavigate("object-detail")}
                      aria-label={obj.name}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 flex-shrink-0" style={{ background: "#EEF4FF" }}>
                        <span style={{ fontSize: 16 }}>{obj.emoji}</span>
                      </div>
                      <span className="font-medium text-[#101828] flex-1" style={{ fontSize: 14 }}>{obj.name}</span>
                      <ChevronRight size={14} strokeWidth={2} style={{ color: "#C8D0E8" }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filtered && filtered.reminders.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2" style={{ fontSize: 13 }}>
                  提醒 · {filtered.reminders.length} 条
                </p>
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                  {filtered.reminders.map((r, i, arr) => (
                    <button
                      key={r.title}
                      className="ios-tap w-full flex items-center px-4"
                      style={{
                        height: 48, borderBottom: i < arr.length - 1 ? "0.5px solid #F6F8FF" : "none",
                      }}
                      onClick={() => onNavigate("reminders")}
                      aria-label={r.title}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center mr-3 flex-shrink-0" style={{ background: `${r.color}14` }}>
                        <span style={{ fontSize: 15 }}>{r.emoji}</span>
                      </div>
                      <span className="font-medium text-[#101828] flex-1" style={{ fontSize: 14 }}>{r.title}</span>
                      <span className="px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 11, background: `${r.color}14`, color: r.color }}>{r.days}天后</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filtered && filtered.templates.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] mb-2" style={{ fontSize: 13 }}>
                  模板 · {filtered.templates.length} 个
                </p>
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                  {filtered.templates.map((t, i, arr) => (
                    <div
                      key={t}
                      className="flex items-center px-4"
                      style={{
                        height: 48, borderBottom: i < arr.length - 1 ? "0.5px solid #F6F8FF" : "none",
                      }}
                    >
                      <span className="font-medium text-[#101828] flex-1" style={{ fontSize: 14 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* ── Hero card ── */}
            <div className="px-4 mb-4 mt-2">
              <div
                className="relative rounded-2xl px-5 py-5 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #2563FF 0%, #7C5CFF 100%)",
                  boxShadow: "0 8px 32px rgba(37,99,255,0.18)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 10%, rgba(255,255,255,0.12), transparent 55%)" }} />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-white/80 font-medium" style={{ fontSize: 11 }}>记录</p>
                      <p className="text-white font-bold" style={{ fontSize: 24, letterSpacing: -0.5, lineHeight: 1 }}>46</p>
                    </div>
                    <div style={{ width: 0.5, height: 28, background: "rgba(255,255,255,0.18)", alignSelf: "center" }} />
                    <div>
                      <p className="text-white/80 font-medium" style={{ fontSize: 11 }}>提醒</p>
                      <p className="text-white font-bold" style={{ fontSize: 24, letterSpacing: -0.5, lineHeight: 1 }}>5</p>
                    </div>
                    <div style={{ flex: 1 }} />
                    <div className="flex items-center gap-1 rounded-full px-2.5 py-1" style={{ background: "rgba(255,255,255,0.15)" }}>
                      <Shield size={12} strokeWidth={2} style={{ color: "#14C8A8" }} />
                      <span className="text-white/90 font-medium" style={{ fontSize: 10 }}>本地安全</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="ios-tap rounded-full px-3 py-1.5 flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                      onClick={() => onNavigate("pending")}
                      aria-label="待整理"
                    >
                      <span className="text-white font-bold" style={{ fontSize: 13 }}>4</span>
                      <span className="text-white/80" style={{ fontSize: 11 }}>待整理</span>
                      <ChevronRight size={10} strokeWidth={2.5} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </button>
                    <div className="rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                      <span className="text-white font-bold" style={{ fontSize: 13 }}>12</span>
                      <span className="text-white/80" style={{ fontSize: 11 }}>本月新增</span>
                    </div>
                    <button
                      className="ios-tap rounded-full px-3 py-1.5 flex items-center gap-1.5"
                      style={{ background: "rgba(255,255,255,0.12)" }}
                      onClick={() => onNavigate("reminders")}
                      aria-label="近期提醒"
                    >
                      <span className="text-white font-bold" style={{ fontSize: 13 }}>5</span>
                      <span className="text-white/80" style={{ fontSize: 11 }}>近期提醒</span>
                      <ChevronRight size={10} strokeWidth={2.5} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Objects ── */}
            <div className="mb-4">
              <div className="flex items-center justify-between px-4 mb-2">
                <p className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>常用对象</p>
                <button className="ios-tap text-[#2563FF] font-medium" style={{ fontSize: 13 }} onClick={() => onNavigate("search")}>查看全部</button>
              </div>
              <div className="flex gap-2.5 overflow-x-auto hide-scrollbar px-4">
                {objects.map((obj) => (
                  <button
                    key={obj.name}
                    className="ios-tap flex flex-col items-center gap-1.5 flex-shrink-0"
                    style={{ width: 64 }}
                    onClick={() => onNavigate("object-detail")}
                    aria-label={obj.name}
                  >
                    <div className="flex items-center justify-center" style={{ width: 52, height: 52, borderRadius: 16, background: "#FFFFFF", border: "0.5px solid #E8ECF4", boxShadow: "0 2px 6px rgba(16,24,40,0.04)" }}>
                      <span style={{ fontSize: 26 }}>{obj.emoji}</span>
                    </div>
                    <span className="text-[#667085] text-center truncate w-full font-medium" style={{ fontSize: 11 }}>{obj.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Upcoming reminders ── */}
            <div className="mb-4">
              <div className="flex items-center justify-between px-4 mb-2">
                <div className="flex items-center gap-1.5">
                  <Bell size={14} strokeWidth={2} style={{ color: "#FF9500" }} />
                  <p className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>即将到期</p>
                </div>
                <button className="ios-tap text-[#2563FF] font-medium" style={{ fontSize: 13 }} onClick={() => onNavigate("reminders")}>全部</button>
              </div>
              <div className="px-4">
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                  {upcomingReminders.map((r, i) => (
                    <button
                      key={r.title}
                      className="ios-tap w-full flex items-center px-4"
                      style={{ height: 52, borderBottom: i < upcomingReminders.length - 1 ? "0.5px solid #F6F8FF" : "none" }}
                      onClick={() => onNavigate("reminders")}
                      aria-label={r.title}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 mr-3" style={{ width: 30, height: 30, borderRadius: 8, background: `${r.color}14` }}>
                        <span style={{ fontSize: 15 }}>{r.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-medium text-[#101828] truncate" style={{ fontSize: 14 }}>{r.title}</p>
                        <p className="text-[#98A2B3]" style={{ fontSize: 11 }}>{r.date}</p>
                      </div>
                      <span className="flex-shrink-0 px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 11, background: `${r.color}14`, color: r.color }}>{r.days}天后</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Recent records ── */}
            <div className="mb-4">
              <div className="flex items-center justify-between px-4 mb-2">
                <p className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>最近记录</p>
                <button className="ios-tap text-[#2563FF] font-medium" style={{ fontSize: 13 }} onClick={() => onNavigate("records")}>全部</button>
              </div>
              <div className="px-4">
                <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
                  {recentRecords.map((r, i) => {
                    const tc = typeColors[r.type] || { bg: "#EEF4FF", text: "#2563FF" }
                    return (
                      <button
                        key={r.title}
                        className="ios-tap w-full flex items-center px-4"
                        style={{ minHeight: 52, paddingTop: 10, paddingBottom: 10, borderBottom: i < recentRecords.length - 1 ? "0.5px solid #F6F8FF" : "none" }}
                        onClick={() => onNavigate("record-detail")}
                        aria-label={r.title}
                      >
                        <div className="flex items-center justify-center flex-shrink-0 mr-3" style={{ width: 30, height: 30, borderRadius: 8, background: tc.bg }}>
                          <span style={{ fontSize: 15 }}>{r.emoji}</span>
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="font-medium text-[#101828] truncate" style={{ fontSize: 14 }}>{r.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="px-1.5 py-0.5 rounded font-semibold" style={{ fontSize: 10, background: tc.bg, color: tc.text }}>{r.type}</span>
                            {r.amount && <span className="text-[#667085] font-medium" style={{ fontSize: 11 }}>{r.amount}</span>}
                            <span className="text-[#C8D0E8]" style={{ fontSize: 11 }}>{r.date}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} strokeWidth={2} style={{ color: "#C8D0E8" }} />
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── More ActionSheet ── */}
      {showMoreSheet && (
        <div className="absolute inset-0 z-50" onClick={() => setShowMoreSheet(false)}>
          <div className="absolute inset-0 bg-black/25" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-10"
            style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col gap-1.5 px-4">
              <ActionSheetItem
                icon={Pencil}
                label="编辑资料箱"
                color="#2563FF"
                bg="#EEF4FF"
                onPress={() => { setShowMoreSheet(false); onNavigate("space-editor") }}
              />
              <ActionSheetItem
                icon={Trash2}
                label="删除资料箱"
                color="#FF3B30"
                bg="#FFF0F0"
                danger
                onPress={() => { setShowMoreSheet(false); setShowDeleteConfirm(true) }}
              />
            </div>
            <div className="px-4 mt-3">
              <button
                className="ios-tap w-full py-3.5 rounded-2xl font-semibold"
                style={{ fontSize: 17, background: "#F6F8FF", color: "#101828" }}
                onClick={() => setShowMoreSheet(false)}
                aria-label="取消"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Space select bottom sheet ── */}
      {showSpaceSheet && (
        <SpaceSelectSheet
          activeSpace={currentSpace}
          onSelect={(space) => { setCurrentSpace(space.name); setShowSpaceSheet(false) }}
          onClose={() => setShowSpaceSheet(false)}
          onNewSpace={() => { setShowSpaceSheet(false); onNavigate("space-editor") }}
          onEditSpace={() => onNavigate("space-editor")}
        />
      )}

      {/* ── Delete space confirmation ── */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 z-50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="absolute inset-0 bg-black/25" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-10"
            style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col items-center text-center px-5 mb-4">
              <div className="flex items-center justify-center mb-3" style={{ width: 48, height: 48, borderRadius: 14, background: "#FFF0F0" }}>
                <Trash2 size={22} strokeWidth={1.8} className="text-[#FF3B30]" />
              </div>
              <p className="font-bold text-[#101828]" style={{ fontSize: 18 }}>删除「{currentSpace}」？</p>
            </div>
            <div className="mx-4 flex items-start gap-3 px-4 py-3 rounded-xl mb-4" style={{ background: "#FFF0F0", border: "0.5px solid #FFD0D0" }}>
              <AlertCircle size={14} strokeWidth={2} className="text-[#FF3B30] mt-0.5 flex-shrink-0" />
              <p className="text-[#CC2200] leading-snug" style={{ fontSize: 13 }}>删除后将移除该资料箱内的所有资料、对象和提醒。已保存的文件副本不会被删除，可在本地文件中找回。</p>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button
                className="ios-tap w-full py-4 rounded-2xl font-semibold text-white"
                style={{ fontSize: 17, background: "#FF3B30" }}
                onClick={() => { setShowDeleteConfirm(false); onNavigate("no-space-empty") }}
                aria-label="确认删除"
              >
                删除资料箱
              </button>
              <button
                className="ios-tap w-full py-3.5 rounded-2xl font-medium"
                style={{ fontSize: 17, background: "#F6F8FF", color: "#101828" }}
                onClick={() => setShowDeleteConfirm(false)}
                aria-label="取消"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ActionSheetItem({
  icon: Icon, label, color, bg, danger, onPress,
}: {
  icon: React.ElementType; label: string; color: string; bg: string; danger?: boolean; onPress: () => void
}) {
  return (
    <button
      className="ios-tap flex items-center gap-3 px-4 py-4 rounded-xl w-full"
      style={{ background: danger ? "#FFF0F0" : "#F6F8FF", minHeight: 56 }}
      onClick={onPress}
      aria-label={label}
    >
      <div className="flex items-center justify-center flex-shrink-0" style={{ width: 28, height: 28, borderRadius: 7, background: bg }}>
        <Icon size={14} strokeWidth={2} style={{ color }} />
      </div>
      <span className="font-medium" style={{ fontSize: 16, color: danger ? color : "#101828" }}>{label}</span>
    </button>
  )
}
