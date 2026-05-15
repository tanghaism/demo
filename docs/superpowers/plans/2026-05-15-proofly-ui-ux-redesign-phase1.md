# Proofly UI/UE Redesign Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the current Proofly dev0 prototype with a premium visual system, ambient background, floating cards, a stronger home hero, and a glass floating TabBar without changing product capabilities.

**Architecture:** Keep the existing single-screen state machine in `app/page.tsx`. Add focused Proofly visual primitives under `components/proofly`, then update `HomeScreen`, `TabBar`, and global CSS to consume those primitives. Do not introduce real AI, OCR, persistence, backend calls, or routing changes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, lucide-react.

---

## File Structure

- Modify: `app/globals.css`
  - Add premium color tokens, ambient background utilities, press feedback, and reusable glass/floating utility classes.
- Create: `components/proofly/premium-card.tsx`
  - Reusable `PremiumCard`, `MetricPill`, and `PremiumIconTile` primitives.
- Create: `components/proofly/ambient-background.tsx`
  - Decorative but non-interactive background layer for iPhone screens.
- Create: `components/proofly/smart-insight-card.tsx`
  - Non-AI “本地提示 / 整理建议” card used on the home screen.
- Modify: `components/proofly/iphone-shell.tsx`
  - Let the content show the upgraded ambient surface cleanly inside the iPhone shell.
- Modify: `components/proofly/tab-bar.tsx`
  - Convert current bottom bar into a floating glass TabBar while preserving the existing five visual items and add-record/add-object behavior.
- Modify: `components/proofly/screens/home.tsx`
  - Rebuild the non-search home state around the upgraded hero, insight card, floating object cards, reminder card, and recent records card.

## Task 1: Global Visual Tokens And Utilities

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add premium tokens**

Add tokens to `:root` while keeping existing names available:

```css
--premium-blue: #4C6FFF;
--premium-blue-start: #5B7CFF;
--premium-indigo-end: #7B61FF;
--premium-mint: #31C48D;
--premium-warning: #FFB648;
--premium-danger: #FF5A6B;
--premium-bg: #F5F7FB;
--premium-glass: rgba(255,255,255,0.7);
--premium-glass-strong: rgba(255,255,255,0.86);
--premium-border: rgba(255,255,255,0.62);
--premium-shadow: 0 18px 42px rgba(76,111,255,0.13), 0 8px 20px rgba(16,24,40,0.08);
```

- [ ] **Step 2: Add utility classes**

Add these utility classes under `@layer utilities`:

```css
.premium-screen {
  background:
    radial-gradient(circle at 18% 10%, rgba(91,124,255,0.18), transparent 34%),
    radial-gradient(circle at 88% 6%, rgba(123,97,255,0.14), transparent 30%),
    radial-gradient(circle at 70% 92%, rgba(49,196,141,0.10), transparent 34%),
    var(--premium-bg);
}

.premium-glass {
  background: var(--premium-glass);
  border: 1px solid var(--premium-border);
  box-shadow: var(--premium-shadow);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.premium-press {
  transition: transform 180ms ease, opacity 180ms ease, box-shadow 180ms ease;
}

.premium-press:active {
  transform: scale(0.975);
  opacity: 0.88;
}

.premium-hero-gradient {
  background:
    radial-gradient(circle at 82% 12%, rgba(255,255,255,0.22), transparent 28%),
    linear-gradient(135deg, var(--premium-blue-start) 0%, var(--premium-indigo-end) 100%);
}
```

- [ ] **Step 3: Validate CSS**

Run: `npm run lint`

Expected: lint completes or reports only pre-existing project lint issues unrelated to the CSS change.

## Task 2: Shared Premium Components

**Files:**
- Create: `components/proofly/premium-card.tsx`
- Create: `components/proofly/ambient-background.tsx`
- Create: `components/proofly/smart-insight-card.tsx`

- [ ] **Step 1: Create `premium-card.tsx`**

Implement small focused primitives:

```tsx
"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PremiumCard({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={cn("premium-glass rounded-[22px] overflow-hidden", className)} style={style}>
      {children}
    </div>
  )
}

export function MetricPill({
  value,
  label,
  onClick,
}: {
  value: string
  label: string
  onClick?: () => void
}) {
  const content = (
    <>
      <span className="font-bold text-white" style={{ fontSize: 14 }}>{value}</span>
      <span className="text-white/78 font-medium" style={{ fontSize: 11 }}>{label}</span>
    </>
  )

  if (onClick) {
    return (
      <button
        className="premium-press ios-tap rounded-full px-3 py-1.5 flex items-center gap-1.5"
        style={{ background: "rgba(255,255,255,0.15)" }}
        onClick={onClick}
      >
        {content}
      </button>
    )
  }

  return (
    <div className="rounded-full px-3 py-1.5 flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.15)" }}>
      {content}
    </div>
  )
}

export function PremiumIconTile({
  emoji,
  tone = "blue",
}: {
  emoji: string
  tone?: "blue" | "mint" | "indigo" | "amber" | "red"
}) {
  const tones = {
    blue: ["#EEF4FF", "#4C6FFF"],
    mint: ["#EAFBF5", "#31C48D"],
    indigo: ["#F0EBFF", "#7B61FF"],
    amber: ["#FFF6E6", "#FFB648"],
    red: ["#FFF0F2", "#FF5A6B"],
  } as const
  const [bg, glow] = tones[tone]

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 42, height: 42 }}>
      <div className="absolute inset-1 rounded-2xl blur-md opacity-40" style={{ background: glow }} />
      <div className="relative flex items-center justify-center rounded-2xl" style={{ width: 42, height: 42, background: bg }}>
        <span style={{ fontSize: 22 }}>{emoji}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `ambient-background.tsx`**

```tsx
"use client"

export function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 premium-screen" />
      <div
        className="absolute -top-16 -left-14 rounded-full blur-3xl"
        style={{ width: 180, height: 180, background: "rgba(91,124,255,0.16)" }}
      />
      <div
        className="absolute top-24 -right-20 rounded-full blur-3xl"
        style={{ width: 190, height: 190, background: "rgba(123,97,255,0.13)" }}
      />
      <div
        className="absolute -bottom-24 left-20 rounded-full blur-3xl"
        style={{ width: 220, height: 220, background: "rgba(49,196,141,0.10)" }}
      />
    </div>
  )
}
```

- [ ] **Step 3: Create `smart-insight-card.tsx`**

```tsx
"use client"

import { Sparkles, ChevronRight } from "lucide-react"
import { PremiumCard } from "@/components/proofly/premium-card"

export function SmartInsightCard({ onOpenPending }: { onOpenPending: () => void }) {
  return (
    <PremiumCard className="mx-4 mb-4 px-4 py-3.5">
      <button className="ios-tap premium-press flex w-full items-center gap-3 text-left" onClick={onOpenPending}>
        <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl" style={{ background: "#F0EBFF" }}>
          <div className="absolute inset-1 rounded-full blur-md" style={{ background: "rgba(123,97,255,0.28)" }} />
          <Sparkles size={17} strokeWidth={2} className="relative text-[#7B61FF]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#101828]" style={{ fontSize: 14 }}>整理建议</p>
          <p className="mt-0.5 text-[#667085] leading-snug" style={{ fontSize: 12 }}>
            4 条资料可以稍后补充标题、标签或关联对象
          </p>
        </div>
        <ChevronRight size={15} strokeWidth={2} className="text-[#98A2B3]" />
      </button>
    </PremiumCard>
  )
}
```

- [ ] **Step 4: Validate TypeScript import aliases**

Run: `npm run lint`

Expected: no unresolved import errors for new files.

## Task 3: Upgrade IPhone Shell And Floating TabBar

**Files:**
- Modify: `components/proofly/iphone-shell.tsx`
- Modify: `components/proofly/tab-bar.tsx`

- [ ] **Step 1: Update iPhone shell surface**

Change the shell root from plain white to the new premium surface:

```tsx
className={`relative mx-auto overflow-hidden ${className}`}
style={{
  width: 390,
  height: 844,
  borderRadius: 48,
  background: "#F5F7FB",
  boxShadow: "0 36px 90px rgba(16,24,40,0.22), 0 0 0 1px #DDE5F5, inset 0 0 0 1px rgba(255,255,255,0.7)",
}}
```

- [ ] **Step 2: Convert TabBar container to floating glass**

Change the bottom bar wrapper so it is inset and glassy:

```tsx
<div className="absolute left-4 right-4 z-40" style={{ bottom: 14 }}>
  <div
    className="premium-glass"
    style={{
      borderRadius: 28,
      paddingBottom: 10,
      background: "rgba(255,255,255,0.78)",
      boxShadow: "0 18px 42px rgba(76,111,255,0.16), 0 8px 20px rgba(16,24,40,0.12)",
    }}
  >
    <div className="flex items-start justify-around pt-2.5">
      {/* existing tab buttons */}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Upgrade add action buttons**

Keep existing add actions, but make the expanded buttons glass cards:

```tsx
className="ios-tap premium-press flex items-center gap-2 px-3 py-2.5 rounded-2xl"
style={{
  background: "rgba(255,255,255,0.86)",
  border: "1px solid rgba(255,255,255,0.66)",
  boxShadow: "0 16px 36px rgba(16,24,40,0.16)",
  opacity: showActions ? 1 : 0,
  transform: showActions ? "translateY(0) scale(1)" : "translateY(16px) scale(0.94)",
  pointerEvents: showActions ? "auto" : "none",
}}
```

- [ ] **Step 4: Validate navigation behavior**

Run: `npm run lint`

Expected: no new lint or TypeScript errors in `tab-bar.tsx` or `iphone-shell.tsx`.

## Task 4: Rebuild Home Screen Premium Layout

**Files:**
- Modify: `components/proofly/screens/home.tsx`

- [ ] **Step 1: Import shared primitives**

Add imports:

```tsx
import { AmbientBackground } from "@/components/proofly/ambient-background"
import { MetricPill, PremiumCard, PremiumIconTile } from "@/components/proofly/premium-card"
import { SmartInsightCard } from "@/components/proofly/smart-insight-card"
```

- [ ] **Step 2: Wrap home screen with ambient background**

Change root to:

```tsx
<div className="relative flex flex-col h-full overflow-hidden" style={{ paddingTop: 54 }}>
  <AmbientBackground />
  <div className="relative z-10 flex flex-col h-full">
    {/* existing header and content */}
  </div>
</div>
```

- [ ] **Step 3: Replace the current hero card**

Use `PremiumCard`, `MetricPill`, and a premium gradient:

```tsx
<PremiumCard className="mx-4 mb-4 mt-2 px-5 py-5 relative" style={{ background: "transparent", boxShadow: "0 22px 48px rgba(76,111,255,0.24)" }}>
  <div className="absolute inset-0 premium-hero-gradient" />
  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 78% 10%, rgba(255,255,255,0.24), transparent 38%)" }} />
  <div className="relative">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-white/72 font-medium" style={{ fontSize: 12 }}>数字资料保险箱</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-white font-bold" style={{ fontSize: 44, letterSpacing: -1.5, lineHeight: 0.92 }}>46</span>
          <span className="text-white/78 font-semibold pb-1" style={{ fontSize: 13 }}>份重要资料</span>
        </div>
      </div>
      <div className="rounded-full px-2.5 py-1 flex items-center gap-1.5" style={{ background: "rgba(255,255,255,0.15)" }}>
        <Shield size={12} strokeWidth={2} style={{ color: "#31C48D" }} />
        <span className="text-white/90 font-medium" style={{ fontSize: 10 }}>本地安全</span>
      </div>
    </div>
    <p className="mt-3 text-white/70" style={{ fontSize: 12 }}>已保存在这台 iPhone · 上次备份 3 天前</p>
    <div className="mt-4 flex flex-wrap gap-2">
      <MetricPill value="4" label="待整理" onClick={() => onNavigate("pending")} />
      <MetricPill value="12" label="本月新增" />
      <MetricPill value="5" label="近期提醒" onClick={onViewAllReminders} />
    </div>
  </div>
</PremiumCard>
```

- [ ] **Step 4: Add SmartInsightCard below hero**

Insert:

```tsx
<SmartInsightCard onOpenPending={() => onNavigate("pending")} />
```

- [ ] **Step 5: Upgrade object, reminder, and recent-record cards**

Replace plain `bg-white rounded-2xl` section wrappers with `PremiumCard`. Keep the same data and click handlers.

- [ ] **Step 6: Validate home search mode**

Ensure search mode still renders with a readable background and all result rows remain clickable.

Run: `npm run lint`

Expected: no new lint or TypeScript errors in `home.tsx`.

## Task 5: Visual QA And Build Verification

**Files:**
- No code changes unless verification reveals regressions.

- [ ] **Step 1: Run type/build check**

Run: `npm run build`

Expected: Next build completes. If the build reports pre-existing ignored TypeScript behavior, record it in the final summary.

- [ ] **Step 2: Start dev server**

Run: `npm run dev`

Expected: server starts on the default Next.js port or the next available port.

- [ ] **Step 3: Manual UI check**

Open the local URL and verify:

- Showcase mode renders.
- Interactive mode renders.
- Home screen has upgraded hero, insight card, and no text overflow at 390x844.
- TabBar remains clickable.
- Add menu still opens `添加记录` and `添加对象`.
- Search on home still filters records, objects, reminders, and templates.

- [ ] **Step 4: Final status**

Summarize:

- Files changed.
- Validation commands run.
- Any known residual risks.

