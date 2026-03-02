<p align="center">
  <a href="https://bnb-gallery.vercel.app" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/pedropalau/react-bnb-gallery/HEAD/.github/logo-dark.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/pedropalau/react-bnb-gallery/HEAD/.github/logo-light.svg" />
      <img alt="react-bnb-gallery" src="https://raw.githubusercontent.com/pedropalau/react-bnb-gallery/HEAD/.github/logo-light.svg" width="350" height="85" style="max-width: 100%;">
    </picture>
  </a>
</p>

<p align="center">
  Friendly, customizable and accessible-ready simple photo gallery based on React, inspired by Airbnb.
</p>

<p align="center">
  <a href="https://github.com/peterpalau/react-bnb-gallery/actions"><img src="https://img.shields.io/github/actions/workflow/status/pedropalau/react-bnb-gallery/ci.yml?branch=master" alt="Build Status" /></a>
  <a href="http://www.npmjs.com/package/react-bnb-gallery"><img src="http://img.shields.io/npm/dm/react-bnb-gallery.svg?style=flat" alt="Download Count" /></a>
  <a href="https://www.npmjs.com/package/react-bnb-gallery"><img src="https://img.shields.io/npm/v/react-bnb-gallery.svg" alt="NPM"></a>
  <a href="https://github.com/pedropalau/react-bnb-gallery/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/react-bnb-gallery.svg" alt="License"></a>
</p>

---

## Install

```bash
npm install react-bnb-gallery
```

```bash
yarn add react-bnb-gallery
```

```bash
pnpm add react-bnb-gallery
```

Import styles once in your app entrypoint:

```ts
import 'react-bnb-gallery/dist/style.css';
```

## Usage

```tsx
import { useState } from 'react';
import { ReactBnbGallery } from 'react-bnb-gallery';
import 'react-bnb-gallery/dist/style.css';

const PHOTOS = [
  {
    photo: 'https://example.com/photo1.jpg',
    thumbnail: 'https://example.com/photo1-thumb.jpg',
    alt: 'Sunset over mountain ridge',
    thumbnailAlt: 'Small preview of mountain sunset',
    caption: 'Photo 1',
    subcaption: 'Author name or location',
  },
  {
    photo: 'https://example.com/photo2.jpg',
    thumbnail: 'https://example.com/photo2-thumb.jpg',
    caption: (
      <span>
        Photo 2 by <a href="https://example.com/author">Author</a>
      </span>
    ),
    subcaption: <em>Taken at sunset</em>,
  },
];

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Gallery</button>
      <ReactBnbGallery
        show={open}
        photos={PHOTOS}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
```

## Styling Tokens

The distributed stylesheet uses semantic CSS custom properties (shadcn-style token contract). The gallery reads these tokens directly, so you can fully theme it from CSS:
- `--rbg-radius`
- `--rbg-foreground`
- `--rbg-foreground-subtle`
- `--rbg-foreground-muted`
- `--rbg-overlay`
- `--rbg-icon`
- `--rbg-spinner-track`
- `--rbg-spinner-head`
- `--rbg-photo-shadow`
- `--rbg-z-modal`

You can override tokens anywhere above the gallery in your cascade:

```css
:root {
  --rbg-radius: 0.5rem;
  --rbg-foreground: #f8fafc;
  --rbg-foreground-subtle: rgba(248, 250, 252, 0.82);
  --rbg-foreground-muted: rgba(248, 250, 252, 0.72);
  --rbg-overlay: rgb(8, 10, 14);
  --rbg-icon: var(--rbg-foreground);
  --rbg-spinner-track: rgba(248, 250, 252, 0.2);
  --rbg-spinner-head: var(--rbg-foreground);
  --rbg-photo-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.45);
}
```

Default light-mode token overrides are applied via `.mode-light` (or `.rbg-light`).

## CSS Architecture

- Namespace: all public classes are prefixed with `gallery-` to avoid collisions.
- States: component state classes use `is-*` (`is-open`, `is-collapsed`, `is-active`).
- Legacy state aliases (`hide`, `open`, `active`) are still emitted for backward compatibility in `2.x`.
- Deprecated state aliases (removed next major):
  - `loading` → `is-loading`
  - `hide` → `is-thumbnails-collapsed` (figcaption state) or `is-open` (toggle state)
  - `open` → `is-collapsed`
  - `active` → `is-active`
- Selector strategy: prefer direct element hooks (`gallery-photo-button`, `gallery-thumbnail-image`) instead of deep descendant selectors.
- Theming contract: use `--rbg-*` tokens as the stable customization surface.

## Exports

- `ReactBnbGallery` (recommended)
- `Gallery`
- Types: `ReactBnbGalleryProps`, `GalleryPhoto`, `GalleryPhrases`, `GalleryController`

> `default` export is deprecated in `2.x` and will be removed in the next major version.

## Props

### `<ReactBnbGallery />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `activePhotoIndex` | `number` | `0` | Index of the photo shown on open. |
| `activePhotoPressed` | `() => void` | `undefined` | Callback fired when the active photo is clicked. |
| `backgroundColor` | `string` | `undefined` | Deprecated in `2.x`, ignored at runtime, and planned for removal in next major. Use CSS token `--rbg-overlay`. |
| `direction` | `string` | `'forwards'` | Deprecated in `2.x`; planned for removal in next major. |
| `keyboard` | `boolean` | `true` | Enable keyboard navigation (arrow keys, Escape). |
| `leftKeyPressed` | `() => void` | `undefined` | Callback fired when the left arrow key is pressed. |
| `light` | `boolean` | `false` | Enables light mode styles for controls. |
| `nextButtonPressed` | `() => void` | `undefined` | Callback fired when the next button is pressed. |
| `onClose` | `() => void` | `undefined` | Callback fired when the gallery is closed. |
| `opacity` | `number` | `1` | Background overlay opacity (0-1). |
| `photos` | `string \| GalleryPhoto \| Array<string \| GalleryPhoto>` | `[]` | Photos to render. Non-array input is deprecated in `2.x`. |
| `phrases` | `GalleryPhrases` | `defaultPhrases` | Custom labels for UI strings. |
| `preloadSize` | `number` | `5` | Number of adjacent photos to preload. |
| `prevButtonPressed` | `() => void` | `undefined` | Callback fired when the previous button is pressed. |
| `rightKeyPressed` | `() => void` | `undefined` | Callback fired when the right arrow key is pressed. |
| `show` | `boolean` | `false` | Controls whether the gallery modal is visible. |
| `showThumbnails` | `boolean` | `true` | Show the thumbnail strip. |
| `wrap` | `boolean` | `false` | Wrap continuously through photos. |
| `zIndex` | `number` | `2000` | CSS `z-index` for the modal overlay. |

### `GalleryPhoto`

| Field | Type | Description |
|---|---|---|
| `photo` | `string` | URL of the full-size image. |
| `thumbnail` | `string` | URL of the thumbnail image. |
| `alt` | `string` | Alt text for the full-size image. Falls back to `caption` when omitted. |
| `thumbnailAlt` | `string` | Alt text for the thumbnail image. Falls back to `alt`, then `caption`. |
| `caption` | `ReactNode` | Primary caption shown below the photo. |
| `subcaption` | `ReactNode` | Secondary caption (author/location, etc.). |
| `number` | `number` | Override the displayed photo number. |

## Compatibility

- `react` + `react-dom`: `^18 || ^19`
- Runtime validation via `propTypes` was removed in `2.1.x`; TypeScript declarations are the source of truth.

## Live Demo

Docs and demo: [https://peterpalau.github.io/react-bnb-gallery/](https://peterpalau.github.io/react-bnb-gallery/)

Run locally:

```bash
pnpm docs:dev
```

![Demo](https://raw.githubusercontent.com/peterpalau/react-bnb-gallery/master/react-bnb-demo.png)

## Development

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

## Migration Notes

### `2.0.0`

- Upgrade to `react` + `react-dom` `^18 || ^19`.
- React 17 and older are no longer supported.

### `2.1.x`

- Runtime `propTypes` and `airbnb-prop-types` validation were removed.
- Added `GalleryPhoto.alt` and `GalleryPhoto.thumbnailAlt` with backward-compatible fallback to `caption`.
- Added `GalleryPhoto.caption` and `GalleryPhoto.subcaption` support for `ReactNode` content.
- Deprecated (planned removal next major):
  - non-array `photos` input
  - `direction` prop

## Roadmap

- v3 roadmap: [docs/release/V3_ROADMAP.md](docs/release/V3_ROADMAP.md)

## License

MIT: [LICENSE](https://raw.githubusercontent.com/peterpalau/react-bnb-gallery/master/LICENSE)

## Changelog

See [CHANGELOG.md](https://github.com/peterpalau/react-bnb-gallery/blob/master/CHANGELOG.md).

## Contributing

Read [CONTRIBUTING.md](https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md) before opening a pull request.
