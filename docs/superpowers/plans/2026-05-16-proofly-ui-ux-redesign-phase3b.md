# Proofly UI/UE Redesign Phase 3B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dark-mode preview path for the Proofly prototype so the premium theme direction can be reviewed without breaking the current light UI.

**Architecture:** Keep light mode as the default. Add a local preview toggle in `app/page.tsx` that applies `.dark` to the prototype preview area. Convert shared shell/background surfaces to CSS variables, leaving page-level inline colors for later full dark-mode passes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4.

---

## File Structure

- Modify: `app/page.tsx`
  - Add `darkPreview` state and UI toggle for Showcase and interactive mode.
  - Apply `.dark` to preview containers when enabled.
- Modify: `components/proofly/iphone-shell.tsx`
  - Use premium CSS variables for shell background, status color, and shell shadow.
- Modify: `components/proofly/ambient-background.tsx`
  - Keep environment light driven by CSS tokens instead of fixed-only surface.
- Modify: `app/globals.css`
  - Add preview host background classes and shell token variables.

## Task 1: Dark Preview Toggle

- [x] **Step 1: Add preview state**

Add `darkPreview` to `ProoflyApp` and pass it to `Showcase`.

- [x] **Step 2: Add toggle button**

Add a top-right companion button next to the existing Showcase/interactive toggle.

- [x] **Step 3: Apply `.dark` scope**

When dark preview is enabled, apply `dark` to the outer preview container so shared variables switch.

## Task 2: Shared Surface Tokenization

- [x] **Step 1: Update shell tokens**

Make `IPhoneShell` use CSS variables for background, status icon color, and shell shadow.

- [x] **Step 2: Update global shell variables**

Add light/dark shell variables to `app/globals.css`.

- [x] **Step 3: Validate ambient background**

Ensure `AmbientBackground` still uses `premium-screen`, which already reads `--premium-bg`.

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

- Dark preview is opt-in and clearly scoped.
- Light mode remains unchanged by default.
- No product functionality changes.
- This does not claim complete dark-mode coverage of every inline page color.
