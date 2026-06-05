# ObedNGL 🔒

> Ce que tu as peur de dire en Classe, faut dire ça ici.

Messages anonymes en temps réel. Next.js 14 + Supabase.

---

## ⚡ Setup en 5 minutes

### 1. Supabase — Créer la table

Dans ton projet Supabase, va dans **SQL Editor** et exécute :

```sql
-- Créer la table messages
create table messages (
  id uuid default gen_random_uuid() primary key,
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamp with time zone default now() not null
);

-- Activer Row Level Security
alter table messages enable row level security;

-- Tout le monde peut lire
create policy "Anyone can read messages"
  on messages for select
  using (true);

-- Tout le monde peut écrire (anonyme)
create policy "Anyone can insert messages"
  on messages for insert
  with check (true);

-- Activer la réplication temps réel
alter publication supabase_realtime add table messages;
```

### 2. Variables d'environnement

```bash
cp .env.local.example .env.local
```

Remplis avec tes clés Supabase (Dashboard → Settings → API) :
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 3. Lancer en local

```bash
npm install
npm run dev
```

---

## 🚀 Déploiement Vercel

```bash
# Option 1 : via CLI
npx vercel

# Option 2 : push sur GitHub → import sur vercel.com
```

N'oublie pas d'ajouter les **Environment Variables** dans les settings Vercel :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🖼️ OpenGraph Image

L'OG image est générée automatiquement via `/app/opengraph-image.jsx` (Next.js ImageResponse).  
Elle s'affiche quand tu partages le lien sur WhatsApp, Discord, Twitter, etc.

---

## Stack

- **Next.js 14** (App Router)
- **Supabase** (PostgreSQL + Realtime)
- **Vercel** (hosting + edge functions)
