/**
 * src/lib/calculator/studentLoan.ts
 * 
 * Calculates Student Loan repayments based on plans and thresholds.
 */

import type { StudentLoanPlan } from './types'

export interface StudentLoanThreshold {
  plan: StudentLoanPlan
  annual_threshold: number
  rate: number
}

export function calculateStudentLoan(
  grossIncome: number,
  plan: StudentLoanPlan,
  includePostgraduate: boolean,
  thresholds: StudentLoanThreshold[]
): number {
  let totalRepayment = 0

  // Standard Plan
  if (plan !== 'None' && plan !== 'Postgraduate') {
    const config = thresholds.find(t => t.plan === plan)
    if (config && grossIncome > config.annual_threshold) {
      totalRepayment += (grossIncome - config.annual_threshold) * config.rate
    }
  }

  // Postgraduate (can be standalone or alongside a standard plan)
  if (includePostgraduate || plan === 'Postgraduate') {
    const config = thresholds.find(t => t.plan === 'Postgraduate')
    if (config && grossIncome > config.annual_threshold) {
      totalRepayment += (grossIncome - config.annual_threshold) * config.rate
    }
  }

  return totalRepayment
}
