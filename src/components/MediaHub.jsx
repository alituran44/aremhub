import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Plus, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Video, 
  Download, 
  Tag,
  Wand2
} from 'lucide-react';

export default function MediaHub({ mediaAssets, onAddAsset }) {
  const [filterType, setFilterType] = useState('All');
  const [aiTopic, setAiTopic] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredAssets = mediaAssets.filter(asset => 
    filterType === 'All' || asset.type === filterType
  );

  const handleGenerateCaption = () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCaption(
        `🚀 ${aiTopic} ile dijital dönüşümünüzü bir üst seviyeye taşıyın!\n\nAremHub üzerinden sunduğumuz yüksek performanslı çözümlerle iş süreçlerinizi otomatize edin ve ROI oranlarınızı artırın.\n\n👉 Detaylı bilgi için: aremhub.com\n\n#AremHub #Yazılım #DigitalMarketing #Ads #SaaS #Growth`
      );
      setIsGenerating(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCaption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner for Media Hub */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', borderLeft: '4px solid var(--arem-m-main)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-arem badge-m">M Pillar</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#FFF' }}>
                Medya / Marketing Üssü (Stüdyo & AI Kopya Üretici)
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
              Grafik materyaller, reklam görselleri kütüphanesi ve yapay zeka destekli kampanya metni oluşturucu.
            </p>
          </div>
        </div>
      </div>

      {/* AI Copywriting Studio Card */}
      <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Wand2 size={20} color="#F43F5E" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFF' }}>
            AremHub AI Kampanya Metni & Caption Üretici
          </h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
          <input
            type="text"
            placeholder="Örn: Yeni SaaS yazılım lansmanı, Instagram reklam kampanyası..."
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            style={{
              flex: 1,
              minWidth: '280px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'var(--bg-darkest)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleGenerateCaption}
            disabled={isGenerating || !aiTopic.trim()}
            className="btn btn-primary"
            style={{ background: 'linear-gradient(135deg, #F43F5E, #E11D48)' }}
          >
            <Sparkles size={16} /> {isGenerating ? 'Üretiliyor...' : 'Metin Oluştur'}
          </button>
        </div>

        {generatedCaption && (
          <div style={{
            padding: '14px',
            borderRadius: '12px',
            background: 'var(--bg-darkest)',
            border: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            <pre style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: '#E5E7EB',
              lineHeight: '1.5'
            }}>
              {generatedCaption}
            </pre>
            <button
              onClick={handleCopy}
              className="btn btn-secondary"
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                padding: '4px 10px',
                fontSize: '0.75rem'
              }}
            >
              {copied ? <><Check size={12} color="#10B981" /> Kopyalandı</> : <><Copy size={12} /> Kopyala</>}
            </button>
          </div>
        )}
      </div>

      {/* Media Assets Filter & Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['All', 'Visual', 'Video', 'Copywriting'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: filterType === t ? '1px solid #F43F5E' : '1px solid var(--border-subtle)',
                background: filterType === t ? 'rgba(244, 63, 94, 0.15)' : 'var(--bg-card)',
                color: filterType === t ? '#F43F5E' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {t === 'All' ? 'Tüm Varlıklar' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
        {filteredAssets.map(asset => (
          <div key={asset.id} className="glass-panel" style={{ padding: '16px', borderRadius: '14px' }}>
            <div style={{
              height: '140px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #1E293B, #0F172A)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              border: '1px solid var(--border-subtle)',
              color: '#F43F5E'
            }}>
              {asset.type === 'Visual' && <ImageIcon size={36} />}
              {asset.type === 'Video' && <Video size={36} />}
              {asset.type === 'Copywriting' && <FileText size={36} />}
            </div>

            <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#FFF' }}>
              {asset.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              {asset.category} • {asset.size}
            </div>

            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge-arem badge-m" style={{ fontSize: '0.7rem' }}>
                {asset.type}
              </span>
              <button 
                onClick={() => alert(`"${asset.title}" indirildi!`)}
                className="btn btn-secondary" 
                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <Download size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
