FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install
RUN npm run react-prod

EXPOSE 7777

CMD [ "npm", "start" ]