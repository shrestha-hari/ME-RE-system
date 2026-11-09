import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { ArrowRight, ShieldCheck, CheckCircle2 } from '@/assets/icons'
import { personalData } from '@/data'
import { useTranslation } from '@/i18n'
import { cn, getAssetUrl } from '@/utils'

export interface HeroProps {
  className?: string
  onContactClick?: () => void
}

export const Hero: React.FC<HeroProps> = ({
  className = '',
  onContactClick,
}) => {
  const [selectedLocation, setSelectedLocation] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const { t, language } = useTranslation()

  const handleSearch = () => {
    const el = document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const locationOptions = [
    { value: 'All', label: t.hero.allLocations },
    {
      value: 'Lalitpur',
      label: language === 'ne' ? 'ललितपुर (लुभु / लामाटार)' : 'Lalitpur (Lubhu / Lamatar)',
    },
    {
      value: 'Bara',
      label: language === 'ne' ? 'बारा (कोल्हवी मुख्य सडक)' : 'Bara (Kolhabi Highway Belt)',
    },
    {
      value: 'Chitwan',
      label: language === 'ne' ? 'चितवन (माडी / मेघौली)' : 'Chitwan (Madi / Meghauli)',
    },
  ]

  const typeOptions = [
    { value: 'All', label: language === 'ne' ? 'सबै जग्गा प्रकार' : 'All Land Types' },
    { value: 'Residential', label: language === 'ne' ? 'आवासीय प्लटिङ घडेरी' : 'Residential Plotted Colony' },
    { value: 'Commercial', label: language === 'ne' ? 'व्यापारिक राजमार्ग प्लट' : 'Commercial Highway Plots' },
    { value: 'Villa', label: language === 'ne' ? 'लक्जरी भिल्ला प्लट' : 'Luxury Villa Land' },
    { value: 'Agro', label: language === 'ne' ? 'कृषि तथा रिसोर्ट जग्गा' : 'Agro & Resort Land' },
  ]

  return (
    <section
      className={cn(
        'relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-22 bg-[#F8FAFC] dark:bg-[#090D16]',
        className
      )}
    >
      {/* Background Land Imagery & Subtle Gradient Blending */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Real Estate Land / Valley Landscape Image with Blending */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-20 dark:opacity-15"
          style={{
            backgroundImage: `url('${getAssetUrl('images/background.webp')}')`,
            filter: 'saturate(1.05) brightness(0.95)',
          }}
        />
        {/* Smooth Linear Gradient Masks for Text Legibility in Light & Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 to-[#F8FAFC]/60 dark:from-[#090D16] dark:via-[#090D16]/95 dark:to-[#090D16]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F8FAFC] dark:to-[#090D16]" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status / Accreditation Monospace Badge */}
            <Badge
              variant="primary"
              dot
              size="sm"
              className="mb-4 text-xs font-semibold rounded-[4px] px-2.5 py-1 border border-[#BBF7D0] dark:border-[#14532D] bg-[#DCFCE7] dark:bg-[#15803D]/25 text-[#15803D] dark:text-[#4ADE80]"
            >
              {t.hero.badge}
            </Badge>

            {/* H1 Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-[1.2] font-heading">
              {t.hero.titlePart1}{' '}
              <span className="text-[#15803D] dark:text-[#22C55E]">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.titlePart2}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="mt-3.5 text-sm sm:text-base text-[#334155] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
              {t.hero.description}
            </p>

            {/* Quick Property Search Filter Bar */}
            <div className="mt-6 w-full max-w-2xl p-4 rounded-[8px] bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div>
                  <Select
                    label={t.hero.locationLabel}
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    options={locationOptions}
                  />
                </div>

                <div>
                  <Select
                    label={language === 'ne' ? 'जग्गा प्रकार' : 'Property Type'}
                    value={selectedType}
                    onChange={setSelectedType}
                    options={typeOptions}
                  />
                </div>

                <div>
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full justify-center h-10 text-xs sm:text-sm font-semibold rounded-[6px]"
                    onClick={handleSearch}
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    {t.hero.searchBtn}
                  </Button>
                </div>
              </div>
            </div>

            {/* Metrics Quick Strip */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl py-3.5 border-y border-[#E2E8F0] dark:border-[#1F2937]">
              {personalData.stats.map((stat, idx) => {
                const localizedLabels = [t.hero.statYears, t.hero.statSold, t.hero.statSchemes, t.hero.statApproved]
                return (
                  <div key={stat.label} className="space-y-0.5">
                    <div className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                      {localizedLabels[idx] || stat.label}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="size-4" />}
                onClick={() => {
                  const el = document.getElementById('projects')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {t.hero.explorePlots}
              </Button>

              <Link to="/utilities">
                <Button variant="secondary" size="md">
                  {t.calculator.title}
                </Button>
              </Link>

              {onContactClick ? (
                <Button variant="ghost" size="md" onClick={onContactClick}>
                  {t.hero.bookVisit}
                </Button>
              ) : (
                <Link to="/contact">
                  <Button variant="ghost" size="md">
                    {t.hero.bookVisit}
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="size-4 text-[#15803D] dark:text-[#4ADE80]" />
                {language === 'ne' ? 'सिमाना विवाद रहित जग्गा' : 'Zero Boundary Dispute'}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-[#15803D] dark:text-[#4ADE80]" />
                {language === 'ne' ? 'नापी टोटल स्टेशनद्वारा कित्ताकाट' : 'Napi Total Station Demarcated'}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="size-4 text-[#15803D] dark:text-[#4ADE80]" />
                {language === 'ne' ? 'तत्काल बैंकिङ कर्जा सुविधा' : 'Immediate Bank Financing'}
              </span>
            </div>
          </div>

          {/* Featured Land Spotlight Card Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <Card className="relative w-full max-w-md bg-white dark:bg-[#111827] p-5 rounded-[8px] border border-[#E2E8F0] dark:border-[#1F2937] shadow-xs">
              {/* Plot Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[6px] overflow-hidden bg-[#F1F5F9] dark:bg-[#1E293B] border border-[#E2E8F0] dark:border-[#1F2937]">
                <img
                  src={getAssetUrl('images/projects/lubhu.webp')}
                  alt="Lubhu Residential Plotted Colony"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#15803D] text-white text-[11px] font-semibold tracking-wide">
                    {language === 'ne' ? 'विशेष योजना' : 'FEATURED SCHEME'}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-[4px] bg-[#0F172A]/85 text-white text-xs font-medium">
                    Lubhu, Lalitpur
                  </span>
                </div>
              </div>

              {/* Plot Headline & Details */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#15803D] dark:text-[#4ADE80]">
                    {language === 'ne' ? 'आवासीय प्लटिङ' : 'Residential Scheme'}
                  </span>
                  <span className="text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {language === 'ne' ? 'रु २२ लाख / आना' : 'NPR 22 Lakh / Aana'}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
                  {language === 'ne' ? 'लुभु आवासीय प्लटिङ योजना' : 'Lubhu Residential Plotted Colony'}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 leading-relaxed">
                  {language === 'ne'
                    ? 'शान्त वातावरण, २० फिट फराकिलो बाटो, बिजुली र पानी सुविधासहित तत्काल नामसारी हुने लालपुर्जा।'
                    : 'Peaceful residential plots with 20ft road access, electricity, and verified Lalpurja ready for transfer.'}
                </p>
              </div>

              {/* Spec Highlights Grid */}
              <div className="mt-3.5 grid grid-cols-3 gap-2 py-2.5 border-y border-[#E2E8F0] dark:border-[#1F2937] text-center">
                <div className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-[4px] p-2">
                  <div className="text-[10px] uppercase text-[#64748B] dark:text-[#94A3B8]">
                    {language === 'ne' ? 'क्षेत्रफल' : 'Plot Sizes'}
                  </div>
                  <div className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                    {language === 'ne' ? '३ - ८ आना' : '3 - 8 Aana'}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-[4px] p-2">
                  <div className="text-[10px] uppercase text-[#64748B] dark:text-[#94A3B8]">
                    {language === 'ne' ? 'बाटो' : 'Road Access'}
                  </div>
                  <div className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                    {language === 'ne' ? '२२ फिट पिच' : '22ft Pitch'}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] dark:bg-[#1E293B] rounded-[4px] p-2">
                  <div className="text-[10px] uppercase text-[#64748B] dark:text-[#94A3B8]">
                    {language === 'ne' ? 'मोहडा' : 'Facing'}
                  </div>
                  <div className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mt-0.5">
                    {language === 'ne' ? 'पूर्व / दक्षिण' : 'East / South'}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs text-[#15803D] dark:text-[#4ADE80] font-medium">
                  <CheckCircle2 className="size-4" />
                  <span>{language === 'ne' ? 'व्यक्तिगत लालपुर्जा तयार' : 'Individual Lalpurja Ready'}</span>
                </div>
                <Link to="/contact">
                  <Button variant="primary" size="sm" className="text-xs h-8 px-3 rounded-[6px]">
                    {language === 'ne' ? 'घडेरी बुकिङ' : 'Inquire Plot'}
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
