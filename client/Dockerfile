FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY .npmrc .npmrc

RUN npm i -g pnpm
RUN pnpm i

COPY tsconfig.json tsconfig.json
COPY public public
COPY codegen.yml codegen.yml
COPY src src
COPY .env .env

CMD npm start