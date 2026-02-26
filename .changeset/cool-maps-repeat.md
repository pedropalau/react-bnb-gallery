---
'react-bnb-gallery': patch
---

Add support for `ReactNode` values in `GalleryPhoto.caption` and `GalleryPhoto.subcaption`, so consumers can render rich caption content (for example links and styled metadata). Keep accessibility fallbacks safe by using text-only caption values for image alt/thumbnail labels when explicit alt fields are not provided.
