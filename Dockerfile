FROM node:21.7.1

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

# Expose the port the app runs on
CMD ["npm", "run", "start:dev"]