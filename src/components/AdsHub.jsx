import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Search, 
  TrendingUp, 
  DollarSign, 
  MousePointer, 
  Eye, 
  Play, 
  Pause,
  BarChart2,
  Trash2
} from 'lucide-react';

export default function AdsHub({ ads, onOpenAdModal, onToggleAdStatus, onDeleteAd, onUpdateAdBudget }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'All' || ad.platform === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const totalSpent = ads.reduce((acc, curr) => acc + curr.budgetSpent, 0);
  const totalConversions = ads.reduce((acc, curr) => acc + curr.conversions, 0);
  const totalClicks = ads.reduce((acc, curr) => acc + curr.clicks, 0);
  const avgRoas = (ads.reduce((acc, curr) => acc + curr.roas, 0) / (ads.length || 1)).toFixed(2);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner for Ads Hub */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', borderLeft: '4px solid var(--arem-r-main)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-arem badge-r">R Pillar</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#FFF' }}>
                Reklam / Ads Üssü (Meta & Google Ads)
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
              Tüm dijital pazarlama kampanyalarınızın harcamaları, ROAS oranları, tıklamaları ve dönüşüm optimizasyonu.
            </p>
          </div>

          <button className="btn btn-primary" onClick={onOpenAdModal} style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
            <Plus size={16} /> Yeni Kampanya Oluştur
          </button>
        </div>
      </div>

      {/* Ads Key Performance Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        
        <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={14} color="#10B981" /> Toplam Harcama
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10B981', marginTop: '4px' }}>
            ₺{totalSpent.toLocaleString('tr-TR')}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={14} color="#10B981" /> Ortalama ROAS
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFF', marginTop: '4px' }}>
            {avgRoas}x
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MousePointer size={14} color="#3B82F6" /> Toplam Tıklama
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFF', marginTop: '4px' }}>
            {totalClicks.toLocaleString('tr-TR')}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '16px 20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BarChart2 size={14} color="#8B5CF6" /> Toplam Dönüşüm
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFF', marginTop: '4px' }}>
            {totalConversions.toLocaleString('tr-TR')}
          </div>
        </div>

      </div>

      {/* Filter and Table Options */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Meta Ads', 'Google Ads'].map(plat => (
            <button
              key={plat}
              onClick={() => setPlatformFilter(plat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: platformFilter === plat ? '1px solid #10B981' : '1px solid var(--border-subtle)',
                background: platformFilter === plat ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-card)',
                color: platformFilter === plat ? '#10B981' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {plat === 'All' ? 'Tüm Platformlar' : plat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Kampanya ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* Campaigns Table */}
      <div className="glass-panel" style={{ borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Kampanya Adı</th>
                <th>Platform</th>
                <th>Durum</th>
                <th>Harcama (₺)</th>
                <th>ROAS</th>
                <th>Gösterim</th>
                <th>Tıklama (CTR)</th>
                <th>Dönüşüm</th>
                <th style={{ textAlign: 'right' }}>Aksiyonlar</th>
              </tr>
            </thead>
            <tbody>
              {filteredAds.map(ad => (
                <tr key={ad.id}>
                  <td style={{ fontWeight: '600', color: '#FFF' }}>
                    {ad.title}
                  </td>
                  <td>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: ad.platform === 'Meta Ads' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(234, 88, 12, 0.15)',
                      color: ad.platform === 'Meta Ads' ? '#60A5FA' : '#FB923C'
                    }}>
                      {ad.platform}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => onToggleAdStatus(ad.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        color: ad.status === 'active' ? '#10B981' : '#6B7280'
                      }}
                    >
                      {ad.status === 'active' ? (
                        <><Play size={13} fill="#10B981" /> Yayında</>
                      ) : (
                        <><Pause size={13} fill="#6B7280" /> Duraklatıldı</>
                      )}
                    </button>
                  </td>
                  <td style={{ fontWeight: '700', color: '#10B981' }}>
                    ₺{ad.budgetSpent.toLocaleString('tr-TR')}
                  </td>
                  <td style={{ fontWeight: '700', color: ad.roas >= 3 ? '#10B981' : '#F59E0B' }}>
                    {ad.roas}x
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {ad.impressions.toLocaleString('tr-TR')}
                  </td>
                  <td>
                    <div style={{ fontWeight: '600', color: '#FFF' }}>{ad.clicks.toLocaleString('tr-TR')}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ad.ctr}% CTR</div>
                  </td>
                  <td style={{ fontWeight: '600', color: '#FFF' }}>
                    {ad.conversions}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      onClick={() => onDeleteAd(ad.id)}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#EF4444' }}
                      title="Kampanyayı sil"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
