#!/bin/sh

BASEDIR=$(dirname $0)

cd $BASEDIR

./utils/genererMotTrouve.js
./utils/genereATrouverSuperApero.js
./utils/majATrouver.js
