"use client"

import { useState } from "react"
import { Check, Lock, ChevronRight } from "lucide-react"

const EMOJI_OPTIONS = ["🏠", "🧾", "💼", "✨", "📦", "🏥", "💻", "📄", "🔧", "💰", "📊", "🎓", "🛒", "🚗", "🏡", "❤️", "🌟", "📋", "🔒", "📁"]

const SPACE_TYPES = [
  { id: "family", emoji: "🏠", name: "家庭资料箱", desc: "房屋、物品、保修、健康和老幼照护" },
  { id: "business", emoji: "🧾", name: "经营资料箱", desc: "客户、项目、票据和证照" },
  { id: "career", emoji: "💼", name: "事业资料箱", desc: "合同、绩效、证书和求职资料" },
  { id: "custom", emoji: "✨", name: "自定义资料箱", desc: "创建你的专属资料空间", pro: true },
]

const BUILTIN_TEMPLATES: Record<string, { id: string; emoji: string; name: string; desc: string }[]> = {
  family: [
    { id: "f-invoice", emoji: "🧾", name: "发票 / 收据", desc: "日期、金额、商家名" },
    { id: "f-contract", emoji: "📄", name: "合同", desc: "日期、对方、到期提醒" },
    { id: "f-warranty", emoji: "🔧", name: "保修记录", desc: "购入日期、保修到期、序列号" },
    { id: "f-health-check", emoji: "🏥", name: "体检报告", desc: "日期、机构、关联人" },
    { id: "f-prescription", emoji: "💊", name: "处方 / 用药", desc: "日期、医生、药品、用量" },
    { id: "f-vaccine", emoji: "💉", name: "疫苗接种", desc: "接种日期、疫苗名、下次提醒" },
    { id: "f-insurance", emoji: "📋", name: "保险单", desc: "保险类型、保额、到期日" },
    { id: "f-care", emoji: "❤️", name: "护理记录", desc: "被照护人、事项、执行日期" },
  ],
  business: [
    { id: "b-invoice", emoji: "🧾", name: "发票 / 收据", desc: "对方名称、金额、日期" },
    { id: "b-contract", emoji: "📄", name: "合同", desc: "客户、金额、签约日期、到期" },
    { id: "b-quote", emoji: "📊", name: "报价单", desc: "客户、报价金额、有效期" },
    { id: "b-payment", emoji: "💰", name: "付款截图", desc: "对方、金额、付款日期" },
    { id: "b-delivery", emoji: "📦", name: "交付记录", desc: "项目、交付日期、验收状态" },
    { id: "b-license", emoji: "📋", name: "证照", desc: "证照名称、编号、有效期" },
    { id: "b-warranty", emoji: "🔧", name: "设备保修", desc: "品牌型号、购买日期、保修截止" },
  ],
  career: [
    { id: "c-contract", emoji: "📄", name: "劳动合同", desc: "公司、岗位、合同期限" },
    { id: "c-offer", emoji: "📋", name: "Offer", desc: "公司、岗位、薪酬、入职日期" },
    { id: "c-perf", emoji: "📊", name: "绩效记录", desc: "周期、评级、关键成果" },
    { id: "c-promotion", emoji: "🌟", name: "晋升材料", desc: "目标岗位、核心成果、证明" },
    { id: "c-project", emoji: "📁", name: "项目成果", desc: "项目名、角色、量化结果" },
    { id: "c-cert", emoji: "🎓", name: "证书", desc: "证书名称、发证机构、有效期" },
    { id: "c-resume", emoji: "📄", name: "简历版本", desc: "目标岗位、更新时间、渠道" },
  ],
  custom: [],
}

const CUSTOM_TEMPLATES_FROM_OTHER_SPACES = [
  { id: "ct-1", emoji: "🛒", name: "进货凭证", desc: "供应商、品类、金额", sourceSpace: "经营资料箱" },
  { id: "ct-2", emoji: "🚗", name: "车辆保养记录", desc: "车牌号、保养日期、里程", sourceSpace: "家庭资料箱" },
  { id: "ct-3", emoji: "🏡", name: "房产文件", desc: "地址、证件编号、登记日期", sourceSpace: "家庭资料箱" },
]

interface SpaceEditorProps {
  mode: "create" | "edit"
  initialName?: string; initialEmoji?: string; initialType?: string
  onClose: () => void
  onSave: (data: { name: string; emoji: string; type: string }) => void
  onNavigate?: (screen: string) => void
}

export function SpaceEditor({ mode, initialName = "", initialEmoji = "📦", initialType = "family", onClose, onSave, onNavigate }: SpaceEditorProps) {
  const [spaceName, setSpaceName] = useState(initialName)
  const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji)
  const [selectedType, setSelectedType] = useState(initialType)
  const [enabledTemplates, setEnabledTemplates] = useState<Set<string>>(new Set())
  const [enabledCustomTemplates, setEnabledCustomTemplates] = useState<Set<string>>(new Set())
  const [showEmojiSheet, setShowEmojiSheet] = useState(false)

  const currentTemplates = BUILTIN_TEMPLATES[selectedType] || []
  const toggleTemplate = (id: string) => setEnabledTemplates((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  const toggleCustomTemplate = (id: string) => setEnabledCustomTemplates((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  const handleSave = () => { const name = spaceName.trim() || SPACE_TYPES.find((t) => t.id === selectedType)?.name || "新资料箱"; onSave({ name, emoji: selectedEmoji, type: selectedType }) }
  const isProType = SPACE_TYPES.find((t) => t.id === selectedType)?.pro

  return (
    <div className="flex flex-col h-full" style={{ background: "#F6F8FF", paddingTop: 54 }}>
      <div className="flex items-center justify-between px-4 pt-2 pb-3" style={{ borderBottom: "0.5px solid #E8ECF4", background: "#F6F8FF" }}>
        <button className="ios-tap px-2 flex items-center" style={{ minHeight: 44 }} onClick={onClose} aria-label="取消"><span className="text-[#2563FF] font-medium" style={{ fontSize: 17 }}>取消</span></button>
        <h1 className="font-semibold text-[#101828]" style={{ fontSize: 17 }}>{mode === "create" ? "新建资料箱" : "编辑资料箱"}</h1>
        <button className="ios-tap px-2 flex items-center" style={{ minHeight: 44 }} onClick={handleSave} aria-label="保存"><span className="font-semibold" style={{ fontSize: 17, color: spaceName.trim() ? "#2563FF" : "#C8D0E8" }}>保存</span></button>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
        {/* Name & Icon */}
        <div className="px-4 mt-4 mb-5">
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            <div className="flex items-center px-4" style={{ height: 56, borderBottom: "0.5px solid #F6F8FF" }}>
              <span className="text-[#98A2B3] font-medium flex-shrink-0 mr-4" style={{ fontSize: 14, width: 56 }}>名称</span>
              <input className="flex-1 bg-transparent outline-none text-[#101828] text-right" style={{ fontSize: 15 }} placeholder={SPACE_TYPES.find((t) => t.id === selectedType)?.name || "资料箱名称"} value={spaceName} onChange={(e) => setSpaceName(e.target.value)} />
            </div>
            <button className="ios-tap w-full flex items-center justify-between px-4" style={{ height: 56 }} onClick={() => setShowEmojiSheet(true)} aria-label="选择图标">
              <span className="text-[#98A2B3] font-medium" style={{ fontSize: 14, width: 56 }}>图标</span>
              <div className="flex items-center gap-2"><div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: "#EEF4FF" }}><span style={{ fontSize: 22 }}>{selectedEmoji}</span></div><ChevronRight size={16} strokeWidth={2} className="text-[#C8D0E8]" /></div>
            </button>
          </div>
        </div>
        {/* Space type */}
        <div className="px-4 mb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#667085] px-1 mb-2" style={{ fontSize: 13 }}>资料箱类型</p>
          <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
            {SPACE_TYPES.map((type, i) => { const isActive = selectedType === type.id; return (
              <button key={type.id} className="ios-tap w-full flex items-start px-4 py-3.5 text-left" style={{ borderBottom: i < SPACE_TYPES.length - 1 ? "0.5px solid #F6F8FF" : "none", background: isActive ? "#EEF4FF" : "transparent" }} onClick={() => !type.pro && setSelectedType(type.id)} aria-label={type.name}>
                <div className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5" style={{ width: 40, height: 40, borderRadius: 10, background: isActive ? "#D6E4FF" : "#EEF4FF" }}><span style={{ fontSize: 22 }}>{type.emoji}</span></div>
                <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>{type.name}</span>{type.pro && (<div className="flex items-center gap-1"><Lock size={10} className="text-[#7C5CFF]" /><span className="px-1.5 rounded-full font-semibold" style={{ fontSize: 10, background: "#F0EBFF", color: "#7C5CFF", paddingTop: 1, paddingBottom: 1 }}>Pro</span></div>)}{isActive && <Check size={16} strokeWidth={2.5} className="text-[#2563FF] flex-shrink-0" />}</div><p className="text-[#98A2B3] mt-0.5" style={{ fontSize: 12 }}>{type.desc}</p></div>
              </button>
            )})}
          </div>
        </div>
        {isProType && (<div className="px-4 mb-5"><div className="flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "#F0EBFF", border: "0.5px solid #DDD6FF" }}><Lock size={14} className="text-[#7C5CFF] flex-shrink-0 mt-0.5" /><div><p className="font-semibold text-[#7C5CFF]" style={{ fontSize: 13 }}>需要 Pro 订阅</p><p className="text-[#7C5CFF]/70 mt-0.5" style={{ fontSize: 12 }}>自定义资料箱可自由设置对象类型和字段</p></div></div></div>)}
        {/* Built-in templates */}
        {currentTemplates.length > 0 && (<div className="px-4 mb-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#667085] px-1 mb-2" style={{ fontSize: 13 }}>系统模板</p><p className="text-[#98A2B3] px-1 mb-2 leading-snug" style={{ fontSize: 12 }}>启用后可在该资料箱内使用对应模板快速创建记录</p><div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>{currentTemplates.map((tmpl, i) => { const isOn = enabledTemplates.has(tmpl.id); return (<button key={tmpl.id} className="ios-tap w-full flex items-center px-4 py-3 text-left" style={{ borderBottom: i < currentTemplates.length - 1 ? "0.5px solid #F6F8FF" : "none" }} onClick={() => toggleTemplate(tmpl.id)} aria-label={tmpl.name}><div className="flex items-center justify-center flex-shrink-0 mr-3" style={{ width: 30, height: 30, borderRadius: 7, background: "#EEF4FF" }}><span style={{ fontSize: 16 }}>{tmpl.emoji}</span></div><div className="flex-1 min-w-0"><p className="font-medium text-[#101828]" style={{ fontSize: 14 }}>{tmpl.name}</p><p className="text-[#98A2B3]" style={{ fontSize: 11 }}>{tmpl.desc}</p></div><div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: isOn ? "#2563FF" : "transparent", border: isOn ? "none" : "1.5px solid #C8D0E8" }}>{isOn && <Check size={12} strokeWidth={3} className="text-white" />}</div></button>)})}</div></div>)}
        {/* Custom templates from other spaces */}
        <div className="px-4 mb-5"><div className="flex items-center justify-between px-1 mb-2"><p className="text-xs font-semibold uppercase tracking-wider text-[#667085]" style={{ fontSize: 13 }}>其他空间的模板</p><span className="px-1.5 rounded-full font-semibold" style={{ fontSize: 10, background: "#F0EBFF", color: "#7C5CFF", paddingTop: 1, paddingBottom: 1 }}>Pro</span></div><p className="text-[#98A2B3] px-1 mb-2 leading-snug" style={{ fontSize: 12 }}>勾选后可在当前资料箱直接使用其他资料箱创建的自定义模板</p><div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4", opacity: 0.85 }}>{CUSTOM_TEMPLATES_FROM_OTHER_SPACES.map((tmpl, i) => { const isOn = enabledCustomTemplates.has(tmpl.id); return (<button key={tmpl.id} className="ios-tap w-full flex items-center px-4 py-3 text-left" style={{ borderBottom: i < CUSTOM_TEMPLATES_FROM_OTHER_SPACES.length - 1 ? "0.5px solid #F6F8FF" : "none" }} onClick={() => toggleCustomTemplate(tmpl.id)} aria-label={tmpl.name}><div className="flex items-center justify-center flex-shrink-0 mr-3" style={{ width: 30, height: 30, borderRadius: 7, background: "#F0EBFF" }}><span style={{ fontSize: 16 }}>{tmpl.emoji}</span></div><div className="flex-1 min-w-0"><div className="flex items-center gap-1.5"><p className="font-medium text-[#101828]" style={{ fontSize: 14 }}>{tmpl.name}</p><span className="text-[#C8D0E8]" style={{ fontSize: 11 }}>来自{tmpl.sourceSpace}</span></div><p className="text-[#98A2B3]" style={{ fontSize: 11 }}>{tmpl.desc}</p></div><div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: isOn ? "#7C5CFF" : "transparent", border: isOn ? "none" : "1.5px solid #C8D0E8" }}>{isOn && <Check size={12} strokeWidth={3} className="text-white" />}</div></button>)})}</div><button className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl py-3.5 mt-2" style={{ border: "1.5px dashed rgba(124,92,255,0.25)", background: "transparent" }} onClick={() => onNavigate?.("pro-upgrade")} aria-label="升级 Pro"><Lock size={14} className="text-[#7C5CFF]" /><span className="text-[#7C5CFF] font-medium" style={{ fontSize: 13 }}>升级 Pro 创建自定义模板</span></button></div>
      </div>
      {showEmojiSheet && (<div className="absolute inset-0 z-50" onClick={() => setShowEmojiSheet(false)}><div className="absolute inset-0 bg-black/25" /><div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-8" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }} onClick={(e) => e.stopPropagation()}><div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-4" /><p className="font-bold text-[#101828] px-5 mb-3" style={{ fontSize: 18 }}>选择图标</p><div className="grid grid-cols-5 gap-3 px-5">{EMOJI_OPTIONS.map((emoji) => (<button key={emoji} className="ios-tap flex items-center justify-center rounded-xl" style={{ width: "100%", aspectRatio: "1", fontSize: 28, background: selectedEmoji === emoji ? "#EEF4FF" : "#F6F8FF", border: selectedEmoji === emoji ? "1.5px solid #2563FF" : "1px solid transparent" }} onClick={() => { setSelectedEmoji(emoji); setShowEmojiSheet(false) }} aria-label={`选择 ${emoji}`}>{emoji}</button>))}</div></div></div>)}
    </div>
  )
}
