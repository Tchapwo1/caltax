/**
 * src/components/inputs/advanced/PensionInput.tsx
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { InputField } from '@/components/ui/InputField'
import { Select } from '@/components/ui/Select'

export const PensionInput: React.FC = () => {
  const { input, updateInput } = useCalculatorStore()

  const handleValueChange = (v: number) => {
    updateInput({ pension: { ...input.pension, value: v } })
  }

  const handleTypeChange = (v: any) => {
    updateInput({ pension: { ...input.pension, type: v } })
  }

  return (
    <div className="flex flex-col gap-space_4">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-space_3 items-end">
        <InputField
          id="pension-value"
          label="Pension Contribution"
          type={input.pension.type === 'percentage' ? 'percentage' : 'currency'}
          value={input.pension.value}
          onChange={handleValueChange}
          placeholder="e.g. 5"
        />
        <div className="w-[120px]">
          <Select
            id="pension-type"
            label="Type"
            options={[
              { label: '%', value: 'percentage' },
              { label: 'Fixed', value: 'fixed' }
            ]}
            value={input.pension.type}
            onChange={handleTypeChange}
          />
        </div>
      </div>
      <p className="text-xs text-text_secondary">
        Assuming salary sacrifice. This reduces your taxable income and NI.
      </p>
    </div>
  )
}
