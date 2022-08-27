FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=builder /app/build/ /usr/share/nginx/html

# FROM node:16-alpine
# RUN yarn global add serve
# WORKDIR /app
# COPY package*.json ./
# RUN npm install --no-optional
# RUN npm update chokidar
# EXPOSE 3000
# CMD ["npm","start"]
