import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Tabs } from '@/components/Tabs'
import { Seo } from '@/components/Seo'
import { testimonialsData } from '@/data'
import { QuoteIcon, ShieldCheck, ArrowRight, PhoneIcon } from '@/assets/icons'
import { SITE_CONFIG } from '@/utils'

export const TestimonialsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const categories = useMemo(() => {
    const unique = Array.from(new Set(testimonialsData.map((t) => t.category)))
    return [
      { id: 'All', label: 'All Reviews', count: testimonialsData.length },
      ...unique.map((cat) => ({
        id: cat,
        label: cat,
        count: testimonialsData.filter((t) => t.category === cat).length,
      })),
    ]
  }, [])

  const filteredTestimonials = useMemo(() => {
    if (activeCategory === 'All') return testimonialsData
    return testimonialsData.filter((t) => t.category === activeCategory)
  }, [activeCategory])

  // JSON-LD Review Schema
  const testimonialSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: testimonialsData.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Review',
          author: {
            '@type': 'Person',
            name: `${item.prefix ? `${item.prefix} ` : ''}${item.name}`,
            jobTitle: item.role,
            worksFor: {
              '@type': 'Organization',
              name: item.organization,
            },
          },
          reviewBody: item.quote,
          itemReviewed: {
            '@type': 'Organization',
            name: SITE_CONFIG.name,
          },
        },
      })),
    }
  }, [])

  return (
    <div className="w-full flex-1 py-10 sm:py-14 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <Seo
        title="Client Reviews & Testimonials | Mt. Everest Real-Estate"
        description="Read verified buyer experiences, testimonials, and reviews from families who built homes and investors who purchased land with Mt. Everest Real-Estate."
        url={`${SITE_CONFIG.url}/testimonials`}
        schema={testimonialSchema}
      />

      <Container size="xl">
        <header className="mb-8">
          <SectionTitle
            number="06"
            badge="BUYER STORIES & EXPERIENCES"
            title="Voices of satisfied landowners &"
            highlight="property investors"
            description="Genuine feedback from clients who purchased residential plots, commercial lands, and resort parcels across Lalitpur, Bara, and Chitwan."
            className="mb-6"
          />

          {/* Category Filter Tabs */}
          <div className="w-full max-w-full overflow-x-auto pb-1 scrollbar-none flex items-center">
            <Tabs
              tabs={categories}
              activeTab={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </header>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <Card
              key={item.id}
              hoverEffect
              className="p-5 sm:p-6 bg-white dark:bg-[#111827] flex flex-col justify-between border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs hover:border-[#15803D]/50 dark:hover:border-[#22C55E]/50 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3.5 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  <Badge variant="primary" size="sm" className="font-mono text-[11px] rounded-[4px]">
                    {item.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#15803D] dark:text-[#4ADE80] font-semibold">
                    <ShieldCheck className="size-3.5 text-[#15803D] dark:text-[#4ADE80]" />
                    Verified Buyer
                  </span>
                </div>

                <div className="relative mt-4">
                  <QuoteIcon className="size-8 text-[#15803D]/10 dark:text-[#4ADE80]/15 absolute -top-3 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-[#334155] dark:text-[#D1D5DB] leading-relaxed relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#15803D] dark:bg-[#22C55E] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                    {item.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] truncate">
                      {item.prefix ? `${item.prefix} ` : ''}{item.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] mt-0.5 truncate">
                      {item.role}
                    </p>
                    <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5 line-clamp-1">
                      {item.organization}
                    </p>
                  </div>
                </div>

                {item.relationship && (
                  <div className="mt-3 pt-2 border-t border-dashed border-[#E2E8F0] dark:border-[#1F2937] text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                    <span>{item.relationship}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Join our community banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-[8px] bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl">
            <h2 className="font-heading font-bold text-lg sm:text-xl text-[#0F172A] dark:text-[#F8FAFC]">
              Ready to secure your land in Lalitpur, Bara, or Chitwan?
            </h2>
            <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
              Schedule a property visit with our team and inspect legal deeds before making any commitment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/contact">
              <Button variant="primary" size="md" className="rounded-[6px] font-semibold" rightIcon={<ArrowRight className="size-4" />}>
                Book Site Inspection
              </Button>
            </Link>
            <a href="tel:+9779851068067">
              <Button variant="secondary" size="md" className="rounded-[6px] font-semibold" leftIcon={<PhoneIcon className="size-4" />}>
                Call 9851068067
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default TestimonialsPage
