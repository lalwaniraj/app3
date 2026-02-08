FROM node:20

WORKDIR /app3

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["node", "index.js"]

