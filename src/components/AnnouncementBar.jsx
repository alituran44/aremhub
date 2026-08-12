import React, { useState } from 'react';
import { Tag, ArrowRight, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AnnouncementBar({ onOpenStore, onClose }) {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div
      style={{
        width: '100%',
        background: 'linear-gradient(90deg, #15803D 0%, #16A34A 50%, #0284C7 100%)',
        color: '#FFFFFF',
        padding: '8px 16px',
        fontSize: '0.86rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1001,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transition: 'all 0.3s ease'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.2)', padding: '2px 10px', borderRadius: '12px', fontSize: '0.78rem' }}>
          <Sparkles size={13} /> {t.announcement.promoText}
        </span>

        <button
          onClick={onOpenStore}
          style={{
            background: '#FFFFFF',
            color: '#15803D',
            border: 'none',
            padding: '3px 12px',
            borderRadius: '12px',
            fontSize: '0.78rem',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'transform 0.2s ease'
          }}
        >
          {t.announcement.useBtn}
        </button>
      </div>

      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          right: '16px',
          background: 'none',
          border: 'none',
          color: '#FFFFFF',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.8
        }}
        aria-label="İndirim çubuğunu kapat"
      >
        <X size={16} />
      </button>
    </div>
  );
}
