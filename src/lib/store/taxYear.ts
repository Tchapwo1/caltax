/**
 * src/lib/store/taxYear.ts
 * 
 * Server-side logic for loading tax year JSON files.
 * strictly adhering to blueprint Part 3 fallback logic and test contract.
 */

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { TaxYearDataSchema } from '../calculator/_schema'
import type { TaxYearConfig } from '../calculator/types'

const DATA_DIR = join(process.cwd(), 'data', 'tax_years')
const DEFAULT_YEAR = '2026_2027'

export interface TaxYearLoadResult {
  ok: boolean
  config: TaxYearConfig
  year: string
  usedFallback: boolean
}

export function loadTaxYear(year: string): TaxYearLoadResult {
  try {
    const filePath = join(DATA_DIR, `${year}.json`)
    const raw = readFileSync(filePath, 'utf-8')
    const config = TaxYearDataSchema.parse(JSON.parse(raw)) as unknown as TaxYearConfig
    return { ok: true, config, year, usedFallback: false }
  } catch (err) {
    console.warn(`[TaxYear] Failed to load ${year}.json, falling back to ${DEFAULT_YEAR}`)
    try {
      const filePath = join(DATA_DIR, `${DEFAULT_YEAR}.json`)
      const raw = readFileSync(filePath, 'utf-8')
      const config = TaxYearDataSchema.parse(JSON.parse(raw)) as unknown as TaxYearConfig
      return { ok: true, config, year: DEFAULT_YEAR, usedFallback: true }
    } catch (err2) {
      console.error(`[TaxYear] Critical failure loading default year!`)
      throw new Error('No tax year data available')
    }
  }
}

export function getAvailableTaxYears(): string[] {
  try {
    return readdirSync(DATA_DIR)
      .filter(f => f.endsWith('.json') && !f.startsWith('_'))
      .map(f => f.replace('.json', ''))
  } catch {
    return [DEFAULT_YEAR]
  }
}
