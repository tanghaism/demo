# Proofly UI/UE Redesign Phase 3D Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the high-frequency Proofly main flow readable and visually coherent in the opt-in dark preview.

**Architecture:** Keep Phase 3B/3C dark preview scoped to the preview wrapper. Add only reusable CSS variables needed by main-flow pages, then replace fixed light surfaces and text colors in Home, Records, Reminders, and Settings. Leave detail/edit/export pages for Phase 3E.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4.

---

## File Structure

- Modify: `app/globals.css`
  - Add control, chip, row, icon, and callout variables used by main-flow pages.
- Modify: `components/proofly/screens/home.tsx`
  - Tokenize header controls, search results, section titles, common rows, action sheets, and delete confirmation.
- Modify: `components/proofly/screens/records-list.tsx`
  - Tokenize title, search/filter controls, empty state, record rows, labels, and separators.
- Modify: `components/proofly/screens/reminders.tsx`
  - Tokenize title, notification banner, segmented control, empty state, reminder rows, and notification sheet.
- Modify: `components/proofly/screens/settings.tsx`
  - Tokenize main settings rows, section headers, privacy/about surfaces, and shared info sheets.

## Task 1: Main Flow Dark Tokens

- [x] **Step 1: Add control variables**

Add token variables for control surfaces, segment active state, chevrons, neutral icons, and dark-compatible chips.

- [x] **Step 2: Add semantic callout variables**

Add warning, success, and danger soft surfaces for banners and confirmation blocks.

## Task 2: Home Dark Preview Pass

- [x] **Step 1: Tokenize header and search**

Update home search bar, current space header, and icon buttons.

- [x] **Step 2: Tokenize home lists and search results**

Update list surfaces, separators, text, chips, object cards, and empty states.

- [x] **Step 3: Tokenize home sheets**

Update the more action sheet and delete confirmation sheet without changing z-index behavior.

## Task 3: Records and Reminders Dark Preview Pass

- [x] **Step 1: Tokenize RecordsList**

Update title, add/search controls, space filter chip, metadata, empty state, row separators, and row text.

- [x] **Step 2: Tokenize RemindersScreen**

Update title, filter control, notification banner, segmented control, empty state, rows, and notification sheet.

## Task 4: Settings Dark Preview Pass

- [x] **Step 1: Tokenize settings rows**

Update `SettingRow` and `SettingToggle` to use shared text, divider, value, chevron, and toggle variables.

- [x] **Step 2: Tokenize settings page content**

Update main title, section labels, privacy/about content, footer text, and shared `SettingsInfoSheet`.

## Task 5: Validation

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

- Home, Records, Reminders, and Settings are readable in dark preview.
- Light mode remains the default and uses matching token values.
- Detail/edit/export pages remain explicitly scheduled for Phase 3E.
- No product capability or navigation behavior changes.
