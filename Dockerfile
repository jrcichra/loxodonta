FROM node:alpine
WORKDIR /app
COPY nuxt.config.js yarn.lock package.json LICENSE ./
RUN yarn install
COPY plugins ./plugins
COPY pages ./pages
COPY layouts ./layouts
COPY assets ./assets
COPY components ./components
CMD yarn dev
