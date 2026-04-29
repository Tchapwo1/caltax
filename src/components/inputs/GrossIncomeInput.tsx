/**
 * src/components/inputs/GrossIncomeInput.tsx
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { InputField } from '@/components/ui/InputField'

export const GrossIncomeInput: React.FC = () => {
  const { input, updateInput } = useCalculatorStore()

  return (
    <InputField
      id="gross-income"
      label="Gross Annual Income"
      type="currency"
      value={input.grossIncome}
      onChange={(v) => updateInput({ grossIncome: v })}
      placeholder="e.g. 35,000"
      description="Before tax and deductions"
    />
  )
}
