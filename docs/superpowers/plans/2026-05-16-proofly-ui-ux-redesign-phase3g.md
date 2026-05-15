# Proofly UI/UE Redesign Phase 3G Interaction QA

**Goal:** Check dark-mode overlay interactions after Phase 3F visual polish.

**Scope:** No feature changes. Focus on sheet layering, bottom-tab overlap, safe-area padding, and remaining dark surface consistency.

## QA Targets

- [x] Home space switch sheet and more/delete sheets stay above bottom navigation.
- [x] Records and reminders filter sheets stay above bottom navigation.
- [x] Reminders notification-permission sheet stays above bottom navigation.
- [x] Settings sheets keep dark surfaces and avoid light icon fragments.
- [x] Filter sheet bottom actions reserve safe-area padding.

## Changes

- [x] Raised reminder notification sheet from `z-40` to `z-[80]`.
- [x] Replaced settings row icon hardcoded light backgrounds with shared dark-aware tokens.
- [x] Replaced home action sheet icon hardcoded light backgrounds with shared tokens.
- [x] Added safe-area-aware bottom padding to `FilterSheet` actions.

## Validation

- [x] `./node_modules/.bin/tsc --noEmit`
- [x] `npm run build`
- [x] `npm run lint` remains blocked until `eslint` is installed.
