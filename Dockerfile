# Étape 1 : Utiliser une image Node.js officielle (version alpine légère)
FROM node:18-alpine

# Étape 2 : Définir le répertoire de travail à l’intérieur du conteneur
WORKDIR /app

# Étape 3 : Copier le fichier package.json et package-lock.json
COPY package.json package-lock.json ./

# Étape 4 : Installer les dépendances de l'application
RUN npm install

# Étape 5 : Copier tous les fichiers du projet dans le répertoire de travail du conteneur
COPY . .

# Étape 6 : Exposer le port 5000
EXPOSE 5000

# Étape 7 : Définir la commande par défaut pour démarrer l'application
CMD ["npm", "start"]
