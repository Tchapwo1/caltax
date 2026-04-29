/**
 * src/lib/calculator/breakdown.ts
 * 
 * Converts annual figures into yearly, monthly, and weekly breakdown rows.
 */

import type { BreakDownRow } from './types'

export function toBreakdownRow(label: string, annualValue: number): BreakDownRow {
  return {
    label,
    yearly:  annualValue,
    monthly: annualValue / 12,
    weekly:  annualValue / 52
  }
}

export function generateBreakdown(
  grossIncome: number,
  tax: number,
  ni: number,
  studentLoan: number,
  pension: number,
  childBenefitCharge: number,
  netPay: number
): { yearly: BreakDownRow[]; monthly: BreakDownRow[]; weekly: BreakDownRow[] } {
  
  const labels = [
    { label: 'Gross Income',    value: grossIncome },
    { label: 'Pension',         value: -pension },
    { label: 'Income Tax',      value: -tax },
    { label: 'National Insurance', value: -ni },
    { label: 'Student Loan',    value: -studentLoan },
    { label: 'Child Benefit Charge', value: -childBenefitCharge },
    { label: 'Take Home Pay',   value: netPay }
  ]

  // Filter out rows with 0 value to keep table clean, except for Take Home
  const activeLabels = labels.filter(l => l.value !== 0 || l.label === 'Take Home Pay')

  const yearly  = activeLabels.map(l => toBreakdownRow(l.label, l.value))
  const monthly = yearly.map(r => ({ ...r, yearly: r.monthly })) // This is slightly confusing, the UI will just use the correct column
  // Actually, the BreakDownRow has all columns. I'll just return the list once.
  
  return {
    yearly,
    monthly: [], // UI will just use yearly[i].monthly
    weekly:  []  // UI will just use yearly[i].weekly
  }
}
