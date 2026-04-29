/**
 * src/components/inputs/InputPanel.tsx
 * 
 * Main input container for the tax calculator.
 * strictly adhering to blueprint Part 0.
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { GrossIncomeInput } from './GrossIncomeInput'
import { TaxYearSelect } from './TaxYearSelect'
import { EmploymentTypeToggle } from './EmploymentTypeToggle'
import { Accordion } from '@/components/ui/Accordion'
import { Toggle } from '@/components/ui/Toggle'
import { PensionInput } from './advanced/PensionInput'
import { StudentLoanSelect } from './advanced/StudentLoanSelect'
import { ChildBenefitToggle } from './advanced/ChildBenefitToggle'

export const InputPanel: React.FC = () => {
  const { input, status, updateInput, openAdvanced, closeAdvanced } = useCalculatorStore()

  const isAdvancedOpen = status === 'advanced_open'

  return (
    <div className="flex flex-col gap-space_6 p-space_6 bg-background_primary rounded-lg shadow-sm border border-border_default h-fit">
      <div className="flex flex-col gap-space_1">
        <h2 className="text-lg font-bold text-text_primary">Your Income</h2>
        <p className="text-sm text-text_secondary">Enter your annual pre-tax earnings</p>
      </div>

      <div className="flex flex-col gap-space_6">
        <GrossIncomeInput />
        <TaxYearSelect />
        <EmploymentTypeToggle />
        
        <Toggle
          id="scottish-tax"
          label="Scottish Taxpayer?"
          description="Apply Scottish tax bands"
          checked={input.isScottish}
          onChange={(v) => updateInput({ isScottish: v })}
        />

        <Toggle
          id="blind-allowance"
          label="Registered Blind?"
          description="Add Blind Person's Allowance"
          checked={input.isBlind}
          onChange={(v) => updateInput({ isBlind: v })}
        />
      </div>

      <div className="pt-space_2">
        <Accordion
          id="advanced-options"
          title="Advanced Options"
          isOpen={isAdvancedOpen}
          onToggle={() => isAdvancedOpen ? closeAdvanced() : openAdvanced()}
        >
          <PensionInput />
          <StudentLoanSelect />
          <ChildBenefitToggle />
        </Accordion>
      </div>
    </div>
  )
}
