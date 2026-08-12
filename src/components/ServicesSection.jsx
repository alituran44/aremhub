import React from 'react';
import { 
  Code2, 
  Target, 
  Share2, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';

export default function ServicesSection({ onOpenQuoteModal }) {
  return (
    <section id="services" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="stat-pill stat-cyan">
            <Zap size={14} /> Uzman Ajans Hizmetlerimiz
          </span>
        </div>

        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          Büyümenizi Hızlandıran <span className="gradient-text-arem">3 Ana Hizmet Alanımız</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          Yazılım mühendisliğini yüksek dönüşümlü pazarlama stratejisiyle harmanlıyor, markanızı arama motorlarında ve sosyal medyada zirveye taşıyoruz.
        </p>
      </div>

      {/* 3 Equal Columns Side-By-Side Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Service 1: Web Geliştirme & Özel Yazılım */}
        <div className="editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #0284C7' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(2, 132, 199, 0.15)',
                color: '#0284C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Code2 size={26} />
              </div>
              <span className="stat-pill stat-cyan" style={{ fontSize: '0.75rem' }}>Özel Yazılım</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '6px', lineHeight: '1.3' }}>
              1. Web Geliştirme & Özel Yazılım
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', fontWeight: '800', marginBottom: '14px' }}>
              ⚡ Lighthouse 90+ Garantili Hız & SEO
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>
              Google standartlarında **0.8 saniyenin altında açılan Next.js & React** özel e-ticaret ve kurumsal web platformları geliştiriyoruz.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#0284C7" /> Next.js / React Modern Mimari
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#0284C7" /> Iyzico / PayTR Ödeme Entegrasyonu
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#0284C7" /> Tam Mobil ve Tablet Uyumlu (Responsive)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#0284C7" /> Headless CMS & Kolay İçerik Yönetimi
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '700', marginBottom: '10px' }}>
              Teslim Süresi: <strong>7 - 14 İş Günü</strong>
            </div>
            <button onClick={onOpenQuoteModal} className="btn-editorial btn-lime" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Proje İçin Teklif Al <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* Service 2: Performans Pazarlama & Reklam */}
        <div className="editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid var(--accent-lime)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(21, 128, 61, 0.15)',
                color: 'var(--accent-lime)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Target size={26} />
              </div>
              <span className="stat-pill stat-lime" style={{ fontSize: '0.75rem' }}>ROAS Odaklı</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '6px', lineHeight: '1.3' }}>
              2. Performans Pazarlama & Reklam
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#0284C7', fontWeight: '800', marginBottom: '14px' }}>
              🎯 Meta CAPI & Google Ads ROAS Artışı
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>
              Google Ads ve Meta Ads (Instagram/Facebook) bütçelerinizi **Server-Side Conversion API (CAPI)** ile hedefe ulaştırıyor, ROAS oranını katlıyoruz.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="var(--accent-lime)" /> Meta Server-Side CAPI Takibi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="var(--accent-lime)" /> Google Ads Arama Ağı & A/B Testleri
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="var(--accent-lime)" /> Canlı Dönüşüm Raporlama Paneli
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="var(--accent-lime)" /> Custom Retargeting & Piksel Kurulumu
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '700', marginBottom: '10px' }}>
              Raporlama: <strong>7/24 Şeffaf Canlı Panel</strong>
            </div>
            <button onClick={onOpenQuoteModal} className="btn-editorial btn-outline-editorial" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Reklam Stratejisi İste
            </button>
          </div>
        </div>

        {/* Service 3: Sosyal Medya Yönetimi & İçerik Tasarımı */}
        <div className="editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '4px solid #6D28D9' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(109, 40, 217, 0.15)',
                color: '#6D28D9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Share2 size={26} />
              </div>
              <span className="stat-pill stat-violet" style={{ fontSize: '0.75rem' }}>Organik Büyüme</span>
            </div>

            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '6px', lineHeight: '1.3' }}>
              3. Sosyal Medya Yönetimi & İçerik
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#6D28D9', fontWeight: '800', marginBottom: '14px' }}>
              📱 Reels, Carousel & Marka Konumlandırma
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>
              Markanızın ruhuna uygun profesyonel görsel tasarımı, yüksek erişimli Instagram Reels kurguları ve aylık içerik planlaması.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#6D28D9" /> Aylık Özgün İçerik Takvimi (15+ Post)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#6D28D9" /> Trend Instagram Reels Video Kurguları
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#6D28D9" /> LinkedIn B2B Kurumsal Konumlandırma
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                <CheckCircle2 size={16} color="#6D28D9" /> Marka Kimliği & Tipografi Standartları
              </div>
            </div>
          </div>

          <div style={{ paddingTop: '18px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '700', marginBottom: '10px' }}>
              İçerik Adedi: <strong>15+ Özgün Post / Reels</strong>
            </div>
            <button onClick={onOpenQuoteModal} className="btn-editorial btn-lime" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Sosyal Medya Teklifi Al
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}
