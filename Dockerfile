FROM node:20.12.0

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
