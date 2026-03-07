# React BnB Gallery v3 Modernization Plan

Last updated: 2026-03-06
Plan ID: v3
Target stable release: 3.0.0
Current stable release: 2.2.1
Current prerelease: 3.0.0-next.5 (`npm dist-tag: next`)

## Goal

Ship `3.0.0` as a deliberate major release with:

- explicit breaking-change scope,
- clear migration guidance from `2.x`,
- prerelease validation before GA.

## Release Strategy

1. Keep `2.x` on `latest` for stable consumers.
2. Continue `3.0.0-next.*` prereleases on the `next` dist-tag.
3. Merge only v3-scoped changes into the git `next` branch until GA-ready.
4. Promote to stable `3.0.0` only after all release gates pass.

## v3 Scope

### In Scope (Breaking)

1. Remove deprecated default exports from public package surface.
2. Keep named exports as the only supported import style.

### In Scope (Non-Breaking Support Work)

1. Update docs/examples to use named imports only.
2. Publish migration documentation and upgrade checklist.
3. Add/keep tests that verify named export behavior and deprecated path removal.

### Out of Scope for 3.0.0

1. New major UI redesigns.
2. Broad API expansions unrelated to default-export removal.
3. Unrelated refactors that increase release risk without migration value.

## Compatibility Contract for 3.0.0

### Must Stay Compatible

1. Core gallery behavior (open/close, next/prev, keyboard navigation, thumbnail interactions).
2. CSS import path contract (`react-bnb-gallery/dist/style.css`).
3. Current React peer support policy (`^18 || ^19`).

### Intentionally Incompatible

1. Default imports from package entry points.

## Workstreams

### W1: API and Packaging

1. Default export removals completed in `release/3.0.0-default-exports`.
2. Ensure package entry points expose only named exports.

### W2: Migration and Docs

1. Publish `MIGRATION_v2_to_v3.md` with before/after import examples.
2. Update README and docs installation/usage pages to remove default-import examples.

### W3: Validation and Release

1. Iterate on prereleases (`3.0.0-next.N`) based on user feedback.
2. Keep release gates enforced before stable publish.

## Status Audit (2026-03-06)

### Findings: Completed

1. W1 is complete:
   - Default exports are removed from the package surface (`src/index.ts` exports named symbols only).
   - Changelog records default-export removal in `3.0.0-next.0`.
2. W2 is complete:
   - `MIGRATION_v2_to_v3.md` exists with before/after import guidance.
   - README and docs use named imports for package usage examples.
3. P0 backlog items are implemented in runtime and tests:
   - Controlled index API is present (`activePhotoIndex`, `onActivePhotoIndexChange`).
   - Zoom/pan shipped in `3.0.0-next.2` (`enableZoom`, `maxZoom`, `zoomStep` + gesture behavior).
   - Custom rendering paths are present (`components` slot overrides and `renderCaptionActions`, shipped in `3.0.0-next.3`).
4. Release-hardening coverage is in place:
   - Package-surface regression tests for named-export-only entry points were added (`tests/package-surface.test.js`).
   - Controlled-index callback coverage now asserts `onActivePhotoIndexChange` on touch/wrap and thumbnail transitions (`tests/components/Gallery.test.js`).
5. Hard release gates currently pass locally on 2026-03-06:
   - `pnpm lint`
   - `pnpm test`
   - `pnpm build`
   - `pnpm docs:build`

### Findings: Pending Before 3.0.0 GA

1. Continue prerelease iteration and feedback triage for `3.0.0-next.*` until no critical regressions remain.
2. Decide whether any P1 items are required pre-GA or should be deferred to `3.0.x` after stable release.

## Feature Delivery Model (v3)

1. All feature work branches from `next` and merges back into `next`.
2. One feature per PR (`feat/v3-<short-name>`), with a focused scope and tests.
3. Every feature PR includes a changeset (`minor` for new capability, `patch` for bug fix).
4. Breaking API changes require explicit migration notes before merge.

### Branch Naming

1. `feat/v3-zoom-pan`
2. `feat/v3-controlled-index`
3. `feat/v3-custom-render-slots`

## Feature Backlog (Initial)

### P0 (Must-have before 3.0.0 GA)

1. Controlled index API (`activePhotoIndex` + `onActivePhotoIndexChange`) with full keyboard/touch parity.
2. Active photo zoom and pan interactions (mouse wheel, trackpad, touch pinch fallback behavior).
3. Custom render slots for controls/caption (without forking core layout behavior).

### P1 (Strong candidates for 3.0.x)

1. Thumbnail virtualization/perf improvements for large photo sets.
2. Gesture improvements for touch swipe confidence and direction lock.
3. Additional accessibility phrases/hooks for localization and narration.

### P2 (Later)

1. Advanced transition presets and reduced-motion-aware animation options.
2. Plugin-like extension hooks for caption and toolbar behavior.

## Current Feature Sprint

1. Branch: `feat/v3-release-hardening`
2. Goal: close remaining release-risk gaps (export-surface regression tests, controlled-index parity test coverage, prerelease feedback triage) before GA.
3. Release target: `3.0.0-next.6`

## Hard Release Gates (Required Before GA)

1. `pnpm lint` passes.
2. `pnpm test` passes.
3. `pnpm build` passes.
4. `pnpm docs:build` passes.
5. Docs examples are aligned with v3 named-import-only usage.
6. No open critical regressions from prerelease feedback.

## Exit Criteria for Stable 3.0.0

1. All gates above pass on `master` (or release branch) with release artifacts committed.
2. Prerelease feedback triaged and blocking issues resolved.
3. `changeset pre exit` executed and stable version generated.
4. Stable publish succeeds and `latest` points to `3.0.0`.

## Operational Commands

### Pre-release iteration

```bash
pnpm changeset
pnpm changeset version
pnpm build
pnpm changeset publish --access public
```

### Stable release cut (when ready)

```bash
pnpm changeset pre exit
pnpm changeset version
pnpm lint
pnpm test
pnpm build
pnpm docs:build
pnpm changeset publish --access public
```
