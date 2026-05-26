# ============================================
# Dockerfile für namensreue.de (Coolify)
# ============================================

# --- Stage 1: Dependencies ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Package-Dateien kopieren
COPY package.coolify.json ./package.json
COPY prisma/schema.coolify.prisma ./prisma/schema.prisma

# Dependencies installieren
RUN yarn install --frozen-lockfile || yarn install

# Prisma Client generieren
RUN npx prisma generate

# --- Stage 2: Build ---
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Standalone next.config verwenden
COPY next.config.standalone.js ./next.config.js
COPY prisma/schema.coolify.prisma ./prisma/schema.prisma

# Prisma nochmal generieren (für Build)
RUN npx prisma generate

# Next.js bauen
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN yarn build

# --- Stage 3: Production ---
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Standalone Output kopieren
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma für Runtime
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
