/**
 * src/components/layout/Footer.tsx
 * 
 * Pixel-perfect Taxfix clone footer.
 */

import React from 'react'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border_default py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-24">
          {/* Logo & Info */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <Link href="/" className="text-3xl font-black text-text_primary tracking-tighter">
              taxcalculator365<span className="text-accent_primary">.</span>
            </Link>
            <p className="text-sm font-medium text-text_primary opacity-60 leading-relaxed">
              We make taxes simple. The UK's most loved tax filing platform.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-black text-text_primary uppercase tracking-widest text-xs opacity-40">Services</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/accountants" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Find an Accountant</Link></li>
              <li><Link href="/returns" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Tax Returns</Link></li>
              <li><Link href="/mtd" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">MTD for Landlords</Link></li>
              <li><Link href="/advice" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Tax Advice</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-black text-text_primary uppercase tracking-widest text-xs opacity-40">Resources</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/calculators" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Tax Calculators</Link></li>
              <li><Link href="/blog" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Expert Blog</Link></li>
              <li><Link href="/guides" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Tax Guides</Link></li>
              <li><Link href="/help" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Help Center</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-black text-text_primary uppercase tracking-widest text-xs opacity-40">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">About Us</Link></li>
              <li><Link href="/careers" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Careers</Link></li>
              <li><Link href="/press" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Press</Link></li>
              <li><Link href="/contact" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-black text-text_primary uppercase tracking-widest text-xs opacity-40">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/privacy" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm font-bold text-text_primary hover:opacity-70 transition-opacity">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border_default pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs font-medium text-text_primary opacity-40">
            © {new Date().getFullYear()} TaxCalculator365. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="w-8 h-8 rounded-full bg-background_surface flex items-center justify-center hover:bg-accent_primary transition-colors text-text_primary">𝕏</Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-background_surface flex items-center justify-center hover:bg-accent_primary transition-colors text-text_primary">in</Link>
            <Link href="#" className="w-8 h-8 rounded-full bg-background_surface flex items-center justify-center hover:bg-accent_primary transition-colors text-text_primary">ig</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
