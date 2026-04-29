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
    <div className="relative bg-background_primary rounded-2xl border border-border_default premium-shadow overflow-hidden group" aria-live="polite">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-net_profit/10 rounded-full blur-3xl transition-all group-hover:bg-net_profit/20" />
      
      <div className="p-space_8 border-b border-border_default bg-surface-gradient relative overflow-hidden">
        <h3 className="text-xs font-black text-text_secondary uppercase tracking-[0.2em] mb-space_2">Estimate: Your Yearly Take-Home</h3>
        <div className="flex items-baseline gap-space_2">
          <span className="text-5xl font-black text-text_primary tracking-tight">
            {formatCurrency(output.netPay)}
          </span>
          <span className="text-md text-text_secondary font-medium">/ year</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 divide-x divide-border_default relative z-10 bg-background_primary">
        <div className="p-space_6 flex flex-col gap-1 transition-colors hover:bg-background_surface/50">
          <span className="text-[10px] text-text_secondary font-black uppercase tracking-wider">Effective Tax Rate</span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-action">
              {(output.effectiveTaxRate * 100).toFixed(1)}%
            </span>
            <div className="h-1.5 w-12 bg-border_default rounded-full overflow-hidden">
              <div 
                className="h-full bg-action transition-all duration-slow" 
                style={{ width: `${Math.min(100, output.effectiveTaxRate * 100)}%` }} 
              />
            </div>
          </div>
        </div>
        <div className="p-space_6 flex flex-col gap-1 transition-colors hover:bg-background_surface/50">
          <span className="text-[10px] text-text_secondary font-black uppercase tracking-wider">Monthly Net Pay</span>
          <span className="text-xl font-bold text-text_primary">
            {formatCurrency(output.netPay / 12)}
          </span>
        </div>
      </div>
    </div>
  )
}
