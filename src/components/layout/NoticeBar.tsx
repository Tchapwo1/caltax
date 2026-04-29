/**
 * src/components/layout/NoticeBar.tsx
 * 
 * The lime green promotional bar below the navbar.
 */

import React from 'react'
import Link from 'next/link'

export const NoticeBar: React.FC = () => {
  return (
    <section className="bg-accent_light py-8">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl md:text-3xl font-black text-text_primary tracking-tight">Our MTD service is here!</h2>
          <p className="text-lg font-medium text-text_primary opacity-80">Software created for landlords and sole-traders.</p>
        </div>
        <Link 
          href="/mtd" 
          className="bg-white text-text_primary px-8 py-3 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-sm"
        >
          Start now for free
        </Link>
      </div>
    </section>
  )
}
