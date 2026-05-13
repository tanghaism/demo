"use client"

import { Plus, Check, Pencil } from "lucide-react"

interface Space {
  emoji: string
  name: string
  desc: string
  records: number
  reminders: number
  updated: string
  pro?: boolean
}

const spaces: Space[] = [
  { emoji: "🏠", name: "家庭资料箱", desc: "房屋、物品、保修、合同、健康和老幼照护资料", records: 46, reminders: 5, updated: "今天" },
  { emoji: "🧾", name: "经营资料箱", desc: "客户、项目、票据和证照", records: 128, reminders: 9, updated: "昨天" },
  { emoji: "💼", name: "事业资料箱", desc: "合同、绩效、证书和求职资料", records: 32, reminders: 3, updated: "3 天前" },
  { emoji: "✨", name: "自定义资料箱", desc: "创建你的专属资料空间", records: 0, reminders: 0, updated: "", pro: true },
]

interface SpaceSelectSheetProps {
  activeSpace: string
  onSelect: (space: Space) => void
  onClose: () => void
  onNewSpace: () => void
  onEditSpace: () => void
}

export function SpaceSelectSheet({ activeSpace, onSelect, onClose, onNewSpace, onEditSpace }: SpaceSelectSheetProps) {
  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-8" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)", maxHeight: "80%" }} onClick={(e) => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
        <div className="flex items-center justify-between px-5 mb-4">
          <h2 className="font-bold text-[#101828]" style={{ fontSize: 18 }}>切换资料箱</h2>
          <button className="ios-tap flex items-center gap-1 rounded-lg px-3 py-1.5" style={{ background: "#EEF4FF" }} onClick={() => { onClose(); onEditSpace() }} aria-label="编辑资料箱">
            <Pencil size={13} strokeWidth={2} className="text-[#2563FF]" />
            <span className="font-semibold text-[#2563FF]" style={{ fontSize: 12 }}>编辑</span>
          </button>
        </div>
        <div className="px-4 mb-3">
          <div className="bg-[#F6F8FF] rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            {spaces.map((space, i) => {
              const isActive = space.name === activeSpace
              return (
                <button key={space.name} className="ios-tap w-full flex items-start px-4 py-3.5 text-left" style={{ borderBottom: i < spaces.length - 1 ? "0.5px solid #E8ECF4" : "none", background: isActive ? "#EEF4FF" : "transparent" }} onClick={() => { if (!space.pro) onSelect(space) }} aria-label={space.name}>
                  <div className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5" style={{ width: 40, height: 40, borderRadius: 10, background: isActive ? "#D6E4FF" : "#EEF4FF" }}>
                    <span style={{ fontSize: 22 }}>{space.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>{space.name}</span>
                      {space.pro && (<span className="px-1.5 rounded-full font-semibold" style={{ fontSize: 10, background: "#7C5CFF", color: "white", paddingTop: 1, paddingBottom: 1 }}>Pro</span>)}
                      {isActive && (<span className="px-1.5 rounded-full font-semibold" style={{ fontSize: 10, background: "#2563FF", color: "white", paddingTop: 1, paddingBottom: 1 }}>当前</span>)}
                    </div>
                    <p className="text-[#98A2B3] mt-0.5 leading-snug" style={{ fontSize: 12 }}>{space.desc}</p>
                    {!space.pro && (
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[#667085] font-medium" style={{ fontSize: 12 }}>{space.records} 条记录</span>
                        {space.reminders > 0 && (<span className="text-[#FF9500] font-medium" style={{ fontSize: 12 }}>{space.reminders} 个提醒</span>)}
                        {space.updated && (<span className="text-[#C8D0E8]" style={{ fontSize: 11 }}>更新于{space.updated}</span>)}
                      </div>
                    )}
                  </div>
                  {isActive && (<Check size={18} strokeWidth={2.5} className="text-[#2563FF] flex-shrink-0 mt-1" />)}
                </button>
              )
            })}
          </div>
        </div>
        <div className="px-4 mb-3">
          <button className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl py-3.5" style={{ border: "1.5px dashed rgba(60,60,67,0.2)", background: "transparent" }} onClick={onNewSpace} aria-label="新建资料箱">
            <Plus size={18} strokeWidth={2} className="text-[#2563FF]" />
            <span className="text-[#2563FF] font-medium" style={{ fontSize: 15 }}>新建资料箱</span>
          </button>
        </div>
        <div className="px-4">
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "#FFF8EC" }}>
            <span style={{ fontSize: 15 }}>💡</span>
            <p className="text-[#8A5F00] leading-relaxed" style={{ fontSize: 12 }}>免费版支持 1 个资料箱，升级 Pro 可创建多个资料箱并解锁完整功能</p>
          </div>
        </div>
      </div>
    </div>
  )
}
