FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "node", "docker_start.js" ]
