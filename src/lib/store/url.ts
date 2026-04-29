/**
 * src/lib/store/url.ts
 * 
 * Compact URL query string encoding/decoding for tax calculator state.
 * strictly adhering to blueprint Part 4 and test suite contract.
 */

import type { CalcInput, StudentLoanPlan, EmploymentType } from '../calculator/types'
import { DEFAULT_INPUT } from './calculator.store'

const EMPLOYMENT_TO_CODE: Record<EmploymentType, string> = {
  employed: 'e',
  self_employed: 's',
  mixed: 'm'
}
const CODE_TO_EMPLOYMENT: Record<string, EmploymentType> = {
  e: 'employed',
  s: 'self_employed',
  m: 'mixed'
}

const PLAN_TO_CODE: Record<StudentLoanPlan, string> = {
  Plan1: '1', Plan2: '2', Plan4: '4', Plan5: '5', Postgraduate: 'p', None: 'n'
}
const CODE_TO_PLAN: Record<string, StudentLoanPlan> = {
  '1': 'Plan1', '2': 'Plan2', '4': 'Plan4', '5': 'Plan5', p: 'Postgraduate', n: 'None'
}

export function encodeStateToURL(input: CalcInput): string {
  const params = new URLSearchParams()

  if (input.grossIncome !== 0) params.set('g', String(Math.round(input.grossIncome)))
  if (input.taxYear !== DEFAULT_INPUT.taxYear) params.set('ty', input.taxYear)
  if (input.isScottish) params.set('sc', '1')
  if (input.isBlind) params.set('bl', '1')
  if (input.employmentType !== 'employed') params.set('et', EMPLOYMENT_TO_CODE[input.employmentType])
  
  if (input.studentLoan.plan !== 'None') params.set('sl', PLAN_TO_CODE[input.studentLoan.plan])
  if (input.studentLoan.includePostgraduate) params.set('pg', '1')
  
  if (input.pension.value !== 0) {
    params.set('pt', input.pension.type === 'percentage' ? 'p' : 'f')
    params.set('pv', String(input.pension.value))
  }
  
  if (input.childBenefit.hasChildren) {
    params.set('ch', '1')
    if (input.childBenefit.childrenCount !== 0) params.set('cc', String(input.childBenefit.childrenCount))
  }

  return params.toString()
}

export function decodeStateFromURL(source: string | URL | URLSearchParams): CalcInput {
  let params: URLSearchParams
  
  if (typeof source === 'string') {
    const q = source.startsWith('?') ? source.substring(1) : source
    params = new URLSearchParams(q)
  } else if (source instanceof URL) {
    params = source.searchParams
  } else {
    params = source
  }
  
  const get = (key: string) => params.get(key)

  // Validation/Clamping as per tests
  let grossIncome = Number(get('g'))
  if (isNaN(grossIncome)) grossIncome = DEFAULT_INPUT.grossIncome
  grossIncome = Math.max(0, Math.min(10_000_000, grossIncome))

  const taxYear = get('ty')
  const finalTaxYear = (taxYear && /^\d{4}_\d{4}$/.test(taxYear)) ? taxYear : DEFAULT_INPUT.taxYear

  let pensionValue = Number(get('pv')) || 0
  const pensionType = get('pt') === 'f' ? 'fixed' : 'percentage'
  if (pensionType === 'percentage') pensionValue = Math.min(100, pensionValue)

  let childrenCount = Number(get('cc')) || 0
  childrenCount = Math.min(20, childrenCount)

  return {
    grossIncome,
    taxYear: finalTaxYear,
    isScottish: get('sc') === '1',
    isBlind: get('bl') === '1',
    employmentType: CODE_TO_EMPLOYMENT[get('et') || 'e'] || 'employed',
    studentLoan: {
      plan: CODE_TO_PLAN[get('sl') || 'n'] || 'None',
      includePostgraduate: get('pg') === '1'
    },
    pension: {
      type: pensionType,
      value: pensionValue
    },
    childBenefit: {
      hasChildren: get('ch') === '1',
      childrenCount
    }
  }
}

/**
 * Comparison URL format: ?s1={encoded_state1}&s2={encoded_state2}
 */
export function encodeComparisonToURL(left: CalcInput, right: CalcInput): string {
  const params = new URLSearchParams()
  params.set('s1', encodeStateToURL(left))
  params.set('s2', encodeStateToURL(right))
  return params.toString()
}

export function decodeComparisonFromURL(source: string | URL | URLSearchParams): { left: CalcInput; right: CalcInput } {
  let params: URLSearchParams
  
  if (typeof source === 'string') {
    const q = source.startsWith('?') ? source.substring(1) : source
    params = new URLSearchParams(q)
  } else if (source instanceof URL) {
    params = source.searchParams
  } else {
    params = source
  }

  const s1 = params.get('s1') || ''
  const s2 = params.get('s2') || ''

  return {
    left: decodeStateFromURL(s1),
    right: decodeStateFromURL(s2)
  }
}
