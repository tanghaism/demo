"use client"

import { useState } from "react"
import {
  ChevronRight, HardDrive, Shield, Lock, Fingerprint,
  Trash2, RotateCcw, FileDown, Star, AlertCircle, Check,
} from "lucide-react"
import { AmbientBackground } from "@/components/proofly/ambient-background"

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
  iconColor = "#4C6FFF",
  iconBg = "var(--premium-icon-blue-bg)",
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
          borderBottom: isLast ? "none" : "0.5px solid var(--premium-row-border)",
        }}
      >
        <span
          className="flex-1 text-left"
          style={{ fontSize: 16, color: danger ? "#FF3B30" : "var(--premium-text)" }}
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
          <span style={{ fontSize: 16, color: "var(--premium-text-subtle)", marginRight: 6 }}>{value}</span>
        )}
        {onClick && <ChevronRight size={16} strokeWidth={2} style={{ color: "var(--premium-chevron)", flexShrink: 0 }} />}
      </div>
    </button>
  )
}

function SettingToggle({
  icon: Icon,
  label,
  iconColor = "#4C6FFF",
  iconBg = "var(--premium-icon-blue-bg)",
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
          borderBottom: isLast ? "none" : "0.5px solid var(--premium-row-border)",
        }}
      >
        <span className="flex-1 text-left" style={{ fontSize: 16, color: "var(--premium-text)" }}>{label}</span>
        {/* iOS toggle — 51×31 */}
        <div
          className="relative flex-shrink-0"
          style={{ width: 51, height: 31 }}
        >
          <div
            className="w-full h-full rounded-full transition-colors duration-200"
            style={{ background: on ? "#34C759" : "var(--premium-toggle-off)" }}
          />
          <div
            className="absolute top-0.5 rounded-full shadow-md transition-all duration-200"
            style={{
              width: 27,
              height: 27,
              left: on ? 22 : 2,
              background: "var(--premium-toggle-thumb)",
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
  const [backupDone, setBackupDone] = useState(false)
  const [restoreStep, setRestoreStep] = useState<"picker" | "faceid" | "confirm" | null>(null)
  const [proExpired] = useState(false)
  const [showTrashSheet, setShowTrashSheet] = useState(false)
  const [showPrivacySheet, setShowPrivacySheet] = useState(false)
  const [showDisclaimerSheet, setShowDisclaimerSheet] = useState(false)

  return (
    <div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
      <AmbientBackground />

      {/* iOS Large Title */}
      <div className="relative z-10 px-4 pt-3 pb-1">
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5, color: "var(--premium-text)" }}>设置</h1>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-24">

        {/* Subscription card */}
        <div className="px-4 mb-3">
          {proExpired ? (
            <div
              className="flex items-start gap-3 px-4 py-3"
              style={{ background: "var(--premium-warning-bg)", borderRadius: 12, overflow: "hidden" }}
            >
              <AlertCircle size={16} strokeWidth={2} style={{ color: "#FF9500", marginTop: 1, flexShrink: 0 }} />
              <div className="flex-1">
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--premium-warning-text)" }}>Pro 订阅已到期</p>
                <p style={{ fontSize: 12, color: "var(--premium-warning-text)", lineHeight: 1.4, marginTop: 2 }}>
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
              className="ios-tap premium-press w-full px-4 py-4 text-left relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
                borderRadius: 18,
                boxShadow: "0 18px 36px rgba(76,111,255,0.22)",
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
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#4C6FFF" }}>开通 Pro</span>
                </div>
              </div>
            </button>
          )}
        </div>

        {/* Local data */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 12 }}>本地数据</p>
        <div className="px-4 mb-3">
          <div className="premium-glass" style={{ borderRadius: 16, overflow: "hidden" }}>
            <SettingRow
              icon={HardDrive}
              label="本地存储占用"
              value="42.6 MB"
              iconBg="var(--premium-icon-blue-bg)"
              iconColor="#4C6FFF"
            />
            <SettingRow
              icon={FileDown}
              label="备份导出"
              onClick={() => setShowBackupSheet(true)}
              iconBg="var(--premium-success-bg)"
              iconColor="#34C759"
            />
            <SettingRow
              icon={RotateCcw}
              label="备份恢复"
              onClick={() => setRestoreStep("picker")}
              iconBg="var(--premium-icon-indigo-bg)"
              iconColor="#5856D6"
            />
            <SettingRow
              icon={Trash2}
              label="回收站"
              value="2 条"
              onClick={() => setShowTrashSheet(true)}
              iconBg="var(--premium-danger-bg)"
              iconColor="#FF3B30"
              isLast
            />
          </div>
        </div>

        {/* Security */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 12 }}>本地安全</p>
        <div className="px-4 mb-3">
          <div className="premium-glass" style={{ borderRadius: 16, overflow: "hidden" }}>
            <SettingToggle icon={Lock} label="App 本地密码锁" iconBg="var(--premium-icon-indigo-bg)" iconColor="#5856D6" />
            <SettingToggle icon={Fingerprint} label="Face ID / Touch ID" iconBg="var(--premium-icon-blue-bg)" iconColor="#4C6FFF" defaultOn isLast />
          </div>
        </div>

        {/* Content management */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 12 }}>内容管理</p>
        <div className="px-4 mb-3">
          <div className="premium-glass" style={{ borderRadius: 16, overflow: "hidden" }}>
            <SettingRow
              icon={() => <span style={{ fontSize: 14 }}>📋</span>}
              label="模板管理"
              badge="Pro"
              onClick={() => onNavigate("templates")}
              iconBg="var(--premium-icon-neutral-bg)"
              iconColor="#8E8E93"
              isLast
            />
          </div>
        </div>

        {/* Privacy */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 12 }}>隐私</p>
        <div className="px-4 mb-3">
          <div className="premium-glass" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div className="flex items-start px-4 py-3.5">
              <div
                className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5"
                style={{ width: 29, height: 29, borderRadius: 7, background: "var(--premium-success-bg)" }}
              >
                <span style={{ fontSize: 14 }}>🔒</span>
              </div>
              <div
                className="flex-1 pb-3.5"
                style={{ borderBottom: "0.5px solid var(--premium-row-border)" }}
              >
                <p style={{ fontSize: 15, fontWeight: 600, color: "var(--premium-text)" }}>本地保存，不上传资料</p>
                <p style={{ fontSize: 13, color: "var(--premium-text-subtle)", lineHeight: 1.5, marginTop: 2 }}>
                  所有资料仅保存在您的 iPhone 上，不上传至任何服务器，不接入广告 SDK。
                </p>
              </div>
            </div>
            <SettingRow
              icon={Shield}
              label="隐私政策"
              onClick={() => setShowPrivacySheet(true)}
              iconBg="var(--premium-success-bg)"
              iconColor="#34C759"
              isLast
            />
          </div>
        </div>

        {/* About */}
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "var(--premium-text-muted)", textTransform: "uppercase", paddingLeft: 20, paddingBottom: 6, paddingTop: 12 }}>关于</p>
        <div className="px-4 mb-3">
          <div className="premium-glass" style={{ borderRadius: 16, overflow: "hidden" }}>
            <div className="flex items-center justify-between px-4" style={{ height: 44, borderBottom: "0.5px solid var(--premium-row-border)" }}>
              <span style={{ fontSize: 16, color: "var(--premium-text)" }}>Proofly</span>
              <span style={{ fontSize: 16, color: "var(--premium-text-subtle)" }}>v1.0.0</span>
            </div>
            <SettingRow
              icon={() => <span style={{ fontSize: 14 }}>📄</span>}
              label="免责声明"
              onClick={() => setShowDisclaimerSheet(true)}
              iconBg="var(--premium-icon-neutral-bg)"
              iconColor="#8E8E93"
              isLast
            />
          </div>
        </div>

        <p className="text-center pb-6" style={{ fontSize: 12, color: "var(--premium-text-subtle)", paddingTop: 8, paddingLeft: 24, paddingRight: 24, lineHeight: 1.5 }}>
          资料包仅用于整理和留存，不提供法律、税务或保险结论
        </p>
      </div>

      {/* Backup export sheet */}
      {showBackupSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => { setShowBackupSheet(false); setBackupDone(false) }}
        >
          <div className="absolute inset-0" style={{ background: "var(--premium-overlay)" }} />
          <div
            className="relative w-full rounded-t-3xl px-5 pt-2 pb-10"
            style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--premium-row-border)" }} />
            <div className="flex flex-col items-center text-center mb-5">
              <div
                className="flex items-center justify-center mb-3"
                style={{ width: 48, height: 48, borderRadius: 12, background: "var(--premium-success-bg)" }}
              >
                <FileDown size={22} strokeWidth={1.8} style={{ color: "#34C759" }} />
              </div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "var(--premium-text)" }}>导出加密备份</p>
              <p style={{ fontSize: 14, color: "var(--premium-text-subtle)", marginTop: 4 }}>备份文件加密保存，需密码或 Face ID 才能恢复</p>
            </div>

            <div className="px-4 py-3.5 mb-4" style={{ background: "var(--premium-surface-soft)", borderRadius: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--premium-text)", marginBottom: 8 }}>备份内容</p>
              {["空间设置和元数据", "所有记录和附件索引", "对象和关联关系", "提醒设置", "自定义模板"].map((item) => (
                <div key={item} className="flex items-center gap-2 py-1">
                  <Check size={13} strokeWidth={2.5} style={{ color: "#34C759", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="mb-5 mx-4 flex items-start gap-3 px-4 py-3 rounded-xl" style={{ background: "var(--premium-success-bg)", border: "0.5px solid var(--premium-success-border)" }}>
              <Fingerprint size={14} strokeWidth={2} style={{ color: "#14C8A8", flexShrink: 0, marginTop: 1 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--premium-success-text)" }}>加密保护</p>
                <p style={{ fontSize: 12, color: "var(--premium-success-text)", opacity: 0.78, marginTop: 2, lineHeight: 1.4 }}>
                  备份文件以 .proofly-backup 格式保存，使用 Face ID 和密码双重加密，无法在外部直接查看。
                </p>
              </div>
            </div>

            {backupDone ? (
              <div className="w-full flex items-center justify-center gap-2 rounded-xl mb-2" style={{ height: 50, background: "var(--premium-success-bg)" }}>
                <Check size={18} strokeWidth={2.5} style={{ color: "#14C8A8" }} />
                <span style={{ fontSize: 17, fontWeight: 600, color: "#14C8A8" }}>已导出到文件 App</span>
              </div>
            ) : (
              <button className="ios-tap w-full flex items-center justify-center rounded-xl mb-2" style={{ height: 50, background: "#2563FF" }} onClick={() => setBackupDone(true)} aria-label="导出加密备份">
                <span style={{ fontSize: 17, fontWeight: 600, color: "#FFFFFF" }}>导出加密备份</span>
              </button>
            )}
            <button
              className="ios-tap w-full flex items-center justify-center rounded-xl"
              style={{ height: 50, background: "var(--premium-surface-soft)" }}
              onClick={() => { setShowBackupSheet(false); setBackupDone(false) }}
              aria-label="取消"
            >
              <span style={{ fontSize: 17, fontWeight: 600, color: "var(--premium-text)" }}>取消</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Backup restore: multi-step flow ── */}
      {restoreStep && (
        <div className="absolute inset-0 z-50 flex items-end" onClick={() => setRestoreStep(null)}>
          <div className="absolute inset-0" style={{ background: "var(--premium-overlay)" }} />
          <div className="relative w-full rounded-t-3xl pt-2 pb-8" style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)" }} onClick={(e) => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--premium-row-border)" }} />

            {/* Step 1: File picker */}
            {restoreStep === "picker" && (
              <>
                <p className="font-bold px-5 mb-4" style={{ fontSize: 18, color: "var(--premium-text)" }}>选择备份文件</p>
                <p className="px-5 mb-4 leading-snug" style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}>从「文件」App 中选择 .proofly-backup 格式的备份文件</p>
                <div className="px-4 flex flex-col gap-2 mb-2">
                  {[
                    { name: "backup_2026-05-09.proofly-backup", date: "2026-05-09", size: "42.6 MB", records: 46, attachments: 38 },
                    { name: "backup_2026-04-15.proofly-backup", date: "2026-04-15", size: "38.2 MB", records: 41, attachments: 32 },
                  ].map((f) => (
                    <button key={f.name} className="ios-tap w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left" style={{ background: "var(--premium-surface-soft)" }} onClick={() => setRestoreStep("faceid")} aria-label={f.name}>
                      <div className="flex items-center justify-center flex-shrink-0" style={{ width: 40, height: 40, borderRadius: 10, background: "var(--premium-icon-indigo-bg)" }}>
                        <RotateCcw size={18} strokeWidth={1.8} style={{ color: "#7C5CFF" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate" style={{ fontSize: 14, color: "var(--premium-text)" }}>{f.name}</p>
                        <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>{f.records} 条记录 · {f.attachments} 个附件 · {f.size} · {f.date}</p>
                      </div>
                      <span style={{ fontSize: 12, color: "#2563FF", fontWeight: 500 }}>选择</span>
                    </button>
                  ))}
                </div>
                <div className="px-4 mb-2">
                  <button className="ios-tap w-full flex items-center justify-center gap-2 rounded-xl py-3" style={{ border: "1.5px dashed var(--premium-row-border)" }} aria-label="浏览文件">
                    <span style={{ fontSize: 15, color: "#2563FF", fontWeight: 500 }}>📁 浏览「文件」App</span>
                  </button>
                </div>
                <div className="px-4"><button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }} onClick={() => setRestoreStep(null)}>取消</button></div>
              </>
            )}

            {/* Step 2: Face ID verification */}
            {restoreStep === "faceid" && (
              <>
                <div className="flex flex-col items-center text-center px-5 mb-5">
                  <div className="flex items-center justify-center mb-4" style={{ width: 64, height: 64, borderRadius: 20, background: "var(--premium-success-bg)" }}>
                    <Fingerprint size={32} strokeWidth={1.5} style={{ color: "#14C8A8" }} />
                  </div>
                  <p className="font-bold" style={{ fontSize: 18, color: "var(--premium-text)" }}>验证身份</p>
                  <p className="mt-2 leading-snug" style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}>备份文件已加密，需要使用 Face ID 或输入备份密码来解密</p>
                </div>
                <div className="px-4 mb-4">
                  <div className="rounded-2xl overflow-hidden" style={{ background: "var(--premium-surface-soft)", border: "0.5px solid var(--premium-row-border)" }}>
                    <button className="ios-tap w-full flex items-center justify-between px-4 py-4" style={{ borderBottom: "0.5px solid var(--premium-row-border)" }} onClick={() => setRestoreStep("confirm")}>
                      <span className="font-medium" style={{ fontSize: 15, color: "var(--premium-text)" }}>使用 Face ID</span>
                      <Fingerprint size={16} style={{ color: "#14C8A8" }} />
                    </button>
                    <div className="flex items-center px-4" style={{ height: 48 }}>
                      <span className="font-medium" style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>备份密码</span>
                      <input className="flex-1 bg-transparent outline-none text-right" style={{ fontSize: 14, color: "var(--premium-text)" }} placeholder="输入备份密码" type="password" />
                    </div>
                  </div>
                </div>
                <div className="px-4"><button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }} onClick={() => setRestoreStep("picker")}>返回</button></div>
              </>
            )}

            {/* Step 3: Confirm restore */}
            {restoreStep === "confirm" && (
              <>
                <div className="flex flex-col items-center text-center px-5 mb-5">
                  <div className="flex items-center justify-center mb-3" style={{ width: 48, height: 48, borderRadius: 12, background: "var(--premium-icon-indigo-bg)" }}>
                    <RotateCcw size={22} strokeWidth={1.8} style={{ color: "#7C5CFF" }} />
                  </div>
                  <p className="font-bold" style={{ fontSize: 18, color: "var(--premium-text)" }}>确认恢复备份</p>
                  <p className="mt-1.5 leading-snug" style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}>解密成功，即将从以下备份恢复数据</p>
                </div>
                <div className="px-4 py-3 mb-3 mx-4" style={{ background: "var(--premium-surface-soft)", borderRadius: 12 }}>
                  <p className="font-semibold" style={{ fontSize: 14, color: "var(--premium-text)" }}>backup_2026-05-09.proofly-backup</p>
                  <p className="mt-1" style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>46 条记录 · 38 个附件 · 3 个空间 · 2026-05-09</p>
                </div>
                <div className="mb-3 mx-4 flex items-start gap-2.5 px-4 py-3" style={{ background: "var(--premium-danger-bg)", borderRadius: 12 }}>
                  <AlertCircle size={14} strokeWidth={2} style={{ color: "#FF3B30", flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p className="font-semibold text-[#FF3B30]" style={{ fontSize: 13 }}>此操作不可撤销</p>
                    <p className="mt-0.5 leading-snug" style={{ fontSize: 12, color: "var(--premium-danger-text)" }}>当前设备上的所有数据将被备份文件覆盖。建议先导出当前备份。</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-4">
                  <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "#FF3B30", color: "#FFFFFF" }} onClick={() => setRestoreStep(null)}>确认恢复，覆盖当前数据</button>
                  <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "var(--premium-surface-soft)", color: "#2563FF" }} onClick={() => setRestoreStep(null)}>先导出当前备份</button>
                  <button className="ios-tap w-full rounded-2xl font-semibold" style={{ height: 50, fontSize: 17, background: "var(--premium-surface-soft)", color: "var(--premium-text)" }} onClick={() => setRestoreStep(null)}>取消</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Trash sheet */}
      {showTrashSheet && (
        <SettingsInfoSheet onDismiss={() => setShowTrashSheet(false)} title="回收站">
          <p style={{ fontSize: 14, color: "var(--premium-text-subtle)", lineHeight: 1.5, paddingLeft: 20, paddingRight: 20 }}>
            回收站中的记录会在 30 天后自动永久删除。在此之前，您可以随时恢复它们。
          </p>
          <div className="px-4 mt-4">
            <div style={{ background: "var(--premium-surface-soft)", borderRadius: 12, overflow: "hidden" }}>
              {["MacBook Pro 保修发票（已删除）", "2023 年体检报告（已删除）"].map((item, i, arr) => (
                <div
                  key={item}
                  className="flex items-center justify-between px-4"
                  style={{ height: 44, borderBottom: i < arr.length - 1 ? "0.5px solid var(--premium-row-border)" : "none" }}
                >
                  <span style={{ fontSize: 15, color: "var(--premium-text)" }}>{item}</span>
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
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--premium-text)" }}>{title}</p>
                <p style={{ fontSize: 13, color: "var(--premium-text-subtle)", lineHeight: 1.5, marginTop: 2 }}>{body}</p>
              </div>
            ))}
          </div>
        </SettingsInfoSheet>
      )}

      {/* Disclaimer sheet */}
      {showDisclaimerSheet && (
        <SettingsInfoSheet onDismiss={() => setShowDisclaimerSheet(false)} title="免责声明">
          <p style={{ fontSize: 14, color: "var(--premium-text-subtle)", lineHeight: 1.6, paddingLeft: 20, paddingRight: 20 }}>
            Proofly 仅为个人资料整理工具，所生成的资料包不构成法律证明、税务凭证、保险理赔依据或任何正式法律文件。如需正式证明，请向相关机构申请原始文件。
          </p>
          <p style={{ fontSize: 14, color: "var(--premium-text-subtle)", lineHeight: 1.6, paddingLeft: 20, paddingRight: 20, marginTop: 12 }}>
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
      <div className="absolute inset-0" style={{ background: "var(--premium-overlay)" }} />
      <div
        className="relative w-full rounded-t-3xl pt-2 pb-10"
        style={{ background: "var(--premium-surface)", boxShadow: "var(--premium-action-shadow)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full mx-auto mb-5" style={{ background: "var(--premium-row-border)" }} />
        <p style={{ fontSize: 18, fontWeight: 700, color: "var(--premium-text)", paddingLeft: 20, paddingRight: 20, marginBottom: 16 }}>{title}</p>
        {children}
        <div className="px-4 mt-5">
          {/* iOS-style dismiss — blue text button (no filled background) */}
          <button
            className="ios-tap w-full flex items-center justify-center rounded-xl"
            style={{ height: 50, background: "var(--premium-surface-soft)" }}
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
