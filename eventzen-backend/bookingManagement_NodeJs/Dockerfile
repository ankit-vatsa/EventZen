# Dockerfile (Node.js)
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 6007   
CMD ["node", "src/server.js"]
