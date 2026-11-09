import { useState, useMemo } from 'react'
import { Container } from '@/components/Container'
import { SectionTitle } from '@/components/SectionTitle'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'
import { Button } from '@/components/Button'
import { InputField, TextareaField } from '@/components/Input'
import { Select } from '@/components/Select'
import { CustomDatePicker } from '@/components/CustomDatePicker'
import { Seo } from '@/components/Seo'
import { PopMessage } from '@/utils'
import { useTranslation } from '@/i18n'
import {
  MailIcon,
  ArrowRight,
  PhoneIcon,
  MapPin,
  Clock,
  ShieldCheck,
} from '@/assets/icons'
import { personalData } from '@/data'
import { SITE_CONFIG } from '@/utils'

export const ContactPage: React.FC = () => {
  const { t, language } = useTranslation()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [preferredPlot, setPreferredPlot] = useState('Everest Green Valley Plots (Godawari)')
  const [visitDate, setVisitDate] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const plotOptions = useMemo(
    () => [
      {
        value: 'Everest Green Valley Plots (Godawari)',
        label: language === 'ne' ? 'एभरेष्ट ग्रीन भ्याली (गोदावरी, ललितपुर)' : 'Everest Green Valley (Godawari)',
      },
      {
        value: 'Himalayan Heights Enclave (Budhanilkantha)',
        label: language === 'ne' ? 'हिमालयन हाइट्स (बुढानीलकण्ठ, काठमाडौं)' : 'Himalayan Heights (Budhanilkantha)',
      },
      {
        value: 'Heritage Commercial Gateway (Bhaktapur)',
        label: language === 'ne' ? 'हेरिटेज कमर्सियल (सल्लाघारी, भक्तपुर)' : 'Heritage Commercial (Bhaktapur)',
      },
      {
        value: 'Chandragiri Pine Vista (Matatirtha)',
        label: language === 'ne' ? 'चन्द्रागिरि पाइन भिस्टा (मातातीर्थ, काठमाडौं)' : 'Chandragiri Pine Vista (Matatirtha)',
      },
      {
        value: 'Lakeview Orchard Estates (Pokhara)',
        label: language === 'ne' ? 'लेकभ्यू अर्चर्ड (पामे, पोखरा)' : 'Lakeview Orchard (Pokhara)',
      },
      {
        value: 'Trishuli Riverfront Haven (Chitwan)',
        label: language === 'ne' ? 'त्रिशूली रिभरफ्रन्ट (कुरिनटार / चितवन)' : 'Trishuli Riverfront (Chitwan)',
      },
      {
        value: 'General Land Purchase / Selling Advisory',
        label: language === 'ne' ? 'अन्य / सामान्य जग्गा खरिद-बिक्री परामर्श' : 'General Land Advisory / Joint Venture',
      },
    ],
    [language]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim() || !message.trim()) {
      PopMessage.error(language === 'ne' ? 'कृपया आफ्नो नाम, फोन नम्बर र आवश्यकताहरू खुलाउनुहोस्।' : 'Please complete your name, phone number, and land requirements.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      PopMessage.success(t.common.siteVisitSuccess)
      setName('')
      setPhone('')
      setEmail('')
      setVisitDate('')
      setMessage('')
    }, 600)
  }

  return (
    <div className="w-full flex-1 py-10 sm:py-14 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <Seo
        title="Contact & Site Visit Booking | Mt. Everest Real-Estate"
        description="Book a free site inspection or consult our land advisors for plotted residential, commercial, or agricultural land in Nepal."
        url={`${SITE_CONFIG.url}/contact`}
      />
      <Container size="xl">
        <SectionTitle
          number="07"
          badge="CONSULTATION & SITE VISITS"
          title="Schedule your free site inspection or"
          highlight="speak to a land advisor"
          description="Visit our office in New Baneshwor, Kathmandu, or book our free weekend site tour van to inspect prime plotted lands in person."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coordinates Column */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs space-y-4">
              <h3 className="font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                Office Coordinates
              </h3>

              <div className="flex items-center gap-3">
                <Badge
                  variant="primary"
                  size="md"
                  className="w-9 h-9 rounded-[6px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0] dark:border-[#14532D]"
                >
                  <PhoneIcon className="size-4.5 text-[#15803D] dark:text-[#4ADE80]" />
                </Badge>
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">Direct Hotline</p>
                  <a
                    href="tel:+977014498221"
                    className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors"
                  >
                    {personalData.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                <Badge
                  variant="primary"
                  size="md"
                  className="w-9 h-9 rounded-[6px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0] dark:border-[#14532D]"
                >
                  <MailIcon className="size-4.5 text-[#15803D] dark:text-[#4ADE80]" />
                </Badge>
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">Inquiries Email</p>
                  <a
                    href={`mailto:${personalData.email}`}
                    className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] hover:text-[#15803D] dark:hover:text-[#4ADE80] transition-colors"
                  >
                    {personalData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-[#E2E8F0] dark:border-[#1F2937]">
                <Badge
                  variant="primary"
                  size="md"
                  className="w-9 h-9 rounded-[6px] p-0 flex items-center justify-center shrink-0 border-[#BBF7D0] dark:border-[#14532D]"
                >
                  <MapPin className="size-4.5 text-[#15803D] dark:text-[#4ADE80]" />
                </Badge>
                <div>
                  <p className="text-[11px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8]">Corporate Location</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    {personalData.location}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
              <div className="flex items-center gap-2 mb-2.5">
                <Clock className="size-4 text-[#15803D] dark:text-[#4ADE80]" />
                <h4 className="font-heading text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Operating Schedule & Free Tours
                </h4>
              </div>
              <div className="space-y-2 text-xs text-[#334155] dark:text-[#94A3B8] leading-relaxed">
                <p>
                  <strong>Office Working Days:</strong> Sunday – Friday (9:00 AM – 6:00 PM)
                </p>
                <p>
                  <strong>Saturday Site Visits:</strong> Guided group tours departing from New Baneshwor at 10:00 AM. Free transport, boundary walkthrough, and legal paper inspection provided.
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[#15803D] dark:text-[#4ADE80] font-semibold">
                  <ShieldCheck className="size-4" />
                  <span>Zero Obligation · Free Consultation</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Booking Form Column */}
          <div className="lg:col-span-7">
            <Card className="p-5 sm:p-7 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
              <h3 className="font-heading text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] pb-3 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                Book Site Inspection / Land Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Your Name *"
                    placeholder="e.g. Shyam Sundar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <InputField
                    label="Phone Number *"
                    placeholder="e.g. 98412XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label={language === 'ne' ? 'इमेल ठेगाना (ऐच्छिक)' : 'Email Address (Optional)'}
                    type="email"
                    placeholder="shyam@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  helperText={language === 'ne' ? 'निःशुल्क गाडी भ्रमणको लागि इच्छुक मिति' : 'Preferred date for complimentary site inspection'}
                />

                <TextareaField
                  label={language === 'ne' ? 'जग्गाको बजेट र विशेष आवश्यकताहरू *' : 'Plot Budget & Requirements *'}
                  rows={4}
                  placeholder={
                    language === 'ne'
                      ? 'उदा: पूर्व वा दक्षिण मोहडा, २० फिट बाटो भएको ३-४ आनाको घडेरी चाहिएको छ...'
                      : 'e.g. Interested in 4 Aana residential plot facing East or South with road width 20ft+, budget NPR 30-35 Lakh per Aana...'
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    rightIcon={<ArrowRight className="size-4" />}
                  >
                    {t.common.submitVisit || 'Confirm Site Inspection Request'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ContactPage
