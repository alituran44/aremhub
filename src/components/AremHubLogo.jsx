import React from 'react';

/**
 * AremHub Official Brand Logo Component
 * 1:1 Vector SVG reproduction of the brand logo design:
 * Harmonized with the site's green color tokens (var(--accent-lime)):
 * - Rich Emerald / Vibrant Lime Green (var(--accent-lime)) geometric 'A' triangle & 'HUB' text
 * - Electric Cyan (#0284C7) speed wing / chevron crossbar
 * - Bold AREMHUB wordmark ('AREM' in main text, 'HUB' in exact site green)
 */
export default function AremHubLogo({ size = 'md', showText = true, className = '', layout = 'horizontal' }) {
  const sizeMap = {
    sm: { icon: 34, font: '1.2rem', tag: '0.62rem' },
    md: { icon: 46, font: '1.48rem', tag: '0.68rem' },
    lg: { icon: 64, font: '2.2rem', tag: '0.75rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div 
      className={`aremhub-logo-wrapper ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '12px', 
        userSelect: 'none',
        flexDirection: layout === 'vertical' ? 'column' : 'row'
      }}
    >
      {/* Precision Vector Emblem Icon */}
      <div 
        style={{
          width: `${currentSize.icon}px`,
          height: `${currentSize.icon}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <svg 
          viewBox="0 0 300 280" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Main Green 'A' Polygon matching site green */}
          <path
            d="M 150 15 L 268 220 L 236 220 L 210 174 L 175 110 L 150 70 L 138 120 L 180 220 L 140 220 L 115 160 Z"
            fill="var(--accent-lime)"
          />

          {/* Electric Cyan Speed Chevron Wing */}
          <path
            d="M 28 220 L 136 42 L 110 140 L 235 120 L 100 178 L 48 200 Z"
            fill="#0284C7"
          />
        </svg>
      </div>

      {/* Typography ('AREM' Main + 'HUB' Exact Site Green) */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span 
              style={{ 
                fontSize: currentSize.font, 
                fontWeight: '900', 
                color: 'var(--text-main)', 
                letterSpacing: '0.02em', 
                fontFamily: 'var(--font-display)',
                lineHeight: 1.1,
                textTransform: 'uppercase'
              }}
            >
              AREM<span style={{ color: 'var(--accent-lime)' }}>HUB</span>
            </span>
            <span 
              className="stat-pill stat-lime" 
              style={{ 
                fontSize: currentSize.tag, 
                padding: '2px 7px',
                borderRadius: '6px',
                fontWeight: '800'
              }}
            >
              aremhub.com
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '2px' }}>
            Web Yazılım • Meta & Google Ads • Dijital Ürünler
          </span>
        </div>
      )}
    </div>
  );
}
