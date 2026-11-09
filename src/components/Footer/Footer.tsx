import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { SocialLinks } from '@/components/SocialLinks'
import { useScrollToTop } from '@/hooks'
import { useTranslation } from '@/i18n'
import { ChevronDown, MountainIcon, MapPin, PhoneIcon, MailIcon } from '@/assets/icons'
import { cn } from '@/utils'

export interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const { scrollToTop } = useScrollToTop(false)
  const { t, language } = useTranslation()

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.plots, href: '/projects' },
    { label: t.nav.services, href: '/skills' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.calculator, href: '/utilities' },
    { label: t.nav.reviews, href: '/testimonials' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <footer
      className={cn(
        'w-full border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#090D16] transition-colors mt-auto',
        className
      )}
    >
      <Container size="xl" className="py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#E2E8F0] dark:border-[#1F2937]">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-3">
            <Link
              to="/"
              className="flex items-center gap-2.5 font-heading text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#15803D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MountainIcon className="size-4 text-white" />
              </div>
              <span>{t.brand.name}</span>
            </Link>
            <p className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] max-w-md leading-relaxed">
              {t.footer.description}
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
                <span>{language === 'ne' ? 'सामाखुसी २६, काठमाडौं, नेपाल' : 'Samakhushi 26, Kathmandu, Nepal'}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="size-3.5 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
                <span>9851068067 / 9861080943 ({language === 'ne' ? 'सिधा सम्पर्क' : 'Direct Call / WhatsApp'})</span>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="size-3.5 text-[#15803D] dark:text-[#4ADE80] shrink-0" />
                <span>shresthah987@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] font-bold">
              {t.footer.quickLinks}
            </h4>
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Hours & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] font-bold">
              {language === 'ne' ? 'कार्यालय समय तथा सामाजिक संजाल' : 'Office Hours & Socials'}
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              {language === 'ne' ? (
                <>
                  आइतबार - शुक्रबार: बिहान ९:३० देखि साँझ ६:०० सम्म<br />
                  शनिबार: अवलोकन तथा परामर्श (अग्रिम सम्पर्क)
                </>
              ) : (
                <>
                  Sunday - Friday: 9:30 AM - 6:00 PM<br />
                  Saturday: Property Visits by Appointment
                </>
              )}
            </p>
            <div className="pt-2">
              <SocialLinks size="sm" />
            </div>
            <div className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="font-mono text-xs text-[#64748B] dark:text-[#94A3B8] hover:text-[#15803D] dark:hover:text-[#4ADE80] h-7 px-2"
                rightIcon={<ChevronDown className="size-3.5 rotate-180" />}
              >
                {language === 'ne' ? '[माथि जानुहोस्]' : '[BACK TO TOP]'}
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#94A3B8] dark:text-[#64748B] gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-center sm:justify-start">
            <p>© {new Date().getFullYear()} {t.brand.name}. {t.footer.rightsReserved}</p>
            <span aria-hidden="true" className="text-[#CBD5E1] dark:text-[#374151]">·</span>
            <span>{t.footer.companyRegistration}</span>
            <span aria-hidden="true" className="text-[#CBD5E1] dark:text-[#374151]">·</span>
            <span>{t.footer.reanMember}</span>
          </div>
          <p>{language === 'ne' ? 'ललितपुर (लुभु, लामाटार) · बारा (कोल्हवी) · चितवन (माडी, मेघौली) · काठमाडौं' : 'Lalitpur (Lubhu, Lamatar) · Bara (Kolhabi) · Chitwan (Madi, Meghauli) · Kathmandu'}</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
