FROM node:18.16.0-alpine3.17

# Create app directory
RUN mkdir -p /opt/app
RUN mkdir -p /opt/app/src
RUN mkdir -p /opt/app/prisma

WORKDIR /opt/app

# copy app source
COPY package.json tsconfig.json .env  ./
# COPY src ./src
COPY prisma ./prisma

# Install app dependencies
RUN npm install
RUN npx prisma generate
ENTRYPOINT [ "npm", "run", "dev"]