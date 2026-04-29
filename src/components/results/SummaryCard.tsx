/**
 * src/components/results/SummaryCard.tsx
 * 
 * Displays the primary net pay and effective tax rate.
 * strictly adhering to blueprint Part 5.
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'

export const SummaryCard: React.FC = () => {
  const { output } = useCalculatorStore()

  if (!output) return (
    <div className="p-space_10 bg-background_surface rounded-lg border border-dashed border-border_default flex flex-col items-center justify-center text-center">
      <p className="text-text_secondary">Enter your income to see your breakdown</p>
    </div>
  )

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val)

  return (
    <div className="bg-background_primary rounded-lg border border-border_default shadow-sm overflow-hidden" aria-live="polite">
      <div className="p-space_6 border-b border-border_default bg-background_surface/50">
        <h3 className="text-sm font-semibold text-text_secondary uppercase tracking-wider">Your take-home pay</h3>
        <div className="flex items-baseline gap-space_2 mt-space_2">
          <span className="text-4xl font-bold text-net_profit">
            {formatCurrency(output.netPay)}
          </span>
          <span className="text-text_secondary">/ year</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 divide-x divide-border_default">
        <div className="p-space_4 flex flex-col">
          <span className="text-xs text-text_secondary font-medium">Effective Rate</span>
          <span className="text-lg font-bold text-text_primary">
            {(output.effectiveTaxRate * 100).toFixed(1)}%
          </span>
        </div>
        <div className="p-space_4 flex flex-col">
          <span className="text-xs text-text_secondary font-medium">Monthly Pay</span>
          <span className="text-lg font-bold text-text_primary">
            {formatCurrency(output.netPay / 12)}
          </span>
        </div>
      </div>
    </div>
  )
}
