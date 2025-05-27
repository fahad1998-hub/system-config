# Base image
FROM node:18

# Set app directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Expose the app port (e.g., 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

