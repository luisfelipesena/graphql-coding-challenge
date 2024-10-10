# Use the Node.js version specified in .nvmrc
FROM node:20.12.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["npm", "run", "start:prod"]
