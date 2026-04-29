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
        className="w-full flex items-center justify-between py-6 group"
      >
        <span className="text-xl font-black text-text_primary tracking-tight group-hover:opacity-70 transition-opacity">
          {title}
        </span>
        <div className={`
          w-8 h-8 rounded-full border-2 border-border_default flex items-center justify-center
          transition-all duration-300 group-hover:border-text_primary
          ${isOpen ? 'rotate-180 bg-text_primary border-text_primary text-white' : 'text-text_primary'}
        `}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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
