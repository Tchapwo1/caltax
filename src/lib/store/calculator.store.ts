/**
 * src/lib/store/calculator.store.ts
 * 
 * Zustand store for the UK Tax Calculator.
 * Implements the atomic state machine from blueprint Part 4.
 * Aligned with test suite actions.
 */

import { create } from 'zustand'
import { calculate } from '../calculator'
import type { CalcInput, CalcOutput, TaxYearConfig } from '../calculator/types'

export type CalculatorStatus = 'idle' | 'editing' | 'calculating' | 'showing_results' | 'advanced_open' | 'error'

export const DEFAULT_INPUT: CalcInput = {
  grossIncome: 0,
  taxYear: '2026_2027',
  isScottish: false,
  isBlind: false,
  employmentType: 'employed',
  studentLoan: { plan: 'None', includePostgraduate: false },
  pension: { type: 'percentage', value: 0 },
  childBenefit: { hasChildren: false, childrenCount: 0 },
}

export interface CalculatorState {
  config: TaxYearConfig | null
  input: CalcInput
  output: CalcOutput | null
  status: CalculatorStatus
  _debounceTimer: ReturnType<typeof setTimeout> | null

  // Actions
  init: (config: TaxYearConfig, initialInput?: Partial<CalcInput>) => void
  updateInput: (patch: Partial<CalcInput>) => void
  
  // Specific setters for test suite
  setGrossIncome: (val: number) => void
  setIsScottish: (val: boolean) => void
  setStudentLoan: (patch: Partial<CalcInput['studentLoan']>) => void
  setPension: (patch: Partial<CalcInput['pension']>) => void
  
  calculateNow: () => void
  openAdvanced: () => void
  closeAdvanced: () => void
  reset: () => void
}

const DEBOUNCE_MS = 300

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  config: null,
  input: DEFAULT_INPUT,
  output: null,
  status: 'idle',
  _debounceTimer: null,

  init(config, initialInput) {
    const input = { ...DEFAULT_INPUT, ...initialInput }
    set({ config, input, status: 'idle', output: null })
    if (input.grossIncome > 0) {
      get().calculateNow()
    }
  },

  updateInput(patch) {
    const { _debounceTimer } = get()
    if (_debounceTimer) clearTimeout(_debounceTimer)

    const newInput = { ...get().input, ...patch }
    
    const timer = setTimeout(() => {
      set({ status: 'calculating' })
      get().calculateNow()
    }, DEBOUNCE_MS)

    set({ input: newInput, status: 'editing', _debounceTimer: timer })
  },

  setGrossIncome(val) {
    get().updateInput({ grossIncome: val })
  },

  setIsScottish(val) {
    get().updateInput({ isScottish: val })
  },

  setStudentLoan(patch) {
    get().updateInput({ studentLoan: { ...get().input.studentLoan, ...patch } })
  },

  setPension(patch) {
    get().updateInput({ pension: { ...get().input.pension, ...patch } })
  },

  calculateNow() {
    const { config, input } = get()
    if (!config) {
      set({ status: 'error' })
      return
    }

    try {
      const output = calculate(input, config)
      set({ output, status: 'showing_results', _debounceTimer: null })
    } catch (err) {
      console.error('[CalculatorStore] Calculation failed:', err)
      set({ status: 'error', _debounceTimer: null })
    }
  },

  openAdvanced() {
    set({ status: 'advanced_open' })
  },

  closeAdvanced() {
    const { output } = get()
    set({ status: output ? 'showing_results' : 'idle' })
  },

  reset() {
    const { _debounceTimer } = get()
    if (_debounceTimer) clearTimeout(_debounceTimer)
    set({ input: DEFAULT_INPUT, output: null, status: 'idle', _debounceTimer: null })
  }
}))
