"use client"

import { Plus, Sparkles, Shield, Package2 } from "lucide-react"

interface NoSpaceEmptyProps {
  onNavigate: (screen: string) => void
}

export function NoSpaceEmpty({ onNavigate }: NoSpaceEmptyProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F6F8FF", paddingTop: 54 }}>
      <div className="px-4 pt-6 pb-1">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 8, background: "#2563FF" }}>
            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>P</span>
          </div>
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.8, color: "#101828" }}>凭保</span>
        </div>
        <p className="text-[#98A2B3]" style={{ fontSize: 15 }}>重要资料先存起来</p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="flex items-center justify-center mb-6" style={{ width: 96, height: 96, borderRadius: 24, background: "#EEF4FF" }}>
          <span style={{ fontSize: 48 }}>📦</span>
        </div>
        <h2 className="font-bold text-[#101828] text-center mb-2" style={{ fontSize: 22, letterSpacing: -0.3 }}>还没有资料箱</h2>
        <p className="text-[#98A2B3] text-center leading-relaxed mb-8" style={{ fontSize: 15, maxWidth: 260, lineHeight: 1.55 }}>创建第一个资料箱，开始保存合同、票据、证照和重要记录</p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[ { icon: Shield, label: "本地保存", color: "#14C8A8", bg: "#EDFAF7" }, { icon: Package2, label: "资料导出", color: "#2563FF", bg: "#EEF4FF" }, { icon: Sparkles, label: "提醒管理", color: "#7C5CFF", bg: "#F0EBFF" } ].map((f) => { const Icon = f.icon; return (<div key={f.label} className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: f.bg }}><Icon size={14} strokeWidth={2} style={{ color: f.color }} /><span className="font-medium" style={{ fontSize: 13, color: f.color }}>{f.label}</span></div>) })}
        </div>
        <button className="ios-tap flex items-center justify-center gap-2 rounded-xl font-semibold text-white w-full" style={{ maxWidth: 280, height: 50, fontSize: 17, background: "#2563FF" }} onClick={() => onNavigate("space-editor")} aria-label="新建资料箱">
          <Plus size={20} strokeWidth={2.5} />新建资料箱
        </button>
      </div>
    </div>
  )
}
