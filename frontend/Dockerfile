# =============== BUILD STAGE ===============
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# =============== PRODUCTION STAGE ===============
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]
