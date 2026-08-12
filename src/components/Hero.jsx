import React from 'react';
import { 
  ArrowUpRight, 
  Terminal, 
  Zap, 
  MessageCircle, 
  ShoppingBag, 
  TrendingUp, 
  Star,
  CheckCircle2,
  Sparkles,
  Share2,
  ShieldCheck,
  Globe,
  Award
} from 'lucide-react';

export default function Hero({ onOpenQuoteModal, setActiveSection }) {
  return (
    <section id="hero" className="animate-fade-in-up" style={{ marginBottom: '60px' }}>
      
      {/* 65 / 35 Asymmetrical Hero Grid */}
      <div className="bento-grid" style={{ alignItems: 'stretch' }}>
        
        {/* Left Col (65%): Agency Service Core & Growth Engine */}
        <div className="bento-col-8 editorial-card" style={{
          padding: '48px 40px',
          background: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-xl)'
        }}>
          
          <div>
            {/* Live Indicator Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(132, 204, 22, 0.12)', border: '1px solid rgba(132, 204, 22, 0.3)', padding: '4px 12px', borderRadius: '16px', color: 'var(--accent-lime)', fontSize: '0.8rem', fontWeight: '800' }}>
                <span className="pulse-active"></span> 🟢 7/24 Kesintisiz Büyüme Ajansı & Dijital Pazarlama Üssü
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                Lighthouse 98/100 Hız
              </span>
            </div>

            {/* Strategic High-Impact Headline */}
            <h1 style={{ fontSize: '3.2rem', lineHeight: '1.14', color: 'var(--text-main)', marginBottom: '20px', fontWeight: '900', letterSpacing: '-0.02em' }}>
              Markanız İçin <span className="gradient-text-arem">Büyüme Odaklı Reklam Yönetimi</span> & Hazır Dijital Pazarlama Araçları
            </h1>

            <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', lineHeight: '1.65', maxWidth: '720px', marginBottom: '36px', fontWeight: '500' }}>
              İster yüksek dönüşümlü Meta & Google Ads reklam yönetimi ve özel Next.js web yazılımları ile markanızı ölçekleyin, ister anında indirilebilir hazır Canva sosyal medya şablonlarımız ve SaaS yazılımlarımızla hemen aksiyona geçin.
            </p>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn-editorial btn-lime" onClick={onOpenQuoteModal} style={{ padding: '14px 24px', fontSize: '0.95rem' }}>
              <Zap size={18} /> Ücretsiz Analiz & Hızlı Teklif Al <ArrowUpRight size={18} />
            </button>

            <button 
              className="btn-editorial" 
              onClick={() => setActiveSection('social-ads-hub')}
              style={{ 
                padding: '14px 22px', 
                fontSize: '0.95rem',
                background: 'var(--bg-elevated)',
                color: 'var(--accent-lime)',
                border: '1px solid var(--border-strong)',
                gap: '8px'
              }}
            >
              <Share2 size={18} /> Sosyal & Reklam Paneli Demo 🚀
            </button>

            <button 
              className="btn-editorial btn-outline-editorial" 
              onClick={() => setActiveSection('digital-store')}
              style={{ padding: '14px 20px', fontSize: '0.95rem' }}
            >
              <ShoppingBag size={18} color="var(--accent-lime)" /> Dijital Mağaza
            </button>
          </div>

          {/* Verified Tech Stack Bar */}
          <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Güvenilen Teknolojiler:
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '0.78rem', fontWeight: '800', color: 'var(--text-muted)' }}>
              <span className="stat-pill">Next.js 14</span>
              <span className="stat-pill">React</span>
              <span className="stat-pill">Meta Ads (Reels)</span>
              <span className="stat-pill">Google Ads</span>
              <span className="stat-pill">PayTR & Stripe</span>
            </div>
          </div>

        </div>

        {/* Right Col (35%): Dual Visual Mockup & Live Performance Metrics */}
        <div className="bento-col-4 editorial-card" style={{
          padding: '32px 28px',
          background: 'var(--bg-elevated)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: '1px solid var(--border-strong)'
        }}>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-lime)', fontWeight: '800', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={15} /> CANLI AJANS & MAĞAZA PERFORMANSI
              </span>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: '8px', background: 'rgba(22, 163, 74, 0.15)', color: 'var(--accent-lime)', fontWeight: '800' }}>
                4.9 ★ (148 Yorum)
              </span>
            </div>

            {/* Performance Metric Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* ROAS Metric */}
              <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '700' }}>Yönetilen Reklam Harcaması</div>
                <div style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--accent-lime)', fontFamily: 'var(--font-display)', marginTop: '2px' }}>
                  ₺4.850.000+
                </div>
                <div style={{ fontSize: '0.78rem', color: '#16A34A', marginTop: '4px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Ortalama Dönüşüm ROAS: 5.4x
                </div>
              </div>

              {/* Delivered Projects Signal */}
              <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '700' }}>Tamamlanan Kurumsal Proje</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)', marginTop: '2px' }}>
                  150+ Yazılım & Dijital Marka
                </div>
                <div style={{ fontSize: '0.78rem', color: '#0284C7', marginTop: '4px', fontWeight: '700' }}>
                  ⚡ %99.99 Altyapı Uptime Garantisi
                </div>
              </div>

              {/* Digital Store Instant Download Signal */}
              <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: '700' }}>Anında Teslimatlı Dijital Şablonlar</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
                  100+ Canva Sosyal Medya & Post Kiti
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-lime)', fontWeight: '900', marginTop: '4px' }}>
                  ₺299 — Otomatik E-Posta Teslimatı
                </div>
              </div>

            </div>
          </div>

          <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={16} color="var(--accent-lime)" /> 256-Bit SSL Koruması
            </span>
            <span className="stat-pill stat-lime" style={{ fontSize: '0.75rem' }}>Fatura Garantili</span>
          </div>

        </div>

      </div>

    </section>
  );
}
