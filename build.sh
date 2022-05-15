#!/bin/sh

./node_modules/.bin/tsc
./utils/nettoyage.js

# Temporaire, serait à mettre dans une cron
./utils/majATrouver.js
