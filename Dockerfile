FROM node:18.16.0-alpine
WORKDIR /opt/app
ADD . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:prod"]