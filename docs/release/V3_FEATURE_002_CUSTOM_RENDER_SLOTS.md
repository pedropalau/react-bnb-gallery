# V3 Feature 002: Custom Render Slots

Last updated: 2026-03-06

## Metadata

1. Feature ID: `v3-feature-002`
2. Branch: `feat/v3-custom-render-slots`
3. Owner: TBD
4. Target prerelease: `3.0.0-next.3`
5. Changeset type: `minor`

## Problem

Consumers need to add custom action buttons near the thumbnail toggle area (for example download/share/open-original) without forking the gallery layout.

## Proposal

1. Add a render prop slot for caption actions.
2. Render custom actions in the caption-right area, next to the existing photo-list toggle.
3. Keep existing caption/toggle behavior intact by default.

## API Surface

1. New prop:
   - `renderCaptionActions?: (context) => ReactNode`
2. New exported types:
   - `GalleryCaptionActionsContext`
   - `GalleryRenderCaptionActions`
3. Backward compatibility:
   - No behavior changes when `renderCaptionActions` is omitted.

## Accessibility

1. Custom action focus order follows normal DOM flow in caption-right.
2. Existing toggle button semantics remain unchanged.
3. No changes to dialog or keyboard navigation contracts.

## Testing Plan

1. Caption component tests for:
   - custom action rendering with/without multiple photos
   - coexistence with toggle controls
2. ReactBnbGallery integration test for prop wiring/context.

## Docs Plan

1. Add option docs for `renderCaptionActions`.
2. Add usage example with custom buttons in caption-right area.

## Release Notes Draft

Add a new render slot (`renderCaptionActions`) to inject custom actions in the caption area next to the photo-list toggle, without changing default gallery behavior.
