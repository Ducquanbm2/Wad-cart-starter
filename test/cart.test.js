import assert from 'node:assert/strict'
import { test } from 'node:test'

import { cartTotal } from '../src/cart.js'

const standardOptions = {
  vatRate: 0.08,
  freeShipFrom: 500_000,
  shipFee: 30_000,
}

function assertNumericTotal(actual, expected) {
  assert.equal(typeof actual, 'number')
  assert.equal(actual, expected)
}

test('calculates the required worked example', () => {
  const items = [
    { name: 'Desk lamp', price: 180_000, qty: 2 },
    { name: 'Bulb', price: 45_000, qty: 1 },
  ]

  const result = cartTotal(items, standardOptions)

  assertNumericTotal(result, 467_400)
})

test('returns numeric zero for an empty cart', () => {
  const result = cartTotal([], {
    vatRate: 0.25,
    freeShipFrom: 1_000_000,
    shipFee: 99_999,
  })

  assertNumericTotal(result, 0)
})

test('adds every item line total to the subtotal', () => {
  const result = cartTotal(
    [
      { name: 'A', price: 120, qty: 2 },
      { name: 'B', price: 75, qty: 4 },
      { name: 'C', price: 10, qty: 1 },
    ],
    { vatRate: 0, freeShipFrom: 500, shipFee: 20 },
  )

  assertNumericTotal(result, 550)
})

test('applies VAT to the subtotal', () => {
  const result = cartTotal([{ name: 'Notebook', price: 1_000, qty: 3 }], {
    vatRate: 0.1,
    freeShipFrom: 10_000,
    shipFee: 0,
  })

  assertNumericTotal(result, 3_300)
})

test('charges shipping when subtotal is below the threshold', () => {
  const result = cartTotal([{ name: 'Item', price: 400, qty: 1 }], {
    vatRate: 0,
    freeShipFrom: 401,
    shipFee: 35,
  })

  assertNumericTotal(result, 435)
})

test('waives shipping when subtotal is exactly the threshold', () => {
  const result = cartTotal([{ name: 'Item', price: 500, qty: 1 }], {
    vatRate: 0,
    freeShipFrom: 500,
    shipFee: 35,
  })

  assertNumericTotal(result, 500)
})

test('waives shipping when subtotal is above the threshold', () => {
  const result = cartTotal([{ name: 'Item', price: 501, qty: 1 }], {
    vatRate: 0,
    freeShipFrom: 500,
    shipFee: 35,
  })

  assertNumericTotal(result, 501)
})

test('accepts a zero-price item when its quantity is valid', () => {
  const result = cartTotal([{ name: 'Free sample', price: 0, qty: 3 }], {
    vatRate: 0,
    freeShipFrom: 1,
    shipFee: 0,
  })

  assertNumericTotal(result, 0)
})

test('accepts a large positive integer quantity', () => {
  const result = cartTotal([{ name: 'Bulk item', price: 2, qty: 100 }], {
    vatRate: 0,
    freeShipFrom: 201,
    shipFee: 1,
  })

  assertNumericTotal(result, 201)
})

test('rounds a fractional final total down to the nearest integer', () => {
  const result = cartTotal([{ name: 'Item', price: 1, qty: 1 }], {
    vatRate: 0.24,
    freeShipFrom: 2,
    shipFee: 0,
  })

  assertNumericTotal(result, 1)
})

test('rounds a fractional final total up to the nearest integer', () => {
  const result = cartTotal([{ name: 'Item', price: 1, qty: 1 }], {
    vatRate: 0.51,
    freeShipFrom: 2,
    shipFee: 0,
  })

  assertNumericTotal(result, 2)
})

test('rounding applies after VAT and shipping are added', () => {
  const result = cartTotal([{ name: 'Item', price: 10, qty: 1 }], {
    vatRate: 0.05,
    freeShipFrom: 20,
    shipFee: 0.49,
  })

  assertNumericTotal(result, 11)
})

test('rejects a negative price with RangeError', () => {
  assert.throws(
    () => cartTotal([{ name: 'Invalid', price: -1, qty: 1 }], standardOptions),
    RangeError,
  )
})

test('rejects zero quantity with RangeError', () => {
  assert.throws(
    () => cartTotal([{ name: 'Invalid', price: 10, qty: 0 }], standardOptions),
    RangeError,
  )
})

test('rejects a negative quantity with RangeError', () => {
  assert.throws(
    () => cartTotal([{ name: 'Invalid', price: 10, qty: -1 }], standardOptions),
    RangeError,
  )
})

test('rejects a fractional quantity with RangeError', () => {
  assert.throws(
    () =>
      cartTotal([{ name: 'Invalid', price: 10, qty: 1.5 }], standardOptions),
    RangeError,
  )
})

test('rejects a different fractional quantity with RangeError', () => {
  assert.throws(
    () =>
      cartTotal([{ name: 'Invalid', price: 10, qty: 2.25 }], standardOptions),
    RangeError,
  )
})

test('validates every item rather than only the first item', () => {
  assert.throws(
    () =>
      cartTotal(
        [
          { name: 'Valid', price: 10, qty: 1 },
          { name: 'Invalid', price: -5, qty: 1 },
        ],
        standardOptions,
      ),
    RangeError,
  )
})

test('rejects an invalid quantity on a later item', () => {
  assert.throws(
    () =>
      cartTotal(
        [
          { name: 'Valid', price: 10, qty: 1 },
          { name: 'Invalid', price: 5, qty: 0 },
        ],
        standardOptions,
      ),
    RangeError,
  )
})
