"use client"

import { ChevronLeft, Plus, ChevronRight, Bell, Share2 } from "lucide-react"

interface ObjectDetailProps {
  onBack: () => void
  onSelectRecord: () => void
  onNavigate?: (screen: string) => void
}

const records = [
  { emoji: "🧾", title: "MacBook Pro 发票", type: "发票", amount: "¥14,999", date: "2026-05-12" },
  { emoji: "📋", title: "Apple Care+ 保单", type: "保单", amount: "¥1,799", date: "2026-06-01" },
  { emoji: "🔧", title: "MacBook Pro 送修记录", type: "收据", amount: "¥0（保修）", date: "2026-03-01" },
]

// Chronological order: past events first, future reminders last
const timeline = [
  { date: "2026-05-12", label: "购入 MacBook Pro", type: "发票", color: "#14C8A8", future: false },
  { date: "2026-05-12", label: "保存发票", type: "记录", color: "#2563FF", future: false },
  { date: "2026-06-01", label: "添加 AppleCare+ 保单", type: "保单", color: "#7C5CFF", future: false },
  { date: "2026-09-12", label: "保修到期提醒", type: "提醒", color: "#FF9500", future: true },
]

export function ObjectDetail({ onBack, onSelectRecord, onNavigate }: ObjectDetailProps) {
  return (
    <div className="flex flex-col h-full bg-[#F6F8FF]" style={{ paddingTop: 54 }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-4 pt-2 pb-2.5" style={{ borderBottom: "0.5px solid #E8ECF4" }}>
        <button
          className="ios-tap flex items-center gap-0.5"
          style={{ minHeight: 44 }}
          onClick={onBack}
          aria-label="返回"
        >
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>返回</span>
        </button>
        <button
          className="ios-tap flex items-center justify-center"
          style={{ minWidth: 44, minHeight: 44 }}
          onClick={() => onNavigate?.("add-record-write")}
          aria-label="添加记录"
        >
          <Plus size={22} className="text-[#2563FF]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
        {/* Object header */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#EEF4FF" }}
            >
              <span style={{ fontSize: 32 }}>💻</span>
            </div>
            <div>
              <h2 className="font-bold text-[#101828]" style={{ fontSize: 22, letterSpacing: -0.4 }}>MacBook Pro 14</h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="px-2 py-0.5 rounded-full font-medium"
                  style={{ fontSize: 12, background: "#EEF4FF", color: "#2563FF" }}
                >
                  物品
                </span>
                <span className="text-[#98A2B3]" style={{ fontSize: 12 }}>家庭资料箱</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "关联记录", value: "3" },
              { label: "附件", value: "5" },
              { label: "提醒", value: "1" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-xl p-3 text-center"
                style={{ border: "0.5px solid #E8ECF4" }}
              >
                <p className="font-bold text-[#2563FF]" style={{ fontSize: 20 }}>{s.value}</p>
                <p className="text-[#667085]" style={{ fontSize: 12 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming reminder */}
        <div className="px-4 mb-4">
          <div
            className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl"
            style={{ border: "0.5px solid #FFE4B5" }}
          >
            <Bell size={16} className="text-[#FF9500] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-[#101828]" style={{ fontSize: 14 }}>保修到期</p>
              <p className="text-[#98A2B3]" style={{ fontSize: 12 }}>2026-09-12 · 119 天后</p>
            </div>
            <span
              className="px-2 py-0.5 rounded-full font-medium"
              style={{ fontSize: 11, background: "#FFF3E0", color: "#FF9500" }}
            >
              即将到期
            </span>
          </div>
        </div>

        {/* Event timeline — chronological */}
        <div className="px-4 mb-4">
          <p className="font-medium text-[#98A2B3] px-1 mb-2" style={{ fontSize: 13 }}>事件时间线</p>
          <div
            className="bg-white rounded-2xl px-4 py-4"
            style={{ border: "0.5px solid #E8ECF4" }}
          >
            <div className="relative pl-5">
              {/* Vertical connector line */}
              <div
                className="absolute left-1.5 top-2"
                style={{ bottom: 8, width: 1, background: "#E8ECF4" }}
              />
              <div className="flex flex-col gap-5">
                {timeline.map((event, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    {/* Dot */}
                    <div
                      className="absolute flex-shrink-0"
                      style={{
                        left: -14,
                        top: 3,
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: event.future ? "#E8ECF4" : event.color,
                        border: "2px solid white",
                        boxShadow: `0 0 0 1px ${event.future ? "#E8ECF4" : event.color}`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium leading-snug"
                        style={{ fontSize: 14, color: event.future ? "#98A2B3" : "#101828" }}
                      >
                        {event.label}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="px-1.5 py-px rounded font-medium"
                          style={{
                            fontSize: 10,
                            background: event.future ? "#F6F8FF" : `${event.color}18`,
                            color: event.future ? "#98A2B3" : event.color,
                          }}
                        >
                          {event.type}
                        </span>
                        <span className="text-[#98A2B3]" style={{ fontSize: 11 }}>{event.date}</span>
                        {event.future && (
                          <span className="text-[#FF9500]" style={{ fontSize: 11 }}>即将到期</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related records */}
        <div className="px-4 mb-5">
          <p className="font-medium text-[#98A2B3] px-1 mb-2" style={{ fontSize: 13 }}>关联记录</p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            {records.map((r, i) => (
              <button
                key={r.title}
                className="ios-tap w-full flex items-center px-4 py-3.5"
                style={{ borderBottom: i < records.length - 1 ? "0.5px solid #F6F8FF" : "none", minHeight: 56 }}
                onClick={onSelectRecord}
                aria-label={r.title}
              >
                <div className="w-9 h-9 rounded-xl bg-[#EEF4FF] flex items-center justify-center mr-3 flex-shrink-0">
                  <span style={{ fontSize: 17 }}>{r.emoji}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-[#101828] truncate" style={{ fontSize: 14 }}>{r.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="px-1.5 py-px rounded font-medium"
                      style={{ fontSize: 10, background: "#EEF4FF", color: "#2563FF" }}
                    >
                      {r.type}
                    </span>
                    {r.amount && <span className="text-[#667085]" style={{ fontSize: 12 }}>{r.amount}</span>}
                    <span className="text-[#98A2B3]" style={{ fontSize: 12 }}>{r.date}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-[#C8D0E8]" />
              </button>
            ))}
          </div>
        </div>

        {/* Export button — iOS prominent tinted button style */}
        <div className="px-4 pb-2">
          <button
            className="ios-tap w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
            style={{ fontSize: 16, background: "#EEF4FF", color: "#2563FF", minHeight: 50 }}
            onClick={() => onNavigate?.("export")}
            aria-label="导出对象资料包"
          >
            <Share2 size={18} strokeWidth={1.8} />
            导出对象资料包
          </button>
        </div>
      </div>
    </div>
  )
}
