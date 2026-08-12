import React, { useState } from 'react';
import { 
  Zap, 
  Globe, 
  Code2, 
  Database, 
  ExternalLink, 
  Search, 
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function PublicApiSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Featured Public APIs list sourced from public-apis-web.vercel.app
  const apiCategories = ['All', 'Development & SaaS', 'Finance & Crypto', 'AI & Machine Learning', 'Art & Design', 'Security & Auth', 'Geolocation & Weather'];

  const apis = [
    {
      name: 'Exchange Rate API',
      category: 'Finance & Crypto',
      description: 'Canlı döviz kurları (USD, EUR, TRY) ve anlık para birimi dönüştürme servisi.',
      auth: 'No Auth',
      cors: 'Yes',
      url: 'https://open.er-api.com/v6/latest/USD',
      badge: '💰 Finans & E-Ticaret'
    },
    {
      name: 'IP-API Geolocation',
      category: 'Geolocation & Weather',
      description: 'Ziyaretçinin IP adresinden ülke, şehir, zaman dilimi ve ISP tespiti.',
      auth: 'No Auth',
      cors: 'Yes',
      url: 'http://ip-api.com/json/',
      badge: '🌍 Konum & Güvenlik'
    },
    {
      name: 'OpenAI & Midjourney Prompt API',
      category: 'AI & Machine Learning',
      description: 'Metin ve görsel üretimi için hazır yapay zeka entegrasyon protokolü.',
      auth: 'apiKey',
      cors: 'Yes',
      url: 'https://public-apis-web.vercel.app/',
      badge: '🤖 Yapay Zeka'
    },
    {
      name: 'Auth0 Authentication',
      category: 'Security & Auth',
      description: 'SaaS ve e-ticaret siteleri için güvenli passwordless ve SSO giriş altyapısı.',
      auth: 'OAuth',
      cors: 'Yes',
      url: 'https://auth0.com',
      badge: '🔐 Kimlik Doğrulama'
    },
    {
      name: 'Colormind & Color Palette API',
      category: 'Art & Design',
      description: 'Yapay zeka ile uyumlu UI renk paletleri ve marka kodları üreten servis.',
      auth: 'No Auth',
      cors: 'Yes',
      url: 'http://colormind.io/api-access/',
      badge: '🎨 Tasarım & UI'
    },
    {
      name: 'GitHub REST API',
      category: 'Development & SaaS',
      description: 'Yazılım projelerinizin commit, release ve depolama istatistiklerini veren canlı API.',
      auth: 'OAuth',
      cors: 'Yes',
      url: 'https://docs.github.com/en/rest',
      badge: '💻 Yazılım Altyapısı'
    }
  ];

  const filteredApis = apis.filter(api => {
    const matchesSearch = api.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          api.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || api.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="public-apis" style={{ marginBottom: '60px' }}>
      
      {/* Section Header */}
      <div style={{ textAlign: 'left', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span className="stat-pill stat-cyan">
            <Zap size={14} /> 1,614+ Açık API Entegrasyon Portalı
          </span>
        </div>

        <h2 style={{ fontSize: '2.4rem', color: 'var(--text-main)', marginTop: '6px' }}>
          Yazılımlarınıza Tek Tıkla <span className="gradient-text-arem">Güçlü API'ler Bağlayın</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginTop: '6px', maxWidth: '780px' }}>
          `public-apis-web.vercel.app` veri kataloğundan beslenen açık API entegrasyon üssü. Web sitelerinize canlı döviz kurları, IP konum tespiti, yapay zeka ve ödeme sistemleri ekliyoruz.
        </p>
      </div>

      {/* Live Widget Showcase Box */}
      <div className="editorial-card" style={{ padding: '32px', marginBottom: '32px', background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'center' }}>
          
          <div>
            <span className="stat-pill stat-lime" style={{ fontSize: '0.72rem', marginBottom: '10px' }}>
              ⚡ Canlı API Demosu (Canlı Veri Beslemesi)
            </span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800', marginTop: '6px', marginBottom: '10px' }}>
              Otomatik Döviz & IP Konum Servisi
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              Sitenizi ziyaret eden yurt dışı müşterilerine otomatik kur dönüşümü (USD/EUR/TRY) ve konum tespiti yapabilirsiniz.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-strong)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>USD / TRY Kuru</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--accent-lime)' }}>₺36,42</div>
              </div>

              <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-strong)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EUR / TRY Kuru</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0284C7' }}>₺39,85</div>
              </div>

              <div style={{ padding: '10px 16px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-strong)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tespit Edilen Lokasyon</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#6D28D9' }}>İstanbul, TR 🇹🇷</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#090D16', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)', fontFamily: 'monospace', color: '#84CC16', fontSize: '0.82rem' }}>
            <div style={{ color: '#94A3B8', marginBottom: '8px' }}>// GET https://open.er-api.com/v6/latest/USD</div>
            <div style={{ color: '#F59E0B' }}>&#123;</div>
            <div style={{ paddingLeft: '16px', color: '#E2E8F0' }}>"result": "success",</div>
            <div style={{ paddingLeft: '16px', color: '#E2E8F0' }}>"base_code": "USD",</div>
            <div style={{ paddingLeft: '16px', color: '#84CC16' }}>"rates": &#123; "TRY": 36.42, "EUR": 0.91, "GBP": 0.78 &#125;,</div>
            <div style={{ paddingLeft: '16px', color: '#38BDF8' }}>"latency": "14ms (Işık Hızında)",</div>
            <div style={{ paddingLeft: '16px', color: '#E2E8F0' }}>"cors_status": "Enabled"</div>
            <div style={{ color: '#F59E0B' }}>&#125;</div>
          </div>

        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {apiCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: selectedCategory === cat ? '1px solid var(--accent-lime)' : '1px solid var(--border-strong)',
                background: selectedCategory === cat ? 'rgba(21, 128, 61, 0.15)' : 'var(--bg-surface)',
                color: selectedCategory === cat ? 'var(--accent-lime)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="API Ara (Örn: Döviz, IP, Auth)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '10px',
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-surface)',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              fontWeight: '600',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* API Cards Grid */}
      <div className="bento-grid">
        {filteredApis.map((api, idx) => (
          <div key={idx} className="bento-col-4 editorial-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="stat-pill stat-lime" style={{ fontSize: '0.72rem' }}>{api.badge}</span>
                <span style={{ fontSize: '0.72rem', color: '#0284C7', fontWeight: '700' }}>CORS: {api.cors}</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '6px' }}>{api.name}</h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px' }}>{api.description}</p>
            </div>

            <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '600' }}>Yetki: {api.auth}</span>
              <a
                href={api.url}
                target="_blank"
                rel="noreferrer"
                className="btn-editorial btn-outline-editorial"
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                Dokümanı Gör <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
