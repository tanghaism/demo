"use client"

import { useState } from "react"
import { IPhoneShell } from "@/components/proofly/iphone-shell"
import { TabBar } from "@/components/proofly/tab-bar"
import { NoSpaceEmpty } from "@/components/proofly/screens/no-space-empty"
import { SpaceEditor } from "@/components/proofly/screens/space-editor"
import { HomeScreen } from "@/components/proofly/screens/home"
import { AddRecord } from "@/components/proofly/screens/add-record"
import { RecordsList } from "@/components/proofly/screens/records-list"
import { RecordDetail } from "@/components/proofly/screens/record-detail"
import { RemindersScreen } from "@/components/proofly/screens/reminders"
import { SettingsScreen } from "@/components/proofly/screens/settings"
import { SearchScreen } from "@/components/proofly/screens/search"
import { ProUpgrade } from "@/components/proofly/screens/pro-upgrade"
import { ExportScreen } from "@/components/proofly/screens/export"
import { ObjectDetail } from "@/components/proofly/screens/object-detail"
import { TemplatesScreen } from "@/components/proofly/screens/templates"
import { TemplateEditor } from "@/components/proofly/screens/template-editor"
import { AddObject } from "@/components/proofly/screens/add-object"
import { PendingScreen } from "@/components/proofly/screens/pending"

const noop = () => {}
const noopNav = (_: string) => {}

type Tab = "home" | "records" | "add" | "reminders" | "settings"
type Screen =
  | "no-space-empty"
  | "space-editor"
  | "template-editor"
  | "home"
  | "records"
  | "reminders"
  | "settings"
  | "add-record"
  | "add-object"
  | "record-detail"
  | "search"
  | "pro-upgrade"
  | "export"
  | "object-detail"
  | "templates"
  | "pending"

const tabScreens: Record<Tab, Screen> = {
  home: "home",
  records: "records",
  add: "add-record",
  reminders: "reminders",
  settings: "settings",
}

function ShowcaseShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold text-[#667085] uppercase tracking-wider">{title}</span>
      <IPhoneShell>
        <div className="relative h-full">{children}</div>
      </IPhoneShell>
    </div>
  )
}

function Showcase() {
  return (
    <div className="min-h-screen bg-[#E0E6F0] py-8 px-4">
      <h1 className="text-center text-2xl font-bold text-[#101828] mb-8">
        凭保 Proofly · 全部页面
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        <ShowcaseShell title="0. 无资料箱 · 空状态">
          <NoSpaceEmpty onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="1. 新建 / 编辑资料箱">
          <SpaceEditor mode="create" onClose={noop} onSave={noop} onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="2. 首页 · Today">
          <HomeScreen onNavigate={noopNav} currentSpace="家庭资料箱" onSpaceChange={noop} onViewAllRecords={noop} onViewAllReminders={noop} />
          <TabBar activeTab="home" onTabChange={noop} onAddRecord={noop} onAddObject={noop} />
        </ShowcaseShell>
        <ShowcaseShell title="3. 快速添加记录">
          <AddRecord onClose={noop} onSave={noop} />
        </ShowcaseShell>
        <ShowcaseShell title="3b. 添加对象">
          <AddObject onClose={noop} onSave={noop} />
        </ShowcaseShell>
        <ShowcaseShell title="4. 记录列表">
          <RecordsList onSelectRecord={noop} onAddRecord={noop} onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="5. 记录详情">
          <RecordDetail onBack={noop} onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="6. 对象详情">
          <ObjectDetail onBack={noop} onSelectRecord={noop} onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="7. 搜索">
          <SearchScreen onClose={noop} onSelectRecord={noop} onSelectObject={noop} onSelectEvent={noop} />
        </ShowcaseShell>
        <ShowcaseShell title="8. 提醒">
          <RemindersScreen onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="9. 导出资料包">
          <ExportScreen onBack={noop} onNavigate={noopNav} mode="object" />
        </ShowcaseShell>
        <ShowcaseShell title="10. 待整理">
          <PendingScreen onBack={noop} onSelectRecord={noop} />
        </ShowcaseShell>
        <ShowcaseShell title="11. 模板管理">
          <TemplatesScreen onBack={noop} onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="12. 新建 / 编辑模板">
          <TemplateEditor mode="create" onClose={noop} onSave={noop} onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="13. 设置">
          <SettingsScreen onNavigate={noopNav} />
        </ShowcaseShell>
        <ShowcaseShell title="14. Pro 升级">
          <ProUpgrade onClose={noop} />
        </ShowcaseShell>
      </div>
    </div>
  )
}

export default function ProoflyApp() {
  const [showcase, setShowcase] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<Screen>("no-space-empty")
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [currentSpace, setCurrentSpace] = useState("家庭资料箱")
  const [spaceFilter, setSpaceFilter] = useState<string | undefined>(undefined)
  const [searchFrom, setSearchFrom] = useState<Screen>("home")
  const [proFrom, setProFrom] = useState<Screen>("settings")
  const [exportFrom, setExportFrom] = useState<Screen>("settings")

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    setCurrentScreen(tabScreens[tab])
    // Clear space filter when navigating from bottom tabs (cross-space view)
    if (tab === "records" || tab === "reminders") setSpaceFilter(undefined)
  }

  const handleNavigate = (screen: string) => {
    const s = screen as Screen
    if (s === "search") setSearchFrom(currentScreen)
    if (s === "pro-upgrade") setProFrom(currentScreen)
    if (s === "export") setExportFrom(currentScreen)
    setCurrentScreen(s)
  }

  const showTabBar = (["home", "records", "add-record", "reminders", "settings"] as Screen[]).includes(currentScreen)

  const renderScreen = () => {
    switch (currentScreen) {
      case "no-space-empty":
        return (
          <NoSpaceEmpty
            onNavigate={handleNavigate}
          />
        )
      case "space-editor":
        return (
          <SpaceEditor
            mode="create"
            onClose={() => setCurrentScreen("no-space-empty")}
            onSave={() => {
              setCurrentScreen("home")
              setActiveTab("home")
            }}
            onNavigate={handleNavigate}
          />
        )
      case "home":
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            currentSpace={currentSpace}
            onSpaceChange={setCurrentSpace}
            onViewAllRecords={() => { setSpaceFilter(currentSpace); setCurrentScreen("records") }}
            onViewAllReminders={() => { setSpaceFilter(currentSpace); setCurrentScreen("reminders") }}
          />
        )
      case "add-record":
        return (
          <AddRecord
            onClose={() => setCurrentScreen(activeTab === "records" ? "records" : "home")}
            onSave={() => setCurrentScreen(activeTab === "records" ? "records" : "home")}
          />
        )
      case "records":
        return (
          <RecordsList
            onSelectRecord={() => setCurrentScreen("record-detail")}
            onAddRecord={() => setCurrentScreen("add-record")}
            onNavigate={handleNavigate}
            spaceFilter={spaceFilter}
          />
        )
      case "pending":
        return (
          <PendingScreen
            onBack={() => setCurrentScreen("records")}
            onSelectRecord={() => setCurrentScreen("record-detail")}
          />
        )
      case "record-detail":
        return (
          <RecordDetail
            onBack={() => setCurrentScreen(activeTab === "home" ? "home" : "records")}
            onNavigate={handleNavigate}
          />
        )
      case "add-object":
        return (
          <AddObject
            onClose={() => setCurrentScreen(activeTab === "home" ? "home" : "records")}
            onSave={() => { setCurrentScreen("object-detail") }}
          />
        )
      case "object-detail":
        return (
          <ObjectDetail
            onBack={() => setCurrentScreen(activeTab === "home" ? "home" : "record-detail")}
            onSelectRecord={() => setCurrentScreen("record-detail")}
            onNavigate={handleNavigate}
          />
        )
      case "search":
        return (
          <SearchScreen
            onClose={() => setCurrentScreen(searchFrom)}
            onSelectRecord={() => setCurrentScreen("record-detail")}
            onSelectObject={() => setCurrentScreen("object-detail")}
            onSelectEvent={() => setCurrentScreen("object-detail")}
          />
        )
      case "reminders":
        return <RemindersScreen onNavigate={handleNavigate} spaceFilter={spaceFilter} />
      case "settings":
        return <SettingsScreen onNavigate={handleNavigate} />
      case "pro-upgrade":
        return (
          <ProUpgrade
            onClose={() => setCurrentScreen(proFrom)}
          />
        )
      case "export":
        return (
          <ExportScreen
            onBack={() => setCurrentScreen(exportFrom)}
            onNavigate={handleNavigate}
          />
        )
      case "templates":
        return (
          <TemplatesScreen
            onBack={() => setCurrentScreen("settings")}
            onNavigate={handleNavigate}
          />
        )
      case "template-editor":
        return (
          <TemplateEditor
            mode="create"
            onClose={() => setCurrentScreen("templates")}
            onSave={() => setCurrentScreen("templates")}
            onNavigate={handleNavigate}
          />
        )
      default:
        return <HomeScreen onNavigate={handleNavigate} currentSpace={currentSpace} onSpaceChange={setCurrentSpace} onViewAllRecords={() => { setSpaceFilter(currentSpace); setCurrentScreen("records") }} onViewAllReminders={() => { setSpaceFilter(currentSpace); setCurrentScreen("reminders") }} />
    }
  }

  if (showcase) {
    return (
      <div className="relative">
        <button
          className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl font-semibold text-sm shadow-lg ios-tap"
          style={{ background: "#101828", color: "white" }}
          onClick={() => setShowcase(false)}
        >
          切换到交互模式
        </button>
        <Showcase />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E0E6F0] flex items-start justify-center py-8 px-4 relative">
      <button
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-xl font-semibold text-sm shadow-lg ios-tap"
        style={{ background: "#101828", color: "white" }}
        onClick={() => setShowcase(true)}
      >
        查看全部页面
      </button>
      <IPhoneShell>
        <div className="relative h-full">
          {renderScreen()}
          {showTabBar && (
            <TabBar activeTab={activeTab} onTabChange={handleTabChange} onAddRecord={() => { setCurrentScreen("add-record"); setActiveTab("add") }} onAddObject={() => { setCurrentScreen("add-object") }} />
          )}
        </div>
      </IPhoneShell>
    </div>
  )
}
