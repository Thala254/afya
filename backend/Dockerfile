FROM node:16.13.2-alpine3.14 AS runner

RUN apk add --no-cache libc6-compat

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY --chown=nextjs:nodejs . ./

CMD ["yarn", "run", "dev"]
