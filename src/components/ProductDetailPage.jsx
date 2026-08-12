import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
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
  Send,
  User,
  Share2,
  Lock,
  Download,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProductDetailPage({ product, onBack, onBuyNow }) {
  const { lang } = useLanguage();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'features' | 'reviews' | 'faq'
  const [openFaq, setOpenFaq] = useState(0);

  // Reviews State per Product (Persisted in localStorage)
  const defaultReviews = [
    {
      id: 1,
      author: 'Mustafa K. - Dijital Pazarlama Uzmanı',
      rating: 5,
      date: '2 gün önce',
      comment: 'İçerikler ve şablonlar harika kurgulanmış. Reklam ajansımızda müşterilerimizin sosyal medya etkileşimlerini ilk haftadan %40 artırdık!',
      verified: true
    },
    {
      id: 2,
      author: 'Ece Demir - Restoran İşletmecisi',
      rating: 5,
      date: '1 hafta önce',
      comment: 'Canva hesabıma tek tıkla aktardım. Menü ve kampanya tasarımlarını artık ajansa ihtiyaç duymadan 5 dakikada hazırlıyorum. Kesinlikle tavsiye ederim.',
      verified: true
    },
    {
      id: 3,
      author: 'Serkan Y. - Freelance Yazılımcı',
      rating: 5,
      date: '2 hafta önce',
      comment: 'Next.js 14 mimarisi ve Stripe/PayTR entegrasyonu aşırı temiz kodlanmış. Kendi SaaS projem için 2 haftalık kodlama süresinden tasarruf ettim.',
      verified: true
    }
  ];

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(`aremhub_reviews_${product.id}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultReviews;
  });

  useEffect(() => {
    try {
      localStorage.setItem(`aremhub_reviews_${product.id}`, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews, product.id]);

  // New Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const createdReview = {
      id: Date.now(),
      author: newAuthor,
      rating: Number(newRating),
      date: 'Az önce',
      comment: newComment,
      verified: true
    };

    setReviews([createdReview, ...reviews]);
    setNewAuthor('');
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const screenshotsList = (product.screenshots && product.screenshots.length > 0)
    ? product.screenshots
    : [
        product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
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
    <div style={{ width: '100%', marginBottom: '80px' }}>
      
      {/* Top Breadcrumbs & Back Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
        <button
          onClick={onBack}
          className="btn-editorial btn-outline-editorial"
          style={{ padding: '10px 18px', fontSize: '0.88rem', gap: '8px', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Tüm Ürünlere Dön
        </button>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
          Dijital Mağaza &gt; {product.category} &gt; <strong style={{ color: 'var(--text-main)' }}>{product.title}</strong>
        </div>
      </div>

      {/* Main 2-Column Product Detail Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '36px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Gallery, Tabs, Features, Demo & Reviews */}
        <div>
          
          {/* Main Screenshot Carousel */}
          <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-strong)', marginBottom: '16px', aspectRatio: '16/9', background: '#000' }}>
            <img
              src={screenshotsList[activeImageIndex] || screenshotsList[0]}
              alt={product.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <span style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.75)', color: '#FFF', padding: '6px 12px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>
              Ekran Görüntüsü {activeImageIndex + 1} / {screenshotsList.length}
            </span>
          </div>

          {/* Thumbnail Gallery Row */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '6px' }}>
            {screenshotsList.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                aria-label={`${product.title} Ekran Görüntüsü ${idx + 1}`}
                style={{
                  width: '96px',
                  height: '64px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: activeImageIndex === idx ? '2px solid var(--accent-lime)' : '1px solid var(--border-strong)',
                  cursor: 'pointer',
                  opacity: activeImageIndex === idx ? 1 : 0.5,
                  padding: 0,
                  flexShrink: 0
                }}
              >
                <img src={img} alt={`${product.title} Ekran Görüntüsü ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>

          {/* Header Title & Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="stat-pill stat-lime" style={{ fontSize: '0.8rem' }}>
              {product.badgeLabel || '⚡ Anında İndir'}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={16} /> {product.viewsCount || '1.5k'} Görüntülenme
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShoppingBag size={16} /> {product.salesCount || '12'} Satış
            </span>
          </div>

          <h1 style={{ fontSize: '2.4rem', color: 'var(--text-main)', fontWeight: '900', lineHeight: '1.2', marginBottom: '18px' }}>
            {product.title}
          </h1>

          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '32px', fontWeight: '500' }}>
            {product.description}
          </p>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={activeTab === 'overview' ? activeTabStyle : tabStyle}
            >
              🚀 Genel Bakış & Özellikler
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={activeTab === 'reviews' ? activeTabStyle : tabStyle}
            >
              💬 Müşteri Yorumları ({reviews.length})
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              style={activeTab === 'faq' ? activeTabStyle : tabStyle}
            >
              ❓ Sık Sorulan Sorular
            </button>
          </div>

          {/* TAB 1: OVERVIEW & FEATURES */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Feature Highlights */}
              <div className="editorial-card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Zap size={20} color="var(--accent-lime)" /> Ürün İçeriği ve Öne Çıkan Özellikleri
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '700' }}>
                      <CheckCircle2 size={18} color="var(--accent-lime)" style={{ flexShrink: 0 }} /> {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Demo Links & Credentials */}
              <div className="editorial-card" style={{ padding: '28px', border: '1px dashed var(--accent-lime)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldCheck size={20} color="var(--accent-lime)" /> 🔑 Canlı Önizleme & Test Giriş Bilgileri
                    </h3>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                      Satın almadan önce hem müşteri panelini hem de yönetici panelini canlı test edebilirsiniz.
                    </p>
                  </div>

                  <a
                    href={product.demoUrl || 'https://demo.aremhub.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-editorial btn-lime"
                    style={{ padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    📹 Canlı Demoda Dene ↗
                  </a>
                </div>

                {/* 2 Role Credentials Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  
                  {/* User Role */}
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.25)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0284C7', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      👤 1. MÜŞTERİ / KULLANICI GİRİŞİ:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>E-Posta:</span>
                        <code style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '3px 8px', borderRadius: '6px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoUserEmail || 'musteri@aremhub.com'}
                        </code>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Şifre:</span>
                        <code style={{ background: 'rgba(2, 132, 199, 0.15)', padding: '3px 8px', borderRadius: '6px', color: '#38BDF8', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoUserPassword || 'user123'}
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Admin Role */}
                  <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(21, 128, 61, 0.08)', border: '1px solid rgba(21, 128, 61, 0.25)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--accent-lime)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🛡️ 2. YÖNETİCİ / ADMİN GİRİŞİ:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>E-Posta:</span>
                        <code style={{ background: 'rgba(21, 128, 61, 0.15)', padding: '3px 8px', borderRadius: '6px', color: 'var(--accent-lime)', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoAdminEmail || 'admin@aremhub.com'}
                        </code>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Şifre:</span>
                        <code style={{ background: 'rgba(21, 128, 61, 0.15)', padding: '3px 8px', borderRadius: '6px', color: 'var(--accent-lime)', fontFamily: 'monospace', fontWeight: '700' }}>
                          {product.demoAdminPassword || 'admin2026'}
                        </code>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="editorial-card" style={{ padding: '28px' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px' }}>
                  🛠️ Kullanılan Teknolojiler & Dosya Formatları
                </h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.techStack.map(t => (
                    <span key={t} style={{ fontSize: '0.85rem', padding: '6px 14px', borderRadius: '8px', background: 'var(--bg-elevated)', color: 'var(--text-main)', border: '1px solid var(--border-strong)', fontWeight: '700' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: REVIEWS & RATINGS */}
          {activeTab === 'reviews' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Rating Summary Bar */}
              <div className="editorial-card" style={{ padding: '28px', display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-subtle)', paddingRight: '28px' }}>
                  <div style={{ fontSize: '3.2rem', fontWeight: '900', color: 'var(--accent-lime)', lineHeight: '1' }}>4.9</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', margin: '6px 0', color: '#F59E0B' }}>
                    <Star size={18} fill="#F59E0B" />
                    <Star size={18} fill="#F59E0B" />
                    <Star size={18} fill="#F59E0B" />
                    <Star size={18} fill="#F59E0B" />
                    <Star size={18} fill="#F59E0B" />
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>{reviews.length} Doğrulanmış Müşteri Yorumu</div>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
                    %98 Müşteri Memnuniyeti
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Bu dijital ürünü satın alan tüm kullanıcılarımızın %98'i 5 yıldız değerlendirmesinde bulundu.
                  </p>
                </div>
              </div>

              {/* Add New Review Form */}
              <div className="editorial-card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px' }}>
                  ✍️ Değerlendirme & Yorum Yap
                </h3>

                {reviewSubmitted ? (
                  <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(21, 128, 61, 0.15)', border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', fontWeight: '700' }}>
                    ✓ Yorumunuz ve değerlendirmeniz başarıyla yayınlandı. Teşekkür ederiz!
                  </div>
                ) : (
                  <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={labelStyle}>Adınız & Soyadınız / Unvan</label>
                        <input
                          type="text"
                          required
                          placeholder="Örn: Ahmet Y. - Yazılım Uzmanı"
                          value={newAuthor}
                          onChange={e => setNewAuthor(e.target.value)}
                          style={inputStyle}
                        />
                      </div>

                      <div>
                        <label style={labelStyle}>Puanınız</label>
                        <select value={newRating} onChange={e => setNewRating(e.target.value)} style={inputStyle}>
                          <option value={5}>⭐⭐⭐⭐⭐ (5 / 5 Mükemmel)</option>
                          <option value={4}>⭐⭐⭐⭐ (4 / 5 Çok İyi)</option>
                          <option value={3}>⭐⭐⭐ (3 / 5 Orta)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Yorumunuz & Kullanım Deneyiminiz</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Ürün hakkındaki düşünceleriniz, kullanım deneyiminiz ve tavsiyeleriniz..."
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                    </div>

                    <button type="submit" className="btn-editorial btn-lime" style={{ width: 'fit-content', padding: '10px 20px', fontSize: '0.88rem' }}>
                      <Send size={16} /> Yorumu Gönder & Yayınla
                    </button>
                  </form>
                )}
              </div>

              {/* Reviews List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.map(rev => (
                  <div key={rev.id} className="editorial-card" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(21, 128, 61, 0.15)', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                          <User size={18} />
                        </div>
                        <div>
                          <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.95rem' }}>{rev.author}</div>
                          {rev.verified && (
                            <span style={{ fontSize: '0.72rem', color: '#16A34A', fontWeight: '700' }}>✓ Doğrulanmış Alıcı</span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}>
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#F59E0B" />
                        ))}
                      </div>
                    </div>

                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, fontWeight: '500' }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: FAQ */}
          {activeTab === 'faq' && (
            <div className="editorial-card" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '18px' }}>
                ❓ Sık Sorulan Sorular
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {faqs.map((f, idx) => (
                  <div key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        fontSize: '0.95rem',
                        fontWeight: '800',
                        color: 'var(--text-main)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '6px 0'
                      }}
                    >
                      <span>{f.q}</span>
                      <ChevronDown size={18} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {openFaq === idx && (
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.6', fontWeight: '500' }}>
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sticky Buying Box */}
        <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Purchase Card */}
          <div className="editorial-card" style={{ padding: '32px', border: '2px solid var(--accent-lime)', background: 'var(--bg-surface)' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '2.6rem', color: 'var(--text-main)', fontWeight: '900', fontFamily: 'var(--font-display)', lineHeight: '1' }}>
                {product.priceFormatted || product.price}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '6px' }}>
                (KDV Dahil & Anında Otomatik E-Posta Teslimatı)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => onBuyNow(product)}
                className="btn-editorial btn-lime"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem', fontWeight: '800' }}
              >
                <ShoppingBag size={20} /> Hemen Satın Al
              </button>

              <button
                onClick={() => setLiked(!liked)}
                className="btn-editorial btn-outline-editorial"
                style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem', color: liked ? '#DC2626' : 'var(--text-main)' }}
              >
                <Heart size={16} fill={liked ? '#DC2626' : 'none'} color={liked ? '#DC2626' : 'currentColor'} /> {liked ? 'Favorilerinizde' : 'Favorilere Ekle'}
              </button>
            </div>

            {/* 4 Trust Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ShieldCheck size={20} color="var(--accent-lime)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Güvenli Ödeme</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>PayTR, İyzico (TR) veya Lemon Squeezy (Global)</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Zap size={20} color="#0284C7" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Anında Otomatik İndirme</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Ödeme tamamlandığı an indirme linki e-postada</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <FileText size={20} color="#6D28D9" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>Kurumsal Fatura</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Şirketiniz adına resmi e-fatura düzenlenir</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MessageCircle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)' }}>7/24 Canlı Destek</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '500' }}>Sorularınız için uzman destek ekibi</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

const tabStyle = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-strong)',
  color: 'var(--text-main)',
  padding: '10px 18px',
  borderRadius: '12px',
  fontSize: '0.88rem',
  fontWeight: '800',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: 'var(--font-display)',
  transition: 'all 0.2s ease'
};

const activeTabStyle = {
  ...tabStyle,
  background: 'var(--accent-lime)',
  color: '#FFFFFF',
  border: '1px solid var(--accent-lime)'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '700',
  color: 'var(--text-main)',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-strong)',
  color: 'var(--text-main)',
  fontSize: '0.88rem',
  fontWeight: '700',
  outline: 'none'
};
