import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Eye, 
  CheckCircle2, 
  Star, 
  Download,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DigitalStoreSection({ products, onSelectProductDemo, onBuyProduct }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tüm Dijital Paketler' },
    { id: 'social-kits', label: 'Sektörel Sosyal Medya Kitleri' },
    { id: 'ads-prompts', label: 'Reklam & AI Prompt Paketleri' },
    { id: 'crm-templates', label: 'Yönetim & CRM Şablonları' },
    { id: 'software-licenses', label: 'Yazılım & Lisans Paketleri' }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.categorySlug === activeCategory);

  return (
    <section id="digital-store" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className="stat-pill stat-lime">
            <ShoppingBag size={14} /> {t.store.badge}
          </span>
        </div>

        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          {t.store.title1} <span className="gradient-text-arem">{t.store.titleGreen}</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          {t.store.subtitle}
        </p>
      </div>

      {/* Category Filter Tabs Centered */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              border: activeCategory === cat.id ? '1px solid var(--accent-lime)' : '1px solid var(--border-strong)',
              background: activeCategory === cat.id ? 'rgba(21, 128, 61, 0.15)' : 'var(--bg-surface)',
              color: activeCategory === cat.id ? 'var(--accent-lime)' : 'var(--text-main)',
              fontSize: '0.88rem',
              fontWeight: '800',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              transition: 'all 0.2s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid - 4 Columns Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="editorial-card"
            style={{
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'var(--bg-surface)',
              borderTop: `4px solid ${product.accentColor || 'var(--accent-lime)'}`
            }}
          >
            <div>
              
              {/* Product Cover Image Thumbnail */}
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                marginBottom: '16px',
                aspectRatio: '16/9',
                background: '#000',
                border: '1px solid var(--border-subtle)'
              }}>
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}
                  alt={product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span className="stat-pill stat-lime" style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '0.72rem', backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.75)' }}>
                  {product.badgeLabel || '⚡ Anında İndir'}
                </span>
              </div>

              {/* Product Badge & ugilabs Stats */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-lime)', fontWeight: '800' }}>
                  {product.category}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Eye size={13} /> {product.viewsCount || '1.5k'}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><ShoppingBag size={13} /> {product.salesCount || '12'}</span>
                </div>
              </div>

              {/* Title & Price */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '800', lineHeight: '1.3' }}>
                  {product.title}
                </h3>
                <div style={{
                  fontSize: '1.3rem',
                  fontWeight: '900',
                  color: 'var(--accent-lime)',
                  fontFamily: 'var(--font-display)',
                  whiteSpace: 'nowrap'
                }}>
                  {product.priceFormatted}
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '16px', fontWeight: '500' }}>
                {product.description}
              </p>

              {/* Features List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                {product.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-main)', fontWeight: '700' }}>
                    <CheckCircle2 size={15} color="var(--accent-lime)" style={{ flexShrink: 0 }} /> {feat}
                  </div>
                ))}
              </div>

              {/* Tech / Format Badges */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                {product.techStack.map(t => (
                  <span key={t} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'var(--bg-elevated)', color: 'var(--text-main)', border: '1px solid var(--border-strong)', fontWeight: '700' }}>
                    {t}
                  </span>
                ))}
              </div>

            </div>

            {/* Actions */}
            <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border-subtle)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => onSelectProductDemo(product)}
                className="btn-editorial btn-outline-editorial"
                style={{ padding: '8px 10px', fontSize: '0.82rem', justifyContent: 'center' }}
              >
                {t.store.viewDetails}
              </button>

              <button
                onClick={() => onBuyProduct(product)}
                className="btn-editorial btn-lime"
                style={{ padding: '8px 10px', fontSize: '0.82rem', justifyContent: 'center' }}
              >
                <Download size={14} /> {t.store.buyNow}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* View All Products CTA Link */}
      <div style={{ textAlign: 'center', marginTop: '36px' }}>
        <button
          onClick={() => {
            const el = document.getElementById('digital-store');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="btn-editorial btn-outline-editorial"
          style={{ padding: '12px 24px', fontSize: '0.92rem', gap: '8px' }}
        >
          🛍️ Tüm Hazır Web Sitelerini & Şablonları Mağazada Gör ({products.length} Ürün) <ArrowUpRight size={16} />
        </button>
      </div>

    </section>
  );
}
