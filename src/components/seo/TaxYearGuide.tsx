/**
 * src/components/seo/TaxYearGuide.tsx
 * 
 * Expert guide and FAQ content for tax year landing pages.
 * Ported and refined from taxx2.html.
 */

import React from 'react'
import type { TaxYearConfig } from '@/lib/calculator/types'

interface Props {
  config: TaxYearConfig
}

export const TaxYearGuide: React.FC<Props> = ({ config }) => {
  const displayYear = config.tax_year.replace('_', '/')
  
  return (
    <article className="mt-space_20 border-t border-border_default pt-space_12 max-w-4xl mx-auto">
      <div className="flex flex-col gap-space_10">
        
        <section className="flex flex-col gap-space_4">
          <h2 className="text-2xl font-black text-text_primary tracking-tight">What is Income Tax?</h2>
          <div className="c-body text-text_secondary leading-relaxed space-y-4">
            <p>
              Income Tax is a contribution that most people in the UK make based on their earnings. 
              However, you only start paying it once your income exceeds a certain threshold, known as the 
              <strong> Personal Allowance</strong>. 
            </p>
            <p>
              For the {displayYear} tax year, the standard Personal Allowance is 
              <strong> £{config.personal_allowance.toLocaleString()}</strong>. If you earn above £100,000, 
              this allowance is gradually withdrawn.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-space_4">
          <h2 className="text-2xl font-black text-text_primary tracking-tight">How is the tax calculated?</h2>
          <div className="c-body text-text_secondary leading-relaxed space-y-4">
            <p>
              The UK uses a progressive tax system. Your income is divided into bands, and you only pay 
              the specific rate for the portion of your income that falls within that band.
            </p>
            <div className="overflow-hidden rounded-xl border border-border_default">
              <table className="w-full text-sm text-left">
                <thead className="bg-background_surface text-text_primary font-bold border-b border-border_default">
                  <tr>
                    <th className="px-4 py-3">Income Band</th>
                    <th className="px-4 py-3">Tax Rate</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border_default">
                  <tr>
                    <td className="px-4 py-3">Up to £{config.personal_allowance.toLocaleString()}</td>
                    <td className="px-4 py-3">0%</td>
                    <td className="px-4 py-3">Personal Allowance</td>
                  </tr>
                  {config.income_tax_bands.map((band, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3">
                        £{(band.from + 1).toLocaleString()} {band.to ? `to £${band.to.toLocaleString()}` : '+'}
                      </td>
                      <td className="px-4 py-3">{band.rate * 100}%</td>
                      <td className="px-4 py-3 text-capitalize">{(band.band || 'Standard').replace('_', ' ')} Rate</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-space_4">
          <h2 className="text-2xl font-black text-text_primary tracking-tight">Self-Employed vs Employed</h2>
          <div className="c-body text-text_secondary leading-relaxed space-y-4">
            <p>
              If you are employed (PAYE), your employer deducts tax automatically. If you are self-employed, 
              you must file a <strong>Self Assessment</strong> tax return and pay your bill manually by 
              January 31st.
            </p>
            <p>
              Self-employed individuals can also deduct <strong>allowable expenses</strong> (like office costs 
              or travel) from their turnover to calculate their taxable profit.
            </p>
          </div>
        </section>

        <div className="bg-action/5 rounded-2xl p-space_8 border border-action/10">
          <h3 className="text-lg font-bold text-action mb-space_2">Expert Tip</h3>
          <p className="text-sm text-text_secondary">
            Making contributions to a private pension can reduce your taxable income and potentially 
            bring you below a higher tax threshold, saving you a significant amount in income tax.
          </p>
        </div>

      </div>
    </article>
  )
}
