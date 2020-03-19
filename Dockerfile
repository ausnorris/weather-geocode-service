FROM node:10

RUN mkdir /src

WORKDIR /src

## Install packages using NPM 5 (bundled with the node:9 image)
COPY ./package.json /src/package.json
#COPY ./package-lock.json /src/package-lock.json
RUN npm config delete proxy
RUN npm install

## Add application code
COPY ./app.js /src/
COPY ./utils /src/utils/

## Set environment to "development" by default
ENV NODE_ENV development

## Allows port 3000 to be publicly available
EXPOSE 80
EXPOSE 3001

## The command uses nodemon to run the application
#RUN ["chmod", "+x", "start.sh"]
CMD node app.js