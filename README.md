# ObedNGL

Site de messages anonymes inspiré de ta capture d'écran. Déployable en 2 minutes sur Vercel.

## Déploiement rapide

### 1. Créer le projet sur Vercel
- Pousse ce dossier sur GitHub
- Importe le repo sur [vercel.com](https://vercel.com)

### 2. Créer la base de données KV
- Dans ton dashboard Vercel, va dans **Storage** → **Create Database** → **KV** (Upstash Redis)
- Choisis la région **Washington, D.C.** (us-east-1) pour la latence
- Connecte ce KV store à ton projet

### 3. Déployer
- Vercel détecte automatiquement Next.js
- Clique sur **Deploy**
- C'est en ligne !

## Développement local

```bash
npm install
npm run dev
```

> Nécessite les variables d'environnement KV pour fonctionner en local (copie-les depuis le dashboard Vercel).

## Fonctionnalités
- Envoi anonyme (nom optionnel)
- Affichage en temps réel (refresh auto toutes les 5s)
- Persistance des messages via Redis serverless
- Design responsive fidèle à ta capture
