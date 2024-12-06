# Utiliser une image officielle Nginx pour servir le frontend
FROM nginx:alpine

# Copier les fichiers du frontend dans le répertoire par défaut de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80 (par défaut pour Nginx)
EXPOSE 80

# Lancer Nginx (cela est défini par défaut dans l'image officielle Nginx)
CMD ["nginx", "-g", "daemon off;"]
