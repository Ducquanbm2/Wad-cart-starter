# Agent Handbook: `cartTotal`

## Mission and scope

Act as a test-first coding agent. Turn the written cart contract into focused behavioural tests, then make the smallest production change that satisfies them. Avoid unrelated refactoring.

- Production target: `src/cart.js`
- Tests: `test/`
- Language: plain JavaScript
- Runtime dependencies: none

The function receives items `{ name, price, qty }` and options `{ vatRate, freeShipFrom, shipFee }`. Compute subtotal from `price * qty`, apply VAT, waive shipping at or above the threshold, and return the rounded total as a number. Empty carts return `0`; invalid prices or non-positive/non-integer quantities throw `RangeError`; the reference example returns `467400`.

## Commands

Run these from the repository root:

```bash
npm test
npm run format:check
npm run gate
git diff --check
git diff
```

`npm run gate` is the sole local gate. CI must run that same command, not a separately reconstructed equivalent. Report only commands and results actually observed.

## Four-stage workflow

### 1. Baseline

Before editing production code, run `npm test` and preserve the initial red state.

### 2. Tests first

Read `README.md`, `brief.md`, and the assignment. Add focused tests under `test/`, then run `npm test` while the implementation is still incomplete. The new tests must be red. Expected values come from the specification and arithmetic, never from the current implementation.

### 3. Minimal implementation

Only after the red test state, edit `src/cart.js`. Keep the control flow direct and do not change the contract to suit an implementation shortcut.

### 4. Review and gate

Read the full diff, run `git diff --check`, run the test and format checks, and finish with `npm run gate`. Never weaken a test merely to obtain a green result.

## Test and style guidance

Tests must cover the worked example, empty carts, shipping below/at/above the threshold, negative price, zero/negative/fractional quantity, final rounding, and numeric result type. Each test should express one clear behaviour and must not call the function under test to generate its own expected value.

Production code should use clear names such as `subtotal`, `vat`, `shipping`, and `shipFee`. Prefer simple JavaScript over unnecessary abstraction, frameworks, or speculative validation.

## Git boundaries

The work order should remain clear:

```text
baseline failure → tests and brief → test-first failure → implementation → gate
```

Before committing, inspect `git status`, `git diff --check`, and `git diff`. Preserve unrelated student work and do not rewrite history without permission.

### Always do

- Read the specification before implementation.
- Observe baseline red and test-first red states.
- Keep tests in `test/` and production work in `src/cart.js`.
- Run `npm test`, `npm run format:check`, and `npm run gate` before handoff.
- Keep the solution dependency-free at runtime.

### Ask first

- Adding a runtime package or changing build tooling.
- Editing files outside the assignment, harness, or documentation scope.
- Changing a stated requirement.
- Deleting or rewriting unrelated student work.

### Never do

- Never edit `src/cart.js` before the required test-first red state.
- Never design tests to imitate existing implementation behaviour.
- Never use the implementation to calculate expected values.
- Never remove, skip, weaken, or rewrite failing tests to make CI green.
- Never return a currency string or silently repair an invalid quantity.
- Never add VAT or shipping to an empty cart.
- Never charge shipping when subtotal is at or above `freeShipFrom`.
- Never install an unapproved library.
- Never commit secrets, credentials, `.env`, `node_modules/`, or generated artefacts.
- Never invent test results, CI results, Git history, or AI activity.

## Definition of Done

The task is complete only when tests were written before implementation, both red states were observed, `src/cart.js` satisfies the contract, all checks and `npm run gate` pass, CI uses the same gate, and the final diff is focused and clean.
