import React, { useState } from 'react';
import { 
  Code2, 
  Target, 
  Share2, 
  Image as ImageIcon, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Zap, 
  Users, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Calculator,
  MessageSquare
} from 'lucide-react';

export default function PublicLanding({ apps, onSwitchToAdmin, onOpenQuoteModal }) {
  const [activePillar, setActivePillar] = useState('a');
  
  // ROI Calculator State
  const [monthlyBudget, setMonthlyBudget] = useState(25000);
  const [targetRoas, setTargetRoas] = useState(4.2);

  const estimatedRevenue = Math.round(monthlyBudget * targetRoas);
  const estimatedClicks = Math.round(monthlyBudget / 4.5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
      
      {/* Hero Section */}
      <section className="glass-card" style={{
        padding: '56px 40px',
        borderRadius: '28px',
        background: 'radial-gradient(circle at top right, rgba(6, 182, 212, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, var(--bg-card) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
            <span className="pulse-live"></span>
            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: '#60A5FA' }}>
              AremHub (aremhub.com) • Hepsi Bir Arada Dijital Üs
            </span>
          </div>

          <h1 style={{ fontSize: '3rem', lineHeight: '1.15', marginBottom: '20px' }}>
            Tüm <span className="gradient-text-arem">Yazılımlarınız, Sosyal Medya</span> ve Ads Yönetiminiz Tek Üste.
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: '1.6' }}>
            AremHub; özel SaaS yazılımlarınızı yayınladığınız, Meta Ads ve Google Ads reklam harcamalarınızın ROAS oranını katladığınız ve sosyal medya kanallarınızı otonom olarak yönettiğiniz merkezi komuta platformudur.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={onSwitchToAdmin} style={{ padding: '14px 28px', fontSize: '1rem', background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}>
              <Zap size={18} /> Canlı Üs Panelini Aç <ArrowRight size={18} />
            </button>

            <button className="btn btn-secondary" onClick={onOpenQuoteModal} style={{ padding: '14px 28px', fontSize: '1rem' }}>
              <MessageSquare size={18} color="#10B981" /> Teklif & Proje Danışmanlığı
            </button>
          </div>

          {/* Hero Key Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#06B6D4', fontFamily: 'var(--font-display)' }}>%99.99</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sunucu Uptime Oranı</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10B981', fontFamily: 'var(--font-display)' }}>4.2x ROAS</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ortalama Reklam Getirisi</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#8B5CF6', fontFamily: 'var(--font-display)' }}>66.1K+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Aylık Sosyal Erişim</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#F43F5E', fontFamily: 'var(--font-display)' }}>15+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Entegre SaaS & API Modülü</div>
            </div>
          </div>

        </div>
      </section>

      {/* AREM 4 Pillar Interactive Showcase */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2.1rem', color: '#FFF' }}>
            AremHub Mimarisinin <span className="gradient-text-arem">4 Temel Direği (AREM)</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '8px' }}>
            Altyapıdan reklama, etkileşimden medyaya kadar uçtan uca dijital dönüşüm ekosistemi.
          </p>
        </div>

        {/* Pillar Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          
          <button 
            onClick={() => setActivePillar('a')}
            className="glass-card"
            style={{
              padding: '20px',
              textAlign: 'left',
              cursor: 'pointer',
              borderColor: activePillar === 'a' ? '#06B6D4' : 'var(--border-subtle)',
              background: activePillar === 'a' ? 'rgba(6, 182, 212, 0.1)' : 'var(--bg-card)'
            }}
          >
            <span className="badge badge-a">A Pillar</span>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', margin: '8px 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={18} color="#06B6D4" /> Altyapı / App
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SaaS yazılımları, API servisleri ve sunucu sağlığı.</p>
          </button>

          <button 
            onClick={() => setActivePillar('r')}
            className="glass-card"
            style={{
              padding: '20px',
              textAlign: 'left',
              cursor: 'pointer',
              borderColor: activePillar === 'r' ? '#10B981' : 'var(--border-subtle)',
              background: activePillar === 'r' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)'
            }}
          >
            <span className="badge badge-r">R Pillar</span>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', margin: '8px 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="#10B981" /> Reklam / Ads
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Meta Ads & Google Ads ROAS yönetimi.</p>
          </button>

          <button 
            onClick={() => setActivePillar('e')}
            className="glass-card"
            style={{
              padding: '20px',
              textAlign: 'left',
              cursor: 'pointer',
              borderColor: activePillar === 'e' ? '#8B5CF6' : 'var(--border-subtle)',
              background: activePillar === 'e' ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-card)'
            }}
          >
            <span className="badge badge-e">E Pillar</span>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', margin: '8px 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Share2 size={18} color="#8B5CF6" /> Etkileşim
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instagram, LinkedIn, X & YouTube takvimi.</p>
          </button>

          <button 
            onClick={() => setActivePillar('m')}
            className="glass-card"
            style={{
              padding: '20px',
              textAlign: 'left',
              cursor: 'pointer',
              borderColor: activePillar === 'm' ? '#F43F5E' : 'var(--border-subtle)',
              background: activePillar === 'm' ? 'rgba(244, 63, 94, 0.1)' : 'var(--bg-card)'
            }}
          >
            <span className="badge badge-m">M Pillar</span>
            <h3 style={{ fontSize: '1.1rem', color: '#FFF', margin: '8px 0 4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ImageIcon size={18} color="#F43F5E" /> Medya / Marketing
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI destekli reklam & sosyal medya metni üretici.</p>
          </button>

        </div>

        {/* Active Pillar Detail Content */}
        <div className="glass-card" style={{ padding: '32px', borderRadius: '20px' }}>
          {activePillar === 'a' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <span className="badge badge-a">Altyapı / App Mimarisi</span>
                <h3 style={{ fontSize: '1.6rem', color: '#FFF', margin: '12px 0' }}>Yüksek Performanslı SaaS ve API Servisleri</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  AremHub altyapısında geliştirdiğimiz tüm yazılım ve mikroservisler %99.99 uptime garantisi ile 18ms latency değerinde yanıt verir.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#FFF' }}>
                    <CheckCircle2 size={16} color="#06B6D4" /> Gerçek zamanlı sunucu ve API healthcheck izleme
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#FFF' }}>
                    <CheckCircle2 size={16} color="#06B6D4" /> Tek tıkla canlı ve bakım modları arası geçiş
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#FFF' }}>
                    <CheckCircle2 size={16} color="#06B6D4" /> B2B ve B2C özel müşteri yazılımları entegrasyonu
                  </li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: '#06B6D4', fontWeight: '700', marginBottom: '12px' }}>[LIVE API HEALTHCHECK STATUS]</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#E2E8F0', lineHeight: '1.8' }}>
                  <div>GET /api/v1/health -&gt; <span style={{ color: '#10B981' }}>200 OK (14ms)</span></div>
                  <div>GET /api/v1/crm/status -&gt; <span style={{ color: '#10B981' }}>200 OK (18ms)</span></div>
                  <div>GET /api/v1/seo/ping -&gt; <span style={{ color: '#10B981' }}>200 OK (22ms)</span></div>
                  <div>POST /api/v1/ads/webhook -&gt; <span style={{ color: '#10B981' }}>200 OK (11ms)</span></div>
                </div>
              </div>
            </div>
          )}

          {activePillar === 'r' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <span className="badge badge-r">Reklam / Ads Yönetimi</span>
                <h3 style={{ fontSize: '1.6rem', color: '#FFF', margin: '12px 0' }}>Meta Ads & Google Ads Dönüşüm Odaklı Kampanyalar</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Bütçenizi en verimli şekilde harcayın. Meta Ads (Instagram/Facebook) ve Google Ads hesaplarınızda yüksek ROAS elde etmek için veri odaklı optimizasyon sağlıyoruz.
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#FFF' }}>
                    <CheckCircle2 size={16} color="#10B981" /> Ortalama 4.2x ROAS ve Düşük CPC Maliyetleri
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#FFF' }}>
                    <CheckCircle2 size={16} color="#10B981" /> Canlı Kampanya Bütçe Kontrolü ve Duraklatma/Yayınlama
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#FFF' }}>
                    <CheckCircle2 size={16} color="#10B981" /> Dönüşüm API (CAPI) Entegre Takip
                  </li>
                </ul>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '700', marginBottom: '12px' }}>[REKLAM PERFORMANS ÖZETİ]</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', marginBottom: '8px' }}>
                  <span>Meta Ads Harcama</span>
                  <strong style={{ color: '#10B981' }}>₺27,700 / 4.6x ROAS</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <span>Google Ads Harcama</span>
                  <strong style={{ color: '#10B981' }}>₺24,000 / 3.6x ROAS</strong>
                </div>
              </div>
            </div>
          )}

          {activePillar === 'e' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <span className="badge badge-e">Etkileşim / Engagement</span>
                <h3 style={{ fontSize: '1.6rem', color: '#FFF', margin: '12px 0' }}>Sosyal Medya Otomasyonu ve Büyüme Takvimi</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Instagram, LinkedIn, X ve YouTube kanallarınızdaki paylaşımları önceden planlayın, erişim ve etkileşim oranlarınızı tek bir takvim üzerinden yönetin.
                </p>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: '#8B5CF6', fontWeight: '700', marginBottom: '12px' }}>[SOSYAL MEDYA KANAL ETKİLEŞİMİ]</div>
                <div style={{ fontSize: '0.9rem', color: '#FFF' }}>Total Audience: <strong>66,100 Takipçi</strong></div>
                <div style={{ fontSize: '0.9rem', color: '#8B5CF6', marginTop: '4px' }}>Ortalama Etkileşim: <strong>%5.6 Engagement Rate</strong></div>
              </div>
            </div>
          )}

          {activePillar === 'm' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <span className="badge badge-m">Medya & AI Copywriter</span>
                <h3 style={{ fontSize: '1.6rem', color: '#FFF', margin: '12px 0' }}>Yapay Zeka Destekli Metin ve Görsel Stüdyosu</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '20px' }}>
                  Reklam ve sosyal medya paylaşımlarınız için dakikalar içinde yüksek dönüşüm getiren içerik metinleri ve hashtag setleri oluşturun.
                </p>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.8rem', color: '#F43F5E', fontWeight: '700', marginBottom: '12px' }}>[AI KAMPANYA METNİ MODÜLÜ]</div>
                <p style={{ fontSize: '0.85rem', color: '#CBD5E1', fontStyle: 'italic' }}>"AremHub AI ile saniyeler içinde tüm dijital mecralara uygun içerik ve reklam metni üretebilirsiniz."</p>
              </div>
            </div>
          )}
        </div>

      </section>

      {/* Interactive Software Showcase */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-a">AremHub Yazılım Portföyü</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '6px' }}>
              Öne Çıkan Canlı Uygulamalarımız & SaaS Modülleri
            </h2>
          </div>
          <button className="btn btn-secondary" onClick={onSwitchToAdmin}>
            Tüm Paneli ve Monitörü Gör <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {apps.map(app => (
            <div key={app.id} className="glass-card" style={{ padding: '24px', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#06B6D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.15rem'
                  }}>
                    {app.name.charAt(0)}
                  </div>
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
                </div>

                <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontWeight: '700' }}>{app.name}</h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{app.category} • v{app.version}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '16px' }}>{app.description}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.78rem', color: '#06B6D4', fontWeight: '600' }}>{app.latency}ms Latency</span>
                <a href={app.url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem', background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}>
                  Aç <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Ads & ROI Calculator */}
      <section className="glass-card" style={{ padding: '36px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px', alignItems: 'center' }}>
          <div>
            <span className="badge badge-r"><Calculator size={14} /> Canlı Hesaplayıcı</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', margin: '12px 0 8px' }}>
              Tahmini Ads Reklam Getirisi (ROAS) Hesaplayıcı
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Bütçenizi girin, AremHub optimizasyonu ile elde edeceğiniz tahmini ciro ve dönüşüm potansiyelini canlı görün.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFF', fontWeight: '600', marginBottom: '6px' }}>
                  <span>Aylık Reklam Bütçesi:</span>
                  <span style={{ color: '#10B981' }}>₺{monthlyBudget.toLocaleString('tr-TR')}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="200000" 
                  step="5000"
                  value={monthlyBudget} 
                  onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFF', fontWeight: '600', marginBottom: '6px' }}>
                  <span>Hedef ROAS Çarpanı:</span>
                  <span style={{ color: '#10B981' }}>{targetRoas}x</span>
                </div>
                <input 
                  type="range" 
                  min="2.0" 
                  max="8.0" 
                  step="0.2"
                  value={targetRoas} 
                  onChange={(e) => setTargetRoas(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10B981', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '28px', borderRadius: '20px', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tahmini Kazanılacak Ciro</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#10B981', margin: '8px 0', fontFamily: 'var(--font-display)' }}>
              ₺{estimatedRevenue.toLocaleString('tr-TR')}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tahmini Tıklama</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFF' }}>{estimatedClicks.toLocaleString('tr-TR')}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Net Kar Potansiyeli</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#10B981' }}>₺{(estimatedRevenue - monthlyBudget).toLocaleString('tr-TR')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="glass-card" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
        <h2 style={{ fontSize: '2rem', color: '#FFF', marginBottom: '12px' }}>
          Yazılımlarınızı ve Pazarlamanızı AremHub İle Yönetmeye Başlayın
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
          Tüm dijital projelerinizi, reklam bütçelerinizi ve sosyal medya içeriklerinizi tek bir üste toplamak için bizimle iletişime geçin.
        </p>
        <button className="btn btn-primary" onClick={onOpenQuoteModal} style={{ padding: '14px 28px', fontSize: '1rem', background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}>
          <Sparkles size={18} /> Projeniz İçin Teklif Alın
        </button>
      </section>

    </div>
  );
}
