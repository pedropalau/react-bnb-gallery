# React BnB Gallery v2 Modernization Plan

Last updated: 2026-02-25
Plan ID: v2
Target release version: 2.0.0
Current released baseline: 1.4.4

## Goal

Modernize the repository safely in phases, keep compatibility decisions explicit, and ship every change through documented pull requests.

## Working Agreement

1. Before starting any phase, we stop and answer the phase alignment questions in this file.
2. Implementation starts only after you approve those answers.
3. Each phase is delivered through one or more PRs with clear scope, tests, and migration notes.
4. If a decision changes mid-phase, we update this plan and the active PR description.

## Phase Roadmap

| Phase | Objective | Main Output | Estimated PRs |
| --- | --- | --- | --- |
| 1 | Baseline, tooling, and security foundation | Modern CI + dependency/update/security automation | 2-3 |
| 2 | Build and package modernization | Modern library build, package exports, clean artifacts | 2-4 |
| 3 | Runtime and API hardening | React 18+ support and core behavior fixes | 3-5 |
| 4 | Test modernization | Replace Enzyme, improve behavior coverage | 2-4 |
| 5 | Docs and example modernization | Modern docs/app stack and updated demos | 3-6 |
| 6 | Release hardening | Repeatable and verifiable release pipeline | 2-3 |
| 7 | TypeScript migration | Convert source to TypeScript with declaration-first compatibility | 3-6 |
| 8 | Toolchain simplification | Replace Sass, ESLint/Prettier, and Babel with a leaner stack | 3-6 |
| 9 | React surface modernization | Remove legacy React patterns and align component architecture to modern React + TS conventions | 2-5 |
| 10 | 2.1.x release execution | Manual verification, branding/docs refresh, release notes, changesets release PR, publish gate | 2-4 |

## Mandatory Alignment Questions Per Phase

### Phase 1: Baseline, Tooling, Security

Questions to answer before implementation:

1. Which package manager should be canonical (`npm`, `yarn`, or `pnpm`)?
2. What minimum Node.js version should we support for contributors and CI (recommended: Node 20 LTS)?
3. Should we add GitHub Dependabot and CodeQL now?
4. Should CI run only on `main` and PRs, or also on release branches/tags?
5. Do you want strict CI blocking for lint + test + build on every PR?

### Phase 2: Build and Package Modernization

Questions to answer before implementation:

1. Build tool preference for the library (`Rollup` modernized vs `Vite` library mode)?
2. Distribution target: dual `ESM + CJS` or `ESM-only` major release?
3. Should CSS stay as exported standalone file for backward compatibility?
4. Should we introduce TypeScript incrementally or keep JS + `.d.ts` initially?
5. Browser support target (modern evergreen only vs broader compatibility)?

### Phase 3: Runtime and API Hardening

Questions to answer before implementation:

1. React support policy: React 18+ only, or include React 17 compatibility?
2. Any API behavior we must keep 100% backward-compatible?
3. Should accessibility improvements be non-breaking only, or allow small breaking changes for correctness?
4. Should we remove deprecated props/APIs immediately or deprecate first?
5. Do you want a migration guide drafted in this phase?

Approved answers (2026-02-24):

1. React support policy: `React 18+` only for `2.0.0` (peer range: `^18 || ^19`).
2. Backward-compatibility boundary:
   - Default to preserving public prop names and core interaction flows (`open/close`, next/prev, thumbnail toggling, keyboard/touch navigation).
   - Behavior changes are allowed for bug fixes and standards correctness, with migration notes.
3. Accessibility improvements policy: allow small breaking changes when required for correctness (ARIA semantics, focus behavior, keyboard behavior), but prefer non-breaking fixes first.
4. Deprecated API policy: deprecate first within `2.x` (runtime warnings + docs), remove in next major unless an item is clearly unsafe/incorrect.
5. Migration guide: yes, draft and ship in this phase with before/after examples and a checklist.

### Phase 4: Test Modernization

Questions to answer before implementation:

1. Test runner preference (`Vitest` or `Jest`)?
2. Should we fully replace Enzyme in one phase or run mixed temporarily?
3. Coverage target threshold for CI (example: 80%)?
4. Do snapshot tests stay, or prioritize behavior-focused tests?
5. Do you want visual regression testing in scope now?

Approved answers (2026-02-24):

1. Test runner: `Vitest`.
2. Enzyme strategy: fully replace in this phase.
3. Coverage target: `80%` global threshold in CI (ratchet target to `90%` in later follow-up).
4. Test style: prioritize behavior-focused tests; keep snapshots minimal.
5. Visual regression: out of scope for now.

### Phase 5: Docs and Example Modernization

Questions to answer before implementation:

1. Keep Next.js for docs, or move to a lighter docs stack?
2. Keep separate `docs` and `example`, or unify under a workspace monorepo setup?
3. Demo app preference (`Vite` React app recommended)?
4. Hosting preference for docs/demo (GitHub Pages, Vercel, Netlify)?
5. Do you want design refresh only after technical migration, or during migration?

Approved answers (2026-02-24):

1. Docs stack: keep `Next.js` and upgrade to a modern supported version.
2. Repository layout: unify docs and examples into a single workspace/app structure.
3. Demo app preference: use `Next.js` for demos within the unified docs setup.
4. Hosting: `Vercel`.
5. Design refresh timing: do technical migration first, then design refresh in a follow-up phase/PR.

### Phase 6: Release Hardening

Questions to answer before implementation:

1. Versioning strategy: manual SemVer vs automated changesets?
2. Should release PRs be auto-generated or curated manually?
3. Do you want npm provenance/signing enabled?
4. Should changelog be generated automatically?
5. Should publishing require protected environment approvals?

Approved answers (2026-02-24):

1. Versioning strategy: automated `changesets`.
2. Release PRs: auto-generated.
3. npm provenance/signing: enabled.
4. Changelog: generated automatically from changesets.
5. Publishing approvals: require protected GitHub environment approvals.

### Phase 7: TypeScript Migration

Questions to answer before implementation:

1. Migration strategy: incremental file-by-file vs full conversion in one major PR train?
2. TypeScript strictness target (`strict: true` immediately vs staged strictness)?
3. Public API typing source of truth: generated `.d.ts` from TS build vs manually maintained declarations?
4. Do we allow temporary JS/TS mixed source during migration?
5. Should TypeScript migration be included in `2.0.0` scope or scheduled for `2.1.x`?

Approved answers (2026-02-25):

1. Migration strategy: one-shot migration (single coordinated TS conversion track).
2. TypeScript strictness: `strict: true` immediately.
3. Public API typing source of truth: generated `.d.ts` from the TypeScript build.
4. Source policy during migration: all TypeScript (no temporary JS/TS mixed source).
5. Release timing: schedule TypeScript migration for `2.1.x` (post-`2.0.0`).

### Phase 8: Toolchain Simplification

Questions to answer before implementation:

1. Sass replacement target: plain CSS + PostCSS, CSS Modules, Tailwind, or `vanilla-extract`?
2. Lint/format replacement: fully migrate to `Biome` (replacing ESLint + Prettier) in one phase?
3. Babel replacement policy: remove Babel config/plugins and rely on `Vite` (`esbuild`/`swc`) transforms only?
4. Migration strategy: do these changes happen in one coordinated phase or split into independent PR tracks (styles, lint/format, build transforms)?
5. Release timing: include toolchain simplification in `2.0.0` or schedule as post-`2.0.0` hardening (`2.1.x`)?

Approved answers (2026-02-25):

1. Sass replacement target: `Tailwind CSS`.
2. Lint/format replacement: fully migrate to `Biome` in this phase (replace ESLint + Prettier).
3. Babel replacement policy: remove Babel and rely on Vite transforms only.
4. Migration strategy: execute everything in one coordinated PR.
5. Release timing: schedule toolchain simplification for `2.1.x` (post-`2.0.0`).

### Phase 9: React Surface Modernization

Questions to answer before implementation:

1. Class-component migration scope: convert all remaining class components in this phase, or ship incrementally by risk area?
2. Runtime prop validation policy: keep `propTypes` for JS consumer runtime checks, or rely on TypeScript-only API contracts?
3. Legacy helper policy: keep `airbnb-prop-types` usage for now, or migrate to plain `prop-types` (or remove runtime validators entirely)?
4. Compatibility policy: are small behavior changes acceptable when refactoring class lifecycles to hooks, provided public props remain stable?
5. Release timing: target this modernization work for `2.0.0` completion, or schedule for `2.1.x` hardening?
6. Skill-assisted implementation policy: should we standardize Phase 9 React work using external skills guidance (`frontend-design`, `vercel-react-best-practices`) for implementation/review checklists?

Approved answers (2026-02-25):

1. Class-component migration scope: convert all remaining class components in this phase.
2. Runtime prop validation policy: remove `propTypes` and rely on TypeScript-only API contracts.
3. Legacy helper policy: remove `airbnb-prop-types` usage in this phase.
4. Compatibility policy: small behavior changes are acceptable during lifecycle-to-hooks refactors, provided public props remain stable.
5. Release timing: schedule React surface modernization for `2.1.x` hardening (post-`2.0.0`).
6. Skill-assisted implementation policy: yes, standardize implementation/review using `frontend-design` and `vercel-react-best-practices`.

### Phase 10: 2.1.x Release Execution

Questions to answer before implementation:

1. Confirm target release version: `2.1.0` now, or another `2.1.x` patch first?
2. Should manual QA be required as an explicit release gate before merging the release PR?
3. Should release notes emphasize migration impact first (`propTypes` removal, TS-only contracts), or list by phase chronology?
4. Do you want one combined changeset/release PR for all merged `2.1.x` work, or split if more fixes land during QA?
5. If manual QA finds regressions, should we block release until fixes merge, or allow release with known-issues notes?
6. Should Phase 10 include a branding/documentation refresh track (logo updates + README/docs polish) before release PR generation?

Approved answers (2026-02-26):

1. Target release version: `2.1.0` now.
2. Manual QA: required as an explicit release gate before merging the release PR.
3. Release notes structure: migration-impact first (including `propTypes` removal and TS-only contracts), followed by phase chronology.
4. Release PR strategy: one combined changeset/release PR for all merged `2.1.x` work.
5. Regression policy: block release until fixes merge (do not publish with known regressions).
6. Branding/docs scope: include branding and documentation refresh before release PR generation.

Proposed execution checklist (after alignment approval):

1. Build a manual QA checklist from critical user flows (open/close, keyboard, touch, thumbnail toggle, light mode controls).
2. Run manual QA and log outcomes/issues in a dedicated Phase 10 tracking PR.
3. Deliver branding/documentation refresh updates (logo assets, README/docs wording) in scoped docs PRs.
4. Finalize changelog/release notes for `2.1.x` migration guidance.
5. Generate/merge changeset release PR.
6. Publish through protected `npm-publish` environment approvals.

## Known High-Priority Technical Risks to Address

1. Legacy dependency stack pinned to 2020-2021 era packages.
2. Outdated React peer range (`^15 || ^16`) and Enzyme-based tests.
3. Outdated CI workflow versions and Node 12 publish workflow.
4. Core logic bugs found during initial audit:
   - `src/components/Gallery/Gallery.js`: `renderPreloadPhotos` does not return the generated array.
   - `src/utils/getPhrasePropTypes.js`: references wrong identifier, risking incorrect prop-type shape generation.
   - `src/components/Gallery/Gallery.js` and `src/components/Caption/Caption.js`: constructor-cached flags may go stale when props change.

## PR Creation Logic (Documentation-First Workflow)

### Branch and PR Scope Rules

1. One PR = one concern (avoid mixing unrelated refactors).
2. Prefer small PRs (target: under ~400 changed lines unless necessary).
3. Branch naming:
   - `chore/phase-1-ci-security`
   - `build/phase-2-library-packaging`
   - `fix/phase-3-gallery-runtime`
   - `test/phase-4-rtl-migration`
   - `docs/phase-5-site-migration`
   - `release/phase-6-automation`

### Per-PR Checklist (must be completed)

1. Problem statement and scope are written in PR description.
2. Linked phase and task IDs are listed.
3. Local validation commands and results are included.
4. Breaking changes are explicitly called out.
5. Migration notes are added if user-facing behavior changed.
6. Docs/README/changelog updates are included when relevant.
7. Security impact is noted (`none`, `low`, `medium`, `high`).

### PR Description Template

Use this structure for every PR:

```md
## Summary
- What changed and why.

## Scope
- In scope:
- Out of scope:

## Validation
- [ ] lint
- [ ] test
- [ ] build
- Commands run:

## Compatibility
- Breaking changes: yes/no
- If yes, migration steps:

## Security
- Risk level:
- New dependencies introduced:

## Documentation
- Updated files:

## Follow-ups
- Remaining tasks for next PR/phase:
```

### Suggested Git/GitHub Command Flow

```bash
# 1) branch
git checkout -b chore/phase-1-ci-security

# 2) implement + verify
# (run agreed lint/test/build commands)

# 3) commit with clear scope
git add -A
git commit -m "chore(ci): modernize workflows and add security automation"

# 4) push
git push -u origin chore/phase-1-ci-security

# 5) create draft PR (preferred until review-ready)
gh pr create --draft --title "Phase 1: CI and security baseline" --body-file .github/PULL_REQUEST_TEMPLATE.md
```

If `gh` is unavailable, create PR manually using the same template content.

## Merge and Release Guardrails

1. Require passing CI checks before merge.
2. Require at least one approval (or your explicit override).
3. Prefer squash merge with conventional message.
4. Tag release only after phase-level acceptance criteria are complete.

## Decision Log

Add decisions here as we align each phase:

- 2026-02-24: Initial plan created.
- 2026-02-26: Phase 10 alignment approved (`2.1.0` target, required manual QA gate, migration-impact-first release notes, single combined release PR, block on regressions, branding/docs refresh included pre-release PR).
- 2026-02-25: Phase 10 added to plan for `2.1.x` release execution sequencing; alignment answers pending.
- 2026-02-25: Phase 7 alignment approved (one-shot migration, strict TS, generated declarations, TS-only source, target `2.1.x`).
- 2026-02-25: Phase 8 alignment approved (Tailwind CSS, full Biome migration, remove Babel, one coordinated PR, target `2.1.x`).
- 2026-02-25: Phase 9 alignment approved (convert all class components, TS-only contracts, remove runtime prop validators, allow small behavior changes with stable props, standardize with skills guidance, target `2.1.x`).
- 2026-02-24: Plan renamed to `MODERNIZATION_PLAN_v2.md`.
- 2026-02-24: Modernization target set to version `2.0.0`.
- 2026-02-24: Phase 1 alignment approved.
  - Canonical package manager: `pnpm`.
  - Minimum Node version: `22 LTS`.
  - Security automation: `Dependabot + CodeQL` enabled.
  - CI trigger policy: `PRs + master + version tags`.
  - Required checks: `lint + test + build`.
- 2026-02-24: Phase 1 implementation validated as complete.
  - CI, Dependabot, CodeQL, and Node/pnpm policy are in place.
  - Transitional exception accepted: current build logs legacy `node-sass` runtime warnings in local validation.
  - Follow-up locked for Phase 2: remove Sass tooling/dependencies and eliminate Sass-related build warnings.
- 2026-02-24: Phase 2 alignment approved.
  - Build tool: `Vite` (library mode).
  - Distribution target: dual `ESM + CJS`.
  - CSS strategy: keep standalone exported CSS for now (Tailwind migration planned in future work).
  - Type strategy: keep JS + `.d.ts` in this phase; full `TypeScript` migration is a planned follow-up.
  - Browser support: modern evergreen browsers.
- 2026-02-24: Phase 2 implementation validated as complete.
  - Library build uses `Vite` library mode with dual `ESM + CJS` output and package `exports`.
  - Legacy root `react-scripts` dependency removed and root/example `node-sass` dependency usage removed.
  - Repository lockfile strategy aligned to canonical `pnpm` by removing stale Yarn lockfiles.
  - Local validation completed: `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
- 2026-02-24: Phase 3 alignment approved.
  - React support policy: `18+` only (`^18 || ^19` peer range).
  - Backward compatibility: preserve public props/core flows by default; allow correctness/bug-fix behavior changes with migration notes.
  - Accessibility policy: allow small breaking changes when needed for correctness.
  - Deprecation policy: deprecate first in `2.x`, remove in next major unless unsafe.
  - Migration guide: in scope for this phase.
- 2026-02-24: Phase 3 implementation validated as complete.
  - Core runtime fixes implemented for preload rendering, phrase prop-type mapping, and prop-change-safe gallery/caption controls.
  - React support policy applied in package metadata: peer range updated to `react/react-dom ^18 || ^19`.
  - Migration guidance added to `README.md` for `2.0.0` (React support, runtime behavior fixes, deprecation policy).
  - Transitional exception accepted: local test stack remains Enzyme/React 16 during this phase; test-stack migration is tracked in Phase 4.
  - Local validation completed: `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
- 2026-02-24: Phase 3 completion merged to `master` via PRs `#139` and `#140`.
- 2026-02-24: Phase 4 alignment approved.
  - Test runner: `Vitest`.
  - Enzyme strategy: full replacement in this phase.
  - Coverage threshold: `80%` global CI gate (future ratchet target: `90%`).
  - Test style: behavior-focused with minimal snapshots.
  - Visual regression: out of scope for this phase.
- 2026-02-24: Phase 4 implementation started (PR scope: test runner migration).
  - Migrated test execution from `Jest` to `Vitest` with `jsdom` and V8 coverage.
  - Replaced Enzyme-based tests with Testing Library-based behavior tests.
  - Enforced `80%` global coverage gate for statements/lines in CI baseline.
- 2026-02-24: Phase 4 implementation validated as complete.
  - Local validation completed: `pnpm lint`, `pnpm test`, `pnpm test:coverage`, and `pnpm build` all pass.
  - Coverage gate verified with V8 provider: statements `85.86%`, lines `85.86%` (>= `80%` threshold).
  - Transitional warning accepted for follow-up: React runtime warns on function-component `defaultProps` usage.
- 2026-02-25: Post-Phase-4 warning follow-up completed.
  - Removed function-component `defaultProps` assignments in `CloseButton` and `LoadingSpinner`, relying on JS default parameters.
  - Local validation completed: `pnpm lint` and `pnpm test` pass with warning-free test output.
- 2026-02-24: Phase 5 is now the active next phase (alignment questions pending approval before implementation).
- 2026-02-24: Phase 5 alignment approved.
  - Keep and modernize `Next.js` for docs.
  - Unify docs and examples into one setup.
  - Use `Next.js` for demos.
  - Deploy docs/demo on `Vercel`.
  - Schedule design refresh after technical migration (not during).
- 2026-02-24: Phase 5 implementation started (PR scope: unified modern Next.js docs/demo app).
  - Upgraded docs stack from legacy `Next.js 9` to modern `Next.js 16.1.6` with React 18.
  - Removed legacy MDX/plugin chain and converted docs content pages to standard Next pages.
  - Unified active docs/demo surface in `docs/` (homepage demo + docs routes) and deprecated standalone legacy `example` app usage.
  - Root scripts updated for unified docs workflow: `docs:dev`, `docs:build`, `docs:start`.
- 2026-02-24: Phase 5 implementation validated as complete.
  - Local validation completed: `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
  - Vercel deployment target is now represented by the Next.js docs app under `docs/`.
  - Follow-up locked for post-migration design refresh per approved phase policy.
- 2026-02-24: Phase 6 alignment approved.
  - Use `changesets` for automated versioning and release PR workflow.
  - Enable npm provenance/signing in publish workflow.
  - Generate changelog automatically from changesets.
  - Require protected environment approval for publish.
- 2026-02-24: Phase 6 implementation started (PR scope: release automation hardening).
  - Added `changesets` configuration and repository scripts for versioning and publish flow.
  - Replaced legacy tag-driven publish workflow with a `release` workflow using `changesets/action`.
  - Release workflow configured with npm provenance publish path and protected `npm-publish` environment gate.
  - Contributor guidance updated for changeset-driven releases.
- 2026-02-24: Phase 6 implementation validated as complete.
  - Local validation completed: `pnpm changeset status`, `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
  - Publish path requires GitHub secrets/env setup: `NPM_AUTH_TOKEN` secret and protected `npm-publish` environment approvals.
- 2026-02-24: Phase 7 added to plan for explicit TypeScript migration sequencing.
- 2026-02-24: Phase 8 added to plan for Sass/Biome/Babel modernization scope.
- 2026-02-25: Phase 7 alignment approved.
  - Migration strategy: incremental, file-by-file PR train.
  - Strictness target: `strict: true` from day one, with temporary scoped `@ts-expect-error` only when necessary.
  - Public typing source: generated declarations from TypeScript build.
  - Mixed source policy: temporary JS/TS mix is allowed during migration.
  - Release timing: schedule TypeScript migration work for `2.1.x` (post-`2.0.0` stabilization).
- 2026-02-25: Phase 7 implementation started (PR scope: TypeScript scaffolding and CI gate).
  - Added root TypeScript configuration (`tsconfig.json`) with strict mode and no-emit typechecking baseline.
  - Added declaration-build scaffold (`tsconfig.build.json`) for future `.ts/.tsx` conversion batches.
  - Upgraded repository TypeScript toolchain to `typescript@^5.9.3`.
  - Added `typecheck` workflow coverage in CI and release preflight validation.
- 2026-02-25: Phase 7 implementation validated as complete.
  - Final entrypoint conversion completed (`src/index.ts`) and declaration surface reconciled to generated `dist/types/index.d.ts`.
  - Phase 7 PR train merged in sequence to `master`: `#147`, `#148`, `#149`, `#150`, `#151`, `#152`, and final cleanup `#153`.
  - Full local validation completed on final batch: `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
- 2026-02-25: Phase 8 implementation started (PR scope: Biome parallel introduction).
  - Added baseline Biome configuration via `biome.json` scoped to source/tests and Vite config.
  - Added `@biomejs/biome` to root development tooling and lockfile.
  - Added parallel scripts: `pnpm lint:biome` (error-only diagnostics) and `pnpm format:biome` (opt-in formatter write).
  - Existing lint/test/build gates remain unchanged (`eslint` + `stylelint` + `tsc`) during this PR.
- 2026-02-25: Phase 8 PR-3 implementation validated as complete.
  - Local validation completed: `pnpm lint:biome`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
  - Transitional follow-up locked for next PR: Biome cutover and removal of legacy lint/format stack after parity sign-off.
- 2026-02-25: Phase 8 PR-4 implementation validated as complete (Biome cutover).
  - Canonical lint/format tooling switched to direct `biome` scripts (`pnpm lint:biome`, `pnpm format:biome`) with `pnpm lint` as the CI-facing gate.
  - Legacy lint/format stack removed: `eslint*`, `stylelint*`, and `prettier` dependencies plus `.eslintrc`, `.eslintignore`, `.stylelintrc`, and `.stylelintignore`.
  - Biome scope expanded to include `src/css/**/*.css`; legacy `alpha(opacity=...)` declarations replaced with standards-based `filter: opacity(...)` for parser compatibility.
  - CI/release workflow lint invocations remain canonical through `pnpm lint` (no command divergence introduced).
  - Local validation completed: `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
- 2026-02-25: Phase 8 PR-5 implementation validated as complete (Ultracite wrapper pinning).
  - Reintroduced optional wrapper scripts with pinned Ultracite version for operator convenience: `check`/`fix` now use `ultracite@7.2.3`.
  - Canonical CI lint path remains direct Biome via `pnpm lint`.
  - Local validation completed: `pnpm check` and `pnpm lint` pass.
- 2026-02-25: Phase 8 PR-6 implementation validated as complete (legacy example retirement).
  - Removed deprecated standalone CRA-based `example/` app sources and configuration (`react-scripts`-based scaffold no longer maintained).
  - Replaced `example/README.md` with a migration pointer to unified docs/demo usage (`pnpm docs:dev`).
  - Local validation completed: `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
- 2026-02-25: Phase 8 implementation finalized on `master`.
  - Merged PR train: `#155`, `#156`, `#157`, and `#158`.
  - Post-phase warning follow-up merged: `#159` (removed function-component `defaultProps` warnings).
- 2026-02-25: Phase 9 added to plan for React surface modernization; alignment answers pending before implementation.
- 2026-02-25: Phase 9 alignment updated (partial approval captured).
  - Approved: migrate remaining class components in one coordinated pass.
  - Approved: remove runtime `propTypes` in favor of TypeScript-only contracts.
  - Approved: remove `airbnb-prop-types` usage.
  - Pending clarification: compatibility tolerance for lifecycle-to-hooks refactors (strict parity vs allowing scoped behavior corrections).
  - Approved: schedule Phase 9 delivery for `2.1.x`.
  - Approved: use installed external skills guidance for implementation quality controls in this phase (`frontend-design`, `vercel-react-best-practices`).
- 2026-02-25: External skills installed for Phase 9 execution support.
  - Installed `frontend-design` from `anthropics/skills` into `/home/pedro/.codex/skills/frontend-design`.
  - Installed `vercel-react-best-practices` from `vercel-labs/agent-skills` into `/home/pedro/.codex/skills/vercel-react-best-practices`.
- 2026-02-25: Phase 9 implementation started (PR-1 scope: class-to-hooks conversion + runtime validator removal).
  - Converted remaining class components in `src/` to function components with hooks and preserved imperative gallery controls through `forwardRef`/`useImperativeHandle`.
  - Removed runtime validation layer from library source (`propTypes`, `airbnb-prop-types`, shape helpers, and related compatibility utility files).
  - Updated package dependencies and tests to reflect TypeScript-only runtime contracts for library API validation.
  - Local validation completed: `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
- 2026-02-25: Phase 9 follow-up test hardening completed (PR-1 continuation scope).
  - Added behavior-focused tests for controlled `activePhotoIndex` caption sync and touch swipe callback paths in `Gallery`.
  - Added keyboard behavior tests in `ReactBnbGallery` for Escape close handling and input-target keydown ignore behavior.
  - Local validation completed: `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
- 2026-02-25: Phase 9 PR-2 started (docs and migration guidance hardening).
  - Updated `README.md` prop defaults and descriptions to match current runtime behavior (`wrap`, `preloadSize`, `backgroundColor`, `zIndex`, and `light`).
  - Added `2.1.x` migration guidance documenting removal of runtime `propTypes`/`airbnb-prop-types` validation and TS-first contract expectations.
- 2026-02-25: Phase 9 PR-2 validated as complete.
  - Local validation completed: `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
  - Documentation/migration guidance updates merged to `master` via PR `#161`.
- 2026-02-25: Phase 9 implementation finalized on `master`.
  - Merged Phase 9 PR train: `#160` and `#161`.
  - Phase goals completed: class-component migration, TypeScript-only runtime contracts, legacy runtime validator removal, behavior-parity hardening tests, and migration/docs alignment.
- 2026-02-25: Phase 10 is now the active next phase (alignment questions pending approval before implementation).
- 2026-02-26: Phase 10 alignment closure completed; release execution checklist is now unblocked.
- 2026-02-25: Phase 10 implementation started (PR-1 scope: release-plan + branding/docs kickoff).
  - Added explicit branding/documentation refresh scope to Phase 10 release execution track.
  - Replaced root logo asset usage from `rbg-logo.png` to `logo.svg` and updated README reference.
- 2026-02-26: Phase 10 implementation continued (PR-2 scope: QA gate + release PR preparation).
  - Added manual QA gate document for critical user flows at `docs/release/PHASE_10_MANUAL_QA_CHECKLIST.md`.
  - Added combined `2.1.0` changeset for `react-bnb-gallery` at `.changeset/bright-hounds-relax.md`.
- 2026-02-26: Phase 10 release preflight validated as passing.
  - Local validation completed: `pnpm changeset status`, `pnpm lint`, `pnpm test`, `pnpm build`, and `pnpm docs:build` all pass.
  - Changeset status now reports a pending `minor` bump for `react-bnb-gallery` (release PR generation unblocked).

## v2.x Backlog (Post-2.1.0)

- [#37](https://github.com/pedropalau/react-bnb-gallery/issues/37): add explicit image alt fields (for example `alt` and `thumbnailAlt`) while keeping `caption` as the default fallback for backward compatibility.
  - Target scope: upcoming `v2.x.x` patch/minor delivery after `2.1.0` release execution.
- [#42](https://github.com/pedropalau/react-bnb-gallery/issues/42): fix `wrap` boundary behavior so runtime navigation semantics match documented expectations.
  - Target scope: upcoming `v2.x.x` patch/minor delivery after `2.1.0` release execution.
- [#43](https://github.com/pedropalau/react-bnb-gallery/pull/43) concept: support `ReactNode` values for `caption` and `subcaption`.
  - Target scope: upcoming `v2.x.x` patch/minor delivery after `2.1.0` release execution.
  - Delivery note: reimplement with current architecture/types/tests/docs; do not revive legacy PR code directly.

## Execution Loop We Will Follow

1. Select phase.
2. Answer that phase’s mandatory questions.
3. I restate agreed decisions for confirmation.
4. I implement changes in scoped commits.
5. I open/prepare PR(s) with checklist and validation evidence.
6. We review, adjust, and merge.
7. Update this plan with decisions and outcomes.
