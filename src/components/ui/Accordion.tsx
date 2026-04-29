/**
 * src/components/ui/Accordion.tsx
 * 
 * Collapsible section for optional/advanced settings.
 * strictly adhering to blueprint Part 5.
 */

import React from 'react'

interface AccordionProps {
  id: string
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export const Accordion: React.FC<AccordionProps> = ({
  id,
  title,
  isOpen,
  onToggle,
  children
}) => {
  return (
    <div className="w-full border-t border-border_default">
      <button
        id={`${id}-header`}
        type="button"
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        onClick={onToggle}
        className="flex items-center justify-between w-full py-space_4 text-left focus:outline-none group"
      >
        <span className="text-md font-semibold text-text_primary group-hover:text-action transition-colors">
          {title}
        </span>
        <svg
          className={`w-5 h-5 text-text_secondary transition-transform duration-medium ease-standard ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-header`}
        className={`
          overflow-hidden transition-all duration-medium ease-standard
          ${isOpen ? 'max-h-[1000px] opacity-100 pb-space_6' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="flex flex-col gap-space_6 pt-space_2">
          {children}
        </div>
      </div>
    </div>
  )
}
