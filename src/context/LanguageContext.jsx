import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  tr: {
    nav: {
      home: 'Anasayfa',
      store: 'Dijital Ürünler',
      services: 'Ajans Hizmetleri',
      portfolio: 'Vaka Analizleri',
      about: 'Hakkımızda',
      faq: 'SSS',
      contact: 'İletişim',
      admin: 'Yönetici Paneli',
      quoteBtn: 'Teklif Al',
      cart: 'Sepet'
    },
    announcement: {
      promoText: 'AREM20 Kodu İle Tüm Dijital Ürünlerde %20 İndirim!',
      useBtn: 'Hemen Kullan →'
    },
    hero: {
      badge: 'aremhub • Büyüme Ajansı & Dijital Pazarlama Üssü',
      title1: 'Markanız İçin',
      titleGreen: 'Büyüme Odaklı Reklam',
      title2: '& Hazır Dijital Pazarlama Araçları',
      subtitle: 'Performans reklamları (Meta & Google Ads), ışık hızında Next.js web geliştirme ve dijital ürün mağazasıyla ciro hedeflerinizi katlayın.',
      ctaPrimary: 'Proje İçin Teklif Al',
      ctaSecondary: 'Dijital Ürünleri İncele'
    },
    store: {
      badge: 'Büyüme Araçları & Dijital Mağaza',
      title1: 'Hazır Dijital Ürünler,',
      titleGreen: 'Şablonlar & Scriptler',
      subtitle: 'İşinizi hızlandıracak onaylı Canva kitleri, Meta Ads hedef kitle kütüphaneleri, Next.js SaaS scriptleri ve Notion CRM panelleri.',
      viewDetails: 'Detaylı İncele ↗',
      buyNow: 'Hemen Satın Al',
      views: 'Görüntülenme',
      sales: 'Satış'
    },
    services: {
      badge: 'Uzman Ajans Hizmetlerimiz',
      title1: 'Büyümenizi Hızlandıran',
      titleGreen: '3 Ana Hizmet Alanımız',
      subtitle: 'Yazılım mühendisliğini yüksek dönüşümlü pazarlama stratejisiyle harmanlıyoruz.',
      getQuote: 'Teklif Al'
    },
    toast: {
      justBought: 'az önce satın aldı!',
      minsAgo: 'dakika önce'
    },
    checkout: {
      title: 'Güvenli Ödeme',
      trGateway: 'Türkiye Ödeme Yöntemi (PayTR / İyzico / PaynKolay)',
      globalGateway: 'Yurt Dışı / Global Ödeme (Lemon Squeezy MoR / Stripe)',
      upsellTitle: '⚡ Özel Fırsat: Reklam Yönetimi Paketi Ekle!',
      upsellDesc: 'Bu ürünü alanlara özel %20 indirimli Meta & Google Ads Kurulum hizmeti.',
      addUpsell: 'Pakete Ekle (+₺2.999 / $99)',
      payNow: 'Ödemeyi Tamamla'
    }
  },
  en: {
    nav: {
      home: 'Home',
      store: 'Digital Store',
      services: 'Agency Services',
      portfolio: 'Case Studies',
      about: 'About Us',
      faq: 'FAQ',
      contact: 'Contact',
      admin: 'Admin Panel',
      quoteBtn: 'Get Proposal',
      cart: 'Cart'
    },
    announcement: {
      promoText: '20% Off All Digital Products with Code: AREM20!',
      useBtn: 'Claim Now →'
    },
    hero: {
      badge: 'aremhub • Growth Agency & Digital Marketing Hub',
      title1: 'For Your Brand',
      titleGreen: 'Growth-Focused Ads',
      title2: '& Ready Digital Marketing Tools',
      subtitle: 'Scale your revenue with performance ads (Meta & Google Ads), lightning-fast Next.js development, and ready-to-use digital templates.',
      ctaPrimary: 'Get Project Proposal',
      ctaSecondary: 'Browse Digital Products'
    },
    store: {
      badge: 'Growth Tools & Digital Store',
      title1: 'Ready Digital Products,',
      titleGreen: 'Templates & Scripts',
      subtitle: 'Verified Canva kits, Meta Ads audience libraries, Next.js SaaS scripts, and Notion CRM templates to scale your business.',
      viewDetails: 'View Details ↗',
      buyNow: 'Buy Now',
      views: 'Views',
      sales: 'Sales'
    },
    services: {
      badge: 'Our Agency Services',
      title1: 'Accelerate Your Growth With',
      titleGreen: '3 Core Service Pillars',
      subtitle: 'We blend software engineering with high-converting performance marketing strategies.',
      getQuote: 'Get Quote'
    },
    toast: {
      justBought: 'just purchased!',
      minsAgo: 'mins ago'
    },
    checkout: {
      title: 'Secure Checkout',
      trGateway: 'Turkey Local Payment (PayTR / İyzico / PaynKolay)',
      globalGateway: 'International Payment (Lemon Squeezy MoR / Stripe)',
      upsellTitle: '⚡ Special Offer: Add Ads Setup Package!',
      upsellDesc: 'Exclusive 20% discount on Meta & Google Ads Setup for digital product buyers.',
      addUpsell: 'Add to Order (+₺2,999 / $99)',
      payNow: 'Complete Order'
    }
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('tr');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'tr' ? 'en' : 'tr'));
  };

  const t = translations[lang] || translations.tr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
