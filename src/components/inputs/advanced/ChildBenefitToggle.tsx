/**
 * src/components/inputs/advanced/ChildBenefitToggle.tsx
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { Toggle } from '@/components/ui/Toggle'
import { InputField } from '@/components/ui/InputField'

export const ChildBenefitToggle: React.FC = () => {
  const { input, updateInput } = useCalculatorStore()

  const handleToggle = (v: boolean) => {
    updateInput({ childBenefit: { ...input.childBenefit, hasChildren: v } })
  }

  const handleCountChange = (v: number) => {
    updateInput({ childBenefit: { ...input.childBenefit, childrenCount: v } })
  }

  return (
    <div className="flex flex-col gap-space_4">
      <Toggle
        id="has-children"
        label="Claiming Child Benefit?"
        description="Used to calculate potential HICBC"
        checked={input.childBenefit.hasChildren}
        onChange={handleToggle}
      />
      
      {input.childBenefit.hasChildren && (
        <div className="pl-space_4 border-l-2 border-border_default ml-space_2">
          <InputField
            id="children-count"
            label="Number of Children"
            type="number"
            value={input.childBenefit.childrenCount}
            onChange={handleCountChange}
            min={1}
            max={20}
          />
        </div>
      )}
    </div>
  )
}
