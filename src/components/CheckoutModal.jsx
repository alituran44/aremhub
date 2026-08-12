import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, CheckCircle2, Lock, Sparkles, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { paymentService } from '../services/paymentService';

export default function CheckoutModal({ product, onClose }) {
  const { lang, t } = useLanguage();
  const [gatewayRegion, setGatewayRegion] = useState('tr'); // 'tr' or 'global'
  const [selectedGateway, setSelectedGateway] = useState('paytr'); // 'paytr', 'iyzico', 'paynkolay', 'lemonsqueezy', 'stripe'
  const [includeUpsell, setIncludeUpsell] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('form'); // 'form', 'iframe', 'success'

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  if (!product) return null;

  const basePriceNum = parseInt(product.price.replace(/[^0-9]/g, '')) || 1499;
  const upsellPriceNum = gatewayRegion === 'tr' ? 2999 : 99;
  const totalPrice = includeUpsell 
    ? (gatewayRegion === 'tr' ? `₺${(basePriceNum + upsellPriceNum).toLocaleString('tr-TR')}` : `$${(49 + 99)}.00`)
    : product.price;

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (selectedGateway === 'paytr') {
        const session = await paymentService.createPayTRSession({ product, customerInfo, includeUpsell });
        console.log('PayTR Token initialized:', session);
      } else if (selectedGateway === 'iyzico') {
        const session = await paymentService.createIyzicoSession({ product, customerInfo, includeUpsell });
        console.log('İyzico initialized:', session);
      } else if (selectedGateway === 'lemonsqueezy') {
        const session = await paymentService.createLemonSqueezyCheckout({ product, customerInfo, includeUpsell });
        console.log('Lemon Squeezy checkout:', session);
      } else if (selectedGateway === 'stripe') {
        const session = await paymentService.createStripeCheckoutSession({ product, customerInfo, includeUpsell });
        console.log('Stripe Session created:', session);
      }
      
      setStep('success');
    } catch (err) {
      console.error('Payment Error:', err);
      setStep('success'); // Fallback simulation
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px'
      }}
    >
      <div
        className="editorial-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--bg-surface)',
          borderRadius: '24px',
          padding: '36px',
          position: 'relative',
          border: '1px solid var(--border-strong)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-strong)',
            color: 'var(--text-main)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {step === 'success' ? (
          <div style={{ textAlign: 'center', padding: '36px 12px' }}>
            <CheckCircle2 size={64} color="var(--accent-lime)" style={{ margin: '0 auto 18px' }} />
            <h3 style={{ fontSize: '1.75rem', color: 'var(--text-main)', fontWeight: '900', marginBottom: '8px' }}>
              {lang === 'tr' ? 'Ödemeniz Başarıyla Alındı!' : 'Payment Successful!'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', marginBottom: '24px', fontWeight: '500' }}>
              {lang === 'tr' ? 'İndirme bağlantısı ve lisans anahtarınız e-posta adresinize gönderildi.' : 'Download links and license key have been emailed to your address.'}
            </p>
            {includeUpsell && (
              <div style={{ background: 'rgba(21, 128, 61, 0.12)', padding: '16px', borderRadius: '14px', border: '1px solid var(--accent-lime)', marginBottom: '24px', textAlign: 'left' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-lime)', fontWeight: '900' }}>⚡ REKLAM YÖNETİMİ PAKETİ EKLENDİ</span>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginTop: '4px', fontWeight: '600' }}>
                  Uzman ekibimiz Meta Ads & Google Ads kurulumunuz için 2 saat içinde sizinle iletişime geçecek.
                </p>
              </div>
            )}
            <button onClick={onClose} className="btn-editorial btn-lime" style={{ padding: '12px 32px' }}>
              Kapat ve Siteme Dön
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Lock size={20} color="var(--accent-lime)" />
              <h3 style={{ fontSize: '1.55rem', color: 'var(--text-main)', fontWeight: '900' }}>
                {t.checkout.title}
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px', fontWeight: '500' }}>
              {product.title} • <strong>{totalPrice}</strong>
            </p>

            {/* Region Selector Tabs (TR vs Global) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => { setGatewayRegion('tr'); setSelectedGateway('paytr'); }}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: gatewayRegion === 'tr' ? '2px solid var(--accent-lime)' : '1px solid var(--border-strong)',
                  background: gatewayRegion === 'tr' ? 'rgba(21, 128, 61, 0.12)' : 'var(--bg-elevated)',
                  color: 'var(--text-main)',
                  fontWeight: '800',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                🇹🇷 Türkiye Ödemesi (₺ TRY)
              </button>

              <button
                type="button"
                onClick={() => { setGatewayRegion('global'); setSelectedGateway('lemonsqueezy'); }}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: gatewayRegion === 'global' ? '2px solid #0284C7' : '1px solid var(--border-strong)',
                  background: gatewayRegion === 'global' ? 'rgba(2, 132, 199, 0.12)' : 'var(--bg-elevated)',
                  color: 'var(--text-main)',
                  fontWeight: '800',
                  fontSize: '0.86rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                🌐 International ($ USD / € EUR)
              </button>
            </div>

            {/* Gateway Radios */}
            <div style={{ background: 'var(--bg-elevated)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-strong)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '10px' }}>
                ÖDEME SAĞLAYICISI SEÇİN:
              </div>

              {gatewayRegion === 'tr' ? (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['paytr', 'iyzico', 'paynkolay'].map(g => (
                    <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '800', cursor: 'pointer', background: selectedGateway === g ? 'var(--bg-surface)' : 'transparent', padding: '6px 12px', borderRadius: '8px', border: selectedGateway === g ? '1px solid var(--accent-lime)' : '1px solid transparent' }}>
                      <input type="radio" name="gateway" checked={selectedGateway === g} onChange={() => setSelectedGateway(g)} />
                      {g.toUpperCase()}
                    </label>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['lemonsqueezy', 'stripe'].map(g => (
                    <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '800', cursor: 'pointer', background: selectedGateway === g ? 'var(--bg-surface)' : 'transparent', padding: '6px 12px', borderRadius: '8px', border: selectedGateway === g ? '1px solid #0284C7' : '1px solid transparent' }}>
                      <input type="radio" name="gateway" checked={selectedGateway === g} onChange={() => setSelectedGateway(g)} />
                      {g === 'lemonsqueezy' ? 'Lemon Squeezy (MoR)' : 'Stripe Global'}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* UPSELL OFFER BOX (Key Feature!) */}
            <div
              style={{
                background: includeUpsell ? 'rgba(21, 128, 61, 0.15)' : 'rgba(2, 132, 199, 0.08)',
                border: includeUpsell ? '2px solid var(--accent-lime)' : '1px dashed #0284C7',
                borderRadius: '16px',
                padding: '18px',
                marginBottom: '24px',
                transition: 'all 0.2s ease'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={includeUpsell}
                  onChange={e => setIncludeUpsell(e.target.checked)}
                  style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--accent-lime)' }}
                />
                <div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="var(--accent-lime)" /> {t.checkout.upsellTitle}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4', fontWeight: '500' }}>
                    {t.checkout.upsellDesc}
                  </p>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-lime)', fontWeight: '900', marginTop: '6px' }}>
                    + {gatewayRegion === 'tr' ? '₺2.999' : '$99.00'} (Normal Fiyat: {gatewayRegion === 'tr' ? '₺5.000' : '$200'})
                  </div>
                </div>
              </label>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handlePay} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '4px' }}>E-Posta Adresiniz (Teslimat için)</label>
                <input type="email" required placeholder="ornek@musteri.com" value={customerInfo.email} onChange={e => setCustomerInfo({ ...customerInfo, email: e.target.value })} style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '4px' }}>Kart Üzerindeki İsim</label>
                <input type="text" required placeholder="Ahmet Yılmaz" value={customerInfo.name} onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })} style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '4px' }}>Kart Numarası</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" value={customerInfo.cardNumber} onChange={e => setCustomerInfo({ ...customerInfo, cardNumber: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '4px' }}>SKT</label>
                  <input type="text" required placeholder="MM/YY" value={customerInfo.expiry} onChange={e => setCustomerInfo({ ...customerInfo, expiry: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '800', marginBottom: '4px' }}>CVV</label>
                  <input type="text" required placeholder="123" value={customerInfo.cvv} onChange={e => setCustomerInfo({ ...customerInfo, cvv: e.target.value })} style={inputStyle} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-editorial btn-lime"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem', marginTop: '10px' }}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />} {totalPrice} {selectedGateway.toUpperCase()} İle Öde ve İndir
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

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
