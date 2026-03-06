---
"react-bnb-gallery": minor
---

Add active-photo zoom and pan support in the gallery viewport.

This introduces opt-in/controlled zoom behavior through new props:

- `enableZoom` (default `true`)
- `maxZoom` (default `3`)
- `zoomStep` (default `0.25`)

Zoom is gesture-only (no visible zoom controls): desktop wheel/trackpad zoom, mobile pinch-to-zoom, and pan while zoomed. Swipe/click-next interactions are disabled while zoom mode is active, and pan bounds are clamped using rendered media dimensions.
