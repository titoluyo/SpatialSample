FROM node:12-alpine
RUN yarn global add serve
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 5000
CMD ["serve","-s","build"]
