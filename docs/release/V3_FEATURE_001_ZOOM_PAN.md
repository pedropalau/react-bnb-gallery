# V3 Feature 001: Zoom and Pan

Last updated: 2026-03-06

## Metadata

1. Feature ID: `v3-feature-001`
2. Branch: `feat/v3-zoom-pan`
3. Owner: TBD
4. Target prerelease: `3.0.0-next.2`
5. Changeset type: `minor`

## Problem

Users need closer inspection of image details without leaving the gallery. Current behavior centers and scales photos but does not provide direct gesture-based zoom/pan interaction.

## Proposal

1. Add gesture-based zoom on the active photo view:
   - Desktop: mouse wheel/trackpad zoom.
   - Mobile: pinch-to-zoom.
2. Allow panning when zoom scale is above 1x:
   - Desktop: click-and-drag.
   - Mobile: touch drag.
3. Preserve existing next/prev controls and close behavior outside zoom mode.
4. Disable click-next and swipe navigation while zoom mode is active.
5. Keep default behavior unchanged unless zoom is activated.

## API Surface (Draft)

1. New optional props:
   - `enableZoom?: boolean` (default `true`)
   - `maxZoom?: number` (default `3`)
   - `zoomStep?: number` (default `0.25`)
2. Phrase cleanup:
   - Remove unused zoom-control labels from `defaultPhrases` (`zoomIn`, `zoomOut`, `resetZoom`) because zoom UI controls are not rendered.
3. No required migration for existing zoom props.

## Accessibility

1. `Esc` behavior remains close-first.
2. Zoom mode must not trap focus or break keyboard navigation semantics.
3. Respect reduced-motion preference for zoom transitions.

## Testing Plan

1. Add component tests for zoom state transitions.
2. Add regression tests for existing keyboard and swipe navigation while zoom is enabled/disabled.
3. Manual QA on mouse, trackpad, and touch interactions.
4. Add regression test for pan clamping against rendered media bounds (letterboxed images).

## Docs Plan

1. Add option docs for zoom props.
2. Add a docs example showing zoom/pan interaction.
3. Update feature notes to document gesture-only zoom behavior.

## Acceptance Criteria

1. Gesture zoom functions on desktop and mobile without dedicated zoom buttons.
2. Panning is bounded to rendered media overflow and does not expose empty background on letterboxed media.
3. Existing gallery tests remain green with no behavior regressions.
4. `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
