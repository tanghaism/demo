"use client"

import { useState } from "react"
import { Settings, Bell, CheckCircle, Circle, AlertCircle, ExternalLink } from "lucide-react"

type SegTab = "today" | "upcoming" | "done"

const upcomingReminders = [
  { emoji: "💰", title: "林先生项目尾款", object: "林先生设计项目", date: "2026-05-20", days: 8, color: "#FF9500", done: false },
  { emoji: "🏢", title: "营业执照年审", object: "上海分店", date: "2026-06-15", days: 34, color: "#007AFF", done: false },
  { emoji: "🏥", title: "父亲复诊提醒", object: "父亲就医记录", date: "2026-06-08", days: 27, color: "#34C759", done: false },
  { emoji: "💉", title: "小宝疫苗接种", object: "小宝健康档案", date: "2026-07-12", days: 61, color: "#5856D6", done: false },
  { emoji: "📊", title: "绩效复盘", object: "当前公司", date: "2026-07-01", days: 50, color: "#8E8E93", done: false },
]

const doneReminders = [
  { emoji: "🏠", title: "房屋合同续签确认", object: "徐汇租住房", date: "2026-05-01", days: 0, color: "#34C759", done: true },
]

interface RemindersScreenProps {
  onNavigate: (screen: string) => void
}

export function RemindersScreen({ onNavigate }: RemindersScreenProps) {
  const [activeTab, setActiveTab] = useState<SegTab>("upcoming")
  const [notifBannerDismissed, setNotifBannerDismissed] = useState(false)
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [showNotifSheet, setShowNotifSheet] = useState(false)
  const [showSettingsSheet, setShowSettingsSheet] = useState(false)

  const toggle = (title: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  const tabs: { id: SegTab; label: string }[] = [
    { id: "today", label: "今日" },
    { id: "upcoming", label: "近期" },
    { id: "done", label: "已完成" },
  ]

  const todayList = upcomingReminders.filter((r) => r.days <= 7)
  const list = activeTab === "today" ? todayList : activeTab === "upcoming" ? upcomingReminders : doneReminders

  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: "#000000" }}>提醒</h1>
        <button
          className="ios-tap flex items-center justify-center"
          style={{ width: 44, height: 44 }}
          onClick={() => setShowSettingsSheet(true)}
          aria-label="提醒设置"
        >
          <Settings size={20} strokeWidth={2} style={{ color: "#007AFF" }} />
        </button>
      </div>

      {/* Notification banner */}
      {!notifBannerDismissed && (
        <div
          className="mx-4 mb-3 flex items-center gap-3 px-4 py-3"
          style={{ background: "#FFF8EC", borderRadius: 12 }}
        >
          <AlertCircle size={15} strokeWidth={2} style={{ color: "#FF9500", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "#8A5F00", flex: 1, lineHeight: 1.4 }}>系统通知未开启，App 内仍会保留提醒</p>
          <button
            className="ios-tap rounded-lg px-3 flex-shrink-0"
            style={{ fontSize: 13, fontWeight: 600, background: "#FF9500", color: "white", height: 30 }}
            onClick={() => setShowNotifSheet(true)}
            aria-label="去设置"
          >
            去设置
          </button>
        </div>
      )}

      {/* iOS native segmented control */}
      <div className="px-4 pb-3">
        <div
          className="flex p-0.5 rounded-lg"
          style={{ background: "rgba(118,118,128,0.18)" }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="ios-tap flex-1 flex items-center justify-center gap-1 py-1.5 rounded-md transition-all"
              style={{
                background: activeTab === t.id ? "#FFFFFF" : "transparent",
                boxShadow: activeTab === t.id ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                minHeight: 32,
              }}
              aria-label={t.label}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === t.id ? 600 : 400,
                  color: activeTab === t.id ? "#000000" : "#8E8E93",
                }}
              >
                {t.label}
              </span>
              {t.id === "today" && todayList.length > 0 && (
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 16, height: 16, background: "#FF3B30", fontSize: 10, fontWeight: 700, color: "#FFFFFF" }}
                >
                  {todayList.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-24">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <div
              className="flex items-center justify-center"
              style={{ width: 64, height: 64, borderRadius: 16, background: "#E5E5EA" }}
            >
              <Bell size={28} strokeWidth={1.5} style={{ color: "#C7C7CC" }} />
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: "#000000" }}>
              {activeTab === "today" ? "今天没有提醒" : activeTab === "done" ? "暂无已完成提醒" : "暂无近期提醒"}
            </p>
            <p style={{ fontSize: 15, color: "#8E8E93", textAlign: "center", lineHeight: 1.5, maxWidth: 220 }}>
              到期、尾款、保修都可以在这里提醒
            </p>
          </div>
        ) : (
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            {list.map((r, i) => {
              const isDone = checked.has(r.title) || r.done
              return (
                <div
                  key={r.title}
                  className="flex items-start px-4"
                  style={{
                    paddingTop: 12,
                    paddingBottom: 12,
                    borderBottom: i < list.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                    opacity: isDone ? 0.45 : 1,
                  }}
                >
                  <button
                    className="ios-tap flex-shrink-0 mr-3 mt-0.5"
                    onClick={() => toggle(r.title)}
                    aria-label={isDone ? "取消完成" : "标记完成"}
                  >
                    {isDone
                      ? <CheckCircle size={22} strokeWidth={2} style={{ color: "#34C759" }} />
                      : <Circle size={22} strokeWidth={1.5} style={{ color: "#C7C7CC" }} />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#000000",
                        textDecoration: isDone ? "line-through" : "none",
                      }}
                    >
                      {r.title}
                    </p>
                    <p style={{ fontSize: 13, color: "#8E8E93", marginTop: 2 }}>{r.object}</p>
                    <p style={{ fontSize: 13, color: "#8E8E93" }}>{r.date}</p>
                  </div>
                  {!isDone && (
                    <span
                      className="flex-shrink-0 px-2 rounded-full ml-2 mt-0.5"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        background: `${r.color}18`,
                        color: r.color,
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                    >
                      {r.days === 0 ? "今天" : `${r.days}天后`}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Reminder settings sheet */}
      {showSettingsSheet && (
        <div className="absolute inset-0 z-40" onClick={() => setShowSettingsSheet(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-8"
            style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.18)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <p style={{ fontSize: 18, fontWeight: 700, color: "#000000", paddingLeft: 20, paddingRight: 20, marginBottom: 16 }}>提醒设置</p>
            <div className="px-4 mb-5">
              <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
                {[
                  { label: "提前 1 天提醒", defaultOn: true },
                  { label: "提前 3 天提醒", defaultOn: false },
                  { label: "提前 7 天提醒", defaultOn: false },
                  { label: "到期当天提醒", defaultOn: true },
                ].map((item, i, arr) => (
                  <ReminderToggleRow
                    key={item.label}
                    label={item.label}
                    defaultOn={item.defaultOn}
                    isLast={i === arr.length - 1}
                  />
                ))}
              </div>
            </div>
            <div className="px-4">
              <button
                className="ios-tap w-full flex items-center justify-center rounded-xl"
                style={{ height: 50, background: "#007AFF" }}
                onClick={() => setShowSettingsSheet(false)}
                aria-label="完成"
              >
                <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>完成</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification guide sheet */}
      {showNotifSheet && (
        <div className="absolute inset-0 z-40" onClick={() => setShowNotifSheet(false)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-8"
            style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.18)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col items-center text-center px-5 mb-5">
              <div
                className="flex items-center justify-center mb-3"
                style={{ width: 48, height: 48, borderRadius: 12, background: "#FFF3E0" }}
              >
                <Bell size={22} strokeWidth={1.8} style={{ color: "#FF9500" }} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#000000" }}>开启系统通知</p>
              <p style={{ fontSize: 14, color: "#8E8E93", marginTop: 4, lineHeight: 1.5 }}>
                需要在 iPhone 系统设置中手动开启 Proofly 的通知权限
              </p>
            </div>

            <div className="px-4 mb-5">
              <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
                {[
                  { step: "1", text: "打开 iPhone「设置」App" },
                  { step: "2", text: "向下滚动找到「Proofly」" },
                  { step: "3", text: "点击「通知」，开启「允许通知」" },
                ].map((item, i, arr) => (
                  <div
                    key={item.step}
                    className="flex items-center px-4"
                    style={{
                      height: 48,
                      borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0 mr-3"
                      style={{ width: 24, height: 24, borderRadius: 12, background: "#EEF4FF" }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#007AFF" }}>{item.step}</span>
                    </div>
                    <span style={{ fontSize: 15, color: "#000000" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 px-4">
              <button
                className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl"
                style={{ height: 50, background: "#FF9500" }}
                onClick={() => { setShowNotifSheet(false); setNotifBannerDismissed(true) }}
                aria-label="已开启"
              >
                <ExternalLink size={17} strokeWidth={2} style={{ color: "#FFFFFF" }} />
                <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>已在系统设置中开启</span>
              </button>
              <button
                className="ios-tap w-full flex items-center justify-center rounded-xl"
                style={{ height: 50, background: "#F2F2F7" }}
                onClick={() => setShowNotifSheet(false)}
                aria-label="稍后再说"
              >
                <span style={{ fontSize: 17, color: "#000000" }}>稍后再说</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ReminderToggleRow({
  label,
  defaultOn,
  isLast,
}: {
  label: string
  defaultOn: boolean
  isLast?: boolean
}) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      className="ios-tap w-full flex items-center justify-between px-4"
      style={{ height: 44, borderBottom: isLast ? "none" : "0.5px solid rgba(60,60,67,0.12)" }}
      onClick={() => setOn(!on)}
      aria-label={label}
    >
      <span style={{ fontSize: 16, color: "#000000" }}>{label}</span>
      <div className="relative flex-shrink-0" style={{ width: 51, height: 31 }}>
        <div
          className="w-full h-full rounded-full transition-colors duration-200"
          style={{ background: on ? "#34C759" : "#E5E5EA" }}
        />
        <div
          className="absolute top-0.5 bg-white rounded-full shadow-md transition-all duration-200"
          style={{ width: 27, height: 27, left: on ? 22 : 2, boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
        />
      </div>
    </button>
  )
}
