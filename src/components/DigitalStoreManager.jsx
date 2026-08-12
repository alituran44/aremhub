import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Trash2, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  Tag, 
  ExternalLink, 
  RefreshCw,
  Search
} from 'lucide-react';

export default function DigitalStoreManager({ 
  products, 
  onOpenAddProductModal, 
  onEditProduct,
  onToggleProductStatus, 
  onDeleteProduct,
  onResetProducts
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="editorial-card" style={{ padding: '32px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={24} color="var(--accent-lime)" />
            <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>Dijital Ürün & Web Sitesi Satış Yönetimi</h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Mağazadaki hazır web sitelerini, fiyatları, özellikleri, canlı demo linklerini ve stok durumlarını yönetin.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {onResetProducts && (
            <button onClick={onResetProducts} className="btn-editorial btn-outline-editorial" style={{ padding: '10px 14px', fontSize: '0.82rem', gap: '6px' }}>
              <RefreshCw size={14} /> Varsayılana Sıfırla
            </button>
          )}

          <button onClick={onOpenAddProductModal} className="btn-editorial btn-lime" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            <Plus size={16} /> Yeni Web Sitesi / Ürün Ekle
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Ürün veya şablon adı ara..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              borderRadius: '10px',
              background: 'var(--bg-obsidian)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
          <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Product List Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px' }}>Ürün / Şablon Adı</th>
              <th style={{ padding: '12px' }}>Kategori</th>
              <th style={{ padding: '12px' }}>Satış Fiyatı</th>
              <th style={{ padding: '12px' }}>Görüntülenme / Satış</th>
              <th style={{ padding: '12px' }}>Durum</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                <td style={{ padding: '14px 12px', color: '#FFF', fontWeight: '600' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(132, 204, 22, 0.15)',
                      color: 'var(--accent-lime)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800'
                    }}>
                      {p.title.charAt(0)}
                    </div>
                    <div>
                      <div>{p.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--accent-lime)' }}>{p.badgeLabel || '⚡ Anında İndir'}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{p.category}</td>
                <td style={{ padding: '14px 12px', color: 'var(--accent-lime)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>{p.priceFormatted}</td>
                <td style={{ padding: '14px 12px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700' }}>
                  👁️ {p.viewsCount || '1.5k'} • 🛍️ {p.salesCount || '12'}
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    background: p.status === 'active' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: p.status === 'active' ? '#10B981' : '#F87171'
                  }}>
                    {p.status === 'active' ? 'Satışta' : 'Pasif'}
                  </span>
                </td>
                <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => onEditProduct(p)}
                      className="btn-editorial btn-lime"
                      style={{ padding: '4px 10px', fontSize: '0.75rem', gap: '4px' }}
                    >
                      <Edit3 size={13} /> Düzenle
                    </button>

                    <button
                      onClick={() => onToggleProductStatus(p.id)}
                      className="btn-editorial btn-outline-editorial"
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {p.status === 'active' ? 'Pasife Al' : 'Yayına Al'}
                    </button>

                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: 'rgba(239, 68, 68, 0.15)',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        color: '#F87171',
                        cursor: 'pointer'
                      }}
                      title="Ürünü Sil"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

