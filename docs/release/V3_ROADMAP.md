# React BnB Gallery v3 Roadmap

Last updated: 2026-03-06

This document tracks items intentionally deferred to the next major version (`v3`).

## Planned Items

| GitHub Issue | Topic | Status | Notes |
| --- | --- | --- | --- |
| [#15](https://github.com/pedropalau/react-bnb-gallery/issues/15) | Theming support | Planned | Track a first-class theming API (tokens/variables + documented customization patterns). |
| [#21](https://github.com/pedropalau/react-bnb-gallery/issues/21) | Zoomable images | Completed | Delivered in `feat/v3-zoom-pan`: gesture-based zoom (wheel/pinch), pan while zoomed, zoom-mode navigation safeguards. |
| [#39](https://github.com/pedropalau/react-bnb-gallery/issues/39) | Pinch-to-zoom triggers next image on mobile | Completed | Resolved by v3 zoom redesign: pinch gesture no longer triggers next/prev navigation while zoom mode is active. |
| [#51](https://github.com/pedropalau/react-bnb-gallery/issues/51) | Custom buttons after thumbnails | Planned | Add extensibility hooks (for example, slots/render props) for custom actions in the thumbnail area. |

## Scope Notes

- `v2.x` remains focused on stability and modernization hardening.
- New customization surfaces that can introduce API design changes are tracked under `v3`.
- Legacy PR context:
  - [#46](https://github.com/pedropalau/react-bnb-gallery/pull/46) proposed a custom photo component API. The PR was closed as outdated, but its core idea is retained for v3 extensibility design (tracked with zoom/custom media roadmap items such as [#21](https://github.com/pedropalau/react-bnb-gallery/issues/21)).
