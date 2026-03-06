---
"react-bnb-gallery": major
---

Remove deprecated API paths and enforce the array-only photo contract.

Breaking changes:
- Removed `backgroundColor` from `ReactBnbGalleryProps`.
  - Use CSS token `--rbg-overlay` or `styles.overlay` instead.
- Removed `direction` from `ReactBnbGalleryProps`.
  - Navigation direction is now internal and controlled by gallery state/actions.
- `photos` now only accepts `Array<string | GalleryPhoto>`.
  - Passing a single string/object is no longer supported.

Why:
- These props were deprecated compatibility paths and added extra branching in runtime logic and docs.
- Keeping only supported contracts simplifies behavior, typings, and maintenance.

How to migrate:
1. Replace any `backgroundColor` usage with CSS token theming:
   - `:root { --rbg-overlay: rgba(...); }`
   - or pass `styles={{ overlay: { backgroundColor: '...' } }}`
2. Remove any `direction` prop usage from gallery calls.
3. Ensure every `photos` value is an array:
   - Before: `photos="https://example.com/a.jpg"`
   - After: `photos={["https://example.com/a.jpg"]}`
