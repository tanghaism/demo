"use client"

import { useState } from "react"
import { Home, FolderOpen, Plus, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "home" | "records" | "add" | "reminders" | "settings"

interface TabBarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onAddRecord?: () => void
  onAddObject?: () => void
}

const tabs = [
  { id: "home" as Tab, label: "首页", icon: Home },
  { id: "records" as Tab, label: "记录", icon: FolderOpen },
  { id: "add" as Tab, label: "添加", icon: Plus, prominent: true },
  { id: "reminders" as Tab, label: "提醒", icon: Bell },
  { id: "settings" as Tab, label: "设置", icon: Settings },
]

export function TabBar({ activeTab, onTabChange, onAddRecord, onAddObject }: TabBarProps) {
  const [showActions, setShowActions] = useState(false)

  const handleProminentPress = () => {
    setShowActions(!showActions)
  }

  const handleAddRecord = () => {
    setShowActions(false)
    onAddRecord?.()
  }

  const handleAddObject = () => {
    setShowActions(false)
    onAddObject?.()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: "var(--premium-overlay)",
          opacity: showActions ? 1 : 0,
          pointerEvents: showActions ? "auto" : "none",
          backdropFilter: showActions ? "blur(2px)" : "blur(0)",
          WebkitBackdropFilter: showActions ? "blur(2px)" : "blur(0)",
          transition: "opacity var(--motion-standard) var(--motion-ease), backdrop-filter var(--motion-standard) var(--motion-ease)",
        }}
        onClick={() => setShowActions(false)}
      />

      {/* Floating action buttons — horizontal, above the tab bar */}
      <div
        className="absolute left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ bottom: 102 }}
      >
        {/* 添加记录 — slides left */}
        <button
          className="ios-tap premium-press flex items-center gap-2 rounded-2xl px-3 py-2.5"
          style={{
            background: "var(--premium-action-surface)",
            border: "1px solid var(--premium-action-border)",
            boxShadow: "var(--premium-action-shadow)",
            opacity: showActions ? 1 : 0,
            transform: showActions ? "translateY(0) translateX(-8px) scale(1)" : "translateY(16px) translateX(40px) scale(0.94)",
            pointerEvents: showActions ? "auto" : "none",
            transition: "opacity var(--motion-standard) var(--motion-ease), transform var(--motion-standard) var(--motion-ease), box-shadow var(--motion-standard) var(--motion-ease)",
          }}
          onClick={handleAddRecord}
          aria-label="添加记录"
        >
          <span style={{ fontSize: 20 }}>📝</span>
          <span className="font-semibold" style={{ fontSize: 14, color: "var(--premium-text)" }}>添加记录</span>
        </button>

        {/* 添加对象 — slides right */}
        <button
          className="ios-tap premium-press flex items-center gap-2 rounded-2xl px-3 py-2.5"
          style={{
            background: "var(--premium-action-surface)",
            border: "1px solid var(--premium-action-border)",
            boxShadow: "var(--premium-action-shadow)",
            opacity: showActions ? 1 : 0,
            transform: showActions ? "translateY(0) translateX(8px) scale(1)" : "translateY(16px) translateX(-40px) scale(0.94)",
            pointerEvents: showActions ? "auto" : "none",
            marginLeft: 12,
            transition: "opacity var(--motion-standard) var(--motion-ease), transform var(--motion-standard) var(--motion-ease), box-shadow var(--motion-standard) var(--motion-ease)",
          }}
          onClick={handleAddObject}
          aria-label="添加对象"
        >
          <span style={{ fontSize: 20 }}>📌</span>
          <span className="font-semibold" style={{ fontSize: 14, color: "var(--premium-text)" }}>添加对象</span>
        </button>
      </div>

      {/* Tab bar */}
      <div className="absolute left-4 right-4 z-40" style={{ bottom: 14 }}>
        <div
          className="premium-glass"
          style={{
            borderRadius: 28,
            paddingBottom: 10,
            background: "var(--premium-tab-surface)",
            boxShadow: "var(--premium-tab-shadow)",
          }}
        >
          <div className="flex items-start justify-around pt-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.prominent) {
                    handleProminentPress()
                  } else {
                    setShowActions(false)
                    onTabChange(tab.id)
                  }
                }}
                className="ios-tap premium-press flex flex-col items-center gap-1"
                style={{ flex: 1, minWidth: 0 }}
              >
                {tab.prominent ? (
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: showActions
                        ? "#101828"
                        : "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
                      boxShadow: showActions
                        ? "0 10px 22px rgba(16,24,40,0.24)"
                        : "0 12px 24px rgba(76,111,255,0.32)",
                      transform: showActions ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform var(--motion-standard) var(--motion-ease), background var(--motion-standard) var(--motion-ease), box-shadow var(--motion-standard) var(--motion-ease)",
                    }}
                  >
                    <Icon size={22} strokeWidth={2.5} style={{ color: "#FFFFFF" }} />
                  </div>
                ) : (
                  <>
                    <div className="relative flex items-center justify-center" style={{ width: 28, height: 28 }}>
                      <Icon
                        size={22}
                        strokeWidth={isActive ? 2.2 : 1.6}
                        style={{ color: isActive ? "#4C6FFF" : "var(--premium-text-subtle)" }}
                      />
                      {tab.id === "reminders" && (
                        <div
                          className="absolute -top-0.5 -right-1 bg-[#FF3B30] rounded-full"
                          style={{ width: 7, height: 7 }}
                        />
                      )}
                    </div>
                    <span
                      className={cn("leading-none", isActive ? "font-semibold" : "font-medium")}
                      style={{ fontSize: 10, color: isActive ? "#4C6FFF" : "var(--premium-text-subtle)" }}
                    >
                      {tab.label}
                    </span>
                  </>
                )}
              </button>
            )
          })}
          </div>
        </div>
      </div>
    </>
  )
}
