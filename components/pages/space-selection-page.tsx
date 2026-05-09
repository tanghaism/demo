"use client"

import { useState } from "react"
import { Plus, Shield, FolderLock, Pencil, Trash2 } from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSList } from "@/components/ios/ios-list"
import { IOSActionSheet } from "@/components/ios/ios-action-sheet"
import { IOSAlert } from "@/components/ios/ios-alert"
import { IOSSwipeableItem } from "@/components/ios/ios-swipeable-item"
import { spaces, type Space } from "@/lib/mock-data"

const spaceTypeLabels = {
  family: "家庭",
  freelancer: "个人职业",
  business: "商务经营",
  custom: "自定义",
}

export type SpaceType = "family" | "freelancer" | "business" | "custom"

interface SpaceSelectionPageProps {
  onSelectSpace: (space: Space) => void
  onCreateSpace: (type: SpaceType) => void
  onEditSpace: (space: Space) => void
  onDeleteSpace?: (space: Space) => void
}

export function SpaceSelectionPage({
  onSelectSpace,
  onCreateSpace,
  onEditSpace,
  onDeleteSpace,
}: SpaceSelectionPageProps) {
  const [showCreateSheet, setShowCreateSheet] = useState(false)
  const [spaceToDelete, setSpaceToDelete] = useState<Space | null>(null)

  const createSpaceActions = [
    {
      label: "家庭空间",
      onClick: () => {
        setShowCreateSheet(false)
        onCreateSpace("family")
      },
    },
    {
      label: "个人职业空间",
      onClick: () => {
        setShowCreateSheet(false)
        onCreateSpace("freelancer")
      },
    },
    {
      label: "商务经营空间",
      onClick: () => {
        setShowCreateSheet(false)
        onCreateSpace("business")
      },
    },
    {
      label: "自定义空间",
      onClick: () => {
        setShowCreateSheet(false)
        onCreateSpace("custom")
      },
    },
  ]

  const handleDeleteClick = (space: Space) => {
    if (space.documentCount > 0) {
      setSpaceToDelete(space)
    } else {
      onDeleteSpace?.(space)
    }
  }

  const confirmDelete = () => {
    if (spaceToDelete) {
      onDeleteSpace?.(spaceToDelete)
      setSpaceToDelete(null)
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title="本地凭证箱"
        large
        rightAction={{
          icon: <Plus className="w-6 h-6" />,
          onClick: () => setShowCreateSheet(true),
        }}
      />

      {/* Privacy badge */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-green-500/10 rounded-xl">
          <Shield className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-[13px] font-medium text-green-700">本地存储 · 隐私优先</p>
            <p className="text-[11px] text-green-600/80">所有数据仅保存在您的设备上</p>
          </div>
          <FolderLock className="w-4 h-4 text-green-600/60" />
        </div>
      </div>

      {/* Space list */}
      <IOSList header="我的空间">
        {spaces.map((space) => (
          <IOSSwipeableItem
            key={space.id}
            actions={[
              {
                label: "编辑",
                icon: <Pencil className="w-5 h-5" />,
                color: "blue",
                onClick: () => onEditSpace(space),
              },
              {
                label: "删除",
                icon: <Trash2 className="w-5 h-5" />,
                color: "red",
                onClick: () => handleDeleteClick(space),
              },
            ]}
          >
            <button
              onClick={() => onSelectSpace(space)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left active:bg-muted/50 transition-colors"
            >
              <span className="text-2xl">{space.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[15px] text-foreground truncate">
                  {space.name}
                </p>
                <p className="text-[13px] text-muted-foreground truncate">
                  {spaceTypeLabels[space.type]} · {space.documentCount}份资料
                </p>
              </div>
              <p className="text-[12px] text-muted-foreground/70">
                上次更新 {space.lastUpdated.slice(5)}
              </p>
            </button>
          </IOSSwipeableItem>
        ))}
      </IOSList>

      {/* Bottom padding for safe area */}
      <div className="h-8" />

      {/* Create space action sheet */}
      <IOSActionSheet
        open={showCreateSheet}
        onClose={() => setShowCreateSheet(false)}
        title="创建新空间"
        message="选择空间类型以开始管理您的资料"
        actions={createSpaceActions}
      />

      {/* Delete confirmation alert */}
      <IOSAlert
        open={spaceToDelete !== null}
        onClose={() => setSpaceToDelete(null)}
        title="删除空间"
        message={`"${spaceToDelete?.name}"内有 ${spaceToDelete?.documentCount} 份资料，删除后所有凭证将永久删除，不可恢复。确定要删除吗？`}
        actions={[
          {
            label: "取消",
            onClick: () => setSpaceToDelete(null),
          },
          {
            label: "删除",
            destructive: true,
            onClick: confirmDelete,
          },
        ]}
      />
    </div>
  )
}
