require('dotenv').config();
const log = require('./util/log')

const isProduction = process.env.NODE_ENV === 'production';
const mongo_url = process.env.MONGO_URL;

if (mongo_url == null || mongo_url === '') {
  log.error('MONGO_URL missing. Did you create a .env file?')
  process.exit(1);
}

// connect mongodb

let mongoose = require('mongoose');

mongoose.connect(mongo_url, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  log.log('Connected to MongoDB');
});


// models

require('./models/User');
require('./models/Team');
require('./models/Meeting');
require('./models/Task');

// express

let express = require("express");
let bodyParser = require('body-parser');

require('./config/passport-setup');

let app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(function (req, res, next) {
  log.log(req.method + ' ' + req.path);
  next();
});


app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

app.use(function (err, req, res, next) {
  if (err.message === 'Not Found' || err.message === 'No authorization token was found') {
    log.error(err.message)
  } else {
    log.error(err.stack)
  }
  next(err);
});


// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

app.listen(3000, () => {
  console.log(`Server ${isProduction ? '(Production)' : '(Debug)'} running on port 3000`);
});
