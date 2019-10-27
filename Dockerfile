# DOCKERFILE

FROM node:10

RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm install nodemon -g

#COPY&INSTALL PROJECTS
COPY . .
RUN cd api
RUN npm install
RUN cd ..
RUN cd batch
RUN npm install
RUN cd ..
RUN cd common
RUN npm install
RUN cd ..

EXPOSE 10010
CMD nodemon api/app.js

RUN mkdir -p logs



