FROM node:16-slim

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install

COPY . . 

EXPOSE 3000

CMD ["nest", "start"]