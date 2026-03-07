---
"react-bnb-gallery": minor
---

Add customizable motion and image adaptation options for `3.0.0-next.6`.

New props:

- `animations` to control transition preset (`slide`, `fade`, `zoom`, `none`), duration, easing, and feedback behavior.
- `animations.openPreset` / `openDurationMs` / `openEasing` to customize modal open animation (`fade`, `fade-up`, `zoom`, `none`).
- `animations.closePreset` / `closeDurationMs` / `closeEasing` to customize modal close animation (`fade`, `fade-down`, `zoom`, `none`).
- `imageFit` to adapt active media rendering (`contain` or `cover`).

This keeps touch gestures, keyboard navigation, and component-slot customization intact while improving runtime motion flexibility.
