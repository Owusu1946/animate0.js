# Contributing to animate0.js

Thank you for considering a contribution. This project is JSDoc‑typed JavaScript with TypeScript checking (no `.ts` sources). The goals are: clarity, performance, and predictable behavior across browsers.

## Project layout

```
src/          # Library source (ESM, JSDoc types)
lib/          # Built bundles (generated)
types/        # Generated declaration files
tests/        # Mocha + Chai browser tests and a small Node suite
examples/     # Live demos / landing page
```

## Development

Prereqs: Node 18+, npm 9+ (or pnpm/yarn), a modern browser.

```bash
npm i
npm run dev           # watch bundle (all formats)
npm run dev-types     # emit types on change
npm run open-examples # serve examples with live reload
npm run test-browser  # mocha browser tests
npm run test-node     # node tests
npm run build         # production builds + types
```

### Code style (non‑negotiable)

- Use JSDoc for public interfaces and complex internals; keep comments high‑signal
- Prefer early returns; avoid deep nesting; name things descriptively
- Do not log in shipped code; no TODOs in main branch—open an issue instead
- Keep inner loops allocation‑free; batch style writes; reuse arrays/objects when safe

### Types and checks

- All modules are `.js` with JSDoc. Type checking is enabled via `tsconfig.json` (`checkJs: true`).
- Exported symbols must be documented and appear in the generated `types/` output.

### Tests

- New features must include tests. Prefer small, deterministic tests.
- Browser tests live under `tests/suites/*.test.js` (Mocha + Chai). Keep timeouts small; use short durations.
- Node tests are for helpers/values that don’t touch the DOM.

### Commit and branch hygiene

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`
- One logical change per PR. Include rationale in the description.
- Branch off `main` as `feat/…` or `fix/…`. Rebase (don’t merge) to keep history linear.

### Performance guidelines

- Avoid layout thrashing: batch style updates; only write transforms where possible
- Minimize allocations in hot paths (render loop, easing, value recomposition)
- Reuse caches (unit conversions, color parsing) when safe; avoid global mutable state

### Release process (maintainers)

1) `npm run build` and ensure tests are green
2) Bump `package.json` version (SemVer)
3) Tag and push a GitHub release
4) `npm publish` (or let CI publish on release)

### Security and reporting

If you discover a vulnerability, please open a private disclosure (or email a maintainer) rather than filing a public issue.

### PR checklist

- [ ] Tests cover new/changed behavior
- [ ] Build and types succeed locally
- [ ] Public API and docs updated (`README.md` / `docs/USAGE.md`)
- [ ] No console noise, no TODOs, meaningful names


