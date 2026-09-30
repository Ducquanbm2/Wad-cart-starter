# Cart Total Specification

## Purpose

Implement `cartTotal(items, options)` in `src/cart.js` using plain JavaScript. Do not add runtime dependencies.

## Contract

```js
cartTotal(items, options)
```

Each item has `{ name, price, qty }`. Options have `{ vatRate, freeShipFrom, shipFee }`. `vatRate` is a direct multiplier, so `0.08` means 8% VAT. The result must always be a JavaScript `number`, never a formatted string.

For a non-empty cart, apply these rules in order:

```text
line total = price × qty
subtotal   = sum of all line totals
VAT        = subtotal × vatRate
shipping   = 0 when subtotal >= freeShipFrom
             shipFee otherwise
total      = subtotal + VAT + shipping
```

Round only the final total to the nearest whole đồng. The free-shipping threshold is inclusive.

## Validation and special cases

- An empty cart returns numeric `0`, with no VAT and no shipping.
- A negative `price` throws `RangeError`.
- `qty` must be a positive integer. `0`, negative values, and values such as `1.5` throw `RangeError`.
- Invalid quantities must not be coerced, truncated, rounded, or silently repaired.

## Worked example

```text
items:  2 × 180000, 1 × 45000
vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000

subtotal = 405000
VAT      = 32400
shipping = 30000
total    = 467400
```

The required return value is the number `467400`.

## Test matrix

The tests must independently cover:

| Scenario                 | Required result              |
| ------------------------ | ---------------------------- |
| Worked example           | `467400`                     |
| Empty array              | `0`                          |
| Return type              | `typeof result === "number"` |
| Below shipping threshold | adds `shipFee`               |
| Exactly at threshold     | free shipping                |
| Above threshold          | free shipping                |
| Fractional final total   | rounds to a whole number     |
| Negative price           | `RangeError`                 |
| Zero quantity            | `RangeError`                 |
| Negative quantity        | `RangeError`                 |
| Fractional quantity      | `RangeError`                 |

## Verification and completion

1. Run `npm test` before implementation and record the baseline failure.
2. Add specification-based tests in `test/`, then run them while production code is still incomplete and confirm red.
3. Make the smallest implementation change in `src/cart.js`.
4. Review the complete diff and run `git diff --check`.
5. Run `npm test`, `npm run format:check`, and the only local gate: `npm run gate`.
6. CI must invoke exactly `npm run gate`.

Done means the test-first red evidence exists, all checks pass, no runtime dependency was added, and the diff has no unrelated files, secrets, or generated dependency folders.
