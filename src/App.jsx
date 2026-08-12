import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DigitalStoreSection from './components/DigitalStoreSection';
import ServicesSection from './components/ServicesSection';
import WhyAremHub from './components/WhyAremHub';
import CaseStudiesPortfolio from './components/CaseStudiesPortfolio';
import AboutSection from './components/AboutSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import GrowthGuideSection from './components/GrowthGuideSection';
import AdminPanelStandalone from './components/AdminPanelStandalone';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import LiveSalesToast from './components/LiveSalesToast';
import ProductDetailModal from './components/ProductDetailModal';
import ProductDetailPage from './components/ProductDetailPage';
import CheckoutModal from './components/CheckoutModal';
import SocialAdsHub from './components/SocialAdsHub';
import { LanguageProvider } from './context/LanguageContext';
import { NewAppModal, NewAdModal, NewPostModal, QuoteModal, CalendlyModal, DemoModal, ProductDemoModal, NewProductModal, PrivacyPolicyModal } from './components/Modals';

export default function App() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) return hash;
    }
    return 'social-ads-hub'; // Defaults to Social & Ads Hub
  });
  const [theme, setTheme] = useState('light');
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);
  const [privacyModalState, setPrivacyModalState] = useState({ isOpen: false, tab: 'kvkk' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (typeof window !== 'undefined') {
      window.location.hash = section;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Modals & Pages state
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false);
  const [selectedDemoApp, setSelectedDemoApp] = useState(null);
  
  // Dedicated Full-Page Product Detail & Checkout
  const [selectedProductPage, setSelectedProductPage] = useState(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState(null);
  const [selectedProductForCheckout, setSelectedProductForCheckout] = useState(null);

  const openProductDetailPage = (product) => {
    setSelectedProductPage(product);
    setActiveSection('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const defaultProducts = [
    {
      id: 2001,
      title: 'Restoran & Kafeler İçin 100+ Canva Sosyal Medya Kiti',
      category: 'Sektörel Sosyal Medya Kitleri',
      categorySlug: 'social-kits',
      price: '₺299',
      priceFormatted: '₺299',
      demoUrl: 'https://demo.aremhub.com/canva-restoran',
      status: 'active',
      badgeLabel: '⚡ Anında İndir',
      rating: '4.9 ★ (84 Yorum)',
      description: 'Menü tanıtımları, indirim duyuruları ve yüksek etkileşimli Reels kapakları içeren tam düzenlenebilir Canva post kiti.',
      features: [
        '100+ Hazır Canva Görsel & Post Şablonu',
        'Sektörel Hikaye (Story) & Reels Kapakları',
        'Tek Tıkla Canva Hesabınıza Aktarım',
        'Açıklama Metinleri & İlgili Hashtag Rehberi'
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80'
      ],
      techStack: ['Canva', 'Instagram', 'Story', 'Reels'],
      accentColor: 'var(--accent-lime)',
      viewsCount: '1.5k',
      salesCount: '12',
      demoUserEmail: 'musteri@aremhub.com',
      demoUserPassword: 'user123',
      demoAdminEmail: 'admin@aremhub.com',
      demoAdminPassword: 'canva-admin-2026'
    },
    {
      id: 2002,
      title: 'Meta Ads Hedef Kitle Kütüphanesi & AI Prompt Kiti',
      category: 'Reklam & AI Prompt Paketleri',
      categorySlug: 'ads-prompts',
      price: '₺199',
      priceFormatted: '₺199',
      demoUrl: 'https://demo.aremhub.com/meta-ads-library',
      status: 'active',
      badgeLabel: '⚡ Anında İndir',
      rating: '4.8 ★ (112 Yorum)',
      description: '50+ farklı sektör için test edilmiş hassas Meta Ads hedef kitle kombinasyonları ve Midjourney reklam görseli prompt paketleri.',
      features: [
        '50+ Sektörel Meta Ads Hedef Kitle Haritası',
        'Midjourney & ChatGPT Reklam Görseli Promptları',
        'Tıklama Başı Maliyet (CPC) Düşürme Taktikleri',
        'PDF & Notion Formatında Anında E-Postada'
      ],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&w=1200&q=80'
      ],
      techStack: ['Meta Ads', 'Midjourney', 'ChatGPT', 'PDF'],
      accentColor: 'var(--accent-cyan)',
      viewsCount: '2.1k',
      salesCount: '24',
      demoUserEmail: 'musteri@aremhub.com',
      demoUserPassword: 'user123',
      demoAdminEmail: 'admin@aremhub.com',
      demoAdminPassword: 'meta-admin-2026'
    },
    {
      id: 2003,
      title: 'Notion Ajans & İşletme Müşteri Takip (CRM) Dashboard',
      category: 'Yönetim & CRM Şablonları',
      categorySlug: 'crm-templates',
      price: '₺349',
      priceFormatted: '₺349',
      demoUrl: 'https://demo.aremhub.com/notion-crm-agency',
      status: 'active',
      badgeLabel: '⚡ Anında İndir',
      rating: '5.0 ★ (45 Yorum)',
      description: 'Müşteri teklifleri, içerik takvimleri, ödeme vadeleri ve proje durumlarını tek ekrandan yönetebileceğiniz hazır Notion paneli.',
      features: [
        'Otomatik Proje & Görev Takip Kanalları',
        'Fatura, Sözleşme & Ödeme Takip Veritabanı',
        'Müşteri Onaylı İçerik Yayınlama Takvimi',
        'Notion Hesabınıza Tek Tıkla Kopyalama'
      ],
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'
      ],
      techStack: ['Notion', 'Google Sheets', 'CRM', 'Dashboard'],
      accentColor: 'var(--accent-violet)',
      viewsCount: '1.8k',
      salesCount: '19',
      demoUserEmail: 'musteri@aremhub.com',
      demoUserPassword: 'user123',
      demoAdminEmail: 'admin@aremhub.com',
      demoAdminPassword: 'notion-admin-2026'
    },
    {
      id: 2004,
      title: 'Next.js 14 Ultra Hızlı Kurumsal Firma & SaaS Scripti',
      category: 'Yazılım & Lisans Paketleri',
      categorySlug: 'software-licenses',
      price: '₺1.499',
      priceFormatted: '₺1.499',
      demoUrl: 'https://demo.aremhub.com/nextjs-saas-script',
      status: 'active',
      badgeLabel: '💻 Açık Kaynak',
      rating: '5.0 ★ (28 Yorum)',
      description: 'Lighthouse 98+ puanlı, SEO uyumlu, PayTR/İyzico ve Stripe entegrasyonu hazır kurumsal React/Next.js kaynak kod paketi.',
      features: [
        'Next.js 14 App Router + Tailwind CSS Mimarisi',
        'PayTR, İyzico ve Stripe Ödeme Altyapısı Entegre',
        'SEO Optimizasyonu & Dinamik Sitemap Oluşturucu',
        'Sınırsız Lisans & Ömür Boyu Güncelleme Garantisi'
      ],
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      screenshots: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80'
      ],
      techStack: ['Next.js', 'React', 'Tailwind CSS', 'PayTR'],
      accentColor: '#0284C7',
      viewsCount: '3.4k',
      salesCount: '41',
      demoUserEmail: 'musteri@aremhub.com',
      demoUserPassword: 'user123',
      demoAdminEmail: 'admin@aremhub.com',
      demoAdminPassword: 'nextjs-admin-2026'
    }
  ];

  // Digital Store Products State with localStorage Persistence
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_store_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return defaultProducts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_store_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
  }, [products]);

  const handleSaveProduct = (savedProduct) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === savedProduct.id);
      if (exists) {
        return prev.map(p => p.id === savedProduct.id ? savedProduct : p);
      }
      return [savedProduct, ...prev];
    });
    setEditingProduct(null);
    setIsNewProductModalOpen(false);
  };

  const handleResetProducts = () => {
    if (window.confirm('Tüm dijital ürünleri orijinal varsayılan hallerine sıfırlamak istediğinize emin misiniz?')) {
      setProducts(defaultProducts);
      localStorage.removeItem('aremhub_store_products');
    }
  };

  // Apps State
  const [apps, setApps] = useState([
    { id: 1, name: 'Acme Holding E-Ticaret', category: 'E-Ticaret Platformu', version: '2.4.0', status: 'Aktif', latency: 42, url: 'https://aremhub.com' },
    { id: 2, name: 'TechCorp Kurumsal', category: 'SaaS Platformu', version: '1.8.2', status: 'Aktif', latency: 38, url: 'https://aremhub.com' }
  ]);

  return (
    <LanguageProvider>
      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        color: 'var(--text-main)',
        fontFamily: 'var(--font-sans)',
        transition: 'background 0.3s ease, color 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        
        {/* Sticky Announcement Bar */}
        <AnnouncementBar 
          onOpenStore={() => setActiveSection('digital-store')} 
          onClose={() => setIsAnnouncementVisible(false)}
        />

        {/* Global Page Wrapper - Compact Enterprise Container */}
        <div style={{ width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          
          {/* Header Navigation with Hover Mega-Menu Dropdown */}
          <Navbar 
            activeSection={activeSection} 
            setActiveSection={handleSectionChange}
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            theme={theme}
            toggleTheme={toggleTheme}
            products={products}
            onSelectProductDemo={(prod) => openProductDetailPage(prod)}
            isAnnouncementVisible={isAnnouncementVisible}
          />

          {/* Dynamic Section Routing */}
          <main style={{ width: '100%' }}>
            
            {activeSection === 'hero' && (
              <>
                <SocialAdsHub 
                  onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                  onOpenStore={() => setActiveSection('digital-store')}
                />
                <Hero 
                  onOpenQuoteModal={() => setIsQuoteModalOpen(true)} 
                  onOpenStore={() => setActiveSection('digital-store')} 
                  setActiveSection={setActiveSection}
                />
                <ServicesSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
                <WhyAremHub />
                <CaseStudiesPortfolio apps={apps} />
                <AboutSection />
                <FAQSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
                <ContactSection 
                  onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                  onOpenCalendlyModal={() => setIsCalendlyModalOpen(true)}
                />
                <GrowthGuideSection />
              </>
            )}

            {activeSection === 'digital-store' && (
              <DigitalStoreSection
                products={products}
                onSelectProductDemo={(prod) => openProductDetailPage(prod)}
                onBuyProduct={(prod) => setSelectedProductForCheckout(prod)}
              />
            )}

            {activeSection === 'social-ads-hub' && (
              <SocialAdsHub 
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                onOpenStore={() => setActiveSection('digital-store')}
              />
            )}

            {activeSection === 'product-detail' && selectedProductPage && (
              <ProductDetailPage
                product={selectedProductPage}
                onBack={() => setActiveSection('digital-store')}
                onBuyNow={(prod) => setSelectedProductForCheckout(prod)}
              />
            )}

            {activeSection === 'services' && (
              <ServicesSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
            )}

            {activeSection === 'portfolio' && (
              <CaseStudiesPortfolio apps={apps} />
            )}

            {activeSection === 'contact' && (
              <ContactSection 
                onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                onOpenCalendlyModal={() => setIsCalendlyModalOpen(true)}
              />
            )}

            {activeSection === 'admin-panel' && (
              <AdminPanelStandalone
                products={products}
                apps={apps}
                ads={[]}
                socialPosts={[]}
                channels={[]}
                onOpenAddProductModal={() => {
                  setEditingProduct(null);
                  setIsNewProductModalOpen(true);
                }}
                onEditProduct={(prod) => {
                  setEditingProduct(prod);
                  setIsNewProductModalOpen(true);
                }}
                onToggleProductStatus={(id) => setProducts(products.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p))}
                onDeleteProduct={(id) => setProducts(products.filter(p => p.id !== id))}
                onResetProducts={handleResetProducts}
                onOpenAppModal={() => setIsAppModalOpen(true)}
                onToggleAppStatus={() => {}}
                onDeleteApp={() => {}}
                onOpenAdModal={() => {}}
                onToggleAdStatus={() => {}}
                onDeleteAd={() => {}}
                onOpenPostModal={() => {}}
                onDeletePost={() => {}}
                onPublishPost={() => {}}
              />
            )}

          </main>

          {/* Footer */}
          <Footer 
            setActiveSection={setActiveSection} 
            onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
            onOpenPrivacyModal={(tab) => setPrivacyModalState({ isOpen: true, tab })}
          />

        </div>

        {/* Sol Alt Canlı Satın Alma Popup Toast'ı */}
        <LiveSalesToast enabled={true} />

        {/* ugilabs 1:1 Product Detail Modal */}
        {selectedProductForDetail && (
          <ProductDetailModal
            product={selectedProductForDetail}
            onClose={() => setSelectedProductForDetail(null)}
            onBuyNow={(prod) => {
              setSelectedProductForDetail(null);
              setSelectedProductForCheckout(prod);
            }}
          />
        )}

        {/* Multi-Gateway Checkout Modal */}
        {selectedProductForCheckout && (
          <CheckoutModal
            product={selectedProductForCheckout}
            onClose={() => setSelectedProductForCheckout(null)}
          />
        )}

        {/* New / Edit Product Modal */}
        {(isNewProductModalOpen || editingProduct) && (
          <NewProductModal
            isOpen={true}
            initialProduct={editingProduct}
            onClose={() => {
              setIsNewProductModalOpen(false);
              setEditingProduct(null);
            }}
            onAddProduct={handleSaveProduct}
          />
        )}

        {/* Legal Privacy Policy & KVKK Modal */}
        {privacyModalState.isOpen && (
          <PrivacyPolicyModal
            isOpen={true}
            initialTab={privacyModalState.tab}
            onClose={() => setPrivacyModalState({ isOpen: false, tab: 'kvkk' })}
          />
        )}

        {/* Other Action Modals */}
        {isQuoteModalOpen && <QuoteModal onClose={() => setIsQuoteModalOpen(false)} />}
        {isCalendlyModalOpen && <CalendlyModal onClose={() => setIsCalendlyModalOpen(false)} />}

      </div>
    </LanguageProvider>
  );
}
