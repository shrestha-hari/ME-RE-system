import { useState, useMemo } from 'react'
import {
  Container,
  Card,
  Button,
  Badge,
  InputField,
  Select,
  Switch,
  Seo,
} from '@/components'
import { RotateCcw, ShieldCheck } from '@/assets/icons'
import { SITE_CONFIG } from '@/utils'
import { useTranslation } from '@/i18n'

// Conversion Constants (Standard Government of Nepal Cadastral Standards)
const SQFT_PER_ROPANI = 5476
const SQFT_PER_AANA = 342.25
const SQFT_PER_PAISA = 85.5625
const SQFT_PER_DAAM = 21.390625

const SQFT_PER_BIGHA = 72900
const SQFT_PER_KATHA = 3645
const SQFT_PER_DHUR = 182.25

const SQM_PER_SQFT = 0.092903

export const UtilitiesPage: React.FC = () => {
  const { t, language } = useTranslation()
  const [activeTab, setActiveTab] = useState<'converter' | 'emi' | 'registration'>('converter')

  // Land Unit Converter State
  // Mode: 'ropani' | 'bigha' | 'sqft'
  const [inputMode, setInputMode] = useState<'ropani' | 'bigha' | 'sqft'>('ropani')

  // Ropani inputs
  const [ropani, setRopani] = useState<string>('0')
  const [aana, setAana] = useState<string>('4')
  const [paisa, setPaisa] = useState<string>('2')
  const [daam, setDaam] = useState<string>('0')

  // Bigha inputs
  const [bigha, setBigha] = useState<string>('0')
  const [katha, setKatha] = useState<string>('0')
  const [dhur, setDhur] = useState<string>('0')

  // Square feet input
  const [sqft, setSqft] = useState<string>('1540')

  // Loan EMI State
  const [loanAmount, setLoanAmount] = useState<string>('5000000') // 50 Lakhs
  const [interestRate, setInterestRate] = useState<string>('9.5') // 9.5%
  const [loanTenureYears, setLoanTenureYears] = useState<string>('15') // 15 years

  // Registration Fee Estimator State
  const [propertyPrice, setPropertyPrice] = useState<string>('8000000') // 80 Lakhs
  const [regionType, setRegionType] = useState<'metropolitan' | 'sub_metropolitan' | 'municipality' | 'rural'>('metropolitan')
  const [genderDiscount, setGenderDiscount] = useState<boolean>(false) // Female ownership 25% discount in Nepal

  const municipalityOptions = useMemo(
    () => [
      {
        value: 'metropolitan',
        label:
          language === 'ne'
            ? 'महानगरपालिका (काठमाडौं, ललितपुर): ५.०%'
            : 'Metropolitan City (Kathmandu, Lalitpur): 5.0%',
      },
      {
        value: 'sub_metropolitan',
        label:
          language === 'ne'
            ? 'उप-महानगरपालिका (भक्तपुर, चितवन): ४.५%'
            : 'Sub-Metropolitan (Bhaktapur, Chitwan): 4.5%',
      },
      {
        value: 'municipality',
        label: language === 'ne' ? 'नगरपालिका: ४.०%' : 'Municipality (Nagarpalika): 4.0%',
      },
      {
        value: 'rural',
        label: language === 'ne' ? 'गाउँपालिका: २.०%' : 'Rural Municipality (Gaunpalika): 2.0%',
      },
    ],
    [language]
  )

  // Calculate Total Square Feet based on Active Input Mode
  const totalSqft = useMemo(() => {
    if (inputMode === 'ropani') {
      const r = parseFloat(ropani) || 0
      const a = parseFloat(aana) || 0
      const p = parseFloat(paisa) || 0
      const d = parseFloat(daam) || 0
      return (
        r * SQFT_PER_ROPANI +
        a * SQFT_PER_AANA +
        p * SQFT_PER_PAISA +
        d * SQFT_PER_DAAM
      )
    } else if (inputMode === 'bigha') {
      const b = parseFloat(bigha) || 0
      const k = parseFloat(katha) || 0
      const dh = parseFloat(dhur) || 0
      return (
        b * SQFT_PER_BIGHA +
        k * SQFT_PER_KATHA +
        dh * SQFT_PER_DHUR
      )
    } else {
      return parseFloat(sqft) || 0
    }
  }, [inputMode, ropani, aana, paisa, daam, bigha, katha, dhur, sqft])

  // Computed Conversions
  const conversions = useMemo(() => {
    const s = Math.max(0, totalSqft)
    const sqm = s * SQM_PER_SQFT

    // Breakdown into Ropani-Aana-Paisa-Daam
    let remSqft = s
    const calcRopani = Math.floor(remSqft / SQFT_PER_ROPANI)
    remSqft %= SQFT_PER_ROPANI
    const calcAana = Math.floor(remSqft / SQFT_PER_AANA)
    remSqft %= SQFT_PER_AANA
    const calcPaisa = Math.floor(remSqft / SQFT_PER_PAISA)
    remSqft %= SQFT_PER_PAISA
    const calcDaam = (remSqft / SQFT_PER_DAAM).toFixed(2)

    // Breakdown into Bigha-Katha-Dhur
    let remBighaSqft = s
    const calcBigha = Math.floor(remBighaSqft / SQFT_PER_BIGHA)
    remBighaSqft %= SQFT_PER_BIGHA
    const calcKatha = Math.floor(remBighaSqft / SQFT_PER_KATHA)
    remBighaSqft %= SQFT_PER_KATHA
    const calcDhur = (remBighaSqft / SQFT_PER_DHUR).toFixed(2)

    return {
      sqft: s.toFixed(2),
      sqm: sqm.toFixed(2),
      ropaniStr: `${calcRopani} Ropani - ${calcAana} Aana - ${calcPaisa} Paisa - ${calcDaam} Daam`,
      bighaStr: `${calcBigha} Bigha - ${calcKatha} Katha - ${calcDhur} Dhur`,
      totalAana: (s / SQFT_PER_AANA).toFixed(2),
      totalKatha: (s / SQFT_PER_KATHA).toFixed(2),
    }
  }, [totalSqft])

  // EMI Calculations
  const emiCalculation = useMemo(() => {
    const P = parseFloat(loanAmount) || 0
    const annualRate = parseFloat(interestRate) || 0
    const years = parseFloat(loanTenureYears) || 0

    if (P <= 0 || annualRate <= 0 || years <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0 }
    }

    const r = annualRate / 12 / 100
    const n = years * 12
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = emi * n
    const totalInterest = totalPayment - P

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    }
  }, [loanAmount, interestRate, loanTenureYears])

  // Registration Tax Estimation (Based on Nepal Malpot standard rates)
  const registrationCalculation = useMemo(() => {
    const price = parseFloat(propertyPrice) || 0
    if (price <= 0) return { fee: 0, femaleDiscount: 0, netFee: 0, serviceFee: 0, total: 0 }

    // Rates in Nepal:
    // Metropolitan: 5% (Kathmandu/Lalitpur), Sub-Metro: 4.5%, Municipality: 4%, Rural: 2%
    let rate = 0.05
    if (regionType === 'sub_metropolitan') rate = 0.045
    if (regionType === 'municipality') rate = 0.04
    if (regionType === 'rural') rate = 0.02

    const grossFee = price * rate
    const femaleDiscount = genderDiscount ? grossFee * 0.25 : 0 // 25% discount for female registration in Nepal
    const netFee = grossFee - femaleDiscount
    const serviceFee = 5000 // approx writing/documentation & revenue stamp fee

    return {
      ratePercent: (rate * 100).toFixed(1),
      fee: Math.round(grossFee),
      femaleDiscount: Math.round(femaleDiscount),
      netFee: Math.round(netFee),
      serviceFee,
      total: Math.round(netFee + serviceFee),
    }
  }, [propertyPrice, regionType, genderDiscount])

  const formatNpr = (val: number) => {
    return new Intl.NumberFormat('en-IN').format(val)
  }

  return (
    <div className="w-full flex-1 py-10 sm:py-14 bg-[#F8FAFC] dark:bg-[#090D16] transition-colors">
      <Seo
        title="Nepal Land Unit Converter & EMI Calculator | Mt. Everest Real-Estate"
        description="Calculate Ropani-Aana-Paisa-Daam to Bigha-Katha-Dhur and Square Feet. Estimate home loan EMI and land registration fees in Nepal."
        url={`${SITE_CONFIG.url}/utilities`}
      />

      <Container size="xl">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <Badge variant="primary" size="sm" className="mb-2.5 font-mono text-xs font-semibold rounded-[4px] px-2 py-0.5">
            {t.calculator.badge}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight font-heading">
            {language === 'ne' ? (
              <>
                जग्गा एकाइ रूपान्तरण तथा{' '}
                <span className="text-[#15803D] dark:text-[#22C55E]">
                  वित्तीय क्याल्कुलेटर
                </span>
              </>
            ) : (
              <>
                Land Unit Converter &{' '}
                <span className="text-[#15803D] dark:text-[#22C55E]">
                  Loan EMI Calculator
                </span>
              </>
            )}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#334155] dark:text-[#94A3B8] leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#E2E8F0] dark:border-[#1F2937] pb-3">
          <Button
            variant={activeTab === 'converter' ? 'primary' : 'secondary'}
            size="sm"
            className="rounded-[6px] h-8.5 px-3.5 text-xs font-semibold"
            onClick={() => setActiveTab('converter')}
          >
            {language === 'ne' ? 'जग्गा एकाइ रूपान्तरण' : 'Nepal Land Unit Converter'}
          </Button>
          <Button
            variant={activeTab === 'emi' ? 'primary' : 'secondary'}
            size="sm"
            className="rounded-[6px] h-8.5 px-3.5 text-xs font-semibold"
            onClick={() => setActiveTab('emi')}
          >
            {language === 'ne' ? 'बैंकिङ किस्ता (EMI)' : 'Home / Land Loan EMI'}
          </Button>
          <Button
            variant={activeTab === 'registration' ? 'primary' : 'secondary'}
            size="sm"
            className="rounded-[6px] h-8.5 px-3.5 text-xs font-semibold"
            onClick={() => setActiveTab('registration')}
          >
            {language === 'ne' ? 'मालपोत राजस्व दस्तुर' : 'Malpot Registration Estimator'}
          </Button>
        </div>

        {/* TAB 1: LAND UNIT CONVERTER */}
        {activeTab === 'converter' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] rounded-[8px] shadow-xs">
                <div className="flex items-center justify-between pb-3.5 border-b border-[#E2E8F0] dark:border-[#1F2937]">
                  <h3 className="font-heading text-base font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                    {language === 'ne' ? 'जग्गाको नाप प्रविष्ट गर्नुहोस्' : 'Input Land Area'}
                  </h3>
                  <div className="flex items-center gap-1 bg-[#F1F5F9] dark:bg-[#1E293B] p-0.5 rounded-[6px]">
                    <Button
                      variant={inputMode === 'ropani' ? 'primary' : 'ghost'}
                      size="sm"
                      className="h-7 px-2.5 text-xs font-semibold rounded-[4px]"
                      onClick={() => setInputMode('ropani')}
                    >
                      {language === 'ne' ? 'पहाडी (रोपनी)' : 'Hilly (Ropani)'}
                    </Button>
                    <Button
                      variant={inputMode === 'bigha' ? 'primary' : 'ghost'}
                      size="sm"
                      className="h-7 px-2.5 text-xs font-semibold rounded-[4px]"
                      onClick={() => setInputMode('bigha')}
                    >
                      {language === 'ne' ? 'तराई (बिघा)' : 'Terai (Bigha)'}
                    </Button>
                    <Button
                      variant={inputMode === 'sqft' ? 'primary' : 'ghost'}
                      size="sm"
                      className="h-7 px-2.5 text-xs font-semibold rounded-[4px]"
                      onClick={() => setInputMode('sqft')}
                    >
                      {language === 'ne' ? 'वर्ग फिट' : 'Sq. Ft'}
                    </Button>
                  </div>
                </div>

                {/* Hilly Mode Inputs */}
                {inputMode === 'ropani' && (
                  <div className="mt-5 space-y-4">
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      Standard Kathmandu Valley & Hilly measurement system (1 Ropani = 16 Aana = 64 Paisa = 256 Daam).
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <InputField
                        label="Ropani"
                        type="number"
                        min="0"
                        value={ropani}
                        onChange={(e) => setRopani(e.target.value)}
                      />
                      <InputField
                        label="Aana"
                        type="number"
                        min="0"
                        max="15"
                        value={aana}
                        onChange={(e) => setAana(e.target.value)}
                      />
                      <InputField
                        label="Paisa"
                        type="number"
                        min="0"
                        max="3"
                        value={paisa}
                        onChange={(e) => setPaisa(e.target.value)}
                      />
                      <InputField
                        label="Daam"
                        type="number"
                        min="0"
                        max="3"
                        value={daam}
                        onChange={(e) => setDaam(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Terai Mode Inputs */}
                {inputMode === 'bigha' && (
                  <div className="mt-5 space-y-4">
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      Terai & Plain districts measurement system (1 Bigha = 20 Katha = 400 Dhur).
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <InputField
                        label="Bigha"
                        type="number"
                        min="0"
                        value={bigha}
                        onChange={(e) => setBigha(e.target.value)}
                      />
                      <InputField
                        label="Katha"
                        type="number"
                        min="0"
                        max="19"
                        value={katha}
                        onChange={(e) => setKatha(e.target.value)}
                      />
                      <InputField
                        label="Dhur"
                        type="number"
                        min="0"
                        max="19"
                        value={dhur}
                        onChange={(e) => setDhur(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Direct Square Feet Input */}
                {inputMode === 'sqft' && (
                  <div className="mt-5 space-y-4">
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                      Enter plot area directly in square feet to instantly convert into Ropani and Bigha.
                    </p>
                    <InputField
                      label="Square Feet (sq.ft)"
                      type="number"
                      min="0"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                    />
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<RotateCcw className="size-3.5" />}
                    onClick={() => {
                      setRopani('0')
                      setAana('4')
                      setPaisa('0')
                      setDaam('0')
                      setBigha('0')
                      setKatha('0')
                      setDhur('0')
                      setSqft('1369')
                    }}
                  >
                    Reset Defaults
                  </Button>
                  <span className="text-xs font-mono text-[#166534] dark:text-[#4ADE80] font-semibold">
                    1 Aana = 342.25 Sq. Ft
                  </span>
                </div>
              </Card>

              {/* Standard Quick Reference */}
              <Card className="p-5 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
                <h4 className="font-heading text-sm font-bold text-[#111827] dark:text-[#F9FAFB] mb-3">
                  Quick Standard Reference (Nepal Cadastral Law)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#4B5563] dark:text-[#9CA3AF]">
                  <div className="p-2 rounded bg-[#F5F7F6] dark:bg-[#1E293B]">
                    1 Ropani = 16 Aana (5,476 sq.ft)
                  </div>
                  <div className="p-2 rounded bg-[#F5F7F6] dark:bg-[#1E293B]">
                    1 Aana = 4 Paisa (342.25 sq.ft)
                  </div>
                  <div className="p-2 rounded bg-[#F5F7F6] dark:bg-[#1E293B]">
                    1 Bigha = 20 Katha (72,900 sq.ft)
                  </div>
                  <div className="p-2 rounded bg-[#F5F7F6] dark:bg-[#1E293B]">
                    1 Katha = 20 Dhur (3,645 sq.ft)
                  </div>
                </div>
              </Card>
            </div>

            {/* Real-Time Conversion Results Display */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
                <span className="text-xs font-mono uppercase text-[#166534] dark:text-[#4ADE80] font-bold">
                  CONVERTED RESULTS
                </span>
                <h3 className="font-heading text-xl font-bold text-[#111827] dark:text-[#F9FAFB] mt-1 pb-4 border-b border-[#E5E7EB] dark:border-[#1F2937]">
                  Equivalent Land Area
                </h3>

                <div className="mt-5 space-y-4">
                  {/* Hilly System Card */}
                  <div className="p-4 rounded-xl bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                      <span>KATHMANDU / HILLY SYSTEM</span>
                      <span className="font-semibold text-[#166534] dark:text-[#4ADE80]">
                        Total {conversions.totalAana} Aana
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#F9FAFB] font-heading mt-1">
                      {conversions.ropaniStr}
                    </div>
                  </div>

                  {/* Terai System Card */}
                  <div className="p-4 rounded-xl bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151]">
                    <div className="flex items-center justify-between text-xs text-[#6B7280] dark:text-[#9CA3AF] font-mono">
                      <span>TERAI SYSTEM</span>
                      <span className="font-semibold text-[#166534] dark:text-[#4ADE80]">
                        Total {conversions.totalKatha} Katha
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-[#111827] dark:text-[#F9FAFB] font-heading mt-1">
                      {conversions.bighaStr}
                    </div>
                  </div>

                  {/* Square Feet & Square Meters */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151]">
                      <span className="text-[11px] font-mono uppercase text-[#6B7280] dark:text-[#9CA3AF]">
                        Total Square Feet
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-[#F9FAFB] mt-1">
                        {conversions.sqft} <span className="text-xs font-normal">sq.ft</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#F5F7F6] dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-[#374151]">
                      <span className="text-[11px] font-mono uppercase text-[#6B7280] dark:text-[#9CA3AF]">
                        Square Meters
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#111827] dark:text-[#F9FAFB] mt-1">
                        {conversions.sqm} <span className="text-xs font-normal">sq.m</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#16A34A] dark:text-[#4ADE80]">
                    <ShieldCheck className="size-4" />
                    <span>Napi Cadastral Standard Certified</span>
                  </div>
                  <a href="#contact">
                    <Button variant="primary" size="sm">
                      Inquire Plot of this Size
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 2: LOAN EMI CALCULATOR */}
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
                <h3 className="font-heading text-lg font-bold text-[#111827] dark:text-[#F9FAFB] pb-4 border-b border-[#E5E7EB] dark:border-[#1F2937]">
                  Home & Land Financing Parameters
                </h3>

                <div className="mt-5 space-y-4">
                  <InputField
                    label="Loan Amount (NPR)"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    helperText="e.g. 5,000,000 for 50 Lakhs"
                  />

                  <InputField
                    label="Annual Interest Rate (%)"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    helperText="Commercial bank lending rates typically range from 8.5% to 11.5% in Nepal"
                  />

                  <InputField
                    label="Loan Tenure (Years)"
                    type="number"
                    min="1"
                    max="30"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(e.target.value)}
                    helperText="Standard home loan duration up to 20 or 25 years"
                  />
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#1F2937] text-xs text-[#6B7280] dark:text-[#9CA3AF]">
                  Mt. Everest Real-Estate has direct tie-ups with tier-1 commercial banks facilitating streamlined approvals.
                </div>
              </Card>
            </div>

            {/* EMI Results */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
                <span className="text-xs font-mono uppercase text-[#166534] dark:text-[#4ADE80] font-bold">
                  ESTIMATED MONTHLY INSTALLMENT
                </span>
                <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F9FAFB] font-heading">
                  NPR {formatNpr(emiCalculation.emi)} <span className="text-xs font-normal text-[#6B7280] dark:text-[#9CA3AF]">/ month</span>
                </div>

                <div className="mt-6 space-y-3 pt-6 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E5E7EB]/60 dark:border-[#1F2937]">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">Principal Loan Amount:</span>
                    <span className="font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      NPR {formatNpr(parseFloat(loanAmount) || 0)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E5E7EB]/60 dark:border-[#1F2937]">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">Total Interest Payable:</span>
                    <span className="font-semibold text-[#166534] dark:text-[#4ADE80]">
                      NPR {formatNpr(emiCalculation.totalInterest)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">Total Payment (Principal + Interest):</span>
                    <span className="font-bold text-[#111827] dark:text-[#F9FAFB]">
                      NPR {formatNpr(emiCalculation.totalPayment)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                  <a href="#contact">
                    <Button variant="primary" fullWidth size="md">
                      Get Pre-Approved Bank Loan Assistance
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* TAB 3: MALPOT REGISTRATION FEE ESTIMATOR */}
        {activeTab === 'registration' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-6">
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937]">
                <h3 className="font-heading text-lg font-bold text-[#111827] dark:text-[#F9FAFB] pb-4 border-b border-[#E5E7EB] dark:border-[#1F2937]">
                  Property Likhat Pass Parameters
                </h3>

                <div className="mt-5 space-y-4">
                  <InputField
                    label={language === 'ne' ? 'सरकारी / थैली मूल्य (ने.रु.)' : 'Government / Valuation Price (NPR)'}
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    helperText={
                      language === 'ne'
                        ? 'मालपोत कार्यालयको न्यूनतम मुल्यांकन दर वा लिखत थैली अंक'
                        : 'Government minimum valuation rate or transaction deed value'
                    }
                  />

                  <div>
                    <Select
                      label={language === 'ne' ? 'पालिकाको वर्गीकरण' : 'Municipality Category'}
                      value={regionType}
                      onChange={(val) => setRegionType(val as 'metropolitan' | 'sub_metropolitan' | 'municipality' | 'rural')}
                      options={municipalityOptions}
                    />
                  </div>

                  <div className="pt-2">
                    <Switch
                      checked={genderDiscount}
                      onCheckedChange={setGenderDiscount}
                      label={
                        language === 'ne'
                          ? 'महिला स्वामित्व छुट (२५% सरकारी छुट)'
                          : "Register in Female Family Member's Name (25% Subsidy)"
                      }
                      description={
                        language === 'ne'
                          ? 'नेपाल सरकारले महिलाको नाममा जग्गा पास गर्दा रजिस्ट्रेसन दस्तुरमा २५% छुट दिने व्यवस्था गरेको छ।'
                          : 'The Government of Nepal grants a 25% concession on land registration fees for women ownership in urban areas.'
                      }
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Estimated Fees Display */}
            <div className="lg:col-span-6 space-y-6">
              <Card className="p-6 sm:p-8 bg-white dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#1F2937] shadow-lg">
                <span className="text-xs font-mono uppercase text-[#166534] dark:text-[#4ADE80] font-bold">
                  GOVERNMENT MALPOT ESTIMATE
                </span>
                <div className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#111827] dark:text-[#F9FAFB] font-heading">
                  NPR {formatNpr(registrationCalculation.total)}
                </div>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] mt-1">
                  Estimated title transfer cost at Land Revenue Office.
                </p>

                <div className="mt-6 space-y-3 pt-6 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E5E7EB]/60 dark:border-[#1F2937]">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">Base Registration Fee ({registrationCalculation.ratePercent}%):</span>
                    <span className="font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      NPR {formatNpr(registrationCalculation.fee)}
                    </span>
                  </div>

                  {genderDiscount && (
                    <div className="flex items-center justify-between text-sm py-2 border-b border-[#E5E7EB]/60 dark:border-[#1F2937] text-[#16A34A] dark:text-[#4ADE80]">
                      <span>Female Ownership Rebate (25%):</span>
                      <span className="font-semibold">
                        - NPR {formatNpr(registrationCalculation.femaleDiscount)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm py-2 border-b border-[#E5E7EB]/60 dark:border-[#1F2937]">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">Deed Writing & Revenue Stamp Fee:</span>
                    <span className="font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      NPR {formatNpr(registrationCalculation.serviceFee)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2">
                    <span className="text-[#6B7280] dark:text-[#9CA3AF]">Net Land Registration Payable:</span>
                    <span className="font-bold text-lg text-[#166534] dark:text-[#4ADE80]">
                      NPR {formatNpr(registrationCalculation.total)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E5E7EB] dark:border-[#1F2937]">
                  <a href="#contact">
                    <Button variant="primary" fullWidth size="md">
                      Free Title Verification & Registry Guidance
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default UtilitiesPage
