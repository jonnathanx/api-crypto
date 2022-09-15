FROM node:14

WORKDIR /cryptos
COPY package.json .
RUN npm install
COPY . .
CMD npm start