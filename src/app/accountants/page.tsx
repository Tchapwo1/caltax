
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'

interface Accountant {
  id: number
  name: string
  location: string
  services: string[]
  feeRange: string
  verified: boolean
  specialist: string
  rating: number
  reviews: number
  certifications: string
  bio: string
  img: string
}

const accountantsData: Accountant[] = [
  { 
    id: 1, 
    name: "Sterling Tax Advisors", 
    location: "London, EC2", 
    services: ["Self Assessment", "Corporation Tax", "MTD Compliance"], 
    feeRange: "£250 - £1,000", 
    verified: true, 
    specialist: "Freelancers & SMEs", 
    rating: 4.9, 
    reviews: 124, 
    certifications: "ICAEW, Xero Platinum Partner", 
    bio: "Specializing in tax optimization for digital nomads and tech startups.", 
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400&h=240" 
  },
  { 
    id: 2, 
    name: "Northern Bookkeeping", 
    location: "Manchester, UK", 
    services: ["VAT Returns", "Payroll", "Bookkeeping"], 
    feeRange: "£50 - £300/mo", 
    verified: true, 
    specialist: "Small Business", 
    rating: 4.8, 
    reviews: 98, 
    certifications: "AAT Qualified, QuickBooks Pro", 
    bio: "Friendly, affordable bookkeeping services for local businesses.", 
    img: "https://images.unsplash.com/photo-1454165833767-131435bb4496?auto=format&fit=crop&q=80&w=400&h=240" 
  },
  { 
    id: 3, 
    name: "Elite Wealth Tax", 
    location: "Remote UK", 
    services: ["Capital Gains", "Inheritance Tax", "Estate Planning"], 
    feeRange: "£1,000+", 
    verified: false, 
    specialist: "High Net Worth", 
    rating: 4.7, 
    reviews: 56, 
    certifications: "CTA (Chartered Tax Adviser)", 
    bio: "Complex tax planning and wealth preservation strategies.", 
    img: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&q=80&w=400&h=240" 
  },
  { 
    id: 4, 
    name: "The Property Accountant", 
    location: "Bristol, UK", 
    services: ["Rental Income", "Stamp Duty", "Property VAT"], 
    feeRange: "£300 - £800", 
    verified: true, 
    specialist: "Landlords", 
    rating: 4.9, 
    reviews: 82, 
    certifications: "ACCA, Property Tax Specialists", 
    bio: "Focused exclusively on property investors and portfolio landlords.", 
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=400&h=240" 
  },
  { 
    id: 5, 
    name: "Digital Tax Solutions", 
    location: "Edinburgh, Scotland", 
    services: ["E-commerce Tax", "International VAT", "Shopify Setup"], 
    feeRange: "£200 - £600", 
    verified: true, 
    specialist: "E-commerce", 
    rating: 4.8, 
    reviews: 45, 
    certifications: "HMRC Registered, Amazon Seller Central Experts", 
    bio: "Helping online sellers navigate global tax complexities.", 
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=240" 
  },
  { 
    id: 6, 
    name: "Startup Tax Lab", 
    location: "London & Remote", 
    services: ["R&D Tax Credits", "SEIS/EIS", "Grant Audits"], 
    feeRange: "Contingency / Fixed", 
    verified: true, 
    specialist: "R&D / Tech", 
    rating: 5.0, 
    reviews: 31, 
    certifications: "Innovate UK Approved Advisors", 
    bio: "Maximizing tax relief for innovative UK companies.", 
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=240" 
  }
]

const allServices = Array.from(new Set(accountantsData.flatMap(a => a.services))).sort()

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortMode, setSortMode] = useState('rating')

  const filteredAccountants = useMemo(() => {
    return accountantsData.filter(a => {
      const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           a.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                           a.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesServices = selectedServices.length === 0 || 
                             selectedServices.some(s => a.services.includes(s))
      
      const matchesVerified = !verifiedOnly || a.verified

      return matchesSearch && matchesServices && matchesVerified
    }).sort((a, b) => {
      if (sortMode === 'rating') return b.rating - a.rating
      if (sortMode === 'name') return a.name.localeCompare(b.name)
      return 0
    })
  }, [searchQuery, selectedServices, verifiedOnly, sortMode])

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    )
  }

  return (
    <main className="min-h-screen bg-background_primary">
      {/* Hero Search */}
      <section className="bg-background_surface py-12 border-b border-border_default">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl md:text-6xl font-black text-text_primary tracking-tighter leading-tight">
              Find an <span className="text-accent_primary">Accredited Accountant</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search by name, service (VAT, R&D), or location..."
                  className="w-full bg-white border-2 border-border_default rounded-full px-8 py-4 text-lg focus:border-accent_primary outline-none transition-all pl-14"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🔍</span>
              </div>
              <button className="bg-accent_primary text-white px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-lg">
                Submit a brief
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-sticky bg-white border-b border-border_default py-4">
        <div className="container mx-auto px-6 max-w-7xl overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <button 
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`px-6 py-2 rounded-full border-2 font-bold text-sm transition-all flex items-center gap-2 ${verifiedOnly ? 'bg-accent_primary border-accent_primary text-white' : 'border-border_default text-text_primary hover:border-accent_primary'}`}
            >
              {verifiedOnly && <span>✓</span>} Verified Only
            </button>
            
            <div className="h-6 w-px bg-border_default mx-2" />
            
            {allServices.map(service => (
              <button 
                key={service}
                onClick={() => toggleService(service)}
                className={`px-6 py-2 rounded-full border-2 font-bold text-sm transition-all ${selectedServices.includes(service) ? 'bg-text_primary border-text_primary text-white' : 'border-border_default text-text_primary hover:border-accent_primary'}`}
              >
                {service}
              </button>
            ))}

            {(selectedServices.length > 0 || verifiedOnly || searchQuery) && (
              <button 
                onClick={() => { setSelectedServices([]); setVerifiedOnly(false); setSearchQuery('') }}
                className="text-accent_primary font-black text-sm ml-4 hover:underline"
              >
                Reset all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <p className="text-lg font-bold text-text_primary">
            Showing <span className="text-accent_primary">{filteredAccountants.length}</span> trusted partners
          </p>
          <select 
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="bg-white border-2 border-border_default rounded-full px-6 py-2 font-bold text-sm focus:border-accent_primary outline-none"
          >
            <option value="rating">Highest Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccountants.map(accountant => (
            <div key={accountant.id} className="bg-white rounded-[2rem] border border-border_default overflow-hidden hover:shadow-2xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={accountant.img} 
                  alt={accountant.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
                />
                {accountant.verified && (
                  <div className="absolute top-4 right-4 bg-accent_primary text-white px-4 py-1 rounded-full text-xs font-black shadow-lg">
                    VERIFIED
                  </div>
                )}
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {accountant.services.slice(0, 2).map(s => (
                    <span key={s} className="bg-accent_light text-accent_primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-text_primary tracking-tight leading-tight">{accountant.name}</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-text_secondary">
                  <span>📍 {accountant.location}</span>
                  <span className="opacity-40">•</span>
                  <span>🏆 {accountant.rating} ({accountant.reviews} reviews)</span>
                </div>
                <p className="text-sm font-medium text-text_primary opacity-70 leading-relaxed line-clamp-2 italic">
                  "{accountant.bio}"
                </p>
                <div className="h-px bg-border_default my-2" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-text_primary opacity-40 uppercase tracking-widest">Specialist in</span>
                  <span className="text-sm font-bold text-text_primary">{accountant.specialist}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-black text-text_primary">{accountant.feeRange.split(' - ')[0]}<span className="text-xs opacity-40 font-medium italic"> / service</span></span>
                  <Link href={`/accountant/${accountant.id}`} className="text-accent_primary font-black text-sm group-hover:underline">
                    View profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAccountants.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center text-center gap-4">
            <span className="text-6xl">🔭</span>
            <h3 className="text-2xl font-black text-text_primary">No advisors found</h3>
            <p className="text-lg text-text_secondary">Try adjusting your filters or search query.</p>
          </div>
        )}
      </section>
    </main>
  )
}
