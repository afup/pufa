#!/bin/sh

if [ -n "$CC_INSTANCE_ID" ]; then
  # Si on lance la commande sur clever cloud et que l'autoscaling est activé, on aura potentiellement plusieurs instances
  # Il faut donc éviter de lancer la cron plusieurs fois (cf https://www.clever-cloud.com/doc/administrate/cron/#deduplicating-crons).
  if [[ "$INSTANCE_NUMBER" != "0" ]]; then
    echo "Instance number is ${INSTANCE_NUMBER}. Stop here."
    exit 0
  fi
fi


BASEDIR=$(dirname $0)

cd $BASEDIR

./utils/genererMotTrouve.js
./utils/genereATrouverSuperApero.js
./utils/majATrouver.js
