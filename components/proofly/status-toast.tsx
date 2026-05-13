"use client"

import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react"

export type ToastVariant = "success" | "warning" | "error" | "info"

interface StatusToastProps {
  message: string
  sub?: string
  variant?: ToastVariant
  action?: { label: string; onPress: () => void }
}

const variantConfig: Record<ToastVariant, { icon: React.ElementType; iconColor: string; bg: string }> = {
  success: { icon: CheckCircle2, iconColor: "#14C8A8", bg: "#101828" },
  warning: { icon: AlertCircle, iconColor: "#FF9500", bg: "#101828" },
  error: { icon: XCircle, iconColor: "#FF3B30", bg: "#101828" },
  info: { icon: Info, iconColor: "#2563FF", bg: "#101828" },
}

export function StatusToast({ message, sub, variant = "success", action }: StatusToastProps) {
  const cfg = variantConfig[variant]
  const Icon = cfg.icon
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 rounded-2xl"
      style={{ background: cfg.bg, boxShadow: "0 8px 24px rgba(0,0,0,0.28)" }}
    >
      <Icon size={16} style={{ color: cfg.iconColor }} className="flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium leading-snug" style={{ fontSize: 14 }}>{message}</p>
        {sub && <p className="text-white/60 mt-0.5 leading-snug" style={{ fontSize: 12 }}>{sub}</p>}
      </div>
      {action && (
        <button
          className="ios-tap flex-shrink-0 px-2.5 py-1 rounded-lg"
          style={{ background: "rgba(255,255,255,0.15)" }}
          onClick={action.onPress}
        >
          <span className="text-white font-semibold" style={{ fontSize: 13 }}>{action.label}</span>
        </button>
      )}
    </div>
  )
}

// All named system-state messages used across the prototype
export const STATUS_MSGS = {
  cameraBlocked: {
    variant: "warning" as ToastVariant,
    message: "相机不可用",
    sub: "仍可从相册或文件添加",
  },
  importPartialFail: (ok: number, fail: number) => ({
    variant: "warning" as ToastVariant,
    message: `已导入 ${ok} 项，${fail} 项失败`,
    sub: "点击重试失败项",
  }),
  savedToAlbum: {
    variant: "success" as ToastVariant,
    message: "已保存到相册",
    sub: "可在其他 App 上传时选择",
  },
  savedToFiles: {
    variant: "success" as ToastVariant,
    message: "已保存到文件 App",
    sub: "可从文件选择器访问",
  },
  saveFailed: {
    variant: "error" as ToastVariant,
    message: "未能保存",
    sub: "请检查权限或剩余存储空间",
  },
  proExpired: {
    variant: "info" as ToastVariant,
    message: "Pro 已到期",
    sub: "已有资料不会删除，新功能回到免费版限制",
  },
} as const
