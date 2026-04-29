/**
 * src/app/tax-year/[year]/page.tsx
 * 
 * Dynamic tax year route.
 * strictly adhering to blueprint Part 4 & Part 7 (SEO).
 */

import React from 'react'
import { Metadata } from 'next'
import { loadTaxYear, getAvailableTaxYears } from '@/lib/store/taxYear'
import { CalculatorContainer } from '@/components/CalculatorContainer'
import { JSONLD } from '@/components/seo/JSONLD'
import { decodeStateFromURL } from '@/lib/store/url'

interface PageProps {
  params: { year: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { year } = await params
  const displayYear = year.replace('_', '/')
  return {
    title: `UK Income Tax Calculator ${displayYear} | Take-home Pay`,
    description: `Calculate your take-home pay, tax, NI, pension, and student loan deductions for the ${displayYear} UK tax year. Free, fast and accurate.`,
    alternates: {
      canonical: `/tax-year/${year}`,
    }
  }
}

export async function generateStaticParams() {
  const years = getAvailableTaxYears()
  return years.map((year) => ({ year }))
}

export default async function TaxYearPage({ params, searchParams }: PageProps) {
  const { year: yearParam } = await params
  const sParams = await searchParams
  const { config, year } = loadTaxYear(yearParam)
  const initialInput = decodeStateFromURL(new URLSearchParams(sParams as any))

  const displayYear = year.replace('_', '/')

  // Part 7: SEO Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `UK Income Tax Calculator ${displayYear}`,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "description": `Calculate your take-home pay, tax, NI, pension, and student loan deductions for the ${displayYear} UK tax year.`,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is UK income tax calculated?",
        "acceptedAnswer": { "@type": "Answer", "text": "Income tax is calculated based on tax bands, personal allowance, and your taxable income after deductions." }
      },
      {
        "@type": "Question",
        "name": "What is the 60% tax trap?",
        "acceptedAnswer": { "@type": "Answer", "text": "Between £100,000 and £125,140, your Personal Allowance is withdrawn, creating an effective 60% marginal tax rate." }
      }
    ]
  }

  return (
    <main className="container mx-auto px-space_4 py-space_10 max-w-6xl">
      <JSONLD data={softwareSchema} />
      <JSONLD data={faqSchema} />
      
      <div className="flex flex-col gap-space_10">
        <header className="flex flex-col gap-space_2">
          <h1 className="text-3xl font-bold text-text_primary">
            UK Income Tax Calculator <span className="text-action">{displayYear}</span>
          </h1>
          <p className="text-md text-text_secondary max-w-2xl">
            Detailed breakdown of your salary after Income Tax, National Insurance, 
            Pension, and Student Loan deductions.
          </p>
        </header>

        <CalculatorContainer config={config} initialInput={initialInput} />
        
        {/* Phase 8: Content Structure */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-space_8 mt-space_10 border-t border-border_default pt-space_10">
          <div className="flex flex-col gap-space_4">
            <h2 className="text-xl font-bold text-text_primary">How it works</h2>
            <p className="text-sm text-text_secondary leading-relaxed">
              This calculator uses the official HMRC tax bands and thresholds for the {displayYear} tax year. 
              We calculate your tax using a deterministic logic engine that handles Personal Allowance tapering, 
              Scottish tax bands, and various student loan plans.
            </p>
          </div>
          <div className="flex flex-col gap-space_4">
            <h2 className="text-xl font-bold text-text_primary">Salary Sacrifice</h2>
            <p className="text-sm text-text_secondary leading-relaxed">
              By contributing to your pension via salary sacrifice, you reduce your taxable gross income. 
              This not only lowers your Income Tax but also your National Insurance contributions, 
              and can help you avoid "tax traps" where your Personal Allowance is withdrawn.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
