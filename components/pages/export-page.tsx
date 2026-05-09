"use client"

import { useState } from "react"
import {
  FileText,
  Archive,
  Share,
  Check,
  ChevronRight,
  Shield,
  Clock,
  Hash,
  FileCheck,
  Loader2,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSList, IOSListItem } from "@/components/ios/ios-list"
import { documents } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface ExportPageProps {
  documentId?: string
  onBack: () => void
}

export function ExportPage({ documentId, onBack }: ExportPageProps) {
  const [step, setStep] = useState<"options" | "selecting" | "preview" | "exporting" | "done">(
    documentId ? "options" : "selecting"
  )
  const [exportFormat, setExportFormat] = useState<"pdf" | "zip">("pdf")
  const [selectedDocs, setSelectedDocs] = useState<string[]>(
    documentId ? [documentId] : []
  )
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [includeTimestamp, setIncludeTimestamp] = useState(true)
  const [includeHash, setIncludeHash] = useState(true)

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    )
  }

  const handleExport = () => {
    setStep("exporting")
    setTimeout(() => {
      setStep("done")
    }, 2000)
  }

  const selectedDocuments = documents.filter((d) => selectedDocs.includes(d.id))

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title={
          step === "selecting"
            ? "选择资料"
            : step === "options"
            ? "导出选项"
            : step === "preview"
            ? "预览"
            : step === "exporting"
            ? "导出中"
            : "导出完成"
        }
        leftAction={
          step === "done"
            ? undefined
            : {
                label: step === "selecting" ? "取消" : "返回",
                onClick:
                  step === "selecting"
                    ? onBack
                    : step === "options"
                    ? () => setStep("selecting")
                    : step === "preview"
                    ? () => setStep("options")
                    : undefined,
              }
        }
        rightAction={
          step === "selecting" && selectedDocs.length > 0
            ? {
                label: "下一步",
                onClick: () => setStep("options"),
              }
            : step === "options"
            ? {
                label: "预览",
                onClick: () => setStep("preview"),
              }
            : undefined
        }
      />

      {/* Step: Selecting documents */}
      {step === "selecting" && (
        <div className="flex-1">
          <div className="px-4 py-3">
            <p className="text-[15px] text-muted-foreground">
              选择要导出的资料（已选 {selectedDocs.length} 项）
            </p>
          </div>
          <IOSList>
            {documents.map((doc) => (
              <IOSListItem
                key={doc.id}
                title={doc.title}
                subtitle={`${doc.category} · ${doc.date}`}
                trailing={
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      selectedDocs.includes(doc.id)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    )}
                  >
                    {selectedDocs.includes(doc.id) && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                }
                showChevron={false}
                onClick={() => toggleDoc(doc.id)}
              />
            ))}
          </IOSList>
        </div>
      )}

      {/* Step: Export options */}
      {step === "options" && (
        <div className="flex-1">
          <IOSList header="导出格式">
            <IOSListItem
              title="PDF 文档"
              subtitle="生成包含所有资料的 PDF 文件"
              icon={
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-destructive" />
                </div>
              }
              trailing={
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    exportFormat === "pdf"
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {exportFormat === "pdf" && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              }
              showChevron={false}
              onClick={() => setExportFormat("pdf")}
            />
            <IOSListItem
              title="ZIP 证据包"
              subtitle="打包原始文件和元数据"
              icon={
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 text-primary" />
                </div>
              }
              trailing={
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    exportFormat === "zip"
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30"
                  )}
                >
                  {exportFormat === "zip" && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </div>
              }
              showChevron={false}
              onClick={() => setExportFormat("zip")}
            />
          </IOSList>

          <IOSList header="证据选项" footer="这些信息可作为资料的有效性证明">
            <IOSListItem
              title="包含元数据"
              subtitle="文件名、日期、分类等信息"
              icon={<FileCheck className="w-5 h-5 text-muted-foreground" />}
              trailing={
                <button
                  onClick={() => setIncludeMetadata(!includeMetadata)}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors",
                    includeMetadata ? "bg-primary" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 bg-white rounded-full shadow transition-transform",
                      includeMetadata ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              }
              showChevron={false}
            />
            <IOSListItem
              title="添加时间戳"
              subtitle="记录导出时间"
              icon={<Clock className="w-5 h-5 text-muted-foreground" />}
              trailing={
                <button
                  onClick={() => setIncludeTimestamp(!includeTimestamp)}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors",
                    includeTimestamp ? "bg-primary" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 bg-white rounded-full shadow transition-transform",
                      includeTimestamp ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              }
              showChevron={false}
            />
            <IOSListItem
              title="文件哈希值"
              subtitle="SHA-256 校验码用于验证文件完整性"
              icon={<Hash className="w-5 h-5 text-muted-foreground" />}
              trailing={
                <button
                  onClick={() => setIncludeHash(!includeHash)}
                  className={cn(
                    "w-12 h-7 rounded-full transition-colors",
                    includeHash ? "bg-primary" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "w-6 h-6 bg-white rounded-full shadow transition-transform",
                      includeHash ? "translate-x-5" : "translate-x-0.5"
                    )}
                  />
                </button>
              }
              showChevron={false}
            />
          </IOSList>

          <IOSList header="已选资料">
            {selectedDocuments.map((doc) => (
              <IOSListItem
                key={doc.id}
                title={doc.title}
                subtitle={doc.category}
                showChevron={false}
              />
            ))}
          </IOSList>
        </div>
      )}

      {/* Step: Preview */}
      {step === "preview" && (
        <div className="flex-1">
          <div className="px-4 py-4">
            <div className="bg-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-4">
                {exportFormat === "pdf" ? (
                  <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-destructive" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Archive className="w-6 h-6 text-primary" />
                  </div>
                )}
                <div>
                  <p className="text-[17px] font-semibold">
                    证据包_{new Date().toISOString().slice(0, 10)}.
                    {exportFormat}
                  </p>
                  <p className="text-[13px] text-muted-foreground">
                    {selectedDocs.length} 份资料
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-[13px]">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">格式</span>
                  <span>{exportFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">资料数量</span>
                  <span>{selectedDocs.length} 份</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">元数据</span>
                  <span>{includeMetadata ? "包含" : "不包含"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">时间戳</span>
                  <span>{includeTimestamp ? "包含" : "不包含"}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">哈希校验</span>
                  <span>{includeHash ? "包含" : "不包含"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy notice */}
          <div className="px-4 py-2">
            <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl">
              <Shield className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-[13px] font-medium text-green-700">
                  本地处理 · 隐私安全
                </p>
                <p className="text-[11px] text-green-600/70">
                  文件将在您的设备上本地生成，不会上传到任何服务器
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 mt-auto">
            <button
              onClick={handleExport}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2 active:opacity-80 transition-opacity"
            >
              <Share className="w-5 h-5" />
              生成并分享
            </button>
          </div>
        </div>
      )}

      {/* Step: Exporting */}
      {step === "exporting" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-[17px] font-semibold">正在生成证据包...</p>
          <p className="text-[15px] text-muted-foreground mt-1">
            请稍候，文件正在本地处理
          </p>
        </div>
      )}

      {/* Step: Done */}
      {step === "done" && (
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-8">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <p className="text-[20px] font-semibold">导出成功</p>
            <p className="text-[15px] text-muted-foreground mt-1 text-center">
              证据包已生成，请选择分享方式
            </p>
          </div>

          <div className="px-4 pb-8 space-y-3">
            <button className="w-full py-4 bg-primary text-primary-foreground rounded-xl text-[17px] font-semibold flex items-center justify-center gap-2 active:opacity-80 transition-opacity">
              <Share className="w-5 h-5" />
              分享到...
            </button>
            <button
              onClick={onBack}
              className="w-full py-4 bg-card border border-border rounded-xl text-[17px] font-medium active:bg-muted/50 transition-colors"
            >
              完成
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
