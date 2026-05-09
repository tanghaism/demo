"use client"

import { useState } from "react"
import {
  Shield,
  Lock,
  Bell,
  HardDrive,
  Trash2,
  Info,
  ChevronRight,
  FolderLock,
  Eye,
  Fingerprint,
  Download,
  Upload,
} from "lucide-react"
import { IOSNavBar } from "@/components/ios/ios-nav-bar"
import { IOSList, IOSListItem } from "@/components/ios/ios-list"
import { IOSAlert } from "@/components/ios/ios-alert"
import { cn } from "@/lib/utils"

interface SettingsPageProps {
  onBack: () => void
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [reminderEnabled, setReminderEnabled] = useState(true)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  return (
    <div className="flex flex-col min-h-full bg-muted/30">
      <IOSNavBar
        title="设置"
        large
        leftAction={{
          label: "返回",
          onClick: onBack,
        }}
      />

      {/* Privacy info */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-xl">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold text-green-700">
              隐私优先设计
            </p>
            <p className="text-[13px] text-green-600/80 mt-0.5">
              所有数据仅保存在您的设备本地，不会上传至任何云端服务器
            </p>
          </div>
        </div>
      </div>

      {/* Security */}
      <IOSList header="安全">
        <IOSListItem
          title="Face ID / Touch ID"
          subtitle="使用生物识别解锁应用"
          icon={<Fingerprint className="w-5 h-5 text-muted-foreground" />}
          trailing={
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={cn(
                "w-12 h-7 rounded-full transition-colors",
                biometricEnabled ? "bg-primary" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 bg-white rounded-full shadow transition-transform",
                  biometricEnabled ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          }
          showChevron={false}
        />
        <IOSListItem
          title="密码锁"
          subtitle="设置应用访问密码"
          icon={<Lock className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
        <IOSListItem
          title="隐藏预览"
          subtitle="切换应用时隐藏敏感内容"
          icon={<Eye className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
      </IOSList>

      {/* Notifications */}
      <IOSList header="提醒通知">
        <IOSListItem
          title="到期提醒"
          subtitle="资料到期前自动通知"
          icon={<Bell className="w-5 h-5 text-muted-foreground" />}
          trailing={
            <button
              onClick={() => setReminderEnabled(!reminderEnabled)}
              className={cn(
                "w-12 h-7 rounded-full transition-colors",
                reminderEnabled ? "bg-primary" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "w-6 h-6 bg-white rounded-full shadow transition-transform",
                  reminderEnabled ? "translate-x-5" : "translate-x-0.5"
                )}
              />
            </button>
          }
          showChevron={false}
        />
        <IOSListItem
          title="提醒时间"
          subtitle="提前 7 天、30 天"
          icon={<Bell className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
      </IOSList>

      {/* Storage */}
      <IOSList header="存储">
        <IOSListItem
          title="存储空间"
          subtitle="已用 156 MB / 可用"
          icon={<HardDrive className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
        <IOSListItem
          title="备份到文件"
          subtitle="导出完整备份到本地"
          icon={<Download className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
        <IOSListItem
          title="从备份恢复"
          subtitle="导入之前的备份文件"
          icon={<Upload className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
      </IOSList>

      {/* About */}
      <IOSList header="关于">
        <IOSListItem
          title="版本"
          detail="1.0.0"
          icon={<Info className="w-5 h-5 text-muted-foreground" />}
          showChevron={false}
        />
        <IOSListItem
          title="隐私政策"
          icon={<FolderLock className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
        <IOSListItem
          title="使用条款"
          icon={<Info className="w-5 h-5 text-muted-foreground" />}
          onClick={() => {}}
        />
      </IOSList>

      {/* Danger zone */}
      <IOSList header="危险操作">
        <IOSListItem
          title="删除所有数据"
          icon={<Trash2 className="w-5 h-5 text-destructive" />}
          destructive
          onClick={() => setShowDeleteAlert(true)}
        />
      </IOSList>

      {/* Bottom padding */}
      <div className="h-8" />

      <IOSAlert
        open={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        title="删除所有数据"
        message="此操作将永久删除您设备上的所有资料和设置，无法恢复。"
        buttons={[
          {
            label: "取消",
            style: "cancel",
            onClick: () => {},
          },
          {
            label: "删除全部",
            style: "destructive",
            onClick: () => {},
          },
        ]}
      />
    </div>
  )
}
