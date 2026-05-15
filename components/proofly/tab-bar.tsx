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
        className="absolute inset-0 z-30 transition-opacity duration-200 pointer-events-none"
        style={{
          background: "rgba(0,0,0,0.25)",
          opacity: showActions ? 1 : 0,
          pointerEvents: showActions ? "auto" : "none",
        }}
        onClick={() => setShowActions(false)}
      />

      {/* Floating action buttons — horizontal, above the tab bar */}
      <div
        className="absolute left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
        style={{ bottom: 84 }}
      >
        {/* 添加记录 — slides left */}
        <button
          className="ios-tap flex items-center gap-2 px-3 py-2.5 rounded-xl shadow-lg transition-all duration-200 ease-out"
          style={{
            background: "#FFFFFF",
            opacity: showActions ? 1 : 0,
            transform: showActions ? "translateX(-8px)" : "translateX(40px)",
            pointerEvents: showActions ? "auto" : "none",
          }}
          onClick={handleAddRecord}
          aria-label="添加记录"
        >
          <span style={{ fontSize: 20 }}>📝</span>
          <span className="font-semibold text-[#101828]" style={{ fontSize: 14 }}>添加记录</span>
        </button>

        {/* 添加对象 — slides right */}
        <button
          className="ios-tap flex items-center gap-2 px-3 py-2.5 rounded-xl shadow-lg transition-all duration-200 ease-out"
          style={{
            background: "#FFFFFF",
            opacity: showActions ? 1 : 0,
            transform: showActions ? "translateX(8px)" : "translateX(-40px)",
            pointerEvents: showActions ? "auto" : "none",
            marginLeft: 12,
          }}
          onClick={handleAddObject}
          aria-label="添加对象"
        >
          <span style={{ fontSize: 20 }}>📌</span>
          <span className="font-semibold text-[#101828]" style={{ fontSize: 14 }}>添加对象</span>
        </button>
      </div>

      {/* Tab bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-40"
        style={{
          background: "rgba(249,249,249,0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "0.5px solid rgba(60,60,67,0.29)",
          paddingBottom: 22,
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
                className="flex flex-col items-center gap-1 ios-tap"
                style={{ flex: 1, minWidth: 0 }}
              >
                {tab.prominent ? (
                  <div
                    className="flex items-center justify-center flex-shrink-0 transition-transform duration-250"
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: showActions
                        ? "#101828"
                        : "linear-gradient(135deg, #2563FF 0%, #7C5CFF 100%)",
                      boxShadow: "0 2px 8px rgba(37,99,255,0.3)",
                      transform: showActions ? "rotate(45deg)" : "rotate(0deg)",
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
                        style={{ color: isActive ? "#2563FF" : "#8E8E93" }}
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
                      style={{ fontSize: 10, color: isActive ? "#2563FF" : "#8E8E93" }}
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
    </>
  )
}
