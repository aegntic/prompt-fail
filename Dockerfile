# Base image
FROM node:18 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install root and backend dependencies
RUN npm install
RUN cd backend && npm install

# Copy all source code
COPY . .

# Build frontend
RUN npm run build --workspaces=false || npm run build --if-present

# Build backend (if needed)
RUN cd backend && npm run build --if-present

# Production image
FROM node:18-slim

WORKDIR /app

COPY --from=build /app /app

# Install only production deps
RUN npm ci --omit=dev
RUN cd backend && npm ci --omit=dev

EXPOSE 3000

CMD ["node", "backend/dist/server.js"]