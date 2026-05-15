# Proofly UI/UE Redesign Phase 3A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the foundation for Proofly's enhanced motion system, shared sheet animation, and dark-mode token readiness without rewriting every inline color.

**Architecture:** Keep all screens and navigation semantics unchanged. Add global animation utilities and dark-mode premium tokens in `app/globals.css`, then apply screen-level transitions through `app/page.tsx` and a small set of existing shared primitives. Avoid product capability changes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, lucide-react.

---

## File Structure

- Modify: `app/globals.css`
  - Add motion variables, entrance animations, sheet animation utilities, reduced-motion handling, and `.dark` premium tokens.
- Modify: `app/page.tsx`
  - Key the rendered screen and apply a subtle page-enter transition.
- Modify: `components/proofly/tab-bar.tsx`
  - Use unified motion durations/easing for backdrop/action buttons and keep current add menu behavior.
- Modify: `components/proofly/filter-sheet.tsx`
  - Apply shared sheet overlay and panel animation classes.
- Modify: `components/proofly/space-select-sheet.tsx`
  - Apply shared sheet overlay and panel animation classes.
- Modify: `components/proofly/premium-card.tsx`
  - Add optional entrance animation class to premium cards while preserving existing className override behavior.

## Task 1: Global Motion And Theme Tokens

- [x] **Step 1: Add motion tokens**

Add global motion variables and utilities:

- `--motion-fast`
- `--motion-standard`
- `--motion-slow`
- `--motion-ease`
- `.premium-enter`
- `.premium-sheet-overlay`
- `.premium-sheet-panel`

- [x] **Step 2: Add reduced motion guard**

Add `@media (prefers-reduced-motion: reduce)` rules that disable premium animation classes.

- [x] **Step 3: Add dark premium token foundation**

Add `.dark` values for `--background`, `--foreground`, `--premium-bg`, `--premium-glass`, `--premium-border`, and `--premium-shadow`.

## Task 2: Apply Motion To Shared Surfaces

- [x] **Step 1: Apply page-enter transition**

Wrap the active screen in `app/page.tsx` with a keyed `.premium-enter` container.

- [x] **Step 2: Apply sheet animation utilities**

Update `filter-sheet.tsx` and `space-select-sheet.tsx` to use `.premium-sheet-overlay` and `.premium-sheet-panel`.

- [x] **Step 3: Tune TabBar action transitions**

Use global motion variables for TabBar backdrop/action button transitions without changing click behavior.

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

- Motion is subtle and transform/opacity based.
- Reduced-motion users are respected.
- No navigation or product capability changes.
- Dark-mode work is token foundation only, not a claim of full dark-mode completion.
