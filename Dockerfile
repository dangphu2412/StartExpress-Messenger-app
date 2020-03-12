FROM node:8

WORKDIR /usr/src/appdo

COPY package.json /usr/src/app
RUN npm build --no-cache
RUN npm i -g knex nodemon

COPY . .
EXPOSE 8080

CMD ["npm","start"]