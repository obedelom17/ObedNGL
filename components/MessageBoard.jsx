"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";

// Deterministic emoji + gradient from index
const AVATARS = ["👻", "🎭", "🦊", "🌙", "🔮", "🎪", "🦋", "🌊", "⚡", "🎯"];
const GRADIENTS = [
  "linear-gradient(135deg,#7c3aed,#ec4899)",
  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
  "linear-gradient(135deg,#ec4899,#f97316)",
  "linear-gradient(135deg,#10b981,#3b82f6)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#8b5cf6,#06b6d4)",
  "linear-gradient(135deg,#ef4444,#ec4899)",
  "linear-gradient(135deg,#14b8a6,#7c3aed)",
  "linear-gradient(135deg,#f97316,#eab308)",
  "linear-gradient(135deg,#06b6d4,#10b981)",
];

function getAvatarProps(id) {
  // Use last char code of UUID for determinism
  const idx = id.charCodeAt(id.length - 1) % 10;
  return { emoji: AVATARS[idx], gradient: GRADIENTS[idx] };
}

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(ts) {
  const d = new Date(ts);
  const today = new Date();
  const isToday =
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
  if (isToday) return `Aujourd'hui ${formatTime(ts)}`;
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  }) + ` · ${formatTime(ts)}`;
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line short" style={{ marginBottom: 12 }} />
      <div className="skeleton-line long" />
      <div className="skeleton-line medium" />
    </div>
  );
}

export default function MessageBoard() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState({ visible: false, text: "" });
  const textareaRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((text) => {
    setToast({ visible: true, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ visible: false, text });
    }, 3000);
  }, []);

  // Fetch initial messages
  useEffect(() => {
    async function fetchMessages() {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (!error) setMessages(data || []);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.find((m) => m.id === payload.new.id)) return prev;
            return [payload.new, ...prev];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed || sending) return;

    setSending(true);
    const { error } = await supabase
      .from("messages")
      .insert([{ content: trimmed }]);

    setSending(false);

    if (error) {
      showToast("❌ Erreur lors de l'envoi. Réessaie.");
    } else {
      setContent("");
      showToast("✓ Message envoyé anonymement !");
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSend();
    }
  };

  return (
    <>
      {/* Background orbs */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <div className="page-wrapper">
        <div className="container">
          {/* Header */}
          <header className="header">
            <div className="header-eyebrow">Anonyme · Libre · Instantané</div>
            <h1>ObedNGL</h1>
            <p className="header-sub">
              Bienvenue 👋 — <strong>Ce que tu as peur de dire en Classe,</strong>{" "}
              faut dire ça ici.
            </p>
          </header>

          {/* Compose */}
          <div className="compose-card">
            <div className="compose-label">Ton message</div>
            <textarea
              ref={textareaRef}
              className="compose-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Écris ce que tu penses vraiment… personne ne saura que c'est toi."
              rows={4}
              maxLength={500}
              disabled={sending}
            />
            <div className="compose-footer">
              <span className="compose-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                100% anonyme · Ctrl+Enter pour envoyer
              </span>
              <button
                className="btn-send"
                onClick={handleSend}
                disabled={!content.trim() || sending}
              >
                {sending ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Envoi…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Envoyer
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="messages-header">
            <h2 className="messages-title">Messages</h2>
            {!loading && (
              <span className="messages-count">
                {messages.length} {messages.length === 1 ? "message" : "messages"}
              </span>
            )}
          </div>

          <div className="message-list">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : messages.length === 0 ? (
              <div className="empty-state">
                <span className="empty-state-icon">🤫</span>
                <p className="empty-state-title">Aucun message pour l'instant</p>
                <p className="empty-state-sub">Sois le premier à briser le silence…</p>
              </div>
            ) : (
              messages.map((msg) => {
                const { emoji, gradient } = getAvatarProps(msg.id);
                return (
                  <div key={msg.id} className="message-card">
                    <div className="message-meta">
                      <span
                        className="message-avatar"
                        style={{ background: gradient }}
                        title="Anonyme"
                      >
                        {emoji}
                      </span>
                      <span className="message-author">Anonyme</span>
                      <span className="message-time">{formatDate(msg.created_at)}</span>
                    </div>
                    <p className="message-content">{msg.content}</p>
                  </div>
                );
              })
            )}
          </div>

          <footer className="footer">
            <p>ObedNGL &nbsp;·&nbsp; Tes mots, ton pouvoir.</p>
          </footer>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast.visible ? "visible" : ""}`}>{toast.text}</div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
