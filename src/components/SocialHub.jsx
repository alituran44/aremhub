import React, { useState } from 'react';
import { 
  Share2, 
  Plus, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Youtube,
  Trash2,
  Send
} from 'lucide-react';

export default function SocialHub({ socialPosts, channels, onOpenPostModal, onDeletePost, onPublishPost }) {
  const [selectedPlatform, setSelectedPlatform] = useState('All');

  const filteredPosts = socialPosts.filter(post => 
    selectedPlatform === 'All' || post.platform === selectedPlatform
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Banner for Social Hub */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '18px', borderLeft: '4px solid var(--arem-e-main)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-arem badge-e">E Pillar</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: 0, color: '#FFF' }}>
                Etkileşim / Engagement Üssü (Sosyal Medya)
              </h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '6px' }}>
              Instagram, LinkedIn, X (Twitter) ve YouTube kanallarınız için gönderi takvimi ve kanal büyüme istatistikleri.
            </p>
          </div>

          <button className="btn btn-primary" onClick={onOpenPostModal} style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}>
            <Plus size={16} /> Gönderi Planla
          </button>
        </div>
      </div>

      {/* Connected Social Channels Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {channels.map(chan => (
          <div key={chan.id} className="glass-panel" style={{ padding: '18px', borderRadius: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: '#C084FC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700'
                }}>
                  {chan.name === 'Instagram' && <Instagram size={18} />}
                  {chan.name === 'LinkedIn' && <Linkedin size={18} />}
                  {chan.name === 'X (Twitter)' && <Twitter size={18} />}
                  {chan.name === 'YouTube' && <Youtube size={18} />}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#FFF' }}>{chan.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>@{chan.handle}</div>
                </div>
              </div>

              <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontWeight: '600' }}>
                Bağlı
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Takipçi</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#FFF' }}>{chan.followers.toLocaleString('tr-TR')}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Etkileşim</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#8B5CF6' }}>%{chan.engagementRate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scheduled Posts Timeline */}
      <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#8B5CF6" /> Gönderi Yayın Takvimi ({filteredPosts.length})
          </h3>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Instagram', 'LinkedIn', 'X (Twitter)', 'YouTube'].map(p => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '14px',
                  border: selectedPlatform === p ? '1px solid #8B5CF6' : '1px solid var(--border-subtle)',
                  background: selectedPlatform === p ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                  color: selectedPlatform === p ? '#C084FC' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {p === 'All' ? 'Tümü' : p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
                <div style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.15)',
                  color: '#C084FC',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  minWidth: '100px'
                }}>
                  <Clock size={12} style={{ marginRight: '4px' }} />
                  {post.date}
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#8B5CF6', fontWeight: '600' }}>
                    {post.platform}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#FFF', marginTop: '2px' }}>
                    {post.content}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  background: post.status === 'published' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                  color: post.status === 'published' ? '#10B981' : '#60A5FA',
                  fontWeight: '600'
                }}>
                  {post.status === 'published' ? 'Yayınlandı' : 'Zamanlandı'}
                </span>

                {post.status !== 'published' && (
                  <button 
                    onClick={() => onPublishPost(post.id)}
                    className="btn btn-primary" 
                    style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'linear-gradient(135deg, #10B981, #059669)' }}
                  >
                    <Send size={12} /> Şimdi Yayınla
                  </button>
                )}

                <button 
                  onClick={() => onDeletePost(post.id)}
                  className="btn btn-secondary" 
                  style={{ padding: '6px 8px', fontSize: '0.75rem', color: '#EF4444' }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
