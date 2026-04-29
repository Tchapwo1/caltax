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
    <div className="flex flex-col gap-space_8 p-space_6 md:p-space_8 bg-background_surface rounded-2xl shadow-sm border border-border_default h-fit">
      <div className="flex flex-col gap-space_6">
        <div className="flex items-center gap-space_3 border-b border-border_default pb-space_4">
          <div className="w-8 h-8 rounded-full bg-action/10 flex items-center justify-center text-action">
            <span className="font-bold text-xs uppercase">01</span>
          </div>
          <h2 className="text-xl font-black text-text_primary tracking-tight">Your Situation</h2>
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
    </div>

    <div className="pt-space_2">
        <div className="flex items-center gap-space_3 border-b border-border_default pb-space_4 mb-space_6">
          <div className="w-8 h-8 rounded-full bg-action/10 flex items-center justify-center text-action">
            <span className="font-bold text-xs uppercase">02</span>
          </div>
          <h2 className="text-xl font-black text-text_primary tracking-tight">Deductions</h2>
        </div>
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
