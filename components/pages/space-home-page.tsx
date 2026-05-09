"use client"

import { useState } from "react"
import {
  FileText,
  Bell,
  Settings,
  FolderOpen,
  Plus,
  AlertTriangle,
  Clock,
  ChevronRight,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSSearchBar } from "@/components/ios/ios-search-bar"
import { IOSTabBar } from "@/components/ios/ios-tab-bar"
import { IOSList, IOSListItem } from "@/components/ios/ios-list"
import {
  type Space,
  type Category,
  familyCategories,
  freelancerCategories,
  businessCategories,
  documents,
  reminders,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface SpaceHomePageProps {
  space: Space
  onBack: () => void
  onSelectCategory: (category: Category) => void
  onSelectDocument: (docId: string) => void
  onAddDocument: () => void
  onOpenReminders: () => void
  onOpenSettings: () => void
}

const getCategoriesForSpace = (spaceType: Space["type"]) => {
  switch (spaceType) {
    case "family":
      return familyCategories
    case "freelancer":
      return freelancerCategories
    case "business":
      return businessCategories
    default:
      return familyCategories
  }
}

export function SpaceHomePage({
  space,
  onBack,
  onSelectCategory,
  onSelectDocument,
  onAddDocument,
  onOpenReminders,
  onOpenSettings,
}: SpaceHomePageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("documents")

  const categories = getCategoriesForSpace(space.type)
  const expiredCount = reminders.filter((r) => r.daysRemaining < 0).length
  const expiringCount = reminders.filter(
    (r) => r.daysRemaining >= 0 && r.daysRemaining <= 30
  ).length

  const tabs = [
    {
      id: "documents",
      label: "资料",
      icon: <FileText className="w-6 h-6" />,
      activeIcon: <FileText className="w-6 h-6 fill-primary" />,
    },
    {
      id: "reminders",
      label: "提醒",
      icon: <Bell className="w-6 h-6" />,
      activeIcon: <Bell className="w-6 h-6 fill-primary" />,
      badge: expiredCount + expiringCount,
    },
    {
      id: "settings",
      label: "设置",
      icon: <Settings className="w-6 h-6" />,
      activeIcon: <Settings className="w-6 h-6" />,
    },
  ]

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (tabId === "reminders") onOpenReminders()
    if (tabId === "settings") onOpenSettings()
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title={space.name}
        large
        subtitle={`${space.documentCount}份资料`}
        leftAction={{
          label: "空间",
          onClick: onBack,
        }}
        rightAction={{
          icon: <Plus className="w-6 h-6" />,
          onClick: onAddDocument,
        }}
      />

      <IOSSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="搜索资料、合同、证件..."
      />

      {/* Alert cards */}
      {(expiredCount > 0 || expiringCount > 0) && (
        <div className="px-4 py-2 space-y-2">
          {expiredCount > 0 && (
            <button
              onClick={onOpenReminders}
              className="w-full flex items-center gap-3 p-3 bg-destructive/10 rounded-xl active:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-medium text-destructive">
                  {expiredCount}项已过期
                </p>
                <p className="text-[13px] text-destructive/70">
                  点击查看详情
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-destructive/50" />
            </button>
          )}
          {expiringCount > 0 && (
            <button
              onClick={onOpenReminders}
              className="w-full flex items-center gap-3 p-3 bg-amber-500/10 rounded-xl active:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-medium text-amber-700">
                  {expiringCount}项即将到期
                </p>
                <p className="text-[13px] text-amber-600/70">30天内到期</p>
              </div>
              <ChevronRight className="w-5 h-5 text-amber-500/50" />
            </button>
          )}
        </div>
      )}

      {/* Category grid */}
      <div className="px-4 py-3">
        <h2 className="text-[13px] text-muted-foreground uppercase tracking-wide mb-2 px-1">
          分类
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="flex flex-col items-center gap-1.5 py-3 bg-card rounded-xl active:bg-muted/50 transition-colors"
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="text-[11px] text-muted-foreground truncate w-full text-center px-1">
                {category.name}
              </span>
              <span className="text-[10px] text-muted-foreground/60">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent documents */}
      <IOSList header="最近资料">
        {documents.slice(0, 5).map((doc) => (
          <IOSListItem
            key={doc.id}
            title={doc.title}
            subtitle={`${doc.category} · ${doc.date}`}
            icon={
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  doc.isExpired
                    ? "bg-destructive/10"
                    : doc.isExpiringSoon
                    ? "bg-amber-500/10"
                    : "bg-primary/10"
                )}
              >
                <FolderOpen
                  className={cn(
                    "w-4 h-4",
                    doc.isExpired
                      ? "text-destructive"
                      : doc.isExpiringSoon
                      ? "text-amber-600"
                      : "text-primary"
                  )}
                />
              </div>
            }
            trailing={
              doc.isExpired ? (
                <span className="text-[11px] text-destructive bg-destructive/10 px-1.5 py-0.5 rounded">
                  已过期
                </span>
              ) : doc.isExpiringSoon ? (
                <span className="text-[11px] text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                  即将到期
                </span>
              ) : null
            }
            onClick={() => onSelectDocument(doc.id)}
          />
        ))}
      </IOSList>

      <div className="flex-1" />

      <IOSTabBar
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  )
}
