FROM node:4.3.1

ADD ./package.json /app/package.json

WORKDIR /app

RUN npm install --production

ENV NODE_ENV=production

ADD ./ /app

CMD [ "node", "dist/index.js" ]
