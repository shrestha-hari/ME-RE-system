import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { SkillCard } from '@/components/SkillCard'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Seo } from '@/components/Seo'
import { skillsData, certificationsData } from '@/data'
import { CheckCircle2, ArrowRight } from '@/assets/icons'
import { SITE_CONFIG } from '@/utils'

export const SkillsPage: React.FC = () => {
  return (
    <div className="w-full flex-1 py-10 sm:py-14 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <Seo
        title="Land & Property Services | Mt. Everest Real-Estate"
        description="Comprehensive real estate services: cadastral land plotting, Malpot title due diligence, topographic surveying, land valuation, and turnkey colony infrastructure."
        url={`${SITE_CONFIG.url}/skills`}
      />
      <Container size="xl">
        <SectionTitle
          number="04"
          badge="SERVICES & SOLUTIONS"
          title="Turnkey land development &"
          highlight="property advisory solutions"
          description="We take care of every phase—from raw land acquisition and cadastral subdivision to legal registration and blacktop asphalt roads."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((group, index) => (
            <SkillCard
              key={group.category}
              skillGroup={group}
              number={`0${index + 1}`}
            />
          ))}
        </div>

        {/* Accreditations Section */}
        <div className="mt-14 pt-12 border-t border-[#E2E8F0] dark:border-[#1F2937]">
          <SectionTitle
            number="05"
            badge="STATUTORY COMPLIANCE"
            title="Official licenses, approvals &"
            highlight="regulatory standards"
            description="Our plotting schemes strictly comply with Kathmandu Valley Development Authority (KVDA) road mandates and Land Revenue Office (Malpot) procedures."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificationsData.map((cert) => (
              <Card key={cert.title} hoverEffect className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#15803D] dark:text-[#4ADE80] uppercase">
                      {cert.issuer}
                    </span>
                    <CheckCircle2 className="size-4 text-[#15803D] dark:text-[#4ADE80]" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-2 leading-snug">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
                    {cert.topics}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#15803D] dark:text-[#4ADE80] hover:underline"
                  >
                    <span>View Compliance</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {/* Need Custom Advisory Banner */}
          <div className="mt-10 p-6 rounded-[8px] bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                Looking to Plot or Sell Your Land in Kathmandu Valley?
              </h3>
              <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-1 max-w-xl">
                We partner with landowners for joint venture (JV) plotting and provide end-to-end master planning, road grading, and direct buyer marketing.
              </p>
            </div>
            <Link to="/contact" className="shrink-0">
              <Button variant="primary" size="md" className="rounded-[6px] font-semibold">
                Discuss Joint Venture
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SkillsPage
