/**
 * src/components/results/PaymentPlanner.tsx
 * 
 * Helps users plan for their tax bill by calculating required savings.
 * Inspired by taxx2.html.
 */

'use client'

import React, { useState, useMemo } from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'

type Frequency = 'daily' | 'weekly' | 'monthly'

export const PaymentPlanner: React.FC = () => {
  const { input, output } = useCalculatorStore()
  const [frequency, setFrequency] = useState<Frequency>('monthly')

  // Only relevant if there is tax to pay and it's not all via PAYE
  // (Simplified: always show if self-employed or if tax > 0 for now)
  const totalTax = (output?.incomeTax || 0) + (output?.nationalInsurance || 0)
  
  const deadlineDate = useMemo(() => {
    const endYear = parseInt(input.taxYear.split('_')[1])
    return new Date(endYear + 1, 0, 31) // Jan 31st of the following year
  }, [input.taxYear])

  const daysRemaining = useMemo(() => {
    const today = new Date()
    const diff = deadlineDate.getTime() - today.getTime()
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }, [deadlineDate])

  const amount = useMemo(() => {
    if (daysRemaining === 0) return 0
    const perDay = totalTax / daysRemaining
    if (frequency === 'daily') return perDay
    if (frequency === 'weekly') return perDay * 7
    return (totalTax / daysRemaining) * (365 / 12) // Approx monthly
  }, [totalTax, daysRemaining, frequency])

  if (totalTax <= 0 || daysRemaining <= 0) return null

  return (
    <div className="bg-background_surface rounded-xl border border-border_default p-space_6 flex flex-col gap-space_4 shadow-sm">
      <div className="flex items-center gap-space_3">
        <div className="w-10 h-10 rounded-lg bg-status_warning_bg flex items-center justify-center text-status_warning_text">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-md font-bold text-text_primary">Tax Payment Planner</h3>
          <p className="text-xs text-text_secondary">Plan your savings for the {deadlineDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} deadline.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space_4 items-center">
        <div className="flex flex-col gap-space_1">
          <label className="text-xs font-bold text-text_secondary uppercase">Savings Frequency</label>
          <div className="flex bg-background_primary rounded-lg p-1 border border-border_default">
            {(['daily', 'weekly', 'monthly'] as Frequency[]).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                  frequency === f 
                    ? 'bg-action text-background_primary shadow-sm' 
                    : 'text-text_secondary hover:text-text_primary'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs font-bold text-text_secondary uppercase">You should save</span>
          <div className="flex items-baseline gap-space_1">
            <span className="text-2xl font-black text-text_primary">£{amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-sm text-text_secondary font-medium">/ {frequency.replace('ly', '')}</span>
          </div>
        </div>
      </div>

      <div className="pt-space_4 border-t border-border_default flex items-center justify-between text-xs">
        <span className="text-text_secondary">Estimated total bill</span>
        <span className="font-bold text-text_primary">£{totalTax.toLocaleString()}</span>
      </div>
    </div>
  )
}
