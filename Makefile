# Dans 3 ans on aura potentiellement un souci avec les données de test
MOTS_A_GENERER=1000

docker-up: dirs docker-compose.override.yml
	docker-compose up

init: dirs
	make node_modules
	docker-compose run --rm node /app/node_modules/.bin/tsc
	docker-compose run --rm node /app/utils/genererMotTrouve.js $(MOTS_A_GENERER)
	docker-compose run --rm node /app/utils/genereATrouverSuperApero.js 0
	docker-compose run --rm node /app/utils/majATrouver.js

node_modules: package-lock.json package.json
	docker-compose run --rm node npm install

docker-bash:
	docker-compose run --rm node /bin/sh

dirs: data_shared public_mots

data_shared:
	mkdir -p data_shared

public_mots:
	mkdir -p public/mots

docker-compose.override.yml:
	cp docker-compose.override.yml-dist docker-compose.override.yml
