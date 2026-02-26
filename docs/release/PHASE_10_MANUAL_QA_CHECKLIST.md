# Phase 10 Manual QA Checklist (2.1.0)

Date: 2026-02-26
Owner: Release track (`chore/phase-10-release-plan`)
Status: In progress

## Scope

Validate critical runtime flows before merging the `2.1.0` release PR.

## Environment

- Node.js: `22.x`
- Package manager: `pnpm`
- Browser matrix:
  - Chrome (latest stable)
  - Firefox (latest stable)
  - Safari (latest stable, macOS)

## Preflight

- [ ] `pnpm install`
- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm docs:build`

## Critical Flows

### Open / Close

- [x] Open gallery from thumbnail click.
- [x] Close via close button.
- [x] Close via overlay click (if enabled).
- [x] Re-open after close without stale state.

### Keyboard

- [x] Left/Right arrows navigate photos.
- [x] Escape closes gallery.
- [x] Keydown events from inputs are ignored.
- [x] Focus returns to prior element after close.

### Touch / Swipe

- [x] Swipe left/right changes photo index.
- [x] Swipe does not trigger unintended close.
- [x] Touch callbacks fire in expected order.

### Thumbnail Toggle

- [x] Toggle thumbnail tray open/closed.
- [x] Active thumbnail stays synchronized with active photo.
- [x] Scroll/positioning remains correct after multiple navigations.

### Light Controls / Visual

- [x] Light mode controls render correctly.
- [x] Caption and counter update correctly on navigation.
- [ ] Loading state and transitions remain usable.

## Migration-Specific Verification (2.1.x)

- [ ] No runtime `propTypes` warnings expected in consumer usage.
- [ ] TypeScript-only contract usage validated in docs/examples.
- [ ] Existing public prop names and imperative controls remain functional.

## Results Log

| Area | Result | Notes |
| --- | --- | --- |
| Open / Close | PASS | Open/close/re-open flows verified on 2026-02-26. |
| Keyboard | PASS | Keyboard interactions verified on 2026-02-26. |
| Touch / Swipe | PASS | Touch/swipe behavior verified on 2026-02-26. |
| Thumbnail Toggle | PASS | Thumbnail tray toggle/sync/positioning verified on 2026-02-26. |
| Light Controls / Visual | Pending | Light mode + caption/counter navigation verified on 2026-02-26; loading/transitions still pending. |
| Migration-Specific Verification | Pending | |

## Release Gate Decision

- [ ] PASS: All critical flows verified with no blocking regressions.
- [ ] BLOCKED: Regressions found; release waits for fixes.
