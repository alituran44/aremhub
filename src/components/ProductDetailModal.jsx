import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Zap, 
  FileText, 
  MessageCircle, 
  ExternalLink, 
  ChevronDown, 
  Star, 
  Eye, 
  CheckCircle2, 
  Globe 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetailModal({ product, onClose, onBuyNow }) {
  const { lang } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  if (!product) return null;

  const mockScreenshots = [
    product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
  ];

  const faqs = [
    {
      q: lang === 'tr' ? 'Lemon Squeezy, Stripe veya PayTR kullanmak için şirket gerekir mi?' : 'Do I need a company to use Lemon Squeezy, Stripe or PayTR?',
      a: lang === 'tr' ? 'Hayır! Bireysel satıcı olarak Lemon Squeezy (MoR) veya PayTR/İyzico Bireysel altyapısıyla 5 dakika içinde dünya çapında ödeme almaya başlayabilirsiniz.' : 'No! As an individual creator, you can collect global payments using Lemon Squeezy or local gateways in minutes.'
    },
    {
      q: lang === 'tr' ? 'Sınırsız lisans ve özelleştirme yapabilir miyim?' : 'Can I customize the source code and use unlimited licenses?',
      a: lang === 'tr' ? 'Evet! Tüm kodlar %100 açık kaynak Next.js / React formatında teslim edilir. Dilediğiniz gibi düzenleyebilir ve kendi projelerinizde kullanabilirsiniz.' : 'Yes! All source code is delivered in 100% open React/Next.js format. You can customize and deploy freely.'
    },
    {
      q: lang === 'tr' ? 'Satın alma sonrası güncelleme ve destek nasıl sağlanır?' : 'How do post-purchase updates and support work?',
      a: lang === 'tr' ? 'Satın aldığınız an indirme bağlantısı ve GitHub repo erişimi e-postanıza düşer. Gelecek tüm güncellemeler ömür boyu ücretsizdir.' : 'Download links and GitHub repo invites are instantly emailed upon payment. All future updates are free.'
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        overflowY: 'auto'
      }}
    >
      <div
        className="editorial-card"
        style={{
          width: '100%',
          maxWidth: '1100px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-surface)',
          borderRadius: '24px',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-main)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* 2 Column Layout (1:1 ugilabs.com Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Gallery & Product Details */}
          <div>
            {/* Screenshot Main Preview */}
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '1px solid var(--border-strong)', marginBottom: '16px', aspectRatio: '16/10', background: '#000' }}>
              <img
                src={mockScreenshots[activeImageIndex]}
                alt={product.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.7)', color: '#FFF', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800' }}>
                {activeImageIndex + 1} / {mockScreenshots.length}
              </span>
            </div>

            {/* Thumbnail Selectors */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              {mockScreenshots.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '80px',
                    height: '54px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2px solid var(--accent-lime)' : '1px solid var(--border-strong)',
                    cursor: 'pointer',
                    opacity: activeImageIndex === idx ? 1 : 0.6,
                    padding: 0
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>

            {/* Product Meta & Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', padding: '3px 9px', borderRadius: '6px', background: '#DC2626', color: '#FFF', fontWeight: '900' }}>
                ÖZEL
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Eye size={15} /> 1,504 Görüntülenme
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShoppingBag size={15} /> 12 Satış
              </span>
            </div>

            {/* Title & Description */}
            <h2 style={{ fontSize: '1.85rem', color: 'var(--text-main)', fontWeight: '900', lineHeight: '1.25', marginBottom: '14px' }}>
              {product.title}
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.65', marginBottom: '24px', fontWeight: '500' }}>
              {product.description} Kendi dijital ürünlerinizi, yazılımlarınızı, lisans anahtarlarınızı veya e-kitaplarınızı hem Türkiye'ye hem de dünyaya profesyonelce satın.
            </p>

            {/* Feature Bullet Highlights */}
            <div style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-strong)', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={18} color="var(--accent-lime)" /> 🚀 Ürün Öne Çıkan Özellikleri
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '700' }}>
                  <CheckCircle2 size={16} color="var(--accent-lime)" /> Next.js 14 App Router + Tailwind CSS Ultra Hızlı Mimari
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '700' }}>
                  <CheckCircle2 size={16} color="var(--accent-lime)" /> PayTR / İyzico (TR) + Stripe / Lemon Squeezy (Global MoR) Entegrasyonu
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: '700' }}>
                  <CheckCircle2 size={16} color="var(--accent-lime)" /> 100% Açık Kaynak Kod & Ömür Boyu Ücretsiz Güncellemeler
                </div>
              </div>
            </div>

            {/* Trustpilot Review Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 16px', borderRadius: '12px', border: '1px solid #00B67A', background: 'rgba(0, 182, 122, 0.08)' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Review us on</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#00B67A', fontWeight: '900', fontSize: '1.05rem' }}>
                <Star size={18} fill="#00B67A" color="#00B67A" /> Trustpilot
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Buying Box (1:1 ugilabs.com) */}
          <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Primary Purchase Card */}
            <div className="editorial-card" style={{ padding: '28px', border: '2px solid var(--accent-lime)', borderRadius: '20px', background: 'var(--bg-surface)' }}>
              
              {/* Price Tag */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '2.4rem', color: 'var(--text-main)', fontWeight: '900', fontFamily: 'var(--font-display)', lineHeight: '1' }}>
                  {product.price}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>
                  (KDV Dahil & Anında Otomatik Teslimat)
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <button
                  onClick={() => onBuyNow(product)}
                  className="btn-editorial btn-lime"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem', fontWeight: '800' }}
                >
                  <ShoppingBag size={18} /> Satın Al
                </button>

                <button
                  onClick={() => setLiked(!liked)}
                  className="btn-editorial btn-outline-editorial"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', color: liked ? '#DC2626' : 'var(--text-main)' }}
                >
                  <Heart size={16} fill={liked ? '#DC2626' : 'none'} color={liked ? '#DC2626' : 'currentColor'} /> {liked ? 'Favorilerinizde' : 'Favorilere Ekle'}
                </button>
              </div>

              {/* 4 Trust Badges List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <ShieldCheck size={20} color="var(--accent-lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Güvenli Ödeme</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Kart veya PayPal ile — PayTR / Lemon Squeezy üzerinden</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Zap size={20} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Anında Teslim</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Ödeme sonrası ürün kütüphanene anında düşer</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <FileText size={20} color="#6D28D9" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>KDV Dahil & Fatura</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Fiyatlara KDV dahildir, kurumsal fatura düzenlenir</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MessageCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Satın Alma Sonrası Destek</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Sorularını destek talebiyle iletebilirsin</div>
                  </div>
                </div>

              </div>

              {/* Demo Link Button & Credentials */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <a
                  href={product.demoUrl || product.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-editorial btn-outline-editorial"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.88rem' }}
                >
                  📹 Canlı Demo ↗
                </a>

                {/* Separate User & Admin Demo Credentials Box */}
                <div style={{
                  marginTop: '14px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'var(--bg-elevated)',
                  border: '1px dashed var(--accent-lime)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', color: 'var(--accent-lime)', fontSize: '0.88rem' }}>
                    <ShieldCheck size={16} /> 🔑 Canlı Demo Test Giriş Bilgileri:
                  </div>

                  {/* Role 1: User / Customer Demo Credentials */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(2, 132, 199, 0.08)',
                    border: '1px solid rgba(2, 132, 199, 0.2)'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0284C7', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      👤 1. MÜŞTERİ / KULLANICI GİRİŞİ:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>E-Posta:</span>
                        <code style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '2px 8px', borderRadius: '6px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoUserEmail || product.demoUsername || 'musteri@aremhub.com'}
                        </code>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Şifre:</span>
                        <code style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '2px 8px', borderRadius: '6px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoUserPassword || 'user123'}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Role 2: Admin Demo Credentials */}
                  <div style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(21, 128, 61, 0.08)',
                    border: '1px solid rgba(21, 128, 61, 0.2)'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--accent-lime)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      🛡️ 2. YÖNETİCİ / ADMİN GİRİŞİ:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>E-Posta:</span>
                        <code style={{ background: 'rgba(21, 128, 61, 0.15)', padding: '2px 8px', borderRadius: '6px', color: 'var(--accent-lime)', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoAdminEmail || 'admin@aremhub.com'}
                        </code>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Şifre:</span>
                        <code style={{ background: 'rgba(21, 128, 61, 0.15)', padding: '2px 8px', borderRadius: '6px', color: 'var(--accent-lime)', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoAdminPassword || product.demoPassword || 'admin2026'}
                        </code>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Product FAQ Accordion */}
            <div className="editorial-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px' }}>
                ❓ Sık Sorulan Sorular
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {faqs.map((f, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '4px 0'
                      }}
                    >
                      <span>{f.q}</span>
                      <ChevronDown size={16} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {openFaq === idx && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.5', fontWeight: '500' }}>
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
