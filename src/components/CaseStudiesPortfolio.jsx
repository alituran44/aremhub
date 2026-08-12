import React, { useState } from 'react';
import { 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  BarChart2, 
  Search, 
  Award, 
  Target, 
  Code2, 
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function CaseStudiesPortfolio({ apps }) {
  const [activeTab, setActiveTab] = useState('cases');

  const caseStudies = [
    {
      id: 1,
      client: 'Acme E-Ticaret Holding',
      category: 'E-Ticaret & Meta Ads',
      metricBadge: '%180 ROAS Artışı',
      metricColor: 'var(--accent-lime)',
      problem: 'Yüksek reklam maliyetleri (CPM/CPC) ve iOS 14+ ad-blocker engelleri nedeniyle düşen reklam getirisi (ROAS: 1.5x).',
      solution: 'aremhub altyapısıyla Meta Server-Side Conversion API (CAPI) entegre edildi. Custom retargeting kurguları ve Reels video içerikleriyle reklamlar yeniden optimize edildi.',
      result: 'Reklam harcaması sabit kalırken ciro %180 arttı ve ortalama ROAS 4.8x seviyesine yükseldi.',
      techStack: ['Meta CAPI', 'Retargeting', 'Reels Ads', 'Shopify']
    },
    {
      id: 2,
      client: 'TechStart B2B SaaS',
      category: 'Web Yazılım & Google Ads',
      metricBadge: '2 Kat Dönüşüm Oranı',
      metricColor: 'var(--accent-cyan)',
      problem: 'Eski ve yavaş kurumsal web sitesi nedeniyle yüksek bounce rate (%74) ve düşük potansiyel müşteri (Lead) dönüşümü.',
      solution: 'Next.js ve Tailwind CSS ile Lighthouse 98 puanlı ultra hızlı yeni web platformu yazıldı. Google Ads Arama Ağı hedefe yönelik kelimelerle yeniden yapılandırıldı.',
      result: 'Site yüklenme hızı 0.8 saniyeye indirildi, form doldurma oranı 2.1 kat arttı (Dönüşüm oranı: %3.2 -> %6.8).',
      techStack: ['Next.js', 'React', 'Google Ads', 'GA4 Analytics']
    },
    {
      id: 3,
      client: 'RetailGroup Mobilya',
      category: 'Sosyal Medya & Dijital Pazarlama',
      metricBadge: '%120 Satış Artışı',
      metricColor: 'var(--accent-violet)',
      problem: 'Düşük organik erişim ve marka bilinirliğinin satış kanallarına yansımaması.',
      solution: 'Haftalık 5 adet özgün Reels/Carousel video içerik takvimi ve Meta Katalog Dinamik reklam entegrasyonu sağlandı.',
      result: 'Sosyal medya organik erişimi 42.000 kişiye ulaştı ve mağaza direkt satışlarında %120 artış kaydedildi.',
      techStack: ['Instagram Reels', 'Meta Catalog', 'Content Design', 'Growth']
    }
  ];

  return (
    <section id="portfolio" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <span className="stat-pill stat-lime" style={{ marginBottom: '12px' }}>Vaka Analizleri & Portfolyo</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          <span className="gradient-text-arem">Gerçek Sonuçlar,</span> Ölçülebilir Büyüme
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          Sadece güzel görünen siteler değil; müşterilerimizin satışlarını ve reklam getirilerini katlayan gerçek vaka analizleri (Case Studies).
        </p>
      </div>

      {/* Tab Switcher Centered */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('cases')}
          className="btn-editorial"
          style={{
            padding: '12px 24px',
            fontSize: '0.9rem',
            background: activeTab === 'cases' ? 'var(--accent-lime)' : 'var(--bg-surface)',
            color: activeTab === 'cases' ? '#FFF' : 'var(--text-main)',
            border: activeTab === 'cases' ? '1px solid var(--accent-lime)' : '1px solid var(--border-strong)'
          }}
        >
          📈 Başarı Hikayeleri & Vaka Analizleri (Case Studies)
        </button>

        <button
          onClick={() => setActiveTab('apps')}
          className="btn-editorial"
          style={{
            padding: '12px 24px',
            fontSize: '0.9rem',
            background: activeTab === 'apps' ? 'var(--accent-cyan)' : 'var(--bg-surface)',
            color: activeTab === 'apps' ? '#FFF' : 'var(--text-main)',
            border: activeTab === 'apps' ? '1px solid var(--accent-cyan)' : '1px solid var(--border-strong)'
          }}
        >
          💻 Geliştirilen Web Projeleri ({apps.length})
        </button>
      </div>

      {/* Tab 1: Case Studies */}
      {activeTab === 'cases' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {caseStudies.map(cs => (
            <div key={cs.id} className="editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div>
                    <span className="stat-pill stat-lime" style={{ fontSize: '0.75rem' }}>{cs.category}</span>
                    <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800', marginTop: '8px' }}>{cs.client}</h3>
                  </div>

                  <div style={{
                    padding: '8px 14px',
                    borderRadius: '12px',
                    background: 'rgba(22, 163, 74, 0.15)',
                    border: '1px solid rgba(22, 163, 74, 0.3)',
                    color: 'var(--accent-lime)',
                    fontWeight: '800',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {cs.metricBadge}
                  </div>
                </div>

                {/* Problem, Solution, Result breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                  
                  <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                    <div style={{ fontSize: '0.78rem', color: '#DC2626', fontWeight: '800' }}>⚠️ MÜŞTERİNİN PROBLEMİ:</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '4px', fontWeight: '600' }}>{cs.problem}</div>
                  </div>

                  <div style={{ background: 'rgba(2, 132, 199, 0.08)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(2, 132, 199, 0.25)' }}>
                    <div style={{ fontSize: '0.78rem', color: '#0284C7', fontWeight: '800' }}>💡 AREMHUB ÇÖZÜMÜ:</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '4px', fontWeight: '600' }}>{cs.solution}</div>
                  </div>

                  <div style={{ background: 'rgba(22, 163, 74, 0.08)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(22, 163, 74, 0.25)' }}>
                    <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: '800' }}>🎯 ELDE EDİLEN SONUÇ:</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '800', marginTop: '4px' }}>{cs.result}</div>
                  </div>

                </div>

              </div>

              {/* Tech Badges */}
              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {cs.techStack.map(t => (
                  <span key={t} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: 'var(--bg-elevated)', color: 'var(--text-main)', border: '1px solid var(--border-strong)', fontWeight: '700' }}>
                    {t}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Web Projects Showcase */}
      {activeTab === 'apps' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {apps.map(app => (
            <div key={app.id} className="editorial-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'rgba(2, 132, 199, 0.15)',
                    color: '#0284C7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.2rem'
                  }}>
                    {app.name.charAt(0)}
                  </div>
                  <span style={{ fontSize: '0.78rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(22, 163, 74, 0.15)', color: 'var(--accent-lime)', fontWeight: '800' }}>
                    {app.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800' }}>{app.name}</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: '600' }}>{app.category} • v{app.version}</div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '18px', fontWeight: '500' }}>{app.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.82rem', color: '#0284C7', fontWeight: '800' }}>{app.latency}ms Latency</span>
                <a href={app.url} target="_blank" rel="noreferrer" className="btn-editorial btn-lime" style={{ padding: '8px 14px', fontSize: '0.82rem' }}>
                  Canlı İncele <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
