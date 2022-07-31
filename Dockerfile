FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm install

COPY . . 

EXPOSE 3000

CMD ["nest", "start"]