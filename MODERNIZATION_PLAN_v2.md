# React BnB Gallery v2 Modernization Plan

Last updated: 2026-02-24
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

### Phase 5: Docs and Example Modernization

Questions to answer before implementation:

1. Keep Next.js for docs, or move to a lighter docs stack?
2. Keep separate `docs` and `example`, or unify under a workspace monorepo setup?
3. Demo app preference (`Vite` React app recommended)?
4. Hosting preference for docs/demo (GitHub Pages, Vercel, Netlify)?
5. Do you want design refresh only after technical migration, or during migration?

### Phase 6: Release Hardening

Questions to answer before implementation:

1. Versioning strategy: manual SemVer vs automated changesets?
2. Should release PRs be auto-generated or curated manually?
3. Do you want npm provenance/signing enabled?
4. Should changelog be generated automatically?
5. Should publishing require protected environment approvals?

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

## Execution Loop We Will Follow

1. Select phase.
2. Answer that phase’s mandatory questions.
3. I restate agreed decisions for confirmation.
4. I implement changes in scoped commits.
5. I open/prepare PR(s) with checklist and validation evidence.
6. We review, adjust, and merge.
7. Update this plan with decisions and outcomes.
