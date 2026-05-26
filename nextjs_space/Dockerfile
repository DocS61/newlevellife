# ============================================
# Dockerfile für namensreue.de (Coolify)
# ============================================

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl

# --- Stage 1: Install & Build ---
FROM base AS builder
WORKDIR /app

# 1. Package-Datei kopieren (die echte, nicht den Symlink)
COPY package.coolify.json ./package.json
COPY prisma/schema.coolify.prisma ./prisma/schema.prisma

# 2. Dependencies installieren (erzeugt yarn.lock)
RUN yarn install

# 3. Prisma Client generieren
RUN npx prisma generate

# 4. Quellcode kopieren – aber package.json und yarn.lock NICHT überschreiben
#    Wir kopieren alles einzeln, um die Symlinks zu vermeiden
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY hooks ./hooks
COPY public ./public
COPY prisma/schema.coolify.prisma ./prisma/schema.prisma
COPY next.config.standalone.js ./next.config.js
COPY tailwind.config.ts ./tailwind.config.ts
COPY tsconfig.json ./tsconfig.json
COPY postcss.config.js ./postcss.config.js
COPY next-env.d.ts ./next-env.d.ts
COPY components.json ./components.json

# 5. Types-Ordner kopieren falls vorhanden
COPY types ./types

# 6. Next.js bauen
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN yarn build

# --- Stage 2: Production ---
FROM base AS runner
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
