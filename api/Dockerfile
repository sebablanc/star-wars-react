FROM node:14-alpine3.11

WORKDIR /api
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8000

CMD ["node", "app.js"]