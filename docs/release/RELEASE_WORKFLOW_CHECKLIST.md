# Release Workflow Checklist

Use this checklist for every release branch (`2.x`, `3.x`, etc.) to ensure we always have a reviewable release PR.

## Standard Sequence

1. Start from latest `master`.
2. Create release branch first:
   - `git checkout master`
   - `git pull --ff-only origin master`
   - `git checkout -b release/<version>`
3. Prepare release changes on the release branch:
   - Add/update changesets.
   - Run `pnpm version-packages`.
   - Commit release artifacts (`CHANGELOG.md`, `package.json`, etc.).
4. Run release validation:
   - `pnpm lint`
   - `pnpm test`
   - `pnpm build`
   - `pnpm docs:build` (when docs changed)
5. Push release branch and open PR:
   - Base: `master`
   - Compare: `release/<version>`
6. Merge release PR into `master`.
7. Publish from `master` after merge:
   - `pnpm release`
8. Confirm published version and tag:
   - `npm view react-bnb-gallery version`
   - `git tag --list | rg <version>`

## Important Rule

Do not create the release branch after merging release commits into `master`.  
If both branches point to the same commit, the release PR will have no diff.

## If You Accidentally Released on `master` First

1. Keep the shipped tag/version as source of truth.
2. Document the release in changelog/docs as usual.
3. Resume normal flow for the next release by creating `release/<next-version>` before versioning.
