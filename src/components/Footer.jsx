import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Zap, Heart } from 'lucide-react';
import AremHubLogo from './AremHubLogo';

export default function Footer({ setActiveSection, onOpenQuoteModal, onOpenPrivacyModal }) {
  return (
    <footer style={{
      marginTop: '80px',
      padding: '48px 36px 32px',
      borderRadius: '24px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--shadow-xl)',
      position: 'relative',
      zIndex: 10
    }}>
      
      {/* Top Footer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: '36px', marginBottom: '36px' }}>
        
        {/* Brand Info */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <AremHubLogo size="md" />
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '420px', marginBottom: '16px' }}>
            Büyüme odaklı web yazılımları, Meta & Google Ads performans pazarlaması ve anında indirilebilir hazır dijital şablonlar.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="var(--accent-lime)" /> %99.99 Uptime
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={14} color="var(--accent-lime)" /> Lighthouse 90+ Hız
            </span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '700', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Hızlı Bağlantılar
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
            <button onClick={() => setActiveSection('hero')} style={linkStyle}>Ana Sayfa</button>
            <button onClick={() => setActiveSection('digital-store')} style={linkStyle}>Mağaza & Şablonlar 🛒</button>
            <button onClick={() => setActiveSection('services')} style={linkStyle}>Hizmetlerimiz</button>
            <button onClick={() => setActiveSection('portfolio')} style={linkStyle}>Vaka Analizleri (Case Studies)</button>
            <button onClick={() => setActiveSection('contact')} style={linkStyle}>İletişim & Teklif Al</button>
            <button onClick={() => setActiveSection('admin-panel')} style={{ ...linkStyle, color: 'var(--accent-lime)', fontWeight: '700' }}>Ajans Paneli ⚡</button>
          </div>
        </div>

        {/* Contact Details */}
        <div>
          <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '700', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Kurumsal İletişim
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} color="var(--accent-lime)" />
              <a href="mailto:bilgi@aremhub.com" style={{ color: 'var(--text-main)', fontWeight: '600', textDecoration: 'none' }}>bilgi@aremhub.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} color="var(--accent-lime)" />
              <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>+90 (850) 885 00 00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} color="var(--accent-lime)" />
              <span style={{ color: 'var(--text-muted)' }}>Levent Plaza, Maslak / İstanbul</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Sub-Footer Bar */}
      <div style={{
        paddingTop: '20px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        fontSize: '0.8rem',
        color: 'var(--text-dim)'
      }}>
        <div>
          © 2026 <strong>aremhub</strong>. Tüm hakları saklıdır.
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => onOpenPrivacyModal && onOpenPrivacyModal('privacy')} style={{ ...linkStyle, fontSize: '0.8rem' }}>Gizlilik Politikası</button>
          <button onClick={() => onOpenPrivacyModal && onOpenPrivacyModal('terms')} style={{ ...linkStyle, fontSize: '0.8rem' }}>Kullanım Koşulları</button>
          <button onClick={() => onOpenPrivacyModal && onOpenPrivacyModal('kvkk')} style={{ ...linkStyle, fontSize: '0.8rem' }}>KVKK Metni</button>
        </div>
      </div>

    </footer>
  );
}

const linkStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-muted)',
  textAlign: 'left',
  cursor: 'pointer',
  padding: 0,
  fontSize: '0.86rem',
  fontWeight: '500',
  transition: 'color 0.2s ease'
};
