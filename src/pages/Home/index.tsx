import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '@/components/Hero'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { ProjectCard, type ProjectItem } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { Timeline } from '@/components/Timeline'
import { SkillCard } from '@/components/SkillCard'
import { Tabs } from '@/components/Tabs'
import { Gallery } from '@/components/Gallery'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { InputField, TextareaField } from '@/components/Input'
import { Select } from '@/components/Select'
import { CustomDatePicker } from '@/components/CustomDatePicker'
import { Seo } from '@/components/Seo'
import { PopMessage, SITE_CONFIG } from '@/utils'
import { useTranslation } from '@/i18n'
import {
  ArrowRight,
  CheckCircle2,
  QuoteIcon,
  PhoneIcon,
  ShieldCheck,
  MapPin,
} from '@/assets/icons'
import {
  personalData,
  projectsData,
  experienceData,
  skillsData,
  certificationsData,
  testimonialsData,
} from '@/data'

export const HomePage: React.FC = () => {
  const { t, language } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [preferredPlot, setPreferredPlot] = useState('Everest Green Valley Plots (Godawari)')
  const [visitDate, setVisitDate] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const plotOptions = useMemo(
    () => [
      {
        value: 'Everest Green Valley Plots (Godawari)',
        label: language === 'ne' ? 'एभरेष्ट ग्रीन भ्याली (गोदावरी, ललितपुर)' : 'Everest Green Valley (Godawari, Lalitpur)',
      },
      {
        value: 'Himalayan Heights Enclave (Budhanilkantha)',
        label: language === 'ne' ? 'हिमालयन हाइट्स (बुढानीलकण्ठ, काठमाडौं)' : 'Himalayan Heights (Budhanilkantha, KTM)',
      },
      {
        value: 'Heritage Commercial Gateway (Bhaktapur)',
        label: language === 'ne' ? 'हेरिटेज कमर्सियल (सल्लाघारी, भक्तपुर)' : 'Heritage Commercial (Sallaghari, Bhaktapur)',
      },
      {
        value: 'Chandragiri Pine Vista (Matatirtha)',
        label: language === 'ne' ? 'चन्द्रागिरि पाइन भिस्टा (मातातीर्थ, काठमाडौं)' : 'Chandragiri Pine Vista (Matatirtha, KTM)',
      },
      {
        value: 'Lakeview Orchard Estates (Pokhara)',
        label: language === 'ne' ? 'लेकभ्यू अर्चर्ड (पामे, पोखरा)' : 'Lakeview Orchard Estates (Pame, Pokhara)',
      },
      {
        value: 'Trishuli Riverfront Haven (Chitwan)',
        label: language === 'ne' ? 'त्रिशूली रिभरफ्रन्ट (कुरिनटार / चितवन)' : 'Trishuli Riverfront Haven (Kurintar / Chitwan)',
      },
      {
        value: 'Other / General Land Inquiry',
        label: language === 'ne' ? 'अन्य / सामान्य जग्गा सोधपुछ' : 'Other / General Land Advisory',
      },
    ],
    [language]
  )

  const categories = useMemo(() => {
    const rawCategories = Array.from(new Set(projectsData.map((p) => p.category)))
    return [
      { id: 'All', label: 'All Land Schemes', count: projectsData.length },
      ...rawCategories.map((c) => ({
        id: c,
        label: c,
        count: projectsData.filter((p) => p.category === c).length,
      })),
    ]
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData
    return projectsData.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      PopMessage.error('Please fill in your name, phone number, and requirements.')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      PopMessage.success('Thank you! Your site visit request has been received. Our land counselor will call you shortly.')
      setContactName('')
      setContactPhone('')
      setContactEmail('')
      setVisitDate('')
      setContactMessage('')
    }, 600)
  }

  return (
    <div className="w-full flex-1">
      <Seo
        title="Mt. Everest Real-Estate | Prime Land Plotting & Properties in Nepal"
        description="Premier land development agency in Nepal specializing in legally verified plotted lands, master-planned residential colonies, wide 20ft+ roads, and 100% clear Lalpurja ownership."
        url={`${SITE_CONFIG.url}/`}
      />

      {/* 00. Hero Section */}
      <Hero />

      {/* 01. About Company Section */}
      <section id="about" className="py-14 sm:py-18 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#090D16] transition-colors">
        <Container size="xl">
          <SectionTitle
            number="01"
            badge="LAND DEVELOPMENT & TRUST"
            title="Pioneering organized land plotting &"
            highlight="clear property ownership"
            description={personalData.bio}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Standards & Core Competencies */}
            <div className="lg:col-span-7 space-y-6">
              <Card className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  <div>
                    <span className="font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-semibold uppercase">
                      AUTHORIZATION
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                      {personalData.education.degree}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#15803D] dark:text-[#4ADE80] mt-0.5">
                      {personalData.education.institution}
                    </p>
                  </div>
                  <Badge size="sm" variant="secondary" className="rounded-[4px] text-[11px] dark:bg-[#1E293B] dark:text-[#E2E8F0] self-start sm:self-center">
                    {personalData.education.period}
                  </Badge>
                </div>

                <div className="mt-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] mb-2.5">
                    Guaranteed Development & Legal Standards
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

              {/* Guarantees Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
                  <Badge
                    size="sm"
                    variant="primary"
                    className="w-7 h-7 rounded-[4px] p-0 flex items-center justify-center font-mono font-bold mb-3"
                  >
                    01
                  </Badge>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC]">
                    100% Clear Title (Lalpurja)
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
                    Zero mortgages, zero court litigation, and complete 3-generation lineage verification before any land parcel is offered to clients.
                  </p>
                </Card>

                <Card className="p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
                  <Badge
                    size="sm"
                    variant="primary"
                    className="w-7 h-7 rounded-[4px] p-0 flex items-center justify-center font-mono font-bold mb-3"
                  >
                    02
                  </Badge>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#0F172A] dark:text-[#F8FAFC]">
                    High-Spec Infrastructure
                  </h4>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1.5 leading-relaxed">
                    Standardized 20ft to 32ft blacktopped roads, underground electricity conduits, storm drainage, and ready deep-boring water.
                  </p>
                </Card>
              </div>
            </div>

            {/* Quick Contact & Office Coordinates */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
                <h4 className="font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  Corporate Office & Coordinates
                </h4>

                <dl className="mt-3.5 space-y-3.5 text-sm divide-y divide-[#E2E8F0]/60 dark:divide-[#1F2937]">
                  <div className="flex justify-between items-center pt-2">
                    <dt className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Corporate Email</dt>
                    <dd className="font-mono text-xs text-[#15803D] dark:text-[#4ADE80] font-medium">
                      <a href={`mailto:${personalData.email}`} className="hover:underline">
                        {personalData.email}
                      </a>
                    </dd>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <dt className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Direct Hotline</dt>
                    <dd className="font-mono text-xs text-[#0F172A] dark:text-[#F8FAFC]">
                      {personalData.phone}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <dt className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Headquarters</dt>
                    <dd className="text-xs font-medium text-[#0F172A] dark:text-[#F8FAFC] text-right">
                      {personalData.location}
                    </dd>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <dt className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Site Visit Bus</dt>
                    <dd className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80]">
                      Every Saturday (Free Pickup)
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 pt-3.5 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                  <Link to="/contact" className="w-full block">
                    <Button variant="primary" fullWidth size="md">
                      Request Guided Land Inspection
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* 02. Development Milestones & Track Record */}
      <section id="experience" className="py-14 sm:py-18 bg-[#F8FAFC]/80 dark:bg-[#0B101E]/60 border-t border-[#E2E8F0] dark:border-[#1F2937] transition-colors">
        <Container size="xl">
          <SectionTitle
            number="02"
            badge="TRACK RECORD & MILESTONES"
            title="14+ Years of excellence in"
            highlight="land plotting & development"
            description="Our chronological journey transforming rugged terrain and unorganized acreage into master-planned residential colonies with wide road connectivity."
          />

          <Timeline items={experienceData} />
        </Container>
      </section>

      {/* 03. Featured Land & Plot Directory */}
      <section id="projects" className="py-14 sm:py-18 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#090D16] transition-colors">
        <Container size="xl">
          <div className="space-y-5 mb-8">
            <SectionTitle
              number="03"
              badge="PLOTTED SCHEMES DIRECTORY"
              title="Prime land parcels &"
              highlight="ready-to-build plots"
              description="Explore our hand-picked residential colonies, commercial highway frontages, and leisure farm parcels across Kathmandu Valley and Nepal."
              className="mb-0"
            />

            {/* Category Filter Tabs */}
            <div className="w-full max-w-full overflow-x-auto pb-1 scrollbar-none flex items-center">
              <Tabs
                tabs={categories}
                activeTab={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          </div>

          {/* Property Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/projects">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="size-4" />}>
                View All {projectsData.length} Plotted Schemes & Full Catalog
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 04. Cadastral & Site Gallery */}
      <section id="gallery" className="py-14 sm:py-18 bg-[#F8FAFC]/80 dark:bg-[#0B101E]/60 border-t border-[#E2E8F0] dark:border-[#1F2937] transition-colors">
        <Container size="xl">
          <SectionTitle
            number="04"
            badge="ON-SITE VISUALS"
            title="Real-world infrastructure &"
            highlight="scenic valley views"
            description="High-resolution aerial perspectives, wide blacktopped access roads, stone demarcations, and lush natural environments."
          />

          <Gallery />
        </Container>
      </section>

      {/* 05. Core Land & Advisory Services */}
      <section id="skills" className="py-14 sm:py-18 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#090D16] transition-colors">
        <Container size="xl">
          <SectionTitle
            number="05"
            badge="COMPREHENSIVE SERVICES"
            title="End-to-end real estate &"
            highlight="land development solutions"
            description="From cadastral map surveys and town planning approvals to legal title transfers and infrastructure construction."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.slice(0, 3).map((group, index) => (
              <SkillCard
                key={group.category}
                skillGroup={group}
                number={`0${index + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/skills">
              <Button variant="secondary" size="md" rightIcon={<ArrowRight className="size-4" />}>
                Explore All {skillsData.length} Land Advisory & Planning Services
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 06. Official Licenses & Accreditations */}
      <section id="certifications" className="py-14 sm:py-18 bg-[#F8FAFC]/80 dark:bg-[#0B101E]/60 border-t border-[#E2E8F0] dark:border-[#1F2937] transition-colors">
        <Container size="xl">
          <SectionTitle
            number="06"
            badge="GOVERNMENT ACCREDITATIONS"
            title="Verified statutory licenses &"
            highlight="compliance credentials"
            description="Operating with strict adherence to Nepal's Land Revenue acts, Department of Survey guidelines, and municipal town planning codes."
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

                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-2 leading-relaxed">
                    {cert.topics}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                  <Link to="/about">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-mono font-medium text-[#15803D] dark:text-[#4ADE80] p-0 h-auto"
                      rightIcon={<ArrowRight className="size-3" />}
                    >
                      Compliance Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 07. Verified Client Testimonials */}
      <section id="testimonials" className="py-14 sm:py-18 border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#090D16] transition-colors">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <SectionTitle
              number="07"
              badge="CLIENT VOICES"
              title="Endorsements from verified"
              highlight="homeowners & land buyers"
              description="Direct reviews from families who built their homes, commercial contractors, and overseas investors who trust Mt. Everest Real-Estate."
              className="mb-0"
            />

            <Link to="/testimonials">
              <Button
                variant="secondary"
                size="md"
                rightIcon={<ArrowRight className="size-4" />}
                className="whitespace-nowrap rounded-[6px]"
              >
                View All Reviews
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonialsData.slice(0, 3).map((item) => (
              <Card
                key={item.id}
                hoverEffect
                className="p-5 sm:p-6 bg-white dark:bg-[#111827] flex flex-col justify-between border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs hover:border-[#15803D]/50 transition-all duration-200"
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
                    <p className="text-xs sm:text-sm text-[#334155] dark:text-[#D1D5DB] leading-relaxed relative z-10 italic line-clamp-4">
                      "{item.quote}"
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#15803D] dark:bg-[#22C55E] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {item.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-sm text-[#0F172A] dark:text-[#F8FAFC] truncate">
                        {item.prefix ? `${item.prefix} ` : ''}{item.name}
                      </h4>
                      <p className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] truncate">
                        {item.role}
                      </p>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] truncate">
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
        </Container>
      </section>

      {/* 08. Schedule a Site Visit / Contact Section */}
      <section id="contact" className="py-14 sm:py-18 bg-[#F8FAFC]/80 dark:bg-[#0B101E]/60 border-t border-[#E2E8F0] dark:border-[#1F2937] transition-colors">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left info column */}
            <div className="lg:col-span-5 space-y-5">
              <SectionTitle
                number="08"
                badge="SITE VISIT & INQUIRIES"
                title="Schedule your free"
                highlight="guided site inspection"
                description="We provide complimentary pickup and site counseling every Saturday, as well as on-demand weekday appointments across Kathmandu Valley."
              />

              <div className="space-y-3">
                <Card className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs flex items-center gap-3.5">
                  <Badge
                    variant="primary"
                    size="md"
                    className="w-9 h-9 rounded-[6px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0] dark:border-[#14532D]"
                  >
                    <PhoneIcon className="size-4.5 text-[#15803D] dark:text-[#4ADE80]" />
                  </Badge>
                  <div>
                    <p className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Call for Instant Booking</p>
                    <a
                      href={`tel:${personalData.phone.split(' / ')[0].replace(/[^0-9]/g, '')}`}
                      className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors"
                    >
                      {personalData.phone}
                    </a>
                  </div>
                </Card>

                <Card className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs flex items-center gap-3.5">
                  <Badge
                    variant="primary"
                    size="md"
                    className="w-9 h-9 rounded-[6px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0] dark:border-[#14532D]"
                  >
                    <MapPin className="size-4.5 text-[#15803D] dark:text-[#4ADE80]" />
                  </Badge>
                  <div>
                    <p className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Corporate Office</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                      {personalData.location}
                    </p>
                  </div>
                </Card>

                <Card className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs flex items-center gap-3.5">
                  <Badge
                    variant="secondary"
                    size="md"
                    className="w-9 h-9 rounded-[6px] p-0 flex items-center justify-center shrink-0 font-mono font-bold text-xs dark:bg-[#1E293B]"
                  >
                    SAT
                  </Badge>
                  <div>
                    <p className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">Weekly Free Tour</p>
                    <p className="text-xs font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                      Free group van departure from New Baneshwor every Saturday at 10:00 AM
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right booking form column */}
            <div className="lg:col-span-7">
              <Card className="p-5 sm:p-7 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
                <h3 className="font-heading text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  Book Site Inspection or Inquire
                </h3>

                <form onSubmit={handleContactSubmit} className="mt-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Full Name *"
                      placeholder="e.g. Ramesh Sharma"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                    />
                    <InputField
                      label="Phone / Mobile Number *"
                      placeholder="e.g. 98510XXXXX"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label={language === 'ne' ? 'इमेल ठेगाना (ऐच्छिक)' : 'Email Address (Optional)'}
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />

                    <div>
                      <Select
                        label={t.common.selectScheme}
                        value={preferredPlot}
                        onChange={setPreferredPlot}
                        options={plotOptions}
                      />
                    </div>
                  </div>

                  <CustomDatePicker
                    label={t.common.preferredDate}
                    value={visitDate}
                    onChange={setVisitDate}
                    placeholder="YYYY-MM-DD"
                    helperText={language === 'ne' ? 'स्थलगत भ्रमणका लागि इच्छुक मिति छान्नुहोस्' : 'Select a date for free vehicle site inspection'}
                  />

                  <TextareaField
                    label="Land Budget & Specific Requirements *"
                    rows={3}
                    placeholder="e.g. Looking for a 3 to 4 Aana south-facing plot with 20ft road access for residential construction within 6 months..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                  />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      rightIcon={<ArrowRight className="size-4" />}
                    >
                      Confirm Site Visit Request
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Property Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

export default HomePage
