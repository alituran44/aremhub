import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Target, 
  Calendar, 
  Sparkles, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  MousePointer, 
  CheckCircle2, 
  Clock, 
  PauseCircle, 
  PlayCircle, 
  Image as ImageIcon, 
  Send, 
  Copy, 
  Download, 
  Filter, 
  Smartphone, 
  Globe, 
  Sliders, 
  Check, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  UserCheck,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  Repeat,
  Layers,
  Bot,
  AlertTriangle,
  FileSpreadsheet,
  Settings,
  Terminal,
  Activity,
  User,
  Hash,
  MessageCircle,
  ThumbsUp,
  ExternalLink,
  Cpu,
  Server,
  Lock,
  RefreshCw,
  SlidersHorizontal,
  Workflow,
  Sparkle,
  Building2,
  Link,
  Link2,
  Unlink,
  PlusCircle,
  Briefcase,
  Users,
  CheckCircle,
  Radio,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function SocialAdsHub({ onOpenQuoteModal, onOpenStore }) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('ads'); // 'ads' | 'social' | 'rules' | 'inbox' | 'connect' | 'ai-copy' | 'analytics' | 'architecture'
  const [copiedIndex, setCopiedIndex] = useState(null);

  // -------------------------------------------------------------
  // 1. AGENCY CLIENT COMPANIES STATE (ÇOKLU MÜŞTERİ FİRMA YÖNETİMİ)
  // -------------------------------------------------------------
  const defaultClients = [
    { 
      id: 'client-dinapoli', 
      name: 'Di Napoli Pizza (Pizzada Usta Eller)', 
      industry: 'Gurme Pizzeria & Restoran (1997)', 
      logo: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80',
      monthlyBudget: 18500,
      activeCampaignsCount: 3,
      roasTarget: '6.5x',
      primaryContact: 'Sipariş Hatları: 0286 212 50 51 - 212 32 76 - 212 30 17',
      phones: ['0286 212 50 51', '0286 212 32 76', '0286 212 30 17'],
      status: 'active'
    },
    { 
      id: 'client-1', 
      name: 'Acme Holding E-Ticaret', 
      industry: 'Moda & Tekstil E-Ticaret', 
      logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      monthlyBudget: 15000,
      activeCampaignsCount: 3,
      roasTarget: '5.0x',
      primaryContact: 'Ahmet Yılmaz (CMO) - ahmet@acmeholding.com',
      status: 'active'
    },
    { 
      id: 'client-2', 
      name: 'Lezzet Restoran Grubu', 
      industry: 'Gastronomi & Cafe Zinciri', 
      logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150&q=80',
      monthlyBudget: 8000,
      activeCampaignsCount: 2,
      roasTarget: '4.0x',
      primaryContact: 'Selin Kaya (Pazarlama Müdürü) - selin@lezzetgrubu.com',
      status: 'active'
    },
    { 
      id: 'client-3', 
      name: 'TechCorp B2B SaaS', 
      industry: 'Yazılım & Kurumsal Lisans', 
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=150&q=80',
      monthlyBudget: 25000,
      activeCampaignsCount: 4,
      roasTarget: '6.0x',
      primaryContact: 'Mehmet Demir (CEO) - mehmet@techcorp.com',
      status: 'active'
    }
  ];

  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_agency_clients_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.some(c => c.id === 'client-dinapoli')) return parsed;
      }
    } catch (e) {
      console.error('Failed to load agency clients', e);
    }
    return defaultClients;
  });

  const [selectedClientId, setSelectedClientId] = useState('client-dinapoli');

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_agency_clients_v5', JSON.stringify(clients));
    } catch (e) {
      console.error('Failed to save agency clients', e);
    }
  }, [clients]);

  // New Client Modal State
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientIndustry, setNewClientIndustry] = useState('E-Ticaret');
  const [newClientBudget, setNewClientBudget] = useState(10000);
  const [newClientContact, setNewClientContact] = useState('');

  const handleCreateClient = (e) => {
    e.preventDefault();
    if (!newClientName) return;

    const newClient = {
      id: `client-${Date.now()}`,
      name: newClientName,
      industry: newClientIndustry,
      logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=150&q=80',
      monthlyBudget: Number(newClientBudget) || 10000,
      activeCampaignsCount: 0,
      roasTarget: '4.0x',
      primaryContact: newClientContact || 'İletişim Belirtilmedi',
      status: 'active'
    };

    setClients([newClient, ...clients]);
    setSelectedClientId(newClient.id);
    setIsNewClientModalOpen(false);
    setNewClientName('');
    setNewClientContact('');
    alert(`Yeni müşteri firması (${newClientName}) başarıyla oluşturuldu!`);
  };

  // -------------------------------------------------------------
  // 2. CONNECTED SOCIAL & ADS ACCOUNTS PER CLIENT
  // -------------------------------------------------------------
  const defaultConnectedAccounts = [
    { id: 101, clientId: 'client-dinapoli', platform: 'Instagram Business', handle: '@dinapolipizza', followers: '54.2K', status: 'connected', color: '#E1306C', adAccountId: 'act_dinapoli_9921', pageId: 'page_dinapoli_1997', tokenExpiry: '60 Gün Kaldı' },
    { id: 102, clientId: 'client-dinapoli', platform: 'Meta Ads Manager', handle: 'Di Napoli Meta Ads', followers: 'N/A', status: 'connected', color: '#1877F2', adAccountId: 'act_dinapoli_9921', pageId: 'page_dinapoli_1997', tokenExpiry: 'Yıllık Token' },
    { id: 103, clientId: 'client-dinapoli', platform: 'TikTok Business & Ads', handle: '@dinapolipizza_tr', followers: '28.4K', status: 'connected', color: '#000000', adAccountId: 'tt_ad_dinapoli', pageId: 'tt_org_dinapoli', tokenExpiry: '45 Gün Kaldı' },
    { id: 1, clientId: 'client-1', platform: 'Instagram Business', handle: '@acme_fashion', followers: '48.2K', status: 'connected', color: '#E1306C', adAccountId: 'act_394810294', pageId: 'page_9920194', tokenExpiry: '58 Gün Kaldı' },
    { id: 2, clientId: 'client-1', platform: 'Meta Ads Manager', handle: 'Acme Meta Ads', followers: 'N/A', status: 'connected', color: '#1877F2', adAccountId: 'act_394810294', pageId: 'page_9920194', tokenExpiry: 'Yıllık Token' },
    { id: 3, clientId: 'client-2', platform: 'Instagram Business', handle: '@lezzet_restoran', followers: '24.5K', status: 'connected', color: '#E1306C', adAccountId: 'act_774829104', pageId: 'page_4410291', tokenExpiry: '45 Gün Kaldı' }
  ];

  const [connectedAccounts, setConnectedAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_connected_accounts_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.some(a => a.clientId === 'client-dinapoli')) return parsed;
      }
    } catch (e) {
      console.error('Failed to load connected accounts', e);
    }
    return defaultConnectedAccounts;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_connected_accounts_v5', JSON.stringify(connectedAccounts));
    } catch (e) {
      console.error('Failed to save connected accounts', e);
    }
  }, [connectedAccounts]);

  // Connect Account Wizard Modal State
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectPlatform, setConnectPlatform] = useState('instagram');
  const [connectHandle, setConnectHandle] = useState('');
  const [connectAdAccountId, setConnectAdAccountId] = useState('');
  const [connectTargetClientId, setConnectTargetClientId] = useState(selectedClientId !== 'all' ? selectedClientId : 'client-dinapoli');

  const handleConnectAccount = (e) => {
    e.preventDefault();
    if (!connectHandle) return;

    const platformLabels = {
      instagram: 'Instagram Business',
      facebook: 'Facebook Page & Ads',
      meta: 'Meta Ads Manager',
      linkedin: 'LinkedIn Corporate',
      google: 'Google Ads Account',
      tiktok: 'TikTok Business & Ads'
    };

    const platformColors = {
      instagram: '#E1306C',
      facebook: '#1877F2',
      meta: '#0284C7',
      linkedin: '#0A66C2',
      google: '#EA4335',
      tiktok: '#000000'
    };

    const newAcc = {
      id: Date.now(),
      clientId: connectTargetClientId,
      platform: platformLabels[connectPlatform] || 'Sosyal Medya Hesabı',
      handle: connectHandle,
      followers: 'Yeni Bağlandı',
      status: 'connected',
      color: platformColors[connectPlatform] || '#84CC16',
      adAccountId: connectAdAccountId || `act_${Math.floor(Math.random()*900000000+100000000)}`,
      pageId: `page_${Math.floor(Math.random()*9000000+1000000)}`,
      tokenExpiry: '60 Gün Kaldı (Otomatik Yenileniyor)'
    };

    setConnectedAccounts([...connectedAccounts, newAcc]);
    setIsConnectModalOpen(false);
    setConnectHandle('');
    setConnectAdAccountId('');
    alert(`Hesap (${connectHandle}) başarıyla yetkilendirildi ve firmaya bağlandı!`);
  };

  const handleDisconnectAccount = (id) => {
    if (window.confirm('Bu sosyal medya / reklam hesabının bağlantısını kesmek istediğinizden emin misiniz?')) {
      setConnectedAccounts(connectedAccounts.filter(a => a.id !== id));
    }
  };

  // -------------------------------------------------------------
  // 3. ADS CAMPAIGNS STATE PER CLIENT
  // -------------------------------------------------------------
  const defaultCampaigns = [
    {
      id: 'cmp-dinapoli-1',
      clientId: 'client-dinapoli',
      name: 'Di Napoli Pizza - Taş Fırından Taze Pizza Sipariş Ads (0286 212 50 51)',
      platform: 'meta',
      objective: 'CONVERSIONS',
      status: 'active',
      dailyBudget: 450,
      spent: 5400,
      impressions: '128.4K',
      clicks: '4.920',
      ctr: '%3.83',
      cpc: '₺1.09',
      roas: '6.8x',
      conversions: 242,
      startDate: '2026-08-01',
      creativeImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
      targetAudience: 'Çanakkale & Çevre Bölge | Pizzada Usta Eller (1997) | Tel: 0286 212 50 51',
      pixelId: 'px_dinapoli_pizza'
    },
    {
      id: 'cmp-dinapoli-2',
      clientId: 'client-dinapoli',
      name: 'Di Napoli Pizza - Google Ads Arama Ağı ("Çanakkale Pizza Sipariş")',
      platform: 'google',
      objective: 'CALLS_CONVERSIONS',
      status: 'active',
      dailyBudget: 350,
      spent: 4200,
      impressions: '42.8K',
      clicks: '2.840',
      ctr: '%6.63',
      cpc: '₺1.47',
      roas: '7.2x',
      conversions: 186,
      startDate: '2026-08-02',
      creativeImage: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80',
      targetAudience: 'Çanakkale Arama Ağı | Tel: 0286 212 32 76 / 212 30 17',
      pixelId: 'g_tag_dinapoli'
    },
    {
      id: 'cmp-101',
      clientId: 'client-1',
      name: 'Acme Moda - Instagram Reels Dönüşüm Kampanyası',
      platform: 'meta',
      objective: 'CONVERSIONS',
      status: 'active',
      dailyBudget: 450,
      spent: 6300,
      impressions: '142.5K',
      clicks: '4.820',
      ctr: '%3.38',
      cpc: '₺1.30',
      roas: '5.4x',
      conversions: 184,
      startDate: '2026-08-01',
      creativeImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      targetAudience: 'TR (18-45) | Lüks Giyim & E-Ticaret',
      pixelId: 'px_acme_99281'
    }
  ];

  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_ads_campaigns_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.some(c => c.clientId === 'client-dinapoli')) return parsed;
      }
    } catch (e) {
      console.error('Failed to load campaigns', e);
    }
    return defaultCampaigns;
  });

  useEffect(() => {
    try {
      localStorage.setItem('aremhub_ads_campaigns_v5', JSON.stringify(campaigns));
    } catch (e) {
      console.error('Failed to save campaigns', e);
    }
  }, [campaigns]);

  // Filter Data by Active Selected Client
  const filteredCampaigns = selectedClientId === 'all' 
    ? campaigns 
    : campaigns.filter(c => c.clientId === selectedClientId);

  const filteredConnectedAccounts = selectedClientId === 'all'
    ? connectedAccounts
    : connectedAccounts.filter(a => a.clientId === selectedClientId);

  // -------------------------------------------------------------
  // 4. ENTERPRISE 5-STEP CAMPAIGN WIZARD MODAL STATE
  // -------------------------------------------------------------
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    clientId: selectedClientId !== 'all' ? selectedClientId : 'client-1',
    name: '',
    platform: 'meta',
    objective: 'CONVERSIONS',
    dailyBudget: 350,
    targetCountry: 'Türkiye',
    ageRange: '18-45',
    interests: 'E-Ticaret, Dijital Pazarlama, SaaS',
    headline: 'İşletmenizi %300 Büyütecek Hazır Yazılım Paketleri',
    primaryText: 'AremHub ile SaaS lisanslarınızı anında yayına alın.',
    cta: 'Şimdi İncele ↗',
    creativeImage: '',
    pixelId: 'px_aremhub_main_2026'
  });

  const handleWizardSubmit = (e) => {
    e.preventDefault();
    if (!wizardData.name) return;

    const newCmp = {
      id: `cmp-${Date.now()}`,
      clientId: wizardData.clientId,
      name: wizardData.name,
      platform: wizardData.platform,
      objective: wizardData.objective,
      status: 'active',
      dailyBudget: Number(wizardData.dailyBudget) || 350,
      spent: 0,
      impressions: '0',
      clicks: '0',
      ctr: '%0.00',
      cpc: '₺0.00',
      roas: '0.0x',
      conversions: 0,
      startDate: new Date().toISOString().split('T')[0],
      creativeImage: wizardData.creativeImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      targetAudience: `${wizardData.targetCountry} (${wizardData.ageRange}) | ${wizardData.interests}`,
      pixelId: wizardData.pixelId
    };

    setCampaigns([newCmp, ...campaigns]);
    setIsWizardOpen(false);
    setWizardStep(1);
    alert(`Yeni kampanya (${wizardData.name}) ilgili firmaya başarıyla eklendi!`);
  };

  const toggleCampaignStatus = (id) => {
    setCampaigns(campaigns.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c));
  };

  // -------------------------------------------------------------
  // 5. SOCIAL MEDIA POSTS PER CLIENT
  // -------------------------------------------------------------
  const defaultSocialPosts = [
    {
      id: 'post-1',
      clientId: 'client-2',
      title: 'Restoran ve Kafeler İçin Dijital Menü Tasarım İpuçları',
      platform: 'instagram',
      scheduledDate: '2026-08-14',
      scheduledTime: '18:30',
      status: 'scheduled',
      caption: 'Restoranınızda sipariş dönüşümlerinizi artıracak 5 altın kural! 🍕 Ücretsiz Canva şablonlarımız mağazada yayında.',
      firstComment: '👇 Ücretsiz indirme linki bio kısmındadır!',
      hashtags: '#restoranyonetimi #sosyalmedyapazarlama #canva #aremhub',
      mediaUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'post-2',
      clientId: 'client-3',
      title: 'Next.js 14 App Router vs Pages Router Karşılaştırması',
      platform: 'linkedin',
      scheduledDate: '2026-08-15',
      scheduledTime: '10:00',
      status: 'scheduled',
      caption: 'Yazılım projelerinizde performans ve SEO başarısını %50 artıran Next.js 14 mimari rehberi yayında!',
      firstComment: 'Açık kaynak kodu GitHub hesabımızda inceleyebilirsiniz.',
      hashtags: '#nextjs #react #webdesign #softwareengineering',
      mediaUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const [socialPosts, setSocialPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('aremhub_social_posts_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load social posts', e);
    }
    return defaultSocialPosts;
  });

  const filteredSocialPosts = selectedClientId === 'all'
    ? socialPosts
    : socialPosts.filter(p => p.clientId === selectedClientId);

  // Social Composer Form State
  const [postTitle, setPostTitle] = useState('');
  const [postPlatform, setPostPlatform] = useState('instagram');
  const [postCaption, setPostCaption] = useState('');
  const [postFirstComment, setPostFirstComment] = useState('👇 Detaylar ve ücretsiz şablon indirme linki bio alanındadır!');
  const [postHashtags, setPostHashtags] = useState('#aremhub #dijitalpazarlama #yazilim #socialmedia');
  const [postDate, setPostDate] = useState('2026-08-16');
  const [postTime, setPostTime] = useState('19:00');
  const [postImage, setPostImage] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postTitle || !postCaption) return;

    const targetClientId = selectedClientId !== 'all' ? selectedClientId : 'client-1';

    const newPost = {
      id: `post-${Date.now()}`,
      clientId: targetClientId,
      title: postTitle,
      platform: postPlatform,
      scheduledDate: postDate,
      scheduledTime: postTime,
      status: 'scheduled',
      caption: postCaption,
      firstComment: postFirstComment,
      hashtags: postHashtags,
      mediaUrl: postImage || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80'
    };

    setSocialPosts([newPost, ...socialPosts]);
    setPostTitle('');
    setPostCaption('');
    setPostImage('');
    alert('Gönderi takvime eklendi ve ilgili müşterinin Postiz zamanlayıcısına iletildi!');
  };

  const handleImageFileUpload = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  // Aggregated KPIs for Active Client
  const totalSpend = filteredCampaigns.reduce((acc, c) => acc + c.spent, 0);
  const activeCampaignsCount = filteredCampaigns.filter(c => c.status === 'active').length;
  const scheduledPostsCount = filteredSocialPosts.filter(p => p.status === 'scheduled').length;
  const activeClientObj = clients.find(c => c.id === selectedClientId);

  return (
    <div style={{ padding: '32px 0', minHeight: '80vh', width: '100%' }}>
      
      {/* ------------------------------------------------------------- */}
      {/* TOP CONSOLIDATED AGENCY HEADER BANNER & CLIENT SWITCHER */}
      {/* ------------------------------------------------------------- */}
      <div 
        className="glass-card" 
        style={{ 
          padding: '28px 32px', 
          borderRadius: '24px', 
          marginBottom: '24px', 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
          border: '1px solid var(--border-strong)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Header Top Row: Title, Slogan & Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '12px', background: 'rgba(132, 204, 22, 0.15)', color: 'var(--accent-lime)', fontSize: '0.8rem', fontWeight: '800', marginBottom: '12px' }}>
              <Zap size={15} /> All-in-One Enterprise Social & Ads Management Suite
            </div>
            
            <h1 style={{ fontSize: '2.2rem', color: '#FFF', fontWeight: '900', margin: '0 0 6px 0', lineHeight: '1.2' }}>
              {selectedClientId === 'all' ? 'Sosyal Medya & Reklam Yönetim Paneli' : activeClientObj?.name}
            </h1>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: 0, maxWidth: '680px' }}>
              {selectedClientId === 'all' 
                ? 'Meta (Instagram/FB) ve Google Ads performans kampanyalarını yönetin, sosyal medya gönderilerinizi zamanlayın, AI reklam metni asistanı ile dönüşüm ROAS oranlarınızı 5x yapın.'
                : `${activeClientObj?.industry} • İletişim: ${activeClientObj?.primaryContact}`
              }
            </p>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button 
              onClick={() => setIsNewClientModalOpen(true)}
              className="btn-editorial btn-outline-editorial"
              style={{ padding: '10px 16px', fontSize: '0.84rem' }}
            >
              <PlusCircle size={15} color="var(--accent-lime)" /> + Yeni Firma Ekle
            </button>
            <button 
              onClick={() => setIsConnectModalOpen(true)} 
              className="btn-editorial btn-outline-editorial" 
              style={{ padding: '10px 16px', fontSize: '0.84rem' }}
            >
              <Link2 size={15} color="var(--accent-lime)" /> 🔗 + Hesabı Bağla
            </button>
            <button 
              onClick={() => setIsWizardOpen(true)} 
              className="btn-editorial btn-lime" 
              style={{ padding: '10px 18px', fontSize: '0.86rem' }}
            >
              <Plus size={16} /> ⚡ Reklam Sihirbazı
            </button>
          </div>
        </div>

        {/* Header Bottom Row: Client Workspace Selector Pills */}
        <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--accent-lime)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={16} /> Firma Çalışma Alanı:
          </span>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedClientId('all')}
              style={{
                padding: '7px 14px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                background: selectedClientId === 'all' ? 'var(--accent-lime)' : 'rgba(255,255,255,0.08)',
                color: selectedClientId === 'all' ? '#FFF' : '#CBD5E1',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              🏢 Tüm Firmalar (Ajans Genel Bakış)
            </button>

            {clients.map(cl => (
              <button
                key={cl.id}
                onClick={() => setSelectedClientId(cl.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: '800',
                  border: 'none',
                  cursor: 'pointer',
                  background: selectedClientId === cl.id ? '#0284C7' : 'rgba(255,255,255,0.08)',
                  color: selectedClientId === cl.id ? '#FFF' : '#CBD5E1',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
              >
                <Briefcase size={13} /> {cl.name}
              </button>
            ))}
          </div>
        </div>
      {/* Connected Platform Pills Bar (Matching Screenshot Layout) */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '20px', 
          overflowX: 'auto', 
          paddingBottom: '6px' 
        }}
      >
        {filteredConnectedAccounts.map(acc => (
          <div
            key={acc.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }}></span>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', display: 'block', fontWeight: '600' }}>{acc.platform}</span>
              <strong style={{ color: 'var(--text-main)', fontSize: '0.82rem' }}>{acc.handle} ({acc.followers})</strong>
            </div>
          </div>
        ))}

        <button
          onClick={() => setIsConnectModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '16px',
            background: 'rgba(132, 204, 22, 0.1)',
            border: '1px dashed var(--accent-lime)',
            color: 'var(--accent-lime)',
            fontSize: '0.8rem',
            fontWeight: '800',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          <Plus size={14} /> + Hesabı Bağla
        </button>
      </div>

      {/* KPI Highlights Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        
        <div className="editorial-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Aktif Kampanyalar</span>
            <Target size={16} color="var(--accent-lime)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            {activeCampaignsCount} Kampanya
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: '700', marginTop: '4px' }}>
            {selectedClientId === 'all' ? '✓ Tüm Müşteriler Canlı' : `✓ ${activeClientObj?.name} İçin`}
          </div>
        </div>

        <div className="editorial-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Toplam Reklam Harcaması</span>
            <DollarSign size={16} color="#0284C7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            ₺{totalSpend.toLocaleString('tr-TR')}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', fontWeight: '700', marginTop: '4px' }}>
            📈 Hedef ROAS: {activeClientObj?.roasTarget || '5.0x'}
          </div>
        </div>

        <div className="editorial-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Bağlı Sosyal Hesaplar</span>
            <Link size={16} color="#6D28D9" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            {filteredConnectedAccounts.length} Hesap
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>
            🔗 Instagram, Meta, LinkedIn, Google
          </div>
        </div>

        <div className="editorial-card" style={{ padding: '20px', background: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '800', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
            <span>Zamanlanmış İçerikler</span>
            <Calendar size={16} color="#F59E0B" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            {scheduledPostsCount} Gönderi
          </div>
          <div style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: '700', marginTop: '4px' }}>
            📅 Takvim Yayın Kuyruğunda
          </div>
        </div>

      </div>

      {/* Accessible Navigation Tabs */}
      <div 
        role="tablist" 
        aria-label="Sosyal Medya ve Reklam Yönetim Sekmeleri"
        style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '28px', 
          borderBottom: '1px solid var(--border-subtle)', 
          paddingBottom: '14px',
          flexWrap: 'wrap'
        }}
      >
        <button
          role="tab"
          aria-selected={activeTab === 'ads'}
          onClick={() => setActiveTab('ads')}
          style={activeTab === 'ads' ? activeTabStyle : tabStyle}
        >
          <Target size={16} /> 📊 Reklam Yöneticisi & A/B Testi ({filteredCampaigns.length})
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'connect'}
          onClick={() => setActiveTab('connect')}
          style={activeTab === 'connect' ? activeTabStyle : tabStyle}
        >
          <Link2 size={16} /> 🔗 Sosyal & Ads Hesap Entegrasyonları ({filteredConnectedAccounts.length})
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'social'}
          onClick={() => setActiveTab('social')}
          style={activeTab === 'social' ? activeTabStyle : tabStyle}
        >
          <Calendar size={16} /> 📅 İçerik Planlayıcı & Önizleme ({filteredSocialPosts.length})
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'rules'}
          onClick={() => setActiveTab('rules')}
          style={activeTab === 'rules' ? activeTabStyle : tabStyle}
        >
          <Workflow size={16} /> ⚡ Otomatik Kural & Auto-Boost
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'ai-copy'}
          onClick={() => setActiveTab('ai-copy')}
          style={activeTab === 'ai-copy' ? activeTabStyle : tabStyle}
        >
          <Sparkles size={16} /> 🤖 AI Reklam & Metin Asistanı
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'architecture'}
          onClick={() => setActiveTab('architecture')}
          style={activeTab === 'architecture' ? activeTabStyle : tabStyle}
        >
          <Layers size={16} /> 🏛️ Sunucu Engine & Docker
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: REKLAM KAMPANYA YÖNETİCİSİ */}
      {/* ========================================================= */}
      {activeTab === 'ads' && (
        <div className="animate-fade-in-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                {selectedClientId === 'all' ? 'Tüm Müşteri Reklam Kampanyaları' : `${activeClientObj?.name} Kampanyaları`}
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Meta Ads & Google Ads canlı reklam harcamaları, ROAS değerleri ve bütçe yönetim paneli.
              </div>
            </div>

            <button 
              onClick={() => setIsWizardOpen(true)}
              className="btn-editorial btn-lime"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <Plus size={16} /> 5-Adımlı Reklam Sihirbazı Başlat
            </button>
          </div>

          {/* Campaigns Table */}
          <div className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-strong)', marginBottom: '28px' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Firma & Kampanya</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Platform & Pixel</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Durum</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Günlük Bütçe</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Toplam Harcama</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>Gösterim / Tıklama</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800' }}>ROAS</th>
                    <th style={{ padding: '14px 18px', fontWeight: '800', textAlign: 'right' }}>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCampaigns.map((cmp) => {
                    const clientOwner = clients.find(c => c.id === cmp.clientId);
                    return (
                      <tr key={cmp.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '50px', height: '36px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#000' }}>
                              <img src={cmp.creativeImage} alt={cmp.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '0.9rem' }}>{cmp.name}</div>
                              <div style={{ fontSize: '0.74rem', color: 'var(--accent-lime)', fontWeight: '800' }}>🏢 {clientOwner?.name || 'Genel Müşteri'}</div>
                            </div>
                          </div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{
                              padding: '3px 8px',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '800',
                              background: cmp.platform === 'meta' ? 'rgba(2, 132, 199, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                              color: cmp.platform === 'meta' ? '#0284C7' : '#EAB308',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              width: 'fit-content'
                            }}>
                              {cmp.platform === 'meta' ? <Instagram size={12} /> : <Globe size={12} />}
                              {cmp.platform === 'meta' ? 'Meta Ads' : 'Google Ads'}
                            </span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pixel: {cmp.pixelId}</span>
                          </div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            fontSize: '0.75rem',
                            fontWeight: '800',
                            background: cmp.status === 'active' ? 'rgba(132, 204, 22, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: cmp.status === 'active' ? 'var(--accent-lime)' : '#EF4444',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {cmp.status === 'active' ? '🟢 Aktif' : '🔴 Duraklatıldı'}
                          </span>
                        </td>

                        <td style={{ padding: '14px 18px', fontWeight: '800', color: 'var(--text-main)' }}>
                          ₺{cmp.dailyBudget} / gün
                        </td>

                        <td style={{ padding: '14px 18px', fontWeight: '800', color: 'var(--text-main)' }}>
                          ₺{cmp.spent.toLocaleString('tr-TR')}
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: '800', color: 'var(--text-main)' }}>{cmp.impressions} Gösterim</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cmp.clicks} Tıklama ({cmp.ctr})</div>
                        </td>

                        <td style={{ padding: '14px 18px' }}>
                          <span className="stat-pill stat-lime" style={{ fontSize: '0.8rem', fontWeight: '900' }}>
                            ⚡ {cmp.roas}
                          </span>
                        </td>

                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => toggleCampaignStatus(cmp.id)}
                            className="btn-editorial btn-outline-editorial"
                            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                          >
                            {cmp.status === 'active' ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                            {cmp.status === 'active' ? 'Duraklat' : 'Başlat'}
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SOSYAL & ADS HESAP ENTEGRASYONLARI (OAUTH CONNECTOR) */}
      {/* ========================================================= */}
      {activeTab === 'connect' && (
        <div className="animate-fade-in-up">
          <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', marginBottom: '28px', border: '1px solid var(--border-strong)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link2 size={20} color="var(--accent-lime)" /> Bağlı Sosyal Medya & Reklam Hesapları (OAuth Manager)
                </h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {selectedClientId === 'all' 
                    ? 'Tüm ajans müşterilerinizin bağlı Instagram, Facebook, Meta Ads, LinkedIn ve Google Ads hesap erişim yetkileri.' 
                    : `${activeClientObj?.name} firmasına tanımlı sosyal medya ve reklam hesabı yetkileri.`}
                </div>
              </div>

              <button 
                onClick={() => setIsConnectModalOpen(true)}
                className="btn-editorial btn-lime"
                style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              >
                <Plus size={16} /> ⚡ Yeni Hesap Bağla (OAuth Sihirbazı)
              </button>
            </div>

            {/* Connected Accounts Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {filteredConnectedAccounts.map(acc => {
                const clientOwner = clients.find(c => c.id === acc.clientId);
                return (
                  <div key={acc.id} style={{ background: 'var(--bg-elevated)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '800',
                        background: 'rgba(132, 204, 22, 0.15)',
                        color: 'var(--accent-lime)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <Radio size={12} /> {acc.platform}
                      </span>
                      <span className="stat-pill stat-lime" style={{ fontSize: '0.7rem' }}>🟢 Bağlı (OAuth Aktif)</span>
                    </div>

                    <div style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '4px' }}>
                      {acc.handle}
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      🏢 <strong>Firma:</strong> {clientOwner?.name || 'Genel Ajans'}<br />
                      🆔 <strong>Reklam Hesabı ID:</strong> {acc.adAccountId}<br />
                      🔐 <strong>Token Durumu:</strong> {acc.tokenExpiry}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--accent-lime)', fontWeight: '800' }}>✓ Paylaşım & Reklam Yetkisi Var</span>
                      <button 
                        onClick={() => handleDisconnectAccount(acc.id)}
                        className="btn-editorial btn-outline-editorial" 
                        style={{ padding: '4px 10px', fontSize: '0.72rem', color: '#EF4444', borderColor: 'rgba(239,68,68,0.3)' }}
                      >
                        <Unlink size={13} /> Bağlantıyı Kes
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: İÇERİK PLANLAYICI & ÖNİZLEME */}
      {/* ========================================================= */}
      {activeTab === 'social' && (
        <div className="animate-fade-in-up">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px' }}>
            
            {/* Form Column */}
            <div>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px', border: '1px solid var(--border-strong)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={18} color="var(--accent-lime)" /> Yeni Sosyal Medya Gönderisi Zamanla (Postiz Engine)
                </h3>
                
                <form onSubmit={handleCreatePost}>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Gönderi Başlığı & Notu</label>
                    <input
                      type="text"
                      placeholder="Örn: Restoranlar İçin Dijital Menü Rehberi"
                      value={postTitle}
                      onChange={e => setPostTitle(e.target.value)}
                      style={inputStyle}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={labelStyle}>Platform</label>
                      <select 
                        value={postPlatform}
                        onChange={e => setPostPlatform(e.target.value)}
                        style={inputStyle}
                      >
                        <option value="instagram">Instagram (Reels & Feed)</option>
                        <option value="linkedin">LinkedIn Corporate</option>
                        <option value="facebook">Facebook Business</option>
                        <option value="tiktok">TikTok Video</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Yayın Tarihi & Saati</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input type="date" value={postDate} onChange={e => setPostDate(e.target.value)} style={inputStyle} />
                        <input type="time" value={postTime} onChange={e => setPostTime(e.target.value)} style={inputStyle} />
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Gönderi Açıklama Metni (Caption)</label>
                    <textarea
                      rows={3}
                      value={postCaption}
                      onChange={e => setPostCaption(e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      placeholder="Gönderi altı metni ve çağrı mesajı..."
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Görsel / Video Yükle</label>
                    <input type="file" accept="image/*" onChange={e => handleImageFileUpload(e, setPostImage)} style={inputStyle} />
                  </div>

                  <button type="submit" className="btn-editorial btn-lime" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                    <Send size={16} /> Gönderiyi Takvime Ekle & Zamanla
                  </button>
                </form>
              </div>
            </div>

            {/* Live Mobile Device Preview Column */}
            <div>
              <div className="glass-card" style={{ padding: '24px', borderRadius: '24px', border: '1px solid var(--border-strong)', position: 'sticky', top: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Smartphone size={16} color="var(--accent-lime)" /> Canlı Mobil Önizleme
                  </span>
                  <span className="stat-pill stat-lime" style={{ fontSize: '0.7rem' }}>
                    {postPlatform.toUpperCase()}
                  </span>
                </div>

                <div style={{
                  width: '100%',
                  height: '480px',
                  borderRadius: '32px',
                  background: '#090D16',
                  border: '8px solid #1E293B',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ padding: '8px 16px', background: '#0F172A', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94A3B8', fontWeight: '700' }}>
                    <span>9:41</span>
                    <span>5G 📶 100%</span>
                  </div>

                  <div style={{ padding: '10px 16px', background: '#0F172A', borderBottom: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: '#000', fontSize: '0.75rem' }}>
                      A
                    </div>
                    <div>
                      <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#FFF' }}>{activeClientObj?.name || 'AremHub Client'}</div>
                      <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Sponsored • Postiz Engine</div>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '200px', background: '#000' }}>
                    <img 
                      src={postImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'} 
                      alt="Preview" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>

                  <div style={{ padding: '14px', flex: 1, background: '#0F172A', color: '#FFF', fontSize: '0.78rem', lineHeight: '1.4' }}>
                    <div style={{ fontWeight: '700', marginBottom: '4px' }}>
                      {postTitle || 'Restoran ve Kafeler İçin Dijital Menü Tasarım İpuçları'}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>
                      {postCaption || 'Dönüşümlerinizi artıracak 5 altın kural! 🍕'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: YENİ FİRMA / MÜŞTERİ EKLE MODALI */}
      {/* ========================================================= */}
      {isNewClientModalOpen && (
        <div style={modalOverlayStyle} onClick={(e) => { if (e.target === e.currentTarget) setIsNewClientModalOpen(false); }}>
          <div style={{ ...modalContentStyle, width: '540px' }}>
            <div style={modalHeaderStyle}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={18} color="var(--accent-lime)" /> Yeni Müşteri / Firma Çalışma Alanı Ekle
              </h3>
              <button onClick={() => setIsNewClientModalOpen(false)} style={closeButtonStyle} title="Pencereyi Kapat">✕</button>
            </div>

            <form onSubmit={handleCreateClient}>
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Firma / Marka Adı</label>
                <input type="text" placeholder="Örn: Luna Kozmetik & Güzellik" value={newClientName} onChange={e => setNewClientName(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Sektör / Faaliyet Alanı</label>
                <input type="text" placeholder="Örn: E-Ticaret, Gastronomi, SaaS" value={newClientIndustry} onChange={e => setNewClientIndustry(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Aylık Hedef Reklam Bütçesi (TL)</label>
                <input type="number" value={newClientBudget} onChange={e => setNewClientBudget(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Müşteri Yetkilisi & İletişim Bilgisi</label>
                <input type="text" placeholder="Örn: Zeynep Arslan (CMO) - zeynep@firma.com" value={newClientContact} onChange={e => setNewClientContact(e.target.value)} style={inputStyle} />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsNewClientModalOpen(false)} 
                  className="btn-editorial btn-outline-editorial"
                  style={{ flex: '1', justifyContent: 'center' }}
                >
                  ✕ Vazgeç / Kapat
                </button>
                <button 
                  type="submit" 
                  className="btn-editorial btn-lime" 
                  style={{ flex: '2', justifyContent: 'center', padding: '12px' }}
                >
                  🏢 Firma Çalışma Alanını Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: SOSYAL & REKLAM HESABI BAĞLAMA MODALI (OAUTH WIZARD) */}
      {/* ========================================================= */}
      {isConnectModalOpen && (
        <div style={modalOverlayStyle} onClick={(e) => { if (e.target === e.currentTarget) setIsConnectModalOpen(false); }}>
          <div style={{ ...modalContentStyle, width: '560px' }}>
            <div style={modalHeaderStyle}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link2 size={18} color="var(--accent-lime)" /> Yeni Sosyal Medya / Reklam Hesabı Bağla (OAuth)
              </h3>
              <button onClick={() => setIsConnectModalOpen(false)} style={closeButtonStyle} title="Pencereyi Kapat">✕</button>
            </div>

            <form onSubmit={handleConnectAccount}>
              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Hesabın Tanımlanacağı Müşteri Firma</label>
                <select value={connectTargetClientId} onChange={e => setConnectTargetClientId(e.target.value)} style={inputStyle}>
                  {clients.map(cl => (
                    <option key={cl.id} value={cl.id}>{cl.name} ({cl.industry})</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Platform / Hesap Türü</label>
                <select value={connectPlatform} onChange={e => setConnectPlatform(e.target.value)} style={inputStyle}>
                  <option value="instagram">Instagram Business Account</option>
                  <option value="meta">Meta Ads Manager (Instagram & FB Ads)</option>
                  <option value="facebook">Facebook Page</option>
                  <option value="linkedin">LinkedIn Corporate Company Page</option>
                  <option value="google">Google Ads Account</option>
                  <option value="tiktok">TikTok Business & Ads Manager</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={labelStyle}>Hesap Adı / Kullanıcı Adı (Handle)</label>
                <input type="text" placeholder="Örn: @luna_kozmetik veya Acme Meta Ads" value={connectHandle} onChange={e => setConnectHandle(e.target.value)} style={inputStyle} required />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Reklam Hesabı ID (Ad Account ID)</label>
                <input type="text" placeholder="Örn: act_394810294 veya 748-992-1049" value={connectAdAccountId} onChange={e => setConnectAdAccountId(e.target.value)} style={inputStyle} />
              </div>

              <div style={{ background: 'rgba(132, 204, 22, 0.1)', padding: '12px', borderRadius: '12px', marginBottom: '16px', fontSize: '0.8rem', color: 'var(--accent-lime)', fontWeight: '700' }}>
                ✓ Meta Graph API & Google OAuth 2.0 güvenli erişim protokolü ile yetkilendirilecektir.
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsConnectModalOpen(false)} 
                  className="btn-editorial btn-outline-editorial"
                  style={{ flex: '1', justifyContent: 'center' }}
                >
                  ✕ Vazgeç / Kapat
                </button>
                <button 
                  type="submit" 
                  className="btn-editorial btn-lime" 
                  style={{ flex: '2', justifyContent: 'center', padding: '12px' }}
                >
                  ⚡ OAuth İle Yetkilendir ve Bağla
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5-STEP REKLAM SİHİRBAZI MODALI */}
      {isWizardOpen && (
        <div style={modalOverlayStyle}>
          <div style={{ ...modalContentStyle, width: '680px' }}>
            <div style={modalHeaderStyle}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--text-main)', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={20} color="var(--accent-lime)" /> 5-Adımlı Kurumsal Reklam Sihirbazı
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Adım {wizardStep} / 5
                </div>
              </div>
              <button onClick={() => setIsWizardOpen(false)} style={closeButtonStyle}>✕</button>
            </div>

            <form onSubmit={handleWizardSubmit}>
              {wizardStep === 1 && (
                <div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Kampanyanın Ait Olduğu Firma</label>
                    <select value={wizardData.clientId} onChange={e => setWizardData({...wizardData, clientId: e.target.value})} style={inputStyle}>
                      {clients.map(cl => (
                        <option key={cl.id} value={cl.id}>{cl.name}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Kampanya Adı</label>
                    <input type="text" placeholder="Örn: E-Ticaret Dönüşüm Kampanyası" value={wizardData.name} onChange={e => setWizardData({...wizardData, name: e.target.value})} style={inputStyle} required />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                    <div>
                      <label style={labelStyle}>Reklam Platformu</label>
                      <select value={wizardData.platform} onChange={e => setWizardData({...wizardData, platform: e.target.value})} style={inputStyle}>
                        <option value="meta">Meta Ads (Instagram & Facebook)</option>
                        <option value="google">Google Ads</option>
                        <option value="tiktok">TikTok Ads</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Kampanya Hedefi</label>
                      <select value={wizardData.objective} onChange={e => setWizardData({...wizardData, objective: e.target.value})} style={inputStyle}>
                        <option value="CONVERSIONS">Satış & Dönüşüm</option>
                        <option value="LEADS">Potansiyel Müşteri (Lead Gen)</option>
                        <option value="TRAFFIC">Trafik</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {wizardStep > 1 && wizardStep < 5 && (
                <div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Günlük Reklam Bütçesi (TL)</label>
                    <input type="number" value={wizardData.dailyBudget} onChange={e => setWizardData({...wizardData, dailyBudget: e.target.value})} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={labelStyle}>Reklam Başlığı (Headline)</label>
                    <input type="text" value={wizardData.headline} onChange={e => setWizardData({...wizardData, headline: e.target.value})} style={inputStyle} />
                  </div>
                </div>
              )}

              {wizardStep === 5 && (
                <div style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '16px', marginBottom: '16px' }}>
                  <h4 style={{ color: 'var(--accent-lime)', margin: '0 0 8px 0' }}>✓ Kampanya Özeti Hazır</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                    <strong>Firma:</strong> {clients.find(c=>c.id===wizardData.clientId)?.name}<br />
                    <strong>Kampanya:</strong> {wizardData.name}<br />
                    <strong>Platform:</strong> {wizardData.platform.toUpperCase()}<br />
                    <strong>Bütçe:</strong> ₺{wizardData.dailyBudget} / gün
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {wizardStep > 1 && (
                  <button type="button" onClick={() => setWizardStep(wizardStep - 1)} className="btn-editorial btn-outline-editorial">
                    ← Geri
                  </button>
                )}
                {wizardStep < 5 ? (
                  <button type="button" onClick={() => setWizardStep(wizardStep + 1)} className="btn-editorial btn-lime" style={{ marginLeft: 'auto' }}>
                    İleri →
                  </button>
                ) : (
                  <button type="submit" className="btn-editorial btn-lime" style={{ marginLeft: 'auto' }}>
                    🚀 Kampanyayı Yayına Al
                  </button>
                )}
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

// Reusable Styles
const tabStyle = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-strong)',
  color: 'var(--text-muted)',
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
  padding: '10px 14px',
  borderRadius: '10px',
  background: '#0F172A',
  border: '1px solid #334155',
  color: '#FFFFFF',
  fontSize: '0.88rem',
  fontWeight: '700',
  outline: 'none',
  boxSizing: 'border-box'
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(12px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2000,
  padding: '20px'
};

const modalContentStyle = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-strong)',
  borderRadius: '24px',
  padding: '28px',
  boxShadow: 'var(--shadow-xl)',
  maxHeight: '90vh',
  overflowY: 'auto'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  paddingBottom: '14px',
  borderBottom: '1px solid var(--border-subtle)'
};

const closeButtonStyle = {
  background: 'rgba(239, 68, 68, 0.15)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#EF4444',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontWeight: '900',
  fontSize: '1rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease'
};
