# Build stage
FROM node:lts AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=2048

# 1) Copy package files first for caching
COPY package*.json ./

# 2) Copy prisma schema BEFORE npm install so postinstall can find it
# (If you don't have prisma folder, this line will fail - but your error says you expect it)
COPY prisma ./prisma

# 3) Install (postinstall runs here and prisma generate will now succeed)
RUN npm install --force

# 4) Copy the rest of the app
COPY . .

# Optional (safe): generate again
RUN npx prisma generate

# Build Next
RUN npm run build

# Production stage
FROM node:lts
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Install prod deps (postinstall will run, schema exists)
RUN npm install --omit=dev --force

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000
CMD ["npm", "start"]