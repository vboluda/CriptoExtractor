# DOCKERFILE

FROM node:10

RUN mkdir -p /app

WORKDIR /app

RUN npm install nodemon -g

#COPY&INSTALL PROJECTS
COPY . .

WORKDIR /app/api
RUN npm install
WORKDIR /app/batch
RUN npm install
WORKDIR /app/common
RUN npm install

WORKDIR /app
COPY configDocker.js config.js

EXPOSE 10010
CMD nodemon api/app.js

RUN mkdir -p logs

RUN node --version
