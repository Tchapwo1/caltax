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
    <div className="p-space_10 bg-background_surface rounded-3xl border border-dashed border-border_default flex flex-col items-center justify-center text-center">
      <p className="text-text_secondary font-bold">Enter your income to see your take-home pay</p>
    </div>
  )

  const [period, setPeriod] = React.useState<'annual' | 'monthly'>('annual')

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val)

  const value = period === 'annual' ? output.netPay : output.netPay / 12

  return (
    <div className="bg-white rounded-[2rem] border border-border_default shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden" aria-live="polite">
      <div className="p-12 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-bold text-text_primary uppercase tracking-wider opacity-60">Your estimated take-home pay</h3>
          <div className="flex bg-background_surface p-1 rounded-full border border-border_default">
            <button 
              onClick={() => setPeriod('annual')}
              className={`px-6 py-2 rounded-full text-sm font-black transition-all ${period === 'annual' ? 'bg-white shadow-sm text-text_primary' : 'text-text_primary opacity-40 hover:opacity-100'}`}
            >
              Annual
            </button>
            <button 
              onClick={() => setPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-black transition-all ${period === 'monthly' ? 'bg-white shadow-sm text-text_primary' : 'text-text_primary opacity-40 hover:opacity-100'}`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-6xl md:text-8xl font-black text-text_primary tracking-tighter">
            {formatCurrency(value)}
          </div>
          <p className="text-lg font-medium text-text_primary opacity-60">
            Estimated for the current tax year based on your inputs.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 bg-background_surface border-t border-border_default">
        <div className="p-8 border-r border-border_default">
          <span className="text-[12px] text-text_primary font-black uppercase tracking-[0.1em] opacity-40">Effective Tax Rate</span>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-black text-text_primary">
              {(output.effectiveTaxRate * 100).toFixed(1)}%
            </span>
            <div className="flex-1 h-2 bg-border_default rounded-full overflow-hidden">
              <div 
                className="h-full bg-net_profit transition-all duration-slow" 
                style={{ width: `${Math.min(100, output.effectiveTaxRate * 100)}%` }} 
              />
            </div>
          </div>
        </div>
        <div className="p-8">
          <span className="text-[12px] text-text_primary font-black uppercase tracking-[0.1em] opacity-40">Total Deductions</span>
          <div className="text-2xl font-black text-text_primary mt-2">
            {formatCurrency(output.grossIncome - output.netPay)}
          </div>
        </div>
      </div>
    </div>
  )
}
