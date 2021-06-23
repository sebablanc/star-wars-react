FROM node:14-alpine3.11


WORKDIR /star-wars
COPY . .

COPY package*.json ./

RUN npm install

CMD ["npm", "start"]