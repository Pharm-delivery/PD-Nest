FROM node:18.16.0-alpine
WORKDIR /opt/app
RUN npm i -g @nestjs/cli
ADD . .
CMD ["npm", "run", "start:prod"]