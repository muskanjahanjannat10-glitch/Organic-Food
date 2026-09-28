import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    products: string;
    about: string;
    contact: string;
    reviews: string;
    wishlist: string;
    cart: string;
    seo: string;
    switchLocation: string;
  };
  hero: {
    kicker: string;
    headlinePrefix: string;
    headlineHighlight: string;
    subheadline: string;
    browseBtn: string;
    visitBtn: string;
    expressReady: string;
    freeDeliveryNote: string;
    verifiedReviews: string;
    localFarmStand: string;
    openToday: string;
    morningSpecial: string;
    arrivedAt: string;
    nonGmo: string;
    zeroSpraysTitle: string;
    zeroSpraysDesc: string;
    localDirectTitle: string;
    localDirectDesc: string;
    directions: string;
  };
  products: {
    badge: string;
    heading: string;
    subtitle: string;
    searchPlaceholder: string;
    all: string;
    vegetables: string;
    fruits: string;
    pantry: string;
    certified: string;
    kmAway: string;
    addPickup: string;
    added: string;
    viewSpecs: string;
    noFound: string;
    reset: string;
    modalOrigin: string;
    modalHarvest: string;
    modalAbout: string;
    modalNutrients: string;
    modalAddBtn: string;
  };
  cart: {
    title: string;
    confirmedTitlePickup: string;
    confirmedTitleDelivery: string;
    confirmedMsg: (name: string) => string;
    orderTotal: string;
    paymentMethod: string;
    orderType: string;
    helpline: string;
    continueShopping: string;
    emptyTitle: string;
    emptyDesc: string;
    browseHarvest: string;
    freeDeliveryQualified: string;
    freeDeliveryRemaining: (rem: number) => string;
    storePickup: string;
    homeDelivery: string;
    selectSlot: string;
    slot1: string;
    slot2: string;
    slot3: string;
    fullName: string;
    phone: string;
    address: string;
    cod: string;
    bkash: string;
    subtotal: string;
    deliveryFee: string;
    free: string;
    total: string;
    confirmBtn: string;
    paymentGuarantee: string;
  };
  wishlist: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreBtn: string;
    savedCount: (count: number) => string;
    clearAll: string;
    moveAll: string;
    add: string;
  };
  about: {
    kicker: string;
    heading: string;
    description: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    p4Title: string;
    p4Desc: string;
    bannerTitle: string;
    bannerDesc: string;
    bannerBtn: string;
  };
  contact: {
    kicker: string;
    heading: string;
    desc: string;
    napTitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    statusLabel: string;
    openNow: string;
    closedNow: string;
    callBtn: string;
    directionsBtn: string;
    hoursTitle: string;
    openDaily: string;
    todayBadge: string;
    checkDelivery: string;
    checkDeliveryDesc: string;
    verifyBtn: string;
    eligibleSuccess: (zone: string, min: number) => string;
    eligibleSpecial: string;
    inquiryTitle: string;
    inquiryDesc: string;
    inquiryReceived: string;
    inquiryThank: (name: string) => string;
    sendAnother: string;
    fullNameLabel: string;
    phoneLabelForm: string;
    emailLabelForm: string;
    inquiryTypeLabel: string;
    typePickup: string;
    typeHarvestBox: string;
    typeSpecialty: string;
    typeGrower: string;
    msgLabel: string;
    msgPlaceholder: string;
    submitInquiry: string;
    mapsTitle: string;
    liveNav: string;
    openApp: string;
    viewRoute: string;
    curbsideTitle: string;
    curbsideStep1: string;
    curbsideStep2: string;
    curbsideStep3: string;
  };
  reviews: {
    kicker: string;
    heading: string;
    subtitle: string;
    basedOnReviews: (count: number) => string;
    verified: string;
    leaveReviewTitle: string;
    leaveReviewSubtitle: string;
    leaveReviewBtn: string;
  };
  footer: {
    tagline: string;
    switchLocation: (city: string) => string;
    nap: string;
    urls: string;
    seo: string;
    seoDesc: string;
    seoBtn: string;
    allRights: string;
    badge: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  bn: {
    nav: {
      home: 'হোম',
      products: 'শাকসবজি ও ফল',
      about: 'আমাদের খামার',
      contact: 'দোকান ও ম্যাপ',
      reviews: 'গ্রাহক রিভিউ',
      wishlist: 'পছন্দ',
      cart: 'ঝুড়ি',
      seo: 'এসইও হাব',
      switchLocation: 'লোকেশন পরিবর্তন'
    },
    hero: {
      kicker: '১০০% খাঁটি ও বিষ-মুক্ত দেশি অর্গানিক খামার',
      headlinePrefix: 'সেরা তাজা অর্গানিক শাকসবজি ও ফল',
      headlineHighlight: 'ঢাকা, বাংলাদেশ',
      subheadline: 'ক্ষেত থেকে সরাসরি আপনার রান্নাঘরে: ফরমালিন-মুক্ত শাকসবজি, তাজা ফল, সুন্দরবনের প্রাকৃতিক মধু, কাঠের ঘানির সরিষার তেল ও খাঁটি গাওয়া ঘি। একই দিনে হোম ডেলিভারি ও এক্সপ্রেস পিকআপ!',
      browseBtn: 'তাজা শাকসবজি দেখুন',
      visitBtn: 'দোকানের ঠিকানা ও সময়',
      expressReady: '১৫ মিনিটে পিকআপ রেডি',
      freeDeliveryNote: '৳৮০০ টাকার বেশি অর্ডারে ফ্রি ডেলিভারি',
      verifiedReviews: 'যাচাইকৃত স্থানীয় রিভিউ',
      localFarmStand: 'লোকাল ফার্ম আউটলেট',
      openToday: 'আজ রাত ৯:০০ পর্যন্ত খোলা',
      morningSpecial: 'সকালের তাজা ফসল',
      arrivedAt: 'সকাল ৭:০০ টায় এসেছে',
      nonGmo: '১০০% ফরমালিন ও কীটনাশক মুক্ত',
      zeroSpraysTitle: 'কীটনাশক মুক্ত',
      zeroSpraysDesc: 'প্রাকৃতিক কম্পোস্ট ও জৈব সারে উৎপাদিত।',
      localDirectTitle: 'সরাসরি খামার থেকে',
      localDirectDesc: '২৫-৫০ কিমি দূরবর্তী নিজস্ব খামার থেকে তাজা সরবরাহ।',
      directions: 'দিকনির্দেশনা পান →'
    },
    products: {
      badge: 'স্থানীয় খামারের তাজা ফসল',
      heading: 'প্রতিদিনের তাজা অর্গানিক খাদ্য ও শাকসবজি',
      subtitle: 'ক্ষতিকর কীটনাশক ও ফরমালিন ছাড়া উৎপাদিত খাঁটি খাদ্য। পছন্দের তালিকায় সেভ করুন বা অনলাইনে বুক করুন।',
      searchPlaceholder: 'তাজা লালশাক, বেগুন, মধু, খাঁটি সরিষার তেল খুঁজুন...',
      all: 'সব আইটেম',
      vegetables: 'শাকসবজি',
      fruits: 'মৌসুমি ফলমূল',
      pantry: 'তেল, মধু ও ঘি',
      certified: '১০০% খাঁটি অর্গানিক',
      kmAway: 'কিমি দূর থেকে তাজা',
      addPickup: 'ঝুড়িতে নিন',
      added: 'নেওয়া হয়েছে',
      viewSpecs: 'বিবরণ দেখুন',
      noFound: 'কোনো অর্গানিক খাদ্য পাওয়া যায়নি',
      reset: 'ফিল্টার রিসেট করুন',
      modalOrigin: 'খামারের অবস্থান ও দূরত্ব',
      modalHarvest: 'ফসল তোলার সময়',
      modalAbout: 'পণ্য বিবরণী',
      modalNutrients: 'পুষ্টি উপাদান ও উপকারিতা',
      modalAddBtn: 'পিকআপ ঝুড়িতে নিন'
    },
    cart: {
      title: 'পিকআপ ও ডেলিভারি ঝুড়ি',
      confirmedTitlePickup: 'এক্সপ্রেস পিকআপ রিজার্ভেশন সম্পন্ন!',
      confirmedTitleDelivery: 'হোম ডেলিভারি অর্ডার নিশ্চিত হয়েছে!',
      confirmedMsg: (name) => `ধন্যবাদ ${name}! আপনার অর্ডারটি আমরা পেয়েছি। তাজা শাকসবজি ও খাদ্য প্যাকেট করা শুরু হয়েছে।`,
      orderTotal: 'পরিশোধযোগ্য মোট বিল:',
      paymentMethod: 'পেমেন্ট মাধ্যম:',
      orderType: 'অর্ডারের ধরন:',
      helpline: 'হেল্পলাইন:',
      continueShopping: 'আরও কেনাকাটা করুন',
      emptyTitle: 'আপনার ঝুড়িতে কোনো পণ্য নেই',
      emptyDesc: 'তাজা দেশি লালশাক, বেগুন, আম, মধু বা কাঠের ঘানির সরিষার তেল যোগ করুন।',
      browseHarvest: 'পণ্য দেখুন',
      freeDeliveryQualified: 'অভিনন্দন! আপনি পাচ্ছেন ফ্রি হোম ডেলিভারি!',
      freeDeliveryRemaining: (rem) => `আর মাত্র ৳${rem} টাকার বাজার করলে ফ্রি হোম ডেলিভারি পাবেন।`,
      storePickup: 'দোকান থেকে পিকআপ (ফ্রি)',
      homeDelivery: 'হোম ডেলিভারি',
      selectSlot: 'পিকআপ বা ডেলিভারির সময় নির্ধারণ করুন',
      slot1: 'এক্সপ্রেস পিকআপ (১৫ মিনিটে আউটলেটে রেডি)',
      slot2: 'আজ বিকেলে ডেলিভারি (বিকাল ৪:০০ – সন্ধ্যা ৭:০০)',
      slot3: 'আগামীকাল সকালে (সকাল ৮:০০ – ১১:০০)',
      fullName: 'আপনার নাম *',
      phone: 'মোবাইল নম্বর *',
      address: 'ডেলিভারির সম্পূর্ণ ঠিকানা ও এলাকা *',
      cod: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)',
      bkash: 'বিকাশ / নগদ (bKash / Nagad)',
      subtotal: 'পণ্যের মোট মূল্য:',
      deliveryFee: 'ডেলিভারি চার্জ:',
      free: 'ফ্রি (৳০)',
      total: 'সর্বমোট বিল:',
      confirmBtn: 'অর্ডার নিশ্চিত করুন',
      paymentGuarantee: 'পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা রয়েছে।'
    },
    wishlist: {
      title: 'পছন্দের তালিকা',
      subtitle: 'পছন্দের তাজা খাদ্য পরে অর্ডারের জন্য সংরক্ষণ করুন',
      emptyTitle: 'আপনার পছন্দের তালিকা খালি (০)',
      emptyDesc: 'পছন্দের তাজা শাকসবজি বা মধুর পাশে থাকা লাভ (Heart) আইকনে ক্লিক করে তালিকায় রাখুন।',
      exploreBtn: 'পণ্য দেখুন',
      savedCount: (c) => `সংরক্ষিত আইটেম (${c} টি)`,
      clearAll: 'সব মুছুন',
      moveAll: 'সব ঝুড়িতে যোগ করুন',
      add: 'ঝুড়িতে নিন'
    },
    about: {
      kicker: 'খামার থেকে সরাসরি খাবার টেবিলে',
      heading: '১০০% খাঁটি ও বিষ-মুক্ত অর্গানিক খাদ্যের অঙ্গীকার',
      description: 'আমাদের লক্ষ্য রাসায়নিক সার ও কীটনাশকমুক্ত, পুষ্টিগুণে ভরপুর আসল দেশি শাকসবজি, মধু, ঘানি-ভাঙা তেল ও খাঁটি গাওয়া ঘি আপনার পরিবারের কাছে পৌঁছে দেওয়া।',
      p1Title: 'কীটনাশক ও ফরমালিন মুক্ত',
      p1Desc: 'কোনো ক্ষতিকর রাসায়নিক কীটনাশক বা কৃত্রিম কার্বাইড ছাড়াই প্রাকৃতিক জৈব সারে চাষাবাদ।',
      p2Title: 'ভোরবেলার তাজা ফসল',
      p2Desc: 'দিনের আলো ফোটার সাথে সাথেই খামার থেকে তুলে আনা হয়, ফলে প্রতিটি শাকসবজি থাকে সতেজ।',
      p3Title: 'ল্যাব টেস্ট ও শতভাগ খাঁটি',
      p3Desc: 'সুন্দরবনের মধু, কাঠের ঘানির সরিষার তেল ও খাঁটি ঘি ভেজালমুক্ত কিনা তা নিয়মিত পরীক্ষা করা হয়।',
      p4Title: 'কৃষকদের ন্যায্য মূল্য',
      p4Desc: 'আপনার প্রতি টাকার সিংহভাগ সরাসরি পৌঁছায় কঠোর পরিশ্রমী দেশি কৃষক ভাইদের হাতে।',
      bannerTitle: 'আমাদের আউটলেটে আসুন অথবা অনলাইনে অর্ডার করুন',
      bannerDesc: 'শোরুমে এসে টাটকা শাকসবজি দেখে কিনুন, অথবা ঘরে বসেই অর্ডার করে মাত্র ১৫ মিনিটে পিকআপ করুন।',
      bannerBtn: 'দোকানের ঠিকানা ও সময়সূচী'
    },
    contact: {
      kicker: 'দোকানের ঠিকানা ও যোগাযোগ',
      heading: 'আমাদের শোরুমে আসুন অথবা অনলাইনে পিকআপ বুক করুন',
      desc: 'সরাসরি কেনাকাটা করতে আমাদের আউটলেটে আসুন অথবা যেকোনো তথ্যের জন্য যোগাযোগ করুন।',
      napTitle: 'দোকানের ঠিকানা ও হেল্পলাইন',
      addressLabel: 'আউটলেটের ঠিকানা',
      phoneLabel: 'ফোন নম্বর ও অর্ডার',
      emailLabel: 'ইমেইল যোগাযোগ',
      statusLabel: 'দোকানের বর্তমান অবস্থা',
      openNow: 'এখন খোলা আছে (রাত ৯:০০ পর্যন্ত)',
      closedNow: 'সকাল ৭:৩০ টায় খুলবে',
      callBtn: 'সরাসরি কল দিন',
      directionsBtn: 'গুগল ম্যাপে দিকনির্দেশনা',
      hoursTitle: 'দোকান খোলার সময়সূচী',
      openDaily: 'সাত দিনই খোলা',
      todayBadge: 'আজ',
      checkDelivery: 'আপনার এলাকার ডেলিভারি চেক করুন',
      checkDeliveryDesc: 'ঢাকার পোস্টাল কোড (যেমন: ১২১৩, ১২০৫, ১২৩০) দিয়ে তাৎক্ষণিক ডেলিভারি চার্জ যাচাই করুন।',
      verifyBtn: 'যাচাই করুন',
      eligibleSuccess: (zone, min) => `${zone} এলাকায় ডেলিভারি উপলব্ধ! ৳${min} টাকার বেশি অর্ডারে ফ্রি ডেলিভারি।`,
      eligibleSpecial: 'এই এলাকায় বিশেষ ডেলিভারি অথবা সরাসরি শপ থেকে এক্সপ্রেস পিকআপ উপলব্ধ।',
      inquiryTitle: 'বার্তা পাঠান বা স্পেশাল অর্ডার করুন',
      inquiryDesc: 'বিশেষ কোনো খাদ্যপণ্য বা পাইকারি ক্রয়ের জন্য আমাদের বার্তা পাঠান।',
      inquiryReceived: 'আপনার বার্তাটি সফলভাবে গৃহীত হয়েছে!',
      inquiryThank: (name) => `ধন্যবাদ ${name}! আমাদের ম্যানেজার দ্রুত আপনার সাথে যোগাযোগ করবেন।`,
      sendAnother: 'আরেকটি বার্তা পাঠান',
      fullNameLabel: 'আপনার নাম *',
      phoneLabelForm: 'মোবাইল নম্বর *',
      emailLabelForm: 'ইমেইল অ্যাড্রেস',
      inquiryTypeLabel: 'বিষয় নির্বাচন করুন',
      typePickup: 'দোকান থেকে এক্সপ্রেস পিকআপ',
      typeHarvestBox: 'সাপ্তাহিক তাজা শাকসবজির বক্স',
      typeSpecialty: 'সুন্দরবনের মধু ও খাঁটি গাওয়া ঘি',
      typeGrower: 'খামারী পার্টনারশিপ',
      msgLabel: 'আপনার বার্তা বা স্পেশাল রিকোয়েস্ট',
      msgPlaceholder: 'কোন পণ্য প্রয়োজন বা ডেলিভারির সময় সম্পর্কে লিখুন...',
      submitInquiry: 'বার্তা পাঠান',
      mapsTitle: 'ইন্টারেক্টিভ গুগল ম্যাপ',
      liveNav: 'লাইভ ন্যাভিগেশন ও লোকেশন',
      openApp: 'অ্যাপে খুলুন',
      viewRoute: 'রুট দেখুন →',
      curbsideTitle: 'এক্সপ্রেস পিকআপ নির্দেশিকা',
      curbsideStep1: 'আউটলেটের সামনে নির্ধারিত পিকআপ পয়েন্টে আসুন।',
      curbsideStep2: 'আপনার অর্ডার নম্বর জানিয়ে আমাদের ফোনে কল দিন।',
      curbsideStep3: 'মাত্র ৩ মিনিটে আপনার গাড়িতে বা হাতে তাজা খাদ্যের ঝুড়ি পৌঁছে দেওয়া হবে।'
    },
    reviews: {
      kicker: 'যাচাইকৃত ক্রেতাদের মতামত',
      heading: 'আমাদের সম্মানিত ক্রেতারা কী বলছেন',
      subtitle: 'আমাদের খাঁটি অর্গানিক খাদ্যের স্বাদ, সতেজতা ও দ্রুত ডেলিভারি সম্পর্কে ক্রেতাদের অনুভূতি।',
      basedOnReviews: (c) => `${c}+ যাচাইকৃত স্থানীয় রিভিউ`,
      verified: 'যাচাইকৃত ক্রেতা',
      leaveReviewTitle: 'আপনি কি Organic Food এর গ্রাহক?',
      leaveReviewSubtitle: 'গুগল ম্যাপে আপনার রিভিউ অন্যদের আসল ফরমালিন-মুক্ত অর্গানিক খাবার খুঁজে পেতে সাহায্য করে।',
      leaveReviewBtn: 'গুগল রিভিউ দিন'
    },
    footer: {
      tagline: '১০০% খাঁটি ও বিষ-মুক্ত দেশি শাকসবজি, সুন্দরবনের মধু ও খাঁটি ঘানির তেলের নির্ভরযোগ্য প্রতিষ্ঠান।',
      switchLocation: (city) => `লোকেশন পরিবর্তন (বর্তমান: ${city}, বাংলাদেশ)`,
      nap: 'দোকানের ঠিকানা ও হেল্পলাইন',
      urls: 'সাইট লিঙ্ক',
      seo: 'গুগল এসইও স্পেকস',
      seoDesc: 'Schema.org LocalBusiness ও গুগল ম্যাপ অপটিমাইজড।',
      seoBtn: 'এসইও টেকনিক্যাল হাব খুলুন',
      allRights: 'সর্বস্বত্ব সংরক্ষিত। ১০০% সার্টিফাইড অর্গানিক ফুড স্টোর।',
      badge: 'বাংলাদেশি টাকা (৳ Tk) · ক্যাশ অন ডেলিভারি ও বিকাশ সাপোর্টেড'
    }
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Fresh Harvest',
      about: 'Our Farms',
      contact: 'Store & Maps',
      reviews: 'Reviews',
      wishlist: 'Wishlist',
      cart: 'Pickup Bag',
      seo: 'SEO Hub',
      switchLocation: 'Change City'
    },
    hero: {
      kicker: '100% Certified Chemical-Free Organic Farm Produce',
      headlinePrefix: 'Best Fresh Organic Food & Produce in',
      headlineHighlight: 'Dhaka, Bangladesh',
      subheadline: 'From our local fields directly to your kitchen: 100% formalin-free vegetables, tree-ripened seasonal fruits, Sundarban wild honey, cold-pressed mustard oil, and grass-fed cow ghee. Same-day delivery & express pickup across the city!',
      browseBtn: 'Browse Fresh Harvest',
      visitBtn: 'Visit Store & Hours',
      expressReady: '15-Min Express Pickup Ready',
      freeDeliveryNote: 'Free Home Delivery Over ৳800',
      verifiedReviews: 'verified local reviews',
      localFarmStand: 'Local Farm Stand',
      openToday: 'Open Today until 9:00 PM',
      morningSpecial: 'Morning Harvest Special',
      arrivedAt: 'Arrived 7:00 AM',
      nonGmo: '100% Non-GMO Verified',
      zeroSpraysTitle: 'Zero Synthetic Sprays',
      zeroSpraysDesc: 'Organic soils fed strictly by natural compost & cover crops.',
      localDirectTitle: 'Local Farm Direct',
      localDirectDesc: 'Average farm distance under 35 miles from Dhaka.',
      directions: 'Get Directions →'
    },
    products: {
      badge: 'Locally Sourced Farm Harvest',
      heading: 'Fresh Organic Produce & Farm Groceries',
      subtitle: 'Hand-picked daily by certified organic growers. Save items to your Wishlist or reserve online for same-day curbside pickup.',
      searchPlaceholder: 'Search organic vegetables, fruits, honey, oil...',
      all: 'All Items',
      vegetables: 'Organic Vegetables',
      fruits: 'Seasonal Fruits',
      pantry: 'Pantry, Oil & Honey',
      certified: 'Certified Organic',
      kmAway: 'km from farm',
      addPickup: 'Add to Pickup',
      added: 'Added',
      viewSpecs: 'View Details',
      noFound: 'No organic products found',
      reset: 'Reset Filters',
      modalOrigin: 'Farm Origin & Distance',
      modalHarvest: 'Harvest Time',
      modalAbout: 'About This Produce',
      modalNutrients: 'Key Nutrients & Bio-Actives',
      modalAddBtn: 'Add to Pickup Bag'
    },
    cart: {
      title: 'Taza Harvest Bag (Pickup & Delivery)',
      confirmedTitlePickup: 'Express Pickup Reserved!',
      confirmedTitleDelivery: 'Home Delivery Order Confirmed!',
      confirmedMsg: (name) => `Thank you ${name}! Your order has been placed successfully. Farm packing is now underway.`,
      orderTotal: 'Total Payable Amount:',
      paymentMethod: 'Payment Method:',
      orderType: 'Order Type:',
      helpline: 'Helpline & Support:',
      continueShopping: 'Done & Back to Shopping',
      emptyTitle: 'Your Harvest Bag is Empty',
      emptyDesc: 'Explore fresh spinach, organic eggplants, Sundarban honey, or wood-pressed mustard oil.',
      browseHarvest: 'Browse Fresh Harvest',
      freeDeliveryQualified: 'Great news! You have qualified for FREE delivery!',
      freeDeliveryRemaining: (rem) => `Add ৳${rem} more to enjoy FREE home delivery.`,
      storePickup: 'Store Pickup (Free)',
      homeDelivery: 'Home Delivery',
      selectSlot: 'Select Pickup or Delivery Time Slot',
      slot1: 'Express Pickup (Ready in 15 mins at store)',
      slot2: 'Same-Day Afternoon (Today 4:00 PM – 7:00 PM)',
      slot3: 'Tomorrow Morning (8:00 AM – 11:00 AM)',
      fullName: 'Full Name *',
      phone: 'Mobile Phone *',
      address: 'Delivery Address & Neighborhood *',
      cod: 'Cash on Delivery (COD)',
      bkash: 'bKash / Nagad Mobile Banking',
      subtotal: 'Harvest Subtotal:',
      deliveryFee: 'Delivery Fee:',
      free: 'FREE (৳0)',
      total: 'Total Bill:',
      confirmBtn: 'Confirm Order',
      paymentGuarantee: 'Cash on delivery and instant bKash/Nagad available.'
    },
    wishlist: {
      title: 'My Fresh Wishlist',
      subtitle: 'Save fresh items now to order whenever you want',
      emptyTitle: 'Your Wishlist is Empty (0)',
      emptyDesc: 'Click the heart icon on any fresh organic vegetable or pantry staple to save it for later.',
      exploreBtn: 'Explore Organic Harvest',
      savedCount: (c) => `Saved Items (${c})`,
      clearAll: 'Clear All',
      moveAll: 'Move All to Pickup Bag',
      add: 'Add to Bag'
    },
    about: {
      kicker: 'Farm-To-Table Transparency',
      heading: 'Rooted in Purity: 100% Certified Organic Food',
      description: 'Our mission is to connect local families with independent organic growers who nurture living soil, avoid harmful chemicals, and harvest produce at peak nutrient density.',
      p1Title: 'Zero Chemical Sprays',
      p1Desc: 'Every vegetable and fruit is grown in rich living soil without synthetic sprays, neurotoxins, or petroleum fertilizers.',
      p2Title: 'Same-Day Harvest',
      p2Desc: 'Delivered straight from regional organic family farms within hours of morning picking.',
      p3Title: 'Rigorous Lab Testing',
      p3Desc: 'We inspect purity documentation, wild honey authenticity, and oil cold-press standards regularly.',
      p4Title: 'Fair Local Farm Equity',
      p4Desc: '85% of every Taka spent flows directly back to our independent growers, sustaining local family agriculture.',
      bannerTitle: 'Visit Our Local Storefront or Order Curbside',
      bannerDesc: 'Experience the fresh aromas, taste seasonal samples, or reserve 15-minute express curbside pickup.',
      bannerBtn: 'Get Directions & Store Hours'
    },
    contact: {
      kicker: 'Store Locator & Inquiries',
      heading: 'Visit Our Local Market or Reserve Curbside',
      desc: 'Stop in for farm-fresh samples, pick up your pre-packed harvest box, or schedule neighborhood delivery.',
      napTitle: 'Store Address & Helpline',
      addressLabel: 'Physical Store Address',
      phoneLabel: 'Store Phone & Orders',
      emailLabel: 'Email Inquiries',
      statusLabel: 'Current Store Status',
      openNow: 'Open Now (Closes 9:00 PM)',
      closedNow: 'Opens at 7:30 AM',
      callBtn: 'Call Store Counter',
      directionsBtn: 'Get Driving Directions',
      hoursTitle: 'Store Operating Hours',
      openDaily: 'Open 7 Days a Week',
      todayBadge: 'Today',
      checkDelivery: 'Check Neighborhood Delivery',
      checkDeliveryDesc: 'Enter your local postal code (e.g. 1213, 1205, 1230) to check same-day delivery availability.',
      verifyBtn: 'Verify Area',
      eligibleSuccess: (zone, min) => `Great news! Delivery is available to ${zone}. Free home delivery on orders over ৳${min}.`,
      eligibleSpecial: 'This area is available via scheduled courier or express store pickup.',
      inquiryTitle: 'Send an Inquiry or Reserve Farm Box',
      inquiryDesc: 'Have questions about seasonal produce availability or wholesale orders? We reply within 2 hours.',
      inquiryReceived: 'Inquiry Received!',
      inquiryThank: (name) => `Thank you ${name}. Our market manager will contact you shortly.`,
      sendAnother: 'Send another message',
      fullNameLabel: 'Your Full Name *',
      phoneLabelForm: 'Mobile Phone *',
      emailLabelForm: 'Email Address',
      inquiryTypeLabel: 'Select Inquiry Type',
      typePickup: 'Express Curbside Pickup',
      typeHarvestBox: 'Weekly Organic Harvest Box',
      typeSpecialty: 'Wild Honey & Pure Cow Ghee',
      typeGrower: 'Grower / Farmer Partnership',
      msgLabel: 'Message or Special Requests',
      msgPlaceholder: 'Tell us what you are looking for or desired pickup time...',
      submitInquiry: 'Submit Inquiry',
      mapsTitle: 'Interactive Google Maps',
      liveNav: 'Live navigation & geolocation',
      openApp: 'Open App',
      viewRoute: 'View Route →',
      curbsideTitle: 'Express Curbside Pickup Instructions',
      curbsideStep1: 'Pull into any of the reserved green pickup parking stalls in front.',
      curbsideStep2: 'Call or text with your order name and stall number.',
      curbsideStep3: 'Our team brings your sanitized refrigerated crates to your vehicle in under 3 minutes.'
    },
    reviews: {
      kicker: 'Verified Local Shoppers',
      heading: 'Loved by Local Families & Neighbors',
      subtitle: 'See what local customers say about our pure organic food, farm freshness, and prompt delivery.',
      basedOnReviews: (c) => `${c}+ verified local reviews`,
      verified: 'Verified Shopper',
      leaveReviewTitle: 'Are you a customer of Organic Food?',
      leaveReviewSubtitle: 'Your feedback on Google Maps helps other neighbors discover real regenerative organic agriculture.',
      leaveReviewBtn: 'Leave a Google Maps Review'
    },
    footer: {
      tagline: 'Your trusted neighborhood certified organic grocery & fresh produce market in Bangladesh.',
      switchLocation: (city) => `Switch Location (Currently: ${city}, Bangladesh)`,
      nap: 'Store Address & Contact',
      urls: 'Clean URL Hierarchy',
      seo: 'Local SEO & Specs',
      seoDesc: 'Built with Schema.org LocalBusiness and Core Web Vitals optimization.',
      seoBtn: 'Open Local SEO Technical Hub',
      allRights: 'All rights reserved. 100% Certified Organic Food Store.',
      badge: 'Bangladeshi Taka (৳ Tk) · Cash on Delivery & bKash Supported'
    }
  }
};
