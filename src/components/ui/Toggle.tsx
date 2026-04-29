/**
 * src/components/ui/Toggle.tsx
 * 
 * Accessible switch component using ARIA roles.
 */

import React from 'react'

interface ToggleProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-between gap-space_4 py-space_2">
      <div className="flex flex-col gap-space_0.5">
        <label 
          htmlFor={id} 
          className={`text-sm font-medium ${disabled ? 'text-text_secondary/50' : 'text-text_primary'}`}
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-text_secondary leading-tight">
            {description}
          </span>
        )}
      </div>
      
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-medium ease-standard focus:outline-none focus:ring-2 focus:ring-action/20
          ${checked ? 'bg-action' : 'bg-slate-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-medium ease-standard
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}
