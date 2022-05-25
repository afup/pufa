#!/bin/sh

BASEDIR=$(dirname $0)

cd $BASEDIR

./utils/genererMotTrouve.js
./utils/majATrouver.js
