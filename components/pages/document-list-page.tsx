"use client"

import { useState } from "react"
import {
  Plus,
  FolderOpen,
  Filter,
  ArrowUpDown,
  FileX,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSSearchBar } from "@/components/ios/ios-search-bar"
import { IOSSegmentedControl } from "@/components/ios/ios-segmented-control"
import { IOSActionSheet } from "@/components/ios/ios-action-sheet"
import { documents, type Category } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface DocumentListPageProps {
  category: Category
  onBack: () => void
  onSelectDocument: (docId: string) => void
  onAddDocument: () => void
}

export function DocumentListPage({
  category,
  onBack,
  onSelectDocument,
  onAddDocument,
}: DocumentListPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("list")
  const [showFilterSheet, setShowFilterSheet] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState("all")

  const categoryDocs = documents.filter((doc) => doc.category === category.name)

  const filteredDocs = categoryDocs.filter((doc) => {
    if (searchQuery) {
      return doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    }
    if (selectedFilter === "expiring") {
      return doc.isExpiringSoon || doc.isExpired
    }
    return true
  })

  const isEmpty = filteredDocs.length === 0

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title={category.name}
        subtitle={`${categoryDocs.length}份资料`}
        leftAction={{
          label: "返回",
          onClick: onBack,
        }}
        rightAction={{
          icon: <Plus className="w-6 h-6" />,
          onClick: onAddDocument,
        }}
      />

      <IOSSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder={`搜索${category.name}...`}
      />

      {/* Filter bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <IOSSegmentedControl
          segments={[
            { id: "list", label: "列表" },
            { id: "grid", label: "缩略图" },
          ]}
          selectedId={viewMode}
          onChange={setViewMode}
          className="w-32"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilterSheet(true)}
            className={cn(
              "flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px]",
              selectedFilter !== "all"
                ? "bg-primary/10 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-lg text-[13px] text-muted-foreground">
            <ArrowUpDown className="w-4 h-4" />
            排序
          </button>
        </div>
      </div>

      {/* Document list/grid */}
      {isEmpty ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <FileX className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-[17px] font-semibold mb-1">暂无资料</h3>
          <p className="text-[15px] text-muted-foreground mb-6">
            {searchQuery
              ? "未找到匹配的资料"
              : `点击右上角添加${category.name}`}
          </p>
          {!searchQuery && (
            <button
              onClick={onAddDocument}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-[17px] font-medium active:opacity-80 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              添加资料
            </button>
          )}
        </div>
      ) : viewMode === "list" ? (
        <div className="px-4 py-2 space-y-2">
          {filteredDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDocument(doc.id)}
              className="w-full flex items-center gap-3 p-3 bg-card rounded-xl active:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                  doc.isExpired
                    ? "bg-destructive/10"
                    : doc.isExpiringSoon
                    ? "bg-amber-500/10"
                    : "bg-primary/10"
                )}
              >
                <FolderOpen
                  className={cn(
                    "w-6 h-6",
                    doc.isExpired
                      ? "text-destructive"
                      : doc.isExpiringSoon
                      ? "text-amber-600"
                      : "text-primary"
                  )}
                />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-[17px] font-medium truncate">{doc.title}</p>
                <p className="text-[13px] text-muted-foreground">
                  {doc.type} · {doc.date}
                </p>
                {doc.tags.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {doc.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {(doc.isExpired || doc.isExpiringSoon) && (
                <div className="flex-shrink-0">
                  {doc.isExpired ? (
                    <span className="text-[11px] text-destructive bg-destructive/10 px-2 py-1 rounded">
                      已过期
                    </span>
                  ) : (
                    <span className="text-[11px] text-amber-600 bg-amber-500/10 px-2 py-1 rounded">
                      即将到期
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="px-4 py-2 grid grid-cols-2 gap-3">
          {filteredDocs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => onSelectDocument(doc.id)}
              className="flex flex-col bg-card rounded-xl overflow-hidden active:opacity-80 transition-opacity"
            >
              <div
                className={cn(
                  "aspect-[4/3] flex items-center justify-center",
                  doc.isExpired
                    ? "bg-destructive/5"
                    : doc.isExpiringSoon
                    ? "bg-amber-500/5"
                    : "bg-muted/50"
                )}
              >
                <FolderOpen
                  className={cn(
                    "w-10 h-10",
                    doc.isExpired
                      ? "text-destructive/50"
                      : doc.isExpiringSoon
                      ? "text-amber-500/50"
                      : "text-muted-foreground/30"
                  )}
                />
              </div>
              <div className="p-2.5">
                <p className="text-[13px] font-medium truncate">{doc.title}</p>
                <p className="text-[11px] text-muted-foreground">{doc.date}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <IOSActionSheet
        open={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        title="筛选资料"
        actions={[
          {
            label: "全部",
            onClick: () => setSelectedFilter("all"),
          },
          {
            label: "即将到期",
            onClick: () => setSelectedFilter("expiring"),
          },
          {
            label: "本月添加",
            onClick: () => setSelectedFilter("recent"),
          },
          {
            label: "有附件",
            onClick: () => setSelectedFilter("attachments"),
          },
        ]}
      />

      {/* Bottom padding */}
      <div className="h-8" />
    </div>
  )
}
