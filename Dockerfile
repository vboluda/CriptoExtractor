# DOCKERFILE

FROM node

RUN mkdir -p /opt/app

WORKDIR /opt/app

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
CMD node prueba.js

RUN mkdir logs
