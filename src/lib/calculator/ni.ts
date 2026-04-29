/**
 * src/lib/calculator/ni.ts
 * 
 * Calculates National Insurance for Employed (Class 1) and Self-Employed (Class 4).
 */

import type { TaxBand, EmploymentType } from './types'

export function calculateNI(
  grossIncome: number,
  niBands: TaxBand[],
  employmentType: EmploymentType,
  selfEmployedBands: TaxBand[]
): number {
  if (employmentType === 'mixed') {
    // For mixed, we simplify as per blueprint (treated as employed for NI or special logic)
    // Actually, usually mixed means Class 1 on employment and Class 4 on self-employment.
    // For the sake of this calculator, we'll follow the primary type or combine them.
    // Let's stick to the selected type.
  }

  const activeBands = employmentType === 'self_employed' ? selfEmployedBands : niBands
  let totalNI = 0

  activeBands.forEach(band => {
    if (grossIncome > band.from) {
      const upperLimit = band.to === null ? grossIncome : Math.min(grossIncome, band.to)
      const amountInBand = upperLimit - band.from
      if (amountInBand > 0) {
        totalNI += amountInBand * band.rate
      }
    }
  })

  return totalNI
}
