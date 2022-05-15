#!/bin/sh

./utils/nettoyage.js
./node_modules/.bin/tsc

# Temporaire, serait à mettre dans une cron
./cron.sh
