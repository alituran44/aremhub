import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  RefreshCw, 
  Layers,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

export default function OmniRouteWidget({ apps }) {
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash');
  const [prompt, setPrompt] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: 'Merhaba! Ben OmniRoute Yapay Zeka Asistanıyım. AremHub ekosistemindeki tüm yazılımlar (AremCRM, AremSEO, AdsSync Gateway vb.), sosyal medya veya Meta/Google Ads stratejileriniz hakkında sorularınızı yanıtlayabilir, özel reklam metinleri ve proje açıklamaları üretebilirim.',
      model: 'OmniRoute Core'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const models = [
    { id: 'gemini-3-flash', name: 'Gemini 3 Flash', provider: 'Google', speed: 'Ultra Hızlı', badge: 'Önerilen' },
    { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', speed: 'Derin Analiz', badge: 'Pro' },
    { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', speed: 'Yaratıcı Metin', badge: 'Yazarlık' },
    { id: 'deepseek-r1', name: 'DeepSeek R1', provider: 'DeepSeek', speed: 'Kod & Mantık', badge: 'Mantık' },
    { id: 'qwen3.5', name: 'Qwen 3.5 Coder', provider: 'Alibaba', speed: 'Kod Üretimi', badge: 'Geliştirici' }
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const userMsg = { sender: 'user', text: prompt };
    setChatHistory(prev => [...prev, userMsg]);
    const currentPrompt = prompt;
    setPrompt('');
    setLoading(true);

    // Simulate OmniRoute AI response based on selected model
    setTimeout(() => {
      let aiResponseText = '';
      const lower = currentPrompt.toLowerCase();

      if (lower.includes('yazılım') || lower.includes('crm') || lower.includes('seo') || lower.includes('proje')) {
        aiResponseText = `OmniRoute (${selectedModel}) Analizi: AremHub üzerindeki projeleriniz (AremCRM Pro, AremSEO Analyzer, AdsSync Gateway) yüksek performanslı mikroservis mimarisine sahiptir. %99.99 Uptime ve 18ms latency değeri ile müşterilerinize güvenilir çözümler sunabilirsiniz.`;
      } else if (lower.includes('ads') || lower.includes('reklam') || lower.includes('roas') || lower.includes('bütçe')) {
        aiResponseText = `OmniRoute (${selectedModel}) Reklam Stratejisi: Meta Ads ve Google Ads kampanyalarınızda dönüşüm API'si (CAPI) kullanarak hedefleme maliyetlerini %35 düşürebilir ve ROAS oranınızı 4.2x üzerine çıkarabilirsiniz.`;
      } else if (lower.includes('sosyal') || lower.includes('instagram') || lower.includes('linkedin')) {
        aiResponseText = `OmniRoute (${selectedModel}) İçerik Önerisi: "🚀 AremHub ile tüm dijital varlıklarınız ve reklamlarınız tek bir üste! Detaylı bilgi ve canlı demo için: aremhub.com #AremHub #SaaS #Growth"`;
      } else {
        aiResponseText = `OmniRoute Yönlendiricisi (${selectedModel}): "${currentPrompt}" sorunuz için AremHub yapay zeka ağı aktif. Projeleriniz ve dijital pazarlama süreçleriniz için en uygun AI modelini seçerek işlem yapmaya devam edebilirsiniz.`;
      }

      setChatHistory(prev => [...prev, {
        sender: 'ai',
        text: aiResponseText,
        model: selectedModel
      }]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="glass-card" style={{ padding: '28px', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(6, 182, 212, 0.05) 100%)' }}>
      
      {/* Widget Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', fontWeight: '800' }}>
              OmniRoute AI Asistanı & Model Yönlendiricisi
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Tüm yazılımlarınız ve reklam stratejileriniz için aktif 58+ AI modeli.
            </p>
          </div>
        </div>

        <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', color: '#10B981', fontWeight: '600', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          ● OmniRoute Gateway Aktif (58 Model)
        </span>
      </div>

      {/* Model Selector Bar */}
      <div style={{ marginBottom: '18px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '600' }}>
          Aktif AI Modelini Seçin:
        </label>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {models.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '12px',
                border: selectedModel === m.id ? '1px solid #8B5CF6' : '1px solid var(--border-subtle)',
                background: selectedModel === m.id ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-card)',
                color: selectedModel === m.id ? '#FFF' : 'var(--text-secondary)',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <Cpu size={14} color={selectedModel === m.id ? '#8B5CF6' : 'var(--text-muted)'} />
              <span>{m.name}</span>
              <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-muted)' }}>
                {m.provider}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Box */}
      <div style={{
        height: '240px',
        overflowY: 'auto',
        background: 'var(--bg-darkest)',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '16px'
      }}>
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: '14px',
              background: msg.sender === 'user' 
                ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' 
                : 'rgba(255, 255, 255, 0.04)',
              border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
              color: '#FFF',
              fontSize: '0.88rem',
              lineHeight: '1.5'
            }}
          >
            {msg.sender === 'ai' && (
              <div style={{ fontSize: '0.7rem', color: '#8B5CF6', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Sparkles size={11} /> {msg.model || 'OmniRoute AI'}
              </div>
            )}
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: 'flex-start', color: '#8B5CF6', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RefreshCw size={14} className="spin-icon" /> OmniRoute yanıt üretiyor...
          </div>
        )}
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Yazılımlar, Ads reklamları veya içerik stratejisi hakkında sorun..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'var(--bg-darkest)',
            border: '1px solid var(--border-subtle)',
            color: '#FFF',
            fontSize: '0.9rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="btn btn-primary"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #6366F1)' }}
        >
          <Send size={16} /> Gönder
        </button>
      </form>

    </div>
  );
}
