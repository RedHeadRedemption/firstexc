FROM node:14.4.0-stretch
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["node", "myServer.js"]