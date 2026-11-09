import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Timeline } from '@/components/Timeline'
import { Seo } from '@/components/Seo'
import { CheckCircle2, MountainIcon } from '@/assets/icons'
import { personalData, experienceData, certificationsData } from '@/data'
import { SITE_CONFIG } from '@/utils'

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full flex-1 py-10 sm:py-14 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <Seo
        title="About Us | Mt. Everest Real-Estate"
        description="Learn about Mt. Everest Real-Estate: Nepal's leading land development agency, our 14+ year history, master-planned plotting standards, and verified Lalpurja commitment."
        url={`${SITE_CONFIG.url}/about`}
      />
      <Container size="xl">
        <SectionTitle
          number="01"
          badge="COMPANY PROFILE"
          title="Building communities with"
          highlight="integrity & planned development"
          description="Founded on the principles of absolute legal transparency, cadastral accuracy, and enduring infrastructure for families and visionary property investors."
        />

        {/* Section 1: Company Profile & Core Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-6">
            <Card className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                Our Mission & Philosophy
              </h3>
              <p className="mt-3.5 text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] leading-relaxed">
                {personalData.bio}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] leading-relaxed">
                We believe land is the foundation of family security and generational wealth. In an unregulated market with frequent title ambiguity and inadequate road widths, Mt. Everest Real-Estate sets the benchmark by ensuring every single plotted scheme possesses approved town development permissions, guaranteed 20ft+ access roads, dedicated storm drainage, and instant title deed (Lalpurja) registration.
              </p>
            </Card>

            {/* Statutory Registrations */}
            <Card className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                <div>
                  <span className="font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-bold">
                    GOVERNMENT AUTHORIZATION
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                    {personalData.education.degree}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#15803D] dark:text-[#4ADE80]">
                    {personalData.education.institution}
                  </p>
                </div>
                <Badge size="sm" variant="secondary" className="rounded-[4px] text-[11px] dark:bg-[#1E293B] dark:text-[#E2E8F0] self-start sm:self-center">
                  {personalData.education.period}
                </Badge>
              </div>

              <div className="mt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2.5">
                  Core Cadastral & Development Capabilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {personalData.education.courses.map((course) => (
                    <Badge key={course} size="sm" variant="secondary" className="rounded-[4px] text-[11px] dark:bg-[#1E293B] dark:text-[#E2E8F0]">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Corporate Info Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
              <div className="w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#1F2937] mb-4 relative">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop"
                  alt="Mt. Everest Real-Estate Land"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <div className="w-7 h-7 rounded-[4px] bg-[#15803D] text-white flex items-center justify-center shadow-xs">
                    <MountainIcon className="size-4 text-white" />
                  </div>
                </div>
              </div>

              <h4 className="font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                {personalData.name}
              </h4>
              <p className="text-xs font-mono text-[#15803D] dark:text-[#4ADE80] font-medium mt-0.5">
                {personalData.title}
              </p>

              <dl className="mt-3.5 pt-3 border-t border-[#E2E8F0] dark:border-[#1F2937] space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <dt className="text-[#64748B] dark:text-[#94A3B8] font-mono">Headquarters</dt>
                  <dd className="font-medium text-[#0F172A] dark:text-[#F8FAFC] text-right">New Baneshwor, KTM</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-[#64748B] dark:text-[#94A3B8] font-mono">Hotline</dt>
                  <dd className="font-mono text-[#0F172A] dark:text-[#F8FAFC]">01-4498221</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-[#64748B] dark:text-[#94A3B8] font-mono">Status</dt>
                  <dd>
                    <Badge variant="success" size="sm" dot className="rounded-[4px] text-[11px]">
                      Plots Available
                    </Badge>
                  </dd>
                </div>
              </dl>

              <div className="mt-5 pt-3.5 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                <Link to="/contact" className="w-full block">
                  <Button variant="primary" fullWidth size="md">
                    Schedule Free Site Visit
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Section 2: Milestones & Historical Track Record */}
        <div className="mt-14 pt-12 border-t border-[#E2E8F0] dark:border-[#1F2937]">
          <div className="max-w-2xl mb-6">
            <span className="font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-bold tracking-wider uppercase">
              COMPANY TIMELINE
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
              Development Milestones & Track Record
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-1.5">
              Our 14-year legacy transforming land across Kathmandu Valley, Pokhara, and the Trishuli corridor into vibrant communities.
            </p>
          </div>
          <Timeline items={experienceData} className="w-full" />
        </div>

        {/* Section 3: Statutory Accreditations */}
        <div className="mt-14 pt-12 border-t border-[#E2E8F0] dark:border-[#1F2937]">
          <div className="max-w-2xl mb-6">
            <span className="font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-bold tracking-wider uppercase">
              STATUTORY COMPLIANCE
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
              Government Licenses & Industry Credentials
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] mt-1.5">
              Formal registrations and affiliations safeguarding our buyers with strict regulatory protections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {certificationsData.map((cert) => (
              <Card key={cert.title} hoverEffect className="p-4 sm:p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-[#15803D] dark:text-[#4ADE80] uppercase">
                      {cert.issuer}
                    </span>
                    <CheckCircle2 className="size-4 text-[#15803D] dark:text-[#4ADE80]" />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-2 line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1.5 leading-relaxed line-clamp-3">
                    {cert.topics}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                  <span className="text-xs font-mono text-[#15803D] dark:text-[#4ADE80] font-semibold">
                    ✓ Verified Active
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AboutPage
