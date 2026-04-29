/**
 * src/components/inputs/advanced/StudentLoanSelect.tsx
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { Select } from '@/components/ui/Select'
import { Toggle } from '@/components/ui/Toggle'

export const StudentLoanSelect: React.FC = () => {
  const { input, updateInput } = useCalculatorStore()

  const options = [
    { label: 'None', value: 'None' },
    { label: 'Plan 1 (Pre-2012)', value: 'Plan1' },
    { label: 'Plan 2 (2012-2023)', value: 'Plan2' },
    { label: 'Plan 4 (Scottish)', value: 'Plan4' },
    { label: 'Plan 5 (Post-2023)', value: 'Plan5' },
    { label: 'Postgraduate only', value: 'Postgraduate' }
  ]

  const handlePlanChange = (v: any) => {
    updateInput({ studentLoan: { ...input.studentLoan, plan: v } })
  }

  const handlePgToggle = (v: boolean) => {
    updateInput({ studentLoan: { ...input.studentLoan, includePostgraduate: v } })
  }

  return (
    <div className="flex flex-col gap-space_4">
      <Select
        id="student-loan-plan"
        label="Student Loan Plan"
        options={options}
        value={input.studentLoan.plan}
        onChange={handlePlanChange}
      />
      
      {input.studentLoan.plan !== 'Postgraduate' && input.studentLoan.plan !== 'None' && (
        <Toggle
          id="include-postgrad"
          label="Add Postgraduate Loan?"
          description="If you have both a standard and PG loan"
          checked={input.studentLoan.includePostgraduate}
          onChange={handlePgToggle}
        />
      )}
    </div>
  )
}
