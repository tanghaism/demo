"use client"

import { useState } from "react"
import { ChevronLeft, Plus, ChevronRight, Bell, Share2, MoreHorizontal, Pencil, Trash2, AlertCircle } from "lucide-react"
import { AmbientBackground } from "@/components/proofly/ambient-background"
import { PremiumCard, PremiumIconTile } from "@/components/proofly/premium-card"

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
  const [showMoreSheet, setShowMoreSheet] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
      <AmbientBackground />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-2 pb-2.5">
        <button
          className="ios-tap flex items-center gap-0.5"
          style={{ minHeight: 44 }}
          onClick={onBack}
          aria-label="返回"
        >
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>返回</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            className="ios-tap premium-press flex items-center justify-center rounded-2xl"
            style={{ minWidth: 44, minHeight: 44, background: "var(--premium-control-surface-strong)", border: "1px solid var(--premium-control-border)" }}
            onClick={() => onNavigate?.("add-record-write")}
            aria-label="添加记录"
          >
            <Plus size={22} className="text-[#4C6FFF]" />
          </button>
          <button
            className="ios-tap premium-press flex items-center justify-center rounded-2xl"
            style={{ minWidth: 44, minHeight: 44, background: "var(--premium-control-surface-strong)", border: "1px solid var(--premium-control-border)" }}
            onClick={() => setShowMoreSheet(true)}
            aria-label="更多操作"
          >
            <MoreHorizontal size={22} className="text-[#4C6FFF]" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-10">
        {/* Object header */}
        <div className="px-4 pt-3 pb-4">
          <PremiumCard className="px-5 py-5">
            <div className="flex items-center gap-4">
              <PremiumIconTile emoji="💻" tone="blue" />
              <div className="min-w-0 flex-1">
                <h2 className="font-bold" style={{ fontSize: 22, letterSpacing: -0.4, color: "var(--premium-text)" }}>MacBook Pro 14</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full font-medium" style={{ fontSize: 12, background: "var(--premium-chip-blue-bg)", color: "#4C6FFF" }}>物品</span>
                  <span style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>家庭资料箱</span>
                </div>
              </div>
            </div>
            <p className="mt-4 leading-snug" style={{ fontSize: 13, color: "var(--premium-text-muted)" }}>
              汇总购买凭证、保单、维修记录和到期提醒，方便需要时快速导出。
            </p>
          </PremiumCard>
        </div>

        {/* Stats */}
        <div className="px-4 mb-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "关联记录", value: "3" },
              { label: "附件", value: "5" },
              { label: "提醒", value: "1" },
            ].map((s) => (
              <PremiumCard
                key={s.label}
                className="rounded-2xl p-3 text-center"
              >
                <p className="font-bold text-[#4C6FFF]" style={{ fontSize: 20 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: "var(--premium-text-muted)" }}>{s.label}</p>
              </PremiumCard>
            ))}
          </div>
        </div>

        {/* Upcoming reminder */}
        <div className="px-4 mb-4">
          <PremiumCard className="flex items-center gap-3 px-4 py-3.5 rounded-[18px]" style={{ border: "1px solid var(--premium-warning-border)" }}>
            <Bell size={16} className="text-[#FF9500] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium" style={{ fontSize: 14, color: "var(--premium-text)" }}>保修到期</p>
              <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>2026-09-12 · 119 天后</p>
            </div>
            <span
              className="px-2 py-0.5 rounded-full font-medium"
              style={{ fontSize: 11, background: "var(--premium-warning-bg)", color: "#FF9500" }}
            >
              即将到期
            </span>
          </PremiumCard>
        </div>

        {/* Event timeline — chronological */}
        <div className="px-4 mb-4">
          <p className="font-medium px-1 mb-2" style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>事件时间线</p>
          <PremiumCard className="rounded-[18px] px-4 py-4">
            <div className="relative pl-5">
              {/* Vertical connector line */}
              <div
                className="absolute left-1.5 top-2"
                style={{ bottom: 8, width: 1, background: "var(--premium-row-border)" }}
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
                        background: event.future ? "var(--premium-row-border)" : event.color,
                        border: "2px solid var(--premium-surface)",
                        boxShadow: `0 0 0 1px ${event.future ? "var(--premium-row-border)" : event.color}`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium leading-snug"
                        style={{ fontSize: 14, color: event.future ? "var(--premium-text-subtle)" : "var(--premium-text)" }}
                      >
                        {event.label}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className="px-1.5 py-px rounded font-medium"
                          style={{
                            fontSize: 10,
                            background: event.future ? "var(--premium-surface-soft)" : `${event.color}18`,
                            color: event.future ? "var(--premium-text-subtle)" : event.color,
                          }}
                        >
                          {event.type}
                        </span>
                        <span style={{ fontSize: 11, color: "var(--premium-text-subtle)" }}>{event.date}</span>
                        {event.future && (
                          <span className="text-[#FF9500]" style={{ fontSize: 11 }}>即将到期</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* Related records */}
        <div className="px-4 mb-5">
          <p className="font-medium px-1 mb-2" style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>关联记录</p>
          <PremiumCard className="rounded-[18px]">
            {records.map((r, i) => (
              <button
                key={r.title}
                className="ios-tap w-full flex items-center px-4 py-3.5"
                style={{ borderBottom: i < records.length - 1 ? "0.5px solid var(--premium-row-border)" : "none", minHeight: 56 }}
                onClick={onSelectRecord}
                aria-label={r.title}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3 flex-shrink-0" style={{ background: "var(--premium-icon-blue-bg)" }}>
                  <span style={{ fontSize: 17 }}>{r.emoji}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium truncate" style={{ fontSize: 14, color: "var(--premium-text)" }}>{r.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="px-1.5 py-px rounded font-medium"
                      style={{ fontSize: 10, background: "var(--premium-chip-blue-bg)", color: "#2563FF" }}
                    >
                      {r.type}
                    </span>
                    {r.amount && <span style={{ fontSize: 12, color: "var(--premium-text-muted)" }}>{r.amount}</span>}
                    <span style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{r.date}</span>
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: "var(--premium-chevron)" }} />
              </button>
            ))}
          </PremiumCard>
        </div>

        {/* Export button — iOS prominent tinted button style */}
        <div className="px-4 pb-2">
          <button
            className="ios-tap premium-press w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2"
            style={{ fontSize: 16, background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)", color: "#FFFFFF", minHeight: 50, boxShadow: "0 14px 28px rgba(76,111,255,0.22)" }}
            onClick={() => onNavigate?.("export")}
            aria-label="导出对象资料包"
          >
            <Share2 size={18} strokeWidth={1.8} />
            导出对象资料包
          </button>
        </div>
      </div>

      {showMoreSheet && (
        <div className="absolute inset-0 z-[80]" onClick={() => setShowMoreSheet(false)}>
          <div className="absolute inset-0 premium-sheet-overlay" style={{ background: "var(--premium-overlay)" }} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-10 premium-sheet-panel"
            style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--premium-row-border)" }} />
            <div className="flex flex-col gap-1.5 px-4">
              <ObjectActionItem
                icon={Pencil}
                label="编辑对象"
                color="#4C6FFF"
                bg="var(--premium-chip-blue-bg)"
                onPress={() => { setShowMoreSheet(false); onNavigate?.("add-object") }}
              />
              <ObjectActionItem
                icon={Trash2}
                label="删除对象"
                color="var(--premium-danger-text)"
                bg="var(--premium-danger-bg)"
                danger
                onPress={() => { setShowMoreSheet(false); setShowDeleteConfirm(true) }}
              />
            </div>
            <div className="px-4 mt-3">
              <button
                className="ios-tap w-full py-3.5 rounded-2xl font-semibold"
                style={{ fontSize: 17, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }}
                onClick={() => setShowMoreSheet(false)}
                aria-label="取消"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="absolute inset-0 z-[80]" onClick={() => setShowDeleteConfirm(false)}>
          <div className="absolute inset-0 premium-sheet-overlay" style={{ background: "var(--premium-overlay)" }} />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-10 premium-sheet-panel"
            style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--premium-row-border)" }} />
            <div className="flex flex-col items-center text-center px-5 mb-4">
              <div className="flex items-center justify-center mb-3" style={{ width: 48, height: 48, borderRadius: 14, background: "var(--premium-danger-bg)" }}>
                <Trash2 size={22} strokeWidth={1.8} className="text-[#FF3B30]" />
              </div>
              <p className="font-bold" style={{ fontSize: 18, color: "var(--premium-text)" }}>删除「MacBook Pro 14」？</p>
            </div>
            <div className="mx-4 flex items-start gap-3 px-4 py-3 rounded-xl mb-4" style={{ background: "var(--premium-danger-bg)", border: "0.5px solid var(--premium-danger-border)" }}>
              <AlertCircle size={14} strokeWidth={2} className="mt-0.5 flex-shrink-0" style={{ color: "var(--premium-danger-text)" }} />
              <p className="leading-snug" style={{ fontSize: 13, color: "var(--premium-danger-text)" }}>删除对象后，已有记录不会被删除，但会取消与该对象的关联。</p>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button
                className="ios-tap w-full py-4 rounded-2xl font-semibold text-white"
                style={{ fontSize: 17, background: "#FF3B30" }}
                onClick={() => { setShowDeleteConfirm(false); onBack() }}
                aria-label="确认删除对象"
              >
                删除对象
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
          </div>
        </div>
      )}
    </div>
  )
}

function ObjectActionItem({
  icon: Icon,
  label,
  color,
  bg,
  danger,
  onPress,
}: {
  icon: React.ElementType
  label: string
  color: string
  bg: string
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
      <div className="flex items-center justify-center flex-shrink-0" style={{ width: 28, height: 28, borderRadius: 7, background: bg }}>
        <Icon size={14} strokeWidth={2} style={{ color }} />
      </div>
      <span className="font-medium" style={{ fontSize: 16, color: danger ? "var(--premium-danger-text)" : "var(--premium-text)" }}>{label}</span>
    </button>
  )
}
