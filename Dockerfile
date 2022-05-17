FROM node:16-alpine

ARG MODE=production

ENV NODE_ENV=$MODE

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN ./node_modules/.bin/tsc

EXPOSE 4000

CMD ["npm", "run", "build-and-start-prod"]
