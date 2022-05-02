# PlaylistChill

Application d'écoute et de recommandation de musique 

Instalation :

Dans le dossier "frontend" ainsi que dans le dossier "back" utiliser yarn install.

Dans le dossier "back" se trouve la structure de base de données dans "script". Les 3 fichiers sont à exécuter dans PGAdmin (postgresql).

Enfin le .env est à crée dans le dossier back sous la forme : 

PGPORT=5000

PG_URL=postgres://postgres:mot_de_passe_postgres@localhost/nom_de_la_base_de_donnée

L'application se lance avec la commande yarn start(nodemon est requis), éxécutée dans les dossiers frontend et back de l'application.