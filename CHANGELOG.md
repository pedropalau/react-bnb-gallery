# Change Log

## 3.0.0-next.6

### Minor Changes

- 9a1e301: Add customizable motion and image adaptation options for `3.0.0-next.6`.

  New props:

  - `animations` to control transition preset (`slide`, `fade`, `zoom`, `none`), duration, easing, and feedback behavior.
  - `animations.openPreset` / `openDurationMs` / `openEasing` to customize modal open animation (`fade`, `fade-up`, `zoom`, `none`).
  - `animations.closePreset` / `closeDurationMs` / `closeEasing` to customize modal close animation (`fade`, `fade-down`, `zoom`, `none`).
  - `imageFit` to adapt active media rendering (`contain` or `cover`).

  This keeps touch gestures, keyboard navigation, and component-slot customization intact while improving runtime motion flexibility.

## 3.0.0-next.5

### Major Changes

- f2f73cb: Remove deprecated API paths and enforce the array-only photo contract.

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

## 3.0.0-next.4

### Minor Changes

- eb1fff1: Improve gallery customization with a new theming layer and component-slot API.

  - Add `components` prop to replace internal UI slots (`Overlay`, `PhotoCounter`, `ModalContainer`, `CloseButton`, `PrevButton`, `NextButton`, `Photo`, `Caption`, `Thumbnail`, `TogglePhotoList`).
  - Add `classNames` and `styles` props for lightweight styling overrides without replacing internal rendering.
  - Export new customization types (`GalleryComponents`, `GalleryClassNames`, `GalleryStyles`, and slot prop types) from the package entrypoint.
  - Update docs with a dedicated "Theming & Component Slots" section and usage examples.

## 3.0.0-next.3

### Minor Changes

- 5481c51: Add a new `renderCaptionActions` render prop to inject custom controls in the caption action area.

  The slot renders next to the existing photo-list toggle and receives context (`current`, `currentPhoto`, `photos`, `showThumbnails`) so consumers can build action buttons (for example download/share actions) without forking the gallery layout.

## 3.0.0-next.2

### Minor Changes

- 10717b8: Add active-photo zoom and pan support in the gallery viewport.

  This introduces opt-in/controlled zoom behavior through new props:

  - `enableZoom` (default `true`)
  - `maxZoom` (default `3`)
  - `zoomStep` (default `0.25`)

  Zoom is gesture-only (no visible zoom controls): desktop wheel/trackpad zoom, mobile pinch-to-zoom, and pan while zoomed. Swipe/click-next interactions are disabled while zoom mode is active, and pan bounds are clamped using rendered media dimensions.

## 3.0.0-next.1

### Patch Changes

- 028bfc8: Align documentation for the v3 prerelease.

  Updated installation docs and README with `@next` guidance, named-import-only messaging, and a direct link to the v2-to-v3 migration guide.

## 3.0.0-next.0

### Major Changes

- bd255cc: Remove all deprecated default exports across the package and keep only named exports.

  This finalizes the deprecation path and requires consumers to update imports from default style to named imports.

## 2.2.1

### Patch Changes

- a04110d: Fix library CSS packaging so `dist/style.css` only ships gallery styles.

  Removed the unintended Tailwind import from the library stylesheet and organized rules into explicit cascade layers (`rbg-tokens`, `rbg-components`, `rbg-motion`) without changing gallery behavior.

## 2.2.0

### Minor Changes

- Prepare `2.2.0` with styling and migration improvements while preserving 2.x compatibility:

  - Keep `backgroundColor` deprecated, but restore it as a compatibility alias for overlay color in 2.x.
  - Add and document stable `gallery-*` CSS hooks and `is-*` state classes.
  - Expand token-based theming guidance around the `--rbg-*` contract.
  - Document a clearer 2.x -> 3.0.0 deprecation and migration path.

## 2.1.5

### Patch Changes

- ebea33c: Add support for `ReactNode` values in `GalleryPhoto.caption` and `GalleryPhoto.subcaption`, so consumers can render rich caption content (for example links and styled metadata). Keep accessibility fallbacks safe by using text-only caption values for image alt/thumbnail labels when explicit alt fields are not provided.

## 2.1.4

### Patch Changes

- 3465f6a: Fix Firefox click handling for the active gallery image by ensuring the active photo button consistently occupies the full photo area, restoring reliable `activePhotoPressed` callback behavior when clicking the image.

## 2.1.3

### Patch Changes

- a048fa7: Add `GalleryPhoto.alt` and `GalleryPhoto.thumbnailAlt` to support explicit accessible image text for main and thumbnail images. Keep backward-compatible fallback behavior (`caption` remains default; thumbnail falls back to `alt` then `caption`).

## 2.1.2

### Patch Changes

- Fix `wrap` boundary navigation semantics so:

  - `wrap={false}` stops at the first/last photo.
  - `wrap={true}` loops across boundaries as documented.

  Also adds behavior tests for keyboard navigation at boundaries and control visibility in both wrap modes.

## 2.1.0

### Minor Changes

- 6fd8b74: Prepare the `2.1.0` release train with the post-`2.0.0` modernization work:

  - TypeScript migration finalized with strict typing and generated declarations.
  - Runtime `propTypes` and `airbnb-prop-types` validation removed in favor of TS-only contracts.
  - React surface modernization completed via hooks-based internals while keeping the public API stable.
  - Fixed thumbnail strip synchronization when opening the gallery at a non-zero `activePhotoIndex`.
  - Docs and migration guidance updated for `2.1.x` adoption.

## 2.0.0

### Major Changes

- bbbe07c: ## 2.0.0

  ### Breaking changes

  - React peer support is now `^18.0.0 || ^19.0.0`.
  - React 17 and older are no longer supported.

  ### What changed

  - Modernized the library build and package exports with a Vite-based pipeline and dual ESM/CJS output.
  - Hardened runtime behavior in the gallery and related utilities to address correctness issues found during modernization.
  - Migrated tests to Vitest + Testing Library with behavior-focused coverage and CI gating.
  - Modernized and unified docs/demo experience under a current Next.js app structure.
  - Hardened release automation with Changesets-based versioning and npm provenance publishing.

  ### Migration notes

  - Upgrade your application to React 18+ before adopting `react-bnb-gallery@2.0.0`.
  - Reinstall dependencies with `pnpm` if your local setup still reflects legacy lockfile/package-manager state.

<!--
- []  https://github.com/peterpalau/react-bnb-gallery/pulls
-->

## 1.4.3

- [enhancement] Updates dependencies

## 1.3.1

- [enhancement] Creates actions and updates workflow

## 1.2.6

- [enhancement] Updates dependencies
- [enhancement] Integrates with GitHub Packages

## 1.2.5

- [fix] Wrong thumbnails visualization

## 1.2.4

- [enhancement] Updates dependencies
- [enhancement] Updates development dependencies

## 1.2.3

- [fix] Thumbnails list hide/show styles
- [enhancement] More improvements to the gallery styles

## 1.2.2

- [fix] Lot of wrong styles
- [enhancement] Updates images visualization

## 1.2.1

- [fix] Wrong loading spinner style

## 1.2.0

- [fix] Updates multiple dependencies
- [enhancement] Accept path-only images

## 1.1.9

- [fix] Correctly bind the `zIndex` property

## 1.1.8

- [fix] Update typings of the package details
- [enhancement] Folder organization
- [enhancement] Update the visual of the component

## 1.1.7

- [enhancement] Updates multiple dependencies.
- [enhancement] Replace `npm` with `yarn`.
- [enhancement] `Gallery` is exported now as an individual component
- [fix] All the images are loaded at the same time

## 1.1.6

- [enhancement] Using the latest version of some dependencies.
- [enhancement] `react-scripts` version updated for the example showcase.
- [fixed] Some vulnerabilities issues

## 1.1.5

- [fix] Does not work with TypeScript ([#2](https://github.com/peterpalau/react-bnb-gallery/issues/2))
- [fix] Warning `Using "external-helpers" plugin with rollup is deprecated`.

## 1.1.4

- [new] Added `opacity` property to set the opacity level.
- [new] Added `backgroundColor` property to set the background color.
- [new] Added `zIndex` property to stack order relative to other components.

## 1.0.4

- [new] Testing.
- [fix] Code style.

## 1.0.3

- [new] Allow to disable keyboard navigation by the `keyboard` prop.
- [fix] Better prop types validation.

## 1.0.2

- [new] Allow an array of urls instead of objects.
- [fix] Fix incorrect dynamic position offset of active thumbnails.

## 1.0.1

- [new] Keyboard support, for `Left` and `Right` arrows and `Esc` key.
