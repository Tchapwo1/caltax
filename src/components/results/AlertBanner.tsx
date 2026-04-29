/**
 * src/components/results/AlertBanner.tsx
 * 
 * Displays critical warnings like the 60% tax trap.
 * strictly adhering to blueprint Part 5.
 */

'use client'

import React from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'
import type { Alert } from '@/lib/calculator/types'

export const AlertBanner: React.FC = () => {
  const { output } = useCalculatorStore()

  if (!output || output.alerts.length === 0) return null

  return (
    <div className="flex flex-col gap-space_3">
      {output.alerts.map((alert, i) => (
        <AlertItem key={i} alert={alert} />
      ))}
    </div>
  )
}

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const isCritical = alert.severity === 'critical'
  
  return (
    <div 
      role="alert" 
      aria-live={isCritical ? 'assertive' : 'polite'}
      className={`
        flex items-start gap-space_3 p-space_4 rounded-lg border
        ${isCritical 
          ? 'bg-alert/5 border-alert text-alert' 
          : 'bg-action/5 border-action/20 text-text_primary'
        }
      `}
    >
      <div className="mt-0.5">
        {isCritical ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-action" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>
      <div className="flex flex-col gap-space_1">
        <span className="font-bold text-sm">
          {alert.type === 'cliff_edge' ? '60% Effective Tax Zone' : 
           alert.type === 'child_benefit' ? 'High Income Child Benefit Charge' :
           alert.type === 'allowance_loss' ? 'Personal Allowance Lost' : 'Notice'}
        </span>
        <p className="text-sm opacity-90">{alert.message}</p>
      </div>
    </div>
  )
}
