import { test, expect } from 'vitest'
import { sum } from '../dist'

test('Sum Function', () => {
  expect(sum(1, 4)).toBe(5)
})
