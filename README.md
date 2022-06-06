# PUFA

Jeu de lettres en ligne (et en français) basé sur SUTOM.
Le jeu se trouve à l'adresse https://pufa.afup.org

## Application

On accède à l'application via docker.
Vous retrouverez les ports dans le fichier `docker-compose.override.yml`.

Par défaut:
* PUFA : <http://localhost:4012/>

## Mise en place avec docker

* cloner le dépot
* effectuer un `make init` pour la copie des fichiers de config par défaut, l'installation des dépendances ainsi que l'init de la base de donnée avec les données de test.
* effectuer un `make docker-up` pour la création de l'infrastructure sous docker


### Autres commandes

* `make docker-bash` : lance un cli.

