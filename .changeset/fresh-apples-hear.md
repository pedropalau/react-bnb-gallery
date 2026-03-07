---
"react-bnb-gallery": patch
---

Refactor internal defaults and constants to component-local scope, and improve thumbnail strip layout calculations.

- Remove shared internal constants in favor of local defaults where values are used.
- Derive thumbnail strip scroll/width calculations from measured layout dimensions to better support custom thumbnail sizing.
- Keep public API behavior stable while simplifying internal maintenance.
