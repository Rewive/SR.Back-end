FROM node:18-alpine As development

RUN mkdir -p /newfolder
RUN chown node /newfolder
USER node
WORKDIR /newfolder

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

FROM node:18-alpine As build

WORKDIR /newfolder

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /newfolder/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine As production

COPY --chown=node:node --from=build /newfolder/node_modules ./node_modules
COPY --chown=node:node --from=build /newfolder/dist ./dist

CMD [ "node", "dist/main.js" ]