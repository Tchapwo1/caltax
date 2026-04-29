/**
 * src/components/CalculatorContainer.tsx
 * 
 * Client-side container that initializes the store and renders the layout.
 * strictly adhering to blueprint Part 0.
 */

'use client'

import React, { useEffect } from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import { InputPanel } from './inputs/InputPanel'
import { ResultsPanel } from './results/ResultsPanel'
import type { TaxYearConfig, CalcInput } from '@/lib/calculator/types'

interface CalculatorContainerProps {
  config: TaxYearConfig
  initialInput?: CalcInput
}

export const CalculatorContainer: React.FC<CalculatorContainerProps> = ({ config, initialInput }) => {
  const init = useCalculatorStore(s => s.init)

  useEffect(() => {
    init(config, initialInput)
  }, [config, initialInput, init])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-space_10 items-start">
      <InputPanel />
      <ResultsPanel />
    </div>
  )
}
