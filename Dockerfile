# Use the specified version of Node.js as the base image
FROM node:20.11.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm@10.2.4 globally
RUN npm install -g npm@10.2.4

# Install project dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Expose the port the application runs on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]