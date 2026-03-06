---
"react-bnb-gallery": minor
---

Add a new `renderCaptionActions` render prop to inject custom controls in the caption action area.

The slot renders next to the existing photo-list toggle and receives context (`current`, `currentPhoto`, `photos`, `showThumbnails`) so consumers can build action buttons (for example download/share actions) without forking the gallery layout.
