"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  FileText,
  Calendar,
  Tag,
  Users,
  DollarSign,
  Paperclip,
  Share,
  Pencil,
  Trash2,
  Copy,
  Bell,
  Download,
  Image,
  File,
  AlertTriangle,
  Clock,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSList, IOSListItem } from "@/components/ios/ios-list"
import { IOSActionSheet } from "@/components/ios/ios-action-sheet"
import { IOSAlert } from "@/components/ios/ios-alert"
import { documents } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface DocumentDetailPageProps {
  documentId: string
  onBack: () => void
  onEdit: () => void
  onExport: () => void
}

export function DocumentDetailPage({
  documentId,
  onBack,
  onEdit,
  onExport,
}: DocumentDetailPageProps) {
  const [showMoreSheet, setShowMoreSheet] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [showShareSheet, setShowShareSheet] = useState(false)

  const doc = documents.find((d) => d.id === documentId)

  if (!doc) {
    return (
      <div className="flex flex-col min-h-full bg-muted/30">
        <IOSNavBar
          title="资料详情"
          leftAction={{
            label: "返回",
            onClick: onBack,
          }}
        />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">资料不存在</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title="资料详情"
        leftAction={{
          label: "返回",
          onClick: onBack,
        }}
        rightAction={{
          icon: <MoreHorizontal className="w-6 h-6" />,
          onClick: () => setShowMoreSheet(true),
        }}
      />

      {/* Status banner */}
      {(doc.isExpired || doc.isExpiringSoon) && (
        <div
          className={cn(
            "mx-4 mt-2 flex items-center gap-3 p-3 rounded-xl",
            doc.isExpired ? "bg-destructive/10" : "bg-amber-500/10"
          )}
        >
          {doc.isExpired ? (
            <AlertTriangle className="w-5 h-5 text-destructive" />
          ) : (
            <Clock className="w-5 h-5 text-amber-600" />
          )}
          <div className="flex-1">
            <p
              className={cn(
                "text-[15px] font-medium",
                doc.isExpired ? "text-destructive" : "text-amber-700"
              )}
            >
              {doc.isExpired ? "已过期" : "即将到期"}
            </p>
            <p
              className={cn(
                "text-[13px]",
                doc.isExpired ? "text-destructive/70" : "text-amber-600/70"
              )}
            >
              到期日期: {doc.expiryDate}
            </p>
          </div>
        </div>
      )}

      {/* Title section */}
      <div className="px-4 py-4">
        <h1 className="text-[28px] font-bold">{doc.title}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[13px] text-primary bg-primary/10 px-2 py-0.5 rounded">
            {doc.category}
          </span>
          <span className="text-[13px] text-muted-foreground">{doc.type}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 py-2">
        <div className="flex gap-3">
          <button
            onClick={() => setShowShareSheet(true)}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-card rounded-xl active:bg-muted/50 transition-colors"
          >
            <Share className="w-5 h-5 text-primary" />
            <span className="text-[13px]">分享</span>
          </button>
          <button
            onClick={onEdit}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-card rounded-xl active:bg-muted/50 transition-colors"
          >
            <Pencil className="w-5 h-5 text-primary" />
            <span className="text-[13px]">编辑</span>
          </button>
          <button
            onClick={onExport}
            className="flex-1 flex flex-col items-center gap-1.5 py-3 bg-card rounded-xl active:bg-muted/50 transition-colors"
          >
            <Download className="w-5 h-5 text-primary" />
            <span className="text-[13px]">导出</span>
          </button>
        </div>
      </div>

      {/* Details */}
      <IOSList header="基本信息">
        <IOSListItem
          title="创建日期"
          icon={<Calendar className="w-5 h-5 text-muted-foreground" />}
          detail={doc.date}
          showChevron={false}
        />
        {doc.expiryDate && (
          <IOSListItem
            title="到期日期"
            icon={<Clock className="w-5 h-5 text-muted-foreground" />}
            detail={doc.expiryDate}
            showChevron={false}
          />
        )}
        {doc.amount && (
          <IOSListItem
            title="金额"
            icon={<DollarSign className="w-5 h-5 text-muted-foreground" />}
            detail={doc.amount}
            showChevron={false}
          />
        )}
        <IOSListItem
          title="类型"
          icon={<FileText className="w-5 h-5 text-muted-foreground" />}
          detail={doc.type}
          showChevron={false}
        />
      </IOSList>

      {doc.description && (
        <IOSList header="描述">
          <div className="px-4 py-3 bg-card">
            <p className="text-[15px] text-foreground">{doc.description}</p>
          </div>
        </IOSList>
      )}

      {doc.parties && doc.parties.length > 0 && (
        <IOSList header="相关方">
          {doc.parties.map((party, index) => (
            <IOSListItem
              key={index}
              title={party}
              icon={<Users className="w-5 h-5 text-muted-foreground" />}
              showChevron={false}
            />
          ))}
        </IOSList>
      )}

      {doc.tags.length > 0 && (
        <IOSList header="标签">
          <div className="px-4 py-3 bg-card flex flex-wrap gap-2">
            {doc.tags.map((tag) => (
              <span
                key={tag}
                className="text-[13px] text-muted-foreground bg-muted px-2.5 py-1 rounded-lg"
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </IOSList>
      )}

      {doc.attachments && doc.attachments.length > 0 && (
        <IOSList header="附件">
          {doc.attachments.map((attachment) => (
            <IOSListItem
              key={attachment.id}
              title={attachment.name}
              icon={
                attachment.type === "image" ? (
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Image className="w-5 h-5 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-destructive" />
                  </div>
                )
              }
              subtitle={attachment.type === "image" ? "图片" : "PDF文档"}
            />
          ))}
        </IOSList>
      )}

      {/* Bottom padding */}
      <div className="h-8" />

      {/* Action sheets and alerts */}
      <IOSActionSheet
        open={showMoreSheet}
        onClose={() => setShowMoreSheet(false)}
        actions={[
          {
            label: "编辑",
            icon: <Pencil className="w-5 h-5" />,
            onClick: onEdit,
          },
          {
            label: "复制",
            icon: <Copy className="w-5 h-5" />,
            onClick: () => {},
          },
          {
            label: "设置提醒",
            icon: <Bell className="w-5 h-5" />,
            onClick: () => {},
          },
          {
            label: "删除",
            icon: <Trash2 className="w-5 h-5" />,
            destructive: true,
            onClick: () => setShowDeleteAlert(true),
          },
        ]}
      />

      <IOSActionSheet
        open={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        title="导出格式"
        message="选择导出的文件格式"
        actions={[
          {
            label: "导出为 PDF",
            onClick: onExport,
          },
          {
            label: "导出为 ZIP 证据包",
            onClick: onExport,
          },
          {
            label: "分享原始文件",
            onClick: () => {},
          },
        ]}
      />

      <IOSAlert
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="删除资料"
        message="确定要删除这份资料吗？此操作无法撤销。"
        buttons={[
          {
            label: "取消",
            style: "cancel",
            onClick: () => {},
          },
          {
            label: "删除",
            style: "destructive",
            onClick: onBack,
          },
        ]}
      />
    </div>
  )
}
