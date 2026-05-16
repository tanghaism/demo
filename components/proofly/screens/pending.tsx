"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, Check, CheckCircle2, ChevronRight } from "lucide-react";
import { AmbientBackground } from "@/components/proofly/ambient-background";
import { PremiumCard } from "@/components/proofly/premium-card";

interface PendingScreenProps {
  onBack: () => void;
  onSelectRecord: () => void;
}

interface PendingRecord {
  id: number;
  emoji: string;
  title: string;
  type: string;
  space: string;
  date: string;
  summary: string;
  size: string;
}

const pendingRecords: PendingRecord[] = [
  {
    id: 1,
    emoji: "🧾",
    title: "MacBook Pro 发票",
    type: "发票",
    space: "家庭资料箱",
    date: "2026-05-10",
    summary: "缺少标题、缺少标签",
    size: "3.2 MB",
  },
  {
    id: 2,
    emoji: "📄",
    title: "房屋租赁合同",
    type: "合同",
    space: "家庭资料箱",
    date: "2026-05-09",
    summary: "缺少关联对象",
    size: "1.8 MB",
  },
  {
    id: 3,
    emoji: "🖼",
    title: "receipt_photo.jpg",
    type: "收据",
    space: "经营资料箱",
    date: "2026-05-07",
    summary: "缺少类型、缺少标签",
    size: "2.1 MB",
  },
  {
    id: 4,
    emoji: "📎",
    title: "contract_draft.pdf",
    type: "PDF",
    space: "事业资料箱",
    date: "2026-05-03",
    summary: "手动标记待整理",
    size: "4.4 MB",
  },
];

export function PendingScreen({ onBack, onSelectRecord }: PendingScreenProps) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const visible = useMemo(
    () => pendingRecords.filter((record) => !dismissedIds.includes(record.id)),
    [dismissedIds],
  );

  const selectedCount = selectedIds.length;

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  const ignorePending = (ids: number[]) => {
    setDismissedIds((prev) => [...prev, ...ids]);
    setSelectedIds([]);
    setSelectionMode(false);
    triggerToast("已忽略所选记录");
  };

  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{ paddingTop: 54 }}
    >
      <AmbientBackground />

      <div className="relative z-10 flex items-center justify-between px-4 pt-2 pb-2.5">
        <button
          className="ios-tap flex items-center gap-1"
          style={{ minHeight: 44 }}
          onClick={onBack}
          aria-label="返回记录"
        >
          <ChevronLeft size={20} className="text-[#2563FF]" />
          <span className="text-[#2563FF]" style={{ fontSize: 16 }}>
            记录
          </span>
        </button>
        <h1
          className="font-semibold absolute left-1/2 -translate-x-1/2"
          style={{ fontSize: 17, color: "var(--premium-text)" }}
        >
          待整理
        </h1>
        <div className="flex items-center gap-2">
          {selectionMode ? (
            <button
              className="ios-tap px-2 py-2"
              onClick={() => {
                setSelectionMode(false);
                clearSelection();
              }}
              aria-label="取消选择"
            >
              <span
                className="font-medium text-[#2563FF]"
                style={{ fontSize: 16 }}
              >
                取消
              </span>
            </button>
          ) : (
            <button
              className="ios-tap px-2 py-2"
              onClick={() => setSelectionMode(true)}
              aria-label="选择"
            >
              <span
                className="font-medium text-[#2563FF]"
                style={{ fontSize: 16 }}
              >
                选择
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10 px-4 pt-3 pb-1">
        <p
          className="leading-snug"
          style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}
        >
          这里的每条都是一条记录，点开可进入记录详情；忽略只会把它们从待整理列表里移除，不会删除记录本身。
        </p>
      </div>

      <div className="relative z-10 px-4 py-2 flex items-center justify-between">
        <p style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}>
          {visible.length} 条待整理
        </p>
        {selectionMode && selectedCount > 0 && (
          <p style={{ fontSize: 13, color: "#4C6FFF" }}>
            已选 {selectedCount} 条
          </p>
        )}
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar px-4 pb-28">
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-16 gap-3">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "var(--premium-success-bg)" }}
            >
              <CheckCircle2
                size={32}
                className="text-[#14C8A8]"
                strokeWidth={1.5}
              />
            </div>
            <p
              className="font-semibold"
              style={{ fontSize: 17, color: "var(--premium-text)" }}
            >
              全部整理完毕
            </p>
            <p
              className="text-center"
              style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}
            >
              没有待整理的记录了
            </p>
          </div>
        ) : (
          <PremiumCard className="flex flex-col gap-0 rounded-[18px]">
            {visible.map((item, idx) => {
              const isSelected = selectedIds.includes(item.id);

              return (
                <button
                  key={item.id}
                  className="ios-tap premium-press w-full flex items-center px-4 py-3.5 text-left"
                  style={{
                    minHeight: 68,
                    borderBottom:
                      idx < visible.length - 1
                        ? "0.5px solid var(--premium-row-border)"
                        : "none",
                    background: isSelected
                      ? "var(--premium-surface-selected)"
                      : "transparent",
                  }}
                  onClick={() => {
                    if (selectionMode) {
                      toggleSelect(item.id);
                    } else {
                      onSelectRecord();
                    }
                  }}
                  aria-label={item.title}
                >
                  {selectionMode ? (
                    <div
                      className="flex items-center justify-center flex-shrink-0 mr-3"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 8,
                        background: isSelected
                          ? "var(--premium-chip-blue-bg)"
                          : "transparent",
                        border: isSelected
                          ? "1px solid rgba(76,111,255,0.28)"
                          : "1.5px solid var(--premium-row-border)",
                      }}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          strokeWidth={3}
                          style={{ color: "#4C6FFF" }}
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
                      style={{
                        background:
                          item.type === "PDF"
                            ? "var(--premium-danger-bg)"
                            : "var(--premium-icon-blue-bg)",
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{item.emoji}</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className="font-medium leading-snug"
                        style={{ fontSize: 15, color: "var(--premium-text)" }}
                      >
                        {item.title}
                      </p>
                      {!selectionMode && (
                        <ChevronRight
                          size={14}
                          strokeWidth={2}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: "var(--premium-chevron)" }}
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span
                        className="px-1.5 rounded font-medium"
                        style={{
                          fontSize: 10,
                          background: "var(--premium-chip-blue-bg)",
                          color: "#4C6FFF",
                          paddingTop: 1,
                          paddingBottom: 1,
                        }}
                      >
                        {item.type}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--premium-text-muted)",
                        }}
                      >
                        {item.space}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--premium-text-subtle)",
                        }}
                      >
                        {item.date}
                      </span>
                    </div>
                    <p
                      className="mt-0.5"
                      style={{
                        fontSize: 11,
                        color: "var(--premium-text-subtle)",
                      }}
                    >
                      {item.summary} · {item.size}
                    </p>
                  </div>
                </button>
              );
            })}
          </PremiumCard>
        )}
      </div>

      {selectionMode && (
        <div className="absolute bottom-8 left-4 right-4 z-50">
          <button
            className="ios-tap premium-press w-full rounded-2xl font-semibold"
            style={{
              height: 50,
              fontSize: 16,
              background:
                selectedCount > 0
                  ? "var(--premium-danger-button-bg)"
                  : "var(--premium-surface-soft)",
              color:
                selectedCount > 0
                  ? "var(--premium-danger-button-text)"
                  : "var(--premium-text-subtle)",
              border: "none",
              boxShadow:
                selectedCount > 0
                  ? "var(--premium-danger-button-shadow)"
                  : "var(--premium-action-shadow)",
            }}
            onClick={() => ignorePending(selectedIds)}
            disabled={selectedCount === 0}
          >
            {selectedCount > 0 ? `忽略所选 ${selectedCount} 条` : "忽略"}
          </button>
        </div>
      )}

      {toast && (
        <div
          className="absolute bottom-28 inset-x-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "#101828",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <CheckCircle2 size={16} className="text-[#14C8A8] flex-shrink-0" />
          <p className="text-white font-medium" style={{ fontSize: 14 }}>
            {toast}
          </p>
        </div>
      )}
    </div>
  );
}
