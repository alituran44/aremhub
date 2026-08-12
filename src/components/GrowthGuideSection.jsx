import React from 'react';
import { 
  Rocket, 
  Mail, 
  Globe, 
  BarChart2, 
  Target, 
  Search, 
  CheckCircle2, 
  Zap
} from 'lucide-react';

export default function GrowthGuideSection() {
  const steps = [
    {
      stepNum: '1',
      title: 'Kurulum & Kurumsal E-Posta Yapılandırması',
      icon: Mail,
      accent: '#0284C7',
      description: 'Domaininizin (aremhub.com) DNS ayarlarını sunucuya yönlendirin ve profesyonel kurumsal e-posta adreslerinizi oluşturun.',
      tasks: [
        'A Record: @ -> 18.206.171.129 (AWS EC2)',
        'CNAME: www -> aremhub.com',
        'Kurumsal E-posta: bilgi@aremhub.com ve hello@aremhub.com'
      ]
    },
    {
      stepNum: '2',
      title: 'SEO & Analitik Altyapısının Kurulması',
      icon: BarChart2,
      accent: 'var(--accent-lime)',
      description: 'Web sitenizin tıklamalarını, form doldurma dönüşümlerini ve arama motoru görünürlüğünü ilk günden izlemek için eksiksiz analitik kodlarını bağlayın.',
      tasks: [
        'Google Search Console site mülkü doğrulaması',
        'Google Analytics 4 (GA4) dönüşüm etkinlikleri takibi',
        'Meta Pixel ve Server-Side Conversion API (CAPI) kurulumu'
      ]
    },
    {
      stepNum: '3',
      title: 'Teklif ve İletişim Akışının Otomatikleşmesi',
      icon: Zap,
      accent: '#6D28D9',
      description: 'Gelen müşteri adaylarının kaçırılmaması için anlık WhatsApp yönlendirmesi ve otomatik e-posta bildirim mekanizması.',
      tasks: [
        'Form gönderildiğinde bilgi@aremhub.com adresine anlık e-posta bildirimi',
        'Ziyaretçiyi doğrudan WhatsApp hattına bağlayan butonlar',
        'Calendly 15 dakikalık hızlı randevu takvimi entegrasyonu'
      ]
    },
    {
      stepNum: '4',
      title: 'Kendi Ajans Reklamlarınızı Başlatın',
      icon: Target,
      accent: '#DC2626',
      description: 'Büyümek için kendi ajansınızın performans reklamlarını iki ana kanaldan aktif hale getirin.',
      tasks: [
        'Google Ads Arama Ağı: "web tasarım ajansı", "meta ads yönetimi" kelimelerinde üst sırada yer alın.',
        'Meta Ads Video & Carousel: Portfolyonuzu ve %180 ROAS başarı vaka analizlerinizi gösteren reklamlar çıkın.'
      ]
    }
  ];

  return (
    <section id="growth-guide" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <span className="stat-pill stat-lime" style={{ marginBottom: '12px' }}>Adım Adım Büyüme Planı</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          aremhub Ajansınızı <span className="gradient-text-arem">Canlıya Alma ve Büyütme Rehberi</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          Domain kurulumundan kurumsal e-postaya, SEO analitiğinden kendi reklam kampanyalarınızı başlatmaya kadar 4 adımlı başarı planı.
        </p>
      </div>

      {/* 4 Steps Timeline Grid - 4 Columns Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {steps.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.stepNum} className="editorial-card" style={{ padding: '24px 20px', borderLeft: `4px solid ${s.accent}` }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${s.accent}`,
                  color: s.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-display)'
                }}>
                  {s.stepNum}
                </div>
                <Icon size={24} color={s.accent} />
              </div>

              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '12px', lineHeight: '1.3' }}>
                {s.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px', fontWeight: '500' }}>
                {s.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {s.tasks.map((task, tidx) => (
                  <div key={tidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.86rem', color: 'var(--text-main)', fontWeight: '700' }}>
                    <CheckCircle2 size={16} color={s.accent} style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{task}</span>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
