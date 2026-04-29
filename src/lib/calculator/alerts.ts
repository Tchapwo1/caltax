/**
 * src/lib/calculator/alerts.ts
 * 
 * Generates automated alerts based on the calculation output.
 * Strictly adhering to blueprint Part 3 alert rules.
 */

import type { CalcInput, CalcOutput, Alert, TaxYearConfig } from './types'

export function generateAlerts(
  input: CalcInput,
  output: Partial<CalcOutput>,
  config: TaxYearConfig
): Alert[] {
  const alerts: Alert[] = []
  const { alert_thresholds } = config
  
  // Use income after pension (salary sacrifice) for alert checks
  const pension = output.pensionContribution || 0
  const adjustedIncome = input.grossIncome - pension

  // 1. Cliff Edge / Personal Allowance Withdrawal
  if (adjustedIncome > alert_thresholds.cliff_edge_lower && adjustedIncome <= alert_thresholds.cliff_edge_upper) {
    alerts.push({
      type: 'cliff_edge',
      severity: 'critical',
      message: 'You are in the Personal Allowance withdrawal zone (effective 60% tax rate).',
      threshold: alert_thresholds.cliff_edge_lower
    })
  }

  // 2. Child Benefit Charge
  if (input.childBenefit.hasChildren && adjustedIncome > alert_thresholds.child_benefit_charge) {
    alerts.push({
      type: 'child_benefit',
      severity: 'warning',
      message: 'You may be subject to the High Income Child Benefit Charge.',
      threshold: alert_thresholds.child_benefit_charge
    })
  }

  // 3. Allowance Loss (Fully Withdrawn)
  if (adjustedIncome > alert_thresholds.allowance_fully_withdrawn) {
    alerts.push({
      type: 'allowance_loss',
      severity: 'warning',
      message: 'Your Personal Allowance is fully withdrawn.',
      threshold: alert_thresholds.allowance_fully_withdrawn
    })
  }

  return alerts
}
