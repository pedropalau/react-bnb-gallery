# V3 Feature 001: Zoom and Pan

Last updated: 2026-03-06

## Metadata

1. Feature ID: `v3-feature-001`
2. Branch: `feat/v3-zoom-pan`
3. Owner: TBD
4. Target prerelease: `3.0.0-next.2`
5. Changeset type: `minor`

## Problem

Users need closer inspection of image details without leaving the gallery. Current behavior centers and scales photos but does not provide in-view zoom/pan controls.

## Proposal

1. Add zoom in/out capability on the active photo view.
2. Allow panning when zoom scale is above 1x.
3. Preserve current next/prev controls and close behavior.
4. Keep default behavior unchanged unless zoom is activated.

## API Surface (Draft)

1. New optional props:
   - `enableZoom?: boolean` (default `true`)
   - `maxZoom?: number` (default `3`)
   - `zoomStep?: number` (default `0.25`)
2. New phrases for controls:
   - `zoomIn`, `zoomOut`, `resetZoom`
3. No removals in this feature.

## Accessibility

1. Zoom controls must be keyboard reachable and labeled.
2. `Esc` behavior stays close-first unless focused on explicit zoom control action.
3. Respect reduced-motion preference for zoom transitions.

## Testing Plan

1. Add component tests for zoom state transitions.
2. Add regression tests for existing keyboard navigation while zoom is enabled/disabled.
3. Manual QA on mouse, trackpad, and touch interactions.

## Docs Plan

1. Add option docs for zoom props.
2. Add a docs example showing zoom/pan interaction.
3. Update migration docs only if any defaults become behaviorally breaking.

## Acceptance Criteria

1. Zoom controls function with keyboard and pointer input.
2. Panning is bounded and does not break layout.
3. Existing gallery tests remain green with no behavior regressions.
4. `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
