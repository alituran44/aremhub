import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, X, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LiveSalesToast({ enabled = true }) {
  const { lang } = useLanguage();
  const [currentToast, setCurrentToast] = useState(null);
  const [visible, setVisible] = useState(false);

  const sampleSales = [
    {
      name: 'Ayşe Y. (İstanbul)',
      item: lang === 'tr' ? 'Meta & Google Ads Reklam Yönetimi' : 'Meta & Google Ads Management',
      price: lang === 'tr' ? '₺14.999' : '$499',
      time: lang === 'tr' ? '2 dakika önce' : '2 mins ago',
      badge: 'Ajans Hizmeti'
    },
    {
      name: 'Mehmet K. (Ankara)',
      item: lang === 'tr' ? 'Next.js E-Ticaret SaaS Scripti' : 'Next.js E-Commerce SaaS Script',
      price: lang === 'tr' ? '₺1.499' : '$49',
      time: lang === 'tr' ? '5 dakika önce' : '5 mins ago',
      badge: 'Dijital Ürün'
    },
    {
      name: 'David S. (California, US)',
      item: 'AI SaaS Platform Starter Kit',
      price: '$99.00',
      time: lang === 'tr' ? '8 dakika önce' : '8 mins ago',
      badge: 'Global Sale'
    },
    {
      name: 'Zeynep B. (İzmir)',
      item: lang === 'tr' ? 'Meta Ads Büyüme & Hedef Kitle Kütüphanesi' : 'Meta Ads Audience Growth Library',
      price: lang === 'tr' ? '₺499' : '$19',
      time: lang === 'tr' ? '12 dakika önce' : '12 mins ago',
      badge: 'Canva Kit'
    },
    {
      name: 'Can T. (Bursa)',
      item: lang === 'tr' ? 'Tam Kapsamlı Büyüme Ajansı Paketi' : 'Full Growth Agency Retainer',
      price: lang === 'tr' ? '₺29.999' : '$999',
      time: lang === 'tr' ? '18 dakika önce' : '18 mins ago',
      badge: 'VIP Paket'
    }
  ];

  useEffect(() => {
    if (!enabled) return;

    let index = 0;

    const interval = setInterval(() => {
      setCurrentToast(sampleSales[index]);
      setVisible(true);

      // Auto hide after 5.5 seconds
      setTimeout(() => {
        setVisible(false);
      }, 5500);

      index = (index + 1) % sampleSales.length;
    }, 14000); // Trigger every 14 seconds

    // Initial trigger after 3 seconds
    const initialTimer = setTimeout(() => {
      setCurrentToast(sampleSales[0]);
      setVisible(true);
      setTimeout(() => setVisible(false), 5500);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimer);
    };
  }, [enabled, lang]);

  if (!enabled || !currentToast || !visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        maxWidth: '380px',
        width: 'calc(100vw - 48px)',
        background: 'var(--bg-surface)',
        border: '1.5px solid var(--accent-lime)',
        borderRadius: '16px',
        padding: '16px 18px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
        animation: 'slideUpFade 0.4s ease-out forwards',
        display: 'flex',
        alignItems: 'center',
        gap: '14px'
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'rgba(21, 128, 61, 0.15)',
          color: 'var(--accent-lime)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <ShoppingBag size={22} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: '800' }}>
            {currentToast.name}
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            {currentToast.time}
          </span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {currentToast.item}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--accent-lime)', fontWeight: '900', fontFamily: 'var(--font-display)' }}>
            {currentToast.price}
          </span>
          <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '4px', background: 'var(--bg-elevated)', color: 'var(--text-muted)', border: '1px solid var(--border-strong)', fontWeight: '700' }}>
            {currentToast.badge}
          </span>
        </div>
      </div>

      <button
        onClick={() => setVisible(false)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
