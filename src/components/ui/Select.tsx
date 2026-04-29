/**
 * src/components/ui/Select.tsx
 * 
 * Styled select component. Uses native select for maximum accessibility and mobile performance.
 */

import React from 'react'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  id: string
  label: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label htmlFor={id} className="text-lg font-black text-text_primary tracking-tight">
        {label}
      </label>
      
      <div className="relative group">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full px-4 py-4 rounded-xl border-2 text-lg transition-all appearance-none outline-none font-medium
            border-border_default focus:border-text_primary
            bg-white text-text_primary cursor-pointer
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text_primary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
