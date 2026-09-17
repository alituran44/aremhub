import React, { useState, useEffect } from 'react';

export default function AremHubWebsite({ onSwitchToOs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  // WhatsApp Widget State
  const [waBoxOpen, setWaBoxOpen] = useState(false);

  // Scroll Progress State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Web Tasarım & Yazılım',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = `${(totalScroll / windowHeight) * 100}`;
        setScrollProgress(Number(scroll));
      }
      if (totalScroll > 150) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert('Lütfen en azından Ad Soyad ve Telefon bilginizi giriniz.');
      return;
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowContactModal(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        service: 'Web Tasarım & Yazılım',
        message: ''
      });
      alert('✨ Mesajınız başarıyla iletildi! Ekibimiz en kısa sürede sizinle iletişime geçecektir.');
    }, 1200);
  };

  // Helper: Service SVG Icons
  const renderServiceIcon = (id, className = "w-6 h-6") => {
    switch (id) {
      case 'web-tasarim':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'sosyal-medya':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      case 'meta-ads':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3M2 12h3m14 0h3" />
          </svg>
        );
      case 'google-ads':
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      default:
        return (
          <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  // 4 Core Services
  const services = [
    {
      id: 'web-tasarim',
      title: 'Web Tasarım',
      subtitle: 'Modern teknoloji standartlarına uygun, profesyonel ve özgün web sayfaları tasarlıyoruz.',
      image: '/assets/web-tasarim.jpg',
      badge: 'Yüksek Performans & SEO',
      features: [
        'Özgün UI/UX Arayüz Tasarımı',
        'Mobil & Tablet %100 Duyarlı (Responsive)',
        'SEO ve Google Core Web Vitals Optimizasyonu',
        'Yüksek Hızlı Güvenli Sunucu Altyapısı',
        'Yönetim Paneli & Kolay İçerik Güncelleme'
      ],
      whatsappText: 'Merhaba web sitenizden ulaşıyorum, Web Tasarım hizmetiniz hakkında teklif almak istiyorum.'
    },
    {
      id: 'sosyal-medya',
      title: 'Sosyal Medya Yönetimi',
      subtitle: 'Markanızın vitrinini yeniden dizayn ediyoruz, AremHub ile sosyalleşerek büyüyün!',
      image: '/assets/sosyal-medya.jpg',
      badge: 'Büyüme & Etkileşim',
      features: [
        'Aylık İçerik & Yayın Takvimi Planlama',
        'Reels & Dikey Video Kreatif Üretimi',
        'Topluluk & Yorum/DM Etkileşim Yönetimi',
        'Hedef Kitle & Rakip Analizi Raporlaması',
        'Meta & Instagram Ads Reklam Stratejisi'
      ],
      whatsappText: 'Merhaba web sitenizden ulaşıyorum, Sosyal Medya Yönetimi hizmetiniz hakkında teklif almak istiyorum.'
    },
    {
      id: 'meta-ads',
      title: 'Meta & Instagram Reklam Yönetimi',
      subtitle: 'Hedef kitle analizi, dinamik kreatifler ve ölçeklenebilir bütçe optimizasyonuyla reklamlarınızdan maksimum ROAS elde edin.',
      image: '/assets/performans-pazarlama.jpg',
      badge: 'ROI & Yüksek Dönüşüm',
      features: [
        'Meta Business Manager & Reklam Hesabı Mimarisi',
        'Meta Pixel & Conversions API (CAPI) Entegrasyonu',
        'İleri Düzey Hedef Kitle & Lookalike Segmentasyonu',
        'Dinamik Görsel & Video Reklam Kreatif A/B Testleri',
        'Haftalık Şeffaf ROAS & Dönüşüm Raporlaması'
      ],
      whatsappText: 'Merhaba web sitenizden ulaşıyorum, Meta & Instagram Reklam Yönetimi hizmetiniz hakkında teklif almak istiyorum.'
    },
    {
      id: 'google-ads',
      title: 'Google Ads & Performans Pazarlaması',
      subtitle: 'Arama Ağı, Performance Max (PMax) ve YouTube reklamlarıyla satın alma niyeti en yüksek müşterilere doğrudan ulaşın.',
      image: '/assets/google-ads.jpg',
      badge: 'Arama Ağı & PMax',
      features: [
        'Google Arama Ağı (Search) & Anahtar Kelime Stratejisi',
        'Performance Max (PMax) ve Alışveriş (Shopping) Kampanyaları',
        'YouTube Video & Yeniden Pazarlama (Remarketing)',
        'Google Analytics 4 (GA4) & GTM Dönüşüm Takibi',
        'Tıklama Başı Maliyet (CPC) ve Bütçe Verimliliği Optimizasyonu'
      ],
      whatsappText: 'Merhaba web sitenizden ulaşıyorum, Google Ads & Performans Pazarlaması hakkında teklif almak istiyorum.'
    }
  ];

  // Real Client References
  const references = [
    { 
      id: 'iskender-pasa',
      title: 'İskender Paşa Konağı', 
      category: 'Tarihi Konak', 
      scope: 'Kurumsal Web Sitesi & Dijital Menü',
      result: '+180% Rezervasyon Artışı',
      logo: '/assets/refs/iskender-pasa.png',
      description: "Diyarbakır'ın köklü tarihi yapılarından İskender Paşa Konağı için tarihi dokuya yakışan modern kurumsal web arayüzü, çok dilli menü ve rezervasyon sistemi.",
      tags: ['Kurumsal Web', 'Gastronomi', 'Çok Dilli Menü']
    },
    { 
      id: 'detay-peyzaj',
      title: 'Detay Peyzaj & Mimarlık', 
      category: 'Peyzaj & Mimari', 
      scope: 'Kurumsal Web Tasarım & Sosyal Medya',
      result: '+240% Proje Talebi',
      logo: '/assets/refs/detay-peyzaj.png',
      description: 'Çanakkale ve Ege Bölgesi lüks villa, bahçe peyzajı ve mimari projelendirme için özel web arayüzü ve görsel odaklı Instagram yönetimi.',
      tags: ['Web Tasarım', '3D Görselleştirme', 'Instagram Yönetimi']
    },
    { 
      id: 'dinapoli',
      title: 'Di Napoli Pizza', 
      category: 'Gastronomi', 
      scope: 'Reels Video Çekimi & Meta Ads',
      result: '1.4M+ Video İzlenme',
      logo: '/assets/refs/dinapoli.png',
      description: 'Özgün İtalyan napoliten lezzetlerini iştah kabartan dikey video prodüksiyonu ve hedefli Meta reklam kampanyalarıyla müşterilerle buluşturduk.',
      tags: ['Reels Prodüksiyon', 'Meta & Instagram Ads', 'Bölgesel Büyüme']
    },
    { 
      id: 'bihocam',
      title: 'BiHocam', 
      category: 'Online Eğitim', 
      scope: 'Canlı Ders Platformu & Google Ads',
      result: '15.000+ Aktif Öğrenci',
      logo: '/assets/refs/bihocam.png',
      description: 'YKS, LGS ve sınavlara hazırlanan öğrencileri uzman eğitmenlerle buluşturan online eğitim platformu web/mobil arayüzü ve performans reklamcılığı.',
      tags: ['Online Eğitim', 'EdTech Platform', 'Google Ads']
    },
    { 
      id: 'hostifyos',
      title: 'HostifyOS', 
      category: 'SaaS & Otel OS', 
      scope: 'Airbnb & Butik Otel PWA Rehberi',
      result: '+$420/Ay Mülk Başı Gelir',
      logo: '/assets/refs/hostifyos.png',
      description: 'Airbnb, Vrbo ve butik oteller için 1 tıkla Wi-Fi paylaşımı, zaman ayarlı kapı şifresi ve %0 komisyonlu dijital konuk rehberi (PWA) otomasyon sistemi.',
      tags: ['SaaS Platformu', 'PWA', 'Otel Otomasyonu', 'Airbnb']
    },
    { 
      id: 'ihaleciburda',
      title: 'İhaleciBurda', 
      category: 'İhale Pazaryeri', 
      scope: 'Platform Geliştirme & Dijital Büyüme',
      result: '50.000+ Aylık Ziyaret',
      logo: '/assets/refs/ihaleciburda.png',
      description: 'Türkiye genelinde ihale ilanlarını, teklif ve tedarik süreçlerini tek platformda toplayan modern ihale pazaryeri sistemi ve dijital büyüme yönetimi.',
      tags: ['İhale Platformu', 'Web Yazılım', 'B2B Pazaryeri']
    },
    { 
      id: 'gizemli-vaka',
      title: 'Gizemli Vaka', 
      category: 'İnteraktif Oyun', 
      scope: 'Oyun Platformu & Dijital Büyüme',
      result: '25.000+ Çözülen Vaka',
      logo: '/assets/refs/gizemli-vaka.png',
      description: "Türkiye'nin en popüler online dedektiflik ve cinayet gizemi çözme oyunu platformu, interaktif vaka arayüzü ve viral sosyal medya reklam kampanyaları.",
      tags: ['Oyun Platformu', 'Web Geliştirme', 'Viral Reklam']
    },
    { 
      id: 'mydesirre',
      title: 'MyDesirre', 
      category: 'Mum E-Ticaret', 
      scope: 'E-Ticaret Altyapısı & Meta Reklam Yönetimi',
      result: '5.2x ROAS Dönüşümü',
      logo: '/assets/refs/mydesirre.png',
      description: 'Özel tasarım soya mumları, dekoratif ve aromatik mum koleksiyonları için e-ticaret altyapısı, dinamik ürün kataloğu ve yüksek dönüşümlü Meta reklamları.',
      tags: ['Mum E-Ticaret', 'Meta Ads', 'Dinamik Katalog']
    },
    { 
      id: 'bimoola',
      title: 'BiMoola Blog Portalı', 
      category: 'Blog & İçerik', 
      scope: 'Blog Arayüzü & SEO İçerik Stratejisi',
      result: '%380 SEO Trafik Artışı',
      logo: '/assets/refs/bimoola.png',
      description: 'Güncel makaleler, finans, teknoloji ve yaşam rehberleri içeren modern blog platformu tasarımı ve Google organik arama liderliği.',
      tags: ['Blog Platformu', 'SEO Stratejisi', 'Web Arayüzü']
    }
  ];

  // Circumference for 48px circle (radius 49 in 100 viewBox)
  const circleDashoffset = 307.919 - (scrollProgress * 307.919) / 100;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] font-sans antialiased selection:bg-[#0A284B] selection:text-[#84CC16]">
      
      {/* ========================================================================= */}
      {/* 1. FLOATING CAPSULE NAVBAR (DİJİTAL CREATIVE BİREBİR KAPSÜL MENÜ)       */}
      {/* ========================================================================= */}
      <div className="sticky top-4 z-50 px-4 max-w-6xl mx-auto">
        <header className="floating-nav-capsule px-5 py-3 rounded-full flex items-center justify-between border border-slate-200/90 shadow-lg shadow-slate-900/5 bg-white/95 backdrop-blur-md">
          
          {/* Logo & Marka */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <img 
              src="/aremhub-logo-lightbg.png" 
              alt="AremHub Logo" 
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav Menü */}
          <nav className="hidden md:flex items-center gap-7 text-[13.5px] font-semibold text-slate-700">
            <button 
              onClick={() => scrollToSection('hero')}
              className="hover:text-[#0A284B] hover:font-bold transition-colors"
            >
              Ana Sayfa
            </button>
            <button 
              onClick={() => scrollToSection('kurumsal')}
              className="hover:text-[#0A284B] hover:font-bold transition-colors"
            >
              Kurumsal
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="hover:text-[#0A284B] hover:font-bold transition-colors"
            >
              Neler Yapıyoruz?
            </button>
            <button 
              onClick={() => scrollToSection('references')}
              className="hover:text-[#0A284B] hover:font-bold transition-colors"
            >
              Referanslarımız
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#0A284B] hover:font-bold transition-colors"
            >
              İletişim
            </button>
          </nav>

          {/* Sağ Aksiyon Butonları */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a 
              href="https://wa.me/+905437360660?text=Merhaba%20AremHub,%20hizmetleriniz%20hakkında%20teklif%20almak%20istiyorum."
              target="_blank" 
              rel="noreferrer noopener"
              className="dc-btn-primary text-xs px-4 py-2"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Teklif Al</span>
            </a>
          </div>

          {/* Mobil Menü Butonu */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700 focus:outline-none"
            aria-label="Menü"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </header>

        {/* Mobil Dropdown Menü */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 bg-white/98 backdrop-blur-lg rounded-3xl border border-slate-200 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2 font-semibold text-slate-700 text-sm">
              <button onClick={() => scrollToSection('hero')} className="text-left px-3 py-2 rounded-xl hover:bg-slate-50">Ana Sayfa</button>
              <button onClick={() => scrollToSection('kurumsal')} className="text-left px-3 py-2 rounded-xl hover:bg-slate-50">Kurumsal</button>
              <button onClick={() => scrollToSection('services')} className="text-left px-3 py-2 rounded-xl hover:bg-slate-50">Neler Yapıyoruz?</button>
              <button onClick={() => scrollToSection('references')} className="text-left px-3 py-2 rounded-xl hover:bg-slate-50">Referanslarımız</button>
              <button onClick={() => scrollToSection('contact')} className="text-left px-3 py-2 rounded-xl hover:bg-slate-50">İletişim</button>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a 
                href="https://wa.me/+905437360660?text=Merhaba%20AremHub,%20hizmetleriniz%20hakkında%20teklif%20almak%20istiyorum."
                target="_blank" 
                rel="noreferrer noopener"
                className="dc-btn-primary text-center w-full py-2.5 text-xs"
              >
                Hızlı Teklif Al
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION (DİJİTAL CREATIVE ARKA PLAN & BAŞLIK BİREBİR MODELİ)       */}
      {/* ========================================================================= */}
      <section 
        id="hero" 
        className="relative pt-8 pb-20 md:py-24 px-4 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          
          {/* Arka Plan Masada Not Defteri Görsel Kartı (Dijital Creative Hero) */}
          <div 
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 min-h-[460px] md:min-h-[520px] flex items-center justify-center text-center p-6 sm:p-10 md:p-14"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 40, 75, 0.45), rgba(10, 40, 75, 0.65)), url('/assets/hero-desk.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Ortadaki Modern & Zenginleştirilmiş Kurumsal Ajans Kartı */}
            <div className="relative z-10 max-w-3xl w-full mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-10 shadow-2xl border border-white/80 space-y-6 text-left overflow-hidden animate-in zoom-in-95 duration-500">
              
              {/* Üst İnce Vurgu Çizgisi */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0A284B] via-[#194077] to-[#84CC16]"></div>

              {/* Üst Durum & Rozet Çubuğu */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#0A284B]">
                    AremHub Digital Studio
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 hidden sm:inline">• 2026 Proje Kabulleri Aktif</span>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-50/90 border border-amber-200/70 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-900 shadow-2xs">
                  <span>★ 4.9/5 Memnuniyet (50+ Proje)</span>
                </div>
              </div>

              {/* Ana Başlık & Açıklama */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A284B] tracking-tight leading-[1.18]">
                  Sınırları Aşan Fikirlerle, <br className="hidden sm:inline" />
                  <span className="text-[#194077]">Dijital Geleceğinizi</span> İnşa Ediyoruz!
                </h1>
                <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed max-w-2xl">
                  2020 yılından bugüne; modern web mühendisliği, yüksek dönüşümlü Meta & Google reklam stratejileri ve ölçeklenebilir yazılım çözümleriyle markanızı dijitalde sektörün öncüsü yapıyoruz.
                </p>
              </div>

              {/* Hizmet Odak Alanı Rozetleri */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl border border-slate-200/60 transition-colors">
                  <span className="text-[#194077] font-black">⚡</span> Modern Web & UI/UX
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl border border-slate-200/60 transition-colors">
                  <span className="text-emerald-600 font-black">🎯</span> Meta & Google Ads
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100/90 hover:bg-slate-200/70 px-3 py-1.5 rounded-xl border border-slate-200/60 transition-colors">
                  <span className="text-[#84CC16] font-black">🚀</span> SaaS & Otomasyon
                </span>
              </div>

              {/* Aksiyon Butonları */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a 
                  href="https://wa.me/+905437360660?text=Merhaba%20AremHub,%20web%20ve%20dijital%20hizmetleriniz%20hakk%C4%B1nda%20bilgi%20ve%20teklif%20almak%20istiyorum."
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="dc-btn-primary px-7 py-3.5 text-xs sm:text-sm shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2 font-bold"
                >
                  <span>WhatsApp ile Teklif Al</span>
                  <span className="text-sm">➜</span>
                </a>
                <button 
                  onClick={() => scrollToSection('references')}
                  className="dc-btn-outline px-6 py-3.5 text-xs sm:text-sm bg-white hover:bg-slate-50 border-slate-300 flex items-center justify-center gap-2 font-bold"
                >
                  <span>Projelerimizi İnceleyin (9 Canlı Referans)</span>
                </button>
              </div>

              {/* Entegre Metrik & Başarı Şeridi */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                  <div className="text-base sm:text-lg font-black text-[#0A284B]">50+</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500">Tamamlanan Proje</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                  <div className="text-base sm:text-lg font-black text-emerald-600">%340</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500">Ortalama Büyüme</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                  <div className="text-base sm:text-lg font-black text-[#194077]">9 / 9</div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-slate-500">Canlı Başarı Hikayesi</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. REFERANSLARIMIZ SECTION (DİJİTAL CREATIVE BİREBİR)                    */}
      {/* ========================================================================= */}
      <section id="references" className="py-12 md:py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="dc-kicker">Referanslarımız</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A284B] tracking-tight mt-1">
              Çalışmalarımızı incelemek ister misiniz?
            </h2>
          </div>
          
          <button 
            onClick={() => setShowPortfolioModal(true)}
            className="dc-btn-primary text-xs sm:text-sm px-5 py-2.5 self-start md:self-auto"
          >
            <span>Tüm Projeleri İncele ➜</span>
          </button>
        </div>

        {/* Referans Kartları Grid - 9 Kart (3x3 Kusursuz Simetrik Mimari) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {references.map((ref) => (
            <div 
              key={ref.id}
              onClick={() => setShowPortfolioModal(true)}
              className="dc-card p-5 cursor-pointer group hover:border-[#84CC16]/60 hover:shadow-xl hover:-translate-y-0.5 transition-all flex flex-col justify-between min-h-[220px] bg-white border border-slate-200/90"
            >
              <div className="space-y-4">
                {/* Logo & Kategori Alanı */}
                <div className="flex items-center justify-between gap-2">
                  <div className="h-11 w-24 px-1.5 py-1 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-slate-200 transition-colors">
                    <img 
                      src={ref.logo} 
                      alt={ref.title} 
                      className="max-h-8 max-w-full object-contain filter contrast-105"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#194077] bg-blue-50/80 border border-blue-100/60 px-2.5 py-1 rounded-full text-right shrink-0 whitespace-nowrap">
                    {ref.category}
                  </span>
                </div>

                {/* Başlık & Hizmet Kapsamı */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[#0A284B] group-hover:text-[#194077] transition-colors leading-snug">
                      {ref.title}
                    </h3>
                    <span className="text-slate-400 group-hover:text-[#0A284B] group-hover:translate-x-1 transition-all text-sm">
                      ➜
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {ref.scope}
                  </p>
                </div>
              </div>

              {/* Başarı Çıktısı / Metrik */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Başarı Çıktısı</span>
                <span className="text-[#0A284B] font-black bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 text-xs flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  {ref.result}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HİZMETLERİMİZ (NELER YAPIYORUZ?) 4 ANA HİZMET KARTI                   */}
      {/* ========================================================================= */}
      <section id="services" className="py-16 md:py-20 px-4 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="dc-kicker justify-center">Hizmetlerimiz</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A284B] tracking-tight">
              Size hangi konuda yardımcı olabiliriz?
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Uçtan uca dijital çözümlerimizle markanızı sektörün öncüsü yapacak kreatif ve teknik hizmetler sunuyoruz.
            </p>
          </div>

          {/* 4 Ana Hizmet Kartı Grid (Resimsiz, İkon ve Kapsam Odaklı Premium Tasarım) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div 
                key={service.id}
                className="dc-card p-6 sm:p-8 flex flex-col justify-between border border-slate-200 hover:border-[#0A284B]/30 hover:shadow-xl transition-all duration-300 group bg-white rounded-3xl"
              >
                <div className="space-y-6">
                  {/* Üst Kısım: İkon ve Rozet */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0A284B] flex items-center justify-center group-hover:bg-[#0A284B] group-hover:text-white transition-all duration-300 shadow-2xs">
                      {renderServiceIcon(service.id, "w-6 h-6")}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-3 py-1 rounded-full group-hover:bg-[#0A284B]/10 group-hover:text-[#0A284B] transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  {/* Başlık & Açıklama */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-[#0A284B] group-hover:text-[#194077] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Hizmet Maddeleri (Öne Çıkan Özellikler) */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Öne Çıkan Kapsam
                    </div>
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 border border-emerald-200">
                            ✓
                          </span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Butonlar: Daha Fazla & Teklif Al */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedService(service)}
                    className="dc-btn-outline text-xs sm:text-sm px-5 py-2.5 flex-1 text-center justify-center font-bold"
                  >
                    Daha Fazla
                  </button>
                  <a 
                    href={`https://wa.me/+905437360660?text=${encodeURIComponent(service.whatsappText)}`}
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="dc-btn-primary text-xs sm:text-sm px-5 py-2.5 flex-1 text-center justify-center font-bold"
                  >
                    Teklif Al
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. KURUMSAL / HAKKIMIZDA BÖLÜMÜ                                         */}
      {/* ========================================================================= */}
      <section id="kurumsal" className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="dc-kicker">AremHub Kurumsal</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0A284B] tracking-tight leading-tight">
              2020 Yılından Bugüne <br />
              <span className="text-[#194077]">Profesyonel İş Deneyimi</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              AremHub hizmet kalitesini güvenilir şekilde müşteri portföyüne vermeyi ilke edinerek, internet ve bilişim sektöründe geniş bir yelpazeye sahip öncü bir kuruluştur.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Müşterilerimiz ile gerçekleştirdiğimiz strateji toplantılarında, işletmenin istek ve ihtiyaçları doğrultusunda maliyeti de ön planda tutarak bütçeden maksimum performansı amaçlıyoruz.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex-1">
                <div className="text-2xl font-black text-[#0A284B]">150+</div>
                <div className="text-xs font-bold text-slate-500">Tamamlanan Proje</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex-1">
                <div className="text-2xl font-black text-[#84CC16]">%100</div>
                <div className="text-xs font-bold text-slate-500">Müşteri Memnuniyeti</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="dc-card p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#194077] flex items-center justify-center font-black text-sm">
                🎯
              </div>
              <h3 className="text-lg font-black text-[#0A284B]">MİSYONUMUZ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                İşletmelerin dijital dünyada güçlü bir varlık oluşturmasına destek olmak için stratejik düşünceyi estetikle birleştirerek yenilikçi çözümler sunarız.
              </p>
            </div>

            <div className="dc-card p-6 space-y-3 bg-white">
              <div className="w-10 h-10 rounded-xl bg-lime-50 text-[#65A30D] flex items-center justify-center font-black text-sm">
                🚀
              </div>
              <h3 className="text-lg font-black text-[#0A284B]">VİZYONUMUZ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yaratıcı stratejiler ve estetik çözümlerle fark yaratarak müşterilerimizin sektörde öncü konuma ulaşmalarını sağlamak ve inovatif bir marka olmak.
              </p>
            </div>

            <div className="dc-card p-6 space-y-3 bg-white sm:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-sm">
                💎
              </div>
              <h3 className="text-lg font-black text-[#0A284B]">AREMHUB REKLAM & YAZILIM GÜCÜ</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stratejik ve yaratıcı çözümleri hayata geçirmekteyiz. Teknolojiyi firmaların yararına çeviriyor ve müşteri potansiyellerine erişimi kolaylaştırıyoruz. Çalışmalarımızda estetik bakış açılarıyla kaliteli işler yapmayı tercih ediyoruz.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. İKİNCİ ÇAĞRI BANTI (CTA BANNER - DİJİTAL CREATIVE BİREBİR)            */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div 
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-900 text-center p-8 sm:p-12 md:p-14"
          style={{
            backgroundImage: `linear-gradient(rgba(10, 40, 75, 0.5), rgba(10, 40, 75, 0.7)), url('/assets/hero-desk.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="relative z-10 max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/60 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#194077]">
              yenilikçi fikirler, dijital çözümler!
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#0A284B] tracking-tight">
              Sınırları Zorlayan Fikirlerle <br />
              Dijital Geleceğinizi İnşa Ediyoruz!
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              2020 Yılından Bugüne Profesyonel İş Deneyimi
            </p>
            <div className="pt-2">
              <button 
                onClick={() => scrollToSection('contact')}
                className="dc-btn-primary w-full sm:w-3/4 py-3.5 text-sm shadow-lg"
              >
                Bizimle İletişime Geçin!
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. İLETİŞİM FORMU VE DETAYLARI                                          */}
      {/* ========================================================================= */}
      <section id="contact" className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
        <div className="space-y-10">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="dc-kicker justify-center">İletişim</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0A284B] tracking-tight">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-sm text-slate-600">
              Projeniz için ücretsiz analiz ve hızlı teklif almak için formu doldurun veya doğrudan bizi arayın.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* İletişim Bilgileri Kutuları */}
            <div className="lg:col-span-5 space-y-4">
              <div className="dc-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#194077] flex items-center justify-center shrink-0 text-xl font-bold">
                  📞
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telefon</div>
                  <a href="tel:+905437360660" className="text-base font-black text-[#0A284B] hover:text-[#194077]">
                    +90 (543) 736 06 60
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">Pzt - Cmt: 09:00 - 19:00</div>
                </div>
              </div>

              <div className="dc-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00AB55] flex items-center justify-center shrink-0 text-xl font-bold">
                  ✉️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">E-posta</div>
                  <a href="mailto:alituran44@gmail.com" className="text-base font-black text-[#0A284B] hover:text-[#194077]">
                    alituran44@gmail.com
                  </a>
                  <div className="text-xs text-slate-500 mt-0.5">En geç 2 saat içinde yanıt</div>
                </div>
              </div>

              <div className="dc-card p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-lime-50 text-[#65A30D] flex items-center justify-center shrink-0 text-xl font-bold">
                  📍
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adres</div>
                  <div className="text-base font-black text-[#0A284B]">
                    Merkez / Çanakkale
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/yRwLFXuyy5ZWTkM6A" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="text-xs font-bold text-[#194077] hover:underline mt-0.5 inline-block"
                  >
                    Haritada Görüntüle ➜
                  </a>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="lg:col-span-7">
              <div className="dc-card p-8 sm:p-10 bg-white shadow-xl border border-slate-200">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Adınız Soyadınız *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Örn: Ahmet Yılmaz"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0A284B] focus:outline-none bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Telefon Numaranız *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="05XX XXX XX XX"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0A284B] focus:outline-none bg-slate-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">E-posta Adresiniz</label>
                      <input 
                        type="email" 
                        placeholder="ornek@sirket.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0A284B] focus:outline-none bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">İlgilendiğiniz Hizmet</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0A284B] focus:outline-none bg-slate-50/50"
                      >
                        <option>Web Tasarım & Yazılım</option>
                        <option>Sosyal Medya Yönetimi</option>
                        <option>Meta & Instagram Reklam Yönetimi</option>
                        <option>Google Ads & Performans Pazarlaması</option>
                        <option>360° Dijital Büyüme & Reklam Paketi</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Proje Detayları & Notunuz</label>
                    <textarea 
                      rows="4" 
                      placeholder="Projeniz veya ihtiyaçlarınız hakkında kısaca bilgi verin..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#0A284B] focus:outline-none bg-slate-50/50"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={formSubmitted}
                    className="dc-btn-primary w-full py-3 text-sm shadow-md"
                  >
                    {formSubmitted ? 'Gönderiliyor...' : 'Teklif Talebini İlet ➜'}
                  </button>
                </form>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. FOOTER SECTION (DİJİTAL CREATIVE KOYU FOOTER & AREMHUB LOGO)         */}
      {/* ========================================================================= */}
      <footer className="bg-[#0A284B] text-white pt-14 pb-8 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto space-y-10">
          
          {/* Üst Kısım: Logo */}
          <div className="text-center flex flex-col items-center justify-center space-y-2">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 inline-block">
              <img 
                src="/aremhub-logo-transparent.png" 
                alt="AremHub" 
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-300 font-medium max-w-md mx-auto">
              Sınırları zorlayan fikirlerle dijital geleceğinizi inşa ediyoruz.
            </p>
          </div>

          {/* Orta Kısım: İletişim Hatları */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-y border-white/10 py-6 text-sm">
            <div>
              <span className="text-xs text-slate-400 block mb-1">Telefon</span>
              <a href="tel:+905437360660" className="font-bold text-white hover:text-[#84CC16]">
                +90 (543) 736 06 60
              </a>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">E-posta</span>
              <a href="mailto:alituran44@gmail.com" className="font-bold text-white hover:text-[#84CC16]">
                alituran44@gmail.com
              </a>
            </div>
            <div>
              <span className="text-xs text-slate-400 block mb-1">Adres</span>
              <a href="https://maps.app.goo.gl/yRwLFXuyy5ZWTkM6A" target="_blank" rel="noreferrer noopener" className="font-bold text-white hover:text-[#84CC16]">
                Merkez / Çanakkale
              </a>
            </div>
          </div>

          {/* Alt Kısım: Copyright & Sosyal Medya */}
          <div className="bg-white rounded-xl p-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-800 shadow-lg">
            <div className="text-xs font-extrabold text-[#0A284B]">
              Copyright © 2020 - 2026 | AremHub
            </div>

            {/* Sosyal Medya İkonları */}
            <div className="flex items-center gap-4 text-[#0A284B]">
              <a 
                href="https://www.instagram.com/dijitalcreative.tr/" 
                target="_blank" 
                rel="noreferrer noopener" 
                className="hover:scale-110 hover:text-[#E1306C] transition-all"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                href="https://www.facebook.com/dijitalcreative.tr/" 
                target="_blank" 
                rel="noreferrer noopener" 
                className="hover:scale-110 hover:text-[#1877F2] transition-all"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                href="https://www.youtube.com/@dijitalcreative" 
                target="_blank" 
                rel="noreferrer noopener" 
                className="hover:scale-110 hover:text-[#FF0000] transition-all"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 9. FLOATING WHATSAPP CHAT WIDGET (DİJİTAL CREATIVE JOINCHAT BİREBİR)     */}
      {/* ========================================================================= */}
      <div className="joinchat-floating">
        <div className="relative">
          
          {/* Sohbet Baloncuğu Açılır Pencere */}
          {waBoxOpen && (
            <div className="absolute bottom-16 left-0 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 z-50">
              <div className="bg-[#0A284B] p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                    💬
                  </div>
                  <div>
                    <div className="text-xs font-black">AremHub Canlı Destek</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">● Şu an çevrim içi</div>
                  </div>
                </div>
                <button 
                  onClick={() => setWaBoxOpen(false)}
                  className="text-slate-300 hover:text-white text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 bg-slate-50/80 space-y-3">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200/80 text-xs text-slate-700 shadow-2xs leading-relaxed">
                  Merhabaa! 👋 <br />
                  AremHub'a hoş geldiniz. Size nasıl yardımcı olabiliriz?
                </div>

                <a 
                  href="https://wa.me/+905437360660?text=Merhaba,%20web%20sitenizden%20ulaşıyorum."
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02]"
                >
                  <span>Sohbete Başla</span>
                  <span>➜</span>
                </a>
              </div>
            </div>
          )}

          {/* Ana Yuvarlak WhatsApp Butonu */}
          <button 
            onClick={() => setWaBoxOpen(!waBoxOpen)}
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all relative group"
            aria-label="WhatsApp Sohbet"
          >
            {/* 1 Rozeti */}
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-xs">
              1
            </span>

            {/* WhatsApp SVG İkonu */}
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>

            {/* Yanındaki Tooltip */}
            <div className="absolute left-16 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-slate-200 hidden group-hover:block whitespace-nowrap">
              Merhabaa! 👋
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 10. SCROLL PROGRESS CIRCLE & BACK TO TOP BUTTON                           */}
      {/* ========================================================================= */}
      <div 
        onClick={scrollToTop}
        className={`progress-wrap ${showScrollTop ? 'active-progress' : ''}`}
        title="Sayfanın Başına Dön"
      >
        <svg className="progress-circle" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path 
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              strokeDasharray: '307.919, 307.919',
              strokeDashoffset: circleDashoffset
            }}
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 11. HİZMET DETAY MODALI                                                 */}
      {/* ========================================================================= */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95">
            {/* Modal Üst Başlık (Resimsiz, Kurumsal Obsidian/Navy Tasarım) */}
            <div className="relative bg-[#0A284B] p-6 sm:p-7 text-white flex items-center justify-between border-b border-[#194077]/40">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/10 shadow-inner">
                  {renderServiceIcon(selectedService.id, "w-6 h-6")}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full">
                    {selectedService.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-sm hover:bg-white/20 transition-colors"
                title="Kapat"
              >
                ✕
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{selectedService.subtitle}</p>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Tüm Hizmet Kapsamı</div>
                <div className="space-y-2.5">
                  {selectedService.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-black shrink-0">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="dc-btn-outline flex-1 py-2.5 text-xs font-bold text-center"
                >
                  Kapat
                </button>
                <a 
                  href={`https://wa.me/+905437360660?text=${encodeURIComponent(selectedService.whatsappText)}`}
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="dc-btn-primary flex-1 py-2.5 text-xs font-bold text-center"
                >
                  WhatsApp'tan Teklif Al ➜
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 12. PORTFÖY / REFERANSLAR MODALI                                         */}
      {/* ========================================================================= */}
      {showPortfolioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="dc-kicker">AremHub Portföy</span>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A284B]">Tamamlanan Projelerimiz & Referanslar</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">Birlikte başarı hikayesi yazdığımız iş ortaklarımız ve elde ettiğimiz somut sonuçlar</p>
              </div>
              <button 
                onClick={() => setShowPortfolioModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {references.map((r) => (
                <div key={r.id} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 hover:bg-white transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="h-10 w-24 px-2 py-0.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center">
                        <img src={r.logo} alt={r.title} className="max-h-8 max-w-full object-contain filter contrast-105" />
                      </div>
                      <span className="text-[10px] font-black text-[#194077] uppercase bg-blue-50/80 border border-blue-100 px-2 py-0.5 rounded-full">
                        {r.category}
                      </span>
                    </div>

                    <div>
                      <div className="text-base font-black text-[#0A284B]">{r.title}</div>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">{r.scope}</div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {r.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {r.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-bold bg-white text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                    <div className="text-xs text-[#0A284B] font-black bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                      ● {r.result}
                    </div>
                    <a 
                      href={`https://wa.me/+905437360660?text=${encodeURIComponent(`Merhaba AremHub, ${r.title} projenize benzer bir çalışma için teklif almak istiyorum.`)}`}
                      target="_blank" 
                      rel="noreferrer noopener"
                      className="text-xs font-extrabold text-[#194077] hover:text-[#0A284B] hover:underline flex items-center gap-1"
                    >
                      <span>Teklif Al</span>
                      <span>➜</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0A284B] to-[#194077] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-sm font-bold text-white">Sizin markanızı da başarı hikayelerimiz arasına ekleyelim!</div>
                <div className="text-xs text-slate-300">İşletmenize özel büyüme stratejisi ve bütçe planlaması için hemen tanışalım.</div>
              </div>
              <a 
                href="https://wa.me/+905437360660?text=Merhaba%20AremHub,%20portföyünüzü%20inceledim,%20birlikte%20çalışmak%20istiyorum."
                target="_blank" 
                rel="noreferrer noopener"
                className="dc-btn-lime text-xs px-5 py-2.5 whitespace-nowrap shadow-md"
              >
                Hemen Başlayalım ➜
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
