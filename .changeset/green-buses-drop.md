---
'react-bnb-gallery': patch
---

Add `GalleryPhoto.alt` and `GalleryPhoto.thumbnailAlt` to support explicit accessible image text for main and thumbnail images. Keep backward-compatible fallback behavior (`caption` remains default; thumbnail falls back to `alt` then `caption`).
