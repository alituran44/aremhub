import React, { useState } from 'react';
import { 
  Code2, 
  Plus, 
  Search, 
  ExternalLink, 
  Activity, 
  Server, 
  CheckCircle, 
  Clock, 
  RefreshCw,
  Globe,
  Settings,
  Trash2
} from 'lucide-react';

export default function AppHub({ apps, onOpenAppModal, onToggleAppStatus, onDeleteApp }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pingingId, setPingingId] = useState(null);

  const categories = ['All', 'SaaS', 'Web App', 'Mobil App', 'API Service', 'Internal Tool'];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePingTest = (id) => {
    setPingingId(id);
    setTimeout(() => {
      setPingingId(null);
    }, 800);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner for App Hub */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', borderLeft: '4px solid var(--arem-a-main)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-arem badge-a">A Pillar</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#FFF' }}>
                App / Altyapı Üssü (Yazılımlar & SaaS)
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
              Geliştirdiğiniz tüm yazılımların, modüllerin ve servislerin merkezi erişim, performans ve sunucu kontrol paneli.
            </p>
          </div>

          <button className="btn btn-primary" onClick={onOpenAppModal} style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}>
            <Plus size={16} /> Yeni Yazılım Ekle
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: selectedCategory === cat ? '1px solid #06B6D4' : '1px solid var(--border-subtle)',
                background: selectedCategory === cat ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#06B6D4' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat === 'All' ? 'Tüm Projeler' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Yazılım ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* App Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredApps.map(app => (
          <div 
            key={app.id} 
            className="glass-panel" 
            style={{ 
              padding: '20px', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Card Top Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#06B6D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFF' }}>
                      {app.name}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {app.category} • v{app.version}
                    </div>
                  </div>
                </div>

                <span 
                  onClick={() => onToggleAppStatus(app.id)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: app.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: app.status === 'active' ? '#10B981' : '#F59E0B',
                    border: app.status === 'active' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Durumu değiştirmek için tıklayın"
                >
                  <span className="pulse-live" style={{ background: app.status === 'active' ? '#10B981' : '#F59E0B' }}></span>
                  {app.status === 'active' ? 'Aktif' : 'Test/Bakım'}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
                {app.description}
              </p>

              {/* Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                padding: '12px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ping Latency</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: pingingId === app.id ? '#06B6D4' : '#FFF' }}>
                    {pingingId === app.id ? 'Test ediliyor...' : `${app.latency}ms`}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Uptime</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#10B981' }}>
                    {app.uptime}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Kullanıcı/İstek</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#FFF' }}>
                    {app.usersCount}
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => handlePingTest(app.id)}
                  className="btn btn-secondary" 
                  style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                  title="Sunucu ping testi yap"
                >
                  <RefreshCw size={13} className={pingingId === app.id ? 'spin-icon' : ''} /> Healthcheck
                </button>
                <button
                  onClick={() => onDeleteApp(app.id)}
                  className="btn btn-secondary"
                  style={{ padding: '6px 10px', fontSize: '0.75rem', color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.2)' }}
                  title="Sil"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}
              >
                Uygulamayı Aç <ExternalLink size={13} />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
