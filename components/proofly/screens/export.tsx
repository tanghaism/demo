"use client";

import { useState } from "react";
import { ChevronLeft, Archive, Check, FileText } from "lucide-react";
import { AmbientBackground } from "@/components/proofly/ambient-background";
import { PremiumCard } from "@/components/proofly/premium-card";

type ExportMode = "object" | "record" | "space";

interface ExportScreenProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
  mode?: ExportMode;
}

function ExportResultSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-0 z-[80] flex items-end" onClick={onClose}>
      <div
        className="absolute inset-0 premium-sheet-overlay"
        style={{ background: "var(--premium-overlay)" }}
      />
      <div
        className="relative w-full rounded-t-3xl pt-2 pb-8 premium-sheet-panel"
        style={{
          background: "var(--premium-surface)",
          boxShadow: "var(--premium-action-shadow)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="w-10 h-1 rounded-full mx-auto mb-5"
          style={{ background: "var(--premium-row-border)" }}
        />
        <div className="flex flex-col items-center text-center px-5 mb-5">
          <div
            className="flex items-center justify-center mb-3"
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "var(--premium-success-bg)",
            }}
          >
            <Check size={28} className="text-[#14C8A8]" strokeWidth={2.5} />
          </div>
          <p
            className="font-bold"
            style={{ fontSize: 18, color: "var(--premium-text)" }}
          >
            资料包已生成
          </p>
          <p
            className="mt-2 leading-snug"
            style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}
          >
            已保存到「文件」App 的 Proofly 文件夹，可分享或导出到其他设备。
          </p>
        </div>
        <div className="flex flex-col gap-2 px-4">
          <button
            className="ios-tap premium-press w-full rounded-2xl font-semibold text-white"
            style={{
              height: 50,
              fontSize: 17,
              background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
            }}
            onClick={onClose}
          >
            分享资料包
          </button>
          <button
            className="ios-tap w-full rounded-2xl font-semibold"
            style={{
              height: 50,
              fontSize: 17,
              background: "var(--premium-surface-soft)",
              color: "var(--premium-text)",
            }}
            onClick={onClose}
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExportScreen({
  onBack,
  onNavigate,
  mode = "object",
}: ExportScreenProps) {
  const [tier, setTier] = useState<"free" | "pro">("free");
  const [showFreePreview, setShowFreePreview] = useState(false);
  const [showGenerated, setShowGenerated] = useState(false);

  const title = "导出资料包";

  const scopeInfo =
    mode === "record"
      ? {
          emoji: "📄",
          label: "当前记录",
          sub: "单条记录 · 3 个附件",
          records: 1,
          attachments: 3,
          events: 0,
        }
      : mode === "space"
        ? {
            emoji: "🏠",
            label: "家庭资料箱",
            sub: "整个资料箱 · 46 条记录",
            records: 46,
            attachments: 67,
            events: 12,
          }
        : {
            emoji: "💻",
            label: "MacBook Pro 14",
            sub: "对象 · 3 条记录",
            records: 3,
            attachments: 5,
            events: 4,
          };

  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{ paddingTop: 54 }}
    >
      <AmbientBackground />
      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-2 pb-3">
        <button
          className="ios-tap flex items-center gap-0.5"
          style={{ minHeight: 44 }}
          onClick={onBack}
          aria-label="返回"
        >
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>
            返回
          </span>
        </button>
        <h1
          className="font-semibold"
          style={{ fontSize: 17, color: "var(--premium-text)" }}
        >
          {title}
        </h1>
        <button
          className="ios-tap px-2.5 py-1 rounded-lg font-medium"
          style={{
            fontSize: 12,
            background:
              tier === "pro"
                ? "var(--premium-chip-blue-bg)"
                : "var(--premium-icon-indigo-bg)",
            color: tier === "pro" ? "#4C6FFF" : "#7C5CFF",
          }}
          onClick={() => setTier(tier === "free" ? "pro" : "free")}
          aria-label="切换免费/Pro状态"
        >
          {tier === "free" ? "免费版" : "Pro"}
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-28">
        {/* Scope — fixed display (not selectable for record/object), selectable for space */}
        <div className="px-4 mt-4 mb-3">
          <p
            className="font-medium px-1 mb-1.5"
            style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}
          >
            导出范围
          </p>
          <PremiumCard className="rounded-[18px]">
            <div className="flex items-center px-4 py-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
                style={{ background: "var(--premium-icon-blue-bg)" }}
              >
                <span style={{ fontSize: 20 }}>{scopeInfo.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold"
                  style={{ fontSize: 15, color: "var(--premium-text)" }}
                >
                  {scopeInfo.label}
                </p>
                <p
                  style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}
                >
                  {scopeInfo.sub}
                </p>
              </div>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{
                  background: "var(--premium-chip-blue-bg)",
                  border: "1px solid rgba(76,111,255,0.28)",
                }}
              >
                <Check size={11} strokeWidth={3} style={{ color: "#4C6FFF" }} />
              </div>
            </div>
          </PremiumCard>
        </div>

        {/* ZIP contents preview */}
        <div className="px-4 mb-3">
          <p
            className="font-medium px-1 mb-1.5"
            style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}
          >
            ZIP 包含内容
          </p>
          <PremiumCard className="rounded-[18px] p-4">
            <div className="grid grid-cols-3 gap-3 mb-3">
              {[
                { label: "记录", value: scopeInfo.records },
                { label: "附件", value: scopeInfo.attachments },
                { label: "事件", value: scopeInfo.events },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="font-bold text-[#2563FF]"
                    style={{ fontSize: 22 }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{ fontSize: 12, color: "var(--premium-text-muted)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="pt-3 flex flex-col gap-2"
              style={{ borderTop: "0.5px solid var(--premium-row-border)" }}
            >
              <div className="flex items-center gap-2">
                <FileText size={14} className="text-[#FF3B30] flex-shrink-0" />
                <span
                  style={{ fontSize: 12, color: "var(--premium-text-muted)" }}
                >
                  摘要 PDF（记录字段 + 事件时间线）
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Archive size={14} className="text-[#FF9500] flex-shrink-0" />
                <span
                  style={{ fontSize: 12, color: "var(--premium-text-muted)" }}
                >
                  原始附件（图片、PDF、各类文件）
                </span>
              </div>
            </div>
            <div
              className="pt-3"
              style={{ borderTop: "0.5px solid var(--premium-row-border)" }}
            >
              <p
                className="text-center"
                style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}
              >
                预计大小：约 12 MB
              </p>
            </div>
          </PremiumCard>
        </div>

        {/* Disclaimer */}
        <div className="px-4">
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{ background: "var(--premium-warning-bg)" }}
          >
            <span style={{ fontSize: 15 }}>💡</span>
            <p
              className="leading-relaxed"
              style={{ fontSize: 12, color: "var(--premium-warning-text)" }}
            >
              资料包仅用于资料整理和留存，不提供法律、税务、保险或劳动仲裁结论。导出的
              ZIP 文件可在其他设备上解压查看。
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-7 pt-3"
        style={{
          background: "var(--premium-surface)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderTop: "0.5px solid var(--premium-row-border)",
        }}
      >
        {tier === "free" ? (
          <div className="flex flex-col gap-2">
            <button
              className="ios-tap premium-press w-full rounded-2xl font-semibold"
              style={{
                height: 50,
                fontSize: 17,
                background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
                color: "#FFFFFF",
              }}
              onClick={() => setShowFreePreview(true)}
            >
              预览资料包
            </button>
            <button
              className="ios-tap w-full rounded-2xl font-semibold"
              style={{
                height: 50,
                fontSize: 17,
                background: "var(--premium-warning-button-bg)",
                color: "var(--premium-warning-button-text)",
                border: "none",
                boxShadow: "var(--premium-warning-button-shadow)",
              }}
              onClick={() => onNavigate("pro-upgrade")}
            >
              升级 Pro 解锁导出
            </button>
          </div>
        ) : (
          <button
            className="ios-tap premium-press w-full flex items-center justify-center gap-2 rounded-2xl font-semibold text-white"
            style={{
              height: 50,
              fontSize: 17,
              background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
            }}
            onClick={() => setShowGenerated(true)}
          >
            <Archive size={18} />
            导出资料包
          </button>
        )}
      </div>

      {/* Free preview sheet */}
      {showFreePreview && (
        <div
          className="absolute inset-0 z-[80] flex items-end"
          onClick={() => setShowFreePreview(false)}
        >
          <div
            className="absolute inset-0 premium-sheet-overlay"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="relative w-full rounded-t-3xl pt-2 pb-8 premium-sheet-panel"
            style={{
              background: "var(--premium-surface)",
              boxShadow: "var(--premium-action-shadow)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-5"
              style={{ background: "var(--premium-row-border)" }}
            />
            <div className="flex flex-col items-center text-center px-5 mb-5">
              <div
                className="flex items-center justify-center mb-3"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "var(--premium-icon-blue-bg)",
                }}
              >
                <Archive size={22} className="text-[#2563FF]" />
              </div>
              <p
                className="font-bold"
                style={{ fontSize: 18, color: "var(--premium-text)" }}
              >
                预览资料包
              </p>
              <p
                className="mt-2 leading-snug"
                style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}
              >
                免费版可预览 ZIP 文件结构，正式导出需要升级 Pro。
              </p>
              <div
                className="w-full mt-4 rounded-xl p-4 text-left"
                style={{ background: "var(--premium-surface-soft)" }}
              >
                <p
                  className="font-medium mb-2"
                  style={{ fontSize: 13, color: "var(--premium-text)" }}
                >
                  📁 {scopeInfo.label}.zip
                </p>
                <div className="flex flex-col gap-1">
                  {[
                    "├── summary.pdf",
                    "├── macbook_invoice.pdf",
                    "├── IMG_60512.jpg",
                    "├── IMG_60511.MOV",
                    "└── warranty_card.pdf",
                  ].map((f) => (
                    <p
                      key={f}
                      className="font-mono"
                      style={{
                        fontSize: 12,
                        paddingLeft: 4,
                        color: "var(--premium-text-subtle)",
                      }}
                    >
                      {f}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button
                className="ios-tap premium-press w-full rounded-2xl font-semibold text-white"
                style={{
                  height: 50,
                  fontSize: 17,
                  background:
                    "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
                }}
                onClick={() => {
                  setShowFreePreview(false);
                  onNavigate("pro-upgrade");
                }}
              >
                升级 Pro 解锁导出
              </button>
              <button
                className="ios-tap w-full rounded-2xl font-semibold"
                style={{
                  height: 50,
                  fontSize: 17,
                  background: "var(--premium-surface-soft)",
                  color: "var(--premium-text)",
                }}
                onClick={() => setShowFreePreview(false)}
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated result sheet */}
      {showGenerated && (
        <ExportResultSheet onClose={() => setShowGenerated(false)} />
      )}
    </div>
  );
}
