"use client"

import { ChevronLeft, ChevronRight, Lock, Plus } from "lucide-react"
import { AmbientBackground } from "@/components/proofly/ambient-background"
import { PremiumCard } from "@/components/proofly/premium-card"

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
    <div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
      <AmbientBackground />

      {/* iOS push navigation bar */}
      <div
        className="relative z-10 flex items-center px-1 pt-2 pb-2"
      >
        <button
          className="ios-tap flex items-center px-2"
          style={{ height: 44 }}
          onClick={onBack}
          aria-label="返回设置"
        >
          <ChevronLeft size={20} strokeWidth={2.5} style={{ color: "#4C6FFF" }} />
          <span style={{ fontSize: 17, color: "#4C6FFF" }}>设置</span>
        </button>
        <span
          style={{ fontSize: 17, fontWeight: 600, color: "var(--premium-text)", position: "absolute", left: "50%", transform: "translateX(-50%)" }}
        >
          模板管理
        </span>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar px-4 pb-24">

        <div className="flex items-center px-5 mt-3 mb-2" style={{ height: 30 }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase" }}>内置模板</p>
        </div>
        <PremiumCard className="mb-5 rounded-[18px]">
          {builtinTemplates.map((t, i) => (
            <div
              key={t.name}
              className="ios-tap flex items-center px-4"
              style={{
                height: 56,
                borderBottom: i < builtinTemplates.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
              }}
              aria-label={t.name}
            >
              <div
                className="flex items-center justify-center flex-shrink-0 mr-3"
                style={{ width: 30, height: 30, borderRadius: 7, background: "var(--premium-icon-blue-bg)" }}
              >
                <span style={{ fontSize: 17 }}>{t.emoji}</span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p style={{ fontSize: 16, color: "var(--premium-text)", fontWeight: 500 }}>{t.name}</p>
                <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{t.desc} · {t.fields} 个字段</p>
              </div>
            </div>
          ))}
        </PremiumCard>

        {/* Custom templates */}
        <div className="flex items-center justify-between px-5 mt-3 mb-2" style={{ height: 30 }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase" }}>自定义模板</p>
          <button
            className="ios-tap flex items-center gap-1 px-3 py-1.5 rounded-xl"
            style={{ background: "var(--premium-chip-blue-bg)" }}
            onClick={() => onNavigate("template-editor")}
            aria-label="新建自定义模板"
          >
            <Plus size={14} strokeWidth={2.5} className="text-[#2563FF]" />
            <span className="font-semibold text-[#2563FF]" style={{ fontSize: 12 }}>新建</span>
          </button>
        </div>

        {customTemplates.length > 0 ? (
          <PremiumCard className="mb-5 rounded-[18px]">
            {customTemplates.map((t, i) => (
              <button
                key={t.name}
                className="ios-tap w-full flex items-center px-4"
                style={{
                  height: 56,
                  borderBottom: i < customTemplates.length - 1 ? "0.5px solid var(--premium-row-border)" : "none",
                }}
                onClick={() => onNavigate("template-editor")}
                aria-label={`编辑模板 ${t.name}`}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0 mr-3"
                  style={{ width: 30, height: 30, borderRadius: 7, background: "var(--premium-icon-indigo-bg)" }}
                >
                  <span style={{ fontSize: 17 }}>{t.emoji}</span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p style={{ fontSize: 16, color: "var(--premium-text)", fontWeight: 500 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{t.desc} · {t.fields} 个字段</p>
                </div>
                <ChevronRight size={16} strokeWidth={2} style={{ color: "var(--premium-chevron)" }} />
              </button>
            ))}
          </PremiumCard>
        ) : (
          <button
          className="ios-tap premium-press w-full flex flex-col items-center justify-center gap-2 rounded-2xl py-8 mb-5"
          style={{ border: "1.5px dashed rgba(76,111,255,0.22)", background: "var(--premium-control-surface-strong)" }}
            onClick={() => onNavigate("template-editor")}
            aria-label="新建自定义模板"
          >
            <div
              className="flex items-center justify-center"
              style={{ width: 40, height: 40, borderRadius: 10, background: "var(--premium-icon-indigo-bg)" }}
            >
              <Plus size={20} strokeWidth={1.8} style={{ color: "#5856D6" }} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: "#5856D6" }}>新建自定义模板</p>
            <p style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>自定义字段、标签和默认提醒</p>
          </button>
        )}

        {/* Pro hint */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-xl"
          style={{ background: "var(--premium-warning-bg)", border: "1px solid var(--premium-warning-border)" }}
        >
          <span style={{ fontSize: 15 }}>💡</span>
          <p className="leading-relaxed" style={{ fontSize: 12, color: "var(--premium-warning-text)" }}>
            免费版只能查看内置模板。创建自定义模板需要升级 Pro，删除自定义模板不会影响已保存的资料。
          </p>
        </div>
      </div>
    </div>
  )
}
