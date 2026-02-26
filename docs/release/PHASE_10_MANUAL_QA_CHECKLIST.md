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

- [ ] Left/Right arrows navigate photos.
- [ ] Escape closes gallery.
- [ ] Keydown events from inputs are ignored.
- [ ] Focus returns to prior element after close.

### Touch / Swipe

- [ ] Swipe left/right changes photo index.
- [ ] Swipe does not trigger unintended close.
- [ ] Touch callbacks fire in expected order.

### Thumbnail Toggle

- [ ] Toggle thumbnail tray open/closed.
- [ ] Active thumbnail stays synchronized with active photo.
- [ ] Scroll/positioning remains correct after multiple navigations.

### Light Controls / Visual

- [ ] Light mode controls render correctly.
- [ ] Caption and counter update correctly on navigation.
- [ ] Loading state and transitions remain usable.

## Migration-Specific Verification (2.1.x)

- [ ] No runtime `propTypes` warnings expected in consumer usage.
- [ ] TypeScript-only contract usage validated in docs/examples.
- [ ] Existing public prop names and imperative controls remain functional.

## Results Log

| Area | Result | Notes |
| --- | --- | --- |
| Open / Close | PASS | Open/close/re-open flows verified on 2026-02-26. |
| Keyboard | Pending | |
| Touch / Swipe | Pending | |
| Thumbnail Toggle | Pending | |
| Light Controls / Visual | Pending | |
| Migration-Specific Verification | Pending | |

## Release Gate Decision

- [ ] PASS: All critical flows verified with no blocking regressions.
- [ ] BLOCKED: Regressions found; release waits for fixes.
