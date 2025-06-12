# Build stage
FROM ubuntu:jammy AS build

# Set working directory
WORKDIR /app

# Install Node.js and build dependencies
RUN apt-get update && apt-get install -y \
    curl \
    python3 \
    make \
    g++ \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY frontend/package*.json ./

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN rm -rf package-lock.json node_modules
RUN npm install

# Copy project files
COPY frontend .

# Build the project
RUN npm run build

# Production stage
FROM nginx:1.24.0-alpine

# Install curl for health check
RUN apk --no-cache add curl

# Copy build files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/nginx.conf

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]