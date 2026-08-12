import React from 'react';
import { 
  Code2, 
  Target, 
  Share2, 
  Image, 
  ArrowUpRight, 
  Plus, 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Zap,
  Globe,
  BarChart3
} from 'lucide-react';

export default function OverviewDashboard({ 
  apps, 
  ads, 
  socialPosts, 
  mediaAssets, 
  onOpenAppModal, 
  onOpenAdModal, 
  onOpenPostModal,
  setActiveTab 
}) {
  const activeAppsCount = apps.filter(a => a.status === 'active').length;
  const totalSpend = ads.reduce((acc, curr) => acc + curr.budgetSpent, 0);
  const avgRoas = (ads.reduce((acc, curr) => acc + curr.roas, 0) / (ads.length || 1)).toFixed(2);
  const totalClicks = ads.reduce((acc, curr) => acc + curr.clicks, 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Welcome & Quick Action Bar */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFF' }}>
              AremHub Dijital Üssü'ne Hoş Geldiniz ⚡
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
              Tüm yazılımlarınız, reklam harcamalarınız ve sosyal medya etkileşimleriniz tek ekranda senkronize.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onOpenAppModal} style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}>
              <Plus size={16} /> Yeni Yazılım Ekle
            </button>
            <button className="btn btn-secondary" onClick={onOpenAdModal} style={{ borderColor: 'var(--arem-r-main)', color: '#10B981' }}>
              <Plus size={16} /> Ads Kampanyası Oluştur
            </button>
            <button className="btn btn-secondary" onClick={onOpenPostModal} style={{ borderColor: 'var(--arem-e-main)', color: '#C084FC' }}>
              <Plus size={16} /> Gönderi Planla
            </button>
          </div>
        </div>
      </div>

      {/* 4 AREM Pillars Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
        
        {/* A - App Pillar */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--arem-a-main)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="badge-arem badge-a">A - App / Altyapı</span>
            <Code2 size={22} color="var(--arem-a-main)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFF', fontFamily: 'var(--font-display)' }}>
            {activeAppsCount} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>/ {apps.length} Aktif Proje</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Tüm servislerin sunucu erişilebilirliği %99.98 uptime seviyesinde.
          </p>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#06B6D4', fontWeight: '600' }}>Canlı API Monitörü</span>
            <button onClick={() => setActiveTab('app-hub')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
              İncele <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* R - Reach / Ads Pillar */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--arem-r-main)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="badge-arem badge-r">R - Reklam / Ads</span>
            <Target size={22} color="var(--arem-r-main)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981', fontFamily: 'var(--font-display)' }}>
            ₺{totalSpend.toLocaleString('tr-TR')}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px', display: 'flex', gap: '12px' }}>
            <span>ROAS: <strong style={{ color: '#10B981' }}>{avgRoas}x</strong></span>
            <span>Tıklama: <strong style={{ color: '#FFF' }}>{totalClicks.toLocaleString('tr-TR')}</strong></span>
          </div>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: '600' }}>Meta & Google Ads</span>
            <button onClick={() => setActiveTab('ads-hub')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
              İncele <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* E - Engagement Pillar */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--arem-e-main)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="badge-arem badge-e">E - Etkileşim</span>
            <Share2 size={22} color="var(--arem-e-main)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFF', fontFamily: 'var(--font-display)' }}>
            {socialPosts.length} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>Planlı Gönderi</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Instagram, LinkedIn, X & YouTube kanallarında aktif paylaşım takvimi.
          </p>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#8B5CF6', fontWeight: '600' }}>Sosyal Takvim</span>
            <button onClick={() => setActiveTab('social-hub')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
              İncele <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        {/* M - Marketing Pillar */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'var(--arem-m-main)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span className="badge-arem badge-m">M - Medya</span>
            <Image size={22} color="var(--arem-m-main)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFF', fontFamily: 'var(--font-display)' }}>
            {mediaAssets.length} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>Kütüphane Varlığı</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
            Grafik, video materyalleri ve reklam kreatif deposu.
          </p>
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: '#F43F5E', fontWeight: '600' }}>Stüdyo & Varlıklar</span>
            <button onClick={() => setActiveTab('media-hub')} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
              İncele <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Highlights Grid: Active Apps & Active Campaigns Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        
        {/* Apps Snapshot */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} color="#06B6D4" /> Canlı Yazılım Projeleriniz
            </h3>
            <button className="btn btn-secondary" onClick={() => setActiveTab('app-hub')} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Tümünü Gör
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {apps.slice(0, 4).map((app) => (
              <div key={app.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: '#06B6D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '0.9rem'
                  }}>
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#FFF' }}>{app.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.category} • v{app.version}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    background: app.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: app.status === 'active' ? '#10B981' : '#F59E0B',
                    fontWeight: '600'
                  }}>
                    {app.status === 'active' ? '● Canlı' : '● Test'}
                  </span>
                  <a href={app.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', hover: { color: '#FFF' } }}>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ads Campaigns Snapshot */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="#10B981" /> Aktif Ads Kampanyaları
            </h3>
            <button className="btn btn-secondary" onClick={() => setActiveTab('ads-hub')} style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              Tümünü Gör
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ads.slice(0, 4).map((ad) => (
              <div key={ad.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)'
              }}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {ad.platform === 'Meta Ads' ? '📸' : '🔍'} {ad.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {ad.platform} • Harcanan: ₺{ad.budgetSpent.toLocaleString('tr-TR')}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#10B981' }}>
                    {ad.roas}x ROAS
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {ad.conversions} Dönüşüm
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
