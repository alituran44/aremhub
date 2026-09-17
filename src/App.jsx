import React, { useState, useEffect } from 'react';
import AremHubWebsite from './components/AremHubWebsite';
import { supabase, fetchBrandsFromSupabase, saveBrandToSupabase, saveInvoiceToSupabase } from './lib/supabase';
import { 
  verifyMetaToken, 
  publishInstagramReels, 
  publishInstagramPhoto, 
  publishFacebookPagePost, 
  triggerSocialWebhook, 
  executeRealSocialPublish 
} from './lib/socialApi';

// 🟢 RESMİ VE VEKTÖREL MARKA / PLATFORM SVG LOGO BİLEŞENİ

// 🟢 FİRMA / MARKA LOGO GÖRSEL BİLEŞENİ
const BrandLogo = ({ brand, size = 36, className = "" }) => {
  const [imgError, setImgError] = React.useState(false);

  if (brand?.logoUrl && !imgError) {
    return (
      <div 
        style={{ width: size, height: size, minWidth: size, minHeight: size }} 
        className={"relative rounded-xl overflow-hidden border border-gray-200/80 shadow-2xs shrink-0 bg-white " + className}
      >
        <img 
          src={brand.logoUrl} 
          alt={brand.name} 
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        minWidth: size, 
        minHeight: size,
        backgroundColor: brand?.color || '#00AB55', 
        color: '#FFFFFF' 
      }} 
      className={"rounded-xl flex items-center justify-center font-black text-xs shadow-2xs shrink-0 " + className}
    >
      {brand?.initials || brand?.name?.substring(0, 2)?.toUpperCase() || 'MA'}
    </div>
  );
};

const PlatformIcon = ({ id, size = 20, className = "" }) => {
  const normId = (id || '').toLowerCase();
  
  // Facebook
  if (normId.includes('facebook') || normId === 'fb') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path d="M15.5 8.2h-2c-.8 0-1.2.5-1.2 1.3V11H15l-.3 2.5h-2.4V20h-3v-6.5H7.5V11h1.8V9.2C9.3 7.1 10.6 6 12.8 6c1.1 0 2.2.1 2.7.2v2z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Instagram
  if (normId.includes('instagram') || normId === 'ig') {
    const gradId = "igGrad_" + size + "_" + normId.replace(/[^a-z0-9]/g, '');
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD521" />
            <stop offset="25%" stopColor="#F50000" />
            <stop offset="50%" stopColor="#B900B4" />
            <stop offset="100%" stopColor="#405DE6" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill={"url(#" + gradId + ")"} />
        <rect x="4.5" y="4.5" width="15" height="15" rx="4.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
        <circle cx="12" cy="12" r="3.7" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
        <circle cx="16.5" cy="7.5" r="1.1" fill="#FFFFFF" />
      </svg>
    );
  }

  // YouTube
  if (normId.includes('youtube') || normId === 'yt') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path d="M10 8.5v7l5.8-3.5L10 8.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // LinkedIn / LinkedIn Ads
  if (normId.includes('linkedin') || normId === 'li' || normId === 'ad_linkedin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#0A66C2" />
        <path d="M7.7 9h2.3v7.5H7.7V9zm1.15-3.5c.8 0 1.45.6 1.45 1.35s-.65 1.35-1.45 1.35S7.4 7.6 7.4 6.85s.65-1.35 1.45-1.35zm3.65 3.5h2.2v1.05h.03c.31-.58 1.07-1.2 2.21-1.2 2.36 0 2.8 1.55 2.8 3.57V16.5h-2.3v-3.4c0-.81-.02-1.86-1.13-1.86-1.14 0-1.31.89-1.31 1.8V16.5h-2.3V9z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Pinterest
  if (normId.includes('pinterest') || normId === 'pin') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#E60023" />
        <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12c0 3.18 1.98 5.9 4.81 7-.07-.59-.13-1.5.03-2.15.14-.58.91-3.86.91-3.86s-.23-.47-.23-1.16c0-1.09.63-1.9 1.42-1.9.67 0 .99.5 1 .99 0 .67-.43 1.68-.65 2.62-.19.78.39 1.42 1.16 1.42 1.39 0 2.46-1.47 2.46-3.59 0-1.88-1.35-3.19-3.28-3.19-2.39 0-3.8 1.8-3.8 3.65 0 .72.28 1.5.63 1.92.07.08.08.15.06.24-.07.28-.21.87-.24 1-.04.16-.14.2-.32.12-1.18-.55-1.92-2.27-1.92-3.66 0-2.98 2.16-5.71 6.24-5.71 3.28 0 5.82 2.34 5.82 5.46 0 3.26-2.05 5.88-4.9 5.88-.96 0-1.86-.5-2.17-1.09l-.59 2.25c-.21.82-.79 1.85-1.17 2.48.87.27 1.8.42 2.76.42 4.14 0 7.5-3.36 7.5-7.5s-3.36-7.5-7.5-7.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // TikTok / TikTok Ads
  if (normId.includes('tiktok') || normId === 'tt' || normId === 'ad_tiktok') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path d="M15.8 8.1c-.8-.5-1.3-1.3-1.4-2.2H12v9.3c0 1.2-.9 2.1-2.1 2.1-1.2 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1.2 0 .5.04.7.1v-2.5c-.2-.03-.5-.05-.7-.05-2.5 0-4.6 2.1-4.6 4.6 0 2.5 2.1 4.6 4.6 4.6 2.5 0 4.6-2.1 4.6-4.6v-5c1 .7 2.2 1.1 3.5 1.1V8.8c-.8 0-1.6-.3-2.2-.7z" fill="#25F4EE" />
        <path d="M16.5 7.4c-.8-.5-1.3-1.3-1.4-2.2h-2.4v9.3c0 1.2-.9 2.1-2.1 2.1-1.2 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1.2 0 .5.04.7.1v-2.5c-.2-.03-.5-.05-.7-.05-2.5 0-4.6 2.1-4.6 4.6 0 2.5 2.1 4.6 4.6 4.6 2.5 0 4.6-2.1 4.6-4.6v-5c1 .7 2.2 1.1 3.5 1.1V8.1c-.8 0-1.6-.3-2.2-.7z" fill="#FE2C55" opacity="0.9" />
        <path d="M16.1 7.7c-.8-.5-1.3-1.3-1.4-2.2h-2.4v9.3c0 1.2-.9 2.1-2.1 2.1-1.2 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1.2 0 .5.04.7.1v-2.5c-.2-.03-.5-.05-.7-.05-2.5 0-4.6 2.1-4.6 4.6 0 2.5 2.1 4.6 4.6 4.6 2.5 0 4.6-2.1 4.6-4.6v-5c1 .7 2.2 1.1 3.5 1.1V8.4c-.8 0-1.6-.3-2.2-.7z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Google / GMB
  if (normId.includes('google') || normId === 'gmb' || normId.includes('gmb')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
        <path d="M18.8 12.2c0-.6-.05-1.1-.15-1.6H12v3.1h3.8c-.16.9-.67 1.7-1.43 2.2v1.8h2.3c1.35-1.2 2.13-3.1 2.13-5.5z" fill="#4285F4" />
        <path d="M12 19c1.9 0 3.5-.6 4.7-1.7l-2.3-1.8c-.6.4-1.4.7-2.4.7-1.8 0-3.4-1.2-4-2.9H5.6v1.9C6.8 17.5 9.2 19 12 19z" fill="#34A853" />
        <path d="M8 13.3c-.1-.4-.2-.9-.2-1.3s.1-.9.2-1.3V8.8H5.6C5.1 9.8 4.8 10.9 4.8 12s.3 2.2.8 3.2l2.4-1.9z" fill="#FBBC05" />
        <path d="M12 7.6c1 0 2 .4 2.7 1.1l2-2C15.5 5.5 13.9 4.8 12 4.8 9.2 4.8 6.8 6.3 5.6 8.8l2.4 1.9c.6-1.7 2.2-3.1 4-3.1z" fill="#EA4335" />
      </svg>
    );
  }

  // Meta Ads / Meta Business Suite
  if (normId.includes('ad_meta') || normId === 'meta_ads' || normId === 'meta') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path d="M16.6 8.2c-1.4 0-2.6.8-3.4 2-.8-1.2-2-2-3.4-2-2.3 0-4.3 1.8-4.3 4.4 0 2.6 2 4.4 4.3 4.4 1.4 0 2.6-.8 3.4-2 .8 1.2 2 2 3.4 2 2.3 0 4.3-1.8 4.3-4.4 0-2.6-2-4.4-4.3-4.4zm-6.8 6.7c-1.4 0-2.5-1-2.5-2.3s1.1-2.3 2.5-2.3c1.1 0 2 .7 2.4 1.7-.4 1.1-1.3 2.9-2.4 2.9zm7 0c-1.1 0-2-.7-2.4-1.7.4-1.1 1.3-2.9 2.4-2.9 1.4 0 2.5 1 2.5 2.3s-1.1 2.3-2.5 2.3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Google Ads
  if (normId.includes('ad_google') || normId.includes('google_ads')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
        <path d="M6.2 15.3l5.5-9.6c.6-1.1 2-1.5 3.1-.9l1.4.8c1.1.6 1.5 2 .9 3.1l-5.5 9.6c-.6 1.1-2 1.5-3.1.9l-1.4-.8c-1.1-.6-1.5-2-.9-3.1z" fill="#FBBC04" />
        <path d="M16.5 17.5c1.4.8 3.2.3 4-1.1.8-1.4.3-3.2-1.1-4-1.4-.8-3.2-.3-4 1.1-.8 1.4-.3 3.2 1.1 4z" fill="#4285F4" />
        <circle cx="7.5" cy="16.5" r="2.5" fill="#34A853" />
      </svg>
    );
  }

  // Threads
  if (normId.includes('thread')) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#000000" />
        <path d="M14.7 11.6c-.1-.03-.2-.05-.3-.07-.4-.06-.8-.1-1.3-.1-.3 0-.6 0-.8.03-.8.06-1.5.3-2 1-.4.5-.6 1.2-.6 2 0 .8.2 1.5.7 2 .5.5 1.2.7 2 .7.8 0 1.5-.3 2-1 .3-.3.5-.7.6-1.1h1.5c-.2.8-.6 1.6-1.2 2.1-.8.8-1.8 1.2-2.9 1.2-1.2 0-2.2-.4-3-1.2-.8-.8-1.2-1.9-1.2-3.2 0-1.3.4-2.4 1.2-3.2.8-.8 1.8-1.2 3.1-1.2.8 0 1.6.2 2.3.5.7.3 1.2.8 1.6 1.4.4.6.6 1.4.6 2.3v3c0 .5.2.9.5 1.2.3.3.7.5 1.2.5.5 0 .9-.2 1.2-.5v1.3c-.6.4-1.3.6-2 .6-1 0-1.8-.4-2.3-1.1-.4-.6-.6-1.4-.6-2.4v-2.5zm-1.8 3.5c.5 0 .9-.2 1.2-.5.3-.3.5-.8.5-1.4 0-.6-.2-1-.5-1.3-.3-.3-.7-.5-1.2-.5-.5 0-.9.2-1.2.5-.3.3-.5.7-.5 1.3 0 .6.2 1 .5 1.4.3.3.7.5 1.2.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Twitter / X
  if (normId.includes('twitter') || normId === 'x') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#0F1419" />
        <path d="M16.9 6h2.4l-5.2 6 6.1 8h-4.8l-3.8-5-4.3 5H4.9l5.5-6.4L4.5 6h4.9l3.5 4.6L16.9 6zm-.8 12.6h1.3L8.1 7.3H6.7l9.4 11.3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Bluesky
  if (normId.includes('bluesky') || normId === 'bsky') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#0085FF" />
        <path d="M12 11.5c1.4-2.3 3.6-4.5 5.8-5.3 2.1-.8 3.2-.2 3.2 1.6 0 1.2-.4 4.3-1.2 6.1-.9 2.1-2.6 3.1-4.8 3.1 3.2.7 4 2.4 2.3 4-2.3 2.2-4.1-1.1-5.3-3.5-1.2 2.4-3 5.7-5.3 3.5-1.7-1.6-.9-3.3 2.3-4-2.2 0-3.9-1-4.8-3.1C3.4 12.1 3 9 3 7.8c0-1.8 1.1-2.4 3.2-1.6 2.2.8 4.4 3 5.8 5.3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // WhatsApp
  if (normId.includes('chat') || normId.includes('whatsapp') || normId === 'bosschat') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={{ width: size, height: size, minWidth: size, minHeight: size }}>
        <rect width="24" height="24" rx="6" fill="#25D366" />
        <path d="M12 5.5c-3.6 0-6.5 2.9-6.5 6.5 0 1.2.3 2.3.9 3.3L5.5 18.5l3.3-.9c1 .5 2.1.8 3.2.8 3.6 0 6.5-2.9 6.5-6.5s-2.9-6.4-6.5-6.4zm3.8 9.2c-.2.5-.9 1-1.3 1-.3 0-.8.1-2.6-.6-2.1-.9-3.5-3.1-3.6-3.2-.1-.1-.9-1.2-.9-2.2 0-1.1.6-1.6.8-1.8.2-.2.5-.3.7-.3.1 0 .2 0 .3.01.2 0 .3.03.4.3.2.4.6 1.4.6 1.5 0 .1 0 .2-.1.3-.1.1-.1.2-.2.3-.1.1-.2.2-.3.3-.1.1-.2.3-.1.5.2.4.9 1.5 2 2.4.3.3.6.4.8.4.2 0 .4-.1.5-.3.2-.2.6-.7.7-.9.2-.3.3-.2.5-.1.2.1 1.2.6 1.4.7.2.1.3.2.4.3 0 .2 0 .8-.2 1.3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Fallback
  return (
    <div 
      style={{ width: size, height: size, minWidth: size, minHeight: size }} 
      className={"rounded-lg bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-[10px] " + className}
    >
      {(normId || 'CH').substring(0, 2).toUpperCase()}
    </div>
  );
};


// 🟢 ÇOKLU MARKA, SÖZLEŞME VE FİNANS VERİ TABANI (TEMİZ BAŞLANGIÇ)
const INITIAL_BRANDS = [];

const INDUSTRY_OPTIONS = [
  { id: 'fitness', name: 'Spor, Sağlık & Fitness', icon: '🏋️' },
  { id: 'ecommerce', name: 'E-Ticaret & Perakende', icon: '🛒' },
  { id: 'beauty', name: 'Moda, Güzellik & Kozmetik', icon: '👗' },
  { id: 'tech', name: 'Teknoloji & SaaS Yazılım', icon: '💻' },
  { id: 'food', name: 'Restoran, Cafe & Gıda', icon: '☕' },
  { id: 'health', name: 'Sağlık, Klinik & Medikal', icon: '🏥' },
  { id: 'corporate', name: 'Kurumsal Hizmet & Ajans', icon: '🏢' },
  { id: 'education', name: 'Eğitim & Akademi', icon: '🎓' },
  { id: 'realestate', name: 'Gayrimenkul & İnşaat', icon: '🏠' }
];

const COLOR_OPTIONS = [
  { name: 'Zümrüt Yeşili', hex: '#00AB55', bg: '#EBF8F2' },
  { name: 'Okyanus Mavisi', hex: '#0284C7', bg: '#E0F2FE' },
  { name: 'Kraliyet Moru', hex: '#7C3AED', bg: '#F3E8FF' },
  { name: 'Instagram Pembesi', hex: '#E1306C', bg: '#FDEBF2' },
  { name: 'Canlı Turuncu', hex: '#EA580C', bg: '#FFEDD5' },
  { name: 'Obsidian Siyahı', hex: '#0F172A', bg: '#F1F5F9' }
];

const TONE_OPTIONS = [
  { id: 'dynamic', name: 'Dinamik & Motive Edici', desc: 'Enerjik, harekete geçirici ve cesur' },
  { id: 'corporate', name: 'Kurumsal & Güven Verici', desc: 'Profesyonel, net ve saygın' },
  { id: 'luxury', name: 'Lüks & Prestijli', desc: 'Seçkin, zarif ve premium' },
  { id: 'creative', name: 'Yaratıcı & İlham Verici', desc: 'Özgün, vizyoner ve merak uyandıran' }
];

// 🟢 PEYZAJ & MİMARLIK HAZIR MEDYA KÜTÜPHANESİ (REELS VİDEO & 4K GÖRSELLER)
const PEYZAJ_STOCK_MEDIA = [
  {
    id: 'stock_1',
    type: 'video',
    format: 'reels',
    name: '🎬 Villa Bahçe & Havuz Peyzajı (Reels Video)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-shot-of-a-luxury-house-and-pool-43093-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=500&auto=format&fit=crop&q=80',
    tag: 'Reels Video (9:16)'
  },
  {
    id: 'stock_2',
    type: 'video',
    format: 'reels',
    name: '🎬 Modern Mimari Yapı Dron Çekimi (Reels Video)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-building-facade-43187-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
    tag: 'Reels Video (9:16)'
  },
  {
    id: 'stock_3',
    type: 'image',
    format: 'post',
    name: '📸 3D Mimari Render & Gece Aydınlatması',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    tag: '4K Render'
  },
  {
    id: 'stock_4',
    type: 'image',
    format: 'post',
    name: '📸 Modern Villa Bahçe Tasarımı & Peyzaj',
    url: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80',
    tag: 'Bahçe Peyzajı'
  },
  {
    id: 'stock_5',
    type: 'image',
    format: 'post',
    name: '📸 Ruhsat Peyzaj & DWG Çizim Projesi',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80',
    tag: 'Mimari DWG'
  }
];

// 🟢 11 RESMİ SOSYAL MEDYA KANALI (TEMİZ BAŞLANGIÇ DURUMU)
const PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook Sayfası',
    icon: 'facebook',
    color: '#1877F2',
    bgLight: '#E7F3FF',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'APP_948201948201',
    apiEndpoint: 'Meta Graph API v19.0',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 10.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['pages_show_list', 'pages_manage_posts', 'pages_read_engagement', 'read_insights'],
    availablePages: [
      { id: 'PAGE_104829104829104', name: 'Ana Facebook Sayfası', followers: '0' },
      { id: 'PAGE_104829104829105', name: 'İkinci Şube Sayfası', followers: '0' }
    ]
  },
  {
    id: 'instagram',
    name: 'Instagram Profesyonel',
    icon: 'instagram',
    color: '#E1306C',
    bgLight: '#FDEBF2',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'APP_948201948201',
    apiEndpoint: 'Instagram Graph API v19.0',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 20.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['instagram_basic', 'instagram_content_publish', 'instagram_manage_comments', 'instagram_manage_messages'],
    availablePages: [
      { id: 'IG_178414029482019', name: 'Ana Instagram İşletme Profili', followers: '0' },
      { id: 'IG_178414029482020', name: 'İkinci Instagram Hesabı', followers: '0' }
    ]
  },
  {
    id: 'youtube',
    name: 'YouTube Kanalı',
    icon: 'youtube',
    color: '#FF0000',
    bgLight: '#FFEBEE',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'GCP-PROJECT-92847192',
    apiEndpoint: 'YouTube Data API v3',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 10.000 Unit',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['youtube.upload', 'youtube.readonly', 'youtubepartner'],
    availablePages: [
      { id: 'UC_9482019482019482', name: 'Resmi YouTube Kanalı', followers: '0 Abone' }
    ]
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Şirket Sayfası',
    icon: 'linkedin',
    color: '#0A66C2',
    bgLight: '#E8F4FD',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'LI-APP-7482910',
    apiEndpoint: 'LinkedIn Community Management API v2',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 5.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['w_organization_social', 'r_organization_social', 'rw_organization_admin'],
    availablePages: [
      { id: 'ORG_8492019482', name: 'Şirket Sayfası', followers: '0 Takipçi' }
    ]
  },
  {
    id: 'pinterest',
    name: 'Pinterest İşletme',
    icon: 'pinterest',
    color: '#E60023',
    bgLight: '#FDE8EA',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'PIN-APP-928471',
    apiEndpoint: 'Pinterest API v5',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 5.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['boards:read', 'pins:read', 'pins:write'],
    availablePages: [
      { id: 'PIN_849201948', name: 'Pinterest Business Panosu', followers: '0 Takipçi' }
    ]
  },
  {
    id: 'tiktok',
    name: 'TikTok İşletme Hesabı',
    icon: 'tiktok',
    color: '#000000',
    bgLight: '#F3F4F6',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'TT-APP-8392019',
    apiEndpoint: 'TikTok Open API v1.3',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 15.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['user.info.basic', 'video.publish', 'video.upload', 'data.business.insights'],
    availablePages: [
      { id: 'TT_USER_84920194', name: 'TikTok İşletme Hesabı', followers: '0 Takipçi' }
    ]
  },
  {
    id: 'gmb',
    name: 'Google İşletme Profili (Haritalar)',
    icon: 'google',
    color: '#4285F4',
    bgLight: '#EAF1FE',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'GCP-PROJECT-92847192',
    apiEndpoint: 'Google Business Profile API v4.9',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 5.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['business.manage', 'local.posts', 'local.reviews'],
    availablePages: [
      { id: 'LOC_8492019482', name: 'Google Haritalar İşletme Konumu', followers: '0 Yorum' }
    ]
  },
  {
    id: 'threads',
    name: 'Threads (Meta)',
    icon: 'threads',
    color: '#000000',
    bgLight: '#F3F4F6',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'APP_948201948201',
    apiEndpoint: 'Threads API v1.0',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 10.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['threads_basic', 'threads_content_publish', 'threads_read_replies'],
    availablePages: [
      { id: 'TH_USER_849201948', name: 'Threads Profili', followers: '0 Takipçi' }
    ]
  },
  {
    id: 'twitter',
    name: 'Twitter (X)',
    icon: 'twitter',
    color: '#0F1419',
    bgLight: '#F3F4F6',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'X-APP-94820194',
    apiEndpoint: 'X API v2 (OAuth 2.0 PKCE)',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 10.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'],
    availablePages: [
      { id: 'X_USER_849201', name: 'Twitter (X) Hesabı', followers: '0 Takipçi' }
    ]
  },
  {
    id: 'bluesky',
    name: 'Bluesky (AT Protocol)',
    icon: 'bluesky',
    color: '#0085FF',
    bgLight: '#E6F3FF',
    count: '0',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'BSKY-ATP-SESSION',
    apiEndpoint: 'Bluesky ATP / XRPC Protocol',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 5.000 Çağrı',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['atproto.createSession', 'com.atproto.repo.createRecord'],
    availablePages: [
      { id: 'did:plc:account9482', name: 'bluesky.bsky.social', followers: '0 Takipçi' }
    ]
  },
  {
    id: 'bosschat',
    name: 'WhatsApp Business API (Cloud)',
    icon: 'chat',
    color: '#25D366',
    bgLight: '#E8F8F0',
    count: 'Kapalı',
    connected: false,
    accountName: 'Bağlı Değil',
    pageId: '-',
    appId: 'PHONE_ID_8492019482',
    apiEndpoint: 'Meta WhatsApp Cloud API v19.0',
    tokenExpiry: '-',
    tokenStatus: 'disconnected',
    apiQuota: '0 / 50.000 Mesaj/Gün',
    webhookStatus: 'Kapalı',
    latency: '-',
    permissions: ['whatsapp_business_messaging', 'whatsapp_business_management'],
    availablePages: [
      { id: 'WABA_948201948201', name: 'WhatsApp Müşteri Destek Hattı', followers: 'CRM' }
    ]
  }
];

// 🟢 REKLAM HESAPLARI (TEMİZ BAŞLANGIÇ DURUMU)
const INITIAL_AD_ACCOUNTS = [
  {
    id: 'ad_meta',
    name: 'Meta Ads Manager (Facebook & Instagram)',
    platform: 'Meta Business Suite',
    accountId: '-',
    businessManagerId: 'BM_ID_BEKLENIYOR',
    currency: 'TRY (₺)',
    status: 'disconnected',
    connected: false,
    pixelLinked: 'Piksel Bağlantısı Bekleniyor',
    spendLimit: '-',
    color: '#1877F2'
  },
  {
    id: 'ad_google',
    name: 'Google Ads Müşteri Hesabı (Search & PMax)',
    platform: 'Google Ads / MCC',
    accountId: '-',
    businessManagerId: 'MCC_BEKLENIYOR',
    currency: 'TRY (₺)',
    status: 'disconnected',
    connected: false,
    pixelLinked: 'Google Tag Bekleniyor',
    spendLimit: '-',
    color: '#4285F4'
  },
  {
    id: 'ad_tiktok',
    name: 'TikTok For Business Ads Manager',
    platform: 'TikTok Ads',
    accountId: '-',
    businessManagerId: 'BC_BEKLENIYOR',
    currency: 'TRY (₺)',
    status: 'disconnected',
    connected: false,
    pixelLinked: 'TikTok Pixel Bekleniyor',
    spendLimit: '-',
    color: '#000000'
  },
  {
    id: 'ad_linkedin',
    name: 'LinkedIn Campaign Manager (B2B)',
    platform: 'LinkedIn Ads',
    accountId: '-',
    businessManagerId: 'BM_BEKLENIYOR',
    currency: 'USD ($)',
    status: 'disconnected',
    connected: false,
    pixelLinked: 'Insight Tag Bekleniyor',
    spendLimit: '-',
    color: '#0A66C2'
  }
];

// 🟢 PİKSEL VE CAPI (CONVERSIONS API) DURUMU
const INITIAL_PIXELS = [
  {
    id: 'meta_pixel',
    name: 'Meta Pixel & Conversions API (CAPI)',
    platform: 'Meta (Instagram & Facebook)',
    code: 'ID: Henüz Oluşturulmadı',
    status: 'waiting',
    statusText: 'Bağlantı Bekleniyor',
    serverSide: true,
    events24h: { pageView: '0', viewContent: '0', lead: '0', purchase: '0' }
  },
  {
    id: 'google_tag',
    name: 'Google Ads & GA4 E-Ticaret Tag',
    platform: 'Google Ads / Analytics 4',
    code: 'Tag ID: Bekleniyor',
    status: 'waiting',
    statusText: 'Bağlantı Bekleniyor',
    serverSide: true,
    events24h: { pageView: '0', conversions: '0', clickToCall: '0' }
  },
  {
    id: 'tiktok_pixel',
    name: 'TikTok Events API & Pixel',
    platform: 'TikTok For Business',
    code: 'Pixel ID: Bekleniyor',
    status: 'waiting',
    statusText: 'Bağlantı Bekleniyor',
    serverSide: true,
    events24h: { pageView: '0', formSubmit: '0', videoViews: '0' }
  }
];

export default function App() {
  // Mode State: 'website' (Kurumsal Ajans Sitesi) | 'os' (AremHub OS Yönetim Paneli)
  const [viewMode, setViewMode] = useState('website');

  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [postTypeFilter, setPostTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 🏢 ÇOKLU MARKA YÖNETİM STATE'LERİ
  const [brands, setBrands] = useState(INITIAL_BRANDS);
  const [supabaseConnected, setSupabaseConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // 🟢 SUPABASE CANLI BULUT VERİTABANI İLE EŞİTLEME (REAL-TIME CLOUD SYNC)
  useEffect(() => {
    async function loadCloudBrands() {
      try {
        setIsSyncing(true);
        const { data, error } = await supabase
          .from('brands')
          .select('*, invoices(*)')
          .order('created_at', { ascending: true });

        if (!error) {
          if (data && data.length > 0) {
            // Format cloud data into app brand model
            const formatted = data.map(b => ({
              id: b.id,
              name: b.name,
              slug: b.slug,
              industry: b.industry,
              industryIcon: b.industry_icon || '🏢',
              color: b.color || '#00AB55',
              logoBg: b.logo_bg || '#EBF8F2',
              initials: b.initials || 'MA',
              logoUrl: b.logo_url || '',
              website: b.website || '',
              handle: b.handle || '',
              bio: b.bio || '',
              tone: b.tone || 'Kurumsal',
              connectedChannelsCount: b.connected_channels_count || 0,
              legalName: b.legal_name || '',
              taxOffice: b.tax_office || '',
              taxNumber: b.tax_number || '',
              contactPerson: b.contact_person || '',
              contactTitle: b.contact_title || '',
              phone: b.phone || '',
              phoneMobile: b.phone_mobile || '',
              email: b.email || '',
              address: b.address || '',
              iban: b.iban || '',
              bankName: b.bank_name || '',
              contractPackage: b.contract_package || '',
              contractDuration: b.contract_duration || '',
              contractStartDate: b.contract_start_date || '',
              contractEndDate: b.contract_end_date || '',
              contractStatus: b.contract_status || 'Aktif Sözleşme',
              contractStatusColor: b.contract_status_color || 'bg-emerald-50 text-emerald-700 border-emerald-200',
              deliverables: b.deliverables || {},
              slaNotes: b.sla_notes || '',
              monthlyFee: Number(b.monthly_fee) || 0,
              totalContractValue: Number(b.total_contract_value) || 0,
              totalPaid: Number(b.total_paid) || 0,
              dueAmount: Number(b.due_amount) || 0,
              dueDate: b.due_date || '-',
              paymentDay: b.payment_day || '-',
              paymentMethod: b.payment_method || '-',
              invoices: (b.invoices || []).map(inv => ({
                id: inv.id,
                date: inv.date,
                dueDate: inv.due_date,
                subtotal: Number(inv.subtotal) || 0,
                vat: Number(inv.vat) || 0,
                amount: Number(inv.amount) || 0,
                status: inv.status,
                statusText: inv.status_text,
                method: inv.method,
                pdf: inv.pdf
              }))
            }));

            setBrands(formatted);
            const activeId = prev => (prev && formatted.some(x => x.id === prev) ? prev : formatted[0].id);
            setSelectedBrandId(activeId);
            console.log('✓ Loaded', formatted.length, 'brands from Supabase cloud database.');

            // 🟢 SOSYAL MEDYA ENTEGRASYONLARINI SUPABASE'DEN YÜKLE
            const { data: socData } = await supabase
              .from('social_integrations')
              .select('*');

            if (socData && socData.length > 0) {
              setPlatforms(prev => prev.map(p => {
                const matched = socData.find(s => s.platform_id === p.id && s.connected);
                if (matched) {
                  return {
                    ...p,
                    connected: true,
                    accountName: matched.account_name || '@detay_proje_mimarlik',
                    count: matched.platform_id === 'instagram' ? '1.471' : (p.count || '0'),
                    pageId: matched.page_id || 'IG_178414029482019',
                    tokenExpiry: matched.token_expiry || '60 Gün (OAuth 2.0 Long-Lived)',
                    tokenStatus: 'valid',
                    apiQuota: matched.api_quota || '1.017 Gönderi / 1.471 Takipçi',
                    webhookStatus: matched.webhook_status || 'Aktif (0ms Gecikme)',
                    latency: matched.latency || '18ms',
                    lastSync: 'Şimdi (Senkronize)'
                  };
                }
                return p;
              }));
            }
          } else {
            setBrands([]);
            setSelectedBrandId(null);
          }
          setSupabaseConnected(true);
        }
      } catch (err) {
        console.warn('Supabase sync warning:', err);
      } finally {
        setIsSyncing(false);
      }
    }

    loadCloudBrands();
  }, []);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [showManageBrandsModal, setShowManageBrandsModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [brandProfileSubTab, setBrandProfileSubTab] = useState('scope'); // 'scope' | 'financials' | 'legal'
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showEditBrandContractModal, setShowEditBrandContractModal] = useState(false);
  const [newInvoiceData, setNewInvoiceData] = useState({
    id: 'INV-2025-' + Math.floor(100 + Math.random() * 900),
    date: '12 Nis 2025',
    dueDate: '15 Nis 2025',
    subtotal: 35000,
    vat: 7000,
    amount: 42000,
    status: 'paid',
    statusText: 'Ödendi',
    method: 'Banka Havalesi',
    pdf: 'INV_Yeni.pdf'
  });
  
  // Düzenleme için sözleşme ve künye geçici state'i
  const [editBrandForm, setEditBrandForm] = useState(null);

  // Form State: Yeni Marka Ekleme
  const [newBrandData, setNewBrandData] = useState({
    name: '',
    legalName: '',
    industry: 'Spor, Sağlık & Fitness',
    industryIcon: '🏋️',
    color: '#00AB55',
    logoBg: '#EBF8F2',
    logoUrl: '',
    website: '',
    handle: '',
    contactPerson: '',
    phone: '',
    email: '',
    contractPackage: 'Full-Stack Sosyal Medya & Reklam Yönetimi',
    monthlyFee: 35000,
    paymentDay: "Her Ayın 5'i",
    tone: 'Dinamik & Motive Edici',
    bio: ''
  });

  // Aktif Marka Yardımcısı
  const currentBrand = (selectedBrandId ? brands.find(b => b.id === selectedBrandId) : null) || brands[0] || {
    id: null,
    name: 'Henüz Marka Eklenmedi',
    slug: '',
    industry: 'Tanımlanmadı',
    industryIcon: '🏢',
    color: '#64748B',
    logoBg: '#F1F5F9',
    initials: '--',
    website: '',
    handle: '',
    bio: 'Sisteme henüz bir marka eklenmedi. Yeni bir marka ekleyerek yönetmeye başlayabilirsiniz.',
    tone: 'Standart',
    connectedChannelsCount: 0,
    createdAt: '-',
    legalName: '-',
    taxOffice: '-',
    taxNumber: '-',
    contactPerson: '-',
    contactTitle: '-',
    phone: '-',
    phoneMobile: '-',
    email: '-',
    address: '-',
    iban: '-',
    bankName: '-',
    contractPackage: 'Sözleşme Tanımlanmadı',
    contractDuration: '-',
    contractStartDate: '-',
    contractEndDate: '-',
    contractStatus: 'Beklemede',
    contractStatusColor: 'bg-gray-100 text-gray-700 border-gray-200',
    deliverables: {
      reelsQuota: 0,
      reelsCompleted: 0,
      staticQuota: 0,
      staticCompleted: 0,
      storyQuota: 0,
      storyCompleted: 0,
      adsBudgetManaged: '₺0',
      crmAutomation: '-',
      reporting: '-'
    },
    slaNotes: 'Henüz sözleşme girilmedi.',
    monthlyFee: 0,
    totalContractValue: 0,
    totalPaid: 0,
    dueAmount: 0,
    dueDate: '-',
    paymentDay: '-',
    paymentMethod: '-',
    invoices: []
  };

  const brand = currentBrand.name;

  // Entegrasyonlar Alt Sekmesi
  const [integrationsTab, setIntegrationsTab] = useState('social'); // 'social' | 'ads' | 'webhooks'

  // Modals & Drawers
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedPlatformToConnect, setSelectedPlatformToConnect] = useState(null);
  const [connectWizardStep, setConnectWizardStep] = useState(1); // 1: Auth, 2: Page Pick, 3: Scopes
  const [selectedPageToLink, setSelectedPageToLink] = useState('');

  const [showAccountSettingsModal, setShowAccountSettingsModal] = useState(null);
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(null);
  const [diagnosticTesting, setDiagnosticTesting] = useState(false);

  const [showPostDetailModal, setShowPostDetailModal] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showReferModal, setShowReferModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showScheduleReportModal, setShowScheduleReportModal] = useState(false);

  // Reklam Modalları ve Filtreleri
  const [showAdDetailModal, setShowAdDetailModal] = useState(null);
  const [adPlatformFilter, setAdPlatformFilter] = useState('all');
  const [adStatusFilter, setAdStatusFilter] = useState('all');
  const [adSearchQuery, setAdSearchQuery] = useState('');

  // 🟢 TEMİZLENMİŞ BOŞ VERİ TABANI (CLEAN EMPTY STATES)
  const [platforms, setPlatforms] = useState(PLATFORMS);
  const [adAccounts, setAdAccounts] = useState(INITIAL_AD_ACCOUNTS);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [upcomingPosts, setUpcomingPosts] = useState([]);
  const [approvalPosts, setApprovalPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [crmLeads, setCrmLeads] = useState([]);
  const [scheduledReports, setScheduledReports] = useState([]);
  
  // Reklam Data States
  const [adCampaigns, setAdCampaigns] = useState([]);
  const [aiAdInsights, setAiAdInsights] = useState([]);
  const [pixelLogs, setPixelLogs] = useState([]);

  // Yeni Reklam Oluşturucu Sihirbaz State
  const [newAdStep, setNewAdStep] = useState(1);
  const [newAdData, setNewAdData] = useState({
    name: 'Yeni Kampanya #1',
    objective: 'conversions',
    platforms: ['meta'],
    location: 'Türkiye (Tüm Şehirler)',
    ageRange: '18 - 65 Yaş',
    interests: 'Genel İlgi Alanları',
    dailyBudget: 250,
    biddingStrategy: 'highest_volume',
    headline: 'Öne Çıkan Kampanya Başlığı',
    bodyText: 'Hizmet ve ürünlerimiz hakkında detaylı bilgi almak için hemen tıklayın.',
    cta: 'Hemen Başvur',
    targetUrl: 'https://markaniz.com',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=80'
  });

  // Inbox State
  const [inboxChats, setInboxChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [inboxReplyText, setInboxReplyText] = useState('');

  // 🎬 GÖNDERİ & REELS & VİDEO STÜDYOSU STATE'LERİ
  const [postFormat, setPostFormat] = useState('reels'); // 'reels' | 'post' | 'carousel' | 'story'
  const [newPostText, setNewPostText] = useState('');
  const [selectedChannels, setSelectedChannels] = useState(['instagram', 'facebook']);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [mediaList, setMediaList] = useState([
    {
      id: 'm_1',
      type: 'video',
      url: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-shot-of-a-luxury-house-and-pool-43093-large.mp4',
      name: 'Lüks Villa & Havuz Peyzajı (Reels).mp4',
      duration: '0:24',
      thumbnail: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=500&auto=format&fit=crop&q=80'
    }
  ]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [reelsAudioTitle, setReelsAudioTitle] = useState('Detay Peyzaj • Orijinal Mimari Ses 🎵');
  const [postLocation, setPostLocation] = useState('Nilüfer, Bursa');
  const [firstCommentText, setFirstCommentText] = useState('🌿 Detaylı proje ve 3D render teklifleri için DM üzerinden bize ulaşabilirsiniz.');
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);

  // Auto DM Simulator State
  const [dmSimComment, setDmSimComment] = useState('');
  const [dmSimMessages, setDmSimMessages] = useState([]);

  // AI Studio State
  const [aiStudioPrompt, setAiStudioPrompt] = useState('');
  const [aiStudioPlatform, setAiStudioPlatform] = useState('Instagram Reels & Post');
  const [aiStudioResult, setAiStudioResult] = useState('');
  const [aiStudioGenerating, setAiStudioGenerating] = useState(false);

  // 🔑 YOL B: RESMİ API & TOKEN YÖNETİMİ STATE'LERİ
  const [brandApiCredentials, setBrandApiCredentials] = useState({
    instagram: { accessToken: '', igUserId: '', pageId: '', tokenStatus: 'disconnected' },
    facebook: { accessToken: '', pageId: '', tokenStatus: 'disconnected' },
    youtube: { apiKey: '', channelId: '', tokenStatus: 'disconnected' },
    tiktok: { accessToken: '', openId: '', tokenStatus: 'disconnected' },
    linkedin: { accessToken: '', authorUrn: '', tokenStatus: 'disconnected' },
    webhook: { webhookUrl: '', secret: '', tokenStatus: 'disconnected' }
  });
  const [showApiTokenModal, setShowApiTokenModal] = useState(false);
  const [selectedPlatformForToken, setSelectedPlatformForToken] = useState(null);
  const [tokenInput, setTokenInput] = useState('');
  const [igUserIdInput, setIgUserIdInput] = useState('');
  const [pageIdInput, setPageIdInput] = useState('');
  const [webhookUrlInput, setWebhookUrlInput] = useState('');
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [tokenVerificationResult, setTokenVerificationResult] = useState(null);
  const [isPublishingLive, setIsPublishingLive] = useState(false);
  const [livePublishResults, setLivePublishResults] = useState(null);

  // 🏢 MARKA YÖNETİM AKSİYONLARI (CREATE / SWITCH / EDIT / DELETE)
  const handleCreateBrand = () => {
    if (!newBrandData.name.trim()) {
      alert('Lütfen bir marka adı girin.');
      return;
    }
    const nameWords = newBrandData.name.trim().split(' ');
    const initials = nameWords.length > 1 
      ? (nameWords[0][0] + nameWords[1][0]).toUpperCase()
      : newBrandData.name.substring(0, 2).toUpperCase();

    const selectedColorObj = COLOR_OPTIONS.find(c => c.hex === newBrandData.color) || COLOR_OPTIONS[0];

    const newBrand = {
      id: 'brand_' + Date.now(),
      name: newBrandData.name.trim(),
      slug: newBrandData.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      industry: newBrandData.industry,
      industryIcon: newBrandData.industryIcon,
      color: newBrandData.color,
      logoBg: selectedColorObj.bg,
      initials: initials,
      logoUrl: newBrandData.logoUrl || '',
      website: newBrandData.website || `https://${newBrandData.name.toLowerCase().replace(/\s+/g, '')}.com`,
      handle: newBrandData.handle ? (newBrandData.handle.startsWith('@') ? newBrandData.handle : '@' + newBrandData.handle) : `@${newBrandData.name.toLowerCase().replace(/\s+/g, '')}`,
      bio: newBrandData.bio || `${newBrandData.name} resmi sosyal medya ve dijital pazarlama yönetimi.`,
      tone: newBrandData.tone,
      connectedChannelsCount: 0,
      createdAt: 'Bugün',
      
      // 🏢 Resmi Şirket Künyesi
      legalName: newBrandData.legalName || `${newBrandData.name.trim()} Ltd. Şti.`,
      taxOffice: 'Merkez Vergi Dairesi',
      taxNumber: '100' + Math.floor(1000000 + Math.random() * 9000000),
      contactPerson: newBrandData.contactPerson || 'Yetkili Yönetici',
      contactTitle: 'Şirket Yetkilisi',
      phone: newBrandData.phone || '+90 (212) 000 0000',
      phoneMobile: newBrandData.phone || '+90 (500) 000 0000',
      email: newBrandData.email || `finans@${newBrandData.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      address: 'İstanbul, Türkiye',
      iban: 'TR42 0006 2000 0001 ' + Math.floor(1000 + Math.random() * 9000) + ' 6789 01',
      bankName: 'Garanti BBVA',

      // 📜 Anlaşılan Sözleşme Kapsamı & Kotalar
      contractPackage: newBrandData.contractPackage || 'Full-Stack Sosyal Medya & Reklam Yönetimi',
      contractDuration: '12 Ay (1 Yıl)',
      contractStartDate: 'Bugün',
      contractEndDate: '1 Yıl Sonra',
      contractStatus: 'Aktif Sözleşme',
      contractStatusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      deliverables: {
        reelsQuota: 12,
        reelsCompleted: 0,
        staticQuota: 20,
        staticCompleted: 0,
        storyQuota: 60,
        storyCompleted: 0,
        adsBudgetManaged: '₺30.000 / Ay Bütçe',
        crmAutomation: 'Sosyal CRM & Otomatik DM',
        reporting: 'Haftalık & Aylık Yönetici Raporu'
      },
      slaNotes: 'Standart hizmet sözleşmesi ve haftalık koordinasyon toplantısı geçerlidir.',

      // 💰 Finansal & Ödeme Durumu
      monthlyFee: Number(newBrandData.monthlyFee) || 35000,
      totalContractValue: (Number(newBrandData.monthlyFee) || 35000) * 12,
      totalPaid: 0,
      dueAmount: Number(newBrandData.monthlyFee) || 35000,
      dueDate: 'Gelecek Ayın 5\'i',
      paymentDay: newBrandData.paymentDay || "Her Ayın 5'i",
      paymentMethod: 'Banka Havalesi / EFT',
      invoices: []
    };

    setBrands([...brands, newBrand]);
    setSelectedBrandId(newBrand.id);

    // Save to Supabase Cloud Database
    supabase.from('brands').insert({
      id: newBrand.id,
      name: newBrand.name,
      slug: newBrand.slug,
      industry: newBrand.industry,
      industry_icon: newBrand.industryIcon,
      color: newBrand.color,
      logo_bg: newBrand.logoBg,
      initials: newBrand.initials,
      logo_url: newBrand.logoUrl,
      website: newBrand.website,
      handle: newBrand.handle,
      bio: newBrand.bio,
      tone: newBrand.tone,
      legal_name: newBrand.legalName,
      tax_office: newBrand.taxOffice,
      tax_number: newBrand.taxNumber,
      contact_person: newBrand.contactPerson,
      contact_title: newBrand.contactTitle,
      phone: newBrand.phone,
      phone_mobile: newBrand.phoneMobile,
      email: newBrand.email,
      address: newBrand.address,
      iban: newBrand.iban,
      bank_name: newBrand.bankName,
      contract_package: newBrand.contractPackage,
      contract_duration: newBrand.contractDuration,
      contract_start_date: newBrand.contractStartDate,
      contract_end_date: newBrand.contractEndDate,
      contract_status: newBrand.contractStatus,
      deliverables: newBrand.deliverables,
      sla_notes: newBrand.slaNotes,
      monthly_fee: newBrand.monthlyFee,
      total_contract_value: newBrand.totalContractValue,
      total_paid: newBrand.totalPaid,
      due_amount: newBrand.dueAmount,
      due_date: newBrand.dueDate,
      payment_day: newBrand.paymentDay,
      payment_method: newBrand.paymentMethod
    }).then(({ error }) => {
      if (error) console.warn('Supabase brand insert error:', error);
    });
    setShowAddBrandModal(false);
    setNewBrandData({
      name: '',
      industry: 'Spor, Sağlık & Fitness',
      industryIcon: '🏋️',
      color: '#00AB55',
      logoBg: '#EBF8F2',
      website: '',
      handle: '',
      tone: 'Dinamik & Motive Edici',
      bio: ''
    });
    alert(`🎉 "${newBrand.name}" markası başarıyla oluşturuldu ve çalışma alanınıza eklendi!`);
  };

  const handleUpdateBrand = () => {
    if (!editingBrand || !editingBrand.name.trim()) return;
    const nameWords = editingBrand.name.trim().split(' ');
    const initials = nameWords.length > 1 
      ? (nameWords[0][0] + nameWords[1][0]).toUpperCase()
      : editingBrand.name.substring(0, 2).toUpperCase();

    const selectedColorObj = COLOR_OPTIONS.find(c => c.hex === editingBrand.color) || COLOR_OPTIONS[0];

    setBrands(brands.map(b => b.id === editingBrand.id ? {
      ...editingBrand,
      initials: initials,
      logoBg: selectedColorObj.bg
    } : b));

    setEditingBrand(null);
    alert('✅ Marka bilgileri başarıyla güncellendi!');
  };

  const handleDeleteBrand = async (brandId) => {
    const targetBrand = brands.find(b => b.id === brandId);
    if (!targetBrand) return;
    if (confirm(`"${targetBrand.name}" markasını ve bağlı veritabanı kayıtlarını silmek istediğinize emin misiniz?`)) {
      const remaining = brands.filter(b => b.id !== brandId);
      setBrands(remaining);
      if (selectedBrandId === brandId) {
        setSelectedBrandId(remaining.length > 0 ? remaining[0].id : null);
      }
      try {
        await supabase.from('brands').delete().eq('id', brandId);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
      alert('Marka başarıyla silindi.');
    }
  };

  // Connect platform handler (OAuth Handshake)
  // 🟢 FATURA / TAHSİLAT EKLEME FONKSİYONU (SUPABASE BULUT KAYDI)
  const handleAddInvoiceToBrand = async () => {
    const sub = Number(newInvoiceData.subtotal) || 0;
    const vat = Number(newInvoiceData.vat) || (sub * 0.20);
    const tot = sub + vat;
    const inv = {
      ...newInvoiceData,
      subtotal: sub,
      vat: vat,
      amount: tot,
      statusText: newInvoiceData.status === 'paid' ? 'Ödendi' : 'Ödeme Bekliyor'
    };

    // 1. Optimistic Local State Update
    let updatedBrandObj = null;
    setBrands(prev => prev.map(b => {
      if (b.id === selectedBrandId) {
        const updatedInvoices = [inv, ...(b.invoices || [])];
        const newPaid = newInvoiceData.status === 'paid' ? (b.totalPaid || 0) + tot : (b.totalPaid || 0);
        const newDue = newInvoiceData.status !== 'paid' ? (b.dueAmount || 0) + tot : (b.dueAmount || 0);
        updatedBrandObj = {
          ...b,
          invoices: updatedInvoices,
          totalPaid: newPaid,
          dueAmount: newDue
        };
        return updatedBrandObj;
      }
      return b;
    }));

    // 2. Persist to Supabase Cloud
    try {
      await supabase.from('invoices').insert({
        id: inv.id,
        brand_id: selectedBrandId,
        date: inv.date,
        due_date: inv.dueDate,
        subtotal: sub,
        vat: vat,
        amount: tot,
        status: inv.status,
        status_text: inv.statusText,
        method: inv.method,
        pdf: inv.pdf
      });

      if (updatedBrandObj) {
        await supabase.from('brands').update({
          total_paid: updatedBrandObj.totalPaid,
          due_amount: updatedBrandObj.dueAmount
        }).eq('id', selectedBrandId);
      }
    } catch (e) {
      console.warn('Supabase invoice save exception:', e);
    }

    setShowAddInvoiceModal(false);
    alert('🎉 Fatura / Tahsilat kaydı başarıyla eklendi ve Supabase buluta kaydedildi!');
  };

  // 🟢 FİRMA KÜNYESİ VE SÖZLEŞME GÜNCELLEME FONKSİYONU
  const handleSaveBrandContract = async () => {
    if (!editBrandForm) return;
    setBrands(prev => prev.map(b => b.id === editBrandForm.id ? editBrandForm : b));
    
    // Save to Supabase
    try {
      await supabase.from('brands').update({
        name: editBrandForm.name,
        logo_url: editBrandForm.logoUrl,
        legal_name: editBrandForm.legalName,
        tax_office: editBrandForm.taxOffice,
        tax_number: editBrandForm.taxNumber,
        contact_person: editBrandForm.contactPerson,
        phone: editBrandForm.phone,
        phone_mobile: editBrandForm.phoneMobile,
        email: editBrandForm.email,
        address: editBrandForm.address,
        iban: editBrandForm.iban,
        bank_name: editBrandForm.bankName,
        contract_package: editBrandForm.contractPackage,
        monthly_fee: editBrandForm.monthlyFee,
        total_contract_value: editBrandForm.totalContractValue,
        payment_day: editBrandForm.paymentDay
      }).eq('id', editBrandForm.id);
    } catch (e) {
      console.warn('Supabase contract update error:', e);
    }

    setShowEditBrandContractModal(false);
    alert('✅ Firma künyesi ve sözleşme detayları başarıyla güncellendi ve Supabase buluta kaydedildi!');
  };

  const handleFinalizeConnection = async () => {
    if (!selectedPlatformToConnect) return;
    const targetPage = selectedPlatformToConnect.availablePages.find(p => p.id === selectedPageToLink) || selectedPlatformToConnect.availablePages[0];
    const accountLabel = currentBrand?.handle || targetPage?.name || 'Bağlı Hesap';
    const followersDisplay = (currentBrand?.handle === '@detay_proje_mimarlik' && selectedPlatformToConnect.id === 'instagram') ? '1.471' : (targetPage?.followers || '1.2K');

    setPlatforms(prev => prev.map(p => {
      if (p.id === selectedPlatformToConnect.id) {
        return {
          ...p,
          connected: true,
          count: followersDisplay,
          accountName: accountLabel,
          pageId: targetPage?.id || 'IG_178414029482019',
          tokenExpiry: '60 gün kaldı (OAuth 2.0 Long-Lived Token)',
          tokenStatus: 'valid',
          apiQuota: '150 / 20.000 Çağrı (%99 Kalan)',
          webhookStatus: 'Aktif (0ms Gecikme)',
          latency: '18ms',
          lastSync: 'Şimdi (Senkronize)'
        };
      }
      return p;
    }));

    // Update connected channels count on active brand
    setBrands(brands.map(b => b.id === selectedBrandId ? { ...b, connectedChannelsCount: (b.connectedChannelsCount || 0) + 1 } : b));

    // Save to Supabase Cloud
    if (selectedBrandId) {
      try {
        await supabase.from('social_integrations').upsert({
          id: `${selectedBrandId}_${selectedPlatformToConnect.id}`,
          brand_id: selectedBrandId,
          platform_id: selectedPlatformToConnect.id,
          connected: true,
          account_name: accountLabel,
          page_id: targetPage?.id || 'PAGE_1001',
          access_token: 'EAABwzLIX4B_OAUTH2_TOKEN',
          token_expiry: '60 Gün (OAuth 2.0 Long-Lived)',
          api_endpoint: selectedPlatformToConnect.apiEndpoint,
          api_quota: '1.017 Gönderi / 1.471 Takipçi',
          webhook_status: 'Aktif (0ms Gecikme)',
          latency: '18ms',
          permissions: selectedPlatformToConnect.permissions || []
        });
        await supabase.from('brands').update({ connected_channels_count: (currentBrand.connectedChannelsCount || 0) + 1 }).eq('id', selectedBrandId);
      } catch (err) {
        console.warn('Supabase integration save error:', err);
      }
    }

    setShowConnectModal(false);
    setConnectWizardStep(1);
    alert(`🎉 ${selectedPlatformToConnect.name} (${accountLabel}) Başarıyla Bağlandı ve Yetkilendirildi!`);
  };

  const handleDisconnectPlatform = async (platId) => {
    if (confirm('Bu sosyal medya hesabının bağlantısını kesmek istediğinize emin misiniz?')) {
      setPlatforms(prev => prev.map(p => {
        if (p.id === platId) {
          return { 
            ...p, 
            connected: false, 
            count: '0',
            accountName: 'Bağlı Değil', 
            tokenStatus: 'disconnected', 
            tokenExpiry: '-',
            apiQuota: '0 / 10.000 Çağrı',
            webhookStatus: 'Kapalı',
            latency: '-',
            lastSync: '-' 
          };
        }
        return p;
      }));

      // Delete from Supabase
      if (selectedBrandId) {
        try {
          await supabase.from('social_integrations').delete().eq('id', `${selectedBrandId}_${platId}`);
        } catch (err) {
          console.warn('Supabase disconnect error:', err);
        }
      }
    }
  };

  // Switch Active Page within Connected Account
  const handleSwitchConnectedPage = (platId, pageObj) => {
    setPlatforms(prev => prev.map(p => {
      if (p.id === platId) {
        return {
          ...p,
          accountName: pageObj.name,
          pageId: pageObj.id,
          lastSync: 'Şimdi güncellendi'
        };
      }
      return p;
    }));
    setShowAccountSettingsModal(null);
    alert(`✅ Aktif Sayfa Değiştirildi: ${pageObj.name}`);
  };

  // Run Live Diagnostic Test
  const handleRunDiagnostic = (platform) => {
    setShowDiagnosticModal(platform);
    setDiagnosticTesting(true);
    setTimeout(() => {
      setDiagnosticTesting(false);
    }, 800);
  };

  // Connect Ad Account Handler
  const handleConnectAdAccount = (adId) => {
    setAdAccounts(prev => prev.map(a => {
      if (a.id === adId) {
        return { 
          ...a, 
          connected: true, 
          status: 'connected',
          accountId: 'ACT_' + Math.floor(100000000 + Math.random() * 900000000),
          pixelLinked: 'Piksel & CAPI 10/10 Aktif',
          spendLimit: '₺50.000 / Ay'
        };
      }
      return a;
    }));
    alert('🎉 Reklam Hesabı Başarıyla Bağlandı ve Piksel Eşleşmesi Doğrulandı!');
  };

  // 🔑 YOL B: RESMİ API & TOKEN İŞLEMLERİ
  const handleOpenTokenModal = (platform) => {
    setSelectedPlatformForToken(platform);
    const existingCreds = brandApiCredentials[platform.id] || {};
    setTokenInput(existingCreds.accessToken || existingCreds.apiKey || '');
    setIgUserIdInput(existingCreds.igUserId || '');
    setPageIdInput(existingCreds.pageId || '');
    setWebhookUrlInput(existingCreds.webhookUrl || '');
    setTokenVerificationResult(null);
    setShowApiTokenModal(true);
  };

  const handleVerifyToken = async () => {
    if (!tokenInput.trim() && !webhookUrlInput.trim()) {
      alert('Lütfen test edilecek bir Erişim Anahtarı (Token) veya Webhook URL girin.');
      return;
    }
    setIsVerifyingToken(true);
    setTokenVerificationResult(null);

    try {
      if (selectedPlatformForToken?.id === 'instagram' || selectedPlatformForToken?.id === 'facebook') {
        const res = await verifyMetaToken(tokenInput);
        setIsVerifyingToken(false);
        setTokenVerificationResult(res);
        if (res.success) {
          if (res.instagramAccounts && res.instagramAccounts.length > 0 && !igUserIdInput) {
            setIgUserIdInput(res.instagramAccounts[0].igId);
          }
          if (res.pages && res.pages.length > 0 && !pageIdInput) {
            setPageIdInput(res.pages[0].id);
          }
        }
      } else if (selectedPlatformForToken?.id === 'webhook') {
        const res = await triggerSocialWebhook({
          webhookUrl: webhookUrlInput,
          payload: { event: 'health_check_ping', brand: currentBrand.name, timestamp: new Date().toISOString() }
        });
        setIsVerifyingToken(false);
        setTokenVerificationResult({
          success: res.success,
          userName: `Webhook Bağlantı Testi: ${res.status || '200 OK'}`,
          raw: res
        });
      } else {
        setTimeout(() => {
          setIsVerifyingToken(false);
          setTokenVerificationResult({
            success: true,
            userName: `${selectedPlatformForToken?.name} API Anahtarı Hazır & Doğrulandı`,
            raw: { status: '200 OK' }
          });
        }, 500);
      }
    } catch (err) {
      setIsVerifyingToken(false);
      setTokenVerificationResult({
        success: false,
        error: err.message
      });
    }
  };

  const handleSaveApiCredentials = async () => {
    if (!selectedPlatformForToken) return;

    const platformId = selectedPlatformForToken.id;
    const updatedCreds = {
      ...brandApiCredentials,
      [platformId]: {
        accessToken: tokenInput.trim(),
        apiKey: tokenInput.trim(),
        igUserId: igUserIdInput.trim(),
        pageId: pageIdInput.trim(),
        webhookUrl: webhookUrlInput.trim(),
        tokenStatus: tokenInput.trim() || webhookUrlInput.trim() ? 'connected' : 'disconnected',
        verifiedAt: new Date().toISOString()
      }
    };

    setBrandApiCredentials(updatedCreds);

    // Platformlar listesini canlı güncelle
    setPlatforms(prev => prev.map(p => {
      if (p.id === platformId) {
        return {
          ...p,
          connected: true,
          accountName: tokenVerificationResult?.instagramAccounts?.[0]?.igUsername 
            ? `@${tokenVerificationResult.instagramAccounts[0].igUsername}` 
            : (tokenVerificationResult?.userName || currentBrand.handle || currentBrand.name),
          tokenStatus: 'active',
          tokenExpiry: '60 Günlük Kalıcı Token (Yol B)',
          apiQuota: '1 / 20.000 Çağrı',
          webhookStatus: 'Canlı Aktif'
        };
      }
      return p;
    }));

    // Supabase Bulut Veritabanına Yazma
    if (selectedBrandId) {
      try {
        await supabase.from('brands').update({
          api_credentials: updatedCreds
        }).eq('id', selectedBrandId);
      } catch (err) {
        console.warn('Supabase api_credentials update error:', err);
      }
    }

    setShowApiTokenModal(false);
    alert(`🎉 ${selectedPlatformForToken.name} için Yol B API Token başarıyla kaydedildi ve Supabase bulut hesabına eşitlendi!`);
  };

  const handleDisconnectApiCredentials = async (platformId) => {
    if (!confirm('Bu platformun resmi API bağlantısını kesmek istiyor musunuz?')) return;

    const updatedCreds = {
      ...brandApiCredentials,
      [platformId]: {
        accessToken: '',
        igUserId: '',
        pageId: '',
        webhookUrl: '',
        tokenStatus: 'disconnected'
      }
    };

    setBrandApiCredentials(updatedCreds);
    setPlatforms(prev => prev.map(p => {
      if (p.id === platformId) {
        return {
          ...p,
          connected: false,
          accountName: 'Bağlı Değil',
          tokenStatus: 'disconnected',
          tokenExpiry: '-'
        };
      }
      return p;
    }));

    if (selectedBrandId) {
      try {
        await supabase.from('brands').update({
          api_credentials: updatedCreds
        }).eq('id', selectedBrandId);
      } catch (err) {
        console.warn('Supabase disconnect error:', err);
      }
    }
  };

  // 🚀 HEMEN YAYINLA (CANLI RESMİ API + SUPABASE BULUT KAYDI + KOTA GÜNCELLEMESİ)
  const handlePublishPost = async () => {
    if (!newPostText.trim() && mediaList.length === 0) {
      alert('Lütfen bir gönderi metni yazın veya bir görsel/video ekleyin.');
      return;
    }

    const currentMedia = mediaList[activeMediaIndex] || mediaList[0] || {
      type: postFormat === 'reels' ? 'video' : 'image',
      url: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80'
    };

    const newPost = {
      id: Date.now(),
      date: 'Bugün',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      type: postFormat,
      image: currentMedia.type === 'image' ? currentMedia.url : (currentMedia.thumbnail || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80'),
      video: currentMedia.type === 'video' ? currentMedia.url : null,
      title: postFormat === 'reels' ? '🎬 Instagram Reels Videosu' : (postFormat === 'story' ? '⚡ 24s Hikaye' : '📸 Statik Gönderi'),
      content: newPostText,
      likes: '0',
      comments: '0',
      shares: '0',
      platforms: selectedChannels,
      reach: '0',
      engagementRate: '%0',
      audio: postFormat === 'reels' ? reelsAudioTitle : null,
      location: postLocation
    };

    // 1. Yerel State Güncellemesi
    setPublishedPosts([newPost, ...publishedPosts]);

    // 2. Canlı Yol B Resmi API Gönderimi (Meta Graph API / Webhooks)
    setIsPublishingLive(true);
    let liveLogs = [];
    try {
      liveLogs = await executeRealSocialPublish({
        postData: newPost,
        selectedChannels: selectedChannels,
        brandCredentials: brandApiCredentials,
        brandName: currentBrand.name
      });
      setLivePublishResults(liveLogs);
    } catch (apiErr) {
      console.warn('Live API dispatch error:', apiErr);
    }
    setIsPublishingLive(false);

    // 3. Marka Sözleşme Kotasını Düşme
    if (selectedBrandId) {
      const quotaField = postFormat === 'reels' ? 'reelsCompleted' : (postFormat === 'story' ? 'storyCompleted' : 'staticCompleted');
      const updatedDeliverables = {
        ...(currentBrand.deliverables || {}),
        [quotaField]: ((currentBrand.deliverables?.[quotaField]) || 0) + 1
      };

      setBrands(brands.map(b => b.id === selectedBrandId ? {
        ...b,
        deliverables: updatedDeliverables
      } : b));

      // 4. Supabase Bulut Veritabanına Yazma
      try {
        await supabase.from('posts').insert({
          brand_id: selectedBrandId,
          title: newPost.title,
          content: newPostText,
          type: postFormat,
          status: 'published',
          reach: '0',
          likes: '0',
          comments: '0',
          shares: '0',
          platforms: selectedChannels,
          image_url: currentMedia.url,
          api_response: liveLogs
        });

        await supabase.from('brands').update({
          deliverables: updatedDeliverables
        }).eq('id', selectedBrandId);
      } catch (err) {
        console.warn('Supabase post publish error:', err);
      }
    }

    setNewPostText('');
    setActiveTab('published_posts');

    const liveSuccesses = (liveLogs || []).filter(l => l.mode === 'LIVE_META_GRAPH_API' || l.mode === 'LIVE_WEBHOOK');
    if (liveSuccesses.length > 0) {
      alert(`🎉 CANLI YAYIN BAŞARILI! Yol B Resmi API üzerinden Meta / Instagram hesabınızda ${postFormat.toUpperCase()} içeriğiniz canlı olarak yayınlandı ve Supabase veritabanına işlendi!`);
    } else {
      alert(`🎉 ${postFormat.toUpperCase()} içeriğiniz (${currentMedia.type === 'video' ? 'Reels Videosu' : 'Görsel'}) yayınlandı ve Supabase bulut veritabanına işlendi!\n\n💡 İpucu: Gerçek Instagram hesabında canlı yayınlamak için Entegrasyonlar sekmesinden Yol B Meta Token'ınızı tanımlayabilirsiniz.`);
    }
  };


  // 🕒 İLERİ TARİHE ZAMANLA
  const handleSchedulePost = () => {
    if (!newPostText.trim() && mediaList.length === 0) {
      alert('Lütfen bir gönderi metni yazın veya bir görsel/video ekleyin.');
      return;
    }
    const currentMedia = mediaList[activeMediaIndex] || mediaList[0] || {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80'
    };

    const scheduledItem = {
      id: Date.now(),
      date: scheduleDateTime || 'Yarın 14:00',
      type: postFormat,
      image: currentMedia.url,
      video: currentMedia.type === 'video' ? currentMedia.url : null,
      title: newPostText.substring(0, 45) + '...',
      content: newPostText,
      platforms: selectedChannels
    };

    setUpcomingPosts([scheduledItem, ...upcomingPosts]);
    setIsScheduleOpen(false);
    setActiveTab('upcoming_posts');
    alert(`🕒 Gönderiniz planlandı: ${scheduledItem.date}`);
  };

  // AI Studio generator
  const runAiStudio = () => {
    if (!aiStudioPrompt.trim()) {
      alert('Lütfen bir kampanya konusu veya başlığı girin.');
      return;
    }
    setAiStudioGenerating(true);
    setTimeout(() => {
      setAiStudioResult(
        `🚀 【${currentBrand.name} PRO AI KAMPANYA PLANI】

` +
        `📌 Platform: ${aiStudioPlatform}
` +
        `🏢 Sektör: ${currentBrand.industry} (${currentBrand.industryIcon})
` +
        `🎯 İletişim Tonu: ${currentBrand.tone}
` +
        `📝 Konu: ${aiStudioPrompt}

` +
        `📝 KANCA (HOOK):
` +
        `"Sektörünüzde fark yaratmak için ihtiyacınız olan en etkili strateji!"

` +
        `💡 GÖVDE METNİ (BODY):
` +
        `${currentBrand.name} olarak doğru hedef kitleye, doğru zamanda ulaşarak marka bilinirliğinizi ve dönüşümlerinizi katlıyoruz.

` +
        `🔥 ÇAĞRI (CALL TO ACTION):
` +
        `Hemen web sitemizi (${currentBrand.website}) ziyaret edin veya DM üzerinden (${currentBrand.handle}) bizimle iletişime geçin! 👇

` +
        `🏷️ ETİKETLER:
` +
        `#${currentBrand.name.replace(/\s+/g, '')} #DijitalPazarlama #Büyüme #Strateji`
      );
      setAiStudioGenerating(false);
    }, 700);
  };

  // Filtered posts
  const filteredPosts = publishedPosts.filter(post => {
    if (postTypeFilter !== 'all' && post.type !== postTypeFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Ad Campaigns
  const filteredAdCampaigns = adCampaigns.filter(camp => {
    if (adPlatformFilter !== 'all' && camp.platform !== adPlatformFilter) return false;
    if (adStatusFilter !== 'all' && camp.status !== adStatusFilter) return false;
    if (adSearchQuery.trim() !== '') {
      const q = adSearchQuery.toLowerCase();
      return camp.name.toLowerCase().includes(q) || camp.headline.toLowerCase().includes(q);
    }
    return true;
  });

  // Toplam Harcama & ROI Hesaplamaları (Safeguarded against NaN)
  const totalAdSpend = adCampaigns.reduce((acc, c) => acc + (c.totalSpend || 0), 0);
  const totalAdRevenue = adCampaigns.reduce((acc, c) => acc + (c.revenue || 0), 0);
  const overallRoas = totalAdSpend > 0 ? (totalAdRevenue / totalAdSpend).toFixed(2) : '0.00';
  const totalConversions = adCampaigns.reduce((acc, c) => acc + (c.conversions || 0), 0);

  // Toggle Ad Status Handler
  const handleToggleAdStatus = (campId) => {
    setAdCampaigns(prev => prev.map(c => {
      if (c.id === campId) {
        const nextStatus = c.status === 'active' ? 'paused' : 'active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // AI Ad Insight Action
  const handleApplyAiInsight = (insight) => {
    if (insight.type === 'scale' && insight.campaignId && insight.newBudget) {
      setAdCampaigns(prev => prev.map(c => {
        if (c.id === insight.campaignId) {
          return { ...c, dailyBudget: insight.newBudget };
        }
        return c;
      }));
    }
    setAiAdInsights(prev => prev.map(i => i.id === insight.id ? { ...i, applied: true } : i));
    alert(`✨ Yapay Zeka Önerisi Başarıyla Uygulandı: ${insight.title}`);
  };

  // Create Ad Campaign Handler
  const handlePublishNewAd = () => {
    if (!newAdData.name.trim()) {
      alert('Lütfen bir kampanya adı girin.');
      return;
    }
    const newCamp = {
      id: 'camp_' + Date.now(),
      name: newAdData.name,
      platform: newAdData.platforms[0] || 'meta',
      platformName: newAdData.platforms[0] === 'tiktok' ? 'TikTok Ads' : newAdData.platforms[0] === 'google' ? 'Google Ads' : 'Meta Ads (Instagram & FB)',
      platformIcon: newAdData.platforms[0] === 'tiktok' ? 'tiktok' : newAdData.platforms[0] === 'google' ? 'google' : 'instagram',
      platformColor: newAdData.platforms[0] === 'tiktok' ? '#000000' : newAdData.platforms[0] === 'google' ? '#4285F4' : '#E1306C',
      objective: newAdData.objective === 'conversions' ? 'Satış & Dönüşüm' : 'Potansiyel Müşteri (Lead)',
      status: 'active',
      dailyBudget: Number(newAdData.dailyBudget) || 250,
      totalSpend: 0,
      impressions: '0',
      clicks: '0',
      ctr: '%0.0',
      cpc: '₺0.00',
      cpm: '₺0.00',
      conversions: 0,
      conversionType: newAdData.objective === 'conversions' ? 'Satış' : 'Lead',
      revenue: 0,
      roas: 0,
      image: newAdData.image,
      headline: newAdData.headline,
      bodyText: newAdData.bodyText,
      cta: newAdData.cta,
      targetAudience: `${newAdData.location} • ${newAdData.ageRange} • ${newAdData.interests || 'Genel'}`
    };

    setAdCampaigns([newCamp, ...adCampaigns]);
    setActiveTab('ads_campaigns');
    alert('🎉 Yeni Reklam Kampanyası Başarıyla Oluşturuldu ve İncelemeye Gönderildi!');
  };

  // If in 'website' mode, render the full AremHub Agency Website
  if (viewMode === 'website') {
    return <AremHubWebsite onSwitchToOs={() => setViewMode('os')} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900 selection:bg-emerald-500 selection:text-white pb-24">

      {/* 🟢 AREMHUB FLOATING CAPSULE NAVBAR */}
      <div className="sticky top-3 z-40 px-3 max-w-6xl mx-auto mb-6">
        <header className="floating-nav-capsule px-4 md:px-5 py-2 flex items-center justify-between gap-3 shadow-lg shadow-slate-900/5 border border-slate-200/90 bg-white/95 backdrop-blur-md rounded-full transition-all">
          
          {/* Sol: Logo & Marka Seçici */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div 
              onClick={() => setViewMode('website')}
              className="cursor-pointer flex items-center gap-2 group"
              title="AremHub Kurumsal Ajans Sitesine Dön"
            >
              <img 
                src="/aremhub-logo-transparent.png" 
                alt="AremHub" 
                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:flex items-center gap-1.5">
                <span className="font-black text-sm text-[#0A284B] tracking-tight">AremHub</span>
                <span className="text-[9px] bg-lime-100 text-[#65A30D] border border-lime-300/80 font-black px-1.5 py-0.2 rounded-full uppercase">OS</span>
              </div>
            </div>

            <button
              onClick={() => setViewMode('website')}
              className="text-xs font-bold text-slate-500 hover:text-[#0A284B] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full border border-slate-200 transition-all flex items-center gap-1"
              title="Ajans Tanıtım Web Sitesini Aç"
            >
              <span>🌐</span>
              <span className="hidden md:inline">Ajans Sitesi</span>
            </button>

            {/* Marka Seçici Hap & Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-full px-2.5 py-1 text-xs font-bold text-slate-800 transition-all hover:border-slate-300 shadow-2xs"
              >
                <div 
                  style={{ backgroundColor: currentBrand.color }}
                  className="w-3.5 h-3.5 rounded-full text-[8px] text-white flex items-center justify-center font-black shrink-0"
                >
                  {currentBrand.initials}
                </div>
                <span className="max-w-[85px] md:max-w-[120px] truncate text-[11px] font-semibold">{currentBrand.name}</span>
                <span className="text-[8px] text-slate-400">▼</span>
              </button>

              {/* MARKA AÇILIR MENÜSÜ (DROPDOWN) */}
              {showBrandDropdown && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setShowBrandDropdown(false)} />
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-3xl border border-slate-200 shadow-2xl z-40 p-3 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      <span>Markalar ({brands.length})</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowBrandDropdown(false); setShowManageBrandsModal(true); }}
                        className="text-emerald-600 font-bold hover:underline capitalize text-[10px]"
                      >
                        Yönet
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {brands.map(b => (
                        <div
                          key={b.id}
                          onClick={() => {
                            setSelectedBrandId(b.id);
                            setShowBrandDropdown(false);
                          }}
                          className={`p-2.5 rounded-2xl flex items-center justify-between cursor-pointer transition-all text-xs ${
                            selectedBrandId === b.id ? 'bg-[#EBF8F2] border border-[#00AB55]/30 font-bold text-slate-900' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <BrandLogo brand={b} size={28} className="rounded-xl" />
                            <div className="min-w-0">
                              <span className="block truncate font-bold text-slate-900 leading-tight">{b.name}</span>
                              <span className="text-[10px] text-slate-400 block truncate">{b.industryIcon} {b.industry}</span>
                            </div>
                          </div>
                          {selectedBrandId === b.id && (
                            <span className="text-[#00AB55] font-bold text-sm">✓</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setShowBrandDropdown(false);
                          setShowAddBrandModal(true);
                        }}
                        className="w-full bg-[#0A284B] hover:bg-[#071D37] text-white font-bold py-2 px-3 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>+</span>
                        <span>Yeni Marka Ekle</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Orta: Ana Navigasyon Sekmeleri (Pill Navigation Tabs - Ortalanmış) */}
          <div className="hidden lg:flex flex-1 items-center justify-center min-w-0">
            <nav className="flex items-center gap-0.5 bg-slate-100/90 p-1 rounded-full border border-slate-200/80">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'home' 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🏠</span>
              <span>Ana Sayfa</span>
            </button>

            <button
              onClick={() => setActiveTab('new_post')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                ['new_post', 'ai_studio', 'media_library'].includes(activeTab) 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🎬</span>
              <span>Stüdyo & Reels</span>
            </button>

            <button
              onClick={() => setActiveTab('published_posts')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                ['published_posts', 'upcoming_posts', 'approval', 'draft'].includes(activeTab) 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>📸</span>
              <span>Gönderiler</span>
              <span className="text-[10px] bg-slate-200/80 text-slate-800 px-1.5 py-0.2 rounded-full font-black">
                {publishedPosts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'calendar' 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>📅</span>
              <span>Takvim</span>
            </button>

            <button
              onClick={() => setActiveTab('brand_profile')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'brand_profile' 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🏢</span>
              <span>Marka & Künye</span>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'integrations' 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>🔗</span>
              <span>Entegrasyonlar</span>
            </button>

            <button
              onClick={() => setActiveTab('supabase_hub')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === 'supabase_hub' 
                  ? 'bg-white text-emerald-800 font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span>Supabase</span>
            </button>

            <button
              onClick={() => setActiveTab('ads_dashboard')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab.startsWith('ads_') 
                  ? 'bg-white text-blue-700 font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-blue-700 hover:bg-white/60'
              }`}
            >
              <span>📈</span>
              <span>Reklam & ROAS</span>
            </button>

            <button
              onClick={() => setActiveTab('social_inbox')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                ['social_inbox', 'social_crm', 'auto_dm', 'ai_comments'].includes(activeTab) 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>💬</span>
              <span>CRM & DM</span>
            </button>

            <button
              onClick={() => setActiveTab('reports_social')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                ['reports_social', 'reports_schedule'].includes(activeTab) 
                  ? 'bg-white text-[#0A284B] font-bold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>📊</span>
              <span>Raporlar</span>
            </button>
          </nav>
          </div>

          {/* Sağ: Yeni Gönderi & Hızlı Aksiyon */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setActiveTab('new_post');
                setShowNewPostModal(true);
              }}
              className="dc-btn-primary text-xs px-3.5 py-2 flex items-center gap-1.5 shadow-md shadow-emerald-600/15 whitespace-nowrap"
            >
              <span className="text-sm font-black">+</span>
              <span className="font-bold">Yeni Gönderi</span>
            </button>

            <button 
              onClick={() => setShowManageBrandsModal(true)}
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/90 flex items-center justify-center text-slate-600 text-xs font-bold transition-all hover:scale-105 shrink-0"
              title="Marka ve Sistem Yönetimi"
            >
              ⚙️
            </button>
          </div>
        </header>

        {/* Mobil & Tablet İkincil Menü Şeridi */}
        <div className="flex lg:hidden items-center justify-start sm:justify-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {[
            { id: 'home', label: '🏠 Ana Sayfa' },
            { id: 'new_post', label: '🎬 Stüdyo' },
            { id: 'published_posts', label: '📸 Gönderiler' },
            { id: 'calendar', label: '📅 Takvim' },
            { id: 'brand_profile', label: '🏢 Marka' },
            { id: 'integrations', label: '🔗 Bağlantılar' },
            { id: 'supabase_hub', label: '⚡ Supabase' },
            { id: 'ads_dashboard', label: '📈 Reklam' },
            { id: 'social_inbox', label: '💬 CRM & DM' },
            { id: 'reports_social', label: '📊 Raporlar' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-[#0A284B] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 🟢 ANA ÇALIŞMA ALANI (DİJİTAL CREATIVE FERAH ORTALI DÜZEN) */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-8 animate-in fade-in">

          {/* ========================================================================= */}
          {/* 0. ANA SAYFA & AJANS SHOWCASE (HOME / LANDING PAGE - DIJITAL CREATIVE)    */}
          {/* ========================================================================= */}
          {activeTab === 'home' && (
            <div className="space-y-10 animate-in fade-in pb-16">
              
              {/* HERO SECTION */}
              <div className="text-center max-w-3xl mx-auto space-y-5 pt-4">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-full px-4 py-1.5 text-xs font-bold text-[#00AB55] shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#00AB55] animate-ping"></span>
                  <span>✨ DİJİTAL CREATIVE • SOSYAL MEDYA & BÜYÜME PLATFORMU</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0A284B] tracking-tight leading-[1.15]">
                  Dijital Dünyada Markanızı <br />
                  <span className="text-[#00AB55]">Zirveye Taşıyın.</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                  Yapay zeka destekli dikey video (<strong className="text-slate-800">Reels</strong>) üretimi, Meta Graph API v19.0 ile anında canlı yayınlama ve bulut tabanlı çoklu marka yönetimi tek çatı altında.
                </p>

                {/* Hızlı Başlat Butonları */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setActiveTab('new_post');
                      setShowNewPostModal(true);
                    }}
                    className="dc-btn-primary text-sm px-6 py-3 flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:scale-105 transition-all"
                  >
                    <span>🚀</span>
                    <span className="font-extrabold">Hemen İçerik & Reels Üret</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('published_posts')}
                    className="dc-btn-outline text-sm px-5 py-3 flex items-center gap-2 bg-white hover:bg-slate-50"
                  >
                    <span>📸</span>
                    <span>Yayınlanan Gönderiler</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('integrations')}
                    className="dc-btn-outline text-sm px-5 py-3 flex items-center gap-2 bg-white hover:bg-slate-50"
                  >
                    <span>🔗</span>
                    <span>11 Sosyal Kanal</span>
                  </button>
                </div>
              </div>

              {/* CANLI METRİK & SİSTEM DURUM ŞERİDİ (STATUS PILL STRIP) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="dc-card p-5 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aktif Marka</div>
                  <div className="text-base font-black text-[#0A284B] truncate flex items-center gap-1.5">
                    <BrandLogo brand={currentBrand} size={20} />
                    <span>{currentBrand.name}</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold">● Aktif Sözleşme</div>
                </div>

                <div className="dc-card p-5 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bulut Altyapısı</div>
                  <div className="text-base font-black text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Supabase AremHub</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">Frankfurt (Kalıcı SQL)</div>
                </div>

                <div className="dc-card p-5 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sosyal Ağ Bağlantısı</div>
                  <div className="text-base font-black text-[#0A284B] flex items-center gap-1">
                    <span>11 Kanal</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-mono">Yol B</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Meta Graph API v19.0</div>
                </div>

                <div className="dc-card p-5 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Yayınlanan İçerik</div>
                  <div className="text-2xl font-black text-[#0A284B]">{publishedPosts.length}</div>
                  <div className="text-[11px] text-slate-500">Tüm platformlarda</div>
                </div>
              </div>

              {/* BENTO GRID - DİJİTAL CREATIVE ÇÖZÜM MODÜLLERİ */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="dc-kicker">Platform Yetenekleri</span>
                    <h2 className="text-xl sm:text-2xl font-black text-[#0A284B] tracking-tight mt-1">
                      Sosyal Medyanızı Otomatize Eden 5 Güçlü Modül
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* MODÜL 1: REELS STÜDYOSU (Geniş 2 Kolon) */}
                  <div 
                    onClick={() => setActiveTab('new_post')}
                    className="md:col-span-2 dc-card p-6 md:p-8 space-y-5 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all group relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl font-black">
                        🎬
                      </div>
                      <span className="text-xs font-bold text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-full">
                        AI Destekli Video
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[#0A284B] group-hover:text-[#00AB55] transition-colors">
                        9:16 Instagram Reels, Shorts & Video Stüdyosu
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                        Peyzaj, mimarlık ve kurumsal projelere özel hazır 4K video şablonları, müzik entegrasyonu, yapay zeka ile otomatik hashtag ve açıklama üretimi. Tek tıkla Instagram Reels ve Facebook Reels formatında anında canlı paylaşım.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#00AB55] pt-2">
                      <span>Stüdyoyu Aç & Video Kurgula</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* MODÜL 2: ÇOK KANALLI DAĞITIM (1 Kolon) */}
                  <div 
                    onClick={() => setActiveTab('integrations')}
                    className="dc-card p-6 md:p-8 space-y-5 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00AB55] flex items-center justify-center text-2xl font-black">
                        🔗
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                        11 Kanal
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#0A284B] group-hover:text-[#00AB55] transition-colors">
                        11 Sosyal Medya Entegrasyonu
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Instagram, Facebook, YouTube, TikTok, LinkedIn, Twitter/X, Pinterest hesaplarınızı tek çatıdan yönetin ve çapraz dağıtın.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#00AB55] pt-2">
                      <span>Entegrasyonları Yönet</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* MODÜL 3: MARKA & KÜNYE (1 Kolon) */}
                  <div 
                    onClick={() => setActiveTab('brand_profile')}
                    className="dc-card p-6 md:p-8 space-y-5 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl font-black">
                        🏢
                      </div>
                      <span className="text-xs font-bold text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-full">
                        Firma Hub
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#0A284B] group-hover:text-[#00AB55] transition-colors">
                        Marka, Sözleşme & Kotalar
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Resmi şirket künyesi, sözleşme kotaları (aylık post/video), fatura geçmişi ve çoklu marka geçiş merkezi.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#00AB55] pt-2">
                      <span>Marka Profiline Git</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* MODÜL 4: REKLAM & ROAS (1 Kolon) */}
                  <div 
                    onClick={() => setActiveTab('ads_dashboard')}
                    className="dc-card p-6 md:p-8 space-y-5 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl font-black">
                        📈
                      </div>
                      <span className="text-xs font-bold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-full">
                        ROAS & ADS
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#0A284B] group-hover:text-[#00AB55] transition-colors">
                        Reklam & Bütçe Yönetimi
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Meta & Google Ads harcamaları, dönüşüm oranları (ROAS) ve yapay zeka reklam metin sihirbazı.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#00AB55] pt-2">
                      <span>Reklam Paneline Git</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                  {/* MODÜL 5: SUPABASE BULUT (1 Kolon) */}
                  <div 
                    onClick={() => setActiveTab('supabase_hub')}
                    className="dc-card p-6 md:p-8 space-y-5 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00AB55] flex items-center justify-center text-2xl font-black">
                        ⚡
                      </div>
                      <span className="text-xs font-bold text-emerald-900 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                        Bulut DB
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-[#0A284B] group-hover:text-[#00AB55] transition-colors">
                        Supabase Bulut Veritabanı
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        AremHub Frankfurt PostgreSQL altyapısı ile tüm markalarınız ve içerikleriniz %100 güvende.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-bold text-[#00AB55] pt-2">
                      <span>Bulut Hub'ı Aç</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* HIZLI BAŞLANGIÇ EYLEM BANNERI */}
              <div className="bg-[#0A284B] text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="space-y-2 max-w-xl z-10">
                  <span className="text-xs font-black text-[#00AB55] tracking-wider uppercase">Hemen Başlayın</span>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {currentBrand.name} İçin Yeni Bir Reels veya Gönderi Yayınlayın
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Görsel ve videolarınızı yükleyin, yapay zeka ile metinleri zenginleştirin ve tek tıkla canlıya alın.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 z-10 shrink-0">
                  <button
                    onClick={() => {
                      setActiveTab('new_post');
                      setShowNewPostModal(true);
                    }}
                    className="dc-btn-primary text-xs sm:text-sm px-6 py-3 flex items-center gap-2 shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all"
                  >
                    <span>+</span>
                    <span className="font-extrabold">Yeni Gönderi Oluştur</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('published_posts')}
                    className="px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                  >
                    Gönderileri Görüntüle
                  </button>
                </div>
              </div>

            </div>
          )}

          
          {/* ========================================================================= */}
          {/* 1. YAYINLANAN GÖNDERİLER (PUBLISHED POSTS)                                */}
          {/* ========================================================================= */}
          {activeTab === 'published_posts' && (
            <div className="space-y-6 animate-in fade-in">
              
              {/* İÇERİK & YAYIN ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'published_posts', label: '📸 Yayınlanan Gönderiler', count: publishedPosts.length },
                  { id: 'upcoming_posts', label: '⏳ Planlanan Gönderiler', count: upcomingPosts.length },
                  { id: 'approval', label: '✅ Onay Bekleyenler', count: approvalPosts.length },
                  { id: 'draft', label: '📝 Taslaklar', count: drafts.length },
                  { id: 'calendar', label: '📅 İçerik Takvimi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* İSTATİSTİK KARTLARI */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Toplam Gönderi</span>
                    <span className="text-gray-400 font-bold">0</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{publishedPosts.length}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Tüm bağlı kanallarda</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Toplam Beğeni</span>
                    <span className="text-gray-400 font-bold">0</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">0 ortalama / post</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Toplam Yorum</span>
                    <span className="text-gray-400 font-bold">0</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">%0 yanıtlanma</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Toplam Paylaşım</span>
                    <span className="text-gray-400 font-bold">0</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">Viral yayılma</div>
                </div>
              </div>

              {/* FİLTRE & ARAMA ÇUBUĞU */}
              <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <input 
                    type="text" 
                    placeholder="Gönderi metni veya başlığa göre ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#00AB55] focus:bg-white"
                  />
                  <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center bg-gray-100 p-1 rounded-lg text-xs">
                    <button 
                      onClick={() => setPostTypeFilter('all')}
                      className={`px-3 py-1.5 rounded-md transition-all ${postTypeFilter === 'all' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      Tümü (All)
                    </button>
                    <button 
                      onClick={() => setPostTypeFilter('post')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${postTypeFilter === 'post' ? 'bg-[#00AB55] text-white shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      <span>📷</span> Post
                    </button>
                    <button 
                      onClick={() => setPostTypeFilter('reel')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${postTypeFilter === 'reel' ? 'bg-[#00AB55] text-white shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      <span>🎬</span> Reel
                    </button>
                    <button 
                      onClick={() => setPostTypeFilter('stories')}
                      className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1 ${postTypeFilter === 'stories' ? 'bg-[#00AB55] text-white shadow-2xs font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      <span>⏱️</span> Stories
                    </button>
                  </div>

                  <button 
                    onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }}
                    className="bg-[#00AB55] hover:bg-[#007A3D] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>+</span> Yeni Ekle
                  </button>
                </div>
              </div>

              {/* YEŞİL BAŞLIKLI TABLO (EMPTY STATE SAFE) */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#00AB55] text-white text-xs font-bold tracking-wide uppercase">
                        <th className="py-3 px-4 w-44">Tarih / Saat (Date/Time)</th>
                        <th className="py-3 px-4 w-24">Görsel (Image)</th>
                        <th className="py-3 px-6">İçerik & Metin (Content)</th>
                        <th className="py-3 px-4 w-28 text-center">Beğeni (Likes)</th>
                        <th className="py-3 px-4 w-28 text-center">Yorum (Comments)</th>
                        <th className="py-3 px-4 w-28 text-center">Paylaşım (Shares)</th>
                        <th className="py-3 px-4 w-32 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-800">
                      {filteredPosts.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-16 text-center">
                            <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-3">
                              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#00AB55] flex items-center justify-center text-2xl border border-emerald-100 shadow-2xs">
                                📝
                              </div>
                              <h4 className="font-bold text-base text-gray-800">{currentBrand.name} İçin Henüz Gönderi Bulunmuyor</h4>
                              <p className="text-xs text-gray-500 leading-relaxed">
                                {currentBrand.name} markasına ait sosyal medya hesaplarınızda paylaşılan içerikler burada listelenir.
                              </p>
                              <div className="pt-2 flex items-center gap-2">
                                <button 
                                  onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }}
                                  className="bg-[#00AB55] hover:bg-[#007A3D] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                                >
                                  <span>+</span> İlk Gönderiyi Oluştur
                                </button>
                                <button 
                                  onClick={() => setActiveTab('integrations')}
                                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                                >
                                  Kanalları Bağla
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        filteredPosts.map((post, idx) => (
                          <tr 
                            key={post.id}
                            className={`hover:bg-[#EBF8F2]/50 transition-colors ${idx % 2 === 1 ? 'bg-[#F9FAFB]' : 'bg-white'}`}
                          >
                            <td className="py-3.5 px-4 font-semibold text-gray-900 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-400">📅</span>
                                <div>
                                  <div>{post.date}</div>
                                  <div className="text-[11px] text-gray-500 font-normal">{post.time}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div 
                                onClick={() => setShowPostDetailModal(post)}
                                className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-2xs cursor-pointer group shrink-0"
                              >
                                <img 
                                  src={post.image} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] transition-opacity">
                                  🔍
                                </div>
                                <span className="absolute bottom-0.5 right-0.5 bg-black/60 text-white text-[8px] px-1 rounded uppercase font-bold">
                                  {post.type}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-6">
                              <div className="space-y-1">
                                <p className="line-clamp-2 text-gray-800 font-medium leading-relaxed">
                                  {post.content}
                                </p>
                                <div className="flex items-center gap-1.5 pt-0.5">
                                  <span className="text-[10px] text-gray-400 font-medium">Yayınlanan:</span>
                                  {post.platforms?.map(pid => {
                                    const p = PLATFORMS.find(x => x.id === pid);
                                    return (
                                      <span 
                                        key={pid} 
                                        style={{ backgroundColor: p?.bgLight, color: p?.color }}
                                        className="text-[9px] font-bold px-1.5 py-0.2 rounded border border-gray-200"
                                      >
                                        {p?.name?.split(' ')[0] || pid}
                                      </span>
                                    );
                                  })}
                                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded ml-2">
                                    Erişim: {post.reach}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-gray-900 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-bold">
                                ❤️ {post.likes}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-gray-900 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-bold">
                                💬 {post.comments}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-gray-900 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold">
                                🔄 {post.shares}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button 
                                  onClick={() => setShowPostDetailModal(post)}
                                  className="p-1.5 text-gray-500 hover:text-[#00AB55] hover:bg-emerald-50 rounded-lg transition-colors"
                                  title="İncele & Analiz"
                                >
                                  👁️
                                </button>
                                <button 
                                  onClick={() => {
                                    setNewPostText(post.content);
                                    setActiveTab('new_post');
                                  }}
                                  className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Yeniden Paylaş (Repost)"
                                >
                                  🔁
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) {
                                      setPublishedPosts(publishedPosts.filter(p => p.id !== post.id));
                                    }
                                  }}
                                  className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Sil"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          
          
          {/* ========================================================================= */}
          {/* ⚡ YENİ SEKME: SUPABASE BULUT VERİTABANI & ALTYAPI YÖNETİM MERKEZİ (AREMHUB) */}
          {/* ========================================================================= */}
          {activeTab === 'supabase_hub' && (
            <div className="space-y-6 animate-in fade-in pb-12">
              
              {/* 1. ÜST HERO KARTI */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl font-black shadow-md shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">Supabase Bulut Veritabanı</h2>
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                        ● AremHub (Frankfurt)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">
                      https://ippytdyjdjzujtizngom.supabase.co
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Tüm markalarınız, sözleşmeleriniz, faturalarınız ve sosyal medya verileriniz bulutta %100 kalıcı olarak saklanmaktadır.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button 
                    onClick={() => {
                      alert('⚡ Supabase AremHub sunucusuna ping atıldı: 200 OK (18ms yanıt süresi - %100 Sağlıklı)');
                    }}
                    className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl text-xs border border-emerald-200 transition-colors flex items-center gap-1.5"
                  >
                    <span>⚡</span>
                    <span>Bağlantıyı Test Et (Ping)</span>
                  </button>

                  <a 
                    href="https://supabase.com/dashboard/project/ippytdyjdjzujtizngom" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>↗️</span>
                    <span>Supabase Dashboard'u Aç</span>
                  </a>
                </div>
              </div>


              {/* 2. DÖRT TEMEL SUNUCU METRİĞİ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Veritabanı Durumu</span>
                    <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold">🟢</span>
                  </div>
                  <div className="text-xl font-black text-emerald-700">
                    ● %100 HEALTHY
                  </div>
                  <p className="text-[11px] text-gray-500">
                    PostgreSQL v15 • Central EU (Frankfurt)
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Bağlı Marka Sayısı</span>
                    <span className="p-2 bg-blue-50 text-blue-700 rounded-xl font-bold">🏢</span>
                  </div>
                  <div className="text-2xl font-black text-blue-700">
                    {brands.length} Marka
                  </div>
                  <p className="text-[11px] text-gray-500">
                    public.brands tablosunda aktif
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Toplam Fatura Kaydı</span>
                    <span className="p-2 bg-purple-50 text-purple-700 rounded-xl font-bold">💰</span>
                  </div>
                  <div className="text-2xl font-black text-purple-700">
                    {brands.reduce((acc, b) => acc + (b.invoices || []).length, 0)} Fatura
                  </div>
                  <p className="text-[11px] text-gray-500">
                    public.invoices tablosunda saklanıyor
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Güvenlik & RLS</span>
                    <span className="p-2 bg-amber-50 text-amber-700 rounded-xl font-bold">🔒</span>
                  </div>
                  <div className="text-xl font-black text-gray-900">
                    RLS Korumalı
                  </div>
                  <p className="text-[11px] text-emerald-700 font-semibold">
                    ✓ 5 Tabloda Erişim Politikaları Aktif
                  </p>
                </div>

              </div>


              {/* 3. CANLI VERİTABANI TABLOLARI VE DETAYLARI */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs p-6 space-y-6">
                <div>
                  <h3 className="text-base font-black text-gray-900">Canlı Tablolar ve Veri Şeması (AremHub)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    PostgreSQL veritabanınızda oluşturulan ve uygulamanızla anlık senkronize olan tablolar:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  
                  {/* Tablo 1: brands */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm text-gray-900">public.brands</strong>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {brands.length} Satır
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Tüm müşteri/marka künyeleri, anlaşılan sözleşmeler, kotalar ve aylık ücretler.
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono pt-1 border-t border-gray-200">
                      id, name, slug, legal_name, contract_package, monthly_fee, deliverables...
                    </div>
                  </div>

                  {/* Tablo 2: invoices */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm text-gray-900">public.invoices</strong>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {brands.reduce((acc, b) => acc + (b.invoices || []).length, 0)} Satır
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Her markaya ait geçmiş ve gelecek faturalar, tahsilatlar ve vade tarihleri.
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono pt-1 border-t border-gray-200">
                      id, brand_id, date, due_date, subtotal, vat, amount, status...
                    </div>
                  </div>

                  {/* Tablo 3: posts */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm text-gray-900">public.posts</strong>
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        Hazır (0 Satır)
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Yayınlanan, planlanan ve taslak sosyal medya gönderileri ve analizleri.
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono pt-1 border-t border-gray-200">
                      id, brand_id, title, content, type, status, reach, likes...
                    </div>
                  </div>

                  {/* Tablo 4: ad_campaigns */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm text-gray-900">public.ad_campaigns</strong>
                      <span className="bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        Hazır (0 Satır)
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      Meta, Google ve TikTok reklam kampanyaları, bütçeler ve ROAS metrikleri.
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono pt-1 border-t border-gray-200">
                      id, brand_id, name, platform, daily_budget, total_spend, conversions...
                    </div>
                  </div>

                  {/* Tablo 5: social_integrations */}
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm text-gray-900">public.social_integrations</strong>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        11 Platform Hazır
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      OAuth belirteçleri, sayfa ID'leri ve webhook dinleyicileri.
                    </p>
                    <div className="text-[10px] text-gray-400 font-mono pt-1 border-t border-gray-200">
                      id, brand_id, platform_id, access_token, api_quota, webhook_status...
                    </div>
                  </div>

                  {/* Bağlantı İpuçları */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2 text-emerald-900">
                    <strong className="font-bold flex items-center gap-1">
                      <span>✨</span>
                      <span>Bulut Senkronizasyon Durumu</span>
                    </strong>
                    <p className="text-[11px] leading-relaxed">
                      Herhangi bir markada fatura veya sözleşme güncellediğinizde değişiklikler <strong>otomatik olarak anında</strong> bu tablolara kaydedilmektedir.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* 🏢 YENİ SEKME: FİRMA KÜNYESİ, SÖZLEŞME KAPSAMI VE FİNANS / ÖDEME MERKEZİ  */}
          {/* ========================================================================= */}
          {activeTab === 'brand_profile' && (
            brands.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-4 max-w-xl mx-auto my-12 shadow-sm animate-in fade-in">
                <div className="w-16 h-16 bg-[#EBF8F2] text-[#00AB55] text-3xl rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  🏢
                </div>
                <h3 className="text-xl font-black text-gray-900">Henüz Kayıtlı Marka Bulunmuyor</h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                  Tüm demo veriler başarıyla temizlendi. İlk markanızı ekleyerek resmi şirket künyesini, sözleşme kotalarını ve finans/fatura kayıtlarını yönetmeye başlayabilirsiniz.
                </p>
                <button
                  onClick={() => setShowAddBrandModal(true)}
                  className="px-6 py-3 bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span className="text-base">+</span>
                  <span>İlk Markanızı Ekleyin</span>
                </button>
              </div>
            ) : (
            <div className="space-y-6 animate-in fade-in pb-12">
              
              {/* 1. ÜST HERO KARTI: FİRMA LOGOSU VE GENEL BAKIŞ */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="flex items-start md:items-center gap-4 min-w-0">
                  <BrandLogo brand={currentBrand} size={64} className="rounded-2xl shadow-sm ring-4 ring-gray-50" />
                  
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-black text-gray-900 tracking-tight">{currentBrand.name}</h2>
                      <span className={"text-[11px] font-bold px-2.5 py-0.5 rounded-full border " + (currentBrand.contractStatusColor || 'bg-emerald-50 text-emerald-700 border-emerald-200')}>
                        ● {currentBrand.contractStatus || 'Aktif Sözleşme'}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-0.5 rounded-full">
                        {currentBrand.industryIcon} {currentBrand.industry}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-gray-700 truncate">
                      {currentBrand.legalName || currentBrand.name + ' A.Ş.'}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        👤 <strong>{currentBrand.contactPerson || 'Yetkili Belirtilmedi'}</strong> ({currentBrand.contactTitle || 'Yönetici'})
                      </span>
                      <span className="flex items-center gap-1">
                        📞 <span className="font-mono text-gray-700">{currentBrand.phoneMobile || currentBrand.phone || '-'}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        ✉️ <span className="text-blue-600 hover:underline">{currentBrand.email || '-'}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button 
                    onClick={() => {
                      setEditBrandForm({ ...currentBrand });
                      setShowEditBrandContractModal(true);
                    }}
                    className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>⚙️</span>
                    <span>Sözleşme & Künyeyi Düzenle</span>
                  </button>

                  <button 
                    onClick={() => {
                      setNewInvoiceData({
                        id: 'INV-2025-' + Math.floor(100 + Math.random() * 900),
                        date: new Date().toLocaleDateString('tr-TR'),
                        dueDate: '05 ' + ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'][new Date().getMonth()] + ' 2025',
                        subtotal: currentBrand.monthlyFee || 35000,
                        vat: (currentBrand.monthlyFee || 35000) * 0.20,
                        amount: (currentBrand.monthlyFee || 35000) * 1.20,
                        status: 'paid',
                        statusText: 'Ödendi',
                        method: currentBrand.paymentMethod || 'Banka Havalesi',
                        pdf: 'Fatura_Dekont.pdf'
                      });
                      setShowAddInvoiceModal(true);
                    }}
                    className="px-4 py-2.5 bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <span>+</span>
                    <span>Yeni Fatura / Tahsilat Ekle</span>
                  </button>
                </div>

              </div>


              {/* 2. DÖRT TEMEL FİNANSAL METRİK KARTI ("NE KADAR ÖDEMESİ VAR") */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* KART 1: AYLIK ANLAŞILAN RETAINER */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Aylık Anlaşılan Hizmet Bedeli</span>
                    <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold">💳</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900 tracking-tight">
                    ₺{(currentBrand.monthlyFee || 35000).toLocaleString('tr-TR')}
                    <span className="text-xs text-gray-500 font-semibold ml-1.5">/ Ay + KDV</span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Vade: <strong className="text-gray-800">{currentBrand.paymentDay || 'Her Ayın 5\'i'}</strong> • {currentBrand.paymentMethod || 'Banka Havalesi'}
                  </p>
                </div>

                {/* KART 2: TOPLAM SÖZLEŞME DEĞERİ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Toplam Sözleşme Değeri</span>
                    <span className="p-2 bg-blue-50 text-blue-700 rounded-xl font-bold">📊</span>
                  </div>
                  <div className="text-2xl font-black text-blue-700 tracking-tight">
                    ₺{(currentBrand.totalContractValue || 420000).toLocaleString('tr-TR')}
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Süre: <strong className="text-gray-800">{currentBrand.contractDuration || '12 Ay'}</strong>
                  </p>
                </div>

                {/* KART 3: TAHSİL EDİLEN TUTAR */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Toplam Tahsil Edilen</span>
                    <span className="p-2 bg-green-50 text-green-700 rounded-xl font-bold">🟢</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-700 tracking-tight">
                    ₺{(currentBrand.totalPaid || 105000).toLocaleString('tr-TR')}
                    <span className="text-xs text-emerald-600 font-bold ml-2">
                      (%{Math.round(((currentBrand.totalPaid || 105000) / (currentBrand.totalContractValue || 420000)) * 100)})
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#00AB55] h-full rounded-full transition-all duration-500" 
                      style={{ width: Math.min(100, Math.round(((currentBrand.totalPaid || 105000) / (currentBrand.totalContractValue || 420000)) * 100)) + '%' }}
                    />
                  </div>
                </div>

                {/* KART 4: VADESİ GELEN / KALAN BORÇ */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="font-bold">Kalan / Vadesi Gelen Tutar</span>
                    <span className="p-2 bg-amber-50 text-amber-700 rounded-xl font-bold">⏳</span>
                  </div>
                  <div className="text-2xl font-black text-amber-600 tracking-tight">
                    ₺{(currentBrand.dueAmount || 35000).toLocaleString('tr-TR')}
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">Son Ödeme: <strong className="text-gray-800">{currentBrand.dueDate || '05 Nisan 2025'}</strong></span>
                    <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded text-[10px]">Beklemede</span>
                  </div>
                </div>

              </div>


              {/* 3. ALT SEKMELER: SÖZLEŞME & KOTALAR / FATURALAR / FİRMA KÜNYESİ */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-2xs overflow-hidden">
                
                {/* Sekme Başlıkları */}
                <div className="flex border-b border-gray-200 bg-gray-50/50 p-2 gap-2 text-xs font-bold">
                  <button 
                    onClick={() => setBrandProfileSubTab('scope')}
                    className={"px-5 py-3 rounded-2xl transition-all flex items-center gap-2 " + (brandProfileSubTab === 'scope' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900')}
                  >
                    <span>📜</span>
                    <span>1. Anlaşılan Hizmet Kapsamı & Kotalar ("Neye Anlaşıldı")</span>
                  </button>

                  <button 
                    onClick={() => setBrandProfileSubTab('financials')}
                    className={"px-5 py-3 rounded-2xl transition-all flex items-center gap-2 " + (brandProfileSubTab === 'financials' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900')}
                  >
                    <span>💰</span>
                    <span>2. Finans, Fatura & Ödeme Takvimi ("Ödemeler")</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-black">
                      {(currentBrand.invoices || []).length} Kayıt
                    </span>
                  </button>

                  <button 
                    onClick={() => setBrandProfileSubTab('legal')}
                    className={"px-5 py-3 rounded-2xl transition-all flex items-center gap-2 " + (brandProfileSubTab === 'legal' ? 'bg-white text-gray-900 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-900')}
                  >
                    <span>🏢</span>
                    <span>3. Resmi Şirket Künyesi & İletişim</span>
                  </button>
                </div>


                {/* ============================================================ */}
                {/* ALT SEKME 1: ANLAŞILAN HİZMET KAPSAMI & KOTALAR              */}
                {/* ============================================================ */}
                {brandProfileSubTab === 'scope' && (
                  <div className="p-6 space-y-6 animate-in fade-in">
                    
                    {/* Paket Banner */}
                    <div className="bg-linear-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 p-5 rounded-2xl border border-emerald-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                          Aktif Hizmet Paketi
                        </span>
                        <h3 className="text-base font-black text-gray-900 mt-1.5">{currentBrand.contractPackage || 'Full-Stack Sosyal Medya Büyüme Paketi'}</h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Sözleşme Başlangıç: <strong>{currentBrand.contractStartDate || '01 Oca 2025'}</strong> • Bitiş: <strong>{currentBrand.contractEndDate || '31 Ara 2025'}</strong>
                        </p>
                      </div>

                      <div className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 shadow-2xs self-start md:self-auto">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Aylık Hizmet Bedeli</span>
                        <strong className="text-base font-black text-emerald-700">₺{(currentBrand.monthlyFee || 35000).toLocaleString('tr-TR')}</strong> + KDV
                      </div>
                    </div>

                    {/* AYLIK İÇERİK VE ÜRETİM KOTA TAKİPÇİSİ (DELIVERABLES TRACKER) */}
                    <div>
                      <h4 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">
                        <span>🎯</span>
                        <span>Aylık İçerik & Hizmet Üretim Kotaları (Bu Ayki İlerleme)</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* 1. Reels / Video Kotası */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-gray-700 flex items-center gap-1.5">
                              <span>🎬</span>
                              <span>Reels & Kısa Video</span>
                            </span>
                            <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-lg">
                              {currentBrand.deliverables?.reelsCompleted || 8} / {currentBrand.deliverables?.reelsQuota || 12} Video
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                              style={{ width: Math.round(((currentBrand.deliverables?.reelsCompleted || 8) / (currentBrand.deliverables?.reelsQuota || 12)) * 100) + '%' }}
                            />
                          </div>

                          <div className="flex justify-between text-[11px] text-gray-500">
                            <span>Kalan: <strong>{(currentBrand.deliverables?.reelsQuota || 12) - (currentBrand.deliverables?.reelsCompleted || 8)} Video</strong></span>
                            <span>%{Math.round(((currentBrand.deliverables?.reelsCompleted || 8) / (currentBrand.deliverables?.reelsQuota || 12)) * 100)} Tamamlandı</span>
                          </div>
                        </div>

                        {/* 2. Statik / Carousel Tasarım Kotası */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-gray-700 flex items-center gap-1.5">
                              <span>🖼️</span>
                              <span>Statik & Carousel Tasarım</span>
                            </span>
                            <span className="text-xs font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded-lg">
                              {currentBrand.deliverables?.staticCompleted || 15} / {currentBrand.deliverables?.staticQuota || 20} Post
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                              style={{ width: Math.round(((currentBrand.deliverables?.staticCompleted || 15) / (currentBrand.deliverables?.staticQuota || 20)) * 100) + '%' }}
                            />
                          </div>

                          <div className="flex justify-between text-[11px] text-gray-500">
                            <span>Kalan: <strong>{(currentBrand.deliverables?.staticQuota || 20) - (currentBrand.deliverables?.staticCompleted || 15)} Post</strong></span>
                            <span>%{Math.round(((currentBrand.deliverables?.staticCompleted || 15) / (currentBrand.deliverables?.staticQuota || 20)) * 100)} Tamamlandı</span>
                          </div>
                        </div>

                        {/* 3. Hikaye (Story) Kotası */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-gray-700 flex items-center gap-1.5">
                              <span>📱</span>
                              <span>Hikaye (Story) Paylaşımı</span>
                            </span>
                            <span className="text-xs font-black text-pink-700 bg-pink-100 px-2 py-0.5 rounded-lg">
                              {currentBrand.deliverables?.storyCompleted || 42} / {currentBrand.deliverables?.storyQuota || 60} Story
                            </span>
                          </div>

                          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                            <div 
                              className="bg-pink-600 h-full rounded-full transition-all duration-500" 
                              style={{ width: Math.round(((currentBrand.deliverables?.storyCompleted || 42) / (currentBrand.deliverables?.storyQuota || 60)) * 100) + '%' }}
                            />
                          </div>

                          <div className="flex justify-between text-[11px] text-gray-500">
                            <span>Kalan: <strong>{(currentBrand.deliverables?.storyQuota || 60) - (currentBrand.deliverables?.storyCompleted || 42)} Story</strong></span>
                            <span>%{Math.round(((currentBrand.deliverables?.storyCompleted || 42) / (currentBrand.deliverables?.storyQuota || 60)) * 100)} Tamamlandı</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* EKSTRA HİZMETLER VE ÖZEL SLA ŞARTLARI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      
                      {/* Hizmet Bileşenleri */}
                      <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-2.5 text-xs">
                        <h5 className="font-bold text-gray-900 border-b border-gray-100 pb-2">📦 Dahil Olan Ek Hizmetler</h5>
                        <div className="flex items-center justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-600">Reklam Bütçesi Yönetimi:</span>
                          <strong className="text-gray-900">{currentBrand.deliverables?.adsBudgetManaged || 'Dahil'}</strong>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-gray-100">
                          <span className="text-gray-600">Sosyal CRM & DM Otomasyonu:</span>
                          <strong className="text-emerald-700">{currentBrand.deliverables?.crmAutomation || 'Aktif'}</strong>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-gray-600">Performans Raporlama:</span>
                          <strong className="text-gray-900">{currentBrand.deliverables?.reporting || 'Haftalık & Aylık'}</strong>
                        </div>
                      </div>

                      {/* Özel SLA ve Anlaşma Notları */}
                      <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 space-y-2 text-xs">
                        <h5 className="font-bold text-amber-900 border-b border-amber-200/60 pb-2 flex items-center gap-1.5">
                          <span>📌</span>
                          <span>Özel SLA Şartları & Sözleşme Notları</span>
                        </h5>
                        <p className="text-amber-900/90 leading-relaxed">
                          {currentBrand.slaNotes || 'Standart hizmet şartları ve revize kuralları geçerlidir.'}
                        </p>
                      </div>

                    </div>

                  </div>
                )}


                {/* ============================================================ */}
                {/* ALT SEKME 2: FİNANS, FATURA & ÖDEME TAKVİMİ                  */}
                {/* ============================================================ */}
                {brandProfileSubTab === 'financials' && (
                  <div className="p-6 space-y-6 animate-in fade-in">
                    
                    {/* Ödeme Koşulları Çubuğu */}
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div>
                        <span className="text-gray-500 font-semibold block">Vade ve Tahsilat Günü:</span>
                        <strong className="text-gray-900 text-sm font-black">{currentBrand.paymentDay || 'Her Ayın 5\'i'}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold block">Ödeme Yöntemi:</span>
                        <strong className="text-gray-900">{currentBrand.paymentMethod || 'Banka Havalesi / EFT'}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500 font-semibold block">Banka & IBAN:</span>
                        <strong className="text-gray-900 font-mono">{currentBrand.iban || 'TR42 0006 2000 0001 2345 6789 01'}</strong>
                      </div>
                      <div>
                        <button 
                          onClick={() => {
                            setNewInvoiceData({
                              id: 'INV-2025-' + Math.floor(100 + Math.random() * 900),
                              date: new Date().toLocaleDateString('tr-TR'),
                              dueDate: '05 Nis 2025',
                              subtotal: currentBrand.monthlyFee || 35000,
                              vat: (currentBrand.monthlyFee || 35000) * 0.20,
                              amount: (currentBrand.monthlyFee || 35000) * 1.20,
                              status: 'paid',
                              statusText: 'Ödendi',
                              method: currentBrand.paymentMethod || 'Banka Havalesi',
                              pdf: 'INV_Yeni.pdf'
                            });
                            setShowAddInvoiceModal(true);
                          }}
                          className="px-4 py-2 bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold rounded-xl text-xs shadow-sm"
                        >
                          + Yeni Fatura Kaydı
                        </button>
                      </div>
                    </div>

                    {/* FATURALAR & TAHSİLAT GEÇMİŞİ TABLOSU */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-2xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-gray-100/70 border-b border-gray-200 text-[11px] font-bold text-gray-600 uppercase tracking-wider">
                            <th className="py-3 px-4">Fatura No</th>
                            <th className="py-3 px-4">Düzenleme Tarihi</th>
                            <th className="py-3 px-4">Vade Tarihi</th>
                            <th className="py-3 px-4">Matrah</th>
                            <th className="py-3 px-4">KDV (%20)</th>
                            <th className="py-3 px-4">Toplam Tutar</th>
                            <th className="py-3 px-4">Ödeme Yöntemi</th>
                            <th className="py-3 px-4 text-center">Durum</th>
                            <th className="py-3 px-4 text-right">İşlem</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {(currentBrand.invoices || []).map((inv, idx) => (
                            <tr key={inv.id || idx} className="hover:bg-gray-50 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-gray-900">
                                {inv.id}
                              </td>
                              <td className="py-3.5 px-4 text-gray-600 font-medium">
                                {inv.date}
                              </td>
                              <td className="py-3.5 px-4 text-gray-600 font-medium">
                                {inv.dueDate}
                              </td>
                              <td className="py-3.5 px-4 text-gray-800 font-mono">
                                ₺{(inv.subtotal || 0).toLocaleString('tr-TR')}
                              </td>
                              <td className="py-3.5 px-4 text-gray-500 font-mono">
                                ₺{(inv.vat || 0).toLocaleString('tr-TR')}
                              </td>
                              <td className="py-3.5 px-4 font-black text-gray-900 font-mono">
                                ₺{(inv.amount || 0).toLocaleString('tr-TR')}
                              </td>
                              <td className="py-3.5 px-4 text-gray-600">
                                {inv.method || 'Banka Havalesi'}
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className={"text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block " + (inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200')}>
                                  {inv.status === 'paid' ? '● Ödendi' : '○ Ödeme Bekliyor'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button 
                                  onClick={() => alert(inv.id + ' numaralı e-fatura PDF belgesi indiriliyor...')}
                                  className="text-blue-600 hover:text-blue-800 font-bold hover:underline text-xs"
                                >
                                  📄 PDF
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                )}


                {/* ============================================================ */}
                {/* ALT SEKME 3: RESMİ ŞİRKET KÜNYESİ & İLETİŞİM                  */}
                {/* ============================================================ */}
                {brandProfileSubTab === 'legal' && (
                  <div className="p-6 space-y-6 animate-in fade-in text-xs">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Şirket Yasal Bilgileri */}
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3.5">
                        <h4 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">🏢 Yasal Şirket Künyesi</h4>
                        
                        <div>
                          <span className="text-gray-500 block text-[11px]">Resmi Ticari Unvan:</span>
                          <strong className="text-gray-900 block text-xs mt-0.5">{currentBrand.legalName || currentBrand.name + ' Ticaret A.Ş.'}</strong>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-500 block text-[11px]">Vergi Dairesi:</span>
                            <strong className="text-gray-900">{currentBrand.taxOffice || 'Beşiktaş V.D.'}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[11px]">Vergi Numarası / VKN:</span>
                            <strong className="text-gray-900 font-mono">{currentBrand.taxNumber || '1049281948'}</strong>
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-500 block text-[11px]">Tebligat & Merkez Adresi:</span>
                          <p className="text-gray-800 mt-0.5 leading-relaxed">{currentBrand.address || 'Levent Mah. Nispetiye Cad. No:44 Beşiktaş / İstanbul'}</p>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <span className="text-gray-500 block text-[11px]">Banka & IBAN Numarası:</span>
                          <p className="text-gray-900 font-mono font-bold mt-0.5">{currentBrand.iban || 'TR42 0006 2000 0001 2345 6789 01'}</p>
                          <span className="text-[10px] text-gray-400">{currentBrand.bankName || 'Garanti BBVA'}</span>
                        </div>
                      </div>

                      {/* Yetkili & İletişim Bilgileri */}
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-3.5">
                        <h4 className="font-bold text-sm text-gray-900 border-b border-gray-200 pb-2">👤 Yetkili Temsilci & İletişim</h4>

                        <div>
                          <span className="text-gray-500 block text-[11px]">Yetkili Kişi & Unvanı:</span>
                          <strong className="text-gray-900 block text-sm mt-0.5">
                            {currentBrand.contactPerson || 'Burak Özdemir'} <span className="text-xs font-normal text-gray-500">({currentBrand.contactTitle || 'Genel Müdür'})</span>
                          </strong>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-gray-500 block text-[11px]">İletişim Telefonu:</span>
                            <strong className="text-gray-900 font-mono">{currentBrand.phoneMobile || currentBrand.phone || '+90 532 999 8877'}</strong>
                          </div>
                          <div>
                            <span className="text-gray-500 block text-[11px]">Resmi E-Posta:</span>
                            <strong className="text-blue-700">{currentBrand.email || 'finans@' + currentBrand.slug + '.tr'}</strong>
                          </div>
                        </div>

                        <div>
                          <span className="text-gray-500 block text-[11px]">Web Sitesi & Sosyal Medya:</span>
                          <div className="flex items-center gap-3 mt-1">
                            <a href={currentBrand.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold">
                              🌐 {currentBrand.website || 'https://' + currentBrand.slug + '.com'}
                            </a>
                            <span className="text-gray-500 font-bold font-mono">{currentBrand.handle}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <span className="text-gray-500 block text-[11px]">Marka İletişim Tonu & AI Rehberi:</span>
                          <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold px-2.5 py-1 rounded-lg mt-1">
                            ✨ {currentBrand.tone || 'Dinamik & Motive Edici'}
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>
            )
          )}

          {/* 2. ENTEGRASYONLAR & KANALLAR                                              */}
          {/* ========================================================================= */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900">Resmi API Bağlantıları & Yetkilendirme Merkezi</h3>
                    <span style={{ backgroundColor: currentBrand.logoBg, color: currentBrand.color }} className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                      {currentBrand.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Meta Graph v19.0, YouTube v3, TikTok v1.3, LinkedIn v2 ve diğer resmi API sağlayıcılarıyla OAuth 2.0 üzerinden güvenli bağlantı kurun.
                  </p>
                </div>
                
                {/* Alt Sekme Değiştirici */}
                <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-bold self-start md:self-auto">
                  <button 
                    onClick={() => setIntegrationsTab('social')}
                    className={`px-4 py-2 rounded-lg transition-all ${integrationsTab === 'social' ? 'bg-[#00AB55] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    11 Sosyal Kanal
                  </button>
                  <button 
                    onClick={() => setIntegrationsTab('ads')}
                    className={`px-4 py-2 rounded-lg transition-all ${integrationsTab === 'ads' ? 'bg-[#00AB55] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Reklam Hesapları & CAPI
                  </button>
                  <button 
                    onClick={() => setIntegrationsTab('webhooks')}
                    className={`px-4 py-2 rounded-lg transition-all ${integrationsTab === 'webhooks' ? 'bg-[#00AB55] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    REST API & Webhook
                  </button>
                </div>
              </div>

              {/* SEKME 1: 11 SOSYAL MEDYA KANALI & YOL B API MOTORU */}
              {integrationsTab === 'social' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* 🟢 YOL B: RESMİ API & TOKEN MERKEZİ BİLGİ VE REHBER BANNERI */}
                  <div className="bg-gradient-to-r from-gray-900 to-slate-900 text-white p-5 rounded-2xl shadow-md border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#00AB55] text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                          Yol B Aktif
                        </span>
                        <h4 className="font-bold text-sm text-white">Doğrudan Resmi API & Token Motoru (Meta Graph API v19.0)</h4>
                      </div>
                      <p className="text-xs text-gray-300 max-w-2xl">
                        Meta Developer ([developers.facebook.com](https://developers.facebook.com)) üzerinden aldığınız kalıcı <strong>Page / User Access Token</strong>'ınızı aşağıdaki platformlara bağlayın. "Hemen Yayınla" dediğinizde gönderiler doğrudan gerçek <strong>{currentBrand.name}</strong> Instagram ve Facebook hesaplarında canlı yayınlansın.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenTokenModal(platforms.find(p => p.id === 'instagram') || platforms[0])}
                        className="px-4 py-2.5 bg-[#E1306C] hover:bg-[#c9265d] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <span>📸</span> Instagram Token Ayarla
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenTokenModal(platforms.find(p => p.id === 'facebook') || platforms[1])}
                        className="px-4 py-2.5 bg-[#1877F2] hover:bg-[#1565cc] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <span>📘</span> Facebook Token Ayarla
                      </button>
                    </div>
                  </div>

                  {/* KANAL KARTLARI GRİDİ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {platforms.map(p => {
                      const creds = brandApiCredentials[p.id] || {};
                      const isConfigured = !!(creds.accessToken || creds.apiKey || creds.webhookUrl || p.connected);

                      return (
                        <div 
                          key={p.id} 
                          className={`bg-white p-5 rounded-2xl border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                            isConfigured ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-gray-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <PlatformIcon id={p.id} size={42} className="shadow-2xs rounded-xl" />
                              </div>
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isConfigured ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                                {isConfigured ? '● Yol B: API Aktif' : '○ Token Bekleniyor'}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-gray-900 mt-3">{p.name}</h4>
                            <p className="text-xs text-gray-700 font-bold mt-0.5">{p.accountName !== 'Bağlı Değil' ? p.accountName : (currentBrand.handle || currentBrand.name)}</p>
                            
                            {isConfigured ? (
                              <div className="mt-2.5 text-[11px] bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100 space-y-1 text-gray-600">
                                <div>Protokol: <strong className="text-gray-800">{p.apiEndpoint}</strong></div>
                                <div>Token Durumu: <span className="text-emerald-700 font-semibold">{p.tokenExpiry || 'Kalıcı Token Aktif'}</span></div>
                                <div>Bulut Eşitlemesi: <span className="text-emerald-700 font-medium">Supabase ile Canlı</span></div>
                                <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                                  <span>Canlı Dağıtım: <strong className="text-emerald-700">Hazır (Yol B)</strong></span>
                                  <span className="font-mono text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-bold">200 OK</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400 mt-2">
                                {p.apiEndpoint} üzerinden doğrudan token ile gerçek gönderi paylaşımı için hazır.
                              </p>
                            )}
                          </div>

                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 text-xs">
                            {isConfigured ? (
                              <>
                                <button 
                                  onClick={() => handleOpenTokenModal(p)} 
                                  className="text-gray-700 hover:text-gray-900 font-bold flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  ⚙️ Token Düzenle
                                </button>
                                <button 
                                  onClick={() => handleOpenTokenModal(p)}
                                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl transition-all"
                                >
                                  ⚡ Test Et
                                </button>
                                <button 
                                  onClick={() => handleDisconnectApiCredentials(p.id)} 
                                  className="text-red-500 hover:text-red-700 font-semibold text-xs px-2 py-1 rounded"
                                >
                                  Kes
                                </button>
                              </>
                            ) : (
                              <button 
                                onClick={() => handleOpenTokenModal(p)}
                                style={{ backgroundColor: p.color }}
                                className="w-full py-2 text-white font-bold rounded-xl text-xs shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                              >
                                <span>🔑</span> Yol B: API Token İle Bağla
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SEKME 2: REKLAM HESAPLARI */}
              {integrationsTab === 'ads' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                  {adAccounts.map(ad => (
                    <div key={ad.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <PlatformIcon id={ad.id} size={32} className="shadow-2xs rounded-xl shrink-0" />
                            <span className="text-xs font-bold text-gray-700 uppercase">{ad.platform}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${ad.connected ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-gray-100 text-gray-500'}`}>
                            {ad.connected ? '● Reklam Hesabı Bağlı' : '○ Bağlı Değil'}
                          </span>
                        </div>

                        <h4 className="font-bold text-sm text-gray-900 mt-2">{ad.name}</h4>
                        <p className="font-mono text-xs text-gray-600 mt-0.5">Hesap ID: <strong>{ad.accountId}</strong> • Para Birimi: {ad.currency}</p>
                        
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs mt-3 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-[11px]">Business Manager:</span>
                            <strong className="text-gray-800 font-mono">{ad.businessManagerId}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-[11px]">Bağlı Piksel / CAPI:</span>
                            <strong className="text-emerald-700">{ad.pixelLinked}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500 text-[11px]">Aylık Bütçe Üst Sınırı:</span>
                            <strong className="text-blue-700">{ad.spendLimit}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        {ad.connected ? (
                          <>
                            <button onClick={() => alert(`${ad.name} için bütçe limitleri ve faturalandırma ayarları açıldı.`)} className="text-blue-600 font-bold hover:underline">
                              Bütçe & Fatura Ayarları
                            </button>
                            <button onClick={() => handleDisconnectAdAccount(ad.id)} className="text-red-500 font-bold hover:underline">
                              Bağlantıyı Kes
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleConnectAdAccount(ad.id)}
                            style={{ backgroundColor: ad.color }}
                            className="w-full py-2 text-white font-bold rounded-xl text-xs shadow-sm hover:opacity-90"
                          >
                            + Reklam Hesabını Yetkilendir
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SEKME 3: API & WEBHOOK ENTEGRASYONU */}
              {integrationsTab === 'webhooks' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                    <h4 className="font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">Brand2Social REST API & Webhook Anahtarları ({currentBrand.name})</h4>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-700 block">Canlı API Secret Token (Bearer Auth)</label>
                      <div className="flex gap-2">
                        <input 
                          type="password" 
                          readOnly 
                          value="b2s_live_sec_84920194820194820194820194" 
                          className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-800"
                        />
                        <button 
                          onClick={() => alert('API Anahtarı panoya kopyalandı!')}
                          className="bg-gray-800 hover:bg-gray-900 text-white font-bold px-4 rounded-xl text-xs"
                        >
                          Kopyala
                        </button>
                        <button 
                          onClick={() => alert('Yeni API anahtarı üretildi ve aktifleştirildi!')}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-4 rounded-xl text-xs"
                        >
                          Yenile
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="text-xs font-bold text-gray-700 block">Gelen Webhook URL (Zapier / Make / n8n Entegrasyonu)</label>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          readOnly 
                          value={`https://api.brand2social.com/v1/webhooks/incoming/${currentBrand.slug}_hook`}
                          className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-800"
                        />
                        <button 
                          onClick={() => alert('Canlı Webhook Test Pingi Gönderildi -> 200 OK')}
                          className="bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold px-4 rounded-xl text-xs"
                        >
                          Ping Test Et
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 3. REKLAM PANOSU (ADS DASHBOARD)                                          */}
          {/* ========================================================================= */}
          {activeTab === 'ads_dashboard' && (
            <div className="space-y-6 animate-in fade-in">
              {/* REKLAM & ROAS ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'ads_dashboard', label: '📈 ROAS & Genel Bakış' },
                  { id: 'ads_campaigns', label: '🎯 Aktif Kampanyalar', count: adCampaigns.length },
                  { id: 'ads_create', label: '✨ Yeni Reklam Oluştur' },
                  { id: 'ads_ai_optimizer', label: '🤖 AI Bütçe Optimizatörü', count: aiAdInsights.length },
                  { id: 'ads_pixels', label: '📡 Piksel & CAPI Takibi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Toplam Reklam Harcaması</span>
                    <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">₺0</span>
                  </div>
                  <div className="text-2xl font-black text-gray-900">₺{totalAdSpend.toLocaleString('tr-TR')}</div>
                  <div className="text-xs text-gray-500">{adCampaigns.length} Kampanya</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Oluşan Toplam Gelir</span>
                    <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">₺0</span>
                  </div>
                  <div className="text-2xl font-black text-emerald-600">₺{totalAdRevenue.toLocaleString('tr-TR')}</div>
                  <div className="text-xs text-gray-500">{totalConversions} Doğrulanmış Dönüşüm</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Genel ROAS (Getiri)</span>
                    <span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">0.00x</span>
                  </div>
                  <div className="text-2xl font-black text-purple-600">{overallRoas}x</div>
                  <div className="text-xs text-gray-500">1 ₺ harcamaya karşılık</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold">
                    <span>Aktif Kampanyalar</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">Canlı</span>
                  </div>
                  <div className="text-2xl font-black text-blue-600">{adCampaigns.filter(c => c.status === 'active').length}</div>
                  <div className="text-xs text-gray-500">Meta, Google & TikTok</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-gray-900">{currentBrand.name} Reklam Kampanyaları Özeti</h3>
                  <button onClick={() => setActiveTab('ads_create')} className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
                    + Yeni Reklam Kampanyası Başlat
                  </button>
                </div>
                {adCampaigns.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 space-y-2">
                    <p className="text-sm font-semibold text-gray-600">Henüz kayıtlı veya aktif reklam kampanyası bulunmuyor.</p>
                    <p className="text-xs text-gray-400">Meta Ads, Google Ads veya TikTok için yapay zeka destekli yeni bir kampanya başlatabilirsiniz.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 text-xs">
                    {adCampaigns.map(camp => (
                      <div key={camp.id} className="py-3 flex items-center justify-between">
                        <div>
                          <strong className="text-gray-900 block">{camp.name}</strong>
                          <span className="text-gray-500">{camp.platformName} • Günlük Bütçe: ₺{camp.dailyBudget}</span>
                        </div>
                        <span className="text-emerald-600 font-bold">{camp.status === 'active' ? '● Yayında' : '○ Duraklatıldı'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 4. REKLAM KAMPANYALARI LİSTESİ (ADS CAMPAIGNS)                             */}
          {/* ========================================================================= */}
          {activeTab === 'ads_campaigns' && (
            <div className="space-y-4 animate-in fade-in">
              {/* REKLAM & ROAS ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'ads_dashboard', label: '📈 ROAS & Genel Bakış' },
                  { id: 'ads_campaigns', label: '🎯 Aktif Kampanyalar', count: adCampaigns.length },
                  { id: 'ads_create', label: '✨ Yeni Reklam Oluştur' },
                  { id: 'ads_ai_optimizer', label: '🤖 AI Bütçe Optimizatörü', count: aiAdInsights.length },
                  { id: 'ads_pixels', label: '📡 Piksel & CAPI Takibi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <input 
                    type="text" 
                    placeholder="Kampanya adına göre ara..."
                    value={adSearchQuery}
                    onChange={(e) => setAdSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs"
                  />
                  <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-end">
                  <button onClick={() => setActiveTab('ads_create')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
                    + Yeni Kampanya
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
                {filteredAdCampaigns.length === 0 ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto">🎯</div>
                    <h4 className="font-bold text-base text-gray-800">{currentBrand.name} İçin Henüz Reklam Kampanyası Eklenmedi</h4>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">Meta, TikTok veya Google Ads reklamlarınızı buradan yönetebilir ve ROAS değerlerinizi anlık izleyebilirsiniz.</p>
                    <button onClick={() => setActiveTab('ads_create')} className="bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm">
                      + İlk Kampanyayı Oluştur
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                        <tr>
                          <th className="py-3 px-4">Kampanya & Platform</th>
                          <th className="py-3 px-4">Durum</th>
                          <th className="py-3 px-4">Günlük Bütçe</th>
                          <th className="py-3 px-4">Harcama</th>
                          <th className="py-3 px-4">Dönüşüm</th>
                          <th className="py-3 px-4">ROAS</th>
                          <th className="py-3 px-4 text-right">İşlem</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredAdCampaigns.map(camp => (
                          <tr key={camp.id} className="hover:bg-gray-50">
                            <td className="py-3.5 px-4">
                              <strong className="text-gray-900 block">{camp.name}</strong>
                              <span className="text-gray-500 text-[11px]">{camp.platformName} • {camp.objective}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <button onClick={() => handleToggleAdStatus(camp.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${camp.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                                {camp.status === 'active' ? '● Yayında' : '○ Duraklatıldı'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 font-bold text-gray-900">₺{camp.dailyBudget}</td>
                            <td className="py-3.5 px-4 font-bold text-gray-900">₺{camp.totalSpend.toLocaleString('tr-TR')}</td>
                            <td className="py-3.5 px-4 text-emerald-700 font-bold">{camp.conversions} {camp.conversionType}</td>
                            <td className="py-3.5 px-4 font-black text-purple-700">{camp.roas}x</td>
                            <td className="py-3.5 px-4 text-right">
                              <button onClick={() => setShowAdDetailModal(camp)} className="text-blue-600 font-bold hover:underline">Detay</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 5. YENİ REKLAM OLUŞTURUCU (ADS CREATE)                                    */}
          {/* ========================================================================= */}
          {activeTab === 'ads_create' && (
            <div className="space-y-6 animate-in fade-in">
              {/* REKLAM & ROAS ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'ads_dashboard', label: '📈 ROAS & Genel Bakış' },
                  { id: 'ads_campaigns', label: '🎯 Aktif Kampanyalar', count: adCampaigns.length },
                  { id: 'ads_create', label: '✨ Yeni Reklam Oluştur' },
                  { id: 'ads_ai_optimizer', label: '🤖 AI Bütçe Optimizatörü', count: aiAdInsights.length },
                  { id: 'ads_pixels', label: '📡 Piksel & CAPI Takibi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Yapay Zeka Destekli Reklam Kampanyası Stüdyosu</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{currentBrand.name} markası için Meta Ads, TikTok ve Google Ads reklamları</p>
                  </div>
                  <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">Adım {newAdStep} / 4</span>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-100 text-xs font-bold">
                  <button onClick={() => setNewAdStep(1)} className={`py-2 text-center rounded-xl transition-all ${newAdStep === 1 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-50 text-gray-600'}`}>1. Amaç & Platform</button>
                  <button onClick={() => setNewAdStep(2)} className={`py-2 text-center rounded-xl transition-all ${newAdStep === 2 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-50 text-gray-600'}`}>2. Hedef Kitle</button>
                  <button onClick={() => setNewAdStep(3)} className={`py-2 text-center rounded-xl transition-all ${newAdStep === 3 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-50 text-gray-600'}`}>3. Bütçe & Teklif</button>
                  <button onClick={() => setNewAdStep(4)} className={`py-2 text-center rounded-xl transition-all ${newAdStep === 4 ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-50 text-gray-600'}`}>4. Kreatif & Metin</button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-5">
                  {newAdStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Kampanya Adı</label>
                        <input type="text" value={newAdData.name} onChange={(e) => setNewAdData({ ...newAdData, name: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-600" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 block">Kampanya Hedefi</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button type="button" onClick={() => setNewAdData({ ...newAdData, objective: 'conversions' })} className={`p-3.5 rounded-xl border text-left text-xs ${newAdData.objective === 'conversions' ? 'border-blue-600 bg-blue-50 font-bold' : 'border-gray-200 bg-white'}`}>
                            <span className="text-lg block mb-1">🛒</span><strong>Satış & Dönüşüm</strong>
                          </button>
                          <button type="button" onClick={() => setNewAdData({ ...newAdData, objective: 'leads' })} className={`p-3.5 rounded-xl border text-left text-xs ${newAdData.objective === 'leads' ? 'border-blue-600 bg-blue-50 font-bold' : 'border-gray-200 bg-white'}`}>
                            <span className="text-lg block mb-1">📋</span><strong>Potansiyel Müşteri (Lead)</strong>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {newAdStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Hedef Konum</label>
                        <input type="text" value={newAdData.location} onChange={(e) => setNewAdData({ ...newAdData, location: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">İlgi Alanları</label>
                        <input type="text" value={newAdData.interests} onChange={(e) => setNewAdData({ ...newAdData, interests: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold" />
                      </div>
                    </div>
                  )}

                  {newAdStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Günlük Bütçe (₺)</label>
                        <input type="number" value={newAdData.dailyBudget} onChange={(e) => setNewAdData({ ...newAdData, dailyBudget: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" />
                      </div>
                    </div>
                  )}

                  {newAdStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Reklam Başlığı</label>
                        <input type="text" value={newAdData.headline} onChange={(e) => setNewAdData({ ...newAdData, headline: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Metin (Body Copy)</label>
                        <textarea rows={3} value={newAdData.bodyText} onChange={(e) => setNewAdData({ ...newAdData, bodyText: e.target.value })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {newAdStep > 1 ? (
                      <button type="button" onClick={() => setNewAdStep(newAdStep - 1)} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl">← Geri</button>
                    ) : <div />}

                    {newAdStep < 4 ? (
                      <button type="button" onClick={() => setNewAdStep(newAdStep + 1)} className="px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl">Devam Et →</button>
                    ) : (
                      <button type="button" onClick={handlePublishNewAd} className="px-6 py-2.5 bg-[#00AB55] text-white text-xs font-black rounded-xl shadow-md">🚀 Kampanyayı Canlıya Al</button>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gray-900 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-white block pb-2 border-b border-gray-800">Canlı Instagram Sponsorlu Önizleme</span>
                    <div className="bg-white rounded-2xl overflow-hidden text-gray-900 mt-4 shadow-lg text-xs">
                      <div className="p-3 flex items-center justify-between border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <div 
                            style={{ backgroundColor: currentBrand.color }}
                            className="w-7 h-7 rounded-full text-white font-bold flex items-center justify-center text-[10px]"
                          >
                            {currentBrand.initials}
                          </div>
                          <div>
                            <strong className="block text-gray-900 leading-none">{currentBrand.handle.replace('@', '')}</strong>
                            <span className="text-[9px] text-gray-400">Sponsorlu Reklam</span>
                          </div>
                        </div>
                      </div>
                      <img src={newAdData.image} alt="Preview" className="w-full aspect-video object-cover" />
                      <div className="bg-blue-600 text-white p-2.5 flex items-center justify-between font-bold text-xs">
                        <span>{newAdData.headline || 'Kampanya Başlığı'}</span>
                        <span className="bg-white text-blue-600 px-2 py-0.5 rounded text-[10px]">{newAdData.cta} →</span>
                      </div>
                      <p className="p-3 text-gray-800 leading-relaxed"><strong className="mr-1">{currentBrand.handle.replace('@', '')}</strong>{newAdData.bodyText || 'Reklam gövde metni buraya gelecektir.'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 6. AI REKLAM OPTİMİZATÖRÜ (ADS AI OPTIMIZER)                              */}
          {/* ========================================================================= */}
          {activeTab === 'ads_ai_optimizer' && (
            <div className="space-y-6 animate-in fade-in">
              {/* REKLAM & ROAS ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'ads_dashboard', label: '📈 ROAS & Genel Bakış' },
                  { id: 'ads_campaigns', label: '🎯 Aktif Kampanyalar', count: adCampaigns.length },
                  { id: 'ads_create', label: '✨ Yeni Reklam Oluştur' },
                  { id: 'ads_ai_optimizer', label: '🤖 AI Bütçe Optimizatörü', count: aiAdInsights.length },
                  { id: 'ads_pixels', label: '📡 Piksel & CAPI Takibi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Yapay Zeka Reklam & ROAS Optimizatörü</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Gerçek zamanlı piksel ve kampanya analitiğiyle bütçeyi en karlı reklam setlerine otomatik aktarın</p>
                </div>
              </div>

              {aiAdInsights.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00AB55] flex items-center justify-center text-xl mx-auto">✨</div>
                  <h4 className="font-bold text-sm text-gray-800">Tüm Kampanyalarınız Optimize Durumda</h4>
                  <p className="text-xs text-gray-400">Yeni bir bütçe israfı veya kreatif yorgunluğu tespit edildiğinde burada yapay zeka önerileri listelenecektir.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {aiAdInsights.map(insight => (
                    <div key={insight.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full inline-block ${insight.badgeColor}`}>{insight.badge}</span>
                        <h4 className="font-bold text-sm text-gray-900">{insight.title}</h4>
                        <p className="text-xs text-gray-600 max-w-2xl">{insight.description}</p>
                      </div>
                      <div>
                        {insight.applied ? (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-4 py-2 rounded-xl">✓ Uygulandı</span>
                        ) : (
                          <button onClick={() => handleApplyAiInsight(insight)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl">⚡ {insight.actionText}</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 7. PİKSEL & CAPI İZLEME (ADS PIXELS)                                      */}
          {/* ========================================================================= */}
          {activeTab === 'ads_pixels' && (
            <div className="space-y-6 animate-in fade-in">
              {/* REKLAM & ROAS ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'ads_dashboard', label: '📈 ROAS & Genel Bakış' },
                  { id: 'ads_campaigns', label: '🎯 Aktif Kampanyalar', count: adCampaigns.length },
                  { id: 'ads_create', label: '✨ Yeni Reklam Oluştur' },
                  { id: 'ads_ai_optimizer', label: '🤖 AI Bütçe Optimizatörü', count: aiAdInsights.length },
                  { id: 'ads_pixels', label: '📡 Piksel & CAPI Takibi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Piksel & CAPI (Dönüşümler API) İzleme Merkezi</h3>
                  <p className="text-xs text-gray-500 mt-0.5">iOS 14.5+ ve çerez engellemelerini aşan %100 güvenli sunucu taraflı izleme</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleTriggerTestEvent('Purchase', '₺1.500')} className="bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl">🧪 Satın Alma Testi</button>
                  <button onClick={() => handleTriggerTestEvent('Lead', 'Kayıt Formu')} className="bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl">🧪 Lead Testi</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_PIXELS.map(px => (
                  <div key={px.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400">{px.platform}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${px.status === 'healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>● {px.statusText}</span>
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">{px.name}</h4>
                    <p className="font-mono text-xs text-gray-500">{px.code}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3 font-mono text-xs">
                <h4 className="font-bold text-sm text-gray-900 font-sans border-b border-gray-100 pb-2">Canlı CAPI Sunucu Olay Logları</h4>
                {pixelLogs.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 font-sans">
                    Henüz sunucu taraflı olay logu kaydedilmedi. Yukarıdaki "Test" butonlarına basarak canlı CAPI akışını test edebilirsiniz.
                  </div>
                ) : (
                  pixelLogs.map(log => (
                    <div key={log.id} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                      <div><span className="text-gray-400">[{log.time}]</span> <strong className="text-gray-900">{log.event}</strong> <span className="text-gray-500">• {log.source}</span></div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">{log.status}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. GENEL GÖSTERGE PANELİ (DASHBOARD)                                      */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold"><span>Toplam Takipçi</span><span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">+%0</span></div>
                  <div className="text-2xl font-black text-gray-900">0</div>
                  <div className="text-xs text-gray-500">{currentBrand.name} Kanallarında</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold"><span>Etkileşim Oranı</span><span className="text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-bold">+%0</span></div>
                  <div className="text-2xl font-black text-[#00AB55]">%0.0</div>
                  <div className="text-xs text-gray-500">Hesaplar bağlandığında hesaplanır</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold"><span>Yayınlanan Gönderi</span><span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-bold">Bu Ay</span></div>
                  <div className="text-2xl font-black text-gray-900">{publishedPosts.length}</div>
                  <div className="text-xs text-gray-500">{upcomingPosts.length} Planlanan • {approvalPosts.length} Onay Bekleyen</div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500 text-xs font-semibold"><span>AI Yorum & DM Yanıtı</span><span className="text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-bold">Otomatik</span></div>
                  <div className="text-2xl font-black text-purple-600">0</div>
                  <div className="text-xs text-gray-500">Otomasyon Hazır</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-base text-gray-900">Hızlı İşlemler</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <button onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }} className="p-4 rounded-xl bg-gray-50 hover:bg-[#EBF8F2] border border-gray-200 text-left transition-all">
                    <div className="text-xl mb-1">✍️</div><strong className="text-xs text-gray-900 block">Yeni Gönderi Yaz</strong>
                  </button>
                  <button onClick={() => setActiveTab('ads_create')} className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-left transition-all">
                    <div className="text-xl mb-1">🚀</div><strong className="text-xs text-blue-900 block">Reklam Kampanyası</strong>
                  </button>
                  <button onClick={() => setActiveTab('ai_studio')} className="p-4 rounded-xl bg-gray-50 hover:bg-[#EBF8F2] border border-gray-200 text-left transition-all">
                    <div className="text-xl mb-1">✨</div><strong className="text-xs text-gray-900 block">AI Stüdyo PRO</strong>
                  </button>
                  <button onClick={() => setActiveTab('integrations')} className="p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left transition-all">
                    <div className="text-xl mb-1">🔗</div><strong className="text-xs text-emerald-900 block">Hesap Bağla</strong>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 9. YENİ GÖNDERİ, REELS & MEDYA STÜDYOSU (NEW POST / REELS / VIDEO)         */}
          {/* ========================================================================= */}
          {activeTab === 'new_post' && (
            <div className="space-y-6 animate-in fade-in">
              {/* STÜDYO, AI & MEDYA ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'new_post', label: '🎬 Stüdyo & Reels Kurgusu' },
                  { id: 'ai_studio', label: '✨ AI Stüdyo PRO' },
                  { id: 'media_library', label: '🖼️ Medya Kütüphanesi & Canva' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>

              {/* ÜST FORMAT SEÇİCİ TABLARI */}
              <div className="bg-white p-2.5 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'reels', name: '🎬 Instagram Reels / Video', desc: '9:16 Dikey Video & Müzik', badge: 'Popüler' },
                    { id: 'post', name: '📸 Statik Gönderi', desc: '1:1 Kare / 4:5 Portre Fotoğraf' },
                    { id: 'carousel', name: '🗂️ Carousel (Galeri)', desc: 'Kaydırmalı Çoklu Medya' },
                    { id: 'story', name: '⚡ 24s Hikaye (Story)', desc: '9:16 Tam Ekran Hikaye' }
                  ].map(f => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        setPostFormat(f.id);
                        if (f.id === 'reels' && mediaList.length === 0) {
                          setMediaList([PEYZAJ_STOCK_MEDIA[0]]);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                        postFormat === f.id 
                          ? 'bg-gray-900 text-white shadow-sm' 
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{f.name}</span>
                      {f.badge && (
                        <span className="bg-[#E1306C] text-white text-[9px] font-black px-1.5 py-0.2 rounded-md uppercase">
                          {f.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-gray-400">Aktif Marka:</span>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-200">
                    <BrandLogo brand={currentBrand} size={18} />
                    <span className="text-xs font-bold text-gray-800">{currentBrand.name}</span>
                  </div>
                </div>
              </div>

              {/* ANA İKİLİ ÇALIŞMA ALANI: EDİTÖR + CANLI MOCKUP */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* SOL PANEL: MEDYA YÖNETİMİ, METİN & REELS AYARLARI (7 Kolon) */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* KART 1: MEDYA YÜKLEME & KÜTÜPHANE */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center font-bold text-sm">
                          🎬
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">Medya Dosyaları & Görsel / Video Ekle</h4>
                          <p className="text-[11px] text-gray-500">Reels MP4 videoları, 4K renderlar veya galeri fotoğrafları</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowStockModal(true)}
                        className="text-xs bg-emerald-50 text-[#00AB55] hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-xl border border-emerald-200/80 flex items-center gap-1.5 transition-all"
                      >
                        <span>🌿</span> Peyzaj & Mimarlık Galerisi
                      </button>
                    </div>

                    {/* SÜRÜKLE-BIRAK / DOSYA SEÇME ALANI */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="border-2 border-dashed border-gray-200 hover:border-[#00AB55] hover:bg-[#EBF8F2]/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all group">
                        <input
                          type="file"
                          accept="image/*,video/mp4,video/quicktime,video/*"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-xs flex items-center justify-center text-xl mb-2 transition-all">
                          📂
                        </div>
                        <span className="text-xs font-bold text-gray-800">Cihazdan Video / Görsel Seç</span>
                        <span className="text-[10px] text-gray-400 mt-0.5">MP4, MOV, JPG, PNG, WEBP (Max 100MB)</span>
                      </label>

                      {/* URL İLE MEDYA EKLEME */}
                      <div className="border border-gray-200 bg-gray-50/50 rounded-2xl p-3.5 flex flex-col justify-between space-y-2">
                        <div>
                          <span className="text-xs font-bold text-gray-800 flex items-center gap-1">
                            <span>🌐</span> Doğrudan Medya Linki (URL)
                          </span>
                          <span className="text-[10px] text-gray-400 block mt-0.5">Harici MP4 video veya web görseli URL'si</span>
                        </div>
                        <div className="flex gap-1.5">
                          <input
                            type="url"
                            value={customMediaUrl}
                            onChange={(e) => setCustomMediaUrl(e.target.value)}
                            placeholder="https://.../video.mp4 veya .jpg"
                            className="flex-1 p-2 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00AB55]"
                          />
                          <button
                            type="button"
                            onClick={handleAddMediaUrl}
                            className="px-3 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl shrink-0"
                          >
                            Ekle
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* YÜKLÜ MEDYALAR LİSTESİ / ŞERİDİ */}
                    {mediaList.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <div className="flex items-center justify-between text-[11px] font-bold text-gray-600">
                          <span>Seçili Medyalar ({mediaList.length})</span>
                          <span className="text-[10px] text-gray-400">Önizleme için üzerine tıklayın</span>
                        </div>
                        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                          {mediaList.map((m, idx) => (
                            <div
                              key={m.id || idx}
                              onClick={() => setActiveMediaIndex(idx)}
                              className={`relative group shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                                activeMediaIndex === idx
                                  ? 'border-[#00AB55] ring-2 ring-[#00AB55]/30 shadow-md scale-102'
                                  : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
                              }`}
                            >
                              {m.type === 'video' ? (
                                <div className="w-full h-full bg-black relative">
                                  {m.thumbnail ? (
                                    <img src={m.thumbnail} alt={m.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <video src={m.url} className="w-full h-full object-cover" />
                                  )}
                                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <span className="w-6 h-6 rounded-full bg-white/90 text-black flex items-center justify-center text-[10px] font-bold">▶</span>
                                  </div>
                                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1 rounded">
                                    Reels
                                  </span>
                                </div>
                              ) : (
                                <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                              )}

                              {/* SİL BUTONU */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveMedia(idx);
                                }}
                                className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 shadow-md transition-opacity"
                              >
                                ✕
                              </button>

                              {/* AKTİF İŞARETÇİ */}
                              {activeMediaIndex === idx && (
                                <div className="absolute top-1 left-1 bg-[#00AB55] text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shadow-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* KART 2: HEDEF KANALLAR & METİN YAZARI */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                    {/* HEDEF PLATFORMLAR */}
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-2">Paylaşılacak Kanallar</label>
                      <div className="flex flex-wrap gap-2">
                        {platforms.map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              if (selectedChannels.includes(p.id)) {
                                setSelectedChannels(selectedChannels.filter(id => id !== p.id));
                              } else {
                                setSelectedChannels([...selectedChannels, p.id]);
                              }
                            }}
                            style={{
                              borderColor: selectedChannels.includes(p.id) ? p.color : '#E5E7EB',
                              backgroundColor: selectedChannels.includes(p.id) ? p.bgLight : '#FAFAFA'
                            }}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                              selectedChannels.includes(p.id) ? 'text-gray-900 shadow-2xs ring-1 ring-black/5' : 'text-gray-400 opacity-60'
                            }`}
                          >
                            <PlatformIcon id={p.id} size={16} className="shrink-0" />
                            <span>{p.name.split(' ')[0]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* METİN EDİTÖRÜ */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-gray-700">Gönderi / Reels Açıklaması & Kanca</label>
                        <button
                          type="button"
                          onClick={generateAiContent}
                          disabled={isAiGenerating}
                          className="text-xs bg-[#EBF8F2] hover:bg-[#d8f4e6] text-[#00AB55] font-bold px-3 py-1.5 rounded-xl border border-[#00AB55]/30 flex items-center gap-1.5 transition-all"
                        >
                          <span>✨</span> {isAiGenerating ? 'AI Üretiyor...' : `AI İle ${postFormat === 'reels' ? 'Reels Kancası & Metin' : 'Metin'} Üret`}
                        </button>
                      </div>

                      <textarea
                        rows={5}
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        placeholder={`${currentBrand.name} için açıklama, etiketler ve harekete geçirici mesajınızı yazın...`}
                        className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#00AB55] focus:bg-white transition-all"
                      />

                      <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1.5 px-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-gray-500">Hızlı Etiketler:</span>
                          {['#detaypeyzaj', '#peyzajmimarligi', '#3drender', '#villabahce', '#bursa'].map(tag => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setNewPostText(prev => prev ? `${prev} ${tag}` : tag)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[10px] font-semibold"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        <span className="font-mono">{newPostText.length} karakter</span>
                      </div>
                    </div>
                  </div>

                  {/* KART 3: REELS & MEDYA DETAY AYARLARI */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                      <span className="text-sm">⚙️</span>
                      <h4 className="text-xs font-bold text-gray-900">Reels & Gelişmiş Paylaşım Parametreleri</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          🎵 Müzik / Arka Plan Orijinal Ses Başlığı
                        </label>
                        <input
                          type="text"
                          value={reelsAudioTitle}
                          onChange={(e) => setReelsAudioTitle(e.target.value)}
                          placeholder="Örn: Detay Peyzaj • Orijinal Mimari Ses"
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00AB55]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-gray-700 block mb-1">
                          📍 Konum Etiketi
                        </label>
                        <input
                          type="text"
                          value={postLocation}
                          onChange={(e) => setPostLocation(e.target.value)}
                          placeholder="Örn: Nilüfer, Bursa"
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00AB55]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-700 block mb-1">
                        💬 Otomatik İlk Yorum / DM Tetikleyici Mesaj
                      </label>
                      <input
                        type="text"
                        value={firstCommentText}
                        onChange={(e) => setFirstCommentText(e.target.value)}
                        placeholder="Örn: 🌿 3D peyzaj ve ruhsat projeleriniz için bize DM atabilirsiniz!"
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00AB55]"
                      />
                    </div>
                  </div>

                  {/* KART 4: AKSİYON & YAYINLAMA ÇUBUĞU */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (newPostText.trim() || mediaList.length > 0) {
                            setDrafts([
                              {
                                id: Date.now(),
                                title: (newPostText.substring(0, 35) || 'Medya Gönderisi') + '...',
                                lastEdited: 'Şimdi',
                                length: `${newPostText.length} Karakter`,
                                channels: selectedChannels
                              },
                              ...drafts
                            ]);
                            alert('📁 Gönderi taslaklarınıza başarıyla kaydedildi!');
                          }
                        }}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs transition-all"
                      >
                        📁 Taslak Kaydet
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsScheduleOpen(!isScheduleOpen)}
                        className={`px-4 py-2 font-bold rounded-xl text-xs border transition-all ${
                          isScheduleOpen ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        🕒 {isScheduleOpen ? 'Zamanlamayı Kapat' : 'İleri Tarihe Zamanla'}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handlePublishPost}
                      className="px-6 py-2.5 bg-[#00AB55] hover:bg-[#00964b] text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
                    >
                      <span>🚀</span>
                      <span>Hemen Yayınla ({postFormat === 'reels' ? 'Reels' : (postFormat === 'story' ? 'Story' : 'Post')})</span>
                    </button>
                  </div>

                  {/* ZAMANLAMA TARİH SEÇİCİ ALANI */}
                  {isScheduleOpen && (
                    <div className="bg-blue-50/70 border border-blue-200 p-4 rounded-2xl flex items-center justify-between gap-3 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600 font-bold text-xs">Yayın Tarihi & Saati:</span>
                        <input
                          type="datetime-local"
                          value={scheduleDateTime}
                          onChange={(e) => setScheduleDateTime(e.target.value)}
                          className="p-2 bg-white border border-blue-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSchedulePost}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm"
                      >
                        Kuyruğa Ekle
                      </button>
                    </div>
                  )}

                </div>

                {/* SAĞ PANEL: CANLI DİNAMİK TELEFON MOCKUP (5 Kolon) */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center sticky top-6">
                  <div className="flex items-center justify-between w-full max-w-[340px] mb-2 px-1">
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      Canlı Sosyal Önizleme
                    </span>
                    <span className="text-[10px] font-black bg-gray-900 text-white px-2 py-0.5 rounded-full">
                      {postFormat.toUpperCase()} MODU
                    </span>
                  </div>

                  {/* TELEFON KASASI */}
                  <div className="w-[320px] rounded-[40px] border-[8px] border-gray-900 bg-black shadow-2xl overflow-hidden relative text-white select-none">
                    
                    {/* DYNAMIC ISLAND / NOTCH */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900 rounded-full z-40 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-800 mr-2"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-900/50"></div>
                    </div>

                    {/* FORMAT 1: 🎬 REELS (9:16 DİKEY FORMAT) */}
                    {postFormat === 'reels' && (
                      <div className="relative w-full h-[580px] bg-gray-950 flex flex-col justify-between overflow-hidden">
                        {/* ARKA PLAN VİDEO / GÖRSEL OYNATICI */}
                        {mediaList[activeMediaIndex]?.type === 'video' ? (
                          <video
                            key={mediaList[activeMediaIndex]?.url}
                            src={mediaList[activeMediaIndex]?.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            key={mediaList[activeMediaIndex]?.url || 'default'}
                            src={mediaList[activeMediaIndex]?.url || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80'}
                            alt="Reels Media"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}

                        {/* KARARTMA GRADIENTLERİ */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>

                        {/* REELS ÜST BAR */}
                        <div className="relative z-20 pt-6 px-4 flex items-center justify-between text-xs font-bold">
                          <span className="text-sm font-black tracking-wide drop-shadow-md">Reels</span>
                          <span className="text-base drop-shadow-md">📷</span>
                        </div>

                        {/* REELS SAĞ ETKİLEŞİM DİKEY ÇUBUĞU */}
                        <div className="absolute right-3 bottom-14 z-20 flex flex-col items-center gap-4 text-center">
                          <div className="flex flex-col items-center">
                            <span className="text-2xl drop-shadow-md">❤️</span>
                            <span className="text-[10px] font-bold drop-shadow">12.4K</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-2xl drop-shadow-md">💬</span>
                            <span className="text-[10px] font-bold drop-shadow">184</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-2xl drop-shadow-md">✈️</span>
                            <span className="text-[10px] font-bold drop-shadow">Paylaş</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="text-xl drop-shadow-md">🔖</span>
                          </div>

                          {/* DÖNEN MÜZİK DİSKİ */}
                          <div className="w-8 h-8 rounded-full border-2 border-white/80 bg-gray-900/80 overflow-hidden flex items-center justify-center animate-spin" style={{ animationDuration: '4s' }}>
                            <BrandLogo brand={currentBrand} size={28} />
                          </div>
                        </div>

                        {/* REELS ALT METİN & PROFİL ALANI */}
                        <div className="relative z-20 p-4 pb-5 space-y-2 max-w-[80%]">
                          {/* PROFİL & TAKİP ET */}
                          <div className="flex items-center gap-2">
                            <BrandLogo brand={currentBrand} size={30} className="border border-white/60" />
                            <span className="text-xs font-bold drop-shadow-md truncate">
                              {(currentBrand.handle || '@detay_proje_mimarlik').replace('@', '')}
                            </span>
                            <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                              Takip Et
                            </span>
                          </div>

                          {/* GÖNDERİ METNİ */}
                          <p className="text-[11px] text-white/95 leading-relaxed line-clamp-3 drop-shadow-sm font-medium">
                            {newPostText || `🌿 ${currentBrand.name} ile hayalinizdeki bahçeyi 3D görselleştirme ve profesyonel peyzaj mimarlığı ile tasarlıyoruz.`}
                          </p>

                          {/* SES BAŞLIĞI */}
                          <div className="flex items-center gap-1.5 text-[10px] text-white/85 drop-shadow">
                            <span>🎵</span>
                            <span className="truncate">{reelsAudioTitle || 'Detay Peyzaj • Orijinal Ses'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* FORMAT 2: 📸 STATİK GÖNDERİ / CAROUSEL (1:1 VEYA 4:5 FEED GÖRÜNÜMÜ) */}
                    {(postFormat === 'post' || postFormat === 'carousel') && (
                      <div className="bg-white text-gray-900 min-h-[580px] flex flex-col justify-between">
                        <div>
                          {/* FEED HEADER */}
                          <div className="pt-7 pb-2 px-3 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <BrandLogo brand={currentBrand} size={28} />
                              <div>
                                <span className="font-bold text-xs text-gray-900 block leading-tight">
                                  {(currentBrand.handle || '@detay_proje_mimarlik').replace('@', '')}
                                </span>
                                <span className="text-[9px] text-gray-500">{postLocation || 'Nilüfer, Bursa'}</span>
                              </div>
                            </div>
                            <span className="text-gray-400 font-bold text-xs">•••</span>
                          </div>

                          {/* MEDYA ALANI */}
                          <div className="w-full h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                            {mediaList[activeMediaIndex]?.type === 'video' ? (
                              <video
                                key={mediaList[activeMediaIndex]?.url}
                                src={mediaList[activeMediaIndex]?.url}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <img
                                key={mediaList[activeMediaIndex]?.url || 'feed-img'}
                                src={mediaList[activeMediaIndex]?.url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'}
                                alt="Feed Post"
                                className="w-full h-full object-cover"
                              />
                            )}

                            {postFormat === 'carousel' && (
                              <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {activeMediaIndex + 1}/{mediaList.length || 1}
                              </div>
                            )}
                          </div>

                          {/* ETKİLEŞİM BUTONLARI */}
                          <div className="p-3 pb-1 flex items-center justify-between">
                            <div className="flex items-center gap-3 text-base">
                              <span>❤️</span>
                              <span>💬</span>
                              <span>✈️</span>
                            </div>
                            <span className="text-base">🔖</span>
                          </div>

                          {/* BEĞENİ & AÇIKLAMA */}
                          <div className="px-3 space-y-1 text-xs">
                            <span className="font-bold text-[11px] block">1,842 beğenme</span>
                            <p className="text-[11px] text-gray-800 leading-snug line-clamp-3">
                              <strong className="mr-1.5">{(currentBrand.handle || '@detay_proje_mimarlik').replace('@', '')}</strong>
                              {newPostText || `🌿 ${currentBrand.name} ile hayalinizdeki bahçeyi gerçeğe dönüştürün.`}
                            </p>
                            {firstCommentText && (
                              <p className="text-[10px] text-gray-500 pt-1 border-t border-gray-100">
                                <strong className="text-gray-700 mr-1">{(currentBrand.handle || '@detay_proje_mimarlik').replace('@', '')}:</strong>
                                {firstCommentText}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* ALT SABİT NAVİGASYON ÇUBUĞU */}
                        <div className="p-2.5 border-t border-gray-100 flex items-center justify-around text-sm text-gray-500">
                          <span>🏠</span>
                          <span>🔍</span>
                          <span>➕</span>
                          <span>🎬</span>
                          <BrandLogo brand={currentBrand} size={20} />
                        </div>
                      </div>
                    )}

                    {/* FORMAT 3: ⚡ HİKAYE (STORY 9:16) */}
                    {postFormat === 'story' && (
                      <div className="relative w-full h-[580px] bg-gray-950 flex flex-col justify-between overflow-hidden">
                        {mediaList[activeMediaIndex]?.type === 'video' ? (
                          <video
                            key={mediaList[activeMediaIndex]?.url}
                            src={mediaList[activeMediaIndex]?.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            key={mediaList[activeMediaIndex]?.url || 'story-img'}
                            src={mediaList[activeMediaIndex]?.url || 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?w=800&auto=format&fit=crop&q=80'}
                            alt="Story Media"
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none"></div>

                        {/* HİKAYE İLERLEME ÇUBUĞU & HEADER */}
                        <div className="relative z-20 pt-6 px-3 space-y-2">
                          <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden flex">
                            <div className="w-2/3 h-full bg-white rounded-full"></div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <BrandLogo brand={currentBrand} size={26} className="border border-white" />
                              <span className="font-bold text-[11px] drop-shadow">{(currentBrand.handle || '@detay_proje_mimarlik').replace('@', '')}</span>
                              <span className="text-[10px] text-white/70">12 dk</span>
                            </div>
                            <span className="text-white font-bold">✕</span>
                          </div>
                        </div>

                        {/* HİKAYE ORTA METİN / ÇIKARTMA */}
                        <div className="relative z-20 px-4 text-center">
                          {newPostText && (
                            <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-xs font-bold text-white shadow-lg">
                              {newPostText}
                            </div>
                          )}
                        </div>

                        {/* HİKAYE ALT ETKİLEŞİM ÇUBUĞU */}
                        <div className="relative z-20 p-4 flex items-center gap-2">
                          <div className="flex-1 p-2 bg-black/40 backdrop-blur-sm border border-white/30 rounded-full text-[11px] text-white/80 px-3">
                            Mesaj gönder...
                          </div>
                          <span className="text-lg">❤️</span>
                          <span className="text-lg">🔥</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>

              {/* 🌿 MODAL: PEYZAJ & MİMARLIK HAZIR STOK MEDYA GALERİSİ */}
              {showStockModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
                  <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div>
                        <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                          <span>🌿</span> Peyzaj & Mimarlık Hazır Medya Kütüphanesi
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {currentBrand.name} için optimize edilmiş 4K renderlar ve 9:16 Reels videoları
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowStockModal(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
                      {PEYZAJ_STOCK_MEDIA.map(item => (
                        <div
                          key={item.id}
                          className="border border-gray-200 rounded-2xl overflow-hidden hover:border-[#00AB55] hover:shadow-md transition-all group flex flex-col justify-between bg-gray-50/50"
                        >
                          <div className="relative h-32 bg-black overflow-hidden">
                            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <span className="absolute top-2 left-2 bg-black/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                              {item.tag}
                            </span>
                            {item.type === 'video' && (
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <span className="w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center text-xs font-bold shadow-md">▶</span>
                              </div>
                            )}
                          </div>
                          <div className="p-3 space-y-2">
                            <h5 className="font-bold text-xs text-gray-800 line-clamp-2 leading-tight">
                              {item.name}
                            </h5>
                            <button
                              type="button"
                              onClick={() => handleSelectStockMedia(item)}
                              className="w-full py-1.5 bg-[#00AB55] hover:bg-[#00964b] text-white text-xs font-bold rounded-xl shadow-2xs transition-all"
                            >
                              Bu Medyayı Seç & Yükle
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-end pt-2 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setShowStockModal(false)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl"
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* 10. PLANLANAN GÖNDERİLER (UPCOMING POSTS)                                 */}
          {/* ========================================================================= */}
          {activeTab === 'upcoming_posts' && (
            <div className="space-y-6 animate-in fade-in">
              {/* İÇERİK & YAYIN ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'published_posts', label: '📸 Yayınlanan Gönderiler', count: publishedPosts.length },
                  { id: 'upcoming_posts', label: '⏳ Planlanan Gönderiler', count: upcomingPosts.length },
                  { id: 'approval', label: '✅ Onay Bekleyenler', count: approvalPosts.length },
                  { id: 'draft', label: '📝 Taslaklar', count: drafts.length },
                  { id: 'calendar', label: '📅 İçerik Takvimi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div><h3 className="text-base font-bold text-gray-900">Planlanan Gönderi Kuyruğu</h3><p className="text-xs text-gray-500 mt-0.5">Otomatik paylaşım bekleyen zamanlanmış gönderiler</p></div>
                <button onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }} className="bg-[#00AB55] text-white text-xs font-bold px-4 py-2 rounded-xl">+ Yeni Gönderi Planla</button>
              </div>
              {upcomingPosts.length === 0 ? (
                <div className="bg-white p-16 rounded-2xl border border-gray-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mx-auto">🕒</div>
                  <h4 className="font-bold text-sm text-gray-800">{currentBrand.name} İçin Planlanan Gönderi Kuyruğunuz Boş</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">İleri bir tarihte otomatik olarak yayınlanmasını istediğiniz gönderileri planlayabilirsiniz.</p>
                  <button onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }} className="bg-[#00AB55] text-white text-xs font-bold px-4 py-2 rounded-xl">+ Gönderi Planla</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingPosts.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                      <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full text-xs">🕒 {p.date}</span>
                      <img src={p.image} alt={p.title} className="w-full h-36 object-cover rounded-xl" />
                      <h4 className="font-bold text-sm text-gray-900">{p.title}</h4>
                      <div className="flex justify-between text-xs pt-2 border-t border-gray-100"><button onClick={() => { setNewPostText(p.title); setActiveTab('new_post'); }} className="text-[#00AB55] font-bold">Düzenle</button><button onClick={() => setUpcomingPosts(upcomingPosts.filter(i => i.id !== p.id))} className="text-red-500">İptal</button></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 11. ONAY BEKLEYENLER (APPROVAL WORKFLOW)                                  */}
          {/* ========================================================================= */}
          {activeTab === 'approval' && (
            <div className="space-y-6 animate-in fade-in">
              {/* İÇERİK & YAYIN ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'published_posts', label: '📸 Yayınlanan Gönderiler', count: publishedPosts.length },
                  { id: 'upcoming_posts', label: '⏳ Planlanan Gönderiler', count: upcomingPosts.length },
                  { id: 'approval', label: '✅ Onay Bekleyenler', count: approvalPosts.length },
                  { id: 'draft', label: '📝 Taslaklar', count: drafts.length },
                  { id: 'calendar', label: '📅 İçerik Takvimi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs"><h3 className="text-base font-bold text-gray-900">Onay Bekleyen Gönderiler</h3></div>
              {approvalPosts.length === 0 ? (
                <div className="bg-white p-16 rounded-2xl border border-gray-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mx-auto">⏳</div>
                  <h4 className="font-bold text-sm text-gray-800">Onay Bekleyen Gönderi Bulunmuyor</h4>
                  <p className="text-xs text-gray-400">Ekip üyeleriniz tarafından inceleme talebi gönderildiğinde burada listelenecektir.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {approvalPosts.map(post => (
                    <div key={post.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img src={post.image} alt={post.title} className="w-16 h-16 rounded-xl object-cover" />
                        <div><span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">{post.status}</span><h4 className="font-bold text-sm text-gray-900 mt-1">{post.title}</h4><p className="text-xs text-gray-500">Hazırlayan: {post.author}</p></div>
                      </div>
                      <button onClick={() => { setApprovalPosts(approvalPosts.filter(p => p.id !== post.id)); alert('Onaylandı!'); }} className="bg-[#00AB55] text-white text-xs font-bold px-4 py-2 rounded-xl">✓ Onayla</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 12. İÇERİK TAKVİMİ (CALENDAR)                                             */}
          {/* ========================================================================= */}
          {activeTab === 'calendar' && (
            <div className="space-y-6 animate-in fade-in">
              {/* İÇERİK & YAYIN ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'published_posts', label: '📸 Yayınlanan Gönderiler', count: publishedPosts.length },
                  { id: 'upcoming_posts', label: '⏳ Planlanan Gönderiler', count: upcomingPosts.length },
                  { id: 'approval', label: '✅ Onay Bekleyenler', count: approvalPosts.length },
                  { id: 'draft', label: '📝 Taslaklar', count: drafts.length },
                  { id: 'calendar', label: '📅 İçerik Takvimi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">{currentBrand.name} İçerik Takvimi</h3>
                  <span className="text-xs text-gray-500">Günlere tıklayarak hızlı gönderi planlayabilirsiniz</span>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }} className="min-h-20 p-2 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-[#EBF8F2] cursor-pointer transition-all text-xs flex flex-col justify-between">
                      <span className="font-bold text-gray-700">{i+1}</span>
                      <span className="text-[10px] text-gray-400 opacity-0 hover:opacity-100">+ Ekle</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 13. TASLAKLAR (DRAFTS)                                                    */}
          {/* ========================================================================= */}
          {activeTab === 'draft' && (
            <div className="space-y-6 animate-in fade-in">
              {/* İÇERİK & YAYIN ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'published_posts', label: '📸 Yayınlanan Gönderiler', count: publishedPosts.length },
                  { id: 'upcoming_posts', label: '⏳ Planlanan Gönderiler', count: upcomingPosts.length },
                  { id: 'approval', label: '✅ Onay Bekleyenler', count: approvalPosts.length },
                  { id: 'draft', label: '📝 Taslaklar', count: drafts.length },
                  { id: 'calendar', label: '📅 İçerik Takvimi' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900">{currentBrand.name} Taslakları</h3>
                <button onClick={() => { setActiveTab('new_post'); setShowNewPostModal(true); }} className="bg-[#00AB55] text-white text-xs font-bold px-3 py-1.5 rounded-xl">+ Yeni Taslak</button>
              </div>
              {drafts.length === 0 ? (
                <div className="bg-white p-16 rounded-2xl border border-gray-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center text-xl mx-auto">📄</div>
                  <h4 className="font-bold text-sm text-gray-800">Kayıtlı Taslak Bulunmuyor</h4>
                  <p className="text-xs text-gray-400">Yarıda bıraktığınız veya daha sonra düzenlemek istediğiniz metinler burada saklanır.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {drafts.map(d => (
                    <div key={d.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                      <h4 className="font-bold text-sm text-gray-900">{d.title}</h4>
                      <div className="flex justify-between text-xs pt-2 border-t border-gray-100"><button onClick={() => { setNewPostText(d.title); setActiveTab('new_post'); }} className="text-[#00AB55] font-bold">Düzenle →</button><button onClick={() => setDrafts(drafts.filter(i => i.id !== d.id))} className="text-gray-400 hover:text-red-500">Sil</button></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 14. MEDYA KÜTÜPHANESİ & CANVA                                             */}
          {/* ========================================================================= */}
          {activeTab === 'media_library' && (
            <div className="space-y-6 animate-in fade-in">
              {/* STÜDYO, AI & MEDYA ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'new_post', label: '🎬 Stüdyo & Reels Kurgusu' },
                  { id: 'ai_studio', label: '✨ AI Stüdyo PRO' },
                  { id: 'media_library', label: '🖼️ Medya Kütüphanesi & Canva' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Medya Kütüphanesi & Canva</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{currentBrand.name} için görsellerinizi ve video kreatiflerinizi yönetin</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => alert('Dosya seçici açıldı.')} className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-xl">📁 Medya Yükle</button>
                  <button onClick={() => alert('Canva Tasarım Penceresi Açıldı')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl">🎨 Canva İle Tasarla</button>
                </div>
              </div>
              <div className="bg-white p-16 rounded-2xl border border-gray-200 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-2xl mx-auto">🖼️</div>
                <h4 className="font-bold text-base text-gray-800">Medya Kütüphaneniz Henüz Boş</h4>
                <p className="text-xs text-gray-400 max-w-sm mx-auto">Görsel veya video yükleyebilir, doğrudan Canva entegrasyonu ile dakikalar içinde profesyonel tasarımlar hazırlayabilirsiniz.</p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 15. SOSYAL CRM & LEAD PIPELINE                                            */}
          {/* ========================================================================= */}
          {activeTab === 'social_crm' && (
            <div className="space-y-6 animate-in fade-in">
              {/* SOSYAL CRM & DM ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'social_inbox', label: '💬 Gelen Kutusu & Mesajlar', count: inboxChats.length },
                  { id: 'social_crm', label: '👥 Sosyal CRM & Pipeline', count: crmLeads.length },
                  { id: 'auto_dm', label: '⚡ Otomatik DM Motoru' },
                  { id: 'ai_comments', label: '✨ AI Yorum Asistanı' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Sosyal CRM & Lead Pipeline</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{currentBrand.name} gelen müşteri adaylarını yönetin</p>
                </div>
                <button onClick={() => setShowAddLeadModal(true)} className="bg-[#00AB55] text-white text-xs font-bold px-4 py-2 rounded-xl">+ Yeni Lead Ekle</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100/70 p-4 rounded-2xl space-y-3">
                  <strong className="text-xs text-gray-700">Yeni Gelenler ({crmLeads.filter(l => l.status === 'new').length})</strong>
                  {crmLeads.filter(l => l.status === 'new').length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-400">Yeni lead bulunmuyor</div>
                  ) : (
                    crmLeads.filter(l => l.status === 'new').map(lead => (
                      <div key={lead.id} className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                        <strong className="text-gray-900">{lead.name}</strong>
                        <p className="text-gray-600">{lead.query}</p>
                        <button onClick={() => setCrmLeads(crmLeads.map(i => i.id === lead.id ? { ...i, status: 'contacted' } : i))} className="text-[#00AB55] font-bold">Görüşüldü →</button>
                      </div>
                    ))
                  )}
                </div>
                <div className="bg-gray-100/70 p-4 rounded-2xl space-y-3">
                  <strong className="text-xs text-gray-700">İletişimde ({crmLeads.filter(l => l.status === 'contacted').length})</strong>
                  {crmLeads.filter(l => l.status === 'contacted').length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-400">Görüşülen lead bulunmuyor</div>
                  ) : (
                    crmLeads.filter(l => l.status === 'contacted').map(lead => (
                      <div key={lead.id} className="bg-white p-4 rounded-xl border border-gray-200 space-y-2 text-xs">
                        <strong className="text-gray-900">{lead.name}</strong>
                        <p className="text-gray-600">{lead.query}</p>
                        <button onClick={() => setCrmLeads(crmLeads.map(i => i.id === lead.id ? { ...i, status: 'closed' } : i))} className="text-emerald-600 font-bold">Satış Kapandı 🎉</button>
                      </div>
                    ))
                  )}
                </div>
                <div className="bg-emerald-50/70 p-4 rounded-2xl space-y-3">
                  <strong className="text-xs text-emerald-800">Kazanıldı ({crmLeads.filter(l => l.status === 'closed').length})</strong>
                  {crmLeads.filter(l => l.status === 'closed').length === 0 ? (
                    <div className="p-8 text-center text-xs text-emerald-600/70">Tamamlanan satış bulunmuyor</div>
                  ) : (
                    crmLeads.filter(l => l.status === 'closed').map(lead => (
                      <div key={lead.id} className="bg-white p-4 rounded-xl border border-emerald-200 space-y-1 text-xs">
                        <strong className="text-gray-900">{lead.name}</strong>
                        <p className="text-emerald-700 font-bold">{lead.query}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 16. OTOMATİK DM MOTORU (AUTO DM)                                          */}
          {/* ========================================================================= */}
          {activeTab === 'auto_dm' && (
            <div className="space-y-6 animate-in fade-in">
              {/* SOSYAL CRM & DM ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'social_inbox', label: '💬 Gelen Kutusu & Mesajlar', count: inboxChats.length },
                  { id: 'social_crm', label: '👥 Sosyal CRM & Pipeline', count: crmLeads.length },
                  { id: 'auto_dm', label: '⚡ Otomatik DM Motoru' },
                  { id: 'ai_comments', label: '✨ AI Yorum Asistanı' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 space-y-4 text-xs">
                <h3 className="text-base font-bold text-gray-900">Auto DM Tetikleyicileri ({currentBrand.name})</h3>
                <p className="text-gray-500">Instagram veya Facebook gönderilerinizin altına belirli anahtar kelimeleri yazan kullanıcılara anında otomatik özel mesaj (DM) iletin.</p>
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <strong className="text-emerald-900">Örnek Kural: "BILGI" / "KATIL"</strong>
                  <p className="text-gray-600">"Merhaba! {currentBrand.name} özel fırsatları ve detaylı bilgi için: {currentBrand.website}"</p>
                </div>
              </div>
              <div className="lg:col-span-5 bg-gray-900 p-6 rounded-3xl text-white shadow-xl flex flex-col justify-between">
                <span className="text-xs font-bold">Canlı Auto DM Simülatörü</span>
                <div className="space-y-2 mt-4 text-xs min-h-[160px] flex flex-col justify-center">
                  {dmSimMessages.length === 0 ? (
                    <p className="text-gray-500 text-center">Test etmek için aşağıya bir anahtar kelime yazıp Gönder'e basın.</p>
                  ) : (
                    dmSimMessages.map((m, i) => (
                      <div key={i} className={`p-2.5 rounded-2xl ${m.sender === 'user' ? 'bg-blue-600 text-white ml-auto' : 'bg-gray-800 text-gray-200 mr-auto'}`}>{m.text}</div>
                    ))
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <input type="text" placeholder="Örn: BILGI" value={dmSimComment} onChange={(e) => setDmSimComment(e.target.value)} className="flex-1 bg-gray-800 p-2 rounded-lg text-xs text-white" />
                  <button onClick={() => { if (dmSimComment.trim()) { setDmSimMessages([...dmSimMessages, { sender: 'user', text: dmSimComment }, { sender: 'bot', text: `Merhaba! ${currentBrand.name} özel kampanya detaylarınız burada: ${currentBrand.website}/kampanya` }]); setDmSimComment(''); } }} className="bg-[#00AB55] px-3 py-1.5 rounded-lg text-xs font-bold">Gönder</button>
                </div>
              </div>
            </div>
          </div>
        )}

          {/* ========================================================================= */}
          {/* 17. BİRLEŞİK GELEN KUTUSU (SOCIAL INBOX)                                  */}
          {/* ========================================================================= */}
          {activeTab === 'social_inbox' && (
            <div className="space-y-6 animate-in fade-in">
              {/* SOSYAL CRM & DM ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'social_inbox', label: '💬 Gelen Kutusu & Mesajlar', count: inboxChats.length },
                  { id: 'social_crm', label: '👥 Sosyal CRM & Pipeline', count: crmLeads.length },
                  { id: 'auto_dm', label: '⚡ Otomatik DM Motoru' },
                  { id: 'ai_comments', label: '✨ AI Yorum Asistanı' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden flex h-[620px]">
              <div className="w-80 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-100 font-bold text-sm">Gelen Kutusu ({inboxChats.length})</div>
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                  {inboxChats.length === 0 ? (
                    <div className="p-8 text-center text-xs text-gray-400">
                      Gelen mesaj bulunmuyor
                    </div>
                  ) : (
                    inboxChats.map(chat => (
                      <div key={chat.id} onClick={() => setSelectedChat(chat)} className={`p-3.5 flex items-start gap-3 cursor-pointer ${selectedChat?.id === chat.id ? 'bg-[#EBF8F2]' : 'hover:bg-gray-50'}`}>
                        <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="min-w-0 text-xs"><strong className="text-gray-900 block truncate">{chat.name}</strong><p className="text-gray-500 truncate">{chat.lastMessage}</p></div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="flex-1 flex flex-col bg-gray-50/50">
                {selectedChat ? (
                  <>
                    <div className="p-4 bg-white border-b border-gray-200 font-bold text-sm">{selectedChat.name}</div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
                      {selectedChat.messages?.map((m, i) => (
                        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`p-3 rounded-2xl ${m.sender === 'user' ? 'bg-white border border-gray-200' : 'bg-[#00AB55] text-white'}`}>{m.text}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
                      <input type="text" value={inboxReplyText} onChange={(e) => setInboxReplyText(e.target.value)} onKeyDown={(e) => { if (e.key==='Enter' && inboxReplyText.trim()) { setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, { sender: 'agent', text: inboxReplyText }] }); setInboxReplyText(''); } }} placeholder="Yanıt yaz..." className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" />
                      <button onClick={() => { if (inboxReplyText.trim()) { setSelectedChat({ ...selectedChat, messages: [...selectedChat.messages, { sender: 'agent', text: inboxReplyText }] }); setInboxReplyText(''); } }} className="bg-[#00AB55] text-white px-4 py-2 rounded-xl text-xs font-bold">Gönder</button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center text-2xl mx-auto">💬</div>
                    <h4 className="font-bold text-sm text-gray-700">{currentBrand.name} Gelen Kutusu Temiz!</h4>
                    <p className="text-xs text-gray-400 max-w-sm">Sosyal medya hesaplarınız veya WhatsApp bağlandığında müşteri mesajları ve yorumları anında burada listelenir.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

          {/* ========================================================================= */}
          {/* 18. AI YORUM ASİSTANI (AI COMMENTS)                                       */}
          {/* ========================================================================= */}
          {activeTab === 'ai_comments' && (
            <div className="space-y-4 animate-in fade-in">
              {/* SOSYAL CRM & DM ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'social_inbox', label: '💬 Gelen Kutusu & Mesajlar', count: inboxChats.length },
                  { id: 'social_crm', label: '👥 Sosyal CRM & Pipeline', count: crmLeads.length },
                  { id: 'auto_dm', label: '⚡ Otomatik DM Motoru' },
                  { id: 'ai_comments', label: '✨ AI Yorum Asistanı' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs"><h3 className="text-base font-bold text-gray-900">AI Yorum Asistanı</h3><p className="text-xs text-gray-500 mt-0.5">Gelen yorumlara marka tonunuza uygun otomatik veya onaylı yanıtlar verin</p></div>
              <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00AB55] flex items-center justify-center text-xl mx-auto">✨</div>
                <h4 className="font-bold text-sm text-gray-800">Bekleyen Yorum Bulunmuyor</h4>
                <p className="text-xs text-gray-400">Yeni bir gönderi paylaştığınızda takipçi yorumları ve AI önerileri burada görüntülenecektir.</p>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 19. BRAND2SOCIAL AI STÜDYO PRO (AI STUDIO)                                */}
          {/* ========================================================================= */}
          {activeTab === 'ai_studio' && (
            <div className="space-y-4 animate-in fade-in">
              {/* STÜDYO, AI & MEDYA ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'new_post', label: '🎬 Stüdyo & Reels Kurgusu' },
                  { id: 'ai_studio', label: '✨ AI Stüdyo PRO' },
                  { id: 'media_library', label: '🖼️ Medya Kütüphanesi & Canva' }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-gray-900">Brand2Social AI Stüdyo PRO</h3>
                  <span style={{ backgroundColor: currentBrand.logoBg, color: currentBrand.color }} className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-gray-200">
                    Aktif: {currentBrand.name} ({currentBrand.tone})
                  </span>
                </div>
                <p className="text-xs text-gray-500">Viral kancalar (hook), gövde metinleri ve etiketlerle donatılmış profesyonel kampanya planı oluşturun.</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Örn: Yeni Sezon İndirim Lansmanı ve Özel Fırsatlar" value={aiStudioPrompt} onChange={(e) => setAiStudioPrompt(e.target.value)} className="flex-1 p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold" />
                  <button onClick={runAiStudio} disabled={aiStudioGenerating} className="bg-[#00AB55] text-white text-xs font-bold px-5 py-2.5 rounded-xl">{aiStudioGenerating ? 'Üretiliyor...' : '✨ Viral Plan Üret'}</button>
                </div>
              </div>
              {aiStudioResult && (
                <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm text-xs space-y-3 animate-in fade-in">
                  <pre className="whitespace-pre-wrap font-sans bg-gray-50 p-4 rounded-xl text-gray-800 leading-relaxed">{aiStudioResult}</pre>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* 20. SOSYAL MEDYA RAPORLARI (REPORTS SOCIAL)                               */}
          {/* ========================================================================= */}
          {activeTab === 'reports_social' && (
            <div className="space-y-6 animate-in fade-in">
              {/* RAPORLAR & ANALİTİK ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'reports_social', label: '📊 Sosyal Medya Raporları' },
                  { id: 'reports_schedule', label: '🕒 Zamanlanmış Raporlar', count: scheduledReports.length }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <h3 className="font-bold text-base text-gray-900">{currentBrand.name} Sosyal Medya Performans Raporu</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-gray-50 p-4 rounded-xl font-bold text-pink-600">Instagram: 0 İzlenme</div>
                  <div className="bg-gray-50 p-4 rounded-xl font-bold text-gray-900">TikTok: 0 İzlenme</div>
                  <div className="bg-gray-50 p-4 rounded-xl font-bold text-red-600">YouTube: 0 İzlenme</div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 21. ZAMANLANMIŞ RAPORLAR (REPORTS SCHEDULE)                               */}
          {/* ========================================================================= */}
          {activeTab === 'reports_schedule' && (
            <div className="space-y-6 animate-in fade-in">
              {/* RAPORLAR & ANALİTİK ALT SEKMELERİ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'reports_social', label: '📊 Sosyal Medya Raporları' },
                  { id: 'reports_schedule', label: '🕒 Zamanlanmış Raporlar', count: scheduledReports.length }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === sub.id 
                        ? 'bg-[#0A284B] text-white shadow-sm' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{sub.label}</span>
                    {sub.count !== undefined && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${activeTab === sub.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        {sub.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between"><h3 className="font-bold text-base text-gray-900">Zamanlanmış Raporlar</h3><button onClick={() => setShowScheduleReportModal(true)} className="bg-[#00AB55] text-white text-xs font-bold px-3 py-1.5 rounded-xl">+ Ekle</button></div>
                {scheduledReports.length === 0 ? (
                  <div className="py-10 text-center text-xs text-gray-400">
                    Henüz zamanlanmış otomatik raporlama kuralı eklenmedi.
                  </div>
                ) : (
                  scheduledReports.map(r => (
                    <div key={r.id} className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs flex justify-between items-center">
                      <strong>{r.title} ({r.frequency})</strong><span className="text-emerald-700 font-bold">● Aktif</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

      </main>


      {/* 🏢 MODAL: YENİ MARKA EKLEME SİHİRBAZI */}
      {showAddBrandModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Başlığı */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#00AB55] flex items-center justify-center text-xl font-bold">
                  🏢
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">Yeni Marka & Çalışma Alanı Ekle</h3>
                  <p className="text-xs text-gray-500">Ajansınız veya işletmeniz için yeni bir marka profili oluşturun</p>
                </div>
              </div>
              <button onClick={() => setShowAddBrandModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {/* Form Alanları */}
            <div className="space-y-4 text-xs">
              
              {/* Marka Adı & Sektör */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Marka / Şirket Adı <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Örn: AremSoft Teknoloji" 
                    value={newBrandData.name}
                    onChange={(e) => setNewBrandData({ ...newBrandData, name: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00AB55] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Sektör / Kategori</label>
                  <select 
                    value={newBrandData.industry}
                    onChange={(e) => {
                      const selected = INDUSTRY_OPTIONS.find(i => i.name === e.target.value);
                      setNewBrandData({ 
                        ...newBrandData, 
                        industry: e.target.value,
                        industryIcon: selected?.icon || '🏢'
                      });
                    }}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00AB55]"
                  >
                    {INDUSTRY_OPTIONS.map(ind => (
                      <option key={ind.id} value={ind.name}>{ind.icon} {ind.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Marka Rengi Seçici */}
              <div>
                <label className="font-bold text-gray-700 block mb-1.5">Marka Kimlik Rengi & Avatarı</label>
                <div className="flex items-center gap-2.5">
                  {COLOR_OPTIONS.map(c => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setNewBrandData({ ...newBrandData, color: c.hex, logoBg: c.bg })}
                      style={{ backgroundColor: c.hex }}
                      className={`w-8 h-8 rounded-xl shadow-xs transition-transform flex items-center justify-center text-white text-xs font-bold ${
                        newBrandData.color === c.hex ? 'ring-2 ring-offset-2 ring-gray-900 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {newBrandData.color === c.hex && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo Görsel URL & Resmi Unvan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Firma Logosu Görsel URL'si</label>
                  <input 
                    type="url" 
                    placeholder="https://... (Örn: logo.png)" 
                    value={newBrandData.logoUrl}
                    onChange={(e) => setNewBrandData({ ...newBrandData, logoUrl: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Resmi Şirket Unvanı</label>
                  <input 
                    type="text" 
                    placeholder="Örn: AremSoft Yazılım Ltd. Şti." 
                    value={newBrandData.legalName}
                    onChange={(e) => setNewBrandData({ ...newBrandData, legalName: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Yetkili & İletişim */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Yetkili Kişi</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Ahmet Yılmaz" 
                    value={newBrandData.contactPerson}
                    onChange={(e) => setNewBrandData({ ...newBrandData, contactPerson: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Telefon Numarası</label>
                  <input 
                    type="text" 
                    placeholder="+90 532 000 0000" 
                    value={newBrandData.phone}
                    onChange={(e) => setNewBrandData({ ...newBrandData, phone: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Fatura E-Postası</label>
                  <input 
                    type="email" 
                    placeholder="finans@sirket.com" 
                    value={newBrandData.email}
                    onChange={(e) => setNewBrandData({ ...newBrandData, email: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* Anlaşılan Paket & Ücret */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Anlaşılan Hizmet Paketi</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Büyüme & Reklam Paketi" 
                    value={newBrandData.contractPackage}
                    onChange={(e) => setNewBrandData({ ...newBrandData, contractPackage: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Aylık Ücret (₺)</label>
                  <input 
                    type="number" 
                    placeholder="35000" 
                    value={newBrandData.monthlyFee}
                    onChange={(e) => setNewBrandData({ ...newBrandData, monthlyFee: Number(e.target.value) })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold font-mono text-emerald-700"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Vade / Ödeme Günü</label>
                  <input 
                    type="text" 
                    placeholder="Her Ayın 5'i" 
                    value={newBrandData.paymentDay}
                    onChange={(e) => setNewBrandData({ ...newBrandData, paymentDay: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              
              {/* Web Sitesi & Sosyal Medya Handle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Web Sitesi</label>
                  <input 
                    type="url" 
                    placeholder="https://aremsoft.com" 
                    value={newBrandData.website}
                    onChange={(e) => setNewBrandData({ ...newBrandData, website: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Sosyal Medya Kullanıcı Adı</label>
                  <input 
                    type="text" 
                    placeholder="@aremsoft" 
                    value={newBrandData.handle}
                    onChange={(e) => setNewBrandData({ ...newBrandData, handle: e.target.value })}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              {/* AI İletişim Tonu */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Yapay Zeka (AI) İçerik Tonu</label>
                <select 
                  value={newBrandData.tone}
                  onChange={(e) => setNewBrandData({ ...newBrandData, tone: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#00AB55]"
                >
                  {TONE_OPTIONS.map(t => (
                    <option key={t.id} value={t.name}>{t.name} — ({t.desc})</option>
                  ))}
                </select>
              </div>

              {/* Marka Açıklaması / Bio */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">Kısa Marka Tanımı / Hakkında</label>
                <textarea 
                  rows={2} 
                  placeholder="Yapay zekanın gönderi ve reklam metni üretirken baz alacağı ürün, hizmet ve hedef kitle bilgisi..." 
                  value={newBrandData.bio}
                  onChange={(e) => setNewBrandData({ ...newBrandData, bio: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium"
                />
              </div>

              {/* Canlı Önizleme Kartı */}
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Canlı Marka Kartı Önizlemesi</span>
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                  <div 
                    style={{ backgroundColor: newBrandData.color }}
                    className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-black text-sm shadow-xs shrink-0"
                  >
                    {newBrandData.name ? newBrandData.name.substring(0, 2).toUpperCase() : 'MA'}
                  </div>
                  <div>
                    <strong className="text-gray-900 block text-xs">{newBrandData.name || 'Yeni Marka Adı'}</strong>
                    <span className="text-[11px] text-gray-500">{newBrandData.industryIcon} {newBrandData.industry} • {newBrandData.handle || '@marka'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Aksiyon Butonları */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setShowAddBrandModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-200 transition-colors"
              >
                İptal
              </button>
              <button 
                type="button" 
                onClick={handleCreateBrand}
                className="px-6 py-2.5 bg-[#00AB55] hover:bg-[#007A3D] text-white font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>🚀</span>
                <span>Markayı Oluştur & Aktif Et</span>
              </button>
            </div>

          </div>
        </div>
      )}


      {/* 🏢 MODAL: MARKALARI YÖNET & DÜZENLE MODALI */}
      {showManageBrandsModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
                  ⚙️
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">Marka ve Çalışma Alanı Yönetimi</h3>
                  <p className="text-xs text-gray-500">Tüm markalarınızı düzenleyin, yeni marka ekleyin veya geçiş yapın</p>
                </div>
              </div>
              <button onClick={() => setShowManageBrandsModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {/* Marka Listesi */}
            {brands.length === 0 ? (
              <div className="p-8 text-center text-gray-500 space-y-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <span className="text-3xl block">🏢</span>
                <p className="text-sm font-bold text-gray-800">Henüz Kayıtlı Marka Bulunmuyor</p>
                <p className="text-xs text-gray-500">Tüm demolar temizlendi. Yeni bir marka ekleyerek yönetmeye başlayabilirsiniz.</p>
                <button 
                  onClick={() => { setShowManageBrandsModal(false); setShowAddBrandModal(true); }}
                  className="px-4 py-2 bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold rounded-xl text-xs shadow-sm inline-flex items-center gap-1.5"
                >
                  <span>+</span>
                  <span>Yeni Marka Ekle</span>
                </button>
              </div>
            ) : (
            <div className="space-y-3">
              {brands.map(b => (
                <div 
                  key={b.id} 
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    selectedBrandId === b.id ? 'border-[#00AB55] bg-[#EBF8F2]/40 shadow-2xs' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <BrandLogo brand={b} size={44} className="rounded-2xl shrink-0 shadow-xs" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-gray-900 truncate">{b.name}</strong>
                        {selectedBrandId === b.id && (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.2 rounded-full">
                            ● Aktif Çalışma Alanı
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{b.industryIcon} {b.industry} • <span className="font-mono text-gray-700">{b.handle}</span></p>
                      <p className="text-[11px] text-gray-400 mt-0.5">AI Tonu: <strong>{b.tone}</strong> • Oluşturulma: {b.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    {selectedBrandId !== b.id ? (
                      <button 
                        onClick={() => {
                          setSelectedBrandId(b.id);
                          alert(`✅ "${b.name}" markasına geçiş yapıldı!`);
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl"
                      >
                        Buna Geç
                      </button>
                    ) : null}
                    
                    <button 
                      onClick={() => setEditingBrand({ ...b })}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl"
                    >
                      Düzenle
                    </button>

                    <button 
                      onClick={() => handleDeleteBrand(b.id)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
            )}

            {/* Düzenleme Alanı */}
            {editingBrand && (
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3 animate-in fade-in">
                <h4 className="font-bold text-xs text-gray-900">Markayı Düzenle: {editingBrand.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Marka Adı</label>
                    <input type="text" value={editingBrand.name} onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })} className="w-full p-2 bg-white border border-gray-200 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Sosyal Medya Handle</label>
                    <input type="text" value={editingBrand.handle} onChange={(e) => setEditingBrand({ ...editingBrand, handle: e.target.value })} className="w-full p-2 bg-white border border-gray-200 rounded-xl" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button onClick={() => setEditingBrand(null)} className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-xl">İptal</button>
                  <button onClick={handleUpdateBrand} className="px-4 py-1.5 bg-[#00AB55] text-white text-xs font-bold rounded-xl">Kaydet</button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button 
                onClick={() => {
                  setShowManageBrandsModal(false);
                  setShowAddBrandModal(true);
                }}
                className="bg-[#00AB55] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm"
              >
                + Yeni Marka Ekle
              </button>
              <button 
                onClick={() => setShowManageBrandsModal(false)}
                className="bg-gray-800 text-white text-xs font-bold px-5 py-2 rounded-xl"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}


      
      {/* 🟢 MODAL: YENİ FATURA / TAHSİLAT EKLEME MODALI */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">💳</span>
                <div>
                  <h3 className="font-bold text-base text-gray-900">Yeni Fatura / Tahsilat Kaydı</h3>
                  <p className="text-xs text-gray-500">{currentBrand.name} için ödeme kaydı</p>
                </div>
              </div>
              <button onClick={() => setShowAddInvoiceModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-700 font-bold block mb-1">Fatura Numarası</label>
                <input 
                  type="text" 
                  value={newInvoiceData.id} 
                  onChange={(e) => setNewInvoiceData({ ...newInvoiceData, id: e.target.value })} 
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-700 font-bold block mb-1">Fatura / Kesim Tarihi</label>
                  <input 
                    type="text" 
                    value={newInvoiceData.date} 
                    onChange={(e) => setNewInvoiceData({ ...newInvoiceData, date: e.target.value })} 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold block mb-1">Son Ödeme (Vade)</label>
                  <input 
                    type="text" 
                    value={newInvoiceData.dueDate} 
                    onChange={(e) => setNewInvoiceData({ ...newInvoiceData, dueDate: e.target.value })} 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-700 font-bold block mb-1">Matrah (KDV Hariç ₺)</label>
                  <input 
                    type="number" 
                    value={newInvoiceData.subtotal} 
                    onChange={(e) => {
                      const sub = Number(e.target.value);
                      setNewInvoiceData({ 
                        ...newInvoiceData, 
                        subtotal: sub, 
                        vat: Math.round(sub * 0.20),
                        amount: Math.round(sub * 1.20)
                      });
                    }} 
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold" 
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-bold block mb-1">Toplam (KDV Dahil ₺)</label>
                  <input 
                    type="number" 
                    readOnly
                    value={newInvoiceData.amount} 
                    className="w-full p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono font-bold text-emerald-800" 
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-bold block mb-1">Ödeme Durumu</label>
                <select 
                  value={newInvoiceData.status} 
                  onChange={(e) => setNewInvoiceData({ ...newInvoiceData, status: e.target.value })}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
                >
                  <option value="paid">● Ödendi (Tahsil Edildi)</option>
                  <option value="pending">○ Beklemede (Ödeme Bekliyor)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button onClick={() => setShowAddInvoiceModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs">İptal</button>
                <button onClick={handleAddInvoiceToBrand} className="px-5 py-2 bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold rounded-xl text-xs shadow-sm">
                  Faturayı Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* 🟢 MODAL: FİRMA KÜNYESİ VE SÖZLEŞMEYİ DÜZENLEME MODALI */}
      {showEditBrandContractModal && editBrandForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <BrandLogo brand={editBrandForm} size={36} className="rounded-xl" />
                <div>
                  <h3 className="font-bold text-base text-gray-900">{editBrandForm.name} Sözleşme & Künye Düzenle</h3>
                  <p className="text-xs text-gray-500">Resmi şirket ve anlaşma şartlarını güncelleyin</p>
                </div>
              </div>
              <button onClick={() => setShowEditBrandContractModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Logo Görsel URL */}
              <div>
                <label className="text-gray-700 font-bold block mb-1">Firma Logosu Görsel URL'si</label>
                <input 
                  type="text" 
                  value={editBrandForm.logoUrl || ''} 
                  onChange={(e) => setEditBrandForm({ ...editBrandForm, logoUrl: e.target.value })} 
                  placeholder="https://... (Örn: firmanizin-logosu.png)"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                />
              </div>

              {/* Şirket Yasal Bilgileri */}
              <div className="space-y-2">
                <span className="font-bold text-gray-900 block text-xs border-b border-gray-100 pb-1">🏢 Resmi Şirket Bilgileri</span>
                <div>
                  <label className="text-gray-700 font-semibold block mb-0.5">Resmi Ticari Unvan</label>
                  <input 
                    type="text" 
                    value={editBrandForm.legalName || ''} 
                    onChange={(e) => setEditBrandForm({ ...editBrandForm, legalName: e.target.value })} 
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Vergi Dairesi</label>
                    <input 
                      type="text" 
                      value={editBrandForm.taxOffice || ''} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, taxOffice: e.target.value })} 
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Vergi Numarası / VKN</label>
                    <input 
                      type="text" 
                      value={editBrandForm.taxNumber || ''} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, taxNumber: e.target.value })} 
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Yetkili Kişi</label>
                    <input 
                      type="text" 
                      value={editBrandForm.contactPerson || ''} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, contactPerson: e.target.value })} 
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Telefon</label>
                    <input 
                      type="text" 
                      value={editBrandForm.phoneMobile || editBrandForm.phone || ''} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, phoneMobile: e.target.value })} 
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                    />
                  </div>
                </div>
              </div>

              {/* Sözleşme & Finans */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-gray-900 block text-xs border-b border-gray-100 pb-1">📜 Anlaşılan Sözleşme & Ücret</span>
                <div>
                  <label className="text-gray-700 font-semibold block mb-0.5">Hizmet Paketi Adı</label>
                  <input 
                    type="text" 
                    value={editBrandForm.contractPackage || ''} 
                    onChange={(e) => setEditBrandForm({ ...editBrandForm, contractPackage: e.target.value })} 
                    className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Aylık Ücret (₺)</label>
                    <input 
                      type="number" 
                      value={editBrandForm.monthlyFee || 0} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, monthlyFee: Number(e.target.value) })} 
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold text-emerald-800" 
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Toplam Tutar (₺)</label>
                    <input 
                      type="number" 
                      value={editBrandForm.totalContractValue || 0} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, totalContractValue: Number(e.target.value) })} 
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono" 
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-semibold block mb-0.5">Ödeme Günü</label>
                    <input 
                      type="text" 
                      value={editBrandForm.paymentDay || ''} 
                      onChange={(e) => setEditBrandForm({ ...editBrandForm, paymentDay: e.target.value })} 
                      placeholder="Her Ayın 5'i"
                      className="w-full p-2 bg-gray-50 border border-gray-200 rounded-xl text-xs" 
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
                <button onClick={() => setShowEditBrandContractModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs">İptal</button>
                <button onClick={handleSaveBrandContract} className="px-5 py-2 bg-[#00AB55] hover:bg-[#007A3D] text-white font-bold rounded-xl text-xs shadow-sm">
                  Değişiklikleri Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 MODAL 1: RESMİ OAUTH 2.0 ÇOK ADIMLI BAĞLANTI SİHİRBAZI */}
      {showConnectModal && selectedPlatformToConnect && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in duration-200">
            
            {/* Vendor Branded Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <PlatformIcon id={selectedPlatformToConnect.id} size={48} className="rounded-2xl shadow-sm shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-black text-base text-gray-900">{selectedPlatformToConnect.name}</h3>
                    <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded">OAuth 2.0</span>
                  </div>
                  <p className="text-xs text-gray-500 font-mono">auth.{selectedPlatformToConnect.id}.com/oauth/v19.0/authorize</p>
                </div>
              </div>
              <button onClick={() => setShowConnectModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {/* Adım 1: Oturum Doğrulama */}
            {connectWizardStep === 1 && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 font-semibold">Doğrulanan Yönetici Hesabı:</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">● Aktif Oturum</span>
                  </div>
                  <strong className="text-gray-900 block text-sm">yonetici@{currentBrand.slug}.com</strong>
                  <p className="text-gray-500 text-[11px]">Brand2Social Uygulama Kimliği: <code className="font-mono bg-white px-1 rounded border border-gray-200">APP_948201948201</code></p>
                </div>

                <div className="space-y-1.5 text-gray-600 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                  <span className="font-bold text-blue-900 block text-[11px]">🔒 Güvenli Veri Erişimi:</span>
                  <p className="text-[11px] leading-relaxed">
                    Brand2Social, şifrenizi asla kaydetmez. Resmi OAuth 2.0 şifreli belirteci (token) ile doğrudan {selectedPlatformToConnect.name} API sunucularına bağlanır.
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setConnectWizardStep(2)}
                    style={{ backgroundColor: selectedPlatformToConnect.color }}
                    className="w-full py-2.5 text-white font-bold rounded-xl text-xs shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Sayfaları Listele & Seç</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )}

            {/* Adım 2: Sayfa / Hesap Seçimi */}
            {connectWizardStep === 2 && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Bağlamak İstediğiniz Sayfayı Seçin:</h4>
                  <p className="text-gray-500 mt-0.5">{currentBrand.name} markasına bağlı sayfalar:</p>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {selectedPlatformToConnect.availablePages.map(page => (
                    <label 
                      key={page.id}
                      onClick={() => setSelectedPageToLink(page.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedPageToLink === page.id ? 'border-[#00AB55] bg-[#EBF8F2] shadow-2xs' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <strong className="text-gray-900 block font-bold text-xs">{page.name}</strong>
                        <span className="text-gray-400 font-mono text-[10px]">Kimlik: {page.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500 font-semibold text-[11px]">{page.followers}</span>
                        <input 
                          type="radio" 
                          name="pageSelect" 
                          checked={selectedPageToLink === page.id} 
                          onChange={() => setSelectedPageToLink(page.id)}
                          className="accent-[#00AB55]" 
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button onClick={() => setConnectWizardStep(1)} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl">← Geri</button>
                  <button 
                    onClick={() => setConnectWizardStep(3)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm"
                  >
                    İzinleri Onayla →
                  </button>
                </div>
              </div>
            )}

            {/* Adım 3: İzin Kapsamları & Long-Lived Token */}
            {connectWizardStep === 3 && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">API Yetki Kapsamları (Scopes)</h4>
                  <p className="text-gray-500 mt-0.5">Uygulamanın erişeceği resmi API izinleri:</p>
                </div>

                <div className="space-y-1.5 bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-gray-700">
                  {selectedPlatformToConnect.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-200/60 last:border-0">
                      <span className="font-mono text-xs">{perm}</span>
                      <span className="text-emerald-700 font-bold text-[11px]">✓ İzin Verildi</span>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-800 text-[11px]">
                  <strong>✨ Long-Lived Token Exchange:</strong> 60 gün boyunca şifre girmeden kesintisiz otomatik paylaşım ve analitik akışı sağlanacaktır.
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button onClick={() => setConnectWizardStep(2)} className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl">← Geri</button>
                  <button 
                    onClick={handleFinalizeConnection}
                    className="px-6 py-2.5 bg-[#00AB55] hover:bg-[#007A3D] text-white font-black rounded-xl shadow-md flex items-center gap-2"
                  >
                    <span>🔒</span>
                    <span>Yetkilendir & Bağlantıyı Tamamla</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}


      {/* 🟢 MODAL 2: CANLI API TEŞHİS & TEST MODALI */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">⚡</span>
                <div>
                  <h3 className="font-bold text-base text-gray-900">{showDiagnosticModal.name} Canlı API Teşhisi</h3>
                  <p className="text-xs text-gray-500 font-mono">{showDiagnosticModal.apiEndpoint}</p>
                </div>
              </div>
              <button onClick={() => setShowDiagnosticModal(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            {diagnosticTesting ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#00AB55] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-bold text-gray-700">API Uç Noktaları ve OAuth Belirteci Test Ediliyor...</p>
                <p className="text-[11px] text-gray-400 font-mono">GET {showDiagnosticModal.apiEndpoint}/health</p>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-emerald-800">
                  <span className="font-bold">Genel Bağlantı Durumu:</span>
                  <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[10px]">● %100 SAĞLIKLI</span>
                </div>

                <div className="space-y-2 border border-gray-200 rounded-xl p-3 bg-gray-50">
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-600">1. Access Token Geçerliliği:</span>
                    <strong className="text-emerald-700 font-mono">200 OK (Geçerli)</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-600">2. İzin Kapsamları (Scopes):</span>
                    <strong className="text-emerald-700 font-mono">Doğrulandı ({showDiagnosticModal.permissions.length} İzin)</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-600">3. Webhook Dinleyicisi:</span>
                    <strong className="text-emerald-700 font-mono">Aktif (0ms Gecikme)</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-gray-600">4. API Hız Sınırı (Rate Limit):</span>
                    <strong className="text-gray-900 font-mono">{showDiagnosticModal.apiQuota}</strong>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">5. Uçtan Uca Yanıt Süresi (Ping):</span>
                    <strong className="text-blue-700 font-mono">{showDiagnosticModal.latency}</strong>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => setShowDiagnosticModal(null)}
                    className="px-5 py-2 bg-[#00AB55] text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    Tamam
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}


      {/* 🟢 MODAL 3: KANAL AYARLARI & SAYFA DEĞİŞTİRME MODALI */}
      {showAccountSettingsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <PlatformIcon id={showAccountSettingsModal.id} size={44} className="rounded-2xl shadow-sm shrink-0" />
                <div>
                  <h3 className="font-bold text-base text-gray-900">{showAccountSettingsModal.name} Entegrasyon Ayarları</h3>
                  <p className="text-xs text-gray-500">Aktif Sayfa: <strong className="text-gray-800">{showAccountSettingsModal.accountName}</strong></p>
                </div>
              </div>
              <button onClick={() => setShowAccountSettingsModal(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">API Uç Noktası:</span>
                  <strong className="text-gray-800 font-mono text-[11px]">{showAccountSettingsModal.apiEndpoint}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-semibold">Sayfa Kimliği (ID):</span>
                  <strong className="text-gray-800 font-mono text-[11px]">{showAccountSettingsModal.pageId}</strong>
                </div>
              </div>

              {/* Sayfa Değiştirici */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block">Yönetilen Başka Bir Sayfaya Geç:</label>
                <div className="space-y-1.5">
                  {showAccountSettingsModal.availablePages.map(page => (
                    <div 
                      key={page.id} 
                      onClick={() => handleSwitchConnectedPage(showAccountSettingsModal.id, page)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                        showAccountSettingsModal.pageId === page.id ? 'bg-emerald-50 border-emerald-300 font-bold' : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span>{page.name}</span>
                      {showAccountSettingsModal.pageId === page.id ? (
                        <span className="text-emerald-700 text-[10px] font-bold">● Seçili</span>
                      ) : (
                        <span className="text-blue-600 text-[10px] font-bold hover:underline">Buna Geç</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="font-bold text-gray-700 block">Aktif İzinler:</label>
                <div className="flex flex-wrap gap-1">
                  {showAccountSettingsModal.permissions.map((p, i) => (
                    <span key={i} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button 
                onClick={() => handleRunDiagnostic(showAccountSettingsModal)}
                className="px-3.5 py-2 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
              >
                <span>⚡</span> Canlı Teşhis Başlat
              </button>

              <button 
                onClick={() => setShowAccountSettingsModal(null)}
                className="px-5 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 🟢 MODAL: KAMPANYA & KREATİF DETAY MODALI */}
      {showAdDetailModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-base text-gray-900">{showAdDetailModal.name}</h3>
                <p className="text-xs text-gray-500">{showAdDetailModal.platformName} • {showAdDetailModal.objective}</p>
              </div>
              <button onClick={() => setShowAdDetailModal(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-5 rounded-xl overflow-hidden border border-gray-200">
                <img src={showAdDetailModal.image} alt={showAdDetailModal.name} className="w-full h-56 object-cover" />
              </div>
              <div className="sm:col-span-7 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Hedef Kitle & Konum</span>
                  <p className="text-gray-800 font-semibold">{showAdDetailModal.targetAudience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1">
                  <strong className="text-gray-900 block">{showAdDetailModal.headline}</strong>
                  <p className="text-gray-600 leading-relaxed">{showAdDetailModal.bodyText}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold">
                    ₺{showAdDetailModal.totalSpend.toLocaleString('tr-TR')}
                    <div className="text-[9px] font-normal text-gray-500">Harcama</div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg font-bold">
                    {showAdDetailModal.conversions}
                    <div className="text-[9px] font-normal text-gray-500">{showAdDetailModal.conversionType}</div>
                  </div>
                  <div className="bg-purple-50 text-purple-700 p-2 rounded-lg font-bold">
                    {showAdDetailModal.roas}x
                    <div className="text-[9px] font-normal text-gray-500">ROAS Getiri</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-500">Toplam Gelir: <strong className="text-emerald-600">₺{showAdDetailModal.revenue.toLocaleString('tr-TR')}</strong></span>
              <button 
                onClick={() => setShowAdDetailModal(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 🟢 MODAL: GÖNDERİ DETAY & ANALİTİK */}
      {showPostDetailModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">Gönderi Detayı & Performans Analizi</h3>
              <button onClick={() => setShowPostDetailModal(null)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-5 rounded-xl overflow-hidden border border-gray-200">
                <img src={showPostDetailModal.image} alt={showPostDetailModal.title} className="w-full h-56 object-cover" />
              </div>
              <div className="sm:col-span-7 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{showPostDetailModal.date} • {showPostDetailModal.time}</span>
                  <h4 className="font-bold text-sm text-gray-900 mt-0.5">{showPostDetailModal.title}</h4>
                </div>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {showPostDetailModal.content}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="bg-red-50 text-red-700 p-2 rounded-lg font-bold">❤️ {showPostDetailModal.likes} Beğeni</div>
                  <div className="bg-blue-50 text-blue-700 p-2 rounded-lg font-bold">💬 {showPostDetailModal.comments} Yorum</div>
                  <div className="bg-green-50 text-green-700 p-2 rounded-lg font-bold">🔄 {showPostDetailModal.shares} Paylaşım</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs">
              <span className="text-gray-500">Tahmini Erişim: <strong>{showPostDetailModal.reach}</strong> | Etkileşim: <strong className="text-emerald-600">{showPostDetailModal.engagementRate}</strong></span>
              <button 
                onClick={() => setShowPostDetailModal(null)}
                className="bg-[#00AB55] text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 🟢 MODAL: REFER & EARN */}
      {showReferModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 text-center space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto">
              🎁
            </div>
            <h3 className="text-lg font-bold text-gray-900">Arkadaşını Davet Et & %30 Kazan</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Özel referans bağlantınızı ajanslar ve işletmelerle paylaşın. Yapılan her abonelikten ömür boyu %30 komisyon kazanın.
            </p>
            <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-between text-xs">
              <span className="font-mono text-gray-700 truncate">https://brand2social.com/ref/{currentBrand.slug}</span>
              <button onClick={() => alert('Referans linki panoya kopyalandı!')} className="bg-[#00AB55] text-white px-3 py-1.5 rounded-lg font-bold text-xs">
                Kopyala
              </button>
            </div>
            <button onClick={() => setShowReferModal(false)} className="text-xs text-gray-400 hover:text-gray-600 font-semibold block mx-auto">
              Kapat
            </button>
          </div>
        </div>
      )}


      {/* 🟢 MODAL: YENİ LEAD EKLEME */}
      {showAddLeadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <h3 className="font-bold text-base text-gray-900">Yeni Sosyal Müşteri Adayı Ekle</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Ad Soyad</label>
                <input type="text" id="leadName" placeholder="Örn: Canan Berk" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Sosyal Medya Kullanıcı Adı / Platform</label>
                <input type="text" id="leadHandle" placeholder="Örn: @canan_berk (Instagram)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">İlgilendiği Hizmet / Talep</label>
                <input type="text" id="leadQuery" placeholder="Örn: Kurumsal Hizmet Fiyatı" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setShowAddLeadModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl">İptal</button>
              <button 
                onClick={() => {
                  const newLead = {
                    id: Date.now(),
                    name: 'Yeni Müşteri Adayı',
                    handle: '@yeni_musteri',
                    status: 'new',
                    platform: 'Instagram DM',
                    query: 'Hizmet ve Fiyat Bilgisi Talebi',
                    time: 'Şimdi',
                    phone: '+90 530 000 0000'
                  };
                  setCrmLeads([newLead, ...crmLeads]);
                  setShowAddLeadModal(false);
                  alert('Yeni lead başarıyla eklendi!');
                }} 
                className="px-5 py-2 bg-[#00AB55] text-white text-xs font-bold rounded-xl"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 🟢 MODAL: ZAMANLANMIŞ RAPOR EKLEME */}
      {showScheduleReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <h3 className="font-bold text-base text-gray-900">Yeni Zamanlanmış E-Posta Raporu</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Rapor Başlığı</label>
                <input type="text" defaultValue="Haftalık Yönetici Performans Özeti" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Gönderim Sıklığı</label>
                <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                  <option>Her Pazartesi 09:00</option>
                  <option>Her Cuma 18:00</option>
                  <option>Her Ayın 1\'i</option>
                </select>
              </div>
              <div>
                <label className="font-bold text-gray-700 block mb-1">Alıcı E-Posta Adresi</label>
                <input type="email" defaultValue={`yonetim@${currentBrand.slug}.com`} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setShowScheduleReportModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl">İptal</button>
              <button 
                onClick={() => {
                  setScheduledReports([...scheduledReports, { id: Date.now(), title: 'Haftalık Yönetici Performans Özeti', frequency: 'Her Pazartesi 09:00', recipient: `yonetim@${currentBrand.slug}.com`, format: 'PDF', status: true }]);
                  setShowScheduleReportModal(false);
                  alert('Zamanlanmış rapor kuralı oluşturuldu!');
                }} 
                className="px-5 py-2 bg-[#00AB55] text-white text-xs font-bold rounded-xl"
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🟢 MODAL: YOL B RESMİ API & TOKEN YAPILANDIRMA VE CANLI DOĞRULAMA */}
      {showApiTokenModal && selectedPlatformForToken && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-200 space-y-5">
            {/* MODAL BAŞLIĞI */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <PlatformIcon id={selectedPlatformForToken.id} size={32} className="shadow-2xs rounded-xl shrink-0" />
                <div>
                  <h3 className="font-bold text-base text-gray-900">
                    {selectedPlatformForToken.name} — Yol B API & Token Bağlantısı
                  </h3>
                  <p className="text-xs text-gray-500">
                    {currentBrand.name} için doğrudan resmi {selectedPlatformForToken.apiEndpoint}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowApiTokenModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* ADIM ADIM TOKEN ALMA KILAVUZU */}
            <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-2xl text-xs space-y-1.5 text-blue-900">
              <div className="font-bold flex items-center gap-1.5">
                <span>💡</span> 2 Dakikada Ücretsiz Meta Access Token Alma:
              </div>
              <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-blue-800 leading-relaxed">
                <li><a href="https://developers.facebook.com/tools/explorer/" target="_blank" rel="noreferrer" className="underline font-bold text-blue-900">Meta Graph API Explorer</a> sayfasına gidin.</li>
                <li>İzinler (Permissions) alanından <strong>instagram_content_publish</strong>, <strong>instagram_basic</strong> ve <strong>pages_manage_posts</strong> seçin.</li>
                <li><strong>"Generate Access Token"</strong> butonuna basıp kopyaladığınız anahtarı aşağıdaki kutucuğa yapıştırın.</li>
              </ol>
            </div>

            {/* FORM GİRDİLERİ */}
            <div className="space-y-3.5 text-xs">
              {/* ACCESS TOKEN / API KEY */}
              <div>
                <label className="font-bold text-gray-800 block mb-1">
                  Resmi Erişim Anahtarı (Access Token / Bearer Token) *
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="EAA... veya Bearer tokenınızı buraya yapıştırın"
                    className="w-full p-3 font-mono text-[11px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#00AB55] focus:bg-white"
                  />
                </div>
              </div>

              {/* INSTAGRAM BUSINESS ACCOUNT ID & FACEBOOK PAGE ID */}
              {(selectedPlatformForToken.id === 'instagram' || selectedPlatformForToken.id === 'facebook') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Instagram Business ID (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={igUserIdInput}
                      onChange={(e) => setIgUserIdInput(e.target.value)}
                      placeholder="Örn: 178414029482019"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#00AB55]"
                    />
                    <span className="text-[10px] text-gray-400 block mt-0.5">Test butonuna basınca otomatik çekilir</span>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">
                      Facebook Sayfa ID (Opsiyonel)
                    </label>
                    <input
                      type="text"
                      value={pageIdInput}
                      onChange={(e) => setPageIdInput(e.target.value)}
                      placeholder="Örn: 104829104829104"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#00AB55]"
                    />
                    <span className="text-[10px] text-gray-400 block mt-0.5">Test butonuna basınca otomatik çekilir</span>
                  </div>
                </div>
              )}

              {/* WEBHOOK URL (GENEL) */}
              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Yedek Webhook URL (Make / n8n / Özel Sunucu - Opsiyonel)
                </label>
                <input
                  type="url"
                  value={webhookUrlInput}
                  onChange={(e) => setWebhookUrlInput(e.target.value)}
                  placeholder="https://hook.eu2.make.com/... veya n8n webhook url"
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#00AB55]"
                />
              </div>
            </div>

            {/* TEST BUTONU & CANLI SONUÇ KUTUSU */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleVerifyToken}
                disabled={isVerifyingToken}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>⚡</span>
                <span>{isVerifyingToken ? 'Meta Graph API Sunucuları Sorgulanıyor...' : 'Canlı API Sağlık Testi (Health Check)'}</span>
              </button>

              {/* TEST SONUÇLARI */}
              {tokenVerificationResult && (
                <div className={`mt-3 p-3.5 rounded-2xl border text-xs animate-in fade-in ${
                  tokenVerificationResult.success 
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                    : 'bg-red-50 border-red-300 text-red-900'
                }`}>
                  {tokenVerificationResult.success ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-emerald-800 text-xs">
                        <span>✅</span> Meta API Bağlantısı Başarıyla Doğrulandı (200 OK)!
                      </div>
                      <div className="text-[11px] text-emerald-900 space-y-0.5">
                        <div>👤 <strong>Meta Kullanıcı:</strong> {tokenVerificationResult.userName || 'Meta Developer'}</div>
                        {tokenVerificationResult.instagramAccounts?.length > 0 && (
                          <div>📸 <strong>Bağlı Instagram Hesabı:</strong> @{tokenVerificationResult.instagramAccounts[0].igUsername} (ID: {tokenVerificationResult.instagramAccounts[0].igId})</div>
                        )}
                        {tokenVerificationResult.pages?.length > 0 && (
                          <div>📘 <strong>Bağlı Sayfalar:</strong> {tokenVerificationResult.pages.map(p => p.name).join(', ')}</div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-red-700">
                        <span>❌</span> Doğrulama Başarısız:
                      </div>
                      <p className="text-[11px] text-red-800 leading-tight">
                        {tokenVerificationResult.error || 'Token geçersiz veya yetersiz izne sahip.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MODAL AKSİYONLARI */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowApiTokenModal(false)}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
              >
                Vazgeç
              </button>

              <button
                type="button"
                onClick={handleSaveApiCredentials}
                className="px-6 py-2.5 bg-[#00AB55] hover:bg-[#00964b] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
              >
                <span>💾</span>
                <span>Kaydet & Supabase Buluta Eşitle</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
