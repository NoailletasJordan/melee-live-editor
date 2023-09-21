# App pour la regie Lamelee

Utilise React, [Vite](https://vitejs.dev/), [Mantine](https://mantine.dev/)

## Instalation

- Créer une fichier `.env` a la racine du projet et y entrer la ligne `VITE_FIREBASE_API_KEY=<firebase-api-key>`
- Installer dépendances `$ npm i`
- (Optionnel) Lancer serveur de développement `$ npm run dev`

## Production

- `npm run build` Vite va créer la version de prod dans le dossier "/dist", ce dossier est ce qu'il faut fournir aux solutions d'hébergement

- (Optionnel / Recommandé) `$ npm run preview` pour lancer le serveur local sur le dossier "dist", utile pour vérifier que tout fonctionne sur la version "buildée"
