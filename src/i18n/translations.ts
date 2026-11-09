export type Language = 'en' | 'ne'

export interface TranslationDictionary {
  // Navigation
  nav: {
    home: string
    plots: string
    services: string
    about: string
    calculator: string
    reviews: string
    contact: string
    bookVisit: string
    callUs: string
    hotline: string
  }
  // Brand
  brand: {
    name: string
    tagline: string
    established: string
  }
  // Hero
  hero: {
    badge: string
    titlePart1: string
    titleHighlight: string
    titlePart2: string
    description: string
    explorePlots: string
    bookVisit: string
    locationLabel: string
    allLocations: string
    budgetLabel: string
    anyBudget: string
    roadLabel: string
    anyRoad: string
    searchBtn: string
    statYears: string
    statSold: string
    statSchemes: string
    statApproved: string
    featuredPlot: string
    featuredTitle: string
    featuredDesc: string
    featuredMeta: string
    perAana: string
  }
  // Common terms & Buttons
  common: {
    viewDetails: string
    viewAllPlots: string
    bookNow: string
    downloadBrochure: string
    close: string
    submit: string
    cancel: string
    reset: string
    loading: string
    success: string
    error: string
    fullName: string
    emailAddress: string
    phoneNumber: string
    preferredDate: string
    selectScheme: string
    message: string
    readMore: string
    readLess: string
    statusAvailable: string
    statusReserved: string
    statusSold: string
    area: string
    roadAccess: string
    facing: string
    price: string
    totalPrice: string
    location: string
    features: string
    legalClearance: string
    siteVisitTitle: string
    siteVisitSubtitle: string
    siteVisitSuccess: string
    submitVisit: string
    allCategories: string
  }
  // Services
  services: {
    title: string
    subtitle: string
    badge: string
    landPlotting: string
    cadastralSurvey: string
    legalVetting: string
    infrastructure: string
    bankValuation: string
    roadAccessGov: string
  }
  // Calculator / Utilities
  calculator: {
    title: string
    subtitle: string
    badge: string
    landUnitConverter: string
    unitConverterDesc: string
    hillSystem: string
    teraiSystem: string
    ropani: string
    aana: string
    paisa: string
    daam: string
    bigha: string
    katha: string
    dhur: string
    sqft: string
    sqm: string
    loanCalculator: string
    loanDesc: string
    propertyValue: string
    downPayment: string
    interestRate: string
    loanTenure: string
    years: string
    monthlyEmi: string
    totalInterest: string
    totalPayment: string
    taxCalculator: string
    taxDesc: string
    locationType: string
    metro: string
    subMetro: string
    muni: string
    rural: string
    femaleDiscount: string
    registrationFee: string
    effectiveRate: string
  }
  // About
  about: {
    title: string
    subtitle: string
    badge: string
    storyTitle: string
    storyP1: string
    storyP2: string
    valuesTitle: string
    milestonesTitle: string
    licensesTitle: string
  }
  // Contact
  contact: {
    title: string
    subtitle: string
    badge: string
    headOffice: string
    officeAddress: string
    hotline: string
    email: string
    officeHours: string
    officeHoursVal: string
    sendInquiry: string
    inquirySuccess: string
  }
  // Footer
  footer: {
    description: string
    quickLinks: string
    servicesLinks: string
    legalNotice: string
    rightsReserved: string
    companyRegistration: string
    reanMember: string
  }
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Home',
      plots: 'Properties',
      services: 'Services',
      about: 'About',
      calculator: 'Calculator',
      reviews: 'Reviews',
      contact: 'Contact',
      bookVisit: 'Book Visit',
      callUs: 'Call Us',
      hotline: 'Hotline',
    },
    brand: {
      name: 'Mt. Everest Real-Estate',
      tagline: 'Nepal’s Trusted Land Development & Cadastral Hub',
      established: 'Est. 2011 • Kathmandu, Nepal',
    },
    hero: {
      badge: 'Nepal Govt. Approved Master-Planned Plottings',
      titlePart1: 'Own Prime Land with',
      titleHighlight: 'Clear Titles & Roads',
      titlePart2: 'in Kathmandu Valley',
      description:
        'Freehold plots (लालपुर्जा) across Godawari, Budhanilkantha, Bhaktapur, and Pokhara. 20ft+ blacktopped road access, underground drainage, electricity, and water supply ready for immediate building.',
      explorePlots: 'Browse Land Schemes',
      bookVisit: 'Schedule Free Site Visit',
      locationLabel: 'Location',
      allLocations: 'All Locations (Valley & Pokhara)',
      budgetLabel: 'Budget Range',
      anyBudget: 'Any Budget (NPR)',
      roadLabel: 'Road Width',
      anyRoad: 'Any Road Width',
      searchBtn: 'Search Available Plots',
      statYears: 'Years Track Record',
      statSold: 'Plots Sold & Handed',
      statSchemes: 'Completed Schemes',
      statApproved: 'Government Approved',
      featuredPlot: 'Spotlight Opportunity',
      featuredTitle: 'Godawari Botanical Greens',
      featuredDesc:
        'South-facing 4-Aana residential plot facing 20ft pitch road with clear view of Phulchowki hills. Ready for transfer.',
      featuredMeta: '4 Aana • 20ft Road • South Facing',
      perAana: '/ aana',
    },
    common: {
      viewDetails: 'View Details',
      viewAllPlots: 'View All Plotted Schemes',
      bookNow: 'Book Now',
      downloadBrochure: 'Download Layout Plan',
      close: 'Close',
      submit: 'Submit Request',
      cancel: 'Cancel',
      reset: 'Reset',
      loading: 'Processing...',
      success: 'Submitted successfully! Our land officer will contact you shortly.',
      error: 'Something went wrong. Please call our hotline directly.',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone / WhatsApp Number',
      preferredDate: 'Preferred Visit Date',
      selectScheme: 'Select Land Scheme',
      message: 'Your Requirements / Questions',
      readMore: 'Read More',
      readLess: 'Show Less',
      statusAvailable: 'Available',
      statusReserved: 'Reserved',
      statusSold: 'Sold Out',
      area: 'Area',
      roadAccess: 'Road Access',
      facing: 'Facing',
      price: 'Price',
      totalPrice: 'Total Valuation',
      location: 'Location',
      features: 'Features & Amenities',
      legalClearance: 'Legal Clearance & Malpot Status',
      siteVisitTitle: 'Schedule a Free Site Inspection',
      siteVisitSubtitle: 'Our dedicated land coordinator provides free pickup and cadastral survey walkthrough at your chosen site.',
      siteVisitSuccess: 'Your site visit request has been scheduled! We will call you within 2 hours to confirm vehicle pickup.',
      submitVisit: 'Confirm Site Inspection Request',
      allCategories: 'All Categories',
    },
    services: {
      title: 'Cadastral & Land Development Services',
      subtitle:
        'Comprehensive land plotting, cadastral boundary verification, title vetting, and infrastructure development across Nepal.',
      badge: 'Certified Land Expertise',
      landPlotting: 'Master Land Plotting',
      cadastralSurvey: 'Cadastral & Digital Surveying',
      legalVetting: 'Legal Vetting & Malpot Transfer',
      infrastructure: 'Colony Infrastructure Development',
      bankValuation: 'Bank Valuation & Financing Support',
      roadAccessGov: 'Government Road Access Approval',
    },
    calculator: {
      title: 'Nepal Land Unit Converter & Tools',
      subtitle:
        'Convert seamlessly between Nepal’s Ropani (Hills) and Bigha (Terai) systems, calculate plot loan EMIs, and estimate Malpot registration taxes.',
      badge: 'Nepal Real Estate Tools',
      landUnitConverter: 'Land Measurement Converter',
      unitConverterDesc: 'Convert between Ropani-Aana-Paisa-Daam, Bigha-Katha-Dhur, Sq. Feet, and Sq. Meters.',
      hillSystem: 'Hill System (रोपनी - आना - पैसा - दाम)',
      teraiSystem: 'Terai System (बिघा - कठ्ठा - धुर)',
      ropani: 'Ropani (रोपनी)',
      aana: 'Aana (आना)',
      paisa: 'Paisa (पैसा)',
      daam: 'Daam (दाम)',
      bigha: 'Bigha (बिघा)',
      katha: 'Katha (कठ्ठा)',
      dhur: 'Dhur (धुर)',
      sqft: 'Square Feet (वर्ग फिट)',
      sqm: 'Square Meters (वर्ग मिटर)',
      loanCalculator: 'Plot Financing EMI Calculator',
      loanDesc: 'Estimate monthly banking installment for land purchase with current commercial bank interest rates.',
      propertyValue: 'Land Total Price (NPR)',
      downPayment: 'Down Payment (NPR)',
      interestRate: 'Annual Interest Rate (%)',
      loanTenure: 'Loan Tenure (Years)',
      years: 'Years',
      monthlyEmi: 'Estimated Monthly EMI',
      totalInterest: 'Total Interest Payable',
      totalPayment: 'Total Repayment Amount',
      taxCalculator: 'Malpot Registration Fee Estimator',
      taxDesc: 'Calculate government deed transfer (Lalpurja) registration fees and female ownership concessions.',
      locationType: 'Jurisdiction / Municipality Category',
      metro: 'Metropolitan City (महानगरपालिका - 5%)',
      subMetro: 'Sub-Metropolitan City (उप-महानगरपालिका - 4.5%)',
      muni: 'Municipality (नगरपालिका - 4%)',
      rural: 'Rural Municipality (गाउँपालिका - 2%)',
      femaleDiscount: 'Female Ownership Concession (25% Discount on Registration)',
      registrationFee: 'Estimated Registration Tax',
      effectiveRate: 'Effective Registration Rate',
    },
    about: {
      title: 'About Mt. Everest Real-Estate',
      subtitle:
        'Founded in 2011, Mt. Everest Real-Estate is Nepal’s premier plotted land developer dedicated to transparent, legally verified freehold properties.',
      badge: 'Company Profile & Track Record',
      storyTitle: 'Over A Decade of Transparent Land Development',
      storyP1:
        'Mt. Everest Real-Estate was founded with a singular mission: to eliminate ambiguity and legal hurdles in buying plotted land in Nepal. Every land parcel we develop goes through rigorous title verification, cadastral boundary demarcation, and municipal approval before it is offered to our valued clients.',
      storyP2:
        'With over 380+ plots successfully handed over with authentic Lalpurja (ownership certificate) in hand, we take pride in delivering complete infrastructure—including 20 to 30 feet wide pitch roads, transformer electricity, deep borings, and RCC storm drainage.',
      valuesTitle: 'Our Operating Principles',
      milestonesTitle: 'Company Milestones & Growth',
      licensesTitle: 'Government Accreditations & Licenses',
    },
    contact: {
      title: 'Get in Touch with Our Land Consultants',
      subtitle:
        'Have inquiries regarding a specific plot scheme, need cadastral consultation, or want to book a free vehicle site visit? Reach out today.',
      badge: 'Visit Our Head Office',
      headOffice: 'Head Office',
      officeAddress: 'Corporate Tower, 4th Floor, New Baneshwor, Kathmandu, Nepal',
      hotline: 'Hotlines',
      email: 'Official Inquiries',
      officeHours: 'Business Hours',
      officeHoursVal: 'Sunday – Friday: 9:30 AM – 6:00 PM (Saturday by appointment)',
      sendInquiry: 'Send Us a Direct Message',
      inquirySuccess: 'Thank you! Your message has been routed to our senior land acquisition manager.',
    },
    footer: {
      description:
        'Mt. Everest Real-Estate is Nepal’s leading real estate and land development company specializing in verified residential and commercial plotted colonies across Kathmandu Valley, Pokhara, and Chitwan.',
      quickLinks: 'Quick Navigation',
      servicesLinks: 'Services & Tools',
      legalNotice:
        'Disclaimer: All plot schemes, boundary maps, and valuations are subject to municipal master plans and Department of Land Management & Records (भूमि व्यवस्थापन तथा अभिलेख विभाग) regulations.',
      rightsReserved: 'All rights reserved.',
      companyRegistration: 'Govt. Reg. No: 84219/067/068 | PAN: 601248920',
      reanMember: 'Recognized Member: Real Estate Association of Nepal (REAN)',
    },
  },
  ne: {
    nav: {
      home: 'गृहपृष्ठ',
      plots: 'घडेरीहरू',
      services: 'सेवाहरू',
      about: 'हाम्रोबारे',
      calculator: 'क्याल्कुलेटर',
      reviews: 'प्रतिक्रिया',
      contact: 'सम्पर्क',
      bookVisit: 'भ्रमण बुकिङ',
      callUs: 'फोन गर्नुहोस्',
      hotline: 'हटलाइन',
    },
    brand: {
      name: 'माउन्ट एभरेष्ट रियल-इस्टेट',
      tagline: 'नेपालको भरपर्दो जग्गा विकास तथा नापी परामर्श केन्द्र',
      established: 'स्थापना २०६८ • नयाँ बानेश्वर, काठमाडौं',
    },
    hero: {
      badge: 'नेपाल सरकार स्वीकृत व्यवस्थित प्लटिङ योजनाहरू',
      titlePart1: 'काठमाडौं उपत्यकामा',
      titleHighlight: 'लालपुर्जा हातमा आउने',
      titlePart2: 'आकर्षक घडेरीहरू',
      description:
        'गोदावरी, बुढानीलकण्ठ, भक्तपुर, पोखरा लगायतका मुख्य क्षेत्रहरूमा २० फिट चौडा पिच बाटो, बिजुली, पानी र ढलको पूर्ण सुविधासहितका तत्काल घर बनाउन मिल्ने आकर्षक घडेरीहरू।',
      explorePlots: 'घडेरी योजनाहरू हेर्नुहोस्',
      bookVisit: 'निःशुल्क स्थलगत भ्रमण बुक गर्नुहोस्',
      locationLabel: 'स्थान',
      allLocations: 'सबै स्थानहरू (उपत्यका र बाहिर)',
      budgetLabel: 'बजेट सीमा',
      anyBudget: 'जुनसुकै बजेट (ने.रु.)',
      roadLabel: 'बाटोको चौडाइ',
      anyRoad: 'जुनसुकै बाटो',
      searchBtn: 'उपलब्ध घडेरी खोज्नुहोस्',
      statYears: 'वर्षको अनुभव',
      statSold: 'हस्तान्तरित घडेरीहरू',
      statSchemes: 'सम्पन्न प्लटिङ योजना',
      statApproved: 'सरकारबाट स्वीकृत',
      featuredPlot: 'विशेष अवसर घडेरी',
      featuredTitle: 'गोदावरी बोटानिकल ग्रीन्स',
      featuredDesc:
        'दक्षिण मोहडा, २० फिट चौडा पिच बाटो, फूलचोकी डाँडाको सुन्दर दृश्य र शान्त वातावरण भएको ४ आनाको घडेरी। तत्काल पास गर्न सकिने।',
      featuredMeta: '४ आना • २० फिट बाटो • दक्षिण मोहडा',
      perAana: '/ प्रति आना',
    },
    common: {
      viewDetails: 'विस्तृत विवरण हेर्नुहोस्',
      viewAllPlots: 'सबै प्लटिङ योजनाहरू हेर्नुहोस्',
      bookNow: 'अहिले बुक गर्नुहोस्',
      downloadBrochure: 'नक्सा तथा विवरण डाउनलोड',
      close: 'बन्द गर्नुहोस्',
      submit: 'अनुरोध पेश गर्नुहोस्',
      cancel: 'रद्द गर्नुहोस्',
      reset: 'रिसेट गर्नुहोस्',
      loading: 'प्रशोधन हुँदैछ...',
      success: 'सफलतापूर्वक प्राप्त भयो! हाम्रा प्रतिनिधिले छिट्टै सम्पर्क गर्नेछन्।',
      error: 'त्रुटि देखा पर्यो। कृपया सिधै हाम्रो हटलाइनमा सम्पर्क गर्नुहोस्।',
      fullName: 'पूरा नाम',
      emailAddress: 'इमेल ठेगाना',
      phoneNumber: 'फोन / ह्वाट्सएप नम्बर',
      preferredDate: 'इच्छुक भ्रमण मिति',
      selectScheme: 'प्लटिङ योजना छान्नुहोस्',
      message: 'तपाईंको आवश्यकता वा सोधपुछ',
      readMore: 'थप पढ्नुहोस्',
      readLess: 'कम देखाउनुहोस्',
      statusAvailable: 'उपलब्ध',
      statusReserved: 'बुकिङ भइसकेको',
      statusSold: 'बिक्री भइसकेको',
      area: 'क्षेत्रफल',
      roadAccess: 'बाटोको पहुँच',
      facing: 'मोहडा',
      price: 'मूल्य',
      totalPrice: 'कुल मूल्यांकन',
      location: 'स्थान',
      features: 'विशेषता तथा सुविधाहरू',
      legalClearance: 'कानूनी स्पष्टता र मालपोत स्थिति',
      siteVisitTitle: 'निःशुल्क स्थलगत अवलोकन भ्रमण बुक गर्नुहोस्',
      siteVisitSubtitle: 'हाम्रा प्रतिनिधिले तपाईंलाई कार्यालय वा घरबाटै गाडीको व्यवस्थासहित प्लटको नक्सा र नापी स्पष्ट देखाउनेछन्।',
      siteVisitSuccess: 'तपाईंको स्थलगत भ्रमण अनुरोध दर्ता भयो! गाडीको व्यवस्थापनका लागि २ घण्टाभित्र सम्पर्क गर्नेछौं।',
      submitVisit: 'स्थलगत भ्रमण अनुरोध निश्चित गर्नुहोस्',
      allCategories: 'सबै वर्गहरू',
    },
    services: {
      title: 'जग्गा विकास तथा नापी सम्बन्धी सेवाहरू',
      subtitle:
        'मास्टर प्लटिङ, डिजिटल कित्ताकाट नापी, लालपुर्जा कानूनी प्रमाणिकरण र आवश्यक पूर्वाधार निर्माण सेवा।',
      badge: 'प्रमाणित जग्गा विशेषज्ञता',
      landPlotting: 'व्यवस्थित जग्गा प्लटिङ तथा विकास',
      cadastralSurvey: 'डिजिटल नापी तथा सिमाना कित्ताकाट',
      legalVetting: 'कानूनी छानबिन तथा मालपोत रजिष्ट्रेसन',
      infrastructure: 'पिच बाटो, ढल र बिजुली पूर्वाधार विकास',
      bankValuation: 'बैंकिङ मूल्यांकन तथा ऋण सहजीकरण',
      roadAccessGov: 'सरकारी बाटो पहुँच तथा नक्सापास स्वीकृति',
    },
    calculator: {
      title: 'नेपाल जग्गा एकाइ रूपान्तरण तथा वित्तीय क्याल्कुलेटर',
      subtitle:
        'पहाडी प्रणाली (रोपनी-आना-पैसा-दाम) र तराई प्रणाली (बिघा-कठ्ठा-धुर) बीच रूपान्तरण, बैंकिङ किस्ता र मालपोत दस्तुर सजिलै निकाल्नुहोस्।',
      badge: 'नेपाल रियल इस्टेट क्याल्कुलेटर',
      landUnitConverter: 'जग्गा क्षेत्रफल रूपान्तरण',
      unitConverterDesc: 'रोपनी-आना-पैसा-दाम, बिघा-कठ्ठा-धुर, वर्ग फिट र वर्ग मिटर बीच गणना गर्नुहोस्।',
      hillSystem: 'पहाडी प्रणाली (रोपनी - आना - पैसा - दाम)',
      teraiSystem: 'तराई प्रणाली (बिघा - कठ्ठा - धुर)',
      ropani: 'रोपनी',
      aana: 'आना',
      paisa: 'पैसा',
      daam: 'दाम',
      bigha: 'बिघा',
      katha: 'कठ्ठा',
      dhur: 'धुर',
      sqft: 'वर्ग फिट (Sq. Ft.)',
      sqm: 'वर्ग मिटर (Sq. M.)',
      loanCalculator: 'जग्गा कर्जा मासिक किस्ता (EMI) क्याल्कुलेटर',
      loanDesc: 'वाणिज्य बैंकहरूको वर्तमान ब्याजदर अनुसार मासिक किस्ता र कुल भुक्तानी अनुमान गर्नुहोस्।',
      propertyValue: 'जग्गाको कुल मूल्य (ने.रु.)',
      downPayment: 'प्रारम्भिक भुक्तानी / डाउन पेमेन्ट (ने.रु.)',
      interestRate: 'वार्षिक ब्याजदर (%)',
      loanTenure: 'कर्जा अवधि (वर्ष)',
      years: 'वर्ष',
      monthlyEmi: 'अनुमानित मासिक किस्ता (EMI)',
      totalInterest: 'कुल तिर्नुपर्ने ब्याज',
      totalPayment: 'कुल भुक्तानी रकम',
      taxCalculator: 'मालपोत रजिष्ट्रेसन दस्तुर क्याल्कुलेटर',
      taxDesc: 'जग्गा पास गर्दा लाग्ने सरकारी राजस्व तथा महिला स्वामित्व छुटको हिसाब गर्नुहोस्।',
      locationType: 'पालिकाको प्रकार',
      metro: 'महानगरपालिका (५%)',
      subMetro: 'उप-महानगरपालिका (४.५%)',
      muni: 'नगरपालिका (४%)',
      rural: 'गाउँपालिका (२%)',
      femaleDiscount: 'महिला स्वामित्व छुट (रजिष्ट्रेसन दस्तुरमा २५% छुट)',
      registrationFee: 'अनुमानित रजिष्ट्रेसन राजस्व',
      effectiveRate: 'प्रभावकारी राजस्व दर',
    },
    about: {
      title: 'हाम्रोबारे • माउन्ट एभरेष्ट रियल-इस्टेट',
      subtitle:
        'वि.सं. २०६८ मा स्थापित, माउन्ट एभरेष्ट रियल-इस्टेट नेपालकै अग्रणी तथा कानूनी रूपमा सुरक्षित घडेरी विकास गर्ने संस्था हो।',
      badge: 'कम्पनी परिचय र विश्वसनीयता',
      storyTitle: 'एक दशकभन्दा बढीको भरपर्दो जग्गा विकास यात्रा',
      storyP1:
        'माउन्ट एभरेष्ट रियल-इस्टेटको मुख्य उद्देश्य भनेको जग्गा खरिद गर्दा हुने सिमाना विवाद, बाटोको समस्या र कानूनी झन्झटहरूबाट ग्राहकलाई पूर्ण मुक्त राख्नु हो। हामीले विकास गरेका प्रत्येक घडेरी नापी, मालपोत र सम्बन्धित नगरपालिकाबाट विधिवत स्वीकृत हुन्छन्।',
      storyP2:
        'हालसम्म ३८० भन्दा बढी ग्राहकलाई हातमा लालपुर्जासहित घडेरी हस्तान्तरण गरिसकेका छौं। २० देखि ३० फिटे कालोपत्रे बाटो, बिजुली, पानी र भूमिगत ढलको व्यवस्था हामी आफैं सम्पन्न गरेर मात्र घडेरी बिक्री गर्दछौं।',
      valuesTitle: 'हाम्रा मुख्य मान्यताहरू',
      milestonesTitle: 'कम्पनीका ऐतिहासिक माइलस्टोनहरू',
      licensesTitle: 'सरकारी प्रमाणपत्र तथा आबद्धता',
    },
    contact: {
      title: 'हाम्रा जग्गा परामर्शदातासँग सम्पर्क गर्नुहोस्',
      subtitle:
        'प्लटिङ योजना, जग्गा नापी, बैंकिङ कर्जा वा निःशुल्क स्थलगत अवलोकनका लागि आजै हामीसँग जोडिनुहोस्।',
      badge: 'हाम्रो मुख्य कार्यालय',
      headOffice: 'मुख्य कार्यालय',
      officeAddress: 'कर्पोरेट टावर, चौथो तल्ला, नयाँ बानेश्वर, काठमाडौं, नेपाल',
      hotline: 'हटलाइन नम्बरहरू',
      email: 'इमेल ठेगाना',
      officeHours: 'कार्यालय समय',
      officeHoursVal: 'आइतबार – शुक्रबार: बिहान ९:३० देखि साँझ ६:०० बजेसम्म',
      sendInquiry: 'हामीलाई सिधै सन्देश पठाउनुहोस्',
      inquirySuccess: 'धन्यवाद! तपाईंको सन्देश हाम्रा वरिष्ठ जग्गा व्यवस्थापककहाँ पुगेको छ।',
    },
    footer: {
      description:
        'माउन्ट एभरेष्ट रियल-इस्टेट नेपालको विश्वसनीय जग्गा विकास कम्पनी हो जसले काठमाडौं उपत्यका, पोखरा र चितवनका मुख्य स्थानहरूमा सुरक्षित र विकसित घडेरीहरू उपलब्ध गराउँछ।',
      quickLinks: 'छिटो नेभिगेसन',
      servicesLinks: 'सेवाहरू तथा साधनहरू',
      legalNotice:
        'कानूनी सूचना: सबै प्लटिङ योजना, बाटोको नाप र नक्सा भूमि व्यवस्थापन तथा अभिलेख विभाग र स्थानीय तहको मापदण्ड अनुसार प्रमाणित छन्।',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
      companyRegistration: 'कम्पनी दर्ता नं: ८४२१९/०६७/०६८ | स्थायी लेखा नं (PAN): ६०१२४८९२०',
      reanMember: 'आबद्ध: नेपाल रियल इस्टेट व्यवसायी संघ (REAN)',
    },
  },
}
