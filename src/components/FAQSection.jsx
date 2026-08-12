import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Sparkles,
  MessageCircle
} from 'lucide-react';

export default function FAQSection({ onOpenQuoteModal }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'aremhub ile çalışmaya nasıl başlayabiliriz?',
      a: 'Süreç çok pratik! Sitemizdeki "Teklif Al" butonundan veya WhatsApp hattımızdan bize ulaşıyorsunuz. Markanızın mevcut durumunu inceliyor, 24 saat içinde size özel teknik altyapı ve reklam stratejisi teklifimizi sunuyoruz.'
    },
    {
      q: 'Hazır dijital ürünler ve şablonlar ne zaman teslim edilir?',
      a: 'Dijital mağazamızdan satın aldığınız Canva kitleri, Meta Ads hedef kitle kütüphaneleri ve Notion CRM panelleri ödeme tamamlandığı an otomatik olarak e-posta adresinize teslim edilir.'
    },
    {
      q: 'Özel web yazılımı teslim süresi ne kadardır?',
      a: 'Projenin kapsamına bağlı olarak standart kurumsal web siteleri ve Next.js e-ticaret platformları 7 ile 14 iş günü arasında tüm testleri yapılmış ve Lighthouse 90+ hız garantisiyle canlıya alınır.'
    },
    {
      q: 'Meta ve Google Ads reklam harcamalarımızı nasıl izleyeceğiz?',
      a: 'Bütün reklam harcamalarınızı, tıklama başı maliyetlerinizi (CPC) ve elde edilen canlı ciro/ROAS verilerini size sunacağımız 7/24 şeffaf canlı raporlama paneli üzerinden anlık izleyebilirsiniz.'
    },
    {
      q: 'Satın aldığım dijital şablonu ajansınıza kurdurabilir miyim?',
      a: 'Kesinlikle! Mağazamızdan satın aldığınız şablonları kendi ekibimizle kurulumunu yapmak isterseniz %20 indirimli ajans danışmanlık paketimizden faydalanabilirsiniz.'
    }
  ];

  return (
    <section id="faq" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <span className="stat-pill stat-cyan" style={{ marginBottom: '12px' }}>Sıkça Sorulan Sorular (SSS)</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          Aklınıza Takılan <span className="gradient-text-arem">Tüm Soruların Yanıtları</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          Geliştirme süreçlerimiz, reklam yönetimlerimiz ve dijital mağaza teslimatları hakkında merak edilenler.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="editorial-card" 
              style={{
                padding: '24px 32px',
                cursor: 'pointer',
                border: isOpen ? '1px solid var(--accent-lime)' : '1px solid var(--border-strong)',
                background: isOpen ? 'var(--bg-surface)' : 'var(--bg-surface)'
              }}
              onClick={() => setOpenIndex(isOpen ? -1 : idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '800', lineHeight: '1.3' }}>
                  {faq.q}
                </h3>
                <ChevronDown 
                  size={20} 
                  color={isOpen ? 'var(--accent-lime)' : 'var(--text-muted)'} 
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', flexShrink: 0 }} 
                />
              </div>

              {isOpen && (
                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', fontWeight: '500' }}>
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
}
