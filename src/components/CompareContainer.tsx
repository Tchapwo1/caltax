/**
 * src/components/CompareContainer.tsx
 * 
 * Logic for comparing two sets of tax data.
 * strictly adhering to blueprint Part 8.
 */

'use client'

import React, { useMemo } from 'react'
import { calculate } from '@/lib/calculator'
import type { CalcInput, TaxYearConfig } from '@/lib/calculator/types'
import { decodeStateFromURL } from '@/lib/store/url'

interface CompareContainerProps {
  config1: TaxYearConfig
  config2: TaxYearConfig
  input1: CalcInput
  input2: CalcInput
}

export const CompareContainer: React.FC<CompareContainerProps> = ({ config1, config2, input1, input2 }) => {
  const result1 = useMemo(() => calculate(input1, config1), [input1, config1])
  const result2 = useMemo(() => calculate(input2, config2), [input2, config2])

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val)

  const rows = [
    { label: 'Gross Income', val1: input1.grossIncome, val2: input2.grossIncome },
    { label: 'Income Tax', val1: result1.incomeTax, val2: result2.incomeTax, isDeduction: true },
    { label: 'National Insurance', val1: result1.nationalInsurance, val2: result2.nationalInsurance, isDeduction: true },
    { label: 'Pension', val1: result1.pensionContribution, val2: result2.pensionContribution, isDeduction: true },
    { label: 'Student Loan', val1: result1.studentLoan, val2: result2.studentLoan, isDeduction: true },
    { label: 'Child Benefit Charge', val1: result1.childBenefitCharge, val2: result2.childBenefitCharge, isDeduction: true },
    { label: 'Net Pay', val1: result1.netPay, val2: result2.netPay, isTotal: true }
  ]

  return (
    <div className="flex flex-col gap-space_10">
      <div className="overflow-x-auto bg-background_primary rounded-lg border border-border_default shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-border_default bg-background_surface/50">
              <th className="py-space_4 px-space_6 font-bold text-text_primary">Comparison</th>
              <th className="py-space_4 px-space_6 font-bold text-text_primary text-right">{config1.tax_year.replace('_','/')}</th>
              <th className="py-space_4 px-space_6 font-bold text-text_primary text-right">{config2.tax_year.replace('_','/')}</th>
              <th className="py-space_4 px-space_6 font-bold text-text_primary text-right">Difference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border_default/50">
            {rows.map((row, i) => {
              const diff = row.val2 - row.val1
              const isPositiveBetter = row.isTotal || row.label === 'Gross Income'
              const isBetter = isPositiveBetter ? diff > 0 : diff < 0
              const isWorse = isPositiveBetter ? diff < 0 : diff > 0
              
              return (
                <tr key={i} className={row.isTotal ? 'bg-background_surface/30 font-bold' : ''}>
                  <td className="py-space_4 px-space_6 text-text_primary">{row.label}</td>
                  <td className="py-space_4 px-space_6 text-right text-text_secondary">{formatCurrency(row.val1)}</td>
                  <td className="py-space_4 px-space_6 text-right text-text_primary">{formatCurrency(row.val2)}</td>
                  <td className={`py-space_4 px-space_6 text-right font-bold ${isBetter ? 'text-net_profit' : isWorse ? 'text-alert' : 'text-text_secondary'}`}>
                    {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space_6">
        <div className="p-space_6 bg-background_surface rounded-lg border border-border_default">
          <h3 className="text-sm font-bold text-text_secondary uppercase mb-space_4">Scenario 1 summary</h3>
          <p className="text-2xl font-bold text-text_primary">{formatCurrency(result1.netPay)}</p>
          <p className="text-xs text-text_secondary mt-space_1">Effective rate: {(result1.effectiveTaxRate * 100).toFixed(1)}%</p>
        </div>
        <div className="p-space_6 bg-background_surface rounded-lg border border-border_default">
          <h3 className="text-sm font-bold text-text_secondary uppercase mb-space_4">Scenario 2 summary</h3>
          <p className="text-2xl font-bold text-text_primary">{formatCurrency(result2.netPay)}</p>
          <p className="text-xs text-text_secondary mt-space_1">Effective rate: {(result2.effectiveTaxRate * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  )
}
