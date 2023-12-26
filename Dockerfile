FROM node:18-alpine AS base


FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build:backoffice:backend

FROM base AS runner
WORKDIR /app
ENV NODE_ENV development
COPY --from=builder /app/dist ./

CMD ["node", "src/apps/backoffice/backend/start"]
