FROM node:16.13.0-alpine

RUN apk add dumb-init

WORKDIR /app

ENV NODE_ENV=development
COPY package*.json ./
RUN npm install --silent

COPY . .

RUN npm run build


CMD ["dumb-init","npm","run" , "start:dev"]




