# Proofly UI/UE Redesign Phase 3E Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete dark preview coverage for remaining non-tab Proofly screens and modal flows.

**Architecture:** Continue using the scoped `.dark` preview from Phase 3B and the shared token system from 3C/3D. Tokenize remaining page-level fixed light surfaces in detail, search, export, pending, editor, template, Pro, and empty-state screens. Keep product behavior unchanged.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4.

---

## File Structure

- Modify: `components/proofly/screens/record-detail.tsx`
  - Tokenize summary, attachments, reminder, related object, action sheets, confirm sheets, and toast.
- Modify: `components/proofly/screens/object-detail.tsx`
  - Tokenize object header, stats, timeline, related records, more sheet, and delete confirmation.
- Modify: `components/proofly/screens/search.tsx`
  - Tokenize search control, chips, default state, result rows, empty state, and search hint.
- Modify: `components/proofly/screens/export.tsx`
  - Tokenize export range, content preview, warning note, bottom CTA area, preview sheet, and generated sheet.
- Modify: `components/proofly/screens/pending.tsx`
  - Tokenize header, pending rows, inline editors, reason chips, empty state, and toast.
- Modify: `components/proofly/screens/add-record.tsx`
  - Tokenize add-record form surfaces and all picker/permission sheets.
- Modify: `components/proofly/screens/add-object.tsx`
  - Tokenize add-object form and type/emoji picker sheets.
- Modify: `components/proofly/screens/templates.tsx`
  - Tokenize template lists, headers, create button, empty state, and Pro hint.
- Modify: `components/proofly/screens/template-editor.tsx`
  - Tokenize template editor rows, controls, and sheets if present.
- Modify: `components/proofly/screens/space-editor.tsx`
  - Tokenize space editor rows, controls, and sheets if present.
- Modify: `components/proofly/screens/no-space-empty.tsx`
  - Tokenize empty state text and primary surfaces.
- Modify: `components/proofly/screens/pro-upgrade.tsx`
  - Tokenize perks list, trust badges, CTA footer, close button, and toast.

## Task 1: Detail and Search Flows

- [x] **Step 1: Tokenize record detail**

Replace fixed light row, summary, attachment, reminder, sheet, and toast colors.

- [x] **Step 2: Tokenize object detail**

Replace fixed light object, timeline, related records, sheet, and confirmation colors.

- [x] **Step 3: Tokenize search**

Replace fixed light search input, chips, results, empty state, and hint colors.

## Task 2: Export and Pending Flows

- [x] **Step 1: Tokenize export**

Replace fixed light export cards, footer, preview sheet, and result sheet colors.

- [x] **Step 2: Tokenize pending**

Replace fixed light pending rows, inline editors, reason chips, and empty state colors.

## Task 3: Editor, Template, Empty, and Pro Flows

- [x] **Step 1: Tokenize add/edit record**

Replace fixed light add-record controls, fields, and sheets.

- [x] **Step 2: Tokenize add/edit object**

Replace fixed light add-object controls and selector sheets.

- [x] **Step 3: Tokenize template and space editors**

Replace fixed light template, space editor, and template management surfaces.

- [x] **Step 4: Tokenize empty and Pro screens**

Replace fixed light empty state and Pro upgrade footer/list surfaces.

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

- All non-tab pages are readable in dark preview.
- Existing navigation and product behavior are unchanged.
- Light mode remains visually aligned with earlier phases.
- Full dark mode should be ready for Phase 3F final visual QA after this pass.
