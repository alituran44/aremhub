import React from 'react';
import { 
  CheckCircle2, 
  Zap, 
  Layers, 
  Cpu, 
  Search, 
  Compass, 
  Rocket, 
  ShieldCheck,
  Award
} from 'lucide-react';

export default function AboutSection() {
  const steps = [
    {
      num: '1',
      title: 'Keşif & Analiz',
      color: '#0284C7',
      description: 'Markanızın mevcut dijital varlıklarını, web sitesi performansını, rakiplerinizi ve reklam bütçenizin verimliliğini derinlemesine inceliyoruz.'
    },
    {
      num: '2',
      title: 'Strateji & Tasarım',
      color: '#6D28D9',
      description: 'Size özel Next.js / React web mimarisini tasarlıyor, Meta Ads ve Google Ads dönüşüm kurgularını hazırlıyor ve içerik takvimini kilitliyoruz.'
    },
    {
      num: '3',
      title: 'Yayına Alma & Reklam Yönetimi',
      color: 'var(--accent-lime)',
      description: 'Web sitenizi Lighthouse 98 puanla yayına alıyor, Conversion API entegrasyonu ile performans reklamlarını başlatıyor ve anlık ROAS takibi yapıyoruz.'
    }
  ];

  return (
    <section id="about" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <span className="stat-pill stat-violet" style={{ marginBottom: '12px' }}>Hakkımızda & Metodoloji</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          Teknoloji İle Performansı Birleştiren <span className="gradient-text-arem">Yeni Nesil Ajans</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          aremhub (aremhub.com); geleneksel ajansların aksine yazılım gücü ile performans pazarlamasını aynı çatı altında toplayarak markaları hızla büyütür.
        </p>
      </div>

      {/* Vision & Technical Philosophy Card */}
      <div className="editorial-card" style={{ padding: '36px', marginBottom: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '36px', alignItems: 'start' }}>
          <div>
            <h3 style={{ fontSize: '1.55rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px' }}>
              Vizyonumuz & Teknik Altyapı Yaklaşımımız
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '16px', fontWeight: '500' }}>
              Web sitenizin 1 saniyenin altında açılması, Google’da üst sıralara tırmanması ve verilen her reklam kuruşunun (ROAS) katlanarak geri dönmesi tesadüf değildir.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: '1.6', marginBottom: '24px', fontWeight: '500' }}>
              aremhub olarak, yavaş ve karmaşık WordPress yapıları yerine modern **Next.js / React + Tailwind CSS** mimarisini kullanıyor; reklam bütçelerinizi **Meta CAPI ve Google GA4 Analytics** ile santim santim izliyoruz.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '800' }}>
                <CheckCircle2 size={17} color="#0284C7" /> Headless CMS Mimarisi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '800' }}>
                <CheckCircle2 size={17} color="var(--accent-lime)" /> Server-Side CAPI Takibi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '800' }}>
                <CheckCircle2 size={17} color="#6D28D9" /> Lighthouse 90+ Garantisi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '800' }}>
                <CheckCircle2 size={17} color="#DC2626" /> Şeffaf Haftalık Raporlama
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-elevated)', padding: '28px', borderRadius: '18px', border: '1px solid var(--border-strong)' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--accent-lime)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
              [ AREMHUB AJANS PRENSİPLERİ ]
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)' }}>1. Ölçülemeyen Şey Yönetilemez</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '500' }}>Her tıklama, form ve reklam dönüşümü anlık olarak raporlanır.</div>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)' }}>2. Işık Hızında Web Sayfaları</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '500' }}>Açılması 3 saniyeden uzun süren siteler müşterinizi kaybettirir.</div>
              </div>

              <div style={{ padding: '14px', borderRadius: '12px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: '800', color: 'var(--text-main)' }}>3. Sürekli ROAS Optimizasyonu</div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '500' }}>Reklam bütçeniz haftalık olarak en çok getiri sağlayan kanallara aktarılır.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Step Transparent Process Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {steps.map(step => (
          <div key={step.num} className="editorial-card" style={{ padding: '32px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '14px',
              background: 'var(--bg-elevated)',
              border: `1px solid ${step.color}`,
              color: step.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.25rem',
              fontFamily: 'var(--font-display)',
              marginBottom: '18px'
            }}>
              {step.num}
            </div>

            <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '10px' }}>
              {step.title}
            </h4>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', fontWeight: '500' }}>
              {step.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
