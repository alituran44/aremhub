import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Key, 
  CheckCircle2, 
  LayoutDashboard, 
  ShoppingBag, 
  Code2, 
  Target, 
  Share2, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Plus, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  Mail,
  Calendar,
  LogOut,
  Bell,
  Sparkles,
  Globe,
  CreditCard,
  Package,
  Star,
  Download,
  Check,
  RefreshCw,
  Search,
  Sliders,
  Database,
  FileText,
  FileSpreadsheet,
  Zap,
  CheckSquare
} from 'lucide-react';
import DigitalStoreManager from './DigitalStoreManager';

export default function AdminPanelStandalone({
  products,
  apps,
  ads,
  socialPosts,
  channels,
  onOpenAddProductModal,
  onEditProduct,
  onToggleProductStatus,
  onDeleteProduct,
  onResetProducts,
  onOpenAppModal
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [adminTab, setAdminTab] = useState('overview');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('aremhub2026');

  // --- STATE 1: Orders / Sales Transactions ---
  const defaultOrders = [
    {
      id: 'ORD-9842',
      customerName: 'Mustafa Kaya - TechCorp',
      customerEmail: 'mustafa@techcorp.com',
      productTitle: 'Next.js 14 Ultra Hızlı Kurumsal Firma & SaaS Scripti',
      price: '₺1.499',
      gateway: 'PayTR',
      status: 'Otomatik Teslim Edildi',
      date: 'Bugün 14:20'
    },
    {
      id: 'ORD-9841',
      customerName: 'Ece Yılmaz',
      customerEmail: 'ece@restoran.com',
      productTitle: 'Restoran & Kafeler İçin 100+ Canva Sosyal Medya Kiti',
      price: '₺299',
      gateway: 'İyzico',
      status: 'Otomatik Teslim Edildi',
      date: 'Bugün 11:05'
    },
    {
      id: 'ORD-9840',
      customerName: 'Marcus Vance - Digital UK',
      customerEmail: 'marcus@digitaluk.io',
      productTitle: 'Meta Ads Hedef Kitle Kütüphanesi & AI Prompt Kiti',
      price: '$49',
      gateway: 'Lemon Squeezy',
      status: 'Otomatik Teslim Edildi',
      date: 'Dün 22:45'
    },
    {
      id: 'ORD-9839',
      customerName: 'Selim Arslan',
      customerEmail: 'selim@ajanscrm.com',
      productTitle: 'Notion Ajans & İşletme Müşteri Takip (CRM) Dashboard',
      price: '₺349',
      gateway: 'Stripe',
      status: 'Otomatik Teslim Edildi',
      date: 'Dün 18:30'
    }
  ];

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultOrders;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // --- STATE 2: Payment Gateways Config ---
  const defaultGateways = {
    paytr: { merchantId: '384910', apiKey: 'paytr_live_9f81a7b...', secretKey: 'paytr_sec_99a81...', isTestMode: false, active: true },
    iyzico: { apiKey: 'iyzi_live_key_9921', secretKey: 'iyzi_sec_key_3841', isTestMode: false, active: true },
    lemonSqueezy: { storeId: '74819', apiKey: 'lemon_api_991823...', isTestMode: false, active: true },
    stripe: { publishableKey: 'pk_live_51M3...', secretKey: 'sk_live_51M3...', currency: 'USD', active: true }
  };

  const [gateways, setGateways] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_gateways');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultGateways;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_gateways', JSON.stringify(gateways));
    } catch (e) {
      console.error(e);
    }
  }, [gateways]);

  // --- STATE 3: Leads / Form Submissions ---
  const defaultLeads = [
    { id: 1, name: 'Selin Yılmaz - TechCorp', email: 'selin@techcorp.com', phone: '0532 111 22 33', service: 'Hazır Web Sitesi Satın Alımı', date: 'Bugün 12:45', status: 'Yeni' },
    { id: 2, name: 'Ahmet Kaya - Acme E-Ticaret', email: 'ahmet@acme.com', phone: '0544 999 88 77', service: 'Meta & Google Ads Yönetimi', date: 'Bugün 10:15', status: 'Görüşüldü' },
    { id: 3, name: 'Caner Demir - RetailGroup', email: 'caner@retail.com', phone: '0555 333 44 55', service: 'Sosyal Medya Yönetimi', date: 'Dün 16:30', status: 'Teklif Gönderildi' }
  ];

  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_leads');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultLeads;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_leads', JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  // --- STATE 4: Announcements & Toast Settings ---
  const [promoText, setPromoText] = useState(() => localStorage.getItem('aremhub_promoText') || 'AREM20 Kodu İle Tüm Dijital Ürünlerde %20 İndirim!');
  const [liveToastEnabled, setLiveToastEnabled] = useState(() => localStorage.getItem('aremhub_toastEnabled') !== 'false');
  const [toastInterval, setToastInterval] = useState(() => localStorage.getItem('aremhub_toastInterval') || '14');

  const saveCampaignSettings = () => {
    localStorage.setItem('aremhub_promoText', promoText);
    localStorage.setItem('aremhub_toastEnabled', liveToastEnabled);
    localStorage.setItem('aremhub_toastInterval', toastInterval);
    alert('📢 Duyuru çubuğu ve Sol Alt Satın Alma Bildirimi ayarları canlıya alındı!');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'aremhub2026') {
      setIsAuthenticated(true);
    } else {
      alert('Hatalı kullanıcı adı veya şifre! (Demo: admin / aremhub2026)');
    }
  };

  const handleUpdateLeadStatus = (id, newStatus) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const handleDeleteLead = (id) => {
    if (window.confirm('Bu müşteri talebini silmek istediğinize emin misiniz?')) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm('Bu siparişi silmek istediğinize emin misiniz?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      products,
      orders,
      leads,
      gateways,
      campaigns: { promoText, liveToastEnabled, toastInterval }
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aremhub_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isAuthenticated) {
    return (
      <section id="admin-login" style={{ maxWidth: '460px', margin: '60px auto' }}>
        <div className="editorial-card" style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(21, 128, 61, 0.15)',
            color: 'var(--accent-lime)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Lock size={28} />
          </div>

          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '8px' }}>
            aremhub Ajans Yönetim Paneli
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Lütfen yönetici giriş bilgilerinizi doğrulayın.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '6px' }}>Şifre</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            <button type="submit" className="btn-editorial btn-lime" style={{ padding: '12px', justifyContent: 'center', marginTop: '8px' }}>
              <Key size={16} /> Panele Giriş Yap
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin-panel" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="stat-pill stat-lime" style={{ marginBottom: '6px' }}>⚡ Yönetim & Operasyon Merkezi</span>
          <h2 style={{ fontSize: '2.2rem', color: 'var(--text-main)', fontWeight: '800' }}>
            aremhub <span className="gradient-text-arem">Ajans & Mağaza Paneli</span>
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportBackup}
            className="btn-editorial btn-outline-editorial"
            style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px' }}
            title="Tüm sistem verilerini JSON olarak bilgisayarınıza yedekler"
          >
            <Download size={14} /> System Backup (JSON)
          </button>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>Yönetici: <strong>admin@aremhub.com</strong></span>
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="btn-editorial btn-outline-editorial"
            style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px', color: '#F87171' }}
          >
            <LogOut size={14} /> Çıkış Yap
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
        <button onClick={() => setAdminTab('overview')} style={adminTab === 'overview' ? activeTabStyle : tabStyle}>
          <LayoutDashboard size={16} /> Genel Bakış & Finans
        </button>

        <button onClick={() => setAdminTab('products')} style={adminTab === 'products' ? activeTabStyle : tabStyle}>
          <ShoppingBag size={16} /> Dijital Ürün Mağazası ({products.length})
        </button>

        <button onClick={() => setAdminTab('orders')} style={adminTab === 'orders' ? activeTabStyle : tabStyle}>
          <Package size={16} /> Siparişler & Satış Geçmişi ({orders.length})
        </button>

        <button onClick={() => setAdminTab('gateways')} style={adminTab === 'gateways' ? activeTabStyle : tabStyle}>
          <CreditCard size={16} /> Ödeme Altyapıları (PayTR / Stripe)
        </button>

        <button onClick={() => setAdminTab('campaigns')} style={adminTab === 'campaigns' ? activeTabStyle : tabStyle}>
          <Sparkles size={16} /> Duyuru & Sol Alt Toast Ayarları
        </button>

        <button onClick={() => setAdminTab('leads')} style={adminTab === 'leads' ? activeTabStyle : tabStyle}>
          <Mail size={16} /> Gelen İletişim & Teklifler ({leads.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {adminTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          
          {/* Key Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div className="editorial-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800' }}>TOPLAM DİJİTAL MAĞAZA CİROSU</div>
              <div style={{ fontSize: '2rem', color: 'var(--accent-lime)', fontWeight: '900', marginTop: '6px' }}>₺148.950</div>
              <div style={{ fontSize: '0.78rem', color: '#16A34A', marginTop: '4px', fontWeight: '800' }}>↑ Bu ay %34 artış</div>
            </div>

            <div className="editorial-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800' }}>TAMAMLANAN SİPARİŞ SAYISI</div>
              <div style={{ fontSize: '2rem', color: '#0284C7', fontWeight: '900', marginTop: '6px' }}>{orders.length + 338} Sipariş</div>
              <div style={{ fontSize: '0.78rem', color: '#0284C7', marginTop: '4px', fontWeight: '800' }}>Anında E-Posta Teslimatı</div>
            </div>

            <div className="editorial-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800' }}>AKTİF YAZILIM & DİJİTAL ÜRÜN</div>
              <div style={{ fontSize: '2rem', color: '#6D28D9', fontWeight: '900', marginTop: '6px' }}>{products.length} Ürün</div>
              <div style={{ fontSize: '0.78rem', color: '#6D28D9', marginTop: '4px', fontWeight: '800' }}>{products.filter(p => p.status === 'active').length} Satışta</div>
            </div>

            <div className="editorial-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800' }}>GELEN MÜŞTERİ TALEPLERİ</div>
              <div style={{ fontSize: '2rem', color: '#F59E0B', fontWeight: '900', marginTop: '6px' }}>{leads.length} Talep</div>
              <div style={{ fontSize: '0.78rem', color: '#F59E0B', marginTop: '4px', fontWeight: '800' }}>{leads.filter(l => l.status === 'Yeni').length} Yeni Bekleyen</div>
            </div>
          </div>

          {/* Quick Management Shortcuts */}
          <div className="editorial-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--accent-lime)" /> Hızlı İşlemler & Sistem Yönetimi
            </h3>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={onOpenAddProductModal} className="btn-editorial btn-lime" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                <Plus size={16} /> Yeni Dijital Ürün / Şablon Ekle
              </button>

              <button onClick={() => setAdminTab('orders')} className="btn-editorial btn-outline-editorial" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                <Package size={16} /> Sipariş Geçmişini İncele
              </button>

              <button onClick={() => setAdminTab('gateways')} className="btn-editorial btn-outline-editorial" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
                <CreditCard size={16} /> Ödeme Altyapısı API Ayarları
              </button>

              <button onClick={onResetProducts} className="btn-editorial btn-outline-editorial" style={{ padding: '10px 18px', fontSize: '0.88rem', color: '#F87171' }}>
                <RefreshCw size={16} /> Ürünleri Varsayılana Sıfırla
              </button>
            </div>
          </div>

          <DigitalStoreManager
            products={products}
            onOpenAddProductModal={onOpenAddProductModal}
            onEditProduct={onEditProduct}
            onToggleProductStatus={onToggleProductStatus}
            onDeleteProduct={onDeleteProduct}
            onResetProducts={onResetProducts}
          />
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {adminTab === 'products' && (
        <DigitalStoreManager
          products={products}
          onOpenAddProductModal={onOpenAddProductModal}
          onEditProduct={onEditProduct}
          onToggleProductStatus={onToggleProductStatus}
          onDeleteProduct={onDeleteProduct}
          onResetProducts={onResetProducts}
        />
      )}

      {/* TAB 3: ORDERS & TRANSACTIONS */}
      {adminTab === 'orders' && (
        <div className="editorial-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Package size={24} color="var(--accent-lime)" />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800' }}>Gelen Siparişler & Otomatik Teslimat Geçmişi</h3>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                PayTR, İyzico, Stripe veya Lemon Squeezy üzerinden tamamlanan tüm siparişler ve teslimat durumları.
              </p>
            </div>

            <button
              onClick={() => {
                const name = prompt('Müşteri Adı Soyadı:');
                if (!name) return;
                const email = prompt('Müşteri E-Posta:');
                const productTitle = prompt('Ürün Adı:', products[0]?.title || 'Next.js SaaS Scripti');
                const price = prompt('Fiyat:', '₺1.499');
                
                const newOrd = {
                  id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                  customerName: name,
                  customerEmail: email || 'musteri@aremhub.com',
                  productTitle: productTitle || 'Dijital Şablon Paket',
                  price: price || '₺299',
                  gateway: 'Manuel Ekleme',
                  status: 'Otomatik Teslim Edildi',
                  date: 'Az önce'
                };
                setOrders([newOrd, ...orders]);
              }}
              className="btn-editorial btn-lime"
              style={{ padding: '10px 18px', fontSize: '0.88rem' }}
            >
              <Plus size={16} /> Manuel Sipariş / Lisans Ekle
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Sipariş Kodu</th>
                  <th style={{ padding: '12px' }}>Müşteri Bilgisi</th>
                  <th style={{ padding: '12px' }}>Satın Alınan Ürün</th>
                  <th style={{ padding: '12px' }}>Tutar</th>
                  <th style={{ padding: '12px' }}>Ödeme Yöntemi</th>
                  <th style={{ padding: '12px' }}>Teslimat Durumu</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(ord => (
                  <tr key={ord.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '14px 12px', color: 'var(--accent-lime)', fontWeight: '800', fontFamily: 'monospace' }}>
                      {ord.id}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: '800', color: 'var(--text-main)' }}>{ord.customerName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{ord.customerEmail}</div>
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--text-main)', fontWeight: '600' }}>
                      {ord.productTitle}
                    </td>
                    <td style={{ padding: '14px 12px', color: 'var(--accent-lime)', fontWeight: '900', fontFamily: 'var(--font-display)' }}>
                      {ord.price}
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', color: 'var(--text-main)' }}>
                        💳 {ord.gateway}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px' }}>
                      <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', background: 'rgba(21, 128, 61, 0.15)', color: 'var(--accent-lime)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Check size={13} /> {ord.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button
                          onClick={() => alert(`Fatura kopyası ${ord.customerEmail} adresine tekrar e-posta olarak gönderildi!`)}
                          className="btn-editorial btn-outline-editorial"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          title="Faturayı Tekrar Gönder"
                        >
                          ✉️ E-Posta
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(ord.id)}
                          style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', cursor: 'pointer' }}
                          title="Sil"
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
      )}

      {/* TAB 4: PAYMENT GATEWAYS CONFIG */}
      {adminTab === 'gateways' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="editorial-card" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <CreditCard size={24} color="var(--accent-lime)" />
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)', fontWeight: '800' }}>Ödeme Sağlayıcıları & API Anahtarları Entegrasyonu</h3>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Türkiye ödemeleri için PayTR / İyzico, global USD/EUR ödemeleri için Stripe ve Lemon Squeezy (MoR) API bilgilerinizi yapılandırın.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              
              {/* PayTR Config Box */}
              <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid var(--accent-lime)', background: 'var(--bg-elevated)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>🇹🇷 PayTR (Türkiye Sanal POS)</h4>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(21, 128, 61, 0.2)', color: 'var(--accent-lime)', fontWeight: '800' }}>
                    ● AKTİF (TRY ₺)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>PayTR Merchant ID (Mağaza No)</label>
                    <input
                      type="text"
                      value={gateways.paytr.merchantId}
                      onChange={e => setGateways({ ...gateways, paytr: { ...gateways.paytr, merchantId: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>PayTR API Key</label>
                    <input
                      type="password"
                      value={gateways.paytr.apiKey}
                      onChange={e => setGateways({ ...gateways, paytr: { ...gateways.paytr, apiKey: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>PayTR Secret Key</label>
                    <input
                      type="password"
                      value={gateways.paytr.secretKey}
                      onChange={e => setGateways({ ...gateways, paytr: { ...gateways.paytr, secretKey: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Lemon Squeezy Config Box */}
              <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #0284C7', background: 'var(--bg-elevated)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>🌐 Lemon Squeezy (Global MoR)</h4>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(2, 132, 199, 0.2)', color: '#0284C7', fontWeight: '800' }}>
                    ● AKTİF ($ USD)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Lemon Squeezy Store ID</label>
                    <input
                      type="text"
                      value={gateways.lemonSqueezy.storeId}
                      onChange={e => setGateways({ ...gateways, lemonSqueezy: { ...gateways.lemonSqueezy, storeId: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>API Key / Access Token</label>
                    <input
                      type="password"
                      value={gateways.lemonSqueezy.apiKey}
                      onChange={e => setGateways({ ...gateways, lemonSqueezy: { ...gateways.lemonSqueezy, apiKey: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Stripe Config Box */}
              <div style={{ padding: '24px', borderRadius: '16px', border: '1px solid #6D28D9', background: 'var(--bg-elevated)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>💳 Stripe International</h4>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(109, 40, 217, 0.2)', color: '#6D28D9', fontWeight: '800' }}>
                    ● AKTİF ($ / €)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Publishable Key (pk_live_...)</label>
                    <input
                      type="text"
                      value={gateways.stripe.publishableKey}
                      onChange={e => setGateways({ ...gateways, stripe: { ...gateways.stripe, publishableKey: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Secret Key (sk_live_...)</label>
                    <input
                      type="password"
                      value={gateways.stripe.secretKey}
                      onChange={e => setGateways({ ...gateways, stripe: { ...gateways.stripe, secretKey: e.target.value } })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={() => alert('💳 Ödeme altyapıları ve API anahtarlarınız başarıyla güncellendi!')}
              className="btn-editorial btn-lime"
              style={{ marginTop: '24px', padding: '12px 24px', fontSize: '0.95rem' }}
            >
              <CheckCircle2 size={18} /> Tüm API Anahtarlarını Kaydet
            </button>
          </div>

        </div>
      )}

      {/* TAB 5: CAMPAIGNS & LIVE TOAST SETTINGS */}
      {adminTab === 'campaigns' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
          
          <div className="editorial-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px' }}>
              📢 Üst Duyuru Çubuğu (Announcement Bar)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Sitenin en üstünde sabit kalan indirim ve duyuru metnini özelleştirin.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Duyuru Metni & İndirim Kodu</label>
              <input type="text" value={promoText} onChange={e => setPromoText(e.target.value)} style={inputStyle} />
            </div>
            <button className="btn-editorial btn-lime" onClick={saveCampaignSettings}>
              <CheckCircle2 size={16} /> Kaydet ve Yayınla
            </button>
          </div>

          <div className="editorial-card" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '14px' }}>
              🔔 Sol Alt Canlı Satın Alma Popup'ı (Live Sales Toast)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Sitenin sol alt köşesinde anlık alışveriş bildirimleri göstererek dönüşüm oranını artırın.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <input type="checkbox" id="toastToggle" checked={liveToastEnabled} onChange={e => setLiveToastEnabled(e.target.checked)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
              <label htmlFor="toastToggle" style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '800', cursor: 'pointer' }}>
                Sol Alt Satın Alma Bildirimleri Aktif
              </label>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Gösterim Aralığı (Saniye)</label>
              <input type="number" value={toastInterval} onChange={e => setToastInterval(e.target.value)} style={inputStyle} />
            </div>
            <button className="btn-editorial btn-lime" onClick={saveCampaignSettings}>
              <CheckCircle2 size={16} /> Popup Ayarlarını Kaydet
            </button>
          </div>

        </div>
      )}

      {/* TAB 6: LEADS & INQUIRIES */}
      {adminTab === 'leads' && (
        <div className="editorial-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)', fontWeight: '800' }}>
                📬 Gelen Müşteri Talepleri ve Form Gönderimleri
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                İletişim formları ve teklif isteme modallarından gelen tüm müşteri talepleri.
              </p>
            </div>

            <button
              onClick={() => {
                const name = prompt('Müşteri / Şirket Adı:');
                if (!name) return;
                const email = prompt('E-Posta:');
                const phone = prompt('Telefon:');
                const service = prompt('Talep Edilen Hizmet:', 'Hazır Web Sitesi Satın Alımı');
                setLeads([{
                  id: Date.now(),
                  name,
                  email: email || 'bilgi@musteri.com',
                  phone: phone || '0532 000 00 00',
                  service: service || 'Kurumsal Ajans Hizmeti',
                  date: 'Az önce',
                  status: 'Yeni'
                }, ...leads]);
              }}
              className="btn-editorial btn-lime"
              style={{ padding: '10px 16px', fontSize: '0.85rem' }}
            >
              <Plus size={16} /> Manuel Talep Ekle
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {leads.map(lead => (
              <div key={lead.id} style={{ padding: '18px 22px', borderRadius: '16px', background: 'var(--bg-elevated)', border: '1px solid var(--border-strong)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)' }}>{lead.name}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--accent-lime)', fontWeight: '800', marginTop: '2px' }}>{lead.service}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    📧 {lead.email} • 📞 {lead.phone} • 🕒 {lead.date}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <select
                    value={lead.status}
                    onChange={e => handleUpdateLeadStatus(lead.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: '800',
                      background: lead.status === 'Yeni' ? 'rgba(245, 158, 11, 0.15)' : lead.status === 'Görüşüldü' ? 'rgba(2, 132, 199, 0.15)' : 'rgba(21, 128, 61, 0.15)',
                      color: lead.status === 'Yeni' ? '#F59E0B' : lead.status === 'Görüşüldü' ? '#0284C7' : 'var(--accent-lime)',
                      border: '1px solid var(--border-strong)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Yeni">🟡 Yeni Talep</option>
                    <option value="Görüşüldü">🔵 Görüşüldü</option>
                    <option value="Teklif Gönderildi">🟣 Teklif Gönderildi</option>
                    <option value="Tamamlandı">🟢 Tamamlandı</option>
                  </select>

                  <button
                    onClick={() => handleDeleteLead(lead.id)}
                    style={{ padding: '6px 10px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#F87171', cursor: 'pointer' }}
                    title="Talebi Sil"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
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
  fontWeight: '800',
  color: 'var(--text-main)',
  marginBottom: '6px'
};

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-strong)',
  color: 'var(--text-main)',
  fontSize: '0.88rem',
  fontWeight: '700',
  outline: 'none'
};
