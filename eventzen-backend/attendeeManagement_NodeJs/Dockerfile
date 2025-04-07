# Dockerfile (Node.js)
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6008   
CMD ["node", "src/server.js"]
