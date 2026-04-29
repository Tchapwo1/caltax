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
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col gap-1">
        <label htmlFor={id} className="text-lg font-black text-text_primary tracking-tight cursor-pointer">
          {label}
        </label>
        {description && (
          <span className="text-sm font-medium text-text_primary opacity-40">{description}</span>
        )}
      </div>
      
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out outline-none
          ${checked ? 'bg-net_profit' : 'bg-border_default'}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out mt-[2px] ml-[2px]
            ${checked ? 'translate-x-6' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  )
}
