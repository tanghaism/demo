"use client";

import { Plus, Sparkles, Shield, Package2 } from "lucide-react";
import { AmbientBackground } from "@/components/proofly/ambient-background";

interface NoSpaceEmptyProps {
  onNavigate: (screen: string) => void;
}

export function NoSpaceEmpty({ onNavigate }: NoSpaceEmptyProps) {
  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{ paddingTop: 54 }}
    >
      <AmbientBackground />
      <div className="relative z-10 px-4 pt-6 pb-1">
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="flex items-center justify-center"
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
              boxShadow: "0 10px 22px rgba(76,111,255,0.22)",
            }}
          >
            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
              P
            </span>
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: -0.8,
              color: "var(--premium-text)",
            }}
          >
            Proofly
          </span>
        </div>
        <p style={{ fontSize: 15, color: "var(--premium-text-subtle)" }}>
          重要资料先存起来
        </p>
      </div>
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div
          className="relative flex items-center justify-center mb-6"
          style={{
            width: 96,
            height: 96,
            borderRadius: 28,
            background: "var(--premium-glass)",
            border: "1px solid var(--premium-border)",
            boxShadow: "var(--premium-shadow)",
          }}
        >
          <div
            className="absolute inset-4 rounded-full blur-xl"
            style={{ background: "rgba(91,124,255,0.18)" }}
          />
          <span style={{ fontSize: 48 }}>📦</span>
        </div>
        <h2
          className="font-bold text-center mb-2"
          style={{
            fontSize: 22,
            letterSpacing: -0.3,
            color: "var(--premium-text)",
          }}
        >
          还没有资料箱
        </h2>
        <p
          className="text-center leading-relaxed mb-8"
          style={{
            fontSize: 15,
            maxWidth: 260,
            lineHeight: 1.55,
            color: "var(--premium-text-subtle)",
          }}
        >
          创建第一个资料箱，开始保存合同、票据、证照和重要记录
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            {
              icon: Shield,
              label: "本地保存",
              color: "#14C8A8",
              bg: "var(--premium-success-bg)",
            },
            {
              icon: Package2,
              label: "资料导出",
              color: "#2563FF",
              bg: "var(--premium-icon-blue-bg)",
            },
            {
              icon: Sparkles,
              label: "提醒管理",
              color: "#7C5CFF",
              bg: "var(--premium-icon-indigo-bg)",
            },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl"
                style={{ background: f.bg }}
              >
                <Icon size={14} strokeWidth={2} style={{ color: f.color }} />
                <span
                  className="font-medium"
                  style={{ fontSize: 13, color: f.color }}
                >
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
        <button
          className="ios-tap premium-press flex items-center justify-center gap-2 rounded-2xl font-semibold text-white w-full"
          style={{
            maxWidth: 280,
            height: 52,
            fontSize: 17,
            background: "linear-gradient(135deg, #5B7CFF 0%, #7B61FF 100%)",
            boxShadow: "0 14px 28px rgba(76,111,255,0.24)",
          }}
          onClick={() => onNavigate("space-editor")}
          aria-label="新建资料箱"
        >
          <Plus size={20} strokeWidth={2.5} />
          新建资料箱
        </button>
      </div>
    </div>
  );
}
