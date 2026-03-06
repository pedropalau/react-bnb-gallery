---
"react-bnb-gallery": minor
---

Add active-photo zoom and pan support in the gallery viewport.

This introduces opt-in/controlled zoom behavior through new props:

- `enableZoom` (default `true`)
- `maxZoom` (default `3`)
- `zoomStep` (default `0.25`)

It also adds built-in zoom controls (`zoom in`, `zoom out`, `reset zoom`) with localizable phrases and prevents swipe/click-next interactions while zoom is active.
