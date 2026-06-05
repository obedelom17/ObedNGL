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
  const [animateIn, setAnimateIn] = useState(false);

  async function fetchMessages() {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
        setAnimateIn(true);
      }
    } catch (e) {
      console.error('Erreur chargement messages', e);
    }
  }

  useEffect(() => {
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
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-12 px-4">
      {/* Particules décoratives */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
            <span className="text-2xl">🔥</span>
            <span className="text-white/80 text-sm font-medium">Livre d'or anonyme</span>
            <span className="text-2xl">🔥</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-4 tracking-tight">
            Bienvenue sur ObedNGL
          </h1>

          <p className="text-lg md:text-xl text-purple-200/80 font-medium max-w-lg mx-auto leading-relaxed">
            Tous ce que tu as peur de dire en classe, faut dire ça ici 😈
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl mb-10 transform hover:scale-[1.01] transition-transform duration-300">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ton nom (ou reste anonyme...)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 transition-all duration-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-50">👤</span>
            </div>

            <div className="relative">
              <textarea
                placeholder="Balance ton secret... 🤐"
                rows={3}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-white/10 transition-all duration-300 resize-y"
              />
              <span className="absolute right-4 bottom-4 text-2xl opacity-50">💬</span>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3 text-red-200 text-sm flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 disabled:from-purple-500/50 disabled:to-pink-500/50 text-white font-bold text-lg rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span> Envoi en cours...
                </>
              ) : (
                <>
                  <span>🚀</span> Envoyer anonymement
                </>
              )}
            </button>
          </form>
        </div>

        {/* Compteur */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>💌</span> Messages
          </h2>
          <span className="bg-white/10 backdrop-blur-md text-white/80 px-3 py-1 rounded-full text-sm font-medium border border-white/10">
            {messages.length} secret{messages.length > 1 ? 's' : ''}
          </span>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <span className="text-6xl mb-4 block">🤫</span>
              <p className="text-white/50 text-lg">Aucun secret pour l'instant...</p>
              <p className="text-white/30 text-sm mt-1">Soyez le premier à craquer !</p>
            </div>
          )}

          {messages.map((m, index) => (
            <div
              key={m.id}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shadow-lg hover:bg-white/15 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 ${animateIn ? 'animate-fadeIn' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm">{m.name}</span>
                    <span className="text-xs text-white/40 ml-2">{formatDate(m.createdAt)}</span>
                  </div>
                </div>
                <span className="text-xl opacity-30">🕵️</span>
              </div>
              <p className="text-white/90 leading-relaxed pl-[52px] whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-white/20 text-sm">
          <p>🔒 100% anonyme • Aucune donnée personnelle stockée</p>
        </div>
      </div>
    </main>
  );
}
