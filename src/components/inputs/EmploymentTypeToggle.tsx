/**
 * src/components/inputs/EmploymentTypeToggle.tsx
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { Select } from '@/components/ui/Select'

export const EmploymentTypeToggle: React.FC = () => {
  const { input, updateInput } = useCalculatorStore()

  const options = [
    { label: 'Employed (PAYE)', value: 'employed' },
    { label: 'Self-Employed', value: 'self_employed' },
    { label: 'Mixed Income', value: 'mixed' }
  ]

  return (
    <Select
      id="employment-type"
      label="Employment Type"
      options={options}
      value={input.employmentType}
      onChange={(v: any) => updateInput({ employmentType: v })}
    />
  )
}
