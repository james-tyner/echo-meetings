FROM node:10
COPY . /home/node/app
WORKDIR /home/node/app
RUN npm install --production --loglevel verbose
CMD npm run-script run
