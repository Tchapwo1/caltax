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
      <div className="flex flex-col gap-space_16">
        
        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space_6">
          <div className="bg-background_surface rounded-2xl p-space_6 border border-border_default flex flex-col gap-1">
             <span className="text-[10px] font-black uppercase text-text_secondary tracking-widest">Personal Allowance</span>
             <span className="text-xl font-black text-text_primary">£{config.personal_allowance.toLocaleString()}</span>
          </div>
          <div className="bg-background_surface rounded-2xl p-space_6 border border-border_default flex flex-col gap-1">
             <span className="text-[10px] font-black uppercase text-text_secondary tracking-widest">Basic Rate</span>
             <span className="text-xl font-black text-action">20%</span>
          </div>
          <div className="bg-background_surface rounded-2xl p-space_6 border border-border_default flex flex-col gap-1">
             <span className="text-[10px] font-black uppercase text-text_secondary tracking-widest">Tax Year</span>
             <span className="text-xl font-black text-text_primary">{displayYear}</span>
          </div>
        </div>

        <section className="flex flex-col gap-space_6">
          <h2 className="text-3xl font-black text-text_primary tracking-tight">Understanding your UK tax</h2>
          <div className="c-body text-text_secondary leading-relaxed space-y-6 text-md">
            <p>
              Income Tax is a contribution that most people in the UK make based on their earnings. 
              The money raised goes towards funding public services like the NHS, education, and welfare. 
              However, you only start paying it once your income exceeds a certain threshold, known as the 
              <strong> Personal Allowance</strong>. 
            </p>
            <p>
              For the {displayYear} tax year, the standard Personal Allowance is 
              <span className="text-text_primary font-bold"> £{config.personal_allowance.toLocaleString()}</span>. 
              This is the amount you can earn each year before you start paying any Income Tax. 
              If you earn above £100,000, this allowance is gradually withdrawn at a rate of £1 for every £2 earned above the limit.
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-space_6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-black text-text_primary tracking-tight">How your income tax is calculated</h2>
            <p className="text-text_secondary text-sm font-medium">The rates below apply to your taxable income after your Personal Allowance is deducted.</p>
          </div>
          
          <div className="overflow-hidden rounded-2xl border border-border_default shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#5037ED]/5 text-action font-black border-b border-border_default">
                <tr>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px]">Taxable Income Band</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px]">Tax Rate</th>
                  <th className="px-6 py-4 uppercase tracking-widest text-[10px]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border_default bg-white">
                <tr>
                  <td className="px-6 py-4 font-bold text-text_primary">Up to £{config.personal_allowance.toLocaleString()}</td>
                  <td className="px-6 py-4">0%</td>
                  <td className="px-6 py-4 text-text_secondary">Personal Allowance</td>
                </tr>
                {config.income_tax_bands.map((band, i) => (
                  <tr key={i} className="hover:bg-background_surface/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-text_primary">
                      £{(band.from + 1).toLocaleString()} {band.to ? `to £${band.to.toLocaleString()}` : '+'}
                    </td>
                    <td className="px-6 py-4 text-action font-black">{band.rate * 100}%</td>
                    <td className="px-6 py-4 text-capitalize font-medium">{(band.band || 'Standard').replace('_', ' ')} Rate</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="flex flex-col gap-space_6">
          <h2 className="text-2xl font-black text-text_primary tracking-tight">What is National Insurance?</h2>
          <div className="c-body text-text_secondary leading-relaxed space-y-4 text-md">
            <p>
              National Insurance (NI) is a separate tax on your earnings. It pays for certain benefits and the state pension. 
              The amount you pay depends on whether you are employed or self-employed, and how much you earn.
            </p>
            <p>
              For most employees, you pay <strong>Class 1 National Insurance</strong>. For self-employed individuals, 
              you pay <strong>Class 4</strong> (and previously Class 2) based on your annual profits.
            </p>
          </div>
        </section>

        <div className="bg-action rounded-[2rem] p-space_10 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <h3 className="text-xl font-black mb-space_2 relative z-10">Expert Tax Advice</h3>
          <p className="text-white/80 font-medium text-sm leading-relaxed relative z-10 max-w-2xl mb-space_6">
            Taxes can be complicated, especially if you have multiple income sources or high earnings. 
            Our accredited accountants are here to help you maximize your take-home pay legally and safely.
          </p>
          <button className="bg-white text-action px-space_8 py-3 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 transition-transform relative z-10">
            Talk to an Expert
          </button>
        </div>

      </div>
    </article>
  )
}
