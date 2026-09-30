# Self-assessment — IA#1

Student ID: `[STUDENT_ID]`  
Full name: `[FULL_NAME]`  
Repository URL: `[REPOSITORY_URL]`  
Total I claim: 100 / 100

| Criterion | Max | I claim | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------- | --: | ------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Behaviour |  30 |      30 | `src/cart.js` implements `cartTotal` with subtotal, VAT, inclusive `>= freeShipFrom` free-shipping logic, below-threshold `shipFee`, empty-cart result `0`, and `RangeError` validation for negative prices and zero, negative, or fractional quantities. The final result uses `Math.round` and remains a numeric value. The worked example returns `467400` (467,400đ). No runtime dependency is added. Implementation commit: 3ee9534.         |
| Tests     |  20 |      20 | `test/cart.test.js` uses only native `node:test` and `node:assert/strict`. It covers the worked example, empty carts, values below/at/above `freeShipFrom`, zero-price/promotional items, arithmetic rounding, numeric return type, and every required `RangeError` case, including invalid values on later items. The initial red state was preserved before implementation. Test result: `0 failures` after verification. Test commit: 2a0faab. |
| Harness   |  20 |      20 | `.prettierrc.json` enforces `singleQuote: true` and `semi: false`. `package.json` defines the required test, format-check, format, and single gate scripts; the gate is exactly `npm test && npm run format:check`. `.github/workflows/ci.yml` runs on pushes and pull requests to `main`, uses Node.js 22, installs with `npm ci`, and invokes the exact same `npm run gate`, preventing configuration drift.                                    |
| Brief     |  15 |      15 | `brief.md` defines the task contract, input/output schemas, the four-step subtotal/VAT/shipping/final-result calculation, empty-cart behaviour, `RangeError` constraints, the worked example, at least 10 edge cases, plain-JavaScript and dependency constraints, the verification procedure, and the Definition of Done.                                                                                                                        |
| AI-LOG.md |  15 |      15 | `AI-LOG.md` follows the six-field format: Tool, Asked for, Kept, Changed, Rejected, and By hand. It records factual work without fabricating reviews or results, and explicitly records human ownership of drafting contracts, reviewing diffs, and manually executing test gates.                                                                                                                                                                |

## What I did not manage

Nothing was omitted from the requested scope. All functional requirements, input
validations, edge cases, quality gates, CI automation, and documentation
artifacts were implemented and verified green.

## What I would do differently

I would design the complete boundary-value test matrix before writing the first
test file, including paired cases immediately below, exactly at, and immediately
above the free-shipping threshold. I would also introduce a lightweight
lint-staged formatting check earlier in the workflow so formatting problems are
reported before a commit, while keeping `npm run gate` as the authoritative CI
and local quality gate.
