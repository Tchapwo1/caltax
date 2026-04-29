/**
 * src/lib/calculator/index.ts
 * 
 * Main entry point for the UK Tax Calculator logic engine.
 * Assembles all sub-calculations into a single CalcOutput.
 * Strictly adhering to the execution order in blueprint Part 4.
 */

import type { CalcInput, CalcOutput, TaxYearConfig } from './types'
import { calculateIncomeTax, calculateAdjustedPersonalAllowance } from './tax'
import { calculateNI } from './ni'
import { calculateStudentLoan } from './studentLoan'
import { calculatePension } from './pension'
import { calculateChildBenefitCharge } from './childBenefit'
import { generateAlerts } from './alerts'
import { generateBreakdown } from './breakdown'

export function calculate(input: CalcInput, config: TaxYearConfig): CalcOutput {
  const { grossIncome, studentLoan, pension, childBenefit, isScottish, isBlind, employmentType } = input

  // 1. Pension
  const { contribution: pensionContribution, taxableAfterPension } = calculatePension(
    grossIncome,
    pension.type,
    pension.value
  )

  // 2. Adjusted Personal Allowance
  const adjustedPA = calculateAdjustedPersonalAllowance(
    taxableAfterPension,
    config.personal_allowance,
    config.personal_allowance_taper_from,
    config.personal_allowance_taper_rate,
    isBlind,
    config.blind_persons_allowance
  )

  // 3. Income Tax
  const incomeTax = calculateIncomeTax(
    taxableAfterPension,
    config.income_tax_bands,
    adjustedPA,
    isScottish,
    config.scottish_tax_bands,
    config.personal_allowance
  )

  // 4. National Insurance
  // Note: For most employees, NI is calculated on gross income BEFORE pension (unless salary sacrifice)
  // Blueprint says: salary_sacrifice_reduces_ni: true
  const niInput = config.pension_rules.salary_sacrifice_reduces_ni ? taxableAfterPension : grossIncome
  const nationalInsurance = calculateNI(
    niInput,
    config.ni_employee_class1,
    employmentType,
    config.ni_self_employed_class4
  )

  // 5. Student Loan
  // Student loan is calculated on gross income before pension
  const slRepayment = calculateStudentLoan(
    grossIncome,
    studentLoan.plan,
    studentLoan.includePostgraduate,
    config.student_loan_plans
  )

  // 6. Child Benefit Charge
  const { charge: childBenefitCharge } = calculateChildBenefitCharge(
    grossIncome,
    childBenefit.hasChildren,
    childBenefit.childrenCount,
    config.child_benefit_rates
  )

  // 7. Assemble Net Pay
  const totalDeductions = incomeTax + nationalInsurance + slRepayment + pensionContribution + childBenefitCharge
  const netPay = Math.max(0, grossIncome - totalDeductions)
  const effectiveTaxRate = grossIncome > 0 ? (totalDeductions / grossIncome) : 0

  // 8. Generate Alerts
  const outputDraft: Partial<CalcOutput> = {
    incomeTax,
    nationalInsurance,
    studentLoan: slRepayment,
    pensionContribution,
    childBenefitCharge,
    netPay,
    effectiveTaxRate
  }
  const alerts = generateAlerts(input, outputDraft, config)

  // 9. Generate Breakdown
  const { yearly, monthly, weekly } = generateBreakdown(
    grossIncome,
    incomeTax,
    nationalInsurance,
    slRepayment,
    pensionContribution,
    childBenefitCharge,
    netPay
  )

  return {
    incomeTax,
    nationalInsurance,
    studentLoan: slRepayment,
    pensionContribution,
    childBenefitCharge,
    netPay,
    effectiveTaxRate,
    breakdown: { yearly, monthly, weekly },
    alerts,
    metadata: {
      taxYear: config.tax_year,
      verifiedAgainst: config.verified_against,
      calculationId: crypto.randomUUID()
    }
  }
}
