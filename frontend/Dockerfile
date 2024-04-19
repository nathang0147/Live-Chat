FROM node:18-bullseye-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV REACT_APP_BASE_URL=http://localhost:3000/api

EXPOSE 4000

CMD ["npm", "run", "dev"]