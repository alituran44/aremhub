import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Building2, 
  ExternalLink, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  Search,
  Sliders,
  Check,
  X
} from 'lucide-react';

export default function AgencyClients({ clients, onOpenClientModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.package === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', borderLeft: '4px solid var(--arem-a)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="badge badge-a">Müşteri Portalı & CRM</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '6px' }}>
              Ajans Müşterileri ve Hizmet Paketleri
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '700px' }}>
              Ajansınızın aktif hizmet verdiği markalar, aylık retainer paketleri, reklam bütçeleri ve proje ilerleme durumları.
            </p>
          </div>

          <button className="btn btn-primary" onClick={onOpenClientModal} style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}>
            <Plus size={16} /> Yeni Müşteri Hesabı Ekle
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All', 'Full AREM Paket', 'Ads & Growth', 'Yazılım & SaaS', 'Sosyal Medya'].map(pkg => (
            <button
              key={pkg}
              onClick={() => setStatusFilter(pkg)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: statusFilter === pkg ? '1px solid #06B6D4' : '1px solid var(--border-subtle)',
                background: statusFilter === pkg ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-card)',
                color: statusFilter === pkg ? '#06B6D4' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {pkg === 'All' ? 'Tüm Müşteriler' : pkg}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '260px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Müşteri veya firma ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '12px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
        </div>

      </div>

      {/* Clients Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {filteredClients.map(client => (
          <div key={client.id} className="glass-card" style={{ padding: '28px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '14px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#06B6D4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.2rem',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {client.company.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontWeight: '800' }}>{client.company}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {client.name} • {client.email}
                    </div>
                  </div>
                </div>

                <span className="badge badge-a" style={{ fontSize: '0.72rem' }}>
                  {client.package}
                </span>
              </div>

              {/* Retainer & Ads Metrics Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                padding: '14px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '16px'
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Aylık Ajans Hizmet Ücreti</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>
                    ₺{client.monthlyRetainer.toLocaleString('tr-TR')}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Yönetilen Reklam Bütçesi</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFF', marginTop: '2px' }}>
                    ₺{client.managedAdsBudget.toLocaleString('tr-TR')}
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>
                  Aktif Verilen Hizmetler:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {client.activeServices.map(srv => (
                    <span key={srv} style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Card Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sözleşme: <strong style={{ color: '#FFF' }}>{client.contractTerm}</strong>
              </div>
              <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                Müşteri Detayı & Raporlar →
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
