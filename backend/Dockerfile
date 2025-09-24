# Use a Node.js image with Alpine
FROM node:16-alpine

# Install necessary tools for building native dependencies
RUN apk add --no-cache python3 make g++ bash

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files and install dependencies
COPY package*.json ./
RUN npm install --build-from-source

# Copy the application code
COPY . .

# Copy the start.sh script into the container
COPY scripts/start.sh ./scripts/start.sh
RUN chmod +x ./scripts/start.sh

# Expose the backend port
EXPOSE 5000

# Use the startup script to handle bcrypt dynamically
CMD ["sh", "./scripts/start.sh"]