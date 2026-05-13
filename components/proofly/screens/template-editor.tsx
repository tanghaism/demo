"use client"

import { useState } from "react"
import { X, Plus, Trash2, ChevronRight, ChevronUp, ChevronDown, Check, AlertCircle } from "lucide-react"

const EMOJI_OPTIONS = ["🧾", "📄", "🔧", "🏥", "💊", "💉", "📋", "💰", "📊", "📁", "🎓", "🌟", "📦", "🛒", "🚗", "🏡", "❤️", "📝", "💳", "🔒"]

interface CustomField { id: string; name: string; type: "text" | "datetime" | "daterange" | "amount" }

const FIELD_TYPE_LABELS: Record<CustomField["type"], string> = { text: "文本", datetime: "日期时间", daterange: "日期时间范围", amount: "金额" }

const SYSTEM_FIELDS = [
  { id: "title", label: "标题", defaultOn: true },
  { id: "type", label: "类型" },
  { id: "date", label: "日期", defaultOn: true },
  { id: "amount", label: "金额" },
  { id: "counterparty", label: "对方名称" },
  { id: "tags", label: "标签" },
  { id: "notes", label: "备注" },
]

const SAMPLE_CUSTOM_FIELDS: CustomField[] = [
  { id: "cf-1", name: "品牌", type: "text" },
  { id: "cf-2", name: "序列号", type: "text" },
  { id: "cf-3", name: "保修截止日", type: "datetime" },
  { id: "cf-4", name: "购买日期", type: "datetime" },
]

interface TemplateEditorProps {
  mode: "create" | "edit"; initialName?: string; initialEmoji?: string; initialType?: "document" | "object"
  onClose: () => void; onSave: () => void; onNavigate?: (screen: string) => void
}

export function TemplateEditor({ mode, initialName = "", initialEmoji = "📄", initialType = "document", onClose, onSave, onNavigate }: TemplateEditorProps) {
  const [name, setName] = useState(initialName)
  const [selectedEmoji, setSelectedEmoji] = useState(initialEmoji)
  const [templateType, setTemplateType] = useState<"document" | "object">(initialType)
  const [enabledSystemFields, setEnabledSystemFields] = useState<Set<string>>(new Set(SYSTEM_FIELDS.filter((f) => f.defaultOn).map((f) => f.id)))
  const [customFields, setCustomFields] = useState<CustomField[]>(mode === "edit" ? SAMPLE_CUSTOM_FIELDS : [])
  const [showEmojiSheet, setShowEmojiSheet] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)
  const [editingFieldData, setEditingFieldData] = useState<{ name: string; type: CustomField["type"] }>({ name: "", type: "text" })
  const [showAddFieldSheet, setShowAddFieldSheet] = useState(false)
  const [newFieldData, setNewFieldData] = useState<{ name: string; type: CustomField["type"] }>({ name: "", type: "text" })

  let nextFieldId = customFields.length + 10
  const toggleSystemField = (id: string) => setEnabledSystemFields((prev) => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next })
  const addCustomField = () => { if (!newFieldData.name.trim()) return; setCustomFields((prev) => [...prev, { id: `cf-${nextFieldId++}`, name: newFieldData.name.trim(), type: newFieldData.type }]); setNewFieldData({ name: "", type: "text" }); setShowAddFieldSheet(false) }
  const removeCustomField = (id: string) => setCustomFields((prev) => prev.filter((f) => f.id !== id))
  const moveField = (id: string, direction: "up" | "down") => { setCustomFields((prev) => { const idx = prev.findIndex((f) => f.id === id); if (idx === -1) return prev; const target = direction === "up" ? idx - 1 : idx + 1; if (target < 0 || target >= prev.length) return prev; const next = [...prev]; [next[idx], next[target]] = [next[target], next[idx]]; return next }) }
  const startEditField = (field: CustomField) => { setEditingFieldId(field.id); setEditingFieldData({ name: field.name, type: field.type }) }
  const saveEditField = () => { if (!editingFieldId || !editingFieldData.name.trim()) return; setCustomFields((prev) => prev.map((f) => f.id === editingFieldId ? { ...f, name: editingFieldData.name.trim(), type: editingFieldData.type } : f)); setEditingFieldId(null) }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F6F8FF", paddingTop: 54 }}>
      <div className="flex items-center justify-between px-4 pt-2 pb-3" style={{ borderBottom: "0.5px solid #E8ECF4", background: "#F6F8FF" }}>
        <button className="ios-tap px-2 flex items-center" style={{ minHeight: 44 }} onClick={onClose}><span className="text-[#2563FF] font-medium" style={{ fontSize: 17 }}>取消</span></button>
        <h1 className="font-semibold text-[#101828]" style={{ fontSize: 17 }}>{mode === "create" ? "新建模板" : "编辑模板"}</h1>
        <button className="ios-tap px-2 flex items-center" style={{ minHeight: 44 }} onClick={() => onSave()}><span className="font-semibold" style={{ fontSize: 17, color: name.trim() ? "#2563FF" : "#C8D0E8" }}>保存</span></button>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-10">
        {/* Name & Icon */}
        <div className="px-4 mt-4 mb-5"><div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}><div className="flex items-center px-4" style={{ height: 56, borderBottom: "0.5px solid #F6F8FF" }}><span className="text-[#98A2B3] font-medium flex-shrink-0 mr-4" style={{ fontSize: 14, width: 56 }}>名称</span><input className="flex-1 bg-transparent outline-none text-[#101828] text-right" style={{ fontSize: 15 }} placeholder="例如：发票模板、合同模板" value={name} onChange={(e) => setName(e.target.value)} /></div><button className="ios-tap w-full flex items-center justify-between px-4" style={{ height: 56 }} onClick={() => setShowEmojiSheet(true)}><span className="text-[#98A2B3] font-medium" style={{ fontSize: 14, width: 56 }}>图标</span><div className="flex items-center gap-2"><div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: 10, background: "#EEF4FF" }}><span style={{ fontSize: 22 }}>{selectedEmoji}</span></div><ChevronRight size={16} strokeWidth={2} className="text-[#C8D0E8]" /></div></button></div></div>
        {/* Template type */}
        <div className="px-4 mb-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#667085] px-1 mb-2" style={{ fontSize: 13 }}>模板类型</p><div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>{([{ id: "document" as const, emoji: "📄", label: "资料模板", desc: "用于创建记录卡和资料" }, { id: "object" as const, emoji: "📁", label: "对象模板", desc: "用于创建客户、物品、项目等对象" }] as const).map((opt, i) => { const isActive = templateType === opt.id; return (<button key={opt.id} className="ios-tap w-full flex items-center px-4 py-3.5 text-left" style={{ borderBottom: i < 1 ? "0.5px solid #F6F8FF" : "none", background: isActive ? "#EEF4FF" : "transparent" }} onClick={() => setTemplateType(opt.id)}><div className="flex items-center justify-center flex-shrink-0 mr-3" style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? "#D6E4FF" : "#EEF4FF" }}><span style={{ fontSize: 20 }}>{opt.emoji}</span></div><div className="flex-1 min-w-0"><p className="font-semibold text-[#101828]" style={{ fontSize: 15 }}>{opt.label}</p><p className="text-[#98A2B3]" style={{ fontSize: 12 }}>{opt.desc}</p></div>{isActive && <Check size={16} strokeWidth={2.5} className="text-[#2563FF] flex-shrink-0" />}</button>)})}</div></div>
        {/* System fields */}
        {templateType === "document" && (<div className="px-4 mb-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#667085] px-1 mb-2" style={{ fontSize: 13 }}>系统字段</p><p className="text-[#98A2B3] px-1 mb-2 leading-snug" style={{ fontSize: 12 }}>勾选后该模板的记录表单中将显示对应字段</p><div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>{SYSTEM_FIELDS.map((field, i) => { const isOn = enabledSystemFields.has(field.id); return (<button key={field.id} className="ios-tap w-full flex items-center px-4 py-3 text-left" style={{ borderBottom: i < SYSTEM_FIELDS.length - 1 ? "0.5px solid #F6F8FF" : "none" }} onClick={() => toggleSystemField(field.id)}><span className="flex-1 font-medium text-[#101828]" style={{ fontSize: 14 }}>{field.label}</span><div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: isOn ? "#2563FF" : "transparent", border: isOn ? "none" : "1.5px solid #C8D0E8" }}>{isOn && <Check size={12} strokeWidth={3} className="text-white" />}</div></button>)})}</div></div>)}
        {/* Custom fields */}
        <div className="px-4 mb-5"><div className="flex items-center justify-between px-1 mb-2"><p className="text-xs font-semibold uppercase tracking-wider text-[#667085]" style={{ fontSize: 13 }}>自定义字段</p><span className="text-[#98A2B3] font-medium" style={{ fontSize: 12 }}>{customFields.length} 个</span></div><p className="text-[#98A2B3] px-1 mb-2 leading-snug" style={{ fontSize: 12 }}>自定义字段均为可选，不影响保存。编辑和删除旧字段不影响已有资料。</p>
        {customFields.length === 0 ? (<div className="flex flex-col items-center justify-center py-8 rounded-2xl" style={{ border: "1.5px dashed #C8D0E8", background: "transparent" }}><p className="text-[#98A2B3] text-center mb-3" style={{ fontSize: 14 }}>暂未添加自定义字段</p><button className="ios-tap flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5" style={{ background: "#EEF4FF" }} onClick={() => setShowAddFieldSheet(true)}><Plus size={15} strokeWidth={2} className="text-[#2563FF]" /><span className="text-[#2563FF] font-medium" style={{ fontSize: 14 }}>新增字段</span></button></div>) : (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "0.5px solid #E8ECF4" }}>
          {customFields.map((field, i) => { const isEditing = editingFieldId === field.id; return (
            <div key={field.id}>{isEditing ? (
              <div className="px-4 py-3" style={{ borderBottom: i < customFields.length - 1 ? "0.5px solid #F6F8FF" : "none" }}>
                <input className="w-full bg-[#F6F8FF] rounded-lg px-3 py-2 text-[#101828] outline-none mb-2" style={{ fontSize: 14, border: "0.5px solid #D8E0F8" }} placeholder="字段名称" value={editingFieldData.name} onChange={(e) => setEditingFieldData((d) => ({ ...d, name: e.target.value }))} autoFocus />
                <div className="flex flex-col gap-1 mb-2">{(["text", "datetime", "daterange", "amount"] as CustomField["type"][]).map((t) => (<button key={t} className="ios-tap w-full flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: editingFieldData.type === t ? "#EEF4FF" : "#F6F8FF" }} onClick={() => setEditingFieldData((d) => ({ ...d, type: t }))}><span className="font-medium" style={{ fontSize: 13, color: editingFieldData.type === t ? "#2563FF" : "#98A2B3" }}>{FIELD_TYPE_LABELS[t]}</span>{editingFieldData.type === t && <Check size={14} strokeWidth={2.5} className="text-[#2563FF]" />}</button>))}</div>
                <div className="flex gap-2"><button className="ios-tap flex-1 py-2 rounded-lg font-semibold text-white" style={{ fontSize: 13, background: "#2563FF" }} onClick={saveEditField}>完成</button><button className="ios-tap py-2 px-4 rounded-lg font-medium text-[#98A2B3]" style={{ fontSize: 13, background: "#F6F8FF" }} onClick={() => setEditingFieldId(null)}>取消</button></div>
              </div>
            ) : (
              <div className="flex items-center px-4 py-3" style={{ borderBottom: i < customFields.length - 1 ? "0.5px solid #F6F8FF" : "none" }}>
                <button className="ios-tap flex-1 flex items-center gap-3 min-w-0 text-left" onClick={() => startEditField(field)}><div className="flex items-center justify-center flex-shrink-0" style={{ width: 28, height: 28, borderRadius: 7, background: "#EEF4FF" }}><span style={{ fontSize: 14 }}>✏️</span></div><div className="flex-1 min-w-0"><p className="font-medium text-[#101828] truncate" style={{ fontSize: 14 }}>{field.name}</p><p className="text-[#98A2B3]" style={{ fontSize: 11 }}>{FIELD_TYPE_LABELS[field.type]}</p></div></button>
                <div className="flex items-center gap-0.5 mr-1"><button className="ios-tap flex items-center justify-center rounded" style={{ width: 24, height: 24 }} onClick={() => moveField(field.id, "up")} disabled={i === 0}><ChevronUp size={14} strokeWidth={2} style={{ color: i === 0 ? "#E8ECF4" : "#98A2B3" }} /></button><button className="ios-tap flex items-center justify-center rounded" style={{ width: 24, height: 24 }} onClick={() => moveField(field.id, "down")} disabled={i === customFields.length - 1}><ChevronDown size={14} strokeWidth={2} style={{ color: i === customFields.length - 1 ? "#E8ECF4" : "#98A2B3" }} /></button></div>
                <button className="ios-tap flex items-center justify-center rounded-lg ml-1" style={{ width: 32, height: 32, background: "#FFF0F0" }} onClick={() => removeCustomField(field.id)}><Trash2 size={13} strokeWidth={2} className="text-[#FF3B30]" /></button>
              </div>
            )}
            </div>
          )})}
          <button className="ios-tap w-full flex items-center justify-center gap-1.5 py-3" style={{ borderTop: "0.5px solid #F6F8FF" }} onClick={() => setShowAddFieldSheet(true)}><Plus size={15} strokeWidth={2} className="text-[#2563FF]" /><span className="text-[#2563FF] font-medium" style={{ fontSize: 14 }}>新增字段</span></button>
        </div>)}</div>
        {/* Delete */}
        {mode === "edit" && (<div className="px-4 mb-8"><p className="text-xs font-semibold uppercase tracking-wider text-[#667085] px-1 mb-2" style={{ fontSize: 13 }}>危险操作</p><button className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl py-3.5" style={{ border: "1px solid #FFD0D0", background: "#FFF0F0" }} onClick={() => setShowDeleteConfirm(true)}><Trash2 size={16} strokeWidth={2} className="text-[#FF3B30]" /><span className="text-[#FF3B30] font-semibold" style={{ fontSize: 15 }}>删除此模板</span></button></div>)}
      </div>
      {/* Add field sheet */}
      {showAddFieldSheet && (<div className="absolute inset-0 z-50" onClick={() => setShowAddFieldSheet(false)}><div className="absolute inset-0 bg-black/25" /><div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-8" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }} onClick={(e) => e.stopPropagation()}><div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" /><p className="font-bold text-[#101828] px-5 mb-4" style={{ fontSize: 18 }}>新增自定义字段</p><div className="px-4 mb-4"><p className="text-[#98A2B3] mb-1.5" style={{ fontSize: 13 }}>字段名称</p><input className="w-full bg-[#F6F8FF] rounded-xl px-4 py-3 text-[#101828] outline-none" style={{ fontSize: 15, border: "0.5px solid #E8ECF4" }} placeholder="例如：品牌、序列号、保修期限" value={newFieldData.name} onChange={(e) => setNewFieldData((d) => ({ ...d, name: e.target.value }))} autoFocus /></div><div className="px-4 mb-5"><p className="text-[#98A2B3] mb-1.5" style={{ fontSize: 13 }}>字段类型</p><div className="flex flex-col gap-1">{(["text", "datetime", "daterange", "amount"] as CustomField["type"][]).map((t) => (<button key={t} className="ios-tap w-full flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: newFieldData.type === t ? "#EEF4FF" : "#F6F8FF", border: newFieldData.type === t ? "0.5px solid #D8E0F8" : "0.5px solid transparent" }} onClick={() => setNewFieldData((d) => ({ ...d, type: t }))}><span className="font-medium" style={{ fontSize: 15, color: newFieldData.type === t ? "#2563FF" : "#101828" }}>{FIELD_TYPE_LABELS[t]}</span>{newFieldData.type === t && <Check size={16} strokeWidth={2.5} className="text-[#2563FF]" />}</button>))}</div></div><div className="flex flex-col gap-2 px-4"><button className="ios-tap w-full flex items-center justify-center rounded-xl font-semibold text-white" style={{ height: 50, fontSize: 17, background: newFieldData.name.trim() ? "#2563FF" : "#C8D0E8" }} onClick={addCustomField}>添加</button><button className="ios-tap w-full flex items-center justify-center rounded-xl font-medium" style={{ height: 50, fontSize: 17, background: "#F6F8FF", color: "#101828" }} onClick={() => { setNewFieldData({ name: "", type: "text" }); setShowAddFieldSheet(false) }}>取消</button></div></div></div>)}
      {/* Delete confirm */}
      {showDeleteConfirm && (<div className="absolute inset-0 z-50" onClick={() => setShowDeleteConfirm(false)}><div className="absolute inset-0 bg-black/25" /><div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-10" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }} onClick={(e) => e.stopPropagation()}><div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" /><div className="flex flex-col items-center text-center px-5 mb-5"><div className="flex items-center justify-center mb-3" style={{ width: 48, height: 48, borderRadius: 12, background: "#FFF0F0" }}><Trash2 size={22} strokeWidth={1.8} className="text-[#FF3B30]" /></div><p className="font-bold text-[#101828]" style={{ fontSize: 18 }}>删除此模板？</p></div><div className="mx-4 flex items-start gap-3 px-4 py-3 rounded-xl mb-4" style={{ background: "#EDFAF7", border: "0.5px solid #D4F5EE" }}><Check size={14} strokeWidth={2.5} className="text-[#14C8A8] mt-0.5 flex-shrink-0" /><div><p className="font-semibold text-[#0D9B81]" style={{ fontSize: 13 }}>已保存资料不受影响</p><p className="text-[#0D9B81]/70 mt-0.5 leading-snug" style={{ fontSize: 12 }}>使用此模板创建的既有资料字段值会保留为历史数据，仅后续新建记录时不再使用此模板。</p></div></div><div className="flex flex-col gap-2 px-4"><button className="ios-tap w-full py-4 rounded-2xl font-semibold text-white" style={{ fontSize: 17, background: "#FF3B30" }} onClick={() => { setShowDeleteConfirm(false); onSave() }}>删除模板</button><button className="ios-tap w-full py-3.5 rounded-2xl font-medium" style={{ fontSize: 17, background: "#F6F8FF", color: "#101828" }} onClick={() => setShowDeleteConfirm(false)}>取消</button></div></div></div>)}
      {/* Emoji sheet */}
      {showEmojiSheet && (<div className="absolute inset-0 z-50" onClick={() => setShowEmojiSheet(false)}><div className="absolute inset-0 bg-black/25" /><div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl pt-2 pb-8" style={{ boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }} onClick={(e) => e.stopPropagation()}><div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-4" /><p className="font-bold text-[#101828] px-5 mb-3" style={{ fontSize: 18 }}>选择图标</p><div className="grid grid-cols-5 gap-3 px-5">{EMOJI_OPTIONS.map((emoji) => (<button key={emoji} className="ios-tap flex items-center justify-center rounded-xl" style={{ width: "100%", aspectRatio: "1", fontSize: 28, background: selectedEmoji === emoji ? "#EEF4FF" : "#F6F8FF", border: selectedEmoji === emoji ? "1.5px solid #2563FF" : "1px solid transparent" }} onClick={() => { setSelectedEmoji(emoji); setShowEmojiSheet(false) }}>{emoji}</button>))}</div></div></div>)}
    </div>
  )
}
