FROM node:14.21-alpine

RUN apk add --no-cache libc6-compat

RUN addgroup -g 1001 -S nodejs
RUN adduser -S keystonejs -u 1001
USER keystonejs

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

CMD ["yarn", "run", "dev"]
