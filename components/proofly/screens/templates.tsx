"use client"

import { ChevronLeft, ChevronRight, Lock, Plus } from "lucide-react"

const builtinTemplates = [
  { emoji: "🧾", name: "发票 / 收据", desc: "日期、金额、商家名", fields: 3 },
  { emoji: "📄", name: "合同", desc: "日期、金额、对方、到期提醒", fields: 4 },
  { emoji: "🔧", name: "保修记录", desc: "购入日期、保修到期、序列号", fields: 3 },
  { emoji: "🏥", name: "体检报告", desc: "日期、机构、关联人", fields: 3 },
  { emoji: "💊", name: "处方 / 用药", desc: "日期、医生、药品、用量", fields: 4 },
  { emoji: "💉", name: "疫苗接种", desc: "接种日期、疫苗名、下次提醒", fields: 3 },
]

const customTemplates = [
  { emoji: "💻", name: "电子设备", desc: "品牌、型号、序列号、购买日期", fields: 4 },
  { emoji: "📦", name: "进货记录", desc: "供应商、品类、数量、金额", fields: 4 },
]

interface TemplatesScreenProps {
  onBack: () => void
  onNavigate: (screen: string) => void
}

export function TemplatesScreen({ onBack, onNavigate }: TemplatesScreenProps) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>

      {/* iOS push navigation bar */}
      <div
        className="flex items-center px-1 pt-2 pb-2"
        style={{ borderBottom: "0.5px solid rgba(60,60,67,0.29)", background: "#F2F2F7" }}
      >
        <button
          className="ios-tap flex items-center px-2"
          style={{ height: 44 }}
          onClick={onBack}
          aria-label="返回设置"
        >
          <ChevronLeft size={20} strokeWidth={2.5} style={{ color: "#007AFF" }} />
          <span style={{ fontSize: 17, color: "#007AFF" }}>设置</span>
        </button>
        <span
          style={{ fontSize: 17, fontWeight: 600, color: "#000000", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
        >
          模板管理
        </span>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-24">

        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>内置模板</p>
        <div className="mb-5" style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
          {builtinTemplates.map((t, i) => (
            <div
              key={t.name}
              className="ios-tap flex items-center px-4"
              style={{
                height: 56,
                borderBottom: i < builtinTemplates.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
              }}
              aria-label={t.name}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 mr-3"
                style={{ width: 30, height: 30, borderRadius: 7, background: "#EEF4FF" }}
              >
                <span style={{ fontSize: 17 }}>{t.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p style={{ fontSize: 16, color: "#000000", fontWeight: 500 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "#8E8E93" }}>{t.desc} · {t.fields} 个字段</p>
              </div>
            </div>
          ))}
        </div>

        {/* Custom templates */}
        <div className="flex items-center justify-between mb-1" style={{ paddingLeft: 4, paddingRight: 4 }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>自定义模板</p>
          <button
            className="ios-tap flex items-center gap-1 px-3 py-1.5 rounded-xl"
            style={{ background: "#EEF4FF" }}
            onClick={() => onNavigate("template-editor")}
            aria-label="新建自定义模板"
          >
            <Plus size={14} strokeWidth={2.5} className="text-[#2563FF]" />
            <span className="font-semibold text-[#2563FF]" style={{ fontSize: 12 }}>新建</span>
          </button>
        </div>

        {customTemplates.length > 0 ? (
          <div className="mb-5" style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            {customTemplates.map((t, i) => (
              <button
                key={t.name}
                className="ios-tap w-full flex items-center px-4"
                style={{
                  height: 56,
                  borderBottom: i < customTemplates.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                }}
                onClick={() => onNavigate("template-editor")}
                aria-label={`编辑模板 ${t.name}`}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mr-3"
                  style={{ width: 30, height: 30, borderRadius: 7, background: "#F0EBFF" }}
                >
                  <span style={{ fontSize: 17 }}>{t.emoji}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p style={{ fontSize: 16, color: "#000000", fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "#8E8E93" }}>{t.desc} · {t.fields} 个字段</p>
                </div>
                <ChevronRight size={16} strokeWidth={2} style={{ color: "#C7C7CC" }} />
              </button>
            ))}
          </div>
        ) : (
          <button
            className="ios-tap w-full flex flex-col items-center justify-center gap-2 rounded-xl py-8 mb-5"
            style={{ border: "1.5px dashed rgba(60,60,67,0.2)", background: "transparent" }}
            onClick={() => onNavigate("template-editor")}
            aria-label="新建自定义模板"
          >
            <div
              className="flex items-center justify-center"
              style={{ width: 40, height: 40, borderRadius: 10, background: "#F0EBFF" }}
            >
              <Plus size={20} strokeWidth={1.8} style={{ color: "#5856D6" }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#5856D6" }}>新建自定义模板</p>
            <p style={{ fontSize: 13, color: "#8E8E93" }}>自定义字段、标签和默认提醒</p>
          </button>
        )}

        {/* Pro hint */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: "#FFF8EC" }}
        >
          <span style={{ fontSize: 15 }}>💡</span>
          <p className="text-[#8A5F00] leading-relaxed" style={{ fontSize: 12 }}>
            免费版只能查看内置模板。创建自定义模板需要升级 Pro，删除自定义模板不会影响已保存的资料。
          </p>
        </div>
      </div>
    </div>
  )
}
