FROM node:10
WORKDIR /home/node/app
COPY package.json .
RUN npm install --production --loglevel verbose
COPY . .
CMD npm run-script run
