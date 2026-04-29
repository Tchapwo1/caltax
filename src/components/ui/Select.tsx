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
    <div className="flex flex-col gap-space_2 w-full">
      <label 
        htmlFor={id} 
        className={`text-sm font-medium ${disabled ? 'text-text_secondary/50' : 'text-text_primary'}`}
      >
        {label}
      </label>
      
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full appearance-none bg-background_primary border border-border_default rounded-md 
            px-space_3 py-space_2 text-md text-text_primary outline-none transition-all
            focus:border-action focus:ring-2 focus:ring-action/20
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom arrow icon */}
        <div className="absolute right-space_3 top-1/2 -translate-y-1/2 pointer-events-none text-text_secondary">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
