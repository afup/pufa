#!/bin/sh

# le fichier nettoyage.js utilise le fichier instanceConfiguration.js, il a donc besoin que les fichiers typescript soient buildés
./node_modules/.bin/tsc

./utils/nettoyage.js

# le fichier nettoyage.js écrit des fichiers typescript, on rebuilde donc afin de générer les fichiers js correspondants
./node_modules/.bin/tsc
