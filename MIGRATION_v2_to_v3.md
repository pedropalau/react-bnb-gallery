# Migration Guide: v2 to v3

Last updated: 2026-03-06
From: `2.x`
To: `3.0.0` (and `3.0.0-next.*`)

## Summary

`v3` removes deprecated default exports.  
Use named imports only.

## Breaking Change

1. Default imports from package entry points are removed.

## Required Code Changes

### 1) Main package import

Before (v2):

```ts
import ReactBnbGallery from "react-bnb-gallery";
```

After (v3):

```ts
import { ReactBnbGallery } from "react-bnb-gallery";
```

### 2) Deep component imports that used default export

Before (v2 style):

```ts
import Gallery from "react-bnb-gallery/dist/components/gallery";
```

After (v3 style):

```ts
import { Gallery } from "react-bnb-gallery";
```

Use package-level named exports whenever possible.

## No Change Required

1. CSS usage through `react-bnb-gallery/dist/style.css`.
2. Core gallery runtime behavior and supported React versions (`^18 || ^19`).

## Recommended Migration Process

1. Install prerelease first for validation:

```bash
npm i react-bnb-gallery@next
```

2. Replace default imports with named imports.
3. Run your app and test the critical gallery flows:
   - open/close,
   - keyboard navigation,
   - next/prev controls,
   - thumbnail toggle behavior.
4. Upgrade to stable `3.0.0` when available.

## Quick Search Patterns

Find likely default imports:

```bash
rg "import\\s+[A-Z][A-Za-z0-9_]*\\s+from\\s+['\\\"]react-bnb-gallery['\\\"]" src
```

Find potential deep imports:

```bash
rg "react-bnb-gallery/dist/" src
```

## FAQ

### Why was this removed?

Default exports were deprecated in `2.x`. `v3` finalizes that migration for a clearer, consistent API surface.

### Is there a codemod?

Not yet. For most projects, a focused search/replace of default imports is sufficient.
