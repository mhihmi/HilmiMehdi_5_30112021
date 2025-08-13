# Utilise une image Node officielle comme image de base
FROM node:20-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install --production

# Copie le reste du code source
COPY . .

# Expose le port utilisé par l'API (à adapter si besoin)
EXPOSE 3000

# Commande pour démarrer l'API
CMD ["node", "server.js"]
