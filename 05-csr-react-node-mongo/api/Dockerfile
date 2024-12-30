FROM node:alpine

WORKDIR /usr/src/server

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN npm ci

COPY ./ ./

EXPOSE 3000

CMD ["yarn", "start"]


