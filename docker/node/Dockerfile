FROM node:18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

RUN apk add --no-cache bash
COPY ./docker/node/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

