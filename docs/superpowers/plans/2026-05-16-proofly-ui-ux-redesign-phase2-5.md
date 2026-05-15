# Proofly UI/UE Redesign Phase 2.5 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finish visual consistency for remaining Proofly prototype screens that were not covered by Phase 1 and Phase 2.

**Architecture:** Keep `app/page.tsx` navigation and all local demo state unchanged. Apply the existing premium visual primitives (`AmbientBackground`, `PremiumCard`, `premium-press`, `premium-glass`) to add/edit, search, export, pending, space editor, template editor, and empty-state screens. Do not add AI/OCR/backend behavior.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, lucide-react.

---

## File Structure

- Modify: `components/proofly/screens/add-record.tsx`
  - Premium surface, action cards, attachment/file cards, detail form card, and higher sheet layers.
- Modify: `components/proofly/screens/add-object.tsx`
  - Premium surface, form card, icon/type selector sheets.
- Modify: `components/proofly/screens/export.tsx`
  - Premium export surface, scope card, contents card, bottom CTA, result sheets.
- Modify: `components/proofly/screens/search.tsx`
  - Premium search surface, glass search bar, quick filters, result groups.
- Modify: `components/proofly/screens/pending.tsx`
  - Premium pending surface and grouped task card.
- Modify: `components/proofly/screens/space-editor.tsx`
  - Premium space editor surface and grouped cards.
- Modify: `components/proofly/screens/template-editor.tsx`
  - Premium template editor surface and grouped cards.
- Modify: `components/proofly/screens/no-space-empty.tsx`
  - Premium empty-state hero and CTA.

## Task 1: Form And Creation Screens

- [x] **Step 1: Upgrade add-record**

Apply premium background and card styles while preserving all existing sheets and save demo behavior.

- [x] **Step 2: Upgrade add-object**

Apply premium background and card styles while preserving type/emoji sheets.

- [x] **Step 3: Upgrade space-editor and template-editor**

Apply the same form surface and grouped-card language.

## Task 2: Utility Screens

- [x] **Step 1: Upgrade export**

Use premium background, scope card, contents card, and CTA bar.

- [x] **Step 2: Upgrade search**

Use premium background, glass search bar, premium result groups, and clearer quick filter pills.

- [x] **Step 3: Upgrade pending and empty-state**

Use premium background and card system without changing pending completion behavior.

## Task 3: Validation

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

- Remaining core screens share the same premium visual foundation.
- No AI/OCR/auto-extraction capability is introduced.
- Navigation and demo-only state behavior remain unchanged.
