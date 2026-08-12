import React from 'react';
import { LayoutDashboard, Code2, Target, Share2, FolderKanban, ShoppingBag } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'digital-store-admin', label: 'Dijital Mağaza Paneli 🛒', icon: ShoppingBag },
    { id: 'app-hub', label: 'Yazılımlar Hub', icon: Code2 },
    { id: 'ads-hub', label: 'Ads Performans', icon: Target },
    { id: 'social-hub', label: 'Sosyal Medya', icon: Share2 },
    { id: 'media-hub', label: 'Medya & Tasarım', icon: FolderKanban }
  ];

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="btn-editorial"
            style={{
              padding: '10px 18px',
              fontSize: '0.85rem',
              background: isActive ? 'var(--accent-lime)' : 'var(--bg-surface)',
              color: isActive ? '#080A0F' : 'var(--text-muted)',
              border: isActive ? '1px solid var(--accent-lime)' : '1px solid var(--border-subtle)'
            }}
          >
            <Icon size={16} /> {tab.label}
          </button>
        );
      })}
    </div>
  );
}
