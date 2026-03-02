# AGENTS.md

Guidance for coding agents working in this repository.

## Project Snapshot
- Package: `react-bnb-gallery` (`2.x` line).
- Type: pnpm workspace with:
  - root package: React gallery library (Vite + TypeScript + Vitest + Biome)
  - `docs/`: Next.js docs/demo app
- Runtime target: React `^18 || ^19`.
- Node requirement: `>=22`.
- Package manager: `pnpm@10.30.3`.

## Repository Layout
- `src/`: library source (components, utils, types, CSS).
- `tests/`: Vitest + Testing Library tests.
- `docs/`: Next.js docs site and examples.
- `dist/`: build output (generated).
- `.changeset/`: changesets for versioning/release automation.
- `MODERNIZATION_PLAN_v2.md`: migration and phase tracking reference.

## Setup
```bash
pnpm install
```

## Core Commands
- Library quality checks:
```bash
pnpm lint
pnpm test
pnpm build
```
- Additional checks:
```bash
pnpm test:coverage
pnpm typecheck
pnpm lint:biome
pnpm format
```
- Docs app:
```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:lint
```

## Working Rules
- Keep changes scoped to the user request; avoid unrelated refactors.
- Prefer editing source files under `src/` and `docs/`; do not hand-edit `dist/` artifacts.
- Use Biome formatting/lint expectations (`pnpm lint:biome` / `pnpm format`).
- Maintain TypeScript compatibility and existing public API unless change explicitly requests a break.
- Preserve accessibility behavior (keyboard nav, labels, alt text) in gallery components.
- When touching docs examples or API docs, keep them aligned with actual library behavior.

## Testing Expectations
- Run targeted tests for changed behavior; run full `pnpm test` when feasible.
- For component behavior changes, prefer assertions through user-visible behavior (Testing Library style).
- Run `pnpm build` for any export/type/CSS contract change.
- If docs code changes significantly, run `pnpm docs:build`.

## Release & Versioning
- For publishable user-facing changes, add a changeset:
```bash
pnpm changeset
```
- Do not manually bump package versions in `package.json`; releases are driven by changesets.

## Agent Notes
- Use `rg`/`rg --files` for fast code search.
- Check for existing local instructions in `.agents/` when a task references migration or specialized workflows.
- If modernization/v2 migration work is requested, consult `MODERNIZATION_PLAN_v2.md` and related skill instructions before editing.
