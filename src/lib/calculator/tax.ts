/**
 * src/lib/calculator/tax.ts
 * 
 * Calculates Income Tax based on provided bands and personal allowance.
 * Includes Personal Allowance tapering and Scottish bands.
 */

import type { TaxBand } from './types'

export function calculateIncomeTax(
  grossIncome: number,
  bands: TaxBand[],
  personalAllowance: number,
  isScottish: boolean,
  scottishBands: TaxBand[],
  baseAllowance: number
): number {
  const activeBands = isScottish ? scottishBands : bands
  const shift = personalAllowance - baseAllowance
  let totalTax = 0

  activeBands.forEach(band => {
    // Shift the band boundaries
    const shiftedFrom = band.from + shift
    const shiftedTo = band.to === null ? null : band.to + shift

    if (grossIncome > shiftedFrom) {
      const upperLimit = shiftedTo === null ? grossIncome : Math.min(grossIncome, shiftedTo)
      const amountInBand = upperLimit - shiftedFrom
      if (amountInBand > 0) {
        totalTax += amountInBand * band.rate
      }
    }
  })

  return totalTax
}

/**
 * Calculates the adjusted personal allowance based on gross income.
 * PA is reduced by £1 for every £2 earned above the threshold.
 */
export function calculateAdjustedPersonalAllowance(
  grossIncome: number,
  baseAllowance: number,
  threshold: number,
  taperRate: number,
  isBlind: boolean,
  blindAllowance: number
): number {
  let adjustedPA = baseAllowance

  if (grossIncome > threshold) {
    const excess = grossIncome - threshold
    const reduction = excess * taperRate
    adjustedPA = Math.max(0, baseAllowance - reduction)
  }

  if (isBlind) {
    adjustedPA += blindAllowance
  }

  return adjustedPA
}
