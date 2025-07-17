# Utiliser une image Node officielle
FROM node:22-alpine

# Définir le dossier de travail dans le conteneur
WORKDIR /app

# Copier uniquement package.json et package-lock.json (ou package-lock.json si tu l'as)
COPY package*.json ./

# Installer les dépendances (toutes, sans --omit=dev)
RUN npm ci

# Copier tout le contenu du projet dans le conteneur
COPY . .

# Exposer le port de l'application (adapte selon ton app)
EXPOSE 3000

# Lancer l'application avec nodemon (si tu veux démarrer en mode dev)
CMD ["nodemon", "src/index.ts", "--legacy-watch"]
