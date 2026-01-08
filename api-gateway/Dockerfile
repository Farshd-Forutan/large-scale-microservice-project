# ============================
# API Gateway Dockerfile
# ============================

FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY src ./src

# Expose API Gateway port
EXPOSE 8000

# Start the API Gateway
CMD ["node", "src/index.js"]
