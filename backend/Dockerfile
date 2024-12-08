# Utiliser une image officielle Node.js
FROM node:16

# Définir le répertoire de travail
WORKDIR /backend

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu du backend dans l'image Docker
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 3000

# Lancer l'application
CMD ["node", "server.js"]
