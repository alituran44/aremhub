import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Code2, 
  Target, 
  Share2, 
  HelpCircle, 
  MessageSquare, 
  Sparkles,
  Sun,
  Moon,
  Lock,
  Globe,
  Menu,
  X
} from 'lucide-react';
import AremHubLogo from './AremHubLogo';
import NotificationBell from './NotificationBell';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeSection, setActiveSection, onOpenQuoteModal, theme, toggleTheme, products, onSelectProductDemo, isAnnouncementVisible = true }) {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const dropdownTimeoutRef = React.useRef(null);

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    setIsStoreDropdownOpen(false);
  };

  const handleMouseEnterStore = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsStoreDropdownOpen(true);
  };

  const handleMouseLeaveStore = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsStoreDropdownOpen(false);
    }, 250);
  };

  return (
    <header style={{
      position: 'sticky',
      top: isAnnouncementVisible ? '48px' : '16px',
      zIndex: 100,
      marginBottom: '32px',
      width: '100%',
      transition: 'top 0.3s ease'
    }}>
      <div style={{
        position: 'relative',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: '22px',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-xl)',
        backdropFilter: 'blur(16px)',
        gap: '12px',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')}
          style={{ cursor: 'pointer', flexShrink: 0 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('hero')}
          aria-label="AremHub Ana Sayfaya Git"
        >
          <AremHubLogo size="md" />
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="nav-desktop-links" aria-label="Ana Navigasyon" style={{ display: 'flex', gap: '3px', flexWrap: 'nowrap', alignItems: 'center', flexShrink: 0 }}>
          <button
            onClick={() => handleNavClick('hero')}
            style={activeSection === 'hero' ? activeNavStyle : navStyle}
          >
            {t.nav.home}
          </button>

          {/* Hover Mega-Menu Dropdown Trigger for Digital Store */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnterStore}
            onMouseLeave={handleMouseLeaveStore}
          >
            <button
              onClick={() => handleNavClick('digital-store')}
              style={activeSection === 'digital-store' ? activeNavStyle : navStyle}
              aria-expanded={isStoreDropdownOpen}
              aria-haspopup="true"
            >
              <ShoppingBag size={14} aria-hidden="true" /> Mağaza
            </button>

            {/* Hover Mega-Menu Dropdown (Spacious 680px Width) */}
            {isStoreDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  paddingTop: '10px',
                  zIndex: 1000
                }}
              >
                <div 
                  className="animate-fade-in-up"
                  style={{
                    width: '680px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(24px)'
                  }}
                >
                  {/* Dropdown Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShoppingBag size={17} color="var(--accent-lime)" /> Hazır Dijital Ürünler & Şablon Kataloğu
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        Tüm onaylı şablonlar, Reels kitleri ve yazılımlar anında e-posta teslimatlıdır.
                      </div>
                    </div>
                    <span className="stat-pill stat-lime" style={{ fontSize: '0.75rem', flexShrink: 0 }}>
                      {products?.length || 4} Aktif Paket
                    </span>
                  </div>

                  {/* Products Grid inside Dropdown (2 Columns x 2 Rows, Spacious 320px Cards) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                    {(products || []).slice(0, 4).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setIsStoreDropdownOpen(false);
                          if (onSelectProductDemo) {
                            onSelectProductDemo(product);
                          } else {
                            handleNavClick('digital-store');
                          }
                        }}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start',
                          padding: '12px',
                          borderRadius: '14px',
                          background: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        className="store-dropdown-item"
                      >
                        <div style={{ width: '72px', height: '48px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#000', border: '1px solid var(--border-subtle)' }}>
                          <img src={product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--accent-lime)', fontWeight: '800', marginBottom: '2px' }}>
                            {product.category}
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.35', marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {product.title}
                          </div>
                          <div style={{ fontSize: '0.88rem', fontWeight: '900', color: 'var(--accent-lime)', fontFamily: 'var(--font-display)' }}>
                            {product.priceFormatted}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dropdown Footer CTA */}
                  <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <button
                      onClick={() => {
                        setIsStoreDropdownOpen(false);
                        handleNavClick('digital-store');
                      }}
                      className="btn-editorial btn-lime"
                      style={{ width: '100%', justifyContent: 'center', padding: '11px 20px', fontSize: '0.88rem' }}
                    >
                      🛍️ Tüm Dijital Mağazayı Gör & Şablonları İncele ({products?.length || 4} Ürün) ↗
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('social-ads-hub')}
            style={activeSection === 'social-ads-hub' ? activeNavStyle : navStyle}
          >
            <Share2 size={14} aria-hidden="true" /> Reklam & Sosyal
          </button>

          <button
            onClick={() => handleNavClick('services')}
            style={activeSection === 'services' ? activeNavStyle : navStyle}
          >
            Hizmetler
          </button>

          <button
            onClick={() => handleNavClick('portfolio')}
            style={activeSection === 'portfolio' ? activeNavStyle : navStyle}
          >
            Portföy
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            style={activeSection === 'contact' ? activeNavStyle : navStyle}
          >
            İletişim
          </button>
        </nav>

        {/* Right Actions: TR/EN Switch, Notification Bell, Theme Switcher & Admin Panel Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          
          {/* TR / EN Language Switcher Pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-strong)', background: 'var(--bg-elevated)', padding: '2px', flexShrink: 0 }}>
            <button
              onClick={() => lang !== 'tr' && toggleLanguage()}
              aria-label="Türkçe Diline Geç"
              style={{
                background: lang === 'tr' ? 'var(--accent-lime)' : 'transparent',
                color: lang === 'tr' ? '#FFF' : 'var(--text-muted)',
                border: 'none',
                padding: '3px 7px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              TR
            </button>
            <button
              onClick={() => lang !== 'en' && toggleLanguage()}
              aria-label="Switch to English Language"
              style={{
                background: lang === 'en' ? '#0284C7' : 'transparent',
                color: lang === 'en' ? '#FFF' : 'var(--text-muted)',
                border: 'none',
                padding: '3px 7px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              EN
            </button>
          </div>

          {/* Notification Bell */}
          <NotificationBell />

          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="btn-editorial btn-outline-editorial"
            style={{ padding: '7px 10px', fontSize: '0.78rem', gap: '4px', flexShrink: 0 }}
            title="Tema Değiştir (Aydınlık / Karanlık)"
            aria-label={`Temayı Değiştir (Şu an: ${theme === 'light' ? 'Aydınlık' : 'Karanlık'})`}
          >
            {theme === 'light' ? (
              <Moon size={15} color="#6D28D9" aria-hidden="true" />
            ) : (
              <Sun size={15} color="#F59E0B" aria-hidden="true" />
            )}
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={() => handleNavClick('admin-panel')}
            className="btn-editorial"
            aria-label="Yönetici Paneline Giriş Yap"
            style={{
              padding: '7px 12px',
              fontSize: '0.78rem',
              background: activeSection === 'admin-panel' ? 'var(--accent-lime)' : 'var(--bg-elevated)',
              color: activeSection === 'admin-panel' ? '#FFF' : 'var(--text-main)',
              border: '1px solid var(--border-strong)',
              gap: '5px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Lock size={13} aria-hidden="true" /> {t.nav.admin} ⚡
          </button>

          {/* Primary Quick Quote Action */}
          <button
            onClick={onOpenQuoteModal}
            className="btn-editorial btn-lime"
            aria-label="Hızlı Teklif Al Formunu Aç"
            style={{ padding: '8px 15px', fontSize: '0.82rem', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            <Sparkles size={14} aria-hidden="true" /> {t.nav.quoteBtn}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="nav-mobile-toggle btn-editorial btn-outline-editorial"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Menüyü Kapat" : "Mobil Menüyü Aç"}
            style={{ padding: '8px 10px', borderRadius: '10px' }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="nav-mobile-drawer" style={{
          marginTop: '10px',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: 'var(--shadow-xl)',
          backdropFilter: 'blur(16px)'
        }}>
          <button onClick={() => handleNavClick('hero')} style={activeSection === 'hero' ? activeNavStyle : navStyle}>
            {t.nav.home}
          </button>
          <button onClick={() => handleNavClick('digital-store')} style={activeSection === 'digital-store' ? activeNavStyle : navStyle}>
            <ShoppingBag size={14} /> {t.nav.store}
          </button>
          <button onClick={() => handleNavClick('social-ads-hub')} style={activeSection === 'social-ads-hub' ? activeNavStyle : navStyle}>
            <Share2 size={14} /> Sosyal & Reklam Paneli 🚀
          </button>
          <button onClick={() => handleNavClick('services')} style={activeSection === 'services' ? activeNavStyle : navStyle}>
            {t.nav.services}
          </button>
          <button onClick={() => handleNavClick('portfolio')} style={activeSection === 'portfolio' ? activeNavStyle : navStyle}>
            {t.nav.portfolio}
          </button>
          <button onClick={() => handleNavClick('contact')} style={activeSection === 'contact' ? activeNavStyle : navStyle}>
            {t.nav.contact}
          </button>
          <button 
            onClick={() => handleNavClick('admin-panel')} 
            style={{ 
              ...navStyle, 
              background: 'var(--bg-elevated)', 
              color: 'var(--accent-lime)', 
              fontWeight: '800',
              border: '1px solid var(--border-strong)',
              justifyContent: 'center',
              padding: '10px'
            }}
          >
            <Lock size={15} /> Ajans & Yönetici Paneline Giriş ⚡
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenQuoteModal();
            }} 
            className="btn-editorial btn-lime" 
            style={{ justifyContent: 'center', padding: '11px', fontSize: '0.88rem' }}
          >
            <Sparkles size={16} /> {t.nav.quoteBtn}
          </button>
        </div>
      )}
    </header>
  );
}

const navStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  fontSize: '0.84rem',
  fontWeight: '700',
  padding: '7px 12px',
  borderRadius: '10px',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease',
  fontFamily: 'var(--font-display)'
};

const activeNavStyle = {
  ...navStyle,
  background: 'var(--bg-elevated)',
  color: 'var(--accent-lime)',
  border: '1px solid var(--border-strong)'
};
