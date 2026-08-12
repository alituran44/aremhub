import React, { useState } from 'react';
import { 
  Code2, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Activity, 
  Server, 
  Layers, 
  Zap, 
  Globe, 
  Search,
  Maximize2
} from 'lucide-react';

export default function SoftwareShowcase({ apps, onOpenDemoModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'SaaS', 'Web App', 'Mobil App', 'API Service', 'Internal Tool'];

  const filteredApps = apps.filter(app => {
    const matchesCat = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', borderLeft: '4px solid var(--arem-a-main)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="badge badge-a">AremHub Portföyü</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '6px' }}>
              Geliştirilen Tüm Yazılımlar & Web Uygulamaları
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '700px' }}>
              AremHub mimarisinde geliştirdiğimiz SaaS çözümleri, API servisleri ve mobil uygulamaların detaylı yetenekleri ve canlı demoları.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', padding: '6px 14px', borderRadius: '16px', background: 'rgba(6, 182, 212, 0.15)', color: '#06B6D4', fontWeight: '700' }}>
              {apps.length} Aktif Proje
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: selectedCategory === cat ? '1px solid #06B6D4' : '1px solid var(--border-subtle)',
                background: selectedCategory === cat ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#06B6D4' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {cat === 'All' ? 'Tüm Projeler' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Proje veya teknoloji ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* Software Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
        {filteredApps.map(app => (
          <div key={app.id} className="glass-card" style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Top Row: Icon + Name + Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#06B6D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: '#FFF', fontWeight: '800' }}>{app.name}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {app.category} • v{app.version}
                    </div>
                  </div>
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: app.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: app.status === 'active' ? '#10B981' : '#F59E0B',
                  border: app.status === 'active' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                  fontWeight: '600'
                }}>
                  {app.status === 'active' ? '● Canlı' : '● Bakımda'}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
                {app.description}
              </p>

              {/* Technical Features & Capabilities */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.75rem', color: '#06B6D4', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Öne Çıkan Yetenekler:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(app.features || [
                    'Otomatik veri senkronizasyonu ve webhook desteği',
                    'Uptime %99.99 erişilebilirlik ve 18ms latency',
                    'B2B entegrasyon ve güvenli OAuth2 kimlik doğrulama'
                  ]).map((feat, fidx) => (
                    <div key={fidx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#E2E8F0' }}>
                      <CheckCircle2 size={14} color="#06B6D4" /> {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {(app.techStack || ['React', 'Node.js', 'Vite', 'PostgreSQL']).map(tech => (
                  <span key={tech} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--text-muted)', border: '1px solid var(--border-subtle)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Footer Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <button 
                onClick={() => onOpenDemoModal(app)}
                className="btn btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.82rem' }}
              >
                <Maximize2 size={14} color="#06B6D4" /> Canlı Demoyu Başlat
              </button>

              <a
                href={app.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '8px 14px', fontSize: '0.82rem', background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}
              >
                Uygulama Linki <ExternalLink size={14} />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
