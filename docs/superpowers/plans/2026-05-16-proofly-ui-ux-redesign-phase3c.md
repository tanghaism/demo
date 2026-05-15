# Proofly UI/UE Redesign Phase 3C Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deepen the opt-in dark preview by tokenizing shared Proofly visual surfaces without claiming full dark-mode coverage.

**Architecture:** Keep light mode as the default and keep `.dark` scoped to preview containers from Phase 3B. Add shared CSS variables for reusable surfaces, icon tiles, sheets, tab actions, and ambient glows. Update high-reuse components first so later page-by-page dark work can replace inline fixed colors gradually.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4.

---

## File Structure

- Modify: `app/globals.css`
  - Add token variables for ambient glows, surface rows, icon tiles, sheets, tab bars, and overlay colors.
- Modify: `components/proofly/ambient-background.tsx`
  - Use CSS variables for glow colors instead of fixed light-only rgba values.
- Modify: `components/proofly/premium-card.tsx`
  - Add variable-driven `PremiumIconTile` colors for dark preview.
- Modify: `components/proofly/tab-bar.tsx`
  - Use shared tab/sheet/action variables for dark preview readability.
- Modify: `components/proofly/filter-sheet.tsx`
  - Tokenize the common filter sheet surface, text, selected row, borders, and action buttons.
- Modify: `components/proofly/space-select-sheet.tsx`
  - Tokenize the common space selection sheet surface, list, text, selected row, and informational callout.

## Task 1: Shared Dark Preview Tokens

- [x] **Step 1: Add reusable surface variables**

Add light and dark CSS variables for shared preview surfaces in `app/globals.css`.

- [x] **Step 2: Add ambient glow variables**

Add light and dark CSS variables for the three ambient glow layers.

- [x] **Step 3: Keep light defaults unchanged**

Ensure light token values visually match the current prototype.

## Task 2: Shared Component Tokenization

- [x] **Step 1: Update ambient background**

Use ambient glow variables in `components/proofly/ambient-background.tsx`.

- [x] **Step 2: Update premium icon tiles**

Use tokenized icon tile background and glow values in `components/proofly/premium-card.tsx`.

- [x] **Step 3: Update TabBar shared surfaces**

Use tokenized surfaces for the floating tab bar, backdrop, add action buttons, active/inactive tab text, and reminder dot.

## Task 3: Shared Sheet Tokenization

- [x] **Step 1: Update FilterSheet**

Use tokenized sheet, side rail, selected row, text, borders, and buttons.

- [x] **Step 2: Update SpaceSelectSheet**

Use tokenized sheet, list, selected row, text, edit button, dashed border, and callout.

- [x] **Step 3: Preserve layer behavior**

Keep sheet `z-[80]` and existing animation classes unchanged.

## Task 4: Validation

- [x] **Step 1: Run TypeScript**

Run: `./node_modules/.bin/tsc --noEmit`

Expected: exits successfully.

- [x] **Step 2: Run production build**

Run: `npm run build`

Expected: exits successfully.

- [x] **Step 3: Note lint status**

Run: `npm run lint`

Expected: current project may still fail with `sh: eslint: command not found` until `eslint` is added.

## Self-Review

- Dark preview remains opt-in and scoped.
- Light mode remains the default.
- No product logic or data model changes.
- Reusable surfaces improve dark preview without claiming complete page coverage.
