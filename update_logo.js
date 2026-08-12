import fs from 'fs';

const b64 = fs.readFileSync('public/logo_base64.txt', 'utf8').trim();

const code = `import React from 'react';

/**
 * AremHub 3D Holographic Monogram Logo Component (Konsept 1 - Obsidyen & Neon Siyan)
 */
const LOGO_BASE64 = 'data:image/jpeg;base64,${b64}';

export default function AremHubLogo({ size = 'md', showText = true, className = '' }) {
  const sizeMap = {
    sm: { icon: 40, font: '1.25rem', tag: '0.62rem' },
    md: { icon: 48, font: '1.45rem', tag: '0.68rem' },
    lg: { icon: 60, font: '1.85rem', tag: '0.75rem' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div 
      className={\`aremhub-logo-wrapper \${className}\`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', userSelect: 'none' }}
    >
      {/* 3D Holographic Monogram Image Badge */}
      <div 
        style={{
          width: \`\${currentSize.icon}px\`,
          height: \`\${currentSize.icon}px\`,
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1.5px solid rgba(0, 240, 255, 0.5)',
          boxShadow: '0 0 22px rgba(0, 240, 255, 0.3), 0 6px 16px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090D16',
          flexShrink: 0
        }}
      >
        <img 
          src={LOGO_BASE64} 
          alt="AremHub 3D Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Typography & Tagline */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span 
              style={{ 
                fontSize: currentSize.font, 
                fontWeight: '900', 
                color: 'var(--text-main, #FFFFFF)', 
                letterSpacing: '-0.035em', 
                fontFamily: 'var(--font-display, inherit)',
                lineHeight: 1.1
              }}
            >
              arem<span style={{ color: '#00F0FF', textShadow: '0 0 12px rgba(0, 240, 255, 0.4)' }}>hub</span>
            </span>
            <span 
              className="stat-pill stat-lime" 
              style={{ 
                fontSize: currentSize.tag, 
                padding: '2px 7px',
                borderRadius: '6px',
                fontWeight: '700',
                background: 'rgba(0, 240, 255, 0.12)',
                color: '#00F0FF',
                border: '1px solid rgba(0, 240, 255, 0.3)'
              }}
            >
              aremhub.com
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted, #94A3B8)', fontWeight: '600', marginTop: '2px' }}>
            Web Yazılım • Meta & Google Ads • Dijital Ürünler
          </span>
        </div>
      )}
    </div>
  );
}
`;

fs.writeFileSync('src/components/AremHubLogo.jsx', code);
console.log('src/components/AremHubLogo.jsx successfully updated with Concept 1 3D Logo Base64!');
