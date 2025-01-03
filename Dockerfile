FROM node:21.7.1

WORKDIR /usr/src/app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn run build

EXPOSE 4400

# Expose the port the app runs on
CMD ["yarn", "run", "start:dev"]