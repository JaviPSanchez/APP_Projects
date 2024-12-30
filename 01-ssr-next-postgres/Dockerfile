# Stage 1: Install dependencies and build the application
ARG NODE_VERSION=20.12.2
ARG PNPM_VERSION=9.0.1

FROM node:${NODE_VERSION}-alpine AS builder

# Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (if available)
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Set environment variables (only necessary ones)
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}

ARG AUTH_URL
ENV AUTH_URL=${AUTH_URL}

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build the Next.js app
RUN pnpm build

# Stage 2: Create a minimal image for running the app
FROM node:${NODE_VERSION}-alpine AS runner

# Install pnpm globally in the final stage
RUN npm install -g pnpm@${PNPM_VERSION}

# Set working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma/
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables for runtime
ENV AUTH_SECRET=${AUTH_SECRET}
ENV AUTH_URL=${AUTH_URL}

# Expose port 3000
EXPOSE 3000

# Run the application
CMD ["pnpm", "start"]
