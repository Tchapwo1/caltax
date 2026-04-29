/**
 * src/app/compare/page.tsx
 */

import React from 'react'
import { loadTaxYear } from '@/lib/store/taxYear'
import { decodeStateFromURL } from '@/lib/store/url'
import { CompareContainer } from '@/components/CompareContainer'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ComparePage({ searchParams }: PageProps) {
  const sParams = await searchParams
  const params = new URLSearchParams(sParams as any)
  
  // Decoding two sets of inputs
  // Expecting format: ?s1=...&s2=... where s1/s2 are encoded states
  const s1 = params.get('s1') || ''
  const s2 = params.get('s2') || ''
  
  const input1 = decodeStateFromURL(s1)
  const input2 = decodeStateFromURL(s2)
  
  const { config: config1 } = loadTaxYear(input1.taxYear)
  const { config: config2 } = loadTaxYear(input2.taxYear)

  return (
    <main className="container mx-auto px-space_4 py-space_10 max-w-6xl">
      <header className="flex flex-col gap-space_2 mb-space_10">
        <h1 className="text-3xl font-bold text-text_primary">Compare Tax Scenarios</h1>
        <p className="text-md text-text_secondary max-w-2xl">
          See the difference between two salary scenarios or two different tax years side-by-side.
        </p>
      </header>

      <CompareContainer 
        config1={config1} 
        config2={config2} 
        input1={input1} 
        input2={input2} 
      />
    </main>
  )
}
