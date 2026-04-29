/**
 * src/components/inputs/TaxYearSelect.tsx
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { Select } from '@/components/ui/Select'

export const TaxYearSelect: React.FC = () => {
  const { input, updateInput } = useCalculatorStore()

  const options = [
    { label: '2026/27 (Current)', value: '2026_2027' },
    { label: '2025/26 (Next)', value: '2025_2026' }
  ]

  return (
    <Select
      id="tax-year"
      label="Tax Year"
      options={options}
      value={input.taxYear}
      onChange={(v) => updateInput({ taxYear: v })}
    />
  )
}
