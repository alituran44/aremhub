import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  PieChart,
  BarChart2
} from 'lucide-react';

export default function AgencyFinance({ invoices, onAddInvoice }) {
  const totalRevenue = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const paidRevenue = invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div className="glass-card" style={{ padding: '32px', borderRadius: '24px', borderLeft: '4px solid var(--arem-r)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="badge badge-r">Ajans Finans & Retainer Katmanı</span>
            <h2 style={{ fontSize: '1.8rem', color: '#FFF', marginTop: '6px' }}>
              Ajans Gelirleri, Faturalar ve Retainer Raporu
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '6px', maxWidth: '700px' }}>
              Aylık tekrarlayan ajans gelirleri (MRR), müşteri sözleşme ödemeleri, kesilen faturalar ve tahsilat takibi.
            </p>
          </div>
        </div>
      </div>

      {/* Financial KPI Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        
        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={14} color="#10B981" /> Toplam Aylık Ajans Cirosu (MRR)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10B981', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            ₺{totalRevenue.toLocaleString('tr-TR')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} color="#10B981" /> Tahsil Edilen Gelir
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#FFF', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            ₺{paidRevenue.toLocaleString('tr-TR')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} color="#F59E0B" /> Bekleyen Tahsilatlar
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#F59E0B', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            ₺{pendingRevenue.toLocaleString('tr-TR')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={14} color="#06B6D4" /> Tahmini Kar Marjı
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#06B6D4', marginTop: '6px', fontFamily: 'var(--font-display)' }}>
            %68.4 Net Kar
          </div>
        </div>

      </div>

      {/* Invoices Table */}
      <div className="glass-card" style={{ padding: '24px', borderRadius: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={18} color="#10B981" /> Son Kesilen Fatura ve Retainer Ödemeleri
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Fatura No</th>
                <th>Müşteri / Firma</th>
                <th>Hizmet Paketi</th>
                <th>Tutar (₺)</th>
                <th>Vade Tarihi</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: '700', color: '#06B6D4' }}>{inv.invoiceNo}</td>
                  <td style={{ fontWeight: '600', color: '#FFF' }}>{inv.clientName}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{inv.packageName}</td>
                  <td style={{ fontWeight: '700', color: '#10B981' }}>₺{inv.amount.toLocaleString('tr-TR')}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{inv.dueDate}</td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: inv.status === 'paid' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: inv.status === 'paid' ? '#10B981' : '#F59E0B'
                    }}>
                      {inv.status === 'paid' ? '✓ Ödendi' : '⏳ Bekliyor'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
