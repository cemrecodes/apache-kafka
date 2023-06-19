# Producer için Dockerfile
FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --production

COPY producer.js /app/

CMD ["node", "producer.js"]
