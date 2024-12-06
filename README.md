# BookManagement
Book Management


Instructions pour Lancer le Projet avec Docker

    Configurer les Volumes et l'Image MySQL :
        Assurez-vous que la configuration MySQL (MYSQL_USER, MYSQL_PASSWORD, etc.) correspond au script de votre base de données db.sql.

    Construire et Lancer les Conteneurs :
        Depuis la racine du projet, exécutez :

    docker-compose up --build

Accès aux Services :

    Frontend : http://localhost:8080
    Backend API : http://localhost:3000
    MySQL : Port 3306 sur localhost (connectez-vous avec root et le mot de passe password).