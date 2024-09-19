Steam Library - Application de Gestion de Jeux

Niveau 0
Cette application permet de gérer une bibliothèque de jeux vidéo. Elle est construite en utilisant un backend Node.js avec Express et MongoDB pour la gestion des données, et un frontend en Vue.js pour l'interface utilisateur.

--BACKEND--
L'application permet d'ajouter des jeux, de les afficher dans une liste et de les supprimer. Les jeux ajoutés sont sauvegardés dans une base de données MongoDB.

Fonctionnalités
Liste des Jeux : Affiche tous les jeux stockés dans la base de données MongoDB.
Ajout de Jeu : Permet d'ajouter un nouveau jeu via un formulaire. Ce jeu est ensuite sauvegardé dans MongoDB.
Suppression de Jeu : Permet de supprimer un jeu spécifique de la liste, ainsi que de la base de données.
Backend (Node.js + Express)
Le backend est construit avec Express et connecté à une base de données MongoDB. Il expose plusieurs endpoints pour la gestion des jeux.

Endpoints Disponibles
GET /games : Récupère tous les jeux depuis MongoDB.
POST /games : Permet d'ajouter un jeu à MongoDB. Les champs obligatoires sont title, genre, description, et releaseDate.
DELETE /games/
: Supprime un jeu de MongoDB selon son ID.
Frontend (Vue.js)

--FRONTEND--
Le frontend est construit en Vue.js et permet à l'utilisateur d'interagir avec l'application via une interface simple. Il se compose de deux écrans principaux :

Liste des Jeux : Affiche la bibliothèque de jeux.
Ajout de Jeu : Affiche un formulaire pour ajouter un jeu à la base de données.
L'utilisateur peut naviguer entre ces écrans via des liens. Le formulaire d'ajout de jeu envoie une requête POST au backend pour ajouter un jeu à la base de données.