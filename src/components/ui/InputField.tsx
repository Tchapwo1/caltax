/**
 * src/components/ui/InputField.tsx
 * 
 * Foundation input component with strict design tokens.
 * Supports text, number, currency, and percentage types.
 */

import React from 'react'

interface InputFieldProps {
  id: string
  label: string
  type?: 'text' | 'number' | 'currency' | 'percentage'
  value: string | number
  onChange: (value: any) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  error?: string
  description?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  min,
  max,
  step,
  placeholder,
  error,
  description
}) => {
  const isNumeric = type === 'number' || type === 'currency' || type === 'percentage'
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (isNumeric) {
      const num = val === '' ? 0 : parseFloat(val)
      onChange(num)
    } else {
      onChange(val)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-baseline">
        <label htmlFor={id} className="text-lg font-black text-text_primary tracking-tight">
          {label}
        </label>
        {description && (
          <span className="text-sm font-medium text-text_primary opacity-40">{description}</span>
        )}
      </div>
      
      <div className="relative">
        {type === 'currency' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text_primary font-bold pointer-events-none">
            £
          </div>
        )}
        <input
          id={id}
          type={isNumeric ? 'number' : 'text'}
          value={value === 0 && isNumeric ? '' : value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`
            w-full px-4 py-4 rounded-xl border-2 text-lg transition-all font-medium
            ${type === 'currency' ? 'pl-8' : ''}
            ${type === 'percentage' ? 'pr-8' : ''}
            ${error 
              ? 'border-alert focus:ring-alert focus:border-alert' 
              : 'border-border_default focus:border-text_primary focus:ring-0'
            }
            bg-white text-text_primary outline-none
            placeholder:text-text_primary placeholder:opacity-20
          `}
        />
        {type === 'percentage' && (
          <div className="absolute right-space_3 top-1/2 -translate-y-1/2 text-text_secondary pointer-events-none">
            %
          </div>
        )}
      </div>
      
      {error && (
        <span className="text-xs text-alert font-medium">{error}</span>
      )}
    </div>
  )
}
