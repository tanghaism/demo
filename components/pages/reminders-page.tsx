"use client"

import { useState } from "react"
import {
  Bell,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Plus,
  Filter,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSSegmentedControl } from "@/components/ios/ios-segmented-control"
import { reminders } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface RemindersPageProps {
  onBack: () => void
  onSelectDocument: (docId: string) => void
}

export function RemindersPage({
  onBack,
  onSelectDocument,
}: RemindersPageProps) {
  const [filter, setFilter] = useState("all")

  const filteredReminders = reminders.filter((r) => {
    if (filter === "expired") return r.daysRemaining < 0
    if (filter === "upcoming") return r.daysRemaining >= 0 && r.daysRemaining <= 30
    return true
  })

  const expiredReminders = filteredReminders.filter((r) => r.daysRemaining < 0)
  const upcomingReminders = filteredReminders.filter(
    (r) => r.daysRemaining >= 0 && r.daysRemaining <= 30
  )
  const futureReminders = filteredReminders.filter((r) => r.daysRemaining > 30)

  const getReminderIcon = (daysRemaining: number) => {
    if (daysRemaining < 0) {
      return <AlertTriangle className="w-5 h-5 text-destructive" />
    }
    if (daysRemaining <= 30) {
      return <Clock className="w-5 h-5 text-amber-600" />
    }
    return <CheckCircle2 className="w-5 h-5 text-green-600" />
  }

  const getReminderStatus = (daysRemaining: number) => {
    if (daysRemaining < 0) {
      return { text: `已过期 ${Math.abs(daysRemaining)} 天`, color: "text-destructive" }
    }
    if (daysRemaining === 0) {
      return { text: "今天到期", color: "text-amber-600" }
    }
    if (daysRemaining <= 30) {
      return { text: `${daysRemaining} 天后到期`, color: "text-amber-600" }
    }
    return { text: `${daysRemaining} 天后到期`, color: "text-green-600" }
  }

  const ReminderCard = ({ reminder }: { reminder: typeof reminders[0] }) => {
    const status = getReminderStatus(reminder.daysRemaining)
    return (
      <button
        onClick={() => onSelectDocument(reminder.documentId)}
        className={cn(
          "w-full flex items-center gap-3 p-4 bg-card rounded-xl active:bg-muted/50 transition-colors",
          reminder.daysRemaining < 0 && "border border-destructive/20"
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
            reminder.daysRemaining < 0
              ? "bg-destructive/10"
              : reminder.daysRemaining <= 30
              ? "bg-amber-500/10"
              : "bg-green-500/10"
          )}
        >
          {getReminderIcon(reminder.daysRemaining)}
        </div>
        <div className="flex-1 text-left min-w-0">
          <p className="text-[17px] font-medium truncate">
            {reminder.documentTitle}
          </p>
          <p className="text-[13px] text-muted-foreground">
            {reminder.category} · {reminder.type === "expiry" ? "到期提醒" : "续期提醒"}
          </p>
          <p className={cn("text-[13px] font-medium mt-0.5", status.color)}>
            {status.text}
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[13px] text-muted-foreground">{reminder.date}</p>
        </div>
      </button>
    )
  }

  const isEmpty = filteredReminders.length === 0

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title="提醒"
        large
        leftAction={{
          label: "返回",
          onClick: onBack,
        }}
        rightAction={{
          icon: <Plus className="w-6 h-6" />,
          onClick: () => {},
        }}
      />

      {/* Filter */}
      <div className="px-4 py-3">
        <IOSSegmentedControl
          segments={[
            { id: "all", label: "全部" },
            { id: "expired", label: "已过期" },
            { id: "upcoming", label: "即将到期" },
          ]}
          selectedId={filter}
          onChange={setFilter}
        />
      </div>

      {/* Stats */}
      <div className="px-4 py-2">
        <div className="flex gap-3">
          <div className="flex-1 p-3 bg-destructive/10 rounded-xl text-center">
            <p className="text-[24px] font-bold text-destructive">
              {reminders.filter((r) => r.daysRemaining < 0).length}
            </p>
            <p className="text-[11px] text-destructive/70">已过期</p>
          </div>
          <div className="flex-1 p-3 bg-amber-500/10 rounded-xl text-center">
            <p className="text-[24px] font-bold text-amber-600">
              {reminders.filter((r) => r.daysRemaining >= 0 && r.daysRemaining <= 30).length}
            </p>
            <p className="text-[11px] text-amber-600/70">30天内到期</p>
          </div>
          <div className="flex-1 p-3 bg-green-500/10 rounded-xl text-center">
            <p className="text-[24px] font-bold text-green-600">
              {reminders.filter((r) => r.daysRemaining > 30).length}
            </p>
            <p className="text-[11px] text-green-600/70">正常</p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-[17px] font-semibold mb-1">暂无提醒</h3>
          <p className="text-[15px] text-muted-foreground">
            {filter === "expired"
              ? "没有已过期的资料"
              : filter === "upcoming"
              ? "没有即将到期的资料"
              : "添加资料并设置到期日期后，将自动生成提醒"}
          </p>
        </div>
      ) : (
        <div className="px-4 py-2 space-y-4">
          {/* Expired */}
          {expiredReminders.length > 0 && (
            <div>
              <h3 className="text-[13px] text-muted-foreground uppercase tracking-wide mb-2 px-1">
                已过期
              </h3>
              <div className="space-y-2">
                {expiredReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {upcomingReminders.length > 0 && (
            <div>
              <h3 className="text-[13px] text-muted-foreground uppercase tracking-wide mb-2 px-1">
                即将到期
              </h3>
              <div className="space-y-2">
                {upcomingReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}

          {/* Future */}
          {futureReminders.length > 0 && (
            <div>
              <h3 className="text-[13px] text-muted-foreground uppercase tracking-wide mb-2 px-1">
                远期
              </h3>
              <div className="space-y-2">
                {futureReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom padding */}
      <div className="h-8" />
    </div>
  )
}
