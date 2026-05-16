"use client";

import { useState } from "react";
import { X, ChevronRight, Check } from "lucide-react";
import { AmbientBackground } from "@/components/proofly/ambient-background";
import { PremiumCard } from "@/components/proofly/premium-card";

const EMOJI_OPTIONS = [
  "💻",
  "🏠",
  "👤",
  "📁",
  "🚗",
  "🏥",
  "🏢",
  "🎓",
  "🔧",
  "💰",
  "📋",
  "🛒",
  "❤️",
  "🌟",
  "📦",
  "🏡",
  "💼",
  "📱",
  "⌚",
  "🎯",
];

const OBJECT_TYPES = [
  { id: "item", emoji: "💻", label: "物品", desc: "设备、电器、高价值物品" },
  { id: "house", emoji: "🏠", label: "房屋", desc: "租住、自住、装修项目" },
  { id: "vehicle", emoji: "🚗", label: "车辆", desc: "保养、保险、年检" },
  { id: "client", emoji: "👤", label: "客户", desc: "自由职业、项目甲方" },
  { id: "project", emoji: "📁", label: "项目", desc: "设计项目、工作任务" },
  { id: "store", emoji: "🏢", label: "店铺", desc: "证照、租赁、经营资料" },
  { id: "family", emoji: "❤️", label: "家庭成员", desc: "健康档案、就医记录" },
  { id: "health", emoji: "🏥", label: "健康档案", desc: "体检、处方、疫苗" },
  { id: "cert", emoji: "🎓", label: "证书", desc: "职业资格、培训证书" },
  { id: "company", emoji: "💼", label: "公司", desc: "劳动合同、绩效、晋升" },
];

interface AddObjectProps {
  onClose: () => void;
  onSave: () => void;
}

export function AddObject({ onClose, onSave }: AddObjectProps) {
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("💻");
  const [selectedType, setSelectedType] = useState("item");
  const [showTypeSheet, setShowTypeSheet] = useState(false);
  const [showEmojiSheet, setShowEmojiSheet] = useState(false);

  const activeType = OBJECT_TYPES.find((t) => t.id === selectedType);

  const handleSave = () => {
    if (!name.trim()) return;
    onSave();
  };

  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{ paddingTop: 54 }}
    >
      <AmbientBackground />
      {/* Nav bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-2 pb-3">
        <button
          className="ios-tap px-2 flex items-center"
          style={{ minHeight: 44 }}
          onClick={onClose}
          aria-label="取消"
        >
          <span className="text-[#2563FF] font-medium" style={{ fontSize: 17 }}>
            取消
          </span>
        </button>
        <h1
          className="font-semibold"
          style={{ fontSize: 17, color: "var(--premium-text)" }}
        >
          添加对象
        </h1>
        <button
          className="ios-tap px-2 flex items-center"
          style={{ minHeight: 44 }}
          onClick={handleSave}
          aria-label="保存"
        >
          <span
            className="font-semibold"
            style={{
              fontSize: 17,
              color: name.trim() ? "#2563FF" : "var(--premium-chevron)",
            }}
          >
            保存
          </span>
        </button>
      </div>

      {/* Hint */}
      <div className="relative z-10 px-4 pt-2 pb-1">
        <p
          className="leading-snug"
          style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}
        >
          对象是人、物品、项目、房屋等主体，资料可以关联到对象上，方便按对象打包导出
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar pb-10">
        <div className="px-4 mt-3">
          <PremiumCard className="rounded-[18px]">
            {/* Name */}
            <div
              className="flex items-center px-4"
              style={{
                height: 56,
                borderBottom: "0.5px solid var(--premium-row-border)",
              }}
            >
              <span
                className="font-medium flex-shrink-0 mr-4"
                style={{
                  fontSize: 14,
                  width: 56,
                  color: "var(--premium-text-subtle)",
                }}
              >
                名称
              </span>
              <input
                className="flex-1 bg-transparent outline-none text-right"
                style={{ fontSize: 15, color: "var(--premium-text)" }}
                placeholder="例如：MacBook Pro、徐汇租房"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Type */}
            <button
              className="ios-tap w-full flex items-center px-4"
              style={{
                height: 56,
                borderBottom: "0.5px solid var(--premium-row-border)",
              }}
              onClick={() => setShowTypeSheet(true)}
            >
              <span
                className="font-medium flex-shrink-0 mr-4"
                style={{
                  fontSize: 14,
                  width: 56,
                  color: "var(--premium-text-subtle)",
                }}
              >
                类型
              </span>
              <div className="flex items-center gap-2 flex-1 justify-end">
                {activeType && (
                  <>
                    <span style={{ fontSize: 18 }}>{activeType.emoji}</span>
                    <span
                      style={{ fontSize: 15, color: "var(--premium-text)" }}
                    >
                      {activeType.label}
                    </span>
                  </>
                )}
                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  className="flex-shrink-0"
                  style={{ color: "var(--premium-chevron)" }}
                />
              </div>
            </button>

            {/* Icon */}
            <button
              className="ios-tap w-full flex items-center px-4"
              style={{ height: 56 }}
              onClick={() => setShowEmojiSheet(true)}
            >
              <span
                className="font-medium flex-shrink-0 mr-4"
                style={{
                  fontSize: 14,
                  width: 56,
                  color: "var(--premium-text-subtle)",
                }}
              >
                图标
              </span>
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--premium-icon-blue-bg)",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{selectedEmoji}</span>
                </div>
                <ChevronRight
                  size={16}
                  strokeWidth={2}
                  className="flex-shrink-0"
                  style={{ color: "var(--premium-chevron)" }}
                />
              </div>
            </button>
          </PremiumCard>
        </div>
      </div>

      {/* Type selector sheet */}
      {showTypeSheet && (
        <div
          className="absolute inset-0 z-50"
          onClick={() => setShowTypeSheet(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-8"
            style={{
              background: "var(--premium-surface)",
              boxShadow: "var(--premium-action-shadow)",
              maxHeight: "80%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-5"
              style={{ background: "var(--premium-row-border)" }}
            />
            <p
              className="font-bold px-5 mb-3"
              style={{ fontSize: 18, color: "var(--premium-text)" }}
            >
              选择类型
            </p>
            <div
              className="px-4 overflow-y-auto hide-scrollbar"
              style={{ maxHeight: "60vh" }}
            >
              {OBJECT_TYPES.map((type) => {
                const isActive = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    className="ios-tap w-full flex items-center px-4 py-3 rounded-xl mb-1"
                    style={{
                      background: isActive
                        ? "var(--premium-surface-selected)"
                        : "transparent",
                    }}
                    onClick={() => {
                      setSelectedType(type.id);
                      setSelectedEmoji(type.emoji);
                      setShowTypeSheet(false);
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0 mr-3"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: "var(--premium-icon-blue-bg)",
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{type.emoji}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p
                        className="font-medium"
                        style={{ fontSize: 15, color: "var(--premium-text)" }}
                      >
                        {type.label}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--premium-text-subtle)",
                        }}
                      >
                        {type.desc}
                      </p>
                    </div>
                    {isActive && (
                      <Check
                        size={18}
                        strokeWidth={2.5}
                        style={{ color: "#4C6FFF", flexShrink: 0 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Emoji picker sheet */}
      {showEmojiSheet && (
        <div
          className="absolute inset-0 z-50"
          onClick={() => setShowEmojiSheet(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-3xl pt-2 pb-8"
            style={{
              background: "var(--premium-surface)",
              boxShadow: "var(--premium-action-shadow)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-10 h-1 rounded-full mx-auto mb-4"
              style={{ background: "var(--premium-row-border)" }}
            />
            <p
              className="font-bold px-5 mb-3"
              style={{ fontSize: 18, color: "var(--premium-text)" }}
            >
              选择图标
            </p>
            <div className="grid grid-cols-5 gap-3 px-5">
              {EMOJI_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  className="ios-tap flex items-center justify-center rounded-xl"
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    fontSize: 28,
                    background:
                      selectedEmoji === emoji
                        ? "var(--premium-surface-selected)"
                        : "var(--premium-surface-soft)",
                    border:
                      selectedEmoji === emoji
                        ? "1.5px solid rgba(76,111,255,0.72)"
                        : "1px solid transparent",
                  }}
                  onClick={() => {
                    setSelectedEmoji(emoji);
                    setShowEmojiSheet(false);
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
