"use client"

import { useState } from "react"
import {
  ChevronRight, HardDrive, Shield, Lock, Fingerprint,
  Trash2, RotateCcw, FileDown, Star, AlertCircle, Check,
} from "lucide-react"

interface SettingsScreenProps {
  onNavigate: (screen: string) => void
}

/** iOS-style icon cell: colored rounded square + label + optional right-side content */
function SettingRow({
  icon: Icon,
  label,
  value,
  badge,
  danger,
  onClick,
  iconColor = "#007AFF",
  iconBg = "#EEF4FF",
  isLast = false,
}: {
  icon: React.ElementType
  label: string
  value?: string
  badge?: string
  danger?: boolean
  onClick?: () => void
  iconColor?: string
  iconBg?: string
  isLast?: boolean
}) {
  return (
    <button
      className={`ios-tap w-full flex items-center px-4 ${!onClick ? "cursor-default" : ""}`}
      style={{ height: 44 }}
      onClick={onClick}
      aria-label={label}
    >
      {/* Icon cell — 29×29 rounded rect, matching iOS Settings icon size */}
      <div
        className="flex items-center justify-center flex-shrink-0 mr-3"
        style={{ width: 29, height: 29, borderRadius: 7, background: iconBg }}
      >
        <Icon size={15} strokeWidth={2} style={{ color: iconColor }} />
      </div>
      <div
        className="flex items-center flex-1 min-w-0"
        style={{
          height: 44,
          borderBottom: isLast ? "none" : "0.5px solid rgba(60,60,67,0.12)",
        }}
      >
        <span
          className="flex-1 text-left"
          style={{ fontSize: 16, color: danger ? "#FF3B30" : "#000000" }}
        >
          {label}
        </span>
        {badge && (
          <span
            className="px-2 rounded-full mr-2"
            style={{
              fontSize: 11,
              fontWeight: 700,
              background: "#007AFF",
              color: "white",
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            {badge}
          </span>
        )}
        {value && (
          <span style={{ fontSize: 16, color: "#8E8E93", marginRight: 6 }}>{value}</span>
        )}
        {onClick && <ChevronRight size={16} strokeWidth={2} style={{ color: "#C7C7CC", flexShrink: 0 }} />}
      </div>
    </button>
  )
}

function SettingToggle({
  icon: Icon,
  label,
  iconColor = "#007AFF",
  iconBg = "#EEF4FF",
  defaultOn = false,
  isLast = false,
}: {
  icon: React.ElementType
  label: string
  iconColor?: string
  iconBg?: string
  defaultOn?: boolean
  isLast?: boolean
}) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      className="ios-tap w-full flex items-center px-4"
      style={{ height: 44 }}
      onClick={() => setOn(!on)}
      aria-label={label}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 mr-3"
        style={{ width: 29, height: 29, borderRadius: 7, background: iconBg }}
      >
        <Icon size={15} strokeWidth={2} style={{ color: iconColor }} />
      </div>
      <div
        className="flex items-center flex-1 min-w-0"
        style={{
          height: 44,
          borderBottom: isLast ? "none" : "0.5px solid rgba(60,60,67,0.12)",
        }}
      >
        <span className="flex-1 text-left" style={{ fontSize: 16, color: "#000000" }}>{label}</span>
        {/* iOS toggle — 51×31 */}
        <div
          className="relative flex-shrink-0"
          style={{ width: 51, height: 31 }}
        >
          <div
            className="w-full h-full rounded-full transition-colors duration-200"
            style={{ background: on ? "#34C759" : "#E5E5EA" }}
          />
          <div
            className="absolute top-0.5 bg-white rounded-full shadow-md transition-all duration-200"
            style={{
              width: 27,
              height: 27,
              left: on ? 22 : 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>
    </button>
  )
}

export function SettingsScreen({ onNavigate }: SettingsScreenProps) {
  const [showBackupSheet, setShowBackupSheet] = useState(false)
  const [showBackupConfirm, setShowBackupConfirm] = useState(false)
  const [backupDone, setBackupDone] = useState(false)
  const [proExpired] = useState(false)
  const [showTrashSheet, setShowTrashSheet] = useState(false)
  const [showPrivacySheet, setShowPrivacySheet] = useState(false)
  const [showDisclaimerSheet, setShowDisclaimerSheet] = useState(false)

  return (
    <div className="flex flex-col h-full" style={{ background: "#F2F2F7", paddingTop: 54 }}>

      {/* iOS Large Title */}
      <div className="px-4 pt-3 pb-1">
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: "#000000" }}>设置</h1>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">

        {/* Subscription card */}
        <div className="px-4 mb-5">
          {proExpired ? (
            <div
              className="flex items-start gap-3 px-4 py-3"
              style={{ background: "#FFF8EC", borderRadius: 12, overflow: "hidden" }}
            >
              <AlertCircle size={16} strokeWidth={2} style={{ color: "#FF9500", marginTop: 1, flexShrink: 0 }} />
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 600, color: "#8A5F00" }}>Pro 订阅已到期</p>
                <p style={{ fontSize: 12, color: "#B07D00", lineHeight: 1.4, marginTop: 2 }}>
                  已有资料不受影响，新增功能回到免费版限制
                </p>
              </div>
              <button
                className="ios-tap flex-shrink-0 rounded-lg px-3 font-semibold"
                style={{ background: "#FF9500", color: "white", fontSize: 13, height: 32 }}
                onClick={() => onNavigate("pro-upgrade")}
                aria-label="续订 Pro"
              >
                续订
              </button>
            </div>
          ) : (
            <button
              className="ios-tap w-full px-4 py-4 text-left relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
                borderRadius: 12,
              }}
              onClick={() => onNavigate("pro-upgrade")}
              aria-label="开通 Proofly Pro"
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 55%)" }}
              />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Star size={13} strokeWidth={2} style={{ color: "#FFD060" }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>免费版 · 升级 Pro</span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>
                    1 个资料箱 / 30 条记录 / 3 个提醒
                  </p>
                  <p style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF", marginTop: 6, letterSpacing: -0.3 }}>¥18 / 年</p>
                </div>
                <div
                  className="rounded-xl px-3 py-1.5"
                  style={{ background: "rgba(255,255,255,0.9)" }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#007AFF" }}>开通 Pro</span>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Local data */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>本地数据</p>
        <div className="px-4 mb-5">
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            <SettingRow
              icon={HardDrive}
              label="本地存储占用"
              value="42.6 MB"
              iconBg="#EEF4FF"
              iconColor="#007AFF"
            />
            <SettingRow
              icon={FileDown}
              label="备份导出"
              onClick={() => setShowBackupSheet(true)}
              iconBg="#EDFAF7"
              iconColor="#34C759"
            />
            <SettingRow
              icon={RotateCcw}
              label="备份恢复"
              onClick={() => setShowBackupConfirm(true)}
              iconBg="#F0EBFF"
              iconColor="#5856D6"
            />
            <SettingRow
              icon={Trash2}
              label="回收站"
              value="2 条"
              onClick={() => setShowTrashSheet(true)}
              iconBg="#FFF0F0"
              iconColor="#FF3B30"
              isLast
            />
          </div>
        </div>

        {/* Security */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>本地安全</p>
        <div className="px-4 mb-5">
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            <SettingToggle icon={Lock} label="App 本地密码锁" iconBg="#F0EBFF" iconColor="#5856D6" />
            <SettingToggle icon={Fingerprint} label="Face ID / Touch ID" iconBg="#EEF4FF" iconColor="#007AFF" defaultOn isLast />
          </div>
        </div>

        {/* Content management */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>内容管理</p>
        <div className="px-4 mb-5">
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            <SettingRow
              icon={() => <span style={{ fontSize: 14 }}>📋</span>}
              label="模板管理"
              badge="Pro"
              onClick={() => onNavigate("templates")}
              iconBg="#F2F2F7"
              iconColor="#8E8E93"
              isLast
            />
          </div>
        </div>

        {/* Privacy */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>隐私</p>
        <div className="px-4 mb-5">
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            <div className="flex items-start px-4 py-3.5">
              <div
                className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5"
                style={{ width: 29, height: 29, borderRadius: 7, background: "#EDFAF7" }}
              >
                <span style={{ fontSize: 14 }}>🔒</span>
              </div>
              <div
                className="flex-1 pb-3.5"
                style={{ borderBottom: "0.5px solid rgba(60,60,67,0.12)" }}
              >
                <p style={{ fontSize: 15, fontWeight: 600, color: "#000000" }}>本地保存，不上传资料</p>
                <p style={{ fontSize: 13, color: "#8E8E93", lineHeight: 1.5, marginTop: 2 }}>
                  所有资料仅保存在您的 iPhone 上，不上传至任何服务器，不接入广告 SDK。
                </p>
              </div>
            </div>
            <SettingRow
              icon={Shield}
              label="隐私政策"
              onClick={() => setShowPrivacySheet(true)}
              iconBg="#EDFAF7"
              iconColor="#34C759"
              isLast
            />
          </div>
        </div>

        {/* About */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "#6B7280", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 22 }}>关于</p>
        <div className="px-4 mb-3">
          <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
            <div className="flex items-center justify-between px-4" style={{ height: 44, borderBottom: "0.5px solid rgba(60,60,67,0.12)" }}>
              <span style={{ fontSize: 16, color: "#000000" }}>Proofly</span>
              <span style={{ fontSize: 16, color: "#8E8E93" }}>v1.0.0</span>
            </div>
            <SettingRow
              icon={() => <span style={{ fontSize: 14 }}>📄</span>}
              label="免责声明"
              onClick={() => setShowDisclaimerSheet(true)}
              iconBg="#F2F2F7"
              iconColor="#8E8E93"
              isLast
            />
          </div>
        </div>

        <p className="text-center pb-6" style={{ fontSize: 12, color: "#8E8E93", paddingTop: 8, paddingLeft: 24, paddingRight: 24, lineHeight: 1.5 }}>
          资料包仅用于整理和留存，不提供法律、税务或保险结论
        </p>
      </div>

      {/* Backup export sheet */}
      {showBackupSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => { setShowBackupSheet(false); setBackupDone(false) }}
        >
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div
            className="relative w-full rounded-t-3xl px-5 pt-2 pb-10"
            style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.18)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col items-center text-center mb-5">
              <div
                className="flex items-center justify-center mb-3"
                style={{ width: 48, height: 48, borderRadius: 12, background: "#EDFAF7" }}
              >
                <FileDown size={22} strokeWidth={1.8} style={{ color: "#34C759" }} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#000000" }}>导出本地备份</p>
              <p style={{ fontSize: 14, color: "#8E8E93", marginTop: 4 }}>备份保存在文件 App，可手动迁移到新设备</p>
            </div>

            <div className="px-4 py-3.5 mb-4" style={{ background: "#F2F2F7", borderRadius: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#000000", marginBottom: 8 }}>备份内容</p>
              {["空间设置和元数据", "所有记录和附件索引", "对象和关联关系", "提醒设置", "自定义模板"].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1">
                  <Check size={13} strokeWidth={2.5} style={{ color: "#34C759", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "#8E8E93" }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 mb-5">
              <div className="px-3 py-3 text-center" style={{ background: "#F2F2F7", borderRadius: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#8E8E93" }}>免费版</p>
                <p style={{ fontSize: 12, color: "#8E8E93", lineHeight: 1.4, marginTop: 4 }}>基础备份，未加密</p>
              </div>
              <div
                className="px-3 py-3 text-center"
                style={{ background: "#EEF4FF", borderRadius: 10 }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: "#007AFF" }}>Pro</p>
                <p style={{ fontSize: 12, color: "#8E8E93", lineHeight: 1.4, marginTop: 4 }}>加密备份，附件打包</p>
              </div>
            </div>

            {backupDone ? (
              <div
                className="w-full flex items-center justify-center gap-2 rounded-xl mb-2"
                style={{ height: 50, background: "#EDFAF7" }}
              >
                <Check size={18} strokeWidth={2.5} style={{ color: "#34C759" }} />
                <span style={{ fontSize: 17, fontWeight: 600, color: "#34C759" }}>已导出到文件 App</span>
              </div>
            ) : (
              <button
                className="ios-tap w-full flex items-center justify-center rounded-xl mb-2"
                style={{ height: 50, background: "#34C759" }}
                onClick={() => setBackupDone(true)}
                aria-label="导出备份"
              >
                <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>导出备份</span>
              </button>
            )}
            <button
              className="ios-tap w-full flex items-center justify-center rounded-xl"
              style={{ height: 50, background: "#F2F2F7" }}
              onClick={() => { setShowBackupSheet(false); setBackupDone(false) }}
              aria-label="取消"
            >
              <span style={{ fontSize: 17, fontWeight: 600, color: "#000000" }}>取消</span>
            </button>
          </div>
        </div>
      )}

      {/* Backup restore confirmation */}
      {showBackupConfirm && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => setShowBackupConfirm(false)}
        >
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
          <div
            className="relative w-full rounded-t-3xl px-5 pt-2 pb-10"
            style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.18)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
            <div className="flex flex-col items-center text-center mb-5">
              <div
                className="flex items-center justify-center mb-3"
                style={{ width: 48, height: 48, borderRadius: 12, background: "#F0EBFF" }}
              >
                <RotateCcw size={22} strokeWidth={1.8} style={{ color: "#5856D6" }} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#000000" }}>恢复备份？</p>
              <p style={{ fontSize: 14, color: "#8E8E93", marginTop: 4 }}>恢复后将覆盖当前本地全部数据</p>
            </div>

            <div className="px-4 py-3 mb-3" style={{ background: "#F2F2F7", borderRadius: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>backup_2026-05-09.proofly</p>
              <p style={{ fontSize: 12, color: "#8E8E93", marginTop: 2 }}>46 条记录 · 38 个附件 · 备份于 2026-05-09</p>
            </div>

            <div
              className="flex items-start gap-2.5 px-4 py-3 mb-5"
              style={{ background: "#FFF0F0", borderRadius: 12 }}
            >
              <AlertCircle size={14} strokeWidth={2} style={{ color: "#FF3B30", flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 13, color: "#CC2200", lineHeight: 1.5 }}>
                恢复操作不可撤销。当前设备上的所有记录、对象、提醒和附件索引将被备份文件覆盖。建议先导出当前备份。
              </p>
            </div>

            <button
              className="ios-tap w-full flex items-center justify-center rounded-xl mb-2"
              style={{ height: 50, background: "#FF3B30" }}
              onClick={() => setShowBackupConfirm(false)}
              aria-label="确认恢复"
            >
              <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>确认恢复，覆盖当前数据</span>
            </button>
            <button
              className="ios-tap w-full flex items-center justify-center rounded-xl"
              style={{ height: 50, background: "#F2F2F7" }}
              onClick={() => setShowBackupConfirm(false)}
              aria-label="取消"
            >
              <span style={{ fontSize: 17, fontWeight: 600, color: "#000000" }}>取消</span>
            </button>
          </div>
        </div>
      )}

      {/* Trash sheet */}
      {showTrashSheet && (
        <SettingsInfoSheet onDismiss={() => setShowTrashSheet(false)} title="回收站">
          <p style={{ fontSize: 14, color: "#8E8E93", lineHeight: 1.5, paddingLeft: 20, paddingRight: 20 }}>
            回收站中的记录会在 30 天后自动永久删除。在此之前，您可以随时恢复它们。
          </p>
          <div className="px-4 mt-4">
            <div style={{ background: "#FFFFFF", borderRadius: 12, overflow: "hidden" }}>
              {["MacBook Pro 保修发票（已删除）", "2023 年体检报告（已删除）"].map((item, i, arr) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-4"
                  style={{ height: 44, borderBottom: i < arr.length - 1 ? "0.5px solid rgba(60,60,67,0.12)" : "none" }}
                >
                  <span style={{ fontSize: 15, color: "#000000" }}>{item}</span>
                  <button className="ios-tap" style={{ fontSize: 15, color: "#007AFF", fontWeight: 500 }}>恢复</button>
                </div>
              ))}
            </div>
          </div>
        </SettingsInfoSheet>
      )}

      {/* Privacy policy sheet */}
      {showPrivacySheet && (
        <SettingsInfoSheet onDismiss={() => setShowPrivacySheet(false)} title="隐私政策">
          <div className="px-5 flex flex-col gap-4">
            {[
              ["数据本地化", "所有数据仅存储在您的设备本地，不上传至任何服务器。"],
              ["不收集个人信息", "我们不收集您的姓名、手机号或任何可识别信息。"],
              ["无广告 SDK", "App 内不嵌入任何广告 SDK 或行为追踪代码。"],
              ["附件安全", "导入的 PDF 和图片仅保存于 App 沙盒，不被读取或分析。"],
            ].map(([title, body]) => (
              <div key={title}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#000000" }}>{title}</p>
                <p style={{ fontSize: 13, color: "#8E8E93", lineHeight: 1.5, marginTop: 2 }}>{body}</p>
              </div>
            ))}
          </div>
        </SettingsInfoSheet>
      )}

      {/* Disclaimer sheet */}
      {showDisclaimerSheet && (
        <SettingsInfoSheet onDismiss={() => setShowDisclaimerSheet(false)} title="免责声明">
          <p style={{ fontSize: 14, color: "#8E8E93", lineHeight: 1.6, paddingLeft: 20, paddingRight: 20 }}>
            Proofly 仅为个人资料整理工具，所生成的资料包不构成法律证明、税务凭证、保险理赔依据或任何正式法律文件。如需正式证明，请向相关机构申请原始文件。
          </p>
          <p style={{ fontSize: 14, color: "#8E8E93", lineHeight: 1.6, paddingLeft: 20, paddingRight: 20, marginTop: 12 }}>
            本 App 的任何功能不应被理解为专业法律、财务或医疗建议。
          </p>
        </SettingsInfoSheet>
      )}
    </div>
  )
}

function SettingsInfoSheet({
  title,
  children,
  onDismiss,
}: {
  title: string
  children: React.ReactNode
  onDismiss: () => void
}) {
  return (
    <div className="absolute inset-0 z-50 flex items-end" onClick={onDismiss}>
      <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.35)" }} />
      <div
        className="relative w-full rounded-t-3xl pt-2 pb-10"
        style={{ background: "#FFFFFF", boxShadow: "0 -4px 32px rgba(0,0,0,0.18)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-[#E5E5EA] mx-auto mb-5" />
        <p style={{ fontSize: 18, fontWeight: 700, color: "#000000", paddingLeft: 20, paddingRight: 20, marginBottom: 16 }}>{title}</p>
        {children}
        <div className="px-4 mt-5">
          {/* iOS-style dismiss — blue text button (no filled background) */}
          <button
            className="ios-tap w-full flex items-center justify-center rounded-xl"
            style={{ height: 50, background: "#F2F2F7" }}
            onClick={onDismiss}
            aria-label="关闭"
          >
            <span style={{ fontSize: 17, fontWeight: 600, color: "#007AFF" }}>关闭</span>
          </button>
        </div>
      </div>
    </div>
  )
}
