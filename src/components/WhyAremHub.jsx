import React from 'react';
import { 
  BarChart3, 
  Code2, 
  Eye, 
  Zap 
} from 'lucide-react';

export default function WhyAremHub() {
  const factors = [
    {
      icon: BarChart3,
      accent: 'var(--accent-cyan)',
      title: 'Veri Odaklı ve ROAS Merkezli Yaklaşım',
      description: 'Varsayımlarla değil, net matematik ve dönüşüm verileriyle hareket ediyoruz. Harcanan her reklam kuruşunun (ROAS) ve sitenize gelen her ziyaretçinin ciroya dönüşmesini sağlıyoruz.'
    },
    {
      icon: Code2,
      accent: 'var(--accent-lime)',
      title: 'Yüksek Kod Kalitesi & Lighthouse 90+ Hız',
      description: 'Yavaş ve şişirilmiş hazır şablonlar yerine, modern Next.js / React mimarisi kullanıyoruz. Google standartlarında ışık hızında açılan web sayfaları sunuyoruz.'
    },
    {
      icon: Eye,
      accent: 'var(--accent-violet)',
      title: 'Şeffaf ve Anlık Canlı Raporlama',
      description: 'Reklam harcamalarınızı ve web sitenizin uptime performansını sürprizlerle karşılaşmadan, anlık şeffaf paneller üzerinden 7/24 izlemenizi sağlıyoruz.'
    },
    {
      icon: Zap,
      accent: '#DC2626',
      title: 'Hızlı Teslimat & Uçtan Uca Süreç Yönetimi',
      description: 'Yazılımdan reklama, sosyal medyadan SEO’ya kadar tüm dijital ihtiyaçlarınızı tek noktadan yöneterek zaman ve maliyet tasarrufu sağlıyoruz.'
    }
  ];

  return (
    <section id="why-aremhub" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <span className="stat-pill stat-cyan" style={{ marginBottom: '12px' }}>Farkımız & Değer Önerimiz</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          Neden <span className="gradient-text-arem">aremhub</span> İle Çalışmalısınız?
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          Geleneksel ajansların karmaşık süreçlerini unutun. Büyümenizi hızlandıran 4 temel farkımız.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {factors.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div key={idx} className="editorial-card" style={{ padding: '32px', borderLeft: `4px solid ${f.accent}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${f.accent}`,
                  color: f.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '18px'
                }}>
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '12px', lineHeight: '1.3' }}>
                  {f.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', fontWeight: '500' }}>
                  {f.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
