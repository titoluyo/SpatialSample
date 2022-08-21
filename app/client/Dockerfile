FROM node:16-alpine
RUN yarn global add serve
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
RUN npm update chokidar
EXPOSE 3000
CMD ["npm","start"]
