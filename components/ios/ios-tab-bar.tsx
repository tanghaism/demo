"use client"

import { cn } from "@/lib/utils"

interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: number
}

interface IOSTabBarProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function IOSTabBar({ tabs, activeTab, onTabChange }: IOSTabBarProps) {
  return (
    <div className="sticky bottom-0 bg-background/80 backdrop-blur-xl border-t border-border/50 pb-8 pt-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 min-w-[64px] py-1 active:opacity-50 transition-opacity"
            >
              <div className="relative">
                <div className={cn(isActive ? "text-primary" : "text-muted-foreground")}>
                  {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                </div>
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] px-1 bg-destructive text-destructive-foreground text-[11px] font-medium rounded-full flex items-center justify-center">
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px]",
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                )}
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
