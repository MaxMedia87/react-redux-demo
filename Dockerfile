# Specify a base image
FROM node:18.16-alpine

RUN npm install -g npm@9.7.1

#Install some dependencies

WORKDIR /app

EXPOSE 3000

ENV PORT 3000

# Set up a default command
CMD [ "npm","start" ]