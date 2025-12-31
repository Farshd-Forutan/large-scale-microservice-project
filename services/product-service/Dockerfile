# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose product service port
EXPOSE 5001

# Start service
CMD ["npm", "run", "dev"]
