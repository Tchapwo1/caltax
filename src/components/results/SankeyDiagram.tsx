/**
 * src/components/results/SankeyDiagram.tsx
 * 
 * SVG-based cash flow visualization.
 * strictly adhering to blueprint Part 5 (JS Budget resolution).
 */

'use client'

import React, { useMemo } from 'react'
import { useCalculatorStore } from '@/lib/store/calculator.store'

const SankeyDiagram: React.FC = () => {
  const { output, input } = useCalculatorStore()

  const data = useMemo(() => {
    if (!output) return null
    
    const gross = input.grossIncome
    if (gross <= 0) return null

    // Deductions
    const tax = output.incomeTax
    const ni = output.nationalInsurance
    const sl = output.studentLoan
    const pension = output.pensionContribution
    const cb = output.childBenefitCharge
    const net = output.netPay

    return [
      { label: 'Income Tax', value: tax, color: '#18181B' }, // Slate
      { label: 'NI', value: ni, color: '#18181BCC' },         // Slate 80%
      { label: 'Pension', value: pension, color: '#F59E0B' },
      { label: 'Student Loan', value: sl, color: '#3B82F6' },
      { label: 'CB Charge', value: cb, color: '#DC2626' },   // Red
      { label: 'Net Pay', value: net, color: '#FF5A1F', isNet: true } // Orange
    ].filter(d => d.value > 0)
  }, [output, input.grossIncome])

  if (!data || data.length === 0) return null

  // SVG Layout constants
  const width = 600
  const height = 340
  const nodeWidth = 16
  const padding = 30
  const col1 = 100
  const col2 = 450
  
  const total = input.grossIncome
  const scale = (height - padding * 2 - (data.length - 1) * 12) / total

  let currentY = padding

  return (
    <div className="w-full bg-white p-space_8 rounded-3xl border border-border_default shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <div className="flex flex-col gap-1 mb-space_6">
        <h3 className="text-lg font-black text-text_primary tracking-tight">Your Cash Flow</h3>
        <p className="text-xs font-bold text-text_secondary uppercase tracking-widest">Where your money goes</p>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Gross Node */}
        <rect
          x={col1}
          y={padding}
          width={nodeWidth}
          height={total * scale + (data.length - 1) * 12}
          fill="#18181B"
          rx={8}
        />
        <text
          x={col1 - 12}
          y={padding + (total * scale) / 2}
          textAnchor="end"
          dominantBaseline="middle"
          className="text-[14px] font-black fill-text_primary tracking-tighter"
        >
          Gross Income
        </text>

        {/* Links & Output Nodes */}
        {data.map((item, i) => {
          const h = Math.max(2, item.value * scale)
          const y = currentY
          const sy = padding + (i * 12) + (data.slice(0, i).reduce((sum, d) => sum + d.value, 0) * scale)
          
          currentY += h + 12

          // Cubic Bezier Path
          const x0 = col1 + nodeWidth
          const x1 = col2
          const xm = (x0 + x1) / 2
          
          const path = `
            M ${x0} ${sy}
            C ${xm} ${sy}, ${xm} ${y}, ${x1} ${y}
            L ${x1} ${y + h}
            C ${xm} ${y + h}, ${xm} ${sy + h}, ${x0} ${sy + h}
            Z
          `

          return (
            <g key={i} className="group cursor-help">
              <path 
                d={path} 
                fill={item.color} 
                opacity={0.15} 
                className="transition-opacity group-hover:opacity-30" 
              />
              <rect
                x={col2}
                y={y}
                width={nodeWidth}
                height={h}
                fill={item.color}
                rx={4}
                className="transition-all group-hover:scale-x-110"
              />
              <text
                x={col2 + nodeWidth + 12}
                y={y + h / 2}
                dominantBaseline="middle"
                className={`text-[12px] font-bold ${item.isNet ? 'fill-action' : 'fill-text_secondary'}`}
              >
                {item.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default SankeyDiagram
