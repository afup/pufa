#!/bin/sh

./node_modules/.bin/tsc
./utils/melangerATrouver.js
./utils/nettoyage.js
./node_modules/.bin/tsc

# Temporaire, serait à mettre dans une cron
./utils/majATrouver.js