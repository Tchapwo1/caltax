/**
 * src/components/seo/JSONLD.tsx
 */

import React from 'react'

interface JSONLDProps {
  data: any
}

export const JSONLD: React.FC<JSONLDProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
