import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { useUIStore } from '@/store'
import { useTranslation } from '@/i18n'
import { Menu, X, SunIcon, MoonIcon, MountainIcon, PhoneIcon } from '@/assets/icons'
import { cn } from '@/utils'

export interface NavbarProps {
  className?: string
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const location = useLocation()
  const { theme, toggleTheme, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const { t, language, toggleLanguage } = useTranslation()

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
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-[#E2E8F0] dark:border-[#1F2937] bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md transition-colors',
        className
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo / Brand Name */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5 group font-heading font-bold text-base sm:text-lg text-[#0F172A] dark:text-[#F8FAFC] shrink-0 whitespace-nowrap"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#15803D] text-white flex items-center justify-center shadow-xs shrink-0">
              <MountainIcon className="size-4.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="tracking-tight leading-tight group-hover:text-[#15803D] dark:group-hover:text-[#4ADE80] transition-colors">
                {t.brand.name}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] -mt-0.5">
                {language === 'ne' ? 'जग्गा तथा घडेरी प्लटिङ · नेपाल' : 'Land & Plotting · Nepal'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden below lg breakpoint to eliminate awkward multi-row wrapping */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center max-w-2xl">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-[6px] text-xs xl:text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'text-[#15803D] dark:text-[#4ADE80] bg-[#DCFCE7] dark:bg-[#15803D]/25 font-semibold'
                      : 'text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher Pill (EN | ने) */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Nepali"
              className="inline-flex items-center border border-[#CBD5E1] dark:border-[#374151] rounded-full p-0.5 text-xs font-mono font-bold bg-[#F8FAFC] dark:bg-[#1E293B] hover:border-[#15803D] dark:hover:border-[#22C55E] transition-colors cursor-pointer shrink-0"
              title={language === 'en' ? 'नेपालीमा हेर्नुहोस् (Switch to Nepali)' : 'Switch to English'}
            >
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full transition-all text-[11px] select-none',
                  language === 'en'
                    ? 'bg-[#15803D] text-white shadow-xs font-semibold'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
                )}
              >
                EN
              </span>
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full transition-all text-[11px] select-none',
                  language === 'ne'
                    ? 'bg-[#15803D] text-white shadow-xs font-semibold'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A]'
                )}
              >
                ने
              </span>
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-1.5 rounded-[6px] border border-[#E2E8F0] dark:border-[#374151] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors cursor-pointer shrink-0"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <SunIcon className="size-4 text-amber-400" />
              ) : (
                <MoonIcon className="size-4 text-slate-700" />
              )}
            </button>

            {/* Direct Phone / Contact Action */}
            <a
              href="tel:+9779851068067"
              className="hidden 2xl:flex items-center gap-1.5 text-xs font-semibold text-[#15803D] dark:text-[#4ADE80] px-2.5 py-1.5 rounded-[6px] hover:bg-[#DCFCE7]/60 dark:hover:bg-[#15803D]/20 transition-colors whitespace-nowrap"
            >
              <PhoneIcon className="size-3.5" />
              <span>9851068067</span>
            </a>

            {/* Main Action Button */}
            <Link to="/contact" className="hidden sm:inline-flex shrink-0">
              <Button
                variant="primary"
                size="sm"
                className="font-medium whitespace-nowrap h-[36px] px-3.5 text-xs"
              >
                {t.nav.bookVisit}
              </Button>
            </Link>

            {/* Hamburger Button for screens below lg */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="p-2 h-9 w-9 text-[#0F172A] dark:text-[#F8FAFC] rounded-[6px]"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] dark:border-[#1F2937] bg-white dark:bg-[#0F172A] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150 shadow-lg">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    'px-4 py-2.5 rounded-[6px] text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#DCFCE7] dark:bg-[#15803D]/30 text-[#15803D] dark:text-[#4ADE80] font-semibold'
                      : 'text-[#334155] dark:text-[#E2E8F0] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B]'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}

            <div className="pt-3 mt-2 border-t border-[#E2E8F0] dark:border-[#1F2937] flex flex-col gap-2.5">
              <div className="flex items-center justify-between px-2 py-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
                <span>{language === 'ne' ? 'भाषा (Language)' : 'Language'}</span>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#F1F5F9] dark:bg-[#1E293B] text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  {language === 'en' ? '🇳🇵 नेपाली (Devnagari)' : '🇬🇧 English'}
                </button>
              </div>

              <div className="flex items-center justify-between px-2 py-1 text-xs text-[#64748B] dark:text-[#94A3B8]">
                <span>{language === 'ne' ? 'रंग थिम (Theme)' : 'Theme Mode'}</span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#F1F5F9] dark:bg-[#1E293B] text-xs font-medium text-[#0F172A] dark:text-[#F8FAFC]"
                >
                  {theme === 'dark' ? <SunIcon className="size-3.5 text-amber-400" /> : <MoonIcon className="size-3.5 text-slate-700" />}
                  <span>{theme === 'dark' ? (language === 'ne' ? 'लाइट मोड' : 'Light Mode') : (language === 'ne' ? 'डार्क मोड' : 'Dark Mode')}</span>
                </button>
              </div>

              <Link to="/contact" onClick={closeMobileMenu} className="w-full">
                <Button fullWidth variant="primary" size="md">
                  {t.nav.bookVisit}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
