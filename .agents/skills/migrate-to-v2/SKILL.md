---
name: migrate-to-v2
description: Use this skill when the user asks to execute, track, or unblock the React BnB Gallery v2 modernization plan. It standardizes phase sequencing, branch/PR scope, validation, and migration documentation for 2.0.0 and 2.1.x work.
---

# Migrate React BnB Gallery to v2

## Purpose

Execute the repository modernization plan safely and consistently using `MODERNIZATION_PLAN_v2.md` as the source of truth.

## When To Use

Use this skill when the user asks things like:
- "what is next in the modernization plan?"
- "start phase X"
- "prepare the next migration PR"
- "implement v2 migration tasks"

## Required Inputs

1. Current repository state (git status/branch).
2. Current plan status in `MODERNIZATION_PLAN_v2.md`.
3. User-approved phase alignment answers for the phase being executed.

If any required phase answers are missing, stop implementation and request alignment decisions first.

## Execution Workflow

1. Read `MODERNIZATION_PLAN_v2.md` and identify the next actionable implementation item.
2. Confirm branch strategy from the plan (`<type>/phase-<n>-<scope>`).
3. Implement one concern per PR. Avoid mixing unrelated refactors.
4. Run validation for touched areas (`lint`, `test`, `build` as applicable).
5. Update docs/migration notes when behavior changes.
6. Summarize residual risks and follow-ups.

## Repository-Specific Defaults

- Canonical plan file: `MODERNIZATION_PLAN_v2.md`
- Current sequence focus after alignment closure:
  1. Phase 3 runtime/API hardening implementation
  2. Phase 4 test modernization completion
  3. Phase 5 docs/example modernization completion
  4. Phase 6 release hardening completion
  5. Phase 7/8/9 implementation for `2.1.x`

## Guardrails

- Keep PRs small and single-purpose.
- Do not silently change approved phase decisions.
- Preserve public API unless the approved phase policy explicitly allows change.
- For Phase 9 refactors, keep public props stable even when internals/lifecycle behavior changes.
- Prefer behavior tests over snapshots.

## Skill Coordination

For implementation and review quality:
- Apply `vercel-react-best-practices` to React/Next architecture, rendering, and performance decisions.
- Apply `frontend-design` when touching docs/demo UI or any user-facing interface refresh.

## PR Checklist (Copy Into PR Description)

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

## Suggested Command Skeleton

```bash
git checkout -b fix/phase-3-gallery-runtime
# implement scoped changes
pnpm lint
pnpm test
pnpm build
git add -A
git commit -m "fix(phase-3): <scoped runtime fix>"
git push -u origin fix/phase-3-gallery-runtime
```

## Agent Output Format

When reporting progress, include:
1. Current phase and task
2. What was changed
3. Validation results
4. Compatibility/migration impact
5. Next recommended PR/task
