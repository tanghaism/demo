"use client"

import { Home, FolderOpen, Plus, Bell, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

type Tab = "home" | "records" | "add" | "reminders" | "settings"

interface TabBarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs = [
  { id: "home" as Tab, label: "首页", icon: Home },
  { id: "records" as Tab, label: "记录", icon: FolderOpen },
  { id: "add" as Tab, label: "添加", icon: Plus, prominent: true },
  { id: "reminders" as Tab, label: "提醒", icon: Bell },
  { id: "settings" as Tab, label: "设置", icon: Settings },
]

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
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
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-1 ios-tap"
              style={{ flex: 1, minWidth: 0 }}
            >
              <div className="relative flex items-center justify-center" style={{ width: 28, height: 28 }}>
                {tab.prominent ? (
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "#2563FF",
                    }}
                  >
                    <Icon size={18} strokeWidth={2.5} style={{ color: "#FFFFFF" }} />
                  </div>
                ) : (
                  <Icon
                    size={22}
                    strokeWidth={isActive ? 2.2 : 1.6}
                    style={{ color: isActive ? "#2563FF" : "#8E8E93" }}
                  />
                )}
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
            </button>
          )
        })}
      </div>
    </div>
  )
}
