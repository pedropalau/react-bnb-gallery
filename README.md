<p>
  <img alt="react-bnb-gallery" width="250" src="https://raw.githubusercontent.com/peterpalau/react-bnb-gallery/master/rbg-logo.png" /><br />
  Friendly, customizable and accessible-ready simple photo gallery based on React.
</p>

> **Active Development Notice:** This repository is currently under active development with the assistance of AI tools. Expect frequent updates, refactors, and improvements.

<p>
  <a href="https://www.npmjs.com/package/react-bnb-gallery" target="_blank"><img src="https://img.shields.io/npm/v/react-bnb-gallery.svg" alt="NPM"></a>
  <a href="http://www.npmjs.com/package/react-bnb-gallery" target="_blank"><img src="http://img.shields.io/npm/dm/react-bnb-gallery.svg?style=flat" alt="Download Count" /></a>
  <a href="https://github.com/peterpalau/react-bnb-gallery/actions" target="_blank"><img src="https://github.com/peterpalau/react-bnb-gallery/actions/workflows/ci.yml/badge.svg" alt="Build Status" /></a>
</p>

------

## Install

You can install [react-bnb-gallery](https://www.npmjs.com/package/react-bnb-gallery) from [npm](https://www.npmjs.com/).

```bash
npm install react-bnb-gallery
```

```bash
yarn add react-bnb-gallery
```

```bash
pnpm add react-bnb-gallery
```

Don't forget to import the stylesheet:

```js
import 'react-bnb-gallery/dist/style.css';
```

## Usage

```jsx
import React, { useState } from 'react';
import ReactBnbGallery from 'react-bnb-gallery';
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

## Props

### `<ReactBnbGallery />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `photos` | `Photo[] \| string[]` | — | **Required.** Array of photo objects or plain URL strings. |
| `onClose` | `() => void` | — | **Required.** Callback fired when the gallery is closed. |
| `show` | `boolean` | `false` | Controls whether the gallery modal is visible. |
| `activePhotoIndex` | `number` | `0` | Index of the photo shown on open. |
| `showThumbnails` | `boolean` | `true` | Show the thumbnail strip. |
| `keyboard` | `boolean` | `true` | Enable keyboard navigation (arrow keys, Escape). |
| `wrap` | `boolean` | `true` | Cycle continuously through photos instead of hard stops. |
| `preloadSize` | `number` | `1` | Number of adjacent photos to preload. |
| `opacity` | `number` | `1` | Background overlay opacity (0–1). |
| `backgroundColor` | `string` | `'#000'` | Background color of the gallery. |
| `zIndex` | `number` | — | CSS `z-index` for the modal. |
| `phrases` | `object` | — | Custom labels for UI strings (e.g. close button, counters). |
| `activePhotoPressed` | `() => void` | — | Callback fired when the active photo is clicked. |
| `nextButtonPressed` | `() => void` | — | Callback fired when the next button is pressed. |
| `prevButtonPressed` | `() => void` | — | Callback fired when the previous button is pressed. |
| `leftKeyPressed` | `() => void` | — | Callback fired when the left arrow key is pressed. |
| `rightKeyPressed` | `() => void` | — | Callback fired when the right arrow key is pressed. |

### `Photo` object

| Field | Type | Description |
|---|---|---|
| `photo` | `string` | **Required.** URL of the full-size image. |
| `thumbnail` | `string` | URL of the thumbnail image (recommended: `100×67px`). |
| `caption` | `string` | Short description shown below the photo. |
| `subcaption` | `string` | Secondary description (e.g. author or location). |
| `number` | `number` | Override the displayed photo number. |

## Live Demo

The demo and documentation are available at the [docs site](https://peterpalau.github.io/react-bnb-gallery/). To run them locally:

```bash
pnpm docs:dev
```

![Demo](https://raw.githubusercontent.com/peterpalau/react-bnb-gallery/master/react-bnb-demo.png)

## License

This package has been released under the [MIT Licence](https://raw.githubusercontent.com/peterpalau/react-bnb-gallery/master/LICENSE).

## Updates

To view the full changelog visit [CHANGELOG.md](https://github.com/peterpalau/react-bnb-gallery/blob/master/CHANGELOG.md).

## Migration to 2.0.0

### React support

- `react-bnb-gallery@2.x` requires `react` and `react-dom` `^18 || ^19`.
- React 15/16 are no longer supported.

### Breaking changes

- Preload images are now correctly returned/rendered by the gallery preload path.
- Gallery and caption controls now react correctly when the `photos` prop changes at runtime.
- The `phrases` prop-type shape is now generated from the keys of the provided object.

### Deprecation policy

Deprecated APIs receive warnings and documentation during `2.x`, then are removed in the next major release unless doing so would be unsafe.

## Contributing

If you're interested in contributing please read the [contributing docs](https://github.com/peterpalau/react-bnb-gallery/blob/master/CONTRIBUTING.md) **before submitting a pull request**.
