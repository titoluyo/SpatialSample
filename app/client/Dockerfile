FROM node:12-alpine
RUN yarn global add serve
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
EXPOSE 3000
CMD ["npm","start"]
