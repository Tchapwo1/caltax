/**
 * src/components/results/ResultsPanel.tsx
 */

'use client'

import React from 'react'
import { SummaryCard } from './SummaryCard'
import { TaxBreakdownTable } from './TaxBreakdownTable'
import { AlertBanner } from './AlertBanner'
import { SankeyWrapper } from './SankeyWrapper'
import { ShareLink } from './ShareLink'
import { useCalculatorStore } from '@/lib/store/calculator.store'

export const ResultsPanel: React.FC = () => {
  const { status, output } = useCalculatorStore()

  const isEditing = status === 'editing' || status === 'calculating'

  return (
    <div className={`flex flex-col gap-space_8 transition-opacity duration-medium ${isEditing ? 'opacity-60' : 'opacity-100'}`}>
      <div className="flex flex-col gap-space_6">
        <SummaryCard />
        
        {output && (
          <>
            <div className="flex justify-end">
              <ShareLink />
            </div>
            <AlertBanner />
            <SankeyWrapper />
            <TaxBreakdownTable />
          </>
        )}
      </div>
      
      {!output && (
        <div className="p-space_10 bg-background_surface rounded-lg border border-dashed border-border_default flex flex-col items-center justify-center text-center">
          <svg className="w-12 h-12 text-border_default mb-space_4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h3 className="text-md font-bold text-text_primary">Ready to calculate</h3>
          <p className="text-sm text-text_secondary mt-space_1">Enter your details on the left to see your take-home pay breakdown.</p>
        </div>
      )}
    </div>
  )
}
