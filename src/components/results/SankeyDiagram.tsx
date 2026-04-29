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
      { label: 'Income Tax', value: tax, color: '#FF9F1C' }, // Deduction Orange
      { label: 'NI', value: ni, color: '#FF9F1C' },         // Deduction Orange
      { label: 'Pension', value: pension, color: '#64748B' },
      { label: 'Student Loan', value: sl, color: '#64748B' },
      { label: 'CB Charge', value: cb, color: '#FF4D4D' },   // Alert Red
      { label: 'Net Pay', value: net, color: '#00D897', isNet: true } // Mint Green
    ].filter(d => d.value > 0)
  }, [output, input.grossIncome])

  if (!data || data.length === 0) return null

  // SVG Layout constants
  const width = 600
  const height = 300
  const nodeWidth = 20
  const padding = 20
  const col1 = padding
  const col2 = width - nodeWidth - padding
  
  const total = input.grossIncome
  const scale = (height - padding * 2 - (data.length - 1) * 10) / total

  let currentY = padding

  return (
    <div className="w-full bg-background_primary p-space_4 rounded-lg border border-border_default shadow-sm">
      <h3 className="text-sm font-bold text-text_primary mb-space_4">Cash Flow Diagram</h3>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Gross Node */}
        <rect
          x={col1}
          y={padding}
          width={nodeWidth}
          height={total * scale + (data.length - 1) * 10}
          fill="#5037ED"
          rx={4}
        />
        <text
          x={col1 - 8}
          y={padding + (total * scale) / 2}
          textAnchor="end"
          dominantBaseline="middle"
          className="text-[12px] font-bold fill-text_primary"
        >
          Gross
        </text>

        {/* Links & Output Nodes */}
        {data.map((item, i) => {
          const h = item.value * scale
          const y = currentY
          const sy = padding + (i * 10) + (data.slice(0, i).reduce((sum, d) => sum + d.value, 0) * scale)
          
          currentY += h + 10

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
            <g key={i}>
              <path d={path} fill={item.color} opacity={0.2} />
              <rect
                x={col2}
                y={y}
                width={nodeWidth}
                height={h}
                fill={item.color}
                rx={2}
              />
              <text
                x={col2 + nodeWidth + 8}
                y={y + h / 2}
                dominantBaseline="middle"
                className="text-[10px] font-medium fill-text_secondary"
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
