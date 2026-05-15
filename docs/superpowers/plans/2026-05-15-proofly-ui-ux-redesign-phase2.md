# Proofly UI/UE Redesign Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring Proofly's core list, detail, settings, template, reminder, and Pro screens into the premium visual system introduced in Phase 1 without changing product capabilities.

**Architecture:** Keep the existing `app/page.tsx` in-memory screen state machine and all current callbacks. Reuse `AmbientBackground`, `PremiumCard`, `PremiumIconTile`, and global premium utilities instead of adding new navigation or data behavior. Update pages in place with conservative JSX/style changes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, lucide-react.

---

## File Structure

- Modify: `components/proofly/screens/records-list.tsx`
  - Apply premium background, glass list container, clearer document rows, and premium filter/search controls.
- Modify: `components/proofly/screens/reminders.tsx`
  - Apply premium background, glass segmented control, notification banner, and reminder list container.
- Modify: `components/proofly/screens/record-detail.tsx`
  - Add a premium asset card at the top and convert summary/attachments/reminder/object sections to glass cards.
- Modify: `components/proofly/screens/object-detail.tsx`
  - Add premium object hero, glass metric cards, refined timeline, and upgraded export action.
- Modify: `components/proofly/screens/settings.tsx`
  - Apply premium background, Pro card, and glass grouped settings sections while preserving backup/privacy sheets.
- Modify: `components/proofly/screens/templates.tsx`
  - Apply premium background and glass template groups.
- Modify: `components/proofly/screens/pro-upgrade.tsx`
  - Upgrade pricing hero, benefit cards, trust badges, and CTA styling.
- Modify: `components/proofly/filter-sheet.tsx`
  - Align shared filter sheet with the premium glass surface and primary blue token.

## Task 1: Lists And Shared Filter Surface

- [x] **Step 1: Upgrade `records-list.tsx` root and rows**

Use `AmbientBackground` as an absolute non-interactive layer, wrap scroll content in `relative z-10`, replace plain white list groups with `PremiumCard`, and keep row height compact.

- [x] **Step 2: Upgrade `reminders.tsx` root and list**

Apply the same screen shell, make the notification banner and segmented control glassy, and keep mark-done behavior unchanged.

- [x] **Step 3: Upgrade `filter-sheet.tsx`**

Keep two-column behavior and state application unchanged. Only update overlay opacity, sheet background, left rail color, selected states, and primary button styling.

## Task 2: Detail Screens

- [x] **Step 1: Upgrade `record-detail.tsx`**

Add an asset-card style header that displays record type, title, amount, source, and local status. Preserve attachments, attachment menus, save simulation, delete flow, toast, and navigation callbacks.

- [x] **Step 2: Upgrade `object-detail.tsx`**

Add an object hero card with object metadata and metrics. Keep the existing timeline and related records, but convert containers to `PremiumCard` and upgrade the export button.

## Task 3: Settings, Templates, And Pro

- [x] **Step 1: Upgrade `settings.tsx`**

Use premium background and glass grouped sections. Keep all toggles, sheets, backup/restore demo states, privacy/disclaimer copy, and Pro navigation unchanged.

- [x] **Step 2: Upgrade `templates.tsx`**

Use premium background, glass template groups, and keep built-in/custom template navigation unchanged.

- [x] **Step 3: Upgrade `pro-upgrade.tsx`**

Use a premium pricing hero, clearer value copy, trust badges, and gradient CTA. Preserve close, subscribe, free-version, restore-purchase, and toast behavior.

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

- Scope matches the Phase 2 sections in `docs/superpowers/specs/2026-05-15-proofly-ui-ux-redesign-design.md`.
- No AI/OCR/auto-extraction capability is introduced.
- Navigation callbacks and local demo state are preserved.
- Implementation remains visual and interaction-quality focused.
