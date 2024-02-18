FROM node:21-alpine3.18

WORKDIR /

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]