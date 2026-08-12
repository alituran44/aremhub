import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';

export default function ContactSection({ onOpenQuoteModal, onOpenCalendlyModal }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Web Yazılım & Tasarım');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 2500);
  };

  return (
    <section id="contact" style={{ marginBottom: '60px', width: '100%' }}>
      
      {/* Centered Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px', maxWidth: '840px', margin: '0 auto 36px' }}>
        <span className="stat-pill stat-lime" style={{ marginBottom: '12px' }}>İletişim & Hızlı Teklif</span>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--text-main)', marginTop: '6px', fontWeight: '800', lineHeight: '1.2' }}>
          Projenizi Başlatmak İçin <span className="gradient-text-arem">Bize Ulaşın</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '10px', lineHeight: '1.6', fontWeight: '500' }}>
          Web yazılımı, Meta/Google Ads yönetimi veya sosyal medya büyütme projeleriniz için 24 saat içinde ücretsiz analiz ve teklif alın.
        </p>
      </div>

      {/* 2 Equal Height Cards (alignItems: stretch) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', alignItems: 'stretch' }}>
        
        {/* Contact Info & Quick Channel Box */}
        <div className="editorial-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '800' }}>İletişim Kanallarımız</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: '1.6', fontWeight: '500' }}>
                Bize dilediğiniz kanaldan ulaşabilirsiniz. WhatsApp ekibimiz anında yanıt vermektedir.
              </p>
            </div>

            {/* WhatsApp Direct Action Banner */}
            <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(22, 163, 74, 0.08)', border: '1px solid rgba(22, 163, 74, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <MessageCircle size={24} color="var(--accent-lime)" />
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)' }}>Anında WhatsApp İletişimi</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>7/24 Hızlı yanıt süresi</div>
                </div>
              </div>
              <a
                href="https://wa.me/905000000000?text=Merhaba%20aremhub,%20web%20yaz%C4%B1l%C4%B1m%20ve%20reklam%20teklifi%20almak%20istiyorum."
                target="_blank"
                rel="noreferrer"
                className="btn-editorial btn-lime"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <MessageCircle size={16} /> WhatsApp Destek Hattı İle Görüş
              </a>
            </div>

            {/* Calendly Appointment Action */}
            <div style={{ padding: '20px', borderRadius: '18px', background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Calendar size={24} color="#0284C7" />
                <div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--text-main)' }}>Online Toplantı / Randevu Takvimi</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600' }}>15 Dakikalık ücretsiz keşif görüşmesi</div>
                </div>
              </div>
              <button
                onClick={onOpenCalendlyModal}
                className="btn-editorial btn-outline-editorial"
                style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
              >
                <Calendar size={16} /> Takvimden Randevu Oluştur (Calendly)
              </button>
            </div>
          </div>

          {/* Contact Details List at Bottom */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <Mail size={18} color="#0284C7" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Kurumsal E-Posta:</div>
                <strong style={{ color: 'var(--text-main)' }}>bilgi@aremhub.com</strong> • <strong style={{ color: 'var(--text-main)' }}>hello@aremhub.com</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <Phone size={18} color="var(--accent-lime)" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Telefon & WhatsApp:</div>
                <strong style={{ color: 'var(--text-main)' }}>+90 (850) 885 00 00</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <MapPin size={18} color="#6D28D9" />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Lokasyon & Üs:</div>
                <strong style={{ color: 'var(--text-main)' }}>Levent Plaza, Maslak / İstanbul</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Quick Quote Form Box */}
        <div className="editorial-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
          <div>
            <h3 style={{ fontSize: '1.45rem', color: 'var(--text-main)', marginBottom: '8px', fontWeight: '800' }}>Hızlı Teklif İsteği</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', fontWeight: '500' }}>
              Formu doldurun, uzman ekibimiz 24 saat içinde detaylı teknik ve reklam analizini hazırlayıp e-posta adresinize iletsin.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <CheckCircle2 size={56} color="#16A34A" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.35rem', fontWeight: '800' }}>Teklif Talebiniz Başarıyla Alındı!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '6px', fontWeight: '500' }}>
                  `bilgi@aremhub.com` üzerinden en kısa sürede sizinle iletişime geçeceğiz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '800' }}>Adınız & Soyadınız / Şirket Unvanı</label>
                  <input type="text" required placeholder="Örn: Ahmet Yılmaz - TechCorp" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '800' }}>E-Posta Adresi</label>
                    <input type="email" required placeholder="ahmet@firma.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '800' }}>Telefon Numarası</label>
                    <input type="tel" required placeholder="0500 000 0000" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '800' }}>İlgilendiğiniz Hizmet</label>
                  <select value={service} onChange={e => setService(e.target.value)} style={inputStyle}>
                    <option value="Web Yazılım & Tasarım">Web Geliştirme & Özel Yazılım</option>
                    <option value="Meta & Google Ads">Meta & Google Ads Performans Yönetimi</option>
                    <option value="Sosyal Medya Yönetimi">Sosyal Medya & İçerik Üretimi</option>
                    <option value="Tüm Paketler">Tüm Dijital Büyüme Paketi</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '6px', fontWeight: '800' }}>Proje Notları & Hedefleriniz</label>
                  <textarea rows={3} required placeholder="Projenizden veya hedeflerinizden kısaca bahsedin..." value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>

                <button type="submit" className="btn-editorial btn-lime" style={{ padding: '14px', width: '100%', justifyContent: 'center', marginTop: '4px' }}>
                  <Send size={16} /> Teklif Talebini Gönder
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </section>
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
