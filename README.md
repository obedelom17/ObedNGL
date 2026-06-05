# ObedNGL

Site de messages anonymes. Déployable en 2 minutes sur Vercel.

## Déploiement rapide

### 1. Créer le projet sur Vercel
- Pousse ce dossier sur GitHub
- Importe le repo sur [vercel.com](https://vercel.com)

### 2. Créer la base de données Redis
- Va sur [vercel.com/marketplace](https://vercel.com/marketplace?category=storage&search=redis)
- Cherche **Upstash Redis** → Install
- Crée un store et connecte-le à ton projet
- Vercel injectera automatiquement `UPSTASH_REDIS_REST_URL` et `UPSTASH_REDIS_REST_TOKEN`

### 3. Déployer
- Vercel détecte automatiquement Next.js
- Clique sur **Deploy**
- C'est en ligne !

## Développement local

```bash
npm install
npm run dev
```

> Nécessite les variables d'environnement Upstash pour fonctionner en local.

## Fonctionnalités
- Envoi anonyme (nom optionnel)
- Affichage en temps réel (refresh auto toutes les 5s)
- Persistance des messages via Upstash Redis
- Design responsive fidèle à la capture originale
