FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE 3000
CMD [ "node", "index.mjs" ]
