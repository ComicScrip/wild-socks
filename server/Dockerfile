FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc .npmrc
RUN npm i -g pnpm
RUN pnpm i

COPY src src
COPY tsconfig.json tsconfig.json
COPY .env .env

CMD pnpm start
