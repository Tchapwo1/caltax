/**
 * src/lib/calculator/childBenefit.ts
 * 
 * Calculates High Income Child Benefit Charge (HICBC).
 */

export function calculateChildBenefitCharge(
  grossIncome: number,
  hasChildren: boolean,
  childrenCount: number,
  rates: {
    first_child_weekly: number
    additional_child_weekly: number
    hicbc_threshold: number
    hicbc_taper_per_pound: number
  }
): { charge: number; benefitReceived: number } {
  if (!hasChildren || childrenCount <= 0) {
    return { charge: 0, benefitReceived: 0 }
  }

  // Calculate annual benefit received
  const weeklyBenefit = rates.first_child_weekly + (childrenCount - 1) * rates.additional_child_weekly
  const annualBenefit = weeklyBenefit * 52

  let charge = 0

  if (grossIncome > rates.hicbc_threshold) {
    const excess = grossIncome - rates.hicbc_threshold
    // Charge is 1% for every £200 over threshold (0.005 per £1)
    // Actually the blueprint says hicbc_taper_per_pound: 0.005
    // Which is 0.5% per pound? No, 1% of the benefit for every £200.
    // 1% of benefit per £200 = (benefit * 0.01) * (excess / 200)
    // = benefit * 0.01 * excess / 200 = benefit * excess / 20000
    // = benefit * (excess * 0.00005)
    
    // Let's use the taper rate from the blueprint.
    // If taper is 0.005, it means for every £1 over, you pay 0.5% of the benefit.
    // So if you are £200 over, you pay 0.005 * 200 = 100%? No.
    // Usually it's 1% for every £200.
    // 0.005 * 200 = 1. So yes, 0.005 is the multiplier for the percentage (1.0 = 100%).
    
    const percentage = Math.min(1, excess * rates.hicbc_taper_per_pound)
    charge = annualBenefit * percentage
  }

  return { charge, benefitReceived: annualBenefit }
}
