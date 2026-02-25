---
"react-bnb-gallery": major
---

## 2.0.0

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
