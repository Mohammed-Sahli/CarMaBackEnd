FROM node:22-alpine

# Installer dépendances système minimales
RUN apk add --no-cache bash

# Dossier de travail
WORKDIR /app

# Copie package.json et installation
COPY package*.json ./

# Installation des dépendances (utilise les devDependencies car NODE_ENV=development)
RUN npm install

# Copie du code source
COPY . .

# Port exposé
EXPOSE 3000

# Commande de lancement
CMD ["npx", "nodemon", "src/index.ts", "--legacy-watch", "--watch", "src"]
