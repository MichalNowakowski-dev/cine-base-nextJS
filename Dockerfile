# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_FONTS_PRELOAD=false

ENV TMDB_API_KEY=build_asdsadadade1341a426bf818cba0a18dd77
ENV OMDB_API_KEY=build_asdsadadad5
ENV POSTGRES_URL=postgresql://cinebase_user:polokpolok0@kontener_db:5432/cinebase_db
ENV NEXTAUTH_SECRET=zMdxjwd+build_asdsadadadQ3YIDl03FKBn4g4Ke/gq5KuTo0YQ=
ENV NEXTAUTH_URL=https://cinebase.com.pl
ENV STRIPE_WEBHOOK_SECRET=build_asdsadadad7f67nvFJkWkBeBM2HnC9mO4qnA83RLK
ENV STRIPE_SECRET_KEY=build_asdsadadad_51QN9sSE67REcLBPGEQ9DpPMCtOfFoISafbZlEABqcAyCeWpHLZ5FyexzOTxvxrJGQ1CVcQYU06QkWEYJinTtT5DS0001zwqObX
ENV RESEND_API_KEY=build_asdsadadadaTxS_CK4HuoGMWBW64LLtPuw5nSvx
ENV NEXT_PUBLIC_TMDB_URL=https://api.themoviedb.org
ENV NEXT_PUBLIC_OMDB_URL=http://www.omdbapi.com
ENV NEXT_PUBLIC_IMAGES_URL=https://image.tmdb.org/t/p/

RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
