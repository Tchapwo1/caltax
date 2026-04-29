/**
 * src/components/results/SankeyWrapper.tsx
 */

'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const SankeyDiagram = dynamic(() => import('./SankeyDiagram'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] bg-background_surface rounded-lg animate-pulse border border-border_default flex items-center justify-center">
      <span className="text-xs text-text_secondary">Loading visualization...</span>
    </div>
  )
})

export const SankeyWrapper: React.FC = () => {
  return <SankeyDiagram />
}
