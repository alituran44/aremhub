import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, ShoppingCart, Zap, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NotificationBell() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: 'sale',
      title: lang === 'tr' ? '🔥 YENİ ÜRÜN YAYINDA!' : '🔥 NEW PRODUCT LAUNCHED!',
      desc: lang === 'tr' ? 'Next.js E-Ticaret SaaS Scripti v2.4 satışta! Hoşgeldin indirimi ile hemen incele.' : 'Next.js E-Commerce SaaS Script v2.4 live! Check out with launch discount.',
      time: lang === 'tr' ? '1 saat önce' : '1 hr ago',
      badge: '%20 İndirim'
    },
    {
      id: 2,
      type: 'case',
      title: lang === 'tr' ? '📈 BAŞARI HİKAYESİ: 4.8x ROAS' : '📈 CASE STUDY: 4.8x ROAS',
      desc: lang === 'tr' ? 'Acme Holding Meta CAPI entegrasyonu sonrası reklam cirosu %180 arttı.' : 'Acme Holding Meta CAPI integration yielded 180% revenue boost.',
      time: lang === 'tr' ? '3 saat önce' : '3 hrs ago',
      badge: 'Vaka Analizi'
    }
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        className="btn-editorial"
        aria-label={lang === 'tr' ? 'Bildirimler (2 Okunmamış Duyuru)' : 'Notifications (2 Unread Updates)'}
        style={{
          padding: '8px 12px',
          fontSize: '0.85rem',
          position: 'relative',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-strong)',
          borderRadius: '10px'
        }}
      >
        <Bell size={18} color="var(--text-main)" />
        <span
          style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            background: '#DC2626',
            color: '#FFFFFF',
            fontSize: '0.65rem',
            fontWeight: '900',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          2
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 8px)',
            width: '340px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              {lang === 'tr' ? 'Duyuru & Bildirimler' : 'Notifications & Updates'}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-lime)', fontWeight: '800' }}>
              2 {lang === 'tr' ? 'Yeni' : 'New'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', divideY: '1px solid var(--border-subtle)' }}>
            {notifications.map(n => (
              <div key={n.id} style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-main)' }}>{n.title}</span>
                  <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: 'rgba(21, 128, 61, 0.15)', color: 'var(--accent-lime)', fontWeight: '800' }}>
                    {n.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: '4px 0', fontWeight: '500' }}>
                  {n.desc}
                </p>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px', fontWeight: '600' }}>
                  {n.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
