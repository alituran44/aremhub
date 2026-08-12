import React from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  Activity, 
  DollarSign, 
  Users, 
  TrendingUp,
  Server,
  Layers,
  Sparkles
} from 'lucide-react';

export default function Header({ stats }) {
  return (
    <header className="glass-panel" style={{ padding: '20px 28px', marginBottom: '24px', borderRadius: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* Brand & Acronym Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)',
            color: '#FFFFFF',
            fontWeight: '800',
            fontSize: '1.4rem',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em'
          }}>
            AH
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #FFFFFF, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                AremHub
              </h1>
              <a 
                href="https://aremhub.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#60A5FA',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  border: '1px solid rgba(59, 130, 246, 0.25)'
                }}
              >
                aremhub.com <ExternalLink size={12} />
              </a>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <span className="pulse-live"></span> CANLI ÜS
              </span>
            </div>

            {/* AREM Acronym Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
              <span className="badge-arem badge-a" title="Altyapı & Uygulamalar">
                <strong>A</strong> - Altyapı / App
              </span>
              <span className="badge-arem badge-r" title="Reklam & Reach">
                <strong>R</strong> - Reklam / Ads
              </span>
              <span className="badge-arem badge-e" title="Etkileşim & Engagement">
                <strong>E</strong> - Etkileşim / Engagement
              </span>
              <span className="badge-arem badge-m" title="Medya & Marketing">
                <strong>M</strong> - Medya / Marketing
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic', marginLeft: '4px' }}>
                • Dijital Yönetim Üssü
              </span>
            </div>
          </div>
        </div>

        {/* Global Key Metrics Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            padding: '10px 16px',
            borderRadius: '12px',
            minWidth: '130px'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Server size={14} color="#06B6D4" /> Aktif Yazılımlar
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              {stats.activeApps} / {stats.totalApps}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            padding: '10px 16px',
            borderRadius: '12px',
            minWidth: '130px'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <DollarSign size={14} color="#10B981" /> Aylık Ads Harcama
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10B981', marginTop: '2px' }}>
              ₺{stats.monthlyAdsSpend.toLocaleString('tr-TR')}
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            padding: '10px 16px',
            borderRadius: '12px',
            minWidth: '130px'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendingUp size={14} color="#10B981" /> Ort. ROAS
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#10B981', marginTop: '2px' }}>
              {stats.averageRoas}x
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            padding: '10px 16px',
            borderRadius: '12px',
            minWidth: '130px'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} color="#8B5CF6" /> Toplam Erişim
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>
              {stats.totalReach.toLocaleString('tr-TR')}
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
