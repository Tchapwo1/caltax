/**
 * src/lib/calculator/pension.ts
 * 
 * Calculates pension contributions and taxable income after pension.
 */

import type { PensionInputType } from './types'

export function calculatePension(
  grossIncome: number,
  type: PensionInputType,
  value: number
): { contribution: number; taxableAfterPension: number } {
  let contribution = 0

  if (type === 'percentage') {
    contribution = grossIncome * (value / 100)
  } else {
    contribution = Math.min(grossIncome, value)
  }

  // Simplified: Assuming salary sacrifice or net pay arrangement where pension reduces taxable income
  const taxableAfterPension = Math.max(0, grossIncome - contribution)

  return { contribution, taxableAfterPension }
}
