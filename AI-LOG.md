# AI-LOG.md

## 2026-09-30 — author comprehensive test suite

Tool: Codex.
Model: 5.6 Luna Light.
Asked for: Author a comprehensive and rigorous automated test suite in test/cart.test.js adhering strictly to specifications, validation rules, and edge cases in brief.md and AGENTS.md without adding dependencies.
Kept: The generated test cases covering the worked example, empty cart, shipping thresholds, negative prices, and non-integer quantity validations.
Changed: None. The generated suite adhered strictly to native node:test and node:assert/strict without external imports.
Rejected: None. No command execution or implementation changes were introduced by the tool.
By hand: Authored the task contracts in brief.md, configured the harness constraints in AGENTS.md, reviewed the git diff (+191 -12) before accepting, and manually executed npm test to verify the harness red/green state.

## 2026-09-30 — implement cartTotal function

Tool: Codex.
Model: 5.6 Luna Light.
Asked for: Implement the cartTotal function in src/cart.js to satisfy all unit tests in test/cart.test.js following brief.md and AGENTS.md constraints without external dependencies.
Kept: The subtotal loop, input validation logic (RangeError for negative price and invalid quantities), VAT calculation, free-shipping threshold handling, and numeric Math.round formatting.
Changed: None. The generated implementation cleanly passed the specification constraints and existing tests.
Rejected: None. No third-party packages or unnecessary abstractions were introduced.
By hand: Inspected the git diff to verify native numeric return types and error boundaries, then executed npm test and npm run gate locally to verify green passing state.
