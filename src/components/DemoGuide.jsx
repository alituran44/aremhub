import React from 'react';
import { 
  HelpCircle, 
  Globe, 
  Terminal, 
  CheckCircle2, 
  Zap, 
  ExternalLink, 
  ShieldCheck, 
  Server, 
  Code2, 
  Layers,
  Copy,
  Check
} from 'lucide-react';

export default function DemoGuide() {
  const [copied, setCopied] = React.useState('');

  const handleCopyCode = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', borderLeft: '4px solid var(--arem-r-main)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
          <span className="badge badge-r">Rehber & Kılavuz</span>
        </div>
        <h2 style={{ fontSize: '1.8rem', color: '#FFF' }}>
          AremHub Canlı Demo ve Dağıtım (Deployment) Rehberi
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '800px' }}>
          Geliştirdiğiniz tüm yazılım projelerini canlıda test etmek, sunucuya dağıtmak ve `aremhub.com` alan adınıza bağlamak için adım adım kılavuz.
        </p>
      </div>

      {/* 3 Step Deployment / Run Methods Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Method 1: Double-Click File */}
        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: '800' }}>
              1
            </div>
            <div>
              <h3 style={{ color: '#FFF', fontSize: '1.1rem' }}>Doğrudan Çift Tıklama (Dosya)</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sıfır Bağımlılık & Portsuz</div>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
            Masaüstünüzdeki `AremSoft` klasöründe yer alan <strong>`AremHub_Sitesi.html`</strong> dosyasına çift tıklayarak hiçbir sunucu kurmadan doğrudan Chrome veya Edge üzerinden çalıştırabilirsiniz.
          </p>
          <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: '#10B981', fontWeight: '600' }}>
            ✓ %100 Çevrimdışı ve Anında Hazır
          </div>
        </div>

        {/* Method 2: Local HTTP Server */}
        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: '#06B6D4', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: '800' }}>
              2
            </div>
            <div>
              <h3 style={{ color: '#FFF', fontSize: '1.1rem' }}>Yerel HTTP Web Sunucusu</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vite / Python / Node Server</div>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
            `AremSoft` dizininde terminal üzerinden sunucuyu istediğiniz zaman şu komutlarla çalıştırabilirsiniz:
          </p>
          <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--bg-darkest)', border: '1px solid var(--border-subtle)', fontFamily: 'monospace', fontSize: '0.82rem', color: '#60A5FA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>npm run dev</span>
            <button onClick={() => handleCopyCode('npm run dev', 'npm')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {copied === 'npm' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

        {/* Method 3: Cloud Hosting & Custom Domain */}
        <div className="glass-card" style={{ padding: '28px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: '#8B5CF6', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: '800' }}>
              3
            </div>
            <div>
              <h3 style={{ color: '#FFF', fontSize: '1.1rem' }}>aremhub.com Canlıya Alma</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Vercel / Netlify / Cloudflare</div>
            </div>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
            `aremhub.com` alan adınızı Vercel veya Netlify'a bağlamak için tek bir terminal komutu yeterlidir:
          </p>
          <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--bg-darkest)', border: '1px solid var(--border-subtle)', fontFamily: 'monospace', fontSize: '0.82rem', color: '#C084FC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>npx vercel --prod</span>
            <button onClick={() => handleCopyCode('npx vercel --prod', 'vercel')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              {copied === 'vercel' ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
            </button>
          </div>
        </div>

      </div>

      {/* Domain DNS Setup Guide */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Globe size={20} color="#06B6D4" /> `aremhub.com` DNS Yapılandırma Rehberi
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Alan adınızı (Domain registrar) Vercel veya kendi sunucunuza bağlarken şu DNS kayıtlarını eklemeniz yeterlidir:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Kayıt Tipi (Type)</th>
                <th>Ad / Host (Name)</th>
                <th>Değer / Hedef (Value)</th>
                <th>Açıklama</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong style={{ color: '#06B6D4' }}>A Record</strong></td>
                <td>@</td>
                <td><code>76.76.21.21</code></td>
                <td>Ana alan adı yönlendirmesi (aremhub.com)</td>
              </tr>
              <tr>
                <td><strong style={{ color: '#06B6D4' }}>CNAME</strong></td>
                <td>www</td>
                <td><code>cname.vercel-dns.com</code></td>
                <td>Alt alan adı yönlendirmesi (www.aremhub.com)</td>
              </tr>
              <tr>
                <td><strong style={{ color: '#10B981' }}>TXT Record</strong></td>
                <td>_google-site-verification</td>
                <td><code>google-site-verification-token...</code></td>
                <td>Google Search Console & SEO doğrulaması</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
