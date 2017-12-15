FROM mhart/alpine-node:8

WORKDIR /app
COPY package.json package-lock.json ./
COPY /.compiled .
RUN npm i --production

EXPOSE 3000
CMD ["node", "./server/server.js"]
