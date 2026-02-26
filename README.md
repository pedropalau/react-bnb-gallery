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
    caption: 'Photo 1',
    subcaption: 'Author name or location',
  },
  {
    photo: 'https://example.com/photo2.jpg',
    thumbnail: 'https://example.com/photo2-thumb.jpg',
    caption: 'Photo 2',
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
| `backgroundColor` | `string` | `'rgba(0,0,0,1)'` | Background color of the gallery overlay. |
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
| `caption` | `string` | Primary caption shown below the photo. |
| `subcaption` | `string` | Secondary caption (author/location, etc.). |
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
