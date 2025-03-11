# Build stage
FROM node:18-alpine as build

# Accept NODE_ENV as a build argument
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the code
COPY . .

# Copy the appropriate .env file based on NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
    cp -f .env.production.example .env.production && \
    cp -f .env.example .env; \
    elif [ "$NODE_ENV" = "development" ]; then \
    cp -f .env.development.example .env.development && \
    cp -f .env.example .env; \
    fi

# Build the application for either production or development
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm run build; \
    elif [ "$NODE_ENV" = "development" ]; then \
    npm run build:dev; \
    fi

# Runtime stage
FROM node:18-alpine as runtime

# Accept NODE_ENV as a build argument
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000

WORKDIR /app

# Copy only what's needed from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env* ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server/index.js"]
