'use client';

import { useState, useEffect, FormEvent } from 'react';

interface Message {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  async function fetchMessages() {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } catch (e) {
      console.error('Erreur chargement', e);
    }
  }

  useEffect(() => {
    setMounted(true);
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!msg.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message: msg }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erreur envoi');
      }
      setMsg('');
      await fetchMessages();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleString('fr-FR', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Gradient orb background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8b5cf6]/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8 text-sm text-[#94a3b8]">
            <span className="w-2 h-2 bg-[#0ea5e9] rounded-full animate-pulse" />
            Livre d'or anonyme
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-[#e2e8f0] to-[#94a3b8] bg-clip-text text-transparent">
              Bienvenue sur
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#0ea5e9] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent">
              ObedNGL
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#94a3b8] max-w-xl mx-auto leading-relaxed">
            Tous ce que tu as peur de dire en classe, faut dire ça ici
          </p>
        </div>

        {/* Formulaire */}
        <div className={`bg-[#111111] border border-[#222222] rounded-2xl p-6 md:p-8 mb-12 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Ton nom (optionnel)</label>
              <input
                type="text"
                placeholder="Anonyme"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222222] rounded-xl text-white placeholder-[#475569] focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm text-[#94a3b8] mb-2 font-medium">Ton message</label>
              <textarea
                placeholder="Balance ton secret..."
                rows={4}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222222] rounded-xl text-white placeholder-[#475569] focus:outline-none focus:border-[#0ea5e9]/50 focus:ring-1 focus:ring-[#0ea5e9]/20 transition-all resize-y"
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#0ea5e9] to-[#8b5cf6] hover:from-[#0284c7] hover:to-[#7c3aed] disabled:opacity-50 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#0ea5e9]/20"
            >
              {loading ? 'Envoi...' : 'Envoyer anonymement'}
            </button>
          </form>
        </div>

        {/* Messages header */}
        <div className={`flex items-center justify-between mb-8 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl font-bold text-white">
            Messages <span className="text-[#475569]">({messages.length})</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-[#475569]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            En direct
          </div>
        </div>

        {/* Messages list */}
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className={`text-center py-16 bg-[#111111] border border-[#222222] rounded-2xl transition-all duration-1000 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-4xl mb-4">🤫</div>
              <p className="text-[#475569]">Aucun secret pour l'instant</p>
              <p className="text-[#334155] text-sm mt-1">Soyez le premier à craquer</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={m.id}
              className={`bg-[#111111] border border-[#222222] rounded-xl p-5 hover:border-[#333333] transition-all duration-300 group ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${400 + i * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0ea5e9] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-white text-sm">{m.name}</span>
                    <span className="text-xs text-[#475569]">{formatDate(m.createdAt)}</span>
                    <span className="ml-auto text-xs bg-[#0ea5e9]/10 text-[#0ea5e9] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      Anonyme
                    </span>
                  </div>
                  <p className="text-[#cbd5e1] leading-relaxed whitespace-pre-wrap">{m.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-16 text-center text-[#334155] text-sm transition-all duration-1000 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p>🔒 100% anonyme • Aucune donnée personnelle stockée</p>
        </div>
      </div>
    </main>
  );
}
