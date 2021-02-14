FROM node:15-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY server.js ./
CMD yarn dev