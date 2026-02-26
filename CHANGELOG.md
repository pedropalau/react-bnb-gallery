# Change Log

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
