const moment = require('moment');

function timestamp() {
  return '[' + moment().format() + ']';
}

const log = {
  log: function (msg) {
    console.log(timestamp() + ' ' + msg);
  },
  error: function (msg) {
    console.error(timestamp() + ' ' + msg);
  }
}

module.exports = log;
