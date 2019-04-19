const moment = require('moment');

function timestamp() {
  return `[${moment().format()}]`;
}

const log = {
  log(msg) {
    console.log(`${timestamp()} ${msg}`);
  },
  error(msg) {
    console.error(`${timestamp()} ${msg}`);
  },
};

module.exports = log;
