"use client"

import { useState } from "react"
import {
  X, PenLine, Camera, FolderUp, ChevronDown, Layers, Image as ImageIcon, FileText,
  CheckCircle2, AlertCircle, ImagePlus, RotateCcw,
} from "lucide-react"

interface AddRecordProps {
  onClose: () => void
  onSave: () => void
  initialMode?: "write" | "photo" | "import"
}

type Mode = "write" | "photo" | "import"
type PhotoSub = "camera" | "album"
type SaveResult = "success" | "batch-partial" | null

export function AddRecord({ onClose, onSave, initialMode = "write" }: AddRecordProps) {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [photoSub, setPhotoSub] = useState<PhotoSub>("camera")
  const [expanded, setExpanded] = useState(false)
  const [saveResult, setSaveResult] = useState<SaveResult>(null)
  const [cameraBlocked, setCameraBlocked] = useState(false)
  const [text, setText] = useState("")
  const [batchMode, setBatchMode] = useState<"split" | "merge">("split")
  const [targetSpace, setTargetSpace] = useState("家庭资料箱")

  const modes = [
    { id: "write" as Mode, icon: PenLine, label: "写记录" },
    { id: "photo" as Mode, icon: Camera, label: "拍照" },
    { id: "import" as Mode, icon: FolderUp, label: "导入文件" },
  ]

  const handleSave = () => {
    if (mode === "import") {
      setSaveResult("batch-partial")
    } else {
      setSaveResult("success")
      setTimeout(() => {
        setSaveResult(null)
        onSave()
      }, 1800)
    }
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>

      {/* iOS modal nav bar */}
      <div
        className="flex items-center justify-between px-4 pt-2 pb-3"
        style={{ background: "#FFFFFF", borderBottom: "0.5px solid rgba(60,60,67,0.29)" }}
      >
        <button
          className="ios-tap"
          style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "flex-start" }}
          onClick={onClose}
          aria-label="关闭"
        >
          <X size={18} strokeWidth={2.5} style={{ color: "#007AFF" }} />
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 600, color: "#000000" }}>添加记录</h1>
        <div style={{ width: 44 }} />
      </div>

      {/* Space indicator */}
      <div
        className="flex items-center justify-center gap-1.5 px-4 py-1.5"
        style={{ background: "#F2F2F7", borderBottom: "0.5px solid rgba(60,60,67,0.10)" }}
      >
        <span className="text-[#98A2B3]" style={{ fontSize: 11 }}>添加到</span>
        <span className="font-semibold text-[#101828]" style={{ fontSize: 12 }}>🏠 {targetSpace}</span>
        <button
          className="ios-tap flex items-center justify-center rounded"
          style={{ width: 24, height: 24 }}
          onClick={() => {
            const spaces = ["家庭资料箱", "经营资料箱", "事业资料箱"]
            const idx = spaces.indexOf(targetSpace)
            setTargetSpace(spaces[(idx + 1) % spaces.length])
          }}
          aria-label="切换资料箱"
        >
          <Layers size={11} strokeWidth={2} style={{ color: "#2563FF" }} />
        </button>
      </div>

      {/* iOS native segmented control */}
      <div className="px-4 pt-3 pb-2" style={{ background: "#F2F2F7" }}>
        <div
          className="flex p-0.5 rounded-lg"
          style={{ background: "rgba(118,118,128,0.18)" }}
        >
          {modes.map((m) => {
            const Icon = m.icon
            const active = mode === m.id
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className="ios-tap flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md transition-all"
                style={{
                  background: active ? "#FFFFFF" : "transparent",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.12), 0 0.5px 1px rgba(0,0,0,0.08)" : "none",
                }}
                aria-label={m.label}
              >
                <Icon
                  size={13}
                  strokeWidth={active ? 2.2 : 1.8}
                  style={{ color: active ? "#000000" : "#8E8E93" }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    color: active ? "#000000" : "#8E8E93",
                  }}
                >
                  {m.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">

        {/* --- Write mode --- */}
        {mode === "write" && (
          <div className="px-4 pt-2">
            <div className="px-4 py-3" style={{ background: "#FFFFFF", borderRadius: 12 }}>
              <textarea
                className="w-full bg-transparent text-[#000000] resize-none outline-none"
                style={{ fontSize: 16, minHeight: 130, lineHeight: 1.5 }}
                placeholder="快速记一点..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <p style={{ fontSize: 13, color: "#8E8E93", marginTop: 6, paddingLeft: 4 }}>先保存，晚点再整理</p>
          </div>
        )}

        {/* --- Photo mode --- */}
        {mode === "photo" && (
          <div className="px-4 pt-2 flex flex-col gap-3">
            {/* Sub-mode toggle — iOS segmented */}
            <div
              className="flex p-0.5 rounded-lg"
              style={{ background: "rgba(118,118,128,0.18)" }}
            >
              {(["camera", "album"] as PhotoSub[]).map((s) => (
                <button
                  key={s}
                  className="ios-tap flex-1 py-1.5 rounded-md text-center transition-all font-medium"
                  style={{
                    fontSize: 13,
                    background: photoSub === s ? "#FFFFFF" : "transparent",
                    color: photoSub === s ? "#000000" : "#8E8E93",
                    fontWeight: photoSub === s ? 600 : 400,
                    boxShadow: photoSub === s ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                  }}
                  onClick={() => {
                    setPhotoSub(s)
                    if (s === "camera") setCameraBlocked(false)
                  }}
                  aria-label={s === "camera" ? "拍照" : "从相册"}
                >
                  {s === "camera" ? "拍照" : "从相册"}
                </button>
              ))}
            </div>

            {/* Camera blocked banner */}
            {cameraBlocked && (
              <div
                className="flex items-start gap-2.5 px-4 py-3"
                style={{ background: "#FFF8EC" }}
              >
                <AlertCircle size={15} strokeWidth={2} style={{ color: "#FF9500", flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#8A5F00" }}>相机不可用</p>
                  <p style={{ fontSize: 13, color: "#B07D00" }}>仍可从相册或文件添加</p>
                </div>
              </div>
            )}

            {/* Drop zone */}
            <button
              className="ios-tap rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{
                height: 148,
                border: "1.5px dashed rgba(60,60,67,0.2)",
                background: "#FFFFFF",
              }}
              onClick={() => { if (photoSub === "camera") setCameraBlocked(true) }}
              aria-label={photoSub === "camera" ? "开启相机" : "选择相册"}
            >
              <div
                className="flex items-center justify-center"
                style={{ width: 48, height: 48, borderRadius: 12, background: photoSub === "camera" ? "#EDFAF7" : "#EEF4FF" }}
              >
                {photoSub === "camera"
                  ? <Camera size={24} strokeWidth={1.6} style={{ color: "#34C759" }} />
                  : <ImagePlus size={24} strokeWidth={1.6} style={{ color: "#007AFF" }} />
                }
              </div>
              <p style={{ fontSize: 15, color: "#8E8E93", fontWeight: 500 }}>
                {photoSub === "camera" ? "点击开启相机" : "从相册选择图片"}
              </p>
            </button>

            {/* Attached photo */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#FFFFFF", borderRadius: 12 }}>
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 44, height: 44, borderRadius: 10, background: "#EEF4FF" }}
              >
                <ImageIcon size={20} strokeWidth={1.8} style={{ color: "#007AFF" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 15, color: "#000000", fontWeight: 500 }}>IMG_20260512.jpg</p>
                <p style={{ fontSize: 13, color: "#8E8E93" }}>2.4 MB</p>
              </div>
              <button className="ios-tap p-1" aria-label="移除">
                <X size={16} strokeWidth={2.5} style={{ color: "#8E8E93" }} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: "#8E8E93", paddingLeft: 4 }}>不识别文件内容，仅保存本地副本</p>
          </div>
        )}

        {/* --- Import mode --- */}
        {mode === "import" && (
          <div className="px-4 pt-2 flex flex-col gap-3">
            <button
              className="ios-tap rounded-2xl flex flex-col items-center justify-center gap-3"
              style={{
                height: 130,
                border: "1.5px dashed rgba(60,60,67,0.2)",
                background: "#FFFFFF",
              }}
              aria-label="导入文件"
            >
              <div
                className="flex items-center justify-center"
                style={{ width: 48, height: 48, borderRadius: 12, background: "#F0EBFF" }}
              >
                <FolderUp size={24} strokeWidth={1.6} style={{ color: "#5856D6" }} />
              </div>
              <p style={{ fontSize: 15, color: "#8E8E93", fontWeight: 500 }}>从文件 App 添加 PDF 或图片</p>
            </button>

            {/* Sample PDF */}
            <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#FFFFFF", borderRadius: 12 }}>
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 44, height: 44, borderRadius: 10, background: "#FFF0F0" }}
              >
                <FileText size={20} strokeWidth={1.8} style={{ color: "#FF3B30" }} />
              </div>
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 15, color: "#000000", fontWeight: 500 }}>租赁合同_2026.pdf</p>
                <p style={{ fontSize: 13, color: "#8E8E93" }}>PDF · 1.8 MB</p>
              </div>
              <button className="ios-tap p-1" aria-label="移除">
                <X size={16} strokeWidth={2.5} style={{ color: "#8E8E93" }} />
              </button>
            </div>

            {/* Batch import mode — iOS segmented */}
            <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
              <p className="px-4 pt-3 pb-2" style={{ fontSize: 13, color: "#8E8E93", fontWeight: 500 }}>多文件导入方式</p>
              <div className="px-4 pb-3">
                <div
                  className="flex p-0.5 rounded-lg"
                  style={{ background: "rgba(118,118,128,0.18)" }}
                >
                  {(["split", "merge"] as const).map((bm) => (
                    <button
                      key={bm}
                      className="ios-tap flex-1 py-1.5 rounded-md text-center transition-all"
                      style={{
                        fontSize: 13,
                        background: batchMode === bm ? "#FFFFFF" : "transparent",
                        color: batchMode === bm ? "#000000" : "#8E8E93",
                        fontWeight: batchMode === bm ? 600 : 400,
                        boxShadow: batchMode === bm ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                      }}
                      onClick={() => setBatchMode(bm)}
                      aria-label={bm === "split" ? "每个文件一条记录" : "合并为一条记录"}
                    >
                      {bm === "split" ? "每个文件一条" : "合并为一条"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13, color: "#8E8E93", paddingLeft: 4 }}>不识别文件内容，仅保存本地副本</p>
          </div>
        )}

        {/* Collapsible optional fields */}
        <div className="px-4 mt-3">
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
          <button
            className="ios-tap w-full flex items-center justify-between px-4 py-3.5"
            onClick={() => setExpanded(!expanded)}
            aria-label="继续整理"
          >
            <span style={{ fontSize: 15, color: "#8E8E93", fontWeight: 500 }}>继续整理 · 可选字段</span>
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              style={{
                color: "#8E8E93",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {expanded && (
            <div className="overflow-hidden">
              {[
                { label: "标题", placeholder: "给这条记录起个名字" },
                { label: "类型", placeholder: "发票、合同、处方..." },
                { label: "日期", placeholder: "选择日期" },
                { label: "金额", placeholder: "¥ 0.00" },
                { label: "对方名称", placeholder: "商家、机构或人名" },
                { label: "标签", placeholder: "添加标签" },
              ].map((field, i, arr) => (
                <div
                  key={field.label}
                  className="flex items-center px-4"
                  style={{
                    height: 44,
                    borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none",
                  }}
                >
                  <span
                    className="flex-shrink-0"
                    style={{ fontSize: 15, fontWeight: 500, color: "#000000", width: 76 }}
                  >
                    {field.label}
                  </span>
                  <input
                    className="flex-1 bg-transparent outline-none"
                    style={{ fontSize: 15, color: "#3A3A3C" }}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          )}
          </div>{/* end white card */}
        </div>

        <div style={{ height: 160 }} />
      </div>

      {/* Bottom CTA — iOS style */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-7 pt-3"
        style={{
          background: "rgba(242,242,247,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "0.5px solid rgba(60,60,67,0.12)",
        }}
      >
        <button
          className="ios-tap w-full flex items-center justify-center rounded-xl font-semibold text-white mb-2"
          style={{ height: 50, fontSize: 17, background: "#007AFF" }}
          onClick={handleSave}
          aria-label="直接保存"
        >
          直接保存
        </button>
        <button
          className="ios-tap w-full flex items-center justify-center py-3"
          style={{ fontSize: 15, color: "#007AFF", fontWeight: 500 }}
          onClick={() => setExpanded(true)}
          aria-label="保存并继续整理"
        >
          保存并继续整理
        </button>
      </div>

      {/* Save success toast */}
      {saveResult === "success" && (
        <div
          className="absolute inset-x-6 top-20 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: "#1C1C1E", boxShadow: "0 8px 24px rgba(0,0,0,0.25)" }}
        >
          <CheckCircle2 size={16} strokeWidth={2} style={{ color: "#34C759" }} />
          <p style={{ fontSize: 14, color: "#FFFFFF", fontWeight: 500 }}>已保存到本地</p>
        </div>
      )}

      {/* Batch partial result */}
      {saveResult === "batch-partial" && (
        <div className="absolute inset-0 z-50 flex items-end" onClick={() => setSaveResult(null)}>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div
            className="relative w-full rounded-t-3xl px-5 pt-2 pb-10"
            style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.12)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex items-start gap-3 mb-5">
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{ width: 40, height: 40, borderRadius: 10, background: "#FFF3E0" }}
              >
                <AlertCircle size={20} strokeWidth={2} style={{ color: "#FF9500" }} />
              </div>
              <div>
                <p style={{ fontSize: 17, fontWeight: 600, color: "#000000" }}>已导入 3 项，1 项失败</p>
                <p style={{ fontSize: 14, color: "#8E8E93", marginTop: 3, lineHeight: 1.4 }}>
                  contract_draft.pdf 无法读取，可能已损坏
                </p>
              </div>
            </div>
            <button
              className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl font-semibold text-white mb-2"
              style={{ height: 50, background: "#FF9500" }}
              onClick={() => setSaveResult(null)}
              aria-label="重试失败项"
            >
              <RotateCcw size={16} strokeWidth={2} />
              <span style={{ fontSize: 17 }}>重试失败项</span>
            </button>
            <button
              className="ios-tap w-full flex items-center justify-center py-3"
              style={{ fontSize: 17, color: "#8E8E93", fontWeight: 500 }}
              onClick={() => { setSaveResult(null); onSave() }}
              aria-label="忽略，继续"
            >
              忽略，继续
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
