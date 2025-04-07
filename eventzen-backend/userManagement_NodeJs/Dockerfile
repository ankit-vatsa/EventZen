# Dockerfile (Node.js)
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6002   
CMD ["node", "src/server.js"]
