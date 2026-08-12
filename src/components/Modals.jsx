import React, { useState } from 'react';
import { X, Plus, Sparkles, Send, CheckCircle2, ExternalLink, RefreshCw, Activity, Server, Calendar, ShoppingBag, Eye, Smartphone, Monitor, Download, Zap, Star } from 'lucide-react';

export function ProductDemoModal({ isOpen, onClose, product, onBuyProduct }) {
  const [deviceView, setDeviceView] = useState('desktop');

  if (!isOpen || !product) return null;

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={{ ...modalContentStyle, maxWidth: '940px', width: '92%', height: '85vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Modal Header */}
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(132, 204, 22, 0.15)',
              color: 'var(--accent-lime)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800'
            }}>
              {product.title.charAt(0)}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>{product.title} — Canlı Önizleme & Detay</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.category} • {product.priceFormatted}</div>
            </div>
          </div>

          {/* Device Switcher Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', background: 'var(--bg-darkest)', padding: '3px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setDeviceView('desktop')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: deviceView === 'desktop' ? 'rgba(132, 204, 22, 0.2)' : 'transparent',
                  color: deviceView === 'desktop' ? 'var(--accent-lime)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Monitor size={14} /> Desktop
              </button>

              <button
                onClick={() => setDeviceView('mobile')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  background: deviceView === 'mobile' ? 'rgba(132, 204, 22, 0.2)' : 'transparent',
                  color: deviceView === 'mobile' ? 'var(--accent-lime)' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Smartphone size={14} /> Mobil
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onBuyProduct(product);
              }}
              className="btn-editorial btn-lime"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              Satın Al ({product.priceFormatted})
            </button>

            <button onClick={onClose} style={closeBtnStyle} aria-label="Pencereyi Kapat"><X size={18} /></button>
          </div>
        </div>

        {/* Live Demo Canvas View */}
        <div style={{
          flex: 1,
          marginTop: '16px',
          background: 'var(--bg-obsidian)',
          borderRadius: '16px',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {deviceView === 'desktop' ? (
            <div style={{ width: '100%', height: '100%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>💻</div>
              <h4 style={{ color: '#FFF', fontSize: '1.4rem', fontWeight: '800' }}>{product.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '8px 0 20px' }}>
                Canlı demo simülasyon modu aktiftir. Şablon dosyanızı ve tüm eğitim içeriklerini satın alımdan sonra anında indirebilirsiniz.
              </p>
              <button onClick={() => { onClose(); onBuyProduct(product); }} className="btn-editorial btn-lime">
                <Download size={16} /> Satın Al ve Anında İndir ({product.priceFormatted})
              </button>
            </div>
          ) : (
            <div style={{
              width: '320px',
              height: '92%',
              background: 'var(--bg-surface)',
              border: '4px solid #334155',
              borderRadius: '24px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}>
              <div style={{ width: '60px', height: '4px', background: '#334155', borderRadius: '2px', marginBottom: '20px' }}></div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', marginBottom: '8px' }}>MOBİL GÖRÜNÜM DEMOSU</div>
              <h5 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '8px' }}>{product.title}</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '16px' }}>%100 Mobil Cihaz Uyumlu</p>
              <button onClick={() => { onClose(); onBuyProduct(product); }} className="btn-editorial btn-lime" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                Satın Al ({product.priceFormatted})
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export function QuoteModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Hazır Dijital Şablon / Ürün Satın Alımı');
  const [budget, setBudget] = useState('₺150 - ₺500 (Dijital Şablon)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wantConsultingUpsell, setWantConsultingUpsell] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2200);
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>aremhub Satın Alma & Teklif Formu</h3>
          <button onClick={onClose} style={closeBtnStyle} aria-label="Pencereyi Kapat"><X size={18} /></button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.2rem' }}>Talebiniz Alındı!</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
              İndirme bağlantısı ve ajans teklifimiz `{email}` adresinize iletilmiştir.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
            
            {/* Pillar 1: Tripwire Funnel Upsell Banner */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.15) 0%, rgba(2, 132, 199, 0.1) 100%)',
              padding: '14px',
              borderRadius: '12px',
              border: '1px solid rgba(132, 204, 22, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: 'var(--accent-lime)' }}>
                <Zap size={16} /> ÖZEL FIRSAT: %20 Danışmanlık İndirimi
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                "Bu şablonları kendiniz uygulamak istemiyorsanız, reklam ve sosyal medya hesabınızı ekibimizin yönetmesi için ilk ay %20 indirimli ajans teklifi ekleyelim mi?"
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#FFF' }}>
                <input
                  type="checkbox"
                  checked={wantConsultingUpsell}
                  onChange={e => setWantConsultingUpsell(e.target.checked)}
                />
                <strong>Evet, ilk ay %20 indirimli ajans teklifi almak istiyorum</strong>
              </label>
            </div>

            <div>
              <label htmlFor="quote-name" style={labelStyle}>Adınız & Soyadınız / Firma</label>
              <input id="quote-name" type="text" required placeholder="Örn: Selin Yılmaz" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="quote-email" style={labelStyle}>E-Posta Adresiniz (Anında İndirme İçin)</label>
              <input id="quote-email" type="email" required placeholder="selin@firma.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="quote-service" style={labelStyle}>İlgilendiğiniz Ürün / Hizmet</label>
              <select id="quote-service" value={service} onChange={e => setService(e.target.value)} style={inputStyle}>
                <option value="Hazır Dijital Şablon / Ürün Satın Alımı">Hazır Dijital Şablon / Ürün Satın Alımı</option>
                <option value="Google & Meta Ads Yönetimi">Google & Meta Ads Yönetimi (Ajans Hizmeti)</option>
                <option value="Özel Web Yazılımı & Tasarımı">Özel Web Yazılımı & Tasarımı (Ajans Hizmeti)</option>
                <option value="Sosyal Medya Yönetimi">Sosyal Medya Yönetimi (Ajans Hizmeti)</option>
              </select>
            </div>
            <div>
              <label htmlFor="quote-message" style={labelStyle}>Proje Notları</label>
              <textarea id="quote-message" rows={2} placeholder="Siparişiniz veya projeniz hakkında kısa not..." value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            <button type="submit" className="btn-editorial btn-lime" style={{ marginTop: '6px', width: '100%', justifyContent: 'center' }}>
              <Send size={16} /> Siparişi / Talebi Gönder
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function NewProductModal({ isOpen, onClose, onAddProduct, initialProduct = null }) {
  const isEditing = Boolean(initialProduct);

  const [title, setTitle] = useState(initialProduct?.title || '');
  const [category, setCategory] = useState(initialProduct?.category || 'Sektörel Sosyal Medya Kitleri');
  const [categorySlug, setCategorySlug] = useState(initialProduct?.categorySlug || 'social-kits');
  const [priceFormatted, setPriceFormatted] = useState(initialProduct?.priceFormatted || '₺299');
  const [badgeLabel, setBadgeLabel] = useState(initialProduct?.badgeLabel || '⚡ Anında İndir');
  const [demoUrl, setDemoUrl] = useState(initialProduct?.demoUrl || 'https://demo.aremhub.com/kit');
  const [description, setDescription] = useState(initialProduct?.description || '');
  const [featuresText, setFeaturesText] = useState(
    initialProduct?.features ? initialProduct.features.join('\n') : '100+ Hazır Görsel Şablonu\nTek Tıkla Hesabınıza Aktarım\nAçıklama Metinleri & İlgili Hashtag Rehberi'
  );
  const [techStackText, setTechStackText] = useState(
    initialProduct?.techStack ? initialProduct.techStack.join(', ') : 'Canva, Instagram, Story, Reels'
  );
  const [viewsCount, setViewsCount] = useState(initialProduct?.viewsCount || '1.5k');
  const [salesCount, setSalesCount] = useState(initialProduct?.salesCount || '12');
  const [demoUserEmail, setDemoUserEmail] = useState(initialProduct?.demoUserEmail || 'musteri@aremhub.com');
  const [demoUserPassword, setDemoUserPassword] = useState(initialProduct?.demoUserPassword || 'user123');
  const [demoAdminEmail, setDemoAdminEmail] = useState(initialProduct?.demoAdminEmail || 'admin@aremhub.com');
  const [coverImage, setCoverImage] = useState(
    initialProduct?.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  );
  const [screenshots, setScreenshots] = useState(
    initialProduct?.screenshots || [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
    ]
  );

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScreenshotsUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshots(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeScreenshot = (indexToRemove) => {
    setScreenshots(screenshots.filter((_, idx) => idx !== indexToRemove));
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const featuresArray = featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const techArray = techStackText
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    onAddProduct({
      id: initialProduct ? initialProduct.id : Date.now(),
      title,
      category,
      categorySlug,
      price: priceFormatted,
      priceFormatted,
      image: coverImage,
      screenshots: screenshots.length > 0 ? screenshots : [coverImage],
      demoUrl: demoUrl || 'https://demo.aremhub.com',
      demoUserEmail,
      demoUserPassword,
      demoAdminEmail,
      demoAdminPassword,
      description,
      badgeLabel: badgeLabel || '⚡ Anında İndir',
      features: featuresArray.length ? featuresArray : ['Kullanıma Hazır Paket'],
      techStack: techArray.length ? techArray : ['Dijital Paket'],
      viewsCount,
      salesCount,
      status: initialProduct?.status || 'active',
      rating: initialProduct?.rating || '4.9 ★ (80+ Yorum)',
      accentColor: initialProduct?.accentColor || 'var(--accent-lime)'
    });

    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={{ ...modalContentStyle, maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--accent-lime)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>
              {isEditing ? '✏️ Ürün Görselleri & Bilgilerini Düzenle' : '➕ Yeni Dijital Ürün / Şablon Ekle'}
            </h3>
          </div>
          <button onClick={onClose} style={closeBtnStyle} aria-label="Pencereyi Kapat"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          
          {/* IMAGE UPLOADS SECTION */}
          <div style={{ background: 'rgba(21, 128, 61, 0.08)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(21, 128, 61, 0.3)' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--accent-lime)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🖼️ Ürün Ana Görseli ve Ekran Görüntüleri (Galeri)
            </div>

            {/* Main Cover Image */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Ana Ürün / Kapak Görseli URL veya Dosya Yükle</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="https://..."
                  value={coverImage}
                  onChange={e => setCoverImage(e.target.value)}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <label className="btn-editorial btn-outline-editorial" style={{ cursor: 'pointer', padding: '10px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                  📁 Bilgisayardan Yükle
                  <input type="file" accept="image/*" onChange={handleCoverUpload} style={{ display: 'none' }} />
                </label>
              </div>

              {coverImage && (
                <div style={{ marginTop: '8px', width: '120px', height: '70px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155' }}>
                  <img src={coverImage} alt="Cover Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            {/* Screenshots Gallery Upload */}
            <div>
              <label style={labelStyle}>Ekran Görüntüleri Galerisi (Detaylı Ürün İnceleme Sayfası İçin)</label>
              <div style={{ marginBottom: '10px' }}>
                <label className="btn-editorial btn-lime" style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  ➕ Çoklu Ekran Görüntüsü Yükle
                  <input type="file" accept="image/*" multiple onChange={handleScreenshotsUpload} style={{ display: 'none' }} />
                </label>
              </div>

              {/* Screenshots Thumbnails */}
              {screenshots.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {screenshots.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative', width: '90px', height: '56px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155' }}>
                      <img src={img} alt={`thumb-${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => removeScreenshot(idx)}
                        style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(239, 68, 68, 0.9)', color: '#FFF', border: 'none', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px' }}
                        title="Resmi Sil"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div>
            <label style={labelStyle}>Ürün / Şablon Adı</label>
            <input type="text" required placeholder="Örn: Restoran & Kafeler İçin 100+ Canva Sosyal Medya Kiti" value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Kategori</label>
              <select value={categorySlug} onChange={e => {
                setCategorySlug(e.target.value);
                const catMap = {
                  'social-kits': 'Sektörel Sosyal Medya Kitleri',
                  'ads-prompts': 'Reklam & AI Prompt Paketleri',
                  'crm-templates': 'Yönetim & CRM Şablonları',
                  'software-licenses': 'Yazılım & Lisans Paketleri'
                };
                setCategory(catMap[e.target.value] || 'Dijital Şablon');
              }} style={inputStyle}>
                <option value="social-kits">Sektörel Sosyal Medya Kitleri</option>
                <option value="ads-prompts">Reklam & AI Prompt Paketleri</option>
                <option value="crm-templates">Yönetim & CRM Şablonları</option>
                <option value="software-licenses">Yazılım & Lisans Paketleri</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Satış Fiyatı (₺)</label>
              <input type="text" required placeholder="Örn: ₺299" value={priceFormatted} onChange={e => setPriceFormatted(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Ürün Etiketi (Badge)</label>
              <input type="text" placeholder="Örn: ⚡ Anında İndir" value={badgeLabel} onChange={e => setBadgeLabel(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Canlı Önizleme / Demo URL</label>
              <input type="url" placeholder="https://demo.aremhub.com/..." value={demoUrl} onChange={e => setDemoUrl(e.target.value)} style={inputStyle} />
            </div>
          </div>

          {/* User Demo Credentials */}
          <div style={{ background: 'rgba(2, 132, 199, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(2, 132, 199, 0.3)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0284C7', marginBottom: '8px' }}>👤 Müşteri / Kullanıcı Demo Giriş Bilgileri</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Müşteri E-Posta</label>
                <input type="text" placeholder="musteri@aremhub.com" value={demoUserEmail} onChange={e => setDemoUserEmail(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Müşteri Şifre</label>
                <input type="text" placeholder="user123" value={demoUserPassword} onChange={e => setDemoUserPassword(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Admin Demo Credentials */}
          <div style={{ background: 'rgba(21, 128, 61, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(21, 128, 61, 0.3)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-lime)', marginBottom: '8px' }}>🛡️ Yönetici / Admin Demo Giriş Bilgileri</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Admin E-Posta</label>
                <input type="text" placeholder="admin@aremhub.com" value={demoAdminEmail} onChange={e => setDemoAdminEmail(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Admin Şifre</label>
                <input type="text" placeholder="admin2026" value={demoAdminPassword} onChange={e => setDemoAdminPassword(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Görüntülenme Sayısı</label>
              <input type="text" placeholder="1.5k" value={viewsCount} onChange={e => setViewsCount(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Satış Sayısı</label>
              <input type="text" placeholder="12" value={salesCount} onChange={e => setSalesCount(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Kısa Açıklama</label>
            <textarea rows={2} required placeholder="Ürün kartında görünecek açıklama..." value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div>
            <label style={labelStyle}>Özellikler Listesi (Her Satıra 1 Özellik)</label>
            <textarea rows={4} required placeholder="100+ Hazır Canva Görsel & Post Şablonu&#10;Sektörel Hikaye (Story) & Reels Kapakları&#10;Tek Tıkla Canva Hesabınıza Aktarım" value={featuresText} onChange={e => setFeaturesText(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <div>
            <label style={labelStyle}>Teknoloji / Etiketler (Virgülle Ayırın)</label>
            <input type="text" placeholder="Canva, Instagram, Story, Reels" value={techStackText} onChange={e => setTechStackText(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '14px' }}>
            <button type="button" onClick={onClose} className="btn-editorial btn-outline-editorial" style={{ justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}>
              ❌ İptal / Kapat
            </button>
            <button type="submit" className="btn-editorial btn-lime" style={{ justifyContent: 'center', padding: '12px', fontSize: '0.9rem', fontWeight: '800' }}>
              <Plus size={16} /> {isEditing ? 'Değişiklikleri Kaydet' : 'Mağazaya Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function CalendlyModal({ isOpen, onClose }) {
  const [selectedDate, setSelectedDate] = useState('12 Ağustos 2026');
  const [selectedTime, setSelectedTime] = useState('14:30');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSchedule = (e) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setName('');
      setEmail('');
      onClose();
    }, 2000);
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={{ ...modalContentStyle, maxWidth: '520px' }}>
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={22} color="var(--accent-lime)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>aremhub 15 Dk. Keşif Görüşmesi (Calendly)</h3>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        {confirmed ? (
          <div style={{ textAlign: 'center', padding: '36px 10px' }}>
            <CheckCircle2 size={52} color="#10B981" style={{ margin: '0 auto 14px' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.3rem' }}>Randevunuz Oluşturuldu!</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
              Toplantı Google Meet linki `{email}` adresinize gönderildi.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSchedule} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '18px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Toplantı Konusu:</div>
              <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#FFF', marginTop: '2px' }}>
                Web Yazılım, Şablonlar & Meta/Google Ads Stratejisi Değerlendirmesi
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Tarih Seçin</label>
                <select value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={inputStyle}>
                  <option value="12 Ağustos 2026">12 Ağustos 2026</option>
                  <option value="13 Ağustos 2026">13 Ağustos 2026</option>
                  <option value="14 Ağustos 2026">14 Ağustos 2026</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Saat Seçin</label>
                <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} style={inputStyle}>
                  <option value="10:00">10:00</option>
                  <option value="14:30">14:30</option>
                  <option value="16:00">16:00</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Adınız & Soyadınız</label>
              <input type="text" required placeholder="Ahmet Yılmaz" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>E-Posta Adresiniz</label>
              <input type="email" required placeholder="ahmet@firma.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
            </div>

            <button type="submit" className="btn-editorial btn-lime" style={{ marginTop: '6px', width: '100%', justifyContent: 'center' }}>
              <Calendar size={16} /> Randevuyu Onayla & Takvime Ekle
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export function DemoModal({ isOpen, onClose, app }) {
  const [pinging, setPinging] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');

  if (!isOpen || !app) return null;

  const handlePing = () => {
    setPinging(true);
    setTimeout(() => setPinging(false), 700);
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={{ ...modalContentStyle, maxWidth: '680px' }}>
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(132, 204, 22, 0.15)',
              color: 'var(--accent-lime)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800'
            }}>
              {app.name.charAt(0)}
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>{app.name}</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.category} • v{app.version}</div>
            </div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button 
              onClick={() => setActiveTab('preview')} 
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'preview' ? 'rgba(132, 204, 22, 0.2)' : 'transparent',
                color: activeTab === 'preview' ? 'var(--accent-lime)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Canlı Önizleme
            </button>
            <button 
              onClick={() => setActiveTab('metrics')} 
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'metrics' ? 'rgba(132, 204, 22, 0.2)' : 'transparent',
                color: activeTab === 'metrics' ? 'var(--accent-lime)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              Sunucu Sağlık & Metrikler
            </button>
          </div>

          <button onClick={handlePing} className="btn-editorial btn-outline-editorial" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <RefreshCw size={12} className={pinging ? 'spin-icon' : ''} /> Ping Testi ({app.latency || 14}ms)
          </button>
        </div>

        {activeTab === 'preview' ? (
          <div style={{
            height: '300px',
            borderRadius: '14px',
            background: 'var(--bg-obsidian)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <Server size={42} color="var(--accent-lime)" style={{ marginBottom: '12px' }} />
            <h4 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '6px' }}>{app.name} İnteraktif Canlı Demosu</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '440px', lineHeight: '1.5', marginBottom: '20px' }}>
              {app.description}
            </p>

            <a
              href={app.url || 'https://aremhub.com'}
              target="_blank"
              rel="noreferrer"
              className="btn-editorial btn-lime"
            >
              Tam Ekran Canlı Uygulamada Aç <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uptime Garantisi</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>%{app.uptime || 99.99}</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ortalama Latency</div>
              <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-lime)', marginTop: '4px' }}>{app.latency || 14}ms</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export function NewAppModal({ isOpen, onClose, onAddApp }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('SaaS');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [version, setVersion] = useState('1.0.0');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) return;
    onAddApp({
      id: Date.now(),
      name,
      category,
      description,
      url: url || 'https://aremhub.com',
      version,
      status: 'active',
      latency: Math.floor(Math.random() * 20) + 12,
      uptime: 99.9,
      usersCount: '1.2k',
      features: [
        'Otomatik müşteri pipeline takibi',
        'Next.js / React altyapısı'
      ],
      techStack: ['Next.js', 'React', 'Tailwind']
    });
    setName('');
    setDescription('');
    setUrl('');
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>Yeni Yazılım Projesi Ekle</h3>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div>
            <label style={labelStyle}>Yazılım / Proje Adı</label>
            <input type="text" required placeholder="Örn: AremSEO SaaS, CRM Engine..." value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Kategori</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              <option value="SaaS">SaaS</option>
              <option value="Web App">Web App</option>
              <option value="Mobil App">Mobil App</option>
              <option value="API Service">API Service</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Açıklama</label>
            <textarea rows={3} required placeholder="Yazılım ne iş yapar?" value={description} onChange={e => setDescription(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Erişim URL'i</label>
              <input type="url" placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Versiyon</label>
              <input type="text" value={version} onChange={e => setVersion(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <button type="submit" className="btn-editorial btn-lime" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
            <Plus size={16} /> AremHub'a Ekle
          </button>
        </form>
      </div>
    </div>
  );
}

export function NewAdModal({ isOpen, onClose, onAddAd }) {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState('Meta Ads');
  const [budgetSpent, setBudgetSpent] = useState('5000');
  const [roas, setRoas] = useState('4.2');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    onAddAd({
      id: Date.now(),
      title,
      platform,
      status: 'active',
      budgetSpent: Number(budgetSpent),
      roas: Number(roas),
      impressions: Math.floor(Math.random() * 50000) + 10000,
      clicks: Math.floor(Math.random() * 2000) + 400,
      ctr: 3.8,
      conversions: Math.floor(Math.random() * 100) + 20
    });
    setTitle('');
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>Yeni Ads Kampanyası Oluştur</h3>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div>
            <label style={labelStyle}>Kampanya Başlığı</label>
            <input type="text" required placeholder="Örn: Hazır E-Ticaret Sitesi Meta Ads..." value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Platform</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} style={inputStyle}>
              <option value="Meta Ads">Meta Ads (Instagram & FB)</option>
              <option value="Google Ads">Google Ads (Search & Display)</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Aylık Bütçe (₺)</label>
              <input type="number" value={budgetSpent} onChange={e => setBudgetSpent(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Hedef ROAS (x)</label>
              <input type="number" step="0.1" value={roas} onChange={e => setRoas(e.target.value)} style={inputStyle} />
            </div>
          </div>
          <button type="submit" className="btn-editorial btn-lime" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
            <Plus size={16} /> Kampanyayı Başlat
          </button>
        </form>
      </div>
    </div>
  );
}

export function NewPostModal({ isOpen, onClose, onAddPost }) {
  const [platform, setPlatform] = useState('Instagram');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('Yarın 14:00');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;
    onAddPost({
      id: Date.now(),
      platform,
      content,
      date,
      status: 'scheduled'
    });
    setContent('');
    onClose();
  };

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card" style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFF' }}>Gönderi Zamanla</h3>
          <button onClick={onClose} style={closeBtnStyle}><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
          <div>
            <label style={labelStyle}>Sosyal Medya Kanalı</label>
            <select value={platform} onChange={e => setPlatform(e.target.value)} style={inputStyle}>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="X (Twitter)">X (Twitter)</option>
              <option value="YouTube">YouTube</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Gönderi İçeriği</label>
            <textarea rows={3} required placeholder="Paylaşım metniniz..." value={content} onChange={e => setContent(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div>
            <label style={labelStyle}>Yayın Zamanı</label>
            <input type="text" value={date} onChange={e => setDate(e.target.value)} style={inputStyle} placeholder="Örn: 10 Ağustos 18:30" />
          </div>
          <button type="submit" className="btn-editorial btn-lime" style={{ marginTop: '10px', width: '100%', justifyContent: 'center' }}>
            <Plus size={16} /> Takvime Ekle
          </button>
        </form>
      </div>
    </div>
  );
}

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.88)',
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  padding: '20px'
};

const modalContentStyle = {
  width: '100%',
  maxWidth: '520px',
  padding: '32px',
  borderRadius: '24px',
  background: '#0B0F19',
  border: '1px solid #1E293B',
  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95)',
  color: '#FFFFFF'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
};

const closeBtnStyle = {
  background: '#1E293B',
  border: '1px solid #475569',
  color: '#FFFFFF',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
  flexShrink: 0
};

const labelStyle = {
  display: 'block',
  fontSize: '0.82rem',
  fontWeight: '800',
  color: '#F1F5F9',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '12px',
  background: '#0F172A', // Solid dark slate input box (independent of theme)
  border: '1px solid #334155',
  color: '#FFFFFF',      // Pure high-contrast white text inside
  fontSize: '0.9rem',
  fontWeight: '600',
  outline: 'none',
  boxSizing: 'border-box'
};

export function PrivacyPolicyModal({ isOpen, onClose, initialTab = 'kvkk' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div style={modalOverlayStyle}>
      <div className="glass-card animate-fade-in-up" style={{ ...modalContentStyle, maxWidth: '780px', width: '92%', maxHeight: '88vh', overflowY: 'auto' }}>
        <div style={modalHeaderStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} color="var(--accent-lime)" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFF' }}>
                Yasal Bilgilendirme & Güvenlik Politikaları
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                KVKK, SSL Güvenlik Standardı, İptal ve İade Şartları Metni
              </div>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Pencereyi Kapat">
            <X size={20} color="#FFF" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('kvkk')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'kvkk' ? 'var(--accent-lime)' : 'var(--bg-elevated)',
              color: activeTab === 'kvkk' ? '#FFF' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            📋 KVKK Aydınlatma Metni
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'privacy' ? 'var(--accent-lime)' : 'var(--bg-elevated)',
              color: activeTab === 'privacy' ? '#FFF' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            🔒 Gizlilik & SSL Güvenliği
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'terms' ? 'var(--accent-lime)' : 'var(--bg-elevated)',
              color: activeTab === 'terms' ? '#FFF' : 'var(--text-muted)',
              fontSize: '0.82rem',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            📜 Kullanım Koşulları & İade
          </button>
        </div>

        {/* Content Section */}
        <div style={{ fontSize: '0.9rem', color: '#E2E8F0', lineHeight: '1.7' }}>
          {activeTab === 'kvkk' && (
            <div>
              <h4 style={{ color: 'var(--accent-lime)', fontSize: '1.05rem', fontWeight: '800', marginBottom: '10px' }}>
                6698 Sayılı KVKK Uyarınca Kişisel Verilerin İşlenmesi Hakkında Aydınlatma Metni
              </h4>
              <p style={{ marginBottom: '12px' }}>
                <strong>AremHub Teknoloji ve Dijital Ajans</strong> ("Şirket") olarak, müşterilerimizin ve web sitemizi ziyaret eden kullanıcılarımızın kişisel verilerinin gizliliğine ve güvenliğine en üst düzeyde önem vermekteyiz.
              </p>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px' }}>
                <li><strong>İşlenen Veriler:</strong> Ad, soyad, e-posta adresi, telefon numarası, kurumsal fatura bilgileri ve ödeme işlem referans kodları.</li>
                <li><strong>İşleme Amacı:</strong> Satın alınan hazır şablon ve yazılımların anında e-posta teslimatı, faturalandırma işlemleri ve müşteri destek hizmetleri.</li>
                <li><strong>Veri Güvenliği:</strong> Kişisel verileriniz 256-bit SSL şifreleme ve PCI-DSS standartlarına uygun güvenli sunucularda saklanmakta olup 3. şahıslarla asla paylaşılmaz.</li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h4 style={{ color: 'var(--accent-lime)', fontSize: '1.05rem', fontWeight: '800', marginBottom: '10px' }}>
                Gizlilik, Çerez Politikası & Ödeme Güvenliği
              </h4>
              <p style={{ marginBottom: '12px' }}>
                AremHub üzerinden yapılan tüm kredi kartı ve banka kartı işlemleri <strong>PayTR, İyzico ve Stripe</strong> lisanslı ödeme altyapıları üzerinden 256-bit SSL korumasıyla gerçekleşmektedir.
              </p>
              <p style={{ marginBottom: '12px' }}>
                Kredi kartı bilgileriniz kesinlikle sunucularımızda saklanmaz veya kaydedilmez. İşlemler banka ile sizin aranızda şifreli kanal üzerinden tamamlanır.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div>
              <h4 style={{ color: 'var(--accent-lime)', fontSize: '1.05rem', fontWeight: '800', marginBottom: '10px' }}>
                Kullanım Koşulları & Dijital Ürün İade Politikası
              </h4>
              <p style={{ marginBottom: '12px' }}>
                Satın alınan tüm dijital şablonlar, kaynak kodlar ve Reels medya kitleri telif hakları yasaları kapsamındadır. İndirilebilir dijital içeriklerin anında teslimatlı niteliği gereği, indirme bağlantısı iletildikten sonra cayma hakkı kapsamı dışında tutulmaktadır.
              </p>
              <p style={{ marginBottom: '12px' }}>
                Teknik herhangi bir problemde veya dosya erişim hatasında 7/24 destek ekibimiz anında yeni erişim linki sağlamakla yükümlüdür.
              </p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
          <button onClick={onClose} className="btn-editorial btn-lime" style={{ padding: '8px 20px', fontSize: '0.88rem' }}>
            Anladım, Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
