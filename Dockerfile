FROM node:15-slim
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY nuxt.config.js ./
COPY pages ./pages
COPY layouts ./layouts
COPY assets ./assets
COPY components ./components
CMD yarn dev
