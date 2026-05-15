# Proofly UI/UE Redesign Phase 3F QA Polish

**Goal:** Use the dark overview screenshot to finish visual QA polish for dark preview.

**Scope:** No behavior changes. Only fix remaining dark-mode visual inconsistencies found in the all-screens overview.

## Findings

- [x] Template editor selected template-type row used inline light color and appeared too bright in dark preview.
- [x] Template editor system fields and custom-field empty state still used fixed light borders and surfaces.
- [x] Space editor built-in/custom template rows still used fixed light inline icon backgrounds and dividers.
- [x] Add-record media thumbnails still used light pastel placeholder backgrounds.

## Changes

- [x] Tokenized template editor selected row, icon tile, section labels, field list, and empty custom-field state.
- [x] Tokenized space editor Pro hint, system template list, cross-space template list, icon tiles, and checkbox borders.
- [x] Tokenized add-record media thumbnail placeholder backgrounds.

## Validation

- [x] `./node_modules/.bin/tsc --noEmit`
- [x] `npm run build`
- [x] `npm run lint` remains blocked until `eslint` is installed.
