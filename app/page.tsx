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

  async function fetchMessages() {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
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
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">
          Laissez nous un message
        </h1>
        <p className="text-center text-slate-500 mb-8">
          Expose Cloud Computing - Docker
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10">
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          />
          <textarea
            placeholder="Votre message..."
            rows={3}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-y"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-medium rounded-lg transition"
          >
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>

        <h2 className="text-2xl font-bold text-slate-800 mb-4">Messages</h2>

        <div className="space-y-3">
          {messages.length === 0 && (
            <p className="text-slate-400 text-center py-8">Aucun message pour l'instant. Soyez le premier !</p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-lg p-4 border-l-4 border-blue-400 shadow-sm"
            >
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-slate-800">{m.name}</span>
                <span className="text-xs text-slate-400">{formatDate(m.createdAt)}</span>
              </div>
              <p className="text-slate-700 whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
