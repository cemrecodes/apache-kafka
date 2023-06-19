# Consumer için Dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --production

COPY consumer.js /app/

CMD ["node", "consumer.js"]
