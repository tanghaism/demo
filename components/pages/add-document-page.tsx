"use client"

import { useState } from "react"
import {
  Camera,
  Image,
  FolderOpen,
  X,
  Check,
  Sparkles,
  AlertCircle,
  Calendar,
  Tag,
  FileText,
  DollarSign,
  Users,
  RefreshCw,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSList, IOSListItem } from "@/components/ios/ios-list"
import { IOSActionSheet } from "@/components/ios/ios-action-sheet"
import { IOSAlert } from "@/components/ios/ios-alert"
import { ocrResult, familyCategories } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface AddDocumentPageProps {
  onBack: () => void
  onSave: () => void
}

export function AddDocumentPage({ onBack, onSave }: AddDocumentPageProps) {
  const [step, setStep] = useState<"capture" | "ocr" | "form">("capture")
  const [showSourceSheet, setShowSourceSheet] = useState(false)
  const [showCategorySheet, setShowCategorySheet] = useState(false)
  const [showDiscardAlert, setShowDiscardAlert] = useState(false)
  const [hasImage, setHasImage] = useState(false)
  const [ocrProcessing, setOcrProcessing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    date: "",
    expiryDate: "",
    amount: "",
    parties: "",
    description: "",
    tags: "",
  })

  const handleImageCapture = () => {
    setHasImage(true)
    setStep("ocr")
    setOcrProcessing(true)
    // Simulate OCR processing
    setTimeout(() => {
      setOcrProcessing(false)
      setFormData({
        title: ocrResult.fields.title,
        category: "合同协议",
        type: ocrResult.fields.type,
        date: ocrResult.fields.date,
        expiryDate: "",
        amount: ocrResult.fields.amount,
        parties: `${ocrResult.fields.party1}, ${ocrResult.fields.party2}`,
        description: "",
        tags: "合同",
      })
    }, 1500)
  }

  const handleConfirmOcr = () => {
    setStep("form")
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title={step === "capture" ? "添加资料" : step === "ocr" ? "智能识别" : "编辑资料"}
        leftAction={{
          label: "取消",
          icon: <X className="w-5 h-5" />,
          onClick: () => {
            if (hasImage) {
              setShowDiscardAlert(true)
            } else {
              onBack()
            }
          },
        }}
        rightAction={
          step === "form"
            ? {
                label: "保存",
                onClick: onSave,
              }
            : undefined
        }
      />

      {/* Step: Capture */}
      {step === "capture" && (
        <div className="flex-1 flex flex-col">
          {/* Image preview area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full aspect-[3/4] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-4 bg-card">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <FolderOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-[17px] font-medium">添加文件或照片</p>
                <p className="text-[13px] text-muted-foreground mt-1">
                  拍照或从相册选择
                </p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="px-4 pb-8 space-y-3">
            <button
              onClick={() => setShowSourceSheet(true)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
            >
              <Camera className="w-5 h-5" />
              拍照识别
            </button>
            <button
              onClick={handleImageCapture}
              className="w-full py-4 bg-card border border-border rounded-xl text-[17px] font-medium flex items-center justify-center gap-2 active:bg-muted/50 transition-colors"
            >
              <Image className="w-5 h-5" />
              从相册选择
            </button>
          </div>
        </div>
      )}

      {/* Step: OCR Processing/Confirmation */}
      {step === "ocr" && (
        <div className="flex-1 flex flex-col">
          {/* OCR status */}
          <div className="px-4 py-3">
            <div
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl",
                ocrProcessing ? "bg-primary/10" : "bg-green-500/10"
              )}
            >
              {ocrProcessing ? (
                <RefreshCw className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5 text-green-600" />
              )}
              <div className="flex-1">
                <p
                  className={cn(
                    "text-[15px] font-medium",
                    ocrProcessing ? "text-primary" : "text-green-700"
                  )}
                >
                  {ocrProcessing ? "正在识别中..." : "识别完成"}
                </p>
                <p
                  className={cn(
                    "text-[13px]",
                    ocrProcessing ? "text-primary/70" : "text-green-600/70"
                  )}
                >
                  {ocrProcessing
                    ? "AI 正在分析文档内容"
                    : `置信度: ${(ocrResult.confidence * 100).toFixed(0)}%`}
                </p>
              </div>
            </div>
          </div>

          {/* Mock image preview */}
          <div className="px-4 py-2">
            <div className="aspect-[4/3] bg-neutral-200 rounded-xl flex items-center justify-center">
              <FileText className="w-16 h-16 text-neutral-400" />
            </div>
          </div>

          {/* OCR results preview */}
          {!ocrProcessing && (
            <>
              <div className="px-4 py-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span className="text-[13px] text-amber-600">
                    请确认以下识别结果是否正确
                  </span>
                </div>
              </div>

              <IOSList header="识别结果">
                <IOSListItem
                  title="标题"
                  detail={formData.title}
                  showChevron={false}
                />
                <IOSListItem
                  title="类型"
                  detail={formData.type}
                  showChevron={false}
                />
                <IOSListItem
                  title="日期"
                  detail={formData.date}
                  showChevron={false}
                />
                <IOSListItem
                  title="金额"
                  detail={formData.amount}
                  showChevron={false}
                />
                <IOSListItem
                  title="相关方"
                  detail={formData.parties}
                  showChevron={false}
                />
              </IOSList>

              <div className="px-4 py-4 mt-auto space-y-3">
                <button
                  onClick={handleConfirmOcr}
                  className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
                >
                  <Check className="w-5 h-5" />
                  确认并继续编辑
                </button>
                <button
                  onClick={() => setStep("form")}
                  className="w-full py-4 bg-card border border-border rounded-xl text-[17px] font-medium active:bg-muted/50 transition-colors"
                >
                  手动输入
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Step: Form */}
      {step === "form" && (
        <div className="flex-1">
          <IOSList header="基本信息">
            <div className="px-4 py-3 bg-card">
              <label className="text-[13px] text-muted-foreground">标题</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="输入资料标题"
                className="w-full mt-1 text-[17px] bg-transparent focus:outline-none"
              />
            </div>
            <IOSListItem
              title="分类"
              detail={formData.category || "选择分类"}
              icon={<FolderOpen className="w-5 h-5 text-muted-foreground" />}
              onClick={() => setShowCategorySheet(true)}
            />
            <div className="px-4 py-3 bg-card flex items-center gap-3">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-[13px] text-muted-foreground">类型</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  placeholder="合同/证件/发票..."
                  className="w-full text-[17px] bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </IOSList>

          <IOSList header="日期与金额">
            <div className="px-4 py-3 bg-card flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-[13px] text-muted-foreground">
                  创建日期
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full text-[17px] bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-card flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-[13px] text-muted-foreground">
                  到期日期（可选）
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) =>
                    setFormData({ ...formData, expiryDate: e.target.value })
                  }
                  className="w-full text-[17px] bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-card flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-[13px] text-muted-foreground">
                  金额（可选）
                </label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder="¥0.00"
                  className="w-full text-[17px] bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </IOSList>

          <IOSList header="其他信息">
            <div className="px-4 py-3 bg-card flex items-center gap-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-[13px] text-muted-foreground">
                  相关方（可选）
                </label>
                <input
                  type="text"
                  value={formData.parties}
                  onChange={(e) =>
                    setFormData({ ...formData, parties: e.target.value })
                  }
                  placeholder="输入相关人员或机构"
                  className="w-full text-[17px] bg-transparent focus:outline-none"
                />
              </div>
            </div>
            <div className="px-4 py-3 bg-card flex items-center gap-3">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1">
                <label className="text-[13px] text-muted-foreground">
                  标签（可选）
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="用逗号分隔多个标签"
                  className="w-full text-[17px] bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </IOSList>

          <IOSList header="描述">
            <div className="px-4 py-3 bg-card">
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="添加备注说明（可选）"
                rows={3}
                className="w-full text-[17px] bg-transparent focus:outline-none resize-none"
              />
            </div>
          </IOSList>

          <div className="h-8" />
        </div>
      )}

      {/* Action sheets and alerts */}
      <IOSActionSheet
        open={showSourceSheet}
        onClose={() => setShowSourceSheet(false)}
        title="选择来源"
        actions={[
          {
            label: "拍照",
            icon: <Camera className="w-5 h-5" />,
            onClick: handleImageCapture,
          },
          {
            label: "从相册选择",
            icon: <Image className="w-5 h-5" />,
            onClick: handleImageCapture,
          },
          {
            label: "选择文件",
            icon: <FolderOpen className="w-5 h-5" />,
            onClick: handleImageCapture,
          },
        ]}
      />

      <IOSActionSheet
        open={showCategorySheet}
        onClose={() => setShowCategorySheet(false)}
        title="选择分类"
        actions={familyCategories.map((cat) => ({
          label: `${cat.icon} ${cat.name}`,
          onClick: () => setFormData({ ...formData, category: cat.name }),
        }))}
      />

      <IOSAlert
        open={showDiscardAlert}
        onClose={() => setShowDiscardAlert(false)}
        title="放弃更改"
        message="您有未保存的更改，确定要放弃吗？"
        buttons={[
          {
            label: "继续编辑",
            style: "cancel",
            onClick: () => {},
          },
          {
            label: "放弃",
            style: "destructive",
            onClick: onBack,
          },
        ]}
      />
    </div>
  )
}
