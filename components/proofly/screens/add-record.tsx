"use client";

import { useState } from "react";
import {
  X,
  Camera,
  FolderUp,
  ChevronDown,
  Layers,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  PlusCircle,
  Check,
} from "lucide-react";
import { AmbientBackground } from "@/components/proofly/ambient-background";

interface AddRecordProps {
  onClose: () => void;
  onSave: () => void;
  isEditing?: boolean;
}

type SaveResult = "success" | "batch-partial" | null;

export function AddRecord({
  onClose,
  onSave,
  isEditing = false,
}: AddRecordProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveResult>(null);
  const [cameraBlocked, setCameraBlocked] = useState(false);
  const [text, setText] = useState("");
  const [targetSpace, setTargetSpace] = useState("家庭资料箱");
  const [showPhotoSheet, setShowPhotoSheet] = useState(false);
  const [showSpaceSheet, setShowSpaceSheet] = useState(false);
  const [showObjectSheet, setShowObjectSheet] = useState(false);
  const [showReminderSheet, setShowReminderSheet] = useState(false);
  const [reminderType, setReminderType] = useState("保修到期");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderAdvance, setReminderAdvance] = useState("7");
  const [customReminderName, setCustomReminderName] = useState("");
  const [selectedObject, setSelectedObject] = useState("");

  const handleSave = () => {
    setSaveResult("success");
    setTimeout(() => {
      setSaveResult(null);
      onSave();
    }, 1600);
  };

  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{ paddingTop: 54 }}
    >
      <AmbientBackground />
      {/* ── Nav bar ── */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-2 pb-3">
        <button
          className="ios-tap flex items-center"
          style={{ minHeight: 44, minWidth: 60 }}
          onClick={onClose}
          aria-label="取消"
        >
          <span className="text-[#2563FF] font-medium" style={{ fontSize: 17 }}>
            取消
          </span>
        </button>
        <h1
          className="font-semibold text-center"
          style={{ fontSize: 17, color: "var(--premium-text)" }}
        >
          添加记录
        </h1>
        <button
          className="ios-tap flex items-center justify-end"
          style={{ minHeight: 44, minWidth: 60 }}
          onClick={handleSave}
          aria-label="保存"
        >
          <span
            className="font-semibold"
            style={{ fontSize: 17, color: "#2563FF" }}
          >
            保存
          </span>
        </button>
      </div>

      {/* ── Space indicator ── */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className="font-medium"
            style={{ fontSize: 13, color: "var(--premium-text-subtle)" }}
          >
            添加到
          </span>
          <span
            className="font-semibold"
            style={{ fontSize: 13, color: "var(--premium-text)" }}
          >
            🏠 {targetSpace}
          </span>
        </div>
        {!isEditing && (
          <button
            className="ios-tap flex items-center gap-1 rounded-lg px-2.5 py-1.5"
            style={{ background: "var(--premium-chip-blue-bg)" }}
            onClick={() => setShowSpaceSheet(true)}
            aria-label="切换资料箱"
          >
            <Layers size={12} strokeWidth={2} style={{ color: "#2563FF" }} />
            <span
              className="font-medium text-[#2563FF]"
              style={{ fontSize: 12 }}
            >
              切换
            </span>
          </button>
        )}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 overflow-y-auto hide-scrollbar">
        <div className="px-4 flex flex-col gap-3">
          {/* Add photo + file — side by side */}
          <div className="flex gap-3">
            <button
              className="ios-tap premium-press premium-glass rounded-2xl flex flex-col items-center gap-2 py-4 flex-1"
              onClick={() => setShowPhotoSheet(true)}
              aria-label="添加照片"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--premium-success-bg)",
                }}
              >
                <Camera
                  size={22}
                  strokeWidth={1.6}
                  style={{ color: "#14C8A8" }}
                />
              </div>
              <span
                className="font-medium"
                style={{ fontSize: 13, color: "var(--premium-text)" }}
              >
                添加照片
              </span>
            </button>
            <button
              className="ios-tap premium-press premium-glass rounded-2xl flex flex-col items-center gap-2 py-4 flex-1"
              aria-label="添加文件"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "var(--premium-icon-indigo-bg)",
                }}
              >
                <FolderUp
                  size={22}
                  strokeWidth={1.6}
                  style={{ color: "#7C5CFF" }}
                />
              </div>
              <span
                className="font-medium"
                style={{ fontSize: 13, color: "var(--premium-text)" }}
              >
                添加文件
              </span>
            </button>
          </div>

          {/* Photo thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {[
              {
                name: "IMG_60512",
                size: "2.4 MB",
                color: "var(--premium-icon-blue-bg)",
                media: "photo" as const,
              },
              {
                name: "IMG_60511",
                size: "3.1 MB",
                color: "var(--premium-warning-bg)",
                media: "live" as const,
              },
              {
                name: "IMG_60510",
                size: "1.8 MB",
                color: "var(--premium-success-bg)",
                media: "video" as const,
              },
              {
                name: "IMG_60509",
                size: "4.2 MB",
                color: "var(--premium-icon-indigo-bg)",
                media: "video" as const,
              },
            ].map((img, i) => (
              <div
                key={img.name}
                className="ios-tap relative rounded-xl overflow-hidden"
                style={{
                  aspectRatio: "1",
                  border: "0.5px solid var(--premium-row-border)",
                  background: "var(--premium-surface-soft)",
                }}
                role="button"
                aria-label={`预览 ${img.name}`}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: img.color }}
                >
                  <ImageIcon
                    size={28}
                    strokeWidth={1.2}
                    style={{ color: "var(--premium-icon-neutral-fg)" }}
                  />
                </div>
                {img.media === "video" && (
                  <div
                    className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-md px-1.5 py-0.5"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      fontSize: 9,
                      color: "#FFFFFF",
                      fontWeight: 600,
                    }}
                  >
                    <span>▶</span>
                    <span>视频</span>
                  </div>
                )}
                {img.media === "live" && (
                  <div
                    className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-md px-1.5 py-0.5"
                    style={{
                      background: "rgba(0,0,0,0.55)",
                      fontSize: 9,
                      color: "#FFD60A",
                      fontWeight: 600,
                    }}
                  >
                    <span>◎</span>
                    <span>实况</span>
                  </div>
                )}
                <div
                  className="absolute bottom-0 inset-x-0 px-2 py-1.5"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                  }}
                >
                  <p
                    className="text-white font-medium truncate"
                    style={{ fontSize: 10 }}
                  >
                    {img.name}
                  </p>
                </div>
                <div
                  className="ios-tap absolute top-1 right-1 flex items-center justify-center rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    background: "rgba(0,0,0,0.5)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                  role="button"
                  aria-label={`删除 ${img.name}`}
                >
                  <X size={10} strokeWidth={2.5} style={{ color: "#FFFFFF" }} />
                </div>
              </div>
            ))}
          </div>

          {/* File rows */}
          <div className="premium-glass flex items-center gap-3 px-4 py-3 rounded-2xl">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "var(--premium-danger-bg)",
              }}
            >
              <FileText
                size={18}
                strokeWidth={1.8}
                style={{ color: "#FF3B30" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-medium truncate"
                style={{ fontSize: 14, color: "var(--premium-text)" }}
              >
                租赁合同_2026.pdf
              </p>
              <p style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}>
                PDF · 1.8 MB
              </p>
            </div>
            <button
              className="ios-tap p-1.5 rounded-lg"
              style={{ background: "var(--premium-danger-bg)" }}
              aria-label="移除"
            >
              <X size={14} strokeWidth={2.5} style={{ color: "#FF3B30" }} />
            </button>
          </div>

          {/* ── Optional fields ── */}
          {!showDetails ? (
            <button
              className="ios-tap flex items-center gap-2 py-3"
              onClick={() => setShowDetails(true)}
              aria-label="添加详细信息"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 7,
                  background: "var(--premium-chip-blue-bg)",
                }}
              >
                <PlusCircle
                  size={13}
                  strokeWidth={2}
                  style={{ color: "#2563FF" }}
                />
              </div>
              <span
                className="font-medium text-[#2563FF]"
                style={{ fontSize: 14 }}
              >
                添加详细信息
              </span>
              <span
                style={{ fontSize: 12, color: "var(--premium-text-subtle)" }}
              >
                可选
              </span>
            </button>
          ) : (
            <div className="premium-glass rounded-2xl overflow-hidden">
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{
                  borderBottom: "0.5px solid var(--premium-row-border)",
                }}
              >
                <span
                  className="font-semibold"
                  style={{ fontSize: 14, color: "var(--premium-text)" }}
                >
                  详细信息
                </span>
                <button
                  className="ios-tap"
                  onClick={() => setShowDetails(false)}
                  aria-label="收起"
                >
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    style={{
                      color: "var(--premium-text-subtle)",
                      transform: "rotate(180deg)",
                    }}
                  />
                </button>
              </div>
              {(
                [
                  {
                    label: "标题",
                    placeholder: "给这条记录起个名字",
                    type: "text" as const,
                  },
                  {
                    label: "类型",
                    placeholder: "发票、合同、处方…",
                    type: "text" as const,
                  },
                  { label: "日期", placeholder: "", type: "date" as const },
                  {
                    label: "金额",
                    placeholder: "¥ 0.00",
                    type: "text" as const,
                  },
                  {
                    label: "对方名称",
                    placeholder: "商家、机构或人名",
                    type: "text" as const,
                  },
                  {
                    label: "标签",
                    placeholder: "添加标签",
                    type: "text" as const,
                  },
                ] as const
              ).map((field, i, arr) => (
                <div
                  key={field.label}
                  className="flex items-center px-4"
                  style={{
                    height: 46,
                    borderBottom:
                      i < arr.length - 1
                        ? "0.5px solid var(--premium-row-border)"
                        : "none",
                  }}
                >
                  <span
                    className="font-medium flex-shrink-0 mr-4"
                    style={{
                      fontSize: 14,
                      width: 64,
                      color: "var(--premium-text-subtle)",
                    }}
                  >
                    {field.label}
                  </span>
                  {field.type === "date" ? (
                    <input
                      type="date"
                      className="flex-1 bg-transparent outline-none text-right"
                      style={{
                        fontSize: 14,
                        color: "var(--premium-text)",
                        colorScheme: "dark light",
                      }}
                    />
                  ) : (
                    <input
                      className="flex-1 bg-transparent outline-none text-right"
                      style={{ fontSize: 14, color: "var(--premium-text)" }}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <button
                className="ios-tap w-full flex items-center px-4"
                style={{
                  height: 46,
                  borderBottom: "0.5px solid var(--premium-row-border)",
                }}
                onClick={() => setShowObjectSheet(true)}
                aria-label="关联对象"
              >
                <span
                  className="font-medium flex-shrink-0 mr-4"
                  style={{
                    fontSize: 14,
                    width: 64,
                    color: "var(--premium-text-subtle)",
                  }}
                >
                  关联对象
                </span>
                {selectedObject ? (
                  <div className="flex-1 flex items-center justify-end gap-2">
                    <span
                      className="font-medium truncate"
                      style={{ fontSize: 13, color: "var(--premium-text)" }}
                    >
                      {selectedObject}
                    </span>
                    <div
                      className="ios-tap flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: 18,
                        height: 18,
                        background: "var(--premium-control-surface)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedObject("");
                      }}
                      role="button"
                      aria-label="清除关联对象"
                    >
                      <X
                        size={10}
                        strokeWidth={2.5}
                        style={{ color: "var(--premium-text-subtle)" }}
                      />
                    </div>
                  </div>
                ) : (
                  <span
                    className="flex-1 text-right"
                    style={{
                      fontSize: 14,
                      color: "var(--premium-text-subtle)",
                    }}
                  >
                    选择已保存的对象
                  </span>
                )}
              </button>
              <button
                className="ios-tap w-full flex items-center px-4"
                style={{ height: 46 }}
                onClick={() => setShowReminderSheet(true)}
                aria-label="到期提醒"
              >
                <span
                  className="font-medium flex-shrink-0 mr-4"
                  style={{
                    fontSize: 14,
                    width: 64,
                    color: "var(--premium-text-subtle)",
                  }}
                >
                  到期提醒
                </span>
                {reminderDate ? (
                  <div className="flex-1 flex items-center justify-end gap-2">
                    <span
                      className="font-medium truncate"
                      style={{ fontSize: 13, color: "var(--premium-text)" }}
                    >
                      {reminderType === "自定义"
                        ? customReminderName || "自定义提醒"
                        : reminderType}{" "}
                      · {reminderDate}
                    </span>
                    <div
                      className="ios-tap flex items-center justify-center rounded-full flex-shrink-0"
                      style={{
                        width: 18,
                        height: 18,
                        background: "var(--premium-control-surface)",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setReminderDate("");
                        setReminderType("保修到期");
                        setReminderAdvance("7");
                        setCustomReminderName("");
                      }}
                      role="button"
                      aria-label="清除到期提醒"
                    >
                      <X
                        size={10}
                        strokeWidth={2.5}
                        style={{ color: "var(--premium-text-subtle)" }}
                      />
                    </div>
                  </div>
                ) : (
                  <span
                    className="flex-1 text-right"
                    style={{
                      fontSize: 14,
                      color: "var(--premium-text-subtle)",
                    }}
                  >
                    设置提醒日期
                  </span>
                )}
              </button>
              {/* Notes — last */}
              <div className="px-4 py-3">
                <textarea
                  className="w-full bg-transparent resize-none outline-none"
                  style={{
                    fontSize: 14,
                    minHeight: 72,
                    lineHeight: 1.5,
                    color: "var(--premium-text)",
                  }}
                  placeholder="写点备注…"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
            </div>
          )}

          <div style={{ height: 20 }} />
        </div>
      </div>

      {/* ── Save success toast ── */}
      {saveResult === "success" && (
        <div
          className="absolute inset-x-6 top-20 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: "#101828",
            boxShadow: "0 8px 24px rgba(16,24,40,0.3)",
          }}
        >
          <CheckCircle2
            size={16}
            strokeWidth={2}
            style={{ color: "#14C8A8" }}
          />
          <p className="flex-1 text-white font-medium" style={{ fontSize: 14 }}>
            已保存到 {targetSpace}
          </p>
        </div>
      )}

      {/* ── Camera permission denied sheet ── */}
      {cameraBlocked && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => setCameraBlocked(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="relative w-full rounded-t-3xl pt-2 pb-10"
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
                  background: "var(--premium-warning-bg)",
                }}
              >
                <AlertCircle
                  size={22}
                  strokeWidth={1.8}
                  style={{ color: "#FF9500" }}
                />
              </div>
              <p
                className="font-bold"
                style={{ fontSize: 18, color: "var(--premium-text)" }}
              >
                无法访问相机
              </p>
              <p
                className="mt-1.5 leading-snug"
                style={{ fontSize: 14, color: "var(--premium-text-subtle)" }}
              >
                请在 iPhone「设置」→「隐私与安全性」→「相机」中允许 Proofly
                访问相机
              </p>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button
                className="ios-tap w-full rounded-2xl font-semibold text-white"
                style={{ height: 50, fontSize: 17, background: "#2563FF" }}
                onClick={() => setCameraBlocked(false)}
              >
                从相册选取
              </button>
              <button
                className="ios-tap w-full rounded-2xl font-medium"
                style={{
                  height: 50,
                  fontSize: 17,
                  background: "var(--premium-surface-soft)",
                  color: "var(--premium-text)",
                }}
                onClick={() => setCameraBlocked(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Space picker sheet ── */}
      {showSpaceSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => setShowSpaceSheet(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="relative w-full rounded-t-3xl pt-2 pb-8"
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
            <div className="px-5 mb-4">
              <h2
                className="font-bold"
                style={{ fontSize: 18, color: "var(--premium-text)" }}
              >
                选择资料箱
              </h2>
            </div>
            <div className="px-4 mb-3">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "0.5px solid var(--premium-row-border)",
                  background: "var(--premium-surface-soft)",
                }}
              >
                {[
                  {
                    emoji: "🏠",
                    name: "家庭资料箱",
                    desc: "房屋、物品、保修、合同、健康和老幼照护资料",
                    records: 46,
                    reminders: 5,
                    updated: "今天",
                  },
                  {
                    emoji: "🧾",
                    name: "经营资料箱",
                    desc: "客户、项目、票据和证照",
                    records: 128,
                    reminders: 9,
                    updated: "昨天",
                  },
                  {
                    emoji: "💼",
                    name: "事业资料箱",
                    desc: "合同、绩效、证书和求职资料",
                    records: 32,
                    reminders: 3,
                    updated: "3 天前",
                  },
                ].map((space, i, arr) => {
                  const isActive = space.name === targetSpace;
                  return (
                    <button
                      key={space.name}
                      className="ios-tap w-full flex items-start px-4 py-3.5 text-left"
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "0.5px solid var(--premium-row-border)"
                            : "none",
                        background: isActive
                          ? "var(--premium-surface-selected)"
                          : "transparent",
                      }}
                      onClick={() => {
                        setTargetSpace(space.name);
                        setShowSpaceSheet(false);
                      }}
                      aria-label={space.name}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0 mr-3 mt-0.5"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "var(--premium-icon-blue-bg)",
                        }}
                      >
                        <span style={{ fontSize: 22 }}>{space.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-semibold"
                            style={{
                              fontSize: 15,
                              color: "var(--premium-text)",
                            }}
                          >
                            {space.name}
                          </span>
                          {isActive && (
                            <span
                              className="px-1.5 rounded-full font-semibold"
                              style={{
                                fontSize: 10,
                                background: "var(--premium-chip-blue-bg)",
                                color: "#4C6FFF",
                                paddingTop: 1,
                                paddingBottom: 1,
                              }}
                            >
                              当前
                            </span>
                          )}
                        </div>
                        <p
                          className="mt-0.5 leading-snug"
                          style={{
                            fontSize: 12,
                            color: "var(--premium-text-subtle)",
                          }}
                        >
                          {space.desc}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span
                            className="font-medium"
                            style={{
                              fontSize: 12,
                              color: "var(--premium-text-muted)",
                            }}
                          >
                            {space.records} 条记录
                          </span>
                          {space.reminders > 0 && (
                            <span
                              className="text-[#FF9500] font-medium"
                              style={{ fontSize: 12 }}
                            >
                              {space.reminders} 个提醒
                            </span>
                          )}
                          {space.updated && (
                            <span
                              style={{
                                fontSize: 11,
                                color: "var(--premium-text-subtle)",
                              }}
                            >
                              更新于{space.updated}
                            </span>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <Check
                          size={18}
                          strokeWidth={2.5}
                          style={{
                            color: "#4C6FFF",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="px-4">
              <button
                className="ios-tap w-full rounded-2xl font-semibold"
                style={{
                  height: 50,
                  fontSize: 17,
                  background: "var(--premium-surface-soft)",
                  color: "var(--premium-text)",
                }}
                onClick={() => setShowSpaceSheet(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Object selection sheet ── */}
      {showObjectSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => setShowObjectSheet(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="relative w-full rounded-t-3xl pt-2 pb-8"
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
            <p
              className="font-bold px-5 mb-3"
              style={{ fontSize: 18, color: "var(--premium-text)" }}
            >
              选择关联对象
            </p>
            <div className="px-4 mb-3">
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "0.5px solid var(--premium-row-border)",
                  background: "var(--premium-surface-soft)",
                }}
              >
                {[
                  {
                    emoji: "💻",
                    name: "MacBook Pro 14",
                    type: "物品",
                    space: "家庭资料箱",
                  },
                  {
                    emoji: "🏠",
                    name: "徐汇租住房",
                    type: "房屋",
                    space: "家庭资料箱",
                  },
                  {
                    emoji: "👴",
                    name: "父亲健康档案",
                    type: "健康档案",
                    space: "家庭资料箱",
                  },
                  {
                    emoji: "👶",
                    name: "小宝健康档案",
                    type: "健康档案",
                    space: "家庭资料箱",
                  },
                  {
                    emoji: "📁",
                    name: "林先生设计项目",
                    type: "项目",
                    space: "经营资料箱",
                  },
                  {
                    emoji: "🏢",
                    name: "上海分店",
                    type: "店铺",
                    space: "经营资料箱",
                  },
                  {
                    emoji: "💼",
                    name: "当前公司",
                    type: "公司",
                    space: "事业资料箱",
                  },
                  {
                    emoji: "🎓",
                    name: "高级前端证书",
                    type: "证书",
                    space: "事业资料箱",
                  },
                ].map((obj, i, arr) => (
                  <button
                    key={obj.name}
                    className="ios-tap w-full flex items-center px-4 py-3 text-left"
                    style={{
                      borderBottom:
                        i < arr.length - 1
                          ? "0.5px solid var(--premium-row-border)"
                          : "none",
                    }}
                    onClick={() => {
                      setSelectedObject(obj.name);
                      setShowObjectSheet(false);
                    }}
                    aria-label={obj.name}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0 mr-3"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: "var(--premium-icon-blue-bg)",
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{obj.emoji}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-medium"
                        style={{ fontSize: 14, color: "var(--premium-text)" }}
                      >
                        {obj.name}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--premium-text-subtle)",
                          }}
                        >
                          {obj.type}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            color: "var(--premium-text-subtle)",
                          }}
                        >
                          ·
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--premium-text-subtle)",
                          }}
                        >
                          {obj.space}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="px-4">
              <button
                className="ios-tap w-full rounded-2xl font-semibold"
                style={{
                  height: 50,
                  fontSize: 17,
                  background: "var(--premium-surface-soft)",
                  color: "var(--premium-text)",
                }}
                onClick={() => setShowObjectSheet(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reminder config sheet ── */}
      {showReminderSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => setShowReminderSheet(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="relative w-full rounded-t-3xl pt-2 pb-8"
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
            <p
              className="font-bold px-5 mb-4"
              style={{ fontSize: 18, color: "var(--premium-text)" }}
            >
              设置到期提醒
            </p>
            <div className="px-4 mb-4">
              <p
                className="font-medium px-1 mb-2"
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--premium-text-subtle)",
                }}
              >
                提醒类型
              </p>
              <div
                className="rounded-2xl overflow-hidden overflow-y-auto"
                style={{
                  border: "0.5px solid var(--premium-row-border)",
                  background: "var(--premium-surface-soft)",
                  maxHeight: 180,
                }}
              >
                {[
                  { label: "保修到期", emoji: "🔧" },
                  { label: "合同到期", emoji: "📄" },
                  { label: "租期到期", emoji: "🏠" },
                  { label: "尾款提醒", emoji: "💰" },
                  { label: "证书到期", emoji: "🎓" },
                  { label: "复诊提醒", emoji: "🏥" },
                  { label: "疫苗接种", emoji: "💉" },
                  { label: "体检提醒", emoji: "🩺" },
                  { label: "年审提醒", emoji: "📋" },
                  { label: "自定义", emoji: "✏️" },
                ].map((t, i, arr) => {
                  const isActive = reminderType === t.label;
                  return (
                    <button
                      key={t.label}
                      className="ios-tap w-full flex items-center justify-between px-4 py-2"
                      style={{
                        borderBottom:
                          i < arr.length - 1
                            ? "0.5px solid var(--premium-row-border)"
                            : "none",
                        background: isActive
                          ? "var(--premium-surface-selected)"
                          : "transparent",
                      }}
                      onClick={() => {
                        setReminderType(t.label);
                        if (t.label !== "自定义") setCustomReminderName("");
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#4C6FFF" : "var(--premium-text)",
                        }}
                      >
                        {t.emoji} {t.label}
                      </span>
                      {isActive && (
                        <Check
                          size={14}
                          strokeWidth={2.5}
                          style={{ color: "#4C6FFF" }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              {reminderType === "自定义" && (
                <input
                  className="w-full mt-2 rounded-xl px-4 py-3 outline-none"
                  style={{
                    fontSize: 14,
                    border: "0.5px solid var(--premium-row-border)",
                    background: "var(--premium-surface-soft)",
                    color: "var(--premium-text)",
                  }}
                  placeholder="输入自定义提醒名称"
                  value={customReminderName}
                  onChange={(e) => setCustomReminderName(e.target.value)}
                  autoFocus
                />
              )}
            </div>
            <div className="px-4 mb-4">
              <p
                className="font-medium px-1 mb-2"
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--premium-text-subtle)",
                }}
              >
                到期日期
              </p>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "0.5px solid var(--premium-row-border)",
                  background: "var(--premium-surface-soft)",
                }}
              >
                <div className="flex items-center px-4" style={{ height: 48 }}>
                  <input
                    type="date"
                    className="flex-1 bg-transparent outline-none text-right"
                    style={{
                      fontSize: 15,
                      color: "var(--premium-text)",
                      colorScheme: "dark light",
                    }}
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 mb-5">
              <p
                className="font-medium px-1 mb-2"
                style={{
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--premium-text-subtle)",
                }}
              >
                提前提醒
              </p>
              <div className="flex gap-2">
                {["当天", "1", "3", "7", "30"].map((d) => {
                  const isActive = reminderAdvance === d;
                  return (
                    <button
                      key={d}
                      className="ios-tap flex-1 py-2 rounded-lg font-medium"
                      style={{
                        fontSize: 13,
                        background: isActive
                          ? "var(--premium-chip-blue-bg)"
                          : "var(--premium-surface-soft)",
                        color: isActive
                          ? "#4C6FFF"
                          : "var(--premium-text-subtle)",
                        border: isActive
                          ? "1px solid rgba(76,111,255,0.28)"
                          : "0.5px solid var(--premium-row-border)",
                      }}
                      onClick={() => setReminderAdvance(d)}
                    >
                      {d === "当天" ? "当天" : `${d} 天前`}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4">
              <button
                className="ios-tap w-full rounded-2xl font-semibold text-white"
                style={{ height: 50, fontSize: 17, background: "#2563FF" }}
                onClick={() => setShowReminderSheet(false)}
              >
                保存提醒
              </button>
              {reminderDate && (
                <button
                  className="ios-tap w-full rounded-2xl font-semibold"
                  style={{
                    height: 50,
                    fontSize: 17,
                    background: "var(--premium-danger-button-bg)",
                    color: "var(--premium-danger-button-text)",
                    border: "none",
                    boxShadow: "var(--premium-danger-button-shadow)",
                  }}
                  onClick={() => {
                    setReminderDate("");
                    setReminderType("保修到期");
                    setReminderAdvance("7");
                    setCustomReminderName("");
                    setShowReminderSheet(false);
                  }}
                >
                  清除提醒
                </button>
              )}
              <button
                className="ios-tap w-full rounded-2xl font-semibold"
                style={{
                  height: 50,
                  fontSize: 17,
                  background: "var(--premium-surface-soft)",
                  color: "var(--premium-text)",
                }}
                onClick={() => setShowReminderSheet(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Photo source action sheet ── */}
      {showPhotoSheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          onClick={() => setShowPhotoSheet(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: "var(--premium-overlay)" }}
          />
          <div
            className="relative w-full rounded-t-3xl pt-2 pb-8"
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
            <div className="flex flex-col gap-1.5 px-4">
              <button
                className="ios-tap flex items-center gap-3 px-4 py-4 rounded-xl w-full"
                style={{ background: "var(--premium-surface-soft)" }}
                onClick={() => {
                  setShowPhotoSheet(false);
                  setCameraBlocked(true);
                }}
                aria-label="拍照"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--premium-success-bg)",
                  }}
                >
                  <Camera
                    size={18}
                    strokeWidth={2}
                    style={{ color: "#14C8A8" }}
                  />
                </div>
                <span
                  className="font-medium"
                  style={{ fontSize: 16, color: "var(--premium-text)" }}
                >
                  📷 拍照
                </span>
              </button>
              <button
                className="ios-tap flex items-center gap-3 px-4 py-4 rounded-xl w-full"
                style={{ background: "var(--premium-surface-soft)" }}
                onClick={() => setShowPhotoSheet(false)}
                aria-label="选取照片"
              >
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "var(--premium-icon-blue-bg)",
                  }}
                >
                  <ImageIcon
                    size={18}
                    strokeWidth={2}
                    style={{ color: "#2563FF" }}
                  />
                </div>
                <span
                  className="font-medium"
                  style={{ fontSize: 16, color: "var(--premium-text)" }}
                >
                  🖼 选取照片
                </span>
              </button>
            </div>
            <div className="px-4 mt-3">
              <button
                className="ios-tap w-full rounded-2xl font-semibold"
                style={{
                  height: 50,
                  fontSize: 17,
                  background: "var(--premium-surface-soft)",
                  color: "var(--premium-text)",
                }}
                onClick={() => setShowPhotoSheet(false)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
